import { n as r } from "./index-FdyGBlLz.js";
const n = {
  props: { arr: { type: Array, default: () => [] } },
  methods: {
    beforeChange() {
      this.$emit("beforeChange", arguments[1]);
    },
  },
};
var o = function () {
    var e = this,
      a = e._self._c;
    return a(
      "a-carousel",
      {
        staticClass: "viewpagerBox",
        attrs: {
          autoplay: !0,
          dotsClass: "viewpagerDotsClass",
          beforeChange: e.beforeChange,
        },
      },
      e._l(e.arr, function (s, t) {
        return a("div", { key: t, staticClass: "viewpagerItem" }, [
          a("span", {
            staticClass: "img",
            style: { "background-image": `url('${s.img}')` },
          }),
          a("span", { staticClass: "title" }, [
            e._v(
              e._s(
                "“十四五”以来，我市能源体系正经历深刻变革，悄然重塑发展脉络。截至今年5月，全市新能源装机规模（含风电、光伏等）已达739万千瓦"
              )
            ),
          ]),
        ]);
      }),
      0
    );
  },
  i = [],
  l = r(n, o, i, !1, null, "08fbea95");
const f = l.exports;
export { f as default };
