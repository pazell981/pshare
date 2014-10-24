$(document).ready(function (){
	$(".tw-click").mouseenter(function (){
		$("#twitter-circle").animate({marginRight: "0px"});
		$("#google-circle").animate({marginRight: "25px"});
		$("#facebook-circle").animate({marginRight: "-150px"});
	});
	$(".tw-click").mouseleave(function (){
		$("#twitter-circle").animate({marginRight: "-75px"});
		$("#google-circle").animate({marginRight: "-250px"});
		$("#facebook-circle").animate({marginRight: "-420px"});
	});
	$(".go-click").mouseenter(function (){
		$("#google-circle").animate({marginRight: "-80px"});
		$("#facebook-circle").animate({marginRight: "-150px"});
	});
	$(".go-click").mouseleave(function (){
		$("#google-circle").animate({marginRight: "-250px"});
		$("#facebook-circle").animate({marginRight: "-420px"});
	});
	$(".fb-click").mouseenter(function (){
		$("#facebook-circle").animate({marginRight: "-250px"});
	});
	$(".fb-click").mouseleave(function (){
		$("#facebook-circle").animate({marginRight: "-420px"});
	});
})