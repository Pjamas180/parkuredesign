$(document).ready(function () {

	console.log("logo clicked");
	$('#logo').on('click', function(event) {
		ga('send', 'event', 'logo_click', 'click');
	})

});