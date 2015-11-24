window['optimizely'] = window['optimizely'] || [];
function visage_load_vimeo(player) {
    if (window.addEventListener) {
        window.addEventListener('message', visage_vimeo_msg_received, false);
    } else {
        window.attachEvent('onmessage', visage_vimeo_msg_received, false);
    }
}
function visage_vimeo_msg_received(event) {
	var playerOrigin = '*';
    if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
        return false;
    }
    if (playerOrigin === '*') {
        playerOrigin = event.origin;
    }
    var data = JSON.parse(event.data);
}
function visage_vimeo_post(action, value, player) {
	var playerOrigin = '*';
    var data = {
      method: action
    };
    if (value) {
        data.value = value;
    }
    var message = JSON.stringify(data);
    player[0].contentWindow.postMessage(data, playerOrigin);
}
function visage_load_hubspot(hubFormID, trackCat, trackHook, trackName, postLink, postName, targetSelector, count) {
	if ( !count ) { count = 0; }
	hbspt.forms.create({
		portalId: '424038',
		formId: hubFormID,
		formInstanceId: count,
		target: targetSelector,
		css: '',
		requiredCSS: '',
		validationOptions: {
			formEvent: null,
			inputEvent: null,
			onBeforeFail: function() { return false; },
			onBeforeValidate: function() { return false; },
			onFail: function() { return false; }
		},
		onFormReady: function($form, ctx) {
			if ( $form.length == 0 ) {
				$form = jQuery('.guid' + hubFormID + ' form.hs-form');
			}
			var required = [], visible = [], $fields = jQuery('.hs-form-field', $form), hubCookie = visage_get_cookie('hubspotutk'), $formContainer = $form.closest('.form'), initHeight = 0;
			$fields.each(function(i, v) {
				if ( jQuery(v).css('display') !== 'none' ) {
					visible.push(v);					
				}
			});
			if ( visible.length > 2 ) {
				$formContainer.addClass('multi-input');
				jQuery('.hs_submit', $form).prepend('<h5>*Required Field</h5>');
			} else if ( visible.length === 1 ) {
				$form.removeClass('hs-form').closest('.form').addClass('single-input');
				jQuery('.hs_submit', $form).detach().appendTo(jQuery(visible).last());
			} else if ( visible.length === 2 ) {
				$form.removeClass('hs-form').closest('.form').addClass('single-input double-down');
				//jQuery('.hs_submit', $form).append('<h5>*Required Field</h5>');
			}
			jQuery('input, textarea', $form).focus(function() { jQuery(this).addClass('focused'); });
			jQuery('.actions', $form).find('input').each(function() { jQuery(this).attr('data-default-text', jQuery(this).val() ).attr('data-action-text', 'Sending'); });
			jQuery('input[type=submit]', $form).addClass('button');
			jQuery('.input', $form).has('select').addClass('select').each(function() {
				var placeholder = jQuery(this).find('option[value="__PLACEHOLDER__"]').text();
				if ( placeholder !== undefined ) {
					jQuery(this).find('option[value="__PLACEHOLDER__"]').val('').text('');
					jQuery(this).find('select').attr('placeholder', placeholder ).attr('data-placeholder', placeholder );
				}
				jQuery(this).find('select').chosen({ disable_search: true, width: '100%' });
			});
			jQuery('.input', $form).find('select[required], input[required], textarea[required]').each(function() {
				var placeholder = jQuery(this).attr('placeholder');
				required.push(jQuery(this).attr('name'));
				if ( placeholder !== undefined ) {
					if ( jQuery(this).attr('name').indexOf('email') > -1 ) {
						jQuery(this).attr('data-val-email', 'The email address is invalid.');
					}
					jQuery(this).attr('data-val-required', 'The ' + placeholder.substr(0, placeholder.length-1) + ' field is required.');
				} else {
					jQuery(this).attr('data-val-required', 'A required field below is blank.');
				}
			});
			jQuery('.inputs-list', $form).find('li').addClass('input').find('input').each(function() {
				if ( jQuery(this).prop('checked') ) {
					jQuery(this).closest('label').addClass('checked');
				}
				jQuery(this).change(function() {
					if ( jQuery(this).prop('checked') ) {
						jQuery(this).closest('label').addClass('checked')
					} else {
						jQuery(this).closest('label').removeClass('checked')
					}
				});
			});
			$form.append('<input type="hidden" value="' + required.join(', ') + '" name="required" />');
			$form.append('<input type="hidden" value="' + $form.attr('action') + '" name="visage_endpoint" />');
			$form.append('<input type="hidden" value="' + postLink + '" name="page_url" />');
			$form.append('<input type="hidden" value="' + postName + '" name="page_name" />');
			$form.append('<input type="hidden" value="' + trackCat + '" name="tracking_cat" />');
			$form.append('<input type="hidden" value="' + trackHook + '" name="tracking_hook" />');
			$form.append('<input type="hidden" value="' + trackName + '" name="tracking_name" />');
			$form.append('<input type="hidden" value="' + hubCookie + '" name="hub_cookie" />');
			jQuery('input, select, textarea', $form).focus(function() {
				jQuery(this).closest('.input, .select').addClass('focused');
			});
			$form.addClass('dynamic-form').submit(function(e) {
				e.preventDefault();
				if ( hubCookie == '' ) {
					hubCookie = visage_get_cookie('hubspotutk');
					jQuery('input[name=hub_cookie]', $form).val(hubCookie);
				}
				var $button = jQuery('input[type=submit]', $form),
					$errors = jQuery('.error-message', $formContainer),
					values = $form.serialize(),
					tracking_cat = jQuery('input[name=tracking_cat]', $form).val(),
					tracking_hook = jQuery('input[name=tracking_hook]', $form).val(),
					tracking_name = jQuery('input[name=tracking_name]', $form).val(),
					signup_email_pass_key = jQuery('input[name=signup_email_pass_key]', $form).val();
				if ( tracking_cat !== 'Mktg Form Submit' ) {
					tracking_cat = tracking_cat;
				}
				jQuery('.focused', $form).removeClass('focused');
				jQuery('.input, .select', $form).removeClass('error');
				if ( !$button.hasClass('disabled') ) {
					$form.addClass('loading');
					$errors.addClass('hide');
					$button.val($button.data('action-text')).addClass('disabled');
					jQuery.post( Visage_Comment_Ajax.url, { action: 'visage_post_hubspot', data: values, nonce: Visage_Comment_Ajax.nonce }, function( response ) {
						var segmentOptions = {};
						if ( response.success ) {
							jQuery('li', $errors).remove();
							$form.removeClass('loading').addClass('finished');
							jQuery('.success-message', $formContainer).removeClass('hide');
							$button.val('Success');
							if (typeof analytics !== 'undefined') {
								if ( typeof Segment_Vars !== 'undefined' ) {
									if ( Segment_Vars.options ) {
										segmentOptions = Segment_Vars.options;
									}
								}
								analytics.track(tracking_hook, {category: tracking_cat, label: tracking_name}, segmentOptions);
							} else {
								console.log('Category: '+tracking_cat, 'Action: '+tracking_hook, 'Label:' +tracking_name);
							}
							window.optimizely.push(['trackEvent', tracking_hook]);
							if ( signup_email_pass_key === 'J0N53N') {
								var signup_email = jQuery('input[name=email]', $form).val();
								$email_pass_form = jQuery("<form action='http://create.visage.co/signup/' method='post'><input name='signup_email' type='hidden' value='" + signup_email + "' /></form>");
								jQuery('body').append($email_pass_form);
								$email_pass_form.trigger('submit');
							}
							// LEAVE NO EVIDENCE!
							//setTimeout(function() {
							//	$formContainer.removeClass('display');
							//	$formContainer.height(0);
							//}, 3600);
						} else {
							jQuery('li', $errors).remove();
							$errors.addClass('hide');
							$form.removeClass('loading');
							$button.val($button.data('default-text')).removeClass('disabled');
							if ( response.error ) {
								for ( key in response.error ) {
									var $input = jQuery('#'+key, $form);
									if ($input.length == 0) { $input = jQuery('[name='+key+']', $form); }
									$errors.append('<li>' + $input.data('val-'+response.error[key]) + '</li>');
									$input.parent().addClass('error');
									$errors.removeClass('hide');
								}
							} else {
								jQuery('li', $errors).remove();
								$errors.addClass('hide');
								$form.removeClass('loading').addClass('finished');
								jQuery('.critical-error-message', $formContainer).removeClass('hide');
								$button.val('Failure');
							}
						}
					});
				}
				return false;
			});
			$formContainer.addClass('loaded');
			initHeight = $formContainer.height();
			$formContainer.height(0);
			setTimeout(function() {
				$formContainer.height(initHeight);
			}, 0);
			setTimeout(function() {
				$formContainer.addClass('display');
			}, 150);
		}
	});
}
function visage_center_grid_hangers() {
    function getWidthPercentage($el, n) {
        var parentWidth, percent, width;
        width = $el.outerWidth() * n;
        parentWidth = $el.parent().outerWidth();
        return percent = 100 * (width / parentWidth) / 2;
    };
    jQuery('ul[class*=-block-grid-]').each(function (i, el) {
        var $liLastRow, $lis, $ul, length, multiplier, re_s, re_m, re_l, re, remainder, rowSet, rowCount, str, width;
        $ul = jQuery(el);
        $lis = $ul.find('li');
        str = $ul.attr('class');
        re_s = /small-block-grid\-(\d+)\b/i;
        re_m = /medium-block-grid\-(\d+)\b/i;
        re_l = /large-block-grid\-(\d+)\b/i;
        re = re_s;
        if ( jQuery(window).width() >= 640 ) {
	        re = re_m;
        }
        if ( jQuery(window).width() >= 1024 ) {
	        re = re_l;
        }
       	rowSet = str.match(re);
       	if ( rowSet ) {
       		rowCount = rowSet[1];
       	} else {
	       	rowCount = 1;
       	}
        length = $lis.length;
        remainder = length % rowCount;
        if (remainder > 0) {
            $liLastRow = jQuery($lis.slice(-remainder));
            multiplier = rowCount - remainder;
            width = getWidthPercentage($lis, multiplier);
            $liLastRow.first().css({ 'margin-left': width + '%' });
        } else {
            $lis.css({ 'margin-left': '' });
        }
    });
}

function visage_write_cookie( n, v, l, p, d ) {
	var date,expires,path,domain;
	if ( l ) {
		date = new Date();
		date.setTime( date.getTime() + (l*1000) );
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	if ( p ) {
		path = "; path=" + p;
	} else {
		path = "; path=/";
	}
	if ( d ) {
		domain = "; domain=" + d;
	} else {
		domain = "";
	}
	document.cookie = n + "=" + v + expires + path + domain;
}
function visage_get_cookie( n ) {
    var name = n + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function visage_slider(id, offset){
	var offset = offset || 0, buffer = 70, $slide_to;
	if ( jQuery('body').hasClass('admin-bar') ) { buffer = buffer+32 }
	if ( typeof(id) === 'string' ) { $slide_to = jQuery(id); } else { $slide_to = id; }
	jQuery('html,body').animate({scrollTop: $slide_to.offset().top-buffer-offset+'px'}, 'slow');
}
function visage_generate_forms($object) {
	$object.each(function(i,v) {
		$target = jQuery(this);
		count = i;
		targetSelector = '#'+$target.attr('id');
		hubFormID = $target.data('hubspot-form');
		trackCat = $target.data('tracking-cat');
		trackHook = $target.data('tracking-hook');
		trackName = $target.data('tracking-name');
		postLink = $target.data('post-permalink');
		postName = $target.data('post-title');
		visage_load_hubspot(hubFormID, trackCat, trackHook, trackName, postLink, postName, targetSelector, count)
	});
}

jQuery(document).ready(function($) {
	function visage_init_comments() {
		var $packery = $('.packery'), $commentform = $('#commentform');
		if ( $commentform.length > 0 ) {
			$respond = $('#respond');
			$commentnew = $('#comment-new');
			$commentajax = $('#comment-ajax');
			$commentajax.hide();
			$commentform.submit(function(e) {
				e.preventDefault();
				$commentnew.addClass('loading');
				if ( $("#url").length > 0 ) {
					if ( $('#url').val() == 'http://' ) {
						$('#url').val('');
					}
				}
				comment = $commentform.serialize();
				$.post( Visage_Comment_Ajax.url, { action: 'visage_post_comment', data: comment, nonce: Visage_Comment_Ajax.nonce }, function( response ) {
					if ( response.success ) {
						visage_write_cookie('comment_author_' + response.cookie.hash, response.cookie.author, response.cookie.lifetime, response.cookie.path, response.cookie.domain );
						visage_write_cookie('comment_author_email_' + response.cookie.hash, response.cookie.email, response.cookie.lifetime, response.cookie.path, response.cookie.domain );
						visage_write_cookie('comment_author_url_' + response.cookie.hash, response.cookie.url, response.cookie.lifetime, response.cookie.path, response.cookie.domain );
						$commentajax.load( document.URL + ' #comment-' + response.id, function(r, s, x) {
							$commentnew.fadeOut(function() {
								$commentnew.removeClass('loading');
								$('#comment').val('Comment');
								if ( $respond.parents().hasClass('commentlist') ) {
									$('<div class="comment-outer"></div>').append( $('#comment-' + response.id ) ).insertBefore( $respond );
								} else {
									$('<div class="comment-outer"></div>').append( $('#comment-' + response.id ) ).appendTo('.commentlist');
								}
								$('#cancel-comment-reply-link').click();
								$commentnew.fadeIn(function() { $packery.packery(); });
							});
						});
					} else {
						$commentnew.removeClass('loading');
						if ( response.error ) {
							$('#error').text( response.error ).show().delay(4000).fadeOut(1000, function() {
								$(this).text('');
							});
						} else {
							$('#error').text('Submission error').show().delay(4000).fadeOut(1000, function() {
								$(this).text('');
							});
						}
					}
				});
				return false;
			});
			$('input,textarea', $commentform ).focus(function(){
				if ( $(this).attr('id') == 'author' && $(this).attr('value') == 'Name' ) { $(this).val(''); }
				if ( $(this).attr('id') == 'email' && $(this).attr('value') == 'Email' ) { $(this).val(''); }
				if ( $(this).attr('id') == 'comment' && $(this).attr('value') == 'Comment' ) { $(this).val(''); }
			}).blur(function() {
				if ( $(this).attr('value') == '') { $(this).val( $(this)[0].defaultValue ); }
			});
		}
	}
	function visage_init_minigrid() {
		minigrid('.resource-grid', '.resource-grid-item-container');
		window.addEventListener('resize', function(){
		  minigrid('.resource-grid', '.resource-grid-item-container');
		});
	}
	function visage_init_zeroclipboard() {
		var client = new ZeroClipboard($(".copy-btn"));
        var modal = $('.modal-wrapper');

        var closeModal = function(){
            modal.fadeOut(50);
        }

        client.on( 'ready', function(event) {
            client.on( 'aftercopy', function(event) {
                modal.fadeIn(100);
            });
        } );

        modal.click(closeModal);
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { closeModal(); }
        });
	}
	function visage_colorset_hover() {
        var $singleColor = $('.single-color');

		$singleColor.hover(function() {
            var $this = $(this);
			$this.siblings('.single-color').removeClass('color-active');
			$this.addClass('color-active')
		});
	}
	function visage_init_events() {
		var $hubspots = $('.hubspot-form-generator');
		var $packable = $('.portfolio-grid');
		var $quoteSlider, $brandSlider, $landingSlider;
	    var heroOffset = $('.hero').height();
	    $(document).foundation();
		$('.socialpop').click(function(e) {
			var url = $(this).attr('href'), width = 640, height = 480, top = 120, left = (screen.width/2) - (width/2);
			e.preventDefault();
			window.open(url, '', 'left='+left+' , top='+top+', width='+width+', height='+height+', personalbar=0, toolbar=0, scrollbars=1, resizable=1');
		});
		function videoCalc(iframe) {
			var width = iframe.attr('width');
			var height = iframe.attr('height');
			var scaleWidth = iframe.width();
			var scale = scaleWidth/width;
			var scaleHeight = height*scale;
			iframe.height(scaleHeight);
		}
	    function headerCalc($header) {
		    var headerHeight = $header.height();
	        var scroll = $(window).scrollTop();
	        if (scroll > (heroOffset+headerHeight)) {
	            $header.addClass('fixed');
	        } else {
	            $header.removeClass('fixed');
	        }
	    }
	    function stickyCalc($sticky) {
		    var stickyPrev = $sticky.data('prevHeight') || 0;
		    var stickyHeight = $sticky.height();
		    var stickyPos = $sticky.closest('.sticky-bottom').offset().top;
		    var $copyright = $('#copyright');
		    var copyHeight = $copyright.height();
	        var scroll = $(window).scrollTop();
	        var view = $(window).height();
		    if ( stickyPrev !== stickyHeight ) {
		    	$copyright.css({'height': copyHeight-stickyPrev+stickyHeight});
		    }
		    $sticky.data('prevHeight', stickyHeight);
	        if (scroll+view > (stickyPos+stickyHeight)) {
	            $sticky.addClass('fixed');
	        } else {
	            $sticky.removeClass('fixed');
	        }
	    }
	    $('.menu-button').click(function(e) {
		    e.preventDefault();
		    $body = $('body');
		    $clicked = $(this);
			if ( $body.hasClass('main-sidebar-active') ) {
		    	$body.removeClass('main-sidebar-active');
		    	$clicked.removeClass('close');
			} else {
		    	$body.addClass('main-sidebar-active');
		    	$clicked.addClass('close');
			}
			setTimeout(function() {
				if ( typeof $quoteSlider.refresh === 'function' ) {
					$quoteSlider.refresh();
				}
				if ( typeof $landingSlider.refresh === 'function' ) {
					$landingSlider.refresh();
				}
				if ( typeof $brandSlider.refresh === 'function' ) {
					$brandSlider.refresh();
				}
			}, 333);
	    });
	    $('#graphic-spin').vide({
			webm:Vide_Path.videos+"spin\/spin.webm",
		    mp4:Vide_Path.videos+"spin\/spin.mp4",
			ogv:Vide_Path.videos+"spin\/spin.ogv",
			poster:Vide_Path.videos+"spin\/spin.png"
		}, {
			volume:0,
			posterType:'png'
		});
	    $('.sticky-bottom').each(function() {
		    var $sticky = $('section', this);
			stickyCalc($sticky);
	    });
	    $('.main-header').each(function() {
	    	$header = $(this);
	    	headerCalc($header)
		});
	    $(window).scroll(function() {
		    $('.main-header').each(function() {
		    	$header = $(this);
		    	headerCalc($header)
			});
		    $('.sticky-bottom').each(function() {
			    var $sticky = $('section', this);
				stickyCalc($sticky);
		    });
	    });
	    visage_center_grid_hangers();
	    $(window).resize(function() {
		    visage_center_grid_hangers();
		    $('.main-header').each(function() {
		    	$header = $(this);
		    	headerCalc($header)
			});
		    $('.sticky-bottom').each(function() {
			    var $sticky = $('section', this);
				stickyCalc($sticky);
		    });
			if ( $('.modal-overlay').hasClass('active') ) {
				$iframe = $('.video-autosize', $('.modal-overlay'));
				videoCalc($iframe);
			}
	    });
		$packable.imagesLoaded(function() {
			$packable.packery({
			  itemSelector: '.item',
			  gutter: '.gutter-sizer'
			});
		});
		visage_generate_forms($hubspots);
		$(".fittext1").fitText(0.8,{ maxFontSize: '128px' });
		$(".fittext2").fitText(1.4);
		$(".fittext3").fitText(3, { minFontSize: '20px', maxFontSize: '36px' });
		$(document).on('chosen:showing_dropdown', function (e, chosen) {
			var $focusin = $(chosen.chosen.container).parent();
			$focusin.addClass('focus');
		});
		$(document).on('chosen:hiding_dropdown', function (e, chosen) {
			var $focusout = $(chosen.chosen.container).parent();
			$focusout.removeClass('focus');
		});
		$('a').click(function(e) {
			var $clicked = $(this);
			var href = $clicked.attr('href'), pos = href.indexOf('#'), hash = href.substring(pos);
			var $modal = $('.modal-overlay');
			var $iframe = $('.video-autosize', $modal);
			if ( typeof $clicked.data('ga-event') !== 'undefined' ) {
				var segmentOptions = {};
				var eventCat, eventTag, eventLabel;
				eventTag = $clicked.data('ga-event');
				if ( typeof $clicked.data('ga-cat') === 'undefined' && typeof $clicked.data('ga-label') === 'undefined' ) {
					eventCat = 'Mktg CTA Click';
				}
				if ( typeof $clicked.data('ga-cat') !== 'undefined' && eventCat !== 'Mktg CTA Click') {
					eventCat = $clicked.data('ga-cat');
				} else {
					eventCat = 'Uncategorized';
				}
				if ( typeof $clicked.data('ga-label') !== 'undefined' ) {
					eventLabel = $clicked.data('ga-label');
				} else {
					eventLabel = 'Unlabeled CTA click';
				}
				if (typeof analytics !== 'undefined') {
					if ( typeof Segment_Vars !== 'undefined' ) {
						if ( Segment_Vars.options ) {
							segmentOptions = Segment_Vars.options;
						}
					}
					analytics.track(eventTag, {category: eventCat, label: eventLabel}, segmentOptions);
				} else {
					console.log('Category: '+eventCat, 'Action: '+eventTag, 'Label:' +eventLabel);
				}
				window.optimizely.push(['trackEvent', eventTag]);
			}
			if ( $clicked.hasClass('comment-reply-link') || $clicked.attr('id') == 'cancel-comment-reply-link' ) {
				e.preventDefault();
				return;
			}
			if ( $clicked.hasClass('video-play') ) {
				e.preventDefault();
				$modal.removeClass('hidden').addClass('active');
				if ( $modal.hasClass('active') ) {
					videoCalc($iframe);
				}
				visage_vimeo_post('play', null, $iframe);
				if (typeof analytics !== 'undefined') {
					if ( typeof Segment_Vars !== 'undefined' ) {
						if ( Segment_Vars.options ) {
							segmentOptions = Segment_Vars.options;
						}
					}
					analytics.track('Watched Video', {category: 'Marketing', label: 'Watched Product Video'}, segmentOptions);
				} else {
					console.log('Category: Marketing', 'Action: Watched Video', 'Label: Watched Product Video');
				}
				return;
			}
			if ( $clicked.hasClass('video-close') ) {
				e.preventDefault();
				$modal.removeClass('active');
				setTimeout(function() {
					$modal.addClass('hidden');
					visage_vimeo_post('pause', null, $iframe);
				}, 300);
			}
			if ( pos !== -1 && hash.length > 1 && $(hash).length > 0) {
				e.preventDefault();
				visage_slider(hash);
			}
			if ( $clicked.closest('.main-sidebar').length > 0 && $(window).width() < 1025 ) {
				$('.menu-button').click();
			}
		});
	    if ( window.location.hash ) {
		    $(document).imagesLoaded(function() {
				visage_slider( window.location.hash );
		    });
		}
	    $quoteSlider = $(".quote-slider").lightSlider({
		    item:1,
		    slideMove:1,
		    pager:false,
		    loop:true,
		    slideMargin: 10,
		    enableDrag:false,
		    swipeThreshold:50
	    });
	    $brandSlider = $(".brand-slider").lightSlider({
		    item:5,
		    slideMove:5,
		    pager:false,
		    loop:false,
		    slideMargin: 10,
		    enableDrag:false,
		    swipeThreshold:50,
		    responsive: [{breakpoint:1000,settings:{item:4,slideMove:4}},{breakpoint:600,settings:{item:2,slideMove:2}}]
	    });
	    $landingSlider = $(".landing-slider").lightSlider({
		    item:3,
		    slideMove:3,
		    pager:false,
		    loop:false,
		    slideMargin: 10,
		    enableDrag:false,
		    swipeThreshold:50,
		    responsive: [{breakpoint:1000,settings:{item:2,slideMove:2}},{breakpoint:600,settings:{item:1,slideMove:1}},{breakpoint:400,settings:{item:1,slideMove:1}}]
	    });
	}
	visage_load_vimeo();
	visage_init_events();
	visage_init_comments();
	visage_init_minigrid();
	visage_init_zeroclipboard();
	visage_colorset_hover();
});
