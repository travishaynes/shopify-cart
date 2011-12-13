class ShopifyCart.Views.LineItemView extends ShopifyCart.Views.Base
  tagName : "tr"
  
  initialize: (options) ->
    view = this
    @el = options.el
    @model.events =
      changed: (obj) ->
        view.render()
    @render()
  
  remove: ->
    jQuery("##{@model.attributes.id}").remove()
    this
  
  render: ->
    # get the template for the line items
    template = _.template(jQuery("#line-item-template").html())
    
    # generate html from the template
    html = template
      item: @model.attributes
    
    # check if the item already exists on the DOM
    el = jQuery("##{@model.attributes.id}")
    if el.length > 0
      el.html(jQuery(html).html())
    else
      jQuery(@el).append(html)
    
    this
