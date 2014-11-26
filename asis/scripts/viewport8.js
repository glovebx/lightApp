window.getViewportSize = function () {
    var n = function (n, t) {
        var i = n.matchMedia || n.msMatchMedia,
            u = t.clientWidth,
            r = n.innerWidth;
        return i && u < r && !0 === i("(min-width:" + r + "px)").matches ?
        function () {
                return n.innerWidth
            } : function () {
                return t.clientWidth
            }
    }(window, document.documentElement),
        t = function (n, t) {
            var i = n.matchMedia || n.msMatchMedia,
                u = t.clientHeight,
                r = n.innerHeight;
            return i && u < r && !0 === i("(min-height:" + r + "px)").matches ?
            function () {
                    return n.innerHeight
                } : function () {
                    return t.clientHeight
                }
        }(window, document.documentElement);
    return {
            width: n(),
            height: t()
        }
}