$(document).ready(function() {
  $('img').each(function(){
    if (!this.complete) {
      $(this).on('error', function () {
        $(this).attr('src', 'public/images/coaches/placeholder.jpg')
      })
    } else {
      // oh-no, we are broken
      if (typeof this.naturalWidth !== "undefined" && this.naturalWidth === 0) {
        $(this).attr('src', 'public/images/coaches/placeholder.jpg')
        $(this).parent().removeClass('imgLiquidFill imgLiquid')
      }
    }
  });
})

$(document).ready(function() {
    $(".imgLiquidFill").imgLiquid();
});