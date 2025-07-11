"use strict";
(("undefined" !== typeof self ? self : this)["webpackChunkmapCom"] =
  ("undefined" !== typeof self ? self : this)["webpackChunkmapCom"] || []).push(
  [
    [214],
    {
      52214: function (e, t, i) {
        i.r(t),
          i.d(t, {
            default: function () {
              return f;
            },
          });
        var s = function () {
            var e = this,
              t = e._self._c;
            return t(
              "div",
              { staticClass: "map", attrs: { id: "mapBox" } },
              /*  [
                t(
                  "cesiumMapHome",
                  e._g(
                    e._b(
                      {
                        ref: "cesiumMap",
                        staticStyle: { height: "100% !important" },
                        attrs: {
                          "multi-ids": e.multiIDs,
                          "use-map-server": e.useMapServer,
                          "dwdj-item": e.dwdjItem,
                          "is-plan": e.isPlan,
                          "need-child": e.needChild,
                          "hide-list": e.hideList,
                          "selected-id-items": e.selectedIdItems,
                        },
                        on: {
                          clickMapGis: e.clickMapGis,
                          clickVideo: e.clickVideo,
                          clickMapGisVideo: e.clickMapGisVideo,
                          changeWeatherType: e.changeWeatherType,
                        },
                      },
                      "cesiumMapHome",
                      e.$attrs,
                      !1
                    ),
                    e.$listeners
                  )
                ),
                ["gh", "hlhd2023", "dwdj", "haiLan", "haiArea"].find((t) =>
                  e.selectedIdItemsCode.includes(t)
                )
                  ? t("div", { staticClass: "legends" }, [
                      e.selectedIdItemsCode.includes("gh")
                        ? t(
                            "div",
                            [
                              t("div", { staticClass: "title" }, [
                                e._v("场址"),
                              ]),
                              t(
                                "a-checkbox-group",
                                {
                                  staticClass: "blackCheckbox",
                                  on: { change: e.changeFarmList },
                                  model: {
                                    value: e.windFarmListArr,
                                    callback: function (t) {
                                      e.windFarmListArr = t;
                                    },
                                    expression: "windFarmListArr",
                                  },
                                },
                                e._l(e.windFarmList, function (i, s) {
                                  return t(
                                    "a-checkbox",
                                    { key: s, attrs: { value: s } },
                                    [e._v(" " + e._s(i.province) + " ")]
                                  );
                                }),
                                1
                              ),
                            ],
                            1
                          )
                        : e._e(),
                      e.selectedIdItemsCode.includes("hlhd2023")
                        ? t("div", [
                            t("div", { staticClass: "title" }, [
                              e._v("航路航道"),
                            ]),
                            e._m(0),
                          ])
                        : e._e(),
                      e.selectedIdItemsCode.includes("haiLan")
                        ? t(
                            "div",
                            [
                              t("div", { staticClass: "title" }, [
                                e._v("海缆"),
                              ]),
                              t(
                                "a-checkbox-group",
                                {
                                  staticClass: "blackCheckbox",
                                  model: {
                                    value: e.legendKeys.haiLan,
                                    callback: function (t) {
                                      e.$set(e.legendKeys, "haiLan", t);
                                    },
                                    expression: "legendKeys.haiLan",
                                  },
                                },
                                e._l(e.legendChildren.haiLan, function (i) {
                                  return t(
                                    "a-checkbox",
                                    {
                                      key: i.topicName,
                                      attrs: { value: i.topicName },
                                    },
                                    [e._v(" " + e._s(i.title) + " ")]
                                  );
                                }),
                                1
                              ),
                            ],
                            1
                          )
                        : e._e(),
                      e.selectedIdItemsCode.includes("haiArea")
                        ? t(
                            "div",
                            [
                              t("div", { staticClass: "title" }, [
                                e._v("海域边界线"),
                              ]),
                              t(
                                "a-checkbox-group",
                                {
                                  staticClass: "blackCheckbox",
                                  model: {
                                    value: e.legendKeys.haiArea,
                                    callback: function (t) {
                                      e.$set(e.legendKeys, "haiArea", t);
                                    },
                                    expression: "legendKeys.haiArea",
                                  },
                                },
                                e._l(e.legendChildren.haiArea, function (i) {
                                  return t(
                                    "a-checkbox",
                                    {
                                      key: i.topicName,
                                      attrs: { value: i.topicName },
                                    },
                                    [e._v(" " + e._s(i.title) + " ")]
                                  );
                                }),
                                1
                              ),
                            ],
                            1
                          )
                        : e._e(),
                      e.selectedIdItemsCode.includes("dwdj")
                        ? t("div", [
                            t("div", { staticClass: "title" }, [
                              e._v("电网电架"),
                            ]),
                            t(
                              "div",
                              { staticClass: "dwdj" },
                              e._l(e.legends, function (i, s) {
                                return t(
                                  "div",
                                  {
                                    key: s,
                                    class: [{ item_disable: !i.show }],
                                    on: {
                                      click: function (e) {
                                        i.show = !i.show;
                                      },
                                    },
                                  },
                                  [
                                    t(
                                      "div",
                                      {
                                        staticClass: "block",
                                        staticStyle: {
                                          "background-color": "transparent",
                                        },
                                      },
                                      [
                                        t("img", {
                                          style: i.style,
                                          attrs: { src: i.image },
                                        }),
                                      ]
                                    ),
                                    t("div", { staticClass: "text" }, [
                                      e._v(" " + e._s(i.name) + " "),
                                    ]),
                                  ]
                                );
                              }),
                              0
                            ),
                          ])
                        : e._e(),
                    ])
                  : e._e(),
                !e.$attrs.showOverview && e.btnList.length > 0
                  ? t(
                      "div",
                      {
                        staticClass: "btnList panel",
                        attrs: { id: "btnList" },
                      },
                      e._l(e.btnList, function (i, s) {
                        return t(
                          "a-popover",
                          {
                            key: s,
                            attrs: {
                              placement: "left",
                              "overlay-class-name": "backpopover",
                            },
                          },
                          [
                            t("template", { slot: "content" }, [
                              t(
                                "span",
                                { staticStyle: { "font-size": "16px" } },
                                [e._v(e._s(i.text))]
                              ),
                            ]),
                            t("img", {
                              class: e.selectedIds.includes(i.entityId)
                                ? "btnImg_s"
                                : "btnImg",
                              attrs: { src: i.selectedIconPath },
                              on: {
                                click: function (t) {
                                  i.entityId
                                    ? e.onSelect(i.entityId, i)
                                    : e.onOpenModal();
                                },
                              },
                            }),
                          ],
                          2
                        );
                      }),
                      1
                    )
                  : e._e(),
                t(
                  "a-modal",
                  {
                    staticClass: "video_modal",
                    attrs: {
                      "destroy-on-close": "",
                      footer: null,
                      width: "1420px",
                    },
                    on: { cancel: e.closeVideoList },
                    scopedSlots: e._u([
                      {
                        key: "title",
                        fn: function () {
                          return [
                            t(
                              "a-row",
                              { attrs: { type: "flex" } },
                              [
                                t(
                                  "a-col",
                                  { attrs: { flex: 1 } },
                                  [
                                    t(
                                      "a-tabs",
                                      {
                                        attrs: {
                                          "tab-bar-style": {
                                            color: "#fff",
                                            border: "none",
                                          },
                                        },
                                        on: { change: e.onVideoTabChange },
                                        model: {
                                          value: e.activeTab,
                                          callback: function (t) {
                                            e.activeTab = t;
                                          },
                                          expression: "activeTab",
                                        },
                                      },
                                      [
                                        e.originGisVideo
                                          ? e._e()
                                          : t("a-tab-pane", {
                                              key: -1,
                                              attrs: { tab: "收藏" },
                                            }),
                                        e._l(e.videoTreeList, function (e, i) {
                                          return t("a-tab-pane", {
                                            key: i,
                                            attrs: { tab: e.code },
                                          });
                                        }),
                                      ],
                                      2
                                    ),
                                  ],
                                  1
                                ),
                                t("a-col", [
                                  t(
                                    "div",
                                    {
                                      staticStyle: {
                                        "padding-right": "20px",
                                        position: "relative",
                                      },
                                    },
                                    [
                                      t(
                                        "a-input",
                                        {
                                          attrs: {
                                            placeholder: "搜索关键字",
                                            "allow-clear": "",
                                          },
                                          on: { change: e.debounceLoadSearch },
                                          model: {
                                            value: e.searchValue,
                                            callback: function (t) {
                                              e.searchValue = t;
                                            },
                                            expression: "searchValue",
                                          },
                                        },
                                        [
                                          t("img", {
                                            staticStyle: {
                                              width: "20px",
                                              height: "20px",
                                            },
                                            attrs: {
                                              slot: "prefix",
                                              src: i(77820),
                                            },
                                            slot: "prefix",
                                          }),
                                        ]
                                      ),
                                      e.searchValue
                                        ? t(
                                            "a-row",
                                            { staticClass: "search-box" },
                                            [
                                              e._l(
                                                e.searchDataList,
                                                function (s, a) {
                                                  return t(
                                                    "a-col",
                                                    {
                                                      key: a,
                                                      staticClass:
                                                        "search-item",
                                                      on: {
                                                        click: function (t) {
                                                          return e.onPlayVideo(
                                                            s
                                                          );
                                                        },
                                                      },
                                                    },
                                                    [
                                                      t("div", [
                                                        e._v(e._s(s.name)),
                                                      ]),
                                                      s.status
                                                        ? t("img", {
                                                            attrs: {
                                                              src: i(35247),
                                                            },
                                                            on: {
                                                              click: function (
                                                                t
                                                              ) {
                                                                return (
                                                                  t.stopPropagation(),
                                                                  e.onCancelCollect(
                                                                    s,
                                                                    "search"
                                                                  )
                                                                );
                                                              },
                                                            },
                                                          })
                                                        : t("img", {
                                                            attrs: {
                                                              src: i(61252),
                                                            },
                                                            on: {
                                                              click: function (
                                                                t
                                                              ) {
                                                                return (
                                                                  t.stopPropagation(),
                                                                  e.onCollect(
                                                                    s,
                                                                    "search"
                                                                  )
                                                                );
                                                              },
                                                            },
                                                          }),
                                                    ]
                                                  );
                                                }
                                              ),
                                              0 === e.searchDataList.length
                                                ? t(
                                                    "div",
                                                    {
                                                      staticStyle: {
                                                        height: "118px",
                                                        "text-align": "center",
                                                        "line-height": "118px",
                                                      },
                                                    },
                                                    [e._v(" 无内容 ")]
                                                  )
                                                : e._e(),
                                            ],
                                            2
                                          )
                                        : e._e(),
                                    ],
                                    1
                                  ),
                                ]),
                              ],
                              1
                            ),
                          ];
                        },
                        proxy: !0,
                      },
                    ]),
                    model: {
                      value: e.showVideoListModal,
                      callback: function (t) {
                        e.showVideoListModal = t;
                      },
                      expression: "showVideoListModal",
                    },
                  },
                  [
                    e.showVideoListModal
                      ? t(
                          "div",
                          { class: ["videoBody", { vdoOne: e.onlyOne }] },
                          [
                            e.treeData.length && !e.onlyOne
                              ? t(
                                  "div",
                                  { staticClass: "videoLeftTreeBox" },
                                  [
                                    t("a-tree", {
                                      ref: "treeNode",
                                      staticClass: "videoTree",
                                      staticStyle: {
                                        "font-size": "14px",
                                        color: "#fff",
                                      },
                                      attrs: {
                                        "tree-data": e.treeData,
                                        checkable: "",
                                        "checked-keys": e.videoCheckedIds,
                                        "selected-keys": e.videoSelectedKeys,
                                        "default-expanded-keys":
                                          e.videoExpandedKeys,
                                        "load-data": e.onLoadTreeData,
                                        "replace-fields": {
                                          title: "code",
                                          key: "entityId",
                                        },
                                      },
                                      on: { select: e.videoTreeSelect },
                                      scopedSlots: e._u(
                                        [
                                          {
                                            key: "title",
                                            fn: function (s) {
                                              return [
                                                t(
                                                  "div",
                                                  { staticClass: "tree-item" },
                                                  [
                                                    t(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "tree-item-code",
                                                      },
                                                      [
                                                        e._v(
                                                          " " +
                                                            e._s(s.code) +
                                                            " "
                                                        ),
                                                      ]
                                                    ),
                                                    s.isLeaf
                                                      ? t(
                                                          "div",
                                                          [
                                                            s.status
                                                              ? t("img", {
                                                                  attrs: {
                                                                    src: i(
                                                                      35247
                                                                    ),
                                                                    alt: "",
                                                                  },
                                                                  on: {
                                                                    click:
                                                                      function (
                                                                        t
                                                                      ) {
                                                                        return (
                                                                          t.stopPropagation(),
                                                                          e.onCancelCollect(
                                                                            s
                                                                          )
                                                                        );
                                                                      },
                                                                  },
                                                                })
                                                              : t("img", {
                                                                  attrs: {
                                                                    src: i(
                                                                      61252
                                                                    ),
                                                                    alt: "",
                                                                  },
                                                                  on: {
                                                                    click:
                                                                      function (
                                                                        t
                                                                      ) {
                                                                        return (
                                                                          t.stopPropagation(),
                                                                          e.onCollect(
                                                                            s
                                                                          )
                                                                        );
                                                                      },
                                                                  },
                                                                }),
                                                            -1 === e.activeTab
                                                              ? [
                                                                  s.top
                                                                    ? t("img", {
                                                                        attrs: {
                                                                          src: i(
                                                                            38064
                                                                          ),
                                                                          alt: "",
                                                                        },
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              t
                                                                            ) {
                                                                              return (
                                                                                t.stopPropagation(),
                                                                                e.onToTop(
                                                                                  s
                                                                                )
                                                                              );
                                                                            },
                                                                        },
                                                                      })
                                                                    : t("img", {
                                                                        attrs: {
                                                                          src: i(
                                                                            80515
                                                                          ),
                                                                          alt: "",
                                                                        },
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              t
                                                                            ) {
                                                                              return (
                                                                                t.stopPropagation(),
                                                                                e.onToTop(
                                                                                  s
                                                                                )
                                                                              );
                                                                            },
                                                                        },
                                                                      }),
                                                                ]
                                                              : e._e(),
                                                          ],
                                                          2
                                                        )
                                                      : e._e(),
                                                  ]
                                                ),
                                              ];
                                            },
                                          },
                                        ],
                                        null,
                                        !1,
                                        1857210239
                                      ),
                                    }),
                                  ],
                                  1
                                )
                              : e._e(),
                            e.vdoCurrList.length > 0
                              ? t(
                                  "div",
                                  { staticClass: "videoRightListBox" },
                                  [
                                    t(
                                      "div",
                                      { staticClass: "videoList" },
                                      e._l(e.vdoCurrList, function (i, s) {
                                        return t(
                                          "div",
                                          {
                                            key: s,
                                            class: [
                                              "videoBox",
                                              {
                                                bigVideoBox:
                                                  (e.showVideoBig &&
                                                    i.entityId ===
                                                      e.videoCurEntity) ||
                                                  e.onlyOne,
                                              },
                                            ],
                                            on: {
                                              click: function (t) {
                                                return e.vdoFullScreen(
                                                  i.entityId
                                                );
                                              },
                                            },
                                          },
                                          [
                                            t("a-icon", {
                                              directives: [
                                                {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: e.showVideoBig,
                                                  expression: "showVideoBig",
                                                },
                                              ],
                                              staticClass: "shrink-btn",
                                              attrs: { type: "shrink" },
                                              on: {
                                                click: function (t) {
                                                  return (
                                                    t.stopPropagation(),
                                                    e.packUp(i)
                                                  );
                                                },
                                              },
                                            }),
                                            t("a-icon", {
                                              directives: [
                                                {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: !e.showVideoBig,
                                                  expression: "!showVideoBig",
                                                },
                                              ],
                                              staticClass: "arrows-btn",
                                              attrs: { type: "arrows-alt" },
                                            }),
                                            t("video", {
                                              staticClass: "videoplayer",
                                              attrs: {
                                                id: "easyplayer-" + i.entityId,
                                                muted: "",
                                                type: "rtmp/flv",
                                                autoplay: "",
                                                preload: "auto",
                                                disablePictureInPicture: "",
                                                oncontextmenu: "return false",
                                                controlsList:
                                                  "nodownload noplaybackrate footbar",
                                              },
                                              domProps: { muted: !0 },
                                              on: {
                                                click: function (t) {
                                                  return (
                                                    t.stopPropagation(),
                                                    e.vdoShrink(i.entityId)
                                                  );
                                                },
                                              },
                                            }),
                                            t(
                                              "p",
                                              { staticClass: "noVideo" },
                                              [t("a-spin")],
                                              1
                                            ),
                                            t(
                                              "p",
                                              { staticClass: "videotext" },
                                              [e._v(" " + e._s(i.name) + " ")]
                                            ),
                                          ],
                                          1
                                        );
                                      }),
                                      0
                                    ),
                                    t("a-pagination", {
                                      staticStyle: { "text-align": "center" },
                                      attrs: {
                                        total: e.videoTotal,
                                        "page-size": 4,
                                      },
                                      on: { change: e.changeVideoPage },
                                      model: {
                                        value: e.videoCurrentPage,
                                        callback: function (t) {
                                          e.videoCurrentPage = t;
                                        },
                                        expression: "videoCurrentPage",
                                      },
                                    }),
                                  ],
                                  1
                                )
                              : e._e(),
                          ]
                        )
                      : e._e(),
                  ]
                ),
                e.showWeather
                  ? t("WeatherReportNew", {
                      attrs: {
                        "entity-id": e.weatherId,
                        "head-name": e.headName,
                        "topic-name": e.weatherTopic,
                      },
                      on: { onCloseWeather: e.removeWeather },
                    })
                  : e._e(),
              ], */
              1
            );
          },
          a = [
            function () {
              var e = this,
                t = e._self._c;
              return t("div", { staticClass: "hlhd2023" }, [
                t("div", [
                  t("div", { staticClass: "block" }, [
                    t("div", {
                      staticClass: "line",
                      staticStyle: { "border-bottom": "2px dashed #00c5ff" },
                    }),
                  ]),
                  t("div", { staticClass: "text" }, [e._v("广东沿海外航路")]),
                ]),
                t("div", [
                  t("div", { staticClass: "block" }, [
                    t("div", {
                      staticClass: "line",
                      staticStyle: { "border-bottom": "2px dashed #00ffc5" },
                    }),
                  ]),
                  t("div", { staticClass: "text" }, [e._v("广东沿海内航路")]),
                ]),
                t("div", [
                  t("div", { staticClass: "block" }, [
                    t("div", {
                      staticClass: "line",
                      staticStyle: { "border-bottom": "2px dashed #ffff00" },
                    }),
                  ]),
                  t("div", { staticClass: "text" }, [e._v("广东沿海近岸航路")]),
                ]),
                t("div", [
                  t("div", { staticClass: "block" }, [
                    t("div", {
                      staticClass: "line",
                      staticStyle: { "border-bottom": "2px dashed #e600a9" },
                    }),
                  ]),
                  t("div", { staticClass: "text" }, [
                    e._v("广东沿海主要港口进出港航路"),
                  ]),
                ]),
              ]);
            },
          ],
          n = (i(44114), i(82535)),
          o = i(12988),
          d = i(33225),
          r = i.n(d),
          l = i(36626),
          c = i(63692),
          h = i(58308),
          u = i(57334),
          p = i(81451),
          A = i.n(p),
          g = i(37173),
          m = {
            components: {
              cesiumMapHome: () =>
                Promise.all([i.e(93), i.e(477), i.e(152)]).then(
                  i.bind(i, 82217)
                ),
              WeatherReportNew: l["default"],
            },
            props: {
              multiIds: { type: Array, default: () => [] },
              needChild: { type: Boolean, default: !1 },
              headName: { type: String, default: () => "" },
            },
            data() {
              return {
                state: {},
                pageList: [],
                pageData: "",
                windFarmListArr: [0],
                isRouterAlive: !1,
                count: 100,
                showWarnModal: !1,
                legends: [
                  {
                    otherType: 10,
                    gisType: 1,
                    key: "核电",
                    name: "核电站",
                    dataCode: "核电站",
                    show: !0,
                    image:
                      "/admin/sys/resource/static/t001/20230216/nuclear.png",
                  },
                  {
                    otherType: 10,
                    gisType: 1,
                    key: "火电",
                    name: "火电站",
                    dataCode: "火电厂",
                    show: !0,
                    image:
                      "/admin/sys/resource/static/t001/20230216/thermal.png",
                  },
                  {
                    otherType: 10,
                    gisType: 1,
                    key: "变电",
                    name: "变电站",
                    dataCode: "500kV变电站",
                    show: !0,
                    image:
                      "/admin/sys/resource/static/t001/20230216/substation.png",
                  },
                  {
                    otherType: 10,
                    gisType: 1,
                    key: "换流站",
                    name: "换流站",
                    dataCode: "直流换流站",
                    show: !0,
                    image:
                      "/admin/sys/resource/static/t001/20230216/convertor.png",
                  },
                  {
                    otherType: 10,
                    gisType: 1,
                    key: "开关站",
                    name: "开关站",
                    dataCode: "500kV开关站",
                    show: !0,
                    image:
                      "/admin/sys/resource/static/t001/20230216/switchyard.png",
                  },
                  {
                    otherType: 10,
                    gisType: 1,
                    key: "蓄能",
                    name: "抽水蓄能",
                    dataCode: "蓄能电厂",
                    show: !0,
                    image:
                      "/admin/sys/resource/static/t001/20230216/storage.png",
                  },
                  {
                    otherType: 0,
                    gisType: 2,
                    key: "500kV",
                    name: "500kV线路",
                    dataCode: "500kV线路",
                    show: !0,
                    image: i(83229),
                    style: "width: 4vw",
                  },
                  {
                    otherType: 0,
                    gisType: 2,
                    key: "dc",
                    name: "直流线路",
                    dataCode: "直流线路",
                    show: !0,
                    image: i(82613),
                    style: "width: 4vw",
                  },
                ],
                statusList: [
                  { code: 0, value: "未处理" },
                  { code: 1, value: "已处理" },
                  { code: 2, value: "已忽略" },
                ],
                warnList: [],
                warnListLoading: !1,
                warnListPagination: {
                  current: 1,
                  pageSize: 10,
                  pageSizeOptions: ["5", "10", "20", "30"],
                  showTotal: (e, t) => " 共" + e + "条",
                  showSizeChanger: !0,
                  total: 0,
                },
                showWarnMsgModal: !1,
                warnMsgTitle: "",
                warnMsgList: [],
                showVideoModal: !1,
                showVideoListModal: !1,
                activeTab: "",
                showOtherType2: !1,
                showOtherType3: !1,
                showVideoBig: !1,
                videoCurrent: {},
                videoCurEntity: 0,
                videoCurrentPage: 1,
                videoList: [],
                searchDataList: [],
                searchValue: "",
                videoTotal: 0,
                easyplayer: {},
                curWarn: null,
                queryObj: { warnType: null, status: null },
                selectedKeys: [],
                curIframe: "",
                showWeather: !1,
                showTyphoon: !1,
                weatherId: -1,
                weatherTopic: "",
                btnList: [],
                videoTreeList: [],
                videoGroupEntityId: [],
                videoSelectedKeys: [],
                videoExpandedKeys: [],
                videoGisList: [],
                originGisVideo: !1,
                collectVideoDataList: [],
                projectId: "",
                cameraGroupId: "",
                selectedIds: [],
                loaded: !1,
                windFarmList: [],
                legendChildren: {},
                legendKeys: {},
              };
            },
            created() {
              this.setState(this.$attrs.options || {});
            },
            computed: {
              ...(0, n.L8)(["token", "isGisSign"]),
              useMapServer() {
                return !1;
              },
              pageName() {
                const e = {
                    plan: { name: "plan", pageName: "规划" },
                    build: { name: "build", pageName: "建设" },
                    run: { name: "run", pageName: "运营" },
                    weather: { name: "weather", pageName: "气象" },
                  },
                  t = e[this.$route.name];
                return t ? t.pageName : "";
              },
              videoCurrentList() {
                const e = this.videoTreeList[this.activeTab];
                return e ? e.children : [];
              },
              isPlan() {
                return 1319646 == this.multiIds[0];
              },
              vdoCurrPage() {
                return this.videoList
                  ? this.videoList.slice(
                      4 * (this.videoCurrentPage - 1),
                      4 * this.videoCurrentPage
                    )
                  : [];
              },
              vdoCurrList() {
                let e = this.vdoCurrPage;
                return this.videoCurEntity &&
                  -1 === e.findIndex((e) => e.entityId === this.videoCurEntity)
                  ? [...e, this.videoCurrent]
                  : e;
              },
              videoCheckedIds() {
                return this.vdoCurrPage.map(({ entityId: e }) => e);
              },
              onlyOne() {
                let [e] = this.videoTreeList;
                return (
                  1 === this.videoTreeList.length && "camera" === e.classKeyword
                );
              },
              vdoTitle() {
                return "视频" + (this.onlyOne ? "" : "列表");
              },
              btnIds() {
                return this.btnList.map((e) => e.entityId);
              },
              multiIDs() {
                return this.isPlan ? this.selectedIds : this.multiIds;
              },
              dwdjItem() {
                return this.btnList.find((e) => "dwdj" === e.pageCode);
              },
              selectedIdItems() {
                return this.selectedIds.map((e) =>
                  this.btnList.find((t) => t.entityId === e)
                );
              },
              btnListCode() {
                return this.btnList.map((e) => e.pageCode);
              },
              selectedIdItemsCode() {
                return this.selectedIdItems.map((e) => e.pageCode);
              },
              hideTopic() {
                let e = [];
                return (
                  Object.keys(this.legendChildren).forEach((t) => {
                    let i = this.legendChildren[t];
                    i.forEach((t) => {
                      e.push(t.topicName);
                    });
                  }),
                  Object.keys(this.legendKeys).forEach((t) => {
                    let i = this.legendKeys[t];
                    i.forEach((t) => {
                      let i = e.indexOf(t);
                      -1 !== i && e.splice(i, 1);
                    });
                  }),
                  e
                );
              },
              hideList() {
                let e = [];
                return (
                  this.legends.forEach((t) => {
                    t.show || e.push(t.topicName);
                  }),
                  [...e, ...this.hideTopic]
                );
              },
              treeData() {
                return this.originGisVideo
                  ? this.videoGisList
                  : -1 === this.activeTab
                  ? this.collectVideoDataList
                  : this.videoTreeList[this.activeTab]?.children || [];
              },
            },
            mounted() {},
            methods: {
              changeFarmList() {
                this.toPoint(), this.$refs.cesiumMap.selectToShow();
              },
              setState(e) {
                Object.keys(e).map((t) => {
                  this.state[t] = e[t];
                }),
                  (e = void 0);
              },
              toPoint() {
                let e = this.windFarmListArr[this.windFarmListArr.length - 1];
                if (this.windFarmListArr.length) {
                  let t, i;
                  0 === e
                    ? ((t = 114.20755584732056), (i = 21.91130672755935))
                    : ((t = 119.26126678482056), (i = 24.795569162545803)),
                    this.$refs.cesiumMap.viewer.camera.flyTo({
                      destination: Cesium.Cartesian3.fromDegrees(t, i, 112e4),
                      duration: 2,
                    });
                }
              },
              async _GetPageBtn() {
                let { result: e } = await (0, o.uu)({
                  entityId: this.multiIds[0],
                  simple: !0,
                  page: !0,
                });
                e.forEach((e) => {
                  e.cdEntityPageList &&
                    e.cdEntityPageList.forEach((t) => {
                      if (
                        9 === t.showType &&
                        !this.btnList.find((e) => e.pageId === t.pageId)
                      ) {
                        let i = JSON.parse(t.pageData || "{}");
                        this.btnList.push({
                          id: t.pageId,
                          entityId: t.entityId,
                          pageCode: t.pageCode,
                          iconPath: i.wxAppStyle.noSelectedIcon,
                          selectedIconPath: i.wxAppStyle.selectedIcon,
                          text: this.$attrs.options.isEng
                            ? i.Languagelabel
                            : t.pageName,
                          stations: "电网电站" === e.code,
                        }),
                          ["haiLan", "haiArea"].includes(t.pageCode) &&
                            (0, o.uu)({ entityId: t.entityId }).then((e) => {
                              let i = e.result.map((e) => ({
                                title: e.code,
                                topicName: e.topicName,
                              }));
                              this.$set(this.legendChildren, t.pageCode, i),
                                this.$set(
                                  this.legendKeys,
                                  t.pageCode,
                                  i.map((e) => e.topicName)
                                );
                            });
                      }
                    }),
                    "电网电站" === e.code && this.getStations(e);
                }),
                  this.btnList.push({
                    pageCode: "power",
                    iconPath: i(87300),
                    selectedIconPath: i(87300),
                    text: this.$attrs.options.isEng
                      ? "Power supply structure"
                      : "电源结构",
                    stations: !1,
                  });
                let [t] = this.btnList;
                t && (this.selectedIds = [t.entityId]);
              },
              onSelect(e, t) {
                let i = this.selectedIds.indexOf(e);
                if (-1 === i)
                  this.selectedIds.push(e),
                    t.stations && this.toDefaultStas(),
                    (t.selected = !0);
                else {
                  this.selectedIds.splice(i, 1);
                  let e = !!this.btnIds.find((e) =>
                    this.selectedIds.includes(e)
                  );
                  (t.selected = !1), e || (this.selectedIds = []);
                }
                let { entityTree: s } = this.$parent.$refs;
                s && (s.selectedKeys = []), this.btnListOptions(t);
              },
              btnListOptions(e) {
                "gh" === e.pageCode &&
                  (e.selected
                    ? ((this.windFarmListArr = [0]), this.toPoint())
                    : ((this.windFarmListArr = []),
                      this.$refs.cesiumMap.selectToShow()));
              },
              async _GetMenuList(e) {
                if (!e) return;
                if (((this.pageList = []), this.isPlan))
                  return void (this.selectedIds = [e]);
                let { result: t } = await (0, o.k3)({
                    id: e,
                    needAttr: !0,
                    needPage: !0,
                  }),
                  { cdEntityPageList: i } = t;
                (i = (i || []).filter((e) => e.needShow)),
                  i.length
                    ? this.$emit("onJumpPage", {
                        checked: !0,
                        entityId: e,
                        result: t,
                        pageList: i,
                      })
                    : this.$emit("onJumpPage", { checked: !1 });
              },
              _GetGisAndSetCenter(e) {
                if (e === {}) return;
                let t = { pageNo: 1, pageSize: 10, entityId: e };
                (0, o.g1)(t).then((t) => {
                  if (t.success)
                    if (t.result.records.length > 0) {
                      let e = t.result.records.filter(
                        (e) => 0 === e.otherType || 6 === e.otherType
                      );
                      e.sort((e, t) => e.gisType - t.gisType),
                        e[0] &&
                          e[0].points &&
                          this.$refs.cesiumMap.setCenter(
                            e[0].points[0],
                            e[0].maxScaling
                          );
                    } else this._GetParentAndSetCenter(e);
                });
              },
              async _GetParentAndSetCenter(e) {
                let t = await this._GetParentIds(e, !0);
                if (t && t.length > 0)
                  for (let i = 1; i < t.length; i++) {
                    let e = await this._GetGis(t[i]);
                    if (e) return;
                  }
              },
              _GetParentIds(e, t) {
                return new Promise((i, s) => {
                  (0, o.fA)({ entityId: e }).then((s) => {
                    if (s.success)
                      if (t) i(s.result);
                      else {
                        let t = s.result,
                          a = t.indexOf(e),
                          n = t.indexOf(0),
                          o = t.splice(a, n + 1),
                          d = o.reverse();
                        i(d);
                      }
                  });
                });
              },
              _GetGis(e) {
                return new Promise((t, i) => {
                  let s = { pageNo: 1, pageSize: 10, entityId: e };
                  (0, o.g1)(s).then((e) => {
                    e.success &&
                      (e.result.records && e.result.records.length > 0
                        ? (this.$refs.cesiumMap.setCenter(
                            e.result.records[0].points[0],
                            e.result.records[0].maxScaling
                          ),
                          t(!0))
                        : t(!1));
                  });
                });
              },
              async getStations(e) {
                let t = {};
                const i = async (e) => {
                  let { result: t } = await (0, o.uu)({
                    entityId: e,
                    simple: !0,
                  });
                  return t;
                };
                let s = await i(e.entityId);
                for (let a of s || []) {
                  let e = await i(a.entityId);
                  if ("电厂" === a.code)
                    e.forEach((e) => {
                      t[e.code] = e.topicName;
                    });
                  else
                    for (let s of e || []) {
                      let e = await i(s.entityId);
                      e.forEach((e) => {
                        t[e.code] = e.topicName;
                      });
                    }
                }
                this.legends.forEach((e) => {
                  let i = t[e.dataCode];
                  i && this.$set(e, "topicName", i);
                }),
                  (this.loaded = !0);
              },
              toDefaultStas() {
                this.legends.forEach((e) => (e.show = !0));
              },
              async onLoadCameraList(e) {
                const { result: t } = await (0, c.Th)({
                  url: "/admin/dynamic/camera/cameraList",
                  data: { entityId: e },
                  headers: { project: "-19478" },
                });
                return t;
              },
              async onLoadTreeData(e) {
                const t = e.dataRef;
                if (t && t.children && t.children.length) return;
                const i = await this.onLoadCameraList(e.eventKey);
                return (
                  this.$set(
                    t,
                    "children",
                    i.map((e) => ({
                      ...e,
                      code: e.name,
                      children: null,
                      isLeaf: !0,
                    }))
                  ),
                  i
                );
              },
              async videoSelectCall(e) {
                this.videoExpandedKeys = [e.entityId];
              },
              async videoTreeSelect(e, t) {
                let i = t.node.dataRef;
                if (i.isLeaf) {
                  let e = this.vdoCurrPage.find(
                    (e) => e.entityId === i.entityId
                  );
                  return (
                    e
                      ? ((this.videoCurEntity = e.entityId),
                        (this.videoCurrent = e))
                      : (this.addVdoPage([i]),
                        (this.videoCurEntity = i.entityId),
                        (this.videoCurrent = i)),
                    void (this.showVideoBig = !0)
                  );
                }
                i.children &&
                  i.children.length > 0 &&
                  (this.destroyVdoPage(),
                  this.$nextTick(() => {
                    (this.videoCurEntity = null),
                      (this.videoCurrent = null),
                      (this.showVideoBig = !1),
                      this.dealVideoList(i.children);
                  }));
              },
              async clickMapGis(e) {
                if (e && e._points) {
                  let t = { longitude: e._points[0], latitude: e._points[1] };
                  if (
                    (this.$refs.cesiumMap.setCenter(t, e._maxScaling),
                    !e._topicName)
                  )
                    return;
                  let i = e._topicName.split("/"),
                    s = { parentIds: i, entityId: e._entityId };
                  if (
                    (this.$emit("loadAsyncTree", s),
                    this.isPlan ||
                      "建设" === this.pageName ||
                      "气象" === this.pageName)
                  )
                    return;
                  this._GetMenuList(e._entityId);
                }
              },
              async rtmp2flv(e) {
                let { result: t } = await (0, o.SU)({
                  rtmp: e,
                  level: 3,
                  origin: "web",
                });
                return `/${t.split("/").slice(-2).join("/")}`;
              },
              async clickMapGisVideo(e) {
                console.log("clickMapGisVideo", e);
                const { data: t, projectId: i } = e;
                (this.originGisVideo = !0),
                  (this.projectId = i),
                  (this.videoGisList = t),
                  (this.videoTotal = t.length),
                  this.dealVideoList(t);
              },
              async clickVideo(e) {
                this.originGisVideo = !1;
                let { data: t, tree: i, projectId: s, cameraGroupId: a } = e;
                if (
                  (console.log("clickVideo", e),
                  (this.projectId = s),
                  (this.cameraGroupId = a),
                  void 0 !== t && null !== t)
                )
                  if (
                    (i.length > 0 && (this.activeTab = 0),
                    (this.videoTreeList = i),
                    i.length > 0 && i[0].children && i[0].children.length > 0)
                  ) {
                    const e = await this.onLoadTreeData({
                      eventKey: i[0].children[0].entityId,
                      dataRef: i[0].children[0],
                    });
                    this.videoSelectCall(i[0].children[0]),
                      this.dealVideoList(e);
                  } else
                    this.$refs.cesiumMap &&
                      this.$refs.cesiumMap.tpModuleShow &&
                      (this.$message.warning("该风电场下没有监控数据"),
                      this.$refs.cesiumMap.handleClosePanel("video"));
              },
              async onVideoTabChange(e) {
                if ((console.log("onVideoTabChange", e), -1 === e))
                  return void this.loadCollectList();
                const t = this.videoTreeList[e];
                if (t.children) return;
                const { result: i } = await (0, o.uu)({
                  entityId: t.entityId,
                  needAttr: !0,
                });
                this.$set(t, "children", i);
              },
              async loadCollectList() {
                const { result: e } = await (0, c.Th)({
                  url: "/admin/dynamic/camera/collectionList",
                  data: { windFarmId: this.projectId },
                  headers: { project: "-19478" },
                });
                this.collectVideoDataList = e.map((e) => ({
                  ...e,
                  code: e.name,
                  isLeaf: !0,
                }));
              },
              async onCollect(e, t) {
                if (e.status) return void this.onCancelCollect(e);
                if (
                  (await (0, c.Th)({
                    url: "/admin/dynamic/camera/collect",
                    data: { entityId: e.entityId, windFarmId: this.projectId },
                    headers: { project: "-19478" },
                  }),
                  this.$message.success("已收藏"),
                  "search" === t)
                )
                  return void (e.status = !0);
                if (this.originGisVideo) {
                  const t = this.videoGisList.find(
                    (t) => t.entityId === e.entityId
                  );
                  return void (t.status = !0);
                }
                if (-1 === this.activeTab) {
                  const t = this.collectVideoDataList.find(
                    (t) => t.entityId === e.entityId
                  );
                  return void (t.status = !0);
                }
                const i = (0, h.A)(
                    this.videoTreeList[this.activeTab].children,
                    (e) => e.children || []
                  ),
                  s = i.find((t) => t.entityId === e.entityId);
                s.status = !0;
              },
              async onCancelCollect(e, t) {
                if (
                  (await (0, c.Th)({
                    url: "/admin/dynamic/camera/cancelCollect",
                    data: { entityId: e.entityId, windFarmId: this.projectId },
                    headers: { project: "-19478" },
                  }),
                  "search" === t && (e.status = !1),
                  this.$message.success("已取消收藏"),
                  this.originGisVideo)
                ) {
                  const t = this.videoGisList.find(
                    (t) => t.entityId === e.entityId
                  );
                  return void (t.status = !1);
                }
                if (-1 === this.activeTab) {
                  const t = this.collectVideoDataList.find(
                    (t) => t.entityId === e.entityId
                  );
                  return void (t.status = !1);
                }
                const i = (0, h.A)(
                    this.videoTreeList[this.activeTab].children,
                    (e) => e.children || []
                  ),
                  s = i.find((t) => t.entityId === e.entityId);
                s.status = !1;
              },
              async onToTop(e) {
                e.top
                  ? this.onCancelToTop(e)
                  : (await (0, c.Vx)({
                      url: "/admin/dynamic/camera/top",
                      data: A().stringify({ entityId: e.entityId }),
                      headers: {
                        project: "-19478",
                        "content-type": "application/x-www-form-urlencoded",
                      },
                    }),
                    this.loadCollectList());
              },
              async onCancelToTop(e) {
                await (0, c.Vx)({
                  url: "/admin/dynamic/camera/cancelTop",
                  data: A().stringify({ entityId: e.entityId }),
                  headers: {
                    project: "-19478",
                    "content-type": "application/x-www-form-urlencoded",
                  },
                }),
                  this.$message.success("已取消置顶"),
                  this.loadCollectList();
              },
              debounceLoadSearch: (0, u.A)(async function () {
                return this.loadSearchDataList();
              }, 500),
              async loadSearchDataList() {
                const { result: e } = await (0, c.Vx)({
                  url: "/admin/dynamic/camera/queryCamera",
                  data: {
                    windFarmEntityId: this.cameraGroupId,
                    queryParams: this.searchValue,
                  },
                  headers: { project: "-19478" },
                });
                this.searchDataList = e;
              },
              onPlayVideo(e) {
                this.addVdoPage([e]),
                  (this.videoCurEntity = e.entityId),
                  (this.videoCurrent = e),
                  (this.showVideoBig = !0),
                  (this.searchValue = "");
              },
              async findTree(e) {
                let t = [],
                  i = [];
                e.forEach((e) => {
                  let i = e.topicName.split("/");
                  i.pop();
                  let s = +(i.pop() || 0);
                  t.includes(s) || t.push(s);
                });
                let s = await Promise.all(
                  t.map((e) => (0, o.uu)({ entityId: e, needAttr: !0 }))
                );
                return (
                  s.forEach((t) => {
                    let s = t.result || [];
                    s.forEach((t) => {
                      1 === t.sho &&
                        "camera" === t.cdclass.keyword &&
                        e.find((e) => e.entityId === t.entityId) &&
                        i.push({
                          ...t,
                          rtmp: t.document ? t.document.etattr_rtmp : null,
                          online: !!t.document && t.document.etattr_online,
                          classKeyword: t.cdclass ? t.cdclass.keyword : null,
                        });
                    });
                  }),
                  i
                );
              },
              dealVideoList(e) {
                (this.videoCurrentPage = 1),
                  (this.videoList = e),
                  (this.videoTotal = e.length),
                  (this.showVideoBig = !1),
                  (this.showVideoListModal = !0),
                  this.$nextTick(() => {
                    (this.easyplayer = {}), this.addVdoPage(this.vdoCurrPage);
                  });
              },
              addVdoPage(e) {
                this.destroyVdoPage(),
                  this.$nextTick(() => {
                    e.forEach((e) => {
                      let t = `easyplayer-${e.entityId}`;
                      this.rtmp2flv(e.rtmp).then((e) => {
                        this.player(e, t);
                      });
                    });
                  });
              },
              player(e, t) {
                if (e && this.showVideoListModal) {
                  const i = r().createPlayer(
                    {
                      type: "flv",
                      url: e,
                      isLive: !0,
                      liveSync: !0,
                      hasAudio: !1,
                      hasVideo: !0,
                      enableStashBuffer: !0,
                      enableWorker: !0,
                      autoCleanupSourceBuffer: !0,
                      liveBufferLatencyChasing: !0,
                    },
                    { headers: { "x-access-token": (0, g.i7)("token") } }
                  );
                  i.attachMediaElement(document.getElementById(t)),
                    i.load(),
                    i.play(),
                    i.on("ERROR", (e) => {
                      console.log("player error", e);
                    }),
                    (this.easyplayer[t] = i);
                }
              },
              destroyVdoPage(e) {
                for (const t in this.easyplayer)
                  if (Object.hasOwnProperty.call(this.easyplayer, t)) {
                    const e = this.easyplayer[t];
                    console.log("destroy vdo", t, e),
                      e && (this.removeVdo(e), delete this.easyplayer[t]);
                  }
              },
              removeVdo(e) {
                e &&
                  (console.log("removeVdo flvPlayer", e),
                  e.pause(),
                  e.unload(),
                  e.detachMediaElement(),
                  e.destroy());
              },
              async packUp(e) {
                if (e.isOther) {
                  let t = `easyplayer-${e.entityId}`;
                  this.removeVdo(this.easyplayer[t]),
                    (this.easyplayer[t] = null);
                }
                (this.videoCurEntity = 0),
                  (this.showVideoBig = !1),
                  (this.videoSelectedKeys = []);
              },
              vdoFullScreen(e) {
                let t = document.getElementById("easyplayer-" + e);
                t.requestFullscreen
                  ? t.requestFullscreen()
                  : t.webkitRequestFullScreen
                  ? t.webkitRequestFullScreen()
                  : t.mozRequestFullScreen
                  ? t.mozRequestFullScreen()
                  : t.msRequestFullscreen && t.msRequestFullscreen();
              },
              vdoShrink(e) {
                let t = document.getElementById("easyplayer-" + e);
                t === this.getFullscreenElement() &&
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
              changeVideoPage(e) {
                this.showVideoBig && (this.showVideoBig = !1),
                  (this.videoCurrentPage = e),
                  this.addVdoPage(this.vdoCurrPage);
              },
              closeVideo() {
                this.$refs.devicePlayer.close(() => {
                  this.showVideoModal = !1;
                });
              },
              closeVideoList() {
                for (let e in this.easyplayer)
                  this.removeVdo(this.easyplayer[e]),
                    (this.easyplayer[e] = null);
                (this.easyplayer = {}),
                  (this.videoCurEntity = 0),
                  (this.videoTreeList = []),
                  (this.videoList = []),
                  (this.videoCurrentPage = 1),
                  (this.videoSelectedKeys = []),
                  (this.showVideoBig = !1),
                  this.$nextTick(() => {
                    this.showVideoListModal = !1;
                    const e = this.$refs.cesiumMap.tpModuleShow;
                    e &&
                      this.$refs.cesiumMap.tpFuncList.forEach((e) => {
                        "video" === e.code && this.$set(e, "status", !1);
                      });
                  });
              },
              changeWeatherType(e) {
                let t = e.topicName.split("/");
                t[t.length - 2];
                this.$router.push({
                  path: "/weather/detail",
                  query: {
                    topicName: e.topicName,
                    entityId: e.entityId,
                    desc: e.desc,
                  },
                });
              },
              removeWeather() {
                (this.weatherId = -1),
                  (this.weatherTopic = ""),
                  (this.showWeather = !1),
                  (this.showWeather = !1),
                  (this.showWeather = !1);
              },
              onOpenModal() {
                this.$refs.cesiumMap.pmShow = !this.$refs.cesiumMap.pmShow;
              },
            },
            watch: {
              multiIds: {
                handler() {
                  (this.btnList = []),
                    (this.selectedIds = []),
                    this.isPlan && this._GetPageBtn();
                },
                deep: !0,
                immediate: !0,
              },
            },
          },
          y = m,
          v = i(81656),
          C = (0, v.A)(y, s, a, !1, null, "026c5c5e", null),
          f = C.exports;
      },
      87300: function (e) {
        e.exports =
          "data:image/png;base64,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";
      },
      77820: function (e) {
        e.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKNSURBVHgB7ZgtU8NAEIY3OCqJLbZIQIItEizYaiyOwaHhL4AFSyVUUkmRRUJtKossu3TTSTe7l4+7Mp2h78xNJsnd5cne3t7eAazlpwg8NZ1OG3jZxBLzo0kURSMIpFqACNXCyx6X2KhGkJ9Y+gj8ATVVCRDBDvByhKUJ1ZRgeULQPlRUKUAEIyt1sLTATwR6g6BJ2QaFgGy1UywNCKcHhOyVqegERLgTvBwbr4dYyLcGWMb4wUmmHbkAWfsQy7bRvottnqAuIH6kDTPLSdHw3Jd1fJ5QHdAnU6ElI6NT6uwK8sP6ArM/n0BFYZ80EifKq2tXWNownl8ocDQLH+vAkbBdl/pQXp272uUAeVLEClwXPGVAxmzdcoCQH4YkBFwq7kv6b9uqvwDIDi2t9wjhJa3Y4G/nJC14KO7JegMILI4A0ooHWl0JKGPWMyxPb+J+R6skAeUaGywrUfQu7mPOjBY0B+TYJ7U0QGM93pIPshaMlU5qxbwKkpC2BVdVWcCcyTWfCKy4qEIW8Ft5vwVLEv68luXkfH4OyP4mreiboLokI0ai+bz0QRmU92F5kovCUKtUBNiyliAfcUiT/ar55QIgL0FymM8gvGSKlVgbKi3MvIj7Jv6xllnXEm8jpP+ZqX8OEP+EAOVsanPHvnCUEMjcL3FtR61Afac8O/aB5LYd5dW9q91fbZoIzppszt1d0bbT2uiQCPAVy5fc9PAs3YVZmCoTBUzIMht3F2RW6ewvXL4MqZBVjj4uPD6e6tc9YGZV7adzkHUOj6jjqqC0hFF06KXLmWNkLrO5Yt3jt/ToTdtkZaFoZaIQMtLWWQPyJjsBQx1gNgXYuGyyKyCH2O4WVk3k43zgtNb/0w/s9/BtNw1VmwAAAABJRU5ErkJggg==";
      },
      61252: function (e) {
        e.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGLSURBVHgB1VbRcYMwDBW5/pcRPAIbhA3aDcoG6QbQCRiBbtAR6AZJJ4BOEDZw7fQRdLbjs4PpXd+dTpxk60m2bEz03yClrJSclQxKnukvoIgKaaOgLaEIBCrVqCESNkFbAKQDiDpmf4dtSE6uAuaM9OjwHRl5TqlgBBYxid1LWCrpQ5bS2AqtXygGyL5hTRS8fwb5NQHvXExyEdax+yZ/zzlPQMfsrARYZ87olexpJZBAb8RuZ2fJsmpTEDoSEKj4AhdxuqNgk187nxt7kNe0EdA/l77hRl61oMTAUs8QprOdG4sSg+1v53LmcjlKJSUCOltK312gHK/WPqwnHhDzkGZgGGnlKmR3Y/wbdIqf+xN0QwHEY0Li3IgZRJziMhFGzNtAdy9X2wpEx2HH6u6qWQFn07fzzJugH32ByQ8BPZqOB8+kERO1fININ5v+c2ldah9W8QT5VPKVZdkJMebEplhijQbBC7KbbYKtgFRIcEIifFwY2MHnGHDnHiR7wKvvPWwfcnkUclhvrx/Y6rR5S5dvmQAAAABJRU5ErkJggg==";
      },
      35247: function (e) {
        e.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHTSURBVHgBxZfbUcJQEIb/PeKFGR8o4eBYAFQgjJcZq5AO1ArUCqQE7IBnZQxUIB2wdpAHZ0BJznoSLkO4JcGA/0tIstnv7J7NsgH+SYQN1X/VNdpTz4C4JHJ/eMHNNM9vBP5ydCnnq4/Za54x5eMr7ib1kRrcd7QmY6GCwtwtV/ZMOV9lTuJHIYXGUGcJNFCBDDmBTRJfiSMWRxe+R5Hq9R6FD5WUqcruOrPEEf/45MRCwxWSDm1jFBtx/+20QiQP1mMFaWQjV0oeD6r8khgcpHXgqTtSuF2xn6kX4AOd2cKLgMPC8FQtE+DCAuBaWNMo8xQsYArut4oNAt1gFyJTD8GjfTSxBZGlxlXtYdeapnrQKtqIqYKdyBbc9KfIE3YkGUp1Cs5fclsR6tiybIob+WvmSOfat6VuDy62JmEzDBnRlhn2V8EWUy71INqQtez2oHXSsweNbKF8dNErTs6W/kkIZR+1gjxGz5fJKEbGsm2YEQvOeYyMlRNixIGPtlDZdN77jAWPp4cs4Qu+Vk8glCFYhJEYPLcnfxKliNiOO4x4Jc3Kgl1ulaXx0bGvQC1ykcAkaAvQtQN8ZzLAD9/1mW9UKZjLbEfSAirNPmbf4YWvjF/TmbjiPjj6fAAAAABJRU5ErkJggg==";
      },
      80515: function (e) {
        e.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFeSURBVHgB7VexccJAEFwxFOCQzLgDHOEMEzm0XYFLcAked+ASTAUeh44kZxDZJYiMkA7EHnNifuAlnZ55CNDOHPf8H9rlTgc64NKRuG+KorijG9OuEAcr2iJJkv8DASQf0T3iNPihiLks+s7mWH3Gw19EAL/kPd1EubYCes75QF5ikeu1M13uStzDmdEJ6DcF8MYZ0n2hfWuuac+se45jBBAvtBHCIJ99x5ECZrQnhGVg1hTUKEBTeItI6LogWIB0By2l/WmnBMFyE3rJ6VLaULdEyLSp5XxonQEPOXSdhmSilQAPea4WLMIsoIJ8qpaHijAJqCKXmmvdg0VYM/DqIy8PK0S8wQCrgGUVeY2IDAaY2pAX/2BKP3W9ronL6W4Ye831EgaYfwfqiD2xJnJB91/gCtimmPWbIBL0sVywKvfcwUSmogecBt/ldLQ/msmjlwwNA8SBZHlO8gU6KDaZ7ob1YUyrzAAAAABJRU5ErkJggg==";
      },
      38064: function (e) {
        e.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADZSURBVHgBrZLNCcIwGIbfxOpNUBzAbuDFNcRDN/CknuoCik4gHsQ19OZBcAA9iAt0AaHnYvOZpBaxrcVEH0hJE94nX36AH2HqU11HvmB8Jv8a3wZJiIkY15ZaUNncCaYQwnjkNDlseVbrZMc7LYa+W5y53IBt8F5sTjDtKgErFKyuQgpQLvD2AiaUnoHaTrvOYCVQ4UOP4+xx3TcSpOFdIGQj3f8kyQnc+is8OJJs5ZKcIIwIi1MSTlESdQNqLov9S5TEQ4clFchnCUu0gLiYm4RILkhgPv7BA6y5Ta9v4+bsAAAAAElFTkSuQmCC";
      },
    },
  ]
);
