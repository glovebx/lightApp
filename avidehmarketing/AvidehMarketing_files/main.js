(function(t, e) {
	if ( typeof define === "function" && define.amd) {
		define(["jquery"], e)
	} else if ( typeof exports === "object") {
		module.exports = e(require("jquery"))
	} else {
		e(t.jQuery)
	}
})(this, function(t) {
	t.transit = {
		version : "0.9.12",
		propertyMap : {
			marginLeft : "margin",
			marginRight : "margin",
			marginBottom : "margin",
			marginTop : "margin",
			paddingLeft : "padding",
			paddingRight : "padding",
			paddingBottom : "padding",
			paddingTop : "padding"
		},
		enabled : true,
		useTransitionEnd : false
	};
	var e = document.createElement("div");
	var n = {};
	function i(t) {
		if ( t in e.style)
			return t;
		var n = ["Moz", "Webkit", "O", "ms"];
		var i = t.charAt(0).toUpperCase() + t.substr(1);
		for (var r = 0; r < n.length; ++r) {
			var s = n[r] + i;
			if ( s in e.style) {
				return s
			}
		}
	}

	function r() {
		e.style[n.transform] = "";
		e.style[n.transform] = "rotateY(90deg)";
		return e.style[n.transform] !== ""
	}

	var s = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
	n.transition = i("transition");
	n.transitionDelay = i("transitionDelay");
	n.transform = i("transform");
	n.transformOrigin = i("transformOrigin");
	n.filter = i("Filter");
	n.transform3d = r();
	var a = {
		transition : "transitionend",
		MozTransition : "transitionend",
		OTransition : "oTransitionEnd",
		WebkitTransition : "webkitTransitionEnd",
		msTransition : "MSTransitionEnd"
	};
	var o = n.transitionEnd = a[n.transition] || null;
	for (var u in n) {
		if (n.hasOwnProperty(u) && typeof t.support[u] === "undefined") {
			t.support[u] = n[u]
		}
	}
	e = null;
	t.cssEase = {
		_default : "ease",
		"in" : "ease-in",
		out : "ease-out",
		"in-out" : "ease-in-out",
		snap : "cubic-bezier(0,1,.5,1)",
		easeInCubic : "cubic-bezier(.550,.055,.675,.190)",
		easeOutCubic : "cubic-bezier(.215,.61,.355,1)",
		easeInOutCubic : "cubic-bezier(.645,.045,.355,1)",
		easeInCirc : "cubic-bezier(.6,.04,.98,.335)",
		easeOutCirc : "cubic-bezier(.075,.82,.165,1)",
		easeInOutCirc : "cubic-bezier(.785,.135,.15,.86)",
		easeInExpo : "cubic-bezier(.95,.05,.795,.035)",
		easeOutExpo : "cubic-bezier(.19,1,.22,1)",
		easeInOutExpo : "cubic-bezier(1,0,0,1)",
		easeInQuad : "cubic-bezier(.55,.085,.68,.53)",
		easeOutQuad : "cubic-bezier(.25,.46,.45,.94)",
		easeInOutQuad : "cubic-bezier(.455,.03,.515,.955)",
		easeInQuart : "cubic-bezier(.895,.03,.685,.22)",
		easeOutQuart : "cubic-bezier(.165,.84,.44,1)",
		easeInOutQuart : "cubic-bezier(.77,0,.175,1)",
		easeInQuint : "cubic-bezier(.755,.05,.855,.06)",
		easeOutQuint : "cubic-bezier(.23,1,.32,1)",
		easeInOutQuint : "cubic-bezier(.86,0,.07,1)",
		easeInSine : "cubic-bezier(.47,0,.745,.715)",
		easeOutSine : "cubic-bezier(.39,.575,.565,1)",
		easeInOutSine : "cubic-bezier(.445,.05,.55,.95)",
		easeInBack : "cubic-bezier(.6,-.28,.735,.045)",
		easeOutBack : "cubic-bezier(.175, .885,.32,1.275)",
		easeInOutBack : "cubic-bezier(.68,-.55,.265,1.55)"
	};
	t.cssHooks["transit:transform"] = {
		get : function(e) {
			return t(e).data("transform") || new f
		},
		set : function(e, i) {
			var r = i;
			if (!( r instanceof f)) {
				r = new f(r)
			}
			if (n.transform === "WebkitTransform" && !s) {
				e.style[n.transform] = r.toString(true)
			} else {
				e.style[n.transform] = r.toString()
			}
			t(e).data("transform", r)
		}
	};
	t.cssHooks.transform = {
		set : t.cssHooks["transit:transform"].set
	};
	t.cssHooks.filter = {
		get : function(t) {
			return t.style[n.filter]
		},
		set : function(t, e) {
			t.style[n.filter] = e
		}
	};
	if (t.fn.jquery < "1.8") {
		t.cssHooks.transformOrigin = {
			get : function(t) {
				return t.style[n.transformOrigin]
			},
			set : function(t, e) {
				t.style[n.transformOrigin] = e
			}
		};
		t.cssHooks.transition = {
			get : function(t) {
				return t.style[n.transition]
			},
			set : function(t, e) {
				t.style[n.transition] = e
			}
		}
	}
	p("scale");
	p("scaleX");
	p("scaleY");
	p("translate");
	p("rotate");
	p("rotateX");
	p("rotateY");
	p("rotate3d");
	p("perspective");
	p("skewX");
	p("skewY");
	p("x", true);
	p("y", true);
	function f(t) {
		if ( typeof t === "string") {
			this.parse(t)
		}
		return this
	}


	f.prototype = {
		setFromString : function(t, e) {
			var n = typeof e === "string" ? e.split(",") : e.constructor === Array ? e : [e];
			n.unshift(t);
			f.prototype.set.apply(this, n)
		},
		set : function(t) {
			var e = Array.prototype.slice.apply(arguments, [1]);
			if (this.setter[t]) {
				this.setter[t].apply(this, e)
			} else {
				this[t] = e.join(",")
			}
		},
		get : function(t) {
			if (this.getter[t]) {
				return this.getter[t].apply(this)
			} else {
				return this[t] || 0
			}
		},
		setter : {
			rotate : function(t) {
				this.rotate = b(t, "deg")
			},
			rotateX : function(t) {
				this.rotateX = b(t, "deg")
			},
			rotateY : function(t) {
				this.rotateY = b(t, "deg")
			},
			scale : function(t, e) {
				if (e === undefined) {
					e = t
				}
				this.scale = t + "," + e
			},
			skewX : function(t) {
				this.skewX = b(t, "deg")
			},
			skewY : function(t) {
				this.skewY = b(t, "deg")
			},
			perspective : function(t) {
				this.perspective = b(t, "px")
			},
			x : function(t) {
				this.set("translate", t, null)
			},
			y : function(t) {
				this.set("translate", null, t)
			},
			translate : function(t, e) {
				if (this._translateX === undefined) {
					this._translateX = 0
				}
				if (this._translateY === undefined) {
					this._translateY = 0
				}
				if (t !== null && t !== undefined) {
					this._translateX = b(t, "px")
				}
				if (e !== null && e !== undefined) {
					this._translateY = b(e, "px")
				}
				this.translate = this._translateX + "," + this._translateY
			}
		},
		getter : {
			x : function() {
				return this._translateX || 0
			},
			y : function() {
				return this._translateY || 0
			},
			scale : function() {
				var t = (this.scale || "1,1").split(",");
				if (t[0]) {
					t[0] = parseFloat(t[0])
				}
				if (t[1]) {
					t[1] = parseFloat(t[1])
				}
				return t[0] === t[1] ? t[0] : t
			},
			rotate3d : function() {
				var t = (this.rotate3d || "0,0,0,0deg").split(",");
				for (var e = 0; e <= 3; ++e) {
					if (t[e]) {
						t[e] = parseFloat(t[e])
					}
				}
				if (t[3]) {
					t[3] = b(t[3], "deg")
				}
				return t
			}
		},
		parse : function(t) {
			var e = this;
			t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(t, n, i) {
				e.setFromString(n, i)
			})
		},
		toString : function(t) {
			var e = [];
			for (var i in this) {
				if (this.hasOwnProperty(i)) {
					if (!n.transform3d && (i === "rotateX" || i === "rotateY" || i === "perspective" || i === "transformOrigin")) {
						continue
					}
					if (i[0] !== "_") {
						if (t && i === "scale") {
							e.push(i + "3d(" + this[i] + ",1)")
						} else if (t && i === "translate") {
							e.push(i + "3d(" + this[i] + ",0)")
						} else {
							e.push(i + "(" + this[i] + ")")
						}
					}
				}
			}
			return e.join(" ")
		}
	};
	function c(t, e, n) {
		if (e === true) {
			t.queue(n)
		} else if (e) {
			t.queue(e, n)
		} else {
			t.each(function() {
				n.call(this)
			})
		}
	}

	function l(e) {
		var i = [];
		t.each(e, function(e) {
			e = t.camelCase(e);
			e = t.transit.propertyMap[e] || t.cssProps[e] || e;
			e = h(e);
			if (n[e])
				e = h(n[e]);
			if (t.inArray(e, i) === -1) {
				i.push(e)
			}
		});
		return i
	}

	function d(e, n, i, r) {
		var s = l(e);
		if (t.cssEase[i]) {
			i = t.cssEase[i]
		}
		var a = "" + y(n) + " " + i;
		if (parseInt(r, 10) > 0) {
			a += " " + y(r)
		}
		var o = [];
		t.each(s, function(t, e) {
			o.push(e + " " + a)
		});
		return o.join(", ")
	}


	t.fn.transition = t.fn.transit = function(e, i, r, s) {
		var a = this;
		var u = 0;
		var f = true;
		var l = t.extend(true, {}, e);
		if ( typeof i === "function") {
			s = i;
			i = undefined
		}
		if ( typeof i === "object") {
			r = i.easing;
			u = i.delay || 0;
			f = typeof i.queue === "undefined" ? true : i.queue;
			s = i.complete;
			i = i.duration
		}
		if ( typeof r === "function") {
			s = r;
			r = undefined
		}
		if ( typeof l.easing !== "undefined") {
			r = l.easing;
			delete l.easing
		}
		if ( typeof l.duration !== "undefined") {
			i = l.duration;
			delete l.duration
		}
		if ( typeof l.complete !== "undefined") {
			s = l.complete;
			delete l.complete
		}
		if ( typeof l.queue !== "undefined") {
			f = l.queue;
			delete l.queue
		}
		if ( typeof l.delay !== "undefined") {
			u = l.delay;
			delete l.delay
		}
		if ( typeof i === "undefined") {
			i = t.fx.speeds._default
		}
		if ( typeof r === "undefined") {
			r = t.cssEase._default
		}
		i = y(i);
		var p = d(l, i, r, u);
		var h = t.transit.enabled && n.transition;
		var b = h ? parseInt(i, 10) + parseInt(u, 10) : 0;
		if (b === 0) {
			var g = function(t) {
				a.css(l);
				if (s) {
					s.apply(a)
				}
				if (t) {
					t()
				}
			};
			c(a, f, g);
			return a
		}
		var m = {};
		var v = function(e) {
			var i = false;
			var r = function() {
				if (i) {
					a.unbind(o, r)
				}
				if (b > 0) {
					a.each(function() {
						this.style[n.transition] = m[this] || null
					})
				}
				if ( typeof s === "function") {
					s.apply(a)
				}
				if ( typeof e === "function") {
					e()
				}
			};
			if (b > 0 && o && t.transit.useTransitionEnd) {
				i = true;
				a.bind(o, r)
			} else {
				window.setTimeout(r, b)
			}
			a.each(function() {
				if (b > 0) {
					this.style[n.transition] = p
				}
				t(this).css(l)
			})
		};
		var z = function(t) {
			this.offsetWidth
			v(t)
		};
		c(a, f, z);
		return this
	};
	function p(e, i) {
		if (!i) {
			t.cssNumber[e] = true
		}
		t.transit.propertyMap[e] = n.transform;
		t.cssHooks[e] = {
			get : function(n) {
				var i = t(n).css("transit:transform");
				return i.get(e)
			},
			set : function(n, i) {
				var r = t(n).css("transit:transform");
				r.setFromString(e, i);
				t(n).css({
					"transit:transform" : r
				})
			}
		}
	}

	function h(t) {
		return t.replace(/([A-Z])/g, function(t) {
			return "-" + t.toLowerCase()
		})
	}

	function b(t, e) {
		if ( typeof t === "string" && !t.match(/^[\-0-9\.]+$/)) {
			return t
		} else {
			return "" + t + e
		}
	}

	function y(e) {
		var n = e;
		if ( typeof n === "string" && !n.match(/^[\-0-9\.]+/)) {
			n = t.fx.speeds[n] || t.fx.speeds._default
		}
		return b(n, "ms")
	}


	t.transit.getTransitionValue = d;
	return t
});

/*
* Auto-generated content from the Brackets New Project extension.
*/

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, window, document */

// Simple jQuery event handler
$(document).ready(function() {

	if ($.browser.webkit && $.browser.webkit) {
		/*
		Title: Vanilla JavaScript to fix responsive SVGs in some versions of Safari.
		What it does: Stops the problem I described here: http://stackoverflow.com/q/17158717/1147859 Reference URL of the issue: http://codepen.io/benfrain/full/fhyrD

		It will work on all SVGs referenced inside objects as long as given the class .emb:

		<object class="emb" data="img/cup.svg" type="image/svg+xml"></object>

		And also any inline SVGs.

		Necassary CSS (!important should be optional)

		svg {
		height: 100%!important;
		width: 100%!important;
		}

		Author: Ben Frain
		Date: 21.6.2013
		Version 0.1

		Pointers on the embedded SVGs from Erik Dahlström: http://xn--dahlstrm-t4a.net/svg/html/get-embedded-svg-document-script.html from this Stack Overflow question: http://stackoverflow.com/a/8134698/1147859
		*/

		// wait until all the resources are loaded
		/*window.addEventListener("load", function(){
		findSVGs();
		inlineSVGs();
		},false);
		window.addEventListener("resize", function(){
		findSVGs();
		inlineSVGs();
		},false) ;*/

		// fetches the document for the given embedding_element
		var getSubDocument = function(embedding_element) {
			if (embedding_element.contentDocument) {
				return embedding_element.contentDocument;
			} else {
				var subdoc = null;
				try {
					subdoc = embedding_element.getSVGDocument();
				} catch(e) {
				}
				return subdoc;
			}
		};

		var findSVGs = function() {
			// Find all emements with a class of .emb
			var elms = document.querySelectorAll(".emb");
			// Make a loop for each
			for (var i = 0; i < elms.length; i++) {
				// Get the SVG whether content or iframe etc
				subdoc = getSubDocument(elms[i]);

				// Get the internal SVG document
				SVGdoc = subdoc.documentElement;
				// If it exists set the SVG to be width and height 100%;
				if (subdoc)
					SVGdoc.setAttribute("height", "100%");
				SVGdoc.setAttribute("width", "100%");
			}
		};

		var inlineSVGs = function() {
			// Find all inline elements
			var inlines = document.getElementsByTagName("svg");
			// Make a loop for each
			for (var i = 0; i < inlines.length; i++) {
				// Get the computed width of the SVG as determined by UA
				ComputedSVGWidthRaw = inlines[i].getBoundingClientRect().width.toFixed(0);
				ComputedSVGWidth = inlines[i].getBoundingClientRect().width.toFixed(0) + 'px';

				// If no height or width on SVG:
				if (!inlines[i].hasAttribute("height") || !inlines[i].hasAttribute("width")) {
					// If it has no width/height and ALSO DOES NOT have a viewBox:
					if (!inlines[i].hasAttribute("viewBox")) {
						// Then set the height to be the same as the ComputedSVGWidth
						inlines[i].setAttribute("height", ComputedSVGWidth);
						inlines[i].setAttribute("width", ComputedSVGWidth);
					}
					// If it has no width/height but DOES have a viewbox:
					else {
						// Split contents of the viewBox into an array
						viewBox = inlines[i].getAttribute("viewBox").split(/[\s,]+/);
						// With viewBox Width and Height are the last two values
						viewBoxHeight = viewBox[viewBox.length - 1];
						viewBoxWidth = viewBox[viewBox.length - 2];
						HeightProportionFromViewBox = (viewBoxHeight / viewBoxWidth);
						HeightfromViewBoxProportion = (ComputedSVGWidthRaw * HeightProportionFromViewBox).toFixed(0) + 'px';

						// OK, let's set this Mofo:
						inlines[i].setAttribute("width", ComputedSVGWidth);
						inlines[i].setAttribute("height", HeightfromViewBoxProportion);
					}
				}
				// At this point we have height and width
				else {
					// Get the height/width of the SVG sans units
					OriginalSVGheight = parseInt(inlines[i].getAttribute("height"), 10);
					OriginalSVGwidth = parseInt(inlines[i].getAttribute("width"), 10);

					// Get the ratios of height and width
					RatioOfHeightToWidth = (OriginalSVGheight / OriginalSVGwidth).toFixed(0);
					RatioOfWidthToHeight = (OriginalSVGwidth / OriginalSVGheight);

					// Define each width and height as value and add px to it - remove decimals to prevent rouding discrepancies
					HeightAsProportion = (RatioOfHeightToWidth * ComputedSVGWidthRaw).toFixed(0) + 'px';
					WidthAsProportion = (parseInt(HeightAsProportion, 10) * RatioOfWidthToHeight).toFixed(0) + 'px';

					inlines[i].setAttribute("width", WidthAsProportion);
					inlines[i].setAttribute("height", HeightAsProportion);
				}
			}
		};

	}

	var w = window.innerWidth;
	var h = window.innerHeight;
	var deg = 1 / (w / 1.7);
	$(".project").css("height", (w / 3) / 1.5 + "px");
	$(".project").css("width", (w / 3) + "px");
	$(".projectborder").css("height", ((w / 3) / 1.5) - 6 + "px");
	$(".projectborder").css("width", ((w / 3)) + "px");
	$(".explorecon").css("height", h-73-90 + "px");
	$(".projectshow").css("height", h-73-90 + "px");
	$(".explorecon").css("top", 73 + "px");
	$(".projectshow").css("top", 73 + "px");
	$(".projectlist").css("width", (w/2)-1 + "px");
    
    $(".explorecon").niceScroll({cursorcolor:"rgb(100, 100, 100)",cursorwidth:6,cursoropacitymin:0.5,zindex:100000,cursorborder:"0px solid #fff"});
    
    $(".worksbar").niceScroll({cursorcolor:"rgb(100, 100, 100)",cursorwidth:6,cursoropacitymin:0.5,zindex:100000,cursorborder:"0px solid #fff"});
    

	/*$(window).bind('resize', function(e) {

	 console.log('window resized..');
	 this.location.reload(false);

	 if (window.RT) clearTimeout(window.RT);
	 window.RT = setTimeout(function()
	 {
	 this.location.reload(false);
	 }, 200);

	 $(".resize").css("display","block");

	 }); */

	var topslide1 = $("#slide3").offset().top;
	var topslide2 = $("#slide7").offset().top;
	var topslide3 = (w / 1.7) * 4;
	var topslide4 = (w / 1.7) * 7 - 100;
	var topslide5 = (w / 1.7) * 9 + 100;

	$("#redsh").css("opacity", "0");

	$("#slide3").hover(function() {
		$("#studio").fadeIn(1000);
	}, function() {
		$("#studio").fadeOut(1000);
	});

	$(".slide").css("height", w / 1.7 + "px");
	$("body").css("height", (w / 1.7) * 10 + "px");
	$(".svgcontainer").css("height", (w / 1.7) * 10 - ((w / 1.7) * 0.6) + "px");

	if (w < 568) {
		$(".work0").css("margin-left", "0px");
		$(".boxlast").css("margin-left", "0px");
		$(".para").css("margin-left", "0px");
		$("#about").css("margin-left", "-100px");
		$("#servicesicon").css("margin-left", "-80px");
		$("#servicesicons").css("margin-left", "-40px");
		$(".project").css("height", (w) / 1.3 + "px");
		$(".project").css("width", w + "px");
		$(".projectborder").css("height", ((w) / 1.3) - 6 + "px");
		$(".projectborder").css("width", ((w)) + "px");
		$(".moreprojects").css("left", "50%");
		$(".discover").css("margin-left", "-125px");
		$("#worksicon").css("margin-left", "-75px");
		$("#cliicon").css("margin-left", "-75px");
		$(".slide").css("height", 1500 + "px");
		$("#slide1").css("height", 568 + "px");
		$("#slide2").css("height", 568 + "px");
		$("#slide3").css("height", 1000 + "px");
		$("#slide4").css("height", 800 + "px");
		$("#slide7").css("height", 1000 + "px");
		$("#slide8").css("height", 600 + "px");
		$("#slide10").css("height", 700 + "px");
		$("body").css("height", w * 2 * 10 + "px");
		$("#findinput").prop('disabled', true);
		$("#findinput2").prop('disabled', true);
	}

	if (w < 1024 && w > 569) {
		$(".work0").css("margin-left", "0px");
		$(".boxlast").css("margin-left", "0px");
		$(".para").css("margin-left", "0px");
		$("#about").css("margin-left", "-100px");
		$("#servicesicon").css("margin-left", "-80px");
		$(".servicesicons").css("left", "50%");
		$("#worksicon").css("margin-left", "-75px");
		$(".moreprojects").css("left", "50%");
		$(".discover").css("margin-left", "-125px");
		$("#cliicon").css("margin-left", "-75px");
		$(".clientcon").css("margin-left", "0px");
		$(".slide").css("height", 1500 + "px");
		$("#slide1").css("height", 1000 + "px");
		$("#slide2").css("height", 568 + "px");
		$("#slide3").css("height", 1000 + "px");
		$("#slide4").css("height", 1000 + "px");
		$("#slide5").css("height", 900 + "px");
		$("#slide7").css("height", 1000 + "px");
		$("#slide8").css("height", 1000 + "px");
		$("#slide9").css("height", 1000 + "px");
		$("#slide6").css("height", 1000 + "px");
		$("#slide10").css("height", 1000 + "px");
		$(".project").css("height", (w / 2) / 1.3 + "px");
		$(".project").css("width", w / 2 + "px");
		$(".projectborder").css("height", ((w / 2) / 1.3) - 6 + "px");
		$(".projectborder").css("width", ((w / 2)) + "px");
	}

	drawLines();

	$("#mc1").click(function() {
		$(".menu").fadeOut();
		$("body,html").animate({
			scrollTop : $('#slide3').offset().top
		}, 2500, "easeInOutSine");
	});

	$("#mc2").click(function() {
		$(".menu").fadeOut();
		$("body,html").animate({
			scrollTop : $('#slide7').offset().top
		}, 2500, "easeInOutSine");
	});

	$("#mc3").click(function() {
		$(".menu").fadeOut();
		$("body,html").animate({
			scrollTop : $('#slide4').offset().top
		}, 2500, "easeInOutSine");
	});

	$("#mc4").click(function() {
		$(".menu").fadeOut();
		$("body,html").animate({
			scrollTop : $('#slide9').offset().top
		}, 2500, "easeInOutSine");
	});

	$("#mc5").click(function() {
		$(".menu").fadeOut();
		$("body,html").animate({
			scrollTop : $('#slide10').offset().top
		}, 2500, "easeInOutSine");
	});

	$("#w0").hover(function() {
		$("#wh0").fadeIn(200);
	}, function() {
		$("#wh0").fadeOut(200);
	});

	$("#w1").hover(function() {
		$("#wh1").fadeIn(200);
	}, function() {
		$("#wh1").fadeOut(200);
	});

	$("#w2").hover(function() {
		$("#wh2").fadeIn(200);
	}, function() {
		$("#wh2").fadeOut(200);
	});

	$("#w3").hover(function() {
		$("#wh3").fadeIn(200);
	}, function() {
		$("#wh3").fadeOut(200);
	});

	$("#w4").hover(function() {
		$("#wh4").fadeIn(200);
	}, function() {
		$("#wh4").fadeOut(200);
	});

	$("#w5").hover(function() {
		$("#wh5").fadeIn(200);
	}, function() {
		$("#wh5").fadeOut(200);
	});

	$("#w6").hover(function() {
		$("#wh6").fadeIn(200);
	}, function() {
		$("#wh6").fadeOut(200);
	});

	$(".menuicon").click(function() {
		$(".menu").fadeIn();
	});
    
    $(".menuicon2").click(function() {
		$(".menu2").fadeIn();
	});
    

    
    $(".moreprojects").click(function() {
		$(".explore").fadeIn();
	});

	$("#closedetail").click(function() {
		$(".explore").fadeOut();
	});
    
    $(".close").click(function() {
		$(".menu").fadeOut();
	});


	$(window).scroll(function() {
		drawLines();
		$("#redsh").css("opacity", (((-1) * 8) * (w / 1.7) + $(window).scrollTop()) * deg);
		if ($(window).scrollTop() > h) {
			$(".logotype").fadeIn();
		} else if ($(window).scrollTop() < h) {
			$(".logotype").fadeOut();
		}

	});

	//If you have more than one SVG per page this will pick it up
	function drawLines() {
		$.each($("path"), function(i, val) {
			var line = val;
			drawLine($(this), line);
		});
	}

	//draw the line
	function drawLine(container, line) {
		var length = 0;
		var pathLength = 80;
		var distanceFromTop = container.offset().top - $(window).scrollTop();
		var percentDone = 1 - (distanceFromTop / $(window).height());
		length = percentDone * pathLength;
		line.style.strokeDasharray = [length, pathLength].join(' ');
		console.log("strokeDasharray: " + [length, pathLength].join(' '));
	}


	$("#project1").hover(function() {
		$("#pinfo1").stop(true).animate({
			left : "0px",
			opacity : 1
		}, 200);
	}, function() {
		$("#pinfo1").stop(true).animate({
			left : "-50px",
			opacity : 0
		}, 200);
	});

	$("#project2").hover(function() {
		$("#pinfo2").stop(true).animate({
			left : "0px",
			opacity : 1
		}, 200);
	}, function() {
		$("#pinfo2").stop(true).animate({
			left : "-50px",
			opacity : 0
		}, 200);
	});

	$("#project3").hover(function() {
		$("#pinfo3").stop(true).animate({
			left : "0px",
			opacity : 1
		}, 200);
	}, function() {
		$("#pinfo3").stop(true).animate({
			left : "-50px",
			opacity : 0
		}, 200);
	});

	$("#project4").hover(function() {
		$("#pinfo4").stop(true).animate({
			left : "0px",
			opacity : 1
		}, 200);
	}, function() {
		$("#pinfo4").stop(true).animate({
			left : "-50px",
			opacity : 0
		}, 200);
	});

	$("#project5").hover(function() {
		$("#pinfo5").stop(true).animate({
			left : "0px",
			opacity : 1
		}, 200);
	}, function() {
		$("#pinfo5").stop(true).animate({
			left : "-50px",
			opacity : 0
		}, 200);
	});

	$("#project6").hover(function() {
		$("#pinfo6").stop(true).animate({
			left : "0px",
			opacity : 1
		}, 200);
	}, function() {
		$("#pinfo6").stop(true).animate({
			left : "-50px",
			opacity : 0
		}, 200);
	});

	$(window).resize(function() {

		w = window.innerWidth;
		h = window.innerHeight;
		deg = 1 / (w / 1.7);

		$(".slide").css("height", w / 1.7 + "px");
		$(".project").css("height", (w / 3) / 1.5 + "px");
		$(".project").css("width", (w / 3) + "px");
		$(".projectborder").css("width", ((w / 3)) + "px");
		$(".projectborder").css("height", ((w / 3) / 1.5) - 6 + "px");
		$("body").css("height", (w / 1.7) * 10 + "px");
		$(".svgcontainer").css("height", (w / 1.7) * 10 - ((w / 1.7) * 0.6) + "px");
        $(".explorecon").css("height", h-73-90 + "px");
	   $(".projectshow").css("height", h-73-90 + "px");
	   $(".explorecon").css("top", 73 + "px");
	   $(".projectshow").css("top", 73 + "px");
        $(".projectlist").css("width", (w/2)-1 + "px");

		if (w < 568) {
			$(".work0").css("margin-left", "0px");
			$(".boxlast").css("margin-left", "0px");
			$(".para").css("margin-left", "0px");
			$("#about").css("margin-left", "-100px");
			$("#servicesicon").css("margin-left", "-80px");
			$("#servicesicons").css("margin-left", "-40px");
			$("#worksicon").css("margin-left", "-75px");
			$("#cliicon").css("margin-left", "-75px");
			$(".project").css("height", (w) / 1.3 + "px");
			$(".project").css("width", w + "px");
			$(".projectborder").css("height", ((w) / 1.3) - 6 + "px");
			$(".projectborder").css("width", ((w)) + "px");
			$(".slide").css("height", 1500 + "px");
			$("#slide1").css("height", 568 + "px");
			$("#slide2").css("height", 568 + "px");
			$("#slide3").css("height", 1000 + "px");
			$("#slide4").css("height", 800 + "px");
			$("#slide7").css("height", 1000 + "px");
			$("#slide8").css("height", 600 + "px");
			$("#slide10").css("height", 700 + "px");
			$("body").css("height", w * 2 * 10 + "px");
		}

		if (w < 1024 && w > 569) {
			$(".slide").css("height", 1500 + "px");
			$("#slide1").css("height", 1000 + "px");
			$("#slide2").css("height", 568 + "px");
			$("#slide3").css("height", 1000 + "px");
			$("#slide4").css("height", 1000 + "px");
			$("#slide5").css("height", 900 + "px");
			$("#slide7").css("height", 1000 + "px");
			$("#slide8").css("height", 1000 + "px");
			$("#slide9").css("height", 1000 + "px");
			$("#slide6").css("height", 1000 + "px");
			$("#slide10").css("height", 1000 + "px");
			$(".project").css("height", (w / 2) / 1.3 + "px");
			$(".project").css("width", w / 2 + "px");
			$(".projectborder").css("height", ((w / 2) / 1.3) - 6 + "px");
			$(".projectborder").css("width", ((w / 2)) + "px");
		}

	});

	$(window).mousemove(function(event) {
		var mouseX = event.pageX;
		var mouseY = event.pageX;
		$(".svgcontainer").css("left", 0 + (mouseX * 0.012));
		$(".servicesicons").css("left", -100 + (mouseX * 0.05));
		$(".clientcon").css("margin-left", -400 - (mouseX * 0.03));
		$(".boxlast").css("margin-left", -100 + (mouseX * 0.03));
		$("#paragabout").css("margin-left", -500 + (mouseX * 0.03));
		$("#paragabout2").css("margin-left", -500 + (mouseX * 0.03));
		$("#paraservice").css("margin-left", -500 + (mouseX * 0.03));
		$("#paracli").css("margin-left", -500 + (mouseX * 0.03));
		$(".work0").css("margin-left", -450 - (mouseX * 0.03));
		$("#about").css("margin-left", -80 - (mouseX * 0.03));
		$("#worksicon").css("margin-left", -50 - (mouseX * 0.03));
		$("#servicesicon").css("margin-left", -110 + (mouseX * 0.03));
		$("#cliicon").css("margin-left", -110 + (mouseX * 0.03));
		$("#paraproject").css("margin-left", -480 + (mouseX * 0.03));
		$(".moreprojects").css("left", (w / 3) - 30 + (mouseX * 0.03));
		$(".discover").css("margin-left", -170 + (mouseX * 0.03));
		if (w < 568) {
			$(".work0").css("margin-left", "0px");
			$(".boxlast").css("margin-left", "0px");
			$(".para").css("margin-left", "0px");
			$("#about").css("margin-left", "-100px");
			$("#servicesicon").css("margin-left", "-80px");
			$(".servicesicons").css("left", "0px");
			$("#paraservice").css("margin-left", "0px");
			$("#worksicon").css("margin-left", "-75px");
			$(".moreprojects").css("left", "50%");
			$(".discover").css("margin-left", "-125px");
			$("#cliicon").css("margin-left", "-75px");
		}

		if (w < 1024 && w > 569) {
			$(".work0").css("margin-left", "0px");
			$(".boxlast").css("margin-left", "0px");
			$(".para").css("margin-left", "0px");
			$("#about").css("margin-left", "-100px");
			$("#servicesicon").css("margin-left", "-80px");
			$(".servicesicons").css("left", "50%");
			$("#worksicon").css("margin-left", "-75px");
			$(".moreprojects").css("left", "50%");
			$(".discover").css("margin-left", "-125px");
			$("#cliicon").css("margin-left", "-75px");
			$(".clientcon").css("margin-left", "0px");
		}

	});

	var sendflag = 0;
    var menflag=0;
    
    $(".cup").click(function(){
       if(menflag==0){
            $(".mentions").fadeIn();
            $(".cup").css("opacity","0.9");
            menflag=1;
       } else if(menflag==1){
            $(".mentions").fadeOut();
            $(".cup").css("opacity","0.4");
           menflag=0;
       }
    });

	$("#slide10").mouseover(function() {
		$("#findinput2").prop('disabled', true);
		$("#findinput").prop('disabled', false);
		$("#findinput").val($("#findinput").val()).focus();
		$("#findinput").focus().bind('blur', function() {
			$(this).focus();
		});
	});

	$(".send").click(function() {
		$("#findinput").prop('disabled', true);
		$("#findinput2").prop('disabled', false);
		$("#findinput2").val($("#findinput2").val()).focus();
		$("#findinput2").focus().bind('blur', function() {
			$(this).focus();
		});

		if ($("#findinput").val() && $("#findinput2").val()) {
			var message = $("#findinput").val();
			var email = $("#findinput2").val();
		} else if ($("#findinput3").val() && $("#findinput4").val()) {
			var message = $("#findinput3").val();
			var email = $("#findinput4").val()
		} else {
			var message = false;
			var email = false;
		}

		if (message && email) {
			if (isValidEmailAddress(email)) {
				var formData = {
					message : message,
					email : email
				};
				$.ajax({
					type : 'POST',
					data : formData,
					url : 'sendemail',
					success : function(result) {
						$('#hello').css('color', 'white');
						$('#hello').html('Say Hello !');
						$("#findinput").fadeOut();
						$("#findinput3").fadeOut();
						$(".send").fadeOut();
						$("#newexpression").fadeIn();
						$("#newexpression").html("Thanks, Get back to you soon !");
					},
					error : function(result) {
						$('#hello').html('Connection timeout ! Try Again.');
						$('#hello').css('color', '#eb0733');
					}
				});

			} else
				$('#hello').html('Wrong Address !');
			$('#hello').css('color', '#eb0733');

		}

	});

	$("#slide10").mouseleave(function() {
		$("#findinput").prop('disabled', true);
		$("#findinput2").prop('disabled', true);
	});

	//disable the tab key
	$(document).keydown(function(objEvent) {
		if (objEvent.keyCode == 9) {//tab pressed
			objEvent.preventDefault();
			// stops its action
		}
	})
});

function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	return pattern.test(emailAddress);
};