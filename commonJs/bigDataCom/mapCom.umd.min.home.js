"use strict";
(("undefined" !== typeof self ? self : this)["webpackChunkmapCom"] =
  ("undefined" !== typeof self ? self : this)["webpackChunkmapCom"] || []).push(
  [
    [962],
    {
      86124: function (e, t, s) {
        s.r(t),
          s.d(t, {
            default: function () {
              return m;
            },
          });
        var i = function () {
            var e = this,
              t = e._self._c;
            return t(
              "div",
              { staticClass: "home", attrs: { id: "home" } },
              [
                false
                  ? t(
                      "div",
                      {
                        class: [{ sidebar0: !e.isExpandTree }, "sidebar"],
                        attrs: { id: "sidebar" },
                      },
                      [
                        t("img", {
                          staticStyle: { width: "108%", height: "100%" },
                          attrs: { src: s(99873) },
                        }),
                        t(
                          "div",
                          {
                            staticClass: "leftTree",
                            class: { hideLeftTree: !e.isExpandTree },
                          },
                          [
                            t(
                              "div",
                              {
                                staticClass: "treeArrow",
                                class: { treeArrowLeft: !e.isExpandTree },
                                on: { mouseover: e.switchTree },
                              },
                              [
                                t("div", {
                                  class: [
                                    { arrowLeft: !e.isExpandTree },
                                    "arrow",
                                  ],
                                }),
                              ]
                            ),
                            t(
                              "div",
                              { staticClass: "leftTreeHeader" },
                              [
                                t(
                                  "a-popover",
                                  {
                                    attrs: {
                                      placement: "top",
                                      "overlay-class-name":
                                        "backpopover backpopoverBottom",
                                    },
                                  },
                                  [
                                    t("template", { slot: "content" }, [
                                      t("p", { staticStyle: { margin: "0" } }, [
                                        e._v(
                                          " " +
                                            e._s(e.languageObj.hoverTitle) +
                                            " "
                                        ),
                                      ]),
                                    ]),
                                    t("div", [
                                      t(
                                        "p",
                                        {
                                          staticClass: "gisTitle",
                                          staticStyle: { margin: "0" },
                                          on: {
                                            click: function (t) {
                                              return e.closeOverview("index");
                                            },
                                          },
                                        },
                                        [
                                          t(
                                            "span",
                                            {
                                              class: e.state.isSea
                                                ? "titleBox"
                                                : "",
                                            },
                                            [e._v(e._s(e.languageObj.title))]
                                          ),
                                        ]
                                      ),
                                    ]),
                                  ],
                                  2
                                ),
                                e.state.isSea
                                  ? t("span", { staticClass: "titleLine" })
                                  : e._e(),
                              ],
                              1
                            ),
                            t(
                              "div",
                              {
                                staticClass: "leftTreeContent",
                                class: e.state.isSea ? "fatherDict" : "",
                              },
                              [
                                t(
                                  "div",
                                  {
                                    staticClass: "treeContentBox",
                                    class: e.state.isSea ? "childDict" : "",
                                  },
                                  [
                                    t("SeaTree", {
                                      ref: "entityTree",
                                      attrs: {
                                        "is-expand-tree": e.isExpandTree,
                                        options: {
                                          entityIds: e.multiIds,
                                          isEng: e.state.isEng,
                                          isSelectChild: e.state.isSelectChild,
                                          needFilter: !0,
                                          isExpandRoot: e.state.isExpandRoot,
                                          sql: e.state.sql,
                                          sqlParams: e.state.sqlParams,
                                        },
                                      },
                                      on: {
                                        onSelected: e.handleSelectTreeNode,
                                      },
                                    }),
                                  ],
                                  1
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]
                    )
                  : e._e(),
                e.state.isShowPage
                  ? t("div", {
                      staticClass: "closeBtn",
                      attrs: { id: "closeBtn" },
                    })
                  : e._e(),
                t(
                  "Map",
                  e._g(
                    e._b(
                      {
                        ref: "map",
                        attrs: {
                          "target-id": e.targetId,
                          "need-child": e.needChild,
                          headName: e.headName,
                          freeze: e.freeze,
                        },
                        on: {
                          "update:headName": function (t) {
                            e.headName = t;
                          },
                          "update:head-name": function (t) {
                            e.headName = t;
                          },
                          loadAsyncTree: e.loadAsyncTree,
                        },
                      },
                      "Map",
                      e.$attrs,
                      !1
                    ),
                    e.$listeners
                  )
                ),
              ],
              1
            );
          },
          a = [],
          r = s(82535),
          n = s(12988),
          d = (s(65903), s(3712)),
          l = s.n(d),
          c = {
            components: {
              Map: () =>
                Promise.all([s.e(202), s.e(132), s.e(626), s.e(214)]).then(
                  s.bind(s, 52214)
                ),
              SeaTree: () => s.e(230).then(s.bind(s, 61230)),
            },
            data() {
              return {
                state: {
                  isSea: !0,
                  isShowHeader: !1,
                  isShowSlider: !0,
                  isShowNormal: !1,
                  isShowPage: !1,
                  sql: null,
                  isSelectChild: !1,
                  isExpandRoot: !1,
                  sqlParams: {},
                },
                isExpandTree: !0,
                headName: "",
                menuList: [],
                multiIds: [],
                targetId: [],
                needChild: !1,
                cache: {},
              };
            },
            computed: {
              freeze() {
                return this.$attrs.showOverview;
              },
              languageObj() {
                return this.state.isEng
                  ? {
                      title:
                        this.$store.state.subcenterResource?.runTitleEn ||
                        "Home Page",
                      hoverTitle: "Click back to home page",
                    }
                  : {
                      title:
                        this.$store.state.subcenterResource?.runTitle || "首页",
                      hoverTitle: "点击回到首页",
                    };
              },
              ...(0, r.L8)(["isGisSign"]),
            },
            watch: {
              $attrs: { handler: "initState", deep: !0, immediate: !0 },
            },
            created() {},
            methods: {
              switchTree() {
                (this.isExpandTree = !this.isExpandTree),
                  this.$emit("switchTree", this.isExpandTree);
              },
              async handleSelectTreeNode(e) {
                console.log("handleSelectTreeNode", e);
                let t = !(0 == Object.keys(e));
                if (t) {
                  this.isGisSign && this.updateEntityId(node.node);
                  let { classKeyword: t, classCode: s, entityId: i } = e;
                  switch (((t = t || e.cdclass?.keyword), t)) {
                    case "cameraGroup":
                      let t = await this.queryAllCam(i);
                      this.$refs.map.clickVideo({
                        tree: t,
                        data: t,
                        projectId: e.projectId,
                        cameraGroupId: e.entityId,
                      }),
                        this.closeOverview(),
                        this.$refs.map._GetGisAndSetCenter(e.entityId);
                      break;
                    case "camera":
                      let { result: a } = await (0, n.k3)({
                        id: i,
                        needAttr: !0,
                      });
                      delete a.cdEntityAttrList;
                      let r = [
                        {
                          ...a,
                          rtmp: a.document ? a.document.etattr_rtmp : null,
                          classKeyword: a.cdclass ? a.cdclass.keyword : null,
                        },
                      ];
                      this.$refs.map.clickVideo({ tree: r, data: r }),
                        this.closeOverview(),
                        this.$refs.map._GetGisAndSetCenter(e.entityId);
                      break;
                    case "weatherPrediction":
                      const { result: d } = await (0, n.k3)({
                        id: e.parentId,
                        needAttr: !0,
                      });
                      this.closeOverview(),
                        this.$refs.map._GetGisAndSetCenter(e.entityId),
                        this.$refs.map.changeWeatherType(d);
                      break;
                    default:
                      await this.$refs.map._GetMenuList(e.entityId),
                        "windfarm" === s &&
                          this.$refs.map._GetGisAndSetCenter(e.entityId);
                      break;
                  }
                } else this.closeOverview();
              },
              loadAsyncTree(e) {
                this.state.isShowSlider &&
                  this.$refs.entityTree &&
                  this.$refs.entityTree.handleLoadLoopNode(e.parentIds);
              },
              closeOverview(e) {
                this.$emit("onJumpPage", { checked: !1, type: e });
              },
              queryAllCam(e) {
                return new Promise(async (t, s) => {
                  let { result: i } = await (0, n.uu)({
                    entityId: e,
                    needAttr: !0,
                  });
                  if (i && i.length) {
                    if (
                      ((i = i
                        .filter((e) => 1 === e.sho)
                        .map((e) => ({
                          ...e,
                          rtmp: e.document ? e.document.etattr_rtmp : null,
                          classKeyword: e.cdclass ? e.cdclass.keyword : null,
                        }))),
                      i[0] && i[0].cdclass && "camera" === i[0].cdclass.keyword)
                    )
                      return t(i);
                    if (i.length > 0) {
                      const e = i[0],
                        { result: t } = await (0, n.uu)({
                          entityId: e.entityId,
                          needAttr: !0,
                        });
                      e.children = t;
                    }
                    t(i);
                  } else t([]);
                });
              },
              updateEntityId(e) {
                let t;
                if (e) {
                  let s = (e) =>
                    e.$parent.eventKey ? s(e.$parent) : e.eventKey;
                  t = s(e);
                } else t = this.menuList[0].entityId;
                this.$refs.map.$refs.drawUtils.entityId = t;
              },
              initState(e = this.$attrs) {
                if (e && JSON.stringify(e) !== JSON.stringify(this.cache)) {
                  let t = !this.diffCache(e, this.cache);
                  (this.cache = JSON.parse(JSON.stringify(e))),
                    Object.keys(e).map((t) => {
                      "options" != t
                        ? (this[t] = e[t])
                        : Object.keys(e[t]).map((s) => {
                            this.state[s] = e[t][s];
                          });
                    });
                  let { map: s } = this.$refs;
                  if (s && s.$refs && t) {
                    let { changeCategory: e } = s.$refs.cesiumMap;
                    this.$nextTick(() => {
                      e(l()(JSON.stringify(this.cache)));
                    });
                  }
                }
              },
              diffCache(e, t) {
                return (
                  (e.multiIds || []).toString() + "," + e?.options?.sql ===
                  (t.multiIds || []).toString() + "," + t?.options?.sql
                );
              },
            },
          },
          o = c,
          h = s(81656),
          p = (0, h.A)(o, i, a, !1, null, "500469f4", null),
          m = p.exports;
      },
      99873: function (e, t, s) {
        e.exports = s.p + "img/sidebar_bg.8e383b50.png";
      },
    },
  ]
);
