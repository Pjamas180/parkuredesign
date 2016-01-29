
$('input').focusin(function() {
	$('label').transition({x:'80px'},500,'ease').next()
	.transition({x:'5px'},500, 'ease');
});

//setTimeout needed for Chrome, for some reson there is no animation from left to right, the pen is immediately present.
setTimeout(function(){
	$('label').next().addClass('move-pen');
	},100);
});

$('input').focusout(function() {
	$('label').transition({x:'0px'},500,'ease').next()
	.transition({x:'-100px'},500, 'ease').removeClass('move-pen');
});