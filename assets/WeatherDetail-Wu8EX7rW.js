import { n as o, V as s, g as r } from "./index-FdyGBlLz.js";
const n = {
  components: { MapsCom: (e) => e(window.mapCom.default.mapsCom(s)) },
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
    return a(
      "div",
      { staticClass: "weather-mapscom" },
      [
        t.weatherOption.token
          ? a(
              "MapsCom",
              t._b(
                { on: { onCloseWeather: t.handleCloseWeather } },
                "MapsCom",
                t.weatherOption,
                !1
              )
            )
          : t._e(),
      ],
      1
    );
  },
  h = [],
  p = o(n, i, h, !1, null, null);
const m = p.exports;
export { m as default };
