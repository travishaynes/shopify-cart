/* dynamically loads the content for the document */

$(document).ready(function(){
  
  /* Table Of Contents */
  var toc = {
    'About'         : [],
    'Models'        : [
      'Base',
      'Cart',
      'LineItem'
    ],
    'Views'         : [
      'CartView',
      'LineItemView'
    ],
    'Examples'      : [],
    'License'       : [],
    'Donations'     : []
  };
  
  var $ul         = $("#left-nav > ul"),
      $main       = $("#main"),
      hasCurrent  = false;
  
  function addPage(page) {
    // create the DOM elements
    var $li       = $("<li>"),
        $a        = $("<a>"),
        $div      = $("<div>"),
        title     = page,
        page      = page.toLowerCase(),
        subPages  = toc[title];
    $a.attr("href", "#" + page).text(title)       // create the anchor for the div
    $li.append($a);                               // add the anchor to the list item
    $ul.append($li);                              // add the list item to the unordered list
    $div.addClass("section").attr("id", page);    // create the div
    $main.append($div)                            // add the div to the page
    // TODO: select the div if its in the url (e.g. localhost:300/#test)
    // make the first div visible
    if(!hasCurrent){
      $div.addClass("current").show();
      $a.addClass("current");
      hasCurrent = true;
    }
    // add sub pages
    if(subPages.length>0){
      var $sub_ol = $("<ol>");
      for(i in subPages) {
        var $sub_li   = $("<li>"),
            $sub_a    = $("<a>"),
            subTitle  = subPages[i],
            subPage   = subTitle.toLowerCase();
        $sub_a.attr("href", "#" + page + "_" + subPage).text(subTitle);
        $sub_li.append($sub_a);
        $sub_ol.append($sub_li);
      }
      $li.append($sub_ol);
    }
    // load the contents of the div
    $.ajax({
      url     : "./pages/" + page + ".html",
      type    : "GET",
      error   : function(xhr, status, error) { throw error; },
      success : function(data){ $div.html(data); }
    });
  }
  
  for(page in toc){ addPage(page); }
});
