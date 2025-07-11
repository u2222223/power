const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./ChartByComm-CfNMYcyq.js",
      "./index-FdyGBlLz.js",
      "./index-BnngHmlw.css",
      "./ChartByComm-CxJ2tzVq.css",
      "./modal-CztlpMRZ.js",
      "./modal-DUbP0urr.css",
    ])
) => i.map((i) => d[i]);
import {
  n as g,
  _ as b,
  j as y,
  bK as _,
  bM as D,
  cp as T,
  cv as P,
  cw as k,
  cx as I,
} from "./index-FdyGBlLz.js";
import { b as A, d as N, e as v } from "./common-0X47MWYd.js";
import { w as x } from "./store-BeJ4ml9q.js";
const S = {
  components: {
    ChartByComm: () =>
      b(
        () => import("./ChartByComm-CfNMYcyq.js"),
        __vite__mapDeps([0, 1, 2, 3]),
        import.meta.url
      ),
    modal: () =>
      b(
        () => import("./modal-CztlpMRZ.js"),
        __vite__mapDeps([4, 1, 2, 5]),
        import.meta.url
      ),
  },
  data() {
    return {
      windEntityId: x,
      mode: "point",
      present: "line",
      treeData: [],
      allList: [],
      checkTopicList: [],
      prevDataParams: { span: 30, startTime: null, stopTime: null },
      spanList: [1, 2, 5, 10, 20, 30, 60, 120],
      xAxisData: [],
      seriesData: [],
      comProps: null,
      yAxis: [],
      buttonInfo: { index: null, action: null },
      fanSpeeds: [],
      standardLine: {
        3: 108,
        3.5: 197,
        4: 302,
        4.5: 444,
        5: 628,
        5.5: 840,
        6: 1102,
        6.5: 1405,
        7: 1758,
        7.5: 2186,
        8: 2639,
        8.5: 3157,
        9: 3715,
        9.5: 4239,
        10: 4704,
        10.5: 5029,
        11: 5256,
        11.5: 5389,
        12: 5471,
        12.5: 5500,
        13: 5500,
        13.5: 5500,
        14: 5500,
        14.5: 5500,
        15: 5500,
        15.5: 5500,
        16: 5500,
        16.5: 5500,
        17: 5500,
        17.5: 5500,
        18: 5500,
        18.5: 5500,
        19: 5500,
        19.5: 5500,
        20: 5500,
        20.5: 5500,
        21: 5500,
        21.5: 5500,
        22: 5500,
        22.5: 5500,
        23: 5500,
      },
    };
  },
  async created() {
    this.initSpeed(), await this.initTree(), this.loadAllGather();
  },
  computed: {
    splitLine() {
      return {
        show: !0,
        lineStyle: { color: "#183574", width: 1, type: "dashed" },
      };
    },
    isPower() {
      return this.mode === "power";
    },
    baseLine() {
      let i = [];
      return (
        this.fanSpeeds.forEach((t) => {
          i.push([t, this.standardLine[t]]);
        }),
        i
      );
    },
    checkTopic() {
      return this.isPower
        ? [...new Set(this.checkTopicList.map((i) => i.topicName))]
        : [];
    },
  },
  methods: {
    moment: y,
    lineChange() {
      (this.checkTopicList = []), (this.comProps = null), (this.yAxis = []);
    },
    initSpeed() {
      let i = 0,
        t = 25;
      for (let e = i; e < t; e++) this.fanSpeeds.push(e, e + 0.5);
      this.fanSpeeds.push(t);
    },
    async initTree() {
      this.treeData = await this.loadList(x);
    },
    async loadList(i = x, t = "") {
      let { result: e } = await _({ entityId: i, needAttr: !0 });
      return e.map((a) => {
        let s = a.document.etattr_equipmentType || "";
        return {
          code: a.code,
          key: a.entityId,
          equipment: s || "",
          title: a.code + (s ? `（${s}）` : ""),
          topicName: a.topicName,
          parentName: "",
          isLeaf: !0,
        };
      });
    },
    async loadAllGather() {
      let { result: i } = await D({ entityId: x }),
        t = [];
      for (let e of i || [])
        if (e.entityId !== x) {
          let a = {
            name: e.name,
            clunit: e.clunit,
            shortId: e.shortId,
            pointId: e.pointId,
            entityId: e.entityId,
            topicName: e.topicName,
            topicPoint: `${e.topicName}.${e.pointId}`,
            standpointId: e.standpointId,
          };
          for (let s of this.treeData)
            (e.topicName === s.topicName ||
              e.topicName.includes(`${s.topicName}/`)) &&
              ((a.fanEntityId = s.key),
              (a.fanName = s.code),
              (a.fanTopicName = s.topicName));
          t.push(a);
        }
      this.allList = t;
    },
    submit(i) {
      this.checkTopicList = i;
    },
    prevDataDateChange([i, t]) {
      let e;
      y(t).isSame(new Date(), "day")
        ? (e = y().format("YYYY-MM-DD HH:mm:ss"))
        : (e = y(t).add(1, "days").format("YYYY-MM-DD"));
      let a = { startTime: y(i).format("YYYY-MM-DD"), stopTime: e };
      Object.assign(this.prevDataParams, a);
    },
    _GetPointsData() {
      return new Promise((i) => {
        let t = this.checkTopicList.map((n) => n.topicPoint),
          { startTime: e, stopTime: a, span: s } = this.prevDataParams;
        e && a && s && t.length
          ? T({
              topicPointIds: t.toString(),
              startTime: e,
              stopTime: a,
              span: s,
            }).then((n) => {
              n.success
                ? i(n.result)
                : n.code === 500 && this.$message.error(n.message);
            })
          : (this.$message.error(
              `请先${t.length ? "完善表单" : "选择风机/测点"}`
            ),
            i({}));
      });
    },
    getFanCurve() {
      return new Promise((i) => {
        let { startTime: t, stopTime: e, span: a } = this.prevDataParams;
        t && e && a && this.checkTopic.length
          ? P({
              fanTopicNames: this.checkTopic,
              startTime: `${t} 00:00:00`,
              stopTime: `${e} 23:59:59`,
              span: a,
            }).then((s) => {
              s.success
                ? i(s.result)
                : s.code === 500 && this.$message.error(s.message);
            })
          : (this.$message.error(
              `请先${this.checkTopic.length ? "完善表单" : "选择风机/测点"}`
            ),
            i([]));
      });
    },
    async loadPrevData() {
      (this.seriesData = []), (this.comProps = null);
      let i = await (this.mode === "power" && this.present === "line"
          ? this.getFanCurve()
          : this._GetPointsData()),
        t = JSON.parse(JSON.stringify(this.checkTopicList));
      if (this.mode === "point" && Object.keys(i).length)
        (this.yAxis = []),
          t.forEach((e, a) => {
            let s = i[e.topicPoint] || [];
            a === 0 &&
              (this.xAxisData = s.map(({ utcTime: h }) => A(new Date(h), 1)));
            let n = s.map(({ value: h }) => this.keepDecimal(h)),
              r = n.filter((h) => typeof h == "number"),
              o = Math.min(...r),
              c = Math.max(...r);
            this.yAxis.push({
              min: +(o - (c - o) / 2.5).toFixed(1),
              max: +(c + (c - o) / 2.5).toFixed(1),
            });
            let { name: l, fanName: p, clunit: m } = e,
              f = p ? `${p}-` : "",
              d = m ? `(${m})` : "";
            this.seriesData.push({ name: `${f}${l}${d}`, data: n });
          }),
          this.$nextTick(() => {
            this.comProps = {
              chartData: {
                unit: "",
                xAxisData: this.xAxisData,
                series: this.seriesData.map((e, a) => ({
                  type: "line",
                  showSymbol: !1,
                  hoverAnimation: !1,
                  color: this.getColor(a),
                  yAxisIndex: a,
                  ...e,
                })),
              },
              otherOptions: {
                legend: { show: !0, top: 20, textStyle: { color: "#fff" } },
              },
              beforeSetOptions: (e) => (
                (e.dataZoom = t.map((a, s) => ({
                  type: "slider",
                  yAxisIndex: s,
                  brushSelect: !1,
                  width: 8,
                  handleSize: "160%",
                  left: (t.length - s) * 55 - 2,
                  fillerColor: this.getColor(s),
                  filterMode: "none",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  dataBackground: {
                    lineStyle: { color: "transparent" },
                    areaStyle: { color: "transparent" },
                  },
                }))),
                e.dataZoom.unshift({ type: "inside" }),
                (e.grid.top = 60),
                (e.grid.bottom = 40),
                (e.grid.left = t.length * 55),
                (e.grid.containLabel = !1),
                (e.yAxis = t.map((a, s) => ({
                  type: "value",
                  position: "left",
                  offset: s * 55,
                  splitLine: {
                    show: !0,
                    lineStyle: { color: "#183574", width: 1, type: "dashed" },
                  },
                  axisLabel: { formatter: "{value}" },
                  min: this.yAxis[s].min,
                  max: this.yAxis[s].max,
                  alignTicks: !0,
                  axisLine: {
                    show: !0,
                    lineStyle: { color: this.getColor(s), width: 1 },
                  },
                  axisTick: { show: !0 },
                  scale: !0,
                }))),
                e
              ),
            };
          });
      else if (this.mode === "power") {
        let e = [];
        this.present === "point"
          ? t.forEach((a) => {
              let s = [],
                n = {};
              ["speed", "power"].forEach((r) => {
                let o = i[`${a.topicName}.wind-${r}`] || [];
                (n[r] = {}),
                  o.forEach((c) => {
                    n[r][c.utcTime] = c.value;
                  });
              }),
                Object.keys(n.speed).forEach((r) => {
                  n.speed[r] && n.power[r] && s.push([n.speed[r], n.power[r]]);
                }),
                e.push({ title: a.fanName, topicName: a.topicName, data: s });
            })
          : this.present === "line" &&
            t.forEach((a, s) => {
              let n = i.find((r) => r.desc === a.topicName);
              n &&
                e.push({
                  name: a.fanName,
                  color: this.getColor(s),
                  data: n.data.map((r) => [r.windSpeed, r.power]),
                });
            }),
          this.$nextTick(() => {
            let a = this.present,
              s = [
                { name: "标准功率曲线", color: "#ff0000", data: this.baseLine },
              ];
            a === "line" && (s = [...s, ...e]),
              (this.comProps = {
                chartData: { unit: "", xAxisData: [], series: s },
                otherOptions: {
                  legend: { show: !0, top: 20, textStyle: { color: "#fff" } },
                },
                beforeSetOptions: (n) => (
                  a === "point" &&
                    e.forEach((r, o) => {
                      n.series.push({
                        name: r.title,
                        show: !0,
                        symbolSize: 5,
                        data: r.data,
                        type: "scatter",
                        color: this.getColor(o),
                      });
                    }),
                  (n.tooltip.formatter = (r) => {
                    let o = {},
                      c = [];
                    return (
                      r.forEach((l) => {
                        let p = o[l.seriesName],
                          m = n.series[l.seriesIndex].data[l.dataIndex],
                          f = Array.isArray(m) ? m[1] : m,
                          d = {
                            marker: l.marker,
                            fanSpeed: l.axisValue,
                            power: f || void 0,
                          };
                        p ? p.push(d) : (o[l.seriesName] = [d]);
                      }),
                      Object.keys(o).forEach((l) => {
                        let p = o[l],
                          { marker: m, fanSpeed: f } = p[0],
                          d = p.map((u) => u.power);
                        d = [...new Set(d)].sort((u, w) => w - u);
                        let h = d.map((u) => {
                          let w = u ? ` 功率：${u}kW` : "";
                          return `<br/><div style="display: inline-block;width: 10px;"></div> 风速：${f}m/s${w}`;
                        });
                        c.push(`${m}${l}${h.join("")}`);
                      }),
                      c.join("<br/>")
                    );
                  }),
                  delete n.xAxis.type,
                  delete n.xAxis.data,
                  delete n.xAxis.axisLabel,
                  (n.xAxis.boundaryGap = !1),
                  (n.xAxis.name = `风速
m/s`),
                  (n.xAxis.splitNumber = 20),
                  (n.grid.top = 55),
                  (n.grid.right = 50),
                  (n.grid.bottom = 10),
                  (n.yAxis[0].name = "功率/kW"),
                  (n.yAxis[0].min = 0),
                  (n.yAxis[0].max = 7e3),
                  n
                ),
              });
          });
      }
    },
    async output() {
      let { startTime: i, stopTime: t, span: e } = this.prevDataParams,
        a = this.mode === "power";
      i && t && e && (a ? this.checkTopic : this.checkTopicList).length
        ? (this.$message.success("导出中..."),
          (a ? k : I)({
            fanTopicNames: a ? this.checkTopic : void 0,
            standPointId: a
              ? void 0
              : this.checkTopicList.map((s) => s.standpointId),
            startTime: `${i} 00:00:00`,
            stopTime: `${t} 23:59:59`,
            span: e,
          }).then((s) => {
            let n = this.checkTopicList.map((r) => r.fanName);
            (n = [...new Set(n)]), N(s, `${i}~${t} ${n.toString()}风机测点表`);
          }))
        : this.$message.error("请先完善表单");
    },
    changeYAxis(i) {
      let t = this.yAxis.length - this.buttonInfo.index - 1,
        e = this.buttonInfo.action,
        a = 0;
      !i.ctrlKey && !i.shiftKey && !i.altKey
        ? (a = 1)
        : i.ctrlKey
        ? (a += 100)
        : i.shiftKey
        ? (a += 10)
        : i.altKey && (a += 0.1),
        e === "+"
          ? (this.yAxis[t].max = +(this.yAxis[t].max + a).toFixed(1))
          : e === "-" &&
            (this.yAxis[t].min = +(this.yAxis[t].min - a).toFixed(1));
    },
    keepDecimal(i, t = 4) {
      return v(i) === "string" && i !== ""
        ? +i
          ? +(+i).toFixed(t)
          : i
        : v(i) === "number" && i !== 0 && !Number.isNaN(i)
        ? +i.toFixed(t)
        : Number.isNaN(i)
        ? null
        : i;
    },
    getColor(i) {
      let t = [
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ];
      return t[i % t.length];
    },
  },
};
var $ = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      { staticClass: "analysis-page" },
      [
        e("div", { staticClass: "analysis-cont" }, [
          e(
            "div",
            { staticClass: "analysis-operate" },
            [
              e(
                "a-form",
                {
                  staticClass: "ga-form",
                  attrs: {
                    "label-col": { span: 5 },
                    "wrapper-col": { span: 19 },
                    layout: "inline",
                  },
                },
                [
                  e(
                    "a-form-item",
                    {
                      staticStyle: { width: "350px" },
                      attrs: {
                        label: "数据类型",
                        "label-col": { span: 6 },
                        "wrapper-col": { span: 18 },
                      },
                    },
                    [
                      e(
                        "a-radio-group",
                        {
                          attrs: { name: "lineGroup" },
                          on: { change: t.lineChange },
                          model: {
                            value: t.mode,
                            callback: function (a) {
                              t.mode = a;
                            },
                            expression: "mode",
                          },
                        },
                        [
                          e("a-radio", { attrs: { value: "point" } }, [
                            t._v(" 多测点曲线 "),
                          ]),
                          e("a-radio", { attrs: { value: "power" } }, [
                            t._v(" 风功率曲线/散点 "),
                          ]),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  e(
                    "a-form-item",
                    {
                      staticStyle: { width: "24%" },
                      attrs: { label: "时间范围" },
                    },
                    [
                      e("SeaDatePicker", {
                        attrs: {
                          allowClear: !1,
                          "disabled-date": (a) => a && a > t.moment(),
                          inputReadOnly: "",
                          type: "range",
                          valueFormat: "YYYY-MM-DD",
                          "default-value": [
                            t.prevDataParams.startTime
                              ? t.moment(
                                  t.prevDataParams.startTime,
                                  "YYYY-MM-DD"
                                )
                              : null,
                            t.prevDataParams.stopTime
                              ? t.moment(
                                  t.prevDataParams.stopTime,
                                  "YYYY-MM-DD"
                                )
                              : null,
                          ],
                        },
                        on: { change: t.prevDataDateChange },
                      }),
                    ],
                    1
                  ),
                  e(
                    "a-form-item",
                    { staticStyle: { width: "14%" }, attrs: { label: "间隔" } },
                    [
                      e(
                        "SeaSelect",
                        {
                          staticStyle: { width: "100%" },
                          attrs: {
                            defaultValue: t.prevDataParams.span,
                            placeholder: "请选择间隔",
                            getPopupContainer: (a) => a.parentNode,
                          },
                          on: { change: (a) => (this.prevDataParams.span = a) },
                        },
                        t._l(t.spanList, function (a) {
                          return e("a-select-option", { key: a }, [
                            t._v(" " + t._s(a) + " 分钟 "),
                          ]);
                        }),
                        1
                      ),
                    ],
                    1
                  ),
                  e(
                    "a-form-item",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: t.mode === "power",
                          expression: "mode === 'power'",
                        },
                      ],
                      staticStyle: { width: "16%" },
                      attrs: {
                        label: "呈现类型",
                        "label-col": { span: 7 },
                        "wrapper-col": { span: 17 },
                      },
                    },
                    [
                      e(
                        "a-radio-group",
                        {
                          attrs: { name: "presentGroup" },
                          model: {
                            value: t.present,
                            callback: function (a) {
                              t.present = a;
                            },
                            expression: "present",
                          },
                        },
                        [
                          e("a-radio", { attrs: { value: "line" } }, [
                            t._v(" 趋势图 "),
                          ]),
                          e("a-radio", { attrs: { value: "point" } }, [
                            t._v(" 散点图 "),
                          ]),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  e(
                    "a-form-item",
                    { staticStyle: { width: "280px" } },
                    [
                      e(
                        "a-button",
                        {
                          attrs: { type: "primary", size: "small" },
                          on: {
                            click: function (a) {
                              return t.$refs.modal.init();
                            },
                          },
                        },
                        [t._v(" 测点选择 ")]
                      ),
                      e(
                        "a-button",
                        {
                          attrs: { type: "primary", size: "small" },
                          on: { click: t.loadPrevData },
                        },
                        [t._v(" 查询 ")]
                      ),
                      e(
                        "a-button",
                        {
                          attrs: { type: "primary", size: "small" },
                          on: { click: t.output },
                        },
                        [t._v(" 导出 ")]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
          e(
            "div",
            { staticClass: "analysis-chart" },
            [
              t.mode === "point"
                ? e(
                    "div",
                    { staticClass: "analysis-btn-list" },
                    [
                      t._l(t.yAxis, function (a, s) {
                        return e(
                          "div",
                          {
                            key: s,
                            staticClass: "analysis-btn-group",
                            style: { left: s * 55 + "px" },
                          },
                          t._l(2, function (n) {
                            return e(
                              "span",
                              {
                                key: n,
                                on: {
                                  mouseover: function (r) {
                                    (t.buttonInfo.index = s),
                                      (t.buttonInfo.action =
                                        n === 1 ? "+" : "-");
                                  },
                                  mouseout: function (r) {
                                    (t.buttonInfo.index = null),
                                      (t.buttonInfo.action = null);
                                  },
                                  click: t.changeYAxis,
                                },
                              },
                              [e("i")]
                            );
                          }),
                          0
                        );
                      }),
                      e(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: t.buttonInfo.action,
                              expression: "buttonInfo.action",
                            },
                          ],
                          staticClass: "analysis-btn-info",
                          style: {
                            top: t.buttonInfo.action === "+" ? 0 : "unset",
                            bottom: t.buttonInfo.action === "-" ? 0 : "unset",
                            left: (1 + t.buttonInfo.index) * 55 + "px",
                          },
                        },
                        [
                          e("p", [
                            t._v("单击 " + t._s(t.buttonInfo.action) + "1"),
                          ]),
                          e("p", [
                            t._v("单击"),
                            e("b", [t._v("&")]),
                            t._v("Alt " + t._s(t.buttonInfo.action) + "0.1"),
                          ]),
                          e("p", [
                            t._v("单击"),
                            e("b", [t._v("&")]),
                            t._v("Ctrl " + t._s(t.buttonInfo.action) + "100"),
                          ]),
                          e("p", [
                            t._v("单击"),
                            e("b", [t._v("&")]),
                            t._v("Shift " + t._s(t.buttonInfo.action) + "10"),
                          ]),
                        ]
                      ),
                    ],
                    2
                  )
                : t._e(),
              e("ChartByComm", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.comProps,
                    expression: "comProps",
                  },
                ],
                staticClass: "lines_echarts_points",
                attrs: { cName: "LineChart", comProps: t.comProps },
              }),
            ],
            1
          ),
        ]),
        e("modal", {
          ref: "modal",
          attrs: {
            entityId: t.windEntityId,
            isPower: t.isPower,
            allList: t.allList,
            treeData: t.treeData,
            checkTopicList: t.checkTopicList,
          },
          on: { submit: t.submit },
        }),
      ],
      1
    );
  },
  L = [],
  C = g(S, $, L, !1, null, "ff8a70ef");
const O = C.exports;
export { O as default };
