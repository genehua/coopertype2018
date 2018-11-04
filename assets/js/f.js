$(document).ready(function(e){
  var mousePos = 0;

  // initizalize grey bars
  setGrey();

  // check if on home page
  if ($('.home').length) {

    // change backgrounds based on orientation
    if (window.DeviceOrientationEvent) {

      function handleOrientation(e){

        // remove transition after initial fade in
        if ($('.home-post-item').hasClass('pre-mouse-move')) {
          setTimeout(function(){
            $('.home-post-item').removeClass('pre-mouse-move');
          }, 300);
        };
        var xPos = e.gamma;
        xPos = Math.round(e.gamma);

        var sensitivity = 40;
        if (xPos < sensitivity && xPos > -sensitivity) {
          mousePos = (xPos + sensitivity) / (sensitivity*2);
        }
        if (xPos > sensitivity) {
          mousePos = 1;
        }
        if (xPos < -sensitivity) {
          mousePos = 0;
        }

        $('#mousePos').html(mousePos);
        $('#alpha').html(xPos);

        setGrey();

        console.log(mousePos);
      };
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    // on desktop, change backgrounds based on mouse
    $(window).on('mousemove', function(e){
      // remove transition after initial fade in
      if ($('.home-post-item').hasClass('pre-mouse-move')) {
        setTimeout(function(){
          $('.home-post-item').removeClass('pre-mouse-move');
        }, 300);
      };

      // set mouse position as ratio of screen width
      var xPos = e.clientX;
      var w = $(window).width();
      mousePos = (xPos / w);
      setGrey();
    });

  }

  // get values of grey bar backgrounds
  function setGrey(){
    var vw = $(window).width();

    if (vw > 1023) {
      $('.home-post-item').each(function(i){
        // set grey value according to absolute value function
        // + 0.5 to center mouse within container
        var value = 100 - Math.abs(10*(i - (mousePos*10) + 0.5));
        $(this).css('background-color', 'hsl(0,0%,' + value + '%)');
      });
    }

    if (vw <= 1023) {
      $('.home-post-item').each(function(i){
        var value = 100 - Math.abs(10*((i%5) - (mousePos*5) + 0.5));
        $(this).css('background-color', 'hsl(0,0%,' + value + '%)');
      });
    }
  };


});

$(window).on('load', function() {
  $('body').addClass('js-loaded');
});
