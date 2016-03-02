function initializePage() {
	var loadDate = new Date();

	$('#signup').on('click', function(event) {
		var now = new Date();
		var elapsed = now - loadDate;
		ga('send', 'timing', 'signup', 'click', elapsed);
	}
}