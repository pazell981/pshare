$(document).ready(function (){
	$(".tw-text").mouseenter(function (){
		$(".twitter-circle").animate({left: "50px"});
		$(".google-circle").animate({left: "25px"});
		$(".facebook-circle").animate({left: "100px"});
	});
	$(".tw-click").mouseleave(function (){
		$(".twitter-circle").animate({left: "75px"});
		$(".google-circle").animate({left: "150px"});
		$(".facebook-circle").animate({left: "225px"});
	});
	$(".go-text").mouseenter(function (){
		$(".google-circle").animate({left: "75px"});
		$(".facebook-circle").animate({left: "100px"});
	});
	$(".go-click").mouseleave(function (){
		$(".google-circle").animate({left: "150px"});
		$(".facebook-circle").animate({left: "225px"});
	});
	$(".fb-text").mouseenter(function (){
		$(".facebook-circle").animate({left: "150px"});
	});
	$(".fb-click").mouseleave(function (){
		$(".facebook-circle").animate({left: "225px"});
	});
})