const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./buildTable-BkNEEgmZ.js",
      "./index-FdyGBlLz.js",
      "./index-BnngHmlw.css",
      "./buildTable-fHdyDQVo.css",
      "./tabs-CBGXczMl.js",
      "./tabs-BDZ_RxSz.css",
      "./peoples-fZqXB9kE.js",
      "./peoples-DYDZVzXO.css",
    ])
) => i.map((i) => d[i]);
import { n as r, _ as l, cQ as n, cI as d, cR as h } from "./index-FdyGBlLz.js";
import { d as c } from "./common-0X47MWYd.js";
import { s as p } from "./search-HGKQ_zQW.js";
const m = {
  components: {
    BuildTable: () =>
      l(
        () => import("./buildTable-BkNEEgmZ.js"),
        __vite__mapDeps([0, 1, 2, 3]),
        import.meta.url
      ),
    Tabs: () =>
      l(
        () => import("./tabs-CBGXczMl.js"),
        __vite__mapDeps([4, 1, 2, 5]),
        import.meta.url
      ),
    Peoples: () =>
      l(
        () => import("./peoples-fZqXB9kE.js"),
        __vite__mapDeps([6, 1, 2, 7]),
        import.meta.url
      ),
  },
  props: {
    showTab: { type: Boolean, default: !0 },
    projects: { type: Array, default: () => [] },
  },
  watch: {
    projects: {
      deep: !0,
      handler() {
        this.active = 0;
      },
    },
  },
  data() {
    return {
      needDian: ["projectName"],
      checked: !1,
      time: [],
      form: { projectName: null, shipName: null },
      pages: { pageNo: "1", pageSize: "10" },
      data: [],
      loading: !1,
      total: 0,
      columns: [
        {
          title: this.$t("build.project_name"),
          dataIndex: "projectName",
          key: "projectName",
        },
        {
          title: this.$t("build.ship_name"),
          dataIndex: "name",
          width: "200px",
          key: "name",
        },
        {
          title: this.$t("build.numeber_of_people_on_board"),
          dataIndex: "curBoardCount",
          width: "100px",
          key: "curBoardCount",
        },
        {
          title: this.$t("build.ship_MMSI"),
          dataIndex: "mmsi",
          width: "120px",
          key: "mmsi",
        },
        {
          title: this.$t("build.ship_length") + "（m）",
          dataIndex: "lengthValue",
          width: "120px",
          key: "lengthValue",
        },
        {
          title: this.$t("build.breadth") + "（m）",
          width: "120px",
          dataIndex: "widthValue",
          key: "widthValue",
        },
        {
          title: this.$t("build.draft") + "（m）",
          width: "130px",
          dataIndex: "draughtValue",
          key: "draughtValue",
        },
        {
          title: this.$t("build.operate"),
          key: "action",
          width: "180px",
          scopedSlots: { customRender: "action" },
        },
      ],
      visible: !1,
      active: 0,
      tabArr: [
        { label: this.$t("build.ship"), value: 0 },
        { label: this.$t("build.person"), value: 1 },
      ],
      table1Cols: [
        {
          type: "td",
          key: "projectName",
          label: this.$t("build.projectName"),
          style: { width: "20%", marginLeft: "2%" },
        },
        {
          type: "tds",
          style: { width: "75%", marginLeft: "3%" },
          children: [
            {
              key: "key2",
              label: this.$t("build.active_and_present"),
              slot: "peopleSize",
              style: { width: "30%" },
            },
            {
              key: "onBoardCount",
              label: this.$t("build.onBoard"),
              style: { width: "20%" },
            },
            {
              key: "todayOnBoardCount",
              label: this.$t("build.boarding_today"),
              style: { width: "25%" },
            },
            {
              key: "todayOutBoardCount",
              label: this.$t("build.disembarking_today"),
              style: { width: "25%" },
            },
          ],
        },
      ],
      table1EnCols: [
        {
          type: "td",
          key: "projectName",
          label: this.$t("build.projectName"),
          style: { width: "18%", marginLeft: "2%" },
        },
        {
          type: "tds",
          style: { width: "78%", marginLeft: "3%" },
          children: [
            {
              key: "key2",
              label: this.$t("build.active_and_present"),
              slot: "peopleSize",
              style: { width: "24%" },
            },
            {
              key: "onBoardCount",
              label: this.$t("build.onBoard"),
              style: { width: "15%" },
            },
            {
              key: "todayOnBoardCount",
              label: this.$t("build.boarding_today"),
              style: { width: "25%" },
            },
            {
              key: "todayOutBoardCount",
              label: this.$t("build.disembarking_today"),
              style: { width: "36%" },
            },
          ],
        },
      ],
      table1: [
        {
          key1: "粤电阳江",
          key2: "576/106",
          key3: "509",
          key4: "47",
          key5: "11",
          people: 37,
          id: 1,
        },
        {
          key1: "粤电阳江",
          key2: "576/106",
          key3: "509",
          key4: "47",
          key5: "11",
          people: 7,
          id: 1,
        },
        {
          key1: "粤电阳江",
          key2: "576/106",
          key3: "509",
          key4: "47",
          key5: "11",
          people: 3,
          id: 1,
        },
        {
          key1: "粤电阳江阳江阳江阳江阳江",
          key2: "15~23℃",
          key3: "509",
          key4: "47",
          key5: "11",
          people: 4,
          id: 1,
        },
      ],
      table2Cols: [
        {
          type: "td",
          key: "index",
          label: this.$t("build.order"),
          style: { width: "12%", "text-align": "center" },
        },
        {
          type: "tds",
          style: { width: "83%", marginLeft: "3%" },
          children: [
            {
              key: "shipName",
              label: this.$t("build.ship"),
              style: { width: "37%" },
            },
            {
              key: "curBoardCount",
              label: this.$t("build.number_of_people_on_board"),
              slot: "people",
              style: { width: "62%" },
            },
          ],
        },
      ],
      searchImg: p,
    };
  },
  computed: {
    lang() {
      return `lang_${this.$root.$i18n.locale}`;
    },
    pagination() {
      return {
        total: this.total,
        showTotal: (a) => this.$t("build.total", [a]),
        current: this.pages.pageNo,
      };
    },
    tableConfig() {
      let a = [];
      return (
        this.projects.forEach((e) => {
          e.curBoardCounts.forEach((t) => {
            a.push({ projectName: t.projectName, ...t });
          });
        }),
        [
          { list: a, cols: this.table2Cols },
          {
            list: this.projects.map((e) => ({
              projectName: e.projectName,
              ...e.projectPersonStaticsMap,
            })),
            cols:
              this.lang === "lang_en-GB" ? this.table1EnCols : this.table1Cols,
          },
        ]
      );
    },
  },
  methods: {
    onChange(a) {
      this.time = a;
    },
    disabledDate(a) {
      return a && a > new Date();
    },
    exportPath(a) {
      this.time && this.time.length
        ? n({
            pageNo: 1,
            pageSize: 3e3,
            mmsi: a.mmsi,
            startTime: this.time[0] + ":00",
            endTime: this.time[1] + ":00",
          }).then((e) => {
            c(e, a.name);
          })
        : this.$message.error("请选择时间");
    },
    async searchShipPath(a) {
      if (this.time && this.time.length) {
        let { result: e } = await d({
          pageNo: 1,
          pageSize: 3e3,
          mmsi: a.mmsi,
          startTime: this.time[0] + ":00",
          endTime: this.time[1] + ":00",
        });
        e && e.length
          ? ((this.visible = !1),
            this.$parent.map().findShip(a.mmsi),
            this.$parent.map().drawShipTrack(e || []))
          : this.$message.error("暂无轨迹数据");
      } else this.$message.error("请选择时间");
    },
    setActive(a) {
      this.active = a;
    },
    openDetail() {
      this.getList(!0), (this.visible = !0);
    },
    handleReset() {
      Object.keys(this.form).forEach((a) => {
        this.form[a] = "";
      }),
        this.getList(!0);
    },
    onShowSizeChange(a) {
      (this.pages.pageNo = a.current),
        (this.pages.pageSize = a.pageSize),
        this.getList(!1);
    },
    getList(a) {
      a && ((this.pages.pageNo = 1), (this.pages.pageSize = 10)),
        (this.loading = !0);
      let e = JSON.parse(JSON.stringify(this.form));
      Object.keys(e).forEach((t) => {
        e[t] || (e[t] = null);
      }),
        h({
          ...this.pages,
          code: this.projects.length > 1 ? null : this.projects[0].code,
          needAis: !0,
          ...e,
        }).then((t) => {
          (this.loading = !1),
            (this.data = t.result.records.map(
              (i) => ((i.name = i.cnname || i.name), i)
            )),
            (this.total = t.result.total);
        });
    },
  },
};
var u = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "rightBottom" },
      [
        e.showTab
          ? t(
              "div",
              {
                staticClass: "rightBottomTab",
                staticStyle: { "margin-bottom": "10px" },
              },
              [
                t("Tabs", {
                  attrs: { tabArr: e.tabArr, active: e.active },
                  on: { selected: (i) => e.setActive(i) },
                }),
              ],
              1
            )
          : e._e(),
        t("BuildTable", {
          class: {
            rightBottomBuildTable: e.showTab,
            rightBottomBuildTableDetail: !e.showTab,
          },
          attrs: {
            list: e.tableConfig[e.active].list,
            cols: e.tableConfig[e.active].cols,
            needDian: e.needDian,
          },
          scopedSlots: e._u(
            [
              {
                key: "people",
                fn: function (i) {
                  return [
                    t("Peoples", { attrs: { needPeopleNum: i.curBoardCount } }),
                  ];
                },
              },
              {
                key: "peopleSize",
                fn: function (i) {
                  return [
                    e._v(
                      " " + e._s(i.activeTotal) + "/" + e._s(i.present) + " "
                    ),
                  ];
                },
              },
              e.active === 0
                ? {
                    key: "rightIcon",
                    fn: function () {
                      return [
                        t("img", {
                          directives: [
                            {
                              name: "auth",
                              rawName: "v-auth",
                              value: ["/build/cbtj"],
                              expression: "['/build/cbtj']",
                            },
                          ],
                          staticStyle: { width: "18px" },
                          attrs: { src: e.searchImg },
                          on: { click: e.openDetail },
                        }),
                      ];
                    },
                    proxy: !0,
                  }
                : null,
            ],
            null,
            !0
          ),
        }),
        t(
          "a-modal",
          {
            staticClass: "cbModal",
            attrs: {
              footer: null,
              title: e.$t("build.shipList"),
              cancelText: "",
              dialogClass: "darkModal",
            },
            model: {
              value: e.visible,
              callback: function (i) {
                e.visible = i;
              },
              expression: "visible",
            },
          },
          [
            t(
              "a-form",
              {
                ref: "form",
                staticClass: "myForm",
                attrs: { layout: "inline", form: e.form },
              },
              [
                t(
                  "div",
                  [
                    t(
                      "a-form-item",
                      { attrs: { label: e.$t("build.project_name") } },
                      [
                        t("a-input", {
                          attrs: {
                            placeholder: e.$t("placeholder.entry", [
                              e.$t("build.project_name"),
                            ]),
                          },
                          model: {
                            value: e.form.projectName,
                            callback: function (i) {
                              e.$set(e.form, "projectName", i);
                            },
                            expression: "form.projectName",
                          },
                        }),
                      ],
                      1
                    ),
                    t(
                      "a-form-item",
                      { attrs: { label: e.$t("build.ship_name") } },
                      [
                        t("a-input", {
                          attrs: {
                            placeholder: e.$t("placeholder.entry", [
                              e.$t("build.ship_name"),
                            ]),
                          },
                          model: {
                            value: e.form.shipName,
                            callback: function (i) {
                              e.$set(e.form, "shipName", i);
                            },
                            expression: "form.shipName",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                t(
                  "div",
                  { staticClass: "centerBox" },
                  [
                    t(
                      "a-checkbox",
                      {
                        model: {
                          value: e.checked,
                          callback: function (i) {
                            e.checked = i;
                          },
                          expression: "checked",
                        },
                      },
                      [
                        e._v(
                          " " + e._s(e.$t("build.query_ship_trajectory")) + " "
                        ),
                      ]
                    ),
                    t(
                      "a-form-item",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: e.checked,
                            expression: "checked",
                          },
                        ],
                        attrs: { label: "轨迹时间" },
                      },
                      [
                        t("SeaDatePicker", {
                          attrs: {
                            value: e.time,
                            inputReadOnly: "",
                            showTime: { minuteStep: 15, secondStep: 60 },
                            "disabled-date": e.disabledDate,
                            format: "YYYY-MM-DD HH:mm",
                            type: "range",
                            valueFormat: "YYYY-MM-DD HH:mm",
                          },
                          on: { change: e.onChange },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ]
            ),
            t(
              "div",
              { staticStyle: { margin: "14px 0", "text-align": "right" } },
              [
                t(
                  "a-button",
                  {
                    attrs: { type: "primary" },
                    on: {
                      click: function (i) {
                        return e.getList(!0);
                      },
                    },
                  },
                  [e._v(" " + e._s(e.$t("build.query")) + " ")]
                ),
                t(
                  "a-button",
                  {
                    style: { marginLeft: "8px" },
                    on: { click: e.handleReset },
                  },
                  [e._v(" " + e._s(e.$t("build.reset")) + " ")]
                ),
              ],
              1
            ),
            t("a-table", {
              attrs: {
                columns: e.columns,
                "data-source": e.data,
                scroll: { y: "50vh" },
                loading: e.loading,
                rowKey: "id",
                pagination: e.pagination,
              },
              on: { change: e.onShowSizeChange },
              scopedSlots: e._u([
                {
                  key: "action",
                  fn: function (i, s) {
                    return t(
                      "div",
                      {},
                      [
                        t(
                          "a-button",
                          {
                            staticStyle: {
                              padding: "0",
                              "padding-right": "16px",
                            },
                            attrs: {
                              disabled: e.checked === !1 || !e.time.length,
                              title:
                                (e.checked === !1 || !e.time.length) &&
                                "请勾选查询船舶轨迹并选择日期",
                              type: "link",
                            },
                            on: {
                              click: function (o) {
                                return e.searchShipPath(s);
                              },
                            },
                          },
                          [
                            e._v(
                              " " +
                                e._s(e.$t("build.viewing_trajectories")) +
                                " "
                            ),
                          ]
                        ),
                        t(
                          "a-button",
                          {
                            staticStyle: { padding: "0" },
                            attrs: {
                              disabled: e.checked === !1 || !e.time.length,
                              title:
                                (e.checked === !1 || !e.time.length) &&
                                "请勾选查询船舶轨迹并选择日期",
                              type: "link",
                            },
                            on: {
                              click: function (o) {
                                return e.exportPath(s);
                              },
                            },
                          },
                          [
                            e._v(
                              " " +
                                e._s(e.$t("build.export_trajectories")) +
                                " "
                            ),
                          ]
                        ),
                      ],
                      1
                    );
                  },
                },
              ]),
            }),
          ],
          1
        ),
      ],
      1
    );
  },
  b = [],
  y = r(m, u, b, !1, null, "a4b88451");
const k = y.exports;
export { k as default };
