 
$(document).ready(function(){
  $("#js-btn").on("click", function(){
    $.ajax({
      method: "GET",
      URL: "/scrape/js"
    })
  })
})
