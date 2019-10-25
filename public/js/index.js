 
$(document).ready(function(){
  $("#js-btn").on("click", function(){
    $.ajax({
      method: "GET",
      URL: "/scrape/js"
    }).then(()=>{
      
    })
  })
  $("#tech-btn").on("click", function(){
    $.ajax({
      method: "GET",
      URL: "/scrape/tech"
    }).then(()=>{
      
    })
  })
})
