
$(function(){
  $("#typed").typed({
       strings: ['Let\'s find you a place to eat!^2000',
        "Type in your address from the location bar below ^2000",
        "Check out the restaurant ratings, reviews, photos and directions.",
        "Bon Appetit.^3000"
         ],
      //stringsElement: $('#typed-strings'),


      // typing speed
      typeSpeed: 20,
      // time before typing starts
      startDelay: 200,
      // time before backspacing
      backDelay: 400,
      // backspacing speed
      backSpeed: 10,

      // show cursor
      showCursor: true,
      loop: true,
      contentType: 'html', // or text
      // defaults to false for infinite loop
      loopCount: false,

  });


});




