$(document).ready(function () {

	$('#logo').click(function() {
		console.log("logo clicked");
		ga('send', 'event', 'logo_click', 'click');
	});
	/*
	$('#logo').on('click', function(event) {
		console.log("logo clicked");
		ga('send', 'event', 'logo_click', 'click');
	})
	*/

});