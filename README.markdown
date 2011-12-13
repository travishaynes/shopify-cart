shopify-cart
============

This CoffeeScript library supplies structure to the
[Shopify cart API](wiki.shopify.com/Ajax_API) by providing dynamic views, and
models with key-value bindings and events that update automatically when the
cart changes.


Building
========

* To build the project run `cake build`.
* To watch the project and compile it automatically when it changes, run
`cake watch`.


Testing
=======

The tests are written in CoffeeScript, and served by
[Sinatra](http://www.sinatrarb.com/).

* To install the dependencies run `gem install sinatra`
* To run the tests run `script/test` and point your browser to localhost:3000
