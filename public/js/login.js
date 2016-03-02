$(document).ready(function () {
	/* Initially disable the sign up button -> enables when input fields are filled */
	$("#create").css('background-color', 'gray');
	$("#create").attr('disabled', 'disabled');
	$("#create").addClass('disabled');

	/* Initially disable the sign in button -> enables when input fields are filled */
	$("#signin").css('background-color', 'gray');
	$("#signin").attr('disabled', 'disabled');
	$("#signin").addClass('disabled');

	/* Used to check if login credentials are valid */
	$("#name").keyup(checkLoginInputs);
	$("#password").keyup(checkLoginInputs);

	/* Used to check if passwords match, both must be stated to have backwards checking */
	$("#signup_email").keyup(checkPasswordMatch);
	$("#signup_password_confirm").keyup(checkPasswordMatch);
	$("#signup_password").keyup(checkPasswordMatch);

	/* UX when new user is clicked -> slides out input fields for registering accnt */
	$("#signup").click(function(){
		$("#firstInputs").slideUp(1200);
		$("#register").slideDown(1200);
		$("#signin").text("Log in");
		$("#signup_account").slideDown(1200);
		$('#signin').css('background-color', '#4CAF50');
		$('#signin').removeAttr('disabled');
		$('#signin').removeClass('disabled');
	});
	
	/* When Log in is pressed then go back to the log in inputs */
	$("#signin").click(function(){
		if( $("#signin").text() == "Log in" )
		{
			var email = $("#name").val();
			var password = $("#password").val();

			$("#signin").css('background-color', 'gray');
			$("#signin").attr('disabled', 'disabled');
			$("#signin").addClass('disabled');

			/* Small bug when u prefill login credentials and then press login 
				-> logs in before animation finishes -> even if it is incorrect -> refreshes page
				Need to check if email and password match and give error instead of refresh page. 
			*/
			if( validateEmail(email) && password !== ""  ){
				$('#signin').css('background-color', '#4CAF50');
				$('#signin').removeAttr('disabled');
				$('#signin').removeClass('disabled');
			}
			$("#register").slideUp(1200);
			$("#signin").text("Sign in");	
			$("#firstInputs").slideDown(1200);
			$(".signup_view").slideUp(1200);
		}
	});	
});

/* This is made to check if the log in credentials are filled out */
function checkLoginInputs(){
	var password = $("#password").val();
	var email = $("#name").val();

	/* If blank then disable the button */
	if(password === "" || email === ""){
		$('#signin').css('background-color', 'gray');
		$("#signin").attr('disabled', 'disabled');
		$('#signin').addClass('disabled');
		return false;
	}
	/* only enable if the email is valid and password is not blank */
	else if(password !== "" && validateEmail(email)){
		$('#signin').css('background-color', '#4CAF50');
		$('#signin').removeAttr('disabled');
		$('#signin').removeClass('disabled');
		return true;
	}
}


function checkPasswordMatch() {
	var password = $("#signup_password").val();
	var confirmPassword = $("#signup_password_confirm").val();
	var email = $("#signup_email").val();
	var flag = false;
	
	/* Checks to see if passwords match -> if not then keep sign up button gray */
	if (password !== confirmPassword){
		$("#divCheckPasswordMatch").html("Passwords do not match!");
		$('#create').css('background-color', 'gray');
		$("#create").attr('disabled', 'disabled');
		$('#create').addClass('disabled');
	}
	/* Checks to see if the passwords are blank if so -> keep sign up as blank since not valid pass */
	else if (password == "" && confirmPassword == ""){	
		$("#divCheckPasswordMatch").html("");
		$('#create').css('background-color', 'gray');
		$("#create").attr('disabled', 'disabled');
		$('#create').addClass('disabled');
	}
	/* This checks to see if the passwords match AND if the email is valid. -> enables sign up button if so */
	else{
		$("#divCheckPasswordMatch").html("Passwords match.");
		if ( email !== "" && validateEmail(email)){		
			var flag = true;
			$('#create').css('background-color', '#4CAF50');
			$('#create').removeAttr('disabled');
			$('#create').removeClass('disabled');
		}
		else{
			$("#divCheckPasswordMatch").html("Email field must be properly filled.");
			$('#create').css('background-color', 'gray');
			$("#create").attr('disabled', 'disabled');
			$('#create').addClass('disabled');
		}
	}
}

/* Checks with regular expressions if the email is valid */
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}