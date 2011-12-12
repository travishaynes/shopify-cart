class ShopifyAjax.Views.LineItemView
  template: "#item-template"
  
  constructor: (model) ->
    @model = model
    _.bindAll this
  
  render: () ->
    template  = _.template(jQuery(@template).html())
    @el       = jQuery(template(item: @model))
  
  remove: () ->
    @el.remove()
