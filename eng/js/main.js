$(document).ready(function() {
	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});

	// Waypoints
	$('.work').waypoint(function() {
		$('.work').addClass('animated fadeIn');
	}, {
		offset: '75%'
	});
	$('.download').waypoint(function() {
		$('.download .btn').addClass('animated tada');
	}, {
		offset: '75%'
	});

	// Fancybox
	$('.work-box').fancybox();

	// Flexslider
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
	});

	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});	
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
});



// ########## waitme.min.js - loading spinner [Begin] ##########
var bodySpinner = {
	on: function(){
		run_waitMe($('body'), 1, 'pulse');
	},
	off: function(){
		$('body').waitMe('hide');
	}
};

function run_waitMe(el, num, effect){
	text = 'Please wait...';
	fontSize = '';
	switch (num) {
		case 1:
			maxSize = '';
			textPos = 'vertical';
		break;
		case 2:
			text = '';
			maxSize = 30;
			textPos = 'vertical';
		break;
		case 3:
			maxSize = 30;
			textPos = 'horizontal';
			fontSize = '18px';
		break;
	}
	el.waitMe({
		effect: effect,
		text: text,
		bg: 'rgba(255,255,255,0.7)',
		color: '#000',
		maxSize: maxSize,
		waitTime: -1,
		source: 'img.svg',
		textPos: textPos,
		fontSize: fontSize,
		onClose: function(el) {}
	});
}
// ########## waitme.min.js [End] ##########

// 뉴스레터 이메일 수집 관련 함수 [begin]
var newsletter_onoff = {
    on: function(){
        $('#newsletterPopup').fadeIn(100);
    },
    off: function(){
        $('#newsletterPopup').fadeOut(100);
    }
}

function newsletter_submit(){
    var email = $('#newsletter_email').val();
    if(!email || email=='undefined' ||email==undefined){
        alert('Please enter your email.');
        return false;
    }

    call_api_newsletter(email);
}

function call_api_newsletter(email){
    bodySpinner.on();
    $.ajax({
        type : "POST",
        url : "/eng/api_newsletter.php",
        dataType : "json",
        data: {email: email},
        error : function(e){
            bodySpinner.off();
            alert('Error');
        },
        success : function(data){
            bodySpinner.off();
            if(data.status && data.successMsg){
                alert(data.successMsg);
                newsletter_onoff.off();
                $('#newsletter_email').val('');
            }else{
                if(data.errorMsg)
                    alert(data.errorMsg);
                else
                    alert('Error');
            }
        }
    });
}
// 뉴스레터 이메일 수집 관련 함수 [End]