// Generated by CoffeeScript 1.6.3
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);;
/* --------------------------------------------
     Begin globals.coffee
--------------------------------------------
*/

var $blocks, $body, $footer, $header, $html, $loadingPanel, $logo, $main, $nav, $navButton, $overlay, $wrapper, AjaxCall, Grid, Journal, closeLoading, init, loadingIcon, onOverlayScroll, onResize, onScroll, openPopup, playVideo, prevClasses, scrollTop, swapVectorImages, winH, winW;

winW = $(window).width();

winH = $(window).width();

scrollTop = $(window).scrollTop();

prevClasses = 'home blog';

loadingIcon = '<div class="loading-icon"><div class="one"></div><div class="two"></div><div class="three"></div></div>';

$html = $('html');

$body = $('body');

$loadingPanel = $('#loading-panel');

$wrapper = $('.wrapper');

$header = $('.main-header');

$logo = $('.logo');

$nav = $('nav');

$navButton = $('.nav-button');

$main = $('main');

$overlay = $('.overlay');

$blocks = $('.block');

$footer = $('.main-footer');

/* --------------------------------------------
     Begin gridblocks.coffee
--------------------------------------------
*/


Grid = {
  gridSize: function() {
    $('.grid').css({
      width: $(window).width() + 3
    });
  },
  blocksSize: function() {
    var squareSide;
    if (winW < 768) {
      this.resetBlocksSize();
    } else {
      squareSide = null;
      $('.block').each(function() {
        var $this, h;
        $this = $(this);
        if ($this.hasClass('custom')) {
          h = $this.hasClass('after') ? $this.nextAll('.block').height() : $this.prevAll('.block').height();
          $this.css('height', h);
        } else if ($this.hasClass('twitter') || $this.hasClass('empty') || $this.hasClass('short')) {
          if (!$this.hasClass('small')) {
            $this.css('height', $this.width());
          } else {
            $this.css('height', Math.floor($this.width() * 0.95, 10));
          }
        } else if ($this.hasClass('tall')) {
          $this.css('height', $this.width() * 2);
        }
      });
    }
  },
  resetBlocksSize: function() {
    $('.block').css({
      height: ''
    });
  }
};

/* --------------------------------------------
     Begin journal.coffee
--------------------------------------------
*/


Journal = {
  initGrid: function() {
    var $journalBlocks, $randJournalBlock, emptyBlocks, randBlocks;
    $journalBlocks = $('.journal-grid .block.edit:not(.empty)');
    randBlocks = Math.floor($journalBlocks.length / 3, 10);
    while (randBlocks > 0) {
      $randJournalBlock = $journalBlocks.not('.with-space').eq(Math.floor(Math.random() * $journalBlocks.length));
      emptyBlocks = 1 + Math.floor(Math.random() * 2);
      $randJournalBlock.addClass('with-space');
      while (emptyBlocks > 0) {
        $('<div class="block empty"></div>').insertAfter($randJournalBlock);
        emptyBlocks--;
      }
      randBlocks--;
    }
    $journalBlocks.removeClass('edit');
  }
};

/* --------------------------------------------
     Begin window.coffee
--------------------------------------------
*/


/* global console*/


onResize = function() {
  var $isoCont, mainStyleAttr;
  winW = $(window).width();
  winH = $(window).height();
  if (winW >= 768) {
    $nav.css({
      height: winH
    });
    if ($body.hasClass('page-say-hello')) {
      $main.css({
        height: winH
      });
    } else {
      mainStyleAttr = $('main').attr('style');
      if (typeof mainStyleAttr !== 'undefined' && mainStyleAttr !== false) {
        $main.attr('style', '');
      }
    }
  }
  if (winW > 1024) {
    $('.overlay .to-scroll > footer').appendTo($('.overlay'));
  } else {
    $('.overlay > footer').appendTo($('.overlay .to-scroll'));
  }
  if ($('.grid').length) {
    if (winW < 768) {
      Grid.resetBlocksSize();
    } else {
      Grid.blocksSize();
    }
  }
  if ($('.gallery').length) {
    $isoCont = $('article.single-project .gallery');
    $isoCont.imagesLoaded(function() {
      $isoCont.masonry({
        columnWidth: '.grid-sizer',
        itemSelector: '.gallery-item'
      });
    });
  }
  if ($body.hasClass('single') && ($('.overlay article').outerHeight() < winH)) {
    $('.overlay article').css({
      minHeight: winH
    });
    $('.overlay > footer').css({
      transform: 'translate3d(0px, 0px, 0px)'
    });
  }
};

onScroll = function() {
  var logoTop, scrollBottom;
  scrollTop = $(window).scrollTop();
  scrollBottom = scrollTop + winH;
  logoTop = 100 - scrollTop;
  if (scrollTop < 100) {
    if ($body.hasClass('home') || $body.hasClass('single-post') || $body.hasClass('single-project')) {
      $body.addClass('on-top');
    }
  } else {
    if ($body.hasClass('on-top')) {
      $body.removeClass('on-top');
    }
  }
  if (scrollBottom > ($wrapper.height() - 60) || $body.hasClass('page-say-hello')) {
    $('.main-footer').addClass('open');
  } else {
    $('.main-footer').removeClass('open');
  }
};

onOverlayScroll = function() {
  var offset, overlayScrollBottom, overlayScrollTop;
  overlayScrollTop = $('.overlay .to-scroll').scrollTop();
  overlayScrollBottom = overlayScrollTop + winH;
  $footer = $html.hasClass('.touch') ? $('.overlay .to-scroll > footer') : $('.overlay > footer');
  if (overlayScrollTop < 100) {
    $('.post-header').removeClass('open');
  } else {
    $('.post-header').addClass('open');
  }
  if (overlayScrollBottom > ($('.overlay article').height() + 60) && winW > 768) {
    offset = 60 - (overlayScrollBottom - ($('.overlay article').height() + 60));
    offset = offset < 0 ? 0 : offset;
    $footer.css({
      transform: 'translate3d(0px, ' + offset + 'px, 0px)'
    });
  } else {
    $footer.attr('style', '');
  }
};

/* --------------------------------------------
     Begin ajax.coffee
--------------------------------------------
*/


/* global basepath*/


AjaxCall = {
  closeOverlay: function(push) {
    var url;
    url = $body.attr('data-prev-url') === void 0 ? basepath : $body.attr('data-prev-url');
    $overlay = $('.overlay');
    $body.append(loadingIcon);
    if ($html.hasClass('ipad') && $html.hasClass('safari')) {
      $overlay.find('article, footer').fadeOut(400, function() {
        $body.attr('class', prevClasses);
        init();
        onOverlayScroll();
        setTimeout(function() {
          $html.removeClass('overlay-open');
          $('html, body').scrollTop($body.attr('data-scroll-top'));
          $overlay.addClass('hidden');
          setTimeout(function() {
            $overlay.html('');
            $('.loading-icon').remove();
          }, 400);
        }, 400);
      });
    } else {
      $html.removeClass('overlay-open');
      $overlay.addClass('hidden');
      setTimeout(function() {
        $body.attr('class', prevClasses);
        init();
        onOverlayScroll();
        setTimeout(function() {
          $overlay.html('');
          $('.loading-icon').remove();
        }, 400);
      }, 400);
    }
    if (push) {
      history.pushState({
        path: url
      }, '', url);
    }
  },
  loadPage: function(url, target, type, push) {
    $body.append(loadingIcon);
    if ($body.hasClass('nav-open')) {
      $body.removeClass('nav-open');
    }
    if ($body.hasClass('nav-mobile-style')) {
      $body.removeClass('nav-mobile-style');
    }
    $(target).addClass(type === 'post-nav' ? 'switch' : 'hidden');
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'html',
      success: function(data) {
        var $data, $newPage, $newTitle, bodyClasses, metaTags, titleTag, wrapper;
        wrapper = document.createElement('div');
        wrapper.innerHTML = data;
        $(wrapper).find('script').remove();
        $data = $(wrapper);
        titleTag = $data.find('title');
        metaTags = $data.find('meta');
        bodyClasses = $data.find('.wrapper').data('class');
        $newTitle = $data.find('.page-title');
        $newPage = $data.find(target);
        $('title').html(titleTag.text());
        $.each(metaTags, function(index, tag) {
          var $this, content, href, name, property, rel;
          $this = $(tag);
          name = $this.attr('name');
          rel = $this.attr('rel');
          property = $this.attr('property');
          href = $this.attr('href');
          content = $this.attr('content');
          if (typeof name !== 'undefined' && name !== false && name !== 'viewport') {
            $('meta[name="' + name + '"]').attr('content', content);
          }
          if (typeof rel !== 'undefined' && rel !== false) {
            $('meta[rel="' + rel + '"]').attr('href', href);
          }
          if (typeof property !== 'undefined' && property !== false) {
            $('meta[property="' + property + '"]').attr('content', content);
          }
        });
        $(target).html($newPage.html());
        if (target === 'main') {
          $('.page-title').html($newTitle.html());
        }
        setTimeout(function() {
          if (target === '.overlay') {
            $('.overlay .to-scroll').scrollTop(0);
            if (($('.overlay article').height() + 60) <= winH) {
              $footer = $html.hasClass('.touch') ? $('.overlay .to-scroll > footer') : $('.overlay > footer');
              $footer.css({
                transform: 'translate3d(0px, 0px, 0px)'
              });
            }
          } else {
            $('html, body').scrollTop(0);
          }
          $(target).removeClass(type === 'post-nav' ? 'switch' : 'hidden');
          $('.loading-icon').remove();
          setTimeout(function() {
            $body.attr('class', bodyClasses);
            init();
          }, 400);
        }, 400);
      }
    });
    if (push) {
      history.pushState({
        path: url
      }, '', url);
    }
  },
  loadMore: function(url) {
    $.get(url, function(data) {
      var $newLink, $newPosts;
      $newPosts = $(data).filter('.wrapper').find('.block');
      $newLink = $(data).filter('.wrapper').find('.journal-grid > a');
      $newPosts.addClass('hidden');
      $newPosts.insertBefore('.journal-grid > a');
      if ($newLink.length) {
        $('.journal-grid > a').attr('href', $newLink.attr('href'));
      } else {
        $('.journal-grid > a').remove();
      }
      init();
    });
  }
};

/* --------------------------------------------
     Begin main.coffee
--------------------------------------------
*/


/* global Modernizr*/


/* global console*/


/* global ismobile*/


/* global $f*/


/* global youtubeVideos*/


swapVectorImages = function() {
  if (Modernizr.svg) {
    $body.find('.svg').each(function() {
      var $this, imgClass, imgID, imgURL;
      $this = $(this);
      imgID = $this.attr('id');
      imgClass = $this.attr('class');
      imgURL = $this.attr('src');
      $.get(imgURL, function(data) {
        var svg;
        svg = $(data).find('svg');
        if (imgID !== null) {
          svg = svg.attr('id', imgID);
        }
        if (imgClass !== null) {
          svg = svg.attr('class', imgClass + ' replaced-svg');
        }
        svg = svg.removeAttr('xmlns:a');
        $this.replaceWith(svg);
      }, 'xml');
    });
    return;
  } else {
    $body.find('.svg').each(function() {
      $(this).attr('src', $(this).data('fallback'));
    });
    return;
  }
};

playVideo = function(thumb) {
  var $cont, $iframe, iframeEl, player, vid;
  $cont = thumb.parent('.video');
  vid = $cont.data('vid');
  $iframe = $('#' + vid);
  iframeEl = $iframe[0];
  if ($cont.hasClass('vimeo')) {
    player = $f(iframeEl);
    player.addEvent('ready', function() {
      player.addEvent('finish', function() {
        $cont.removeClass('playing');
      });
    });
    if (!$cont.hasClass('playing')) {
      $cont.addClass('playing');
      player.api('play');
    }
  } else {
    if (!$cont.hasClass('playing')) {
      $cont.addClass('playing');
      onYoutubePlay(vid);
    }
  }
};

openPopup = function(url, winName, w, h, offX, offY) {
  var newWin;
  newWin = window.open(url, winName, 'width=' + w + ',height=' + h + ',screenX=' + offX + ',screenY=' + offY);
  if (window.focus) {
    newWin.focus();
  }
  return false;
};

closeLoading = function() {
  var activePageLinkText;
  if (winW < 768) {
    $body.addClass('nav-open nav-mobile-style');
  }
  activePageLinkText = $('.main-header .navigation .current_page_item').text();
  $('.main-footer .navigation a:contains("' + activePageLinkText + '")').parent('li').addClass('current_page_item');
  $('.journal-grid .block').not(':eq(0), :eq(1), :eq(2), :eq(3)').addClass('hidden');
  $loadingPanel.delay(2000).fadeOut(500, function() {
    $wrapper.removeAttr('data-class');
    $loadingPanel.remove();
  });
};

init = function() {
  if ($body.hasClass('page-the-journal')) {
    Journal.initGrid();
  }
  onResize();
  onScroll();
  swapVectorImages();
  if ($body.hasClass('single')) {
    $html.addClass('overlay-open');
    if ($html.hasClass('ipad') && $html.hasClass('safari')) {
      $body.attr('data-scroll-top', $(window).scrollTop());
    }
    $('.overlay .to-scroll').on('scroll', onOverlayScroll);
  }
};

$(function() {
  init();
  $('#nav-btn').off().on('click', function(e) {
    e.preventDefault();
    $body.toggleClass('nav-open');
    if ($body.hasClass('nav-mobile-style')) {
      $body.removeClass('nav-mobile-style');
    }
    e.stopImmediatePropagation();
  });
  $('.navigation a').off().on('click', function(e) {
    var $this, text;
    e.preventDefault();
    $this = $(this);
    text = $(this).text();
    $('.navigation').find('.current_page_item').removeClass('current_page_item');
    $('.navigation a:contains("' + text + '")').parent('li').addClass('current_page_item');
    AjaxCall.loadPage($(this).attr('href'), 'main', '', true);
    e.stopImmediatePropagation();
  });
  $(document).on('mouseenter', '.social-networks li', function() {
    var $this, color;
    $this = $(this);
    color = $this.data('color');
    $this.parents('.bottom').css('background-color', color);
  }).on('mouseleave', '.social-networks li', function() {
    var $this;
    $this = $(this);
    $this.parents('.bottom').attr('style', '');
  });
  $(document).on('click', '.close-overlay', function() {
    AjaxCall.closeOverlay(true);
  });
  $(document).on('click', '.list article a, .overlay .post-nav a', function(e) {
    var $this, parent, target;
    e.preventDefault();
    $this = $(this);
    parent = $this.parent()[0].className;
    if (parent !== 'post-nav') {
      $body.attr('data-prev-url', document.URL);
      prevClasses = $body.attr('class');
    }
    target = $this.hasClass('tag') ? 'main' : '.overlay';
    AjaxCall.loadPage($this.attr('href'), target, parent, true);
  });
  $(document).on('click', 'article.single-project .tag', function(e) {
    var $this;
    e.preventDefault();
    $this = $(this);
    AjaxCall.closeOverlay(false);
    setTimeout(function() {
      AjaxCall.loadPage($this.attr('href'), 'main', null, true);
    }, 1000);
  });
  $(document).on('click', 'article.single-project .gallery-item.video .thumb', function() {
    playVideo($(this));
  });
  $(document).on('click', '.home-grid .project .video-thumb', function() {
    playVideo($(this));
  });
  $(document).on('click', '.projects-list .project .video-thumb', function() {
    playVideo($(this));
  });
  $(document).on('click', 'article.single-project header .video-thumb', function() {
    playVideo($(this));
  });
  $(document).on('click', 'article.single-post .share, article.single-project .share', function() {
    $footer = $(this).parent();
    $footer.addClass('show-links');
  });
  $(document).on('click', '.journal-grid > a', function(e) {
    e.preventDefault();
    AjaxCall.loadMore($(this).attr('href'));
  });
  $(document).on('click', '.tag-page-heading button', function() {
    var url;
    url = $body.attr('data-prev-url') === void 0 ? basepath : $body.attr('data-prev-url');
    AjaxCall.loadPage(url, 'main', null, true);
  });
  $(document).on('click', '.social-links a', function(e) {
    var url;
    e.preventDefault();
    url = $(this).attr('href');
    if ($(this).parent('li').hasClass('fb')) {
      openPopup(url, '', 700, 500, 300, 250);
    }
  });
  $(document).on('inview', '.grid .block', function(event, isInView, visiblePartX, visiblePartY) {
    var $this;
    $this = $(this);
    if (isInView && visiblePartY === 'top') {
      $this.removeClass('hidden');
    }
  });
  $(window).on('resize', onResize).on('scroll', onScroll).on('load', closeLoading).bind('popstate', function(event) {
    var path, state, type;
    state = event.originalEvent.state;
    if (state) {
      if (state.path === basepath) {
        if ($overlay.hasClass('hidden')) {
          AjaxCall.loadPage(basepath, 'main', '', false);
        } else {
          AjaxCall.closeOverlay(true);
        }
      } else {
        path = state.path.split(basepath)[1];
        switch (path) {
          case 'mr-president/':
          case 'our-work/':
          case 'the-journal/':
          case 'say-hello/':
            if (path === 'our-work/' && !$overlay.hasClass('hidden')) {
              AjaxCall.closeOverlay(true);
            } else {
              if ($html.hasClass('overlay-open')) {
                $html.removeClass('overlay-open');
              }
              AjaxCall.loadPage(basepath + path, 'main', '', false);
            }
            break;
          default:
            type = $body.hasClass('single') ? 'post-nav' : '';
            AjaxCall.loadPage(basepath + path, '.overlay', type, false);
        }
      }
    }
  });
  history.replaceState({
    path: document.URL
  }, '');
});