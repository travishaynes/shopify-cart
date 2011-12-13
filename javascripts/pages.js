/* dynamically loads the content for the document */

$(document).ready(function(){
  
  $.ajax({
    url       : "./pages/toc.js",
    type      : "GET",
    success   : function(data) {
      var $toc        = $(eval(data)),
          $ul         = $("#left-nav > ul"),
          $main       = $("#main"),
          hasCurrent  = false;
      
      $toc.each(function(){
        // create the DOM elements
        var $li   = $("<li>"),
            $a    = $("<a>"),
            $div  = $("<div>"),
            title = this.titleize();
        $a.attr("href", "#" + this).text(title)       // create the anchor for the div
        $li.append($a);                               // add the anchor to the list item
        $ul.append($li);                              // add the list item to the unordered list
        $div.addClass("section").attr("id", ""+this); // create the div
        $main.append($div)                            // add the div to the page
        // TODO: select the div if its in the url (e.g. localhost:300/#test)
        // make the first div visible
        if(!hasCurrent){
          $div.addClass("current").show();
          hasCurrent = true;
        }
        // load the contents of the div
        $.ajax({
          url     : "./pages/" + this + ".html",
          type    : "GET",
          success : function(data){
            $div.html(data);
            console.log($div);
          },
          error   : function(xhr, status, error) {
            throw error;
          }
        });
      });
    },
    error     : function(xhr, status, error) {
      throw error;
    }
  });

});
