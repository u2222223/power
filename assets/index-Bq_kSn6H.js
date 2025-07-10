const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./chartTitle-D0Yz7hG9.js",
      "./index-FdyGBlLz.js",
      "./index-BnngHmlw.css",
      "./chartTitle-CesUSjVv.css",
      "./SelectWind--5HfXGEP.js",
      "./SelectWind-BETiPp1a.css",
    ])
) => i.map((i) => d[i]);
import {
  n as c,
  _ as o,
  cE as d,
  cF as m,
  cG as p,
  cH as u,
  cI as f,
  a0 as v,
  cJ as g,
  cK as b,
  cL as _,
  cM as S,
} from "./index-FdyGBlLz.js";
import { t as D } from "./timeFn-D5IUmA63.js";
import { d as w } from "./dayjs.min-DQt1sTWv.js";
import { _ as r } from "./video-DhuHiuk-.js";
let n = null;
const y = {
  components: {
    ChartTitle: () =>
      o(
        () => import("./chartTitle-D0Yz7hG9.js"),
        __vite__mapDeps([0, 1, 2, 3]),
        import.meta.url
      ),
    List: () =>
      o(
        () => import("./index-FdyGBlLz.js").then((t) => t.cU),
        __vite__mapDeps([1, 2]),
        import.meta.url
      ),
    SelectWind: () =>
      o(
        () => import("./SelectWind--5HfXGEP.js"),
        __vite__mapDeps([4, 1, 2, 5]),
        import.meta.url
      ),
  },
  props: {
    treeOpen: { type: Boolean, default: !1 },
    routerName: { type: String, default: "" },
    mode: { type: String, default: "" },
  },
  data() {
    return (
      (n = this),
      {
        searchResult: [],
        val: "",
        inShip: [],
        warnList: [],
        nowRecord: null,
        openDialog: !1,
        colns: [
          { label: "名称", key: "name" },
          {
            label: "所在区域",
            fn(t, e) {
              return `${e.label || ""}：${t.typeName || ""}区域`;
            },
          },
          {
            label: "行驶状态",
            key: "status",
            fn(t, e) {
              const i = { 1: "闯入区域", 2: "在区域行驶", 3: "驶出区域" };
              return `${e.label || ""}：${i[t.status]}`;
            },
          },
          { label: "进入区域时间", key: "createTime" },
          { label: "驶出区域时间", key: "outTime" },
          {
            label: "区域内逗留时长",
            fn(t, e) {
              return `${e.label || ""}：${t.stayTime || ""}`;
            },
          },
          { label: "本次穿越时长", key: "throughTime" },
          { label: "报警状态", key: "typeName" },
          { label: "刷新时间", key: "updateTime" },
          { label: "MMSI", key: "mmsi" },
          {
            fn() {
              return '<div style="display: flex; flex-direction: row"><div data-type="dwcb" style="color:#409eff">定位到船舶</div><div data-type="crgj" style="margin-left: 10px; color:#409eff">闯入轨迹</div></div>';
            },
            eventName: "toShip",
          },
        ],
        hiddenColns: [
          {
            fn(t) {
              let e = `${t.name || ""} ${t.createTime || ""}闯入${
                t.typeName || ""
              }区域`;
              return `<span title='${e}'>${e}</span>`;
            },
          },
          {
            label: "区域内逗留时长",
            fn(t, e) {
              return `${e.label || ""}：${t.stayTime || ""}`;
            },
          },
          { label: "预警状态", key: "typeName" },
        ],
        flag: !0,
        activeTab: 0,
        forecastMmsi: void 0,
        searchMmsiNo: void 0,
        ModalText: "Content of the modal",
        editModelVisible: !1,
        deleteModelVisible: !1,
        confirmEditLoading: !1,
        confirmDeleteLoading: !1,
        selectedShipData: {},
        shipName: "",
        placeholder: "",
        shipAisData: {},
      }
    );
  },
  computed: {
    tabs() {
      const t = [{ label: "内部船舶", code: "InShip" }];
      return (
        this.$route.name !== "weather" &&
          t.unshift({ label: "预警信息", code: "WarnList" }),
        t
      );
    },
    list() {
      return this.isInShip ? this.inShip : this.filterWarnList;
    },
    isInShip() {
      return this.tabs[this.activeTab].code === "InShip";
    },
    filterWarnList() {
      return this.searchMmsiNo
        ? this.warnList.filter((t) =>
            (t.mmsi || "").includes(this.searchMmsiNo)
          )
        : this.warnList;
    },
    isDisable() {
      return this.shipName ? !!this.shipName.length : !1;
    },
  },
  watch: {
    val() {
      (this.forecastMmsi = void 0),
        this.val ? this.search() : (this.searchResult = []),
        this.openDialog &&
          this.$attrs.map &&
          (this.$attrs.map().closeShipPopup(), (this.openDialog = !1));
    },
  },
  beforeDestroy() {
    this.flag = !1;
  },
  mounted() {
    this.start(),
      window.eventBus.$on("openAddShip", () => {
        console.log("form openAddShip emit event"), this.getInShip();
      }),
      window.eventBus.$on("onSelectWindfarm", this.changeFanRecord);
  },
  beforeMount() {
    window.eventBus.$off("openAddShip"),
      window.eventBus.$off("onSelectWindfarm");
  },
  methods: {
    toShip(t, e) {
      console.log(e.srcElement.dataset);
      const { type: i } = e.srcElement.dataset;
      switch (i) {
        case "dwcb":
          this.getShipPosition(t.mmsi);
          break;
        case "crgj":
          this.searchShipPath(t);
          break;
      }
    },
    initData() {
      this.getWarnList(), this.getInShip();
    },
    async start() {
      for (; this.flag; )
        await this.sleep(10 * 60 * 1e3), this.flag && this.initData();
    },
    sleep(t) {
      return new Promise((e) => setTimeout(e, t));
    },
    toFn(t, e, i) {
      this[i.eventName] && (this[i.eventName](e, t), t.stopPropagation());
    },
    changeFanRecord(t) {
      console.log("changeFanRecord:", t), (this.nowRecord = t);
      let e = this.$attrs.map();
      e.closeShipPopup(), (this.val = ""), e.initShipModule(t), this.initData();
    },
    search: D(() => {
      n.val &&
        d({
          pageNo: 1,
          pageSize: 100,
          entityId: n.nowRecord.entityId,
          condition: n.val,
        }).then((t) => {
          (n.searchResult = t.result),
            n.searchResult.length === 0 &&
              n.searchResult.push({ isNoData: !0 });
        });
    }, 200),
    searchShipDetail(t) {
      (this.forecastMmsi = t.mmsi),
        m({
          mmsi: t.mmsi,
          name: t.name,
          windFarmId: n.nowRecord.entityId,
          pageNo: 1,
          pageSize: 100,
        }).then((e) => {
          this.openOrCloseInItem(e.result, e.result.innerShip !== 1);
        });
    },
    getInShip() {
      p({ entityId: this.nowRecord.entityId }).then((t) => {
        if (((this.inShip = t.result), this.inShip.length === 0))
          for (let e = 0; e < 1; e++) this.inShip.push({ isNoData: !0 });
      }),
        localStorage.setItem("windFarmId", this.nowRecord.entityId);
    },
    getWarnList() {
      u({ entityId: this.nowRecord.entityId, pageNo: 1, pageSize: 100 }).then(
        (t) => {
          let e = {
            1: { class: "red", typeName: "报警" },
            2: { class: "yellow", typeName: "警戒" },
            3: { class: "blue", typeName: "预警" },
          };
          if (
            ((this.warnList = t.result.map((i) => ({ ...i, ...e[i.type] }))),
            this.warnList.length === 0)
          )
            for (let i = 0; i < 1; i++)
              this.warnList.push({ isNoData: !0, ...e[1] });
        }
      );
    },
    async searchShipPath(t) {
      let e = this.$attrs.map();
      console.log("searchShipPath", t);
      const { result: i } = await f({
        pageNo: 1,
        pageSize: 3e3,
        mmsi: t.mmsi,
        startTime: t.createTime,
        endTime: t.outTime || w(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });
      e.drawShipTrack(i || []);
    },
    async getShipPosition(t, e, i = !0) {
      console.log("getShipPosition");
      const { result: s } = await v({
        url: "/power/admin/dynamic/windFarm/ship/shipPosition",
        data: { mmsi: t },
      });
      if (!s.lat || !s.lon) {
        this.$message.error("很抱歉无法定位船舶的实时位置");
        return;
      }
      let a = this.$attrs.map();
      (s.shipAis = { lat: s.lat, lon: s.lon, cog: s.cog, hdg: s.hdg }),
        (this.shipAisData = s),
        e == null || e(s),
        a.drawShips([s], i),
        a.findShip(s.mmsi, s);
    },
    openOrCloseItem(t) {
      this.$set(t.item, "showAll", !t.item.showAll);
    },
    openOrCloseInItem(t, e = !1) {
      console.log("openOrCloseInItem", t),
        this.getShipPosition(
          t.mmsi,
          (i) => {
            console.log("res==>", i),
              this.$attrs.map().openShipPopup(i, this.$refs.shipDetailDialog),
              (this.openDialog = !0);
          },
          e
        );
    },
    changeTabs(t) {
      this.activeTab = t;
    },
    searchMmsi() {
      !this.searchMmsiNo &&
        this.forecastMmsi &&
        (this.searchMmsiNo = this.forecastMmsi);
    },
    handleEdit(t) {
      console.log("handleEdit:", t),
        (this.selectedShipData = t),
        (this.shipName = t.cnname),
        this.$nextTick(() => {
          this.editModelVisible = !0;
        });
    },
    handleDelete(t) {
      console.log("handleDelete:", t),
        (this.selectedShipData = t),
        this.$nextTick(() => {
          this.deleteModelVisible = !0;
        });
    },
    handleDeleteOk() {
      console.log("handleDeleteOk", {
        mmsi: this.selectedShipData.mmsi,
        windFarmId: this.nowRecord.entityId,
        name: this.shipName,
      }),
        (this.confirmDeleteLoading = !0),
        g({
          mmsi: this.selectedShipData.mmsi,
          windFarmId: this.nowRecord.entityId,
        }).then((t) => {
          t.code === 200
            ? (this.$message.success("删除成功"),
              (this.deleteModelVisible = !1),
              (this.confirmDeleteLoading = !1),
              this.getInShip())
            : (this.$message.error(t.message),
              (this.deleteModelVisible = !1),
              (this.confirmDeleteLoading = !1));
        });
    },
    handleDeleteCancel() {
      console.log("Clicked cancel button"), (this.deleteModelVisible = !1);
    },
  },
};
var I = function () {
    var e = this,
      i = e._self._c;
    return i(
      "div",
      [
        i(
          "div",
          { staticClass: "seachBox" },
          [
            i(
              "div",
              {
                staticClass: "winFactor",
                staticStyle: { "pointer-events": "auto" },
              },
              [
                i("SelectWind", {
                  attrs: { "default-first": !0 },
                  on: { changeFanRecord: e.changeFanRecord },
                }),
              ],
              1
            ),
            i(
              "SeaInput",
              {
                staticStyle: { "margin-top": "34px", "pointer-events": "auto" },
                attrs: { blcok: "", placeholder: "请输入船名/MMSI" },
                model: {
                  value: e.val,
                  callback: function (s) {
                    e.val = s;
                  },
                  expression: "val",
                },
              },
              [
                i(
                  "div",
                  {
                    staticClass: "suffix",
                    attrs: { slot: "addonAfter" },
                    on: { click: e.search },
                    slot: "addonAfter",
                  },
                  [
                    i("img", { staticClass: "searchIcon", attrs: { src: r } }),
                    i("span", [e._v("搜索")]),
                  ]
                ),
              ]
            ),
            e.searchResult.length
              ? i(
                  "div",
                  {
                    staticClass: "searchResult blackBox beauthScrollbar",
                    style: {
                      "pointer-events": "auto",
                      "overflow-y": e.searchResult.length > 4 ? "auto" : "",
                    },
                  },
                  e._l(e.searchResult, function (s, a) {
                    return i(
                      "div",
                      {
                        key: a,
                        class: s.isNoData && "searchResultNoData",
                        on: {
                          click: function (l) {
                            !s.isNoData && e.searchShipDetail(s);
                          },
                        },
                      },
                      [
                        i("div", [
                          e._v(
                            " " +
                              e._s(
                                s.isNoData
                                  ? "暂无数据"
                                  : `${s.name ? s.name + " / " : ""}${s.mmsi}`
                              ) +
                              " "
                          ),
                        ]),
                      ]
                    );
                  }),
                  0
                )
              : e._e(),
            i("div", {
              ref: "shipDetailDialog",
              staticClass: "shipDetailDialog",
              attrs: { id: "shipDetailDialogBuildx" },
            }),
          ],
          1
        ),
        i(
          "div",
          {
            staticClass: "shipContent",
            staticStyle: { "pointer-events": "auto" },
          },
          [
            i(
              "div",
              { staticClass: "tabsBox" },
              e._l(e.tabs, function (s, a) {
                return i(
                  "div",
                  {
                    key: a,
                    class: a === e.activeTab && "activeTab",
                    attrs: { "data-index": a },
                    on: {
                      click: function (l) {
                        return e.changeTabs(a);
                      },
                    },
                  },
                  [i("div", [e._v(e._s(s.label))])]
                );
              }),
              0
            ),
            i("ChartTitle", {
              staticClass: "chartTitle",
              attrs: { titles: [e.tabs[e.activeTab].label, ""] },
            }),
            i(
              "SeaInput",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: e.tabs[e.activeTab].code === "WarnList",
                    expression: "tabs[activeTab].code === 'WarnList'",
                  },
                ],
                staticClass: "searchShipInput",
                staticStyle: { "margin-top": "34px", "pointer-events": "auto" },
                attrs: {
                  blcok: "",
                  placeholder: e.forecastMmsi || "输入MMSI筛选过滤",
                },
                model: {
                  value: e.searchMmsiNo,
                  callback: function (s) {
                    e.searchMmsiNo = s;
                  },
                  expression: "searchMmsiNo",
                },
              },
              [
                i(
                  "div",
                  {
                    staticClass: "suffix",
                    attrs: { slot: "addonAfter" },
                    on: { click: e.searchMmsi },
                    slot: "addonAfter",
                  },
                  [
                    i("img", { staticClass: "searchIcon", attrs: { src: r } }),
                    i("span", [e._v("搜索")]),
                  ]
                ),
              ]
            ),
            i("List", {
              staticClass: "listBox beauthScrollbar",
              attrs: { list: e.list },
              scopedSlots: e._u([
                {
                  key: "default",
                  fn: function (s) {
                    return [
                      i(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: e.tabs[e.activeTab].code === "WarnList",
                              expression: "tabs[activeTab].code === 'WarnList'",
                            },
                          ],
                          staticClass: "warnItem",
                          class: s.item.class,
                          on: {
                            click: function (a) {
                              !s.item.isNoData && e.openOrCloseItem(s);
                            },
                          },
                        },
                        [
                          i(
                            "div",
                            {
                              staticClass: "title",
                              class: s.item.isNoData && "isNoData",
                            },
                            [
                              i("div", [
                                e._v(
                                  e._s(
                                    s.item.isNoData
                                      ? ""
                                      : `闯入${s.item.typeName}区域`
                                  )
                                ),
                              ]),
                            ]
                          ),
                          s.item.isNoData
                            ? e._e()
                            : i("div", {
                                staticClass: "arrow",
                                class: s.item.showAll
                                  ? "arrowBottom"
                                  : "arrowTop",
                              }),
                          i("div", { staticClass: "content" }, [
                            i(
                              "div",
                              {
                                staticClass: "textContent",
                                style: {
                                  "--itemNum": s.item.showAll
                                    ? e.colns.length
                                    : e.hiddenColns.length,
                                },
                              },
                              [
                                s.item.isNoData
                                  ? e._e()
                                  : e._l(
                                      s.item.showAll ? e.colns : e.hiddenColns,
                                      function (a, l) {
                                        return i("div", {
                                          key: l,
                                          domProps: {
                                            innerHTML: e._s(
                                              a.fn
                                                ? a.fn(s.item, a)
                                                : `${a.label}：${
                                                    s.item[a.key] || "-"
                                                  }`
                                            ),
                                          },
                                          on: {
                                            click: (h) => e.toFn(h, s.item, a),
                                          },
                                        });
                                      }
                                    ),
                                s.item.isNoData
                                  ? i("span", { staticClass: "noData" }, [
                                      e._v("暂无预警信息"),
                                    ])
                                  : e._e(),
                              ],
                              2
                            ),
                          ]),
                        ]
                      ),
                      i(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: e.tabs[e.activeTab].code !== "WarnList",
                              expression: "tabs[activeTab].code !== 'WarnList'",
                            },
                          ],
                          staticClass: "shipItem",
                          on: {
                            click: function (a) {
                              !s.item.isNoData && e.openOrCloseInItem(s.item);
                            },
                          },
                        },
                        [
                          i("div", { staticClass: "icon" }),
                          i("div", { staticClass: "title-box" }, [
                            s.item.isNoData
                              ? e._e()
                              : i("div", { staticClass: "title" }, [
                                  e._v(
                                    " 名称：" +
                                      e._s(s.item.cnname) +
                                      e._s(
                                        s.item.cnname && s.item.name ? "-" : ""
                                      ) +
                                      e._s(s.item.name) +
                                      " "
                                  ),
                                ]),
                            i(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !s.item.isNoData,
                                    expression: "!scope.item.isNoData",
                                  },
                                ],
                                staticClass: "right-btn-box",
                              },
                              [
                                i("img", {
                                  directives: [
                                    {
                                      name: "auth",
                                      rawName: "v-auth",
                                      value: ["/run/shipEdit"],
                                      expression: "['/run/shipEdit']",
                                    },
                                  ],
                                  staticClass: "btn",
                                  attrs: { src: b },
                                  on: {
                                    click: function (a) {
                                      return e.handleEdit(s.item);
                                    },
                                  },
                                }),
                                i("img", {
                                  directives: [
                                    {
                                      name: "auth",
                                      rawName: "v-auth",
                                      value: ["/run/shipDelete"],
                                      expression: "['/run/shipDelete']",
                                    },
                                  ],
                                  staticClass: "btn",
                                  attrs: { src: _ },
                                  on: {
                                    click: function (a) {
                                      return e.handleDelete(s.item);
                                    },
                                  },
                                }),
                              ]
                            ),
                          ]),
                          i("div", { staticClass: "bg" }),
                          i("div", { staticClass: "text" }, [
                            e._v(
                              " " +
                                e._s(
                                  s.item.isNoData
                                    ? "暂无内部船舶"
                                    : `MMSI：${s.item.mmsi}`
                                ) +
                                " "
                            ),
                          ]),
                        ]
                      ),
                    ];
                  },
                },
              ]),
            }),
          ],
          1
        ),
        i(
          "a-modal",
          {
            attrs: {
              visible: e.deleteModelVisible,
              "confirm-loading": e.confirmDeleteLoading,
              closable: !1,
              "mask-closable": !1,
              "ok-text": "删除",
            },
            on: { ok: e.handleDeleteOk, cancel: e.handleDeleteCancel },
          },
          [
            i("div", { staticClass: "model-content" }, [
              i("img", {
                staticClass: "model-content-icon",
                attrs: { src: S, alt: "" },
              }),
              i("p", [e._v("确定将该船舶从内部船队删除吗?")]),
            ]),
          ]
        ),
        i("OperateInnerShipDialog", {
          attrs: {
            mode: "edit",
            visible: e.editModelVisible,
            "ship-info": e.selectedShipData,
          },
          on: {
            "update:visible": function (s) {
              e.editModelVisible = s;
            },
          },
        }),
      ],
      1
    );
  },
  N = [],
  C = c(y, I, N, !1, null, "d0262685");
const L = C.exports;
export { L as default };
