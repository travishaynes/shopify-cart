class ShopifyAjax.Models.Cart extends ShopifyAjax.Models.Base
  defaults:
    attributes        : null
    item_count        : 0
    note              : null
    requires_shipping : true
    total_price       : 0
    total_weight      : 0
    items             : []
  
  hasMany:
    'items': 'LineItem'
  
  url: (method) ->
    return "/cart.js"         if method == "GET"
    return "/cart/change.js"  if method == "POST"
    null
  
  clear: ->
    cart = this
    ShopifyAjax.sync "POST", this, "/cart/clear.js",
      data    : null
      success : (data) ->
        cart.set data
  
  add: (id, quantity) ->
    cart = this
    ShopifyAjax.sync "POST", this, "/cart/add.js",
      data    : "id=#{id}&quantity=#{quantity}"
      success : (data) ->
        # add the item to the cart
        cart.attributes.items.push new ShopifyAjax.Models.LineItem(data)
        # trigger the change event for the new items
        cart.change(cart, 'items', cart.attributes.items)
        # update the items count
        count = 0
        for index of cart.attributes.items
          count += cart.attributes.items[index].attributes.quantity
        cart.set item_count: count
  
  remove: (id) ->
    cart = this
    ShopifyAjax.sync "POST", this, "/cart/change.js",
      data    : "id=#{id}"
      success : (data) -> cart.set(data)
  
window.Cart = new ShopifyAjax.Models.Cart()
Cart.fetch()
