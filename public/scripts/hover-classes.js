/* global $ */
$(function(){
  'use strict';
  $('label:has("input[name=\'courses\']")')
    .on('mouseenter', function () {
      var $this = $(this),
        name = $this.children('input').val(),
        container = $this.closest('form');
      container
        .removeClass('js-hover ruby-hover java-hover')
        .addClass(name + '-hover');
    })
    .on('mouseleave', function () {
      $(this).closest('form').removeClass('js-hover ruby-hover java-hover');
    });
});