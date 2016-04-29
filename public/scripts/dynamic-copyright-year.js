$(function () {
    'use strict';

    var currentDate = new Date();
    $('#current-year').text(
        currentDate.getFullYear()
    );
});