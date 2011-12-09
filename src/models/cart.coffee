class ShopifyAjax.Models.Cart
  el: "#shopping-cart"
  
  constructor: () ->
    @attributes         = null
    @item_count         = 0
    @note               = null
    @requires_shipping  = true
    @total_price        = 0
    @total_weight       = 0
    @items              = []
    _.bindAll this
  
  send: (type, url, data = null, callback = @set) ->
    $.ajax
      type    : type
      url     : url
      data    : data
      dataType: 'JSON'
      success : (data) ->
        callback(data)
      error   : (xhr, status, error) ->
        throw error
  
  set: (data) ->
    @attributes        = data.attributes
    @item_count        = data.item_count
    @note              = data.note
    @requires_shipping = data.requires_shipping
    @total_price       = data.total_price
    @total_weight      = data.total_weight
    for item in data.items
      @items.push new ShopifyAjax.Models.LineItem(item)
    @render()
  
  add: (id, quantity) ->
    cart = this
    @send "POST", "/cart/add.js", "id=#{id}&quantity=#{quantity}", (data) ->
      cart.items.push data
      cart.item_count = cart.items.length
      cart.render()
  
  fetch: ->
    @send "GET", "/cart.js"
  
  save: ->
    @send "POST", "/cart/change.js", JSON.stringify(this)
  
  clear: ->
    @send "POST", "/cart.clear.js"
  
  render: () ->
    console.log 'render'
    this

window.Cart = new ShopifyAjax.Models.Cart()
Cart.fetch()
