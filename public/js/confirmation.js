$('button.confirmation').click(function(){
	var confirm = $(this);
	prompt(confirm);
});

function prompt(confirm){
	swal({   
		title: "Confirm payment",   
		text: "Are you sure you want to purchase this pass?"/* + $('#spot').val()*/,   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "Confirm",
		cancelButtonText: "Decline",
		closeOnConfirm: false,
		closeOnCancel: false,
		allowOutsideClick: false 
	}, function(isConfirm){   
		if (isConfirm) {     
			swal({   
				title: "Choose a payment method",   
				text: "",   
				type: "input",   
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",   
				cancelButtonText: "Cancel",   
				closeOnConfirm: false,   
				animation: "slide-from-top",   
				inputPlaceholder: "Write something"	 }, 
				function(inputValue){
					if(isConfirm){
						if (inputValue === false) return false;
						if (inputValue === "") {     
							swal.showInputError("You need to write something!");     
							return false   
						}      
						swal("Confirmed!", "Transaction was processed!", "success");
					}
				});
		} 
		else {     
			swal("Declined!", "Transaction was not processed!", "error");   
		} 
	});
}