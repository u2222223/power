import { n as l } from "./index-FdyGBlLz.js";
const n = "" + new URL("rightCenter1-B3twi9-t.png", import.meta.url).href,
  o = "" + new URL("rightCenterTitle1-DGOtATPm.png", import.meta.url).href,
  h = "" + new URL("rightCenter2-BClSsGsn.png", import.meta.url).href,
  g = "" + new URL("rightCenterTitle2-CHjsu3IS.png", import.meta.url).href,
  c = "" + new URL("rightCenter3-eH8Foh2h.png", import.meta.url).href,
  u = "" + new URL("rightCenterTitle3-DM7GUBT6.png", import.meta.url).href,
  m = {
    data() {
      return {
        list: [
          {
            bg: "#8AFF16",
            val: 3,
            title: this.$t("main.project_status_normal"),
            img: n,
            titleImg: o,
            textBg: "#8DFF1C",
          },
          {
            bg: "#2DB3FF",
            val: 2,
            title: this.$t("main.project_status_ahead"),
            img: h,
            titleImg: g,
            textBg: "#33B5FF",
          },
          {
            bg: "#FF5F5E",
            val: 2,
            title: this.$t("main.project_status_lag"),
            img: c,
            titleImg: u,
            textBg: "#FF6362",
          },
        ],
      };
    },
    props: ["result"],
    computed: {
      newList() {
        return this.list.map((t, e) => {
          if (t.val) {
            t.radio = Math.floor((t.val / this.listSum) * 100);
            let i = 0;
            if (this.list[e - 1])
              for (let r = 0; r < e; r++) {
                let a = this.list[r];
                i += a.radio;
              }
            (t.beforRadio = i),
              e === this.list.length - 1 &&
                (t.radio =
                  100 - (this.list[e - 1].beforRadio + this.list[e - 1].radio));
          }
          return t;
        });
      },
      listSum() {
        return this.list.reduce((s, t) => s + t.val, 0);
      },
    },
    watch: {
      result: {
        immediate: !0,
        handler(s) {
          s.length && this.getData();
        },
      },
    },
    methods: {
      getData() {
        (this.list[0].val = this.result[0].value),
          (this.list[1].val = this.result[1].value),
          (this.list[2].val = this.result[2].value);
      },
    },
  };
var v = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      { staticClass: "rightTopBox" },
      t._l(t.newList, function (i, r) {
        return e("div", { key: r, staticClass: "row" }, [
          e("img", { staticClass: "leftImg", attrs: { src: i.img } }),
          e("div", { staticClass: "rightContent" }, [
            e("div", { staticClass: "title1" }, [
              e("span", { attrs: { "data-img": i.titleImg } }, [
                t._v(t._s(i.title)),
              ]),
            ]),
            e(
              "div",
              { staticClass: "title2", style: { "--textBg": i.textBg } },
              [t._v(t._s(i.radio || 0) + "%")]
            ),
            e("div", { staticClass: "title3" }, [
              e(
                "div",
                {
                  staticClass: "item",
                  style: {
                    "--bg": i.bg,
                    "--radio": `${i.radio}%`,
                    "--beforRadio": `${i.beforRadio}%`,
                  },
                },
                [
                  e("div", { staticClass: "val" }, [
                    t._v(" " + t._s(i.val)),
                    e(
                      "span",
                      {
                        staticStyle: {
                          display: "inline-block",
                          transform: "scale(0.6) translateX(-6px)",
                          "font-weight": "normal",
                        },
                      },
                      [t._v(" " + t._s(t.$t("build.rightCenterUnit")))]
                    ),
                  ]),
                ]
              ),
            ]),
          ]),
        ]);
      }),
      0
    );
  },
  d = [],
  f = l(m, v, d, !1, null, "4c8945b5");
const _ = f.exports;
export { _ as default };
