$(document).ready(function () {

	$('#logo').on('click', function(event) {
		console.log("logo clicked");
		ga('send', 'event', 'logo_click', 'click');
	})

});