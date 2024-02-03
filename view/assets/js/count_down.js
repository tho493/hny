! function() {
    let e = {
        newYear: document.querySelector(".new-year"),
        range: function(e, t) {
            return Math.floor(Math.random() * (t - e + 1) + e)
        },

        get period() {
            let t = new Date("02/10/2024").getTime(),
                n = new Date,
                r = Math.floor((t - n) / 1e3),
                o = Math.floor(r / 60),
                l = Math.floor(o / 60),
                $ = Math.floor(l / 24);

                if(r<0){
                    window.location.href="hny"
                }
            return l -= 24 * $, o = o - 1440 * $ - 60 * l, r = r - 86400 * $ - 3600 * l - 60 * o, $ < 0 && ($ = 0, l = 0, o = 0, r = 0), {
                year: new Date().getFullYear(),
                days: $,
                hours: l,
                minutes: o,
                seconds: r
            }
        },
        element: function(e, t, n, r) {
            let o = document.createElement(t);
            return o.className = n, void 0 !== r && (o.innerHTML = r), e.appendChild(o), o
        },
        year: function(t) {
            let n = new TimelineMax,
                r = e.element(e.newYear, "div", t),
                // o = "Welcome " + String(e.period.year);
                o = `${String(e.period.year)} coming`;
            for (let l = 0; l <= o.length - 1; l++) {
                let $ = e.element(r, "div", "digit", o.substr(l, 1));
                $.style.top = 0 - 2 * $.clientHeight + "px", n.to($, .5, {
                    top: 0,
                    opacity: 1,
                    ease: Bounce.easeOut
                })
            }
            return r
        },
        animate: function() {
            let t = e.year("year year1");
            e.year("year year2");
            let n = e.element(e.newYear, "div", "controls"),
                r = e.element(n, "div", "control days"),
                o = e.element(n, "div", "control hours"),
                l = e.element(n, "div", "control minutes"),
                $ = e.element(n, "div", "control seconds");
            e.controls = {
                controls: n,
                days: r,
                hours: o,
                minutes: l,
                seconds: $
            }, e.element(e.newYear, "div", "centeredBox", `<pre id="typewriter" data-array=""></pre>`), e.render();
            let a = e.element(t, "div", "triangles"),
                i = new TimelineMax,
                s = [];
            for (let c = 0; c <= 49; c++) {
                let d = new TimelineMax({
                        repeat: -1
                    }),
                    u = e.element(a, "div", "triangle");
                u.style.top = "-50px";
                let p = e.range(0, 100) / 100,
                    _ = 1 == e.range(1, 2) ? -1 : 1;
                d.set(u, {
                    scale: e.range(10, 20) / 10
                }, p).to(u, .5, {
                    opacity: 1
                }, p).to(u, 1, {
                    top: "200%",
                    rotationZ: e.range(180, 360) * _,
                    rotationX: e.range(180, 360) * _
                }, p).to(u, .5, {
                    opacity: 0
                }, p + .5), i.add(d, 0), s.push(u)
            }
            let y = 0,
                m = function() {
                    if (Math.abs(y - t.clientWidth) > 1) {
                        for (let n = 0; n <= s.length - 1; n++) s[n].style.left = -5 + e.range(0, t.clientWidth) + "px";
                        y = t.clientWidth
                    }
                    setTimeout(m, 100)
                };
            return m(), new TimelineMax().to(r, .5, {
                top: 0,
                opacity: 1
            }, 0).to(o, .5, {
                top: 0,
                opacity: 1
            }, .25).to(l, .5, {
                top: 0,
                opacity: 1
            }, .5).to($, .5, {
                top: 0,
                opacity: 1
            }, .75).set(a, {
                opacity: 1
            }, 3).add(i, 3)
        },
        plural: function(t) {
            let n = e.period;
            return String(n[t]).length <= 1 && (n[t] = "0" + n[t]), Number(n[t]) > 1 ? n[t] + " " + t : n[t] + " " + t.substr(0, t.length - 1)
        },
        render: function() {
            e.controls.seconds.innerHTML = e.plural("seconds"), e.controls.minutes.innerHTML = e.plural("minutes"), e.controls.hours.innerHTML = e.plural("hours"), e.controls.days.innerHTML = e.plural("days"), requestAnimationFrame(e.render)
        }
    };
    e.animate()
}();