$(document).ready(function (){
	$("#twitter-circle").mouseenter(function (){
		$("#twitter-circle").animate({marginRight: "0px"});
		$("#google-circle").animate({marginRight: "25px"});
		$("#facebook-circle").animate({marginRight: "-150px"});
	});
	$("#twitter-circle").mouseleave(function (){
		$("#twitter-circle").animate({marginRight: "-75px"});
		$("#google-circle").animate({marginRight: "-250px"});
		$("#facebook-circle").animate({marginRight: "-420px"});
	});
	$("#google-circle").mouseenter(function (){
		$("#google-circle").animate({marginRight: "-80px"});
		$("#facebook-circle").animate({marginRight: "-150px"});
	});
	$("#google-circle").mouseleave(function (){
		$("#google-circle").animate({marginRight: "-250px"});
		$("#facebook-circle").animate({marginRight: "-420px"});
	});
	$("#facebook-circle").mouseenter(function (){
		$("#facebook-circle").animate({marginRight: "-250px"});
	});
	$("#facebook-circle").mouseleave(function (){
		$("#facebook-circle").animate({marginRight: "-420px"});
	});
})