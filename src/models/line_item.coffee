class ShopifyAjax.Models.LineItem
  template: "#item-template"
  
  constructor: (item) ->
    @grams              = item.grams
    @handle             = item.handle
    @id                 = item.id
    @image              = item.image
    @line_price         = item.line_price
    @price              = item.price
    @quantity           = item.quantity
    @requires_shipping  = item.requires_shipping
    @sku                = item.sku
    @title              = item.title
    @url                = item.url
    @variant_id         = item.variant_id
    @vendor             = item.vendor
    
    _.bindAll this
  
  render: () ->
    _.template(jQuery(@template).html())
      item: this
