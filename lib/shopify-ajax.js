(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  window.ShopifyAjax = {
    VERSION: '0.0.1',
    Models: {},
    Views: {},
    sync: function(type, model, url, options) {
      var defaults, params;
      if (options == null) {
        options = {};
      }
      defaults = {
        type: type,
        url: url,
        data: model.toJSON(),
        dataType: 'json',
        error: function(xhr, status, error) {
          throw error;
        }
      };
      params = _.extend(defaults, options);
      if (type === "GET") {
        params.data = void 0;
      }
      return jQuery.ajax(params);
    }
  };
  ShopifyAjax.Models.Base = (function() {
    Base.prototype.defaults = {};
    Base.prototype.events = {
      changed: function(sender) {
        return;
      }
    };
    Base.prototype.hasMany = void 0;
    Base.prototype.url = function(method) {
      return;
    };
    Base.prototype.attribtues = {};
    Base.prototype._changed = false;
    Base.prototype._changing = false;
    function Base(attributes, options) {
      if (attributes == null) {
        attributes = {};
      }
      if (options == null) {
        options = {};
      }
      this.cid = _.uniqueId('c');
      if (_.isFunction(this.defaults)) {
        this.defaults = this.defaults();
      }
      this.attributes = _.extend({}, this.defaults, attributes);
      this.initialize(attributes, options);
      _.bindAll(this);
      this;
    }
    Base.prototype.initialize = function(attributes, options) {
      return;
    };
    Base.prototype.change = function(obj) {
      if (_.isFunction(this.events.changed)) {
        this.events.changed(obj);
      }
      this._changed = false;
      return this;
    };
    Base.prototype.toJSON = function() {
      return JSON.stringify(this.attributes);
    };
    Base.prototype.has = function(attr) {
      return this.attributes[attr] != null;
    };
    Base.prototype.get = function(attr) {
      return this.attributes[attr];
    };
    Base.prototype.set = function(attrs, options) {
      var alreadyChanging, attr, index, model, value;
      if (options == null) {
        options = {};
      }
      if (attrs == null) {
        return this;
      }
      if (attrs.attributes != null) {
        attrs = attrs.attributes;
      }
      alreadyChanging = this._changing;
      this._changing = true;
      for (attr in attrs) {
        value = attrs[attr];
        if ((this.hasMany != null) && (this.hasMany[attr] != null)) {
          model = eval("ShopifyAjax.Models." + this.hasMany[attr]);
          for (index in value) {
            value[index] = new model(value[index]);
          }
        }
        if (!_.isEqual(this.attributes[attr], value)) {
          this.attributes[attr] = value;
          this._changed = true;
        }
      }
      if (this._changed && (!alreadyChanging && !options.silent)) {
        this.change(this);
      }
      this._changing = false;
      return this;
    };
    Base.prototype.fetch = function() {
      var model;
      model = this;
      return ShopifyAjax.sync("GET", this, this.url("GET"), {
        success: function(attributes) {
          return model.set(attributes);
        }
      });
    };
    Base.prototype.save = function() {
      var model;
      model = this;
      return ShopifyAjax.sync("POST", this, this.url("POST"), {
        success: function(attributes) {
          return model.set(attributes);
        }
      });
    };
    return Base;
  })();
  ShopifyAjax.Models.LineItem = (function() {
    __extends(LineItem, ShopifyAjax.Models.Base);
    function LineItem() {
      LineItem.__super__.constructor.apply(this, arguments);
    }
    LineItem.prototype.defaults = {
      grams: 0,
      handle: '',
      id: 0,
      image: '',
      line_price: 0,
      price: 0,
      quantity: 0,
      requires_shipping: true,
      sku: '',
      title: '',
      url: '',
      variant_id: 0,
      vendor: ''
    };
    return LineItem;
  })();
  ShopifyAjax.Models.Cart = (function() {
    __extends(Cart, ShopifyAjax.Models.Base);
    function Cart() {
      Cart.__super__.constructor.apply(this, arguments);
    }
    Cart.prototype.defaults = {
      attributes: null,
      item_count: 0,
      note: null,
      requires_shipping: true,
      total_price: 0,
      total_weight: 0,
      items: []
    };
    Cart.prototype.hasMany = {
      'items': 'LineItem'
    };
    Cart.prototype.url = function(method) {
      if (method === "GET") {
        return "/cart.js";
      }
      if (method === "POST") {
        return "/cart/change.js";
      }
      return null;
    };
    Cart.prototype.clear = function() {
      var cart;
      cart = this;
      return ShopifyAjax.sync("POST", this, "/cart/clear.js", {
        data: null,
        success: function(data) {
          return cart.set(data);
        }
      });
    };
    Cart.prototype.add = function(id, quantity) {
      var cart;
      cart = this;
      return ShopifyAjax.sync("POST", this, "/cart/add.js", {
        data: "id=" + id + "&quantity=" + quantity,
        success: function(data) {
          var count, index;
          cart.attributes.items.push(new ShopifyAjax.Models.LineItem(data));
          cart.change(cart, 'items', cart.attributes.items);
          count = 0;
          for (index in cart.attributes.items) {
            count += cart.attributes.items[index].attributes.quantity;
          }
          return cart.set({
            item_count: count
          });
        }
      });
    };
    Cart.prototype.remove = function(id) {
      var cart;
      cart = this;
      return ShopifyAjax.sync("POST", this, "/cart/change.js", {
        data: "id=" + id,
        success: function(data) {
          return cart.set(data);
        }
      });
    };
    return Cart;
  })();
  ShopifyAjax.Views.Base = (function() {
    Base.prototype.model = null;
    Base.prototype.el = null;
    function Base(options) {
      if (options == null) {
        options = {};
      }
      this.cid = _.uniqueId('c');
      this.model = options.model;
      this.initialize(options);
      _.bindAll(this);
      this;
    }
    Base.prototype.initialize = function(attributes, options) {
      return;
    };
    Base.prototype.render = function() {
      return this;
    };
    Base.prototype.remove = function() {
      jQuery(this.el).remove();
      return this;
    };
    return Base;
  })();
  ShopifyAjax.Views.CartView = (function() {
    __extends(CartView, ShopifyAjax.Views.Base);
    function CartView() {
      CartView.__super__.constructor.apply(this, arguments);
    }
    CartView.prototype.el = "#shopping-cart";
    CartView.prototype.model = null;
    CartView.prototype.initialize = function(options) {
      var view;
      view = this;
      return this.model.events.changed = function(sender) {
        return view.render();
      };
    };
    CartView.prototype.render = function() {
      var cart_html, cart_template;
      cart_template = _.template(jQuery("#shopping-cart-template").html());
      cart_html = cart_template({
        cart: this.model.attributes
      });
      jQuery(this.el).html(cart_html);
      _.each(this.model.attributes.items, function(item) {
        return new ShopifyAjax.Views.LineItemView({
          el: "#shopping-cart table",
          model: item
        });
      });
      return this;
    };
    return CartView;
  })();
  ShopifyAjax.Views.LineItemView = (function() {
    __extends(LineItemView, ShopifyAjax.Views.Base);
    function LineItemView() {
      LineItemView.__super__.constructor.apply(this, arguments);
    }
    LineItemView.prototype.tagName = "tr";
    LineItemView.prototype.initialize = function(options) {
      var view;
      view = this;
      this.el = options.el;
      this.model.events = {
        changed: function(obj) {
          return view.render();
        }
      };
      return this.render();
    };
    LineItemView.prototype.render = function() {
      var el, html, template;
      template = _.template(jQuery("#line-item-template").html());
      html = template({
        item: this.model.attributes
      });
      el = jQuery("#" + this.model.attributes.id);
      if (el.length > 0) {
        el.html(jQuery(html).html());
      } else {
        jQuery(this.el).append(html);
      }
      return this;
    };
    return LineItemView;
  })();
}).call(this);
