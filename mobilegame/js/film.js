!
function(a) {
	var b = {
		imgSingleLoader: function(a, b) {
			var c = new Image;
			c.onload = function() {
				b({
					width: c.width,
					height: c.height
				}), c.onload = null
			}, c.src = a
		},
		resLoader: function(a, c, d) {
			var g, e = a.length,
				f = 0;
			for (g = 0; e > g; g++)!
			function(a) {
				b.imgSingleLoader(a, function(a) {
					c(++f, e, a), f == e && d(a)
				})
			}(a[g])
		},
		extend: function(a, b) {
			var d, e, c = {};
			for (d in a) c[d] = a[d];
			for (e in b) c[e] = b[e];
			return c
		},
		animation: function() {
			var c, d, e, a = 0,
				b = ["ms", "moz", "webkit", "o"];
			for (e = 0; e < b.length && !window.requestAnimationFrame; ++e) c = window[b[e] + "RequestAnimationFrame"], d = window[b[e] + "CancelAnimationFrame"] || window[b[e] + "CancelRequestAnimationFrame"];
			return c || (c = function(b) {
				var d = (new Date).getTime(),
					e = Math.max(0, 16 - (d - a)),
					f = window.setTimeout(function() {
						b(d + e)
					}, e);
				return a = d + e, f
			}), d || (d = function(a) {
				clearTimeout(a)
			}), {
				request: c,
				cancel: d
			}
		}()
	},
		c = function() {},
		d = {
			resource: [],
			totalFrame: 10,
			spriteDirect: 0,
			index: 0,
			playTime: 1e3,
			aniType: "linear",
			onLoading: c,
			onComplete: c,
			onPlaying: c,
			aniComplete: c
		},
		e = {
			linear: function(a, b, c, d) {
				return c * a / d + b
			},
			easeIn: function(a, b, c, d) {
				return c * (a /= d) * a + b
			},
			easeOut: function(a, b, c, d) {
				return -c * (a /= d) * (a - 2) + b
			},
			easeInOut: function(a, b, c, d) {
				return (a /= d / 2) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
			}
		};
	a.film = function(a, c) {
		var f, g, h, i, j, k, l, m, n, o, p, q;
		return c = b.extend(d, c), f = [].concat(c.resource), j = c.totalFrame, g = !0, h = 0, i = f.length, k = [], l = {}, m = !1, n = null, b.resLoader(f, c.onLoading, function(b) {
			var d, e, h;
			if (c.onComplete(b), g = !1, 1 == i) j = c.totalFrame, d = function() {
				l.width = b.width / j, l.height = b.height;
				for (var a = 0; j > a; a++) k.push("background:url(" + f[0] + ") -" + l.width * a + "px 0 no-repeat;")
			}, e = function() {
				l.width = b.width, l.height = b.height / j;
				for (var a = 0; j > a; a++) k.push("background:url(" + f[0] + ") 0 -" + l.height * a + "px no-repeat;")
			}, 1 == c.spriteDirect ? d() : 2 == c.spriteDirect ? e() : b.width > b.height ? d() : e();
			else for (j = i, l = b, o = document.createElement("img"), a.appendChild(o), h = 0; j > h; h++) k.push(f[h]);
			q.jumpTo(c.index)
		}), p = function(a) {
			var d = {};
			return "string" == typeof a && (d.direction = a), d = b.extend(c, a), d.direction = "backward" == d.direction ? "backward" : "forward", d
		}, q = {}, q.jumpTo = function(b) {
			return g ? void 0 : (0 > b ? b -= Math.floor(b / j) * j : b %= j, 1 == i ? a.style.cssText = "width:" + l.width + "px;height:" + l.height + "px;" + k[b] : o.src = k[b], h = b, c.onPlaying(h), q)
		}, q.next = function() {
			return q.jumpTo(h + 1), q
		}, q.prev = function() {
			return q.jumpTo(h - 1), q
		}, q.playByIndex = function(a, b) {
			b = p(b);
			var c = 0;
			return a %= j, c = "forward" == b.direction && h >= a || "backward" == b.direction && a >= h ? j - h + a : a - h, q.playByNum(c, b), q
		}, q.playByNum = function(a, c) {
			var d, f, g, h, i;
			return n && q.pause(), c = p(c), d = (new Date).getTime(), f = d + c.playTime, g = "function" == typeof c.aniType ? c.aniType : e[c.aniType] || e.linear, h = 0, i = g(h + 1, d, c.playTime, a), function j(e) {
				e >= i && (h++, i = g(h + 1, d, c.playTime, a), "forward" == c.direction ? q.next() : q.prev()), f >= e ? n = b.animation.request(j) : (n = null, c.aniComplete())
			}(d), q
		}, q.play = function(a, c) {
			n && q.pause();
			var d = (new Date).getTime(),
				e = d;
			return function f(d) {
				d > e + a && (e = d, "forward" == c ? q.next() : q.prev()), n = b.animation.request(f)
			}(d), q
		}, q.pause = function() {
			return b.animation.cancel(n), n = null, q
		}, q
	}
}(this); /*  |xGv00|d023988a085f9215de3b487f452f586d */