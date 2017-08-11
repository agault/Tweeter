
$( document ).ready(function() {
  const MAX_LENGTH = 140;
    $("#textBox").keyup( function() {
      var end = MAX_LENGTH - $(this).val().length;
    if (end < 0){
      $('span.counter').css("color", "#ff4c4c");
    } else {
      $('span.counter').css("color", "#244751");
    }
    $('span.counter').text(end);
  })
});
