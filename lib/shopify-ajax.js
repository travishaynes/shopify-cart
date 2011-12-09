(function() {
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  window.ShopifyAjax = {
    Models: {},
    Views: {}
  };
  ShopifyAjax.Models.Cart = (function() {
    Cart.prototype.el = "#shopping-cart";
    function Cart() {
      this.attributes = null;
      this.item_count = 0;
      this.note = null;
      this.requires_shipping = true;
      this.total_price = 0;
      this.total_weight = 0;
      this.items = [];
      _.bindAll(this);
    }
    Cart.prototype.send = function(type, url, data, callback) {
      if (data == null) {
        data = null;
      }
      if (callback == null) {
        callback = this.set;
      }
      return $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'JSON',
        success: function(data) {
          return callback(data);
        },
        error: function(xhr, status, error) {
          throw error;
        }
      });
    };
    Cart.prototype.set = function(data) {
      var item, _i, _len, _ref;
      this.attributes = data.attributes;
      this.item_count = data.item_count;
      this.note = data.note;
      this.requires_shipping = data.requires_shipping;
      this.total_price = data.total_price;
      this.total_weight = data.total_weight;
      _ref = data.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.items.push(new ShopifyAjax.Models.LineItem(item));
      }
      return this.render();
    };
    Cart.prototype.add = function(id, quantity) {
      var cart;
      cart = this;
      return this.send("POST", "/cart/add.js", "id=" + id + "&quantity=" + quantity, function(data) {
        cart.items.push(data);
        cart.item_count = cart.items.length;
        return cart.render();
      });
    };
    Cart.prototype.fetch = function() {
      return this.send("GET", "/cart.js");
    };
    Cart.prototype.save = function() {
      return this.send("POST", "/cart/change.js", JSON.stringify(this));
    };
    Cart.prototype.clear = function() {
      return this.send("POST", "/cart.clear.js");
    };
    Cart.prototype.render = function() {
      console.log('render');
      return this;
    };
    return Cart;
  })();
  window.Cart = new ShopifyAjax.Models.Cart();
  Cart.fetch();
  ShopifyAjax.Models.LineItem = (function() {
    LineItem.prototype.template = "#item-template";
    function LineItem(item) {
      this.grams = item.grams;
      this.handle = item.handle;
      this.id = item.id;
      this.image = item.image;
      this.line_price = item.line_price;
      this.price = item.price;
      this.quantity = item.quantity;
      this.requires_shipping = item.requires_shipping;
      this.sku = item.sku;
      this.title = item.title;
      this.url = item.url;
      this.variant_id = item.variant_id;
      this.vendor = item.vendor;
      _.bindAll(this);
    }
    LineItem.prototype.render = function() {
      return _.template(jQuery(this.template).html())({
        item: this
      });
    };
    return LineItem;
  })();
}).call(this);
