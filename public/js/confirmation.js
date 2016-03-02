$('button.confirmation').click(function(){
	var confirm = $(this);
	prompt(confirm);
});

function prompt(confirm){
	swal({   
		title: "Confirm payment",   
		text: "Are you sure you want to purchase this pass?",   
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085D6",   
		cancelButtonColor: "#DD6B55",
		confirmButtonText: "Confirm",
		cancelButtonText: "Decline",
		closeOnConfirm: false,
		closeOnCancel: false,
		allowOutsideClick: false,
		allowEscapeKey: true
	}, function(isConfirm){   
		if (isConfirm) {
			swal({
				title: 'Sweet!',
				html: 'This will redirect you to PayPal for completion.<br>Be aware of blocked pop-ups.', 
				imageUrl: 'images/thumbs-up.jpg',
				animation: true,
				showCancelButton: true,
				cancelButtonColor: "#DD6B55"
				}, function (isConfirm) {
					if(isConfirm){
						window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=LWHJW82U99LPU&lc=US&item_name=UCSD%20Permits&amount=1%2e25&currency_code=USD&button_subtype=services&no_note=0&cn=Add%20special%20instructions%20to%20the%20seller%3a&no_shipping=2&tax_rate=0%2e000&shipping=0%2e00&bn=PP%2dBuyNowBF%3abtn_paynowCC_LG%2egif%3aNonHosted, _blank');
					}
    			});
		} 	
		else {     
			swal("Declined!", "Transaction was not processed!", "error");   
		} 
	});
}