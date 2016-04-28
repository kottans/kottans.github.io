$(function () {
  $('.table-years').on('click', 'a', function (e) {
    e.preventDefault()
    var idSelected,
      $clicked = $(e.target);
    $clicked
      .addClass('active')
      .siblings()
      .removeClass('active');
    idSelected = $clicked.attr('href').slice(1)
    // TODO: add class/remove class
    $year = $('#' + idSelected)
    $year.addClass('current').siblings().removeClass('current')
  });

  // Dynamic year in footer
  var currentDate = new Date;
  $('#current-year').text(
      currentDate.getFullYear()
  );
});