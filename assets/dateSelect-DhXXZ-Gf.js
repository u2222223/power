import { n as i, j as s } from "./index-FdyGBlLz.js";
const c =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAbVJREFUOE/VlL9OFFEUxn/fLCpLgRIT1l1wRzexMHQUUhufQKFDK4iN+gzoM0hlsCHSKT6BsZaCilgZ3GH/zFpBKNYlZvczo25CcMZMNjSe7t77nd+95zu5R5yJsOMVzIZh7qCsz2fPk3U19pxgjwGr0Yxen9YIW9WYx4i7ggJQA+YNHwSHaUDDlOAesAvsG/qYjwdlXqna9qbEI6CH+W5xSTABHJMI0yO5eNLQlTlBFIFxw6bC2MZs6YTV+k31wthPgZd9WGiWtZPGm419pwCfgGdRWes3vnrcRTYwy7+BAQ+ikt4nyZWWr48FPAmu8bwu9VKBDReDMdb6F1lvXVUz0YTffJ8B28MXLkUVvcsoL9d22PYi4u1/CEwMl6hl9ndoQAFs9oeNyyw57PgQcyWXceYoqmjqV1OyPJxt+FYQEOYBDi5Qb07ryz+BeUBpmuyS275N4iE4LVEFduvT6vw1A7JKDmMfAZczX2q2o4oW8wNbnndATcmHTIkfZqc9o0Zu4Ll7eD7AgIdRSVujwv4Mh2UGvFHYdhfRsVkTdEeBGiYkXgAlVWMvCZIxPjkK7FTOsWHlJwAeBVav9Bj4AAAAAElFTkSuQmCC",
  d = {
    props: {
      defaultItem: { type: Number, default: 2 },
      calendarBox: { type: String, default: "calendarBox" },
      onlyTab: { type: Boolean, default: !1 },
    },
    data() {
      return {
        selectedKey: "",
        selectArr: [
          { id: 0, checkId: 1, label: "未处理", isSelect: !0, realVal: !1 },
          { id: 1, checkId: 0, label: "已处理", isSelect: !0, realVal: !0 },
        ],
        selectDate: [],
        dateList: [
          {
            text: "本日",
            dateType: 1,
            key: "day",
            getTimeArr() {
              const t = s(s().startOf("day").valueOf()).format("YYYY-MM-DD");
              return [t, t];
            },
          },
          {
            text: "本周",
            dateType: 4,
            key: "week",
            getTimeArr() {
              const t = s(
                  s().week(s().week()).startOf("week").valueOf()
                ).format("YYYY-MM-DD"),
                e = s(s().startOf("day").valueOf()).format("YYYY-MM-DD");
              return [t, e];
            },
          },
          {
            text: "本月",
            dateType: 2,
            key: "month",
            getTimeArr() {
              const t = s(
                  s().month(s().month()).startOf("month").valueOf()
                ).format("YYYY-MM-DD"),
                e = s(s().startOf("day").valueOf()).format("YYYY-MM-DD");
              return [t, e];
            },
          },
          {
            text: "本年",
            dateType: 3,
            key: "year",
            getTimeArr() {
              const t = s(
                  s().year(s().year()).startOf("year").valueOf()
                ).format("YYYY-MM-DD"),
                e = s(s().startOf("day").valueOf()).format("YYYY-MM-DD");
              return [t, e];
            },
          },
        ],
      };
    },
    created() {
      this.dateChange(this.dateList[this.defaultItem]);
    },
    methods: {
      getCalendarContainer() {
        return this.$refs.calendarBox;
      },
      dateChange(t) {
        if (this.selectedKey === t.key) return;
        this.selectedKey = t.key;
        let e = t.getTimeArr();
        (this.selectDate = e), this.toEmitData();
      },
      onChange() {
        (this.selectDate = arguments[1]), this.toEmitData();
      },
      changeStatus(t) {
        if (
          t.isSelect &&
          this.selectArr.find((a) => a.id === t.checkId).isSelect === !1
        ) {
          this.$message.error("至少选中一项");
          return;
        }
        this.$set(t, "isSelect", !t.isSelect), this.toEmitData();
      },
      toEmitData() {
        let t = this.selectArr.every((a) => a.isSelect)
            ? ""
            : this.selectArr.find((a) => a.isSelect).realVal,
          e = this.dateList.filter((a) => this.selectedKey === a.key)[0]
            .dateType;
        this.$emit("getTime", {
          startTime: this.selectDate[0] + " 00:00:00",
          endTime: this.selectDate[1] + " 23:59:59",
          status: t,
          dateType: e,
        });
      },
      disabledDate(t) {
        return t && t > s();
      },
    },
  };
var o = function () {
    var e = this,
      a = e._self._c;
    return a("div", { staticClass: "flexBox" }, [
      a(
        "div",
        { staticClass: "btnFlex" },
        e._l(e.dateList, function (r, l) {
          return a(
            "div",
            {
              key: l,
              class: {
                inlineBlock: !0,
                btn: !0,
                activeBtnC: e.selectedKey === r.key,
                noActiveBtnC: e.selectedKey !== r.key,
              },
              on: {
                click: function (n) {
                  return e.dateChange(r);
                },
              },
            },
            [a("span", [e._v(e._s(r.text))])]
          );
        }),
        0
      ),
      e.onlyTab
        ? e._e()
        : a(
            "div",
            { staticStyle: { width: "38%" } },
            [
              a(
                "SeaDatePicker",
                {
                  staticClass: "selectRange",
                  attrs: {
                    allowClear: !1,
                    "disabled-date": e.disabledDate,
                    dropdownClassName: "blackDateBox",
                    getCalendarContainer: e.getCalendarContainer,
                    value: e.selectDate,
                    separator: "-",
                    type: "range",
                  },
                  on: { change: e.onChange },
                },
                [
                  a("img", {
                    attrs: { slot: "suffixIcon", src: c },
                    slot: "suffixIcon",
                  }),
                ]
              ),
            ],
            1
          ),
      e.onlyTab
        ? e._e()
        : a("div", { ref: "calendarBox", class: e.calendarBox }),
      e.onlyTab
        ? e._e()
        : a(
            "div",
            { staticClass: "selectBox" },
            e._l(e.selectArr, function (r, l) {
              return a(
                "div",
                {
                  key: l,
                  class: r.isSelect ? "select" : "noSelect",
                  on: {
                    click: function (n) {
                      return e.changeStatus(r);
                    },
                  },
                },
                [a("span", [e._v(e._s(r.label))])]
              );
            }),
            0
          ),
    ]);
  },
  f = [],
  u = i(d, o, f, !1, null, "4e7b5fa8");
const y = u.exports;
export { y as default };
