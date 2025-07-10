import {
  n as h,
  F as u,
  G as b,
  H as pt,
  J as S,
  K as Ct,
  M as ut,
  N as dt,
  P as k,
  Q as ht,
  S as bt,
  o as Z,
  U as kt,
  W as St,
  X as Lt,
  Y as V,
  Z as Ft,
  $ as mt,
  a0 as I,
  a1 as Tt,
  j as Dt,
  w as Et,
  l as z,
  q as Pt,
  a2 as It,
  r as Bt,
  E as W,
  x as U,
  u as jt,
  v as Mt,
  y as Yt,
  z as Ot,
  A as Rt,
  a3 as Nt,
  a4 as zt,
  a5 as Ut,
} from "./index-FdyGBlLz.js";
import {
  J as Gt,
  K as Vt,
  N as rt,
  O as st,
  Q as Qt,
  R as Ht,
  U as Xt,
  V as Q,
  W as Wt,
  X as K,
  Y as Kt,
  L as M,
  c as q,
  H as Jt,
  e as Zt,
  m as qt,
  S as $t,
  M as te,
  C as it,
  a as nt,
  P as ee,
  b as ae,
  T as re,
  l as se,
  d as ie,
  t as ne,
  f as oe,
  g as ce,
  i as J,
  _ as le,
  I as pe,
  h as ue,
  w as de,
  p as he,
  j as me,
  k as fe,
  n as ve,
  o as _e,
  s as ye,
  q as ge,
  r as xe,
  u as Ae,
  v as we,
  x as Ce,
  y as be,
  z as ke,
  A as Se,
  B as Le,
  D as Fe,
  E as Te,
  F as De,
  G as Ee,
} from "./next_cap-D3MaoXwA.js";
import { M as ot } from "./mqtt-P3cO-H_W.js";
import { h as x, s as G } from "./common-0X47MWYd.js";
import { i as Pe, g as Ie } from "./charts-CephhNnB.js";
import { w as Be } from "./data-CG0ZN9yq.js";
import { P as je } from "./ProjectProgressDialog-BUat6KiB.js";
import { s as Me } from "./search-HGKQ_zQW.js";
import { S as Ye, a as Oe } from "./swiper-CYa8Al-d.js";
import { _ as Re, I as Ne } from "./IndustryTab-DOGzF-dU.js";
import { _ as w } from "./defineProperty-EJDAiRQC.js";
import { _ as ct } from "./go1-FKcY8q87.js";
import { _ as lt } from "./close-DKk2BBKI.js";
import "./carousel-3d.common-Cm2eDS3K.js";
import "./merge-CN_KEKKw.js";
import "./mqttConfig-DcruBXJ7.js";
const { merge: ze } = Kt;
class $ extends Gt.EventEmitter {
  constructor(t) {
    var e;
    super(),
      w(this, "markers", []),
      w(this, "markerLayerOption", void 0),
      w(this, "clusterIndex", void 0),
      w(this, "points", []),
      w(this, "clusterMarkers", []),
      w(this, "mapsService", void 0),
      w(this, "scene", void 0),
      w(this, "zoom", void 0),
      w(this, "bbox", void 0),
      w(this, "inited", void 0),
      w(this, "containerSize", void 0),
      (this.markerLayerOption = ze(this.getDefault(), t)),
      Vt(["update"], this),
      (this.zoom =
        ((e = this.markerLayerOption.clusterOption) === null || e === void 0
          ? void 0
          : e.zoom) || -99);
  }
  getDefault() {
    return {
      cluster: !1,
      clusterOption: {
        radius: 80,
        maxZoom: 20,
        minZoom: 0,
        zoom: -99,
        style: {},
        className: "",
      },
    };
  }
  addTo(t) {
    return (
      (this.scene = t),
      (this.mapsService = t.mapService),
      this.markerLayerOption.cluster &&
        (this.initCluster(),
        this.update(),
        this.mapsService.on("camerachange", this.update),
        this.mapsService.on("viewchange", this.update)),
      this.mapsService.on("camerachange", this.setContainerSize.bind(this)),
      this.mapsService.on("viewchange", this.setContainerSize.bind(this)),
      this.addMarkers(),
      (this.inited = !0),
      this
    );
  }
  setContainerSize() {
    if (!this.mapsService) return;
    const t = this.mapsService.getContainer();
    this.containerSize = {
      containerWidth: (t == null ? void 0 : t.scrollWidth) || 0,
      containerHeight: (t == null ? void 0 : t.scrollHeight) || 0,
      bounds: this.mapsService.getBounds(),
    };
  }
  getContainerSize() {
    return this.containerSize;
  }
  addMarker(t) {
    const e = this.markerLayerOption.cluster;
    if (
      ((t.getMarkerLayerContainerSize = this.getContainerSize.bind(this)),
      e && (this.addPoint(t, this.markers.length), this.mapsService))
    ) {
      const a = this.mapsService.getZoom(),
        r = this.mapsService.getBounds();
      (this.bbox = rt(r, 0.5)),
        (this.zoom = Math.floor(a)),
        this.getClusterMarker(this.bbox, this.zoom);
    }
    this.markers.push(t);
  }
  removeMarker(t) {
    this.markers.indexOf(t);
    const e = this.markers.indexOf(t);
    e > -1 &&
      (this.markers.splice(e, 1),
      this.markerLayerOption.cluster &&
        (this.removePoint(e),
        this.mapsService && this.getClusterMarker(this.bbox, this.zoom)));
  }
  hide() {
    this.markers.map((t) => {
      t.getElement().style.opacity = "0";
    }),
      this.clusterMarkers.map((t) => {
        t.getElement().style.opacity = "0";
      });
  }
  show() {
    this.markers.map((t) => {
      t.getElement().style.opacity = "1";
    }),
      this.clusterMarkers.map((t) => {
        t.getElement().style.opacity = "1";
      });
  }
  getMarkers() {
    return this.markerLayerOption.cluster ? this.clusterMarkers : this.markers;
  }
  getOriginMarkers() {
    return this.markers;
  }
  addMarkers() {
    this.getMarkers().forEach((t) => {
      t.addTo(this.scene);
    });
  }
  clear() {
    this.markers.forEach((t) => {
      t.remove();
    }),
      this.clusterMarkers.forEach((t) => {
        t.remove();
      }),
      (this.markers = []),
      (this.points = []),
      (this.clusterMarkers = []);
  }
  destroy() {
    this.clear(),
      this.removeAllListeners(),
      this.mapsService.off("camerachange", this.update),
      this.mapsService.off("viewchange", this.update),
      this.mapsService.off("camerachange", this.setContainerSize.bind(this)),
      this.mapsService.off("viewchange", this.setContainerSize.bind(this));
  }
  addPoint(t, e) {
    const { lng: a, lat: r } = t.getLnglat(),
      i = {
        geometry: { type: "Point", coordinates: [a, r] },
        properties: st(st({}, t.getExtData()), {}, { marker_id: e }),
      };
    this.points.push(i),
      this.clusterIndex && this.clusterIndex.load(this.points);
  }
  removePoint(t) {
    const e = this.points.findIndex((a) => a.properties.marker_id === t);
    e > -1 && this.points.splice(e, 1),
      this.clusterIndex && this.clusterIndex.load(this.points);
  }
  initCluster() {
    if (!this.markerLayerOption.cluster) return;
    const {
      radius: t,
      minZoom: e = 0,
      maxZoom: a,
    } = this.markerLayerOption.clusterOption;
    (this.clusterIndex = new Qt({ radius: t, minZoom: e, maxZoom: a })),
      this.clusterIndex.load(this.points);
  }
  getClusterMarker(t, e) {
    const a = t[0].concat(t[1]),
      r = this.clusterIndex.getClusters(a, e);
    this.clusterMarkers.forEach((i) => {
      i.remove();
    }),
      (this.clusterMarkers = []),
      r.forEach((i) => {
        var n;
        const { field: o, method: l } = this.markerLayerOption.clusterOption;
        if ((n = i.properties) !== null && n !== void 0 && n.cluster_id) {
          var c;
          const m = this.getLeaves(
            (c = i.properties) === null || c === void 0 ? void 0 : c.cluster_id
          );
          if (((i.properties.clusterData = m), o && l)) {
            const f =
                m == null ? void 0 : m.map((A) => ({ [o]: A.properties[o] })),
              _ = Ht(f, o),
              d = Xt(l, _),
              g = "point_" + l;
            i.properties[g] = d.toFixed(2);
          }
        }
        const p = this.clusterMarker(i);
        this.clusterMarkers.push(p), p.addTo(this.scene);
      });
  }
  getLeaves(t, e = 1 / 0, a = 0) {
    return t ? this.clusterIndex.getLeaves(t, e, a) : null;
  }
  clusterMarker(t) {
    const e = this.markerLayerOption.clusterOption,
      { element: a = this.generateElement.bind(this) } = e;
    return new Q({ element: a(t) }).setLnglat({
      lng: t.geometry.coordinates[0],
      lat: t.geometry.coordinates[1],
    });
  }
  normalMarker(t) {
    const e = t.properties.marker_id;
    return this.markers[e];
  }
  update() {
    if (!this.mapsService || this.markers.length === 0) return;
    const t = this.mapsService.getZoom(),
      e = this.mapsService.getBounds();
    (!this.bbox || Math.abs(t - this.zoom) >= 1 || !Wt(this.bbox, e)) &&
      ((this.bbox = rt(e, 0.5)),
      (this.zoom = Math.floor(t)),
      this.getClusterMarker(this.bbox, this.zoom));
  }
  generateElement(t) {
    const e = K("div", "l7-marker-cluster"),
      a = K("div", "", e),
      r = K("span", "", a),
      { field: i, method: n } = this.markerLayerOption.clusterOption;
    t.properties.point_count = t.properties.point_count || 1;
    const o =
      i && n
        ? t.properties["point_" + n] || t.properties[i]
        : t.properties.point_count;
    return (r.textContent = o), e;
  }
}
const Ue = {
  __name: "ImportantProjects",
  setup(s) {
    const t = u([]);
    return (
      b(async () => {
        const e = await pt();
        e.result.projects.sort((a) => (a.city === "阳江" ? 1 : -1)),
          (t.value = e.result.projects.reduce((a, { city: r, projects: i }) => {
            if (i != null && i.length)
              for (const n of i) a.push({ city: r, ...n });
            return a;
          }, []));
      }),
      { __sfc: !0, list: t }
    );
  },
};
var Ge = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      "div",
      { attrs: { "mt-8rpx": "", "mx-13rpx": "" } },
      t._l(a.list, function (r) {
        return e(
          "div",
          {
            key: r.projectName,
            staticClass: "project-item",
            attrs: {
              flex: "",
              "justify-between": "",
              "text-white": "",
              "text-16rpx": "",
              "cursor-pointer": "",
            },
            on: {
              click: function (i) {
                return t.$emit("map-move", r);
              },
            },
          },
          [
            e("span", { staticClass: "city-item", attrs: { "shrink-0": "" } }, [
              t._v(t._s(r.city)),
            ]),
            e(
              "span",
              {
                staticClass: "city-item",
                attrs: { "grow-1": "", "ml-8rpx": "", truncate: "" },
              },
              [t._v(t._s(r.projectName))]
            ),
          ]
        );
      }),
      0
    );
  },
  Ve = [],
  Qe = h(Ue, Ge, Ve, !1, null, "61f55694");
const He = Qe.exports,
  Xe = {
    __name: "SideCard",
    props: {
      cardTitle: { type: String, default: "" },
      cardSubTitle: { type: String, default: "" },
      autoHeight: { type: Boolean, default: !0 },
    },
    setup(s) {
      return { __sfc: !0 };
    },
  };
var We = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e(
        "div",
        {
          class: { "industry-side-card": t.autoHeight },
          attrs: { flex: "", "flex-col": "" },
        },
        [
          e(
            "div",
            {
              staticClass: "industry-card-header min-h-40rpx",
              class: t.$slots.subtitle
                ? ["flex", "justify-between", "items-center", "partial"]
                : ["pt-8rpx"],
              attrs: { "pl-44rpx": "", "text-18rpx": "", "leading-none": "" },
            },
            [
              e("span", { attrs: { "text-white": "" } }, [
                t._v(t._s(t.cardTitle)),
              ]),
              t.cardSubTitle
                ? e(
                    "span",
                    {
                      staticClass: "text-#36FCFF",
                      attrs: { "inline-block": "", "ml-8rpx": "" },
                    },
                    [t._v(t._s(t.cardSubTitle))]
                  )
                : t._e(),
              t._t("subtitle"),
            ],
            2
          ),
          e(
            "div",
            { attrs: { "grow-1": "", "overflow-auto": "" } },
            [t._t("default")],
            2
          ),
        ]
      )
    );
  },
  Ke = [],
  Je = h(Xe, We, Ke, !1, null, null);
const ft = Je.exports,
  Ze = {
    __name: "SidePanel",
    props: {
      direction: { type: String, default: "left" },
      noShape: { type: Boolean, default: !1 },
    },
    setup(s) {
      return { __sfc: !0 };
    },
  };
var qe = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e(
        "div",
        {
          class: {
            "left-40/1920": t.direction === "left",
            "right-40/1920": t.direction === "right",
            "absolute top-108/920 w-440/1920 h-768/920": !t.noShape,
          },
        },
        [t._t("default")],
        2
      )
    );
  },
  $e = [],
  ta = h(Ze, qe, $e, !1, null, null);
const F = ta.exports,
  ea = {
    __name: "ThreeDPieChart",
    props: {
      list: { type: Array, default: () => [] },
      field: { type: String, default: "city" },
    },
    setup(s) {
      const t = s;
      S(
        () => t.list,
        (r) => {
          a.series[0].setData((r || []).map((i) => [i[t.field], i.total]));
        }
      );
      const e = u(null);
      let a;
      return (
        b(() => {
          a = Ct.chart(e.value, {
            colors: [
              "#00EED1",
              "#00CAEE",
              "#0067EE",
              "#C042EA",
              "#E7E018",
              "#EA42B7",
              "#3CB1FA",
              "#1EEC93",
              "#3CDF60",
              "#FFA11D",
              "#8042EA",
              "#FF6C1D",
              "#EA3626",
              "#F5225E",
              "#653CFA",
              "#7AE353",
              "#B1E12B",
              "#4E99E0",
              "#B57CFB",
            ],
            chart: {
              type: "pie",
              options3d: { enabled: !0, alpha: 66 },
              backgroundColor: "transparent",
            },
            title: { text: null },
            tooltip: {
              borderColor: "#36FCFF",
              backgroundColor: "rgb(36, 61, 108)",
              headerFormat:
                '<span style="font-size: 14px"><b>{point.key}</b></span><br/>',
              style: { color: "#fff", fontSize: "14px" },
            },
            credits: { enabled: !1 },
            plotOptions: {
              pie: {
                size: 150,
                innerSize: 96,
                depth: 25,
                center: ["50%", "30%"],
                dataLabels: {
                  enabled: !0,
                  distance: 10,
                  overflow: "justify",
                  format:
                    '<span style="color:{point.color};">{point.name}<br><span style="color: white;">{point.y}家</span></span>',
                  useHTML: !0,
                },
              },
            },
            series: [
              {
                name: "企业统计",
                data: t.list
                  .map((r) => [r[t.field], r.total])
                  .sort((r, i) => i[1] - r[1]),
                states: { inactive: { opacity: 0.4 } },
              },
            ],
          });
        }),
        ut(() => {
          try {
            a.destroy();
          } catch (r) {
            console.log(r);
          }
        }),
        { __sfc: !0, props: t, chartDom: e, chart: a }
      );
    },
  };
var aa = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e("div", {
        ref: "chartDom",
        staticClass: "industry-pie-chart-container",
        attrs: { "w-full": "", "h-full": "" },
      })
    );
  },
  ra = [],
  sa = h(ea, aa, ra, !1, null, "5dee4f2a");
const tt = sa.exports,
  ia = {
    __name: "CustomTab",
    setup(s) {
      return { __sfc: !0 };
    },
  };
var na = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e(
        "div",
        {
          attrs: {
            "h-full": "",
            flex: "",
            "flex-col": "",
            "pt-10rpx": "",
            "overflow-auto": "",
          },
        },
        [
          e(
            "div",
            {
              staticClass: "hide-scrollbar",
              attrs: {
                flex: "",
                "shrink-0": "",
                "overflow-auto": "",
                "text-16rpx": "",
                "leading-none": "",
              },
            },
            [t._t("tab")],
            2
          ),
          t._t("default"),
        ],
        2
      )
    );
  },
  oa = [],
  ca = h(ia, na, oa, !1, null, "e215c154");
const vt = ca.exports,
  la = {
    __name: "TabTag",
    props: { active: { type: Boolean, default: !1 } },
    setup(s) {
      return { __sfc: !0 };
    },
  };
var pa = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e(
        "span",
        {
          staticClass: "tab-item",
          class: { active: t.active },
          attrs: {
            relative: "",
            "min-w-100rpx": "",
            "shrink-0": "",
            "px-24rpx": "",
            "py-8rpx": "",
            "text-center": "",
            "rounded-6rpx": "",
            "cursor-pointer": "",
          },
          on: {
            click: function (a) {
              return t.$emit("click");
            },
          },
        },
        [t._t("default")],
        2
      )
    );
  },
  ua = [],
  da = h(la, pa, ua, !1, null, "f0c7b232");
const _t = da.exports,
  ha = {};
var ma = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      {
        staticClass: "tab-content",
        attrs: {
          "flex-grow-1": "",
          "mt-10rpx": "",
          "rounded-8rpx": "",
          "px-16rpx": "",
          "py-8rpx": "",
          "overflow-y-auto": "",
        },
        on: {
          click: function (a) {
            return t.$emit("click");
          },
        },
      },
      [t._t("default")],
      2
    );
  },
  fa = [],
  va = h(ha, ma, fa, !1, null, "6349c846");
const yt = va.exports,
  _a = {
    __name: "CarrierPlatform",
    setup(s) {
      const t = u([]),
        e = u("");
      b(async () => {
        const i = (await dt()).result.items;
        i.sort((n) => (n.city === "阳江" ? 1 : -1)),
          (t.value = i),
          (e.value = i[0].city);
      });
      const a = k(() => {
        var i;
        const r = t.value.find((n) => n.city === e.value);
        return (i = r == null ? void 0 : r.items) != null && i.length
          ? r.items[0]
          : {};
      });
      return {
        __sfc: !0,
        list: t,
        activeCity: e,
        selectedItem: a,
        CustomTab: vt,
        TabTag: _t,
        TabContent: yt,
      };
    },
  };
var ya = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      a.CustomTab,
      {
        scopedSlots: t._u([
          {
            key: "tab",
            fn: function () {
              return t._l(a.list, function (r) {
                return e(
                  a.TabTag,
                  {
                    key: r.city,
                    attrs: { active: r.city === a.activeCity },
                    on: {
                      click: function (i) {
                        a.activeCity = r.city;
                      },
                    },
                  },
                  [t._v(t._s(r.city))]
                );
              });
            },
            proxy: !0,
          },
        ]),
      },
      [
        e(
          a.TabContent,
          {
            attrs: { "cursor-pointer": "" },
            on: {
              click: function (r) {
                return t.$emit("map-move", a.selectedItem);
              },
            },
          },
          [
            e("div", { attrs: { "text-16rpx": "", "leading-none": "" } }, [
              t._v(t._s(a.selectedItem.carrierPlatformName)),
            ]),
            e(
              "div",
              {
                staticClass: "content-text",
                attrs: {
                  "mt-12rpx": "",
                  "text-14rpx": "",
                  "leading-20rpx": "",
                },
              },
              [t._v(" " + t._s(a.selectedItem.carrierPlatformDesc) + " ")]
            ),
          ]
        ),
      ],
      1
    );
  },
  ga = [],
  xa = h(_a, ya, ga, !1, null, "03a41c80");
const Aa = xa.exports,
  wa = {
    __name: "CreativeResource",
    setup(s) {
      const t = u([]),
        e = u("");
      b(async () => {
        const i = (await ht()).result;
        i.sort((n) => (n.city === "阳江" ? 1 : -1)),
          (t.value = i),
          (e.value = i[0].city);
      });
      const a = k(() => {
        var i;
        const r = t.value.find((n) => n.city === e.value);
        return (i = r == null ? void 0 : r.items) != null && i.length
          ? r.items[0]
          : {};
      });
      return {
        __sfc: !0,
        list: t,
        activeCity: e,
        selectedItem: a,
        CustomTab: vt,
        TabTag: _t,
        TabContent: yt,
      };
    },
  };
var Ca = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      a.CustomTab,
      {
        scopedSlots: t._u([
          {
            key: "tab",
            fn: function () {
              return t._l(a.list, function (r) {
                return e(
                  a.TabTag,
                  {
                    key: r.city,
                    attrs: { active: r.city === a.activeCity },
                    on: {
                      click: function (i) {
                        a.activeCity = r.city;
                      },
                    },
                  },
                  [t._v(t._s(r.city))]
                );
              });
            },
            proxy: !0,
          },
        ]),
      },
      [
        e(
          a.TabContent,
          {
            attrs: { "cursor-pointer": "" },
            on: {
              click: function (r) {
                return t.$emit("map-move", a.selectedItem);
              },
            },
          },
          [e("div", [t._v(t._s(a.selectedItem.innovateResourceName))])]
        ),
      ],
      1
    );
  },
  ba = [],
  ka = h(wa, Ca, ba, !1, null, null);
const Sa = ka.exports,
  La = {
    __name: "LeftSidebar",
    props: {
      province: { type: String, default: "" },
      city: { type: String, default: "" },
    },
    setup(s) {
      const t = s,
        e = u([]),
        a = u(0);
      b(() => {
        r();
      }),
        S(
          () => [t.province, t.city],
          async () => {
            r();
          }
        );
      async function r() {
        const { result: i } = await bt({ province: t.province, city: t.city });
        (e.value = i.items || []), (a.value = i.total);
      }
      return {
        __sfc: !0,
        props: t,
        enterpriseList: e,
        total: a,
        loadData: r,
        ImportantProjects: He,
        SideCard: ft,
        SidePanel: F,
        ThreeDPieChart: tt,
        CarrierPlatform: Aa,
        CreativeResource: Sa,
      };
    },
  };
var Fa = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      a.SidePanel,
      { attrs: { direction: "left" } },
      [
        e(
          a.SideCard,
          {
            attrs: {
              "card-title": "企业统计",
              "card-sub-title": `${a.enterpriseList.reduce(
                (r, i) => r + i.total,
                0
              )}家`,
            },
          },
          [e(a.ThreeDPieChart, { attrs: { list: a.enterpriseList } })],
          1
        ),
        e(
          a.SideCard,
          { attrs: { "card-title": "产业链重点项目" } },
          [
            e(a.ImportantProjects, {
              on: {
                "map-move": function (r) {
                  return t.$emit("map-move", r);
                },
              },
            }),
          ],
          1
        ),
        e(
          a.SideCard,
          { attrs: { "card-title": "产业链载体平台" } },
          [
            e(a.CarrierPlatform, {
              on: {
                "map-move": function (r) {
                  return t.$emit("map-move", r);
                },
              },
            }),
          ],
          1
        ),
        e(
          a.SideCard,
          { attrs: { "card-title": "产业链创新资源" } },
          [
            e(a.CreativeResource, {
              on: {
                "map-move": function (r) {
                  return t.$emit("map-move", r);
                },
              },
            }),
          ],
          1
        ),
      ],
      1
    );
  },
  Ta = [],
  Da = h(La, Fa, Ta, !1, null, null);
const Ea = Da.exports,
  Pa = {
    __name: "EnterpriseList",
    props: { list: { type: Array, required: !0 } },
    setup(s) {
      return { __sfc: !0 };
    },
  };
var Ia = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e(
        "div",
        {
          attrs: {
            flex: "",
            "flex-col": "",
            "mt-16rpx": "",
            "text-14rpx": "",
            "leading-none": "",
            "overflow-auto": "",
          },
        },
        [
          t._m(0),
          e(
            "div",
            { attrs: { "mb-32rpx": "", "grow-1": "", "overflow-auto": "" } },
            t._l(t.list, function (a, r) {
              return e(
                "div",
                {
                  key: a.id,
                  staticClass: "enterprise-table-row enterprise-col-container",
                },
                [
                  e("div", { attrs: { "py-10rpx": "" } }, [t._v(t._s(r + 1))]),
                  e(
                    "div",
                    {
                      attrs: {
                        "py-10rpx": "",
                        truncate: "",
                        title: a.enterpriseName,
                      },
                    },
                    [t._v(t._s(a.enterpriseName))]
                  ),
                  e(
                    "div",
                    {
                      attrs: {
                        "py-10rpx": "",
                        truncate: "",
                        title: a.linkNode,
                      },
                    },
                    [t._v(t._s(a.linkNode))]
                  ),
                  e(
                    "div",
                    { attrs: { "py-10rpx": "", truncate: "", title: a.city } },
                    [t._v(t._s(a.city))]
                  ),
                ]
              );
            }),
            0
          ),
        ]
      )
    );
  },
  Ba = [
    function () {
      var s = this,
        t = s._self._c;
      return (
        s._self._setupProxy,
        t("div", { staticClass: "enterprise-col-container" }, [
          t("div", { staticClass: "enterprise-table-header" }, [s._v("序号")]),
          t("div", { staticClass: "enterprise-table-header" }, [
            s._v("企业名称"),
          ]),
          t("div", { staticClass: "enterprise-table-header" }, [
            s._v("产业链环节"),
          ]),
          t("div", { staticClass: "enterprise-table-header" }, [s._v("地市")]),
        ])
      );
    },
  ],
  ja = h(Pa, Ia, Ba, !1, null, "86544828");
const Ma = ja.exports,
  Ya = {
    __name: "LineChart",
    props: { list: { type: Array, default: () => [] } },
    setup(s) {
      const t = s,
        e = u(null);
      S(
        () => t.list,
        (i) => {
          a.setOption(r(i));
        }
      );
      let a;
      b(async () => {
        (a = Z(e.value)), a.setOption(r(t.list));
      }),
        ut(() => {
          a.dispose();
        });
      function r(i) {
        const n = i || [];
        return {
          grid: { containLabel: !0, top: "3%", left: 0, right: 0, bottom: 0 },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 60,
              textStyle: { color: "#fff", fontSize: 10 },
            },
            data: n.map((o) =>
              o.name.length > 6 ? o.name.slice(0, 6) + "..." : o.name
            ),
            axisTick: { show: !1 },
            axisLine: { show: !1 },
            z: 10,
          },
          yAxis: {
            axisLine: { show: !1 },
            axisTick: { show: !1 },
            axisLabel: { color: "#fff" },
            splitLine: { lineStyle: { color: "rgb(26, 42, 77)" } },
          },
          tooltip: {
            padding: 10,
            backgroundColor: "rgb(36, 61, 108)",
            textStyle: { color: "#fff" },
          },
          dataZoom: [{ type: "inside" }],
          series: [
            {
              type: "bar",
              itemStyle: {
                color: new kt(0, 0, 0, 1, [
                  { offset: 0, color: "#36FCFF" },
                  { offset: 0.6, color: "#36FCFF" },
                  { offset: 1, color: "transparent" },
                ]),
                borderRadius: [20, 20, 0, 0],
              },
              barWidth: 5,
              data: n.map((o) => o.total),
            },
          ],
        };
      }
      return { __sfc: !0, props: t, chart: e, myChart: a, constructOptions: r };
    },
  };
var Oa = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e("div", { ref: "chart", attrs: { "h-214rpx": "", "mt-12rpx": "" } })
    );
  },
  Ra = [],
  Na = h(Ya, Oa, Ra, !1, null, null);
const za = Na.exports,
  Ua = {
    __name: "SectionTitle",
    props: {
      sm: { type: Boolean, default: !1 },
      partial: { type: Boolean, default: !1 },
    },
    setup(s) {
      return { __sfc: !0 };
    },
  };
var Ga = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e(
        "div",
        {
          staticClass: "section-title",
          class: {
            sm: t.sm,
            partial: t.partial,
            "flex justify-between items-center": t.$slots.right,
          },
          attrs: {
            "shrink-0": "",
            "pt-4rpx": "",
            "pb-8rpx": "",
            "pl-44rpx": "",
            "pr-16rpx": "",
            "text-white": "",
            "text-16rpx": "",
            "leading-none": "",
          },
        },
        [t._t("default"), t._t("right")],
        2
      )
    );
  },
  Va = [],
  Qa = h(Ua, Ga, Va, !1, null, "f3f8836d");
const E = Qa.exports,
  Ha = {
    __name: "RightSidebar",
    props: {
      province: { type: String, default: "" },
      city: { type: String, default: "" },
    },
    emits: ["search"],
    setup(s) {
      const t = s,
        e = u([]),
        a = u([]),
        r = u([]);
      b(async () => {
        i();
      }),
        S(
          () => [t.province, t.city],
          async () => {
            n(), o(), l();
          }
        );
      function i() {
        n(), o(), l();
      }
      async function n() {
        const p = (await St({ province: t.province, city: t.city })).result
          .items;
        e.value = p;
      }
      async function o() {
        const c = await Lt({ province: t.province, city: t.city });
        a.value = c.result.items;
      }
      async function l() {
        const c = await V({ province: t.province, city: t.city });
        r.value = c.result;
      }
      return {
        __sfc: !0,
        props: t,
        chartData: e,
        rankData: a,
        enterpriseList: r,
        loadData: i,
        loadChainList: n,
        loadRankList: o,
        loadEnterpriseList: l,
        EnterpriseList: Ma,
        LineChart: za,
        SectionTitle: E,
        SideCard: ft,
        SidePanel: F,
        ThreeDPieChart: tt,
      };
    },
  };
var Xa = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      a.SidePanel,
      { attrs: { direction: "right" } },
      [
        e(
          a.SideCard,
          {
            attrs: {
              "h-full": "",
              "card-title": "企业统计(一级)",
              "auto-height": !1,
            },
          },
          [
            e(
              "div",
              {
                attrs: {
                  flex: "",
                  "flex-col": "",
                  "h-full": "",
                  "overflow-auto": "",
                },
              },
              [
                e(
                  "div",
                  { attrs: { "shrink-0": "", "h-176rpx": "", "mt-16rpx": "" } },
                  [
                    e(a.ThreeDPieChart, {
                      attrs: { list: a.chartData, field: "name" },
                    }),
                  ],
                  1
                ),
                e(a.SectionTitle, [t._v("企业统计（二级）")]),
                e(a.LineChart, { attrs: { list: a.rankData, "shrink-0": "" } }),
                e(
                  a.SectionTitle,
                  {
                    attrs: { "mt-36rpx": "" },
                    scopedSlots: t._u([
                      {
                        key: "right",
                        fn: function () {
                          return [
                            e("img", {
                              attrs: {
                                src: Me,
                                "w-16rpx": "",
                                "h-16rpx": "",
                                "cursor-pointer": "",
                              },
                              on: {
                                click: function (r) {
                                  return t.$emit("search");
                                },
                              },
                            }),
                          ];
                        },
                        proxy: !0,
                      },
                    ]),
                  },
                  [t._v("企业列表 ")]
                ),
                e(a.EnterpriseList, {
                  attrs: { list: a.enterpriseList, "grow-1": "" },
                }),
              ],
              1
            ),
          ]
        ),
      ],
      1
    );
  },
  Wa = [],
  Ka = h(Ha, Xa, Wa, !1, null, null);
const Ja = Ka.exports,
  Za = {
    __name: "SubTitle",
    props: { title: { type: String, default: "" } },
    setup(s) {
      return { __sfc: !0 };
    },
  };
var qa = function () {
    var t = this,
      e = t._self._c;
    return (
      t._self._setupProxy,
      e(
        "div",
        { attrs: { flex: "", "justify-between": "" } },
        [
          e(
            "div",
            { staticClass: "sub-section-title", attrs: { "text-14rpx": "" } },
            [t._v(t._s(t.title))]
          ),
          t._t("default"),
        ],
        2
      )
    );
  },
  $a = [],
  tr = h(Za, qa, $a, !1, null, "74480d81");
const O = tr.exports,
  er = {
    __name: "ProviderEnterprises",
    props: { list: { type: Array, default: () => [] } },
    emits: ["highlight"],
    setup(s, { emit: t }) {
      const e = s,
        a = u(-1);
      function r(i) {
        (a.value = i), t("highlight", e.list[i]);
      }
      return {
        __sfc: !0,
        selectedIndex: a,
        props: e,
        emit: t,
        toggleEnterprise: r,
      };
    },
  };
var ar = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      "div",
      { attrs: { "h-full": "", flex: "", "flex-col": "", "mt-16rpx": "" } },
      [
        t._m(0),
        e(
          "div",
          { attrs: { "mt-8rpx": "", "grow-1": "", "overflow-auto": "" } },
          t._l(t.list, function (r, i) {
            return e(
              "div",
              {
                key: i,
                staticClass: "row-item",
                class: { active: i === a.selectedIndex },
                attrs: { flex: "", "cursor-pointer": "" },
                on: {
                  click: function (n) {
                    return a.toggleEnterprise(i);
                  },
                },
              },
              [
                e(
                  "span",
                  {
                    staticClass: "basis-150/400",
                    attrs: {
                      "pl-18rpx": "",
                      truncate: "",
                      title: r.manufacturer,
                    },
                  },
                  [t._v(t._s(r.manufacturer))]
                ),
                e(
                  "span",
                  {
                    staticClass: "basis-150/400",
                    attrs: {
                      "text-center": "",
                      truncate: "",
                      title: r.linkNodeName2,
                    },
                  },
                  [t._v(t._s(r.linkNodeName2))]
                ),
                e(
                  "span",
                  {
                    staticClass: "basis-100/400",
                    attrs: { "text-center": "", truncate: "", title: r.city },
                  },
                  [t._v(t._s(r.city))]
                ),
              ]
            );
          }),
          0
        ),
      ]
    );
  },
  rr = [
    function () {
      var s = this,
        t = s._self._c;
      return (
        s._self._setupProxy,
        t(
          "div",
          {
            staticClass: "provider-table-header",
            attrs: {
              flex: "",
              "shrink-0": "",
              "text-14rpx": "",
              "leading-none": "",
            },
          },
          [
            t(
              "span",
              { staticClass: "basis-150/400", attrs: { "pl-18rpx": "" } },
              [s._v("企业名称")]
            ),
            t(
              "span",
              { staticClass: "basis-150/400", attrs: { "text-center": "" } },
              [s._v("产业链环节")]
            ),
            t(
              "span",
              { staticClass: "basis-100/400", attrs: { "text-center": "" } },
              [s._v("地市")]
            ),
          ]
        )
      );
    },
  ],
  sr = h(er, ar, rr, !1, null, "e488cef3");
const ir = sr.exports,
  P =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABZSURBVHgB7ZRLCgAgCESlE3Vzj9RRjMCl2EdtNQ9aWW8iQyIAyhCRvlZ0XyMf9g5rjekVvd2wQrxaOCRNbgnT5UbIlXzX5D+UPlFpk0u/6YkgFJI1KgCIMwEYYr4rAIQ+wAAAAABJRU5ErkJggg==",
  nr = {
    __name: "ProviderInfo",
    props: { farm: { type: Object, default: null } },
    emits: ["highlight"],
    setup(s, { emit: t }) {
      const e = s,
        a = { ALL: 0, LOCAL: 1, NON_LOCAL: 2 },
        r = { [a.ALL]: "全部", [a.LOCAL]: "本市", [a.NON_LOCAL]: "外市" },
        i = u(a.ALL),
        n = u([]),
        o = u([]);
      let l;
      S(
        () => e.farm,
        async (f) => {
          (l = f), c(), p();
        }
      );
      async function c() {
        try {
          const { entityId: f, entityDesc: _ } = l,
            d = await Ft(f, _, i.value);
          o.value = d.result;
        } catch (f) {
          console.log(f);
        }
      }
      async function p() {
        try {
          const { entityId: f, entityDesc: _ } = l,
            d = await mt(f, _);
          n.value = d.result.items;
        } catch (f) {
          console.log(f);
        }
      }
      function m(f) {
        (i.value = f), c(), t("highlight", null);
      }
      return {
        __sfc: !0,
        props: e,
        emit: t,
        TagType: a,
        TagTypeText: r,
        activeType: i,
        chartData: n,
        enterprises: o,
        farmObject: l,
        loadEnterprise: c,
        loadChart: p,
        changeLocation: m,
        SectionTitle: E,
        SidePanel: F,
        SubTitle: O,
        ThreeDPieChart: tt,
        ProviderEnterprises: ir,
      };
    },
  };
var or = function () {
    var r, i;
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      a.SidePanel,
      {
        staticClass: "bg-provider",
        attrs: {
          direction: "right",
          "p-16rpx": "",
          "rounded-8rpx": "",
          flex: "",
          "flex-col": "",
        },
      },
      [
        e(a.SectionTitle, { attrs: { sm: "" } }, [t._v("供应信息")]),
        e("img", {
          attrs: {
            src: P,
            absolute: "",
            "top-16rpx": "",
            "right-16rpx": "",
            "cursor-pointer": "",
          },
          on: {
            click: function (n) {
              return t.$emit("close");
            },
          },
        }),
        (r = t.farm) != null && r.entityDesc
          ? [
              e(a.SubTitle, { attrs: { "mt-28rpx": "", title: "项目名称" } }),
              e(
                "div",
                {
                  attrs: {
                    "mt-16rpx": "",
                    "ml-8rpx": "",
                    "text-16rpx": "",
                    "leading-none": "",
                    "text-white": "",
                  },
                },
                [t._v(t._s((i = t.farm) == null ? void 0 : i.entityDesc))]
              ),
            ]
          : t._e(),
        e(a.SubTitle, { attrs: { "mt-16rpx": "", title: "出货地统计" } }),
        e(
          "div",
          { attrs: { "h-165rpx": "", "shrink-0": "", "mt-8rpx": "" } },
          [e(a.ThreeDPieChart, { attrs: { list: a.chartData } })],
          1
        ),
        e(a.SubTitle, { attrs: { "mt-28rpx": "", title: "供应链详情" } }, [
          e(
            "div",
            { attrs: { flex: "", "text-12rpx": "", "leading-none": "" } },
            t._l(Object.values(a.TagType), function (n) {
              return e(
                "span",
                {
                  key: n,
                  staticClass: "provider-type-tag",
                  class: { active: a.activeType === n },
                  on: {
                    click: function (o) {
                      return a.changeLocation(n);
                    },
                  },
                },
                [t._v(t._s(a.TagTypeText[n]))]
              );
            }),
            0
          ),
        ]),
        e(a.ProviderEnterprises, {
          attrs: { list: a.enterprises, "grow-1": "", "overflow-auto": "" },
          on: {
            highlight: function (n) {
              return t.$emit("highlight", n);
            },
          },
        }),
      ],
      2
    );
  },
  cr = [],
  lr = h(nr, or, cr, !1, null, "4cbc0832");
const pr = lr.exports,
  ur = {
    __name: "EnterpriseSwiper",
    props: { list: { type: Array, default: () => [] } },
    setup(s) {
      return {
        __sfc: !0,
        swiperOptions: u({
          slidesPerView: 1,
          spaceBetween: 30,
          loop: !0,
          pagination: { el: ".swiper-pagination", clickable: !0 },
        }),
        Swiper: Ye,
        SwiperSlide: Oe,
      };
    },
  };
var dr = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      "div",
      { staticClass: "enterprise-swiper", attrs: { "mt-20rpx": "" } },
      [
        e(
          a.Swiper,
          { attrs: { options: a.swiperOptions } },
          [
            t._l(t.list, function (r) {
              return e(a.SwiperSlide, { key: r }, [
                e("img", {
                  attrs: {
                    src: r,
                    "w-400rpx": "",
                    "h-196rpx": "",
                    "rounded-8rpx": "",
                  },
                }),
              ]);
            }),
            e("div", {
              staticClass: "swiper-pagination",
              attrs: { slot: "pagination" },
              slot: "pagination",
            }),
          ],
          2
        ),
      ],
      1
    );
  },
  hr = [],
  mr = h(ur, dr, hr, !1, null, "d2f9a2a3");
const H = mr.exports,
  fr = {
    __name: "EnterpriseInfo",
    setup(s, { expose: t }) {
      const e = u(null);
      t({
        show(r) {
          e.value = r;
        },
      });
      const a = k(() => {
        if (!e.value) return [];
        const { imageUrl1: r, imageUrl2: i, imageUrl3: n } = e.value;
        return [r, i, n].filter((o) => o);
      });
      return {
        __sfc: !0,
        enterprise: e,
        imgs: a,
        SectionTitle: E,
        SidePanel: F,
        SubTitle: O,
        EnterpriseSwiper: H,
      };
    },
  };
var vr = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return a.enterprise
      ? e(
          a.SidePanel,
          {
            staticClass: "bg-enterprise-info",
            attrs: {
              direction: "right",
              "p-16rpx": "",
              "rounded-8rpx": "",
              flex: "",
              "flex-col": "",
            },
          },
          [
            e(a.SectionTitle, { attrs: { partial: "" } }, [
              t._v(t._s(a.enterprise.enterpriseName)),
            ]),
            e("img", {
              attrs: {
                src: P,
                absolute: "",
                "top-16rpx": "",
                "right-16rpx": "",
                "cursor-pointer": "",
              },
              on: {
                click: function (r) {
                  return t.$emit("close");
                },
              },
            }),
            a.imgs.length
              ? e(a.EnterpriseSwiper, { attrs: { list: a.imgs } })
              : t._e(),
            a.enterprise.mainProduct
              ? [
                  e(a.SubTitle, {
                    attrs: { "mt-20rpx": "", title: "主营产品" },
                  }),
                  e(
                    "div",
                    {
                      staticClass: "enterprise-description",
                      attrs: {
                        "mt-8rpx": "",
                        "text-14rpx": "",
                        "leading-21rpx": "",
                        "indent-28rpx": "",
                      },
                    },
                    [t._v(" " + t._s(a.enterprise.mainProduct) + " ")]
                  ),
                ]
              : t._e(),
            a.enterprise.enterpriseDesc
              ? [
                  e(a.SubTitle, {
                    attrs: { "mt-20rpx": "", title: "企业简介" },
                  }),
                  e(
                    "div",
                    {
                      staticClass: "enterprise-description",
                      attrs: {
                        "mt-8rpx": "",
                        "text-14rpx": "",
                        "leading-21rpx": "",
                        "indent-28rpx": "",
                      },
                    },
                    [t._v(" " + t._s(a.enterprise.enterpriseDesc) + " ")]
                  ),
                ]
              : t._e(),
            a.enterprise.performance
              ? [
                  e(a.SubTitle, {
                    attrs: { "mt-20rpx": "", title: "项目业绩" },
                  }),
                  e(
                    "div",
                    {
                      staticClass: "enterprise-description",
                      attrs: {
                        "mt-8rpx": "",
                        "text-14rpx": "",
                        "leading-21rpx": "",
                        "indent-28rpx": "",
                      },
                    },
                    [t._v(" " + t._s(a.enterprise.performance) + " ")]
                  ),
                ]
              : t._e(),
          ],
          2
        )
      : t._e();
  },
  _r = [],
  yr = h(fr, vr, _r, !1, null, "edc82b7a");
const gr = yr.exports,
  xr =
    "data:image/png;base64,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",
  Ar = {
    __name: "EnterpriseSearch",
    props: {
      selectedProvince: { type: Object, default: void 0 },
      selectedCity: { type: Object, default: void 0 },
    },
    emits: ["show", "to-enterprise", "update-location"],
    setup(s, { expose: t, emit: e }) {
      const a = s;
      t({ close: _ });
      const r = u(),
        i = u([]);
      async function n() {
        var g;
        const { result: d } = await I({
          url: "/power/admin/dynamic/industry/map/province/query",
          data: { pid: "" },
        });
        (i.value = d),
          a.selectedProvince &&
            (r.value =
              (g = i.value.find((A) => A.uuid === a.selectedProvince)) == null
                ? void 0
                : g.dictId);
      }
      S(
        () => a.selectedProvince,
        () => {
          if (a.selectedProvince) {
            const d = i.value.find((g) => g.uuid === a.selectedProvince);
            (r.value = d == null ? void 0 : d.dictId),
              l(d == null ? void 0 : d.dictId);
          }
        }
      ),
        b(n);
      const o = u([]);
      async function l(d) {
        const { result: g } = await I({
          url: "/power/admin/dynamic/industry/map/province/query",
          data: { pid: d },
        });
        o.value = g;
      }
      const c = u(!1),
        p = u(""),
        m = u([]);
      async function f() {
        if (!p.value) {
          e("show", !1), (c.value = !1), (m.value = []);
          return;
        }
        e("show", !0), (c.value = !0);
        const d = await V({
          province: a.selectedProvince,
          city: a.selectedCity,
          enterpriseName: p.value,
        });
        (d.result = d.result.filter(
          (g, A, L) =>
            L.findIndex((B) => B.enterpriseName === g.enterpriseName) === A
        )),
          (m.value = d.result);
      }
      function _() {
        e("show", !1), (c.value = !1);
      }
      return {
        __sfc: !0,
        props: a,
        emit: e,
        province: r,
        provinceList: i,
        loadProvince: n,
        cityList: o,
        loadCitys: l,
        showDialog: c,
        searchValue: p,
        resultList: m,
        onSearch: f,
        closeDialog: _,
      };
    },
  };
var wr = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e("div", [
      e(
        "div",
        {
          attrs: {
            absolute: "",
            flex: "",
            "items-center": "",
            "top-10rpx": "",
            "right-32rpx": "",
            "z-100": "",
          },
        },
        [
          e(
            "a-select",
            {
              staticClass: "location-select",
              attrs: { "allow-clear": "", placeholder: "请选择省份" },
              on: {
                change: function (r) {
                  a.loadCitys(r);
                  const i = a.provinceList.find((n) => n.dictId === r);
                  t.$emit("update-location", [
                    {
                      field: "selectedProvince",
                      value: i == null ? void 0 : i.uuid,
                    },
                    { field: "selectedCity", value: void 0 },
                  ]);
                },
              },
              model: {
                value: a.province,
                callback: function (r) {
                  a.province = r;
                },
                expression: "province",
              },
            },
            t._l(a.provinceList, function (r) {
              return e(
                "a-select-option",
                { key: r.uuid, attrs: { value: r.dictId } },
                [t._v(t._s(r.description))]
              );
            }),
            1
          ),
          e(
            "a-select",
            {
              staticClass: "location-select",
              attrs: {
                value: t.selectedCity,
                "allow-clear": "",
                "ml-8rpx": "",
                placeholder: "请选择城市",
              },
              on: {
                change: function (r) {
                  return t.$emit("update-location", {
                    field: "selectedCity",
                    value: r,
                  });
                },
              },
            },
            t._l(a.cityList, function (r) {
              return e(
                "a-select-option",
                { key: r.uuid, attrs: { value: r.uuid } },
                [t._v(t._s(r.description))]
              );
            }),
            1
          ),
          e("a-input-search", {
            staticClass: "enterprise-search",
            attrs: {
              "w-188rpx": "",
              "shrink-0": "",
              "ml-24rpx": "",
              placeholder: "请输入企业名称",
            },
            on: {
              change: a.onSearch,
              search: function (r) {
                return t.$emit("to-enterprise", a.resultList);
              },
            },
            model: {
              value: a.searchValue,
              callback: function (r) {
                a.searchValue = r;
              },
              expression: "searchValue",
            },
          }),
          e("img", {
            attrs: {
              src: Re,
              "w-54rpx": "",
              "h-54rpx": "",
              "ml-24rpx": "",
              "cursor-pointer": "",
            },
            on: {
              click: function (r) {
                return t.$router.back();
              },
            },
          }),
        ],
        1
      ),
      a.showDialog
        ? e(
            "div",
            {
              staticClass: "top-108/920 right-40/1920 bg-black/20",
              attrs: {
                absolute: "",
                "w-440rpx": "",
                "h-750rpx": "",
                "p-16rpx": "",
                "rounded-8rpx": "",
                "z-100": "",
              },
            },
            [
              e(
                "div",
                {
                  staticClass: "search-dialog-title",
                  attrs: {
                    flex: "",
                    "h-28rpx": "",
                    "pl-42rpx": "",
                    "text-white": "",
                  },
                },
                [t._v("搜索结果")]
              ),
              e("img", {
                attrs: {
                  src: P,
                  absolute: "",
                  "top-16rpx": "",
                  "right-16rpx": "",
                  "cursor-pointer": "",
                },
                on: { click: a.closeDialog },
              }),
              e(
                "div",
                { attrs: { "mt-16rpx": "" } },
                t._l(a.resultList, function (r) {
                  return e(
                    "div",
                    {
                      key: r.id,
                      staticClass: "hover:bg-white/20",
                      attrs: {
                        flex: "",
                        "h-52rpx": "",
                        "items-center": "",
                        "px-16rpx": "",
                        "rounded-8rpx": "",
                        "cursor-pointer": "",
                      },
                      on: {
                        click: function (i) {
                          return t.$emit("to-enterprise", [r]);
                        },
                      },
                    },
                    [
                      e("img", {
                        attrs: {
                          src: xr,
                          "w-21rpx": "",
                          "h-24rpx": "",
                          "shrink-0": "",
                        },
                      }),
                      e(
                        "span",
                        {
                          attrs: {
                            "w-full": "",
                            "ml-8rpx": "",
                            "text-14rpx": "",
                            "text-white": "",
                            truncate: "",
                          },
                        },
                        [t._v(t._s(r.enterpriseName))]
                      ),
                    ]
                  );
                }),
                0
              ),
            ]
          )
        : t._e(),
    ]);
  },
  Cr = [],
  br = h(Ar, wr, Cr, !1, null, "2d809863");
const kr = br.exports,
  Sr = {
    __name: "HSelectProvince",
    props: { value: { type: String | Number, required: !0 } },
    emits: ["input", "update:record"],
    setup(s, { emit: t }) {
      const e = s,
        a = u([]),
        r = u();
      async function i() {
        const { result: o } = await I({
          url: "/power/admin/dynamic/industry/map/province/query",
          data: { pid: "" },
        });
        a.value = o;
      }
      async function n(o) {
        t("input", o),
          t(
            "update:record",
            a.value.find((l) => l.dictId == o)
          );
      }
      return (
        b(i),
        S(
          () => e.value,
          () => {
            (r.value = e.value),
              t(
                "update:record",
                a.value.find((o) => o.dictId == e.value)
              );
          }
        ),
        {
          __sfc: !0,
          provinceList: a,
          province: r,
          props: e,
          emits: t,
          loadProvince: i,
          onProvinceChange: n,
        }
      );
    },
  };
var Lr = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      "a-select",
      {
        staticClass: "custom-select",
        attrs: { "w-180rpx": "", placeholder: "请选择省份" },
        on: { change: a.onProvinceChange },
        model: {
          value: a.province,
          callback: function (r) {
            a.province = r;
          },
          expression: "province",
        },
      },
      t._l(a.provinceList, function (r) {
        return e(
          "a-select-option",
          { key: r.dictId, attrs: { value: r.dictId } },
          [t._v(t._s(r.description))]
        );
      }),
      1
    );
  },
  Fr = [],
  Tr = h(Sr, Lr, Fr, !1, null, "7f075868");
const Dr = Tr.exports,
  Er = {
    __name: "HSelectCity",
    props: {
      value: { type: String | Number, required: !0 },
      pid: { type: String | Number, required: !0 },
    },
    emits: ["input", "update:record"],
    setup(s, { emit: t }) {
      const e = s,
        a = u([]),
        r = u();
      async function i(o) {
        const { result: l } = await I({
          url: "/power/admin/dynamic/industry/map/province/query",
          data: { pid: o },
        });
        a.value = l;
      }
      async function n(o) {
        t("input", o),
          t(
            "update:record",
            a.value.find((l) => l.dictId == o)
          );
      }
      return (
        b(i),
        S(
          () => e.pid,
          () => {
            e.pid ? ((r.value = void 0), i(e.pid)) : (a.value = []);
          }
        ),
        S(
          () => e.value,
          () => {
            (r.value = e.value),
              t(
                "update:record",
                a.value.find((o) => o.dictId == e.value)
              );
          }
        ),
        {
          __sfc: !0,
          datalist: a,
          province: r,
          props: e,
          emits: t,
          loadList: i,
          onChange: n,
        }
      );
    },
  };
var Pr = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      "a-select",
      {
        staticClass: "custom-select",
        attrs: { "w-180rpx": "", placeholder: "请选择城市" },
        on: { change: a.onChange },
        model: {
          value: a.province,
          callback: function (r) {
            a.province = r;
          },
          expression: "province",
        },
      },
      t._l(a.datalist, function (r) {
        return e(
          "a-select-option",
          { key: r.dictId, attrs: { value: r.dictId } },
          [t._v(t._s(r.description))]
        );
      }),
      1
    );
  },
  Ir = [],
  Br = h(Er, Pr, Ir, !1, null, "7ae26bc5");
const jr = Br.exports,
  Mr =
    "data:image/png;base64,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",
  Yr = {
    __name: "EnterpriseDialog",
    setup(s, { expose: t }) {
      t({
        open() {
          (r.value = !0), g();
        },
      });
      const e = [
          "序号",
          "企业名称",
          "主要产品",
          "所属产业链环节",
          "所属国家",
          "所属省份",
          "所属地市",
        ],
        a = [
          "enterpriseName",
          "mainProduction",
          "linkNode",
          "country",
          "province",
          "city",
        ],
        r = u(!1),
        i = u(""),
        n = u(),
        o = u(),
        l = u(),
        c = u(),
        p = u(),
        m = u([]);
      function f(y) {
        const D = [y.indexOf("("), y.indexOf("（")].find((N) => N !== -1);
        return D === -1 ? y : y.slice(0, D);
      }
      async function _() {
        var D, N;
        const y = {
            enterpriseName: f(i.value),
            province: (D = o.value) == null ? void 0 : D.uuid,
            linkNodeUUId: p.value,
            city: (N = c.value) == null ? void 0 : N.uuid,
          },
          T = await V(y);
        (T.result || []).forEach((at) => {
          at.linkText = [
            "linkNodeName",
            "linkNodeName1",
            "linkNodeName2",
            "linkNodeName3",
          ]
            .map((X) => at[X])
            .filter((X) => X)
            .join(" > ");
        }),
          (m.value = T.result);
      }
      function d() {
        (r.value = !1), g();
      }
      function g() {
        (i.value = ""),
          (n.value = void 0),
          (l.value = void 0),
          (c.value = void 0),
          (o.value = void 0),
          (p.value = ""),
          Tt(() => {
            _();
          });
      }
      const A = u([]);
      async function L(y = "") {
        const { result: T } = await I({
          url: "/power/admin/dynamic/industry/map/structure/query",
          data: { pid: y },
        });
        return T;
      }
      b(async () => {
        const y = await L();
        A.value = y;
      });
      async function B(y) {
        console.log(y.dataRef);
        const { dictId: T } = y.dataRef,
          D = await L(T);
        return (y.dataRef.children = D), Promise.resolve(!0);
      }
      return {
        __sfc: !0,
        headers: e,
        columns: a,
        showSearch: r,
        enterpriseName: i,
        province: n,
        provinceRecord: o,
        city: l,
        cityRecord: c,
        windEIndustryValue: p,
        enterpriseList: m,
        escapeParentheses: f,
        loadData: _,
        close: d,
        reset: g,
        structureTreeData: A,
        loadStructureQuery: L,
        onLoadData: B,
        HSelectProvince: Dr,
        HSelectCity: jr,
      };
    },
  };
var Or = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return a.showSearch
      ? e("div", [
          e("div", {
            staticClass: "bg-black/60",
            attrs: {
              fixed: "",
              "top-0": "",
              "right-0": "",
              "bottom-0": "",
              "left-0": "",
              "z-101": "",
            },
            on: { click: a.close },
          }),
          e(
            "div",
            {
              staticClass:
                "dialog-container top-65/920 left-60rpx right-60rpx bottom-65rpx",
              attrs: {
                fixed: "",
                flex: "",
                "flex-col": "",
                "z-102": "",
                "p-32rpx": "",
              },
            },
            [
              t._l(4, function (r) {
                return e("span", { key: r, staticClass: "corner" });
              }),
              e("img", {
                attrs: {
                  src: P,
                  "w-24rpx": "",
                  "h-24rpx": "",
                  absolute: "",
                  "top-32rpx": "",
                  "right-32rpx": "",
                  "cursor-pointer": "",
                },
                on: { click: a.close },
              }),
              t._m(0),
              e(
                "div",
                {
                  attrs: {
                    flex: "",
                    "shrink-0": "",
                    "mt-24rpx": "",
                    "items-center": "",
                  },
                },
                [
                  e("span", { attrs: { "mr-8rpx": "", "text-white": "" } }, [
                    t._v("企业名称"),
                  ]),
                  e("a-input", {
                    staticClass: "custom-input",
                    attrs: { "w-180rpx": "", placeholder: "请输入企业名称" },
                    model: {
                      value: a.enterpriseName,
                      callback: function (r) {
                        a.enterpriseName = r;
                      },
                      expression: "enterpriseName",
                    },
                  }),
                  e(
                    "span",
                    {
                      attrs: {
                        "ml-32rpx": "",
                        "mr-8rpx": "",
                        "text-white": "",
                      },
                    },
                    [t._v("省份")]
                  ),
                  e(a.HSelectProvince, {
                    attrs: { record: a.provinceRecord },
                    on: {
                      "update:record": function (r) {
                        a.provinceRecord = r;
                      },
                    },
                    model: {
                      value: a.province,
                      callback: function (r) {
                        a.province = r;
                      },
                      expression: "province",
                    },
                  }),
                  e(
                    "span",
                    {
                      attrs: {
                        "ml-32rpx": "",
                        "mr-8rpx": "",
                        "text-white": "",
                      },
                    },
                    [t._v("城市")]
                  ),
                  e(a.HSelectCity, {
                    attrs: { record: a.cityRecord, pid: a.province },
                    on: {
                      "update:record": function (r) {
                        a.cityRecord = r;
                      },
                    },
                    model: {
                      value: a.city,
                      callback: function (r) {
                        a.city = r;
                      },
                      expression: "city",
                    },
                  }),
                  e(
                    "span",
                    {
                      attrs: {
                        "ml-32rpx": "",
                        "mr-8rpx": "",
                        "text-white": "",
                      },
                    },
                    [t._v("产业链环节")]
                  ),
                  e("a-tree-select", {
                    staticClass: "custom-select",
                    attrs: {
                      "w-180rpx": "",
                      "dropdown-style": {
                        maxHeight: "400px",
                        overflow: "auto",
                      },
                      placeholder: "请选择产业链环节",
                      "allow-clear": "",
                      "load-data": a.onLoadData,
                      treeData: a.structureTreeData,
                      replaceFields: {
                        title: "description",
                        key: "dictId",
                        value: "uuid",
                      },
                    },
                    model: {
                      value: a.windEIndustryValue,
                      callback: function (r) {
                        a.windEIndustryValue = r;
                      },
                      expression: "windEIndustryValue",
                    },
                  }),
                  e(
                    "button",
                    {
                      staticClass: "bg-#2C91FF",
                      attrs: {
                        "ml-32rpx": "",
                        "px-16rpx": "",
                        "py-10rpx": "",
                        "text-white": "",
                        "cursor-pointer": "",
                        "border-0": "",
                        "rounded-4rpx": "",
                      },
                      on: { click: a.loadData },
                    },
                    [t._v(" 查询 ")]
                  ),
                  e(
                    "button",
                    {
                      staticClass: "text-#2C91FF",
                      attrs: {
                        "ml-8rpx": "",
                        "px-16rpx": "",
                        "py-10rpx": "",
                        "cursor-pointer": "",
                        "rounded-4rpx": "",
                        "bg-transparent": "",
                        border: "~ solid #2C91FF66/40",
                      },
                      on: { click: a.reset },
                    },
                    [t._v(" 重置 ")]
                  ),
                ],
                1
              ),
              e(
                "div",
                {
                  attrs: { "grow-1": "", "mt-32rpx": "", "overflow-auto": "" },
                },
                [
                  e(
                    "div",
                    {
                      staticClass:
                        "grid grid-cols-[80fr_268fr_300fr_300fr_120fr_120fr_120fr_120fr]",
                    },
                    t._l(a.headers, function (r) {
                      return e(
                        "span",
                        {
                          key: r,
                          attrs: {
                            "p-8rpx": "",
                            "text-14rpx": "",
                            "leading-none": "",
                            "text-white": "",
                          },
                        },
                        [t._v(t._s(r))]
                      );
                    }),
                    0
                  ),
                  t._l(a.enterpriseList, function (r, i) {
                    return e(
                      "div",
                      {
                        key: r.id,
                        staticClass:
                          "grid grid-cols-[80fr_268fr_300fr_300fr_120fr_120fr_120fr_120fr]",
                        class: { "bg-#081648": i % 2 },
                      },
                      [
                        e(
                          "span",
                          {
                            attrs: {
                              "py-16rpx": "",
                              "px-8rpx": "",
                              "text-16rpx": "",
                              "leading-none": "",
                              "text-white": "",
                              truncate: "",
                            },
                          },
                          [t._v(t._s(i + 1))]
                        ),
                        t._l(a.columns, function (n) {
                          return e(
                            "span",
                            {
                              key: n,
                              attrs: {
                                "py-16rpx": "",
                                "px-8rpx": "",
                                "text-16rpx": "",
                                "leading-none": "",
                                "text-white": "",
                                truncate: "",
                                title: r[n],
                              },
                            },
                            [t._v(t._s(r[n]))]
                          );
                        }),
                      ],
                      2
                    );
                  }),
                ],
                2
              ),
            ],
            2
          ),
        ])
      : t._e();
  },
  Rr = [
    function () {
      var s = this,
        t = s._self._c;
      return (
        s._self._setupProxy,
        t(
          "div",
          {
            attrs: {
              flex: "",
              "shrink-0": "",
              "items-center": "",
              "text-white": "",
              "text-20rpx": "",
              "leading-none": "",
              "font-bold": "",
            },
          },
          [
            t("img", {
              attrs: { src: Mr, "w-44rpx": "", "h-20rpx": "", "mr-8rpx": "" },
            }),
            s._v(" 海上风电产业企业列表 "),
          ]
        )
      );
    },
  ],
  Nr = h(Yr, Or, Rr, !1, null, "cc9bb8bd");
const zr = Nr.exports,
  Ur =
    "data:image/png;base64,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",
  Gr =
    "data:image/png;base64,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",
  Vr =
    "data:image/png;base64,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",
  Qr =
    "data:image/png;base64,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",
  Hr = "" + new URL("enterprise-marker-lg-CjFiZgEh.png", import.meta.url).href,
  Xr = "" + new URL("platform-marker-Biz_ZqWu.png", import.meta.url).href,
  Wr = "" + new URL("project-marker-5rxCSNig.png", import.meta.url).href,
  Kr = "" + new URL("creative-marker-DlDezlZ2.png", import.meta.url).href,
  v = { enterprise: 0, platform: 1, project: 2, creative: 3 },
  et = () => ({
    [v.enterprise]: {
      type: v.enterprise,
      color: "#FDCE5B",
      icon: Ur,
      text: "企业",
      clusterIcon: Hr,
      visible: !0,
    },
    [v.platform]: {
      type: v.platform,
      color: "#73BCFF",
      icon: Gr,
      text: "产业平台",
      clusterIcon: Xr,
      visible: !0,
    },
    [v.project]: {
      type: v.project,
      color: "#85E48F",
      icon: Vr,
      text: "产业项目",
      clusterIcon: Wr,
      visible: !0,
    },
    [v.creative]: {
      type: v.creative,
      color: "#FF8DA6",
      icon: Qr,
      text: "创新资源",
      clusterIcon: Kr,
      visible: !0,
    },
  });
async function gt(s, t) {
  const e = await V(),
    a = $r(e.result).map((r) => ({
      ...r,
      _l7Type: v.enterprise,
      _name: r.enterpriseName,
    }));
  return R(s, a, t);
}
async function xt(s, t) {
  const a = (await dt()).result.items
    .reduce((r, i) => r.concat(i.items), [])
    .map((r) => ({ ...r, _l7Type: v.platform, _name: r.carrierPlatformName }));
  return R(s, a, t);
}
async function At(s, t) {
  const a = (await pt()).result.projects
    .reduce((r, i) => r.concat(i.projects), [])
    .map((r) => ({ ...r, _l7Type: v.project, _name: r.projectName }));
  return R(s, a, t);
}
async function wt(s, t) {
  const a = (await ht()).result
    .reduce((r, i) => r.concat(i.items), [])
    .map((r) => ({ ...r, _l7Type: v.creative, _name: r.innovateResourceName }));
  return R(s, a, t);
}
async function Jr(s, t, e) {
  let a;
  switch (t) {
    case v.enterprise:
      a = await gt(s, e);
      break;
    case v.platform:
      a = await xt(s, e);
      break;
    case v.project:
      a = await At(s, e);
      break;
    case v.creative:
      a = await wt(s, e);
      break;
    default:
      return null;
  }
  return () => s.removeMarkerLayer(a);
}
async function Zr(s, t) {
  const [e, a, r, i] = await Promise.all([
    gt(s, t),
    xt(s, t),
    At(s, t),
    wt(s, t),
  ]);
  return {
    [v.enterprise]: () => s.removeMarkerLayer(e),
    [v.platform]: () => s.removeMarkerLayer(a),
    [v.project]: () => s.removeMarkerLayer(r),
    [v.creative]: () => s.removeMarkerLayer(i),
  };
}
function R(s, t, e) {
  const a = qr(t, e);
  return s.addMarkerLayer(a), a;
}
function qr(s, t) {
  const e = new $({
    cluster: !0,
    clusterOption: {
      element(a) {
        const { properties: r } = a,
          i = document.createElement("div");
        i.onclick = () => {
          r.point_count || t(r);
        };
        const n =
          et()[r.point_count ? r.clusterData[0].properties._l7Type : r._l7Type];
        return (
          (i.innerHTML = r.point_count
            ? `<span
          class="enterprise-cluster item-name"
  style="
    display: inline-block;
    width: 32px;
    height: 32px;
    background-image: url(${n.clusterIcon});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: left top;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    color: #fff;
  "
>${r.point_count}</span>
`
            : `
          <div class="enterprise-marker" style="display: flex; align-items: center;">
            <img 
              style="width: 18px; height: 18px; margin-right: 5px;" 
              src="${n.icon}" 
            />
            <span class="item-name" style="width: 200px; line-height: 1.3; white-space: normal; font-size: 12px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; color: ${n.color};">${r._name}</span>
          </div>
        `),
          i
        );
      },
    },
  });
  for (const a of s) {
    const r = new Q({ extData: a }).setLnglat({
      lng: a.longitude,
      lat: a.latitude,
    });
    e.addMarker(r);
  }
  return e;
}
function Y(s) {
  let t = 0,
    e = 0,
    a = 0;
  if (
    (s.forEach((l) => {
      const c = (l[1] * Math.PI) / 180,
        p = (l[0] * Math.PI) / 180;
      (t += Math.cos(c) * Math.cos(p)),
        (e += Math.cos(c) * Math.sin(p)),
        (a += Math.sin(c));
    }),
    s.length === 2)
  ) {
    const l = (s[0][0] + s[1][0]) / 2,
      c = (s[0][1] + s[1][1]) / 2;
    return [l, c];
  }
  const r = s.length;
  (t = t / r), (e = e / r), (a = a / r);
  const i = Math.atan2(e, t),
    n = Math.sqrt(t * t + e * e),
    o = Math.atan2(a, n);
  return [(i * 180) / Math.PI, (o * 180) / Math.PI];
}
function $r(s) {
  const t = new Map();
  return (
    s.forEach((e) => {
      const a = `${e.enterpriseName}-${e.latitude}-${e.longitude}`;
      t.set(a, e);
    }),
    [...t.values()]
  );
}
function ts(s, t, e = "#FDCE5B") {
  const a = new M({ blend: "normal", zIndex: 97 })
    .source(t, {
      parser: {
        type: "json",
        x: "longitude",
        y: "latitude",
        x1: "toLongitude",
        y1: "toLatitude",
      },
    })
    .size(2)
    .shape("arc3d")
    .color(e)
    .animate({ interval: 0.4, trailLength: 1, duration: 2 })
    .style({ opacity: 1 });
  return (
    s.addLayer(a),
    () => {
      s.removeLayer(a);
    }
  );
}
function es(s, t, e = "#FDCE5B") {
  const a = new q({ zIndex: 97 })
    .source(t, { parser: { type: "json", x: "longitude", y: "latitude" } })
    .shape("circle")
    .color(e)
    .animate(!0)
    .size(40);
  return (
    s.addLayer(a),
    () => {
      s.removeLayer(a);
    }
  );
}
function as(s, t, e) {
  const a = t.map((i) => ({ ...i, _l7Type: v.project, _name: i.projectName })),
    r = new $();
  for (const i of a) {
    const n = document.createElement("div");
    n.onclick = () => e(i);
    const o = et()[i._l7Type];
    n.innerHTML = `
      <div class="enterprise-marker l7-infinite-marker-animation" style="display: flex; align-items: center;">
        <img 
          style="width: 18px; height: 18px; margin-right: 5px;" 
          src="${o.icon}" 
        />
        <span class="item-name" style="width: 200px; line-height: 1.3; white-space: normal; font-size: 12px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; color: ${o.color};">${i._name}</span>
      </div>
    `;
    const l = new Q({ element: n }).setLnglat({
      lng: i.longitude,
      lat: i.latitude,
    });
    r.addMarker(l);
  }
  return s.addMarkerLayer(r), () => s.removeMarkerLayer(r);
}
function rs(s, t, e) {
  const a = t.toCities || [],
    r = es(
      s,
      a.map((o) => ({ latitude: o.latitude, longitude: o.longitude })),
      "#3BFF76"
    ),
    i = ts(
      s,
      a.map((o) => ({
        latitude: t.latitude,
        longitude: t.longitude,
        toLatitude: o.latitude,
        toLongitude: o.longitude,
      })),
      "#3BFF76"
    ),
    n = R(s, [{ ...t, _l7Type: v.project, _name: t.projectName }], e);
  return () => {
    r(), i(), s.removeMarkerLayer(n);
  };
}
function ss(s, t, e) {
  if (!e.length) {
    s.setZoomAndCenter(8, t);
    return;
  }
  const a = Y([t, ...e.map((n) => [n.longitude, n.latitude])]),
    r = Math.max(
      ...e.map((n) =>
        Math.sqrt((n.longitude - a[0]) ** 2 + (n.latitude - a[1]) ** 2)
      )
    );
  let i = Math.floor(7.9 - Math.log2(r));
  i < 3.5 && (i = 3.5), s.setZoomAndCenter(i, a);
}
const is = {
  __name: "PlatformInfo",
  setup(s, { expose: t }) {
    const e = u(null);
    t({
      show(r) {
        e.value = r;
      },
    });
    const a = k(() => {
      if (!e.value) return [];
      const { imageUrl1: r, imageUrl2: i, imageUrl3: n } = e.value;
      return [r, i, n].filter((o) => o);
    });
    return {
      __sfc: !0,
      platform: e,
      imgs: a,
      SectionTitle: E,
      SidePanel: F,
      SubTitle: O,
      EnterpriseSwiper: H,
    };
  },
};
var ns = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return a.platform
      ? e(
          a.SidePanel,
          {
            staticClass: "bg-platform-info",
            attrs: {
              direction: "right",
              "p-16rpx": "",
              "rounded-8rpx": "",
              flex: "",
              "flex-col": "",
            },
          },
          [
            e(a.SectionTitle, { attrs: { partial: "" } }, [
              t._v(t._s(a.platform.carrierPlatformName)),
            ]),
            e("img", {
              attrs: {
                src: P,
                absolute: "",
                "top-16rpx": "",
                "right-16rpx": "",
                "cursor-pointer": "",
              },
              on: {
                click: function (r) {
                  return t.$emit("close");
                },
              },
            }),
            a.imgs.length
              ? e(a.EnterpriseSwiper, { attrs: { list: a.imgs } })
              : t._e(),
            a.platform.carrierPlatformDesc
              ? [
                  e(a.SubTitle, {
                    attrs: { "mt-20rpx": "", title: "平台简介" },
                  }),
                  e(
                    "div",
                    {
                      staticClass: "platform-description",
                      attrs: {
                        "mt-8rpx": "",
                        "text-14rpx": "",
                        "leading-21rpx": "",
                        "indent-28rpx": "",
                      },
                    },
                    [t._v(" " + t._s(a.platform.carrierPlatformDesc) + " ")]
                  ),
                ]
              : t._e(),
          ],
          2
        )
      : t._e();
  },
  os = [],
  cs = h(is, ns, os, !1, null, "ed9017dc");
const ls = cs.exports,
  ps = {
    __name: "OtherInfo",
    setup(s, { expose: t }) {
      const e = u(null);
      t({
        show(r) {
          e.value = r;
        },
      });
      const a = k(() => {
        if (!e.value) return [];
        const { imageUrl1: r, imageUrl2: i, imageUrl3: n } = e.value;
        return [r, i, n].filter((o) => o);
      });
      return {
        __sfc: !0,
        other: e,
        imgs: a,
        SectionTitle: E,
        SidePanel: F,
        SubTitle: O,
        EnterpriseSwiper: H,
      };
    },
  };
var us = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return a.other
      ? e(
          a.SidePanel,
          {
            staticClass: "bg-other-info",
            attrs: {
              direction: "right",
              "p-16rpx": "",
              "rounded-8rpx": "",
              flex: "",
              "flex-col": "",
            },
          },
          [
            e(a.SectionTitle, { attrs: { partial: "" } }, [
              t._v(t._s(a.other._name)),
            ]),
            e("img", {
              attrs: {
                src: P,
                absolute: "",
                "top-16rpx": "",
                "right-16rpx": "",
                "cursor-pointer": "",
              },
              on: {
                click: function (r) {
                  return t.$emit("close");
                },
              },
            }),
            a.imgs.length
              ? e(a.EnterpriseSwiper, { attrs: { list: a.imgs } })
              : t._e(),
            a.other.buildingDesc
              ? [
                  e(a.SubTitle, { attrs: { "mt-20rpx": "", title: "简介" } }),
                  e(
                    "div",
                    {
                      staticClass: "other-description",
                      attrs: {
                        "mt-8rpx": "",
                        "text-14rpx": "",
                        "leading-21rpx": "",
                        "indent-28rpx": "",
                      },
                    },
                    [t._v(" " + t._s(a.other.buildingDesc) + " ")]
                  ),
                ]
              : t._e(),
          ],
          2
        )
      : t._e();
  },
  ds = [],
  hs = h(ps, us, ds, !1, null, "a8da2209");
const ms = hs.exports,
  fs = {
    __name: "FlowInfo",
    props: {
      selectedProvince: { type: String, default: void 0 },
      selectedCity: { type: String, default: void 0 },
      flowData: { type: Array, default: () => [] },
      activeLink: { type: String, default: "全部" },
      activeDirection: { type: String, default: "全部" },
    },
    emits: [
      "close",
      "project-select",
      "update-link-type",
      "update-direction-type",
    ],
    setup(s, { emit: t }) {
      const e = s,
        a = "全部",
        r = [a, "流向本市", "流向本省"],
        i = k(() => [a, ...e.flowData.map((c) => c.name)]),
        n = k(() => {
          var c;
          return e.flowData
            ? e.activeLink === a
              ? e.flowData.reduce((p, m) => p.concat(m.projects), [])
              : ((c = e.flowData.find((m) => m.name === e.activeLink)) == null
                  ? void 0
                  : c.projects) || []
            : [];
        }),
        o = k(() =>
          e.activeDirection === a
            ? n.value
            : n.value.filter((c) => {
                switch (e.activeDirection) {
                  case "流向本市":
                    return c.isFlowToLocation;
                  case "流向本省":
                    return c.isFlowToLocalProvince;
                }
              })
        );
      function l(c) {
        const p = n.value.find((m) => m.id === c);
        t("project-select", p);
      }
      return {
        __sfc: !0,
        props: e,
        emit: t,
        all: a,
        flowDirection: r,
        tabs: i,
        enterpriseList: n,
        finalList: o,
        projectSelect: l,
        SidePanel: F,
        SectionTitle: E,
      };
    },
  };
var vs = function () {
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      a.SidePanel,
      {
        staticClass: "slide-base w-full shrink-0 bg-black/40",
        attrs: {
          "backdrop-blur-lg": "",
          direction: "right",
          "p-16rpx": "",
          "rounded-8rpx": "",
          flex: "",
          "flex-col": "",
          "no-shape": "",
        },
      },
      [
        e(a.SectionTitle, { attrs: { partial: "" } }, [t._v("产业链项目列表")]),
        e(
          "div",
          {
            directives: [{ name: "scroll", rawName: "v-scroll" }],
            staticClass: "no-scrollbar text-white/80",
            attrs: {
              flex: "",
              "mt-4": "",
              "shrink-0": "",
              "overflow-x-auto": "",
              "leading-none": "",
            },
          },
          t._l(a.tabs, function (r) {
            return e(
              "span",
              {
                key: r,
                staticClass: "tab-item shrink-0 p-2",
                class: { active: t.activeLink === r },
                on: {
                  click: function (i) {
                    return t.$emit("update-link-type", r);
                  },
                },
              },
              [t._v(t._s(r))]
            );
          }),
          0
        ),
        e(
          "div",
          {
            staticClass: "text-white/80",
            attrs: {
              flex: "",
              "justify-end": "",
              "mt-2": "",
              "shrink-0": "",
              "leading-none": "",
            },
          },
          t._l(a.flowDirection, function (r) {
            return e(
              "span",
              {
                key: r,
                staticClass: "tab-item shrink-0 p-2",
                class: { active: t.activeDirection === r },
                on: {
                  click: function (i) {
                    return t.$emit("update-direction-type", r);
                  },
                },
              },
              [t._v(t._s(r))]
            );
          }),
          0
        ),
        e(
          "div",
          { attrs: { "mt-4": "", "grow-1": "", "overflow-auto": "" } },
          t._l(a.finalList, function (r, i) {
            return e(
              "div",
              {
                key: r.id,
                staticClass: "bg-white/6",
                class: { "mt-4": i },
                attrs: {
                  border: "~ solid transparent",
                  "rounded-2": "",
                  "p-4": "",
                  "leading-none": "",
                  "cursor-pointer": "",
                },
                on: {
                  click: function (n) {
                    return a.projectSelect(r.id);
                  },
                },
              },
              [
                e(
                  "h2",
                  {
                    attrs: {
                      flex: "",
                      "justify-between": "",
                      "items-center": "",
                    },
                  },
                  [
                    e(
                      "span",
                      {
                        attrs: {
                          "mr-2": "",
                          "fw-bold": "",
                          "text-white": "",
                          "text-14px": "",
                          truncate: "",
                        },
                      },
                      [t._v(t._s(r.projectName))]
                    ),
                    e("a-icon", {
                      staticClass: "text-white/40",
                      attrs: { type: "right" },
                    }),
                  ],
                  1
                ),
                e(
                  "div",
                  {
                    staticClass: "text-white/70",
                    attrs: { flex: "", "mt-5": "", "justify-between": "" },
                  },
                  [
                    e("span", [t._v(t._s(r.industryChainStructure2))]),
                    e("span", [t._v(t._s(r.enterpriseName))]),
                  ]
                ),
              ]
            );
          }),
          0
        ),
      ],
      1
    );
  },
  _s = [],
  ys = h(fs, vs, _s, !1, null, "cbc45dc5");
const gs = ys.exports,
  xs = {
    __name: "ProjectInfo",
    setup(s, { expose: t }) {
      const e = u(null);
      t({
        show(n) {
          e.value = {
            ...n,
            production: n.production === "0" ? "暂无" : n.production,
          };
        },
      });
      const a = k(() => {
          if (!e.value) return [];
          const { imageUrl1: n, imageUrl2: o, imageUrl3: l } = e.value;
          return [n, o, l].filter((c) => c);
        }),
        r = [
          { key: "projectCityName", title: "所在地" },
          { key: "enterpriseName", title: "企业名称" },
          { key: "mainProduction", title: "主要产品" },
          { key: "production", title: "产量" },
          { key: "outputCity", title: "产品去向" },
          { key: "saleDetails", title: "产品销售情况" },
        ],
        i = k(() => (e.value ? r.filter((n) => e.value[n.key]) : []));
      return {
        __sfc: !0,
        enterprise: e,
        imgs: a,
        fields: r,
        filteredFields: i,
        SectionTitle: E,
        SidePanel: F,
        SubTitle: O,
        EnterpriseSwiper: H,
      };
    },
  };
var As = function () {
    var r;
    var t = this,
      e = t._self._c,
      a = t._self._setupProxy;
    return e(
      a.SidePanel,
      {
        staticClass: "slide-base w-full shrink-0 bg-black/40 backdrop-blur-lg",
        attrs: {
          direction: "right",
          "p-16rpx": "",
          "rounded-8rpx": "",
          flex: "",
          "flex-col": "",
          "overflow-y-auto": "",
          "no-shape": "",
        },
      },
      [
        e(a.SectionTitle, { attrs: { partial: "" } }, [
          t._v(t._s((r = a.enterprise) == null ? void 0 : r.projectName)),
        ]),
        e("img", {
          attrs: {
            src: P,
            absolute: "",
            "top-16rpx": "",
            "right-16rpx": "",
            "cursor-pointer": "",
          },
          on: {
            click: function (i) {
              return t.$emit("close");
            },
          },
        }),
        a.imgs.length
          ? e(a.EnterpriseSwiper, { attrs: { list: a.imgs } })
          : t._e(),
        t._l(a.filteredFields, function (i) {
          return e(
            "div",
            { key: i.title, staticClass: "mt-4" },
            [
              e(a.SubTitle, { attrs: { title: i.title } }),
              e(
                "div",
                {
                  staticClass: "enterprise-description",
                  attrs: {
                    "mt-8rpx": "",
                    "text-14rpx": "",
                    "leading-21rpx": "",
                    "indent-28rpx": "",
                  },
                },
                [t._v(" " + t._s(a.enterprise && a.enterprise[i.key]) + " ")]
              ),
            ],
            1
          );
        }),
      ],
      2
    );
  },
  ws = [],
  Cs = h(xs, As, ws, !1, null, "67114f57");
const bs = Cs.exports,
  ks = "" + new URL("industry-chain-header-BAsXkOGj.png", import.meta.url).href,
  Ss = {
    "total-power": ue,
    "wind-speed": de,
    "power-produce": he,
    "cumulative-power": me,
  },
  Ls = { coal_en: fe, coal: ve, co2: _e, so2: ye, pm: ge },
  Fs = { 1: xe, 2: Ae, 3: we, 4: Ce, 5: be, 6: ke },
  Ts = {
    5: "/construction-history/guangdong-province",
    6: "/construction-history/technical-advantages",
  },
  Ds = { 0: Se, 1: Le, 2: Fe },
  Es = { 0: Te, 1: De, 2: Ee },
  C = {
    Statistics: 1,
    Provider: 2,
    Enterprise: 3,
    Platform: 4,
    Other: 5,
    ProductFlow: 6,
    Project: 7,
  };
let j = [];
const Ps = {
  components: {
    History: Jt,
    ProjectProgressDialog: je,
    LeftSidebar: Ea,
    RightSidebar: Ja,
    ProviderInfo: pr,
    EnterpriseInfo: gr,
    EnterpriseSearch: kr,
    EnterpriseDialog: zr,
    PlatformInfo: ls,
    OtherInfo: ms,
    IndustryTab: Ne,
    FlowInfo: gs,
    ProjectInfo: bs,
  },
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
      bottom: { capacity1: 6685, capacity2: 570, capacity3: 132 },
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
      imageMap2: Ls,
      statisticsList: [
        {
          id: 0,
          pointId: 10002,
          text: this.$t("main.total_active_power"),
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
          value: "0",
          percent: 100,
          clunit: "MW·h",
          img: "cumulative-power",
          c0: "#CF88FC",
          c100: "#EDD0FF",
        },
      ],
      imageMap1: Ss,
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
      earAuth: Ts,
      earNMap: Fs,
      capacityMap: Ds,
      capMap: Es,
      earTopImg: Zt,
      activeDialog: C.Statistics,
      DialogType: C,
      chainLegend: Object.values(et()),
      currentFarm: null,
      showSearch: !1,
      isTraceActive: !1,
      isFlowActive: !1,
      selectedProvince: void 0,
      selectedCity: void 0,
      flowData: [],
      currentProject: null,
      flowActiveLink: "全部",
      flowActiveDirection: "全部",
      provinces: [],
      gdsCitys: [],
      farmWithData: [],
    };
  },
  computed: {
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
      let s = this.echartsGroupBy,
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
              desc: `（省管海域：${this.competInfo.number}个场址，共${this.competInfo.MW}万千瓦）`,
            },
            {
              label: "竞配",
              value: "建设",
              desc: `（国管海域：${this.competInfo.number}个场址，共${this.competInfo.MW}万千瓦）`,
            },
            {
              label: "竞配",
              value: "",
              desc: `（全省海域：省管+国管，${this.competInfo.number}个场址，共${this.competInfo.MW}万千瓦）`,
            },
          ],
        }[s] || []
      );
    },
    aeraType() {
      let s = this.$t("main.btmMenuList");
      return [
        {
          id: 0,
          code: "windfarmStatus",
          authKey: "/main/constructionStageBtn",
        },
        { id: 1, code: "city", authKey: "/main/cityDistrictBtn" },
        { id: 2, code: "ower", authKey: "/main/ownerBtn" },
        {
          id: 4,
          code: "windTurbineMill",
          authKey: "/main/windTurbineManufacturersBtn",
        },
        { id: 5, code: "capacity", authKey: "/main/capacityBtn" },
      ]
        .map((e) => ((e.title = s[e.id]), e))
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
      let [s] = (this.capacityDatas[this.capacityActive] || []).sort(
        (t, e) => e.value - t.value
      );
      return s ? s.value : 0;
    },
    gdUUID() {
      var s;
      return (s = this.provinces.find((t) => t.description === "广东省")) ==
        null
        ? void 0
        : s.uuid;
    },
    yjUUid() {
      var s;
      return (s = this.gdsCitys.find((t) => t.description === "阳江市")) == null
        ? void 0
        : s.uuid;
    },
  },
  created() {
    this.$emit("toggle-header", !1);
  },
  destroyed() {
    (this.isDestory = !0),
      this.destroyedMqtt(),
      this.$emit("toggle-header", !0);
    try {
      this.map.destroy();
    } catch (s) {
      console.log(s);
    }
  },
  async mounted() {
    const s = await this.loadProvince();
    this.provinces = s;
    const t = await this.loadProvince(s[0].dictId);
    (this.gdsCitys = t),
      (this.selectedProvince = s[0].uuid),
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
      });
  },
  methods: {
    async loadProvince(s = "") {
      const { result: t } = await I({
        url: "/power/admin/dynamic/industry/map/province/query",
        data: { pid: s },
      });
      return t;
    },
    getTimeYYYYMMDD(s) {
      return Dt(s).format("YYYY-MM-DD");
    },
    destroyedMqtt() {
      if (this.mqttTopic) {
        let s = this.mqttTopic;
        ot(s, !1, "_sea", () => {}), (this.mqttTopic = null);
      }
    },
    initMap() {
      var e;
      const s = this.$store.state.subcenterUtil.getMapCenter(),
        t = new qt.Map({
          container: this.$refs.map,
          style: "blank",
          zoom:
            (e = this.$store.state.subcenterState) != null && e.isGd ? 6.4 : 8,
          center: s,
        });
      (this.map = new $t({
        id: this.$refs.map,
        logoVisible: !1,
        map: new te({ mapInstance: t }),
      })),
        this.map.on("loaded", async () => {
          new it(nt(!1)).addToScene(this.map),
            new it(nt(!0)).addToScene(this.map),
            this.initData(this.selectVal),
            (this.mapObjectlayers = await Zr(this.map, (a) => {
              this.clickMapObject(a);
            }));
        });
    },
    clickMapObject(s) {
      switch (s._l7Type) {
        case v.platform:
          (this.activeDialog = C.Platform),
            this.$refs.platformInfoComponent.show(s);
          break;
        case v.enterprise:
          (this.activeDialog = C.Enterprise),
            this.$refs.enterpriseInfoComponent.show(s);
          break;
        default:
          (this.activeDialog = C.Other), this.$refs.otherInfoComponent.show(s);
          break;
      }
      this.$refs.topSearchComponent.close();
    },
    drawPolygen(s) {
      if (this.isDestory) return;
      let t = (e) =>
        this.selectVal === 6
          ? { companyType: e.type, companyName: e.companyName }
          : {};
      s.forEach((e, a) => {
        this.polygenList[a] = { isShow: !0, arr: [] };
        let r =
          this.selectVal === 0
            ? ["#00F2FF", "#00ff8a", "#FF8F39", "#3A54DE"]
            : this.typeColorList;
        if (e.length > 0) {
          let i = { features: [], type: "FeatureCollection" };
          if (
            (e.forEach((n, o) => {
              let l = JSON.parse(JSON.stringify(n.pointsArr)).sort(
                (c, p) => c[1] - p[1]
              );
              i.features.push({
                geometry: { coordinates: [n.pointsArr], type: "Polygon" },
                properties: {
                  ...n,
                  description:
                    (n.description ? n.description : n.entityDesc) || "",
                  capacity: n.capacity ? n.capacity : "",
                  owner: n.ower ? n.ower : "",
                  markerLatLng: l.length ? l[0] : [],
                  managementUnit: n.managementUnit,
                  projectStatus: n.project_status,
                  city: n.city,
                  leadDevelopment: n.attrMap.leadDevelopment,
                  ...t(n),
                },
                id: o,
                type: "Feature",
              });
            }),
            i.features.length > 0)
          ) {
            let n = new ee({ zIndex: 95 })
                .source(i)
                .color(r[a])
                .shape("fill")
                .active(!0)
                .style({ opacity: r[a] === "#00F2FF" ? 0.85 : 0.7 }),
              o = new M({ zIndex: 96 })
                .source(i)
                .color(r[a] === "#00F2FF" ? "#ACEAFF" : r[a])
                .size(1)
                .style({ opacity: r[a] === "#00F2FF" ? 1 : 0.9 }),
              l = null,
              c = this.$t("main.btmMenuList");
            n.on("mousemove", (p) => {
              var y;
              l && (l.close(), clearTimeout(this.mapPopupTimer)),
                (this.showHoverRow = []);
              let {
                description: m,
                capacity: f,
                owner: _,
                companyType: d,
                companyName: g,
                managementUnit: A,
                projectStatus: L,
                leadDevelopment: B,
              } = p.feature.properties;
              this.showHoverRow.push({
                key: c[5],
                val: `${this.$t("currency.MW", [f])}${this.$t("unit.MW")}`,
              }),
                A
                  ? this.showHoverRow.push(
                      { key: c[7], val: `${A}海域` },
                      { key: c[8], val: B },
                      { key: c[9], val: L, className: "prj-details" }
                    )
                  : (this.showHoverRow.push({ key: c[2], val: `${_}` }),
                    d !== "其他" &&
                      d !== "Others" &&
                      d &&
                      this.showHoverRow.push({ key: d, val: g })),
                (this.popCardInfo = { title: m }),
                (l = new ae({ offsets: [0, 0], closeButton: !1 })
                  .setLnglat(p.feature.properties.markerLatLng)
                  .setHTML(
                    (y = this.$refs.fanPopCard) == null ? void 0 : y.$el
                  )),
                this.map.addPopup(l);
            }),
              n.on("mouseout", () => {
                l &&
                  (this.mapPopupTimer = setTimeout(() => {
                    l.close();
                  }, 2e3));
              }),
              this.map.addLayer(n),
              this.map.addLayer(o),
              this.polygenList[a].arr.push(n),
              this.polygenList[a].arr.push(o),
              j.push(n, o);
          }
        }
      }),
        this.selectVal === 7 &&
          re.data.map((e) => {
            let a = {
                type: "FeatureCollection",
                features: [se(e.coordinates, e.properties)],
              },
              r = new M({ enablePropagation: !0, zIndex: 94 })
                .source(a)
                .shape("line")
                .size(2)
                .color("rgba(0,128,210, .5)")
                .style({ lineType: "dash", dashArray: [5, 5] }),
              i = new q({ zIndex: 94 })
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
            j.push(r), j.push(i), this.map.addLayer(r), this.map.addLayer(i);
          });
    },
    onShow(s) {
      if (
        ((this.polygenList[s].isShow = !this.polygenList[s].isShow),
        this.polygenList[s].arr.forEach((t) => {
          t !== null && (this.polygenList[s].isShow ? t.show() : t.hide());
        }),
        this.selectVal === 7)
      ) {
        let t = this.areaColorTypeList[s].txt;
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
    initData(s) {
      let t = [],
        e = [];
      e =
        s === 0 || s === 6
          ? ["#00F2FF", "#00ff8a", "#FF8F39", "#3A54DE"]
          : s === 3
          ? ["#3A54DE", "#F4A460", "#FF6464", "#B0C4DE"]
          : [...this.colorList];
      const a = this.areaTypeData[s]
          .map((i) => i.name)
          .findIndex((i) => i === "其他" || i === "Others"),
        r = (i) => {
          let n;
          return (
            i.name === "其他"
              ? (n = i.name)
              : (n = `${i.name}：${i.companyName}`),
            n
          );
        };
      if (a >= 0 && s !== 6) {
        const [i] = this.areaTypeData[s].splice(a, 1);
        this.areaTypeData[s].push(i),
          (e[this.areaTypeData[s].length - 1] = "#4871b3");
      }
      (this.areaColorTypeList = this.areaTypeData[s].map((i, n) => ({
        key: n,
        txt: s === 6 ? r(i) : i.name,
        color: e[n],
      }))),
        (this.typeColorList = this.areaColorTypeList.map((i) => i.color)),
        this.areaTypeData[s].forEach((i) => {
          i.loadsEntityList &&
            i.loadsEntityList.length > 0 &&
            (i.loadsEntityList.forEach((n) => {
              n.pointsArr = [];
              for (let o = 0; o < n.points.length / 3; o++) {
                let l = [n.points[o * 3], n.points[o * 3 + 1]];
                n.pointsArr.push(l);
              }
            }),
            t.push(i.loadsEntityList));
        }),
        (this._farmList = t.reduce((i, n) => i.concat(n), [])),
        this.drawPolygen(t);
    },
    async _GetNewLoads() {
      let s = {
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
        { result: t } = await Et(s);
      this.areaTypeData = t;
      let e = JSON.parse(JSON.stringify(this.areaTypeData[2])),
        a = e.findIndex((r) => r.name === "其他");
      if (a !== -1) {
        let r = e.splice(a, 1);
        this.ownerColors = [...e, ...r].map((i, n) => ({
          name: i.name,
          color: this.colorList[n],
        }));
      }
    },
    onHandleChange(s) {
      this.map && this.removeLayer(),
        (this.polygenList = []),
        (this.selectVal = s),
        this.initData(s);
    },
    removeLayer() {
      j.forEach((s) => {
        this.map.removeLayer(s);
      }),
        (j = []);
    },
    initCapacity() {
      z({
        groupByField: "etattr_ower",
        method: "sum",
        methodField: "etattr_capacity",
      }).then((t) => {
        if (t.success && t.result.length > 0) {
          let e = t.result.filter((i) => x(i._id)),
            a = { yAxis: [], colors: [] },
            r = [];
          if (
            (e.forEach((i, n) => {
              if (
                (a.yAxis.push({ name: i._id, value: i.etattr_capacity }),
                this.ownerColors.length)
              ) {
                let o = this.ownerColors.find((l) => l.name === i._id);
                if (o) a.colors.push(o.color);
                else {
                  let l = this.colorList[e.length + r.length];
                  a.colors.push(l), r.push(l);
                }
              } else a.colors.push(this.colorList[n]);
            }),
            !this.$refs.capacity_charts)
          )
            return;
          (this.capacityEcharts = Z(this.$refs.capacity_charts)),
            this.capacityEcharts.setOption(ie(a)),
            this.capacityEcharts.on("click", (i) => {
              this.drawList = this.drawList.filter(
                (n) => n.attrMap.ower === i.name
              );
            });
        }
      });
    },
    initType() {
      let s = {
        groupByField: "etattr_Manufacturer",
        method: "sum",
        methodField: "",
        topicName: "",
        sql: this.$store.state.subcenterUtil.sqlAppendAreaFuncion(
          " topicName like '19478/%' "
        ),
      };
      z(s).then((t) => {
        if (t.success && t.result.length > 0) {
          let e = t.result.filter((r) => x(r._id));
          e = e.sort((r, i) => i.count - r.count);
          let a = { yAxis: e.map((r) => r.count), xAxis: e.map((r) => r._id) };
          this.$refs.type_charts ||
            (this.typeEcharts = Z(this.$refs.type_charts)),
            this.typeEcharts.setOption(ne(a));
        }
      });
    },
    _GetDictList() {
      return Pt({ dictId: 50, pageNo: 1, pageSize: 30, field: "id" }).then(
        (t) => {
          t.success && (this.statusList = t.result.list || []);
        }
      );
    },
    _GetStatistics() {
      let s = { dynamicType: 1, dynamicPoint: Ut, needData: !0 };
      this.mqttTopic ||
        It(s).then((t) => {
          if (t.success) {
            this.mqttTopic = t.result.dynamicTopicName;
            let e = t.result.data;
            this._GetTopicData(e),
              ot(this.mqttTopic, !0, "_sea", (a) => {
                this._GetTopicData(a);
              });
          }
        });
    },
    _GetTopicData(s) {
      if (s !== void 0) {
        this.statisticsList.forEach((e) => {
          if (
            ((e.value = s[19478][e.pointId]),
            e.pointId === 10001 &&
              (e.value = (
                Number(e.value) +
                (Math.random() * (0.3 - 0.1) + 0.1)
              ).toFixed(2)),
            e.pointId === 10003)
          ) {
            let a = ((Number(e.value) / 1e3) * 305.5) / 1e4,
              r = a * 10500;
            this.saveBiaomei.push(a * 1e4),
              this.co2.push(a * 2.6604 * 1e4),
              this.so2.push(((r * 35) / 1e5) * 1e3),
              this.increase.push(((r * 10) / 1e5) * 1e3);
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
        let t = s[19478][10010];
        x(t) &&
          t !== this.fengjiStr &&
          ((this.fengjiStr = t),
          this.$nextTick(() => {
            if (this.$refs.chartEle) {
              this.weatherEharts ||
                (this.weatherEharts = Pe(this.$refs.chartEle)),
                this.weatherEharts.clear();
              let e = this.getSource();
              this.weatherEharts.setOption(
                Ie({ pieData: e, unit: ` ${this.$t("unit.set")}`, angle: 260 })
              ),
                (this.weatherEharts._model.option.pieData = e);
            }
          }));
      }
    },
    getSource() {
      let s = JSON.parse(this.fengjiStr),
        t = 0,
        e = [];
      for (let a in s)
        if (a) {
          t += s[a];
          let r = Be.find((i) => i.code === a);
          r &&
            e.push({
              name:
                this.$store.state.app.language === "en-GB"
                  ? this.$t(`custom_wind_turbine_code.${r.code}`)
                  : r.text,
              value: s[a],
              itemStyle: { opacity: 1, color: this.pieColors[a] },
            });
        }
      return (this.total = t), e.sort((a, r) => r.value - a.value);
    },
    async industryData() {
      let s = await Bt({});
      s.success && (this.investAmount = s.result);
    },
    parseAmount(s) {
      return s && parseFloat(s) ? +parseFloat(s).toFixed(2) : "";
    },
    initPut() {
      let s = {
        needDoc: !0,
        entityId: W.OTHER,
        windfarmStatus: "运营",
        subCenter: this.$store.state.subcenterResource.area || void 0,
      };
      return U(s).then((t) => {
        if (t.success) {
          this.top.put = t.result.total;
          let e = t.result.records;
          if (e && e.length > 0) {
            let a = e.map((r) => ({
              name: this.isEng
                ? r.document.etattr_enName
                : r.document.etattr_abbreviationName || r.desc || r.code,
              value: r.document.etattr_capacity,
              entityId: r.entityId,
            }));
            (this.bottom.capacity3 = G(a.map((r) => r.value))),
              this.$set(this.capacityDatas, "put", a);
          }
        }
      });
    },
    initBuild() {
      let s = {
        needDoc: !0,
        entityId: W.OTHER,
        windfarmStatus: "建设",
        subCenter: this.$store.state.subcenterResource.area || void 0,
      };
      return U(s).then((t) => {
        if (
          t.success &&
          ((this.top.build = t.result.total),
          t.result.records && t.result.records.length > 0)
        ) {
          let a = t.result.records.map((r) => ({
            name: this.isEng ? r.document.etattr_enName : r.desc || r.code,
            value: r.document.etattr_capacity,
            entityId: r.entityId,
          }));
          (this.bottom.capacity2 = G(a.map((r) => r.value))),
            this.$set(this.capacityDatas, "build", a);
        }
      });
    },
    initPlan() {
      let s = {
        needDoc: !0,
        entityId: W.PLAN,
        windfarmStatus: "规划",
        subCenter: this.$store.state.subcenterResource.area || void 0,
      };
      return U(s).then((t) => {
        if (
          t.success &&
          ((this.top.plan = t.result.total),
          t.result.records && t.result.records.length > 0)
        ) {
          let a = t.result.records.map((r) => ({
            name: this.isEng ? r.document.etattr_enName : r.desc || r.code,
            value: r.document.etattr_capacity,
            entityId: r.entityId,
          }));
          (this.bottom.capacity1 = G(a.map((r) => r.value))),
            this.$set(this.capacityDatas, "plan", a);
        }
      });
    },
    countPlanCapacity() {
      let s = Object.values(this.bottom);
      this.countTxt = G(s).toFixed(2);
    },
    async _GetExecute(s) {
      let { result: t } = await jt({ entityId: s });
      this.tableList.forEach((e, a) => {
        switch (e.code) {
          case "desc":
            this.tableList[a].value = t.desc || t.code || "/";
            break;
          case "co2":
            this.tableList[a].value = x(t.etattr_capacity)
              ? (t.etattr_capacity * 10 * 3500 * 1e3 * 832) / 1e3 / 1e3 + "t"
              : "/";
            break;
          case "so2":
            this.tableList[a].value = x(t.etattr_capacity)
              ? (t.etattr_capacity * 10 * 3500 * 1e3 * 0.16) / 1e3 / 1e3 + "t"
              : "/";
            break;
          case "no2":
            this.tableList[a].value = x(t.etattr_capacity)
              ? (t.etattr_capacity * 10 * 3500 * 1e3 * 0.179) / 1e3 / 1e3 + "t"
              : "/";
            break;
          case "smoke":
            this.tableList[a].value = x(t.etattr_capacity)
              ? (t.etattr_capacity * 10 * 3500 * 1e3 * 0.032) / 1e3 / 1e3 + "t"
              : "/";
            break;
          case "etattr_investmentTotal":
          case "etattr_GDP":
            this.tableList[a].value = x(this.tableList[a].value)
              ? (this.tableList[a].value / 1e4).toFixed(2)
              : "/";
            break;
          default:
            this.tableList[a].value = x(t[e.code]) ? t[e.code] : "/";
        }
      });
    },
    async onOpenCapacity(s) {
      this.farmDevelopment = {};
      const [, t] = await Promise.all([
        this._GetExecute(s.entityId),
        Mt(s.entityId),
      ]);
      (this.farmDevelopment = t.result),
        (this.putTitle = s.name),
        this.$refs.projectProgress.open();
    },
    onMoreClick(s) {
      (this.projectText = s),
        (this.putProject = !0),
        (this.current = 1),
        (this.typeVal = s),
        this.onReset();
    },
    _GetExecuteMore(s, t, e) {
      (this.putProjectData.length = 0),
        U(s).then((a) => {
          a.success &&
            ((this.putProjectData = a.result.slice((t - 1) * 10, e * t)),
            this.putProjectData.forEach((r) => {
              r.etattr_windfarmStatus === "运营"
                ? this.$set(r, "type", "投产项目")
                : r.etattr_windfarmStatus === "建设"
                ? this.$set(r, "type", "在建项目")
                : r.etattr_windfarmStatus === "规划" &&
                  this.$set(r, "type", "规划项目");
            }),
            (this.totalNum = a.result.length),
            (this.countCapacity = a.result
              .filter((r) => x(r.etattr_capacity))
              .reduce((r, i) => r + i.etattr_capacity, 0)),
            (this.countFan = a.result
              .filter((r) => x(r.etattr_fanCount))
              .reduce((r, i) => r + Number(i.etattr_fanCount), 0)),
            (this.countArea = a.result
              .filter((r) => x(r.etattr_seaArea))
              .reduce((r, i) => r + Number(i.etattr_seaArea), 0)),
            (this.countMoney = a.result
              .filter((r) => x(r.etattr_investmentTotal))
              .reduce((r, i) => r + Number(i.etattr_investmentTotal), 0)),
            (this.countGDP = a.result
              .filter((r) => x(r.etattr_GDP))
              .reduce((r, i) => r + Number(i.etattr_GDP), 0)));
        });
    },
    async _GetSelectList() {
      let { result: s } = await Yt({}),
        { city: t, fanStyle: e, ower: a, windTurbineMill: r } = s;
      (this.ownerData = a),
        (this.cityData = t),
        (this.modelData = e),
        (this.manufactureData = r);
    },
    onPageChange(s, t) {
      this._GetData(s, t);
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
    _GetData(s, t) {
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
        this._GetExecuteMore(this.params, s, t);
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
    onPutStartChange(s) {
      this.startY = s.format("YYYY");
    },
    onPutEndChange(s) {
      this.endY = s.format("YYYY");
    },
    onBuildStartChange(s) {
      this.startBuildY = s.format("YYYY");
    },
    onBuildEndChange(s) {
      this.endBuildY = s.format("YYYY");
    },
    onCapacityBtn() {
      if (this.echartsGroupBy === "designer")
        this._GetDesignerGroupCount(this.capBtnActive);
      else if (this.echartsGroupBy === "compete")
        this._GetCompeteCount(this.capBtnActive);
      else {
        const s = this.capBtnGroup[this.capBtnActive];
        this._GetCapacityCount(s.value);
      }
    },
    onEcheartClick(s) {
      if (s === "history") {
        this.showHistory = !0;
        return;
      }
      (this.capBtnActive = 0),
        (this.echartsGroupBy = s),
        (this.capacityEchearts = !0),
        s === "designer"
          ? this._GetDesignerGroupCount(this.capBtnActive)
          : s === "compete"
          ? this._GetCompeteCount(this.capBtnActive)
          : this._GetCapacityCount(this.capBtnGroup[this.capBtnActive].value);
    },
    _GetDesignerGroupCount(s) {
      function t(a, r) {
        return a.reduce((i, n) => ((i[n[r]] = i[n[r]] || []).push(n), i), {});
      }
      Ot({ windFarmStatus: ["运营", "建设", ""][s] || "" }).then((a) => {
        if (a.success) {
          const { result: r } = a;
          let i = [],
            n = t(r, "companyType");
          Object.keys(n).map((c) => {
            let p = t(n[c], "desc"),
              f = Object.keys(p)
                .map((_) => ({ name: _, value: p[_].capacity, h: 0 }))
                .sort((_, d) => _.name.localeCompare(d.name));
            i.push({
              name: `${c}${c !== "其他" ? `: ${n[c][0].companyName}` : ""}`,
              value: n[c].reduce((_, d) => (_ += d.capacity), 0),
              otherData: f || [],
            });
          });
          let o = ["总承包方", "勘测设计方", "前期设计", "其他"],
            l = {
              yAxis: i.sort((c, p) => {
                let m =
                    o.indexOf(c.name.split(":")[0]) === -1
                      ? 99
                      : o.indexOf(c.name.split(":")[0]),
                  f = o.indexOf(p.name.split(":")[0]);
                return m - f;
              }),
              colors: ["#1EEDFD", "#00FE84", "#FD893E", "#2C91FF"],
            };
          if (!this.$refs.input_capacity_charts) return;
          (this.inputCapEcharts = this.$echarts.init(
            this.$refs.input_capacity_charts
          )),
            this.inputCapEcharts.setOption(oe(l), { notMerge: !0 });
        }
      });
    },
    _GetCompeteCount(s = 3) {
      let e = { managementUnit: { 0: 1, 1: 2, 3: "" }[s] };
      Rt(e).then((a) => {
        const { data: r, size: i, totalCapacity: n } = a.result;
        let o = r.map((c) => ({
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
        this.competInfo = { number: i, MW: n };
        let l = { yAxis: o };
        this.$refs.input_capacity_charts &&
          ((this.inputCapEcharts = this.$echarts.init(
            this.$refs.input_capacity_charts
          )),
          this.inputCapEcharts.setOption(ce(l), { notMerge: !0 }));
      });
    },
    cancelXiaZuan() {
      this.xiaZuan &&
        (this.echartsGroupBy === "city" &&
          this.inputCapEcharts.setOption(
            J(this.cancelData[this.echartsGroupBy]),
            { notMerge: !0 }
          ),
        (this.xiaZuan = !1));
    },
    async getAllProject(s, t) {
      let e = t.map((r) =>
          z({
            groupByField: "desc",
            method: "sum",
            methodField: "etattr_capacity",
            topicName: "",
            windfarmStatus: s,
          })
        ),
        a = await Promise.all(e);
      return (
        t.forEach((r, i) => {
          r.childArr = a[i].result;
        }),
        t
      );
    },
    _GetCapacityCount(s) {
      window.onresize = () => {
        this.inputCapEcharts === null || this.inputCapEcharts.resize();
      };
      let t = {
        groupByField: `etattr_${this.echartsGroupBy}`,
        windfarmStatus: s,
        method: "sum",
        methodField: "etattr_capacity",
        topicName: "",
        sql: this.$store.state.subcenterUtil.sqlAppendAreaFuncion(
          `etattr_windfarmStatus='${s}' AND mdclass_code='windfarm' AND etattr_enable='是' AND etattr_participationStatistics =  `
        ),
      };
      z(t).then(async (e) => {
        if (e.success && e.result.length > 0) {
          let a = e.result.filter((o) => x(o._id));
          await this.getAllProject(s, a);
          const r = (o) => {
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
          let i = r(a);
          if (!this.$refs.input_capacity_charts) return;
          (this.inputCapEcharts = this.$echarts.init(
            this.$refs.input_capacity_charts
          )),
            (this.cancelData[this.echartsGroupBy] = i),
            this.inputCapEcharts.setOption(J(i), { notMerge: !0 }),
            this.inputCapEcharts.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0,
            });
          let n = this;
          this.inputCapEcharts.on("click", function (o) {
            if (n.xiaZuan || n.echartsGroupBy !== "city") return;
            n.xiaZuanItem = o;
            let l = r(o.data.item.childArr),
              c = J(l);
            (c.legend.show = !1),
              n.inputCapEcharts.setOption(c, { notMerge: !0 }),
              (n.xiaZuan = !0);
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
    earsMore(s) {
      switch (s) {
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
    moveMapCenter(s) {
      this.map.setZoomAndCenter(8, [s.longitude, s.latitude]),
        setTimeout(() => {
          [...document.querySelectorAll(".enterprise-marker")]
            .find((e) => {
              const a = [
                "enterpriseName",
                "carrierPlatformName",
                "projectName",
                "innovateResourceName",
              ].find((r) => s[r]);
              return a && e.querySelector(".item-name").textContent === s[a];
            })
            .classList.add("l7-marker-animation");
        }, 1200);
    },
    onSearchChange(s) {
      (this.showSearch = s),
        s ||
          (this.removeSearchMarkers &&
            (this.removeSearchMarkers(), (this.removeSearchMarkers = null)));
    },
    markEnterprises(s) {
      this.removeSearchMarkers &&
        (this.removeSearchMarkers(), (this.removeSearchMarkers = null));
      const t = new $();
      for (const e of s) {
        const a = new Q({ color: "#f64835" }).setLnglat([
          e.longitude,
          e.latitude,
        ]);
        t.addMarker(a);
      }
      this.map.addMarker(t),
        (this.removeSearchMarkers = () => this.map.removeMarkerLayer(t)),
        s.length === 1 && this.map.setCenter([s[0].longitude, s[0].latitude]);
    },
    async toggleTrace(s) {
      if (((this.isTraceActive = !this.isTraceActive), this.isTraceActive)) {
        this.isFlowActive && this.toggleFlow(!1),
          this.toggleAllLegend(!1),
          this.$refs.topSearchComponent.close();
        const t = await Nt(),
          e = t.result.windForms
            .map((r) => this._farmList.find((i) => i.entityId === r.entityId))
            .filter(Boolean);
        this.farmWithData = e;
        const a = new q({ zIndex: 97 })
          .source(
            e.map((r) => {
              var o, l;
              const i = t.result.windForms.find(
                  (c) => c.entityId === r.entityId
                ),
                n = [
                  (o = i.gis) == null ? void 0 : o.longitude,
                  (l = i.gis) == null ? void 0 : l.latitude,
                ];
              return { ...r, longitude: n[0], latitude: n[1] };
            }),
            { parser: { type: "json", x: "longitude", y: "latitude" } }
          )
          .shape("circle")
          .color("#FDCE5B")
          .animate(!0)
          .size(40);
        a.on("click", async (r) => {
          if ((console.log(r), !this.isTraceActive)) return;
          (this.currentFarm = r.feature),
            (this.activeDialog = C.Provider),
            this.rmFlyLine && (this.rmFlyLine(), (this.rmFlyLine = null)),
            this.rmHighlightLine &&
              (this.rmHighlightLine(), (this.rmHighlightLine = null));
          const i = await mt(
              this.currentFarm.entityId,
              this.currentFarm.entityDesc
            ),
            n = new M({ blend: "normal", zIndex: 97 })
              .source(
                i.result.items.map((o) => ({
                  ...o,
                  toLongitude: Y(this.currentFarm.pointsArr)[0],
                  toLatitude: Y(this.currentFarm.pointsArr)[1],
                })),
                {
                  parser: {
                    type: "json",
                    x: "longitude",
                    y: "latitude",
                    x1: "toLongitude",
                    y1: "toLatitude",
                  },
                }
              )
              .size(2)
              .shape("arc3d")
              .color("#FDCE5B")
              .animate({ interval: 0.4, trailLength: 1, duration: 2 })
              .style({ opacity: 0.5 });
          this.map.addLayer(n),
            (this.rmFlyLine = () => {
              this.map.removeLayer(n);
            }),
            this.map.setZoomAndCenter(5.5, [114, 22.6]);
        }),
          this.map.addLayer(a),
          (this.rmActiveFarm = () => this.map.removeLayer(a)),
          this.map.setZoomAndCenter(8.8, [111.9, 21.1]);
        return;
      }
      s !== !1 && this.toggleAllLegend(!0),
        this.rmActiveFarm && this.rmActiveFarm(),
        (this.rmActiveFarm = null),
        this.rmFlyLine && this.rmFlyLine(),
        (this.rmFlyLine = null),
        this.rmHighlightLine && this.rmHighlightLine(),
        (this.rmHighlightLine = null),
        (this.activeDialog = C.Statistics),
        this.map.setZoomAndCenter(6.4, [114, 22.6]);
    },
    async toggleFlow(s) {
      var t, e;
      if (((this.isFlowActive = !this.isFlowActive), this.isFlowActive)) {
        this.rmFlow && (this.rmFlow(), (this.rmFlow = null)),
          s !== !1 &&
            ((this.flowActiveLink = "全部"),
            (this.flowActiveDirection = "全部")),
          this.isTraceActive && this.toggleTrace(!1),
          (this.cachedLocation = [
            { field: "selectedProvince", value: this.selectedProvince },
            { field: "selectedCity", value: this.selectedCity },
          ]),
          (this.selectedProvince = this.gdUUID),
          (this.selectedCity = this.yjUUid),
          this.toggleAllLegend(!1),
          (this.activeDialog = C.ProductFlow),
          this.$refs.topSearchComponent.close();
        const r =
          (
            await zt({
              projectProvince: this.gdUUID,
              projectCity: this.selectedCity,
            })
          ).result.items || [];
        this.flowData = r;
        let i =
          this.flowActiveLink === "全部"
            ? r.reduce((o, l) => o.concat(l.projects), [])
            : ((t = r.find((o) => o.name === this.flowActiveLink)) == null
                ? void 0
                : t.projects) || [];
        if (this.flowActiveDirection !== "全部")
          switch (this.flowActiveDirection) {
            case "流向本市":
              i = i.filter((o) => o.isFlowToLocation);
              break;
            case "流向本省":
              i = i.filter((o) => o.isFlowToLocalProvince);
              break;
          }
        for (const o of i)
          o.outputCity =
            ((e = o.toCities) == null
              ? void 0
              : e.map((l) => l.name).join("、")) || "";
        const n = as(this.map, i, (o) => this.moveToProject(o));
        (this.rmFlow = () => {
          n();
        }),
          this.map.setZoomAndCenter(13, [i[0].longitude, i[0].latitude]);
        return;
      }
      (this.activeDialog = C.Statistics),
        s !== !1 && this.toggleAllLegend(!0),
        this.rmFlow && (this.rmFlow(), (this.rmFlow = null)),
        this.isTraceActive ||
          (this.map.setZoomAndCenter(6.4, [114, 22.6]),
          this.cachedLocation && this.updateLocation(this.cachedLocation));
    },
    toggleAllLegend(s) {
      for (const t of this.chainLegend) this.toggleLegend(t, s);
    },
    updateLocation(s) {
      if (Array.isArray(s)) for (const { field: a, value: r } of s) this[a] = r;
      const { field: t, value: e } = s;
      (this[t] = e),
        this.isFlowActive &&
          ((this.flowActiveLink = "全部"), (this.flowActiveDirection = "全部"));
    },
    async toggleLegend(s, t) {
      const e = this.mapObjectlayers[s.type];
      if (
        (t === void 0 ? (s.visible = !s.visible) : (s.visible = t), s.visible)
      ) {
        const a = await Jr(this.map, s.type, (r) => this.clickMapObject(r));
        this.mapObjectlayers[s.type] = a;
      } else e();
    },
    highlightTraceLine(s) {
      if (
        (this.rmHighlightLine &&
          (this.rmHighlightLine(), (this.rmHighlightLine = null)),
        !s)
      )
        return;
      const t = new M({ blend: "normal", zIndex: 97 })
        .source(
          [
            {
              longitude: s.cityLongitude,
              latitude: s.cityLatitude,
              toLongitude: Y(this.currentFarm.pointsArr)[0],
              toLatitude: Y(this.currentFarm.pointsArr)[1],
            },
          ],
          {
            parser: {
              type: "json",
              x: "longitude",
              y: "latitude",
              x1: "toLongitude",
              y1: "toLatitude",
            },
          }
        )
        .size(4)
        .shape("arc3d")
        .color("red")
        .animate({ interval: 0.4, trailLength: 1, duration: 2 })
        .style({ opacity: 1 });
      this.map.addLayer(t),
        (this.rmHighlightLine = () => {
          this.map.removeLayer(t);
        });
    },
    moveToProject(s) {
      this.rmFlow && this.rmFlow(),
        (this.rmFlow = rs(this.map, s, (t) => {
          this.showProjectDetail(t);
        })),
        ss(this.map, [s.longitude, s.latitude], s.toCities || []),
        this.showProjectDetail(s);
    },
    showProjectDetail(s) {
      (this.activeDialog = C.Project),
        (this.currentProject = s),
        this.$refs.projectInfoComponent.show(s);
    },
    resetFlow() {
      (this.activeDialog = C.ProductFlow),
        (this.isFlowActive = !1),
        this.toggleFlow(!1);
    },
    updateLinkType(s) {
      (this.flowActiveLink = s), this.resetFlow();
    },
    updateDirectionType(s) {
      (this.flowActiveDirection = s), this.resetFlow();
    },
  },
};
var Is = function () {
    var t = this,
      e = t._self._c;
    return e(
      "div",
      {
        staticClass: "container-parent",
        class: {
          "no-mask": t.isTraceActive || t.isFlowActive,
          "right-mask": t.activeDialog === t.DialogType.Provider,
        },
      },
      [
        e("img", {
          attrs: {
            src: ks,
            absolute: "",
            "top-0": "",
            "w-full": "",
            "z-7": "",
          },
        }),
        e(
          "div",
          { attrs: { absolute: "", "top-0": "", "left-0": "" } },
          [e("IndustryTab")],
          1
        ),
        e("LeftSidebar", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !t.isTraceActive && !t.isFlowActive,
              expression: "!isTraceActive && !isFlowActive",
            },
          ],
          attrs: { province: t.selectedProvince, city: t.selectedCity },
          on: { "map-move": t.moveMapCenter },
        }),
        e(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !t.showSearch,
                expression: "!showSearch",
              },
            ],
          },
          [
            e(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !t.isTraceActive && !t.isFlowActive,
                    expression: "!isTraceActive && !isFlowActive",
                  },
                ],
              },
              [
                e("RightSidebar", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.activeDialog === t.DialogType.Statistics,
                      expression: "activeDialog === DialogType.Statistics",
                    },
                  ],
                  attrs: { province: t.selectedProvince, city: t.selectedCity },
                  on: {
                    search: function (a) {
                      return t.$refs.enterpriseDialogComponent.open();
                    },
                  },
                }),
                e("EnterpriseInfo", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.activeDialog === t.DialogType.Enterprise,
                      expression: "activeDialog === DialogType.Enterprise",
                    },
                  ],
                  ref: "enterpriseInfoComponent",
                  on: {
                    close: function (a) {
                      t.activeDialog = t.DialogType.Statistics;
                    },
                  },
                }),
                e("PlatformInfo", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.activeDialog === t.DialogType.Platform,
                      expression: "activeDialog === DialogType.Platform",
                    },
                  ],
                  ref: "platformInfoComponent",
                  on: {
                    close: function (a) {
                      t.activeDialog = t.DialogType.Statistics;
                    },
                  },
                }),
                e("OtherInfo", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.activeDialog === t.DialogType.Other,
                      expression: "activeDialog === DialogType.Other",
                    },
                  ],
                  ref: "otherInfoComponent",
                  on: {
                    close: function (a) {
                      t.activeDialog = t.DialogType.Statistics;
                    },
                  },
                }),
              ],
              1
            ),
            e("ProviderInfo", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: t.activeDialog === t.DialogType.Provider,
                  expression: "activeDialog === DialogType.Provider",
                },
              ],
              attrs: { farm: t.currentFarm },
              on: {
                close: function (a) {
                  t.activeDialog = t.DialogType.Statistics;
                },
                highlight: t.highlightTraceLine,
              },
            }),
            e(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.isFlowActive,
                    expression: "isFlowActive",
                  },
                ],
                staticClass:
                  "absolute top-108/1080 right-40/1920 flex w-440/1920 h-768/920 overflow-hidden",
              },
              [
                e("FlowInfo", {
                  class:
                    t.activeDialog === t.DialogType.Project
                      ? "-translate-x-1/2 opacity-0"
                      : null,
                  attrs: {
                    "flow-data": t.flowData,
                    "selected-city": t.selectedCity,
                    "selected-province": t.selectedProvince,
                    "active-link": t.flowActiveLink,
                    "active-direction": t.flowActiveDirection,
                  },
                  on: {
                    close: function (a) {
                      t.activeDialog = t.DialogType.Statistics;
                    },
                    "project-select": t.moveToProject,
                    "update-link-type": t.updateLinkType,
                    "update-direction-type": t.updateDirectionType,
                  },
                }),
                e("ProjectInfo", {
                  ref: "projectInfoComponent",
                  class:
                    t.activeDialog === t.DialogType.Project
                      ? "-translate-x-full"
                      : null,
                  on: { close: t.resetFlow },
                }),
              ],
              1
            ),
          ],
          1
        ),
        e("EnterpriseSearch", {
          ref: "topSearchComponent",
          attrs: {
            "selected-city": t.selectedCity,
            "selected-province": t.selectedProvince,
          },
          on: {
            show: t.onSearchChange,
            "to-enterprise": t.markEnterprises,
            "update-location": t.updateLocation,
          },
        }),
        e("EnterpriseDialog", { ref: "enterpriseDialogComponent" }),
        e(
          "div",
          {
            staticClass: "bottom-105/920",
            class:
              t.isTraceActive && t.activeDialog !== t.DialogType.Provider
                ? "right-46rpx"
                : "right-516/1920",
            attrs: { absolute: "" },
          },
          [
            t._l(t.chainLegend, function (a, r) {
              return e(
                "div",
                {
                  key: a.text,
                  class: { "mt-16rpx": r },
                  style: { opacity: a.visible ? 1 : 0.5 },
                  attrs: { flex: "", "items-center": "", "cursor-pointer": "" },
                  on: {
                    click: function (i) {
                      return t.toggleLegend(a);
                    },
                  },
                },
                [
                  e("img", {
                    attrs: { "w-16rpx": "", "h-16rpx": "", src: a.icon },
                  }),
                  e(
                    "span",
                    {
                      style: { color: a.color },
                      attrs: {
                        "ml-8rpx": "",
                        "text-12rpx": "",
                        "leading-none": "",
                        "select-none": "",
                      },
                    },
                    [t._v(t._s(a.text))]
                  ),
                ]
              );
            }),
            e(
              "div",
              {
                staticClass: "trace",
                class: { active: t.isTraceActive },
                attrs: {
                  "w-90rpx": "",
                  "h-28rpx": "",
                  "mt-16rpx": "",
                  "leading-28rpx": "",
                  "text-center": "",
                  "text-white": "",
                  border: "~ solid",
                  "rounded-6rpx": "",
                  "cursor-pointer": "",
                },
                on: { click: t.toggleTrace },
              },
              [t._v(" 供应溯源 ")]
            ),
            e(
              "div",
              {
                staticClass: "trace",
                class: { active: t.isFlowActive },
                attrs: {
                  "w-90rpx": "",
                  "h-28rpx": "",
                  "mt-16rpx": "",
                  "leading-28rpx": "",
                  "text-center": "",
                  "text-white": "",
                  border: "~ solid",
                  "rounded-6rpx": "",
                  "cursor-pointer": "",
                },
                on: { click: t.toggleFlow },
              },
              [t._v(" 产品流向 ")]
            ),
          ],
          2
        ),
        e("div", { ref: "map", staticClass: "map noLogo" }),
        e("div", { staticClass: "bottom-menu" }, [
          e("div", { staticClass: "aera_list" }, [
            e(
              "div",
              { staticClass: "aera_color" },
              t._l(t.areaColorTypeList, function (a, r) {
                return e(
                  "div",
                  {
                    key: a.key,
                    staticClass: "aera_box",
                    on: {
                      click: function (i) {
                        return t.onShow(r);
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
            t._l(t.aeraType, function (a, r) {
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
                  key: r,
                  class: { "area-active": t.selectVal === a.id },
                  on: {
                    click: function (i) {
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
                e("img", { staticClass: "logo", attrs: { src: ct, alt: "" } }),
                e("span", { staticClass: "title" }, [
                  t._v("项目 "),
                  t.projectText
                    ? e("span", [t._v("- " + t._s(t.projectText))])
                    : t._e(),
                ]),
                e("img", {
                  staticClass: "icon",
                  attrs: { src: lt },
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
                        t._l(t.ownerData, function (a, r) {
                          return e(
                            "a-select-option",
                            {
                              key: r,
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
                        t._l(t.cityData, function (a, r) {
                          return e(
                            "a-select-option",
                            {
                              key: r,
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
                        t._l(t.modelData, function (a, r) {
                          return e(
                            "a-select-option",
                            {
                              key: r,
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
                        t._l(t.typeData, function (a, r) {
                          return e(
                            "a-select-option",
                            {
                              key: r,
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
                        t._l(t.manufactureData, function (a, r) {
                          return e(
                            "a-select-option",
                            {
                              key: r,
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
                      t._l(t.putProjectData, function (a, r) {
                        return e("tr", { key: r }, [
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
                  e("img", {
                    staticClass: "logo",
                    attrs: { src: ct, alt: "" },
                  }),
                  e("span", { staticClass: "title text-red" }, [
                    t._v(
                      "广东省海上风电" +
                        t._s(t.capBtnGroup[t.capBtnActive].label) +
                        "项目容量占比情况" +
                        t._s(t.capBtnGroup[t.capBtnActive].desc) +
                        t._s(t.xiaZuanName)
                    ),
                  ]),
                  e("img", {
                    staticClass: "icon",
                    attrs: { src: lt },
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
                          [e("img", { attrs: { src: le, title: "上一个" } })]
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
                          [e("img", { attrs: { src: pe, title: "下一个" } })]
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
                return t._l(t.showHoverRow, function (a, r) {
                  return e(
                    "div",
                    { key: r, staticClass: "const-row", class: a.className },
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
  Bs = [],
  js = h(Ps, Is, Bs, !1, null, "29df93f6");
const qs = js.exports;
export { qs as default };
