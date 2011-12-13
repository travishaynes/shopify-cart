class ShopifyAjax.Models.Base
  # override this when defining your model to provide default values
  defaults: {}
  
  events:
    # override this event to be notified of any changes made to this model
    changed: (sender) -> undefined
  
  # use hasMany to define the one to many relationships for this model
  # example:
  #   hasMany:
  #     'item': 'LineItem'
  #
  #   # 'item'      => the attribute name
  #   # 'LineItem'  => the name of the model
  hasMany: undefined
  
  # override this function to provide the url for each CRUD action
  url: (method) -> undefined
  
  # forward declarations
  attribtues: {}
  
  _changed: false
  _changing: false
  
  # creates a new instance of the model
  constructor: (attributes = {}, options = {}) ->
    # set a unique identifier for this model
    @cid        = _.uniqueId('c')
    # call defaults if it's a function
    @defaults   = @defaults()   if _.isFunction(@defaults)
    # ensure default values for undefined attributes
    @attributes = _.extend({}, @defaults, attributes);
    # call initialize
    @initialize(attributes, options)
    # bind everything with underscore
    _.bindAll(this)
    # return the model
    this
  
  # override this function with your own initialization logic
  initialize: (attributes, options) ->
    undefined
  
  change: (obj) ->
    @events.changed(obj) if _.isFunction(@events.changed)
    @_changed = false
    this
  
  toJSON: -> JSON.stringify(@attributes)
  
  has: (attr) -> @attributes[attr]?
  
  get: (attr) -> @attributes[attr]
  
  set: (attrs, options = {}) ->
    # extract options and attributes
    return this unless attrs?
    attrs = attrs.attributes if attrs.attributes?
    
    # begin changing attributes
    alreadyChanging = @_changing
    @_changing = true
    
    # update the attributes
    for attr of attrs
      value = attrs[attr]
      
      # check relationships
      if @hasMany? && @hasMany[attr]?
        model = eval("ShopifyAjax.Models.#{@hasMany[attr]}")
        for index of value
          value[index] = new model(value[index])
      
      unless _.isEqual(@attributes[attr], value)
        @attributes[attr] = value
        @_changed = true
    
    # fire change event
    if @_changed && (!alreadyChanging && !options.silent)
      @change(this)
    @_changing = false
    
    this
  
  fetch: ->
    model = this
    ShopifyAjax.sync "GET", this, @url("GET"), success: (attributes) ->
      model.set attributes
  
  save: ->
    model = this
    ShopifyAjax.sync "POST", this, @url("POST"), success: (attributes) ->
      model.set attributes
