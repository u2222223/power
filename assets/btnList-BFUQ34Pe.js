import { n as s } from "./navToSafeSys-iy7GRKyM.js";
import { n } from "./index-FdyGBlLz.js";
const a = {
  props: {
    selectBtn2: { type: Boolean, default: !1 },
    selectBtn3: { type: Boolean, default: !1 },
    showShipModule: { type: Boolean, default: !1 },
  },
  data() {
    return { showBtn: true };
  },
  methods: {
    showBtnOp() {
      this.showBtn = !this.showBtn;
    },
    clickBtnFen() {
      this.$emit("update:selectBtn2", !this.selectBtn2),
        this.$emit("hiddenLeftAndRight", !this.selectBtn2),
        this.$parent.closeShip();
    },
    clickBtnWatch() {
      this.$emit("update:selectBtn3", !this.selectBtn3);
    },
    navToSafeSys: s,
  },
};
var i = function () {
    var e = this,
      t = e._self._c;
    return t("div", { staticClass: "btnListBox" }, [
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
                value: !e.selectBtn2,
                expression: "!selectBtn2",
              },
            ],
            staticClass: "btn4 selectBtnGreen",
            attrs: { title: "船舶预警" },
            on: {
              click: function (r) {
                e.$message.error("演示版暂不支持【船舶预警】功能");
                return;
                return e.$emit("switchShip", !e.showShipModule);
              },
            },
          }),
          t("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !e.selectBtn2,
                expression: "!selectBtn2",
              },
            ],
            attrs: { title: "摄像头" },
            staticClass: "btn3 selectBtnGreen",
            on: {
              click: function () {
                e.$message.error("演示版暂不支持【摄像头】功能");
                return;
              },
            },
          }),
          t("div", {
            staticClass: "btn2",
            attrs: { title: "台风" },
            class: e.selectBtn2 ? "selectBtnGreen" : "selectBtnGray",
            on: {
              click: function () {
                e.$message.error("演示版暂不支持【台风】功能");
                return;
              },
            },
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
            attrs: { title: "隐藏按钮" },
            staticClass: "btn1 selectBtnGreen",
            on: { click: e.navToSafeSys },
          }),
        ]
      ),
      t("div", { staticClass: "greenBtn", on: { click: e.showBtnOp } }),
    ]);
  },
  c = [],
  l = n(a, i, c, !1, null, "5fab12b1");
const d = l.exports;
export { d as default };
