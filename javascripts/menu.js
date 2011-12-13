(function(){
  
  $("#left-nav > ul > li > a").live("click", function(event){
    event.preventDefault();
    
    var $this     = $(this),
        $sections = $("#main .section"),
        $current  = $("#main .current.section"),
        $selected = $($this.attr("href"));
    
    if(!$selected.hasClass("current")){
      $current
        .fadeOut()
        .removeClass("current");
      $selected
        .fadeIn()
        .addClass("current");
    }
    
    return false;
  });
  
})();

$(document).ready(function(){
  $("#main .current.section").show();
});
