$(document).ready(function() {
	window.viewportUnitsBuggyfill.init();	
	new WOW().init();
	fix();
 	menu();
 	books();
 	form();
});

function fix() {

	$(window).resize(function(){

		// Menu
		$(window).scroll(function() {
			if($(window).scrollTop() > $("#about").offset().top-300) {
				$("#menu").show();
				$("header .logo").hide();				
			}
			else {
				$("#menu").hide();
				$("header .logo").show();				
			}
		});

		$("nav li a").click(function() {
			$(".navbar-toggle").trigger("click");
		});

		// Header

	    $("header .logo").css({
	        top: ($(window).height() - $("header .logo").outerHeight())/2,
	        left: ($(window).width() - $("header .logo").outerWidth())/2
	    });

	    // Team

	    $("#team .member .photo").height($("#team .member .photo").width());

	    // Busta

	    $("#team .busta .top").height($("#team .busta .top").width());


	});
	$(window).resize();

}

function menu() {

	$("#menu ul li a").each(function(index, element) {

		var id = $(element).attr('id');
		var href = $(element).attr('href');

		$(window).scroll(function () {
			if($(window).scrollTop() > $(href).offset().top) {

				if($(window).scrollTop() > $("#about").offset().top-100) {
					$(".pallino").css("border-color", "#fff");
					$(".pallino + p").css("color", "#fff");
					$("#pallini li > a.pallino:hover").css("background", "#fff");

					$(".pallino").css("background", "none").removeClass("selected")
					$("#"+id).addClass("selected").css("background-color", "#fff");				
				}

				if($(window).scrollTop() > $("#magazine").offset().top-100) {
					$(".pallino").css("border-color", "#202326");
					$(".pallino + p").css("color", "#202326");
					$("#pallini li > a.pallino:hover").css("background", "#202326");

					$(".pallino").css("background", "none").removeClass("selected")
					$("#"+id).addClass("selected").css("background-color", "#202326");
				}			
				
				if($(window).scrollTop() > $(".bg2").offset().top-100) {
					$(".pallino").css("border-color", "#fff");
					$(".pallino + p").css("color", "#fff");
					$("#pallini li > a.pallino:hover").css("background", "#fff");

					$(".pallino").css("background", "none").removeClass("selected")
					$("#"+id).addClass("selected").css("background-color", "#fff");
				}		

				if($(window).scrollTop() > $("#blog").offset().top-100) {
					$(".pallino").css("border-color", "#202326");
					$(".pallino + p").css("color", "#202326");
					$("#pallini li > a.pallino:hover").css("background", "#202326");

					$(".pallino").css("background", "none").removeClass("selected")
					$("#"+id).addClass("selected").css("background-color", "#202326");
				}		

				if($(window).scrollTop() > $("#team").offset().top-100) {
					$(".pallino").css("border-color", "#fff");
					$(".pallino + p").css("color", "#fff");
					$("#pallini li > a.pallino:hover").css("background", "#fff");

					$(".pallino").css("background", "none").removeClass("selected")
					$("#"+id).addClass("selected").css("background-color", "#fff");
				}	

				if($(window).scrollTop() > $("#contact").offset().top-100) {
					$(".pallino").css("border-color", "#202326");
					$(".pallino + p").css("color", "#202326");
					$("#pallini li > a.pallino:hover").css("background", "#202326");

					$(".pallino").css("background", "none").removeClass("selected")
					$("#"+id).addClass("selected").css("background-color", "#202326");
				}		
			}
		});

	});

	$("#menu ul li a").each(function(index, element) {

		$(this).click(function() {

		  	var id = $(element).attr('id');
		  	var href = $(element).attr('href');

			$('html, body').animate({
			    scrollTop: ($(href).offset().top-200)
			},2000);
			

		});

	});

}

function books() {

	$("#writers1-button").click(function() {	
		$("#writers1").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});
		$("#writers0").hide();
		$(".book0").css("margin-top","200px");
		$("#press").css("margin-top","0px");					
	});
	$("#writers0-button").click(function() {
		$("#writers0").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});		
		$("#writers1").slideUp();		
		$(".book0").css("margin-top","0px");	
		$("#press").css("margin-top","200px");			
	});
}

function form() {

    var form = $('#form');
    var formMessages = $('#email-status p');	

    $(form).submit(function(event) {
    	event.preventDefault();

		$("#email-loading").show();

    	var formData = $(form).serialize();
    	$.ajax({
		    type: 'POST',
		    url: $(form).attr('action'),
		    data: formData
		})

		.done(function(response) {

			$("#email-loading").hide();
			$("#email-status").show();

		    $("#email-status").removeClass('alert-error');
		    $("#email-status").addClass('alert-success');

		    $(formMessages).text("Grazie! La tua mail è stata inviata");

		    $('#name').val('');
		    $('#email').val('');
		    $('#message').val('');
		})

		.fail(function(data) {

			$("#email-loading").hide();
			$("#email-status").show();

		    $("#email-status").removeClass('alert-success');
		    $("#email-status").addClass('alert-error');

		    $(formMessages).text('Si è verificato un errore! Email non inviata.');

		});

	});
}