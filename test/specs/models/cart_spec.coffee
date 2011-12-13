describe "window.Cart", ->
  it "should be defined", ->
    expect(window.Cart).not.toEqual undefined
  it "should have the attributes defined in the cart.js fixture", ->
    expect(Cart.attributes.requires_shipping).toEqual true
    expect(Cart.attributes.total_price).toEqual 10000
    expect(Cart.attributes.attributes).toEqual null
    expect(Cart.attributes.item_count).toEqual 5
    expect(Cart.attributes.note).toEqual null
    expect(Cart.attributes.total_weight).toEqual 947
  it "should have 2 line items", ->
    expect(Cart.attributes.items.length).toEqual 2
  describe "first line item", ->
    it "should be a ShopifyCart.Models.LineItem", ->
      item = Cart.attributes.items[0]
      expect(item.__proto__.__proto__.__proto__.isPrototypeOf(ShopifyCart.Models.LineItem)).toBeTruthy
    it "should have the attributes defined in the cart.js fixture", ->
      item = Cart.attributes.items[0]
      expect(item.attributes.handle).toEqual "aquarius"
      expect(item.attributes.line_price).toEqual 6000
      expect(item.attributes.requires_shipping).toEqual true
      expect(item.attributes.price).toEqual 2000
      expect(item.attributes.title).toEqual "aquarius - medium"
      expect(item.attributes.url).toEqual "/products/aquarius"
      expect(item.attributes.quantity).toEqual 3
      expect(item.attributes.id).toEqual 30104042
      expect(item.attributes.grams).toEqual 181
      expect(item.attributes.sku).toEqual ""
      expect(item.attributes.vendor).toEqual "the candi factory"
      expect(item.attributes.image).toEqual "http://static.shopify.com/s/files/1/0040/7092/products/aquarius_1.gif?1268045506"
      expect(item.attributes.variant_id).toEqual 30104042
  describe "the second line item", ->
    it "should be a ShopifyCart.Models.LineItem", ->
      item = Cart.attributes.items[1]
      expect(item.__proto__.__proto__.__proto__.isPrototypeOf(ShopifyCart.Models.LineItem)).toBeTruthy
    it "should have the attributes defined in the cart.js fixture", ->
      item = Cart.attributes.items[1]
      expect(item.attributes.handle).toEqual "amelia"
      expect(item.attributes.line_price).toEqual 4000
      expect(item.attributes.requires_shipping).toEqual true
      expect(item.attributes.price).toEqual 2000
      expect(item.attributes.title).toEqual "amelia - medium"
      expect(item.attributes.url).toEqual "/products/amelia"
      expect(item.attributes.quantity).toEqual 2
      expect(item.attributes.id).toEqual 30104012
      expect(item.attributes.grams).toEqual 200
      expect(item.attributes.sku).toEqual ""
      expect(item.attributes.vendor).toEqual "the candi factory"
      expect(item.attributes.image).toEqual "http://static.shopify.com/s/files/1/0040/7092/products/2766315_da1b.png?1268045506"
      expect(item.attributes.variant_id).toEqual 30104012
