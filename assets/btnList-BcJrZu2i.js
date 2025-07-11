import { n as s } from "./navToSafeSys-iy7GRKyM.js";
import { n } from "./index-FdyGBlLz.js";
const a = {
  props: {
    showShipModule: { type: Boolean, default: !1 },
    showVideoModal: { type: Boolean, default: !0 },
  },
  data() {
    return { showBtn: !1, selectBtn2: !1 };
  },
  watch: {
    "$route.name": function () {
      (this.showBtn = !1), (this.selectBtn2 = !1);
    },
  },
  methods: {
    showBtnOp() {
      this.showBtn = !this.showBtn;
    },
    clickBtnFen() {
      (this.selectBtn2 = !this.selectBtn2),
        document.getElementsByClassName("tp-switch")[0].click(),
        this.$parent.closeShip();
    },
    navToSafeSys: s,
  },
};
var o = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      {
        staticClass: "btnListBox",
        class: e.showShipModule && "showShipModule",
      },
      [
        t(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: e.showBtn,
                expression: "showBtn",
              },
            ],
            staticClass: "optList",
          },
          [
            t("div", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !e.selectBtn2 && e.$route.name !== "weather",
                  expression: "!selectBtn2 && !($route.name === 'weather')",
                },
              ],
              staticClass: "btn4 selectBtnGreen",
              on: {
                click: function (r) {
                  return e.$emit("switchShip", !e.showShipModule);
                },
              },
            }),
            t("div", {
              staticClass: "btn2",
              class: e.selectBtn2 ? "selectBtnGreen" : "selectBtnGray",
              on: { click: e.clickBtnFen },
            }),
            t("div", {
              directives: [
                {
                  name: "auth",
                  rawName: "v-auth",
                  value: ["/run/gdgzg"],
                  expression: "['/run/gdgzg']",
                },
                {
                  name: "show",
                  rawName: "v-show",
                  value: !e.selectBtn2,
                  expression: "!selectBtn2",
                },
              ],
              staticClass: "btn3 selectBtnGreen",
              on: { click: e.navToSafeSys },
            }),
          ]
        ),
        t("div", { staticClass: "greenBtn", on: { click: e.showBtnOp } }),
      ]
    );
  },
  i = [],
  c = n(a, o, i, !1, null, "cd8628b1");
const B = c.exports;
export { B as default };
