$(document).ready(function () {
	$("#signup_password_confirm").keyup(checkPasswordMatch);
	$("#signup_password").keyup(checkPasswordMatch);

	$("#signup").click(function(){
		/*$("#firstInputs").css("display", "none");*/
		$("#firstInputs").slideUp(1200);
		$("#register").slideDown(1200);
		$("#signin").text("Log in");
		$("#signup_account").slideDown(1200);
	});

	$("#signin").click(function(){
		if( $("#signin").text() == "Log in" )
		{
			$("#register").slideUp(1200);
			$("#signin").text("Sign in");	
			$("#firstInputs").slideDown(1200);
			$(".signup_view").slideUp(1200);
		}
	});	

	$("#create").click(function(){
		if( $("#signup_email") == "" )
			$("#emailChecker").html("Email field is required.");
	});
});

function checkPasswordMatch() {
	var password = $("#signup_password").val();
	var confirmPassword = $("#signup_password_confirm").val();
	var flag = false;

	if (password !== confirmPassword)
		$("#divCheckPasswordMatch").html("Passwords do not match!");
	else if (password == "" && confirmPassword == "")
		$("#divCheckPasswordMatch").html("");
	else{
		$("#divCheckPasswordMatch").html("Passwords match.");
		var flag = true;
	}
}