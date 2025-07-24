import { n as o, V as s, g as r } from "./index-FdyGBlLz.js";
const n = {
  props: ["map"],
  data() {
    return {
      weatherOption: {
        token: "",
        headName: "",
        topicName: "",
        subName: "WeatherReportNew",
        entityId: "",
        options: {
          isShowSlider: !1,
          isSea: !0,
          isShowPage: !0,
          needFilter: !0,
          isSelectChild: !1,
          isExpandRoot: !0,
          sqlChild: !0,
          sql: "etattr_windfarmStatus='气象'",
          type: "",
        },
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.weatherOption.token = r();
      const e = this.$route.query;
      (this.weatherOption.topicName = e.topicName),
        (this.weatherOption.entityId = e.entityId),
        (this.weatherOption.headName = e.desc);
    },
    handleCloseWeather() {
      this.$router.back();
    },
  },
};
var i = function () {
    var t = this,
      a = t._self._c;
    return a("iframe", {
      attrs: {
        src: `/run/index.html#/Fengji/RealtimeMonitor?pageCode=1%23&entityId=1388347&t=${Date.now()}`,
        "data-role": "baidu-frame",
      },
      style: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        border: "none",
        zIndex: "10",
      },
    });
  },
  h = [],
  p = o(n, i, h, !1, null, null);
const m = p.exports;
export { m as default };
