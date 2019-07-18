//监听div大小变化
(function ($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function (l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function () {
            a.each(function () {
                var n = $(this),
                    m = n.width(),
                    l = n.height(),
                    o = $.data(this, d);
                if (m !== o.w || l !== o.h) {
                    n.trigger(j, [o.w = m, o.h = l]);
                }
            });
            g();
        },
            e[b]);
    }
})(jQuery, this);

function getOffsetLeft(element) {
    let offsetLeft = 0;
    while (element && element.tagName !== 'HTML') {
        offsetLeft += element.offsetLeft;
        element = element.offsetParent;
    }
    return offsetLeft
}

function getOffsetTop(element) {
    let offsetTop = 0;
    while (element && element.tagName !== 'HTML') {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}

var curEvent = undefined;
function init3DView(eventObj, bTrans) {
    var bindEle = eventObj.contentDocument.getElementById("id3DView");
    if (bindEle == undefined || bindEle == null) return;
    bind3DView(bindEle);

    const bFuncEnableTrans = function (e) {
        let bRet = false;
        if (($(e.target).css("opacity") == 0 || $(e.target).css("background").toUpperCase() == "rgba(0, 0, 0, 0)".toUpperCase()) || e.target == bindEle) {
            bRet = true;
        }
        return bRet;
    }
    let bEventTrans = bTrans;

    bindEle.onmousemove = (function (e) {
        BL3D_mouseMoveEvent(bindEle, e);
    });
    bindEle.ondblclick = (function (e) {
        if (bEventTrans && bFuncEnableTrans(e)) {
            BL3D_mouseDoubleClickEvent(bindEle, e);
            e.preventDefault();
        }
    });

    var onEleMouseDown = (function (e) {
        curEvent = e;
        if (bEventTrans && bFuncEnableTrans(e)) {
            BL3D_mousePressEvent(bindEle, e);
            e.preventDefault();
            curEvent = undefined;
        }
    });

    bindEle.onmousedown = onEleMouseDown;

    bindEle.onmouseup = (function (e) {
        if (bEventTrans) {
            BL3D_mouseReleaseEvent(bindEle, e);
            e.preventDefault();
        }
    });
    
    eventObj.contentWindow.document.onkeydown = (function (e) {
        if (bEventTrans) {
            BL3D_keyPressEvent(bindEle, e);
            e.preventDefault();
        }
    });
    eventObj.contentWindow.document.onkeyup = (function (e) {
        if (bEventTrans) {
            BL3D_keyReleaseEvent(bindEle, e);
            e.preventDefault();
        }
    });

    $(eventObj).resize(function () {
        threeviewObj.resizeEvent(getOffsetLeft(eventObj), getOffsetTop(eventObj), eventObj.offsetWidth, eventObj.offsetHeight);
    });

    bindEle.onmousewheel = (function (e) {
        if (bEventTrans && bFuncEnableTrans(e)) {
            BL3D_wheelEvent(bindEle, e);
            e.preventDefault();
        }
    });
    BL3D_resizeEvent(bindEle, getOffsetLeft(eventObj), getOffsetTop(eventObj), eventObj.offsetWidth, eventObj.offsetHeight);
};