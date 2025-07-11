const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./index-yRmNngif.js",
      "./store-BeJ4ml9q.js",
      "./index-FdyGBlLz.js",
      "./index-BnngHmlw.css",
      "./index-DWrvYvVW.css",
      "./index-CCouxKG6.js",
      "./common-0X47MWYd.js",
      "./search-HGKQ_zQW.js",
      "./index-CT-KYzgu.css",
      "./index-sxcMX5Mk.js",
      "./index-DAmrPJWp.css",
      "./index-Bq_kSn6H.js",
      "./timeFn-D5IUmA63.js",
      "./dayjs.min-DQt1sTWv.js",
      "./video-DhuHiuk-.js",
      "./video-CLQ4-Js7.css",
      "./index-DJoBspyu.css",
      "./videoModal-BRr8_Vwd.js",
      "./videoModal-A_GjMSQ6.css",
    ])
) => i.map((i) => d[i]);
import {
  V as d,
  _ as n,
  T as c,
  B as m,
  g as f,
  m as g,
  C as w,
  O as b,
  D as v,
  n as S,
} from "./index-FdyGBlLz.js";
import { s as y, a as _, b as h, i as V } from "./store-BeJ4ml9q.js";
import { M as B } from "./video-DhuHiuk-.js";
var l = null;
const O = {
  components: {
    MapVideo: B,
    ele: (t) => t(window.mapCom.default.mapsCom(d)),
    ecology: (t) => t(window.ecology ? window.ecology.default : {}),
    Overview: () =>
      n(
        () => import("./index-yRmNngif.js"),
        __vite__mapDeps([0, 1, 2, 3, 4]),
        import.meta.url
      ),
    Build: () =>
      n(
        () => import("./index-CCouxKG6.js"),
        __vite__mapDeps([5, 2, 3, 6, 7, 8]),
        import.meta.url
      ),
    RunBox: () =>
      n(
        () => import("./index-sxcMX5Mk.js"),
        __vite__mapDeps([9, 2, 3, 10]),
        import.meta.url
      ),
    Ship: () =>
      n(
        () => import("./index-Bq_kSn6H.js"),
        __vite__mapDeps([11, 2, 3, 12, 13, 14, 15, 16]),
        import.meta.url
      ),
    videoModal: () =>
      n(
        () => import("./videoModal-BRr8_Vwd.js"),
        __vite__mapDeps([17, 2, 3, 6, 14, 15, 18]),
        import.meta.url
      ),
    TyphoonComponent: c,
    InvestDialog: m,
  },
  data() {
    return {
      refName: "cesiumMap",
      cMapInited: !1,
      loading: !1,
      timer: null,
      showOverview: !1,
      task: null,
      freeze: !1,
      pageList: [],
      record: {},
      treeOpen: !0,
      videoVisibel: !1,
      shipVisibel: !1,
      visibleEcol: !0,
      showVideoModal: !1,
    };
  },
  computed: {
    config() {
      this.freeze = !1;
      let t = this.$root.$i18n.locale;
      return (
        {
          plan: {
            multiIds: [1319646],
            subName: "Arcgis",
            options: {
              subName: "Arcgis",
              isSea: !0,
              isShowPage: !1,
              isShowSlider: !0,
              needFilter: !0,
              isSelectChild: !0,
              isExpandRoot: !1,
              isEng: t === "en-GB",
              sqlChild: !1,
              sql: "etattr_enable='是'",
              type: "0",
            },
          },
          build: {
            multiIds: [19478],
            subName: "Home",
            options: {
              isSea: !0,
              subName: "Home",
              isShowPage: !0,
              isShowSlider: !0,
              isEng: t === "en-GB",
              needFilter: !0,
              isSelectChild: !1,
              isExpandRoot: !0,
              sqlChild: !0,
              sql: "etattr_windfarmStatus='建设'",
              windfarmStatus: "建设",
              type: "1",
            },
          },
          weather: {
            multiIds: [19478],
            subName: "Home",
            options: {
              isSea: !0,
              subName: "Home",
              isShowPage: !0,
              isShowSlider: !1,
              needFilter: !0,
              isEng: t === "en-GB",
              isSelectChild: !1,
              isExpandRoot: !0,
              sqlChild: !0,
              sql: "etattr_windfarmStatus='气象'",
              windfarmStatus: "",
              type: "",
              createWeather: 1,
            },
          },
          weatherDetail: {
            multiIds: [19478],
            subName: "Home",
            options: {
              isSea: !0,
              subName: "Home",
              isShowPage: !0,
              isShowSlider: !1,
              needFilter: !0,
              isEng: t === "en-GB",
              isSelectChild: !1,
              isExpandRoot: !0,
              sqlChild: !0,
              sql: "etattr_windfarmStatus='气象'",
              windfarmStatus: "运营",
              type: "",
            },
          },
        }[this.$route.name] || {
          multiIds: [19478],
          subName: "Home",
          options: {
            isSea: !0,
            subName: "Home",
            isShowPage: !0,
            isShowSlider: !0,
            needFilter: !0,
            isEng: t === "en-GB",
            isSelectChild: !1,
            isExpandRoot: !0,
            sqlChild: !0,
            sql: "etattr_windfarmStatus='运营'",
            windfarmStatus: "运营",
            type: "2",
          },
        }
      );
    },
    mapOptions() {
      return {
        ...this.config,
        showOverview: this.showOverview,
        subcenterResource: this.$store.state.subcenterResource,
        subcenterUtil: this.$store.state.subcenterUtil,
        subcenterState: this.$store.state.subcenterState,
        token: f(),
      };
    },
    showBaseMap() {
      return !this.shipVisibel;
    },
    proxy() {
      return this.findRef(this);
    },
    routerName() {
      return this.$route.name;
    },
    ...g(["ecologyStore"]),
  },
  watch: {
    $route(t) {
      (t.name === "plan" ||
        t.name === "build" ||
        t.name === "run" ||
        t.name === "weather") &&
        ((this.showOverview = !1),
        (this.shipVisibel = !1),
        t.name === "build" && this.hideTree(),
        t.name !== "run" && (this.ecologyStore.currentModuleId = ""),
        t.name === "run" && this.handleBtnVisable());
    },
    "$store.state.subcenterState.isGd": {
      async handler(t) {
        const e = this.$store.state.subcenterState.isGd;
        window.arcgisView &&
          window.arcgisView.goTo({
            center: e
              ? [113.4, 22.296757]
              : [111.97871536299016, 21.168884786246092],
            zoom: e ? 8 : 9.5,
          });
      },
    },
    ecologyStore: {
      handler(t) {
        t.currentModuleId && this.hideTree();
      },
      deep: !0,
    },
  },
  created() {
    (l = this),
      this.routerName === "build" && this.hideTree(),
      this.routerName === "weather" && this.hideTree();
  },
  mounted() {
    this.handleBtnVisable();
  },
  methods: {
    hideTree() {
      this.treeOpen = !1;
      let t = setTimeout(() => {
        clearTimeout(t);
        let e = this.getComp();
        e ? e.isExpandTree && this.getComp().switchTree() : this.hideTree();
      }, 50);
    },
    getMap() {
      return this.getRef("cesiumMap");
    },
    getComp() {
      return this.getRef("comp");
    },
    changeShowOverview(t) {
      this.freeze = t;
    },
    findRef(t = this) {
      let e = null;
      function s(i) {
        if (i.$refs[l.refName]) return (e = i.$refs[l.refName]), !0;
        let r = Object.keys(i.$refs);
        if (r.length > 0)
          for (let a = 0; a < r.length; a++) {
            let o = r[a];
            if ((s(i.$refs[o]), e)) return;
          }
      }
      return s(t), e;
    },
    getRef(t) {
      let e = null,
        s = this;
      function i(r) {
        if (r && r._isVue) {
          if (r.$refs && r.$refs[t]) return (e = r.$refs[t]), !0;
          let a = Object.keys(r.$refs);
          if (a.length > 0)
            for (let o = 0; o < a.length; o++) {
              let u = a[o];
              if ((i(r.$refs[u]), e)) return;
            }
        }
      }
      return i(s), e;
    },
    async handleJumpPage(t) {
      if (
        (console.log("!!!handleJumpPage!!!", t), t.type && t.type === "index")
      ) {
        (this.showOverview = !1), this.$router.push("/main");
        return;
      }
      (this.pageList = t.checked ? t.pageList || [] : []), y(this.pageList);
      let [e] = this.pageList;
      if (
        ((!e ||
          (e.pagePath !== this.$route.path && this.$route.path !== "/forge")) &&
          (V(), this.$store.commit("setChangeCallBack", { func: () => {} })),
        t.checked)
      ) {
        if ((console.log("first:", e), e))
          if (e.showType === 4) {
            this.pageList.length > 1
              ? (this.showOverview = !0)
              : (this.proxy.showMap = !0);
            let s = e.jumpType === 1 ? "_blank" : "_self";
            const i = await this.$refs.ele.map._GetParentIds(e.entityId, !0);
            console.log("_GetParentIds", i), window.open(e.pageUrl, s);
          } else {
            (this.record = t),
              _(e.pageId),
              h(t.result),
              this.$store.commit("setEntityInfo", { data: t.result });
            const s = w(e.pagePath),
              i = b.some((r) => r.path === e.pagePath);
            (this.showOverview = i && s),
              s || this.$message.error("无权限访问"),
              this.$nextTick(() => {
                (this.task = {
                  first: e,
                  pageCode: t.result.code,
                  entityId: e.entityId,
                }),
                  console.log("this.task:", this.task);
              });
          }
      } else
        h(null),
          (this.task = null),
          this.$store.commit("setEntityInfo", { data: null }),
          (this.showOverview = !1);
    },
    clearTask() {
      this.task = null;
    },
    mapInited() {
      this.$nextTick(() => {
        this.cMapInited = !0;
      });
    },
    showShipPopup() {
      this.$nextTick(() => {});
    },
    clearBuild() {
      this.$nextTick(() => {
        let t = this.$refs.buildPage;
        t && t.$refs.rightTop.clearSelected();
      });
    },
    handleBtnVisable() {
      /* console.log("handleBtnVisable");
      const t = v();
      setTimeout(() => {
        var s, i, r, a;
        (this.ecologyRef = this.$refs.ecologyRef),
          (this.buttonBar = this.ecologyRef.querySelector(".buttonBar")),
          console.log("buttonBar==>", this.buttonBar),
          (this.meteorologicalBtn =
            (s = this.buttonBar) == null
              ? void 0
              : s.querySelector('[title="气象数据"]')),
          (this.resourceMappingBtn =
            (i = this.buttonBar) == null
              ? void 0
              : i.querySelector('[title="资源分布图"]')),
          (this.regionalStatisticalBtn =
            (r = this.buttonBar) == null
              ? void 0
              : r.querySelector('[title="区域统计"]')),
          (this.ecologicalResourcesBtn =
            (a = this.buttonBar) == null
              ? void 0
              : a.querySelector('[title="生态资源"]')),
          (this.ue4Btn = this.ecologyRef.querySelector(".ue4Button")),
          [
            {
              title: "气象数据",
              authKey: "/run/Environment",
              btn: "meteorologicalBtn",
            },
            {
              title: "资源分布图",
              authKey: "/run/Environment",
              btn: "resourceMappingBtn",
            },
            {
              title: "区域统计",
              authKey: "/run/Environment",
              btn: "regionalStatisticalBtn",
            },
            {
              title: "生态资源",
              authKey: "/run/Environment",
              btn: "ecologicalResourcesBtn",
            },
            { title: "UE4", authKey: "/run/Environment", btn: "ue4Btn" },
          ].map((o) => {
            t.some((p) => p.path === o.authKey) ||
              (this[o.btn].style.display = "none");
          });
      }, 1e3); */
    },
  },
  beforeRouteLeave(t, e, s) {
    (this.ecologyStore.currentModuleId = ""), s();
  },
};
var E = function () {
    var e = this,
      s = e._self._c;
    return s(
      "div",
      { staticClass: "run earth-map" },
      [
        e.loading
          ? s("a-spin", {
              staticClass: "run-spin",
              attrs: { tip: "加载中..." },
            })
          : e._e(),
        s(
          "ele",
          e._g(
            e._b(
              {
                ref: "ele",
                staticClass: "full-hg",
                class: [e.routerName, { "hidden-other": e.showOverview }],
                on: {
                  switchTyphoon: function (i) {
                    e.visibleEcol = !i;
                  },
                  switchTree: function (i) {
                    e.treeOpen = i;
                  },
                  onJumpPage: e.handleJumpPage,
                  mapInited: e.mapInited,
                  showShipPopup: e.showShipPopup,
                  clearBuild: e.clearBuild,
                },
              },
              "ele",
              {
                ...e.mapOptions,
                showOverview: e.freeze,
                showBaseMap: e.showBaseMap,
              },
              !1
            ),
            e.$listeners
          )
        ),
        e.routerName === "build"
          ? s("Build", {
              ref: "buildPage",
              attrs: {
                "c-map-inited": e.cMapInited,
                map: e.getMap,
                "tree-open": e.treeOpen,
                videoVisibel: e.videoVisibel,
                shipVisibel: e.shipVisibel,
              },
              on: {
                "update:videoVisibel": function (i) {
                  e.videoVisibel = i;
                },
                "update:video-visibel": function (i) {
                  e.videoVisibel = i;
                },
                "update:shipVisibel": function (i) {
                  e.shipVisibel = i;
                },
                "update:ship-visibel": function (i) {
                  e.shipVisibel = i;
                },
                changeShowOverview: e.changeShowOverview,
                closeTree: function (i) {
                  e.treeOpen = i;
                },
              },
            })
          : ["weather", "run"].includes(e.routerName)
          ? s("RunBox", {
              attrs: { shipVisibel: e.shipVisibel, map: e.getMap },
              on: {
                "update:shipVisibel": function (i) {
                  e.shipVisibel = i;
                },
                "update:ship-visibel": function (i) {
                  e.shipVisibel = i;
                },
                closeTree: function (i) {
                  e.treeOpen = i;
                },
              },
            })
          : e._e(),
        e.mapOptions.showOverview
          ? s(
              "Overview",
              e._b(
                {
                  ref: "overview",
                  attrs: { "tree-open": e.treeOpen },
                  on: { hideTree: e.hideTree },
                },
                "Overview",
                { record: e.record, pageList: e.pageList, task: e.task },
                !1
              )
            )
          : e._e(),
        (e.routerName === "build" ||
          e.routerName === "run" ||
          e.routerName === "weather") &&
        e.shipVisibel
          ? s("Ship", {
              staticClass: "shipVisibel",
              class: e.treeOpen && "treeOpenShipVisibel",
              attrs: {
                map: e.getMap,
                "router-name": e.routerName,
                "tree-open": e.treeOpen,
              },
            })
          : e._e(),
        e.routerName === "build"
          ? s("MapVideo", {
              attrs: { visible: e.videoVisibel },
              on: {
                "update:visible": function (i) {
                  e.videoVisibel = i;
                },
              },
            })
          : e._e(),
        s("videoModal", {
          model: {
            value: e.showVideoModal,
            callback: function (i) {
              e.showVideoModal = i;
            },
            expression: "showVideoModal",
          },
        }),
        s(
          "div",
          { ref: "ecologyRef" },
          [
            e.routerName === "run" &&
            !e.shipVisibel &&
            e.cMapInited &&
            e.visibleEcol
              ? s("ecology")
              : e._e(),
          ],
          1
        ),
        e.routerName === "weather" || e.routerName === "weatherDetail"
          ? s("router-view")
          : e._e(),
      ],
      1
    );
  },
  T = [],
  $ = S(O, E, T, !1, null, null);
const P = $.exports;
export { P as default };
