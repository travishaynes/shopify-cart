(function(){
  
  // main menu
  $("#left-nav > ul > li > a").live("click", function(event){
    var $this     = $(this),
        $menu     = $("#left-nav > ul"),
        $sections = $("#main .section"),
        $current  = $("#main .current.section"),
        $selected = $($this.attr("href"));
    
    $menu.find("a.current").removeClass("current");
    $this.addClass("current");
    
    if(!$selected.hasClass("current")){
      $current
        .fadeOut()
        .removeClass("current");
      $selected
        .fadeIn()
        .addClass("current");
    }
    
    return true;
  });
  
  // sub menu
  $("#left-nav > ul > li > ol > li > a").live("click", function(event){
    var $parent = $(this).parent().parent().parent().find("> a");
    $parent.trigger("click");
    return true;
  });
  
})();

$(document).ready(function(){
  $("#main .current.section").show();
});
