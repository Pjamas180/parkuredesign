function initializePage() {
	var loadDate = new Date();

	$('#signup').click(function(event) {
		console.log("signup clicked");
		var now = new Date();
		var elapsed = now - loadDate;
		ga('send', 'timing', 'signup', 'click', elapsed);
	});
}