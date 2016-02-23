 $(document).ready(function () {
	// Dropdown Menu
	var dropdown = document.querySelectorAll('.dropdown');
	var dropdownArray = Array.prototype.slice.call(dropdown,0);
	dropdownArray.forEach(function(el){
		var button = el.querySelector('a[data-toggle="dropdown"]'),
				menu = el.querySelector('.dropdown-menu'),
				arrow = button.querySelector('i.icon-arrow');

		button.onclick = function(event) {
			if(!menu.hasClass('show')) {
				menu.classList.add('show');
				menu.classList.remove('hide');
				arrow.classList.add('open');
				arrow.classList.remove('close');
				event.preventDefault();
			}
			else {
				menu.classList.remove('show');
				menu.classList.add('hide');
				arrow.classList.remove('open');
				arrow.classList.add('close');
				event.preventDefault();
			}
		};
	});
	jQuery('#dropdown-menu').on('keyup change', function() {
	var flag = false;
	  $('#dropdown-menu').each(function() {
	       if($(this).val()=="") {
	         flag = true;
	         return false;
	       }
	  });

	 jQuery('#custom-submit-input').prop('disabled', flag);

	});

	$('.cd-select').click(function(e) {
      if( $(this).children('.cd-select').hasClass('is-hidden') ){
        $(".cd-select").addClass('is-hidden');
        $(this).children('.cd-select').removeClass('is-hidden'); 
      } else {
        $(".cd-select").addClass('is-hidden');         
      }          
    });
  $('.Navigation-listItem .Navigation-list.is-dropdown').click(function(e) {
    e.stopPropagation();
  });

	Element.prototype.hasClass = function(className) {
	    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
	};
});