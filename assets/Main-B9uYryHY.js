import {
  f as L,
  i as P,
  j as I,
  k as F,
  I as M,
  w as Y,
  l as f,
  o as D,
  q as V,
  r as G,
  E as v,
  t as C,
  u as j,
  v as N,
  x as O,
  y as R,
  z,
  A as H,
  n as q,
} from "./index-FdyGBlLz.js";
import {
  H as W,
  e as K,
  m as Z,
  S as U,
  M as J,
  C as Q,
  a as X,
  P as tt,
  L as x,
  b as et,
  T as at,
  l as st,
  c as it,
  d as nt,
  t as rt,
  f as ot,
  g as ct,
  i as b,
  h as lt,
  w as pt,
  p as ut,
  j as ht,
  k as dt,
  n as mt,
  o as yt,
  s as _t,
  q as ft,
  r as vt,
  u as gt,
  v as Ct,
  x as bt,
  y as wt,
  z as kt,
  A as $t,
  B as Ft,
  D as Dt,
  E as xt,
  F as St,
  G as Et,
  _ as Bt,
  I as At,
} from "./next_cap-D3MaoXwA.js";
import { M as Tt } from "./mqtt-P3cO-H_W.js";
import { h as u, s as g } from "./common-0X47MWYd.js";
import { i as Lt, g as Pt } from "./charts-CephhNnB.js";
import { w as It } from "./data-CG0ZN9yq.js";
import { P as Mt } from "./ProjectProgressDialog-BUat6KiB.js";
import { _ as S } from "./go1-FKcY8q87.js";
import { _ as E } from "./close-DKk2BBKI.js";
import "./defineProperty-EJDAiRQC.js";
import "./carousel-3d.common-Cm2eDS3K.js";
import "./merge-CN_KEKKw.js";
import "./mqttConfig-DcruBXJ7.js";
const Yt = "" + new URL("sub-title-img0-4AsFo9ka.png", import.meta.url).href,
  Vt = "" + new URL("sub-title-img1-gwhdsJiQ.png", import.meta.url).href,
  Gt = "" + new URL("sub-title-img2-05tja7n3.png", import.meta.url).href,
  jt = {
    "total-power": lt,
    "wind-speed": pt,
    "power-produce": ut,
    "cumulative-power": ht,
  },
  Nt = { coal_en: dt, coal: mt, co2: yt, so2: _t, pm: ft },
  Ot = { 1: vt, 2: gt, 3: Ct, 4: bt, 5: wt, 6: kt },
  Rt = {
    5: "/construction-history/guangdong-province",
    6: "/construction-history/technical-advantages",
  },
  zt = { 0: $t, 1: Ft, 2: Dt },
  Ht = { 0: xt, 1: St, 2: Et },
  qt = { 0: Yt, 1: Vt, 2: Gt };
let _ = [],
  w = {};
const Wt = {
  components: { History: W, ProjectProgressDialog: Mt },
  data() {
    return {
      showHistory: !1,
      map: null,
      showHoverRow: [],
      drawList: [],
      xiaZuan: !1,
      xiaZuanItem: {},
      cancelData: {},
      top: { plan: "-", build: "-", put: "-" },
      bottom: { capacity1: 0, capacity2: 0, capacity3: 0 },
      ownerPartList: [
        { id: 0, text: "广东能源集团", color: "#FFFF00" },
        { id: 1, text: "国家电投", color: "#FF1493" },
        { id: 2, text: "三峡新能源集团", color: "#00FF8A" },
        { id: 3, text: "中节能", color: "#00CED1" },
        { id: 4, text: "南方电网", color: "#DC143C" },
        { id: 5, text: "华能集团", color: "#8B008B" },
        { id: 6, text: "大唐国际", color: "#191970" },
        { id: 7, text: "中广核", color: "#0000FF" },
        { id: 8, text: "广东华电集团", color: "#2E8B57" },
        { id: 9, text: "明阳集团", color: "#483D8B" },
        { id: 10, text: "其他", color: "#fff" },
      ],
      emissionReduc: "",
      tempEmissions: [],
      currentEmissions: [
        {
          id: 0,
          img: this.$t("main.coal"),
          value: "",
          inDesVal: "",
          clunit: "t",
          clunit1: "kg",
          title: "节约标煤",
          increaseVal: 0,
          flag: !0,
          code: "saveBiaomei",
        },
        {
          id: 1,
          img: "co2",
          value: "",
          inDesVal: "",
          clunit: "t",
          clunit1: "kg",
          title: "CO₂减排量",
          increaseVal: 0,
          flag: !1,
          code: "co2",
        },
        {
          id: 2,
          img: "so2",
          value: "",
          inDesVal: "",
          clunit: "kg",
          clunit1: "g",
          title: "SO₂减排量",
          increaseVal: 0,
          flag: !1,
          code: "so2",
        },
        {
          id: 3,
          img: "pm",
          value: "",
          inDesVal: "",
          clunit: "kg",
          clunit1: "g",
          title: "烟尘减排量",
          increaseVal: 0,
          flag: !1,
          code: "increase",
        },
      ],
      imageMap2: Nt,
      statisticsList: [
        {
          id: 0,
          pointId: 10002,
          text: this.$t("main.total_active_power"),
          key: "wind-power",
          value: "0",
          percent: 100,
          clunit: "kw",
          img: "total-power",
          c0: "#02A1C4",
          c100: "#C9F5FF",
        },
        {
          id: 1,
          pointId: 10001,
          text: this.$t("main.average_wind_speed"),
          key: "wind-speed",
          value: "0",
          percent: 100,
          clunit: "m/s",
          img: "wind-speed",
          c0: "#F2A973",
          c100: "#FFE5D1",
        },
        {
          id: 2,
          pointId: 10003,
          text: this.$t("main.daily_power_generation"),
          key: "power-day",
          value: "0",
          percent: 100,
          clunit: "MW·h",
          img: "power-produce",
          c0: "#37C05F",
          c100: "#D5FFE1",
        },
        {
          id: 3,
          pointId: 10004,
          text: this.$t("main.total_power_generation"),
          key: "power-total",
          value: "0",
          percent: 100,
          clunit: "MW·h",
          img: "cumulative-power",
          c0: "#CF88FC",
          c100: "#EDD0FF",
        },
      ],
      imageMap1: jt,
      total: 0,
      statusList: [],
      polygenList: {},
      shadowLineList: {},
      capacityEcharts: null,
      typeEcharts: null,
      weatherEharts: null,
      planEcharts: null,
      buildEcharts: null,
      runEcharts: null,
      inputCapEcharts: null,
      putTitle: "",
      putProject: !1,
      projectText: "",
      putProjectData: [],
      current: 1,
      pageSize: 10,
      totalNum: 0,
      defaultVal: 0,
      areaTypeData: [],
      areaColorTypeList: [],
      typeColorList: [],
      selectVal: 0,
      aeraList: [],
      colorList: [
        "#34D631",
        "#F4A460",
        "#FF6464",
        "#B0C4DE",
        "#44FFC9",
        "#DDAFFF",
        "#239E7F",
        "#BC8F8F",
        "#FF78AB",
        "#2398ff",
        "#C9AB19",
        "#1DD1FF",
        "#FF63FA",
        "#EF2E0F",
        "#FFBA19",
        "#1376DB",
        "#AC4F87",
        "#E4FF98",
        "#8C24D9",
      ],
      pieColors: {
        initialization: "#b8d346",
        GridConnected: "#2398ff",
        PowerRationing: "#749f84",
        Maintain: "#f77925",
        FRT: "#cf8524",
        Fault: "#f37b24",
        envShutdown: "#c73234",
        manuShutdown: "#ac6668",
        NoCommunication: "#53646e",
        Impellerlock: "#bda299",
        ManualMode: "#746b34",
        PitchTest: "#6f7074",
        Speedup: "#444691",
        Standby: "#edffbe",
        Startup: "#275ca8",
        TyphoonMode: "#2e4553",
        UntieCable: "#90583f",
        Alarm: "#c73234",
        Abnormal: "#f77925",
      },
      projectTab: [
        {
          id: 1,
          name: "项目名称（简称）",
          style: {
            position: "sticky",
            left: 0,
            boxShadow: "0 0 10px rgba(0,0,0,.12)",
          },
        },
        { id: 2, name: "项目类型" },
        { id: 3.1, name: "所属集团(简称) " },
        { id: 3, name: "业主方" },
        { id: 4, name: "所在城市" },
        { id: 5, name: "容量<br/>(万千瓦)" },
        { id: 6, name: "风机型号" },
        { id: 7, name: "风机台数" },
        { id: 8, name: "风机厂家" },
        { id: 9, name: "占地面积<br/>(km²)" },
        { id: 11, name: "开工建设时间" },
        { id: 10, name: "预计投产时间" },
        { id: 19, name: "投产时间" },
        { id: 12, name: "场址中心点离岸距离<br/>(公里)" },
        { id: 13, name: "投资金额<br/>(亿元)" },
        { id: 14, name: "GDP<br/>(亿元)" },
        { id: 15, name: "CO₂年减排量<br/>(t)" },
        { id: 16, name: "SO₂年减排量<br/>(t)" },
        { id: 17, name: "NO₂年减排量<br/>(t)" },
        { id: 18, name: "烟尘年减排量<br/>(t)" },
        { id: 21, name: "项目全称" },
        { id: 20, name: "所属集团(全称)" },
      ],
      tableList: [
        { name: "项目名称", value: "", code: "desc" },
        { name: "项目状态", value: "", code: "etattr_windfarmStatus" },
        {
          name: "所属集团(简称) ",
          value: "",
          code: "etattr_groupAbbreviation",
        },
        { name: "业主方", value: "", code: "etattr_ower" },
        { name: "总承包方", value: "", code: "etattr_contractor" },
        { name: "设计方", value: "", code: "etattr_designer" },
        { name: "前期设计方", value: "", code: "etattr_preDesign" },
        { name: "divider", code: "divider" },
        { name: "所在城市", value: "", code: "etattr_city" },
        { name: "占地面积", value: "", code: "etattr_seaArea", unit: "km²" },
        {
          name: "离岸距离",
          value: "",
          code: "etattr_wayOfIsland",
          unit: "公里",
        },
        { name: "水深", value: "", code: "etattr_depthSea", unit: "米" },
        { name: "divider", code: "divider" },
        {
          name: "装机容量",
          value: "",
          code: "etattr_capacity",
          unit: "万千瓦",
        },
        { name: "风机型号", value: "", code: "etattr_fanStyle" },
        { name: "风机台数", value: "", code: "etattr_fanCount", unit: "台" },
        { name: "风机厂家", value: "", code: "etattr_windTurbineMill" },
        { name: "divider", code: "divider" },
        {
          name: "投资金额",
          value: "",
          code: "etattr_investmentTotal",
          unit: "亿元",
        },
        { name: "GDP", value: "", code: "etattr_GDP", unit: "亿元" },
        { name: "年减排量(CO₂)", code: "co2" },
        { name: "年减排量(SO₂)", code: "so2" },
        { name: "年减排量(NO₂)", code: "no2" },
        { name: "年减排量(烟尘)", code: "smoke" },
      ],
      putColumns: [
        {
          title: "项目名称",
          dataIndex: "code",
          key: "code",
          scopedSlots: { customRender: "code" },
        },
        {
          title: "业主方",
          dataIndex: "etattr_ower",
          key: "etattr_ower",
          scopedSlots: { customRender: "etattr_ower" },
        },
        {
          title: "所在城市",
          dataIndex: "city",
          key: "city",
          scopedSlots: { customRender: "city" },
        },
        {
          title: "容量(MW)",
          dataIndex: "etattr_capacity",
          key: "etattr_capacity",
          scopedSlots: { customRender: "etattr_capacity" },
        },
        {
          title: "风机型号",
          dataIndex: "b",
          key: "b",
          scopedSlots: { customRender: "b" },
        },
        {
          title: "风机台数",
          dataIndex: "c",
          key: "c",
          scopedSlots: { customRender: "c" },
        },
        {
          title: "风机厂家",
          dataIndex: "d",
          key: "d",
          scopedSlots: { customRender: "d" },
        },
        {
          title: "占地面积(km²)",
          dataIndex: "e",
          key: "e",
          scopedSlots: { customRender: "e" },
        },
        {
          title: "开工建设时间",
          dataIndex: "f",
          key: "f",
          scopedSlots: { customRender: "f" },
        },
        {
          title: "预计投产时间",
          dataIndex: "g",
          key: "g",
          scopedSlots: { customRender: "g" },
        },
        {
          title: "场址中心点离岸距离",
          dataIndex: "a",
          key: "a",
          scopedSlots: { customRender: "a" },
        },
      ],
      leftBox: !1,
      toShow: !0,
      toHidden: !1,
      rightBox: !1,
      toShowRight: !0,
      toHiddenRight: !1,
      startY: "",
      endY: "",
      startBuildY: "",
      endBuildY: "",
      countCapacity: 0,
      countFan: 0,
      countArea: 0,
      countMoney: 0,
      countGDP: 0,
      codeVal: "",
      ownerVal: [],
      cityVal: [],
      capacityVal1: this.capacityVal1,
      capacityVal2: this.capacityVal2,
      modelVal: [],
      typeVal: "",
      manufactureVal: [],
      ownerData: [],
      cityData: [],
      modelData: [],
      typeData: ["全部", "投产项目", "在建项目", "规划项目"],
      params: { windfarmStatus: "全部" },
      manufactureData: [],
      projectPhase: ["投产", "在建", "规划"],
      investAmount: {},
      co2: [],
      so2: [],
      no2: [],
      saveBiaomei: [],
      increase: [],
      increaseVal: 0,
      countTxt: 0,
      mqttTopic: null,
      capacityEchearts: !1,
      capacityActive: "put",
      capacityTypes: [
        { name: this.$t("main.produce"), key: "put" },
        { name: this.$t("main.construction"), key: "build" },
        { name: this.$t("main.plan"), key: "plan" },
      ],
      capacityDatas: {},
      capBtnActive: 0,
      isDestory: !1,
      ownerColors: [],
      echartsGroupBy: "",
      fengjiStr: "{}",
      pieData: [],
      designerType: 1,
      popCardInfo: { title: "", size: null, master: "" },
      competInfo: { number: 0, MW: 0 },
      farmDevelopment: {},
      capacityStages: [
        {
          name: this.$t("main.construction"),
          key: "investmentTotal_construct",
          color: "#5CF5B2",
          authKey: "/main/buildBtn",
        },
        {
          name: this.$t("main.produce"),
          key: "investmentTotal_operate",
          color: "#FFE04D",
          authKey: "/main/produceBtn",
        },
        {
          name: this.$t("main.plan"),
          key: "investmentTotal_plan",
          color: "#00BAFF",
          authKey: "/main/planBtn",
        },
      ],
      earAuth: Rt,
      earNMap: Ot,
      capacityMap: zt,
      capMap: Ht,
      subTitleImgMap: qt,
      earTopImg: K,
      timer: 0,
    };
  },
  computed: {
    ...L(["getSubcenterResource"]),
    lang() {
      return `lang_${this.$root.$i18n.locale}`;
    },
    xiaZuanName() {
      return this.xiaZuan ? `/ ${this.xiaZuanItem.name}` : "";
    },
    isEng() {
      return this.$root.$i18n.locale === "en-GB";
    },
    capBtnGroup() {
      let i = this.echartsGroupBy,
        t = [
          { label: "投产", value: "运营" },
          { label: "在建", value: "建设" },
        ];
      return (
        {
          groupAbbreviation: [...t.map((a) => ({ ...a, desc: "（集团）" }))],
          city: [
            ...t.map((a) => ({ ...a, desc: "（区域）" })),
            { label: "规划", value: "规划" },
          ],
          designer: [
            ...t.map((a) => ({ ...a, desc: "" })),
            { label: "", value: "" },
          ],
          compete: [
            {
              label: "竞配",
              value: "运营",
              desc: `（${this.competInfo.number}个场址，共${this.competInfo.MW}万千瓦）`,
            },
            {
              label: "竞配",
              value: "建设",
              desc: `（${this.competInfo.number}个场址，共${this.competInfo.MW}万千瓦）`,
            },
            {
              label: "竞配",
              value: "",
              desc: `（${this.competInfo.number}个场址，共${this.competInfo.MW}万千瓦）`,
            },
          ],
        }[i] || []
      );
    },
    aeraType() {
      let i = this.$t("main.btmMenuList");
      return [
        {
          id: 0,
          code: "windfarmStatus",
          authKey: "/main/constructionStageBtn",
        },
        { id: 1, code: "city", authKey: "/main/cityDistrictBtn" },
        { id: 2, code: "ower", authKey: "/main/ownerBtn" },
        { id: 3, code: "depthSea", authKey: "/main/waterDepthBtn" },
        {
          id: 4,
          code: "windTurbineMill",
          authKey: "/main/windTurbineManufacturersBtn",
        },
        { id: 5, code: "capacity", authKey: "/main/capacityBtn" },
        {
          id: 6,
          code: "cpmponeny",
          authKey: "/main/designConstructionPackageUnitBtn",
        },
        { id: 8, code: "yuedongchangzhi", authKey: "/main/yuedongchangzhiBtn" },
      ]
        .map((e, a) => ((e.title = i[a]), e))
        .concat([
          {
            id: 7,
            code: "city",
            title: this.isEng ? "2023 Competitive Solution" : "2023竞配场址",
            authKey: "/main/2023CompetitiveSolutionBtn",
          },
        ]);
    },
    maxCapacity() {
      let [i] = (this.capacityDatas[this.capacityActive] || []).sort(
        (t, e) => e.value - t.value
      );
      return i ? i.value : 0;
    },
  },
  destroyed() {
    (this.isDestory = !0),
      this.destroyedMqtt(),
      this.timer && clearInterval(this.timer);
  },
  watch: {
    "$store.state.subcenterState.isGd": {
      async handler(i) {
        var a;
        console.log("store.subcenterState.isGd change"),
          this.destroyedMqtt(),
          this.initCharts();
        const t = this.$store.state.subcenterUtil.getMapCenter(),
          e = this.$store.state.subcenterUtil.getMapZoom();
        w &&
          w.jumpTo({
            center: t,
            zoom:
              (a = this.$store.state.subcenterState) != null && a.isGd ? 0 : e,
          });
      },
    },
  },
  async mounted() {
    (this.isDestory = !1),
      (this.tempEmissions = this.currentEmissions),
      this._GetNewLoads().then(() => {
        this.initMap();
      }),
      this.initCharts(),
      (window.onresize = () => {
        this.capacityEcharts === null || this.capacityEcharts.resize(),
          this.typeEcharts === null || this.typeEcharts.resize(),
          this.weatherEharts === null || this.weatherEharts.resize(),
          this.planEcharts === null || this.planEcharts.resize(),
          this.buildEcharts === null || this.buildEcharts.resize(),
          this.runEcharts === null || this.runEcharts.resize();
      }),
      this.getHomePageTopicName();
  },
  methods: {
    async getHomePageTopicName() {
      const i = this.$store.state.subcenterState.isGd,
        t = this.$store.state.subcenterResource.area,
        { result: e } = {
          success: true,
          message: "操作成功！",
          code: 200,
          result: {
            "wind-speed": "4.507",
            "power-day": "343.231",
            "wind-stat":
              '{"Speedup":2,"Maintain":5,"PowerRationing":7,"envShutdown":5,"initialization":3,"Fault":2,"Standby":5,"Startup":3,"GridConnected":139}',
            "wind-power": "200410.689",
            "power-total": "5623382.816",
          },
          timestamp: 1752035212715,
        };
      const a = {};
      Object.keys(e).forEach((s) => {
        const n = this.statisticsList.find((r) => r.key === s);
        n && ((n.value = e[s]), (a[n.pointId] = e[s]));
      }),
        (a[10010] = e["wind-stat"]),
        this.handleTopicData(a),
        this.timer === 0 && this.loopGetHomePageTopicName();
    },
    loopGetHomePageTopicName() {
      this.timer = setInterval(this.getHomePageTopicName, 3e3);
    },
    getTimeYYYYMMDD(i) {
      return I(i).format("YYYY-MM-DD");
    },
    destroyedMqtt() {
      if (this.mqttTopic) {
        let i = this.mqttTopic;
        Tt(i, !1, "_sea", () => {}), (this.mqttTopic = null);
      }
    },
    initMap() {
      const i = this.$store.state.subcenterUtil.getMapCenter(),
        t = this.$store.state.subcenterUtil.getMapZoom(),
        e = new Z.Map({
          container: this.$refs.map,
          style: "blank",
          minZoom: 6.4,
          zoom: this.$store.state.subcenterState.isGd ? 0 : t,
          center: i,
        });
      (w = e),
        (this.map = new U({
          id: this.$refs.map,
          logoVisible: !1,
          map: new J({ mapInstance: e }),
        })),
        this.map.on("loaded", () => {
          new Q(X()).addToScene(this.map), this.initData(this.selectVal);
        });
    },
    _GetGis() {
      let i = {
          pageNo: 1,
          pageSize: 100,
          scaling: 12,
          needChild: !0,
          minLng: 103.03230162703443,
          maxLat: 27.29143172979689,
          maxLng: 125.87792994046954,
          minLat: 17.04606397468649,
          longitude: 114.45511578375198,
          latitude: 22.16874785224169,
          radius: 1304.4525,
          height: 1883333,
          gisType: 3,
          attrs: "windfarmStatus,ower,capacity,windTurbineMill,depthSea,city",
        },
        t = new Promise((a) => {
          (i.entityId = v.PLAN),
            (i.sql =
              "etattr_windfarmStatus='规划' AND mdclass_code='windfarm' AND etattr_enable='是' AND (etattr_participationStatistics = or etattr_participationStatistics = '是' or etattr_participationStatistics = 'true')"),
            F(i).then((s) => {
              s.success && a(s.result.records);
            });
        }),
        e = new Promise((a) => {
          (i.entityId = M.OTHER),
            (i.sql =
              "(etattr_windfarmStatus='运营' OR etattr_windfarmStatus='建设') AND mdclass_code='windfarm' AND etattr_enable='是'"),
            F(i).then((s) => {
              s.success && a(s.result.records);
            });
        });
      Promise.all([t, e])
        .then((a) => {
          let s = [...a[0], ...a[1]];
          (this.drawList = s), (this.aeraList = s);
          let n = a[0],
            r = a[1];
          n.forEach((o) => {
            o.pointsArr = [];
            for (let l = 0; l < o.points.length / 3; l++) {
              let c = [o.points[l * 3], o.points[l * 3 + 1]];
              o.pointsArr.push(c);
            }
          }),
            r.forEach((o) => {
              o.pointsArr = [];
              for (let l = 0; l < o.points.length / 3; l++) {
                let c = [o.points[l * 3], o.points[l * 3 + 1]];
                o.pointsArr.push(c);
              }
            }),
            this.$nextTick(() => {
              let o = r.filter((c) => c.attrMap.windfarmStatus === "建设"),
                l = r.filter((c) => c.attrMap.windfarmStatus === "运营");
              this.drawPolygen([n, o, l]);
            });
        })
        .catch((a) => {
          console.log(a);
        });
    },
    drawPolygen(i) {
      if (this.isDestory) return;
      let t = (e) =>
        this.selectVal === 6
          ? { companyType: e.type, companyName: e.companyName }
          : {};
      i.forEach((e, a) => {
        this.polygenList[a] = { isShow: !0, arr: [] };
        let s =
          this.selectVal === 0
            ? ["#00F2FF", "#00ff8a", "#FF8F39", "#3A54DE"]
            : this.typeColorList;
        if (e.length > 0) {
          let n = { features: [], type: "FeatureCollection" };
          if (
            (e.forEach((r, o) => {
              let l = JSON.parse(JSON.stringify(r.pointsArr)).sort(
                (c, p) => c[1] - p[1]
              );
              n.features.push({
                geometry: { coordinates: [r.pointsArr], type: "Polygon" },
                properties: {
                  description:
                    (r.description ? r.description : r.entityDesc) || "",
                  capacity: r.capacity ? r.capacity : "",
                  owner: r.ower ? r.ower : "",
                  markerLatLng: l.length ? l[0] : [],
                  managementUnit: r.managementUnit,
                  projectStatus: r.project_status,
                  city: r.city,
                  leadDevelopment: r.attrMap.leadDevelopment,
                  ...t(r),
                },
                id: o,
                type: "Feature",
              });
            }),
            n.features.length > 0)
          ) {
            let r = new tt({ zIndex: 95 })
                .source(n)
                .color(s[a])
                .shape("fill")
                .active(!0)
                .style({ opacity: s[a] === "#00F2FF" ? 0.85 : 0.7 }),
              o = new x({ zIndex: 96 })
                .source(n)
                .color(s[a] === "#00F2FF" ? "#ACEAFF" : s[a])
                .size(1)
                .style({ opacity: s[a] === "#00F2FF" ? 1 : 0.9 }),
              l = null,
              c = this.$t("main.btmMenuList");
            r.on("mousemove", (p) => {
              var $;
              this.showHoverRow = [];
              let {
                description: m,
                capacity: y,
                owner: h,
                companyType: d,
                companyName: B,
                managementUnit: k,
                projectStatus: A,
                leadDevelopment: T,
              } = p.feature.properties;
              this.showHoverRow.push({
                key: c[5],
                val: `${this.$t("currency.MW", [y])}${this.$t("unit.MW")}`,
              }),
                k
                  ? this.showHoverRow.push(
                      { key: c[8], val: `${k}海域` },
                      { key: c[9], val: T },
                      { key: c[10], val: A, className: "prj-details" }
                    )
                  : (this.showHoverRow.push({ key: c[2], val: `${h}` }),
                    d !== "其他" &&
                      d !== "Others" &&
                      d &&
                      this.showHoverRow.push({ key: d, val: B })),
                (this.popCardInfo = { title: m }),
                (l = new et({ offsets: [0, 0], closeButton: !1 })
                  .setLnglat(p.feature.properties.markerLatLng)
                  .setHTML(
                    ($ = this.$refs.fanPopCard) == null ? void 0 : $.$el
                  )),
                this.map.addPopup(l);
            }),
              r.on("mouseout", () => {
                l && l.close();
              }),
              this.map.addLayer(r),
              this.map.addLayer(o),
              this.polygenList[a].arr.push(r),
              this.polygenList[a].arr.push(o),
              _.push(r, o);
          }
        }
      }),
        this.selectVal === 7 &&
          at.data.map((e) => {
            let a = {
                type: "FeatureCollection",
                features: [st(e.coordinates, e.properties)],
              },
              s = new x({ enablePropagation: !0, zIndex: 94 })
                .source(a)
                .shape("line")
                .size(2)
                .color("rgba(0,128,210, .5)")
                .style({ lineType: "dash", dashArray: [5, 5] }),
              n = new it({ zIndex: 94 })
                .source({
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      properties: {
                        name: this.$t(`dictionary.${e.properties.name}`),
                        longitude: 115.21868573262105,
                        latitude: 22.134901812121914,
                      },
                      geometry: {
                        type: "Polygon",
                        coordinates: [e.coordinates],
                      },
                    },
                  ],
                })
                .shape("name", "text")
                .size(15)
                .color("#67C9FF")
                .rotate("r", () => Math.PI * -0.14)
                .style({
                  textAnchor: "CENTER",
                  textOffset: [0, -30],
                  halo: 0.5,
                });
            _.push(s), _.push(n), this.map.addLayer(s), this.map.addLayer(n);
          });
    },
    onShow(i) {
      if (
        ((this.polygenList[i].isShow = !this.polygenList[i].isShow),
        this.polygenList[i].arr.forEach((t) => {
          t !== null && (this.polygenList[i].isShow ? t.show() : t.hide());
        }),
        this.selectVal === 7)
      ) {
        let t = this.areaColorTypeList[i].txt;
        this.shadowLineList[t].map((e) => {
          e !== null && (e.isShow ? e.show() : e.hide());
        });
      }
    },
    async initCharts() {
      await this.initCapacity(),
        await this._GetStatistics(),
        await this.industryData(),
        await this.initPut(),
        await this.initBuild(),
        await this.initPlan(),
        this.countPlanCapacity();
    },
    initData(i) {
      let t = [],
        e = [];
      e =
        i === 0 || i === 6
          ? ["#00F2FF", "#00ff8a", "#FF8F39", "#3A54DE"]
          : i === 3
          ? ["#3A54DE", "#F4A460", "#FF6464", "#B0C4DE"]
          : [...this.colorList];
      const a = this.areaTypeData[i]
          .map((n) => n.name)
          .findIndex((n) => n === "其他" || n === "Others"),
        s = (n) => {
          let r;
          return (
            n.name === "其他"
              ? (r = n.name)
              : (r = `${n.name}：${n.companyName}`),
            r
          );
        };
      if (a >= 0 && i !== 6) {
        const [n] = this.areaTypeData[i].splice(a, 1);
        this.areaTypeData[i].push(n),
          (e[this.areaTypeData[i].length - 1] = "#4871b3");
      }
      (this.areaColorTypeList = this.areaTypeData[i].map((n, r) => ({
        key: r,
        txt: i === 6 ? s(n) : n.name,
        color: e[r],
      }))),
        (this.typeColorList = this.areaColorTypeList.map((n) => n.color)),
        this.areaTypeData[i].forEach((n) => {
          n.loadsEntityList &&
            n.loadsEntityList.length > 0 &&
            (n.loadsEntityList.forEach((r) => {
              r.pointsArr = [];
              for (let o = 0; o < r.points.length / 3; o++) {
                let l = [r.points[o * 3], r.points[o * 3 + 1]];
                r.pointsArr.push(l);
              }
            }),
            t.push(n.loadsEntityList));
        }),
        this.drawPolygen(t);
    },
    async _GetNewLoads() {
      let i = {
          pageNo: 1,
          pageSize: 500,
          scaling: 13,
          needChild: !0,
          minLng: 103.03230162703443,
          maxLat: 27.29143172979689,
          maxLng: 125.87792994046954,
          minLat: 17.04606397468649,
          longitude: 114.45511578375198,
          latitude: 22.16874785224169,
          radius: 1304.4525,
          height: 1883333,
          gisType: 3,
          en: this.$root.$i18n.locale === "en-GB" ? "1" : "2",
          attrs:
            "windfarmStatus, groupAbbreviation, ower, capacity, windTurbineMill, depthSea, city, depthType, designer,contractor",
          entityId: 19478,
          planningEntityId: 1319646,
          type: "",
        },
        { result: t } = await Y(i);
      this.areaTypeData = t;
      let e = JSON.parse(JSON.stringify(this.areaTypeData[2])),
        a = e.findIndex((s) => s.name === "其他");
      if (a !== -1) {
        let s = e.splice(a, 1);
        this.ownerColors = [...e, ...s].map((n, r) => ({
          name: n.name,
          color: this.colorList[r],
        }));
      }
    },
    onHandleChange(i) {
      this.map && this.removeLayer(),
        (this.polygenList = []),
        (this.selectVal = i),
        this.initData(i);
    },
    removeLayer() {
      _.forEach((i) => {
        this.map.removeLayer(i);
      }),
        (_ = []);
    },
    initCapacity() {
      f({
        groupByField: "etattr_ower",
        method: "sum",
        methodField: "etattr_capacity",
      }).then((t) => {
        if (t.success && t.result.length > 0) {
          let e = t.result.filter((n) => u(n._id)),
            a = { yAxis: [], colors: [] },
            s = [];
          if (
            (e.forEach((n, r) => {
              if (
                (a.yAxis.push({ name: n._id, value: n.etattr_capacity }),
                this.ownerColors.length)
              ) {
                let o = this.ownerColors.find((l) => l.name === n._id);
                if (o) a.colors.push(o.color);
                else {
                  let l = this.colorList[e.length + s.length];
                  a.colors.push(l), s.push(l);
                }
              } else a.colors.push(this.colorList[r]);
            }),
            !this.$refs.capacity_charts)
          )
            return;
          (this.capacityEcharts = D(this.$refs.capacity_charts)),
            this.capacityEcharts.setOption(nt(a)),
            this.capacityEcharts.on("click", (n) => {
              this.drawList = this.drawList.filter(
                (r) => r.attrMap.ower === n.name
              );
            });
        }
      });
    },
    initType() {
      f({
        groupByField: "etattr_Manufacturer",
        method: "sum",
        methodField: "",
      }).then((t) => {
        if (t.success && t.result.length > 0) {
          let e = t.result.filter((s) => u(s._id));
          e = e.sort((s, n) => n.count - s.count);
          let a = { yAxis: e.map((s) => s.count), xAxis: e.map((s) => s._id) };
          this.$refs.type_charts ||
            (this.typeEcharts = D(this.$refs.type_charts)),
            this.typeEcharts.setOption(rt(a));
        }
      });
    },
    _GetDictList() {
      return V({ dictId: 50, pageNo: 1, pageSize: 30, field: "id" }).then(
        (t) => {
          t.success && (this.statusList = t.result.list || []);
        }
      );
    },
    _GetStatistics() {
      this.mqttTopic;
    },
    handleTopicData(i) {
      console.log(i),
        this.statisticsList.forEach((e) => {
          if (
            ((e.value = i[e.pointId]),
            e.pointId === 10001 &&
              (e.value = (
                Number(e.value) +
                (Math.random() * (0.3 - 0.1) + 0.1)
              ).toFixed(2)),
            e.pointId === 10003)
          ) {
            let a = ((Number(e.value) / 1e3) * 305.5) / 1e4,
              s = a * 10500;
            this.saveBiaomei.push(a * 1e4),
              this.co2.push(a * 2.6604 * 1e4),
              this.so2.push(((s * 35) / 1e5) * 1e3),
              this.increase.push(((s * 10) / 1e5) * 1e3);
          }
        }),
        (this.saveBiaomei.length > 2 ||
          this.co2.length > 2 ||
          this.so2.length > 2 ||
          this.increase.length > 2) &&
          this.currentEmissions.forEach((e) => {
            this[e.code].splice(0, 1);
          }),
        (this.saveBiaomei.length === 2 ||
          this.co2.length === 2 ||
          this.so2.length === 2 ||
          this.increase.length === 2) &&
          this.currentEmissions.forEach((e) => {
            let a = +((this[e.code][1] - this[e.code][0]) * 1e3).toFixed(3);
            a && (e.increaseVal = a);
          }),
        this.currentEmissions.forEach((e) => {
          e.value = this[e.code][0].toFixed(2);
        }),
        +this.currentEmissions[0].increaseVal &&
          (this.tempEmissions = JSON.parse(
            JSON.stringify(this.currentEmissions)
          ));
      let t = i[10010];
      u(t) &&
        t !== this.fengjiStr &&
        ((this.fengjiStr = t),
        this.$nextTick(() => {
          if (this.$refs.chartEle) {
            this.weatherEharts ||
              (this.weatherEharts = Lt(this.$refs.chartEle)),
              this.weatherEharts.clear();
            let e = this.getSource();
            this.weatherEharts.setOption(
              Pt({ pieData: e, unit: ` ${this.$t("unit.set")}`, angle: 260 })
            ),
              (this.weatherEharts._model.option.pieData = e);
          }
        }));
    },
    _GetTopicData(i) {
      i !== void 0 && this.handleTopicData(i[19478]);
    },
    getSource() {
      let i = JSON.parse(this.fengjiStr),
        t = 0,
        e = [];
      for (let a in i)
        if (a) {
          t += i[a];
          let s = It.find((n) => n.code === a);
          s &&
            e.push({
              name:
                this.$store.state.app.language === "en-GB"
                  ? this.$t(`custom_wind_turbine_code.${s.code}`)
                  : s.text,
              value: i[a],
              itemStyle: { opacity: 1, color: this.pieColors[a] },
            });
        }
      return (this.total = t), e.sort((a, s) => s.value - a.value);
    },
    async industryData() {
      const i = this.$store.state.subcenterState.isGd,
        t = this.$store.state.subcenterResource.area;
      let e = await G({ area: i ? void 0 : t });
      e.success && (this.investAmount = e.result);
    },
    parseAmount(i) {
      return i && parseFloat(i) ? +parseFloat(i).toFixed(2) : "";
    },
    initPut() {
      let i = {
        needDoc: !0,
        entityId: v.OTHER,
        windfarmStatus: "运营",
        subCenter: this.$store.state.subcenterResource.area || void 0,
      };
      return C(i).then((t) => {
        if (t.success) {
          this.top.put = t.result.records.length;
          let e = t.result.records;
          if (e && e.length > 0) {
            let a = e.map((s) => ({
              name: this.isEng
                ? s.document.etattr_enName
                : s.document.etattr_abbreviationName || s.desc || s.code,
              value: s.document.etattr_capacity,
              entityId: s.entityId,
            }));
            (this.bottom.capacity3 = g(a.map((s) => s.value))),
              this.$set(this.capacityDatas, "put", a);
          }
        }
      });
    },
    initBuild() {
      let i = {
        needDoc: !0,
        entityId: v.OTHER,
        windfarmStatus: "建设",
        subCenter: this.$store.state.subcenterResource.area || void 0,
      };
      return C(i).then((t) => {
        if (
          t.success &&
          ((this.top.build = t.result.records.length),
          t.result.records && t.result.records.length > 0)
        ) {
          let a = t.result.records.map((s) => ({
            name: this.isEng ? s.document.etattr_enName : s.desc || s.code,
            value: s.document.etattr_capacity,
            entityId: s.entityId,
          }));
          (this.bottom.capacity2 = g(a.map((s) => s.value))),
            this.$set(this.capacityDatas, "build", a);
        }
      });
    },
    initPlan() {
      let i = {
        needDoc: !0,
        entityId: v.PLAN,
        windfarmStatus: "规划",
        subCenter: this.$store.state.subcenterResource.area || void 0,
      };
      return C(i).then((t) => {
        if (
          t.success &&
          ((this.top.plan = t.result.records.length),
          t.result.records && t.result.records.length > 0)
        ) {
          let a = t.result.records.map((s) => ({
            name: this.isEng ? s.document.etattr_enName : s.desc || s.code,
            value: s.document.etattr_capacity,
            entityId: s.entityId,
          }));
          (this.bottom.capacity1 = g(a.map((s) => s.value))),
            this.$set(this.capacityDatas, "plan", a);
        }
      });
    },
    countPlanCapacity() {
      let i = Object.values(this.bottom);
      this.countTxt = g(i).toFixed(2);
    },
    async _GetExecute(i) {
      let { result: t } = await j({ entityId: i });
      this.tableList.forEach((e, a) => {
        switch (e.code) {
          case "desc":
            this.tableList[a].value = t.desc || t.code || "/";
            break;
          case "co2":
            this.tableList[a].value = u(t.etattr_capacity)
              ? (t.etattr_capacity * 10 * 3500 * 1e3 * 832) / 1e3 / 1e3 + "t"
              : "/";
            break;
          case "so2":
            this.tableList[a].value = u(t.etattr_capacity)
              ? (t.etattr_capacity * 10 * 3500 * 1e3 * 0.16) / 1e3 / 1e3 + "t"
              : "/";
            break;
          case "no2":
            this.tableList[a].value = u(t.etattr_capacity)
              ? (t.etattr_capacity * 10 * 3500 * 1e3 * 0.179) / 1e3 / 1e3 + "t"
              : "/";
            break;
          case "smoke":
            this.tableList[a].value = u(t.etattr_capacity)
              ? (t.etattr_capacity * 10 * 3500 * 1e3 * 0.032) / 1e3 / 1e3 + "t"
              : "/";
            break;
          case "etattr_investmentTotal":
          case "etattr_GDP":
            this.tableList[a].value = u(this.tableList[a].value)
              ? (this.tableList[a].value / 1e4).toFixed(2)
              : "/";
            break;
          default:
            this.tableList[a].value = u(t[e.code]) ? t[e.code] : "/";
        }
      });
    },
    async onOpenCapacity(i) {
      this.farmDevelopment = {};
      const [, t] = await Promise.all([
        this._GetExecute(i.entityId),
        N(i.entityId),
      ]);
      (this.farmDevelopment = t.result),
        (this.putTitle = i.name),
        this.$refs.projectProgress.open();
    },
    onMoreClick(i) {
      (this.projectText = i),
        (this.putProject = !0),
        (this.current = 1),
        (this.typeVal = i),
        this.onReset();
    },
    _GetExecuteMore(i, t, e) {
      (this.putProjectData.length = 0),
        O(i).then((a) => {
          a.success &&
            ((this.putProjectData = a.result.slice((t - 1) * 10, e * t)),
            this.putProjectData.forEach((s) => {
              s.etattr_windfarmStatus === "运营"
                ? this.$set(s, "type", "投产项目")
                : s.etattr_windfarmStatus === "建设"
                ? this.$set(s, "type", "在建项目")
                : s.etattr_windfarmStatus === "规划" &&
                  this.$set(s, "type", "规划项目");
            }),
            (this.totalNum = a.result.length),
            (this.countCapacity = a.result
              .filter((s) => u(s.etattr_capacity))
              .reduce((s, n) => s + n.etattr_capacity, 0)),
            (this.countFan = a.result
              .filter((s) => u(s.etattr_fanCount))
              .reduce((s, n) => s + Number(n.etattr_fanCount), 0)),
            (this.countArea = a.result
              .filter((s) => u(s.etattr_seaArea))
              .reduce((s, n) => s + Number(n.etattr_seaArea), 0)),
            (this.countMoney = a.result
              .filter((s) => u(s.etattr_investmentTotal))
              .reduce((s, n) => s + Number(n.etattr_investmentTotal), 0)),
            (this.countGDP = a.result
              .filter((s) => u(s.etattr_GDP))
              .reduce((s, n) => s + Number(n.etattr_GDP), 0)));
        });
    },
    async _GetSelectList() {
      let { result: i } = await R({}),
        { city: t, fanStyle: e, ower: a, windTurbineMill: s } = i;
      (this.ownerData = a),
        (this.cityData = t),
        (this.modelData = e),
        (this.manufactureData = s);
    },
    onPageChange(i, t) {
      this._GetData(i, t);
    },
    onCancelPut() {
      this.onReset(), (this.putProject = !1);
    },
    onShrink() {
      (this.toShow = !this.toShow),
        (this.toHidden = !this.toHidden),
        (this.leftBox = !this.leftBox);
    },
    onShrinkR() {
      (this.toShowRight = !this.toShowRight),
        (this.toHiddenRight = !this.toHiddenRight),
        (this.rightBox = !this.rightBox);
    },
    onSearchFn() {
      (this.putProject = !0),
        (this.current = 1),
        (this.typeVal = "全部"),
        this._GetSelectList(),
        this.onReset();
    },
    onQuery() {
      (this.current = 1), this._GetData(this.current, 10);
    },
    _GetData(i, t) {
      let e = {};
      (this.projectText = this.typeVal),
        (e.windfarmStatus = this.typeVal),
        this.codeVal && (e.projectName = this.codeVal),
        this.ownerVal.length > 0 && (e.ower = this.ownerVal.join(",")),
        this.cityVal.length > 0 && (e.city = this.cityVal.join(",")),
        this.capacityVal1 && (e.minCapacity = this.capacityVal1),
        this.capacityVal2 && (e.maxCapacity = this.capacityVal2),
        this.modelVal.length > 0 && (e.fanStyle = this.modelVal.join(",")),
        this.manufactureVal.length > 0 &&
          (e.windTurbineMill = this.manufactureVal.join(",")),
        this.startY && (e.minPlanProductionTime = this.startY),
        this.endY && (e.maxPlanProductionTime = this.endY),
        this.startBuildY && (e.minWorkStartTime = this.startBuildY),
        this.endBuildY && (e.maxWorkStartTime = this.endBuildY),
        (this.params = { ...e }),
        this._GetExecuteMore(this.params, i, t);
    },
    onReset() {
      (this.codeVal = ""),
        (this.ownerVal = []),
        (this.cityVal = []),
        (this.capacityVal1 = null),
        (this.capacityVal2 = null),
        (this.modelVal = []),
        (this.startY = ""),
        (this.endY = ""),
        (this.startBuildY = ""),
        (this.endBuildY = ""),
        this.onPageChange(this.current, this.pageSize);
    },
    onPutStartChange(i) {
      this.startY = i.format("YYYY");
    },
    onPutEndChange(i) {
      this.endY = i.format("YYYY");
    },
    onBuildStartChange(i) {
      this.startBuildY = i.format("YYYY");
    },
    onBuildEndChange(i) {
      this.endBuildY = i.format("YYYY");
    },
    onCapacityBtn() {
      if (this.echartsGroupBy === "designer")
        this._GetDesignerGroupCount(this.capBtnActive);
      else if (this.echartsGroupBy === "compete")
        this._GetCompeteCount(this.capBtnActive);
      else {
        const i = this.capBtnGroup[this.capBtnActive];
        this._GetCapacityCount(i.value);
      }
    },
    onEcheartClick(i) {
      if (i === "history") {
        this.showHistory = !0;
        return;
      }
      (this.capBtnActive = 0),
        (this.echartsGroupBy = i),
        (this.capacityEchearts = !0),
        i === "designer"
          ? this._GetDesignerGroupCount(this.capBtnActive)
          : i === "compete"
          ? this._GetCompeteCount(this.capBtnActive)
          : this._GetCapacityCount(this.capBtnGroup[this.capBtnActive].value);
    },
    _GetDesignerGroupCount(i) {
      function t(a, s) {
        return a.reduce((n, r) => ((n[r[s]] = n[r[s]] || []).push(r), n), {});
      }
      z({ windFarmStatus: ["运营", "建设", ""][i] || "" }).then((a) => {
        if (a.success) {
          const { result: s } = a;
          let n = [],
            r = t(s, "companyType");
          Object.keys(r).map((c) => {
            let p = t(r[c], "desc"),
              y = Object.keys(p)
                .map((h) => ({ name: h, value: p[h].capacity, h: 0 }))
                .sort((h, d) => h.name.localeCompare(d.name));
            n.push({
              name: `${c}${c !== "其他" ? `: ${r[c][0].companyName}` : ""}`,
              value: r[c].reduce((h, d) => (h += d.capacity), 0),
              otherData: y || [],
            });
          });
          let o = ["总承包方", "勘测设计方", "前期设计", "其他"],
            l = {
              yAxis: n.sort((c, p) => {
                let m =
                    o.indexOf(c.name.split(":")[0]) === -1
                      ? 99
                      : o.indexOf(c.name.split(":")[0]),
                  y = o.indexOf(p.name.split(":")[0]);
                return m - y;
              }),
              colors: ["#1EEDFD", "#00FE84", "#FD893E", "#2C91FF"],
            };
          if (!this.$refs.input_capacity_charts) return;
          (this.inputCapEcharts = this.$echarts.init(
            this.$refs.input_capacity_charts
          )),
            this.inputCapEcharts.setOption(ot(l), { notMerge: !0 });
        }
      });
    },
    _GetCompeteCount(i = 3) {
      let e = { managementUnit: { 0: 1, 1: 2, 3: "" }[i] };
      H(e).then((a) => {
        const { data: s, size: n, totalCapacity: r } = a.result;
        let o = s.map((c) => ({
          name: c.city,
          value: c.list.reduce((p, m) => (p += m.capacity), 0),
          unit: "万千瓦",
          otherData: c.list.map((p) => ({
            name: `${p.desc}`,
            value: p.capacity,
            unit: "万千瓦",
            h: 0,
          })),
        }));
        this.competInfo = { number: n, MW: r };
        let l = { yAxis: o };
        this.$refs.input_capacity_charts &&
          ((this.inputCapEcharts = this.$echarts.init(
            this.$refs.input_capacity_charts
          )),
          this.inputCapEcharts.setOption(ct(l), { notMerge: !0 }));
      });
    },
    cancelXiaZuan() {
      this.xiaZuan &&
        (this.echartsGroupBy === "city" &&
          this.inputCapEcharts.setOption(
            b(this.cancelData[this.echartsGroupBy]),
            { notMerge: !0 }
          ),
        (this.xiaZuan = !1));
    },
    async getAllProject(i, t) {
      let e = t.map((s) => {
          let n = {
            groupByField: "desc",
            method: "sum",
            methodField: "etattr_capacity",
            windfarmStatus: i,
            [this.echartsGroupBy]: s._id,
          };
          return f(n);
        }),
        a = await Promise.all(e);
      return (
        t.forEach((s, n) => {
          s.childArr = a[n].result;
        }),
        t
      );
    },
    _GetCapacityCount(i) {
      window.onresize = () => {
        this.inputCapEcharts === null || this.inputCapEcharts.resize();
      };
      let t = {
        groupByField: `etattr_${this.echartsGroupBy}`,
        method: "sum",
        methodField: "etattr_capacity",
        windfarmStatus: i,
      };
      f(t).then(async (e) => {
        if (e.success && e.result.length > 0) {
          let a = e.result.filter((o) => u(o._id));
          await this.getAllProject(i, a);
          const s = (o) => {
            o = o.sort((c, p) => p.etattr_capacity - c.etattr_capacity);
            let l = [];
            return (
              o.forEach((c) => {
                let p = {
                  name: c._id,
                  value: +c.etattr_capacity.toFixed(2),
                  item: c,
                };
                l.push(p);
              }),
              { yAxis: l }
            );
          };
          let n = s(a);
          if (!this.$refs.input_capacity_charts) return;
          (this.inputCapEcharts = this.$echarts.init(
            this.$refs.input_capacity_charts
          )),
            (this.cancelData[this.echartsGroupBy] = n),
            this.inputCapEcharts.setOption(b(n), { notMerge: !0 }),
            this.inputCapEcharts.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0,
            });
          let r = this;
          this.inputCapEcharts.on("click", function (o) {
            if (r.xiaZuan || r.echartsGroupBy !== "city") return;
            r.xiaZuanItem = o;
            let l = s(o.data.item.childArr),
              c = b(l);
            (c.legend.show = !1),
              r.inputCapEcharts.setOption(c, { notMerge: !0 }),
              (r.xiaZuan = !0);
          });
        }
      });
    },
    onCapCancel() {
      (this.capacityEchearts = !1),
        (this.xiaZuan = !1),
        (this.capBtnActive = 0),
        (this.echartsGroupBy = "");
    },
    earsMore(i) {
      switch (i) {
        case "0":
          this.onSearchFn();
          break;
        case "1":
          this.onEcheartClick("city");
          break;
        case "2":
          this.onEcheartClick("groupAbbreviation");
          break;
        case "3":
          this.onEcheartClick("designer");
          break;
        case "4":
          this.onEcheartClick("compete");
          break;
        case "5":
          this.$router.push("/construction-history/guangdong-province");
          break;
        case "6":
          this.$router.push("/construction-history/technical-advantages");
          break;
      }
    },
  },
};
var Kt = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      { staticClass: "container-parent" },
      [
        e("div", { ref: "map", staticClass: "map noLogo" }),
        e(
          "div",
          { staticClass: "left-block", class: { "side-away": t.leftBox } },
          [
            e("div", { staticClass: "left-side" }, [
              e("span", {
                staticClass: "side-ears",
                on: { click: t.onShrink },
              }),
              e("div", { staticClass: "left-side-cont" }, [
                e("div", { staticClass: "chart-title" }, [
                  e("p", [t._v(t._s(t.$t("main.left_top_module_title")))]),
                  e("span"),
                ]),
                e(
                  "div",
                  { staticClass: "statistics-list" },
                  t._l(t.statisticsList, function (a, s) {
                    return e("div", { key: s, staticClass: "val-item" }, [
                      e("div", {
                        staticClass: "val-img",
                        style: {
                          backgroundImage: `url(${t.imageMap1[a.img]})`,
                        },
                      }),
                      e("div", { staticClass: "val-cont" }, [
                        e(
                          "p",
                          {
                            style: {
                              backgroundImage: `linear-gradient(0deg, ${a.c0} 0%, ${a.c100} 100%)`,
                            },
                          },
                          [
                            e("b", [
                              t._v(
                                t._s(
                                  t.$n(
                                    a.pointId === 10001
                                      ? a.value || 0
                                      : parseInt(a.value)
                                  )
                                )
                              ),
                            ]),
                            t._v(t._s(a.clunit) + " "),
                          ]
                        ),
                        e("span", [t._v(t._s(a.text))]),
                      ]),
                    ]);
                  }),
                  0
                ),
                e("div", { staticClass: "chart-title" }, [
                  e("p", [t._v(t._s(t.$t("main.left_center_module_title")))]),
                  e("span"),
                ]),
                e(
                  "div",
                  { staticClass: "emissions-list" },
                  t._l(t.currentEmissions, function (a, s) {
                    return e("div", { key: s, staticClass: "val-item" }, [
                      e("div", {
                        staticClass: "val-img",
                        style: {
                          backgroundImage: `url(${t.imageMap2[a.img]})`,
                        },
                      }),
                      e("div", { staticClass: "val-cont" }, [
                        e("p", [
                          e("b", [t._v(t._s(a.value || 0))]),
                          t._v(t._s(a.clunit) + " "),
                        ]),
                        e("span", [
                          t._v(
                            "+" +
                              t._s(Math.abs(a.increaseVal)) +
                              t._s(a.clunit1)
                          ),
                        ]),
                      ]),
                    ]);
                  }),
                  0
                ),
                e("div", { staticClass: "chart-title chart-sub-title" }, [
                  e("p", [t._v(t._s(t.$t("main.left_bottom_module_title")))]),
                  e("span", [
                    t._v(t._s(t.$t("main.left_bottom_sub_title", [t.total]))),
                  ]),
                  e("b"),
                ]),
                e("div", {
                  ref: "chartEle",
                  staticClass: "chart-element",
                  attrs: { id: "chartEle" },
                }),
              ]),
            ]),
          ]
        ),
        e(
          "div",
          { staticClass: "right-block", class: { "side-away": t.rightBox } },
          [
            e("div", { staticClass: "right-side" }, [
              e("span", {
                staticClass: "side-ears",
                on: { click: t.onShrinkR },
              }),
              e("div", { staticClass: "right-side-cont" }, [
                e("ul", { staticClass: "slide-ears-top" }, [
                  e(
                    "li",
                    {
                      on: {
                        click: function (a) {
                          return t.earsMore("0");
                        },
                      },
                    },
                    [
                      e("span", {
                        style: { backgroundImage: `url(${t.earTopImg})` },
                      }),
                    ]
                  ),
                ]),
                e(
                  "ul",
                  { staticClass: "side-ears-more" },
                  [
                    t._l("123456", function (a) {
                      return [
                        t.earAuth[a]
                          ? e(
                              "li",
                              {
                                directives: [
                                  {
                                    name: "auth",
                                    rawName: "v-auth",
                                    value: [t.earAuth[a]],
                                    expression: "[earAuth[i]]",
                                  },
                                ],
                                key: a,
                                on: {
                                  click: function (s) {
                                    return t.earsMore(a);
                                  },
                                },
                              },
                              [
                                e("span", {
                                  style: {
                                    backgroundImage: `url(${t.earNMap[a]})`,
                                  },
                                }),
                              ]
                            )
                          : e(
                              "li",
                              {
                                key: a,
                                on: {
                                  click: function (s) {
                                    return t.earsMore(a);
                                  },
                                },
                              },
                              [
                                e("span", {
                                  style: {
                                    backgroundImage: `url(${t.earNMap[a]})`,
                                  },
                                }),
                              ]
                            ),
                      ];
                    }),
                  ],
                  2
                ),
                e("div", { staticClass: "chart-title" }, [
                  e("p", [t._v(t._s(t.$t("main.right_top_module_title")))]),
                  e("span"),
                ]),
                e("div", { staticClass: "chart-stitle capacity-title" }, [
                  e("p", [
                    t._v(t._s(t.$t("main.right_top_container_title_0"))),
                  ]),
                  e("b", [t._v(t._s(t.$n(t.$t("currency.MW", [t.countTxt]))))]),
                  e("span", [
                    t._v(t._s(t.$t("main.right_top_container_title_1"))),
                  ]),
                ]),
                e(
                  "div",
                  { staticClass: "capacity-money" },
                  t._l(t.capacityStages, function (a, s) {
                    return e(
                      "div",
                      {
                        key: s,
                        staticClass: "capacity-item",
                        style: { backgroundImage: `url(${t.capacityMap[s]})` },
                      },
                      [
                        e("i", [
                          e("b", {
                            style: { backgroundImage: `url(${t.capMap[s]})` },
                          }),
                          t._v(t._s(a.name)),
                        ]),
                        e("p", { style: { color: a.color, width: "126px" } }, [
                          e("span", { staticStyle: { color: "#fff" } }, [
                            t._v(t._s(t.$t("unit.rmb"))),
                          ]),
                          t._v(
                            t._s(
                              t.$n(
                                t.$t("currency.billion", [
                                  t.parseAmount(t.investAmount[a.key]) || 0,
                                ])
                              )
                            )
                          ),
                          e("span", [t._v(t._s(t.$t("unit.billion")))]),
                        ]),
                      ]
                    );
                  }),
                  0
                ),
                e("div", { staticClass: "chart-title" }, [
                  e("p", [t._v(t._s(t.$t("main.right_center_module_title")))]),
                  e("span"),
                ]),
                e(
                  "div",
                  { staticClass: "quantity-list" },
                  t._l(
                    [
                      {
                        name: t.$t("main.number_of_operation"),
                        key: "put",
                        capKey: "capacity3",
                        color: "#FFE04D",
                      },
                      {
                        name: t.$t("main.number_of_construction"),
                        key: "build",
                        capKey: "capacity2",
                        color: "#5CF5B2",
                      },
                      {
                        name: "规划储备",
                        key: "plan",
                        capKey: "capacity1",
                        color: "#00BAFF",
                      },
                    ],
                    function (a, s) {
                      return e(
                        "div",
                        {
                          key: s,
                          staticClass: "quantity-item",
                          style: { "--color": a.color },
                        },
                        [
                          e("div", { staticClass: "quantity-item-left" }, [
                            e("i", [t._v(t._s(a.name))]),
                            e("p", { attrs: { "text-center": "" } }, [
                              s != 2
                                ? e("span", [t._v(t._s(t.top[a.key]))])
                                : t._e(),
                              e("span", [t._v(t._s(t.$t("main.wind_farm")))]),
                            ]),
                          ]),
                          e("div", { staticClass: "quantity-item-right" }, [
                            e("span", { staticClass: "en_title" }, [
                              e(
                                "p",
                                {
                                  staticClass: "en_number",
                                  staticStyle: { display: "none" },
                                },
                                [
                                  t._v(" " + t._s(t.top[a.key])),
                                  e("span", [
                                    t._v(t._s(t.$t("main.wind_farm"))),
                                  ]),
                                ]
                              ),
                              e("b", [
                                t._v(t._s(t.$t("main.installedCapacity"))),
                              ]),
                            ]),
                            e("div", [
                              t._m(0, !0),
                              e("h6", [
                                t._v(
                                  " " +
                                    t._s(
                                      t.$n(
                                        t.$t("currency.MW", [
                                          parseInt(t.bottom[a.capKey]),
                                        ])
                                      )
                                    ) +
                                    " " +
                                    t._s(t.$t("unit.MW")) +
                                    " "
                                ),
                              ]),
                            ]),
                          ]),
                        ]
                      );
                    }
                  ),
                  0
                ),
                e("div", { staticClass: "prj-detail" }, [
                  e("div", { staticClass: "prj-titles" }, [
                    e("span", [
                      e("p", [
                        t._v(t._s(t.$t("main.right_bottom_module_title"))),
                      ]),
                    ]),
                    e(
                      "div",
                      { staticClass: "prj-types" },
                      t._l(t.capacityTypes, function (a) {
                        return e(
                          "h6",
                          {
                            key: a.key,
                            class: { "prj-active": a.key === t.capacityActive },
                            on: {
                              click: function (s) {
                                t.capacityActive = a.key;
                              },
                            },
                          },
                          [t._v(" " + t._s(a.name) + " ")]
                        );
                      }),
                      0
                    ),
                  ]),
                  e(
                    "div",
                    {
                      staticClass: "prj-list",
                      class: [`prj-list-${t.capacityActive}`],
                    },
                    t._l(
                      t.capacityDatas[t.capacityActive] || [],
                      function (a, s) {
                        return e(
                          "div",
                          {
                            key: s,
                            staticClass: "prj-item",
                            on: {
                              click: function (n) {
                                return t.onOpenCapacity(a);
                              },
                            },
                          },
                          [
                            e("h4", [
                              e("span", { attrs: { title: a.name } }, [
                                t._v(t._s(a.name)),
                              ]),
                              e("b", [
                                t._v(
                                  t._s(t.$n(t.$t("currency.MW", [a.value]))) +
                                    " "
                                ),
                                e("h6", [t._v(t._s(t.$t("unit.MW")))]),
                              ]),
                            ]),
                            e("div", { staticClass: "prj-line" }, [
                              e("span", {
                                style: {
                                  left: (a.value / t.maxCapacity) * 100 + "%",
                                },
                              }),
                              e("i", {
                                style: {
                                  width:
                                    100 - (a.value / t.maxCapacity) * 100 + "%",
                                },
                              }),
                            ]),
                          ]
                        );
                      }
                    ),
                    0
                  ),
                ]),
              ]),
            ]),
          ]
        ),
        e(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: t.selectVal === 0,
                expression: "selectVal === 0",
              },
            ],
            staticClass: "sub-title",
          },
          t._l(
            [
              { name: t.$t("main.plan"), color: "#a5ffff", key: "plan" },
              {
                name: t.$t("main.construction"),
                color: "#18ffa9",
                key: "build",
              },
              { name: t.$t("main.produce"), color: "#ff7503", key: "put" },
            ],
            function (a, s) {
              return e(
                "div",
                {
                  key: s,
                  staticClass: "sub-title-item",
                  style: { backgroundImage: `url(${t.subTitleImgMap[s]})` },
                  on: {
                    click: function (n) {
                      return t.onShow(s);
                    },
                  },
                },
                [
                  e("p", [t._v(t._s(a.name))]),
                  e(
                    "b",
                    {
                      style: {
                        backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, ${a.color} 100%)`,
                      },
                    },
                    [
                      t._v(
                        " " +
                          t._s(
                            s === 0
                              ? parseInt(t.bottom.capacity1)
                              : t.top[a.key]
                          )
                      ),
                      e("span", [
                        t._v(t._s(s === 0 ? t.$t("unit.MW") : t.$t("unit.ge"))),
                      ]),
                    ]
                  ),
                ]
              );
            }
          ),
          0
        ),
        e("div", { staticClass: "bottom-menu" }, [
          e("div", { staticClass: "aera_list" }, [
            e(
              "div",
              { staticClass: "aera_color" },
              t._l(t.areaColorTypeList, function (a, s) {
                return e(
                  "div",
                  {
                    key: a.key,
                    staticClass: "aera_box",
                    on: {
                      click: function (n) {
                        return t.onShow(s);
                      },
                    },
                  },
                  [
                    e("div", {
                      staticClass: "bg_color",
                      style: { background: a.color },
                    }),
                    e("div", { staticClass: "txt" }, [
                      t._v(" " + t._s(a.txt) + " "),
                    ]),
                  ]
                );
              }),
              0
            ),
          ]),
          e(
            "div",
            { staticClass: "btm-menu-list" },
            t._l(t.aeraType, function (a, s) {
              return e(
                "div",
                {
                  directives: [
                    {
                      name: "auth",
                      rawName: "v-auth",
                      value: [a.authKey],
                      expression: "[area.authKey]",
                    },
                  ],
                  key: s,
                  class: { "area-active": t.selectVal === a.id },
                  on: {
                    click: function (n) {
                      return t.onHandleChange(a.id);
                    },
                  },
                },
                [
                  e(
                    "a-popover",
                    { attrs: { "overlay-class-name": "content-popup" } },
                    [
                      e("template", { slot: "content" }, [
                        t._v(" " + t._s(a.title) + " "),
                      ]),
                      t._v(" " + t._s(a.title) + " "),
                    ],
                    2
                  ),
                ],
                1
              );
            }),
            0
          ),
        ]),
        e("div", { staticClass: "map-mask" }),
        t.putProject
          ? e("div", { staticClass: "put_project" }, [
              e("div", { staticClass: "put_project_bg" }, [
                e("img", { staticClass: "logo", attrs: { src: S, alt: "" } }),
                e("span", { staticClass: "title" }, [
                  t._v("项目 "),
                  t.projectText
                    ? e("span", [t._v("- " + t._s(t.projectText))])
                    : t._e(),
                ]),
                e("img", {
                  staticClass: "icon",
                  attrs: { src: E },
                  on: { click: t.onCancelPut },
                }),
              ]),
              e("div", { staticClass: "put_project_item" }, [
                e("div", { staticClass: "put_item_1" }, [
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("项目的名称：")]),
                      e("a-input", {
                        staticClass: "put_input",
                        model: {
                          value: t.codeVal,
                          callback: function (a) {
                            t.codeVal = a;
                          },
                          expression: "codeVal",
                        },
                      }),
                    ],
                    1
                  ),
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("业主方：")]),
                      e(
                        "a-select",
                        {
                          staticClass: "put_input",
                          attrs: { mode: "multiple" },
                          model: {
                            value: t.ownerVal,
                            callback: function (a) {
                              t.ownerVal = a;
                            },
                            expression: "ownerVal",
                          },
                        },
                        t._l(t.ownerData, function (a, s) {
                          return e(
                            "a-select-option",
                            {
                              key: s,
                              staticClass: "put_input",
                              attrs: { value: a },
                            },
                            [t._v(" " + t._s(a) + " ")]
                          );
                        }),
                        1
                      ),
                    ],
                    1
                  ),
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("所在城市：")]),
                      e(
                        "a-select",
                        {
                          staticClass: "put_input",
                          attrs: { mode: "multiple" },
                          model: {
                            value: t.cityVal,
                            callback: function (a) {
                              t.cityVal = a;
                            },
                            expression: "cityVal",
                          },
                        },
                        t._l(t.cityData, function (a, s) {
                          return e(
                            "a-select-option",
                            {
                              key: s,
                              staticClass: "put_input",
                              attrs: { value: a },
                            },
                            [t._v(" " + t._s(a) + " ")]
                          );
                        }),
                        1
                      ),
                    ],
                    1
                  ),
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("容量(万千瓦)：")]),
                      e("a-input", {
                        staticClass: "put_input put_input_1",
                        model: {
                          value: t.capacityVal1,
                          callback: function (a) {
                            t.capacityVal1 = a;
                          },
                          expression: "capacityVal1",
                        },
                      }),
                      t._v(" ~ "),
                      e("a-input", {
                        staticClass: "put_input put_input_1",
                        model: {
                          value: t.capacityVal2,
                          callback: function (a) {
                            t.capacityVal2 = a;
                          },
                          expression: "capacityVal2",
                        },
                      }),
                    ],
                    1
                  ),
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("风机型号：")]),
                      e(
                        "a-select",
                        {
                          staticClass: "put_input",
                          attrs: { mode: "multiple" },
                          model: {
                            value: t.modelVal,
                            callback: function (a) {
                              t.modelVal = a;
                            },
                            expression: "modelVal",
                          },
                        },
                        t._l(t.modelData, function (a, s) {
                          return e(
                            "a-select-option",
                            {
                              key: s,
                              staticClass: "put_input",
                              attrs: { value: a },
                            },
                            [t._v(" " + t._s(a) + " ")]
                          );
                        }),
                        1
                      ),
                    ],
                    1
                  ),
                ]),
                e("div", { staticClass: "put_item_1 put_item_2" }, [
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("项目类型：")]),
                      e(
                        "a-select",
                        {
                          staticClass: "put_input",
                          model: {
                            value: t.typeVal,
                            callback: function (a) {
                              t.typeVal = a;
                            },
                            expression: "typeVal",
                          },
                        },
                        t._l(t.typeData, function (a, s) {
                          return e(
                            "a-select-option",
                            {
                              key: s,
                              staticClass: "put_input",
                              attrs: { value: a },
                            },
                            [t._v(" " + t._s(a) + " ")]
                          );
                        }),
                        1
                      ),
                    ],
                    1
                  ),
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("风机厂家：")]),
                      e(
                        "a-select",
                        {
                          staticClass: "put_input",
                          attrs: { mode: "multiple" },
                          model: {
                            value: t.manufactureVal,
                            callback: function (a) {
                              t.manufactureVal = a;
                            },
                            expression: "manufactureVal",
                          },
                        },
                        t._l(t.manufactureData, function (a, s) {
                          return e(
                            "a-select-option",
                            {
                              key: s,
                              staticClass: "put_input",
                              attrs: { value: a },
                            },
                            [t._v(" " + t._s(a) + " ")]
                          );
                        }),
                        1
                      ),
                    ],
                    1
                  ),
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("预计投产时间：")]),
                      e("SeaDatePicker", {
                        staticStyle: { width: "60px", display: "inline-block" },
                        attrs: {
                          value: t.startY,
                          format: "YYYY",
                          mode: "year",
                          placeholder: "开始",
                          type: "date",
                          "value-format": "YYYY",
                        },
                        on: { panelChange: t.onPutStartChange },
                      }),
                      t._v(" ~ "),
                      e("SeaDatePicker", {
                        staticStyle: { width: "60px", display: "inline-block" },
                        attrs: {
                          value: t.endY,
                          format: "YYYY",
                          mode: "year",
                          placeholder: "结束",
                          type: "date",
                          "value-format": "YYYY",
                        },
                        on: { panelChange: t.onPutEndChange },
                      }),
                    ],
                    1
                  ),
                  e(
                    "div",
                    { staticClass: "put_item_list" },
                    [
                      e("span", [t._v("开工建设时间：")]),
                      e("SeaDatePicker", {
                        staticStyle: { width: "60px", display: "inline-block" },
                        attrs: {
                          value: t.startBuildY,
                          format: "YYYY",
                          mode: "year",
                          placeholder: "开始",
                          type: "date",
                          "value-format": "YYYY",
                        },
                        on: { panelChange: t.onBuildStartChange },
                      }),
                      t._v(" ~ "),
                      e("SeaDatePicker", {
                        staticStyle: { width: "60px", display: "inline-block" },
                        attrs: {
                          value: t.endBuildY,
                          format: "YYYY",
                          mode: "year",
                          placeholder: "结束",
                          type: "date",
                          "value-format": "YYYY",
                        },
                        on: { panelChange: t.onBuildEndChange },
                      }),
                    ],
                    1
                  ),
                  e("div", { staticClass: "put_btn" }, [
                    e(
                      "button",
                      { staticClass: "query", on: { click: t.onQuery } },
                      [t._v("查询")]
                    ),
                    e(
                      "button",
                      { staticClass: "reset", on: { click: t.onReset } },
                      [t._v("重置")]
                    ),
                  ]),
                ]),
                e("p", { staticClass: "count" }, [
                  t._v(
                    " 统计汇总：总容量：" +
                      t._s(parseFloat(t.countCapacity).toFixed(2)) +
                      "万千瓦；风机台数：" +
                      t._s(t.countFan) +
                      "台；占地面积：" +
                      t._s(Math.floor(t.countArea)) +
                      "km²；投资总金额：" +
                      t._s(parseFloat(t.countMoney / 1e4).toFixed(2)) +
                      "亿元；GDP：" +
                      t._s(parseFloat(t.countGDP / 1e4).toFixed(2)) +
                      "亿元 "
                  ),
                ]),
              ]),
              e(
                "div",
                { staticClass: "put_project_tab_box" },
                [
                  e(
                    "table",
                    { staticClass: "put_project_tab" },
                    [
                      e(
                        "tr",
                        { staticClass: "header" },
                        t._l(t.projectTab, function (a) {
                          return e("td", {
                            key: a.id,
                            style: a.style || {},
                            domProps: { innerHTML: t._s(a.name) },
                          });
                        }),
                        0
                      ),
                      t._l(t.putProjectData, function (a, s) {
                        return e("tr", { key: s }, [
                          e("td", { style: t.projectTab[0].style || {} }, [
                            t._v(t._s(a.desc || a.code || "/")),
                          ]),
                          e("td", [t._v(t._s(a.type || "/"))]),
                          e("td", [
                            t._v(t._s(a.etattr_groupAbbreviation || "/")),
                          ]),
                          e("td", [t._v(t._s(a.etattr_ower || "/"))]),
                          e("td", [t._v(t._s(a.etattr_city || "/"))]),
                          e("td", [t._v(t._s(a.etattr_capacity || "/"))]),
                          e("td", [t._v(t._s(a.etattr_fanStyle || "/"))]),
                          e("td", [t._v(t._s(a.etattr_fanCount || "/"))]),
                          e("td", [
                            t._v(t._s(a.etattr_windTurbineMill || "/")),
                          ]),
                          e("td", [t._v(t._s(a.etattr_seaArea || "/"))]),
                          e("td", [t._v(t._s(a.etattr_buildStartTime || "/"))]),
                          e("td", [
                            t._v(t._s(a.etattr_planProductionTime || "/")),
                          ]),
                          e("td", [
                            t._v(
                              " " +
                                t._s(
                                  a.etattr_netByAllTime
                                    ? t.getTimeYYYYMMDD(a.etattr_netByAllTime)
                                    : "/"
                                ) +
                                " "
                            ),
                          ]),
                          e("td", [t._v(t._s(a.etattr_wayOfIsland || "/"))]),
                          e("td", [
                            t._v(
                              " " +
                                t._s(
                                  a.etattr_investmentTotal
                                    ? parseFloat(
                                        a.etattr_investmentTotal / 1e4
                                      ).toFixed(2)
                                    : "/"
                                ) +
                                " "
                            ),
                          ]),
                          e("td", [
                            t._v(
                              t._s(
                                a.etattr_GDP
                                  ? parseFloat(a.etattr_GDP / 1e4).toFixed(2)
                                  : "/"
                              )
                            ),
                          ]),
                          e("td", [
                            t._v(
                              " " +
                                t._s(
                                  a.etattr_capacity
                                    ? (a.etattr_capacity *
                                        10 *
                                        3500 *
                                        1e3 *
                                        832) /
                                        1e3 /
                                        1e3
                                    : "/"
                                ) +
                                " "
                            ),
                          ]),
                          e("td", [
                            t._v(
                              " " +
                                t._s(
                                  a.etattr_capacity
                                    ? (a.etattr_capacity *
                                        10 *
                                        3500 *
                                        1e3 *
                                        0.16) /
                                        1e3 /
                                        1e3
                                    : "/"
                                ) +
                                " "
                            ),
                          ]),
                          e("td", [
                            t._v(
                              " " +
                                t._s(
                                  a.etattr_capacity
                                    ? (a.etattr_capacity *
                                        10 *
                                        3500 *
                                        1e3 *
                                        0.179) /
                                        1e3 /
                                        1e3
                                    : "/"
                                ) +
                                " "
                            ),
                          ]),
                          e("td", [
                            t._v(
                              " " +
                                t._s(
                                  a.etattr_capacity
                                    ? (a.etattr_capacity *
                                        10 *
                                        3500 *
                                        1e3 *
                                        0.032) /
                                        1e3 /
                                        1e3
                                    : "/"
                                ) +
                                " "
                            ),
                          ]),
                          e("td", [t._v(t._s(a.etattr_fullName || "/"))]),
                          e("td", [t._v(t._s(a.etattr_groupFull || "/"))]),
                        ]);
                      }),
                    ],
                    2
                  ),
                  e("a-pagination", {
                    staticClass: "pagination",
                    attrs: {
                      "page-size": t.pageSize,
                      total: t.totalNum,
                      "show-total": (a) => `共 ${t.totalNum} 条`,
                      "show-less-items": "",
                    },
                    on: { change: t.onPageChange },
                    model: {
                      value: t.current,
                      callback: function (a) {
                        t.current = a;
                      },
                      expression: "current",
                    },
                  }),
                ],
                1
              ),
            ])
          : t._e(),
        e("ProjectProgressDialog", {
          ref: "projectProgress",
          attrs: {
            table: t.tableList,
            "farm-name": t.putTitle,
            develop: t.farmDevelopment,
          },
        }),
        t.capacityEchearts
          ? e(
              "div",
              {
                staticClass: "put_item city_cap_count",
                staticStyle: { width: "850px", height: "700px" },
              },
              [
                e("div", { staticClass: "put_title" }, [
                  e("img", { staticClass: "logo", attrs: { src: S, alt: "" } }),
                  e("span", { staticClass: "title text-red" }, [
                    t._v(
                      "xx" +
                        t._s(t.capBtnGroup[t.capBtnActive].label) +
                        "项目容量占比情况" +
                        t._s(t.capBtnGroup[t.capBtnActive].desc) +
                        t._s(t.xiaZuanName)
                    ),
                  ]),
                  e("img", {
                    staticClass: "icon",
                    attrs: { src: E },
                    on: { click: t.onCapCancel },
                  }),
                ]),
                e(
                  "div",
                  {
                    staticClass: "cancelBtn",
                    style: { opacity: t.xiaZuan ? 1 : 0 },
                    on: { click: t.cancelXiaZuan },
                  },
                  [e("span", [t._v("返回")])]
                ),
                e("div", { staticClass: "chart_box" }, [
                  e("div", {
                    ref: "input_capacity_charts",
                    staticClass: "charts",
                  }),
                ]),
                e(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !t.xiaZuan,
                        expression: "!xiaZuan",
                      },
                    ],
                    staticClass: "cap_btn",
                  },
                  [
                    t.capBtnActive != 0
                      ? e(
                          "div",
                          {
                            staticClass: "cap_btn_item",
                            on: {
                              click: function (a) {
                                t.capBtnActive--, t.onCapacityBtn("input");
                              },
                            },
                          },
                          [e("img", { attrs: { src: Bt, title: "上一个" } })]
                        )
                      : t._e(),
                    (
                      t.echartsGroupBy === "ower"
                        ? t.capBtnActive != 1
                        : t.capBtnActive != t.capBtnGroup.length - 1
                    )
                      ? e(
                          "div",
                          {
                            staticClass: "cap_btn_item",
                            on: {
                              click: function (a) {
                                t.capBtnActive++, t.onCapacityBtn("build");
                              },
                            },
                          },
                          [e("img", { attrs: { src: At, title: "下一个" } })]
                        )
                      : t._e(),
                  ]
                ),
              ]
            )
          : t._e(),
        e("SeaPopCard", {
          ref: "fanPopCard",
          attrs: {
            "dropdown-menu-style": { maxHeight: "200px" },
            title: t.popCardInfo.title,
          },
          scopedSlots: t._u([
            {
              key: "list",
              fn: function () {
                return t._l(t.showHoverRow, function (a, s) {
                  return e(
                    "div",
                    { key: s, staticClass: "const-row", class: a.className },
                    [
                      e("label", [t._v(t._s(a.key))]),
                      e("span", [t._v(t._s(a.val))]),
                    ]
                  );
                });
              },
              proxy: !0,
            },
          ]),
        }),
        t.showHistory
          ? e("History", {
              on: {
                openCapacity: t.onOpenCapacity,
                close: function (a) {
                  t.showHistory = !1;
                },
              },
            })
          : t._e(),
        t.showHistory
          ? e("div", {
              staticClass:
                "history-modal fixed top-0 right-0 bottom-0 left-0 bg-#00000099",
              staticStyle: { "z-index": "1999" },
            })
          : t._e(),
      ],
      1
    );
  },
  Zt = [
    function () {
      var i = this,
        t = i._self._c;
      return t("p", [
        t("span", [i._v(" ")]),
        t("span", [i._v(" ")]),
        t("span", [i._v(" ")]),
        t("span", [i._v(" ")]),
      ]);
    },
  ],
  Ut = q(Wt, Kt, Zt, !1, null, "8b4b60c2");
const pe = Ut.exports;
export { pe as default };
