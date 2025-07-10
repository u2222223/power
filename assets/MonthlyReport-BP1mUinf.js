import { n as o, co as n } from "./index-FdyGBlLz.js";
import { c } from "./common-Da9OqttM.js";
import "./store-BeJ4ml9q.js";
import "./mqtt-P3cO-H_W.js";
import "./common-0X47MWYd.js";
import "./mqttConfig-DcruBXJ7.js";
const d = "" + new URL("icon_pdf-BUEn1Suy.png", import.meta.url).href,
  p = {
    name: "MonthlyReport",
    components: {},
    data() {
      return {
        columns: [
          {
            label: "缩略图",
            key: "fileIcon",
            style: { width: "8%", paddingLeft: "2%" },
            slot: "fileIcon",
          },
          {
            label: "名称",
            key: "docName",
            type: "popup",
            style: { width: "30%" },
            primary: !0,
          },
          {
            label: "大小",
            key: "fileSizeFormat",
            style: { width: "10%", paddingLeft: "1%" },
          },
          {
            label: "创建人",
            key: "createBy",
            style: { width: "10%", paddingLeft: "1%" },
          },
          { label: "创建时间", key: "createTime", style: { width: "22%" } },
          { label: "更新人", key: "updateBy", style: { width: "18%" } },
          { label: "更新时间", key: "updateTime", style: { width: "22%" } },
          {
            label: "操作",
            key: "status",
            customTitleClass: "customTitleClass",
            style: {
              width: "28%",
              paddingLeft: "0%!important",
              justifyContent: "center",
            },
            slot: "action",
          },
        ],
        reportList: [],
        currentReport: {},
        prevUrl: "",
        showModal: !1,
        showPDFDetail: !1,
        selectedRowKeys: [],
      };
    },
    mixins: [c],
    watch: {
      currentReport: {
        handler(i, t) {
          i.entityDocId !== t.entityDocId && this.showDetail();
        },
        deep: !0,
      },
    },
    mounted() {},
    methods: {
      init() {
        this.getDocList(this.entityInfo.entityId);
      },
      getDocList(i) {
        n({ entityId: i }).then((t) => {
          if (t.success) {
            const e = (s, l, r) => s.slice(0, l) + r + s.slice(l);
            this.reportList = t.result
              .filter(
                (s) =>
                  s.docType && new RegExp(/^[\s\S]*\.(pdf)$/).test(s.docUrl)
              )
              .sort((s, l) => {
                try {
                  let r = s.docName.slice(0, 7).replace(/[^\d]/g, ""),
                    a = l.docName.slice(0, 7).replace(/[^\d]/g, "");
                  return (
                    r.length === 5 && (r = e(r, 4, "0")),
                    a.length === 5 && (a = e(a, 4, "0")),
                    Number(a) < Number(r) ? -1 : 1
                  );
                } catch {
                  return 0;
                }
              })
              .map(
                (s) => ((s.fileSizeFormat = this.getFileSize(s.fileSize)), s)
              );
          }
        });
      },
      getFileUrl(i, t = !1) {
        let e = "/power/admin/sys/file/download",
          s = i.entityDocId
            ? `entityDocId=${i.entityDocId}`
            : `docId=${i.docId}`;
        return `${e}?${s}&encode=GEDI&preView=${t}&token=${localStorage.getItem(
          "token"
        )}`;
      },
      previewPDF(i) {
        (this.currentReport = i.row), (this.showModal = !0);
      },
      closeDialog() {
        this.showModal = !1;
      },
      showDetail() {
        this.prevUrl = `/commonJs/modules/pdf/web/viewer.html?file=${encodeURIComponent(
          this.getFileUrl(this.currentReport)
        )}`;
      },
      rowOnClick(i, t) {
        (this.currentReport = i),
          (this.showModal = !0),
          (this.selectedRowKeys = [t]);
      },
      cellOnClick() {},
      closePDFDetail() {
        this.showPDFDetail = !1;
      },
      getFileSize(i) {
        var t = "";
        i < 0.1 * 1024
          ? (t = i.toFixed(2) + "B")
          : i < 0.1 * 1024 * 1024
          ? (t = (i / 1024).toFixed(2) + "KB")
          : i < 0.1 * 1024 * 1024 * 1024
          ? (t = (i / (1024 * 1024)).toFixed(2) + "MB")
          : (t = (i / (1024 * 1024 * 1024)).toFixed(2) + "GB");
        var e = t + "",
          s = e.indexOf("."),
          l = e.substr(s + 1, 2);
        return l === "00" ? e.substring(0, s) + e.substr(s + 3, 2) : t;
      },
    },
  };
var u = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      { staticClass: "monthlyReport" },
      [
        e("SeaProTable", {
          style: { width: "98%", height: "66vh" },
          attrs: {
            columns: t.columns,
            data: t.reportList,
            hasHead: !1,
            selectedRowKeys: t.selectedRowKeys,
            size: "large",
          },
          on: { cellOnClick: t.cellOnClick, rowOnClick: t.rowOnClick },
          scopedSlots: t._u([
            {
              key: "form",
              fn: function ({ form: s }) {
                return [
                  e(
                    "div",
                    [
                      e(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: s.isFull,
                              expression: "props.isFull",
                            },
                          ],
                        },
                        [t._v("条件A:")]
                      ),
                      e("SeaDatePicker", {
                        staticStyle: { display: "inline-block" },
                        attrs: { type: "range" },
                      }),
                    ],
                    1
                  ),
                  e(
                    "div",
                    [
                      e(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: s.isFull,
                              expression: "props.isFull",
                            },
                          ],
                        },
                        [t._v("条件B:")]
                      ),
                      e("SeaSelect"),
                    ],
                    1
                  ),
                  e(
                    "div",
                    [
                      e(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: s.isFull,
                              expression: "props.isFull",
                            },
                          ],
                        },
                        [t._v("条件C:")]
                      ),
                      e("SeaDatePicker", {
                        staticStyle: { display: "inline-block" },
                        attrs: { type: "range" },
                      }),
                    ],
                    1
                  ),
                  e(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: s.isFull,
                          expression: "props.isFull",
                        },
                      ],
                    },
                    [
                      e("span", [t._v("条件D:")]),
                      e("SeaDatePicker", {
                        staticStyle: { display: "inline-block" },
                        attrs: { type: "range" },
                      }),
                    ],
                    1
                  ),
                  e(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: s.isFull,
                          expression: "props.isFull",
                        },
                      ],
                    },
                    [
                      e("span", [t._v("条件E:")]),
                      e("SeaDatePicker", {
                        staticStyle: { display: "inline-block" },
                        attrs: { type: "range" },
                      }),
                    ],
                    1
                  ),
                  e(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: s.isFull,
                          expression: "props.isFull",
                        },
                      ],
                    },
                    [
                      e("span", [t._v("条件F:")]),
                      e("SeaDatePicker", {
                        staticStyle: { display: "inline-block" },
                        attrs: { type: "range" },
                      }),
                    ],
                    1
                  ),
                ];
              },
            },
            {
              key: "action",
              fn: function (s) {
                return [
                  e(
                    "div",
                    {
                      staticClass: "action",
                      on: {
                        click: function (l) {
                          l.stopPropagation();
                        },
                      },
                    },
                    [
                      e("div", { staticClass: "action_btn" }, [
                        e(
                          "span",
                          {
                            on: {
                              click: function (l) {
                                return t.previewPDF(s);
                              },
                            },
                          },
                          [t._v("预览")]
                        ),
                      ]),
                      e("div", { staticClass: "action_btn" }, [
                        e(
                          "a",
                          {
                            attrs: {
                              href: t.getFileUrl(t.currentReport),
                              target: "downloadFile",
                              disabled: "",
                            },
                          },
                          [t._v("下载")]
                        ),
                      ]),
                    ]
                  ),
                ];
              },
            },
            {
              key: "fileIcon",
              fn: function (s) {
                return [
                  e("div", { staticClass: "fileIcon" }, [
                    e("img", {
                      staticClass: "icon_pdf",
                      attrs: { src: d },
                      on: {
                        click: function (l) {
                          return t.previewPDF(s);
                        },
                      },
                    }),
                  ]),
                ];
              },
            },
          ]),
        }),
        e(
          "a-modal",
          {
            attrs: {
              title: "正在预览：" + t.currentReport.docName,
              destroyOnClose: "",
              footer: null,
              visible: t.showModal,
              width: "84%",
              bodyStyle: { padding: 0 },
              dialogStyle: { top: "20px" },
            },
            on: { cancel: t.closeDialog },
          },
          [
            e("div", { staticClass: "preImg" }, [
              e("iframe", {
                staticClass: "prevUrl",
                attrs: {
                  id: "pdf",
                  src: t.prevUrl,
                  frameborder: "",
                  title: "",
                },
              }),
            ]),
          ]
        ),
      ],
      1
    );
  },
  m = [],
  h = o(p, u, m, !1, null, "c785bd74");
const k = h.exports;
export { k as default };
