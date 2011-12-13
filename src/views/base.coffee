class ShopifyAjax.Views.Base
  model   : null
  el      : null
  
  # creates a new instance of the view
  constructor: (options = {}) ->
    # set a unique identifier for this model
    @cid = _.uniqueId('c')
    # attach to the model
    @model = options.model
    # call initialize
    @initialize(options)
    # bind the methods with underscore
    _.bindAll(this)
    # return the view
    this
  
  # override this function with your own initialization logic
  initialize: (attributes, options) ->
    undefined
  
  # override this function to render the view.
  # **NOTE:** always return `this`
  render: ->
    this
  
  remove: ->
    jQuery(this.el).remove()
    this
