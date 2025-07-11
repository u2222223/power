import {
  n as h,
  cN as v,
  bP as A,
  bI as f,
  bK as c,
  cO as m,
} from "./index-FdyGBlLz.js";
import { t as u, j as g } from "./common-0X47MWYd.js";
import { _ as C } from "./video-DhuHiuk-.js";
const w =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANNJREFUWEftl9ENwjAMRC+bsAlkEugGtwGwgTegTELZpKOgq/JRRflI85EIyZb6Z7uXp+jsBDQGyQeAayp/mtnc0iq0FJG8APhktdHMlqP9WgW8ANyyny1mFnsJ0OlFYR8uwAk4ASfwxwRInpK1niutNHdBla3pq2mh3LdmRyApT5e3j4goASVf7yVmIzBcQGm29yIwbftAuoR3ALqMNaG8Um7tQvIFMJvZ2rqQ+D7gBJyAE3ACJQKy1qnGx/c5rVY89nGaBpgWGT3PNZS03ei5fjh+XwGcf7XJz5wAAAAASUVORK5CYII=",
  k =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAHxJREFUWEft1bENgDAQA0B7BBoKZmKXfMkGUGYYZkKChhGMaOgoo0/hDBBb99GHSD5MzocLWMACFrBAHwIRESRnSRPJu+X/IGkgeUjaa62VpZSV5NIy9O9uSRsj4gQwZhQAcOUXSB/BS5/6CJNm/8X2sQcyFSxgAQtYwAIPUkYyO9k6/bkAAAAASUVORK5CYII=",
  I =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQlJREFUWEftltERgjAQRJdOtBPpRDvYDtQOtgPtRDqRUpybCTNhAiQmQfzgfmFyL7t7Bw02rmbj/tgBdgX+TwGSBwAPAKfKE9IBuEjq/XMDBUha83Pl5sNxnaQ2BvAGYCqsUpJGl/61Ar2kY0wBu/1rBRXM+zaaAaMjeQNwreyBNbcgjmp2DCtD3CXZpYJa3AMkawQySP5iBvyHbieU5CEIXbIFw4skbSdYHnJGc9L3ZAU8iJxQzvr+NYCbDLMidT0v+p4LkLofor5nATgVUiCivmcDJCypJN+LABzE1Bcz2fdiAAfhL6ms5nZO0R8RSZuKg6Rn7nejCCC3aRULajQvtqAGxG7BrsAHvQRaITPQhn8AAAAASUVORK5CYII=",
  S = {
    props: {
      nvrCode: { type: [String, void 0], default: void 0 },
      channel: { type: [String, void 0], default: void 0 },
    },
    data() {
      return {
        scales: ["zoomin", "zoomout"],
        arrows: ["up", "down", "left", "right"],
      };
    },
    methods: {
      async ctrl(s) {
        !this.nvrCode ||
          !this.channel ||
          (await v({
            serial: this.nvrCode,
            code: this.channel,
            command: s,
            speed: 60,
          }));
      },
    },
  };
var R = function () {
    var e = this,
      t = e._self._c;
    return t("div", { staticClass: "vm-control" }, [
      t("div", { staticClass: "vm-ctrl" }, [
        t("div", { staticClass: "vm-scale" }, [
          t(
            "div",
            {
              staticClass: "vm-add",
              on: {
                mousedown: function (i) {
                  return e.ctrl(e.ctrl[0]);
                },
                mouseup: function (i) {
                  return e.ctrl("stop");
                },
                click: function (i) {
                  i.stopPropagation();
                },
              },
            },
            [t("img", { attrs: { alt: "", src: w } })]
          ),
          t(
            "div",
            {
              staticClass: "vm-sub",
              on: {
                mousedown: function (i) {
                  return e.ctrl(e.ctrl[1]);
                },
                mouseup: function (i) {
                  return e.ctrl("stop");
                },
                click: function (i) {
                  i.stopPropagation();
                },
              },
            },
            [t("img", { attrs: { alt: "", src: k } })]
          ),
        ]),
        t(
          "div",
          {
            staticClass: "arrow_ctrl",
            on: {
              click: function (i) {
                i.stopPropagation();
              },
            },
          },
          e._l(e.arrows, function (i) {
            return t("div", { key: i, staticClass: "arrow" }, [
              t("img", {
                staticClass: "arrowImg",
                attrs: { type: i, alt: "", src: I },
                on: {
                  mousedown: function (n) {
                    return e.ctrl(i);
                  },
                  mouseup: function (n) {
                    return e.ctrl("stop");
                  },
                },
              }),
            ]);
          }),
          0
        ),
      ]),
    ]);
  },
  E = [],
  B = h(S, R, E, !1, null, "e3d90620");
const V = B.exports,
  b =
    "data:image/png;base64,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",
  P = {
    components: { Control: V },
    props: { value: { type: Boolean, default: !1 } },
    data() {
      return {
        showVideoModal: !1,
        showVideoBig: !1,
        videoCurEntity: 0,
        videoCurrentPage: 1,
        videoList: [],
        videoTotal: 0,
        easyplayer: {},
        videoTreeList: [],
        videoSelectedKeys: [],
        expandKeys: [],
      };
    },
    computed: {
      vdoCurrPage() {
        return this.videoList.slice(
          (this.videoCurrentPage - 1) * 4,
          this.videoCurrentPage * 4
        );
      },
      vdoCurrList() {
        let s = this.vdoCurrPage;
        if (s.find((t) => t.entityId === this.videoCurEntity)) return s;
        {
          let t = this.videoList.find(
            (i) => i.entityId === this.videoCurEntity
          );
          return t ? [...s, { ...t, isOther: !0 }] : s;
        }
      },
      videoCheckedIds() {
        return this.vdoCurrPage.map(({ entityId: s }) => s);
      },
      onlyOne() {
        let [s] = this.videoTreeList;
        return this.videoTreeList.length === 1 && s.classKeyword === "camera";
      },
      vdoTitle() {
        return "视频" + (this.onlyOne ? "" : "列表");
      },
    },
    methods: {
      async loadVideos() {
        let { result: { records: s } = {} } = await A({
            pageNo: 1,
            pageSize: 100,
            needDoc: !0,
            sql: 'mdclass_keyword="cameraGroup" and code="cameraGroup"',
          }),
          e = [],
          t = [],
          i = [];
        for (let l of s || []) {
          let d = l.document ? l.document.etattr_nvrCode : void 0,
            o = await this.queryAllCam(l.entityId, d);
          (e = [...e, ...o]),
            i.push(l.projectId),
            (l.children = o),
            (l.title = this.getVideoTitle(l));
        }
        t = u(JSON.parse(JSON.stringify(e)))
          .filter((l) => l.classKeyword === "camera")
          .sort((l, d) => i.indexOf(d.projectId) - i.indexOf(l.projectId));
        let r = await Promise.all(s.map((l) => f({ id: l.projectId }))),
          a = [];
        r.forEach((l, d) => {
          let o = l.result || {},
            y = u(JSON.parse(JSON.stringify([s[d]]))).filter(
              (p) => p.classKeyword === "camera"
            );
          (a[d] = {
            ...o,
            classKeyword: o.cdclass ? o.cdclass.keyword : null,
            title: this.getVideoTitle(o),
            children: y,
          }),
            this.expandKeys.push(o.entityId);
        }),
          this.clickVideo({ tree: a, data: t });
      },
      async clickVideo(s) {
        let { data: e, tree: t } = s;
        e != null &&
          ((this.videoTotal = e.length),
          (this.videoTreeList = t),
          this.dealVideoList(e));
      },
      queryAllCam(s, e) {
        return new Promise(async (t, i) => {
          let { result: n } = await c({ entityId: s, needAttr: !0 });
          if (n && n.length) {
            if (
              ((n = n
                .filter((a) => a.sho === 1)
                .map((a) => ({
                  ...a,
                  nvrCode: e,
                  rtmp: a.document ? a.document.etattr_rtmp : null,
                  online: a.document ? a.document.etattr_online : !1,
                  channel: a.document ? a.document.etattr_channel : void 0,
                  classKeyword: a.cdclass ? a.cdclass.keyword : null,
                  title: this.getVideoTitle(a),
                }))),
              n[0] && n[0].cdclass && n[0].cdclass.keyword === "camera")
            )
              return t(n);
            let r = await Promise.all(
              n.map((a) =>
                this.queryAllCam(
                  a.entityId,
                  a.document ? a.document.etattr_nvrCode : void 0
                )
              )
            );
            n.forEach((a, l) => {
              a.children = r[l];
            }),
              t(n);
          } else t([]);
        });
      },
      async findTree(s) {
        let e = [],
          t = [];
        return (
          s.forEach((n) => {
            let r = n.topicName.split("/");
            r.pop();
            let a = +(r.pop() || 0);
            e.includes(a) || e.push(a);
          }),
          (
            await Promise.all(e.map((n) => c({ entityId: n, needAttr: !0 })))
          ).forEach((n) => {
            (n.result || []).forEach((a) => {
              a.sho === 1 &&
                a.cdclass.keyword === "camera" &&
                s.find((l) => l.entityId === a.entityId) &&
                t.push({
                  ...a,
                  rtmp: a.document ? a.document.etattr_rtmp : null,
                  classKeyword: a.cdclass ? a.cdclass.keyword : null,
                  title: this.getVideoTitle(a),
                });
            });
          }),
          t
        );
      },
      getVideoTitle({ code: s, desc: e }) {
        (s = s || ""), (e = e || "");
        let t = /[\u4E00-\u9FA5]+/g;
        return t.test(s) ? s : t.test(e) ? e : s;
      },
      dealVideoList(s) {
        (this.videoList = []),
          (this.videoCurrentPage = 1),
          (this.videoList = g(s)),
          (this.showVideoBig = !1),
          this.$nextTick(() => {
            (this.easyplayer = {}), this.addVdoPage(this.vdoCurrPage);
          });
      },
      async videoTreeSelect(s, e) {
        if (s.length) {
          let t = this.videoSelectedKeys[0];
          if (((this.videoSelectedKeys = []), e.rtmp)) {
            if (this.vdoCurrList.find((r) => r.isOther && r.entityId === t)) {
              let r = `easyplayer-${t}`;
              this.removeVdo(this.easyplayer[r]), (this.easyplayer[r] = null);
            }
            this.videoSelectedKeys = s;
            let n = this.vdoCurrPage.find((r) => r.entityId === e.entityId);
            n
              ? ((this.videoCurEntity = n.entityId), (this.showVideoBig = !0))
              : (this.addVdoPage([e]),
                (this.videoCurEntity = e.entityId),
                (this.showVideoBig = !0));
          }
        }
      },
      async rtmp2flv(s) {
        let { result: e } = await m({ rtmp: s, level: 3, origin: "web" });
        return `/${e.split("/").slice(-2).join("/")}`;
      },
      addVdoPage(s) {
        s.forEach((e) => {
          let t = `easyplayer-${e.entityId}`;
          this.removeVdo(this.easyplayer[t]),
            (this.easyplayer[t] = null),
            this.rtmp2flv(e.rtmp).then((i) => {
              this.player(i, t);
            });
        });
      },
      player(s, e) {
        s &&
          this.value &&
          ((this.easyplayer[e] = window.flvjs.createPlayer(
            {
              type: "flv",
              url: s,
              isLive: !0,
              hasAudio: !1,
              hasVideo: !0,
              enableStashBuffer: !1,
            },
            {
              enableWorker: !1,
              enableStashBuffer: !1,
              autoCleanupSourceBuffer: !0,
            }
          )),
          this.easyplayer[e].attachMediaElement(document.getElementById(e)),
          this.value
            ? (this.easyplayer[e].load(), this.easyplayer[e].play())
            : (this.easyplayer[e] !== null &&
                this.removeVdo(this.easyplayer[e]),
              (this.easyplayer[e] = null)));
      },
      destroyVdoPage(s) {
        (this.videoList.slice((s - 1) * 4, s * 4) || []).forEach((e) => {
          let t = "easyplayer-" + e.entityId;
          this.removeVdo(this.easyplayer[t]), (this.easyplayer[t] = null);
        });
      },
      removeVdo(s) {
        try {
          s &&
            (s.pause && s.pause(),
            s.unload && s.unload(),
            s.detachMediaElement && s.detachMediaElement(),
            s.destroy && s.destroy());
        } catch {}
      },
      async packUp(s) {
        if (s.isOther) {
          let e = `easyplayer-${s.entityId}`;
          this.removeVdo(this.easyplayer[e]), (this.easyplayer[e] = null);
        }
        (this.videoCurEntity = 0),
          (this.showVideoBig = !1),
          (this.videoSelectedKeys = []);
      },
      vdoFullScreen(s) {
        let e = document.getElementById("easyplayer-" + s);
        e.requestFullscreen
          ? e.requestFullscreen()
          : e.webkitRequestFullScreen
          ? e.webkitRequestFullScreen()
          : e.mozRequestFullScreen
          ? e.mozRequestFullScreen()
          : e.msRequestFullscreen && e.msRequestFullscreen();
      },
      vdoShrink(s) {
        document.getElementById("easyplayer-" + s) ===
          this.getFullscreenElement() &&
          ((this.showVideoBig = !1),
          document.exitFullscreen
            ? document.exitFullscreen()
            : document.webkitCancelFullScreen
            ? document.webkitCancelFullScreen()
            : document.mozCancelFullScreen
            ? document.mozCancelFullScreen()
            : document.msExitFullscreen && document.msExitFullscreen());
      },
      getFullscreenElement() {
        return (
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullScreenElement ||
          document.webkitFullscreenElement ||
          null
        );
      },
      changeVideoPage(s) {
        this.showVideoBig && (this.showVideoBig = !1),
          (this.videoCurrentPage = s),
          this.addVdoPage(this.vdoCurrPage);
      },
      closeVideo() {
        this.$refs.devicePlayer.close(() => {
          this.showVideoModal = !1;
        });
      },
      closeVideoList() {
        for (let s in this.easyplayer)
          this.removeVdo(this.easyplayer[s]), (this.easyplayer[s] = null);
        (this.easyplayer = {}),
          (this.videoCurEntity = 0),
          (this.videoTreeList = []),
          (this.videoList = []),
          (this.videoCurrentPage = 1),
          (this.videoSelectedKeys = []),
          (this.showVideoBig = !1),
          this.$nextTick(() => {
            this.$emit("input", !1);
          });
      },
      setExpandKeys(s) {
        let e = this.expandKeys.indexOf(s);
        e !== -1 ? this.expandKeys.splice(e, 1) : this.expandKeys.push(s);
      },
    },
    watch: {
      value(s) {
        s && this.loadVideos();
      },
      videoCurrentPage: {
        handler(s, e) {
          e == 0 || s === e || this.destroyVdoPage(e);
        },
      },
    },
  };
var _ = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: e.value,
            expression: "value",
          },
        ],
        staticClass: "video_modal",
      },
      [
        t("div", { staticClass: "dialog" }, [
          t("div", { staticClass: "container" }, [
            t("div", { staticClass: "left" }, [
              e._m(0),
              t("div", { staticClass: "left_container" }, [
                t(
                  "div",
                  { staticClass: "search" },
                  [
                    t(
                      "SeaInput",
                      { attrs: { blcok: "", placeholder: "请输入摄像头名称" } },
                      [
                        t(
                          "div",
                          {
                            staticClass: "suffix",
                            attrs: { slot: "addonAfter" },
                            slot: "addonAfter",
                          },
                          [
                            t("img", {
                              staticClass: "searchIcon",
                              attrs: { src: C },
                            }),
                            t("span", [e._v("搜索")]),
                          ]
                        ),
                      ]
                    ),
                  ],
                  1
                ),
                t(
                  "div",
                  { staticClass: "list" },
                  e._l(e.videoTreeList, function (i, n) {
                    return t("div", { key: n, staticClass: "project" }, [
                      t(
                        "div",
                        {
                          class: ["project_title", {}],
                          attrs: { "data-title": i.title },
                          on: {
                            click: function (r) {
                              return (
                                r.stopPropagation(), e.setExpandKeys(i.entityId)
                              );
                            },
                          },
                        },
                        [
                          t(
                            "div",
                            [
                              t("a-icon", {
                                class: [
                                  { active: e.expandKeys.includes(i.entityId) },
                                  "arrow",
                                ],
                                attrs: { type: "caret-right" },
                              }),
                            ],
                            1
                          ),
                        ]
                      ),
                      t(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: e.expandKeys.includes(i.entityId),
                              expression: "expandKeys.includes(item.entityId)",
                            },
                          ],
                          staticClass: "project_container",
                        },
                        e._l(i.children, function (r, a) {
                          return t("div", { key: a, staticClass: "li" }, [
                            t(
                              "div",
                              {
                                staticClass: "text",
                                class: [
                                  {
                                    active: e.videoCheckedIds.includes(
                                      r.entityId
                                    ),
                                  },
                                  { outLine: !r.online },
                                ],
                                on: {
                                  click: function (l) {
                                    return e.videoTreeSelect([r.entityId], r);
                                  },
                                },
                              },
                              [
                                e._v(
                                  " " +
                                    e._s(r.code) +
                                    e._s(r.online ? "" : " (离线)") +
                                    " "
                                ),
                              ]
                            ),
                          ]);
                        }),
                        0
                      ),
                    ]);
                  }),
                  0
                ),
              ]),
            ]),
            t("div", { staticClass: "right" }, [
              t("div", { staticClass: "video_container" }, []),
              t(
                "div",
                { staticClass: "footer" },
                [
                  t("SeaPagination", {
                    staticStyle: { "text-align": "right", overflow: "hidden" },
                    attrs: { pageSize: 4, total: e.videoTotal },
                    on: { change: e.changeVideoPage },
                    model: {
                      value: e.videoCurrentPage,
                      callback: function (i) {
                        e.videoCurrentPage = i;
                      },
                      expression: "videoCurrentPage",
                    },
                  }),
                ],
                1
              ),
            ]),
          ]),
        ]),
      ]
    );
  },
  N = [
    function () {
      var s = this,
        e = s._self._c;
      return e("div", { staticClass: "left_header" }, [
        e("div", {
          staticClass: "left_title",
          attrs: { "data-title": "摄像头管理" },
        }),
      ]);
    },
  ],
  x = h(P, _, N, !1, null, "260c248e");
const Q = x.exports;
export { Q as default };
