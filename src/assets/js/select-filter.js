$(document).ready(function(){

	$(document).keypress(function (e) {

		if( $('.e_select select[class=selected]').length > 0 ){

      var value = String.fromCharCode(e.which || e.keyCode);
      
      if( (e.which || e.keyCode) == 105)
      	value = "İ";

			$(".hint_select ul li").each(function() {

        if ($(this).text()[0].match( new RegExp(value, 'i') ) ) {
        /*if ($(this).text()[0].toUpperCase().search(value) > -1) {*/

          var y = $(this).parent().find('li:first').position();
      	  var x = $(this).position();
          $(this).parent().animate({
            scrollTop: (x.top-y.top)
          }, 'fast');

	        /*$(this).parent().animate({
					     scrollTop: $(this).position().top
					}, 'slow');*/
          $(this).select();
          return false;

        }
      });  

		}         

  });

});