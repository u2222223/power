import { n as r } from "./index-FdyGBlLz.js";
const y = {
  props: {
    list: { type: Array, default: () => [] },
    cols: { type: Array, default: () => [] },
    needDian: { type: Array, default: () => [] },
  },
};
var _ = function () {
    var t = this,
      s = t._self._c;
    return s("div", { staticClass: "maxHeight" }, [
      s("div", { staticClass: "buildTable" }, [
        s(
          "div",
          { staticClass: "header row" },
          t._l(t.cols, function (a, n) {
            return s("div", { key: n, style: a.style }, [
              a.type === "td"
                ? s(
                    "div",
                    {
                      staticClass: "th",
                      staticStyle: { width: "100%", height: "100%" },
                    },
                    [t._v(" " + t._s(a.label) + " ")]
                  )
                : a.type === "tds"
                ? s(
                    "div",
                    { staticClass: "tds" },
                    t._l(a.children, function (e, l) {
                      return s(
                        "div",
                        { key: l, staticClass: "th", style: e.style },
                        [t._v(" " + t._s(e.label) + " ")]
                      );
                    }),
                    0
                  )
                : t._e(),
            ]);
          }),
          0
        ),
        s(
          "div",
          { staticClass: "content" },
          t._l(t.list, function (a, n) {
            return s(
              "div",
              {
                key: n,
                staticClass: "row",
                staticStyle: { height: "40px", "line-height": "40px" },
              },
              t._l(t.cols, function (e, l) {
                return s("div", { key: l, style: e.style }, [
                  e.type === "td"
                    ? s(
                        "div",
                        {
                          staticClass: "td",
                          class: { dian: t.needDian.includes(e.key) },
                          staticStyle: { width: "100%" },
                          attrs: {
                            title: t.needDian.includes(e.key) ? a[e.key] : "",
                          },
                        },
                        [
                          e.key === "index"
                            ? s("span", { staticClass: "index" }, [
                                t._v(t._s(n + 1)),
                              ])
                            : e.slot
                            ? t._t(e.slot, null, null, a)
                            : s("span", [t._v(" " + t._s(a[e.key]) + " ")]),
                        ],
                        2
                      )
                    : e.type === "tds"
                    ? s(
                        "div",
                        { staticClass: "tds" },
                        t._l(e.children, function (i, d) {
                          return s(
                            "div",
                            {
                              key: d,
                              class: { dian: t.needDian.includes(i.key) },
                              style: i.style,
                              attrs: {
                                title: t.needDian.includes(i.key)
                                  ? a[i.key]
                                  : "",
                              },
                            },
                            [
                              i.slot
                                ? t._t(i.slot, null, null, a)
                                : s(
                                    "span",
                                    {
                                      staticClass: "tdContent",
                                      attrs: { title: a[i.key] },
                                    },
                                    [t._v(" " + t._s(a[i.key]) + " ")]
                                  ),
                            ],
                            2
                          );
                        }),
                        0
                      )
                    : t._e(),
                ]);
              }),
              0
            );
          }),
          0
        ),
        s("div", { staticClass: "rightIcon" }, [t._t("rightIcon")], 2),
      ]),
    ]);
  },
  u = [],
  c = r(y, _, u, !1, null, "bc565452");
const h = c.exports;
export { h as default };
