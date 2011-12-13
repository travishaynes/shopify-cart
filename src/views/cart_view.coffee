class ShopifyAjax.Views.CartView extends ShopifyAjax.Views.Base
  el    : "#shopping-cart"
  model : null
  
  initialize: (options) ->
    view = this
    @model.events.changed = (sender) -> view.render()
  
  render: () ->
    # get the template for the cart
    cart_template = _.template(jQuery("#shopping-cart-template").html())
    
    # render the template
    cart_html = cart_template
      cart: this.model.attributes
    
    # display the cart on the DOM
    jQuery(@el).html(cart_html)
    
    # render the line items
    _.each @model.attributes.items, (item) ->
      new ShopifyAjax.Views.LineItemView
        el   : "#shopping-cart table"
        model: item
    
    this
