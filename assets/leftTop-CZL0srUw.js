const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./viewpager-BO5w-NLz.js",
      "./index-FdyGBlLz.js",
      "./index-BnngHmlw.css",
      "./viewpager-AfUWT8DD.css",
      "./fuTitleTwo-D5C4XufH.js",
      "./fuTitleTwo-CSJ19y8h.css",
    ])
) => i.map((i) => d[i]);
import { cP as n, n as a, _ as r } from "./index-FdyGBlLz.js";
const s = n("companyCode") || "",
  i = {
    components: {
      Viewpager: () =>
        r(
          () => import("./viewpager-BO5w-NLz.js"),
          __vite__mapDeps([0, 1, 2, 3]),
          import.meta.url
        ),
      FuTitleTwo: () =>
        r(
          () => import("./fuTitleTwo-D5C4XufH.js"),
          __vite__mapDeps([4, 1, 2, 5]),
          import.meta.url
        ),
    },
    props: { projects: { type: Array, default: () => [] } },
    watch: {
      projects: {
        deep: !0,
        handler() {
          this.beforeChange(0);
        },
      },
    },
    computed: {
      list() {
        return this.projects
          .reduce((e, t) => (e.push(...(t.platformDynamicsList || [])), e), [])
          .map(
            (e) => (
              (e.img = `/power/admin/dynamic/buildInfo/downloadFile?companyProject=${s}-19478&photo=${e.photo}`),
              e
            )
          );
      },
    },
    data() {
      return { nowIndex: 0 };
    },
    methods: {
      beforeChange(e) {
        this.nowIndex = e;
      },
    },
  };
var p = function () {
    var t = this,
      o = t._self._c;
    return o(
      "div",
      { staticClass: "leftTopBox" },
      [
        o("FuTitleTwo", {
          attrs: {
            title1: t.list[t.nowIndex] && t.list[t.nowIndex].projectName,
          },
        }),
        o("Viewpager", {
          staticClass: "viewBox",
          attrs: { arr: t.list },
          on: { beforeChange: t.beforeChange },
        }),
      ],
      1
    );
  },
  c = [],
  l = a(i, p, c, !1, null, null);
const d = l.exports;
export { d as default };
