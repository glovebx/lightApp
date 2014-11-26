(function () {
    function t(n, t, i) {
        var r, u;
        if (n) {
            if (window.CustomEvent) return r = new CustomEvent(t, {
                canBubble: !1,
                cancelable: !0,
                detail: i
            }),
            n.dispatchEvent(r);
            r = {
                detail: i,
                preventDefault: new Function,
                stopPropagation: new Function
            };
            u = n.__events && n.__events[t];
            u && u.length && u.forEach(function (t) {
                t.apply(n, [r])
            })
        }
    }
    function r(n, t, i) {
        window.CustomEvent ? addEvent(n, t, i) : (n.__events || (n.__events = {}), n.__events[t] || (n.__events[t] = []), n.__events[t].push(i))
    }
    function i(n, t, i) {
        function f() {
            var i = document.createElement("bootstrap"),
                n = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                };
            for (var t in n) if (i.style[t] !== undefined) return n[t];
            return !1
        }
        function r() {
            removeEvent(n, r);
            removeClass(n, t)
        }
        addClass(n, t);
        i && i.apply(n, [n]);
        var u = f();
        u ? addEvent(n, u, r) : setTimeout(function () {
            removeClass(n, t)
        }, 1e3)
    }
    function u(u) {
        function e(n) {
            n.frameHwnd = {
                element: n,
                touchStart: null,
                prev: function () {
                    for (var n = this.element.previousSibling; n && !hasClass(n, "frame");) n = n.previousSibling;
                    return n
                },
                next: function () {
                    for (var n = this.element.nextSibling; n && !hasClass(n, "frame");) n = n.nextSibling;
                    return n
                },
                slide: function (n, i) {
                    var r = n.changedTouches,
                        f, u;
                    r && r.length == 1 && (r = {
                            x: r[0].pageX,
                            y: r[0].pageY
                        }, f = this.element, u = this.touchStart || null, u || (u = this.touchStart = r, u.offset = {}, "top,left,width,height".split(",").forEach(function (n) {
                            u.offset[n] = parseFloat(f.style[n])
                        })), t(this.element, "frameSliding", extend(r, {
                            passed: i,
                            touchEvent: n,
                            delta: u ? {
                                x: r.x - u.x,
                                y: r.y - u.y
                            } : null
                        })))
                },
                show: function () {
                    var i = this.element,
                        n = t(this.element, "frameShow");
                    this.touchStart = null;
                    n !== !1
                },
                revert: function (n, i) {
                    var r = t(this.element, "frameRevert", {
                        up: i
                    });
                    this.touchStart = null;
                    r !== !1
                }
            }
        }
        function o(n) {
            function u(t) {
                function e() {
                    n && selectAll(".toggle", n).forEach(function (n) {
                        addClass(n, "openup")
                    })
                }
                function f(n) {
                    n && selectAll(".toggle", n).forEach(function (n) {
                        removeClass(n, "openup")
                    })
                }
                if (t) {
                    e(t.element);
                    var i, r, u;
                    do i = (i || t).prev(),
                    r ? i && (i.style.display = "none") : (r = i, r && (r.style.display = "block")),
                    i && f(i),
                    i = i && i.frameHwnd;
                    while (i);
                    do i = (i || t).next(),
                    u ? i && (i.style.display = "none") : (u = i, u && (u.style.display = "block")),
                    i && f(i),
                    i = i && i.frameHwnd;
                    while (i)
                }
            }
            var t = n.frameHwnd;
            r(n, "frameSliding", function (n) {
                var i = n.detail,
                    u, r, f;
                i && i.delta && i.delta.y && (r = i.delta.y, f = r < 0, i.passed ? this.style.top = -1 * height(this) + r + "px" : f ? this.style.top = r + "px" : (u = t.prev(), u && u.frameHwnd.slide(i.touchEvent, !0)))
            });
            r(n, "frameShow", function () {
                parseInt(this.style.top) != 0 && i(this, "transition", function () {
                    var n = this.style;
                    n.top = 0;
                    n.left = 0
                });
                u(t)
            });
            r(n, "frameRevert", function () {
                if (t.touchStart && t.touchStart.offset) {
                    var n = t.touchStart.offset;
                    i(this, "transition", function () {
                        var t = this.style;
                        t.top = n.top + "px";
                        t.left = n.left + "px"
                    })
                }
            });
            addEvent(n, "touchstart", function (n) {
                t.slide(n)
            });
            addEvent(n, "touchmove", function (n) {
                t.slide(n)
            });
            addEvent(n, "touchend", function (n) {
                var u = n.changedTouches,
                    e, f, o, r;
                if (t.touchStart && u && u.length == 1) {
                        u = {
                            x: u[0].pageX,
                            y: u[0].pageY
                        };
                        e = u.y - t.touchStart.y;
                        Math.abs(e) >= getViewportSize().height / 5 ? e < 0 ? (o = t.next(), o ? (o.frameHwnd.show(u), i(this, "transition", function () {
                            var n = this.style;
                            n.top = -1 * height(this) + "px"
                        })) : t.revert(u, !0)) : (f = t.prev(), f && f.frameHwnd.show(u)) : e < 0 ? t.revert(u, !0) : (f = t.prev(), f && f.frameHwnd.revert(u, !1));
                        t.touchStart = null;
                        do r = (r || t).prev(),
                        r = r && r.frameHwnd,
                        r && (r.touchStart = null);
                        while (r);
                        do r = (r || t).next(),
                        r = r && r.frameHwnd,
                        r && (r.touchStart = null);
                        while (r)
                    }
            })
        }
        if (u) {
            var f = selectAll(".frame", u),
                s = 1e4;
            f.forEach(function (t, i) {
                    t.style.top = "0px";
                    t.style.zIndex = s - i;
                    e(t);
                    o(t);
                    t.style.height = n.height + "px"
                });
            t(f[0], "frameShow")
        }
    }
    function f() {
        function e(n) {
            if (!n) return n;
            for (var t = n.firstChild; t && t.nodeType != 1;) t = t.nextSibling;
            return t
        }
        function o(n) {
            var i = {},
                h = select(".profile-detail", n),
                c = select(".profile-pic", n),
                r, u, o, t, s;
            if (h) {
                    i.detail = h.innerHTML;
                    i.name = select(".profile-name", n).innerHTML;
                    i.pic = c.getAttribute("src");
                    r = select(f).innerHTML;
                    for (u in i) r = r.replace(new RegExp("@" + u, "g"), i[u]);
                    o = create("div");
                    o.innerHTML = r;
                    t = e(o);
                    t && (select(".people").appendChild(t), setTimeout(function () {
                        t.style.opacity = 1
                    }, 10), addEvent(t, "touchstart", function (n) {
                        n.preventDefault();
                        n.stopPropagation()
                    }), addEvent(t, "touchmove", function (n) {
                        n.preventDefault();
                        n.stopPropagation()
                    }), addEvent(t, "touchend", function (n) {
                        n.preventDefault();
                        n.stopPropagation()
                    }), s = select(".close", t), s && addEvent(s, "touchstart", function () {
                        t.style.opacity = 0;
                        setTimeout(function () {
                            t.parentNode.removeChild(t)
                        }, 500)
                    }))
                }
        }
        function s() {
            var i = n.style.webkitTransform || n.style.transform,
                r, u, t, f;
            for (i = i ? parseFloat(/^translateX\((-?\d+)px\)$/i.exec(i)[1]) : 0, r = [], u = selectAll("li.point", n), t = 0; t < u.length; t++) f = t * 145,
            r.push({
                    index: t,
                    position: i + f
                });
            return r.sort(function (n, t) {
                    return Math.abs(n.position) - Math.abs(t.position)
                }),
            r[0]
        }
        function h() {
            var t = s();
            selectAll("li.point", n).forEach(function (n, i) {
                removeClass(n, "current");
                t && i === t.index && addClass(n, "current")
            })
        }
        var f = "#profile-template",
            u = 300,
            n, t, r;
        selectAll(".people-list li", select(".people")).forEach(function (n) {
                addEvent(n, "touchstart", function (t) {
                    n.__waitingForMove = {
                        time: Number(new Date),
                        position: {
                            x: t.pageX,
                            y: t.pageY
                        }
                    };
                    setTimeout(function () {
                        n.__waitingForMove && (n.__waitingForMove = null, o(n))
                    }, u)
                });
                addEvent(n, "touchmove", function (t) {
                    var i = n.__waitingForMove;
                    i && (Math.abs(t.pageX - i.position.x) >= 20 || Math.abs(t.pageY - i.position.y)) && Number(new Date) - i.time < u && (n.__waitingForMove = null)
                })
            });
        n = select(".time-points", select(".agenda"));
        addEvent(n, "touchstart", function (n) {
                if (n.changedTouches && n.changedTouches.length && n.changedTouches.length == 1) {
                    var t = this.style.webkitTransform || this.style.transform;
										t = t ? parseFloat(/^translateX\((-?\d+(\.\d+)?)px\)$/i.exec(t)[1]) : 0;
                    this.__touchStart = {
                        x: n.changedTouches[0].pageX,
                        y: n.changedTouches[0].pageY,
                        xOffset: t
                    }
                }
            });
        addEvent(n, "touchmove", function (n) {
                if (this.__touchStart && n.changedTouches && n.changedTouches.length && n.changedTouches.length == 1) {
                    var t = n.changedTouches[0].pageX - this.__touchStart.x;
                    Math.abs(t) < 30 || (n.preventDefault(), n.stopPropagation(), this.style.webkitTransform = this.style.transform = "translateX(" + (this.__touchStart.xOffset + t) + "px)")
                }
            });
        addEvent(n, "touchend", function () {
                var n, r, u, t, f, e;
                for (this.__touchStart = null, n = this.style.webkitTransform || this.style.transform, n = n ? parseFloat(/^translateX\((-?\d+(\.\d+)?)px\)$/i.exec(n)[1]) : 0, r = [], u = selectAll("li.point", this), t = 0; t < u.length; t++) f = t * 145,
                r.push({
                    index: t,
                    position: n + f
                });
                r.sort(function (n, t) {
                    return Math.abs(n.position) - Math.abs(t.position)
                });
                e = n - r[0].position;
                i(this, "transition", function () {
                    this.style.webkitTransform = this.style.transform = "translateX(" + e + "px)";
                    h()
                })
            });
        addEvent(select(".location a.locate"), "touchstart", function (n) {
                n.preventDefault();
                n.stopPropagation();
                Z.lbs.markerMap({
                    onLoad: function () {
                        var n = select(".location .map-container");
                        n.style.display = "block";
                        n.style.opacity = 1;
                        addEvent(select(".location .map-container .back"), "touchstart", function () {
                            n.style.opacity = 0;
                            setTimeout(function () {
                                for (var t = select(".map", n); t.firstChild;) remove(t.firstChild);
                                n.style.display = "none"
                            }, 300)
                        })
                    },
                    parent: select(".location .map-container .map"),
                    make: function () {
                        return ""
                    },
                    data: [{
                        lat: 39.915763,
                        lng: 116.434797,
                        address: "北京国际饭店"
                    }]
                })
            });
        addEvent(select(".location .map-container"), "touchstart", function (n) {
                n.preventDefault();
                n.stopPropagation()
            });
        addEvent(select(".location .map-container"), "touchmove", function (n) {
                n.preventDefault();
                n.stopPropagation()
            });
        t = select(".application .apply-form-container");
        addEvent(select(".application .apply-button"), "touchstart", function () {
                return
            });
        addEvent(t, "touchmove", function (n) {
                n.preventDefault();
                n.stopPropagation()
            });
        r = select(".application .apply-form-container .close");
        r && addEvent(r, "touchstart", function () {
                document.activeElement && document.activeElement.blur();
                t.style.opacity = 0;
                setTimeout(function () {
                    t.style.display = "none"
                }, 500)
            });
        addEvent(select("#apply-phone"), "blur", function () {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0
            })
    }
    var e = select("body"),
        n;
    onReady(function () {
            function r() {
                window.scrollTo(0, -1)
            }
            function i() {
                function t() {
                    n.height < 480 && addClass(document.documentElement, "short-viewport");
                    var t = select("#frames");
                    u(t);
                    document.styleSheets[0].addRule(".frame", "background-image:url(bg.jpg);");
                    remove(select(".page-loading"));
                    t.style.display = "block";
                    addEvent(document, "touchmove", function (n) {
                        n.preventDefault()
                    });
                    f();
                    addEvent(window, "resize", r)
                }
                var i = window.getViewportSize().height,
                    e = function () {
                        if (i >= 500 || navigator.userAgent.indexOf("Safari") < 0) return !1;
                        var n = /Version\/([\d\.]+)\s/.exec(navigator.userAgent);
                        return n && parseFloat(n[1]) < 7
                    }();
                e ? (document.body.style.height = "1000px", window.scrollTo(0, -1), n = window.getViewportSize(), n.height += 60, document.body.style.height = n.height + "px", setTimeout(t, 200)) : (n = window.getViewportSize(), t())
            }
            var t = new Image;
            t.onload = function () {
                //navigator.userAgent && /(iPhone|iPad)/.test(navigator.userAgent) ? setTimeout(i, 200) : i()
                setTimeout(i, 200);
            };
            t.onerror = function () {
                confirm("出现了问题，要重新加载页面吗？") && location.reload();
            };
            t.src = "styles/bg.jpg";
        }),


    function () {
            document.addEventListener("WeixinJSBridgeReady", function () {
                var t = window.WeixinJSBridge,
                    n = window.dataForWeixin;
                t.on("menu:share:appmessage", function () {
                        t.invoke("sendAppMessage", {
                            appid: n.appId,
                            img_url: n.picture,
                            img_width: "120",
                            img_height: "120",
                            link: n.url,
                            desc: n.desc,
                            title: n.title
                        }, function () {})
                    });
                t.on("menu:share:timeline", function () {
                        t.invoke("shareTimeline", {
                            img_url: n.picture,
                            img_width: "120",
                            img_height: "120",
                            link: n.url,
                            desc: n.title,
                            title: n.desc
                        }, function () {})
                    })
            }, !1)
        }()
})()