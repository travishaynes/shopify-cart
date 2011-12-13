# use Mustache style templating
_.templateSettings =
  interpolate: /\{\{(.+?)\}\}/g

window.ShopifyCart =
  VERSION     : '0.0.1'
  
  Models      : {}
  Views       : {}
  
  # synchronizes AJAX commands between all resources
  sync: (type, model, url, options = {}) ->
    # set defaults parameters for the AJAX call
    defaults =
      type    : type
      url     : url
      data    : model.toJSON()
      dataType: 'json'
      error   : (xhr, status, error) ->
        throw error
    
    # extend default parameters with options
    params = _.extend(defaults, options)
    
    # do not include data for GET requests
    params.data = undefined if type == "GET"
    
    # send the request
    jQuery.ajax(params)
