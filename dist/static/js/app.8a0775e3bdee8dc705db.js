(window.webpackJsonp = window.webpackJsonp || []).push([
  ["app"], { "4A+2": function(t, e, n) { "use strict"; var r = n("Rdvm");
      n.n(r).a }, Rdvm: function(t, e, n) {}, Vtdi: function(t, e, n) { "use strict";
      n.r(e); var r = n("AmEZ"),
        i = { name: "App" },
        a = n("QCOi"),
        o = Object(a.a)(i, (function() { var t = this.$createElement,
            e = this._self._c || t; return e("div", { attrs: { id: "app" } }, [e("router-view")], 1) }), [], !1, null, null, null).exports,
        s = n("G+7y"),
        u = { name: "HelloWorld", created: function() {}, data: function() { return { msg: "heyushuo-cli脚手架" } } },
        c = (n("4A+2"), Object(a.a)(u, (function() { var t = this.$createElement,
            e = this._self._c || t; return e("div", { staticClass: "hello" }, [e("h1", [this._v(this._s(this.msg))])]) }), [], !1, null, "7c169396", null).exports);
      r.a.use(s.a); var l = new s.a({ routes: [{ path: "/", name: "HelloWorld", component: c }] });
      r.a.config.productionTip = !1, new r.a({ el: "#app", router: l, render: function(t) { return t(o) } }) } },
  [
    ["Vtdi", "runtime", "vendors~app"]
  ]
]);