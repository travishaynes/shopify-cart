# set up the cart view with a new cart
window.CartView = new ShopifyAjax.Views.CartView
  model: new ShopifyAjax.Models.Cart()
# make the view's cart globally accessible
window.Cart = CartView.model
# fetch the shopping cart
Cart.fetch()
