import { c as u } from "./common-0X47MWYd.js";
import { n as c, cy as o, cz as l } from "./index-FdyGBlLz.js";
const h = ["plan", "build", "run"],
  m = {
    name: "Header",
    data() {
      return {
        menu: [
          { name: this.$t("main.planModule"), menu: "plan", path: "/plan" },
          { name: this.$t("main.buildModule"), menu: "build", path: "/build" },
          { name: this.$t("main.businessModule"), menu: "run", path: "/run" },
          {
            name: this.$t("main.weatherModule"),
            menu: "weather",
            path: "/weather",
          },
          {
            name: this.$t("main.algorithmModule"),
            menu: "data",
            path: "/data",
          },
          { name: this.$t("main.AppStore"), menu: "app", path: "/app" },
        ],
        activeMenu: "first",
      };
    },
    computed: {
      subcenterState() {
        return this.$store.state.subcenterState;
      },
      currentTime() {
        return this.$d(new Date(), "hadWeekMedium");
      },
      getWeek() {
        return ["日", "一", "二", "三", "四", "五", "六"][new Date().getDay()];
      },
    },
    mounted() {
      this.activeMenu = this.$route.name;
    },
    methods: {
      hasPermission(a) {
        return o(a);
      },
      changeTime: u,
      changeBtnFn() {
        this.$store.commit("changeIsGd"),
          window.eventBus.$emit("changeSubcenter", {
            subcenterResource: this.$store.state.subcenterResource,
            subcenterUtil: this.$store.state.subcenterUtil,
            subcenterState: this.$store.state.subcenterState,
          });
      },
      onClickMenu(a) {
        if (["weather", "run", "data"].some((b) => b === a.menu)) {
          this.$message.error("演示版暂无该功能");
          return;
        }
        console.log(a);

        this.$route.path !== a.path &&
          (a.menu &&
            h.includes(a.menu) &&
            localStorage.setItem("routerName", a.menu),
          (this.activeMenu = a.menu),
          this.$router.push(a.path));
      },
      async logout() {
        if (this.$route.query.childPage) {
          this.$router.back();
          return;
        }
        await l(),
          localStorage.clear(),
          sessionStorage.clear(),
          this.$router.replace("/login");
      },
    },
  };
var d = function () {
    var r, i;
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "header" },
      [
        t("div", { staticClass: "header-bg" }, [
          t("div", { staticClass: "logo" }, [
            e.hasPermission("/main")
              ? t("span", {
                  staticClass: "img",
                  style: {
                    backgroundImage: `url(${
                      (r = e.$store.state.subcenterUtil) == null
                        ? void 0
                        : r.getTitleBackground()
                    })`,
                  },
                  on: {
                    click: function (n) {
                      return e.onClickMenu({ path: "/main" });
                    },
                  },
                })
              : t("span", {
                  staticClass: "img",
                  style: {
                    backgroundImage: `url(${
                      (i = e.$store.state.subcenterUtil) == null
                        ? void 0
                        : i.getTitleBackground()
                    })`,
                  },
                }),
          ]),
          t(
            "div",
            { staticClass: "nav" },
            e._l(
              [
                [0, 3],
                [3, e.menu.length],
              ],
              function (n) {
                return t(
                  "ul",
                  { key: n.toString() },
                  e._l(e.menu.slice(...n), function (s) {
                    return t(
                      "li",
                      {
                        directives: [
                          {
                            name: "authMenu",
                            rawName: "v-authMenu",
                            value: [s.path],
                            expression: "[item.path]",
                          },
                        ],
                        key: s.id,
                        class: { "li-active": e.activeMenu === s.menu },
                        on: {
                          click: function (v) {
                            return e.onClickMenu(s);
                          },
                        },
                      },
                      [
                        t("div", { staticClass: "opts-btn" }),
                        t("span", [e._v(e._s(s.name))]),
                      ]
                    );
                  }),
                  0
                );
              }
            ),
            0
          ),
        ]),
        t("div", { staticClass: "header-date" }, [
          e._v(" " + e._s(e.currentTime) + " "),
        ]),
        e.$store.state.subcenterResource.area
          ? t(
              "a-tooltip",
              {
                directives: [
                  {
                    name: "auth",
                    rawName: "v-auth",
                    value: ["/switch-subcenter"],
                    expression: "['/switch-subcenter']",
                  },
                ],
                attrs: { placement: "topLeft" },
              },
              [
                t("template", { slot: "title" }, [
                  e._v(
                    " " +
                      e._s(
                        e.subcenterState.isGd
                          ? `点击进入${e.$store.state.subcenterResource.area}海风中心`
                          : "点击进入广东省海风中心"
                      ) +
                      " "
                  ),
                ]),
                t("div", {
                  staticClass: "changeBtn",
                  class: e.subcenterState.isGd && "changeBtn2",
                  on: { click: e.changeBtnFn },
                }),
              ],
              2
            )
          : e._e(),
        t(
          "a-tooltip",
          { attrs: { placement: "topLeft" } },
          [
            t("template", { slot: "title" }, [
              e._v(
                " " +
                  e._s(
                    this.$route.query.childPage ? "返回上一级" : "退出登录"
                  ) +
                  " "
              ),
            ]),
            t("div", { staticClass: "header-exit", on: { click: e.logout } }),
          ],
          2
        ),
        t("div", {
          staticClass: "header-bg-color",
          class: { "not-bg": e.$route.path === "/main" },
        }),
      ],
      1
    );
  },
  p = [],
  g = c(m, d, p, !1, null, "0030a477");
const _ = g.exports;
export { _ as default };
