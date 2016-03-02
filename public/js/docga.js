function initializePage() {

	$('#logo').on('click', function(event) {
		ga('send', 'event', 'logo_click', 'click');
	})

}