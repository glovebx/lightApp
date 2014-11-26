(function () {
    function r(t) {
        return function (r) {
            if (n === null) t(r);
            else if (n.push(function () {
                t(r)
            }), n.length === 1) {
                window.bdmapInit = function () {
                    i(n, function (n) {
                        n()
                    });
                    n = null;
                    delete window.bdmapInit
                };
                var u = document.createElement("script");
                u.src = "http://api.map.baidu.com/api?type=quick&ak=D5a271a3083d77f21c63ff307e9f60b9&v=1.0&callback=bdmapInit";
                document.body.appendChild(u)
            }
        }
    }
    function o(n) {
        var t = "";
        return t += "http://api.map.baidu.com/marker?location=",
        t += n.lat + ",",
        t += n.lng + "&title=",
        t += n.address,
        t + "&content=&output=html"
    }
    var u = Z.onTouchStart,
        i = Z.loopArray,
        t = Z.css,
        n = [],
        f = r(function (n) {
            var e = n.parent,
                s = n.make,
                h = n.data,
                o, r, f;
            n.onLoad && n.onLoad();
            o = document.createElement("div");
            t(e, "visibility", "hidden");
            t(o, {
                    height: "100%",
                    width: "100%"
                });
            e.appendChild(o);
            u(e, function (n) {
                    n.stopPropagation()
                });
            r = new BMap.Map(o);
            f = [];
            i(h, function (n) {
                    var i = new BMap.Point(parseFloat(n.lng), parseFloat(n.lat)),
                        t = new BMap.Marker(i),
                        u;
                    r.addOverlay(t);
                    f.push(i);
                    n.hasOwnProperty("name") && (u = new BMap.InfoWindow(s(n)), t.addEventListener("click", function () {
                            t.openInfoWindow(u)
                        }))
                });
            f.length !== 0 ? (r.centerAndZoom(f[0], 16), r.setViewport(f)) : r.centerAndZoom("北京市");
            t(e, "visibility", "visible")
        }),
        e = r(function (n) {
            navigator.geolocation.getCurrentPosition(function (t) {
                var i = new BMap.Geocoder;
                i.getLocation(new BMap.Point(t.coords.longitude, t.coords.latitude), n.onLoad)
            }, n.onError, {
                timeout: 2e3,
                maximumAge: 6e5,
                enableHighAccuracy: !0
            })
        });
    Z.lbs = {
            markerMap: f,
            mapLink: o,
            getPosition: e
        }
})()