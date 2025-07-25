import {
  n as l,
  m as g,
  D as u,
  x as w,
  g as m,
  aG as y,
  aD as C,
  aH as v,
  aI as _,
} from "./index-FdyGBlLz.js";
import {
  b as S,
  _ as I,
  s as b,
  c as k,
  d as L,
  e as A,
  f as x,
  C as R,
  a as B,
} from "./ChatList-BPiMFRqF.js";
import { W as T } from "./WindPower-9CYMWPlh.js";
import "./common-0X47MWYd.js";
import "./go1-FKcY8q87.js";
import "./close-DKk2BBKI.js";
const E = {
  name: "SideBar",
  components: {},
  props: {
    qa: { type: Map, required: !0 },
    sessionId: { type: [String, null], required: !0 },
    parentId: { type: [String, null], required: !0 },
    chatGroup: { type: Map, required: !0 },
  },
  data() {
    return { active: "" };
  },
  watch: { chatGroup: { immediate: !0, handler(s) {} } },
  methods: {
    newChat() {
      (this.active = ""),
        this.$emit("update:sessionId", ""),
        this.$emit("update:parentId", ""),
        this.$emit("update:qa", new Map()),
        this.$emit("newChat");
    },
    async switchSession(s) {
      (this.active = s.chatSessionId),
        this.$emit("update:sessionId", ""),
        this.$emit("update:parentId", s.chatSessionId),
        this.$emit("update:qa", new Map()),
        this.$emit("switchSession");
      const t = await S({
        chatSessionId: s.chatSessionId,
        pageNo: 1,
        pageSize: 1e4,
      });
      console.log("res: ", t);
      const e = new Map();
      t.data.sort((a, i) => a.id - i.id),
        t.data.forEach((a) => {
          let i = a.files.map((n, r) => {
            var c;
            return {
              ...n,
              name: n.filename,
              ...a.referenceFiles[r],
              fileId:
                ((c = a.referenceFiles[r]) == null ? void 0 : c.uploadFileId) ||
                null,
              status: "finished",
            };
          });
          e.set(a.chatSessionId, {
            ...a,
            status: "finished",
            history: !0,
            fileList: i,
            knowledgeRetrieval: a.knowledgeRetrievals,
          });
        }),
        console.log("qaListMap: ", e),
        this.$emit("update:qa", e);
    },
  },
};
var O = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      { staticClass: "side-bar" },
      [
        t._m(0),
        e(
          "a-button",
          {
            staticClass: "new-chat",
            attrs: { icon: "plus" },
            on: { click: t.newChat },
          },
          [t._v(" 新建对话 ")]
        ),
      ],
      1
    );
  },
  U = [
    function () {
      var s = this,
        t = s._self._c;
      return t("div", { staticClass: "title" }, [
        t("img", { attrs: { src: I, alt: "" } }),
        t("span", [s._v("海上风电AI助手")]),
      ]);
    },
  ],
  q = l(E, O, U, !1, null, "6f86efcb");
const H = q.exports,
  N = {
    mixins: [b],
    data() {
      return { fileList: [], tempSessionId: null, isInputFocused: !1 };
    },
    watch: {
      recording(s) {
        s &&
          this.$nextTick(() => {
            var t;
            (t = this.$refs.textarea) == null || t.focus();
          });
      },
    },
    created() {
      this.initSoundToText();
    },
    methods: {
      handleFocus() {
        this.isInputFocused = !0;
      },
      handleBlur() {
        this.isInputFocused = !1;
      },
      handleToggle() {
        this.toggleRecording(this.recogonition);
      },
      sendMessage() {
        this.recording && this.toggleRecording(),
          this.recogonition &&
            (this.$emit(
              "send",
              this.recogonition,
              this.fileList,
              this.tempSessionId
            ),
            (this.recogonition = ""),
            (this.fileList = []),
            (this.tempSessionId = null));
      },
    },
  };
var M = function () {
    var t = this,
      e = t._self._c;
    return e("div", { staticClass: "welcome-block" }, [
      e("div", { staticClass: "block-content" }, [
        e("h1", { staticClass: "my-0 text-center text-8 leading-11" }, [
          t._v("Hi，我是海上风电AI平台，很高兴遇见您！"),
        ]),
        e(
          "div",
          { staticClass: "text-[16px] text-center leading-6 mt-10px mb-10px" },
          [
            t._v(
              "我是海上风电小助手“阿广”，为了向您提供高质量的问答服务，请简述您想了解的内容"
            ),
          ]
        ),
        e(
          "div",
          { staticClass: "send-wrap" },
          [
            e("a-textarea", {
              ref: "textarea",
              staticClass: "send-btn",
              attrs: { placeholder: "请输入" },
              on: {
                keydown: function (a) {
                  return !a.type.indexOf("key") &&
                    t._k(a.keyCode, "enter", 13, a.key, "Enter")
                    ? null
                    : t.sendMessage.apply(null, arguments);
                },
                focus: t.handleFocus,
                blur: t.handleBlur,
              },
              model: {
                value: t.recogonition,
                callback: function (a) {
                  t.recogonition = a;
                },
                expression: "recogonition",
              },
            }),
            e(
              "div",
              { staticClass: "voice-icon", on: { click: t.handleToggle } },
              [
                t.recording
                  ? e("img", {
                      staticClass: "stop",
                      attrs: { src: k, alt: "" },
                    })
                  : e("img", { attrs: { src: L, alt: "" } }),
              ]
            ),
            e(
              "div",
              { staticClass: "send-icon", on: { click: t.sendMessage } },
              [
                t.isInputFocused
                  ? e("img", { attrs: { src: A, alt: "" } })
                  : e("img", { attrs: { src: x, alt: "" } }),
              ]
            ),
          ],
          1
        ),
      ]),
    ]);
  },
  $ = [],
  P = l(N, M, $, !1, null, "f9be62ef");
const D = P.exports,
  W = {
    name: "ChatPage",
    components: { SideBar: H, WelcomeBlock: D, ChatList: R },
    data() {
      return {
        qaMap: new Map(),
        sessionList: [],
        currentSessionId: "",
        parentChatSessionId: "",
        chatGroup: new Map(),
        modelRecord: {
          value: "",
          title: "海上风电规范库（通用）",
          index: 1,
          isLocal: "Y",
          isUploadAble: "N",
          isInternetAble: "N",
          isMediaAble: "N",
          params: null,
        },
        searchInternet: !0,
        currentController: null,
        sidebarVisible: !0,
      };
    },
    computed: { ...g("app", ["showChatDialog"]) },
    watch: {
      showChatDialog(s) {
        var t, e;
        s ||
          (!this.qaMap.size && !this.parentChatSessionId
            ? (t = this.$refs.blockComponent) == null || t.initSpeechHelper()
            : (e = this.$refs.listComponent) == null || e.initSpeechHelper());
      },
    },
    created() {
      localStorage.setItem("appCode", "AI-THIRD-APP-OWE"),
        sessionStorage.removeItem("chatId"),
        this.getChatList(),
        this.getModelRecord();
    },
    beforeDestroy() {
      sessionStorage.removeItem("chatId");
    },
    methods: {
      scrollToBottom() {
        this.$nextTick(() => {
          var s;
          (s = this.$refs.listComponent) == null || s.scrollToBottom();
        });
      },
      getCurrentFormattedTime(s = 0) {
        const t = new Date();
        t.setDate(t.getDate() - s);
        const e = t.getFullYear(),
          a = String(t.getMonth() + 1).padStart(2, "0"),
          i = String(t.getDate()).padStart(2, "0"),
          n = String(t.getHours()).padStart(2, "0"),
          r = String(t.getMinutes()).padStart(2, "0"),
          c = String(t.getSeconds()).padStart(2, "0");
        return `${e}-${a}-${i} ${n}:${r}:${c}`;
      },
      createNewChat() {
        var s;
        (s = this.currentController) == null || s.abort(),
          (this.currentSessionId = ""),
          (this.qaMap = new Map()),
          sessionStorage.removeItem("chatId");
      },
      async getChatList() {},
      selectChat(s) {
        console.log("Selected chat:", s);
      },
      async getModelRecord() {},
      sendQuestion(s, t, e) {
        console.log("sendQuestion", s, t, e);
        const { sessionId: a, controller: i } = B(
          s,
          this.modelRecord.value,
          this.searchInternet,
          this.qaMap,
          t,
          this.parentChatSessionId,
          e,
          (n) => {
            this.currentController = i;
            const r = this.qaMap.get(n.sessionId);
            if (!r) {
              this.parentChatSessionId = "";
              return;
            }
            if ((r && r.status === "stoped") || !r) return;
            n.type === "error" && console.log("error", n), r.answers.push(n);
            const c = new Map(this.qaMap);
            c.set(n.sessionId, r),
              (this.qaMap = c),
              n.references && (r.references = n.references),
              n.knowledgeRetrieval &&
                (r.knowledgeRetrieval = n.knowledgeRetrieval),
              n.type === "finished" &&
                ((this.currentSessionId = ""),
                (r.collapseState = null),
                (r.status = "finished")),
              this.scrollToBottom();
          }
        );
        (this.currentSessionId = a),
          this.parentChatSessionId ||
            ((this.parentChatSessionId = a), this.getChatList()),
          this.qaMap.has(a) ||
            this.qaMap.set(a, {
              prompt: s,
              answers: [],
              collapseState: "1",
              fileList: t.map((n) => {
                var r;
                return {
                  name: n.name,
                  file: { size: ((r = n.file) == null ? void 0 : r.size) || 0 },
                  fileId: n.fileId,
                  url: n.url,
                  type: n.type,
                  status: n.status,
                };
              }),
              chatSessionId: a,
              knowledgeRetrieval: [],
            }),
          this.scrollToBottom();
      },
      stopAnswering() {
        console.log("stopAnswering");
      },
    },
  };
var X = function () {
    var t = this,
      e = t._self._c;
    return e("div", { staticClass: "chat-wrap flex" }, [
      e("div", { staticClass: "top-mark" }),
      e(
        "div",
        { staticClass: "chat-container flex-1 flex h-full" },
        [
          e("SideBar", {
            staticClass: "flex-shrink-0",
            attrs: {
              qa: t.qaMap,
              sessionId: t.currentSessionId,
              parentId: t.parentChatSessionId,
              "chat-group": t.chatGroup,
            },
            on: {
              "update:qa": function (a) {
                t.qaMap = a;
              },
              "update:sessionId": function (a) {
                t.currentSessionId = a;
              },
              "update:session-id": function (a) {
                t.currentSessionId = a;
              },
              "update:parentId": function (a) {
                t.parentChatSessionId = a;
              },
              "update:parent-id": function (a) {
                t.parentChatSessionId = a;
              },
              switchSession: t.scrollToBottom,
              newChat: t.createNewChat,
            },
          }),
          !t.qaMap.size && !t.parentChatSessionId
            ? e("WelcomeBlock", {
                ref: "blockComponent",
                on: { send: t.sendQuestion },
              })
            : e("ChatList", {
                ref: "listComponent",
                attrs: {
                  "message-map": t.qaMap,
                  currentSessionId: t.currentSessionId,
                },
                on: {
                  "update:currentSessionId": function (a) {
                    t.currentSessionId = a;
                  },
                  "update:current-session-id": function (a) {
                    t.currentSessionId = a;
                  },
                  send: t.sendQuestion,
                  stop: t.stopAnswering,
                },
              }),
        ],
        1
      ),
    ]);
  },
  j = [],
  z = l(W, X, j, !1, null, "36cde6cc");
const F = z.exports,
  J = "" + new URL("earth3-DCt5gVCY.png", import.meta.url).href,
  Y = "" + new URL("earth2-D2Liqu0k.png", import.meta.url).href,
  V = "" + new URL("earth4-Bo-afCpN.png", import.meta.url).href,
  Z = "" + new URL("earth5-CZZ1mnld.png", import.meta.url).href,
  K = "" + new URL("earth6-AT5hyZmf.png", import.meta.url).href,
  G = "" + new URL("earth7-D0v_QPMR.png", import.meta.url).href,
  Q = {
    props: ["nowCenterItem"],
    data() {
      return {
        nowX: 0,
        toNum: 400,
        time: 800,
        nowShowItem: "",
        timeId1: null,
        timeId2: null,
      };
    },
    computed: {
      toLeft() {
        return this.$parent.toLeft;
      },
    },
    watch: {
      nowCenterItem: {
        handler(s) {
          this.timeId1 && clearTimeout(this.timeId1),
            (this.timeId1 = setTimeout(() => {
              this.nowShowItem = s;
            }, this.time / 2));
        },
        immediate: !0,
      },
    },
    methods: {
      getName(s) {
        return s ? s.replace(/<.*?>/gi, "") : "";
      },
      change() {
        let s = this.$refs.earth1,
          t = this.$refs.bigTitle,
          e = this.$refs.echartIcon,
          a,
          i,
          n;
        this.toLeft
          ? ((i = [
              { left: "50%", opacity: 1 },
              { left: "100%", opacity: 0.1 },
            ]),
            (n = [
              { left: "-50%", opacity: 0.1 },
              { left: "50%", opacity: 1 },
            ]))
          : ((i = [
              { left: "50%", opacity: 1 },
              { left: "-50%", opacity: 0.1 },
            ]),
            (n = [
              { left: "100%", opacity: 0.1 },
              { left: "50%", opacity: 1 },
            ])),
          t.animate(i, {
            duration: this.time / 2,
            iterations: 1,
            fill: "forwards",
            easing: "linear",
          }),
          e.animate(i, {
            duration: this.time / 2,
            iterations: 1,
            fill: "forwards",
            easing: "linear",
          }),
          this.timeId2 && clearTimeout(this.timeId2),
          (this.timeId2 = setTimeout(() => {
            t.animate(n, {
              duration: this.time / 2,
              iterations: 1,
              fill: "forwards",
              easing: "linear",
            }),
              e.animate(n, {
                duration: this.time / 2,
                iterations: 1,
                fill: "forwards",
                easing: "linear",
              });
          }, this.time / 2)),
          (a = [
            { backgroundPositionX: `${this.nowX}px` },
            {
              backgroundPositionX: this.toLeft
                ? `${this.nowX + this.toNum}px`
                : `${this.nowX - this.toNum}px`,
            },
          ]),
          s.animate(a, {
            duration: this.time,
            iterations: 1,
            fill: "forwards",
            easing: "linear",
          }),
          this.toLeft
            ? (this.nowX = this.nowX + this.toNum)
            : (this.nowX = this.nowX - this.toNum);
      },
      clickItem() {
        this.$emit("toApp");
      },
    },
  };
var tt = function () {
    var t = this,
      e = t._self._c;
    return e("div", { staticClass: "earthBox" }, [
      e("div", { staticClass: "videoBox", on: { click: t.clickItem } }, [
        e("div", {
          staticClass: "earthBgBottom",
          staticStyle: { "pointer-events": "none" },
        }),
        e("div", {
          ref: "earth1",
          staticClass: "earth1",
          staticStyle: { "pointer-events": "none" },
        }),
        t.nowShowItem.icon3d
          ? e("img", {
              ref: "echartIcon",
              staticClass: "echartIcon",
              staticStyle: { "pointer-events": "none" },
              attrs: { src: t.nowShowItem.icon3d },
            })
          : t._e(),
        e(
          "div",
          {
            ref: "bigTitle",
            staticClass: "bigTitle",
            staticStyle: { "pointer-events": "none" },
          },
          [
            e("div", [t._v(t._s(t.getName(t.nowShowItem.appname)))]),
            e("div", { staticClass: "bigTime" }, [
              t._v(
                " " +
                  t._s(t.$t("appStore.providerLabel")) +
                  ":  " +
                  t._s(t.nowShowItem && t.nowShowItem.provider) +
                  " "
              ),
            ]),
          ]
        ),
        e("img", {
          staticClass: "earthBg3",
          staticStyle: { "pointer-events": "none" },
          attrs: { src: J },
        }),
      ]),
      e("img", {
        staticClass: "earthBg2",
        staticStyle: { "pointer-events": "none" },
        attrs: { src: Y },
      }),
      /* e("img", {
        staticClass: "earthBg4",
        staticStyle: { "pointer-events": "none" },
        attrs: { src: V },
      }),
      e("img", {
        staticClass: "earthBg5",
        staticStyle: { "pointer-events": "none" },
        attrs: { src: Z },
      }),
      e("img", {
        staticClass: "earthBg6",
        staticStyle: { "pointer-events": "none" },
        attrs: { src: K },
      }),
      e("img", {
        staticClass: "earthBg7",
        staticStyle: { "pointer-events": "none" },
        attrs: { src: G },
      }), */
      /* e("div", {
        staticClass: "earthBg9",
        staticStyle: { "pointer-events": "none" },
      }), */
    ]);
  },
  et = [],
  st = l(Q, tt, et, !1, null, "534ee6b0");
const at = st.exports,
  nt = {};
var rt = function () {
    var t = this,
      e = t._self._c;
    return e("div", { staticClass: "bigBox" }, [
      e("div", { staticClass: "bigBoxOneView" }, [
        e("svg", { staticClass: "bigBoxOne" }, [
          e("circle", {
            attrs: {
              id: "bigBoxOneCircle",
              cx: "50%",
              cy: "50%",
              r: "45%",
              fill: "none",
              "stroke-width": "10",
              stroke: "#0075FF",
            },
          }),
        ]),
      ]),
      e("div", { staticClass: "bigBoxTwoView" }, [
        e("svg", { staticStyle: { height: "300px" } }, [
          e(
            "g",
            {
              staticStyle: {
                "transform-box": "fill-box",
                "transform-origin": "center",
              },
            },
            [
              e("animateTransform", {
                attrs: {
                  attributeName: "transform",
                  type: "rotate",
                  form: "0",
                  direction: "alternate",
                  to: "360",
                  dur: "2s",
                  repeatCount: "indefinite",
                },
              }),
              e("circle", {
                attrs: {
                  cx: "50%",
                  "stroke-dasharray": "10",
                  "stroke-dashoffset": "3000",
                  cy: "50%",
                  r: "45%",
                  fill: "none",
                  "stroke-width": "20",
                  stroke: "#0075FF",
                },
              }),
            ],
            1
          ),
        ]),
      ]),
      e("svg", { staticClass: "center" }, [
        e(
          "g",
          {
            staticStyle: {
              "transform-box": "fill-box",
              "transform-origin": "center",
            },
          },
          [
            e(
              "g",
              {
                staticStyle: {
                  "transform-box": "fill-box",
                  "transform-origin": "center",
                },
              },
              [
                e("animateTransform", {
                  attrs: {
                    attributeName: "transform",
                    type: "rotate",
                    form: "0",
                    to: "360",
                    dur: "4s",
                    direction: "alternate",
                    repeatCount: "indefinite",
                  },
                }),
                e(
                  "circle",
                  {
                    attrs: {
                      cx: "50%",
                      cy: "50%",
                      r: "18%",
                      fill: "none",
                      "stroke-width": "10",
                      stroke: "#0075FF",
                      "stroke-dasharray": "5",
                      "stroke-dashoffset": "3000",
                    },
                  },
                  [
                    e("animate", {
                      attrs: {
                        id: "toRight",
                        attributeName: "r",
                        from: "18%",
                        to: "0",
                        dur: "2s",
                        begin: "0;toLeft.end",
                        fill: "freeze",
                      },
                    }),
                    e("animate", {
                      attrs: {
                        id: "toLeft",
                        attributeName: "r",
                        from: "0",
                        to: "18%",
                        dur: "2s",
                        begin: "toRight.end + 1s",
                        fill: "freeze",
                      },
                    }),
                  ]
                ),
              ],
              1
            ),
          ]
        ),
      ]),
      e("svg", { staticClass: "center" }, [
        e(
          "circle",
          {
            attrs: {
              id: "round3",
              cx: "50%",
              cy: "50%",
              r: "10%",
              fill: "none",
              "stroke-width": "5",
              stroke: "#0075FF",
            },
          },
          [
            e("animate", {
              attrs: {
                id: "toRight",
                attributeName: "r",
                from: "10%",
                to: "0",
                dur: "2s",
                begin: "0;toLeft.end",
                fill: "freeze",
              },
            }),
            e("animate", {
              attrs: {
                id: "toLeft",
                attributeName: "r",
                from: "0",
                to: "10%",
                dur: "2s",
                begin: "toRight.end + 1s",
                fill: "freeze",
              },
            }),
          ]
        ),
      ]),
    ]);
  },
  it = [],
  ot = l(nt, rt, it, !1, null, "0b5060d4");
const ct = ot.exports,
  pt =
    "data:image/png;base64,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",
  lt = {
    components: { WindPower: T },
    data() {
      return {
        tabList: [
          { title: "超短期", authKey: "/app/superShortTermBtn" },
          { title: "短期", authKey: "/app/shortTermBtn" },
        ],
        activePage: 0,
        fanList: [],
        tabsKey: 0,
        entityId: "",
      };
    },
    created() {
      this._GetFanList(), this.handleChangeTabs();
    },
    methods: {
      handleChangeTabs() {
        const s = u(),
          t = "/app/superShortTermBtn",
          e = "/app/shortTermBtn",
          a = s.some((r) => r.path === t),
          i = s.some((r) => r.path === e);
        let n = null;
        (a && i) || a ? (n = 0) : i ? (n = 1) : (n = 0), this.onChangePage(n);
      },
      onChangePage(s) {
        this.tabsKey = s;
        let t = this.entityId;
        (this.entityId = null),
          this.$nextTick(() => {
            this.entityId = t;
          });
      },
      async _GetFanList() {
        let s = {
            windfarmStatus: "运营",
            subCenter: this.$store.state.subcenterResource.area || void 0,
          },
          t = await w(s);
        (this.fanList = t.result.records.map((e) => {
          let { desc: a, code: i, entityId: n } = e;
          return { desc: a, code: i, entityId: n };
        })),
          (this.entityId = this.fanList[0].entityId);
      },
      onHandleChange(s) {
        this.entityId = s;
      },
      oncloseClick() {
        this.$emit("oncloseClick");
      },
    },
  };
var dt = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      { staticClass: "shortBox" },
      [
        e(
          "div",
          { staticClass: "select_fdc" },
          [
            e("span", [t._v("选择风电场：")]),
            e(
              "a-select",
              {
                attrs: { value: t.entityId },
                on: { change: t.onHandleChange },
              },
              t._l(t.fanList, function (a) {
                return e(
                  "a-select-option",
                  { key: a.entityId, attrs: { value: a.entityId } },
                  [t._v(" " + t._s(a.desc || a.code) + " ")]
                );
              }),
              1
            ),
            e("div", {
              staticClass: "header-exit",
              staticStyle: { position: "fixed", "z-index": "1014" },
              attrs: { title: "返回上一级" },
              on: { click: t.oncloseClick },
            }),
          ],
          1
        ),
        e("div", { staticClass: "menu" }, [
          e(
            "div",
            { staticClass: "menuBox" },
            t._l(t.tabList, function (a, i) {
              return e(
                "div",
                {
                  directives: [
                    {
                      name: "auth",
                      rawName: "v-auth",
                      value: [a.authKey],
                      expression: "[item.authKey]",
                    },
                  ],
                  key: i,
                  staticClass: "boxContent",
                  on: {
                    click: function (n) {
                      return t.onChangePage(i);
                    },
                  },
                },
                [
                  e("span", [t._v(t._s(a.title))]),
                  i === t.tabsKey ? e("img", { attrs: { src: pt } }) : t._e(),
                ]
              );
            }),
            0
          ),
        ]),
        e("wind-power", {
          ref: "windPower",
          attrs: { "is-super": t.tabsKey === 0, "entity-id": t.entityId },
        }),
      ],
      1
    );
  },
  ht = [],
  mt = l(lt, dt, ht, !1, null, "3a3a80ee");
const ft = mt.exports,
  ut = "" + new URL("category-1-hE_c2RBc.png", import.meta.url).href,
  gt = "" + new URL("category-2-D6iYh7oN.png", import.meta.url).href,
  wt = "" + new URL("category-3-O4hf0pGJ.png", import.meta.url).href,
  yt = "" + new URL("category-4-DT06OQkT.png", import.meta.url).href,
  Ct = "" + new URL("category-1-selected-DGkNjOtW.png", import.meta.url).href,
  vt = "" + new URL("category-2-selected-BHSUdYFB.png", import.meta.url).href,
  _t = "" + new URL("category-3-selected-CIpizthn.png", import.meta.url).href,
  St = "" + new URL("category-4-selected-DZAjyyuq.png", import.meta.url).href,
  It = "" + new URL("category-1-en-DSx94Rx1.png", import.meta.url).href,
  bt = "" + new URL("category-2-en-CNGtk9Ox.png", import.meta.url).href,
  kt = "" + new URL("category-3-en-Bki9SXG5.png", import.meta.url).href,
  Lt = "" + new URL("category-4-en-DdjbnjlW.png", import.meta.url).href,
  At =
    "" + new URL("category-1-en-selected-CXiwyVSJ.png", import.meta.url).href,
  xt =
    "" + new URL("category-2-en-selected-BdQGh5Zx.png", import.meta.url).href,
  Rt =
    "" + new URL("category-3-en-selected-Lo7XoYhb.png", import.meta.url).href,
  Bt =
    "" + new URL("category-4-en-selected-BTIze3e0.png", import.meta.url).href,
  o = { AI: 0, CAE: 1, Data: 2, Operation: 3 },
  Tt = {
    [o.Data]: { en: It, zh: ut, selectedEn: At, selectedZh: Ct },
    [o.Operation]: { en: bt, zh: gt, selectedEn: xt, selectedZh: vt },
    [o.CAE]: { en: kt, zh: wt, selectedEn: Rt, selectedZh: _t },
    [o.AI]: { en: Lt, zh: yt, selectedEn: Bt, selectedZh: St },
  };
function Et(s, t, e) {
  const a = Tt[s];
  return a
    ? e === s
      ? t
        ? a.selectedEn
        : a.selectedZh
      : t
      ? a.en
      : a.zh
    : null;
}
const Ot = "" + new URL("app-sm-1-BNwfjq--.png", import.meta.url).href,
  Ut = "" + new URL("app-sm-2-zlCo-BAg.png", import.meta.url).href,
  qt = "" + new URL("app-sm-3-jp1OSDml.png", import.meta.url).href,
  Ht = "" + new URL("app-sm-5-B9WrU8Ss.png", import.meta.url).href,
  Nt = "" + new URL("app-sm-6-JWSZCgZJ.png", import.meta.url).href,
  Mt = "" + new URL("app-sm-10-C3C_J2c4.png", import.meta.url).href,
  $t = "" + new URL("app-sm-11-D1Py49zG.png", import.meta.url).href,
  Pt = "" + new URL("app-sm-0-Ch5MTEIn.png", import.meta.url).href,
  Dt = "" + new URL("app-sm-8-fmxrDWiQ.png", import.meta.url).href,
  Wt = "" + new URL("app-sm-7-BphSUPVf.png", import.meta.url).href,
  Xt = "" + new URL("app-1-CaOankwk.png", import.meta.url).href,
  jt = "" + new URL("app-2-BHbgHvAk.png", import.meta.url).href,
  zt = "" + new URL("app-3-DRGdIt-7.png", import.meta.url).href,
  Ft = "" + new URL("app-5-DXjdVAUH.png", import.meta.url).href,
  Jt = "" + new URL("app-6-DB4Qhm2l.png", import.meta.url).href,
  Yt = "" + new URL("app-10-C0XoMxnN.png", import.meta.url).href,
  Vt = "" + new URL("app-11-BoKkPY7R.png", import.meta.url).href,
  Zt = "" + new URL("app-0-Bp0Ru6s1.png", import.meta.url).href,
  Kt = "" + new URL("app-8-CEIGbku8.png", import.meta.url).href,
  Gt = "" + new URL("app-7-CtR-BqNf.png", import.meta.url).href,
  Qt = "" + new URL("icon-jjyx-Dmfkp9ZO.png", import.meta.url).href,
  te = "" + new URL("icon-jjyx-3d-9mmd1pZj.png", import.meta.url).href,
  ee = "" + new URL("leftArrow-COh7cxzn.png", import.meta.url).href,
  se = "" + new URL("rightArrow-BU9aG1hK.png", import.meta.url).href,
  p = {
    经济策略运行: "某应用名称",
    风功率预测系统: "某应用名称",
    CAE模拟仿真平台: "某应用名称",
    风机基础在线检测和疲劳度检测软件: "某应用名称",
    电力交易辅助决策系统: "某应用名称",
    故障诊断平台: "某应用名称",
    AI大模型: "某应用名称",
  },
  h = { [p.电力交易辅助决策系统]: 1, [p.故障诊断平台]: 2, [p.AI大模型]: 3 },
  f = {
    [o.Operation]: "/app/operationsManagementBtn",
    [o.Data]: "/app/dataServicesBtn",
    [o.CAE]: "/app/caeBtn",
    [o.AI]: "/app/aiBtn",
  },
  ae = {
    components: { ChatPage: F, Earth: at, Round: ct, windPowerBox: ft },
    data() {
      let s = this;
      return {
        winUrl: "",
        appList: [
          {
            icon: Ot,
            icon3d: Xt,
            applink: `/yunwei/?token=${m()}`,
            appname: `xx智能运维决策平台`,
            category: o.Operation,
            provider: this.$t("appStore.provider1"),
            id: 0,
          },
          {
            icon: Ut,
            icon3d: jt,
            applink: "/yujing/home",
            appname: `xx故障预警系统`,
            type: "iframe",
            iconStyle: { width: "80%", transform: "translateY(6px)" },
            category: o.Operation,
            provider: this.$t("appStore.provider1"),
            id: 1,
          },
          {
            icon: qt,
            icon3d: zt,
            appname: `xx疲劳度检测软件`,
            type: p.风机基础在线检测和疲劳度检测软件,
            category: o.Operation,
            provider: this.$t("appStore.provider1"),
            id: 2,
          },
          {
            icon: Ht,
            icon3d: Ft,
            applink: window.location.origin + "/pbsms/loginController.do?login",
            appname: `xx健康检测系统`,
            category: o.Operation,
            provider: this.$t("appStore.provider3"),
            id: 3,
            fn() {
              setTimeout(() => {
                let t = s.$refs.myiframe;
                (t.contentWindow.$.dialog2 = t.contentWindow.$.dialog),
                  (t.contentWindow.$.dialog = function () {
                    console.log("打印了"),
                      t.contentWindow.$.dialog2(...arguments);
                  });
              }, 1200);
            },
          },
          /* {
            icon: Nt,
            icon3d: Jt,
            applink: "",
            appname: `xx电力交易辅助决策系统`,
            category: o.Operation,
            provider: this.$t("appStore.provider4"),
            id: 4,
          }, */
          {
            requestType: h[p.电力交易辅助决策系统],
            icon: Mt,
            icon3d: Yt,
            appname: `xx电力交易辅助决策系统`,
            category: o.Operation,
            provider: this.$t("appStore.provider5"),
            id: 5,
          },
          {
            requestType: h[p.故障诊断平台],
            icon: $t,
            icon3d: Vt,
            appname: `xx故障诊断平台`,
            category: o.Operation,
            provider: this.$t("appStore.provider6"),
            id: 6,
          },
          {
            icon: Pt,
            icon3d: Zt,
            applink: "",
            appname: `xx风功率预测系统`,
            type: p.风功率预测系统,
            category: o.Data,
            provider: this.$t("appStore.provider2"),
            id: 7,
          },
          {
            icon: Dt,
            icon3d: Kt,
            appname: `xxCAE模拟仿真平台`,
            type: p.CAE模拟仿真平台,
            category: o.CAE,
            provider: this.$t("appStore.provider1"),
            id: 8,
          },
          {
            requestType: h[p.AI大模型],
            icon: Wt,
            icon3d: Gt,
            appname: `AI智能问答`,
            category: o.AI,
            provider: this.$t("appStore.provider1"),
            id: 9,
          },
          {
            applink: "/economic-operation-strategy-of-windfarms?childPage=1",
            linkType: "router",
            icon: Qt,
            icon3d: te,
            appname: `xx经济策略运行`,
            category: o.Data,
            provider: this.$t("appStore.provider1"),
            id: 10,
          },
        ].map((t, e) => ({ ...t, id: e, class: e })),
        applink: "",
        isShowPower: !1,
        isShowEconomic: !1,
        toLeft: null,
        moveStep: 0,
        CategoryType: o,
        AUTH_KEY: f,
        currentAppType: null,
      };
    },
    computed: {
      isEng() {
        return this.$root.$i18n.locale === "en-GB";
      },
      selectedApp() {
        const s = this.appList.length;
        if (!s) return null;
        let t = -this.moveStep % s;
        return t < 0 && (t += s), this.appList[t];
      },
    },
    created() {
      this.phsmLogin();
    },
    mounted() {
      this.filterAppList();
    },
    methods: {
      filterAppList() {
        const s = u();
        this.appList = this.appList.filter((t) =>
          s.some((e) => e.path === f[t.category])
        );
      },
      toApp() {
        this.onShowDetail(this.selectedApp);
      },
      async phsmLogin() {
        const s = m();
        await y({ token: s });
      },
      clickItem(s) {
        (this.toLeft = s < this.moveStep), (this.moveStep = -s), this.change();
      },
      leftOrRight(s) {
        (this.toLeft = s < 0), (this.moveStep += s), this.change();
      },
      change() {
        this.$refs.earthBox.change();
      },
      async onShowDetail(s) {
        this.$message.error("演示版暂不支持【跳转】功能");
        return;
        if (((this.currentAppType = s.category), s.requestType)) {
          const { result: t } = await C({ type: s.requestType });
          this.applink = t.url;
          return;
        }
        if (s.linkType === "router") {
          this.$router.push(s.applink);
          return;
        }
        if (s.type === p.经济策略运行) this.isShowEconomic = !0;
        else if (s.type === p.风功率预测系统) this.isShowPower = !0;
        else if (s.type === p.CAE模拟仿真平台) {
          const { result: t } = await v();
          this.applink = t;
        } else if (s.type === p.风机基础在线检测和疲劳度检测软件) {
          const { result: t } = await _();
          this.applink = `/sellme/ui/jump/?token=${t}`;
        } else
          s.applink
            ? (this.applink = s.applink)
            : this.$message.error("暂无对应链接");
        s.fn && s.fn();
      },
      onBack() {
        this.applink = "";
      },
      oncloseClick() {
        this.isShowPower = !1;
      },
      poistionCalculation(s) {
        let t = (s + this.moveStep) % this.appList.length;
        return (
          t < 0
            ? (t = this.appList.length + t)
            : t >= this.appList.length && (t = t - this.appList.length),
          `item${t > 6 ? 0 : t}`
        );
      },
      changeCategory(s) {
        if (!this.appList.some((e) => e.category === s)) {
          this.$message.error("暂无对应权限");
          return;
        }
        const t = this.appList.findIndex((e) => e.category === s);
        this.moveStep = -t;
      },
      getIcon: Et,
    },
  };
var ne = function () {
    var a, i, n, r;
    var t = this,
      e = t._self._c;
    return e(
      "div",
      { staticClass: "appBox" },
      [
        e(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !t.applink && t.isShowPower === !1,
                expression: "!applink && isShowPower === false",
              },
            ],
            staticClass: "navBox",
          },
          [
            t._l(t.appList, function (c, d) {
              return e(
                "div",
                {
                  key: d,
                  staticClass: "item",
                  class: [t.poistionCalculation(d), t.isEng ? "english" : ""],
                  attrs: { id: "navItem" + c.id },
                  on: {
                    click: function (oe) {
                      return t.clickItem(d);
                    },
                  },
                },
                [
                  e("div", { staticStyle: { height: "35%" } }, [
                    e("img", {
                      staticClass: "icon",
                      style: c.iconStyle,
                      attrs: { src: c.icon },
                    }),
                  ]),
                  e("div", {
                    staticClass: "title",
                    domProps: { innerHTML: t._s(c.appname) },
                  }),
                ]
              );
            }),
            e("img", {
              staticClass: "leftArrow arrow",
              attrs: { src: ee },
              on: {
                click: function (c) {
                  return t.leftOrRight(1);
                },
              },
            }),
            e("img", {
              staticClass: "rightArrow arrow",
              attrs: { src: se },
              on: {
                click: function (c) {
                  return t.leftOrRight(-1);
                },
              },
            }),
            t.selectedApp
              ? e("Earth", {
                  ref: "earthBox",
                  attrs: { "now-center-item": t.selectedApp },
                  on: { toApp: t.toApp },
                })
              : t._e(),
            e("img", {
              staticClass: "abso abso0",
              class: { abso_en: t.isEng },
              attrs: {
                src: t.getIcon(
                  t.CategoryType.Operation,
                  t.isEng,
                  (a = t.selectedApp) == null ? void 0 : a.category
                ),
              },
              on: {
                click: function (c) {
                  return t.changeCategory(t.CategoryType.Operation);
                },
              },
            }),
            e("img", {
              staticClass: "abso abso1",
              class: { abso_en: t.isEng },
              attrs: {
                src: t.getIcon(
                  t.CategoryType.Data,
                  t.isEng,
                  (i = t.selectedApp) == null ? void 0 : i.category
                ),
              },
              on: {
                click: function (c) {
                  return t.changeCategory(t.CategoryType.Data);
                },
              },
            }),
            e("img", {
              staticClass: "abso abso2",
              class: { abso_en: t.isEng },
              attrs: {
                src: t.getIcon(
                  t.CategoryType.CAE,
                  t.isEng,
                  (n = t.selectedApp) == null ? void 0 : n.category
                ),
              },
              on: {
                click: function (c) {
                  return t.changeCategory(t.CategoryType.CAE);
                },
              },
            }),
            e("img", {
              staticClass: "abso abso3",
              class: { abso_en: t.isEng },
              attrs: {
                src: t.getIcon(
                  t.CategoryType.AI,
                  t.isEng,
                  (r = t.selectedApp) == null ? void 0 : r.category
                ),
              },
              on: {
                click: function (c) {
                  return t.changeCategory(t.CategoryType.AI);
                },
              },
            }),
          ],
          2
        ),
        e("div", { staticClass: "app" }, [
          t.applink !== ""
            ? e(
                "div",
                { staticClass: "iframe_box" },
                [
                  t.currentAppType !== t.CategoryType.AI
                    ? e("iframe", {
                        ref: "myiframe",
                        staticClass: "myiframe",
                        attrs: {
                          id: "myiframe",
                          src: t.applink,
                          sandbox:
                            "allow-forms allow-scripts allow-same-origin allow-popups",
                        },
                      })
                    : e("ChatPage"),
                  e("div", {
                    staticClass: "header-exit",
                    staticStyle: { "z-index": "1014" },
                    attrs: { title: "返回上一级" },
                    on: { click: t.onBack },
                  }),
                ],
                1
              )
            : t._e(),
        ]),
        e("Round", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !t.applink && t.isShowPower === !1,
              expression: "!applink && isShowPower === false",
            },
          ],
          staticClass: "roundBox",
        }),
        t.isShowPower
          ? e("windPowerBox", { on: { oncloseClick: t.oncloseClick } })
          : t._e(),
      ],
      1
    );
  },
  re = [],
  ie = l(ae, ne, re, !1, null, "162e4319");
const fe = ie.exports;
export { fe as default };
