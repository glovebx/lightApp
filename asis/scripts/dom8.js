function isArray(n) {
    return Object.prototype.toString.call(n) === "[object Array]"
}
function isPlainObject(n) {
    var t = Object.prototype.hasOwnProperty,
        i;
    if (!n || Object.prototype.toString.call(n) !== "[object Object]" || n.nodeType || n.setInterval || n.constructor && !t.call(n, "constructor") && !t.call(n.constructor.prototype, "isPrototypeOf")) return !1;
    for (i in n);
    return i === undefined || t.call(n, i)
}
function extend() {
    var n = arguments[0] || {},
        u = 1,
        s = arguments.length,
        f = !1,
        e, i, r, t, o;
    for (typeof n == "boolean" && (f = n, n = arguments[1] || {}, u = 2), typeof n == "object" || typeof n == "function" || (n = {}); u < s; u++) if ((e = arguments[u]) != null) for (i in e)(r = n[i], t = e[i], n !== t) && (f && t && (isPlainObject(t) || isArray(t)) ? (o = r && (isPlainObject(r) || isArray(r)) ? r : isArray(t) ? [] : {}, n[i] = extend(f, o, t)) : t !== undefined && (n[i] = t));
    return n
}
function randomNext(n, t) {
    return typeof t == "undefined" && (t = n, n = 0),
    n + Math.floor(Math.random() * (t - n))
}
function randomId(n, t) {
    typeof n == "number" && (t = n, n = null);
    t = t || 5;
    for (var i = []; t--;) i.push(String.fromCharCode(randomNext(97, 122)));
    return (n ? n + "-" : "") + i.join("")
}
function trim(n) {
    var t = /^\s+/,
        i = /\s+$/;
    return /\S/.test(" ") && (t = /^[\s\xA0]+/, i = /[\s\xA0]+$/),
    n.toString().replace(t, "").replace(i, "")
}
function htmlEncode(n) {
    return String(n).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function htmlDecode(n) {
    return String(n).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
}
function format(n) {
    if (!n) return undefined;
    for (var r, u = arguments.length - 1, i = new String(n), t = 0; t < u; t++) r = new RegExp("\\{" + t + "\\}", "g"),
    i = i.replace(r, arguments[t + 1]);
    return i
}
function i(n) {
    return document.getElementById(n)
}
function create(n) {
    return document.createElement(n)
}
function remove(n) {
    if (n != null) {
        var t = n.parentNode;
        t && t.removeChild(n)
    }
}
function hasClass(n, t) {
    var i;
    return n ? (i = " " + t + " ", n.nodeType === 1 && (" " + n.className + " ").replace(/[\n\t\r]/g, " ").indexOf(i) > -1) ? !0 : !1 : !1
}
function addClass(n, t) {
    var i;
    n.nodeType === 1 && (n.className ? (i = " " + n.className + " ", ~i.indexOf(" " + t + " ") || (i += t + " "), n.className = trim(i)) : n.className = t)
}
function removeClass(n, t) {
    var i;
    n.nodeType === 1 && n.className && (t ? (i = (" " + n.className + " ").replace(/[\n\t\r]/g, " "), i = i.replace(" " + t + " ", " "), n.className = trim(i)) : n.className = "")
}
function addEvent(n, t, i) {
    var u, r;
    n.addEventListener ? n.addEventListener(t, i, !1) : n.attachEvent && (u = function () {
        var t = window.event;
        t.preventDefault || (t.preventDefault = function () {
            t.returnValue = !1
        });
        t.stopPropagation || (t.stopPropagation = function () {
            t.cancelbubble = !0
        });
        i.call(n, t)
    }, n.attachEvent("on" + t, u), r = n.__listeners__ || {}, r[t] = r[t] || [], r[t].push({
        original: i,
        proxy: u
    }), n.__listeners__ = r)
}
function removeEvent(n, t, i) {
    var u, f, e, r;
    n.removeEventListener ? n.removeEventListener(t, i, !1) : n.detachEvent && (r = n.__listeners__, r ? (e = r[t], e.some(function (n, t) {
        return n.original === i ? (u = n.proxy, f = t, !0) : !1
    }), u && (r[t].splice(f, 1), n.detachEvent("on" + t, u))) : n.detachEvent("on" + t, i))
}
function cookie(n, t, i) {
    var f, r, e, o, u, s;
    if (typeof t != "undefined") {
        i = i || {};
        t === null && (t = "", i.expires = -1);
        f = "";
        i.expires && (typeof i.expires == "number" || i.expires.toUTCString) && (typeof i.expires == "number" ? (r = new Date, r.setTime(r.getTime() + i.expires * 864e5)) : r = i.expires, f = "; expires=" + r.toUTCString());
        var h = i.path ? "; path=" + i.path : "",
            c = i.domain ? "; domain=" + i.domain : "",
            l = i.secure ? "; secure" : "";
        document.cookie = [n, "=", encodeURIComponent(t), f, h, c, l].join("")
    } else {
        if (e = null, document.cookie && document.cookie != "") for (o = document.cookie.split(";"), u = 0; u < o.length; u++) if (s = jQuery.trim(o[u]), s.substring(0, n.length + 1) == n + "=") {
            e = decodeURIComponent(s.substring(n.length + 1));
            break
        }
        return e
    }
}
function localStore() {}
function sessionStore(n, t) {
    var i;
    if (arguments.length == 2) typeof t != "undefined" ? window.sessionStorage.setItem(n, JSON.stringify(t)) : window.sessionStorage.removeItem(n);
    else return (i = window.sessionStorage.getItem(n), typeof i != "string") ? i : JSON.parse(i)
}
function getAntiForgeryToken(n, t) {
    var u, f, i, r;
    for (n = n && typeof n == typeof window ? n : window, t = t && typeof t == "string" ? "_" + t.toString() : "", u = "__RequestVerificationToken" + t, f = n.document.getElementsByTagName("input"), i = 0; i < f.length; i++) if (r = f[i], r.type === "hidden" && r.name === u) return {
        name: u,
        value: r.value
    }
}
function appendAntiForgeryToken(n, t) {
    return t = t ? t : getAntiForgeryToken(),
    n = n ? n + "&" : "",
    t ? n + encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value) : n
}
Array.prototype.indexOf || (Array.prototype.indexOf = function (n, t) {
    for (var i = t || 0, r = this.length; i < r; i++) if (this[i] === n) return i;
    return -1
});
Array.prototype.forEach || (Array.prototype.forEach = function (n, t) {
    for (var i = 0, r = this.length; i < r; i++) n.call(t || this, this[i], i, this)
});
Array.forEach || (Array.forEach = function (n, t, i) {
    Array.prototype.forEach.apply(n, [t, i])
});
Array.prototype.filter || (Array.prototype.filter = function (n, t) {
    for (var u = this.length, r = [], i = 0; i < u; i++) n.call(t || this, this[i], i, this) && r.push(this[i]);
    return r
});
Array.filter || (Array.filter = function (n, t, i) {
    return Array.prototype.filter.apply(n, [t, i])
});
Array.prototype.some || (Array.prototype.some = function (n) {
    for (var r = this.length >>> 0, i = arguments[1] || this, t = 0; t < r; t++) if (n.call(i, this[t], t, this)) return !0;
    return !1
});
Array.prototype.every || (Array.prototype.every = function (n) {
    for (var r = this.length >>> 0, i = arguments[1] || this, t = 0; t < r; t++) if (!n.call(i, this[t], t, this)) return !1;
    return !0
}),


function () {
    "use strict";
    var n = Array.prototype.slice;
    try {
        n.call(document.documentElement)
    } catch (t) {
        Array.prototype.slice = function (t, i) {
            var r, f = this.length,
                u = [];
            if (this.charAt) for (r = 0; r < f; r++) u.push(this.charAt(r));
            else for (r = 0; r < this.length; r++) u.push(this[r]);
            return n.call(u, t, i || u.length)
        }
    }
}(),


function () {
    function n(n, r, u) {
        var s, e, o, f, h;
        if (i) return s = r || document,
        u ? s.querySelectorAll(n) : s.querySelector(n);
        for (t.addRule(n, "zoe:ciznx"), e = r && r.getElementsByTagName("*") || document.all, o = [], f = 0, h = e.length; f < h; f++) if (e[f].currentStyle.zoe) {
            if (!u) return t.removeRule(0),
            e[f];
            o[o.length] = e[f]
        }
        return t.removeRule(0),
        u ? o : null
    }
    function r(t, i) {
        if (!t) return null;
        var r, u = isArray(i);
        return u && !i.length ? null : u ? (i.some(function (i) {
            if (r) return !1;
            var u = n(t, i);
            return u ? (r = u, !0) : !1
        }), r) : n(t, i)
    }
    function u(t, i) {
        if (!t) return [];
        var r = [],
            u = isArray(i);
        return u && !i.length ? [] : u ? (i.forEach(function (i) {
                var u = n(t, i, !0);
                u.length && (r = r.concat([].slice.apply(u)))
            }), r) : r.slice.apply(n(t, i, !0))
    }
    var i = !! document.querySelector,
        t = i ? null : document.createStyleSheet();
    window.select = r;
    window.selectAll = u
}();
["width", "height"].forEach(function (n) {
    window[n] = function (t, i) {
        var r, u = n.replace(/./, function (n) {
            return n[0].toUpperCase()
        });
        if (i === undefined) return t == window ? window["inner" + u] : t == document ? document.documentElement["offset" + u] : (r = t.getBoundingClientRect()) && r[n];
        typeof i == "number" && (i = i + "px");
        t.style[n] = i
    }
}),


function () {
    function n() {
        return new Function
    }
    function t() {
        function n() {
            try {
                return new window.XMLHttpRequest
            } catch (n) {}
        }
        function t() {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP")
            } catch (n) {}
        }
        var i = window.ActiveXObject ?
        function () {
            return !this.isLocal && n() || t()
        } : n;
        return i()
    }
    window.request = function (n) {
        var t = new Image;
        t.src = n
    };
    window.jsonp = function () {
        throw new ReferenceError("Not implemented")
    };
    window.ajax = function (i, r) {
        function e(n) {
            n = n || "complete";
            u.onreadystatechange = new Function;
            f && clearTimeout(f);
            r.callback.apply(u, [u, n].concat([].slice.apply(arguments)))
        }
        var f, o = {
            type: "GET",
            async: !0,
            data: null,
            contentType: "application/x-www-form-urlencoded",
            beforeSend: n(),
            callback: n(),
            timeout: 1e4
        },
            u;
        return typeof r == "function" && (r = {
                callback: r
            }),
        r = extend(o, r),
        u = t(),
        u.open(r.type, i),
        u.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        r.data && r.contentType && u.setRequestHeader("Content-Type", r.contentType),
        r.beforeSend.apply(u, [u, r]),
        u.onreadystatechange = function () {
                u.readyState == 4 && e(u.status >= 200 && u.status < 400 ? "" : "error")
            },
        r.timeout > 0 && (u.timeout = r.timeout, f = window.setTimeout(function () {
                try {
                    u.abort()
                } catch (n) {}
                e("timeout")
            }, r.timeout)),
        u.send(r.data),
        u
    };
    window.get = function (n, t) {
        return ajax(n, {
            type: "GET",
            callback: t
        })
    };
    window.post = function (n, t, i) {
        return ajax(n, {
            type: "POST",
            data: t,
            callback: i
        })
    }
}(),


function () {
    function n() {
        if (!i) {
            if (!document.body) return setTimeout(n, 10);
            if (i = !0, t) {
                for (var r, u = 0; r = t[u++];) r.call(document, document, window);
                t = null
            }
        }
    }
    function r() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", r, !1), n()) : document.attachEvent && document.readState === "complete" && (document.detachEvent("onreadystatechange", r), n())
    }
    function f() {
        if (!i) {
            try {
                document.documentElement.doScroll("left")
            } catch (t) {
                setTimeout(f, 1);
                return
            }
            n()
        }
    }
    function e() {
        if (!u) if (u = !0, document.readyState === "complete" && n(), document.addEventListener) document.addEventListener("DOMContentLoaded", r, !1),
        window.addEventListener("load", n, !1);
        else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", r);
            window.attachEvent("onload", n);
            var t = !1;
            try {
                t = window.frameElement == null
            } catch (i) {}
            document.documentElement.doScroll && t && f()
        }
    }
    var i = !1,
        t = [],
        u = !1;
    window.onReady = function (n) {
            e();
            i ? n.call(document, document, window) : t && t.push(n)
        }
}()