import { n as c } from "./index-FdyGBlLz.js";
const l = {
  props: { projects: { type: Array, default: () => [] } },
  computed: {
    isLangEn() {
      return this.$root.$i18n.locale === "en-GB";
    },
  },
  data() {
    return { selected: [] };
  },
  methods: {
    select(i) {
      let t = this.selected.findIndex((e) => e.id === i.id);
      t !== -1 ? this.selected.splice(t, 1) : (this.selected = [i]),
        this.$emit("hiddenBottomCenter"),
        this.$emit("initMapData"),
        this.$emit("getSelected", this.selected);
    },
    clearSelected() {
      (this.selected = []), this.$emit("getSelected", []);
    },
    clear() {
      (this.selected = []),
        this.$emit("initMapData"),
        this.$emit("hiddenBottomCenter"),
        this.$emit("getSelected", []);
    },
  },
};
var a = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      { staticClass: "rightTopBox" },
      t._l(t.projects, function (s, o) {
        return e(
          "div",
          {
            key: o,
            staticClass: "row",
            class: { selected: t.selected.find((n) => n.id === s.id) },
            on: {
              click: function (n) {
                // return t.select(s);
              },
            },
          },
          [
            e("div", { staticClass: "leftImg" }),
            e("div", { staticClass: "rightContent" }, [
              e("div", { staticClass: "title1" }, [
                t._v(" " + t._s(s.projectName.trim()) + " "),
              ]),
              t.isLangEn
                ? e("div", { staticClass: "projectInfo" }, [
                    e("div", { staticClass: "title3" }, [
                      t._v(
                        t._s(t.$t("build.owner")) +
                          t._s(t.$t("unit.colon")) +
                          t._s(s.owner)
                      ),
                    ]),
                    s.planProductionTime
                      ? e("div", { staticClass: "title5" }, [
                          t._v(
                            " " +
                              t._s(t.$t("build.estimated_commissioning_time")) +
                              t._s(t.$t("unit.colon")) +
                              t._s(
                                t.$d(new Date(s.planProductionTime), "short") ||
                                  ""
                              ) +
                              " "
                          ),
                        ])
                      : t._e(),
                  ])
                : e("div", { staticClass: "projectInfo" }, [
                    e("div", { staticClass: "title3" }, [
                      t._v(
                        t._s(t.$t("build.owner")) +
                          t._s(t.$t("unit.colon")) +
                          t._s(s.owner)
                      ),
                    ]),
                    s.planProductionTime
                      ? e("div", { staticClass: "title5" }, [
                          t._v(
                            " " +
                              t._s(t.$t("build.estimated_commissioning_time")) +
                              t._s(t.$t("unit.colon")) +
                              t._s(s.planProductionTime || "") +
                              " "
                          ),
                        ])
                      : t._e(),
                  ]),
            ]),
          ]
        );
      }),
      0
    );
  },
  d = [],
  r = c(l, a, d, !1, null, "af347a19");
const m = r.exports;
export { m as default };
