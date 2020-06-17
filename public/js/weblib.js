function ShowDashBoard() {
    var content = $('.content');
    if(content.length > 0)
    {
        content.remove();
    }
    $.ajax({ url: "/dashboard", context: $('.main-container'), success: function(result){
            $(this).append(result);
        }});
}

function OnLogoutBtnClick() {

    $.ajax({
        url: '/',
        type: 'POST',
        data: {
        },success: function(data){
            if(data.result == "ok"){
                location.href="/login";
            }
        }
    });
}

function FilterDashboard(pageNumber)
{
    var content = $('.content');
    if(content.length > 0)
    {
        content.remove();
    }
    $.ajax({ url: "/tasklist", context: $('.main-container'), data:{
        page: pageNumber
    }, success: function(result){
        $(this).append(result);
    }});
}

function OnReStartSearch() {
    $.ajax({
        url: '/dashboard/restart',
        type: 'POST',
        data: {
            rule: $('#searchRule').val() == "" ? "1 1 23 * * *" : $('#searchRule').val()
        },success: function(data){
            if(data.result == "ok"){
                location.reload();
            }
        }
    });
}

function OnStartSearch() {
    $.ajax({
        url: '/dashboard/start',
        type: 'POST',
        data: {
        },success: function(data){
            if(data.result == "ok"){
                location.reload();
            }
        }
    });
}


function OnControlTabClick(element, id)
{
    $('.nav-link.active').removeClass('active')
    $(element).addClass('active')
    switch (id) {
        case 1:
            ShowDashBoard();
            break;
        case 2:
            FilterDashboard(0);
            break;
    }
}

function ShowDashBoardCount(start, end) {
    var content = $('.content');
    if(content.length > 0)
    {
        content.remove();
    }
    $.ajax({ url: "/dashboard_count", context: $('.main-container'), data:{
        start: start,
        end: end
    }, success: function(result){
        $(this).append(result);
    }});
}

function OnSearchStartAndEnd()
{
    ShowDashBoardCount($('#searchStart').val(), $('#searchEnd').val())
}

function OnStartClick()
{
    var data = undefined;
    try
    {
        data = JSON.parse($('.tx').val());
    }catch(e)
    {
        alert("json解析失败，切换为code模式");
        data = {data: $('.tx').val(), task:$('.txtask').val()};
    }
    try
    {
        $.ajax({
            url: '/dashboard',
            type: 'POST',
            data: data,
            success: function(res){
                if(res.code == 200){
                    alert("爬虫已经启动");
                }
                else
                {
                    alert("爬虫启动失败");
                }
            }
        });
    }
    catch(e)
    {
        alert(e.message);
    }
}

! function(n, t, r, i, o, a, e, c, u, f, s, l, m, h, v) {
    var p, d = 390,
        g = "isg",
        y = c,
        b = !!y.addEventListener,
        w = u.getElementsByTagName("head")[0],
        _ = f.userAgent;
    ! function(n) {
        function t() {
            return 4294967295 * i.random() >>> 0
        }

        function a(n) {
            var t;
            switch (typeof n) {
                case "function":
                    t = w.call(n);
                    break;
                case "object":
                    try {
                        t = n + ""
                    } catch (r) {
                        return !1
                    }
                    break;
                default:
                    return !1
            }
            return g.test(t)
        }

        function e(n) {
            for (var t = 0, r = 0, i = n.length; r < i; r++) t = (t << 5) - t + n.charCodeAt(r), t >>>= 0;
            return t
        }

        function c(n, t) {
            var r = n.indexOf(t);
            return -1 === r ? n : n.substr(0, r)
        }

        function f(n, t) {
            var r = n.indexOf(t);
            return -1 === r ? n : n.substr(r + t.length)
        }

        function s(n) {
            var t = n.match(_);
            if (!t) return null;
            var r = t[1];
            return k.test(r) && (r = f(r, "@"), r = c(r, ":")), r
        }

        function l(n) {
            for (var t = 0, r = n.length - 1; r >= 0; r--) {
                t = t << 1 | (0 | +n[r])
            }
            return t
        }

        function m(n, t, r, i) {
            b ? n.addEventListener(t, r, i) : n.attachEvent && n.attachEvent("on" + t, function() {
                r(event)
            })
        }

        function h(n) {
            try {
                return localStorage[n + "__"]
            } catch (t) {}
        }

        function v(n, t) {
            try {
                localStorage[n + "__"] = t
            } catch (r) {}
        }

        function p() {
            var n = y.outerWidth;
            return null == n && (n = u.documentElement.clientWidth || u.body.clientWidth), n
        }

        function d() {
            var n = y.outerHeight;
            return null == n && (n = u.documentElement.clientHeight || u.body.clientHeight), n
        }
        n.a = t;
        var g = /native code/,
            w = r.prototype.toString;
        n.b = a, n.c = e, n.d = o.now || function() {
            return +new o
        }, n.e = c, n.f = f;
        var _ = /^(?:https?:)?\/{2,}([^/?#\\]+)/i,
            k = /[@:]/;
        n.g = s, n.h = l, n.i = m, n.j = h, n.k = v, n.l = p, n.m = d
    }(p || (p = {}));
    var k, x = function() {
        function n(n) {
            this.n = new a("(?:^|; )" + n + "=([^;]+)", "g"), this.o = n + "=", this.p = ""
        }
        return n.prototype.q = function() {
            try {
                var n = u.cookie
            } catch (i) {
                return
            }
            for (var t, r = []; t = this.n.exec(n);) r.push(t[1]);
            return r
        }, n.prototype.r = function() {
            return this.q()[0]
        }, n.prototype.s = function(n) {
            if (!this.p) {
                var t = "";
                this.t && (t += "; domain=" + this.t), this.u && (t += "; path=" + this.u), this.v && (t += "; expires=" + this.v), this.p = t
            }
            try {
                u.cookie = this.o + n + this.p
            } catch (r) {}
        }, n.prototype.w = function() {
            var n = this.v;
            this.x("Thu, 01 Jan 1970 00:00:00 GMT"), this.s(""), this.x(n)
        }, n.prototype.y = function(n) {
            this.t = n, this.p = ""
        }, n.prototype.z = function(n) {
            this.u = n, this.p = ""
        }, n.prototype.x = function(n) {
            this.v = n, this.p = ""
        }, n
    }();
    ! function(n) {
        function t(n) {
            var t = n.stack || n.message;
            s(function(n) {
                r(t)
            }, 1)
        }

        function r(n) {
            var t = u._sufei_log;
            if (null == t && (t = .001), !(i.random() > t)) {
                c({
                    code: 1,
                    msg: (n + "").substr(0, 1e3),
                    pid: "sufeidata",
                    page: l.href.split(/[#?]/)[0],
                    query: l.search.substr(1),
                    hash: l.hash,
                    referrer: u.referrer,
                    title: u.title,
                    ua: f.userAgent,
                    rel: d,
                    c1: a()
                }, "//gm.mmstat.com/fsp.1.1?")
            }
        }

        function o(n, t, r) {
            if (!(_.indexOf("XueXi") >= 0)) {
                n = (n || "").substr(0, 2e3);
                c({
                    url: n,
                    token: t,
                    cna: a(),
                    ext: r
                }, "https://fourier.taobao.com/ts?")
            }
        }

        function a() {
            return null == m && (m = new x("cna").r() || ""), m
        }

        function c(n, t) {
            var r = [];
            for (var i in n) r.push(i + "=" + e(n[i]));
            (new v).src = t + r.join("&")
        }
        n.A = t, n.B = r, n.C = o;
        var m
    }(k || (k = {}));
    var z;
    ! function(n) {
        function t() {
            if (mn) {
                var n = J + ":" + hn + ":" + mn.join(",");
                k.C("", n, 4), mn = null
            }
        }

        function r(n) {
            Z = n.clientX, nn = n.clientY, J++, tn = a(rn, on)
        }

        function o(n) {
            G = n.isTrusted;
            var t = n.touches[0];
            Z = t.clientX, nn = t.clientY, J++, tn = a(rn, on)
        }

        function a(n, t) {
            return 0 <= n && n <= p.l() && 0 <= t && t <= p.m()
        }

        function e(n) {
            if (Y = n.isTrusted, b) {
                var r = n.target,
                    o = r.offsetWidth >> 1,
                    a = r.offsetHeight >> 1;
                if (!(o < 10 && a < 10)) {
                    var e = i.abs(n.offsetX - o),
                        u = i.abs(n.offsetY - a),
                        f = e < 2 && u < 2;
                    if (f && hn++, hn >= 3 && (3 === hn && (s(t, 2e4), p.i(c, "unload", t)), mn && mn.length < 20)) {
                        var l = (f ? "" : "!") + r.tagName;
                        mn.push(l)
                    }
                }
            }
        }

        function m(n) {
            Y = n.isTrusted, rn = n.clientX, on = n.clientY, F++
        }

        function v(n) {
            G = n.isTrusted;
            var t = n.touches[0];
            rn = t.clientX, on = t.clientY, F++
        }

        function d(n) {
            V++
        }

        function g(n) {
            K++
        }

        function w() {
            var n = h.availWidth,
                t = p.l();
            U = n - t < 20, an = y.innerWidth, en = y.innerHeight
        }

        function x(n) {
            $ = !0, cn = !0
        }

        function z(n) {
            cn = !1
        }

        function A(n) {
            ln = n.gamma, sn || (sn = s(function(n) {
                removeEventListener("deviceorientation", A), s(D, 470)
            }, 30))
        }

        function D() {
            sn = 0, addEventListener("deviceorientation", A)
        }

        function E() {
            if ("ontouchmove" in u && (p.i(u, "touchmove", v, !0), p.i(u, "touchstart", o, !0)), p.i(u, "mousemove", m, !0), p.i(u, "mousedown", r, !0), p.i(u, "click", e, !0), p.i(u, "keydown", g, !0), p.i(c, "scroll", d, !0), p.i(c, "focus", x), p.i(c, "blur", z), p.i(c, "resize", w), w(), f.getBattery) {
                var n = f.getBattery();
                n && (n.then(function(n) {
                    Q = n
                })["catch"](function(n) {}), un = !0)
            }
            fn && D()
        }

        function j() {
            return F
        }

        function T() {
            return V
        }

        function M() {
            return J
        }

        function L() {
            return K
        }

        function B() {
            var n = Z,
                t = nn;
            n || t || (n = rn, t = on);
            var r = Y === undefined && G === undefined || !0 === Y || !0 === G;
            return Y = undefined, G = undefined, {
                J: n,
                K: t,
                L: r
            }
        }

        function W() {
            return [an, en]
        }

        function H() {
            return tn
        }

        function O() {
            var n = u.hidden;
            return null == n && (n = u.mozHidden), !n
        }

        function S() {
            return cn
        }

        function X() {
            return $
        }

        function C() {
            return U
        }

        function I() {
            return un
        }

        function P() {
            return !Q || Q.charging
        }

        function R() {
            return Q ? 100 * Q.level : 127
        }

        function q() {
            return fn && null != ln
        }

        function N() {
            return fn && null != ln ? ln + 90 : 255
        }
        var Y, G, U, $, Q, F = 0,
            J = 0,
            V = 0,
            K = 0,
            Z = 0,
            nn = 0,
            tn = !0,
            rn = 0,
            on = 0,
            an = 0,
            en = 0,
            cn = !0,
            un = !1,
            fn = !!y.DeviceOrientationEvent;
        (/dingtalk|youku|uczzd\.cn|sm\.cn|uc\.cn/.test(l.hostname) || /Qianniu|DingTalk|Youku/.test(_)) && (fn = !1);
        var sn, ln = null,
            mn = [],
            hn = 0;
        n.D = E, n.F = j, n.G = T, n.H = M, n.I = L, n.M = B, n.N = W, n.O = H, n.P = O, n.Q = S, n.R = X, n.S = C, n.T = I, n.U = P, n.V = R, n.W = q, n.X = N
    }(z || (z = {}));
    var A;
    ! function(n) {
        function r() {
            return "$cdc_asdjflasutopfhvcZLmcfl_" in u || f.webdriver
        }

        function i() {
            if (a()) return !1;
            try {
                var n = u.createElement("canvas"),
                    t = n.getContext("webgl");
                if (t) {
                    var r = t.getExtension("WEBGL_lose_context");
                    r && r.loseContext()
                }
                return !!t
            } catch (i) {
                return !1
            }
        }

        function a() {
            return "ontouchstart" in u
        }

        function e() {
            return /zh-cn/i.test(f.language || f.systemLanguage)
        }

        function s() {
            return -480 === (new o).getTimezoneOffset()
        }

        function l() {
            return z.O()
        }

        function m() {
            return z.W()
        }

        function h() {
            return z.T()
        }

        function v() {
            return z.U()
        }

        function d() {
            var n = p.l(),
                t = p.m(),
                r = z.N(),
                i = r[0],
                o = r[1];
            if (null == i || null == o) return !1;
            var a = n - i,
                e = t - o;
            return a > 240 || e > 150
        }

        function g() {
            return D && ("complete" !== u.readyState || p.d() - E > 1e4 || z.F() || z.G() || z.H() || z.I()) && (D = !1), D
        }

        function k() {
            for (var n = 0; n < M.length; n++) j[T.length + n] = M[n]();
            return p.h(j)
        }

        function x() {
            for (var n in S)
                if (S.hasOwnProperty(n)) {
                    var t = S[n];
                    if (t()) return +n.substr(1)
                } return 0
        }

        function A() {
            E = p.d();
            for (var n = 0; n < T.length; n++) j[n] = T[n]()
        }
        var D = !0,
            E = 0,
            j = t(16),
            T = [r, i, a, e, s],
            M = [l, m, h, v, g, d];
        n.Y = g, n.Z = k;
        var L = f.vendor,
            B = w.style,
            W = "chrome" in c,
            H = "ActiveXObject" in c,
            O = p.b(y.WeakMap),
            S = {
                _13: function() {
                    return "callPhantom" in y || /PhantomJS/i.test(_)
                },
                _14: function() {
                    return /python/i.test(f.appVersion)
                },
                _15: function() {
                    return "sgAppName" in f
                },
                _16: function() {
                    return /Maxthon/i.test(L)
                },
                _17: function() {
                    return "opr" in y
                },
                _18: function() {
                    return W && /BIDUBrowser/i.test(_)
                },
                _19: function() {
                    return W && /LBBROWSER/i.test(_)
                },
                _20: function() {
                    return W && /QQBrowser/.test(_)
                },
                _21: function() {
                    return W && /UBrowser/i.test(_)
                },
                _22: function() {
                    return W && /2345Explorer/.test(_)
                },
                _23: function() {
                    return W && /TheWorld/.test(_)
                },
                _24: function() {
                    return W && "MSGesture" in y
                },
                _26: function() {
                    return "aef" in y && /WW_IMSDK/.test(_)
                },
                _25: function() {
                    return /Qianniu/.test(_)
                },
                _1: function() {
                    return W
                },
                _2: function() {
                    return "mozRTCIceCandidate" in y || "mozInnerScreenY" in y
                },
                _3: function() {
                    return "safari" in y
                },
                _4: function() {
                    return H && !("maxHeight" in B)
                },
                _5: function() {
                    return H && !p.b(y.postMessage)
                },
                _6: function() {
                    return H && !b
                },
                _7: function() {
                    return H && !p.b(y.Uint8Array)
                },
                _8: function() {
                    return H && !O
                },
                _9: function() {
                    return H && O
                },
                _10: function() {
                    return "Google Inc." === f.vendor
                },
                _11: function() {
                    return "Apple Computer, Inc." === f.vendor
                },
                _12: function() {
                    return H
                }
            };
        n.$ = x, n.D = A
    }(A || (A = {}));
    var D, E = function() {
        function n() {
            var n = this,
                t = y.WeakMap;
            if (t) this._ = new t;
            else {
                var r = function() {
                    n.aa = [], n.ba = []
                };
                r(), setInterval(r, 1e4)
            }
        }
        return n.prototype.ca = function(n, t) {
            var r = this._;
            r ? r.set(n, t) : (this.aa.push(n), this.ba.push(t))
        }, n.prototype.da = function(n) {
            var t = this._;
            if (t) return t.get(n);
            var r = this.aa.indexOf(n);
            return r >= 0 ? this.ba[r] : void 0
        }, n
    }();
    ! function(n) {
        function t() {
            n.ea = r("1688.com,95095.com,a-isv.org,aliapp.org,alibaba-inc.com,alibaba.com,alibaba.net,alibabacapital.com,alibabacloud.com,alibabacorp.com,alibabadoctor.com,alibabagroup.com,alicdn.com,alidayu.com,aliexpress.com,alifanyi.com,alihealth.cn,alihealth.com.cn,alihealth.hk,alikmd.com,alimama.com,alimei.com,alios.cn,alipay-corp.com,alipay.com,aliplus.com,alisoft.com,alisports.com,alitianji.com,alitrip.com,alitrip.hk,aliunicorn.com,aliway.com,aliwork.com,alixiaomi.com,aliyun-inc.com,aliyun.com,aliyun.xin,aliyuncs.com,alizhaopin.com,amap.com,antfinancial-corp.com,antsdaq-corp.com,asczwa.com,atatech.org,autonavi.com,b2byao.com,bcvbw.com,cainiao-inc.cn,cainiao-inc.com,cainiao.com,cainiao.com.cn,cainiaoyizhan.com,cheng.xin,cibntv.net,cnzz.com,damai.cn,ddurl.to,dingding.xin,dingtalk.com,dingtalkapps.com,doctoryou.ai,doctoryou.cn,dratio.com,etao.com,feizhu.cn,feizhu.com,fliggy.com,fliggy.hk,freshhema.com,gaode.com,gein.cn,gongyi.xin,guoguo-app.com,hemaos.com,heyi.test,hichina.com,itao.com,jingguan.ai,jiyoujia.com,juhuasuan.com,koubei-corp.com,kumiao.com,laifeng.com,laiwang.com,lazada.co.id,lazada.co.th,lazada.com,lazada.com.my,lazada.com.ph,lazada.sg,lazada.vn,liangxinyao.com,lingshoujia.com,lwurl.to,mashangfangxin.com,mashort.cn,mdeer.com,miaostreet.com,mmstat.com,mshare.cc,mybank-corp.cn,nic.xin,pailitao.com,phpwind.com,phpwind.net,saee.org.cn,shenjing.com,shyhhema.com,sm.cn,soku.com,tanx.com,taobao.com,taobao.org,taopiaopiao.com,tb.cn,tmall.com,tmall.hk,tmall.ru,tmjl.ai,tudou.com,umeng.co,umeng.com,umengcloud.com,umsns.com,umtrack.com,wasu.tv,whalecloud.com,wrating.com,www.net.cn,xiami.com,ykimg.com,youku.com,yowhale.com,yunos-inc.com,yunos.com,yushanfang.com,zmxy-corp.com.cn,zuodao.com"), n.fa = r("127.0.0.1,afptrack.alimama.com,aldcdn.tmall.com,delivery.dayu.com,hzapush.aliexpress.com,local.alipcsec.com,localhost.wwbizsrv.alibaba.com,napi.uc.cn,sec.taobao.com,tce.alicdn.com,un.alibaba-inc.com,utp.ucweb.com,ynuf.aliapp.org"), n.ga = r("akamaized.net,alibaba-inc.com,alicdn.com,aliimg.com,alimama.cn,alimmdn.com,alipay.com,alivecdn.com,aliyun.com,aliyuncs.com,amap.com,autonavi.com,cibntv.net,cnzz.com,criteo.com,doubleclick.net,facebook.com,facebook.net,google-analytics.com,google.com,googleapis.com,greencompute.org,lesiclub.cn,linezing.com,mmcdn.cn,mmstat.com,sm-tc.cn,sm.cn,soku.com,tanx.com,taobaocdn.com,tbcache.com,tbcdn.cn,tudou.com,uczzd.cn,umeng.com,us.ynuf.aliapp.org,wrating.com,xiami.net,xiaoshuo1-sm.com,yandex.ru,ykimg.com,youku.com,zimgs.cn")
        }

        function r(n) {
            for (var t = {}, r = n.split(","), i = 0; i < r.length; i++) t[r[i]] = !0;
            return t
        }
        n.D = t
    }(D || (D = {}));
    var j;
    ! function(t) {
        function r(n, t, r) {
            switch (r.length) {
                case 0:
                    return t();
                case 1:
                    return t(r[0]);
                case 2:
                    return t(r[0], r[1]);
                default:
                    return t(r[0], r[2], r[3])
            }
        }

        function i(n, t) {
            switch (t.length) {
                case 0:
                    return new n;
                case 1:
                    return new n(t[0]);
                case 2:
                    return new n(t[0], t[1]);
                default:
                    return new n(t[0], t[2], t[3])
            }
        }

        function o(n, o, a) {
            return function() {
                var e, c = arguments;
                try {
                    e = o(c, this, n)
                } catch (u) {
                    e = c, k.A(u)
                }
                if (e) {
                    if (e === t.ha) return;
                    c = e
                }
                return a ? i(n, c) : "apply" in n ? n.apply(this, c) : r(this, n, c)
            }
        }

        function a(n, t, r) {
            if (!n) return !1;
            var i = n[t];
            return !!i && (n[t] = o(i, r, !1), !0)
        }

        function e(n, t, r) {
            if (!n) return !1;
            var i = n[t];
            return !!i && (n[t] = o(i, r, !0), !0)
        }

        function c(t, r, i) {
            if (!u) return !1;
            var a = u(t, r);
            return !(!a || !a.set) && (a.set = o(a.set, i, !1), b || (a.get = function(n) {
                return function() {
                    return n.call(this)
                }
            }(a.get)), n.defineProperty(t, r, a), !0)
        }
        t.ha = -1;
        var u = n.getOwnPropertyDescriptor;
        t.ia = a, t.ja = e, t.ka = c
    }(j || (j = {}));
    var T, M = function() {
        function n(n) {
            this.la = n;
            for (var t = 0, r = n.length; t < r; t++) this[t] = 0
        }
        return n.prototype.ma = function() {
            for (var n = this.la, t = [], r = -1, i = 0, o = n.length; i < o; i++)
                for (var a = this[i], e = n[i], c = r += e; t[c] = 255 & a, 0 != --e;) --c, a >>= 8;
            return t
        }, n.prototype.na = function(n) {
            for (var t = this.la, r = 0, i = 0, o = t.length; i < o; i++) {
                var a = t[i],
                    e = 0;
                do {
                    e = e << 8 | n[r++]
                } while (--a > 0);
                this[i] = e >>> 0
            }
        }, n
    }();
    ! function(n) {
        function t(n) {
            for (var t = 0, r = 0, i = n.length; r < i; r++) t = (t << 5) - t + n[r];
            return 255 & t
        }

        function r(n, t, r, i, o) {
            for (var a = n.length; t < a;) r[i++] = n[t++] ^ 255 & o, o = ~(131 * o)
        }

        function i(n) {
            for (var t = [], r = n.length, i = 0; i < r; i += 3) {
                var o = n[i] << 16 | n[i + 1] << 8 | n[i + 2];
                t.push(f.charAt(o >> 18), f.charAt(o >> 12 & 63), f.charAt(o >> 6 & 63), f.charAt(63 & o))
            }
            return t.join("")
        }

        function o(n) {
            for (var t = [], r = 0; r < n.length; r += 4) {
                var i = s[n.charAt(r)] << 18 | s[n.charAt(r + 1)] << 12 | s[n.charAt(r + 2)] << 6 | s[n.charAt(r + 3)];
                t.push(i >> 16, i >> 8 & 255, 255 & i)
            }
            return t
        }

        function a() {
            for (var n = 0; n < 64; n++) {
                var t = f.charAt(n);
                s[t] = n
            }
        }

        function e(n) {
            var o = t(n),
                a = [u, o];
            return r(n, 0, a, 2, o), i(a)
        }

        function c(n) {
            var i = o(n),
                a = i[1],
                e = [];
            if (r(i, 2, e, 0, a), t(e) == a) return e
        }
        var u = 4,
            f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
            s = {};
        n.D = a, n.oa = e, n.pa = c
    }(T || (T = {}));
    var L;
    ! function(n) {
        function t() {
            for (var n = f.platform, t = 0; t < r.length; t++)
                if (r[t].test(n)) return t + 1;
            return 0
        }
        var r = [/^Win32/, /^Win64/, /^Linux armv|^Linux aarch64/, /^Android/, /^iPhone/, /^iPad/, /^MacIntel/, /^Linux [ix]\d+/, /^ARM/, /^iPod/, /^BlackBerry/];
        n.qa = t
    }(L || (L = {}));
    var B;
    ! function(n) {
        function t() {
            return p.d() / 1e3 >>> 0
        }

        function r(n) {
            if (z.D(), A.D(), n) {
                var t = T.pa(n);
                t && o.na(t)
            }
            o[1] = p.a(), o[5] = A.$(), o[6] = L.qa(), o[8] = p.c(f.userAgent), o[7] = 0
        }

        function i(n, r) {
            0 == o[4] && (o[4] = p.a(), o[3] = t()), o[2] = t(), o[16] = A.Z();
            var i = !1;
            if (!A.Y()) {
                o[9] = z.F(), o[10] = z.G(), o[11] = z.H(), o[12] = z.I();
                var e = z.M();
                o[13] = e.J, o[14] = e.K, i = e.L
            }
            o[17] = z.X(), o[18] = z.V();
            var c = z.Q(),
                u = z.S(),
                f = z.R(),
                s = [r, z.P(), n, c, i, !0, f, u];
            n && a++, o[15] = p.h(s), o[0] = a;
            var l = o.ma(),
                m = T.oa(l);
            return m
        }
        var o = new M([2, 2, 4, 4, 4, 1, 1, 4, 4, 3, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1]),
            a = 0;
        n.D = r, n.ra = i
    }(B || (B = {}));
    var W;
    ! function(n) {
        function t(n, t) {
            var r = n.split("."),
                i = r.length - 1,
                o = r[i];
            if (o in t) return !0;
            for (var a = i - 1; a >= 0; a--)
                if ((o = r[a] + "." + o) in t) return !0;
            return !1
        }

        function r(n) {
            var t = l.hostname;
            if (E.test(t)) return z.s(n), t;
            var r = t.split("."),
                i = r.length;
            if (1 === i) return z.s(n), t;
            i > 5 && (i = 5), t = r.pop();
            for (var o = 2; o <= i && (t = r.pop() + "." + t, z.y(t), z.s(n), !(t in D.ea || t in D.fa || t in D.ga)) && z.r() !== n; o++);
            return t
        }

        function i(n) {
            var t = r(n),
                i = "(^|\\.)" + t.replace(/\./g, "\\.") + "$";
            _ = new a(i, "i")
        }

        function e() {
            A = null;
            var n = B.ra(!1, !1);
            z.s(n), p.k(g, n)
        }

        function f() {
            var n = B.ra(!0, !1);
            z.s(n), null == A && (A = s(e, 20))
        }

        function m(n, t) {
            /^\/\//.test(n) && (n = l.protocol + n);
            var r = B.ra(!0, !1);
            k.C(n, r, t)
        }

        function h(n, t) {
            if (t)
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (i.test && i.test(n)) return !0
                }
            return !1
        }

        function v(n) {
            var r;
            if (null != n && (n += "", r = p.g(n)), !r) return f(), !0;
            if (_.test(r)) return f(), !0;
            if (E.test(r)) return !1;
            var i = p.e(n, "?");
            return h(i, y.__sufei_point_list) ? (m(n, 0), !1) : !t(r, D.ga) && (!(r in D.fa) && (!/\/gw-open\/|\/gw\/|ascp\.alibaba\.com/.test(i) && (!h(i, y.__sufei_ignore_list) && (m(n, 0), !1))))
        }

        function d(n) {
            var r = u.referrer;
            if (r) {
                var i = p.g(r);
                if (i && t(i, D.ea)) return
            }
            m(r, 1)
        }

        function b() {
            z.w();
            for (var n = l.hostname.split("."), t = n.pop();;) {
                var r = n.pop();
                if (!r) break;
                t = r + "." + t, z.y(t), z.w()
            }
        }

        function w() {
            D.D(), z = new x(g);
            var n = new o(p.d() + 15552e6).toUTCString();
            z.x(n), z.z("/");
            var t = z.q();
            t.length > 1 && (k.B("exist_multi_isg"), b(), z.q().length > 0 && k.B("clear_fail"));
            var r = t[0];
            r || (r = p.j(g)), B.D(r), r = B.ra(!1, !1), i(r), 0 === t.length && d(r), p.i(c, "unload", function(n) {
                var t = B.ra(!1, !0);
                z.s(t), p.k(g, t)
            })
        }
        var _, z, A, E = /^(\d+\.)*\d+$/;
        n.sa = f, n.ta = v, n.D = w
    }(W || (W = {}));
    var H;
    ! function(n) {
        function t() {
            r() || (i("insertBefore"), i("appendChild"))
        }

        function r() {
            var n = y.HTMLScriptElement;
            if (!n) return !1;
            var t = n.prototype,
                r = /^src$/i;
            return j.ia(t, "setAttribute", function(n) {
                var t = n[0],
                    i = n[1];
                r.test(t) && a(i)
            }), j.ka(t, "src", function(n) {
                a(n[0])
            })
        }

        function i(n) {
            var t = y.Element;
            t ? j.ia(t.prototype, n, o) : (j.ia(w, n, o), j.ia(u.body, n, o))
        }

        function o(n) {
            var t = n[0];
            t && "SCRIPT" === t.tagName && a(t.src)
        }

        function a(n) {
            n += "", e.test(n) && W.ta(n)
        }
        n.D = t;
        var e = /callback=/
    }(H || (H = {}));
    var O;
    ! function(n) {
        function t(n) {
            return p.e(n.href, "#")
        }

        function r(n) {
            var t = n.target;
            if (!t) {
                var r = f[0];
                r && (t = r.target)
            }
            return t
        }

        function i(n) {
            if (/^https?\:/.test(n.protocol)) {
                var i = r(n);
                if (!i || /^_self$/i.test(i)) {
                    if (t(n) === c && n.hash) return
                }
                W.ta(n.href)
            }
        }

        function o(n) {
            if (!n.defaultPrevented)
                for (var t = n.target || n.srcElement; t;) {
                    var r = t.tagName;
                    if ("A" === r || "AREA" === r) {
                        i(t);
                        break
                    }
                    t = t.parentNode
                }
        }

        function a(n) {
            var t = n.target || n.srcElement;
            s.da(t) !== m && W.ta(t.getAttribute("action"))
        }

        function e() {
            f = u.getElementsByTagName("base"), c = t(l), p.i(u, "click", o), p.i(u, "submit", a);
            var n = y.HTMLFormElement;
            n && j.ia(n.prototype, "submit", function(n, t) {
                var r = t;
                W.ta(r.getAttribute("action")), s.ca(r, ++m)
            })
        }
        var c, f, s = new E,
            m = 0;
        n.D = e
    }(O || (O = {}));
    var S;
    ! function(n) {
        function t() {
            r(), /Mobile/.test(_) && (i(), o() || p.i(u, "DOMContentLoaded", o))
        }

        function r() {
            j.ia(y, "fetch", function(n) {
                var t = n[0],
                    r = n[1];
                "string" == typeof t && W.ta(t) && (r = r || {}, r.credentials && "omit" !== r.credentials || (r.credentials = "same-origin"), n[1] = r)
            })
        }

        function i() {
            var n = y.lib;
            if (n) {
                var t = !/taobao.com$/.test(l.hostname);
                j.ia(n.windvane, "call", function(n) {
                    if ("MtopWVPlugin" === n[0] && "send" === n[1]) {
                        var r = n[2];
                        if (t) {
                            (r.ext_headers || {})["X-Sufei-Token"] = B.ra(!0, !1)
                        } else W.sa()
                    }
                })
            }
        }

        function o() {
            var n = y.jsbridge;
            if (n && (n = n["default"])) return j.ia(n, "pushBack", function(n) {
                "native:" === n[0] && W.sa()
            }), !0
        }
        n.D = t
    }(S || (S = {}));
    var X;
    ! function(n) {
        function t() {
            var n = y.XMLHttpRequest;
            if (n) {
                var t = n.prototype;
                t && r(t) || i()
            }
            o()
        }

        function r(n) {
            var t = j.ia(n, "open", function(n, t) {
                    var r = n[1];
                    a.ca(t, r)
                }),
                r = j.ia(n, "send", function(n, t) {
                    var r = a.da(t);
                    W.ta(r)
                });
            return t && r
        }

        function i() {
            j.ja(y, "XMLHttpRequest", function() {
                W.ta()
            })
        }

        function o() {
            var n = /XMLHTTP/i;
            j.ja(y, "ActiveXObject", function(t) {
                var r = t[0];
                r && n.test(r) && W.ta()
            })
        }
        var a = new E;
        n.D = t
    }(X || (X = {}));
    var C;
    ! function(n) {
        function t() {
            T.D(), W.D(), O.D(), X.D(), S.D(), H.D()
        }
        var r = "_sufei_data2";
        ! function() {
            if (!u[r]) {
                u[r] = d;
                try {
                    t()
                } catch (n) {
                    k.A(n)
                }
            }
        }()
    }(C || (C = {}))
}(Object, Array, Function, Math, Date, RegExp, encodeURIComponent, window, document, navigator, setTimeout, location, history, screen, Image);
