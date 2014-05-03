/* global Firebase, $, toastr */
(function(){
  'use strict';
  function addNewParticipant(participantObj) {
    toastr.info('Submitting your form…');
    var coursesDB = new Firebase('https://sudodoki.firebaseio.com/kottans');
    coursesDB.push(participantObj, function onComplete(err){
      if (err) { return toastr.error('Sorry, an error occurred');}
      toastr.success('Your form was successfully submitted! Just you wait some news from us.');
      return $('#new_participant')[0].reset();
    });
  }
  $('#new_participant').on('submit', function(e){
    e.preventDefault();
    // transforming form to object, each field -> key in object
    var paramObj = {};
    $.each($(this).serializeArray(), function(_, kv) {
      if (paramObj.hasOwnProperty(kv.name)) {
        paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
        paramObj[kv.name].push(kv.value);
      }
      else {
        paramObj[kv.name] = kv.value;
      }
    });
    addNewParticipant(paramObj);
  });
})();