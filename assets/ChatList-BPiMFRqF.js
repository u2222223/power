import {
  aJ as It,
  a0 as Ka,
  aK as Za,
  a9 as Ja,
  c as nr,
  aL as et,
  n as jr,
} from "./index-FdyGBlLz.js";
const r0 = [];
for (let r = 0; r < 256; ++r) r0.push((r + 256).toString(16).slice(1));
function $a(r, e = 0) {
  return (
    r0[r[e + 0]] +
    r0[r[e + 1]] +
    r0[r[e + 2]] +
    r0[r[e + 3]] +
    "-" +
    r0[r[e + 4]] +
    r0[r[e + 5]] +
    "-" +
    r0[r[e + 6]] +
    r0[r[e + 7]] +
    "-" +
    r0[r[e + 8]] +
    r0[r[e + 9]] +
    "-" +
    r0[r[e + 10]] +
    r0[r[e + 11]] +
    r0[r[e + 12]] +
    r0[r[e + 13]] +
    r0[r[e + 14]] +
    r0[r[e + 15]]
  ).toLowerCase();
}
let tt;
const _a = new Uint8Array(16);
function e1() {
  if (!tt) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    tt = crypto.getRandomValues.bind(crypto);
  }
  return tt(_a);
}
const t1 =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  ir = { randomUUID: t1 };
function gt(r, e, t) {
  var n;
  if (ir.randomUUID && !e && !r) return ir.randomUUID();
  r = r || {};
  const a = r.random ?? ((n = r.rng) == null ? void 0 : n.call(r)) ?? e1();
  if (a.length < 16) throw new Error("Random bytes length must be >= 16");
  return (a[6] = (a[6] & 15) | 64), (a[8] = (a[8] & 63) | 128), $a(a);
}
async function r1(r, e) {
  const t = r.getReader();
  let a;
  for (; !(a = await t.read()).done; ) e(a.value);
}
function a1(r) {
  let e,
    t,
    a,
    n = !1;
  return function (o) {
    e === void 0 ? ((e = o), (t = 0), (a = -1)) : (e = i1(e, o));
    const u = e.length;
    let c = 0;
    for (; t < u; ) {
      n && (e[t] === 10 && (c = ++t), (n = !1));
      let d = -1;
      for (; t < u && d === -1; ++t)
        switch (e[t]) {
          case 58:
            a === -1 && (a = t - c);
            break;
          case 13:
            n = !0;
          case 10:
            d = t;
            break;
        }
      if (d === -1) break;
      r(e.subarray(c, d), a), (c = t), (a = -1);
    }
    c === u ? (e = void 0) : c !== 0 && ((e = e.subarray(c)), (t -= c));
  };
}
function n1(r, e, t) {
  let a = sr();
  const n = new TextDecoder();
  return function (o, u) {
    if (o.length === 0) t == null || t(a), (a = sr());
    else if (u > 0) {
      const c = n.decode(o.subarray(0, u)),
        d = u + (o[u + 1] === 32 ? 2 : 1),
        f = n.decode(o.subarray(d));
      switch (c) {
        case "data":
          a.data = a.data
            ? a.data +
              `
` +
              f
            : f;
          break;
        case "event":
          a.event = f;
          break;
        case "id":
          r((a.id = f));
          break;
        case "retry":
          const g = parseInt(f, 10);
          isNaN(g) || e((a.retry = g));
          break;
      }
    }
  };
}
function i1(r, e) {
  const t = new Uint8Array(r.length + e.length);
  return t.set(r), t.set(e, r.length), t;
}
function sr() {
  return { data: "", event: "", id: "", retry: void 0 };
}
var s1 = function (r, e) {
  var t = {};
  for (var a in r)
    Object.prototype.hasOwnProperty.call(r, a) &&
      e.indexOf(a) < 0 &&
      (t[a] = r[a]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, a = Object.getOwnPropertySymbols(r); n < a.length; n++)
      e.indexOf(a[n]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(r, a[n]) &&
        (t[a[n]] = r[a[n]]);
  return t;
};
const bt = "text/event-stream",
  l1 = 1e3,
  lr = "last-event-id";
function o1(r, e) {
  var {
      signal: t,
      headers: a,
      onopen: n,
      onmessage: i,
      onclose: o,
      onerror: u,
      openWhenHidden: c,
      fetch: d,
    } = e,
    f = s1(e, [
      "signal",
      "headers",
      "onopen",
      "onmessage",
      "onclose",
      "onerror",
      "openWhenHidden",
      "fetch",
    ]);
  return new Promise((g, x) => {
    const y = Object.assign({}, a);
    y.accept || (y.accept = bt);
    let S;
    function k() {
      S.abort(), document.hidden || L();
    }
    c || document.addEventListener("visibilitychange", k);
    let C = l1,
      B = 0;
    function R() {
      document.removeEventListener("visibilitychange", k),
        window.clearTimeout(B),
        S.abort();
    }
    t == null ||
      t.addEventListener("abort", () => {
        R(), g();
      });
    const E = d ?? window.fetch,
      P = n ?? u1;
    async function L() {
      var U;
      S = new AbortController();
      try {
        const G = await E(
          r,
          Object.assign(Object.assign({}, f), { headers: y, signal: S.signal })
        );
        await P(G),
          await r1(
            G.body,
            a1(
              n1(
                (W) => {
                  W ? (y[lr] = W) : delete y[lr];
                },
                (W) => {
                  C = W;
                },
                i
              )
            )
          ),
          o == null || o(),
          R(),
          g();
      } catch (G) {
        if (!S.signal.aborted)
          try {
            const W =
              (U = u == null ? void 0 : u(G)) !== null && U !== void 0 ? U : C;
            window.clearTimeout(B), (B = window.setTimeout(L, W));
          } catch (W) {
            R(), x(W);
          }
      }
    }
    L();
  });
}
function u1(r) {
  const e = r.headers.get("content-type");
  if (!(e != null && e.startsWith(bt)))
    throw new Error(`Expected content-type to be ${bt}, Actual: ${e}`);
}
function cs(r, e, t, a, n, i, o, u) {
  o || (o = gt());
  let c, d;
  const f = [];
  for (const B of a.values()) {
    const { prompt: R, answers: E, answer: P } = B;
    f.push({ prompt: R, role: "user" }),
      E &&
        f.push({
          prompt: E.filter((L) => L.type === "text").map((L) => L.content)
            .join(`
`),
          role: "assistant",
        }),
      P && f.push({ prompt: P, role: "assistant" });
  }
  const g = sessionStorage.getItem("chatId") || void 0,
    x = {
      prompt: r,
      model: e,
      refs: f,
      chatSessionId: o,
      searchEnabled: t,
      modelChatId: g,
      parentChatSessionId: i,
      files: n.map((B) => ({
        transferMethod: "local_file",
        uploadFileId: B.fileId,
      })),
    },
    y = new AbortController(),
    S = y.signal;
  let k,
    C = !1;
  return (
    k === void 0 &&
      (k = setTimeout(() => {
        C ||
          (u({
            sessionId: o,
            content: "系统繁忙,请稍后再试.",
            type: "text",
            role: "assistant",
          }),
          u({ sessionId: o, content: "", type: "finished", role: "assistant" }),
          y.abort());
      }, 1e3 * 60 * 3)),
    o1("/api/ai/offshore/chat/stream", {
      method: "POST",
      headers: It({
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "text/event-stream, application/json",
        "x-chat-id": o,
      }),
      signal: S,
      body: JSON.stringify(x),
      onmessage(B) {
        var P, L, U;
        let R = JSON.parse(B.data);
        R.knowledgeRetrieval && (d = R.knowledgeRetrieval),
          i ? (c = i) : (c = R.parentChatSessionId);
        const E = JSON.parse(B.data);
        if (E.code === 500 || E.code == 502 || E.code == 504) {
          console.log("500", E.message),
            y.abort(),
            u({
              sessionId: o,
              content: E.message ? E.message : "系统繁忙,请稍后再试.",
              type: "text",
              role: "assistant",
              parentChatSessionId: c,
            }),
            u({
              sessionId: o,
              content: "",
              type: "finished",
              role: "assistant",
              parentChatSessionId: c,
            });
          return;
        }
        if (E.finishReason === "stop") {
          y.abort(),
            u({
              sessionId: o,
              content: "",
              type: "finished",
              role: "assistant",
              parentChatSessionId: c,
            });
          return;
        }
        if (E.finishReason === "error") {
          (C = !0),
            y.abort(),
            u({
              sessionId: o,
              ...((P = E.choices) == null ? void 0 : P.deltas[0]),
              type: "text",
              role: "assistant",
              parentChatSessionId: c,
            }),
            u({
              sessionId: o,
              content: "",
              type: "finished",
              role: "assistant",
              parentChatSessionId: c,
            });
          return;
        }
        (!E.choices && !E.knowledgeRetrieval) ||
          (k !== void 0 && (clearTimeout(k), (k = void 0)),
          E.chatId && sessionStorage.setItem("chatId", E.chatId),
          u({
            sessionId: o,
            ...((L = E.choices) == null ? void 0 : L.deltas[0]),
            references:
              (U = E.references) != null && U.length ? E.references : void 0,
            knowledgeRetrieval: d != null && d.length ? d : void 0,
            parentChatSessionId: c,
          }));
      },
      onclose: () => {
        console.log("onclose");
      },
      onerror(B) {
        if ((console.log("error", B), !C))
          throw (
            ((C = !0),
            y.abort(),
            u({
              sessionId: o,
              content: "系统繁忙,请稍后再试.",
              type: "text",
              role: "assistant",
            }),
            u({
              sessionId: o,
              content: "",
              type: "finished",
              role: "assistant",
            }),
            B)
          );
      },
      openWhenHidden: !0,
    }),
    { sessionId: o, controller: y }
  );
}
function ms(r) {
  let e = It({ "Content-Type": "application/json;charset=UTF-8" });
  return Za({ url: "/api/ai/chat/log/details/list", data: r, headers: e });
}
function ds(r) {
  let e = It({ "Content-Type": "application/json;charset=UTF-8" });
  return Ka({ url: "/api/ai/offshore/model/list", data: r, headers: e });
}
var h1 = function () {
    var r = document.getSelection();
    if (!r.rangeCount) return function () {};
    for (var e = document.activeElement, t = [], a = 0; a < r.rangeCount; a++)
      t.push(r.getRangeAt(a));
    switch (e.tagName.toUpperCase()) {
      case "INPUT":
      case "TEXTAREA":
        e.blur();
        break;
      default:
        e = null;
        break;
    }
    return (
      r.removeAllRanges(),
      function () {
        r.type === "Caret" && r.removeAllRanges(),
          r.rangeCount ||
            t.forEach(function (n) {
              r.addRange(n);
            }),
          e && e.focus();
      }
    );
  },
  c1 = h1,
  or = { "text/plain": "Text", "text/html": "Url", default: "Text" },
  m1 = "Copy to clipboard: #{key}, Enter";
function d1(r) {
  var e = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return r.replace(/#{\s*key\s*}/g, e);
}
function f1(r, e) {
  var t,
    a,
    n,
    i,
    o,
    u,
    c = !1;
  e || (e = {}), (t = e.debug || !1);
  try {
    (n = c1()),
      (i = document.createRange()),
      (o = document.getSelection()),
      (u = document.createElement("span")),
      (u.textContent = r),
      (u.ariaHidden = "true"),
      (u.style.all = "unset"),
      (u.style.position = "fixed"),
      (u.style.top = 0),
      (u.style.clip = "rect(0, 0, 0, 0)"),
      (u.style.whiteSpace = "pre"),
      (u.style.webkitUserSelect = "text"),
      (u.style.MozUserSelect = "text"),
      (u.style.msUserSelect = "text"),
      (u.style.userSelect = "text"),
      u.addEventListener("copy", function (f) {
        if ((f.stopPropagation(), e.format))
          if ((f.preventDefault(), typeof f.clipboardData > "u")) {
            t && console.warn("unable to use e.clipboardData"),
              t && console.warn("trying IE specific stuff"),
              window.clipboardData.clearData();
            var g = or[e.format] || or.default;
            window.clipboardData.setData(g, r);
          } else
            f.clipboardData.clearData(), f.clipboardData.setData(e.format, r);
        e.onCopy && (f.preventDefault(), e.onCopy(f.clipboardData));
      }),
      document.body.appendChild(u),
      i.selectNodeContents(u),
      o.addRange(i);
    var d = document.execCommand("copy");
    if (!d) throw new Error("copy command was unsuccessful");
    c = !0;
  } catch (f) {
    t && console.error("unable to copy using execCommand: ", f),
      t && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(e.format || "text", r),
        e.onCopy && e.onCopy(window.clipboardData),
        (c = !0);
    } catch (g) {
      t && console.error("unable to copy using clipboardData: ", g),
        t && console.error("falling back to prompt"),
        (a = d1("message" in e ? e.message : m1)),
        window.prompt(a, r);
    }
  } finally {
    o &&
      (typeof o.removeRange == "function"
        ? o.removeRange(i)
        : o.removeAllRanges()),
      u && document.body.removeChild(u),
      n();
  }
  return c;
}
var p1 = f1;
const v1 = Ja(p1);
function g1(r, e) {
  return new Promise((t, a) => {
    if (document.getElementById(e)) {
      t();
      return;
    }
    const n = document.createElement("script");
    (n.src = r),
      (n.id = e),
      (n.async = !0),
      (n.onload = t),
      (n.onerror = () => a(new Error(`加载失败脚本: ${r}`))),
      document.body.appendChild(n);
  });
}
async function b1() {
  const r = [
    { src: "/speechhelper/crypto-js.js", id: "crypto-js" },
    { src: "/speechhelper/HmacSHA1.js", id: "hmac-sha1" },
    { src: "/speechhelper/md5.js", id: "md5-encoding" },
    { src: "/speechhelper/enc-base64-min.js", id: "enc-base64-min" },
    { src: "/speechhelper/base64.js", id: "base64" },
  ];
  for (const { src: e, id: t } of r) await g1(e, t);
  return Promise.resolve();
}
function Kr(r, e, t, a) {
  return new (t || (t = Promise))(function (n, i) {
    function o(d) {
      try {
        c(a.next(d));
      } catch (f) {
        i(f);
      }
    }
    function u(d) {
      try {
        c(a.throw(d));
      } catch (f) {
        i(f);
      }
    }
    function c(d) {
      var f;
      d.done
        ? n(d.value)
        : ((f = d.value),
          f instanceof t
            ? f
            : new t(function (g) {
                g(f);
              })).then(o, u);
    }
    c((a = a.apply(r, [])).next());
  });
}
function Zr(r, e) {
  var t,
    a,
    n,
    i,
    o = {
      label: 0,
      sent: function () {
        if (1 & n[0]) throw n[1];
        return n[1];
      },
      trys: [],
      ops: [],
    };
  return (
    (i = { next: u(0), throw: u(1), return: u(2) }),
    typeof Symbol == "function" &&
      (i[Symbol.iterator] = function () {
        return this;
      }),
    i
  );
  function u(c) {
    return function (d) {
      return (function (f) {
        if (t) throw new TypeError("Generator is already executing.");
        for (; i && ((i = 0), f[0] && (o = 0)), o; )
          try {
            if (
              ((t = 1),
              a &&
                (n =
                  2 & f[0]
                    ? a.return
                    : f[0]
                    ? a.throw || ((n = a.return) && n.call(a), 0)
                    : a.next) &&
                !(n = n.call(a, f[1])).done)
            )
              return n;
            switch (((a = 0), n && (f = [2 & f[0], n.value]), f[0])) {
              case 0:
              case 1:
                n = f;
                break;
              case 4:
                return o.label++, { value: f[1], done: !1 };
              case 5:
                o.label++, (a = f[1]), (f = [0]);
                continue;
              case 7:
                (f = o.ops.pop()), o.trys.pop();
                continue;
              default:
                if (
                  ((n = o.trys),
                  !(
                    (n = n.length > 0 && n[n.length - 1]) ||
                    (f[0] !== 6 && f[0] !== 2)
                  ))
                ) {
                  o = 0;
                  continue;
                }
                if (f[0] === 3 && (!n || (f[1] > n[0] && f[1] < n[3]))) {
                  o.label = f[1];
                  break;
                }
                if (f[0] === 6 && o.label < n[1]) {
                  (o.label = n[1]), (n = f);
                  break;
                }
                if (n && o.label < n[2]) {
                  (o.label = n[2]), o.ops.push(f);
                  break;
                }
                n[2] && o.ops.pop(), o.trys.pop();
                continue;
            }
            f = e.call(r, o);
          } catch (g) {
            (f = [6, g]), (a = 0);
          } finally {
            t = n = 0;
          }
        if (5 & f[0]) throw f[1];
        return { value: f[0] ? f[1] : void 0, done: !0 };
      })([c, d]);
    };
  }
}
var yt = !AudioWorkletNode;
function y1() {
  var r;
  return !((r = navigator.mediaDevices) === null || r === void 0) &&
    r.getUserMedia
    ? navigator.mediaDevices.getUserMedia({ audio: !0, video: !1 })
    : navigator.getUserMedia
    ? new Promise(function (e, t) {
        navigator.getUserMedia(
          { audio: !0, video: !1 },
          function (a) {
            e(a);
          },
          function (a) {
            t(a);
          }
        );
      })
    : Promise.reject(new Error("不支持录音"));
}
function w1(r, e) {
  return Kr(this, void 0, void 0, function () {
    return Zr(this, function (t) {
      switch (t.label) {
        case 0:
          return yt
            ? [
                4,
                r.audioWorklet.addModule("".concat(e, "/processor.worklet.js")),
              ]
            : [3, 2];
        case 1:
          return t.sent(), [2, new AudioWorkletNode(r, "processor-worklet")];
        case 2:
          return [4, new Worker("".concat(e, "/processor.worker.js"))];
        case 3:
          return [2, { port: t.sent() }];
      }
    });
  });
}
var x1 = (function () {
  function r(e) {
    (this.processorPath = e), (this.audioBuffers = []);
  }
  return (
    (r.prototype.start = function (e) {
      var t,
        a = e.sampleRate,
        n = e.frameSize,
        i = e.arrayBufferType;
      return Kr(this, void 0, void 0, function () {
        var o, u, c, d, f, g;
        return Zr(this, function (x) {
          switch (x.label) {
            case 0:
              return ((o = this).audioBuffers = []), [4, y1()];
            case 1:
              return (
                (u = x.sent()),
                (this.audioTracks = u.getAudioTracks()),
                (c = (function (y, S) {
                  var k;
                  try {
                    (k = new (window.AudioContext || window.webkitAudioContext)(
                      { sampleRate: S }
                    )).createMediaStreamSource(y);
                  } catch {
                    (k = new (window.AudioContext ||
                      window.webkitAudioContext)()).createMediaStreamSource(y);
                  }
                  return k;
                })(u, a)),
                (this.audioContext = c),
                c.createMediaStreamSource(u),
                (d = c.createMediaStreamSource(u)),
                [4, w1(c, this.processorPath)]
              );
            case 2:
              return (
                (f = x.sent()),
                (this.audioWorklet = f),
                f.port.postMessage({
                  type: "init",
                  data: {
                    frameSize: n,
                    toSampleRate: a || c.sampleRate,
                    fromSampleRate: c.sampleRate,
                    arrayBufferType: i || "short16",
                  },
                }),
                (f.port.onmessage = function (y) {
                  n && o.onFrameRecorded && o.onFrameRecorded(y.data),
                    o.onStop &&
                      (y.data.frameBuffer &&
                        o.audioBuffers.push(y.data.frameBuffer),
                      y.data.isLastFrame &&
                        !yt &&
                        (f == null ? void 0 : f.port).terminate(),
                      y.data.isLastFrame && o.onStop(o.audioBuffers));
                }),
                yt
                  ? d.connect(f)
                  : (((g = c.createScriptProcessor(0, 1, 1)).onaudioprocess =
                      function (y) {
                        f.port.postMessage({
                          type: "message",
                          data: y.inputBuffer.getChannelData(0),
                        });
                      }),
                    d.connect(g),
                    g.connect(c.destination)),
                c.resume(),
                (t = this.onStart) === null || t === void 0 || t.call(this),
                [2]
              );
          }
        });
      });
    }),
    (r.prototype.stop = function () {
      var e, t, a;
      (e = this.audioWorklet) === null ||
        e === void 0 ||
        e.port.postMessage({ type: "stop" }),
        (t = this.audioTracks) === null || t === void 0 || t[0].stop(),
        (a = this.audioContext) === null || a === void 0 || a.suspend();
    }),
    r
  );
})();
let A1 = "/v1/ws";
const S1 = "86550dba",
  k1 = "5c9ef12de4573ed7d665f165a84d33a1";
let M1 = "/v2/tts";
const T1 = "86550dba",
  z1 = "OTZjOTg2ZTNhYzhkZWNiNjdlMzk1Njlm",
  B1 = "808087b9d1145761fd339a01d0dccc02",
  A0 = { CONNECTING: 1, CLOSING: 3, CLOSED: 4, RECORDING: 5 };
let wt = A0.CLOSED,
  xt = "",
  At = "",
  i0 = null,
  oe = [],
  St = "";
const E0 = new x1("/speechhelper/dist");
E0.onStart = () => {
  se(A0.RECORDING);
};
E0.onFrameRecorded = ({ isLastFrame: r, frameBuffer: e }) => {
  i0.readyState === i0.OPEN &&
    (i0.send(new Int8Array(e)),
    r && (i0.send('{"end": true}'), se(A0.CLOSING)));
};
function C1(r) {
  oe = r;
}
function D1(r) {
  switch (wt) {
    case A0.CLOSED:
      (St = r), I1();
      break;
    case A0.CONNECTING:
    case A0.RECORDING:
      (St = ""), E0.stop(), i0.close(), se(A0.CLOSED);
      break;
  }
}
function N1() {
  E0 == null || E0.stop(), i0 == null || i0.close(), (oe = null);
}
function E1() {
  const r = A1,
    e = S1,
    t = k1,
    a = Math.floor(new Date().getTime() / 1e3),
    n = hex_md5(e + a),
    i = CryptoJSNew.HmacSHA1(n, t);
  let o = encodeURIComponent(CryptoJS.enc.Base64.stringify(i));
  return `${r}?appid=${e}&ts=${a}&signa=${o}`;
}
function R1(r) {
  let e = JSON.parse(r);
  if (e.action == "started") console.log("握手成功");
  else if (e.action == "result") {
    const t = JSON.parse(e.data);
    console.log(t);
    let a = "";
    t.cn.st.rt.forEach((n) => {
      n.ws.forEach((i) => {
        i.cw.forEach((o) => {
          a += o.w;
        });
      });
    }),
      t.cn.st.type == 0 && ((xt += a), (a = "")),
      (At = St + xt + a),
      oe && oe({ isRecording: !0, result: At });
  } else
    e.action == "error" &&
      (console.log("出错了:", e),
      e.code === "10700" &&
        nr.warning("音频输入异常，请检查麦克风设备及权限设置"),
      e.code === "10800" && nr.warning("已超过最大连接数，建议30秒后重试"));
}
function I1() {
  (xt = ""), (At = "");
  const r = E1();
  "WebSocket" in window && (i0 = new WebSocket(r)),
    se(A0.CONNECTING),
    (i0.onopen = () => {
      E0.start({ sampleRate: 16e3, frameSize: 1280 });
    }),
    (i0.onmessage = (e) => {
      R1(e.data);
    }),
    (i0.onerror = (e) => {
      console.error(e), E0.stop(), i0.close(), se(A0.CLOSED);
    }),
    (i0.onclose = () => {
      E0.stop(), i0.close(), se(A0.CLOSED);
    });
}
function se(r) {
  (wt = r), oe && oe({ isRecording: wt === A0.RECORDING });
}
function Me(r, e, t) {
  for (var a = 0; a < t.length; a++) r.setUint8(e + a, t.charCodeAt(a));
}
function O1(r, e, t) {
  var a = (function (n, i, o, u, c) {
    var d = n.reduce(function (S, k) {
        return S + k.byteLength;
      }, 0),
      f = new ArrayBuffer(44 + d),
      g = new DataView(f),
      x = o,
      y = 0;
    return (
      Me(g, y, "RIFF"),
      (y += 4),
      g.setUint32(y, 36 + d, !0),
      Me(g, (y += 4), "WAVE"),
      Me(g, (y += 4), "fmt "),
      (y += 4),
      g.setUint32(y, 16, !0),
      (y += 4),
      g.setUint16(y, 1, !0),
      (y += 2),
      g.setUint16(y, x, !0),
      (y += 2),
      g.setUint32(y, i, !0),
      (y += 4),
      g.setUint32(y, x * i * (u / 8), !0),
      (y += 4),
      g.setUint16(y, x * (u / 8), !0),
      (y += 2),
      g.setUint16(y, u, !0),
      Me(g, (y += 2), "data"),
      (y += 4),
      g.setUint32(y, d, !0),
      (y += 4),
      n.forEach(function (S) {
        for (var k = new DataView(S.buffer), C = 0; C < S.byteLength; )
          g.setUint8(y, k.getUint8(C)), y++, C++;
      }),
      g
    );
  })(r, e || 16e3, 1, t);
  return new Blob([a], { type: "audio/wav" });
}
var q1 = (function () {
  function r(e) {
    (this.toSampleRate = 22050),
      (this.resumePlayDuration = 1e3),
      (this.fromSampleRate = 16e3),
      (this.isAudioDataEnded = !1),
      (this.status = "uninit"),
      (this.audioDatas = []),
      (this.pcmAudioDatas = []),
      (this.audioDataOffset = 0),
      (this.processor = new Worker("".concat(e, "/processor.worker.js")));
  }
  return (
    (r.prototype.postMessage = function (e) {
      var t = e.type,
        a = e.data,
        n = e.isLastData;
      this.status !== "uninit" &&
        (this.processor.postMessage({ type: t, data: a }),
        (this.isAudioDataEnded = n));
    }),
    (r.prototype.playAudio = function () {
      var e = this;
      if ((clearTimeout(this.playAudioTime), this.audioContext)) {
        for (
          var t = 0, a = this.audioDataOffset;
          a < this.audioDatas.length;
          a++
        )
          t += this.audioDatas[a].length;
        if (!t)
          return void (
            this.status === "play" &&
            (this.isAudioDataEnded || this.resumePlayDuration <= 0
              ? this.stop()
              : (this.playAudioTime = setTimeout(function () {
                  e.playAudio();
                }, this.resumePlayDuration)))
          );
        for (
          var n = this.audioContext.createBuffer(1, t, this.toSampleRate),
            i = n.getChannelData(0),
            o = this.audioDatas[this.audioDataOffset],
            u = 0;
          o;

        ) {
          if (((this.audioDataOffset += 1), n.copyToChannel))
            n.copyToChannel(o, 0, u), (u += o.length);
          else for (a = 0; a < o.length; a++) i[a] = o[a];
          o = this.audioDatas[this.audioDataOffset];
        }
        var c = this.audioContext.createBufferSource();
        (this.bufferSource = c),
          (c.buffer = n),
          c.connect(this.audioContext.destination),
          c.start(),
          (c.onended = function (d) {
            e.status === "play" &&
              (e.audioDatas.length
                ? e.playAudio()
                : e.isAudioDataEnded || e.resumePlayDuration <= 0
                ? e.stop()
                : (e.playAudioTime = setTimeout(function () {
                    e.playAudio();
                  }, e.resumePlayDuration)));
          });
      }
    }),
    (r.prototype.reset = function () {
      var e;
      (this.processor.onmessage = null),
        (this.audioDataOffset = 0),
        (this.audioDatas = []),
        (this.pcmAudioDatas = []),
        (this.status = "uninit"),
        (this.isAudioDataEnded = !1),
        clearTimeout(this.playAudioTime);
      try {
        (e = this.bufferSource) === null || e === void 0 || e.stop();
      } catch (t) {
        console.log(t);
      }
    }),
    (r.prototype.start = function (e) {
      var t = this,
        a = e === void 0 ? {} : e,
        n = a.autoPlay,
        i = n === void 0 || n,
        o = a.sampleRate,
        u = o === void 0 ? 16e3 : o,
        c = a.resumePlayDuration,
        d = c === void 0 ? 1e3 : c;
      this.reset(), (this.status = "init"), (this.resumePlayDuration = d);
      var f = u,
        g = Math.max(f, 22050);
      (g = Math.min(g, 96e3)),
        (this.fromSampleRate = f),
        (this.toSampleRate = g),
        this.processor.postMessage({
          type: "init",
          data: { fromSampleRate: f, toSampleRate: g },
        }),
        (this.processor.onmessage = function (x) {
          var y = x.data,
            S = y.audioData,
            k = y.pcmAudioData;
          t.audioDatas.push(S),
            t.pcmAudioDatas.push(k),
            t.audioDatas.length === 1 && i && t.status === "init" && t.play();
        });
    }),
    (r.prototype.play = function () {
      var e;
      this.audioContext ||
        ((this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)()),
        this.audioContext.resume()),
        this.audioContext &&
          ((this.status = "play"),
          (e = this.onPlay) === null || e === void 0 || e.call(this),
          this.playAudio());
    }),
    (r.prototype.stop = function () {
      var e, t;
      (this.audioDataOffset = 0),
        (this.status = "stop"),
        clearTimeout(this.playAudioTime);
      try {
        (e = this.bufferSource) === null || e === void 0 || e.stop(),
          (t = this.onStop) === null ||
            t === void 0 ||
            t.call(this, this.audioDatas);
      } catch (a) {
        console.log(a);
      }
    }),
    (r.prototype.getAudioDataBlob = function (e) {
      var t, a;
      if (!((t = this.pcmAudioDatas) === null || t === void 0) && t.length)
        return e === "wav"
          ? O1(this.pcmAudioDatas, this.fromSampleRate, 16)
          : ((a = this.pcmAudioDatas), new Blob(a, { type: "audio/pcm" }));
    }),
    r
  );
})();
const L1 = T1,
  F1 = z1,
  H1 = B1;
let kt = "UNDEFINED",
  p0,
  Oe;
const ue = new q1("/run/speechhelper/dist2");
function $0(r) {
  (kt = r), Oe == null || Oe(kt === "PLAY");
}
ue.onPlay = () => $0("PLAY");
ue.onStop = () => $0("UNDEFINED");
function P1(r, e) {
  let t = M1;
  const a = location.host,
    n = new Date().toGMTString(),
    i = "hmac-sha256",
    o = "host date request-line",
    u = `host: ${a}
date: ${n}
GET /v2/tts HTTP/1.1`,
    c = CryptoJS.HmacSHA256(u, e),
    d = CryptoJS.enc.Base64.stringify(c),
    f = `api_key="${r}", algorithm="${i}", headers="${o}", signature="${d}"`,
    g = btoa(f);
  return (t = `${t}?authorization=${g}&date=${n}&host=${a}`), t;
}
function U1(r) {
  return Base64.encode(r);
}
function G1(r) {
  const e = P1(H1, F1);
  (p0 = new WebSocket(e)),
    $0("CONNECTING"),
    (p0.onopen = () => {
      ue.start({ autoPlay: !0, sampleRate: 16e3, resumePlayDuration: 1e3 }),
        $0("PLAY");
      const a = {
        common: { app_id: L1 },
        business: {
          aue: "raw",
          auf: "audio/L16;rate=16000",
          vcn: "xiaoyan",
          speed: 50,
          volume: 50,
          pitch: 50,
          bgs: 0,
          tte: "UTF8",
        },
        data: { status: 2, text: U1(r) },
      };
      p0.send(JSON.stringify(a));
    }),
    (p0.onmessage = (t) => {
      let a = JSON.parse(t.data);
      if (a.code !== 0) {
        console.error("合成失败", a), $0("UNDEFINED");
        return;
      }
      ue.postMessage({
        type: "base64",
        data: a.data.audio,
        isLastData: a.data.status === 2,
      }),
        a.code === 0 && a.data.status === 2 && p0.close();
    }),
    (p0.onerror = (t) => {
      console.error(t);
    });
}
function V1(r) {
  Oe = r;
}
function W1(r) {
  switch (kt) {
    case "UNDEFINED":
      G1(r);
      break;
    case "CONNECTING":
    case "PLAY":
      $0("UNDEFINED"), p0 == null || p0.close(), ue.reset();
      return;
  }
}
function Y1() {
  $0("UNDEFINED"), ue.stop(), p0 == null || p0.close();
}
const Q1 = {
  data() {
    return { recogonition: "", recording: !1, isPlaying: !1, textToSound: "" };
  },
  methods: {
    initSpeechHelper() {
      this.initTextToSound(), this.initSoundToText();
    },
    initTextToSound() {
      V1((r) => (this.isPlaying = r));
    },
    playSound(r) {
      W1(r);
    },
    stopSound() {
      Y1();
    },
    initSoundToText() {
      b1().then(() => {
        C1(({ isRecording: r, result: e }) => {
          e !== void 0 && (this.recogonition = e), (this.recording = r);
        });
      });
    },
    toggleRecording(r) {
      D1(r);
    },
  },
  beforeDestroy() {
    N1();
  },
};
class c0 {
  constructor(e, t, a) {
    (this.lexer = void 0),
      (this.start = void 0),
      (this.end = void 0),
      (this.lexer = e),
      (this.start = t),
      (this.end = a);
  }
  static range(e, t) {
    return t
      ? !e || !e.loc || !t.loc || e.loc.lexer !== t.loc.lexer
        ? null
        : new c0(e.loc.lexer, e.loc.start, t.loc.end)
      : e && e.loc;
  }
}
class g0 {
  constructor(e, t) {
    (this.text = void 0),
      (this.loc = void 0),
      (this.noexpand = void 0),
      (this.treatAsRelax = void 0),
      (this.text = e),
      (this.loc = t);
  }
  range(e, t) {
    return new g0(t, c0.range(this, e));
  }
}
class T {
  constructor(e, t) {
    (this.name = void 0),
      (this.position = void 0),
      (this.length = void 0),
      (this.rawMessage = void 0);
    var a = "KaTeX parse error: " + e,
      n,
      i,
      o = t && t.loc;
    if (o && o.start <= o.end) {
      var u = o.lexer.input;
      (n = o.start),
        (i = o.end),
        n === u.length
          ? (a += " at end of input: ")
          : (a += " at position " + (n + 1) + ": ");
      var c = u.slice(n, i).replace(/[^]/g, "$&̲"),
        d;
      n > 15 ? (d = "…" + u.slice(n - 15, n)) : (d = u.slice(0, n));
      var f;
      i + 15 < u.length ? (f = u.slice(i, i + 15) + "…") : (f = u.slice(i)),
        (a += d + c + f);
    }
    var g = new Error(a);
    return (
      (g.name = "ParseError"),
      (g.__proto__ = T.prototype),
      (g.position = n),
      n != null && i != null && (g.length = i - n),
      (g.rawMessage = e),
      g
    );
  }
}
T.prototype.__proto__ = Error.prototype;
var X1 = function (e, t) {
    return e.indexOf(t) !== -1;
  },
  j1 = function (e, t) {
    return e === void 0 ? t : e;
  },
  K1 = /([A-Z])/g,
  Z1 = function (e) {
    return e.replace(K1, "-$1").toLowerCase();
  },
  J1 = { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#x27;" },
  $1 = /[&><"']/g;
function _1(r) {
  return String(r).replace($1, (e) => J1[e]);
}
var Jr = function r(e) {
    return e.type === "ordgroup" || e.type === "color"
      ? e.body.length === 1
        ? r(e.body[0])
        : e
      : e.type === "font"
      ? r(e.body)
      : e;
  },
  en = function (e) {
    var t = Jr(e);
    return t.type === "mathord" || t.type === "textord" || t.type === "atom";
  },
  tn = function (e) {
    if (!e) throw new Error("Expected non-null, but got " + String(e));
    return e;
  },
  rn = function (e) {
    var t = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e);
    return t
      ? t[2] !== ":" || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(t[1])
        ? null
        : t[1].toLowerCase()
      : "_relative";
  },
  I = {
    contains: X1,
    deflt: j1,
    escape: _1,
    hyphenate: Z1,
    getBaseElem: Jr,
    isCharacterBox: en,
    protocolFromUrl: rn,
  },
  qe = {
    displayMode: {
      type: "boolean",
      description:
        "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
      cli: "-d, --display-mode",
    },
    output: {
      type: { enum: ["htmlAndMathml", "html", "mathml"] },
      description: "Determines the markup language of the output.",
      cli: "-F, --format <type>",
    },
    leqno: {
      type: "boolean",
      description: "Render display math in leqno style (left-justified tags).",
    },
    fleqn: { type: "boolean", description: "Render display math flush left." },
    throwOnError: {
      type: "boolean",
      default: !0,
      cli: "-t, --no-throw-on-error",
      cliDescription:
        "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error.",
    },
    errorColor: {
      type: "string",
      default: "#cc0000",
      cli: "-c, --error-color <color>",
      cliDescription:
        "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
      cliProcessor: (r) => "#" + r,
    },
    macros: {
      type: "object",
      cli: "-m, --macro <def>",
      cliDescription:
        "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
      cliDefault: [],
      cliProcessor: (r, e) => (e.push(r), e),
    },
    minRuleThickness: {
      type: "number",
      description:
        "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
      processor: (r) => Math.max(0, r),
      cli: "--min-rule-thickness <size>",
      cliProcessor: parseFloat,
    },
    colorIsTextColor: {
      type: "boolean",
      description:
        "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
      cli: "-b, --color-is-text-color",
    },
    strict: {
      type: [{ enum: ["warn", "ignore", "error"] }, "boolean", "function"],
      description:
        "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
      cli: "-S, --strict",
      cliDefault: !1,
    },
    trust: {
      type: ["boolean", "function"],
      description: "Trust the input, enabling all HTML features such as \\url.",
      cli: "-T, --trust",
    },
    maxSize: {
      type: "number",
      default: 1 / 0,
      description:
        "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
      processor: (r) => Math.max(0, r),
      cli: "-s, --max-size <n>",
      cliProcessor: parseInt,
    },
    maxExpand: {
      type: "number",
      default: 1e3,
      description:
        "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
      processor: (r) => Math.max(0, r),
      cli: "-e, --max-expand <n>",
      cliProcessor: (r) => (r === "Infinity" ? 1 / 0 : parseInt(r)),
    },
    globalGroup: { type: "boolean", cli: !1 },
  };
function an(r) {
  if (r.default) return r.default;
  var e = r.type,
    t = Array.isArray(e) ? e[0] : e;
  if (typeof t != "string") return t.enum[0];
  switch (t) {
    case "boolean":
      return !1;
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
  }
}
class Ot {
  constructor(e) {
    (this.displayMode = void 0),
      (this.output = void 0),
      (this.leqno = void 0),
      (this.fleqn = void 0),
      (this.throwOnError = void 0),
      (this.errorColor = void 0),
      (this.macros = void 0),
      (this.minRuleThickness = void 0),
      (this.colorIsTextColor = void 0),
      (this.strict = void 0),
      (this.trust = void 0),
      (this.maxSize = void 0),
      (this.maxExpand = void 0),
      (this.globalGroup = void 0),
      (e = e || {});
    for (var t in qe)
      if (qe.hasOwnProperty(t)) {
        var a = qe[t];
        this[t] =
          e[t] !== void 0 ? (a.processor ? a.processor(e[t]) : e[t]) : an(a);
      }
  }
  reportNonstrict(e, t, a) {
    var n = this.strict;
    if ((typeof n == "function" && (n = n(e, t, a)), !(!n || n === "ignore"))) {
      if (n === !0 || n === "error")
        throw new T(
          "LaTeX-incompatible input and strict mode is set to 'error': " +
            (t + " [" + e + "]"),
          a
        );
      n === "warn"
        ? typeof console < "u" &&
          console.warn(
            "LaTeX-incompatible input and strict mode is set to 'warn': " +
              (t + " [" + e + "]")
          )
        : typeof console < "u" &&
          console.warn(
            "LaTeX-incompatible input and strict mode is set to " +
              ("unrecognized '" + n + "': " + t + " [" + e + "]")
          );
    }
  }
  useStrictBehavior(e, t, a) {
    var n = this.strict;
    if (typeof n == "function")
      try {
        n = n(e, t, a);
      } catch {
        n = "error";
      }
    return !n || n === "ignore"
      ? !1
      : n === !0 || n === "error"
      ? !0
      : n === "warn"
      ? (typeof console < "u" &&
          console.warn(
            "LaTeX-incompatible input and strict mode is set to 'warn': " +
              (t + " [" + e + "]")
          ),
        !1)
      : (typeof console < "u" &&
          console.warn(
            "LaTeX-incompatible input and strict mode is set to " +
              ("unrecognized '" + n + "': " + t + " [" + e + "]")
          ),
        !1);
  }
  isTrusted(e) {
    if (e.url && !e.protocol) {
      var t = I.protocolFromUrl(e.url);
      if (t == null) return !1;
      e.protocol = t;
    }
    var a = typeof this.trust == "function" ? this.trust(e) : this.trust;
    return !!a;
  }
}
class G0 {
  constructor(e, t, a) {
    (this.id = void 0),
      (this.size = void 0),
      (this.cramped = void 0),
      (this.id = e),
      (this.size = t),
      (this.cramped = a);
  }
  sup() {
    return S0[nn[this.id]];
  }
  sub() {
    return S0[sn[this.id]];
  }
  fracNum() {
    return S0[ln[this.id]];
  }
  fracDen() {
    return S0[on[this.id]];
  }
  cramp() {
    return S0[un[this.id]];
  }
  text() {
    return S0[hn[this.id]];
  }
  isTight() {
    return this.size >= 2;
  }
}
var qt = 0,
  Fe = 1,
  le = 2,
  R0 = 3,
  ve = 4,
  v0 = 5,
  he = 6,
  s0 = 7,
  S0 = [
    new G0(qt, 0, !1),
    new G0(Fe, 0, !0),
    new G0(le, 1, !1),
    new G0(R0, 1, !0),
    new G0(ve, 2, !1),
    new G0(v0, 2, !0),
    new G0(he, 3, !1),
    new G0(s0, 3, !0),
  ],
  nn = [ve, v0, ve, v0, he, s0, he, s0],
  sn = [v0, v0, v0, v0, s0, s0, s0, s0],
  ln = [le, R0, ve, v0, he, s0, he, s0],
  on = [R0, R0, v0, v0, s0, s0, s0, s0],
  un = [Fe, Fe, R0, R0, v0, v0, s0, s0],
  hn = [qt, Fe, le, R0, le, R0, le, R0],
  q = { DISPLAY: S0[qt], TEXT: S0[le], SCRIPT: S0[ve], SCRIPTSCRIPT: S0[he] },
  Mt = [
    {
      name: "latin",
      blocks: [
        [256, 591],
        [768, 879],
      ],
    },
    { name: "cyrillic", blocks: [[1024, 1279]] },
    { name: "armenian", blocks: [[1328, 1423]] },
    { name: "brahmic", blocks: [[2304, 4255]] },
    { name: "georgian", blocks: [[4256, 4351]] },
    {
      name: "cjk",
      blocks: [
        [12288, 12543],
        [19968, 40879],
        [65280, 65376],
      ],
    },
    { name: "hangul", blocks: [[44032, 55215]] },
  ];
function cn(r) {
  for (var e = 0; e < Mt.length; e++)
    for (var t = Mt[e], a = 0; a < t.blocks.length; a++) {
      var n = t.blocks[a];
      if (r >= n[0] && r <= n[1]) return t.name;
    }
  return null;
}
var Le = [];
Mt.forEach((r) => r.blocks.forEach((e) => Le.push(...e)));
function $r(r) {
  for (var e = 0; e < Le.length; e += 2)
    if (r >= Le[e] && r <= Le[e + 1]) return !0;
  return !1;
}
var ie = 80,
  mn = function (e, t) {
    return (
      "M95," +
      (622 + e + t) +
      `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` +
      e / 2.075 +
      " -" +
      e +
      `
c5.3,-9.3,12,-14,20,-14
H400000v` +
      (40 + e) +
      `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` +
      (834 + e) +
      " " +
      t +
      "h400000v" +
      (40 + e) +
      "h-400000z"
    );
  },
  dn = function (e, t) {
    return (
      "M263," +
      (601 + e + t) +
      `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` +
      e / 2.084 +
      " -" +
      e +
      `
c4.7,-7.3,11,-11,19,-11
H40000v` +
      (40 + e) +
      `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` +
      (1001 + e) +
      " " +
      t +
      "h400000v" +
      (40 + e) +
      "h-400000z"
    );
  },
  fn = function (e, t) {
    return (
      "M983 " +
      (10 + e + t) +
      `
l` +
      e / 3.13 +
      " -" +
      e +
      `
c4,-6.7,10,-10,18,-10 H400000v` +
      (40 + e) +
      `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` +
      (1001 + e) +
      " " +
      t +
      "h400000v" +
      (40 + e) +
      "h-400000z"
    );
  },
  pn = function (e, t) {
    return (
      "M424," +
      (2398 + e + t) +
      `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` +
      e / 4.223 +
      " -" +
      e +
      `c4,-6.7,10,-10,18,-10 H400000
v` +
      (40 + e) +
      `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` +
      (1001 + e) +
      " " +
      t +
      `
h400000v` +
      (40 + e) +
      "h-400000z"
    );
  },
  vn = function (e, t) {
    return (
      "M473," +
      (2713 + e + t) +
      `
c339.3,-1799.3,509.3,-2700,510,-2702 l` +
      e / 5.298 +
      " -" +
      e +
      `
c3.3,-7.3,9.3,-11,18,-11 H400000v` +
      (40 + e) +
      `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` +
      (1001 + e) +
      " " +
      t +
      "h400000v" +
      (40 + e) +
      "H1017.7z"
    );
  },
  gn = function (e) {
    var t = e / 2;
    return (
      "M400000 " + e + " H0 L" + t + " 0 l65 45 L145 " + (e - 80) + " H400000z"
    );
  },
  bn = function (e, t, a) {
    var n = a - 54 - t - e;
    return (
      "M702 " +
      (e + t) +
      "H400000" +
      (40 + e) +
      `
H742v` +
      n +
      `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` +
      t +
      "H400000v" +
      (40 + e) +
      "H742z"
    );
  },
  yn = function (e, t, a) {
    t = 1e3 * t;
    var n = "";
    switch (e) {
      case "sqrtMain":
        n = mn(t, ie);
        break;
      case "sqrtSize1":
        n = dn(t, ie);
        break;
      case "sqrtSize2":
        n = fn(t, ie);
        break;
      case "sqrtSize3":
        n = pn(t, ie);
        break;
      case "sqrtSize4":
        n = vn(t, ie);
        break;
      case "sqrtTall":
        n = bn(t, ie, a);
    }
    return n;
  },
  wn = function (e, t) {
    switch (e) {
      case "⎜":
        return "M291 0 H417 V" + t + " H291z M291 0 H417 V" + t + " H291z";
      case "∣":
        return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145z";
      case "∥":
        return (
          "M145 0 H188 V" +
          t +
          " H145z M145 0 H188 V" +
          t +
          " H145z" +
          ("M367 0 H410 V" + t + " H367z M367 0 H410 V" + t + " H367z")
        );
      case "⎟":
        return "M457 0 H583 V" + t + " H457z M457 0 H583 V" + t + " H457z";
      case "⎢":
        return "M319 0 H403 V" + t + " H319z M319 0 H403 V" + t + " H319z";
      case "⎥":
        return "M263 0 H347 V" + t + " H263z M263 0 H347 V" + t + " H263z";
      case "⎪":
        return "M384 0 H504 V" + t + " H384z M384 0 H504 V" + t + " H384z";
      case "⏐":
        return "M312 0 H355 V" + t + " H312z M312 0 H355 V" + t + " H312z";
      case "‖":
        return (
          "M257 0 H300 V" +
          t +
          " H257z M257 0 H300 V" +
          t +
          " H257z" +
          ("M478 0 H521 V" + t + " H478z M478 0 H521 V" + t + " H478z")
        );
      default:
        return "";
    }
  },
  ur = {
    doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,
    doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,
    leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,
    leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,
    leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,
    leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,
    leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,
    leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,
    leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,
    leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,
    leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,
    lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,
    leftlinesegment: `M40 281 V428 H0 V94 H40 V241 H400000 v40z
M40 281 V428 H0 V94 H40 V241 H400000 v40z`,
    leftmapsto: `M40 281 V448H0V74H40V241H400000v40z
M40 281 V448H0V74H40V241H400000v40z`,
    leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,
    longequal: `M0 50 h400000 v40H0z m0 194h40000v40H0z
M0 50 h400000 v40H0z m0 194h40000v40H0z`,
    midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,
    midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,
    oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,
    oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,
    oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,
    oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,
    rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,
    rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,
    rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,
    rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,
    rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,
    rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,
    rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,
    rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,
    rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,
    righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,
    rightlinesegment: `M399960 241 V94 h40 V428 h-40 V281 H0 v-40z
M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`,
    rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,
    twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,
    twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,
    tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,
    tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,
    tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,
    tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,
    vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,
    widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,
    widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
    widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
    widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
    widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,
    widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
    widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
    widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
    baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,
    rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,
    baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,
    rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,
    shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,
    shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z`,
  },
  xn = function (e, t) {
    switch (e) {
      case "lbrack":
        return (
          "M403 1759 V84 H666 V0 H319 V1759 v" +
          t +
          ` v1759 h347 v-84
H403z M403 1759 V0 H319 V1759 v` +
          t +
          " v1759 h84z"
        );
      case "rbrack":
        return (
          "M347 1759 V0 H0 V84 H263 V1759 v" +
          t +
          ` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` +
          t +
          " v1759 h84z"
        );
      case "vert":
        return (
          "M145 15 v585 v" +
          t +
          ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` +
          -t +
          ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` +
          t +
          " v585 h43z"
        );
      case "doublevert":
        return (
          "M145 15 v585 v" +
          t +
          ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` +
          -t +
          ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` +
          t +
          ` v585 h43z
M367 15 v585 v` +
          t +
          ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` +
          -t +
          ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` +
          t +
          " v585 h43z"
        );
      case "lfloor":
        return (
          "M319 602 V0 H403 V602 v" +
          t +
          ` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` +
          t +
          " v1715 H319z"
        );
      case "rfloor":
        return (
          "M319 602 V0 H403 V602 v" +
          t +
          ` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` +
          t +
          " v1715 H319z"
        );
      case "lceil":
        return (
          "M403 1759 V84 H666 V0 H319 V1759 v" +
          t +
          ` v602 h84z
M403 1759 V0 H319 V1759 v` +
          t +
          " v602 h84z"
        );
      case "rceil":
        return (
          "M347 1759 V0 H0 V84 H263 V1759 v" +
          t +
          ` v602 h84z
M347 1759 V0 h-84 V1759 v` +
          t +
          " v602 h84z"
        );
      case "lparen":
        return (
          `M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` +
          (t + 84) +
          `c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` +
          (t + 92) +
          `c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`
        );
      case "rparen":
        return (
          `M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` +
          (t + 9) +
          `
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` +
          (t + 144) +
          `c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`
        );
      default:
        throw new Error("Unknown stretchy delimiter.");
    }
  };
class be {
  constructor(e) {
    (this.children = void 0),
      (this.classes = void 0),
      (this.height = void 0),
      (this.depth = void 0),
      (this.maxFontSize = void 0),
      (this.style = void 0),
      (this.children = e),
      (this.classes = []),
      (this.height = 0),
      (this.depth = 0),
      (this.maxFontSize = 0),
      (this.style = {});
  }
  hasClass(e) {
    return I.contains(this.classes, e);
  }
  toNode() {
    for (
      var e = document.createDocumentFragment(), t = 0;
      t < this.children.length;
      t++
    )
      e.appendChild(this.children[t].toNode());
    return e;
  }
  toMarkup() {
    for (var e = "", t = 0; t < this.children.length; t++)
      e += this.children[t].toMarkup();
    return e;
  }
  toText() {
    var e = (t) => t.toText();
    return this.children.map(e).join("");
  }
}
var k0 = {
    "AMS-Regular": {
      32: [0, 0, 0, 0, 0.25],
      65: [0, 0.68889, 0, 0, 0.72222],
      66: [0, 0.68889, 0, 0, 0.66667],
      67: [0, 0.68889, 0, 0, 0.72222],
      68: [0, 0.68889, 0, 0, 0.72222],
      69: [0, 0.68889, 0, 0, 0.66667],
      70: [0, 0.68889, 0, 0, 0.61111],
      71: [0, 0.68889, 0, 0, 0.77778],
      72: [0, 0.68889, 0, 0, 0.77778],
      73: [0, 0.68889, 0, 0, 0.38889],
      74: [0.16667, 0.68889, 0, 0, 0.5],
      75: [0, 0.68889, 0, 0, 0.77778],
      76: [0, 0.68889, 0, 0, 0.66667],
      77: [0, 0.68889, 0, 0, 0.94445],
      78: [0, 0.68889, 0, 0, 0.72222],
      79: [0.16667, 0.68889, 0, 0, 0.77778],
      80: [0, 0.68889, 0, 0, 0.61111],
      81: [0.16667, 0.68889, 0, 0, 0.77778],
      82: [0, 0.68889, 0, 0, 0.72222],
      83: [0, 0.68889, 0, 0, 0.55556],
      84: [0, 0.68889, 0, 0, 0.66667],
      85: [0, 0.68889, 0, 0, 0.72222],
      86: [0, 0.68889, 0, 0, 0.72222],
      87: [0, 0.68889, 0, 0, 1],
      88: [0, 0.68889, 0, 0, 0.72222],
      89: [0, 0.68889, 0, 0, 0.72222],
      90: [0, 0.68889, 0, 0, 0.66667],
      107: [0, 0.68889, 0, 0, 0.55556],
      160: [0, 0, 0, 0, 0.25],
      165: [0, 0.675, 0.025, 0, 0.75],
      174: [0.15559, 0.69224, 0, 0, 0.94666],
      240: [0, 0.68889, 0, 0, 0.55556],
      295: [0, 0.68889, 0, 0, 0.54028],
      710: [0, 0.825, 0, 0, 2.33334],
      732: [0, 0.9, 0, 0, 2.33334],
      770: [0, 0.825, 0, 0, 2.33334],
      771: [0, 0.9, 0, 0, 2.33334],
      989: [0.08167, 0.58167, 0, 0, 0.77778],
      1008: [0, 0.43056, 0.04028, 0, 0.66667],
      8245: [0, 0.54986, 0, 0, 0.275],
      8463: [0, 0.68889, 0, 0, 0.54028],
      8487: [0, 0.68889, 0, 0, 0.72222],
      8498: [0, 0.68889, 0, 0, 0.55556],
      8502: [0, 0.68889, 0, 0, 0.66667],
      8503: [0, 0.68889, 0, 0, 0.44445],
      8504: [0, 0.68889, 0, 0, 0.66667],
      8513: [0, 0.68889, 0, 0, 0.63889],
      8592: [-0.03598, 0.46402, 0, 0, 0.5],
      8594: [-0.03598, 0.46402, 0, 0, 0.5],
      8602: [-0.13313, 0.36687, 0, 0, 1],
      8603: [-0.13313, 0.36687, 0, 0, 1],
      8606: [0.01354, 0.52239, 0, 0, 1],
      8608: [0.01354, 0.52239, 0, 0, 1],
      8610: [0.01354, 0.52239, 0, 0, 1.11111],
      8611: [0.01354, 0.52239, 0, 0, 1.11111],
      8619: [0, 0.54986, 0, 0, 1],
      8620: [0, 0.54986, 0, 0, 1],
      8621: [-0.13313, 0.37788, 0, 0, 1.38889],
      8622: [-0.13313, 0.36687, 0, 0, 1],
      8624: [0, 0.69224, 0, 0, 0.5],
      8625: [0, 0.69224, 0, 0, 0.5],
      8630: [0, 0.43056, 0, 0, 1],
      8631: [0, 0.43056, 0, 0, 1],
      8634: [0.08198, 0.58198, 0, 0, 0.77778],
      8635: [0.08198, 0.58198, 0, 0, 0.77778],
      8638: [0.19444, 0.69224, 0, 0, 0.41667],
      8639: [0.19444, 0.69224, 0, 0, 0.41667],
      8642: [0.19444, 0.69224, 0, 0, 0.41667],
      8643: [0.19444, 0.69224, 0, 0, 0.41667],
      8644: [0.1808, 0.675, 0, 0, 1],
      8646: [0.1808, 0.675, 0, 0, 1],
      8647: [0.1808, 0.675, 0, 0, 1],
      8648: [0.19444, 0.69224, 0, 0, 0.83334],
      8649: [0.1808, 0.675, 0, 0, 1],
      8650: [0.19444, 0.69224, 0, 0, 0.83334],
      8651: [0.01354, 0.52239, 0, 0, 1],
      8652: [0.01354, 0.52239, 0, 0, 1],
      8653: [-0.13313, 0.36687, 0, 0, 1],
      8654: [-0.13313, 0.36687, 0, 0, 1],
      8655: [-0.13313, 0.36687, 0, 0, 1],
      8666: [0.13667, 0.63667, 0, 0, 1],
      8667: [0.13667, 0.63667, 0, 0, 1],
      8669: [-0.13313, 0.37788, 0, 0, 1],
      8672: [-0.064, 0.437, 0, 0, 1.334],
      8674: [-0.064, 0.437, 0, 0, 1.334],
      8705: [0, 0.825, 0, 0, 0.5],
      8708: [0, 0.68889, 0, 0, 0.55556],
      8709: [0.08167, 0.58167, 0, 0, 0.77778],
      8717: [0, 0.43056, 0, 0, 0.42917],
      8722: [-0.03598, 0.46402, 0, 0, 0.5],
      8724: [0.08198, 0.69224, 0, 0, 0.77778],
      8726: [0.08167, 0.58167, 0, 0, 0.77778],
      8733: [0, 0.69224, 0, 0, 0.77778],
      8736: [0, 0.69224, 0, 0, 0.72222],
      8737: [0, 0.69224, 0, 0, 0.72222],
      8738: [0.03517, 0.52239, 0, 0, 0.72222],
      8739: [0.08167, 0.58167, 0, 0, 0.22222],
      8740: [0.25142, 0.74111, 0, 0, 0.27778],
      8741: [0.08167, 0.58167, 0, 0, 0.38889],
      8742: [0.25142, 0.74111, 0, 0, 0.5],
      8756: [0, 0.69224, 0, 0, 0.66667],
      8757: [0, 0.69224, 0, 0, 0.66667],
      8764: [-0.13313, 0.36687, 0, 0, 0.77778],
      8765: [-0.13313, 0.37788, 0, 0, 0.77778],
      8769: [-0.13313, 0.36687, 0, 0, 0.77778],
      8770: [-0.03625, 0.46375, 0, 0, 0.77778],
      8774: [0.30274, 0.79383, 0, 0, 0.77778],
      8776: [-0.01688, 0.48312, 0, 0, 0.77778],
      8778: [0.08167, 0.58167, 0, 0, 0.77778],
      8782: [0.06062, 0.54986, 0, 0, 0.77778],
      8783: [0.06062, 0.54986, 0, 0, 0.77778],
      8785: [0.08198, 0.58198, 0, 0, 0.77778],
      8786: [0.08198, 0.58198, 0, 0, 0.77778],
      8787: [0.08198, 0.58198, 0, 0, 0.77778],
      8790: [0, 0.69224, 0, 0, 0.77778],
      8791: [0.22958, 0.72958, 0, 0, 0.77778],
      8796: [0.08198, 0.91667, 0, 0, 0.77778],
      8806: [0.25583, 0.75583, 0, 0, 0.77778],
      8807: [0.25583, 0.75583, 0, 0, 0.77778],
      8808: [0.25142, 0.75726, 0, 0, 0.77778],
      8809: [0.25142, 0.75726, 0, 0, 0.77778],
      8812: [0.25583, 0.75583, 0, 0, 0.5],
      8814: [0.20576, 0.70576, 0, 0, 0.77778],
      8815: [0.20576, 0.70576, 0, 0, 0.77778],
      8816: [0.30274, 0.79383, 0, 0, 0.77778],
      8817: [0.30274, 0.79383, 0, 0, 0.77778],
      8818: [0.22958, 0.72958, 0, 0, 0.77778],
      8819: [0.22958, 0.72958, 0, 0, 0.77778],
      8822: [0.1808, 0.675, 0, 0, 0.77778],
      8823: [0.1808, 0.675, 0, 0, 0.77778],
      8828: [0.13667, 0.63667, 0, 0, 0.77778],
      8829: [0.13667, 0.63667, 0, 0, 0.77778],
      8830: [0.22958, 0.72958, 0, 0, 0.77778],
      8831: [0.22958, 0.72958, 0, 0, 0.77778],
      8832: [0.20576, 0.70576, 0, 0, 0.77778],
      8833: [0.20576, 0.70576, 0, 0, 0.77778],
      8840: [0.30274, 0.79383, 0, 0, 0.77778],
      8841: [0.30274, 0.79383, 0, 0, 0.77778],
      8842: [0.13597, 0.63597, 0, 0, 0.77778],
      8843: [0.13597, 0.63597, 0, 0, 0.77778],
      8847: [0.03517, 0.54986, 0, 0, 0.77778],
      8848: [0.03517, 0.54986, 0, 0, 0.77778],
      8858: [0.08198, 0.58198, 0, 0, 0.77778],
      8859: [0.08198, 0.58198, 0, 0, 0.77778],
      8861: [0.08198, 0.58198, 0, 0, 0.77778],
      8862: [0, 0.675, 0, 0, 0.77778],
      8863: [0, 0.675, 0, 0, 0.77778],
      8864: [0, 0.675, 0, 0, 0.77778],
      8865: [0, 0.675, 0, 0, 0.77778],
      8872: [0, 0.69224, 0, 0, 0.61111],
      8873: [0, 0.69224, 0, 0, 0.72222],
      8874: [0, 0.69224, 0, 0, 0.88889],
      8876: [0, 0.68889, 0, 0, 0.61111],
      8877: [0, 0.68889, 0, 0, 0.61111],
      8878: [0, 0.68889, 0, 0, 0.72222],
      8879: [0, 0.68889, 0, 0, 0.72222],
      8882: [0.03517, 0.54986, 0, 0, 0.77778],
      8883: [0.03517, 0.54986, 0, 0, 0.77778],
      8884: [0.13667, 0.63667, 0, 0, 0.77778],
      8885: [0.13667, 0.63667, 0, 0, 0.77778],
      8888: [0, 0.54986, 0, 0, 1.11111],
      8890: [0.19444, 0.43056, 0, 0, 0.55556],
      8891: [0.19444, 0.69224, 0, 0, 0.61111],
      8892: [0.19444, 0.69224, 0, 0, 0.61111],
      8901: [0, 0.54986, 0, 0, 0.27778],
      8903: [0.08167, 0.58167, 0, 0, 0.77778],
      8905: [0.08167, 0.58167, 0, 0, 0.77778],
      8906: [0.08167, 0.58167, 0, 0, 0.77778],
      8907: [0, 0.69224, 0, 0, 0.77778],
      8908: [0, 0.69224, 0, 0, 0.77778],
      8909: [-0.03598, 0.46402, 0, 0, 0.77778],
      8910: [0, 0.54986, 0, 0, 0.76042],
      8911: [0, 0.54986, 0, 0, 0.76042],
      8912: [0.03517, 0.54986, 0, 0, 0.77778],
      8913: [0.03517, 0.54986, 0, 0, 0.77778],
      8914: [0, 0.54986, 0, 0, 0.66667],
      8915: [0, 0.54986, 0, 0, 0.66667],
      8916: [0, 0.69224, 0, 0, 0.66667],
      8918: [0.0391, 0.5391, 0, 0, 0.77778],
      8919: [0.0391, 0.5391, 0, 0, 0.77778],
      8920: [0.03517, 0.54986, 0, 0, 1.33334],
      8921: [0.03517, 0.54986, 0, 0, 1.33334],
      8922: [0.38569, 0.88569, 0, 0, 0.77778],
      8923: [0.38569, 0.88569, 0, 0, 0.77778],
      8926: [0.13667, 0.63667, 0, 0, 0.77778],
      8927: [0.13667, 0.63667, 0, 0, 0.77778],
      8928: [0.30274, 0.79383, 0, 0, 0.77778],
      8929: [0.30274, 0.79383, 0, 0, 0.77778],
      8934: [0.23222, 0.74111, 0, 0, 0.77778],
      8935: [0.23222, 0.74111, 0, 0, 0.77778],
      8936: [0.23222, 0.74111, 0, 0, 0.77778],
      8937: [0.23222, 0.74111, 0, 0, 0.77778],
      8938: [0.20576, 0.70576, 0, 0, 0.77778],
      8939: [0.20576, 0.70576, 0, 0, 0.77778],
      8940: [0.30274, 0.79383, 0, 0, 0.77778],
      8941: [0.30274, 0.79383, 0, 0, 0.77778],
      8994: [0.19444, 0.69224, 0, 0, 0.77778],
      8995: [0.19444, 0.69224, 0, 0, 0.77778],
      9416: [0.15559, 0.69224, 0, 0, 0.90222],
      9484: [0, 0.69224, 0, 0, 0.5],
      9488: [0, 0.69224, 0, 0, 0.5],
      9492: [0, 0.37788, 0, 0, 0.5],
      9496: [0, 0.37788, 0, 0, 0.5],
      9585: [0.19444, 0.68889, 0, 0, 0.88889],
      9586: [0.19444, 0.74111, 0, 0, 0.88889],
      9632: [0, 0.675, 0, 0, 0.77778],
      9633: [0, 0.675, 0, 0, 0.77778],
      9650: [0, 0.54986, 0, 0, 0.72222],
      9651: [0, 0.54986, 0, 0, 0.72222],
      9654: [0.03517, 0.54986, 0, 0, 0.77778],
      9660: [0, 0.54986, 0, 0, 0.72222],
      9661: [0, 0.54986, 0, 0, 0.72222],
      9664: [0.03517, 0.54986, 0, 0, 0.77778],
      9674: [0.11111, 0.69224, 0, 0, 0.66667],
      9733: [0.19444, 0.69224, 0, 0, 0.94445],
      10003: [0, 0.69224, 0, 0, 0.83334],
      10016: [0, 0.69224, 0, 0, 0.83334],
      10731: [0.11111, 0.69224, 0, 0, 0.66667],
      10846: [0.19444, 0.75583, 0, 0, 0.61111],
      10877: [0.13667, 0.63667, 0, 0, 0.77778],
      10878: [0.13667, 0.63667, 0, 0, 0.77778],
      10885: [0.25583, 0.75583, 0, 0, 0.77778],
      10886: [0.25583, 0.75583, 0, 0, 0.77778],
      10887: [0.13597, 0.63597, 0, 0, 0.77778],
      10888: [0.13597, 0.63597, 0, 0, 0.77778],
      10889: [0.26167, 0.75726, 0, 0, 0.77778],
      10890: [0.26167, 0.75726, 0, 0, 0.77778],
      10891: [0.48256, 0.98256, 0, 0, 0.77778],
      10892: [0.48256, 0.98256, 0, 0, 0.77778],
      10901: [0.13667, 0.63667, 0, 0, 0.77778],
      10902: [0.13667, 0.63667, 0, 0, 0.77778],
      10933: [0.25142, 0.75726, 0, 0, 0.77778],
      10934: [0.25142, 0.75726, 0, 0, 0.77778],
      10935: [0.26167, 0.75726, 0, 0, 0.77778],
      10936: [0.26167, 0.75726, 0, 0, 0.77778],
      10937: [0.26167, 0.75726, 0, 0, 0.77778],
      10938: [0.26167, 0.75726, 0, 0, 0.77778],
      10949: [0.25583, 0.75583, 0, 0, 0.77778],
      10950: [0.25583, 0.75583, 0, 0, 0.77778],
      10955: [0.28481, 0.79383, 0, 0, 0.77778],
      10956: [0.28481, 0.79383, 0, 0, 0.77778],
      57350: [0.08167, 0.58167, 0, 0, 0.22222],
      57351: [0.08167, 0.58167, 0, 0, 0.38889],
      57352: [0.08167, 0.58167, 0, 0, 0.77778],
      57353: [0, 0.43056, 0.04028, 0, 0.66667],
      57356: [0.25142, 0.75726, 0, 0, 0.77778],
      57357: [0.25142, 0.75726, 0, 0, 0.77778],
      57358: [0.41951, 0.91951, 0, 0, 0.77778],
      57359: [0.30274, 0.79383, 0, 0, 0.77778],
      57360: [0.30274, 0.79383, 0, 0, 0.77778],
      57361: [0.41951, 0.91951, 0, 0, 0.77778],
      57366: [0.25142, 0.75726, 0, 0, 0.77778],
      57367: [0.25142, 0.75726, 0, 0, 0.77778],
      57368: [0.25142, 0.75726, 0, 0, 0.77778],
      57369: [0.25142, 0.75726, 0, 0, 0.77778],
      57370: [0.13597, 0.63597, 0, 0, 0.77778],
      57371: [0.13597, 0.63597, 0, 0, 0.77778],
    },
    "Caligraphic-Regular": {
      32: [0, 0, 0, 0, 0.25],
      65: [0, 0.68333, 0, 0.19445, 0.79847],
      66: [0, 0.68333, 0.03041, 0.13889, 0.65681],
      67: [0, 0.68333, 0.05834, 0.13889, 0.52653],
      68: [0, 0.68333, 0.02778, 0.08334, 0.77139],
      69: [0, 0.68333, 0.08944, 0.11111, 0.52778],
      70: [0, 0.68333, 0.09931, 0.11111, 0.71875],
      71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
      72: [0, 0.68333, 0.00965, 0.11111, 0.84452],
      73: [0, 0.68333, 0.07382, 0, 0.54452],
      74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
      75: [0, 0.68333, 0.01445, 0.05556, 0.76195],
      76: [0, 0.68333, 0, 0.13889, 0.68972],
      77: [0, 0.68333, 0, 0.13889, 1.2009],
      78: [0, 0.68333, 0.14736, 0.08334, 0.82049],
      79: [0, 0.68333, 0.02778, 0.11111, 0.79611],
      80: [0, 0.68333, 0.08222, 0.08334, 0.69556],
      81: [0.09722, 0.68333, 0, 0.11111, 0.81667],
      82: [0, 0.68333, 0, 0.08334, 0.8475],
      83: [0, 0.68333, 0.075, 0.13889, 0.60556],
      84: [0, 0.68333, 0.25417, 0, 0.54464],
      85: [0, 0.68333, 0.09931, 0.08334, 0.62583],
      86: [0, 0.68333, 0.08222, 0, 0.61278],
      87: [0, 0.68333, 0.08222, 0.08334, 0.98778],
      88: [0, 0.68333, 0.14643, 0.13889, 0.7133],
      89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
      90: [0, 0.68333, 0.07944, 0.13889, 0.72473],
      160: [0, 0, 0, 0, 0.25],
    },
    "Fraktur-Regular": {
      32: [0, 0, 0, 0, 0.25],
      33: [0, 0.69141, 0, 0, 0.29574],
      34: [0, 0.69141, 0, 0, 0.21471],
      38: [0, 0.69141, 0, 0, 0.73786],
      39: [0, 0.69141, 0, 0, 0.21201],
      40: [0.24982, 0.74947, 0, 0, 0.38865],
      41: [0.24982, 0.74947, 0, 0, 0.38865],
      42: [0, 0.62119, 0, 0, 0.27764],
      43: [0.08319, 0.58283, 0, 0, 0.75623],
      44: [0, 0.10803, 0, 0, 0.27764],
      45: [0.08319, 0.58283, 0, 0, 0.75623],
      46: [0, 0.10803, 0, 0, 0.27764],
      47: [0.24982, 0.74947, 0, 0, 0.50181],
      48: [0, 0.47534, 0, 0, 0.50181],
      49: [0, 0.47534, 0, 0, 0.50181],
      50: [0, 0.47534, 0, 0, 0.50181],
      51: [0.18906, 0.47534, 0, 0, 0.50181],
      52: [0.18906, 0.47534, 0, 0, 0.50181],
      53: [0.18906, 0.47534, 0, 0, 0.50181],
      54: [0, 0.69141, 0, 0, 0.50181],
      55: [0.18906, 0.47534, 0, 0, 0.50181],
      56: [0, 0.69141, 0, 0, 0.50181],
      57: [0.18906, 0.47534, 0, 0, 0.50181],
      58: [0, 0.47534, 0, 0, 0.21606],
      59: [0.12604, 0.47534, 0, 0, 0.21606],
      61: [-0.13099, 0.36866, 0, 0, 0.75623],
      63: [0, 0.69141, 0, 0, 0.36245],
      65: [0, 0.69141, 0, 0, 0.7176],
      66: [0, 0.69141, 0, 0, 0.88397],
      67: [0, 0.69141, 0, 0, 0.61254],
      68: [0, 0.69141, 0, 0, 0.83158],
      69: [0, 0.69141, 0, 0, 0.66278],
      70: [0.12604, 0.69141, 0, 0, 0.61119],
      71: [0, 0.69141, 0, 0, 0.78539],
      72: [0.06302, 0.69141, 0, 0, 0.7203],
      73: [0, 0.69141, 0, 0, 0.55448],
      74: [0.12604, 0.69141, 0, 0, 0.55231],
      75: [0, 0.69141, 0, 0, 0.66845],
      76: [0, 0.69141, 0, 0, 0.66602],
      77: [0, 0.69141, 0, 0, 1.04953],
      78: [0, 0.69141, 0, 0, 0.83212],
      79: [0, 0.69141, 0, 0, 0.82699],
      80: [0.18906, 0.69141, 0, 0, 0.82753],
      81: [0.03781, 0.69141, 0, 0, 0.82699],
      82: [0, 0.69141, 0, 0, 0.82807],
      83: [0, 0.69141, 0, 0, 0.82861],
      84: [0, 0.69141, 0, 0, 0.66899],
      85: [0, 0.69141, 0, 0, 0.64576],
      86: [0, 0.69141, 0, 0, 0.83131],
      87: [0, 0.69141, 0, 0, 1.04602],
      88: [0, 0.69141, 0, 0, 0.71922],
      89: [0.18906, 0.69141, 0, 0, 0.83293],
      90: [0.12604, 0.69141, 0, 0, 0.60201],
      91: [0.24982, 0.74947, 0, 0, 0.27764],
      93: [0.24982, 0.74947, 0, 0, 0.27764],
      94: [0, 0.69141, 0, 0, 0.49965],
      97: [0, 0.47534, 0, 0, 0.50046],
      98: [0, 0.69141, 0, 0, 0.51315],
      99: [0, 0.47534, 0, 0, 0.38946],
      100: [0, 0.62119, 0, 0, 0.49857],
      101: [0, 0.47534, 0, 0, 0.40053],
      102: [0.18906, 0.69141, 0, 0, 0.32626],
      103: [0.18906, 0.47534, 0, 0, 0.5037],
      104: [0.18906, 0.69141, 0, 0, 0.52126],
      105: [0, 0.69141, 0, 0, 0.27899],
      106: [0, 0.69141, 0, 0, 0.28088],
      107: [0, 0.69141, 0, 0, 0.38946],
      108: [0, 0.69141, 0, 0, 0.27953],
      109: [0, 0.47534, 0, 0, 0.76676],
      110: [0, 0.47534, 0, 0, 0.52666],
      111: [0, 0.47534, 0, 0, 0.48885],
      112: [0.18906, 0.52396, 0, 0, 0.50046],
      113: [0.18906, 0.47534, 0, 0, 0.48912],
      114: [0, 0.47534, 0, 0, 0.38919],
      115: [0, 0.47534, 0, 0, 0.44266],
      116: [0, 0.62119, 0, 0, 0.33301],
      117: [0, 0.47534, 0, 0, 0.5172],
      118: [0, 0.52396, 0, 0, 0.5118],
      119: [0, 0.52396, 0, 0, 0.77351],
      120: [0.18906, 0.47534, 0, 0, 0.38865],
      121: [0.18906, 0.47534, 0, 0, 0.49884],
      122: [0.18906, 0.47534, 0, 0, 0.39054],
      160: [0, 0, 0, 0, 0.25],
      8216: [0, 0.69141, 0, 0, 0.21471],
      8217: [0, 0.69141, 0, 0, 0.21471],
      58112: [0, 0.62119, 0, 0, 0.49749],
      58113: [0, 0.62119, 0, 0, 0.4983],
      58114: [0.18906, 0.69141, 0, 0, 0.33328],
      58115: [0.18906, 0.69141, 0, 0, 0.32923],
      58116: [0.18906, 0.47534, 0, 0, 0.50343],
      58117: [0, 0.69141, 0, 0, 0.33301],
      58118: [0, 0.62119, 0, 0, 0.33409],
      58119: [0, 0.47534, 0, 0, 0.50073],
    },
    "Main-Bold": {
      32: [0, 0, 0, 0, 0.25],
      33: [0, 0.69444, 0, 0, 0.35],
      34: [0, 0.69444, 0, 0, 0.60278],
      35: [0.19444, 0.69444, 0, 0, 0.95833],
      36: [0.05556, 0.75, 0, 0, 0.575],
      37: [0.05556, 0.75, 0, 0, 0.95833],
      38: [0, 0.69444, 0, 0, 0.89444],
      39: [0, 0.69444, 0, 0, 0.31944],
      40: [0.25, 0.75, 0, 0, 0.44722],
      41: [0.25, 0.75, 0, 0, 0.44722],
      42: [0, 0.75, 0, 0, 0.575],
      43: [0.13333, 0.63333, 0, 0, 0.89444],
      44: [0.19444, 0.15556, 0, 0, 0.31944],
      45: [0, 0.44444, 0, 0, 0.38333],
      46: [0, 0.15556, 0, 0, 0.31944],
      47: [0.25, 0.75, 0, 0, 0.575],
      48: [0, 0.64444, 0, 0, 0.575],
      49: [0, 0.64444, 0, 0, 0.575],
      50: [0, 0.64444, 0, 0, 0.575],
      51: [0, 0.64444, 0, 0, 0.575],
      52: [0, 0.64444, 0, 0, 0.575],
      53: [0, 0.64444, 0, 0, 0.575],
      54: [0, 0.64444, 0, 0, 0.575],
      55: [0, 0.64444, 0, 0, 0.575],
      56: [0, 0.64444, 0, 0, 0.575],
      57: [0, 0.64444, 0, 0, 0.575],
      58: [0, 0.44444, 0, 0, 0.31944],
      59: [0.19444, 0.44444, 0, 0, 0.31944],
      60: [0.08556, 0.58556, 0, 0, 0.89444],
      61: [-0.10889, 0.39111, 0, 0, 0.89444],
      62: [0.08556, 0.58556, 0, 0, 0.89444],
      63: [0, 0.69444, 0, 0, 0.54305],
      64: [0, 0.69444, 0, 0, 0.89444],
      65: [0, 0.68611, 0, 0, 0.86944],
      66: [0, 0.68611, 0, 0, 0.81805],
      67: [0, 0.68611, 0, 0, 0.83055],
      68: [0, 0.68611, 0, 0, 0.88194],
      69: [0, 0.68611, 0, 0, 0.75555],
      70: [0, 0.68611, 0, 0, 0.72361],
      71: [0, 0.68611, 0, 0, 0.90416],
      72: [0, 0.68611, 0, 0, 0.9],
      73: [0, 0.68611, 0, 0, 0.43611],
      74: [0, 0.68611, 0, 0, 0.59444],
      75: [0, 0.68611, 0, 0, 0.90138],
      76: [0, 0.68611, 0, 0, 0.69166],
      77: [0, 0.68611, 0, 0, 1.09166],
      78: [0, 0.68611, 0, 0, 0.9],
      79: [0, 0.68611, 0, 0, 0.86388],
      80: [0, 0.68611, 0, 0, 0.78611],
      81: [0.19444, 0.68611, 0, 0, 0.86388],
      82: [0, 0.68611, 0, 0, 0.8625],
      83: [0, 0.68611, 0, 0, 0.63889],
      84: [0, 0.68611, 0, 0, 0.8],
      85: [0, 0.68611, 0, 0, 0.88472],
      86: [0, 0.68611, 0.01597, 0, 0.86944],
      87: [0, 0.68611, 0.01597, 0, 1.18888],
      88: [0, 0.68611, 0, 0, 0.86944],
      89: [0, 0.68611, 0.02875, 0, 0.86944],
      90: [0, 0.68611, 0, 0, 0.70277],
      91: [0.25, 0.75, 0, 0, 0.31944],
      92: [0.25, 0.75, 0, 0, 0.575],
      93: [0.25, 0.75, 0, 0, 0.31944],
      94: [0, 0.69444, 0, 0, 0.575],
      95: [0.31, 0.13444, 0.03194, 0, 0.575],
      97: [0, 0.44444, 0, 0, 0.55902],
      98: [0, 0.69444, 0, 0, 0.63889],
      99: [0, 0.44444, 0, 0, 0.51111],
      100: [0, 0.69444, 0, 0, 0.63889],
      101: [0, 0.44444, 0, 0, 0.52708],
      102: [0, 0.69444, 0.10903, 0, 0.35139],
      103: [0.19444, 0.44444, 0.01597, 0, 0.575],
      104: [0, 0.69444, 0, 0, 0.63889],
      105: [0, 0.69444, 0, 0, 0.31944],
      106: [0.19444, 0.69444, 0, 0, 0.35139],
      107: [0, 0.69444, 0, 0, 0.60694],
      108: [0, 0.69444, 0, 0, 0.31944],
      109: [0, 0.44444, 0, 0, 0.95833],
      110: [0, 0.44444, 0, 0, 0.63889],
      111: [0, 0.44444, 0, 0, 0.575],
      112: [0.19444, 0.44444, 0, 0, 0.63889],
      113: [0.19444, 0.44444, 0, 0, 0.60694],
      114: [0, 0.44444, 0, 0, 0.47361],
      115: [0, 0.44444, 0, 0, 0.45361],
      116: [0, 0.63492, 0, 0, 0.44722],
      117: [0, 0.44444, 0, 0, 0.63889],
      118: [0, 0.44444, 0.01597, 0, 0.60694],
      119: [0, 0.44444, 0.01597, 0, 0.83055],
      120: [0, 0.44444, 0, 0, 0.60694],
      121: [0.19444, 0.44444, 0.01597, 0, 0.60694],
      122: [0, 0.44444, 0, 0, 0.51111],
      123: [0.25, 0.75, 0, 0, 0.575],
      124: [0.25, 0.75, 0, 0, 0.31944],
      125: [0.25, 0.75, 0, 0, 0.575],
      126: [0.35, 0.34444, 0, 0, 0.575],
      160: [0, 0, 0, 0, 0.25],
      163: [0, 0.69444, 0, 0, 0.86853],
      168: [0, 0.69444, 0, 0, 0.575],
      172: [0, 0.44444, 0, 0, 0.76666],
      176: [0, 0.69444, 0, 0, 0.86944],
      177: [0.13333, 0.63333, 0, 0, 0.89444],
      184: [0.17014, 0, 0, 0, 0.51111],
      198: [0, 0.68611, 0, 0, 1.04166],
      215: [0.13333, 0.63333, 0, 0, 0.89444],
      216: [0.04861, 0.73472, 0, 0, 0.89444],
      223: [0, 0.69444, 0, 0, 0.59722],
      230: [0, 0.44444, 0, 0, 0.83055],
      247: [0.13333, 0.63333, 0, 0, 0.89444],
      248: [0.09722, 0.54167, 0, 0, 0.575],
      305: [0, 0.44444, 0, 0, 0.31944],
      338: [0, 0.68611, 0, 0, 1.16944],
      339: [0, 0.44444, 0, 0, 0.89444],
      567: [0.19444, 0.44444, 0, 0, 0.35139],
      710: [0, 0.69444, 0, 0, 0.575],
      711: [0, 0.63194, 0, 0, 0.575],
      713: [0, 0.59611, 0, 0, 0.575],
      714: [0, 0.69444, 0, 0, 0.575],
      715: [0, 0.69444, 0, 0, 0.575],
      728: [0, 0.69444, 0, 0, 0.575],
      729: [0, 0.69444, 0, 0, 0.31944],
      730: [0, 0.69444, 0, 0, 0.86944],
      732: [0, 0.69444, 0, 0, 0.575],
      733: [0, 0.69444, 0, 0, 0.575],
      915: [0, 0.68611, 0, 0, 0.69166],
      916: [0, 0.68611, 0, 0, 0.95833],
      920: [0, 0.68611, 0, 0, 0.89444],
      923: [0, 0.68611, 0, 0, 0.80555],
      926: [0, 0.68611, 0, 0, 0.76666],
      928: [0, 0.68611, 0, 0, 0.9],
      931: [0, 0.68611, 0, 0, 0.83055],
      933: [0, 0.68611, 0, 0, 0.89444],
      934: [0, 0.68611, 0, 0, 0.83055],
      936: [0, 0.68611, 0, 0, 0.89444],
      937: [0, 0.68611, 0, 0, 0.83055],
      8211: [0, 0.44444, 0.03194, 0, 0.575],
      8212: [0, 0.44444, 0.03194, 0, 1.14999],
      8216: [0, 0.69444, 0, 0, 0.31944],
      8217: [0, 0.69444, 0, 0, 0.31944],
      8220: [0, 0.69444, 0, 0, 0.60278],
      8221: [0, 0.69444, 0, 0, 0.60278],
      8224: [0.19444, 0.69444, 0, 0, 0.51111],
      8225: [0.19444, 0.69444, 0, 0, 0.51111],
      8242: [0, 0.55556, 0, 0, 0.34444],
      8407: [0, 0.72444, 0.15486, 0, 0.575],
      8463: [0, 0.69444, 0, 0, 0.66759],
      8465: [0, 0.69444, 0, 0, 0.83055],
      8467: [0, 0.69444, 0, 0, 0.47361],
      8472: [0.19444, 0.44444, 0, 0, 0.74027],
      8476: [0, 0.69444, 0, 0, 0.83055],
      8501: [0, 0.69444, 0, 0, 0.70277],
      8592: [-0.10889, 0.39111, 0, 0, 1.14999],
      8593: [0.19444, 0.69444, 0, 0, 0.575],
      8594: [-0.10889, 0.39111, 0, 0, 1.14999],
      8595: [0.19444, 0.69444, 0, 0, 0.575],
      8596: [-0.10889, 0.39111, 0, 0, 1.14999],
      8597: [0.25, 0.75, 0, 0, 0.575],
      8598: [0.19444, 0.69444, 0, 0, 1.14999],
      8599: [0.19444, 0.69444, 0, 0, 1.14999],
      8600: [0.19444, 0.69444, 0, 0, 1.14999],
      8601: [0.19444, 0.69444, 0, 0, 1.14999],
      8636: [-0.10889, 0.39111, 0, 0, 1.14999],
      8637: [-0.10889, 0.39111, 0, 0, 1.14999],
      8640: [-0.10889, 0.39111, 0, 0, 1.14999],
      8641: [-0.10889, 0.39111, 0, 0, 1.14999],
      8656: [-0.10889, 0.39111, 0, 0, 1.14999],
      8657: [0.19444, 0.69444, 0, 0, 0.70277],
      8658: [-0.10889, 0.39111, 0, 0, 1.14999],
      8659: [0.19444, 0.69444, 0, 0, 0.70277],
      8660: [-0.10889, 0.39111, 0, 0, 1.14999],
      8661: [0.25, 0.75, 0, 0, 0.70277],
      8704: [0, 0.69444, 0, 0, 0.63889],
      8706: [0, 0.69444, 0.06389, 0, 0.62847],
      8707: [0, 0.69444, 0, 0, 0.63889],
      8709: [0.05556, 0.75, 0, 0, 0.575],
      8711: [0, 0.68611, 0, 0, 0.95833],
      8712: [0.08556, 0.58556, 0, 0, 0.76666],
      8715: [0.08556, 0.58556, 0, 0, 0.76666],
      8722: [0.13333, 0.63333, 0, 0, 0.89444],
      8723: [0.13333, 0.63333, 0, 0, 0.89444],
      8725: [0.25, 0.75, 0, 0, 0.575],
      8726: [0.25, 0.75, 0, 0, 0.575],
      8727: [-0.02778, 0.47222, 0, 0, 0.575],
      8728: [-0.02639, 0.47361, 0, 0, 0.575],
      8729: [-0.02639, 0.47361, 0, 0, 0.575],
      8730: [0.18, 0.82, 0, 0, 0.95833],
      8733: [0, 0.44444, 0, 0, 0.89444],
      8734: [0, 0.44444, 0, 0, 1.14999],
      8736: [0, 0.69224, 0, 0, 0.72222],
      8739: [0.25, 0.75, 0, 0, 0.31944],
      8741: [0.25, 0.75, 0, 0, 0.575],
      8743: [0, 0.55556, 0, 0, 0.76666],
      8744: [0, 0.55556, 0, 0, 0.76666],
      8745: [0, 0.55556, 0, 0, 0.76666],
      8746: [0, 0.55556, 0, 0, 0.76666],
      8747: [0.19444, 0.69444, 0.12778, 0, 0.56875],
      8764: [-0.10889, 0.39111, 0, 0, 0.89444],
      8768: [0.19444, 0.69444, 0, 0, 0.31944],
      8771: [0.00222, 0.50222, 0, 0, 0.89444],
      8773: [0.027, 0.638, 0, 0, 0.894],
      8776: [0.02444, 0.52444, 0, 0, 0.89444],
      8781: [0.00222, 0.50222, 0, 0, 0.89444],
      8801: [0.00222, 0.50222, 0, 0, 0.89444],
      8804: [0.19667, 0.69667, 0, 0, 0.89444],
      8805: [0.19667, 0.69667, 0, 0, 0.89444],
      8810: [0.08556, 0.58556, 0, 0, 1.14999],
      8811: [0.08556, 0.58556, 0, 0, 1.14999],
      8826: [0.08556, 0.58556, 0, 0, 0.89444],
      8827: [0.08556, 0.58556, 0, 0, 0.89444],
      8834: [0.08556, 0.58556, 0, 0, 0.89444],
      8835: [0.08556, 0.58556, 0, 0, 0.89444],
      8838: [0.19667, 0.69667, 0, 0, 0.89444],
      8839: [0.19667, 0.69667, 0, 0, 0.89444],
      8846: [0, 0.55556, 0, 0, 0.76666],
      8849: [0.19667, 0.69667, 0, 0, 0.89444],
      8850: [0.19667, 0.69667, 0, 0, 0.89444],
      8851: [0, 0.55556, 0, 0, 0.76666],
      8852: [0, 0.55556, 0, 0, 0.76666],
      8853: [0.13333, 0.63333, 0, 0, 0.89444],
      8854: [0.13333, 0.63333, 0, 0, 0.89444],
      8855: [0.13333, 0.63333, 0, 0, 0.89444],
      8856: [0.13333, 0.63333, 0, 0, 0.89444],
      8857: [0.13333, 0.63333, 0, 0, 0.89444],
      8866: [0, 0.69444, 0, 0, 0.70277],
      8867: [0, 0.69444, 0, 0, 0.70277],
      8868: [0, 0.69444, 0, 0, 0.89444],
      8869: [0, 0.69444, 0, 0, 0.89444],
      8900: [-0.02639, 0.47361, 0, 0, 0.575],
      8901: [-0.02639, 0.47361, 0, 0, 0.31944],
      8902: [-0.02778, 0.47222, 0, 0, 0.575],
      8968: [0.25, 0.75, 0, 0, 0.51111],
      8969: [0.25, 0.75, 0, 0, 0.51111],
      8970: [0.25, 0.75, 0, 0, 0.51111],
      8971: [0.25, 0.75, 0, 0, 0.51111],
      8994: [-0.13889, 0.36111, 0, 0, 1.14999],
      8995: [-0.13889, 0.36111, 0, 0, 1.14999],
      9651: [0.19444, 0.69444, 0, 0, 1.02222],
      9657: [-0.02778, 0.47222, 0, 0, 0.575],
      9661: [0.19444, 0.69444, 0, 0, 1.02222],
      9667: [-0.02778, 0.47222, 0, 0, 0.575],
      9711: [0.19444, 0.69444, 0, 0, 1.14999],
      9824: [0.12963, 0.69444, 0, 0, 0.89444],
      9825: [0.12963, 0.69444, 0, 0, 0.89444],
      9826: [0.12963, 0.69444, 0, 0, 0.89444],
      9827: [0.12963, 0.69444, 0, 0, 0.89444],
      9837: [0, 0.75, 0, 0, 0.44722],
      9838: [0.19444, 0.69444, 0, 0, 0.44722],
      9839: [0.19444, 0.69444, 0, 0, 0.44722],
      10216: [0.25, 0.75, 0, 0, 0.44722],
      10217: [0.25, 0.75, 0, 0, 0.44722],
      10815: [0, 0.68611, 0, 0, 0.9],
      10927: [0.19667, 0.69667, 0, 0, 0.89444],
      10928: [0.19667, 0.69667, 0, 0, 0.89444],
      57376: [0.19444, 0.69444, 0, 0, 0],
    },
    "Main-BoldItalic": {
      32: [0, 0, 0, 0, 0.25],
      33: [0, 0.69444, 0.11417, 0, 0.38611],
      34: [0, 0.69444, 0.07939, 0, 0.62055],
      35: [0.19444, 0.69444, 0.06833, 0, 0.94444],
      37: [0.05556, 0.75, 0.12861, 0, 0.94444],
      38: [0, 0.69444, 0.08528, 0, 0.88555],
      39: [0, 0.69444, 0.12945, 0, 0.35555],
      40: [0.25, 0.75, 0.15806, 0, 0.47333],
      41: [0.25, 0.75, 0.03306, 0, 0.47333],
      42: [0, 0.75, 0.14333, 0, 0.59111],
      43: [0.10333, 0.60333, 0.03306, 0, 0.88555],
      44: [0.19444, 0.14722, 0, 0, 0.35555],
      45: [0, 0.44444, 0.02611, 0, 0.41444],
      46: [0, 0.14722, 0, 0, 0.35555],
      47: [0.25, 0.75, 0.15806, 0, 0.59111],
      48: [0, 0.64444, 0.13167, 0, 0.59111],
      49: [0, 0.64444, 0.13167, 0, 0.59111],
      50: [0, 0.64444, 0.13167, 0, 0.59111],
      51: [0, 0.64444, 0.13167, 0, 0.59111],
      52: [0.19444, 0.64444, 0.13167, 0, 0.59111],
      53: [0, 0.64444, 0.13167, 0, 0.59111],
      54: [0, 0.64444, 0.13167, 0, 0.59111],
      55: [0.19444, 0.64444, 0.13167, 0, 0.59111],
      56: [0, 0.64444, 0.13167, 0, 0.59111],
      57: [0, 0.64444, 0.13167, 0, 0.59111],
      58: [0, 0.44444, 0.06695, 0, 0.35555],
      59: [0.19444, 0.44444, 0.06695, 0, 0.35555],
      61: [-0.10889, 0.39111, 0.06833, 0, 0.88555],
      63: [0, 0.69444, 0.11472, 0, 0.59111],
      64: [0, 0.69444, 0.09208, 0, 0.88555],
      65: [0, 0.68611, 0, 0, 0.86555],
      66: [0, 0.68611, 0.0992, 0, 0.81666],
      67: [0, 0.68611, 0.14208, 0, 0.82666],
      68: [0, 0.68611, 0.09062, 0, 0.87555],
      69: [0, 0.68611, 0.11431, 0, 0.75666],
      70: [0, 0.68611, 0.12903, 0, 0.72722],
      71: [0, 0.68611, 0.07347, 0, 0.89527],
      72: [0, 0.68611, 0.17208, 0, 0.8961],
      73: [0, 0.68611, 0.15681, 0, 0.47166],
      74: [0, 0.68611, 0.145, 0, 0.61055],
      75: [0, 0.68611, 0.14208, 0, 0.89499],
      76: [0, 0.68611, 0, 0, 0.69777],
      77: [0, 0.68611, 0.17208, 0, 1.07277],
      78: [0, 0.68611, 0.17208, 0, 0.8961],
      79: [0, 0.68611, 0.09062, 0, 0.85499],
      80: [0, 0.68611, 0.0992, 0, 0.78721],
      81: [0.19444, 0.68611, 0.09062, 0, 0.85499],
      82: [0, 0.68611, 0.02559, 0, 0.85944],
      83: [0, 0.68611, 0.11264, 0, 0.64999],
      84: [0, 0.68611, 0.12903, 0, 0.7961],
      85: [0, 0.68611, 0.17208, 0, 0.88083],
      86: [0, 0.68611, 0.18625, 0, 0.86555],
      87: [0, 0.68611, 0.18625, 0, 1.15999],
      88: [0, 0.68611, 0.15681, 0, 0.86555],
      89: [0, 0.68611, 0.19803, 0, 0.86555],
      90: [0, 0.68611, 0.14208, 0, 0.70888],
      91: [0.25, 0.75, 0.1875, 0, 0.35611],
      93: [0.25, 0.75, 0.09972, 0, 0.35611],
      94: [0, 0.69444, 0.06709, 0, 0.59111],
      95: [0.31, 0.13444, 0.09811, 0, 0.59111],
      97: [0, 0.44444, 0.09426, 0, 0.59111],
      98: [0, 0.69444, 0.07861, 0, 0.53222],
      99: [0, 0.44444, 0.05222, 0, 0.53222],
      100: [0, 0.69444, 0.10861, 0, 0.59111],
      101: [0, 0.44444, 0.085, 0, 0.53222],
      102: [0.19444, 0.69444, 0.21778, 0, 0.4],
      103: [0.19444, 0.44444, 0.105, 0, 0.53222],
      104: [0, 0.69444, 0.09426, 0, 0.59111],
      105: [0, 0.69326, 0.11387, 0, 0.35555],
      106: [0.19444, 0.69326, 0.1672, 0, 0.35555],
      107: [0, 0.69444, 0.11111, 0, 0.53222],
      108: [0, 0.69444, 0.10861, 0, 0.29666],
      109: [0, 0.44444, 0.09426, 0, 0.94444],
      110: [0, 0.44444, 0.09426, 0, 0.64999],
      111: [0, 0.44444, 0.07861, 0, 0.59111],
      112: [0.19444, 0.44444, 0.07861, 0, 0.59111],
      113: [0.19444, 0.44444, 0.105, 0, 0.53222],
      114: [0, 0.44444, 0.11111, 0, 0.50167],
      115: [0, 0.44444, 0.08167, 0, 0.48694],
      116: [0, 0.63492, 0.09639, 0, 0.385],
      117: [0, 0.44444, 0.09426, 0, 0.62055],
      118: [0, 0.44444, 0.11111, 0, 0.53222],
      119: [0, 0.44444, 0.11111, 0, 0.76777],
      120: [0, 0.44444, 0.12583, 0, 0.56055],
      121: [0.19444, 0.44444, 0.105, 0, 0.56166],
      122: [0, 0.44444, 0.13889, 0, 0.49055],
      126: [0.35, 0.34444, 0.11472, 0, 0.59111],
      160: [0, 0, 0, 0, 0.25],
      168: [0, 0.69444, 0.11473, 0, 0.59111],
      176: [0, 0.69444, 0, 0, 0.94888],
      184: [0.17014, 0, 0, 0, 0.53222],
      198: [0, 0.68611, 0.11431, 0, 1.02277],
      216: [0.04861, 0.73472, 0.09062, 0, 0.88555],
      223: [0.19444, 0.69444, 0.09736, 0, 0.665],
      230: [0, 0.44444, 0.085, 0, 0.82666],
      248: [0.09722, 0.54167, 0.09458, 0, 0.59111],
      305: [0, 0.44444, 0.09426, 0, 0.35555],
      338: [0, 0.68611, 0.11431, 0, 1.14054],
      339: [0, 0.44444, 0.085, 0, 0.82666],
      567: [0.19444, 0.44444, 0.04611, 0, 0.385],
      710: [0, 0.69444, 0.06709, 0, 0.59111],
      711: [0, 0.63194, 0.08271, 0, 0.59111],
      713: [0, 0.59444, 0.10444, 0, 0.59111],
      714: [0, 0.69444, 0.08528, 0, 0.59111],
      715: [0, 0.69444, 0, 0, 0.59111],
      728: [0, 0.69444, 0.10333, 0, 0.59111],
      729: [0, 0.69444, 0.12945, 0, 0.35555],
      730: [0, 0.69444, 0, 0, 0.94888],
      732: [0, 0.69444, 0.11472, 0, 0.59111],
      733: [0, 0.69444, 0.11472, 0, 0.59111],
      915: [0, 0.68611, 0.12903, 0, 0.69777],
      916: [0, 0.68611, 0, 0, 0.94444],
      920: [0, 0.68611, 0.09062, 0, 0.88555],
      923: [0, 0.68611, 0, 0, 0.80666],
      926: [0, 0.68611, 0.15092, 0, 0.76777],
      928: [0, 0.68611, 0.17208, 0, 0.8961],
      931: [0, 0.68611, 0.11431, 0, 0.82666],
      933: [0, 0.68611, 0.10778, 0, 0.88555],
      934: [0, 0.68611, 0.05632, 0, 0.82666],
      936: [0, 0.68611, 0.10778, 0, 0.88555],
      937: [0, 0.68611, 0.0992, 0, 0.82666],
      8211: [0, 0.44444, 0.09811, 0, 0.59111],
      8212: [0, 0.44444, 0.09811, 0, 1.18221],
      8216: [0, 0.69444, 0.12945, 0, 0.35555],
      8217: [0, 0.69444, 0.12945, 0, 0.35555],
      8220: [0, 0.69444, 0.16772, 0, 0.62055],
      8221: [0, 0.69444, 0.07939, 0, 0.62055],
    },
    "Main-Italic": {
      32: [0, 0, 0, 0, 0.25],
      33: [0, 0.69444, 0.12417, 0, 0.30667],
      34: [0, 0.69444, 0.06961, 0, 0.51444],
      35: [0.19444, 0.69444, 0.06616, 0, 0.81777],
      37: [0.05556, 0.75, 0.13639, 0, 0.81777],
      38: [0, 0.69444, 0.09694, 0, 0.76666],
      39: [0, 0.69444, 0.12417, 0, 0.30667],
      40: [0.25, 0.75, 0.16194, 0, 0.40889],
      41: [0.25, 0.75, 0.03694, 0, 0.40889],
      42: [0, 0.75, 0.14917, 0, 0.51111],
      43: [0.05667, 0.56167, 0.03694, 0, 0.76666],
      44: [0.19444, 0.10556, 0, 0, 0.30667],
      45: [0, 0.43056, 0.02826, 0, 0.35778],
      46: [0, 0.10556, 0, 0, 0.30667],
      47: [0.25, 0.75, 0.16194, 0, 0.51111],
      48: [0, 0.64444, 0.13556, 0, 0.51111],
      49: [0, 0.64444, 0.13556, 0, 0.51111],
      50: [0, 0.64444, 0.13556, 0, 0.51111],
      51: [0, 0.64444, 0.13556, 0, 0.51111],
      52: [0.19444, 0.64444, 0.13556, 0, 0.51111],
      53: [0, 0.64444, 0.13556, 0, 0.51111],
      54: [0, 0.64444, 0.13556, 0, 0.51111],
      55: [0.19444, 0.64444, 0.13556, 0, 0.51111],
      56: [0, 0.64444, 0.13556, 0, 0.51111],
      57: [0, 0.64444, 0.13556, 0, 0.51111],
      58: [0, 0.43056, 0.0582, 0, 0.30667],
      59: [0.19444, 0.43056, 0.0582, 0, 0.30667],
      61: [-0.13313, 0.36687, 0.06616, 0, 0.76666],
      63: [0, 0.69444, 0.1225, 0, 0.51111],
      64: [0, 0.69444, 0.09597, 0, 0.76666],
      65: [0, 0.68333, 0, 0, 0.74333],
      66: [0, 0.68333, 0.10257, 0, 0.70389],
      67: [0, 0.68333, 0.14528, 0, 0.71555],
      68: [0, 0.68333, 0.09403, 0, 0.755],
      69: [0, 0.68333, 0.12028, 0, 0.67833],
      70: [0, 0.68333, 0.13305, 0, 0.65277],
      71: [0, 0.68333, 0.08722, 0, 0.77361],
      72: [0, 0.68333, 0.16389, 0, 0.74333],
      73: [0, 0.68333, 0.15806, 0, 0.38555],
      74: [0, 0.68333, 0.14028, 0, 0.525],
      75: [0, 0.68333, 0.14528, 0, 0.76888],
      76: [0, 0.68333, 0, 0, 0.62722],
      77: [0, 0.68333, 0.16389, 0, 0.89666],
      78: [0, 0.68333, 0.16389, 0, 0.74333],
      79: [0, 0.68333, 0.09403, 0, 0.76666],
      80: [0, 0.68333, 0.10257, 0, 0.67833],
      81: [0.19444, 0.68333, 0.09403, 0, 0.76666],
      82: [0, 0.68333, 0.03868, 0, 0.72944],
      83: [0, 0.68333, 0.11972, 0, 0.56222],
      84: [0, 0.68333, 0.13305, 0, 0.71555],
      85: [0, 0.68333, 0.16389, 0, 0.74333],
      86: [0, 0.68333, 0.18361, 0, 0.74333],
      87: [0, 0.68333, 0.18361, 0, 0.99888],
      88: [0, 0.68333, 0.15806, 0, 0.74333],
      89: [0, 0.68333, 0.19383, 0, 0.74333],
      90: [0, 0.68333, 0.14528, 0, 0.61333],
      91: [0.25, 0.75, 0.1875, 0, 0.30667],
      93: [0.25, 0.75, 0.10528, 0, 0.30667],
      94: [0, 0.69444, 0.06646, 0, 0.51111],
      95: [0.31, 0.12056, 0.09208, 0, 0.51111],
      97: [0, 0.43056, 0.07671, 0, 0.51111],
      98: [0, 0.69444, 0.06312, 0, 0.46],
      99: [0, 0.43056, 0.05653, 0, 0.46],
      100: [0, 0.69444, 0.10333, 0, 0.51111],
      101: [0, 0.43056, 0.07514, 0, 0.46],
      102: [0.19444, 0.69444, 0.21194, 0, 0.30667],
      103: [0.19444, 0.43056, 0.08847, 0, 0.46],
      104: [0, 0.69444, 0.07671, 0, 0.51111],
      105: [0, 0.65536, 0.1019, 0, 0.30667],
      106: [0.19444, 0.65536, 0.14467, 0, 0.30667],
      107: [0, 0.69444, 0.10764, 0, 0.46],
      108: [0, 0.69444, 0.10333, 0, 0.25555],
      109: [0, 0.43056, 0.07671, 0, 0.81777],
      110: [0, 0.43056, 0.07671, 0, 0.56222],
      111: [0, 0.43056, 0.06312, 0, 0.51111],
      112: [0.19444, 0.43056, 0.06312, 0, 0.51111],
      113: [0.19444, 0.43056, 0.08847, 0, 0.46],
      114: [0, 0.43056, 0.10764, 0, 0.42166],
      115: [0, 0.43056, 0.08208, 0, 0.40889],
      116: [0, 0.61508, 0.09486, 0, 0.33222],
      117: [0, 0.43056, 0.07671, 0, 0.53666],
      118: [0, 0.43056, 0.10764, 0, 0.46],
      119: [0, 0.43056, 0.10764, 0, 0.66444],
      120: [0, 0.43056, 0.12042, 0, 0.46389],
      121: [0.19444, 0.43056, 0.08847, 0, 0.48555],
      122: [0, 0.43056, 0.12292, 0, 0.40889],
      126: [0.35, 0.31786, 0.11585, 0, 0.51111],
      160: [0, 0, 0, 0, 0.25],
      168: [0, 0.66786, 0.10474, 0, 0.51111],
      176: [0, 0.69444, 0, 0, 0.83129],
      184: [0.17014, 0, 0, 0, 0.46],
      198: [0, 0.68333, 0.12028, 0, 0.88277],
      216: [0.04861, 0.73194, 0.09403, 0, 0.76666],
      223: [0.19444, 0.69444, 0.10514, 0, 0.53666],
      230: [0, 0.43056, 0.07514, 0, 0.71555],
      248: [0.09722, 0.52778, 0.09194, 0, 0.51111],
      338: [0, 0.68333, 0.12028, 0, 0.98499],
      339: [0, 0.43056, 0.07514, 0, 0.71555],
      710: [0, 0.69444, 0.06646, 0, 0.51111],
      711: [0, 0.62847, 0.08295, 0, 0.51111],
      713: [0, 0.56167, 0.10333, 0, 0.51111],
      714: [0, 0.69444, 0.09694, 0, 0.51111],
      715: [0, 0.69444, 0, 0, 0.51111],
      728: [0, 0.69444, 0.10806, 0, 0.51111],
      729: [0, 0.66786, 0.11752, 0, 0.30667],
      730: [0, 0.69444, 0, 0, 0.83129],
      732: [0, 0.66786, 0.11585, 0, 0.51111],
      733: [0, 0.69444, 0.1225, 0, 0.51111],
      915: [0, 0.68333, 0.13305, 0, 0.62722],
      916: [0, 0.68333, 0, 0, 0.81777],
      920: [0, 0.68333, 0.09403, 0, 0.76666],
      923: [0, 0.68333, 0, 0, 0.69222],
      926: [0, 0.68333, 0.15294, 0, 0.66444],
      928: [0, 0.68333, 0.16389, 0, 0.74333],
      931: [0, 0.68333, 0.12028, 0, 0.71555],
      933: [0, 0.68333, 0.11111, 0, 0.76666],
      934: [0, 0.68333, 0.05986, 0, 0.71555],
      936: [0, 0.68333, 0.11111, 0, 0.76666],
      937: [0, 0.68333, 0.10257, 0, 0.71555],
      8211: [0, 0.43056, 0.09208, 0, 0.51111],
      8212: [0, 0.43056, 0.09208, 0, 1.02222],
      8216: [0, 0.69444, 0.12417, 0, 0.30667],
      8217: [0, 0.69444, 0.12417, 0, 0.30667],
      8220: [0, 0.69444, 0.1685, 0, 0.51444],
      8221: [0, 0.69444, 0.06961, 0, 0.51444],
      8463: [0, 0.68889, 0, 0, 0.54028],
    },
    "Main-Regular": {
      32: [0, 0, 0, 0, 0.25],
      33: [0, 0.69444, 0, 0, 0.27778],
      34: [0, 0.69444, 0, 0, 0.5],
      35: [0.19444, 0.69444, 0, 0, 0.83334],
      36: [0.05556, 0.75, 0, 0, 0.5],
      37: [0.05556, 0.75, 0, 0, 0.83334],
      38: [0, 0.69444, 0, 0, 0.77778],
      39: [0, 0.69444, 0, 0, 0.27778],
      40: [0.25, 0.75, 0, 0, 0.38889],
      41: [0.25, 0.75, 0, 0, 0.38889],
      42: [0, 0.75, 0, 0, 0.5],
      43: [0.08333, 0.58333, 0, 0, 0.77778],
      44: [0.19444, 0.10556, 0, 0, 0.27778],
      45: [0, 0.43056, 0, 0, 0.33333],
      46: [0, 0.10556, 0, 0, 0.27778],
      47: [0.25, 0.75, 0, 0, 0.5],
      48: [0, 0.64444, 0, 0, 0.5],
      49: [0, 0.64444, 0, 0, 0.5],
      50: [0, 0.64444, 0, 0, 0.5],
      51: [0, 0.64444, 0, 0, 0.5],
      52: [0, 0.64444, 0, 0, 0.5],
      53: [0, 0.64444, 0, 0, 0.5],
      54: [0, 0.64444, 0, 0, 0.5],
      55: [0, 0.64444, 0, 0, 0.5],
      56: [0, 0.64444, 0, 0, 0.5],
      57: [0, 0.64444, 0, 0, 0.5],
      58: [0, 0.43056, 0, 0, 0.27778],
      59: [0.19444, 0.43056, 0, 0, 0.27778],
      60: [0.0391, 0.5391, 0, 0, 0.77778],
      61: [-0.13313, 0.36687, 0, 0, 0.77778],
      62: [0.0391, 0.5391, 0, 0, 0.77778],
      63: [0, 0.69444, 0, 0, 0.47222],
      64: [0, 0.69444, 0, 0, 0.77778],
      65: [0, 0.68333, 0, 0, 0.75],
      66: [0, 0.68333, 0, 0, 0.70834],
      67: [0, 0.68333, 0, 0, 0.72222],
      68: [0, 0.68333, 0, 0, 0.76389],
      69: [0, 0.68333, 0, 0, 0.68056],
      70: [0, 0.68333, 0, 0, 0.65278],
      71: [0, 0.68333, 0, 0, 0.78472],
      72: [0, 0.68333, 0, 0, 0.75],
      73: [0, 0.68333, 0, 0, 0.36111],
      74: [0, 0.68333, 0, 0, 0.51389],
      75: [0, 0.68333, 0, 0, 0.77778],
      76: [0, 0.68333, 0, 0, 0.625],
      77: [0, 0.68333, 0, 0, 0.91667],
      78: [0, 0.68333, 0, 0, 0.75],
      79: [0, 0.68333, 0, 0, 0.77778],
      80: [0, 0.68333, 0, 0, 0.68056],
      81: [0.19444, 0.68333, 0, 0, 0.77778],
      82: [0, 0.68333, 0, 0, 0.73611],
      83: [0, 0.68333, 0, 0, 0.55556],
      84: [0, 0.68333, 0, 0, 0.72222],
      85: [0, 0.68333, 0, 0, 0.75],
      86: [0, 0.68333, 0.01389, 0, 0.75],
      87: [0, 0.68333, 0.01389, 0, 1.02778],
      88: [0, 0.68333, 0, 0, 0.75],
      89: [0, 0.68333, 0.025, 0, 0.75],
      90: [0, 0.68333, 0, 0, 0.61111],
      91: [0.25, 0.75, 0, 0, 0.27778],
      92: [0.25, 0.75, 0, 0, 0.5],
      93: [0.25, 0.75, 0, 0, 0.27778],
      94: [0, 0.69444, 0, 0, 0.5],
      95: [0.31, 0.12056, 0.02778, 0, 0.5],
      97: [0, 0.43056, 0, 0, 0.5],
      98: [0, 0.69444, 0, 0, 0.55556],
      99: [0, 0.43056, 0, 0, 0.44445],
      100: [0, 0.69444, 0, 0, 0.55556],
      101: [0, 0.43056, 0, 0, 0.44445],
      102: [0, 0.69444, 0.07778, 0, 0.30556],
      103: [0.19444, 0.43056, 0.01389, 0, 0.5],
      104: [0, 0.69444, 0, 0, 0.55556],
      105: [0, 0.66786, 0, 0, 0.27778],
      106: [0.19444, 0.66786, 0, 0, 0.30556],
      107: [0, 0.69444, 0, 0, 0.52778],
      108: [0, 0.69444, 0, 0, 0.27778],
      109: [0, 0.43056, 0, 0, 0.83334],
      110: [0, 0.43056, 0, 0, 0.55556],
      111: [0, 0.43056, 0, 0, 0.5],
      112: [0.19444, 0.43056, 0, 0, 0.55556],
      113: [0.19444, 0.43056, 0, 0, 0.52778],
      114: [0, 0.43056, 0, 0, 0.39167],
      115: [0, 0.43056, 0, 0, 0.39445],
      116: [0, 0.61508, 0, 0, 0.38889],
      117: [0, 0.43056, 0, 0, 0.55556],
      118: [0, 0.43056, 0.01389, 0, 0.52778],
      119: [0, 0.43056, 0.01389, 0, 0.72222],
      120: [0, 0.43056, 0, 0, 0.52778],
      121: [0.19444, 0.43056, 0.01389, 0, 0.52778],
      122: [0, 0.43056, 0, 0, 0.44445],
      123: [0.25, 0.75, 0, 0, 0.5],
      124: [0.25, 0.75, 0, 0, 0.27778],
      125: [0.25, 0.75, 0, 0, 0.5],
      126: [0.35, 0.31786, 0, 0, 0.5],
      160: [0, 0, 0, 0, 0.25],
      163: [0, 0.69444, 0, 0, 0.76909],
      167: [0.19444, 0.69444, 0, 0, 0.44445],
      168: [0, 0.66786, 0, 0, 0.5],
      172: [0, 0.43056, 0, 0, 0.66667],
      176: [0, 0.69444, 0, 0, 0.75],
      177: [0.08333, 0.58333, 0, 0, 0.77778],
      182: [0.19444, 0.69444, 0, 0, 0.61111],
      184: [0.17014, 0, 0, 0, 0.44445],
      198: [0, 0.68333, 0, 0, 0.90278],
      215: [0.08333, 0.58333, 0, 0, 0.77778],
      216: [0.04861, 0.73194, 0, 0, 0.77778],
      223: [0, 0.69444, 0, 0, 0.5],
      230: [0, 0.43056, 0, 0, 0.72222],
      247: [0.08333, 0.58333, 0, 0, 0.77778],
      248: [0.09722, 0.52778, 0, 0, 0.5],
      305: [0, 0.43056, 0, 0, 0.27778],
      338: [0, 0.68333, 0, 0, 1.01389],
      339: [0, 0.43056, 0, 0, 0.77778],
      567: [0.19444, 0.43056, 0, 0, 0.30556],
      710: [0, 0.69444, 0, 0, 0.5],
      711: [0, 0.62847, 0, 0, 0.5],
      713: [0, 0.56778, 0, 0, 0.5],
      714: [0, 0.69444, 0, 0, 0.5],
      715: [0, 0.69444, 0, 0, 0.5],
      728: [0, 0.69444, 0, 0, 0.5],
      729: [0, 0.66786, 0, 0, 0.27778],
      730: [0, 0.69444, 0, 0, 0.75],
      732: [0, 0.66786, 0, 0, 0.5],
      733: [0, 0.69444, 0, 0, 0.5],
      915: [0, 0.68333, 0, 0, 0.625],
      916: [0, 0.68333, 0, 0, 0.83334],
      920: [0, 0.68333, 0, 0, 0.77778],
      923: [0, 0.68333, 0, 0, 0.69445],
      926: [0, 0.68333, 0, 0, 0.66667],
      928: [0, 0.68333, 0, 0, 0.75],
      931: [0, 0.68333, 0, 0, 0.72222],
      933: [0, 0.68333, 0, 0, 0.77778],
      934: [0, 0.68333, 0, 0, 0.72222],
      936: [0, 0.68333, 0, 0, 0.77778],
      937: [0, 0.68333, 0, 0, 0.72222],
      8211: [0, 0.43056, 0.02778, 0, 0.5],
      8212: [0, 0.43056, 0.02778, 0, 1],
      8216: [0, 0.69444, 0, 0, 0.27778],
      8217: [0, 0.69444, 0, 0, 0.27778],
      8220: [0, 0.69444, 0, 0, 0.5],
      8221: [0, 0.69444, 0, 0, 0.5],
      8224: [0.19444, 0.69444, 0, 0, 0.44445],
      8225: [0.19444, 0.69444, 0, 0, 0.44445],
      8230: [0, 0.123, 0, 0, 1.172],
      8242: [0, 0.55556, 0, 0, 0.275],
      8407: [0, 0.71444, 0.15382, 0, 0.5],
      8463: [0, 0.68889, 0, 0, 0.54028],
      8465: [0, 0.69444, 0, 0, 0.72222],
      8467: [0, 0.69444, 0, 0.11111, 0.41667],
      8472: [0.19444, 0.43056, 0, 0.11111, 0.63646],
      8476: [0, 0.69444, 0, 0, 0.72222],
      8501: [0, 0.69444, 0, 0, 0.61111],
      8592: [-0.13313, 0.36687, 0, 0, 1],
      8593: [0.19444, 0.69444, 0, 0, 0.5],
      8594: [-0.13313, 0.36687, 0, 0, 1],
      8595: [0.19444, 0.69444, 0, 0, 0.5],
      8596: [-0.13313, 0.36687, 0, 0, 1],
      8597: [0.25, 0.75, 0, 0, 0.5],
      8598: [0.19444, 0.69444, 0, 0, 1],
      8599: [0.19444, 0.69444, 0, 0, 1],
      8600: [0.19444, 0.69444, 0, 0, 1],
      8601: [0.19444, 0.69444, 0, 0, 1],
      8614: [0.011, 0.511, 0, 0, 1],
      8617: [0.011, 0.511, 0, 0, 1.126],
      8618: [0.011, 0.511, 0, 0, 1.126],
      8636: [-0.13313, 0.36687, 0, 0, 1],
      8637: [-0.13313, 0.36687, 0, 0, 1],
      8640: [-0.13313, 0.36687, 0, 0, 1],
      8641: [-0.13313, 0.36687, 0, 0, 1],
      8652: [0.011, 0.671, 0, 0, 1],
      8656: [-0.13313, 0.36687, 0, 0, 1],
      8657: [0.19444, 0.69444, 0, 0, 0.61111],
      8658: [-0.13313, 0.36687, 0, 0, 1],
      8659: [0.19444, 0.69444, 0, 0, 0.61111],
      8660: [-0.13313, 0.36687, 0, 0, 1],
      8661: [0.25, 0.75, 0, 0, 0.61111],
      8704: [0, 0.69444, 0, 0, 0.55556],
      8706: [0, 0.69444, 0.05556, 0.08334, 0.5309],
      8707: [0, 0.69444, 0, 0, 0.55556],
      8709: [0.05556, 0.75, 0, 0, 0.5],
      8711: [0, 0.68333, 0, 0, 0.83334],
      8712: [0.0391, 0.5391, 0, 0, 0.66667],
      8715: [0.0391, 0.5391, 0, 0, 0.66667],
      8722: [0.08333, 0.58333, 0, 0, 0.77778],
      8723: [0.08333, 0.58333, 0, 0, 0.77778],
      8725: [0.25, 0.75, 0, 0, 0.5],
      8726: [0.25, 0.75, 0, 0, 0.5],
      8727: [-0.03472, 0.46528, 0, 0, 0.5],
      8728: [-0.05555, 0.44445, 0, 0, 0.5],
      8729: [-0.05555, 0.44445, 0, 0, 0.5],
      8730: [0.2, 0.8, 0, 0, 0.83334],
      8733: [0, 0.43056, 0, 0, 0.77778],
      8734: [0, 0.43056, 0, 0, 1],
      8736: [0, 0.69224, 0, 0, 0.72222],
      8739: [0.25, 0.75, 0, 0, 0.27778],
      8741: [0.25, 0.75, 0, 0, 0.5],
      8743: [0, 0.55556, 0, 0, 0.66667],
      8744: [0, 0.55556, 0, 0, 0.66667],
      8745: [0, 0.55556, 0, 0, 0.66667],
      8746: [0, 0.55556, 0, 0, 0.66667],
      8747: [0.19444, 0.69444, 0.11111, 0, 0.41667],
      8764: [-0.13313, 0.36687, 0, 0, 0.77778],
      8768: [0.19444, 0.69444, 0, 0, 0.27778],
      8771: [-0.03625, 0.46375, 0, 0, 0.77778],
      8773: [-0.022, 0.589, 0, 0, 0.778],
      8776: [-0.01688, 0.48312, 0, 0, 0.77778],
      8781: [-0.03625, 0.46375, 0, 0, 0.77778],
      8784: [-0.133, 0.673, 0, 0, 0.778],
      8801: [-0.03625, 0.46375, 0, 0, 0.77778],
      8804: [0.13597, 0.63597, 0, 0, 0.77778],
      8805: [0.13597, 0.63597, 0, 0, 0.77778],
      8810: [0.0391, 0.5391, 0, 0, 1],
      8811: [0.0391, 0.5391, 0, 0, 1],
      8826: [0.0391, 0.5391, 0, 0, 0.77778],
      8827: [0.0391, 0.5391, 0, 0, 0.77778],
      8834: [0.0391, 0.5391, 0, 0, 0.77778],
      8835: [0.0391, 0.5391, 0, 0, 0.77778],
      8838: [0.13597, 0.63597, 0, 0, 0.77778],
      8839: [0.13597, 0.63597, 0, 0, 0.77778],
      8846: [0, 0.55556, 0, 0, 0.66667],
      8849: [0.13597, 0.63597, 0, 0, 0.77778],
      8850: [0.13597, 0.63597, 0, 0, 0.77778],
      8851: [0, 0.55556, 0, 0, 0.66667],
      8852: [0, 0.55556, 0, 0, 0.66667],
      8853: [0.08333, 0.58333, 0, 0, 0.77778],
      8854: [0.08333, 0.58333, 0, 0, 0.77778],
      8855: [0.08333, 0.58333, 0, 0, 0.77778],
      8856: [0.08333, 0.58333, 0, 0, 0.77778],
      8857: [0.08333, 0.58333, 0, 0, 0.77778],
      8866: [0, 0.69444, 0, 0, 0.61111],
      8867: [0, 0.69444, 0, 0, 0.61111],
      8868: [0, 0.69444, 0, 0, 0.77778],
      8869: [0, 0.69444, 0, 0, 0.77778],
      8872: [0.249, 0.75, 0, 0, 0.867],
      8900: [-0.05555, 0.44445, 0, 0, 0.5],
      8901: [-0.05555, 0.44445, 0, 0, 0.27778],
      8902: [-0.03472, 0.46528, 0, 0, 0.5],
      8904: [0.005, 0.505, 0, 0, 0.9],
      8942: [0.03, 0.903, 0, 0, 0.278],
      8943: [-0.19, 0.313, 0, 0, 1.172],
      8945: [-0.1, 0.823, 0, 0, 1.282],
      8968: [0.25, 0.75, 0, 0, 0.44445],
      8969: [0.25, 0.75, 0, 0, 0.44445],
      8970: [0.25, 0.75, 0, 0, 0.44445],
      8971: [0.25, 0.75, 0, 0, 0.44445],
      8994: [-0.14236, 0.35764, 0, 0, 1],
      8995: [-0.14236, 0.35764, 0, 0, 1],
      9136: [0.244, 0.744, 0, 0, 0.412],
      9137: [0.244, 0.745, 0, 0, 0.412],
      9651: [0.19444, 0.69444, 0, 0, 0.88889],
      9657: [-0.03472, 0.46528, 0, 0, 0.5],
      9661: [0.19444, 0.69444, 0, 0, 0.88889],
      9667: [-0.03472, 0.46528, 0, 0, 0.5],
      9711: [0.19444, 0.69444, 0, 0, 1],
      9824: [0.12963, 0.69444, 0, 0, 0.77778],
      9825: [0.12963, 0.69444, 0, 0, 0.77778],
      9826: [0.12963, 0.69444, 0, 0, 0.77778],
      9827: [0.12963, 0.69444, 0, 0, 0.77778],
      9837: [0, 0.75, 0, 0, 0.38889],
      9838: [0.19444, 0.69444, 0, 0, 0.38889],
      9839: [0.19444, 0.69444, 0, 0, 0.38889],
      10216: [0.25, 0.75, 0, 0, 0.38889],
      10217: [0.25, 0.75, 0, 0, 0.38889],
      10222: [0.244, 0.744, 0, 0, 0.412],
      10223: [0.244, 0.745, 0, 0, 0.412],
      10229: [0.011, 0.511, 0, 0, 1.609],
      10230: [0.011, 0.511, 0, 0, 1.638],
      10231: [0.011, 0.511, 0, 0, 1.859],
      10232: [0.024, 0.525, 0, 0, 1.609],
      10233: [0.024, 0.525, 0, 0, 1.638],
      10234: [0.024, 0.525, 0, 0, 1.858],
      10236: [0.011, 0.511, 0, 0, 1.638],
      10815: [0, 0.68333, 0, 0, 0.75],
      10927: [0.13597, 0.63597, 0, 0, 0.77778],
      10928: [0.13597, 0.63597, 0, 0, 0.77778],
      57376: [0.19444, 0.69444, 0, 0, 0],
    },
    "Math-BoldItalic": {
      32: [0, 0, 0, 0, 0.25],
      48: [0, 0.44444, 0, 0, 0.575],
      49: [0, 0.44444, 0, 0, 0.575],
      50: [0, 0.44444, 0, 0, 0.575],
      51: [0.19444, 0.44444, 0, 0, 0.575],
      52: [0.19444, 0.44444, 0, 0, 0.575],
      53: [0.19444, 0.44444, 0, 0, 0.575],
      54: [0, 0.64444, 0, 0, 0.575],
      55: [0.19444, 0.44444, 0, 0, 0.575],
      56: [0, 0.64444, 0, 0, 0.575],
      57: [0.19444, 0.44444, 0, 0, 0.575],
      65: [0, 0.68611, 0, 0, 0.86944],
      66: [0, 0.68611, 0.04835, 0, 0.8664],
      67: [0, 0.68611, 0.06979, 0, 0.81694],
      68: [0, 0.68611, 0.03194, 0, 0.93812],
      69: [0, 0.68611, 0.05451, 0, 0.81007],
      70: [0, 0.68611, 0.15972, 0, 0.68889],
      71: [0, 0.68611, 0, 0, 0.88673],
      72: [0, 0.68611, 0.08229, 0, 0.98229],
      73: [0, 0.68611, 0.07778, 0, 0.51111],
      74: [0, 0.68611, 0.10069, 0, 0.63125],
      75: [0, 0.68611, 0.06979, 0, 0.97118],
      76: [0, 0.68611, 0, 0, 0.75555],
      77: [0, 0.68611, 0.11424, 0, 1.14201],
      78: [0, 0.68611, 0.11424, 0, 0.95034],
      79: [0, 0.68611, 0.03194, 0, 0.83666],
      80: [0, 0.68611, 0.15972, 0, 0.72309],
      81: [0.19444, 0.68611, 0, 0, 0.86861],
      82: [0, 0.68611, 0.00421, 0, 0.87235],
      83: [0, 0.68611, 0.05382, 0, 0.69271],
      84: [0, 0.68611, 0.15972, 0, 0.63663],
      85: [0, 0.68611, 0.11424, 0, 0.80027],
      86: [0, 0.68611, 0.25555, 0, 0.67778],
      87: [0, 0.68611, 0.15972, 0, 1.09305],
      88: [0, 0.68611, 0.07778, 0, 0.94722],
      89: [0, 0.68611, 0.25555, 0, 0.67458],
      90: [0, 0.68611, 0.06979, 0, 0.77257],
      97: [0, 0.44444, 0, 0, 0.63287],
      98: [0, 0.69444, 0, 0, 0.52083],
      99: [0, 0.44444, 0, 0, 0.51342],
      100: [0, 0.69444, 0, 0, 0.60972],
      101: [0, 0.44444, 0, 0, 0.55361],
      102: [0.19444, 0.69444, 0.11042, 0, 0.56806],
      103: [0.19444, 0.44444, 0.03704, 0, 0.5449],
      104: [0, 0.69444, 0, 0, 0.66759],
      105: [0, 0.69326, 0, 0, 0.4048],
      106: [0.19444, 0.69326, 0.0622, 0, 0.47083],
      107: [0, 0.69444, 0.01852, 0, 0.6037],
      108: [0, 0.69444, 0.0088, 0, 0.34815],
      109: [0, 0.44444, 0, 0, 1.0324],
      110: [0, 0.44444, 0, 0, 0.71296],
      111: [0, 0.44444, 0, 0, 0.58472],
      112: [0.19444, 0.44444, 0, 0, 0.60092],
      113: [0.19444, 0.44444, 0.03704, 0, 0.54213],
      114: [0, 0.44444, 0.03194, 0, 0.5287],
      115: [0, 0.44444, 0, 0, 0.53125],
      116: [0, 0.63492, 0, 0, 0.41528],
      117: [0, 0.44444, 0, 0, 0.68102],
      118: [0, 0.44444, 0.03704, 0, 0.56666],
      119: [0, 0.44444, 0.02778, 0, 0.83148],
      120: [0, 0.44444, 0, 0, 0.65903],
      121: [0.19444, 0.44444, 0.03704, 0, 0.59028],
      122: [0, 0.44444, 0.04213, 0, 0.55509],
      160: [0, 0, 0, 0, 0.25],
      915: [0, 0.68611, 0.15972, 0, 0.65694],
      916: [0, 0.68611, 0, 0, 0.95833],
      920: [0, 0.68611, 0.03194, 0, 0.86722],
      923: [0, 0.68611, 0, 0, 0.80555],
      926: [0, 0.68611, 0.07458, 0, 0.84125],
      928: [0, 0.68611, 0.08229, 0, 0.98229],
      931: [0, 0.68611, 0.05451, 0, 0.88507],
      933: [0, 0.68611, 0.15972, 0, 0.67083],
      934: [0, 0.68611, 0, 0, 0.76666],
      936: [0, 0.68611, 0.11653, 0, 0.71402],
      937: [0, 0.68611, 0.04835, 0, 0.8789],
      945: [0, 0.44444, 0, 0, 0.76064],
      946: [0.19444, 0.69444, 0.03403, 0, 0.65972],
      947: [0.19444, 0.44444, 0.06389, 0, 0.59003],
      948: [0, 0.69444, 0.03819, 0, 0.52222],
      949: [0, 0.44444, 0, 0, 0.52882],
      950: [0.19444, 0.69444, 0.06215, 0, 0.50833],
      951: [0.19444, 0.44444, 0.03704, 0, 0.6],
      952: [0, 0.69444, 0.03194, 0, 0.5618],
      953: [0, 0.44444, 0, 0, 0.41204],
      954: [0, 0.44444, 0, 0, 0.66759],
      955: [0, 0.69444, 0, 0, 0.67083],
      956: [0.19444, 0.44444, 0, 0, 0.70787],
      957: [0, 0.44444, 0.06898, 0, 0.57685],
      958: [0.19444, 0.69444, 0.03021, 0, 0.50833],
      959: [0, 0.44444, 0, 0, 0.58472],
      960: [0, 0.44444, 0.03704, 0, 0.68241],
      961: [0.19444, 0.44444, 0, 0, 0.6118],
      962: [0.09722, 0.44444, 0.07917, 0, 0.42361],
      963: [0, 0.44444, 0.03704, 0, 0.68588],
      964: [0, 0.44444, 0.13472, 0, 0.52083],
      965: [0, 0.44444, 0.03704, 0, 0.63055],
      966: [0.19444, 0.44444, 0, 0, 0.74722],
      967: [0.19444, 0.44444, 0, 0, 0.71805],
      968: [0.19444, 0.69444, 0.03704, 0, 0.75833],
      969: [0, 0.44444, 0.03704, 0, 0.71782],
      977: [0, 0.69444, 0, 0, 0.69155],
      981: [0.19444, 0.69444, 0, 0, 0.7125],
      982: [0, 0.44444, 0.03194, 0, 0.975],
      1009: [0.19444, 0.44444, 0, 0, 0.6118],
      1013: [0, 0.44444, 0, 0, 0.48333],
      57649: [0, 0.44444, 0, 0, 0.39352],
      57911: [0.19444, 0.44444, 0, 0, 0.43889],
    },
    "Math-Italic": {
      32: [0, 0, 0, 0, 0.25],
      48: [0, 0.43056, 0, 0, 0.5],
      49: [0, 0.43056, 0, 0, 0.5],
      50: [0, 0.43056, 0, 0, 0.5],
      51: [0.19444, 0.43056, 0, 0, 0.5],
      52: [0.19444, 0.43056, 0, 0, 0.5],
      53: [0.19444, 0.43056, 0, 0, 0.5],
      54: [0, 0.64444, 0, 0, 0.5],
      55: [0.19444, 0.43056, 0, 0, 0.5],
      56: [0, 0.64444, 0, 0, 0.5],
      57: [0.19444, 0.43056, 0, 0, 0.5],
      65: [0, 0.68333, 0, 0.13889, 0.75],
      66: [0, 0.68333, 0.05017, 0.08334, 0.75851],
      67: [0, 0.68333, 0.07153, 0.08334, 0.71472],
      68: [0, 0.68333, 0.02778, 0.05556, 0.82792],
      69: [0, 0.68333, 0.05764, 0.08334, 0.7382],
      70: [0, 0.68333, 0.13889, 0.08334, 0.64306],
      71: [0, 0.68333, 0, 0.08334, 0.78625],
      72: [0, 0.68333, 0.08125, 0.05556, 0.83125],
      73: [0, 0.68333, 0.07847, 0.11111, 0.43958],
      74: [0, 0.68333, 0.09618, 0.16667, 0.55451],
      75: [0, 0.68333, 0.07153, 0.05556, 0.84931],
      76: [0, 0.68333, 0, 0.02778, 0.68056],
      77: [0, 0.68333, 0.10903, 0.08334, 0.97014],
      78: [0, 0.68333, 0.10903, 0.08334, 0.80347],
      79: [0, 0.68333, 0.02778, 0.08334, 0.76278],
      80: [0, 0.68333, 0.13889, 0.08334, 0.64201],
      81: [0.19444, 0.68333, 0, 0.08334, 0.79056],
      82: [0, 0.68333, 0.00773, 0.08334, 0.75929],
      83: [0, 0.68333, 0.05764, 0.08334, 0.6132],
      84: [0, 0.68333, 0.13889, 0.08334, 0.58438],
      85: [0, 0.68333, 0.10903, 0.02778, 0.68278],
      86: [0, 0.68333, 0.22222, 0, 0.58333],
      87: [0, 0.68333, 0.13889, 0, 0.94445],
      88: [0, 0.68333, 0.07847, 0.08334, 0.82847],
      89: [0, 0.68333, 0.22222, 0, 0.58056],
      90: [0, 0.68333, 0.07153, 0.08334, 0.68264],
      97: [0, 0.43056, 0, 0, 0.52859],
      98: [0, 0.69444, 0, 0, 0.42917],
      99: [0, 0.43056, 0, 0.05556, 0.43276],
      100: [0, 0.69444, 0, 0.16667, 0.52049],
      101: [0, 0.43056, 0, 0.05556, 0.46563],
      102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
      103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
      104: [0, 0.69444, 0, 0, 0.57616],
      105: [0, 0.65952, 0, 0, 0.34451],
      106: [0.19444, 0.65952, 0.05724, 0, 0.41181],
      107: [0, 0.69444, 0.03148, 0, 0.5206],
      108: [0, 0.69444, 0.01968, 0.08334, 0.29838],
      109: [0, 0.43056, 0, 0, 0.87801],
      110: [0, 0.43056, 0, 0, 0.60023],
      111: [0, 0.43056, 0, 0.05556, 0.48472],
      112: [0.19444, 0.43056, 0, 0.08334, 0.50313],
      113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
      114: [0, 0.43056, 0.02778, 0.05556, 0.45116],
      115: [0, 0.43056, 0, 0.05556, 0.46875],
      116: [0, 0.61508, 0, 0.08334, 0.36111],
      117: [0, 0.43056, 0, 0.02778, 0.57246],
      118: [0, 0.43056, 0.03588, 0.02778, 0.48472],
      119: [0, 0.43056, 0.02691, 0.08334, 0.71592],
      120: [0, 0.43056, 0, 0.02778, 0.57153],
      121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
      122: [0, 0.43056, 0.04398, 0.05556, 0.46505],
      160: [0, 0, 0, 0, 0.25],
      915: [0, 0.68333, 0.13889, 0.08334, 0.61528],
      916: [0, 0.68333, 0, 0.16667, 0.83334],
      920: [0, 0.68333, 0.02778, 0.08334, 0.76278],
      923: [0, 0.68333, 0, 0.16667, 0.69445],
      926: [0, 0.68333, 0.07569, 0.08334, 0.74236],
      928: [0, 0.68333, 0.08125, 0.05556, 0.83125],
      931: [0, 0.68333, 0.05764, 0.08334, 0.77986],
      933: [0, 0.68333, 0.13889, 0.05556, 0.58333],
      934: [0, 0.68333, 0, 0.08334, 0.66667],
      936: [0, 0.68333, 0.11, 0.05556, 0.61222],
      937: [0, 0.68333, 0.05017, 0.08334, 0.7724],
      945: [0, 0.43056, 0.0037, 0.02778, 0.6397],
      946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
      947: [0.19444, 0.43056, 0.05556, 0, 0.51773],
      948: [0, 0.69444, 0.03785, 0.05556, 0.44444],
      949: [0, 0.43056, 0, 0.08334, 0.46632],
      950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
      951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
      952: [0, 0.69444, 0.02778, 0.08334, 0.46944],
      953: [0, 0.43056, 0, 0.05556, 0.35394],
      954: [0, 0.43056, 0, 0, 0.57616],
      955: [0, 0.69444, 0, 0, 0.58334],
      956: [0.19444, 0.43056, 0, 0.02778, 0.60255],
      957: [0, 0.43056, 0.06366, 0.02778, 0.49398],
      958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
      959: [0, 0.43056, 0, 0.05556, 0.48472],
      960: [0, 0.43056, 0.03588, 0, 0.57003],
      961: [0.19444, 0.43056, 0, 0.08334, 0.51702],
      962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
      963: [0, 0.43056, 0.03588, 0, 0.57141],
      964: [0, 0.43056, 0.1132, 0.02778, 0.43715],
      965: [0, 0.43056, 0.03588, 0.02778, 0.54028],
      966: [0.19444, 0.43056, 0, 0.08334, 0.65417],
      967: [0.19444, 0.43056, 0, 0.05556, 0.62569],
      968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
      969: [0, 0.43056, 0.03588, 0, 0.62245],
      977: [0, 0.69444, 0, 0.08334, 0.59144],
      981: [0.19444, 0.69444, 0, 0.08334, 0.59583],
      982: [0, 0.43056, 0.02778, 0, 0.82813],
      1009: [0.19444, 0.43056, 0, 0.08334, 0.51702],
      1013: [0, 0.43056, 0, 0.05556, 0.4059],
      57649: [0, 0.43056, 0, 0.02778, 0.32246],
      57911: [0.19444, 0.43056, 0, 0.08334, 0.38403],
    },
    "SansSerif-Bold": {
      32: [0, 0, 0, 0, 0.25],
      33: [0, 0.69444, 0, 0, 0.36667],
      34: [0, 0.69444, 0, 0, 0.55834],
      35: [0.19444, 0.69444, 0, 0, 0.91667],
      36: [0.05556, 0.75, 0, 0, 0.55],
      37: [0.05556, 0.75, 0, 0, 1.02912],
      38: [0, 0.69444, 0, 0, 0.83056],
      39: [0, 0.69444, 0, 0, 0.30556],
      40: [0.25, 0.75, 0, 0, 0.42778],
      41: [0.25, 0.75, 0, 0, 0.42778],
      42: [0, 0.75, 0, 0, 0.55],
      43: [0.11667, 0.61667, 0, 0, 0.85556],
      44: [0.10556, 0.13056, 0, 0, 0.30556],
      45: [0, 0.45833, 0, 0, 0.36667],
      46: [0, 0.13056, 0, 0, 0.30556],
      47: [0.25, 0.75, 0, 0, 0.55],
      48: [0, 0.69444, 0, 0, 0.55],
      49: [0, 0.69444, 0, 0, 0.55],
      50: [0, 0.69444, 0, 0, 0.55],
      51: [0, 0.69444, 0, 0, 0.55],
      52: [0, 0.69444, 0, 0, 0.55],
      53: [0, 0.69444, 0, 0, 0.55],
      54: [0, 0.69444, 0, 0, 0.55],
      55: [0, 0.69444, 0, 0, 0.55],
      56: [0, 0.69444, 0, 0, 0.55],
      57: [0, 0.69444, 0, 0, 0.55],
      58: [0, 0.45833, 0, 0, 0.30556],
      59: [0.10556, 0.45833, 0, 0, 0.30556],
      61: [-0.09375, 0.40625, 0, 0, 0.85556],
      63: [0, 0.69444, 0, 0, 0.51945],
      64: [0, 0.69444, 0, 0, 0.73334],
      65: [0, 0.69444, 0, 0, 0.73334],
      66: [0, 0.69444, 0, 0, 0.73334],
      67: [0, 0.69444, 0, 0, 0.70278],
      68: [0, 0.69444, 0, 0, 0.79445],
      69: [0, 0.69444, 0, 0, 0.64167],
      70: [0, 0.69444, 0, 0, 0.61111],
      71: [0, 0.69444, 0, 0, 0.73334],
      72: [0, 0.69444, 0, 0, 0.79445],
      73: [0, 0.69444, 0, 0, 0.33056],
      74: [0, 0.69444, 0, 0, 0.51945],
      75: [0, 0.69444, 0, 0, 0.76389],
      76: [0, 0.69444, 0, 0, 0.58056],
      77: [0, 0.69444, 0, 0, 0.97778],
      78: [0, 0.69444, 0, 0, 0.79445],
      79: [0, 0.69444, 0, 0, 0.79445],
      80: [0, 0.69444, 0, 0, 0.70278],
      81: [0.10556, 0.69444, 0, 0, 0.79445],
      82: [0, 0.69444, 0, 0, 0.70278],
      83: [0, 0.69444, 0, 0, 0.61111],
      84: [0, 0.69444, 0, 0, 0.73334],
      85: [0, 0.69444, 0, 0, 0.76389],
      86: [0, 0.69444, 0.01528, 0, 0.73334],
      87: [0, 0.69444, 0.01528, 0, 1.03889],
      88: [0, 0.69444, 0, 0, 0.73334],
      89: [0, 0.69444, 0.0275, 0, 0.73334],
      90: [0, 0.69444, 0, 0, 0.67223],
      91: [0.25, 0.75, 0, 0, 0.34306],
      93: [0.25, 0.75, 0, 0, 0.34306],
      94: [0, 0.69444, 0, 0, 0.55],
      95: [0.35, 0.10833, 0.03056, 0, 0.55],
      97: [0, 0.45833, 0, 0, 0.525],
      98: [0, 0.69444, 0, 0, 0.56111],
      99: [0, 0.45833, 0, 0, 0.48889],
      100: [0, 0.69444, 0, 0, 0.56111],
      101: [0, 0.45833, 0, 0, 0.51111],
      102: [0, 0.69444, 0.07639, 0, 0.33611],
      103: [0.19444, 0.45833, 0.01528, 0, 0.55],
      104: [0, 0.69444, 0, 0, 0.56111],
      105: [0, 0.69444, 0, 0, 0.25556],
      106: [0.19444, 0.69444, 0, 0, 0.28611],
      107: [0, 0.69444, 0, 0, 0.53056],
      108: [0, 0.69444, 0, 0, 0.25556],
      109: [0, 0.45833, 0, 0, 0.86667],
      110: [0, 0.45833, 0, 0, 0.56111],
      111: [0, 0.45833, 0, 0, 0.55],
      112: [0.19444, 0.45833, 0, 0, 0.56111],
      113: [0.19444, 0.45833, 0, 0, 0.56111],
      114: [0, 0.45833, 0.01528, 0, 0.37222],
      115: [0, 0.45833, 0, 0, 0.42167],
      116: [0, 0.58929, 0, 0, 0.40417],
      117: [0, 0.45833, 0, 0, 0.56111],
      118: [0, 0.45833, 0.01528, 0, 0.5],
      119: [0, 0.45833, 0.01528, 0, 0.74445],
      120: [0, 0.45833, 0, 0, 0.5],
      121: [0.19444, 0.45833, 0.01528, 0, 0.5],
      122: [0, 0.45833, 0, 0, 0.47639],
      126: [0.35, 0.34444, 0, 0, 0.55],
      160: [0, 0, 0, 0, 0.25],
      168: [0, 0.69444, 0, 0, 0.55],
      176: [0, 0.69444, 0, 0, 0.73334],
      180: [0, 0.69444, 0, 0, 0.55],
      184: [0.17014, 0, 0, 0, 0.48889],
      305: [0, 0.45833, 0, 0, 0.25556],
      567: [0.19444, 0.45833, 0, 0, 0.28611],
      710: [0, 0.69444, 0, 0, 0.55],
      711: [0, 0.63542, 0, 0, 0.55],
      713: [0, 0.63778, 0, 0, 0.55],
      728: [0, 0.69444, 0, 0, 0.55],
      729: [0, 0.69444, 0, 0, 0.30556],
      730: [0, 0.69444, 0, 0, 0.73334],
      732: [0, 0.69444, 0, 0, 0.55],
      733: [0, 0.69444, 0, 0, 0.55],
      915: [0, 0.69444, 0, 0, 0.58056],
      916: [0, 0.69444, 0, 0, 0.91667],
      920: [0, 0.69444, 0, 0, 0.85556],
      923: [0, 0.69444, 0, 0, 0.67223],
      926: [0, 0.69444, 0, 0, 0.73334],
      928: [0, 0.69444, 0, 0, 0.79445],
      931: [0, 0.69444, 0, 0, 0.79445],
      933: [0, 0.69444, 0, 0, 0.85556],
      934: [0, 0.69444, 0, 0, 0.79445],
      936: [0, 0.69444, 0, 0, 0.85556],
      937: [0, 0.69444, 0, 0, 0.79445],
      8211: [0, 0.45833, 0.03056, 0, 0.55],
      8212: [0, 0.45833, 0.03056, 0, 1.10001],
      8216: [0, 0.69444, 0, 0, 0.30556],
      8217: [0, 0.69444, 0, 0, 0.30556],
      8220: [0, 0.69444, 0, 0, 0.55834],
      8221: [0, 0.69444, 0, 0, 0.55834],
    },
    "SansSerif-Italic": {
      32: [0, 0, 0, 0, 0.25],
      33: [0, 0.69444, 0.05733, 0, 0.31945],
      34: [0, 0.69444, 0.00316, 0, 0.5],
      35: [0.19444, 0.69444, 0.05087, 0, 0.83334],
      36: [0.05556, 0.75, 0.11156, 0, 0.5],
      37: [0.05556, 0.75, 0.03126, 0, 0.83334],
      38: [0, 0.69444, 0.03058, 0, 0.75834],
      39: [0, 0.69444, 0.07816, 0, 0.27778],
      40: [0.25, 0.75, 0.13164, 0, 0.38889],
      41: [0.25, 0.75, 0.02536, 0, 0.38889],
      42: [0, 0.75, 0.11775, 0, 0.5],
      43: [0.08333, 0.58333, 0.02536, 0, 0.77778],
      44: [0.125, 0.08333, 0, 0, 0.27778],
      45: [0, 0.44444, 0.01946, 0, 0.33333],
      46: [0, 0.08333, 0, 0, 0.27778],
      47: [0.25, 0.75, 0.13164, 0, 0.5],
      48: [0, 0.65556, 0.11156, 0, 0.5],
      49: [0, 0.65556, 0.11156, 0, 0.5],
      50: [0, 0.65556, 0.11156, 0, 0.5],
      51: [0, 0.65556, 0.11156, 0, 0.5],
      52: [0, 0.65556, 0.11156, 0, 0.5],
      53: [0, 0.65556, 0.11156, 0, 0.5],
      54: [0, 0.65556, 0.11156, 0, 0.5],
      55: [0, 0.65556, 0.11156, 0, 0.5],
      56: [0, 0.65556, 0.11156, 0, 0.5],
      57: [0, 0.65556, 0.11156, 0, 0.5],
      58: [0, 0.44444, 0.02502, 0, 0.27778],
      59: [0.125, 0.44444, 0.02502, 0, 0.27778],
      61: [-0.13, 0.37, 0.05087, 0, 0.77778],
      63: [0, 0.69444, 0.11809, 0, 0.47222],
      64: [0, 0.69444, 0.07555, 0, 0.66667],
      65: [0, 0.69444, 0, 0, 0.66667],
      66: [0, 0.69444, 0.08293, 0, 0.66667],
      67: [0, 0.69444, 0.11983, 0, 0.63889],
      68: [0, 0.69444, 0.07555, 0, 0.72223],
      69: [0, 0.69444, 0.11983, 0, 0.59722],
      70: [0, 0.69444, 0.13372, 0, 0.56945],
      71: [0, 0.69444, 0.11983, 0, 0.66667],
      72: [0, 0.69444, 0.08094, 0, 0.70834],
      73: [0, 0.69444, 0.13372, 0, 0.27778],
      74: [0, 0.69444, 0.08094, 0, 0.47222],
      75: [0, 0.69444, 0.11983, 0, 0.69445],
      76: [0, 0.69444, 0, 0, 0.54167],
      77: [0, 0.69444, 0.08094, 0, 0.875],
      78: [0, 0.69444, 0.08094, 0, 0.70834],
      79: [0, 0.69444, 0.07555, 0, 0.73611],
      80: [0, 0.69444, 0.08293, 0, 0.63889],
      81: [0.125, 0.69444, 0.07555, 0, 0.73611],
      82: [0, 0.69444, 0.08293, 0, 0.64584],
      83: [0, 0.69444, 0.09205, 0, 0.55556],
      84: [0, 0.69444, 0.13372, 0, 0.68056],
      85: [0, 0.69444, 0.08094, 0, 0.6875],
      86: [0, 0.69444, 0.1615, 0, 0.66667],
      87: [0, 0.69444, 0.1615, 0, 0.94445],
      88: [0, 0.69444, 0.13372, 0, 0.66667],
      89: [0, 0.69444, 0.17261, 0, 0.66667],
      90: [0, 0.69444, 0.11983, 0, 0.61111],
      91: [0.25, 0.75, 0.15942, 0, 0.28889],
      93: [0.25, 0.75, 0.08719, 0, 0.28889],
      94: [0, 0.69444, 0.0799, 0, 0.5],
      95: [0.35, 0.09444, 0.08616, 0, 0.5],
      97: [0, 0.44444, 0.00981, 0, 0.48056],
      98: [0, 0.69444, 0.03057, 0, 0.51667],
      99: [0, 0.44444, 0.08336, 0, 0.44445],
      100: [0, 0.69444, 0.09483, 0, 0.51667],
      101: [0, 0.44444, 0.06778, 0, 0.44445],
      102: [0, 0.69444, 0.21705, 0, 0.30556],
      103: [0.19444, 0.44444, 0.10836, 0, 0.5],
      104: [0, 0.69444, 0.01778, 0, 0.51667],
      105: [0, 0.67937, 0.09718, 0, 0.23889],
      106: [0.19444, 0.67937, 0.09162, 0, 0.26667],
      107: [0, 0.69444, 0.08336, 0, 0.48889],
      108: [0, 0.69444, 0.09483, 0, 0.23889],
      109: [0, 0.44444, 0.01778, 0, 0.79445],
      110: [0, 0.44444, 0.01778, 0, 0.51667],
      111: [0, 0.44444, 0.06613, 0, 0.5],
      112: [0.19444, 0.44444, 0.0389, 0, 0.51667],
      113: [0.19444, 0.44444, 0.04169, 0, 0.51667],
      114: [0, 0.44444, 0.10836, 0, 0.34167],
      115: [0, 0.44444, 0.0778, 0, 0.38333],
      116: [0, 0.57143, 0.07225, 0, 0.36111],
      117: [0, 0.44444, 0.04169, 0, 0.51667],
      118: [0, 0.44444, 0.10836, 0, 0.46111],
      119: [0, 0.44444, 0.10836, 0, 0.68334],
      120: [0, 0.44444, 0.09169, 0, 0.46111],
      121: [0.19444, 0.44444, 0.10836, 0, 0.46111],
      122: [0, 0.44444, 0.08752, 0, 0.43472],
      126: [0.35, 0.32659, 0.08826, 0, 0.5],
      160: [0, 0, 0, 0, 0.25],
      168: [0, 0.67937, 0.06385, 0, 0.5],
      176: [0, 0.69444, 0, 0, 0.73752],
      184: [0.17014, 0, 0, 0, 0.44445],
      305: [0, 0.44444, 0.04169, 0, 0.23889],
      567: [0.19444, 0.44444, 0.04169, 0, 0.26667],
      710: [0, 0.69444, 0.0799, 0, 0.5],
      711: [0, 0.63194, 0.08432, 0, 0.5],
      713: [0, 0.60889, 0.08776, 0, 0.5],
      714: [0, 0.69444, 0.09205, 0, 0.5],
      715: [0, 0.69444, 0, 0, 0.5],
      728: [0, 0.69444, 0.09483, 0, 0.5],
      729: [0, 0.67937, 0.07774, 0, 0.27778],
      730: [0, 0.69444, 0, 0, 0.73752],
      732: [0, 0.67659, 0.08826, 0, 0.5],
      733: [0, 0.69444, 0.09205, 0, 0.5],
      915: [0, 0.69444, 0.13372, 0, 0.54167],
      916: [0, 0.69444, 0, 0, 0.83334],
      920: [0, 0.69444, 0.07555, 0, 0.77778],
      923: [0, 0.69444, 0, 0, 0.61111],
      926: [0, 0.69444, 0.12816, 0, 0.66667],
      928: [0, 0.69444, 0.08094, 0, 0.70834],
      931: [0, 0.69444, 0.11983, 0, 0.72222],
      933: [0, 0.69444, 0.09031, 0, 0.77778],
      934: [0, 0.69444, 0.04603, 0, 0.72222],
      936: [0, 0.69444, 0.09031, 0, 0.77778],
      937: [0, 0.69444, 0.08293, 0, 0.72222],
      8211: [0, 0.44444, 0.08616, 0, 0.5],
      8212: [0, 0.44444, 0.08616, 0, 1],
      8216: [0, 0.69444, 0.07816, 0, 0.27778],
      8217: [0, 0.69444, 0.07816, 0, 0.27778],
      8220: [0, 0.69444, 0.14205, 0, 0.5],
      8221: [0, 0.69444, 0.00316, 0, 0.5],
    },
    "SansSerif-Regular": {
      32: [0, 0, 0, 0, 0.25],
      33: [0, 0.69444, 0, 0, 0.31945],
      34: [0, 0.69444, 0, 0, 0.5],
      35: [0.19444, 0.69444, 0, 0, 0.83334],
      36: [0.05556, 0.75, 0, 0, 0.5],
      37: [0.05556, 0.75, 0, 0, 0.83334],
      38: [0, 0.69444, 0, 0, 0.75834],
      39: [0, 0.69444, 0, 0, 0.27778],
      40: [0.25, 0.75, 0, 0, 0.38889],
      41: [0.25, 0.75, 0, 0, 0.38889],
      42: [0, 0.75, 0, 0, 0.5],
      43: [0.08333, 0.58333, 0, 0, 0.77778],
      44: [0.125, 0.08333, 0, 0, 0.27778],
      45: [0, 0.44444, 0, 0, 0.33333],
      46: [0, 0.08333, 0, 0, 0.27778],
      47: [0.25, 0.75, 0, 0, 0.5],
      48: [0, 0.65556, 0, 0, 0.5],
      49: [0, 0.65556, 0, 0, 0.5],
      50: [0, 0.65556, 0, 0, 0.5],
      51: [0, 0.65556, 0, 0, 0.5],
      52: [0, 0.65556, 0, 0, 0.5],
      53: [0, 0.65556, 0, 0, 0.5],
      54: [0, 0.65556, 0, 0, 0.5],
      55: [0, 0.65556, 0, 0, 0.5],
      56: [0, 0.65556, 0, 0, 0.5],
      57: [0, 0.65556, 0, 0, 0.5],
      58: [0, 0.44444, 0, 0, 0.27778],
      59: [0.125, 0.44444, 0, 0, 0.27778],
      61: [-0.13, 0.37, 0, 0, 0.77778],
      63: [0, 0.69444, 0, 0, 0.47222],
      64: [0, 0.69444, 0, 0, 0.66667],
      65: [0, 0.69444, 0, 0, 0.66667],
      66: [0, 0.69444, 0, 0, 0.66667],
      67: [0, 0.69444, 0, 0, 0.63889],
      68: [0, 0.69444, 0, 0, 0.72223],
      69: [0, 0.69444, 0, 0, 0.59722],
      70: [0, 0.69444, 0, 0, 0.56945],
      71: [0, 0.69444, 0, 0, 0.66667],
      72: [0, 0.69444, 0, 0, 0.70834],
      73: [0, 0.69444, 0, 0, 0.27778],
      74: [0, 0.69444, 0, 0, 0.47222],
      75: [0, 0.69444, 0, 0, 0.69445],
      76: [0, 0.69444, 0, 0, 0.54167],
      77: [0, 0.69444, 0, 0, 0.875],
      78: [0, 0.69444, 0, 0, 0.70834],
      79: [0, 0.69444, 0, 0, 0.73611],
      80: [0, 0.69444, 0, 0, 0.63889],
      81: [0.125, 0.69444, 0, 0, 0.73611],
      82: [0, 0.69444, 0, 0, 0.64584],
      83: [0, 0.69444, 0, 0, 0.55556],
      84: [0, 0.69444, 0, 0, 0.68056],
      85: [0, 0.69444, 0, 0, 0.6875],
      86: [0, 0.69444, 0.01389, 0, 0.66667],
      87: [0, 0.69444, 0.01389, 0, 0.94445],
      88: [0, 0.69444, 0, 0, 0.66667],
      89: [0, 0.69444, 0.025, 0, 0.66667],
      90: [0, 0.69444, 0, 0, 0.61111],
      91: [0.25, 0.75, 0, 0, 0.28889],
      93: [0.25, 0.75, 0, 0, 0.28889],
      94: [0, 0.69444, 0, 0, 0.5],
      95: [0.35, 0.09444, 0.02778, 0, 0.5],
      97: [0, 0.44444, 0, 0, 0.48056],
      98: [0, 0.69444, 0, 0, 0.51667],
      99: [0, 0.44444, 0, 0, 0.44445],
      100: [0, 0.69444, 0, 0, 0.51667],
      101: [0, 0.44444, 0, 0, 0.44445],
      102: [0, 0.69444, 0.06944, 0, 0.30556],
      103: [0.19444, 0.44444, 0.01389, 0, 0.5],
      104: [0, 0.69444, 0, 0, 0.51667],
      105: [0, 0.67937, 0, 0, 0.23889],
      106: [0.19444, 0.67937, 0, 0, 0.26667],
      107: [0, 0.69444, 0, 0, 0.48889],
      108: [0, 0.69444, 0, 0, 0.23889],
      109: [0, 0.44444, 0, 0, 0.79445],
      110: [0, 0.44444, 0, 0, 0.51667],
      111: [0, 0.44444, 0, 0, 0.5],
      112: [0.19444, 0.44444, 0, 0, 0.51667],
      113: [0.19444, 0.44444, 0, 0, 0.51667],
      114: [0, 0.44444, 0.01389, 0, 0.34167],
      115: [0, 0.44444, 0, 0, 0.38333],
      116: [0, 0.57143, 0, 0, 0.36111],
      117: [0, 0.44444, 0, 0, 0.51667],
      118: [0, 0.44444, 0.01389, 0, 0.46111],
      119: [0, 0.44444, 0.01389, 0, 0.68334],
      120: [0, 0.44444, 0, 0, 0.46111],
      121: [0.19444, 0.44444, 0.01389, 0, 0.46111],
      122: [0, 0.44444, 0, 0, 0.43472],
      126: [0.35, 0.32659, 0, 0, 0.5],
      160: [0, 0, 0, 0, 0.25],
      168: [0, 0.67937, 0, 0, 0.5],
      176: [0, 0.69444, 0, 0, 0.66667],
      184: [0.17014, 0, 0, 0, 0.44445],
      305: [0, 0.44444, 0, 0, 0.23889],
      567: [0.19444, 0.44444, 0, 0, 0.26667],
      710: [0, 0.69444, 0, 0, 0.5],
      711: [0, 0.63194, 0, 0, 0.5],
      713: [0, 0.60889, 0, 0, 0.5],
      714: [0, 0.69444, 0, 0, 0.5],
      715: [0, 0.69444, 0, 0, 0.5],
      728: [0, 0.69444, 0, 0, 0.5],
      729: [0, 0.67937, 0, 0, 0.27778],
      730: [0, 0.69444, 0, 0, 0.66667],
      732: [0, 0.67659, 0, 0, 0.5],
      733: [0, 0.69444, 0, 0, 0.5],
      915: [0, 0.69444, 0, 0, 0.54167],
      916: [0, 0.69444, 0, 0, 0.83334],
      920: [0, 0.69444, 0, 0, 0.77778],
      923: [0, 0.69444, 0, 0, 0.61111],
      926: [0, 0.69444, 0, 0, 0.66667],
      928: [0, 0.69444, 0, 0, 0.70834],
      931: [0, 0.69444, 0, 0, 0.72222],
      933: [0, 0.69444, 0, 0, 0.77778],
      934: [0, 0.69444, 0, 0, 0.72222],
      936: [0, 0.69444, 0, 0, 0.77778],
      937: [0, 0.69444, 0, 0, 0.72222],
      8211: [0, 0.44444, 0.02778, 0, 0.5],
      8212: [0, 0.44444, 0.02778, 0, 1],
      8216: [0, 0.69444, 0, 0, 0.27778],
      8217: [0, 0.69444, 0, 0, 0.27778],
      8220: [0, 0.69444, 0, 0, 0.5],
      8221: [0, 0.69444, 0, 0, 0.5],
    },
    "Script-Regular": {
      32: [0, 0, 0, 0, 0.25],
      65: [0, 0.7, 0.22925, 0, 0.80253],
      66: [0, 0.7, 0.04087, 0, 0.90757],
      67: [0, 0.7, 0.1689, 0, 0.66619],
      68: [0, 0.7, 0.09371, 0, 0.77443],
      69: [0, 0.7, 0.18583, 0, 0.56162],
      70: [0, 0.7, 0.13634, 0, 0.89544],
      71: [0, 0.7, 0.17322, 0, 0.60961],
      72: [0, 0.7, 0.29694, 0, 0.96919],
      73: [0, 0.7, 0.19189, 0, 0.80907],
      74: [0.27778, 0.7, 0.19189, 0, 1.05159],
      75: [0, 0.7, 0.31259, 0, 0.91364],
      76: [0, 0.7, 0.19189, 0, 0.87373],
      77: [0, 0.7, 0.15981, 0, 1.08031],
      78: [0, 0.7, 0.3525, 0, 0.9015],
      79: [0, 0.7, 0.08078, 0, 0.73787],
      80: [0, 0.7, 0.08078, 0, 1.01262],
      81: [0, 0.7, 0.03305, 0, 0.88282],
      82: [0, 0.7, 0.06259, 0, 0.85],
      83: [0, 0.7, 0.19189, 0, 0.86767],
      84: [0, 0.7, 0.29087, 0, 0.74697],
      85: [0, 0.7, 0.25815, 0, 0.79996],
      86: [0, 0.7, 0.27523, 0, 0.62204],
      87: [0, 0.7, 0.27523, 0, 0.80532],
      88: [0, 0.7, 0.26006, 0, 0.94445],
      89: [0, 0.7, 0.2939, 0, 0.70961],
      90: [0, 0.7, 0.24037, 0, 0.8212],
      160: [0, 0, 0, 0, 0.25],
    },
    "Size1-Regular": {
      32: [0, 0, 0, 0, 0.25],
      40: [0.35001, 0.85, 0, 0, 0.45834],
      41: [0.35001, 0.85, 0, 0, 0.45834],
      47: [0.35001, 0.85, 0, 0, 0.57778],
      91: [0.35001, 0.85, 0, 0, 0.41667],
      92: [0.35001, 0.85, 0, 0, 0.57778],
      93: [0.35001, 0.85, 0, 0, 0.41667],
      123: [0.35001, 0.85, 0, 0, 0.58334],
      125: [0.35001, 0.85, 0, 0, 0.58334],
      160: [0, 0, 0, 0, 0.25],
      710: [0, 0.72222, 0, 0, 0.55556],
      732: [0, 0.72222, 0, 0, 0.55556],
      770: [0, 0.72222, 0, 0, 0.55556],
      771: [0, 0.72222, 0, 0, 0.55556],
      8214: [-99e-5, 0.601, 0, 0, 0.77778],
      8593: [1e-5, 0.6, 0, 0, 0.66667],
      8595: [1e-5, 0.6, 0, 0, 0.66667],
      8657: [1e-5, 0.6, 0, 0, 0.77778],
      8659: [1e-5, 0.6, 0, 0, 0.77778],
      8719: [0.25001, 0.75, 0, 0, 0.94445],
      8720: [0.25001, 0.75, 0, 0, 0.94445],
      8721: [0.25001, 0.75, 0, 0, 1.05556],
      8730: [0.35001, 0.85, 0, 0, 1],
      8739: [-0.00599, 0.606, 0, 0, 0.33333],
      8741: [-0.00599, 0.606, 0, 0, 0.55556],
      8747: [0.30612, 0.805, 0.19445, 0, 0.47222],
      8748: [0.306, 0.805, 0.19445, 0, 0.47222],
      8749: [0.306, 0.805, 0.19445, 0, 0.47222],
      8750: [0.30612, 0.805, 0.19445, 0, 0.47222],
      8896: [0.25001, 0.75, 0, 0, 0.83334],
      8897: [0.25001, 0.75, 0, 0, 0.83334],
      8898: [0.25001, 0.75, 0, 0, 0.83334],
      8899: [0.25001, 0.75, 0, 0, 0.83334],
      8968: [0.35001, 0.85, 0, 0, 0.47222],
      8969: [0.35001, 0.85, 0, 0, 0.47222],
      8970: [0.35001, 0.85, 0, 0, 0.47222],
      8971: [0.35001, 0.85, 0, 0, 0.47222],
      9168: [-99e-5, 0.601, 0, 0, 0.66667],
      10216: [0.35001, 0.85, 0, 0, 0.47222],
      10217: [0.35001, 0.85, 0, 0, 0.47222],
      10752: [0.25001, 0.75, 0, 0, 1.11111],
      10753: [0.25001, 0.75, 0, 0, 1.11111],
      10754: [0.25001, 0.75, 0, 0, 1.11111],
      10756: [0.25001, 0.75, 0, 0, 0.83334],
      10758: [0.25001, 0.75, 0, 0, 0.83334],
    },
    "Size2-Regular": {
      32: [0, 0, 0, 0, 0.25],
      40: [0.65002, 1.15, 0, 0, 0.59722],
      41: [0.65002, 1.15, 0, 0, 0.59722],
      47: [0.65002, 1.15, 0, 0, 0.81111],
      91: [0.65002, 1.15, 0, 0, 0.47222],
      92: [0.65002, 1.15, 0, 0, 0.81111],
      93: [0.65002, 1.15, 0, 0, 0.47222],
      123: [0.65002, 1.15, 0, 0, 0.66667],
      125: [0.65002, 1.15, 0, 0, 0.66667],
      160: [0, 0, 0, 0, 0.25],
      710: [0, 0.75, 0, 0, 1],
      732: [0, 0.75, 0, 0, 1],
      770: [0, 0.75, 0, 0, 1],
      771: [0, 0.75, 0, 0, 1],
      8719: [0.55001, 1.05, 0, 0, 1.27778],
      8720: [0.55001, 1.05, 0, 0, 1.27778],
      8721: [0.55001, 1.05, 0, 0, 1.44445],
      8730: [0.65002, 1.15, 0, 0, 1],
      8747: [0.86225, 1.36, 0.44445, 0, 0.55556],
      8748: [0.862, 1.36, 0.44445, 0, 0.55556],
      8749: [0.862, 1.36, 0.44445, 0, 0.55556],
      8750: [0.86225, 1.36, 0.44445, 0, 0.55556],
      8896: [0.55001, 1.05, 0, 0, 1.11111],
      8897: [0.55001, 1.05, 0, 0, 1.11111],
      8898: [0.55001, 1.05, 0, 0, 1.11111],
      8899: [0.55001, 1.05, 0, 0, 1.11111],
      8968: [0.65002, 1.15, 0, 0, 0.52778],
      8969: [0.65002, 1.15, 0, 0, 0.52778],
      8970: [0.65002, 1.15, 0, 0, 0.52778],
      8971: [0.65002, 1.15, 0, 0, 0.52778],
      10216: [0.65002, 1.15, 0, 0, 0.61111],
      10217: [0.65002, 1.15, 0, 0, 0.61111],
      10752: [0.55001, 1.05, 0, 0, 1.51112],
      10753: [0.55001, 1.05, 0, 0, 1.51112],
      10754: [0.55001, 1.05, 0, 0, 1.51112],
      10756: [0.55001, 1.05, 0, 0, 1.11111],
      10758: [0.55001, 1.05, 0, 0, 1.11111],
    },
    "Size3-Regular": {
      32: [0, 0, 0, 0, 0.25],
      40: [0.95003, 1.45, 0, 0, 0.73611],
      41: [0.95003, 1.45, 0, 0, 0.73611],
      47: [0.95003, 1.45, 0, 0, 1.04445],
      91: [0.95003, 1.45, 0, 0, 0.52778],
      92: [0.95003, 1.45, 0, 0, 1.04445],
      93: [0.95003, 1.45, 0, 0, 0.52778],
      123: [0.95003, 1.45, 0, 0, 0.75],
      125: [0.95003, 1.45, 0, 0, 0.75],
      160: [0, 0, 0, 0, 0.25],
      710: [0, 0.75, 0, 0, 1.44445],
      732: [0, 0.75, 0, 0, 1.44445],
      770: [0, 0.75, 0, 0, 1.44445],
      771: [0, 0.75, 0, 0, 1.44445],
      8730: [0.95003, 1.45, 0, 0, 1],
      8968: [0.95003, 1.45, 0, 0, 0.58334],
      8969: [0.95003, 1.45, 0, 0, 0.58334],
      8970: [0.95003, 1.45, 0, 0, 0.58334],
      8971: [0.95003, 1.45, 0, 0, 0.58334],
      10216: [0.95003, 1.45, 0, 0, 0.75],
      10217: [0.95003, 1.45, 0, 0, 0.75],
    },
    "Size4-Regular": {
      32: [0, 0, 0, 0, 0.25],
      40: [1.25003, 1.75, 0, 0, 0.79167],
      41: [1.25003, 1.75, 0, 0, 0.79167],
      47: [1.25003, 1.75, 0, 0, 1.27778],
      91: [1.25003, 1.75, 0, 0, 0.58334],
      92: [1.25003, 1.75, 0, 0, 1.27778],
      93: [1.25003, 1.75, 0, 0, 0.58334],
      123: [1.25003, 1.75, 0, 0, 0.80556],
      125: [1.25003, 1.75, 0, 0, 0.80556],
      160: [0, 0, 0, 0, 0.25],
      710: [0, 0.825, 0, 0, 1.8889],
      732: [0, 0.825, 0, 0, 1.8889],
      770: [0, 0.825, 0, 0, 1.8889],
      771: [0, 0.825, 0, 0, 1.8889],
      8730: [1.25003, 1.75, 0, 0, 1],
      8968: [1.25003, 1.75, 0, 0, 0.63889],
      8969: [1.25003, 1.75, 0, 0, 0.63889],
      8970: [1.25003, 1.75, 0, 0, 0.63889],
      8971: [1.25003, 1.75, 0, 0, 0.63889],
      9115: [0.64502, 1.155, 0, 0, 0.875],
      9116: [1e-5, 0.6, 0, 0, 0.875],
      9117: [0.64502, 1.155, 0, 0, 0.875],
      9118: [0.64502, 1.155, 0, 0, 0.875],
      9119: [1e-5, 0.6, 0, 0, 0.875],
      9120: [0.64502, 1.155, 0, 0, 0.875],
      9121: [0.64502, 1.155, 0, 0, 0.66667],
      9122: [-99e-5, 0.601, 0, 0, 0.66667],
      9123: [0.64502, 1.155, 0, 0, 0.66667],
      9124: [0.64502, 1.155, 0, 0, 0.66667],
      9125: [-99e-5, 0.601, 0, 0, 0.66667],
      9126: [0.64502, 1.155, 0, 0, 0.66667],
      9127: [1e-5, 0.9, 0, 0, 0.88889],
      9128: [0.65002, 1.15, 0, 0, 0.88889],
      9129: [0.90001, 0, 0, 0, 0.88889],
      9130: [0, 0.3, 0, 0, 0.88889],
      9131: [1e-5, 0.9, 0, 0, 0.88889],
      9132: [0.65002, 1.15, 0, 0, 0.88889],
      9133: [0.90001, 0, 0, 0, 0.88889],
      9143: [0.88502, 0.915, 0, 0, 1.05556],
      10216: [1.25003, 1.75, 0, 0, 0.80556],
      10217: [1.25003, 1.75, 0, 0, 0.80556],
      57344: [-0.00499, 0.605, 0, 0, 1.05556],
      57345: [-0.00499, 0.605, 0, 0, 1.05556],
      57680: [0, 0.12, 0, 0, 0.45],
      57681: [0, 0.12, 0, 0, 0.45],
      57682: [0, 0.12, 0, 0, 0.45],
      57683: [0, 0.12, 0, 0, 0.45],
    },
    "Typewriter-Regular": {
      32: [0, 0, 0, 0, 0.525],
      33: [0, 0.61111, 0, 0, 0.525],
      34: [0, 0.61111, 0, 0, 0.525],
      35: [0, 0.61111, 0, 0, 0.525],
      36: [0.08333, 0.69444, 0, 0, 0.525],
      37: [0.08333, 0.69444, 0, 0, 0.525],
      38: [0, 0.61111, 0, 0, 0.525],
      39: [0, 0.61111, 0, 0, 0.525],
      40: [0.08333, 0.69444, 0, 0, 0.525],
      41: [0.08333, 0.69444, 0, 0, 0.525],
      42: [0, 0.52083, 0, 0, 0.525],
      43: [-0.08056, 0.53055, 0, 0, 0.525],
      44: [0.13889, 0.125, 0, 0, 0.525],
      45: [-0.08056, 0.53055, 0, 0, 0.525],
      46: [0, 0.125, 0, 0, 0.525],
      47: [0.08333, 0.69444, 0, 0, 0.525],
      48: [0, 0.61111, 0, 0, 0.525],
      49: [0, 0.61111, 0, 0, 0.525],
      50: [0, 0.61111, 0, 0, 0.525],
      51: [0, 0.61111, 0, 0, 0.525],
      52: [0, 0.61111, 0, 0, 0.525],
      53: [0, 0.61111, 0, 0, 0.525],
      54: [0, 0.61111, 0, 0, 0.525],
      55: [0, 0.61111, 0, 0, 0.525],
      56: [0, 0.61111, 0, 0, 0.525],
      57: [0, 0.61111, 0, 0, 0.525],
      58: [0, 0.43056, 0, 0, 0.525],
      59: [0.13889, 0.43056, 0, 0, 0.525],
      60: [-0.05556, 0.55556, 0, 0, 0.525],
      61: [-0.19549, 0.41562, 0, 0, 0.525],
      62: [-0.05556, 0.55556, 0, 0, 0.525],
      63: [0, 0.61111, 0, 0, 0.525],
      64: [0, 0.61111, 0, 0, 0.525],
      65: [0, 0.61111, 0, 0, 0.525],
      66: [0, 0.61111, 0, 0, 0.525],
      67: [0, 0.61111, 0, 0, 0.525],
      68: [0, 0.61111, 0, 0, 0.525],
      69: [0, 0.61111, 0, 0, 0.525],
      70: [0, 0.61111, 0, 0, 0.525],
      71: [0, 0.61111, 0, 0, 0.525],
      72: [0, 0.61111, 0, 0, 0.525],
      73: [0, 0.61111, 0, 0, 0.525],
      74: [0, 0.61111, 0, 0, 0.525],
      75: [0, 0.61111, 0, 0, 0.525],
      76: [0, 0.61111, 0, 0, 0.525],
      77: [0, 0.61111, 0, 0, 0.525],
      78: [0, 0.61111, 0, 0, 0.525],
      79: [0, 0.61111, 0, 0, 0.525],
      80: [0, 0.61111, 0, 0, 0.525],
      81: [0.13889, 0.61111, 0, 0, 0.525],
      82: [0, 0.61111, 0, 0, 0.525],
      83: [0, 0.61111, 0, 0, 0.525],
      84: [0, 0.61111, 0, 0, 0.525],
      85: [0, 0.61111, 0, 0, 0.525],
      86: [0, 0.61111, 0, 0, 0.525],
      87: [0, 0.61111, 0, 0, 0.525],
      88: [0, 0.61111, 0, 0, 0.525],
      89: [0, 0.61111, 0, 0, 0.525],
      90: [0, 0.61111, 0, 0, 0.525],
      91: [0.08333, 0.69444, 0, 0, 0.525],
      92: [0.08333, 0.69444, 0, 0, 0.525],
      93: [0.08333, 0.69444, 0, 0, 0.525],
      94: [0, 0.61111, 0, 0, 0.525],
      95: [0.09514, 0, 0, 0, 0.525],
      96: [0, 0.61111, 0, 0, 0.525],
      97: [0, 0.43056, 0, 0, 0.525],
      98: [0, 0.61111, 0, 0, 0.525],
      99: [0, 0.43056, 0, 0, 0.525],
      100: [0, 0.61111, 0, 0, 0.525],
      101: [0, 0.43056, 0, 0, 0.525],
      102: [0, 0.61111, 0, 0, 0.525],
      103: [0.22222, 0.43056, 0, 0, 0.525],
      104: [0, 0.61111, 0, 0, 0.525],
      105: [0, 0.61111, 0, 0, 0.525],
      106: [0.22222, 0.61111, 0, 0, 0.525],
      107: [0, 0.61111, 0, 0, 0.525],
      108: [0, 0.61111, 0, 0, 0.525],
      109: [0, 0.43056, 0, 0, 0.525],
      110: [0, 0.43056, 0, 0, 0.525],
      111: [0, 0.43056, 0, 0, 0.525],
      112: [0.22222, 0.43056, 0, 0, 0.525],
      113: [0.22222, 0.43056, 0, 0, 0.525],
      114: [0, 0.43056, 0, 0, 0.525],
      115: [0, 0.43056, 0, 0, 0.525],
      116: [0, 0.55358, 0, 0, 0.525],
      117: [0, 0.43056, 0, 0, 0.525],
      118: [0, 0.43056, 0, 0, 0.525],
      119: [0, 0.43056, 0, 0, 0.525],
      120: [0, 0.43056, 0, 0, 0.525],
      121: [0.22222, 0.43056, 0, 0, 0.525],
      122: [0, 0.43056, 0, 0, 0.525],
      123: [0.08333, 0.69444, 0, 0, 0.525],
      124: [0.08333, 0.69444, 0, 0, 0.525],
      125: [0.08333, 0.69444, 0, 0, 0.525],
      126: [0, 0.61111, 0, 0, 0.525],
      127: [0, 0.61111, 0, 0, 0.525],
      160: [0, 0, 0, 0, 0.525],
      176: [0, 0.61111, 0, 0, 0.525],
      184: [0.19445, 0, 0, 0, 0.525],
      305: [0, 0.43056, 0, 0, 0.525],
      567: [0.22222, 0.43056, 0, 0, 0.525],
      711: [0, 0.56597, 0, 0, 0.525],
      713: [0, 0.56555, 0, 0, 0.525],
      714: [0, 0.61111, 0, 0, 0.525],
      715: [0, 0.61111, 0, 0, 0.525],
      728: [0, 0.61111, 0, 0, 0.525],
      730: [0, 0.61111, 0, 0, 0.525],
      770: [0, 0.61111, 0, 0, 0.525],
      771: [0, 0.61111, 0, 0, 0.525],
      776: [0, 0.61111, 0, 0, 0.525],
      915: [0, 0.61111, 0, 0, 0.525],
      916: [0, 0.61111, 0, 0, 0.525],
      920: [0, 0.61111, 0, 0, 0.525],
      923: [0, 0.61111, 0, 0, 0.525],
      926: [0, 0.61111, 0, 0, 0.525],
      928: [0, 0.61111, 0, 0, 0.525],
      931: [0, 0.61111, 0, 0, 0.525],
      933: [0, 0.61111, 0, 0, 0.525],
      934: [0, 0.61111, 0, 0, 0.525],
      936: [0, 0.61111, 0, 0, 0.525],
      937: [0, 0.61111, 0, 0, 0.525],
      8216: [0, 0.61111, 0, 0, 0.525],
      8217: [0, 0.61111, 0, 0, 0.525],
      8242: [0, 0.61111, 0, 0, 0.525],
      9251: [0.11111, 0.21944, 0, 0, 0.525],
    },
  },
  Te = {
    slant: [0.25, 0.25, 0.25],
    space: [0, 0, 0],
    stretch: [0, 0, 0],
    shrink: [0, 0, 0],
    xHeight: [0.431, 0.431, 0.431],
    quad: [1, 1.171, 1.472],
    extraSpace: [0, 0, 0],
    num1: [0.677, 0.732, 0.925],
    num2: [0.394, 0.384, 0.387],
    num3: [0.444, 0.471, 0.504],
    denom1: [0.686, 0.752, 1.025],
    denom2: [0.345, 0.344, 0.532],
    sup1: [0.413, 0.503, 0.504],
    sup2: [0.363, 0.431, 0.404],
    sup3: [0.289, 0.286, 0.294],
    sub1: [0.15, 0.143, 0.2],
    sub2: [0.247, 0.286, 0.4],
    supDrop: [0.386, 0.353, 0.494],
    subDrop: [0.05, 0.071, 0.1],
    delim1: [2.39, 1.7, 1.98],
    delim2: [1.01, 1.157, 1.42],
    axisHeight: [0.25, 0.25, 0.25],
    defaultRuleThickness: [0.04, 0.049, 0.049],
    bigOpSpacing1: [0.111, 0.111, 0.111],
    bigOpSpacing2: [0.166, 0.166, 0.166],
    bigOpSpacing3: [0.2, 0.2, 0.2],
    bigOpSpacing4: [0.6, 0.611, 0.611],
    bigOpSpacing5: [0.1, 0.143, 0.143],
    sqrtRuleThickness: [0.04, 0.04, 0.04],
    ptPerEm: [10, 10, 10],
    doubleRuleSep: [0.2, 0.2, 0.2],
    arrayRuleWidth: [0.04, 0.04, 0.04],
    fboxsep: [0.3, 0.3, 0.3],
    fboxrule: [0.04, 0.04, 0.04],
  },
  hr = {
    Å: "A",
    Ð: "D",
    Þ: "o",
    å: "a",
    ð: "d",
    þ: "o",
    А: "A",
    Б: "B",
    В: "B",
    Г: "F",
    Д: "A",
    Е: "E",
    Ж: "K",
    З: "3",
    И: "N",
    Й: "N",
    К: "K",
    Л: "N",
    М: "M",
    Н: "H",
    О: "O",
    П: "N",
    Р: "P",
    С: "C",
    Т: "T",
    У: "y",
    Ф: "O",
    Х: "X",
    Ц: "U",
    Ч: "h",
    Ш: "W",
    Щ: "W",
    Ъ: "B",
    Ы: "X",
    Ь: "B",
    Э: "3",
    Ю: "X",
    Я: "R",
    а: "a",
    б: "b",
    в: "a",
    г: "r",
    д: "y",
    е: "e",
    ж: "m",
    з: "e",
    и: "n",
    й: "n",
    к: "n",
    л: "n",
    м: "m",
    н: "n",
    о: "o",
    п: "n",
    р: "p",
    с: "c",
    т: "o",
    у: "y",
    ф: "b",
    х: "x",
    ц: "n",
    ч: "n",
    ш: "w",
    щ: "w",
    ъ: "a",
    ы: "m",
    ь: "a",
    э: "e",
    ю: "m",
    я: "r",
  };
function An(r, e) {
  k0[r] = e;
}
function Lt(r, e, t) {
  if (!k0[e]) throw new Error("Font metrics not found for font: " + e + ".");
  var a = r.charCodeAt(0),
    n = k0[e][a];
  if (
    (!n && r[0] in hr && ((a = hr[r[0]].charCodeAt(0)), (n = k0[e][a])),
    !n && t === "text" && $r(a) && (n = k0[e][77]),
    n)
  )
    return { depth: n[0], height: n[1], italic: n[2], skew: n[3], width: n[4] };
}
var rt = {};
function Sn(r) {
  var e;
  if ((r >= 5 ? (e = 0) : r >= 3 ? (e = 1) : (e = 2), !rt[e])) {
    var t = (rt[e] = { cssEmPerMu: Te.quad[e] / 18 });
    for (var a in Te) Te.hasOwnProperty(a) && (t[a] = Te[a][e]);
  }
  return rt[e];
}
var kn = [
    [1, 1, 1],
    [2, 1, 1],
    [3, 1, 1],
    [4, 2, 1],
    [5, 2, 1],
    [6, 3, 1],
    [7, 4, 2],
    [8, 6, 3],
    [9, 7, 6],
    [10, 8, 7],
    [11, 10, 9],
  ],
  cr = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.44, 1.728, 2.074, 2.488],
  mr = function (e, t) {
    return t.size < 2 ? e : kn[e - 1][t.size - 1];
  };
class N0 {
  constructor(e) {
    (this.style = void 0),
      (this.color = void 0),
      (this.size = void 0),
      (this.textSize = void 0),
      (this.phantom = void 0),
      (this.font = void 0),
      (this.fontFamily = void 0),
      (this.fontWeight = void 0),
      (this.fontShape = void 0),
      (this.sizeMultiplier = void 0),
      (this.maxSize = void 0),
      (this.minRuleThickness = void 0),
      (this._fontMetrics = void 0),
      (this.style = e.style),
      (this.color = e.color),
      (this.size = e.size || N0.BASESIZE),
      (this.textSize = e.textSize || this.size),
      (this.phantom = !!e.phantom),
      (this.font = e.font || ""),
      (this.fontFamily = e.fontFamily || ""),
      (this.fontWeight = e.fontWeight || ""),
      (this.fontShape = e.fontShape || ""),
      (this.sizeMultiplier = cr[this.size - 1]),
      (this.maxSize = e.maxSize),
      (this.minRuleThickness = e.minRuleThickness),
      (this._fontMetrics = void 0);
  }
  extend(e) {
    var t = {
      style: this.style,
      size: this.size,
      textSize: this.textSize,
      color: this.color,
      phantom: this.phantom,
      font: this.font,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontShape: this.fontShape,
      maxSize: this.maxSize,
      minRuleThickness: this.minRuleThickness,
    };
    for (var a in e) e.hasOwnProperty(a) && (t[a] = e[a]);
    return new N0(t);
  }
  havingStyle(e) {
    return this.style === e
      ? this
      : this.extend({ style: e, size: mr(this.textSize, e) });
  }
  havingCrampedStyle() {
    return this.havingStyle(this.style.cramp());
  }
  havingSize(e) {
    return this.size === e && this.textSize === e
      ? this
      : this.extend({
          style: this.style.text(),
          size: e,
          textSize: e,
          sizeMultiplier: cr[e - 1],
        });
  }
  havingBaseStyle(e) {
    e = e || this.style.text();
    var t = mr(N0.BASESIZE, e);
    return this.size === t && this.textSize === N0.BASESIZE && this.style === e
      ? this
      : this.extend({ style: e, size: t });
  }
  havingBaseSizing() {
    var e;
    switch (this.style.id) {
      case 4:
      case 5:
        e = 3;
        break;
      case 6:
      case 7:
        e = 1;
        break;
      default:
        e = 6;
    }
    return this.extend({ style: this.style.text(), size: e });
  }
  withColor(e) {
    return this.extend({ color: e });
  }
  withPhantom() {
    return this.extend({ phantom: !0 });
  }
  withFont(e) {
    return this.extend({ font: e });
  }
  withTextFontFamily(e) {
    return this.extend({ fontFamily: e, font: "" });
  }
  withTextFontWeight(e) {
    return this.extend({ fontWeight: e, font: "" });
  }
  withTextFontShape(e) {
    return this.extend({ fontShape: e, font: "" });
  }
  sizingClasses(e) {
    return e.size !== this.size
      ? ["sizing", "reset-size" + e.size, "size" + this.size]
      : [];
  }
  baseSizingClasses() {
    return this.size !== N0.BASESIZE
      ? ["sizing", "reset-size" + this.size, "size" + N0.BASESIZE]
      : [];
  }
  fontMetrics() {
    return (
      this._fontMetrics || (this._fontMetrics = Sn(this.size)),
      this._fontMetrics
    );
  }
  getColor() {
    return this.phantom ? "transparent" : this.color;
  }
}
N0.BASESIZE = 6;
var Tt = {
    pt: 1,
    mm: 7227 / 2540,
    cm: 7227 / 254,
    in: 72.27,
    bp: 803 / 800,
    pc: 12,
    dd: 1238 / 1157,
    cc: 14856 / 1157,
    nd: 685 / 642,
    nc: 1370 / 107,
    sp: 1 / 65536,
    px: 803 / 800,
  },
  Mn = { ex: !0, em: !0, mu: !0 },
  _r = function (e) {
    return (
      typeof e != "string" && (e = e.unit), e in Tt || e in Mn || e === "ex"
    );
  },
  Z = function (e, t) {
    var a;
    if (e.unit in Tt)
      a = Tt[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
    else if (e.unit === "mu") a = t.fontMetrics().cssEmPerMu;
    else {
      var n;
      if (
        (t.style.isTight() ? (n = t.havingStyle(t.style.text())) : (n = t),
        e.unit === "ex")
      )
        a = n.fontMetrics().xHeight;
      else if (e.unit === "em") a = n.fontMetrics().quad;
      else throw new T("Invalid unit: '" + e.unit + "'");
      n !== t && (a *= n.sizeMultiplier / t.sizeMultiplier);
    }
    return Math.min(e.number * a, t.maxSize);
  },
  z = function (e) {
    return +e.toFixed(4) + "em";
  },
  Y0 = function (e) {
    return e.filter((t) => t).join(" ");
  },
  ea = function (e, t, a) {
    if (
      ((this.classes = e || []),
      (this.attributes = {}),
      (this.height = 0),
      (this.depth = 0),
      (this.maxFontSize = 0),
      (this.style = a || {}),
      t)
    ) {
      t.style.isTight() && this.classes.push("mtight");
      var n = t.getColor();
      n && (this.style.color = n);
    }
  },
  ta = function (e) {
    var t = document.createElement(e);
    t.className = Y0(this.classes);
    for (var a in this.style)
      this.style.hasOwnProperty(a) && (t.style[a] = this.style[a]);
    for (var n in this.attributes)
      this.attributes.hasOwnProperty(n) &&
        t.setAttribute(n, this.attributes[n]);
    for (var i = 0; i < this.children.length; i++)
      t.appendChild(this.children[i].toNode());
    return t;
  },
  Tn = /[\s"'>/=\x00-\x1f]/,
  ra = function (e) {
    var t = "<" + e;
    this.classes.length && (t += ' class="' + I.escape(Y0(this.classes)) + '"');
    var a = "";
    for (var n in this.style)
      this.style.hasOwnProperty(n) &&
        (a += I.hyphenate(n) + ":" + this.style[n] + ";");
    a && (t += ' style="' + I.escape(a) + '"');
    for (var i in this.attributes)
      if (this.attributes.hasOwnProperty(i)) {
        if (Tn.test(i)) throw new T("Invalid attribute name '" + i + "'");
        t += " " + i + '="' + I.escape(this.attributes[i]) + '"';
      }
    t += ">";
    for (var o = 0; o < this.children.length; o++)
      t += this.children[o].toMarkup();
    return (t += "</" + e + ">"), t;
  };
class ye {
  constructor(e, t, a, n) {
    (this.children = void 0),
      (this.attributes = void 0),
      (this.classes = void 0),
      (this.height = void 0),
      (this.depth = void 0),
      (this.width = void 0),
      (this.maxFontSize = void 0),
      (this.style = void 0),
      ea.call(this, e, a, n),
      (this.children = t || []);
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return I.contains(this.classes, e);
  }
  toNode() {
    return ta.call(this, "span");
  }
  toMarkup() {
    return ra.call(this, "span");
  }
}
class Ft {
  constructor(e, t, a, n) {
    (this.children = void 0),
      (this.attributes = void 0),
      (this.classes = void 0),
      (this.height = void 0),
      (this.depth = void 0),
      (this.maxFontSize = void 0),
      (this.style = void 0),
      ea.call(this, t, n),
      (this.children = a || []),
      this.setAttribute("href", e);
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return I.contains(this.classes, e);
  }
  toNode() {
    return ta.call(this, "a");
  }
  toMarkup() {
    return ra.call(this, "a");
  }
}
class zn {
  constructor(e, t, a) {
    (this.src = void 0),
      (this.alt = void 0),
      (this.classes = void 0),
      (this.height = void 0),
      (this.depth = void 0),
      (this.maxFontSize = void 0),
      (this.style = void 0),
      (this.alt = t),
      (this.src = e),
      (this.classes = ["mord"]),
      (this.style = a);
  }
  hasClass(e) {
    return I.contains(this.classes, e);
  }
  toNode() {
    var e = document.createElement("img");
    (e.src = this.src), (e.alt = this.alt), (e.className = "mord");
    for (var t in this.style)
      this.style.hasOwnProperty(t) && (e.style[t] = this.style[t]);
    return e;
  }
  toMarkup() {
    var e =
        '<img src="' +
        I.escape(this.src) +
        '"' +
        (' alt="' + I.escape(this.alt) + '"'),
      t = "";
    for (var a in this.style)
      this.style.hasOwnProperty(a) &&
        (t += I.hyphenate(a) + ":" + this.style[a] + ";");
    return t && (e += ' style="' + I.escape(t) + '"'), (e += "'/>"), e;
  }
}
var Bn = { î: "ı̂", ï: "ı̈", í: "ı́", ì: "ı̀" };
class b0 {
  constructor(e, t, a, n, i, o, u, c) {
    (this.text = void 0),
      (this.height = void 0),
      (this.depth = void 0),
      (this.italic = void 0),
      (this.skew = void 0),
      (this.width = void 0),
      (this.maxFontSize = void 0),
      (this.classes = void 0),
      (this.style = void 0),
      (this.text = e),
      (this.height = t || 0),
      (this.depth = a || 0),
      (this.italic = n || 0),
      (this.skew = i || 0),
      (this.width = o || 0),
      (this.classes = u || []),
      (this.style = c || {}),
      (this.maxFontSize = 0);
    var d = cn(this.text.charCodeAt(0));
    d && this.classes.push(d + "_fallback"),
      /[îïíì]/.test(this.text) && (this.text = Bn[this.text]);
  }
  hasClass(e) {
    return I.contains(this.classes, e);
  }
  toNode() {
    var e = document.createTextNode(this.text),
      t = null;
    this.italic > 0 &&
      ((t = document.createElement("span")),
      (t.style.marginRight = z(this.italic))),
      this.classes.length > 0 &&
        ((t = t || document.createElement("span")),
        (t.className = Y0(this.classes)));
    for (var a in this.style)
      this.style.hasOwnProperty(a) &&
        ((t = t || document.createElement("span")),
        (t.style[a] = this.style[a]));
    return t ? (t.appendChild(e), t) : e;
  }
  toMarkup() {
    var e = !1,
      t = "<span";
    this.classes.length &&
      ((e = !0),
      (t += ' class="'),
      (t += I.escape(Y0(this.classes))),
      (t += '"'));
    var a = "";
    this.italic > 0 && (a += "margin-right:" + this.italic + "em;");
    for (var n in this.style)
      this.style.hasOwnProperty(n) &&
        (a += I.hyphenate(n) + ":" + this.style[n] + ";");
    a && ((e = !0), (t += ' style="' + I.escape(a) + '"'));
    var i = I.escape(this.text);
    return e ? ((t += ">"), (t += i), (t += "</span>"), t) : i;
  }
}
class O0 {
  constructor(e, t) {
    (this.children = void 0),
      (this.attributes = void 0),
      (this.children = e || []),
      (this.attributes = t || {});
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg",
      t = document.createElementNS(e, "svg");
    for (var a in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, a) &&
        t.setAttribute(a, this.attributes[a]);
    for (var n = 0; n < this.children.length; n++)
      t.appendChild(this.children[n].toNode());
    return t;
  }
  toMarkup() {
    var e = '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var t in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, t) &&
        (e += " " + t + '="' + I.escape(this.attributes[t]) + '"');
    e += ">";
    for (var a = 0; a < this.children.length; a++)
      e += this.children[a].toMarkup();
    return (e += "</svg>"), e;
  }
}
class Q0 {
  constructor(e, t) {
    (this.pathName = void 0),
      (this.alternate = void 0),
      (this.pathName = e),
      (this.alternate = t);
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg",
      t = document.createElementNS(e, "path");
    return (
      this.alternate
        ? t.setAttribute("d", this.alternate)
        : t.setAttribute("d", ur[this.pathName]),
      t
    );
  }
  toMarkup() {
    return this.alternate
      ? '<path d="' + I.escape(this.alternate) + '"/>'
      : '<path d="' + I.escape(ur[this.pathName]) + '"/>';
  }
}
class zt {
  constructor(e) {
    (this.attributes = void 0), (this.attributes = e || {});
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg",
      t = document.createElementNS(e, "line");
    for (var a in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, a) &&
        t.setAttribute(a, this.attributes[a]);
    return t;
  }
  toMarkup() {
    var e = "<line";
    for (var t in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, t) &&
        (e += " " + t + '="' + I.escape(this.attributes[t]) + '"');
    return (e += "/>"), e;
  }
}
function dr(r) {
  if (r instanceof b0) return r;
  throw new Error("Expected symbolNode but got " + String(r) + ".");
}
function Cn(r) {
  if (r instanceof ye) return r;
  throw new Error("Expected span<HtmlDomNode> but got " + String(r) + ".");
}
var Dn = { bin: 1, close: 1, inner: 1, open: 1, punct: 1, rel: 1 },
  Nn = { "accent-token": 1, mathord: 1, "op-token": 1, spacing: 1, textord: 1 },
  X = { math: {}, text: {} };
function s(r, e, t, a, n, i) {
  (X[r][n] = { font: e, group: t, replace: a }), i && a && (X[r][a] = X[r][n]);
}
var l = "math",
  A = "text",
  h = "main",
  p = "ams",
  j = "accent-token",
  N = "bin",
  l0 = "close",
  ce = "inner",
  O = "mathord",
  _ = "op-token",
  d0 = "open",
  Ve = "punct",
  v = "rel",
  F0 = "spacing",
  b = "textord";
s(l, h, v, "≡", "\\equiv", !0);
s(l, h, v, "≺", "\\prec", !0);
s(l, h, v, "≻", "\\succ", !0);
s(l, h, v, "∼", "\\sim", !0);
s(l, h, v, "⊥", "\\perp");
s(l, h, v, "⪯", "\\preceq", !0);
s(l, h, v, "⪰", "\\succeq", !0);
s(l, h, v, "≃", "\\simeq", !0);
s(l, h, v, "∣", "\\mid", !0);
s(l, h, v, "≪", "\\ll", !0);
s(l, h, v, "≫", "\\gg", !0);
s(l, h, v, "≍", "\\asymp", !0);
s(l, h, v, "∥", "\\parallel");
s(l, h, v, "⋈", "\\bowtie", !0);
s(l, h, v, "⌣", "\\smile", !0);
s(l, h, v, "⊑", "\\sqsubseteq", !0);
s(l, h, v, "⊒", "\\sqsupseteq", !0);
s(l, h, v, "≐", "\\doteq", !0);
s(l, h, v, "⌢", "\\frown", !0);
s(l, h, v, "∋", "\\ni", !0);
s(l, h, v, "∝", "\\propto", !0);
s(l, h, v, "⊢", "\\vdash", !0);
s(l, h, v, "⊣", "\\dashv", !0);
s(l, h, v, "∋", "\\owns");
s(l, h, Ve, ".", "\\ldotp");
s(l, h, Ve, "⋅", "\\cdotp");
s(l, h, b, "#", "\\#");
s(A, h, b, "#", "\\#");
s(l, h, b, "&", "\\&");
s(A, h, b, "&", "\\&");
s(l, h, b, "ℵ", "\\aleph", !0);
s(l, h, b, "∀", "\\forall", !0);
s(l, h, b, "ℏ", "\\hbar", !0);
s(l, h, b, "∃", "\\exists", !0);
s(l, h, b, "∇", "\\nabla", !0);
s(l, h, b, "♭", "\\flat", !0);
s(l, h, b, "ℓ", "\\ell", !0);
s(l, h, b, "♮", "\\natural", !0);
s(l, h, b, "♣", "\\clubsuit", !0);
s(l, h, b, "℘", "\\wp", !0);
s(l, h, b, "♯", "\\sharp", !0);
s(l, h, b, "♢", "\\diamondsuit", !0);
s(l, h, b, "ℜ", "\\Re", !0);
s(l, h, b, "♡", "\\heartsuit", !0);
s(l, h, b, "ℑ", "\\Im", !0);
s(l, h, b, "♠", "\\spadesuit", !0);
s(l, h, b, "§", "\\S", !0);
s(A, h, b, "§", "\\S");
s(l, h, b, "¶", "\\P", !0);
s(A, h, b, "¶", "\\P");
s(l, h, b, "†", "\\dag");
s(A, h, b, "†", "\\dag");
s(A, h, b, "†", "\\textdagger");
s(l, h, b, "‡", "\\ddag");
s(A, h, b, "‡", "\\ddag");
s(A, h, b, "‡", "\\textdaggerdbl");
s(l, h, l0, "⎱", "\\rmoustache", !0);
s(l, h, d0, "⎰", "\\lmoustache", !0);
s(l, h, l0, "⟯", "\\rgroup", !0);
s(l, h, d0, "⟮", "\\lgroup", !0);
s(l, h, N, "∓", "\\mp", !0);
s(l, h, N, "⊖", "\\ominus", !0);
s(l, h, N, "⊎", "\\uplus", !0);
s(l, h, N, "⊓", "\\sqcap", !0);
s(l, h, N, "∗", "\\ast");
s(l, h, N, "⊔", "\\sqcup", !0);
s(l, h, N, "◯", "\\bigcirc", !0);
s(l, h, N, "∙", "\\bullet", !0);
s(l, h, N, "‡", "\\ddagger");
s(l, h, N, "≀", "\\wr", !0);
s(l, h, N, "⨿", "\\amalg");
s(l, h, N, "&", "\\And");
s(l, h, v, "⟵", "\\longleftarrow", !0);
s(l, h, v, "⇐", "\\Leftarrow", !0);
s(l, h, v, "⟸", "\\Longleftarrow", !0);
s(l, h, v, "⟶", "\\longrightarrow", !0);
s(l, h, v, "⇒", "\\Rightarrow", !0);
s(l, h, v, "⟹", "\\Longrightarrow", !0);
s(l, h, v, "↔", "\\leftrightarrow", !0);
s(l, h, v, "⟷", "\\longleftrightarrow", !0);
s(l, h, v, "⇔", "\\Leftrightarrow", !0);
s(l, h, v, "⟺", "\\Longleftrightarrow", !0);
s(l, h, v, "↦", "\\mapsto", !0);
s(l, h, v, "⟼", "\\longmapsto", !0);
s(l, h, v, "↗", "\\nearrow", !0);
s(l, h, v, "↩", "\\hookleftarrow", !0);
s(l, h, v, "↪", "\\hookrightarrow", !0);
s(l, h, v, "↘", "\\searrow", !0);
s(l, h, v, "↼", "\\leftharpoonup", !0);
s(l, h, v, "⇀", "\\rightharpoonup", !0);
s(l, h, v, "↙", "\\swarrow", !0);
s(l, h, v, "↽", "\\leftharpoondown", !0);
s(l, h, v, "⇁", "\\rightharpoondown", !0);
s(l, h, v, "↖", "\\nwarrow", !0);
s(l, h, v, "⇌", "\\rightleftharpoons", !0);
s(l, p, v, "≮", "\\nless", !0);
s(l, p, v, "", "\\@nleqslant");
s(l, p, v, "", "\\@nleqq");
s(l, p, v, "⪇", "\\lneq", !0);
s(l, p, v, "≨", "\\lneqq", !0);
s(l, p, v, "", "\\@lvertneqq");
s(l, p, v, "⋦", "\\lnsim", !0);
s(l, p, v, "⪉", "\\lnapprox", !0);
s(l, p, v, "⊀", "\\nprec", !0);
s(l, p, v, "⋠", "\\npreceq", !0);
s(l, p, v, "⋨", "\\precnsim", !0);
s(l, p, v, "⪹", "\\precnapprox", !0);
s(l, p, v, "≁", "\\nsim", !0);
s(l, p, v, "", "\\@nshortmid");
s(l, p, v, "∤", "\\nmid", !0);
s(l, p, v, "⊬", "\\nvdash", !0);
s(l, p, v, "⊭", "\\nvDash", !0);
s(l, p, v, "⋪", "\\ntriangleleft");
s(l, p, v, "⋬", "\\ntrianglelefteq", !0);
s(l, p, v, "⊊", "\\subsetneq", !0);
s(l, p, v, "", "\\@varsubsetneq");
s(l, p, v, "⫋", "\\subsetneqq", !0);
s(l, p, v, "", "\\@varsubsetneqq");
s(l, p, v, "≯", "\\ngtr", !0);
s(l, p, v, "", "\\@ngeqslant");
s(l, p, v, "", "\\@ngeqq");
s(l, p, v, "⪈", "\\gneq", !0);
s(l, p, v, "≩", "\\gneqq", !0);
s(l, p, v, "", "\\@gvertneqq");
s(l, p, v, "⋧", "\\gnsim", !0);
s(l, p, v, "⪊", "\\gnapprox", !0);
s(l, p, v, "⊁", "\\nsucc", !0);
s(l, p, v, "⋡", "\\nsucceq", !0);
s(l, p, v, "⋩", "\\succnsim", !0);
s(l, p, v, "⪺", "\\succnapprox", !0);
s(l, p, v, "≆", "\\ncong", !0);
s(l, p, v, "", "\\@nshortparallel");
s(l, p, v, "∦", "\\nparallel", !0);
s(l, p, v, "⊯", "\\nVDash", !0);
s(l, p, v, "⋫", "\\ntriangleright");
s(l, p, v, "⋭", "\\ntrianglerighteq", !0);
s(l, p, v, "", "\\@nsupseteqq");
s(l, p, v, "⊋", "\\supsetneq", !0);
s(l, p, v, "", "\\@varsupsetneq");
s(l, p, v, "⫌", "\\supsetneqq", !0);
s(l, p, v, "", "\\@varsupsetneqq");
s(l, p, v, "⊮", "\\nVdash", !0);
s(l, p, v, "⪵", "\\precneqq", !0);
s(l, p, v, "⪶", "\\succneqq", !0);
s(l, p, v, "", "\\@nsubseteqq");
s(l, p, N, "⊴", "\\unlhd");
s(l, p, N, "⊵", "\\unrhd");
s(l, p, v, "↚", "\\nleftarrow", !0);
s(l, p, v, "↛", "\\nrightarrow", !0);
s(l, p, v, "⇍", "\\nLeftarrow", !0);
s(l, p, v, "⇏", "\\nRightarrow", !0);
s(l, p, v, "↮", "\\nleftrightarrow", !0);
s(l, p, v, "⇎", "\\nLeftrightarrow", !0);
s(l, p, v, "△", "\\vartriangle");
s(l, p, b, "ℏ", "\\hslash");
s(l, p, b, "▽", "\\triangledown");
s(l, p, b, "◊", "\\lozenge");
s(l, p, b, "Ⓢ", "\\circledS");
s(l, p, b, "®", "\\circledR");
s(A, p, b, "®", "\\circledR");
s(l, p, b, "∡", "\\measuredangle", !0);
s(l, p, b, "∄", "\\nexists");
s(l, p, b, "℧", "\\mho");
s(l, p, b, "Ⅎ", "\\Finv", !0);
s(l, p, b, "⅁", "\\Game", !0);
s(l, p, b, "‵", "\\backprime");
s(l, p, b, "▲", "\\blacktriangle");
s(l, p, b, "▼", "\\blacktriangledown");
s(l, p, b, "■", "\\blacksquare");
s(l, p, b, "⧫", "\\blacklozenge");
s(l, p, b, "★", "\\bigstar");
s(l, p, b, "∢", "\\sphericalangle", !0);
s(l, p, b, "∁", "\\complement", !0);
s(l, p, b, "ð", "\\eth", !0);
s(A, h, b, "ð", "ð");
s(l, p, b, "╱", "\\diagup");
s(l, p, b, "╲", "\\diagdown");
s(l, p, b, "□", "\\square");
s(l, p, b, "□", "\\Box");
s(l, p, b, "◊", "\\Diamond");
s(l, p, b, "¥", "\\yen", !0);
s(A, p, b, "¥", "\\yen", !0);
s(l, p, b, "✓", "\\checkmark", !0);
s(A, p, b, "✓", "\\checkmark");
s(l, p, b, "ℶ", "\\beth", !0);
s(l, p, b, "ℸ", "\\daleth", !0);
s(l, p, b, "ℷ", "\\gimel", !0);
s(l, p, b, "ϝ", "\\digamma", !0);
s(l, p, b, "ϰ", "\\varkappa");
s(l, p, d0, "┌", "\\@ulcorner", !0);
s(l, p, l0, "┐", "\\@urcorner", !0);
s(l, p, d0, "└", "\\@llcorner", !0);
s(l, p, l0, "┘", "\\@lrcorner", !0);
s(l, p, v, "≦", "\\leqq", !0);
s(l, p, v, "⩽", "\\leqslant", !0);
s(l, p, v, "⪕", "\\eqslantless", !0);
s(l, p, v, "≲", "\\lesssim", !0);
s(l, p, v, "⪅", "\\lessapprox", !0);
s(l, p, v, "≊", "\\approxeq", !0);
s(l, p, N, "⋖", "\\lessdot");
s(l, p, v, "⋘", "\\lll", !0);
s(l, p, v, "≶", "\\lessgtr", !0);
s(l, p, v, "⋚", "\\lesseqgtr", !0);
s(l, p, v, "⪋", "\\lesseqqgtr", !0);
s(l, p, v, "≑", "\\doteqdot");
s(l, p, v, "≓", "\\risingdotseq", !0);
s(l, p, v, "≒", "\\fallingdotseq", !0);
s(l, p, v, "∽", "\\backsim", !0);
s(l, p, v, "⋍", "\\backsimeq", !0);
s(l, p, v, "⫅", "\\subseteqq", !0);
s(l, p, v, "⋐", "\\Subset", !0);
s(l, p, v, "⊏", "\\sqsubset", !0);
s(l, p, v, "≼", "\\preccurlyeq", !0);
s(l, p, v, "⋞", "\\curlyeqprec", !0);
s(l, p, v, "≾", "\\precsim", !0);
s(l, p, v, "⪷", "\\precapprox", !0);
s(l, p, v, "⊲", "\\vartriangleleft");
s(l, p, v, "⊴", "\\trianglelefteq");
s(l, p, v, "⊨", "\\vDash", !0);
s(l, p, v, "⊪", "\\Vvdash", !0);
s(l, p, v, "⌣", "\\smallsmile");
s(l, p, v, "⌢", "\\smallfrown");
s(l, p, v, "≏", "\\bumpeq", !0);
s(l, p, v, "≎", "\\Bumpeq", !0);
s(l, p, v, "≧", "\\geqq", !0);
s(l, p, v, "⩾", "\\geqslant", !0);
s(l, p, v, "⪖", "\\eqslantgtr", !0);
s(l, p, v, "≳", "\\gtrsim", !0);
s(l, p, v, "⪆", "\\gtrapprox", !0);
s(l, p, N, "⋗", "\\gtrdot");
s(l, p, v, "⋙", "\\ggg", !0);
s(l, p, v, "≷", "\\gtrless", !0);
s(l, p, v, "⋛", "\\gtreqless", !0);
s(l, p, v, "⪌", "\\gtreqqless", !0);
s(l, p, v, "≖", "\\eqcirc", !0);
s(l, p, v, "≗", "\\circeq", !0);
s(l, p, v, "≜", "\\triangleq", !0);
s(l, p, v, "∼", "\\thicksim");
s(l, p, v, "≈", "\\thickapprox");
s(l, p, v, "⫆", "\\supseteqq", !0);
s(l, p, v, "⋑", "\\Supset", !0);
s(l, p, v, "⊐", "\\sqsupset", !0);
s(l, p, v, "≽", "\\succcurlyeq", !0);
s(l, p, v, "⋟", "\\curlyeqsucc", !0);
s(l, p, v, "≿", "\\succsim", !0);
s(l, p, v, "⪸", "\\succapprox", !0);
s(l, p, v, "⊳", "\\vartriangleright");
s(l, p, v, "⊵", "\\trianglerighteq");
s(l, p, v, "⊩", "\\Vdash", !0);
s(l, p, v, "∣", "\\shortmid");
s(l, p, v, "∥", "\\shortparallel");
s(l, p, v, "≬", "\\between", !0);
s(l, p, v, "⋔", "\\pitchfork", !0);
s(l, p, v, "∝", "\\varpropto");
s(l, p, v, "◀", "\\blacktriangleleft");
s(l, p, v, "∴", "\\therefore", !0);
s(l, p, v, "∍", "\\backepsilon");
s(l, p, v, "▶", "\\blacktriangleright");
s(l, p, v, "∵", "\\because", !0);
s(l, p, v, "⋘", "\\llless");
s(l, p, v, "⋙", "\\gggtr");
s(l, p, N, "⊲", "\\lhd");
s(l, p, N, "⊳", "\\rhd");
s(l, p, v, "≂", "\\eqsim", !0);
s(l, h, v, "⋈", "\\Join");
s(l, p, v, "≑", "\\Doteq", !0);
s(l, p, N, "∔", "\\dotplus", !0);
s(l, p, N, "∖", "\\smallsetminus");
s(l, p, N, "⋒", "\\Cap", !0);
s(l, p, N, "⋓", "\\Cup", !0);
s(l, p, N, "⩞", "\\doublebarwedge", !0);
s(l, p, N, "⊟", "\\boxminus", !0);
s(l, p, N, "⊞", "\\boxplus", !0);
s(l, p, N, "⋇", "\\divideontimes", !0);
s(l, p, N, "⋉", "\\ltimes", !0);
s(l, p, N, "⋊", "\\rtimes", !0);
s(l, p, N, "⋋", "\\leftthreetimes", !0);
s(l, p, N, "⋌", "\\rightthreetimes", !0);
s(l, p, N, "⋏", "\\curlywedge", !0);
s(l, p, N, "⋎", "\\curlyvee", !0);
s(l, p, N, "⊝", "\\circleddash", !0);
s(l, p, N, "⊛", "\\circledast", !0);
s(l, p, N, "⋅", "\\centerdot");
s(l, p, N, "⊺", "\\intercal", !0);
s(l, p, N, "⋒", "\\doublecap");
s(l, p, N, "⋓", "\\doublecup");
s(l, p, N, "⊠", "\\boxtimes", !0);
s(l, p, v, "⇢", "\\dashrightarrow", !0);
s(l, p, v, "⇠", "\\dashleftarrow", !0);
s(l, p, v, "⇇", "\\leftleftarrows", !0);
s(l, p, v, "⇆", "\\leftrightarrows", !0);
s(l, p, v, "⇚", "\\Lleftarrow", !0);
s(l, p, v, "↞", "\\twoheadleftarrow", !0);
s(l, p, v, "↢", "\\leftarrowtail", !0);
s(l, p, v, "↫", "\\looparrowleft", !0);
s(l, p, v, "⇋", "\\leftrightharpoons", !0);
s(l, p, v, "↶", "\\curvearrowleft", !0);
s(l, p, v, "↺", "\\circlearrowleft", !0);
s(l, p, v, "↰", "\\Lsh", !0);
s(l, p, v, "⇈", "\\upuparrows", !0);
s(l, p, v, "↿", "\\upharpoonleft", !0);
s(l, p, v, "⇃", "\\downharpoonleft", !0);
s(l, h, v, "⊶", "\\origof", !0);
s(l, h, v, "⊷", "\\imageof", !0);
s(l, p, v, "⊸", "\\multimap", !0);
s(l, p, v, "↭", "\\leftrightsquigarrow", !0);
s(l, p, v, "⇉", "\\rightrightarrows", !0);
s(l, p, v, "⇄", "\\rightleftarrows", !0);
s(l, p, v, "↠", "\\twoheadrightarrow", !0);
s(l, p, v, "↣", "\\rightarrowtail", !0);
s(l, p, v, "↬", "\\looparrowright", !0);
s(l, p, v, "↷", "\\curvearrowright", !0);
s(l, p, v, "↻", "\\circlearrowright", !0);
s(l, p, v, "↱", "\\Rsh", !0);
s(l, p, v, "⇊", "\\downdownarrows", !0);
s(l, p, v, "↾", "\\upharpoonright", !0);
s(l, p, v, "⇂", "\\downharpoonright", !0);
s(l, p, v, "⇝", "\\rightsquigarrow", !0);
s(l, p, v, "⇝", "\\leadsto");
s(l, p, v, "⇛", "\\Rrightarrow", !0);
s(l, p, v, "↾", "\\restriction");
s(l, h, b, "‘", "`");
s(l, h, b, "$", "\\$");
s(A, h, b, "$", "\\$");
s(A, h, b, "$", "\\textdollar");
s(l, h, b, "%", "\\%");
s(A, h, b, "%", "\\%");
s(l, h, b, "_", "\\_");
s(A, h, b, "_", "\\_");
s(A, h, b, "_", "\\textunderscore");
s(l, h, b, "∠", "\\angle", !0);
s(l, h, b, "∞", "\\infty", !0);
s(l, h, b, "′", "\\prime");
s(l, h, b, "△", "\\triangle");
s(l, h, b, "Γ", "\\Gamma", !0);
s(l, h, b, "Δ", "\\Delta", !0);
s(l, h, b, "Θ", "\\Theta", !0);
s(l, h, b, "Λ", "\\Lambda", !0);
s(l, h, b, "Ξ", "\\Xi", !0);
s(l, h, b, "Π", "\\Pi", !0);
s(l, h, b, "Σ", "\\Sigma", !0);
s(l, h, b, "Υ", "\\Upsilon", !0);
s(l, h, b, "Φ", "\\Phi", !0);
s(l, h, b, "Ψ", "\\Psi", !0);
s(l, h, b, "Ω", "\\Omega", !0);
s(l, h, b, "A", "Α");
s(l, h, b, "B", "Β");
s(l, h, b, "E", "Ε");
s(l, h, b, "Z", "Ζ");
s(l, h, b, "H", "Η");
s(l, h, b, "I", "Ι");
s(l, h, b, "K", "Κ");
s(l, h, b, "M", "Μ");
s(l, h, b, "N", "Ν");
s(l, h, b, "O", "Ο");
s(l, h, b, "P", "Ρ");
s(l, h, b, "T", "Τ");
s(l, h, b, "X", "Χ");
s(l, h, b, "¬", "\\neg", !0);
s(l, h, b, "¬", "\\lnot");
s(l, h, b, "⊤", "\\top");
s(l, h, b, "⊥", "\\bot");
s(l, h, b, "∅", "\\emptyset");
s(l, p, b, "∅", "\\varnothing");
s(l, h, O, "α", "\\alpha", !0);
s(l, h, O, "β", "\\beta", !0);
s(l, h, O, "γ", "\\gamma", !0);
s(l, h, O, "δ", "\\delta", !0);
s(l, h, O, "ϵ", "\\epsilon", !0);
s(l, h, O, "ζ", "\\zeta", !0);
s(l, h, O, "η", "\\eta", !0);
s(l, h, O, "θ", "\\theta", !0);
s(l, h, O, "ι", "\\iota", !0);
s(l, h, O, "κ", "\\kappa", !0);
s(l, h, O, "λ", "\\lambda", !0);
s(l, h, O, "μ", "\\mu", !0);
s(l, h, O, "ν", "\\nu", !0);
s(l, h, O, "ξ", "\\xi", !0);
s(l, h, O, "ο", "\\omicron", !0);
s(l, h, O, "π", "\\pi", !0);
s(l, h, O, "ρ", "\\rho", !0);
s(l, h, O, "σ", "\\sigma", !0);
s(l, h, O, "τ", "\\tau", !0);
s(l, h, O, "υ", "\\upsilon", !0);
s(l, h, O, "ϕ", "\\phi", !0);
s(l, h, O, "χ", "\\chi", !0);
s(l, h, O, "ψ", "\\psi", !0);
s(l, h, O, "ω", "\\omega", !0);
s(l, h, O, "ε", "\\varepsilon", !0);
s(l, h, O, "ϑ", "\\vartheta", !0);
s(l, h, O, "ϖ", "\\varpi", !0);
s(l, h, O, "ϱ", "\\varrho", !0);
s(l, h, O, "ς", "\\varsigma", !0);
s(l, h, O, "φ", "\\varphi", !0);
s(l, h, N, "∗", "*", !0);
s(l, h, N, "+", "+");
s(l, h, N, "−", "-", !0);
s(l, h, N, "⋅", "\\cdot", !0);
s(l, h, N, "∘", "\\circ", !0);
s(l, h, N, "÷", "\\div", !0);
s(l, h, N, "±", "\\pm", !0);
s(l, h, N, "×", "\\times", !0);
s(l, h, N, "∩", "\\cap", !0);
s(l, h, N, "∪", "\\cup", !0);
s(l, h, N, "∖", "\\setminus", !0);
s(l, h, N, "∧", "\\land");
s(l, h, N, "∨", "\\lor");
s(l, h, N, "∧", "\\wedge", !0);
s(l, h, N, "∨", "\\vee", !0);
s(l, h, b, "√", "\\surd");
s(l, h, d0, "⟨", "\\langle", !0);
s(l, h, d0, "∣", "\\lvert");
s(l, h, d0, "∥", "\\lVert");
s(l, h, l0, "?", "?");
s(l, h, l0, "!", "!");
s(l, h, l0, "⟩", "\\rangle", !0);
s(l, h, l0, "∣", "\\rvert");
s(l, h, l0, "∥", "\\rVert");
s(l, h, v, "=", "=");
s(l, h, v, ":", ":");
s(l, h, v, "≈", "\\approx", !0);
s(l, h, v, "≅", "\\cong", !0);
s(l, h, v, "≥", "\\ge");
s(l, h, v, "≥", "\\geq", !0);
s(l, h, v, "←", "\\gets");
s(l, h, v, ">", "\\gt", !0);
s(l, h, v, "∈", "\\in", !0);
s(l, h, v, "", "\\@not");
s(l, h, v, "⊂", "\\subset", !0);
s(l, h, v, "⊃", "\\supset", !0);
s(l, h, v, "⊆", "\\subseteq", !0);
s(l, h, v, "⊇", "\\supseteq", !0);
s(l, p, v, "⊈", "\\nsubseteq", !0);
s(l, p, v, "⊉", "\\nsupseteq", !0);
s(l, h, v, "⊨", "\\models");
s(l, h, v, "←", "\\leftarrow", !0);
s(l, h, v, "≤", "\\le");
s(l, h, v, "≤", "\\leq", !0);
s(l, h, v, "<", "\\lt", !0);
s(l, h, v, "→", "\\rightarrow", !0);
s(l, h, v, "→", "\\to");
s(l, p, v, "≱", "\\ngeq", !0);
s(l, p, v, "≰", "\\nleq", !0);
s(l, h, F0, " ", "\\ ");
s(l, h, F0, " ", "\\space");
s(l, h, F0, " ", "\\nobreakspace");
s(A, h, F0, " ", "\\ ");
s(A, h, F0, " ", " ");
s(A, h, F0, " ", "\\space");
s(A, h, F0, " ", "\\nobreakspace");
s(l, h, F0, null, "\\nobreak");
s(l, h, F0, null, "\\allowbreak");
s(l, h, Ve, ",", ",");
s(l, h, Ve, ";", ";");
s(l, p, N, "⊼", "\\barwedge", !0);
s(l, p, N, "⊻", "\\veebar", !0);
s(l, h, N, "⊙", "\\odot", !0);
s(l, h, N, "⊕", "\\oplus", !0);
s(l, h, N, "⊗", "\\otimes", !0);
s(l, h, b, "∂", "\\partial", !0);
s(l, h, N, "⊘", "\\oslash", !0);
s(l, p, N, "⊚", "\\circledcirc", !0);
s(l, p, N, "⊡", "\\boxdot", !0);
s(l, h, N, "△", "\\bigtriangleup");
s(l, h, N, "▽", "\\bigtriangledown");
s(l, h, N, "†", "\\dagger");
s(l, h, N, "⋄", "\\diamond");
s(l, h, N, "⋆", "\\star");
s(l, h, N, "◃", "\\triangleleft");
s(l, h, N, "▹", "\\triangleright");
s(l, h, d0, "{", "\\{");
s(A, h, b, "{", "\\{");
s(A, h, b, "{", "\\textbraceleft");
s(l, h, l0, "}", "\\}");
s(A, h, b, "}", "\\}");
s(A, h, b, "}", "\\textbraceright");
s(l, h, d0, "{", "\\lbrace");
s(l, h, l0, "}", "\\rbrace");
s(l, h, d0, "[", "\\lbrack", !0);
s(A, h, b, "[", "\\lbrack", !0);
s(l, h, l0, "]", "\\rbrack", !0);
s(A, h, b, "]", "\\rbrack", !0);
s(l, h, d0, "(", "\\lparen", !0);
s(l, h, l0, ")", "\\rparen", !0);
s(A, h, b, "<", "\\textless", !0);
s(A, h, b, ">", "\\textgreater", !0);
s(l, h, d0, "⌊", "\\lfloor", !0);
s(l, h, l0, "⌋", "\\rfloor", !0);
s(l, h, d0, "⌈", "\\lceil", !0);
s(l, h, l0, "⌉", "\\rceil", !0);
s(l, h, b, "\\", "\\backslash");
s(l, h, b, "∣", "|");
s(l, h, b, "∣", "\\vert");
s(A, h, b, "|", "\\textbar", !0);
s(l, h, b, "∥", "\\|");
s(l, h, b, "∥", "\\Vert");
s(A, h, b, "∥", "\\textbardbl");
s(A, h, b, "~", "\\textasciitilde");
s(A, h, b, "\\", "\\textbackslash");
s(A, h, b, "^", "\\textasciicircum");
s(l, h, v, "↑", "\\uparrow", !0);
s(l, h, v, "⇑", "\\Uparrow", !0);
s(l, h, v, "↓", "\\downarrow", !0);
s(l, h, v, "⇓", "\\Downarrow", !0);
s(l, h, v, "↕", "\\updownarrow", !0);
s(l, h, v, "⇕", "\\Updownarrow", !0);
s(l, h, _, "∐", "\\coprod");
s(l, h, _, "⋁", "\\bigvee");
s(l, h, _, "⋀", "\\bigwedge");
s(l, h, _, "⨄", "\\biguplus");
s(l, h, _, "⋂", "\\bigcap");
s(l, h, _, "⋃", "\\bigcup");
s(l, h, _, "∫", "\\int");
s(l, h, _, "∫", "\\intop");
s(l, h, _, "∬", "\\iint");
s(l, h, _, "∭", "\\iiint");
s(l, h, _, "∏", "\\prod");
s(l, h, _, "∑", "\\sum");
s(l, h, _, "⨂", "\\bigotimes");
s(l, h, _, "⨁", "\\bigoplus");
s(l, h, _, "⨀", "\\bigodot");
s(l, h, _, "∮", "\\oint");
s(l, h, _, "∯", "\\oiint");
s(l, h, _, "∰", "\\oiiint");
s(l, h, _, "⨆", "\\bigsqcup");
s(l, h, _, "∫", "\\smallint");
s(A, h, ce, "…", "\\textellipsis");
s(l, h, ce, "…", "\\mathellipsis");
s(A, h, ce, "…", "\\ldots", !0);
s(l, h, ce, "…", "\\ldots", !0);
s(l, h, ce, "⋯", "\\@cdots", !0);
s(l, h, ce, "⋱", "\\ddots", !0);
s(l, h, b, "⋮", "\\varvdots");
s(A, h, b, "⋮", "\\varvdots");
s(l, h, j, "ˊ", "\\acute");
s(l, h, j, "ˋ", "\\grave");
s(l, h, j, "¨", "\\ddot");
s(l, h, j, "~", "\\tilde");
s(l, h, j, "ˉ", "\\bar");
s(l, h, j, "˘", "\\breve");
s(l, h, j, "ˇ", "\\check");
s(l, h, j, "^", "\\hat");
s(l, h, j, "⃗", "\\vec");
s(l, h, j, "˙", "\\dot");
s(l, h, j, "˚", "\\mathring");
s(l, h, O, "", "\\@imath");
s(l, h, O, "", "\\@jmath");
s(l, h, b, "ı", "ı");
s(l, h, b, "ȷ", "ȷ");
s(A, h, b, "ı", "\\i", !0);
s(A, h, b, "ȷ", "\\j", !0);
s(A, h, b, "ß", "\\ss", !0);
s(A, h, b, "æ", "\\ae", !0);
s(A, h, b, "œ", "\\oe", !0);
s(A, h, b, "ø", "\\o", !0);
s(A, h, b, "Æ", "\\AE", !0);
s(A, h, b, "Œ", "\\OE", !0);
s(A, h, b, "Ø", "\\O", !0);
s(A, h, j, "ˊ", "\\'");
s(A, h, j, "ˋ", "\\`");
s(A, h, j, "ˆ", "\\^");
s(A, h, j, "˜", "\\~");
s(A, h, j, "ˉ", "\\=");
s(A, h, j, "˘", "\\u");
s(A, h, j, "˙", "\\.");
s(A, h, j, "¸", "\\c");
s(A, h, j, "˚", "\\r");
s(A, h, j, "ˇ", "\\v");
s(A, h, j, "¨", '\\"');
s(A, h, j, "˝", "\\H");
s(A, h, j, "◯", "\\textcircled");
var aa = { "--": !0, "---": !0, "``": !0, "''": !0 };
s(A, h, b, "–", "--", !0);
s(A, h, b, "–", "\\textendash");
s(A, h, b, "—", "---", !0);
s(A, h, b, "—", "\\textemdash");
s(A, h, b, "‘", "`", !0);
s(A, h, b, "‘", "\\textquoteleft");
s(A, h, b, "’", "'", !0);
s(A, h, b, "’", "\\textquoteright");
s(A, h, b, "“", "``", !0);
s(A, h, b, "“", "\\textquotedblleft");
s(A, h, b, "”", "''", !0);
s(A, h, b, "”", "\\textquotedblright");
s(l, h, b, "°", "\\degree", !0);
s(A, h, b, "°", "\\degree");
s(A, h, b, "°", "\\textdegree", !0);
s(l, h, b, "£", "\\pounds");
s(l, h, b, "£", "\\mathsterling", !0);
s(A, h, b, "£", "\\pounds");
s(A, h, b, "£", "\\textsterling", !0);
s(l, p, b, "✠", "\\maltese");
s(A, p, b, "✠", "\\maltese");
var fr = '0123456789/@."';
for (var at = 0; at < fr.length; at++) {
  var pr = fr.charAt(at);
  s(l, h, b, pr, pr);
}
var vr = '0123456789!@*()-=+";:?/.,';
for (var nt = 0; nt < vr.length; nt++) {
  var gr = vr.charAt(nt);
  s(A, h, b, gr, gr);
}
var He = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var it = 0; it < He.length; it++) {
  var ze = He.charAt(it);
  s(l, h, O, ze, ze), s(A, h, b, ze, ze);
}
s(l, p, b, "C", "ℂ");
s(A, p, b, "C", "ℂ");
s(l, p, b, "H", "ℍ");
s(A, p, b, "H", "ℍ");
s(l, p, b, "N", "ℕ");
s(A, p, b, "N", "ℕ");
s(l, p, b, "P", "ℙ");
s(A, p, b, "P", "ℙ");
s(l, p, b, "Q", "ℚ");
s(A, p, b, "Q", "ℚ");
s(l, p, b, "R", "ℝ");
s(A, p, b, "R", "ℝ");
s(l, p, b, "Z", "ℤ");
s(A, p, b, "Z", "ℤ");
s(l, h, O, "h", "ℎ");
s(A, h, O, "h", "ℎ");
var F = "";
for (var n0 = 0; n0 < He.length; n0++) {
  var J = He.charAt(n0);
  (F = String.fromCharCode(55349, 56320 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    (F = String.fromCharCode(55349, 56372 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    (F = String.fromCharCode(55349, 56424 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    (F = String.fromCharCode(55349, 56580 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    (F = String.fromCharCode(55349, 56684 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    (F = String.fromCharCode(55349, 56736 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    (F = String.fromCharCode(55349, 56788 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    (F = String.fromCharCode(55349, 56840 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    (F = String.fromCharCode(55349, 56944 + n0)),
    s(l, h, O, J, F),
    s(A, h, b, J, F),
    n0 < 26 &&
      ((F = String.fromCharCode(55349, 56632 + n0)),
      s(l, h, O, J, F),
      s(A, h, b, J, F),
      (F = String.fromCharCode(55349, 56476 + n0)),
      s(l, h, O, J, F),
      s(A, h, b, J, F));
}
F = "𝕜";
s(l, h, O, "k", F);
s(A, h, b, "k", F);
for (var Z0 = 0; Z0 < 10; Z0++) {
  var V0 = Z0.toString();
  (F = String.fromCharCode(55349, 57294 + Z0)),
    s(l, h, O, V0, F),
    s(A, h, b, V0, F),
    (F = String.fromCharCode(55349, 57314 + Z0)),
    s(l, h, O, V0, F),
    s(A, h, b, V0, F),
    (F = String.fromCharCode(55349, 57324 + Z0)),
    s(l, h, O, V0, F),
    s(A, h, b, V0, F),
    (F = String.fromCharCode(55349, 57334 + Z0)),
    s(l, h, O, V0, F),
    s(A, h, b, V0, F);
}
var Bt = "ÐÞþ";
for (var st = 0; st < Bt.length; st++) {
  var Be = Bt.charAt(st);
  s(l, h, O, Be, Be), s(A, h, b, Be, Be);
}
var Ce = [
    ["mathbf", "textbf", "Main-Bold"],
    ["mathbf", "textbf", "Main-Bold"],
    ["mathnormal", "textit", "Math-Italic"],
    ["mathnormal", "textit", "Math-Italic"],
    ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
    ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
    ["mathscr", "textscr", "Script-Regular"],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["mathfrak", "textfrak", "Fraktur-Regular"],
    ["mathfrak", "textfrak", "Fraktur-Regular"],
    ["mathbb", "textbb", "AMS-Regular"],
    ["mathbb", "textbb", "AMS-Regular"],
    ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
    ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
    ["mathsf", "textsf", "SansSerif-Regular"],
    ["mathsf", "textsf", "SansSerif-Regular"],
    ["mathboldsf", "textboldsf", "SansSerif-Bold"],
    ["mathboldsf", "textboldsf", "SansSerif-Bold"],
    ["mathitsf", "textitsf", "SansSerif-Italic"],
    ["mathitsf", "textitsf", "SansSerif-Italic"],
    ["", "", ""],
    ["", "", ""],
    ["mathtt", "texttt", "Typewriter-Regular"],
    ["mathtt", "texttt", "Typewriter-Regular"],
  ],
  br = [
    ["mathbf", "textbf", "Main-Bold"],
    ["", "", ""],
    ["mathsf", "textsf", "SansSerif-Regular"],
    ["mathboldsf", "textboldsf", "SansSerif-Bold"],
    ["mathtt", "texttt", "Typewriter-Regular"],
  ],
  En = function (e, t) {
    var a = e.charCodeAt(0),
      n = e.charCodeAt(1),
      i = (a - 55296) * 1024 + (n - 56320) + 65536,
      o = t === "math" ? 0 : 1;
    if (119808 <= i && i < 120484) {
      var u = Math.floor((i - 119808) / 26);
      return [Ce[u][2], Ce[u][o]];
    } else if (120782 <= i && i <= 120831) {
      var c = Math.floor((i - 120782) / 10);
      return [br[c][2], br[c][o]];
    } else {
      if (i === 120485 || i === 120486) return [Ce[0][2], Ce[0][o]];
      if (120486 < i && i < 120782) return ["", ""];
      throw new T("Unsupported character: " + e);
    }
  },
  We = function (e, t, a) {
    return (
      X[a][e] && X[a][e].replace && (e = X[a][e].replace),
      { value: e, metrics: Lt(e, t, a) }
    );
  },
  x0 = function (e, t, a, n, i) {
    var o = We(e, t, a),
      u = o.metrics;
    e = o.value;
    var c;
    if (u) {
      var d = u.italic;
      (a === "text" || (n && n.font === "mathit")) && (d = 0),
        (c = new b0(e, u.height, u.depth, d, u.skew, u.width, i));
    } else
      typeof console < "u" &&
        console.warn(
          "No character metrics " +
            ("for '" + e + "' in style '" + t + "' and mode '" + a + "'")
        ),
        (c = new b0(e, 0, 0, 0, 0, 0, i));
    if (n) {
      (c.maxFontSize = n.sizeMultiplier),
        n.style.isTight() && c.classes.push("mtight");
      var f = n.getColor();
      f && (c.style.color = f);
    }
    return c;
  },
  Rn = function (e, t, a, n) {
    return (
      n === void 0 && (n = []),
      a.font === "boldsymbol" && We(e, "Main-Bold", t).metrics
        ? x0(e, "Main-Bold", t, a, n.concat(["mathbf"]))
        : e === "\\" || X[t][e].font === "main"
        ? x0(e, "Main-Regular", t, a, n)
        : x0(e, "AMS-Regular", t, a, n.concat(["amsrm"]))
    );
  },
  In = function (e, t, a, n, i) {
    return i !== "textord" && We(e, "Math-BoldItalic", t).metrics
      ? { fontName: "Math-BoldItalic", fontClass: "boldsymbol" }
      : { fontName: "Main-Bold", fontClass: "mathbf" };
  },
  On = function (e, t, a) {
    var n = e.mode,
      i = e.text,
      o = ["mord"],
      u = n === "math" || (n === "text" && t.font),
      c = u ? t.font : t.fontFamily,
      d = "",
      f = "";
    if ((i.charCodeAt(0) === 55349 && ([d, f] = En(i, n)), d.length > 0))
      return x0(i, d, n, t, o.concat(f));
    if (c) {
      var g, x;
      if (c === "boldsymbol") {
        var y = In(i, n, t, o, a);
        (g = y.fontName), (x = [y.fontClass]);
      } else
        u
          ? ((g = sa[c].fontName), (x = [c]))
          : ((g = De(c, t.fontWeight, t.fontShape)),
            (x = [c, t.fontWeight, t.fontShape]));
      if (We(i, g, n).metrics) return x0(i, g, n, t, o.concat(x));
      if (aa.hasOwnProperty(i) && g.slice(0, 10) === "Typewriter") {
        for (var S = [], k = 0; k < i.length; k++)
          S.push(x0(i[k], g, n, t, o.concat(x)));
        return ia(S);
      }
    }
    if (a === "mathord")
      return x0(i, "Math-Italic", n, t, o.concat(["mathnormal"]));
    if (a === "textord") {
      var C = X[n][i] && X[n][i].font;
      if (C === "ams") {
        var B = De("amsrm", t.fontWeight, t.fontShape);
        return x0(i, B, n, t, o.concat("amsrm", t.fontWeight, t.fontShape));
      } else if (C === "main" || !C) {
        var R = De("textrm", t.fontWeight, t.fontShape);
        return x0(i, R, n, t, o.concat(t.fontWeight, t.fontShape));
      } else {
        var E = De(C, t.fontWeight, t.fontShape);
        return x0(i, E, n, t, o.concat(E, t.fontWeight, t.fontShape));
      }
    } else throw new Error("unexpected type: " + a + " in makeOrd");
  },
  qn = (r, e) => {
    if (
      Y0(r.classes) !== Y0(e.classes) ||
      r.skew !== e.skew ||
      r.maxFontSize !== e.maxFontSize
    )
      return !1;
    if (r.classes.length === 1) {
      var t = r.classes[0];
      if (t === "mbin" || t === "mord") return !1;
    }
    for (var a in r.style)
      if (r.style.hasOwnProperty(a) && r.style[a] !== e.style[a]) return !1;
    for (var n in e.style)
      if (e.style.hasOwnProperty(n) && r.style[n] !== e.style[n]) return !1;
    return !0;
  },
  Ln = (r) => {
    for (var e = 0; e < r.length - 1; e++) {
      var t = r[e],
        a = r[e + 1];
      t instanceof b0 &&
        a instanceof b0 &&
        qn(t, a) &&
        ((t.text += a.text),
        (t.height = Math.max(t.height, a.height)),
        (t.depth = Math.max(t.depth, a.depth)),
        (t.italic = a.italic),
        r.splice(e + 1, 1),
        e--);
    }
    return r;
  },
  Ht = function (e) {
    for (var t = 0, a = 0, n = 0, i = 0; i < e.children.length; i++) {
      var o = e.children[i];
      o.height > t && (t = o.height),
        o.depth > a && (a = o.depth),
        o.maxFontSize > n && (n = o.maxFontSize);
    }
    (e.height = t), (e.depth = a), (e.maxFontSize = n);
  },
  u0 = function (e, t, a, n) {
    var i = new ye(e, t, a, n);
    return Ht(i), i;
  },
  na = (r, e, t, a) => new ye(r, e, t, a),
  Fn = function (e, t, a) {
    var n = u0([e], [], t);
    return (
      (n.height = Math.max(
        a || t.fontMetrics().defaultRuleThickness,
        t.minRuleThickness
      )),
      (n.style.borderBottomWidth = z(n.height)),
      (n.maxFontSize = 1),
      n
    );
  },
  Hn = function (e, t, a, n) {
    var i = new Ft(e, t, a, n);
    return Ht(i), i;
  },
  ia = function (e) {
    var t = new be(e);
    return Ht(t), t;
  },
  Pn = function (e, t) {
    return e instanceof be ? u0([], [e], t) : e;
  },
  Un = function (e) {
    if (e.positionType === "individualShift") {
      for (
        var t = e.children,
          a = [t[0]],
          n = -t[0].shift - t[0].elem.depth,
          i = n,
          o = 1;
        o < t.length;
        o++
      ) {
        var u = -t[o].shift - i - t[o].elem.depth,
          c = u - (t[o - 1].elem.height + t[o - 1].elem.depth);
        (i = i + u), a.push({ type: "kern", size: c }), a.push(t[o]);
      }
      return { children: a, depth: n };
    }
    var d;
    if (e.positionType === "top") {
      for (var f = e.positionData, g = 0; g < e.children.length; g++) {
        var x = e.children[g];
        f -= x.type === "kern" ? x.size : x.elem.height + x.elem.depth;
      }
      d = f;
    } else if (e.positionType === "bottom") d = -e.positionData;
    else {
      var y = e.children[0];
      if (y.type !== "elem")
        throw new Error('First child must have type "elem".');
      if (e.positionType === "shift") d = -y.elem.depth - e.positionData;
      else if (e.positionType === "firstBaseline") d = -y.elem.depth;
      else throw new Error("Invalid positionType " + e.positionType + ".");
    }
    return { children: e.children, depth: d };
  },
  Gn = function (e, t) {
    for (
      var { children: a, depth: n } = Un(e), i = 0, o = 0;
      o < a.length;
      o++
    ) {
      var u = a[o];
      if (u.type === "elem") {
        var c = u.elem;
        i = Math.max(i, c.maxFontSize, c.height);
      }
    }
    i += 2;
    var d = u0(["pstrut"], []);
    d.style.height = z(i);
    for (var f = [], g = n, x = n, y = n, S = 0; S < a.length; S++) {
      var k = a[S];
      if (k.type === "kern") y += k.size;
      else {
        var C = k.elem,
          B = k.wrapperClasses || [],
          R = k.wrapperStyle || {},
          E = u0(B, [d, C], void 0, R);
        (E.style.top = z(-i - y - C.depth)),
          k.marginLeft && (E.style.marginLeft = k.marginLeft),
          k.marginRight && (E.style.marginRight = k.marginRight),
          f.push(E),
          (y += C.height + C.depth);
      }
      (g = Math.min(g, y)), (x = Math.max(x, y));
    }
    var P = u0(["vlist"], f);
    P.style.height = z(x);
    var L;
    if (g < 0) {
      var U = u0([], []),
        G = u0(["vlist"], [U]);
      G.style.height = z(-g);
      var W = u0(["vlist-s"], [new b0("​")]);
      L = [u0(["vlist-r"], [P, W]), u0(["vlist-r"], [G])];
    } else L = [u0(["vlist-r"], [P])];
    var Y = u0(["vlist-t"], L);
    return (
      L.length === 2 && Y.classes.push("vlist-t2"),
      (Y.height = x),
      (Y.depth = -g),
      Y
    );
  },
  Vn = (r, e) => {
    var t = u0(["mspace"], [], e),
      a = Z(r, e);
    return (t.style.marginRight = z(a)), t;
  },
  De = function (e, t, a) {
    var n = "";
    switch (e) {
      case "amsrm":
        n = "AMS";
        break;
      case "textrm":
        n = "Main";
        break;
      case "textsf":
        n = "SansSerif";
        break;
      case "texttt":
        n = "Typewriter";
        break;
      default:
        n = e;
    }
    var i;
    return (
      t === "textbf" && a === "textit"
        ? (i = "BoldItalic")
        : t === "textbf"
        ? (i = "Bold")
        : t === "textit"
        ? (i = "Italic")
        : (i = "Regular"),
      n + "-" + i
    );
  },
  sa = {
    mathbf: { variant: "bold", fontName: "Main-Bold" },
    mathrm: { variant: "normal", fontName: "Main-Regular" },
    textit: { variant: "italic", fontName: "Main-Italic" },
    mathit: { variant: "italic", fontName: "Main-Italic" },
    mathnormal: { variant: "italic", fontName: "Math-Italic" },
    mathsfit: { variant: "sans-serif-italic", fontName: "SansSerif-Italic" },
    mathbb: { variant: "double-struck", fontName: "AMS-Regular" },
    mathcal: { variant: "script", fontName: "Caligraphic-Regular" },
    mathfrak: { variant: "fraktur", fontName: "Fraktur-Regular" },
    mathscr: { variant: "script", fontName: "Script-Regular" },
    mathsf: { variant: "sans-serif", fontName: "SansSerif-Regular" },
    mathtt: { variant: "monospace", fontName: "Typewriter-Regular" },
  },
  la = {
    vec: ["vec", 0.471, 0.714],
    oiintSize1: ["oiintSize1", 0.957, 0.499],
    oiintSize2: ["oiintSize2", 1.472, 0.659],
    oiiintSize1: ["oiiintSize1", 1.304, 0.499],
    oiiintSize2: ["oiiintSize2", 1.98, 0.659],
  },
  Wn = function (e, t) {
    var [a, n, i] = la[e],
      o = new Q0(a),
      u = new O0([o], {
        width: z(n),
        height: z(i),
        style: "width:" + z(n),
        viewBox: "0 0 " + 1e3 * n + " " + 1e3 * i,
        preserveAspectRatio: "xMinYMin",
      }),
      c = na(["overlay"], [u], t);
    return (c.height = i), (c.style.height = z(i)), (c.style.width = z(n)), c;
  },
  w = {
    fontMap: sa,
    makeSymbol: x0,
    mathsym: Rn,
    makeSpan: u0,
    makeSvgSpan: na,
    makeLineSpan: Fn,
    makeAnchor: Hn,
    makeFragment: ia,
    wrapFragment: Pn,
    makeVList: Gn,
    makeOrd: On,
    makeGlue: Vn,
    staticSvg: Wn,
    svgData: la,
    tryCombineChars: Ln,
  },
  K = { number: 3, unit: "mu" },
  J0 = { number: 4, unit: "mu" },
  D0 = { number: 5, unit: "mu" },
  Yn = {
    mord: { mop: K, mbin: J0, mrel: D0, minner: K },
    mop: { mord: K, mop: K, mrel: D0, minner: K },
    mbin: { mord: J0, mop: J0, mopen: J0, minner: J0 },
    mrel: { mord: D0, mop: D0, mopen: D0, minner: D0 },
    mopen: {},
    mclose: { mop: K, mbin: J0, mrel: D0, minner: K },
    mpunct: {
      mord: K,
      mop: K,
      mrel: D0,
      mopen: K,
      mclose: K,
      mpunct: K,
      minner: K,
    },
    minner: {
      mord: K,
      mop: K,
      mbin: J0,
      mrel: D0,
      mopen: K,
      mpunct: K,
      minner: K,
    },
  },
  Qn = {
    mord: { mop: K },
    mop: { mord: K, mop: K },
    mbin: {},
    mrel: {},
    mopen: {},
    mclose: { mop: K },
    mpunct: {},
    minner: { mop: K },
  },
  oa = {},
  Pe = {},
  Ue = {};
function D(r) {
  for (
    var {
        type: e,
        names: t,
        props: a,
        handler: n,
        htmlBuilder: i,
        mathmlBuilder: o,
      } = r,
      u = {
        type: e,
        numArgs: a.numArgs,
        argTypes: a.argTypes,
        allowedInArgument: !!a.allowedInArgument,
        allowedInText: !!a.allowedInText,
        allowedInMath: a.allowedInMath === void 0 ? !0 : a.allowedInMath,
        numOptionalArgs: a.numOptionalArgs || 0,
        infix: !!a.infix,
        primitive: !!a.primitive,
        handler: n,
      },
      c = 0;
    c < t.length;
    ++c
  )
    oa[t[c]] = u;
  e && (i && (Pe[e] = i), o && (Ue[e] = o));
}
function _0(r) {
  var { type: e, htmlBuilder: t, mathmlBuilder: a } = r;
  D({
    type: e,
    names: [],
    props: { numArgs: 0 },
    handler() {
      throw new Error("Should never be called.");
    },
    htmlBuilder: t,
    mathmlBuilder: a,
  });
}
var Ge = function (e) {
    return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
  },
  $ = function (e) {
    return e.type === "ordgroup" ? e.body : [e];
  },
  q0 = w.makeSpan,
  Xn = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"],
  jn = ["rightmost", "mrel", "mclose", "mpunct"],
  Kn = {
    display: q.DISPLAY,
    text: q.TEXT,
    script: q.SCRIPT,
    scriptscript: q.SCRIPTSCRIPT,
  },
  Zn = {
    mord: "mord",
    mop: "mop",
    mbin: "mbin",
    mrel: "mrel",
    mopen: "mopen",
    mclose: "mclose",
    mpunct: "mpunct",
    minner: "minner",
  },
  t0 = function (e, t, a, n) {
    n === void 0 && (n = [null, null]);
    for (var i = [], o = 0; o < e.length; o++) {
      var u = V(e[o], t);
      if (u instanceof be) {
        var c = u.children;
        i.push(...c);
      } else i.push(u);
    }
    if ((w.tryCombineChars(i), !a)) return i;
    var d = t;
    if (e.length === 1) {
      var f = e[0];
      f.type === "sizing"
        ? (d = t.havingSize(f.size))
        : f.type === "styling" && (d = t.havingStyle(Kn[f.style]));
    }
    var g = q0([n[0] || "leftmost"], [], t),
      x = q0([n[1] || "rightmost"], [], t),
      y = a === "root";
    return (
      yr(
        i,
        (S, k) => {
          var C = k.classes[0],
            B = S.classes[0];
          C === "mbin" && I.contains(jn, B)
            ? (k.classes[0] = "mord")
            : B === "mbin" && I.contains(Xn, C) && (S.classes[0] = "mord");
        },
        { node: g },
        x,
        y
      ),
      yr(
        i,
        (S, k) => {
          var C = Ct(k),
            B = Ct(S),
            R = C && B ? (S.hasClass("mtight") ? Qn[C][B] : Yn[C][B]) : null;
          if (R) return w.makeGlue(R, d);
        },
        { node: g },
        x,
        y
      ),
      i
    );
  },
  yr = function r(e, t, a, n, i) {
    n && e.push(n);
    for (var o = 0; o < e.length; o++) {
      var u = e[o],
        c = ua(u);
      if (c) {
        r(c.children, t, a, null, i);
        continue;
      }
      var d = !u.hasClass("mspace");
      if (d) {
        var f = t(u, a.node);
        f && (a.insertAfter ? a.insertAfter(f) : (e.unshift(f), o++));
      }
      d
        ? (a.node = u)
        : i && u.hasClass("newline") && (a.node = q0(["leftmost"])),
        (a.insertAfter = ((g) => (x) => {
          e.splice(g + 1, 0, x), o++;
        })(o));
    }
    n && e.pop();
  },
  ua = function (e) {
    return e instanceof be ||
      e instanceof Ft ||
      (e instanceof ye && e.hasClass("enclosing"))
      ? e
      : null;
  },
  Jn = function r(e, t) {
    var a = ua(e);
    if (a) {
      var n = a.children;
      if (n.length) {
        if (t === "right") return r(n[n.length - 1], "right");
        if (t === "left") return r(n[0], "left");
      }
    }
    return e;
  },
  Ct = function (e, t) {
    return e ? (t && (e = Jn(e, t)), Zn[e.classes[0]] || null) : null;
  },
  ge = function (e, t) {
    var a = ["nulldelimiter"].concat(e.baseSizingClasses());
    return q0(t.concat(a));
  },
  V = function (e, t, a) {
    if (!e) return q0();
    if (Pe[e.type]) {
      var n = Pe[e.type](e, t);
      if (a && t.size !== a.size) {
        n = q0(t.sizingClasses(a), [n], t);
        var i = t.sizeMultiplier / a.sizeMultiplier;
        (n.height *= i), (n.depth *= i);
      }
      return n;
    } else throw new T("Got group of unknown type: '" + e.type + "'");
  };
function Ne(r, e) {
  var t = q0(["base"], r, e),
    a = q0(["strut"]);
  return (
    (a.style.height = z(t.height + t.depth)),
    t.depth && (a.style.verticalAlign = z(-t.depth)),
    t.children.unshift(a),
    t
  );
}
function Dt(r, e) {
  var t = null;
  r.length === 1 && r[0].type === "tag" && ((t = r[0].tag), (r = r[0].body));
  var a = t0(r, e, "root"),
    n;
  a.length === 2 && a[1].hasClass("tag") && (n = a.pop());
  for (var i = [], o = [], u = 0; u < a.length; u++)
    if (
      (o.push(a[u]),
      a[u].hasClass("mbin") ||
        a[u].hasClass("mrel") ||
        a[u].hasClass("allowbreak"))
    ) {
      for (
        var c = !1;
        u < a.length - 1 &&
        a[u + 1].hasClass("mspace") &&
        !a[u + 1].hasClass("newline");

      )
        u++, o.push(a[u]), a[u].hasClass("nobreak") && (c = !0);
      c || (i.push(Ne(o, e)), (o = []));
    } else
      a[u].hasClass("newline") &&
        (o.pop(), o.length > 0 && (i.push(Ne(o, e)), (o = [])), i.push(a[u]));
  o.length > 0 && i.push(Ne(o, e));
  var d;
  t
    ? ((d = Ne(t0(t, e, !0))), (d.classes = ["tag"]), i.push(d))
    : n && i.push(n);
  var f = q0(["katex-html"], i);
  if ((f.setAttribute("aria-hidden", "true"), d)) {
    var g = d.children[0];
    (g.style.height = z(f.height + f.depth)),
      f.depth && (g.style.verticalAlign = z(-f.depth));
  }
  return f;
}
function ha(r) {
  return new be(r);
}
class m0 {
  constructor(e, t, a) {
    (this.type = void 0),
      (this.attributes = void 0),
      (this.children = void 0),
      (this.classes = void 0),
      (this.type = e),
      (this.attributes = {}),
      (this.children = t || []),
      (this.classes = a || []);
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  toNode() {
    var e = document.createElementNS(
      "http://www.w3.org/1998/Math/MathML",
      this.type
    );
    for (var t in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, t) &&
        e.setAttribute(t, this.attributes[t]);
    this.classes.length > 0 && (e.className = Y0(this.classes));
    for (var a = 0; a < this.children.length; a++)
      if (
        this.children[a] instanceof M0 &&
        this.children[a + 1] instanceof M0
      ) {
        for (
          var n = this.children[a].toText() + this.children[++a].toText();
          this.children[a + 1] instanceof M0;

        )
          n += this.children[++a].toText();
        e.appendChild(new M0(n).toNode());
      } else e.appendChild(this.children[a].toNode());
    return e;
  }
  toMarkup() {
    var e = "<" + this.type;
    for (var t in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, t) &&
        ((e += " " + t + '="'),
        (e += I.escape(this.attributes[t])),
        (e += '"'));
    this.classes.length > 0 &&
      (e += ' class ="' + I.escape(Y0(this.classes)) + '"'),
      (e += ">");
    for (var a = 0; a < this.children.length; a++)
      e += this.children[a].toMarkup();
    return (e += "</" + this.type + ">"), e;
  }
  toText() {
    return this.children.map((e) => e.toText()).join("");
  }
}
class M0 {
  constructor(e) {
    (this.text = void 0), (this.text = e);
  }
  toNode() {
    return document.createTextNode(this.text);
  }
  toMarkup() {
    return I.escape(this.toText());
  }
  toText() {
    return this.text;
  }
}
class $n {
  constructor(e) {
    (this.width = void 0),
      (this.character = void 0),
      (this.width = e),
      e >= 0.05555 && e <= 0.05556
        ? (this.character = " ")
        : e >= 0.1666 && e <= 0.1667
        ? (this.character = " ")
        : e >= 0.2222 && e <= 0.2223
        ? (this.character = " ")
        : e >= 0.2777 && e <= 0.2778
        ? (this.character = "  ")
        : e >= -0.05556 && e <= -0.05555
        ? (this.character = " ⁣")
        : e >= -0.1667 && e <= -0.1666
        ? (this.character = " ⁣")
        : e >= -0.2223 && e <= -0.2222
        ? (this.character = " ⁣")
        : e >= -0.2778 && e <= -0.2777
        ? (this.character = " ⁣")
        : (this.character = null);
  }
  toNode() {
    if (this.character) return document.createTextNode(this.character);
    var e = document.createElementNS(
      "http://www.w3.org/1998/Math/MathML",
      "mspace"
    );
    return e.setAttribute("width", z(this.width)), e;
  }
  toMarkup() {
    return this.character
      ? "<mtext>" + this.character + "</mtext>"
      : '<mspace width="' + z(this.width) + '"/>';
  }
  toText() {
    return this.character ? this.character : " ";
  }
}
var M = { MathNode: m0, TextNode: M0, SpaceNode: $n, newDocumentFragment: ha },
  y0 = function (e, t, a) {
    return (
      X[t][e] &&
        X[t][e].replace &&
        e.charCodeAt(0) !== 55349 &&
        !(
          aa.hasOwnProperty(e) &&
          a &&
          ((a.fontFamily && a.fontFamily.slice(4, 6) === "tt") ||
            (a.font && a.font.slice(4, 6) === "tt"))
        ) &&
        (e = X[t][e].replace),
      new M.TextNode(e)
    );
  },
  Pt = function (e) {
    return e.length === 1 ? e[0] : new M.MathNode("mrow", e);
  },
  Ut = function (e, t) {
    if (t.fontFamily === "texttt") return "monospace";
    if (t.fontFamily === "textsf")
      return t.fontShape === "textit" && t.fontWeight === "textbf"
        ? "sans-serif-bold-italic"
        : t.fontShape === "textit"
        ? "sans-serif-italic"
        : t.fontWeight === "textbf"
        ? "bold-sans-serif"
        : "sans-serif";
    if (t.fontShape === "textit" && t.fontWeight === "textbf")
      return "bold-italic";
    if (t.fontShape === "textit") return "italic";
    if (t.fontWeight === "textbf") return "bold";
    var a = t.font;
    if (!a || a === "mathnormal") return null;
    var n = e.mode;
    if (a === "mathit") return "italic";
    if (a === "boldsymbol")
      return e.type === "textord" ? "bold" : "bold-italic";
    if (a === "mathbf") return "bold";
    if (a === "mathbb") return "double-struck";
    if (a === "mathsfit") return "sans-serif-italic";
    if (a === "mathfrak") return "fraktur";
    if (a === "mathscr" || a === "mathcal") return "script";
    if (a === "mathsf") return "sans-serif";
    if (a === "mathtt") return "monospace";
    var i = e.text;
    if (I.contains(["\\imath", "\\jmath"], i)) return null;
    X[n][i] && X[n][i].replace && (i = X[n][i].replace);
    var o = w.fontMap[a].fontName;
    return Lt(i, o, n) ? w.fontMap[a].variant : null;
  };
function lt(r) {
  if (!r) return !1;
  if (r.type === "mi" && r.children.length === 1) {
    var e = r.children[0];
    return e instanceof M0 && e.text === ".";
  } else if (
    r.type === "mo" &&
    r.children.length === 1 &&
    r.getAttribute("separator") === "true" &&
    r.getAttribute("lspace") === "0em" &&
    r.getAttribute("rspace") === "0em"
  ) {
    var t = r.children[0];
    return t instanceof M0 && t.text === ",";
  } else return !1;
}
var h0 = function (e, t, a) {
    if (e.length === 1) {
      var n = Q(e[0], t);
      return (
        a &&
          n instanceof m0 &&
          n.type === "mo" &&
          (n.setAttribute("lspace", "0em"), n.setAttribute("rspace", "0em")),
        [n]
      );
    }
    for (var i = [], o, u = 0; u < e.length; u++) {
      var c = Q(e[u], t);
      if (c instanceof m0 && o instanceof m0) {
        if (
          c.type === "mtext" &&
          o.type === "mtext" &&
          c.getAttribute("mathvariant") === o.getAttribute("mathvariant")
        ) {
          o.children.push(...c.children);
          continue;
        } else if (c.type === "mn" && o.type === "mn") {
          o.children.push(...c.children);
          continue;
        } else if (lt(c) && o.type === "mn") {
          o.children.push(...c.children);
          continue;
        } else if (c.type === "mn" && lt(o))
          (c.children = [...o.children, ...c.children]), i.pop();
        else if (
          (c.type === "msup" || c.type === "msub") &&
          c.children.length >= 1 &&
          (o.type === "mn" || lt(o))
        ) {
          var d = c.children[0];
          d instanceof m0 &&
            d.type === "mn" &&
            ((d.children = [...o.children, ...d.children]), i.pop());
        } else if (o.type === "mi" && o.children.length === 1) {
          var f = o.children[0];
          if (
            f instanceof M0 &&
            f.text === "̸" &&
            (c.type === "mo" || c.type === "mi" || c.type === "mn")
          ) {
            var g = c.children[0];
            g instanceof M0 &&
              g.text.length > 0 &&
              ((g.text = g.text.slice(0, 1) + "̸" + g.text.slice(1)), i.pop());
          }
        }
      }
      i.push(c), (o = c);
    }
    return i;
  },
  X0 = function (e, t, a) {
    return Pt(h0(e, t, a));
  },
  Q = function (e, t) {
    if (!e) return new M.MathNode("mrow");
    if (Ue[e.type]) {
      var a = Ue[e.type](e, t);
      return a;
    } else throw new T("Got group of unknown type: '" + e.type + "'");
  };
function wr(r, e, t, a, n) {
  var i = h0(r, t),
    o;
  i.length === 1 &&
  i[0] instanceof m0 &&
  I.contains(["mrow", "mtable"], i[0].type)
    ? (o = i[0])
    : (o = new M.MathNode("mrow", i));
  var u = new M.MathNode("annotation", [new M.TextNode(e)]);
  u.setAttribute("encoding", "application/x-tex");
  var c = new M.MathNode("semantics", [o, u]),
    d = new M.MathNode("math", [c]);
  d.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"),
    a && d.setAttribute("display", "block");
  var f = n ? "katex" : "katex-mathml";
  return w.makeSpan([f], [d]);
}
var ca = function (e) {
    return new N0({
      style: e.displayMode ? q.DISPLAY : q.TEXT,
      maxSize: e.maxSize,
      minRuleThickness: e.minRuleThickness,
    });
  },
  ma = function (e, t) {
    if (t.displayMode) {
      var a = ["katex-display"];
      t.leqno && a.push("leqno"),
        t.fleqn && a.push("fleqn"),
        (e = w.makeSpan(a, [e]));
    }
    return e;
  },
  _n = function (e, t, a) {
    var n = ca(a),
      i;
    if (a.output === "mathml") return wr(e, t, n, a.displayMode, !0);
    if (a.output === "html") {
      var o = Dt(e, n);
      i = w.makeSpan(["katex"], [o]);
    } else {
      var u = wr(e, t, n, a.displayMode, !1),
        c = Dt(e, n);
      i = w.makeSpan(["katex"], [u, c]);
    }
    return ma(i, a);
  },
  ei = function (e, t, a) {
    var n = ca(a),
      i = Dt(e, n),
      o = w.makeSpan(["katex"], [i]);
    return ma(o, a);
  },
  ti = {
    widehat: "^",
    widecheck: "ˇ",
    widetilde: "~",
    utilde: "~",
    overleftarrow: "←",
    underleftarrow: "←",
    xleftarrow: "←",
    overrightarrow: "→",
    underrightarrow: "→",
    xrightarrow: "→",
    underbrace: "⏟",
    overbrace: "⏞",
    overgroup: "⏠",
    undergroup: "⏡",
    overleftrightarrow: "↔",
    underleftrightarrow: "↔",
    xleftrightarrow: "↔",
    Overrightarrow: "⇒",
    xRightarrow: "⇒",
    overleftharpoon: "↼",
    xleftharpoonup: "↼",
    overrightharpoon: "⇀",
    xrightharpoonup: "⇀",
    xLeftarrow: "⇐",
    xLeftrightarrow: "⇔",
    xhookleftarrow: "↩",
    xhookrightarrow: "↪",
    xmapsto: "↦",
    xrightharpoondown: "⇁",
    xleftharpoondown: "↽",
    xrightleftharpoons: "⇌",
    xleftrightharpoons: "⇋",
    xtwoheadleftarrow: "↞",
    xtwoheadrightarrow: "↠",
    xlongequal: "=",
    xtofrom: "⇄",
    xrightleftarrows: "⇄",
    xrightequilibrium: "⇌",
    xleftequilibrium: "⇋",
    "\\cdrightarrow": "→",
    "\\cdleftarrow": "←",
    "\\cdlongequal": "=",
  },
  ri = function (e) {
    var t = new M.MathNode("mo", [new M.TextNode(ti[e.replace(/^\\/, "")])]);
    return t.setAttribute("stretchy", "true"), t;
  },
  ai = {
    overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
    overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
    underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
    underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
    xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
    "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
    xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
    "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
    Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
    xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
    xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
    overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
    xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
    xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
    overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
    xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
    xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
    xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
    "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
    xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
    xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
    overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
    overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
    underbrace: [
      ["leftbraceunder", "midbraceunder", "rightbraceunder"],
      1.6,
      548,
    ],
    underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
    xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
    xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
    xrightleftharpoons: [
      ["leftharpoondownplus", "rightharpoonplus"],
      1.75,
      716,
    ],
    xleftrightharpoons: [
      ["leftharpoonplus", "rightharpoondownplus"],
      1.75,
      716,
    ],
    xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
    xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
    overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
    underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
    overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
    undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
    xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
    xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
    xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
    xrightequilibrium: [
      ["baraboveshortleftharpoon", "rightharpoonaboveshortbar"],
      1.75,
      716,
    ],
    xleftequilibrium: [
      ["shortbaraboveleftharpoon", "shortrightharpoonabovebar"],
      1.75,
      716,
    ],
  },
  ni = function (e) {
    return e.type === "ordgroup" ? e.body.length : 1;
  },
  ii = function (e, t) {
    function a() {
      var u = 4e5,
        c = e.label.slice(1);
      if (I.contains(["widehat", "widecheck", "widetilde", "utilde"], c)) {
        var d = e,
          f = ni(d.base),
          g,
          x,
          y;
        if (f > 5)
          c === "widehat" || c === "widecheck"
            ? ((g = 420), (u = 2364), (y = 0.42), (x = c + "4"))
            : ((g = 312), (u = 2340), (y = 0.34), (x = "tilde4"));
        else {
          var S = [1, 1, 2, 2, 3, 3][f];
          c === "widehat" || c === "widecheck"
            ? ((u = [0, 1062, 2364, 2364, 2364][S]),
              (g = [0, 239, 300, 360, 420][S]),
              (y = [0, 0.24, 0.3, 0.3, 0.36, 0.42][S]),
              (x = c + S))
            : ((u = [0, 600, 1033, 2339, 2340][S]),
              (g = [0, 260, 286, 306, 312][S]),
              (y = [0, 0.26, 0.286, 0.3, 0.306, 0.34][S]),
              (x = "tilde" + S));
        }
        var k = new Q0(x),
          C = new O0([k], {
            width: "100%",
            height: z(y),
            viewBox: "0 0 " + u + " " + g,
            preserveAspectRatio: "none",
          });
        return { span: w.makeSvgSpan([], [C], t), minWidth: 0, height: y };
      } else {
        var B = [],
          R = ai[c],
          [E, P, L] = R,
          U = L / 1e3,
          G = E.length,
          W,
          Y;
        if (G === 1) {
          var C0 = R[3];
          (W = ["hide-tail"]), (Y = [C0]);
        } else if (G === 2)
          (W = ["halfarrow-left", "halfarrow-right"]),
            (Y = ["xMinYMin", "xMaxYMin"]);
        else if (G === 3)
          (W = ["brace-left", "brace-center", "brace-right"]),
            (Y = ["xMinYMin", "xMidYMin", "xMaxYMin"]);
        else
          throw new Error(
            `Correct katexImagesData or update code here to support
                    ` +
              G +
              " children."
          );
        for (var a0 = 0; a0 < G; a0++) {
          var e0 = new Q0(E[a0]),
            K0 = new O0([e0], {
              width: "400em",
              height: z(U),
              viewBox: "0 0 " + u + " " + L,
              preserveAspectRatio: Y[a0] + " slice",
            }),
            o0 = w.makeSvgSpan([W[a0]], [K0], t);
          if (G === 1) return { span: o0, minWidth: P, height: U };
          (o0.style.height = z(U)), B.push(o0);
        }
        return { span: w.makeSpan(["stretchy"], B, t), minWidth: P, height: U };
      }
    }
    var { span: n, minWidth: i, height: o } = a();
    return (
      (n.height = o),
      (n.style.height = z(o)),
      i > 0 && (n.style.minWidth = z(i)),
      n
    );
  },
  si = function (e, t, a, n, i) {
    var o,
      u = e.height + e.depth + a + n;
    if (/fbox|color|angl/.test(t)) {
      if (((o = w.makeSpan(["stretchy", t], [], i)), t === "fbox")) {
        var c = i.color && i.getColor();
        c && (o.style.borderColor = c);
      }
    } else {
      var d = [];
      /^[bx]cancel$/.test(t) &&
        d.push(
          new zt({
            x1: "0",
            y1: "0",
            x2: "100%",
            y2: "100%",
            "stroke-width": "0.046em",
          })
        ),
        /^x?cancel$/.test(t) &&
          d.push(
            new zt({
              x1: "0",
              y1: "100%",
              x2: "100%",
              y2: "0",
              "stroke-width": "0.046em",
            })
          );
      var f = new O0(d, { width: "100%", height: z(u) });
      o = w.makeSvgSpan([], [f], i);
    }
    return (o.height = u), (o.style.height = z(u)), o;
  },
  L0 = { encloseSpan: si, mathMLnode: ri, svgSpan: ii };
function H(r, e) {
  if (!r || r.type !== e)
    throw new Error(
      "Expected node of type " +
        e +
        ", but got " +
        (r ? "node of type " + r.type : String(r))
    );
  return r;
}
function Gt(r) {
  var e = Ye(r);
  if (!e)
    throw new Error(
      "Expected node of symbol group type, but got " +
        (r ? "node of type " + r.type : String(r))
    );
  return e;
}
function Ye(r) {
  return r && (r.type === "atom" || Nn.hasOwnProperty(r.type)) ? r : null;
}
var Vt = (r, e) => {
    var t, a, n;
    r && r.type === "supsub"
      ? ((a = H(r.base, "accent")),
        (t = a.base),
        (r.base = t),
        (n = Cn(V(r, e))),
        (r.base = a))
      : ((a = H(r, "accent")), (t = a.base));
    var i = V(t, e.havingCrampedStyle()),
      o = a.isShifty && I.isCharacterBox(t),
      u = 0;
    if (o) {
      var c = I.getBaseElem(t),
        d = V(c, e.havingCrampedStyle());
      u = dr(d).skew;
    }
    var f = a.label === "\\c",
      g = f ? i.height + i.depth : Math.min(i.height, e.fontMetrics().xHeight),
      x;
    if (a.isStretchy)
      (x = L0.svgSpan(a, e)),
        (x = w.makeVList(
          {
            positionType: "firstBaseline",
            children: [
              { type: "elem", elem: i },
              {
                type: "elem",
                elem: x,
                wrapperClasses: ["svg-align"],
                wrapperStyle:
                  u > 0
                    ? {
                        width: "calc(100% - " + z(2 * u) + ")",
                        marginLeft: z(2 * u),
                      }
                    : void 0,
              },
            ],
          },
          e
        ));
    else {
      var y, S;
      a.label === "\\vec"
        ? ((y = w.staticSvg("vec", e)), (S = w.svgData.vec[1]))
        : ((y = w.makeOrd({ mode: a.mode, text: a.label }, e, "textord")),
          (y = dr(y)),
          (y.italic = 0),
          (S = y.width),
          f && (g += y.depth)),
        (x = w.makeSpan(["accent-body"], [y]));
      var k = a.label === "\\textcircled";
      k && (x.classes.push("accent-full"), (g = i.height));
      var C = u;
      k || (C -= S / 2),
        (x.style.left = z(C)),
        a.label === "\\textcircled" && (x.style.top = ".2em"),
        (x = w.makeVList(
          {
            positionType: "firstBaseline",
            children: [
              { type: "elem", elem: i },
              { type: "kern", size: -g },
              { type: "elem", elem: x },
            ],
          },
          e
        ));
    }
    var B = w.makeSpan(["mord", "accent"], [x], e);
    return n
      ? ((n.children[0] = B),
        (n.height = Math.max(B.height, n.height)),
        (n.classes[0] = "mord"),
        n)
      : B;
  },
  da = (r, e) => {
    var t = r.isStretchy
        ? L0.mathMLnode(r.label)
        : new M.MathNode("mo", [y0(r.label, r.mode)]),
      a = new M.MathNode("mover", [Q(r.base, e), t]);
    return a.setAttribute("accent", "true"), a;
  },
  li = new RegExp(
    [
      "\\acute",
      "\\grave",
      "\\ddot",
      "\\tilde",
      "\\bar",
      "\\breve",
      "\\check",
      "\\hat",
      "\\vec",
      "\\dot",
      "\\mathring",
    ]
      .map((r) => "\\" + r)
      .join("|")
  );
D({
  type: "accent",
  names: [
    "\\acute",
    "\\grave",
    "\\ddot",
    "\\tilde",
    "\\bar",
    "\\breve",
    "\\check",
    "\\hat",
    "\\vec",
    "\\dot",
    "\\mathring",
    "\\widecheck",
    "\\widehat",
    "\\widetilde",
    "\\overrightarrow",
    "\\overleftarrow",
    "\\Overrightarrow",
    "\\overleftrightarrow",
    "\\overgroup",
    "\\overlinesegment",
    "\\overleftharpoon",
    "\\overrightharpoon",
  ],
  props: { numArgs: 1 },
  handler: (r, e) => {
    var t = Ge(e[0]),
      a = !li.test(r.funcName),
      n =
        !a ||
        r.funcName === "\\widehat" ||
        r.funcName === "\\widetilde" ||
        r.funcName === "\\widecheck";
    return {
      type: "accent",
      mode: r.parser.mode,
      label: r.funcName,
      isStretchy: a,
      isShifty: n,
      base: t,
    };
  },
  htmlBuilder: Vt,
  mathmlBuilder: da,
});
D({
  type: "accent",
  names: [
    "\\'",
    "\\`",
    "\\^",
    "\\~",
    "\\=",
    "\\u",
    "\\.",
    '\\"',
    "\\c",
    "\\r",
    "\\H",
    "\\v",
    "\\textcircled",
  ],
  props: {
    numArgs: 1,
    allowedInText: !0,
    allowedInMath: !0,
    argTypes: ["primitive"],
  },
  handler: (r, e) => {
    var t = e[0],
      a = r.parser.mode;
    return (
      a === "math" &&
        (r.parser.settings.reportNonstrict(
          "mathVsTextAccents",
          "LaTeX's accent " + r.funcName + " works only in text mode"
        ),
        (a = "text")),
      {
        type: "accent",
        mode: a,
        label: r.funcName,
        isStretchy: !1,
        isShifty: !0,
        base: t,
      }
    );
  },
  htmlBuilder: Vt,
  mathmlBuilder: da,
});
D({
  type: "accentUnder",
  names: [
    "\\underleftarrow",
    "\\underrightarrow",
    "\\underleftrightarrow",
    "\\undergroup",
    "\\underlinesegment",
    "\\utilde",
  ],
  props: { numArgs: 1 },
  handler: (r, e) => {
    var { parser: t, funcName: a } = r,
      n = e[0];
    return { type: "accentUnder", mode: t.mode, label: a, base: n };
  },
  htmlBuilder: (r, e) => {
    var t = V(r.base, e),
      a = L0.svgSpan(r, e),
      n = r.label === "\\utilde" ? 0.12 : 0,
      i = w.makeVList(
        {
          positionType: "top",
          positionData: t.height,
          children: [
            { type: "elem", elem: a, wrapperClasses: ["svg-align"] },
            { type: "kern", size: n },
            { type: "elem", elem: t },
          ],
        },
        e
      );
    return w.makeSpan(["mord", "accentunder"], [i], e);
  },
  mathmlBuilder: (r, e) => {
    var t = L0.mathMLnode(r.label),
      a = new M.MathNode("munder", [Q(r.base, e), t]);
    return a.setAttribute("accentunder", "true"), a;
  },
});
var Ee = (r) => {
  var e = new M.MathNode("mpadded", r ? [r] : []);
  return (
    e.setAttribute("width", "+0.6em"), e.setAttribute("lspace", "0.3em"), e
  );
};
D({
  type: "xArrow",
  names: [
    "\\xleftarrow",
    "\\xrightarrow",
    "\\xLeftarrow",
    "\\xRightarrow",
    "\\xleftrightarrow",
    "\\xLeftrightarrow",
    "\\xhookleftarrow",
    "\\xhookrightarrow",
    "\\xmapsto",
    "\\xrightharpoondown",
    "\\xrightharpoonup",
    "\\xleftharpoondown",
    "\\xleftharpoonup",
    "\\xrightleftharpoons",
    "\\xleftrightharpoons",
    "\\xlongequal",
    "\\xtwoheadrightarrow",
    "\\xtwoheadleftarrow",
    "\\xtofrom",
    "\\xrightleftarrows",
    "\\xrightequilibrium",
    "\\xleftequilibrium",
    "\\\\cdrightarrow",
    "\\\\cdleftarrow",
    "\\\\cdlongequal",
  ],
  props: { numArgs: 1, numOptionalArgs: 1 },
  handler(r, e, t) {
    var { parser: a, funcName: n } = r;
    return { type: "xArrow", mode: a.mode, label: n, body: e[0], below: t[0] };
  },
  htmlBuilder(r, e) {
    var t = e.style,
      a = e.havingStyle(t.sup()),
      n = w.wrapFragment(V(r.body, a, e), e),
      i = r.label.slice(0, 2) === "\\x" ? "x" : "cd";
    n.classes.push(i + "-arrow-pad");
    var o;
    r.below &&
      ((a = e.havingStyle(t.sub())),
      (o = w.wrapFragment(V(r.below, a, e), e)),
      o.classes.push(i + "-arrow-pad"));
    var u = L0.svgSpan(r, e),
      c = -e.fontMetrics().axisHeight + 0.5 * u.height,
      d = -e.fontMetrics().axisHeight - 0.5 * u.height - 0.111;
    (n.depth > 0.25 || r.label === "\\xleftequilibrium") && (d -= n.depth);
    var f;
    if (o) {
      var g = -e.fontMetrics().axisHeight + o.height + 0.5 * u.height + 0.111;
      f = w.makeVList(
        {
          positionType: "individualShift",
          children: [
            { type: "elem", elem: n, shift: d },
            { type: "elem", elem: u, shift: c },
            { type: "elem", elem: o, shift: g },
          ],
        },
        e
      );
    } else
      f = w.makeVList(
        {
          positionType: "individualShift",
          children: [
            { type: "elem", elem: n, shift: d },
            { type: "elem", elem: u, shift: c },
          ],
        },
        e
      );
    return (
      f.children[0].children[0].children[1].classes.push("svg-align"),
      w.makeSpan(["mrel", "x-arrow"], [f], e)
    );
  },
  mathmlBuilder(r, e) {
    var t = L0.mathMLnode(r.label);
    t.setAttribute("minsize", r.label.charAt(0) === "x" ? "1.75em" : "3.0em");
    var a;
    if (r.body) {
      var n = Ee(Q(r.body, e));
      if (r.below) {
        var i = Ee(Q(r.below, e));
        a = new M.MathNode("munderover", [t, i, n]);
      } else a = new M.MathNode("mover", [t, n]);
    } else if (r.below) {
      var o = Ee(Q(r.below, e));
      a = new M.MathNode("munder", [t, o]);
    } else (a = Ee()), (a = new M.MathNode("mover", [t, a]));
    return a;
  },
});
var oi = w.makeSpan;
function fa(r, e) {
  var t = t0(r.body, e, !0);
  return oi([r.mclass], t, e);
}
function pa(r, e) {
  var t,
    a = h0(r.body, e);
  return (
    r.mclass === "minner"
      ? (t = new M.MathNode("mpadded", a))
      : r.mclass === "mord"
      ? r.isCharacterBox
        ? ((t = a[0]), (t.type = "mi"))
        : (t = new M.MathNode("mi", a))
      : (r.isCharacterBox
          ? ((t = a[0]), (t.type = "mo"))
          : (t = new M.MathNode("mo", a)),
        r.mclass === "mbin"
          ? ((t.attributes.lspace = "0.22em"), (t.attributes.rspace = "0.22em"))
          : r.mclass === "mpunct"
          ? ((t.attributes.lspace = "0em"), (t.attributes.rspace = "0.17em"))
          : r.mclass === "mopen" || r.mclass === "mclose"
          ? ((t.attributes.lspace = "0em"), (t.attributes.rspace = "0em"))
          : r.mclass === "minner" &&
            ((t.attributes.lspace = "0.0556em"),
            (t.attributes.width = "+0.1111em"))),
    t
  );
}
D({
  type: "mclass",
  names: [
    "\\mathord",
    "\\mathbin",
    "\\mathrel",
    "\\mathopen",
    "\\mathclose",
    "\\mathpunct",
    "\\mathinner",
  ],
  props: { numArgs: 1, primitive: !0 },
  handler(r, e) {
    var { parser: t, funcName: a } = r,
      n = e[0];
    return {
      type: "mclass",
      mode: t.mode,
      mclass: "m" + a.slice(5),
      body: $(n),
      isCharacterBox: I.isCharacterBox(n),
    };
  },
  htmlBuilder: fa,
  mathmlBuilder: pa,
});
var Qe = (r) => {
  var e = r.type === "ordgroup" && r.body.length ? r.body[0] : r;
  return e.type === "atom" && (e.family === "bin" || e.family === "rel")
    ? "m" + e.family
    : "mord";
};
D({
  type: "mclass",
  names: ["\\@binrel"],
  props: { numArgs: 2 },
  handler(r, e) {
    var { parser: t } = r;
    return {
      type: "mclass",
      mode: t.mode,
      mclass: Qe(e[0]),
      body: $(e[1]),
      isCharacterBox: I.isCharacterBox(e[1]),
    };
  },
});
D({
  type: "mclass",
  names: ["\\stackrel", "\\overset", "\\underset"],
  props: { numArgs: 2 },
  handler(r, e) {
    var { parser: t, funcName: a } = r,
      n = e[1],
      i = e[0],
      o;
    a !== "\\stackrel" ? (o = Qe(n)) : (o = "mrel");
    var u = {
        type: "op",
        mode: n.mode,
        limits: !0,
        alwaysHandleSupSub: !0,
        parentIsSupSub: !1,
        symbol: !1,
        suppressBaseShift: a !== "\\stackrel",
        body: $(n),
      },
      c = {
        type: "supsub",
        mode: i.mode,
        base: u,
        sup: a === "\\underset" ? null : i,
        sub: a === "\\underset" ? i : null,
      };
    return {
      type: "mclass",
      mode: t.mode,
      mclass: o,
      body: [c],
      isCharacterBox: I.isCharacterBox(c),
    };
  },
  htmlBuilder: fa,
  mathmlBuilder: pa,
});
D({
  type: "pmb",
  names: ["\\pmb"],
  props: { numArgs: 1, allowedInText: !0 },
  handler(r, e) {
    var { parser: t } = r;
    return { type: "pmb", mode: t.mode, mclass: Qe(e[0]), body: $(e[0]) };
  },
  htmlBuilder(r, e) {
    var t = t0(r.body, e, !0),
      a = w.makeSpan([r.mclass], t, e);
    return (a.style.textShadow = "0.02em 0.01em 0.04px"), a;
  },
  mathmlBuilder(r, e) {
    var t = h0(r.body, e),
      a = new M.MathNode("mstyle", t);
    return a.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), a;
  },
});
var ui = {
    ">": "\\\\cdrightarrow",
    "<": "\\\\cdleftarrow",
    "=": "\\\\cdlongequal",
    A: "\\uparrow",
    V: "\\downarrow",
    "|": "\\Vert",
    ".": "no arrow",
  },
  xr = () => ({ type: "styling", body: [], mode: "math", style: "display" }),
  Ar = (r) => r.type === "textord" && r.text === "@",
  hi = (r, e) => (r.type === "mathord" || r.type === "atom") && r.text === e;
function ci(r, e, t) {
  var a = ui[r];
  switch (a) {
    case "\\\\cdrightarrow":
    case "\\\\cdleftarrow":
      return t.callFunction(a, [e[0]], [e[1]]);
    case "\\uparrow":
    case "\\downarrow": {
      var n = t.callFunction("\\\\cdleft", [e[0]], []),
        i = { type: "atom", text: a, mode: "math", family: "rel" },
        o = t.callFunction("\\Big", [i], []),
        u = t.callFunction("\\\\cdright", [e[1]], []),
        c = { type: "ordgroup", mode: "math", body: [n, o, u] };
      return t.callFunction("\\\\cdparent", [c], []);
    }
    case "\\\\cdlongequal":
      return t.callFunction("\\\\cdlongequal", [], []);
    case "\\Vert": {
      var d = { type: "textord", text: "\\Vert", mode: "math" };
      return t.callFunction("\\Big", [d], []);
    }
    default:
      return { type: "textord", text: " ", mode: "math" };
  }
}
function mi(r) {
  var e = [];
  for (
    r.gullet.beginGroup(),
      r.gullet.macros.set("\\cr", "\\\\\\relax"),
      r.gullet.beginGroup();
    ;

  ) {
    e.push(r.parseExpression(!1, "\\\\")),
      r.gullet.endGroup(),
      r.gullet.beginGroup();
    var t = r.fetch().text;
    if (t === "&" || t === "\\\\") r.consume();
    else if (t === "\\end") {
      e[e.length - 1].length === 0 && e.pop();
      break;
    } else throw new T("Expected \\\\ or \\cr or \\end", r.nextToken);
  }
  for (var a = [], n = [a], i = 0; i < e.length; i++) {
    for (var o = e[i], u = xr(), c = 0; c < o.length; c++)
      if (!Ar(o[c])) u.body.push(o[c]);
      else {
        a.push(u), (c += 1);
        var d = Gt(o[c]).text,
          f = new Array(2);
        if (
          ((f[0] = { type: "ordgroup", mode: "math", body: [] }),
          (f[1] = { type: "ordgroup", mode: "math", body: [] }),
          !("=|.".indexOf(d) > -1))
        )
          if ("<>AV".indexOf(d) > -1)
            for (var g = 0; g < 2; g++) {
              for (var x = !0, y = c + 1; y < o.length; y++) {
                if (hi(o[y], d)) {
                  (x = !1), (c = y);
                  break;
                }
                if (Ar(o[y]))
                  throw new T(
                    "Missing a " + d + " character to complete a CD arrow.",
                    o[y]
                  );
                f[g].body.push(o[y]);
              }
              if (x)
                throw new T(
                  "Missing a " + d + " character to complete a CD arrow.",
                  o[c]
                );
            }
          else throw new T('Expected one of "<>AV=|." after @', o[c]);
        var S = ci(d, f, r),
          k = { type: "styling", body: [S], mode: "math", style: "display" };
        a.push(k), (u = xr());
      }
    i % 2 === 0 ? a.push(u) : a.shift(), (a = []), n.push(a);
  }
  r.gullet.endGroup(), r.gullet.endGroup();
  var C = new Array(n[0].length).fill({
    type: "align",
    align: "c",
    pregap: 0.25,
    postgap: 0.25,
  });
  return {
    type: "array",
    mode: "math",
    body: n,
    arraystretch: 1,
    addJot: !0,
    rowGaps: [null],
    cols: C,
    colSeparationType: "CD",
    hLinesBeforeRow: new Array(n.length + 1).fill([]),
  };
}
D({
  type: "cdlabel",
  names: ["\\\\cdleft", "\\\\cdright"],
  props: { numArgs: 1 },
  handler(r, e) {
    var { parser: t, funcName: a } = r;
    return { type: "cdlabel", mode: t.mode, side: a.slice(4), label: e[0] };
  },
  htmlBuilder(r, e) {
    var t = e.havingStyle(e.style.sup()),
      a = w.wrapFragment(V(r.label, t, e), e);
    return (
      a.classes.push("cd-label-" + r.side),
      (a.style.bottom = z(0.8 - a.depth)),
      (a.height = 0),
      (a.depth = 0),
      a
    );
  },
  mathmlBuilder(r, e) {
    var t = new M.MathNode("mrow", [Q(r.label, e)]);
    return (
      (t = new M.MathNode("mpadded", [t])),
      t.setAttribute("width", "0"),
      r.side === "left" && t.setAttribute("lspace", "-1width"),
      t.setAttribute("voffset", "0.7em"),
      (t = new M.MathNode("mstyle", [t])),
      t.setAttribute("displaystyle", "false"),
      t.setAttribute("scriptlevel", "1"),
      t
    );
  },
});
D({
  type: "cdlabelparent",
  names: ["\\\\cdparent"],
  props: { numArgs: 1 },
  handler(r, e) {
    var { parser: t } = r;
    return { type: "cdlabelparent", mode: t.mode, fragment: e[0] };
  },
  htmlBuilder(r, e) {
    var t = w.wrapFragment(V(r.fragment, e), e);
    return t.classes.push("cd-vert-arrow"), t;
  },
  mathmlBuilder(r, e) {
    return new M.MathNode("mrow", [Q(r.fragment, e)]);
  },
});
D({
  type: "textord",
  names: ["\\@char"],
  props: { numArgs: 1, allowedInText: !0 },
  handler(r, e) {
    for (
      var { parser: t } = r, a = H(e[0], "ordgroup"), n = a.body, i = "", o = 0;
      o < n.length;
      o++
    ) {
      var u = H(n[o], "textord");
      i += u.text;
    }
    var c = parseInt(i),
      d;
    if (isNaN(c)) throw new T("\\@char has non-numeric argument " + i);
    if (c < 0 || c >= 1114111)
      throw new T("\\@char with invalid code point " + i);
    return (
      c <= 65535
        ? (d = String.fromCharCode(c))
        : ((c -= 65536),
          (d = String.fromCharCode((c >> 10) + 55296, (c & 1023) + 56320))),
      { type: "textord", mode: t.mode, text: d }
    );
  },
});
var va = (r, e) => {
    var t = t0(r.body, e.withColor(r.color), !1);
    return w.makeFragment(t);
  },
  ga = (r, e) => {
    var t = h0(r.body, e.withColor(r.color)),
      a = new M.MathNode("mstyle", t);
    return a.setAttribute("mathcolor", r.color), a;
  };
D({
  type: "color",
  names: ["\\textcolor"],
  props: { numArgs: 2, allowedInText: !0, argTypes: ["color", "original"] },
  handler(r, e) {
    var { parser: t } = r,
      a = H(e[0], "color-token").color,
      n = e[1];
    return { type: "color", mode: t.mode, color: a, body: $(n) };
  },
  htmlBuilder: va,
  mathmlBuilder: ga,
});
D({
  type: "color",
  names: ["\\color"],
  props: { numArgs: 1, allowedInText: !0, argTypes: ["color"] },
  handler(r, e) {
    var { parser: t, breakOnTokenText: a } = r,
      n = H(e[0], "color-token").color;
    t.gullet.macros.set("\\current@color", n);
    var i = t.parseExpression(!0, a);
    return { type: "color", mode: t.mode, color: n, body: i };
  },
  htmlBuilder: va,
  mathmlBuilder: ga,
});
D({
  type: "cr",
  names: ["\\\\"],
  props: { numArgs: 0, numOptionalArgs: 0, allowedInText: !0 },
  handler(r, e, t) {
    var { parser: a } = r,
      n = a.gullet.future().text === "[" ? a.parseSizeGroup(!0) : null,
      i =
        !a.settings.displayMode ||
        !a.settings.useStrictBehavior(
          "newLineInDisplayMode",
          "In LaTeX, \\\\ or \\newline does nothing in display mode"
        );
    return {
      type: "cr",
      mode: a.mode,
      newLine: i,
      size: n && H(n, "size").value,
    };
  },
  htmlBuilder(r, e) {
    var t = w.makeSpan(["mspace"], [], e);
    return (
      r.newLine &&
        (t.classes.push("newline"),
        r.size && (t.style.marginTop = z(Z(r.size, e)))),
      t
    );
  },
  mathmlBuilder(r, e) {
    var t = new M.MathNode("mspace");
    return (
      r.newLine &&
        (t.setAttribute("linebreak", "newline"),
        r.size && t.setAttribute("height", z(Z(r.size, e)))),
      t
    );
  },
});
var Nt = {
    "\\global": "\\global",
    "\\long": "\\\\globallong",
    "\\\\globallong": "\\\\globallong",
    "\\def": "\\gdef",
    "\\gdef": "\\gdef",
    "\\edef": "\\xdef",
    "\\xdef": "\\xdef",
    "\\let": "\\\\globallet",
    "\\futurelet": "\\\\globalfuture",
  },
  ba = (r) => {
    var e = r.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(e))
      throw new T("Expected a control sequence", r);
    return e;
  },
  di = (r) => {
    var e = r.gullet.popToken();
    return (
      e.text === "=" &&
        ((e = r.gullet.popToken()),
        e.text === " " && (e = r.gullet.popToken())),
      e
    );
  },
  ya = (r, e, t, a) => {
    var n = r.gullet.macros.get(t.text);
    n == null &&
      ((t.noexpand = !0),
      (n = {
        tokens: [t],
        numArgs: 0,
        unexpandable: !r.gullet.isExpandable(t.text),
      })),
      r.gullet.macros.set(e, n, a);
  };
D({
  type: "internal",
  names: ["\\global", "\\long", "\\\\globallong"],
  props: { numArgs: 0, allowedInText: !0 },
  handler(r) {
    var { parser: e, funcName: t } = r;
    e.consumeSpaces();
    var a = e.fetch();
    if (Nt[a.text])
      return (
        (t === "\\global" || t === "\\\\globallong") && (a.text = Nt[a.text]),
        H(e.parseFunction(), "internal")
      );
    throw new T("Invalid token after macro prefix", a);
  },
});
D({
  type: "internal",
  names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
  props: { numArgs: 0, allowedInText: !0, primitive: !0 },
  handler(r) {
    var { parser: e, funcName: t } = r,
      a = e.gullet.popToken(),
      n = a.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(n))
      throw new T("Expected a control sequence", a);
    for (var i = 0, o, u = [[]]; e.gullet.future().text !== "{"; )
      if (((a = e.gullet.popToken()), a.text === "#")) {
        if (e.gullet.future().text === "{") {
          (o = e.gullet.future()), u[i].push("{");
          break;
        }
        if (((a = e.gullet.popToken()), !/^[1-9]$/.test(a.text)))
          throw new T('Invalid argument number "' + a.text + '"');
        if (parseInt(a.text) !== i + 1)
          throw new T('Argument number "' + a.text + '" out of order');
        i++, u.push([]);
      } else {
        if (a.text === "EOF") throw new T("Expected a macro definition");
        u[i].push(a.text);
      }
    var { tokens: c } = e.gullet.consumeArg();
    return (
      o && c.unshift(o),
      (t === "\\edef" || t === "\\xdef") &&
        ((c = e.gullet.expandTokens(c)), c.reverse()),
      e.gullet.macros.set(
        n,
        { tokens: c, numArgs: i, delimiters: u },
        t === Nt[t]
      ),
      { type: "internal", mode: e.mode }
    );
  },
});
D({
  type: "internal",
  names: ["\\let", "\\\\globallet"],
  props: { numArgs: 0, allowedInText: !0, primitive: !0 },
  handler(r) {
    var { parser: e, funcName: t } = r,
      a = ba(e.gullet.popToken());
    e.gullet.consumeSpaces();
    var n = di(e);
    return (
      ya(e, a, n, t === "\\\\globallet"), { type: "internal", mode: e.mode }
    );
  },
});
D({
  type: "internal",
  names: ["\\futurelet", "\\\\globalfuture"],
  props: { numArgs: 0, allowedInText: !0, primitive: !0 },
  handler(r) {
    var { parser: e, funcName: t } = r,
      a = ba(e.gullet.popToken()),
      n = e.gullet.popToken(),
      i = e.gullet.popToken();
    return (
      ya(e, a, i, t === "\\\\globalfuture"),
      e.gullet.pushToken(i),
      e.gullet.pushToken(n),
      { type: "internal", mode: e.mode }
    );
  },
});
var fe = function (e, t, a) {
    var n = X.math[e] && X.math[e].replace,
      i = Lt(n || e, t, a);
    if (!i)
      throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
    return i;
  },
  Wt = function (e, t, a, n) {
    var i = a.havingBaseStyle(t),
      o = w.makeSpan(n.concat(i.sizingClasses(a)), [e], a),
      u = i.sizeMultiplier / a.sizeMultiplier;
    return (
      (o.height *= u), (o.depth *= u), (o.maxFontSize = i.sizeMultiplier), o
    );
  },
  wa = function (e, t, a) {
    var n = t.havingBaseStyle(a),
      i =
        (1 - t.sizeMultiplier / n.sizeMultiplier) * t.fontMetrics().axisHeight;
    e.classes.push("delimcenter"),
      (e.style.top = z(i)),
      (e.height -= i),
      (e.depth += i);
  },
  fi = function (e, t, a, n, i, o) {
    var u = w.makeSymbol(e, "Main-Regular", i, n),
      c = Wt(u, t, n, o);
    return a && wa(c, n, t), c;
  },
  pi = function (e, t, a, n) {
    return w.makeSymbol(e, "Size" + t + "-Regular", a, n);
  },
  xa = function (e, t, a, n, i, o) {
    var u = pi(e, t, i, n),
      c = Wt(w.makeSpan(["delimsizing", "size" + t], [u], n), q.TEXT, n, o);
    return a && wa(c, n, q.TEXT), c;
  },
  ot = function (e, t, a) {
    var n;
    t === "Size1-Regular" ? (n = "delim-size1") : (n = "delim-size4");
    var i = w.makeSpan(
      ["delimsizinginner", n],
      [w.makeSpan([], [w.makeSymbol(e, t, a)])]
    );
    return { type: "elem", elem: i };
  },
  ut = function (e, t, a) {
    var n = k0["Size4-Regular"][e.charCodeAt(0)]
        ? k0["Size4-Regular"][e.charCodeAt(0)][4]
        : k0["Size1-Regular"][e.charCodeAt(0)][4],
      i = new Q0("inner", wn(e, Math.round(1e3 * t))),
      o = new O0([i], {
        width: z(n),
        height: z(t),
        style: "width:" + z(n),
        viewBox: "0 0 " + 1e3 * n + " " + Math.round(1e3 * t),
        preserveAspectRatio: "xMinYMin",
      }),
      u = w.makeSvgSpan([], [o], a);
    return (
      (u.height = t),
      (u.style.height = z(t)),
      (u.style.width = z(n)),
      { type: "elem", elem: u }
    );
  },
  Et = 0.008,
  Re = { type: "kern", size: -1 * Et },
  vi = ["|", "\\lvert", "\\rvert", "\\vert"],
  gi = ["\\|", "\\lVert", "\\rVert", "\\Vert"],
  Aa = function (e, t, a, n, i, o) {
    var u,
      c,
      d,
      f,
      g = "",
      x = 0;
    (u = d = f = e), (c = null);
    var y = "Size1-Regular";
    e === "\\uparrow"
      ? (d = f = "⏐")
      : e === "\\Uparrow"
      ? (d = f = "‖")
      : e === "\\downarrow"
      ? (u = d = "⏐")
      : e === "\\Downarrow"
      ? (u = d = "‖")
      : e === "\\updownarrow"
      ? ((u = "\\uparrow"), (d = "⏐"), (f = "\\downarrow"))
      : e === "\\Updownarrow"
      ? ((u = "\\Uparrow"), (d = "‖"), (f = "\\Downarrow"))
      : I.contains(vi, e)
      ? ((d = "∣"), (g = "vert"), (x = 333))
      : I.contains(gi, e)
      ? ((d = "∥"), (g = "doublevert"), (x = 556))
      : e === "[" || e === "\\lbrack"
      ? ((u = "⎡"),
        (d = "⎢"),
        (f = "⎣"),
        (y = "Size4-Regular"),
        (g = "lbrack"),
        (x = 667))
      : e === "]" || e === "\\rbrack"
      ? ((u = "⎤"),
        (d = "⎥"),
        (f = "⎦"),
        (y = "Size4-Regular"),
        (g = "rbrack"),
        (x = 667))
      : e === "\\lfloor" || e === "⌊"
      ? ((d = u = "⎢"),
        (f = "⎣"),
        (y = "Size4-Regular"),
        (g = "lfloor"),
        (x = 667))
      : e === "\\lceil" || e === "⌈"
      ? ((u = "⎡"),
        (d = f = "⎢"),
        (y = "Size4-Regular"),
        (g = "lceil"),
        (x = 667))
      : e === "\\rfloor" || e === "⌋"
      ? ((d = u = "⎥"),
        (f = "⎦"),
        (y = "Size4-Regular"),
        (g = "rfloor"),
        (x = 667))
      : e === "\\rceil" || e === "⌉"
      ? ((u = "⎤"),
        (d = f = "⎥"),
        (y = "Size4-Regular"),
        (g = "rceil"),
        (x = 667))
      : e === "(" || e === "\\lparen"
      ? ((u = "⎛"),
        (d = "⎜"),
        (f = "⎝"),
        (y = "Size4-Regular"),
        (g = "lparen"),
        (x = 875))
      : e === ")" || e === "\\rparen"
      ? ((u = "⎞"),
        (d = "⎟"),
        (f = "⎠"),
        (y = "Size4-Regular"),
        (g = "rparen"),
        (x = 875))
      : e === "\\{" || e === "\\lbrace"
      ? ((u = "⎧"), (c = "⎨"), (f = "⎩"), (d = "⎪"), (y = "Size4-Regular"))
      : e === "\\}" || e === "\\rbrace"
      ? ((u = "⎫"), (c = "⎬"), (f = "⎭"), (d = "⎪"), (y = "Size4-Regular"))
      : e === "\\lgroup" || e === "⟮"
      ? ((u = "⎧"), (f = "⎩"), (d = "⎪"), (y = "Size4-Regular"))
      : e === "\\rgroup" || e === "⟯"
      ? ((u = "⎫"), (f = "⎭"), (d = "⎪"), (y = "Size4-Regular"))
      : e === "\\lmoustache" || e === "⎰"
      ? ((u = "⎧"), (f = "⎭"), (d = "⎪"), (y = "Size4-Regular"))
      : (e === "\\rmoustache" || e === "⎱") &&
        ((u = "⎫"), (f = "⎩"), (d = "⎪"), (y = "Size4-Regular"));
    var S = fe(u, y, i),
      k = S.height + S.depth,
      C = fe(d, y, i),
      B = C.height + C.depth,
      R = fe(f, y, i),
      E = R.height + R.depth,
      P = 0,
      L = 1;
    if (c !== null) {
      var U = fe(c, y, i);
      (P = U.height + U.depth), (L = 2);
    }
    var G = k + E + P,
      W = Math.max(0, Math.ceil((t - G) / (L * B))),
      Y = G + W * L * B,
      C0 = n.fontMetrics().axisHeight;
    a && (C0 *= n.sizeMultiplier);
    var a0 = Y / 2 - C0,
      e0 = [];
    if (g.length > 0) {
      var K0 = Y - k - E,
        o0 = Math.round(Y * 1e3),
        w0 = xn(g, Math.round(K0 * 1e3)),
        H0 = new Q0(g, w0),
        ee = (x / 1e3).toFixed(3) + "em",
        te = (o0 / 1e3).toFixed(3) + "em",
        Ze = new O0([H0], {
          width: ee,
          height: te,
          viewBox: "0 0 " + x + " " + o0,
        }),
        P0 = w.makeSvgSpan([], [Ze], n);
      (P0.height = o0 / 1e3),
        (P0.style.width = ee),
        (P0.style.height = te),
        e0.push({ type: "elem", elem: P0 });
    } else {
      if ((e0.push(ot(f, y, i)), e0.push(Re), c === null)) {
        var U0 = Y - k - E + 2 * Et;
        e0.push(ut(d, U0, n));
      } else {
        var f0 = (Y - k - E - P) / 2 + 2 * Et;
        e0.push(ut(d, f0, n)),
          e0.push(Re),
          e0.push(ot(c, y, i)),
          e0.push(Re),
          e0.push(ut(d, f0, n));
      }
      e0.push(Re), e0.push(ot(u, y, i));
    }
    var de = n.havingBaseStyle(q.TEXT),
      Je = w.makeVList(
        { positionType: "bottom", positionData: a0, children: e0 },
        de
      );
    return Wt(w.makeSpan(["delimsizing", "mult"], [Je], de), q.TEXT, n, o);
  },
  ht = 80,
  ct = 0.08,
  mt = function (e, t, a, n, i) {
    var o = yn(e, n, a),
      u = new Q0(e, o),
      c = new O0([u], {
        width: "400em",
        height: z(t),
        viewBox: "0 0 400000 " + a,
        preserveAspectRatio: "xMinYMin slice",
      });
    return w.makeSvgSpan(["hide-tail"], [c], i);
  },
  bi = function (e, t) {
    var a = t.havingBaseSizing(),
      n = Ta("\\surd", e * a.sizeMultiplier, Ma, a),
      i = a.sizeMultiplier,
      o = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness),
      u,
      c = 0,
      d = 0,
      f = 0,
      g;
    return (
      n.type === "small"
        ? ((f = 1e3 + 1e3 * o + ht),
          e < 1 ? (i = 1) : e < 1.4 && (i = 0.7),
          (c = (1 + o + ct) / i),
          (d = (1 + o) / i),
          (u = mt("sqrtMain", c, f, o, t)),
          (u.style.minWidth = "0.853em"),
          (g = 0.833 / i))
        : n.type === "large"
        ? ((f = (1e3 + ht) * pe[n.size]),
          (d = (pe[n.size] + o) / i),
          (c = (pe[n.size] + o + ct) / i),
          (u = mt("sqrtSize" + n.size, c, f, o, t)),
          (u.style.minWidth = "1.02em"),
          (g = 1 / i))
        : ((c = e + o + ct),
          (d = e + o),
          (f = Math.floor(1e3 * e + o) + ht),
          (u = mt("sqrtTall", c, f, o, t)),
          (u.style.minWidth = "0.742em"),
          (g = 1.056)),
      (u.height = d),
      (u.style.height = z(c)),
      {
        span: u,
        advanceWidth: g,
        ruleWidth: (t.fontMetrics().sqrtRuleThickness + o) * i,
      }
    );
  },
  Sa = [
    "(",
    "\\lparen",
    ")",
    "\\rparen",
    "[",
    "\\lbrack",
    "]",
    "\\rbrack",
    "\\{",
    "\\lbrace",
    "\\}",
    "\\rbrace",
    "\\lfloor",
    "\\rfloor",
    "⌊",
    "⌋",
    "\\lceil",
    "\\rceil",
    "⌈",
    "⌉",
    "\\surd",
  ],
  yi = [
    "\\uparrow",
    "\\downarrow",
    "\\updownarrow",
    "\\Uparrow",
    "\\Downarrow",
    "\\Updownarrow",
    "|",
    "\\|",
    "\\vert",
    "\\Vert",
    "\\lvert",
    "\\rvert",
    "\\lVert",
    "\\rVert",
    "\\lgroup",
    "\\rgroup",
    "⟮",
    "⟯",
    "\\lmoustache",
    "\\rmoustache",
    "⎰",
    "⎱",
  ],
  ka = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"],
  pe = [0, 1.2, 1.8, 2.4, 3],
  wi = function (e, t, a, n, i) {
    if (
      (e === "<" || e === "\\lt" || e === "⟨"
        ? (e = "\\langle")
        : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle"),
      I.contains(Sa, e) || I.contains(ka, e))
    )
      return xa(e, t, !1, a, n, i);
    if (I.contains(yi, e)) return Aa(e, pe[t], !1, a, n, i);
    throw new T("Illegal delimiter: '" + e + "'");
  },
  xi = [
    { type: "small", style: q.SCRIPTSCRIPT },
    { type: "small", style: q.SCRIPT },
    { type: "small", style: q.TEXT },
    { type: "large", size: 1 },
    { type: "large", size: 2 },
    { type: "large", size: 3 },
    { type: "large", size: 4 },
  ],
  Ai = [
    { type: "small", style: q.SCRIPTSCRIPT },
    { type: "small", style: q.SCRIPT },
    { type: "small", style: q.TEXT },
    { type: "stack" },
  ],
  Ma = [
    { type: "small", style: q.SCRIPTSCRIPT },
    { type: "small", style: q.SCRIPT },
    { type: "small", style: q.TEXT },
    { type: "large", size: 1 },
    { type: "large", size: 2 },
    { type: "large", size: 3 },
    { type: "large", size: 4 },
    { type: "stack" },
  ],
  Si = function (e) {
    if (e.type === "small") return "Main-Regular";
    if (e.type === "large") return "Size" + e.size + "-Regular";
    if (e.type === "stack") return "Size4-Regular";
    throw new Error("Add support for delim type '" + e.type + "' here.");
  },
  Ta = function (e, t, a, n) {
    for (
      var i = Math.min(2, 3 - n.style.size), o = i;
      o < a.length && a[o].type !== "stack";
      o++
    ) {
      var u = fe(e, Si(a[o]), "math"),
        c = u.height + u.depth;
      if (a[o].type === "small") {
        var d = n.havingBaseStyle(a[o].style);
        c *= d.sizeMultiplier;
      }
      if (c > t) return a[o];
    }
    return a[a.length - 1];
  },
  za = function (e, t, a, n, i, o) {
    e === "<" || e === "\\lt" || e === "⟨"
      ? (e = "\\langle")
      : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle");
    var u;
    I.contains(ka, e) ? (u = xi) : I.contains(Sa, e) ? (u = Ma) : (u = Ai);
    var c = Ta(e, t, u, n);
    return c.type === "small"
      ? fi(e, c.style, a, n, i, o)
      : c.type === "large"
      ? xa(e, c.size, a, n, i, o)
      : Aa(e, t, a, n, i, o);
  },
  ki = function (e, t, a, n, i, o) {
    var u = n.fontMetrics().axisHeight * n.sizeMultiplier,
      c = 901,
      d = 5 / n.fontMetrics().ptPerEm,
      f = Math.max(t - u, a + u),
      g = Math.max((f / 500) * c, 2 * f - d);
    return za(e, g, !0, n, i, o);
  },
  I0 = {
    sqrtImage: bi,
    sizedDelim: wi,
    sizeToMaxHeight: pe,
    customSizedDelim: za,
    leftRightDelim: ki,
  },
  Sr = {
    "\\bigl": { mclass: "mopen", size: 1 },
    "\\Bigl": { mclass: "mopen", size: 2 },
    "\\biggl": { mclass: "mopen", size: 3 },
    "\\Biggl": { mclass: "mopen", size: 4 },
    "\\bigr": { mclass: "mclose", size: 1 },
    "\\Bigr": { mclass: "mclose", size: 2 },
    "\\biggr": { mclass: "mclose", size: 3 },
    "\\Biggr": { mclass: "mclose", size: 4 },
    "\\bigm": { mclass: "mrel", size: 1 },
    "\\Bigm": { mclass: "mrel", size: 2 },
    "\\biggm": { mclass: "mrel", size: 3 },
    "\\Biggm": { mclass: "mrel", size: 4 },
    "\\big": { mclass: "mord", size: 1 },
    "\\Big": { mclass: "mord", size: 2 },
    "\\bigg": { mclass: "mord", size: 3 },
    "\\Bigg": { mclass: "mord", size: 4 },
  },
  Mi = [
    "(",
    "\\lparen",
    ")",
    "\\rparen",
    "[",
    "\\lbrack",
    "]",
    "\\rbrack",
    "\\{",
    "\\lbrace",
    "\\}",
    "\\rbrace",
    "\\lfloor",
    "\\rfloor",
    "⌊",
    "⌋",
    "\\lceil",
    "\\rceil",
    "⌈",
    "⌉",
    "<",
    ">",
    "\\langle",
    "⟨",
    "\\rangle",
    "⟩",
    "\\lt",
    "\\gt",
    "\\lvert",
    "\\rvert",
    "\\lVert",
    "\\rVert",
    "\\lgroup",
    "\\rgroup",
    "⟮",
    "⟯",
    "\\lmoustache",
    "\\rmoustache",
    "⎰",
    "⎱",
    "/",
    "\\backslash",
    "|",
    "\\vert",
    "\\|",
    "\\Vert",
    "\\uparrow",
    "\\Uparrow",
    "\\downarrow",
    "\\Downarrow",
    "\\updownarrow",
    "\\Updownarrow",
    ".",
  ];
function Xe(r, e) {
  var t = Ye(r);
  if (t && I.contains(Mi, t.text)) return t;
  throw t
    ? new T("Invalid delimiter '" + t.text + "' after '" + e.funcName + "'", r)
    : new T("Invalid delimiter type '" + r.type + "'", r);
}
D({
  type: "delimsizing",
  names: [
    "\\bigl",
    "\\Bigl",
    "\\biggl",
    "\\Biggl",
    "\\bigr",
    "\\Bigr",
    "\\biggr",
    "\\Biggr",
    "\\bigm",
    "\\Bigm",
    "\\biggm",
    "\\Biggm",
    "\\big",
    "\\Big",
    "\\bigg",
    "\\Bigg",
  ],
  props: { numArgs: 1, argTypes: ["primitive"] },
  handler: (r, e) => {
    var t = Xe(e[0], r);
    return {
      type: "delimsizing",
      mode: r.parser.mode,
      size: Sr[r.funcName].size,
      mclass: Sr[r.funcName].mclass,
      delim: t.text,
    };
  },
  htmlBuilder: (r, e) =>
    r.delim === "."
      ? w.makeSpan([r.mclass])
      : I0.sizedDelim(r.delim, r.size, e, r.mode, [r.mclass]),
  mathmlBuilder: (r) => {
    var e = [];
    r.delim !== "." && e.push(y0(r.delim, r.mode));
    var t = new M.MathNode("mo", e);
    r.mclass === "mopen" || r.mclass === "mclose"
      ? t.setAttribute("fence", "true")
      : t.setAttribute("fence", "false"),
      t.setAttribute("stretchy", "true");
    var a = z(I0.sizeToMaxHeight[r.size]);
    return t.setAttribute("minsize", a), t.setAttribute("maxsize", a), t;
  },
});
function kr(r) {
  if (!r.body)
    throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
D({
  type: "leftright-right",
  names: ["\\right"],
  props: { numArgs: 1, primitive: !0 },
  handler: (r, e) => {
    var t = r.parser.gullet.macros.get("\\current@color");
    if (t && typeof t != "string")
      throw new T("\\current@color set to non-string in \\right");
    return {
      type: "leftright-right",
      mode: r.parser.mode,
      delim: Xe(e[0], r).text,
      color: t,
    };
  },
});
D({
  type: "leftright",
  names: ["\\left"],
  props: { numArgs: 1, primitive: !0 },
  handler: (r, e) => {
    var t = Xe(e[0], r),
      a = r.parser;
    ++a.leftrightDepth;
    var n = a.parseExpression(!1);
    --a.leftrightDepth, a.expect("\\right", !1);
    var i = H(a.parseFunction(), "leftright-right");
    return {
      type: "leftright",
      mode: a.mode,
      body: n,
      left: t.text,
      right: i.delim,
      rightColor: i.color,
    };
  },
  htmlBuilder: (r, e) => {
    kr(r);
    for (
      var t = t0(r.body, e, !0, ["mopen", "mclose"]),
        a = 0,
        n = 0,
        i = !1,
        o = 0;
      o < t.length;
      o++
    )
      t[o].isMiddle
        ? (i = !0)
        : ((a = Math.max(t[o].height, a)), (n = Math.max(t[o].depth, n)));
    (a *= e.sizeMultiplier), (n *= e.sizeMultiplier);
    var u;
    if (
      (r.left === "."
        ? (u = ge(e, ["mopen"]))
        : (u = I0.leftRightDelim(r.left, a, n, e, r.mode, ["mopen"])),
      t.unshift(u),
      i)
    )
      for (var c = 1; c < t.length; c++) {
        var d = t[c],
          f = d.isMiddle;
        f && (t[c] = I0.leftRightDelim(f.delim, a, n, f.options, r.mode, []));
      }
    var g;
    if (r.right === ".") g = ge(e, ["mclose"]);
    else {
      var x = r.rightColor ? e.withColor(r.rightColor) : e;
      g = I0.leftRightDelim(r.right, a, n, x, r.mode, ["mclose"]);
    }
    return t.push(g), w.makeSpan(["minner"], t, e);
  },
  mathmlBuilder: (r, e) => {
    kr(r);
    var t = h0(r.body, e);
    if (r.left !== ".") {
      var a = new M.MathNode("mo", [y0(r.left, r.mode)]);
      a.setAttribute("fence", "true"), t.unshift(a);
    }
    if (r.right !== ".") {
      var n = new M.MathNode("mo", [y0(r.right, r.mode)]);
      n.setAttribute("fence", "true"),
        r.rightColor && n.setAttribute("mathcolor", r.rightColor),
        t.push(n);
    }
    return Pt(t);
  },
});
D({
  type: "middle",
  names: ["\\middle"],
  props: { numArgs: 1, primitive: !0 },
  handler: (r, e) => {
    var t = Xe(e[0], r);
    if (!r.parser.leftrightDepth)
      throw new T("\\middle without preceding \\left", t);
    return { type: "middle", mode: r.parser.mode, delim: t.text };
  },
  htmlBuilder: (r, e) => {
    var t;
    if (r.delim === ".") t = ge(e, []);
    else {
      t = I0.sizedDelim(r.delim, 1, e, r.mode, []);
      var a = { delim: r.delim, options: e };
      t.isMiddle = a;
    }
    return t;
  },
  mathmlBuilder: (r, e) => {
    var t =
        r.delim === "\\vert" || r.delim === "|"
          ? y0("|", "text")
          : y0(r.delim, r.mode),
      a = new M.MathNode("mo", [t]);
    return (
      a.setAttribute("fence", "true"),
      a.setAttribute("lspace", "0.05em"),
      a.setAttribute("rspace", "0.05em"),
      a
    );
  },
});
var Yt = (r, e) => {
    var t = w.wrapFragment(V(r.body, e), e),
      a = r.label.slice(1),
      n = e.sizeMultiplier,
      i,
      o = 0,
      u = I.isCharacterBox(r.body);
    if (a === "sout")
      (i = w.makeSpan(["stretchy", "sout"])),
        (i.height = e.fontMetrics().defaultRuleThickness / n),
        (o = -0.5 * e.fontMetrics().xHeight);
    else if (a === "phase") {
      var c = Z({ number: 0.6, unit: "pt" }, e),
        d = Z({ number: 0.35, unit: "ex" }, e),
        f = e.havingBaseSizing();
      n = n / f.sizeMultiplier;
      var g = t.height + t.depth + c + d;
      t.style.paddingLeft = z(g / 2 + c);
      var x = Math.floor(1e3 * g * n),
        y = gn(x),
        S = new O0([new Q0("phase", y)], {
          width: "400em",
          height: z(x / 1e3),
          viewBox: "0 0 400000 " + x,
          preserveAspectRatio: "xMinYMin slice",
        });
      (i = w.makeSvgSpan(["hide-tail"], [S], e)),
        (i.style.height = z(g)),
        (o = t.depth + c + d);
    } else {
      /cancel/.test(a)
        ? u || t.classes.push("cancel-pad")
        : a === "angl"
        ? t.classes.push("anglpad")
        : t.classes.push("boxpad");
      var k = 0,
        C = 0,
        B = 0;
      /box/.test(a)
        ? ((B = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness)),
          (k = e.fontMetrics().fboxsep + (a === "colorbox" ? 0 : B)),
          (C = k))
        : a === "angl"
        ? ((B = Math.max(
            e.fontMetrics().defaultRuleThickness,
            e.minRuleThickness
          )),
          (k = 4 * B),
          (C = Math.max(0, 0.25 - t.depth)))
        : ((k = u ? 0.2 : 0), (C = k)),
        (i = L0.encloseSpan(t, a, k, C, e)),
        /fbox|boxed|fcolorbox/.test(a)
          ? ((i.style.borderStyle = "solid"), (i.style.borderWidth = z(B)))
          : a === "angl" &&
            B !== 0.049 &&
            ((i.style.borderTopWidth = z(B)),
            (i.style.borderRightWidth = z(B))),
        (o = t.depth + C),
        r.backgroundColor &&
          ((i.style.backgroundColor = r.backgroundColor),
          r.borderColor && (i.style.borderColor = r.borderColor));
    }
    var R;
    if (r.backgroundColor)
      R = w.makeVList(
        {
          positionType: "individualShift",
          children: [
            { type: "elem", elem: i, shift: o },
            { type: "elem", elem: t, shift: 0 },
          ],
        },
        e
      );
    else {
      var E = /cancel|phase/.test(a) ? ["svg-align"] : [];
      R = w.makeVList(
        {
          positionType: "individualShift",
          children: [
            { type: "elem", elem: t, shift: 0 },
            { type: "elem", elem: i, shift: o, wrapperClasses: E },
          ],
        },
        e
      );
    }
    return (
      /cancel/.test(a) && ((R.height = t.height), (R.depth = t.depth)),
      /cancel/.test(a) && !u
        ? w.makeSpan(["mord", "cancel-lap"], [R], e)
        : w.makeSpan(["mord"], [R], e)
    );
  },
  Qt = (r, e) => {
    var t = 0,
      a = new M.MathNode(
        r.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose",
        [Q(r.body, e)]
      );
    switch (r.label) {
      case "\\cancel":
        a.setAttribute("notation", "updiagonalstrike");
        break;
      case "\\bcancel":
        a.setAttribute("notation", "downdiagonalstrike");
        break;
      case "\\phase":
        a.setAttribute("notation", "phasorangle");
        break;
      case "\\sout":
        a.setAttribute("notation", "horizontalstrike");
        break;
      case "\\fbox":
        a.setAttribute("notation", "box");
        break;
      case "\\angl":
        a.setAttribute("notation", "actuarial");
        break;
      case "\\fcolorbox":
      case "\\colorbox":
        if (
          ((t = e.fontMetrics().fboxsep * e.fontMetrics().ptPerEm),
          a.setAttribute("width", "+" + 2 * t + "pt"),
          a.setAttribute("height", "+" + 2 * t + "pt"),
          a.setAttribute("lspace", t + "pt"),
          a.setAttribute("voffset", t + "pt"),
          r.label === "\\fcolorbox")
        ) {
          var n = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness);
          a.setAttribute(
            "style",
            "border: " + n + "em solid " + String(r.borderColor)
          );
        }
        break;
      case "\\xcancel":
        a.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
        break;
    }
    return (
      r.backgroundColor && a.setAttribute("mathbackground", r.backgroundColor),
      a
    );
  };
D({
  type: "enclose",
  names: ["\\colorbox"],
  props: { numArgs: 2, allowedInText: !0, argTypes: ["color", "text"] },
  handler(r, e, t) {
    var { parser: a, funcName: n } = r,
      i = H(e[0], "color-token").color,
      o = e[1];
    return {
      type: "enclose",
      mode: a.mode,
      label: n,
      backgroundColor: i,
      body: o,
    };
  },
  htmlBuilder: Yt,
  mathmlBuilder: Qt,
});
D({
  type: "enclose",
  names: ["\\fcolorbox"],
  props: {
    numArgs: 3,
    allowedInText: !0,
    argTypes: ["color", "color", "text"],
  },
  handler(r, e, t) {
    var { parser: a, funcName: n } = r,
      i = H(e[0], "color-token").color,
      o = H(e[1], "color-token").color,
      u = e[2];
    return {
      type: "enclose",
      mode: a.mode,
      label: n,
      backgroundColor: o,
      borderColor: i,
      body: u,
    };
  },
  htmlBuilder: Yt,
  mathmlBuilder: Qt,
});
D({
  type: "enclose",
  names: ["\\fbox"],
  props: { numArgs: 1, argTypes: ["hbox"], allowedInText: !0 },
  handler(r, e) {
    var { parser: t } = r;
    return { type: "enclose", mode: t.mode, label: "\\fbox", body: e[0] };
  },
});
D({
  type: "enclose",
  names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
  props: { numArgs: 1 },
  handler(r, e) {
    var { parser: t, funcName: a } = r,
      n = e[0];
    return { type: "enclose", mode: t.mode, label: a, body: n };
  },
  htmlBuilder: Yt,
  mathmlBuilder: Qt,
});
D({
  type: "enclose",
  names: ["\\angl"],
  props: { numArgs: 1, argTypes: ["hbox"], allowedInText: !1 },
  handler(r, e) {
    var { parser: t } = r;
    return { type: "enclose", mode: t.mode, label: "\\angl", body: e[0] };
  },
});
var Ba = {};
function T0(r) {
  for (
    var {
        type: e,
        names: t,
        props: a,
        handler: n,
        htmlBuilder: i,
        mathmlBuilder: o,
      } = r,
      u = {
        type: e,
        numArgs: a.numArgs || 0,
        allowedInText: !1,
        numOptionalArgs: 0,
        handler: n,
      },
      c = 0;
    c < t.length;
    ++c
  )
    Ba[t[c]] = u;
  i && (Pe[e] = i), o && (Ue[e] = o);
}
var Ca = {};
function m(r, e) {
  Ca[r] = e;
}
function Mr(r) {
  var e = [];
  r.consumeSpaces();
  var t = r.fetch().text;
  for (
    t === "\\relax" && (r.consume(), r.consumeSpaces(), (t = r.fetch().text));
    t === "\\hline" || t === "\\hdashline";

  )
    r.consume(),
      e.push(t === "\\hdashline"),
      r.consumeSpaces(),
      (t = r.fetch().text);
  return e;
}
var je = (r) => {
  var e = r.parser.settings;
  if (!e.displayMode)
    throw new T("{" + r.envName + "} can be used only in display mode.");
};
function Xt(r) {
  if (r.indexOf("ed") === -1) return r.indexOf("*") === -1;
}
function j0(r, e, t) {
  var {
    hskipBeforeAndAfter: a,
    addJot: n,
    cols: i,
    arraystretch: o,
    colSeparationType: u,
    autoTag: c,
    singleRow: d,
    emptySingleRow: f,
    maxNumCols: g,
    leqno: x,
  } = e;
  if (
    (r.gullet.beginGroup(), d || r.gullet.macros.set("\\cr", "\\\\\\relax"), !o)
  ) {
    var y = r.gullet.expandMacroAsText("\\arraystretch");
    if (y == null) o = 1;
    else if (((o = parseFloat(y)), !o || o < 0))
      throw new T("Invalid \\arraystretch: " + y);
  }
  r.gullet.beginGroup();
  var S = [],
    k = [S],
    C = [],
    B = [],
    R = c != null ? [] : void 0;
  function E() {
    c && r.gullet.macros.set("\\@eqnsw", "1", !0);
  }
  function P() {
    R &&
      (r.gullet.macros.get("\\df@tag")
        ? (R.push(r.subparse([new g0("\\df@tag")])),
          r.gullet.macros.set("\\df@tag", void 0, !0))
        : R.push(!!c && r.gullet.macros.get("\\@eqnsw") === "1"));
  }
  for (E(), B.push(Mr(r)); ; ) {
    var L = r.parseExpression(!1, d ? "\\end" : "\\\\");
    r.gullet.endGroup(),
      r.gullet.beginGroup(),
      (L = { type: "ordgroup", mode: r.mode, body: L }),
      t && (L = { type: "styling", mode: r.mode, style: t, body: [L] }),
      S.push(L);
    var U = r.fetch().text;
    if (U === "&") {
      if (g && S.length === g) {
        if (d || u) throw new T("Too many tab characters: &", r.nextToken);
        r.settings.reportNonstrict(
          "textEnv",
          "Too few columns specified in the {array} column argument."
        );
      }
      r.consume();
    } else if (U === "\\end") {
      P(),
        S.length === 1 &&
          L.type === "styling" &&
          L.body[0].body.length === 0 &&
          (k.length > 1 || !f) &&
          k.pop(),
        B.length < k.length + 1 && B.push([]);
      break;
    } else if (U === "\\\\") {
      r.consume();
      var G = void 0;
      r.gullet.future().text !== " " && (G = r.parseSizeGroup(!0)),
        C.push(G ? G.value : null),
        P(),
        B.push(Mr(r)),
        (S = []),
        k.push(S),
        E();
    } else throw new T("Expected & or \\\\ or \\cr or \\end", r.nextToken);
  }
  return (
    r.gullet.endGroup(),
    r.gullet.endGroup(),
    {
      type: "array",
      mode: r.mode,
      addJot: n,
      arraystretch: o,
      body: k,
      cols: i,
      rowGaps: C,
      hskipBeforeAndAfter: a,
      hLinesBeforeRow: B,
      colSeparationType: u,
      tags: R,
      leqno: x,
    }
  );
}
function jt(r) {
  return r.slice(0, 1) === "d" ? "display" : "text";
}
var z0 = function (e, t) {
    var a,
      n,
      i = e.body.length,
      o = e.hLinesBeforeRow,
      u = 0,
      c = new Array(i),
      d = [],
      f = Math.max(t.fontMetrics().arrayRuleWidth, t.minRuleThickness),
      g = 1 / t.fontMetrics().ptPerEm,
      x = 5 * g;
    if (e.colSeparationType && e.colSeparationType === "small") {
      var y = t.havingStyle(q.SCRIPT).sizeMultiplier;
      x = 0.2778 * (y / t.sizeMultiplier);
    }
    var S =
        e.colSeparationType === "CD" ? Z({ number: 3, unit: "ex" }, t) : 12 * g,
      k = 3 * g,
      C = e.arraystretch * S,
      B = 0.7 * C,
      R = 0.3 * C,
      E = 0;
    function P(Se) {
      for (var ke = 0; ke < Se.length; ++ke)
        ke > 0 && (E += 0.25), d.push({ pos: E, isDashed: Se[ke] });
    }
    for (P(o[0]), a = 0; a < e.body.length; ++a) {
      var L = e.body[a],
        U = B,
        G = R;
      u < L.length && (u = L.length);
      var W = new Array(L.length);
      for (n = 0; n < L.length; ++n) {
        var Y = V(L[n], t);
        G < Y.depth && (G = Y.depth),
          U < Y.height && (U = Y.height),
          (W[n] = Y);
      }
      var C0 = e.rowGaps[a],
        a0 = 0;
      C0 &&
        ((a0 = Z(C0, t)), a0 > 0 && ((a0 += R), G < a0 && (G = a0), (a0 = 0))),
        e.addJot && (G += k),
        (W.height = U),
        (W.depth = G),
        (E += U),
        (W.pos = E),
        (E += G + a0),
        (c[a] = W),
        P(o[a + 1]);
    }
    var e0 = E / 2 + t.fontMetrics().axisHeight,
      K0 = e.cols || [],
      o0 = [],
      w0,
      H0,
      ee = [];
    if (e.tags && e.tags.some((Se) => Se))
      for (a = 0; a < i; ++a) {
        var te = c[a],
          Ze = te.pos - e0,
          P0 = e.tags[a],
          U0 = void 0;
        P0 === !0
          ? (U0 = w.makeSpan(["eqn-num"], [], t))
          : P0 === !1
          ? (U0 = w.makeSpan([], [], t))
          : (U0 = w.makeSpan([], t0(P0, t, !0), t)),
          (U0.depth = te.depth),
          (U0.height = te.height),
          ee.push({ type: "elem", elem: U0, shift: Ze });
      }
    for (n = 0, H0 = 0; n < u || H0 < K0.length; ++n, ++H0) {
      for (var f0 = K0[H0] || {}, de = !0; f0.type === "separator"; ) {
        if (
          (de ||
            ((w0 = w.makeSpan(["arraycolsep"], [])),
            (w0.style.width = z(t.fontMetrics().doubleRuleSep)),
            o0.push(w0)),
          f0.separator === "|" || f0.separator === ":")
        ) {
          var Je = f0.separator === "|" ? "solid" : "dashed",
            re = w.makeSpan(["vertical-separator"], [], t);
          (re.style.height = z(E)),
            (re.style.borderRightWidth = z(f)),
            (re.style.borderRightStyle = Je),
            (re.style.margin = "0 " + z(-f / 2));
          var tr = E - e0;
          tr && (re.style.verticalAlign = z(-tr)), o0.push(re);
        } else throw new T("Invalid separator type: " + f0.separator);
        H0++, (f0 = K0[H0] || {}), (de = !1);
      }
      if (!(n >= u)) {
        var ae = void 0;
        (n > 0 || e.hskipBeforeAndAfter) &&
          ((ae = I.deflt(f0.pregap, x)),
          ae !== 0 &&
            ((w0 = w.makeSpan(["arraycolsep"], [])),
            (w0.style.width = z(ae)),
            o0.push(w0)));
        var ne = [];
        for (a = 0; a < i; ++a) {
          var xe = c[a],
            Ae = xe[n];
          if (Ae) {
            var Qa = xe.pos - e0;
            (Ae.depth = xe.depth),
              (Ae.height = xe.height),
              ne.push({ type: "elem", elem: Ae, shift: Qa });
          }
        }
        (ne = w.makeVList(
          { positionType: "individualShift", children: ne },
          t
        )),
          (ne = w.makeSpan(["col-align-" + (f0.align || "c")], [ne])),
          o0.push(ne),
          (n < u - 1 || e.hskipBeforeAndAfter) &&
            ((ae = I.deflt(f0.postgap, x)),
            ae !== 0 &&
              ((w0 = w.makeSpan(["arraycolsep"], [])),
              (w0.style.width = z(ae)),
              o0.push(w0)));
      }
    }
    if (((c = w.makeSpan(["mtable"], o0)), d.length > 0)) {
      for (
        var Xa = w.makeLineSpan("hline", t, f),
          ja = w.makeLineSpan("hdashline", t, f),
          $e = [{ type: "elem", elem: c, shift: 0 }];
        d.length > 0;

      ) {
        var rr = d.pop(),
          ar = rr.pos - e0;
        rr.isDashed
          ? $e.push({ type: "elem", elem: ja, shift: ar })
          : $e.push({ type: "elem", elem: Xa, shift: ar });
      }
      c = w.makeVList({ positionType: "individualShift", children: $e }, t);
    }
    if (ee.length === 0) return w.makeSpan(["mord"], [c], t);
    var _e = w.makeVList({ positionType: "individualShift", children: ee }, t);
    return (_e = w.makeSpan(["tag"], [_e], t)), w.makeFragment([c, _e]);
  },
  Ti = { c: "center ", l: "left ", r: "right " },
  B0 = function (e, t) {
    for (
      var a = [],
        n = new M.MathNode("mtd", [], ["mtr-glue"]),
        i = new M.MathNode("mtd", [], ["mml-eqn-num"]),
        o = 0;
      o < e.body.length;
      o++
    ) {
      for (var u = e.body[o], c = [], d = 0; d < u.length; d++)
        c.push(new M.MathNode("mtd", [Q(u[d], t)]));
      e.tags &&
        e.tags[o] &&
        (c.unshift(n), c.push(n), e.leqno ? c.unshift(i) : c.push(i)),
        a.push(new M.MathNode("mtr", c));
    }
    var f = new M.MathNode("mtable", a),
      g =
        e.arraystretch === 0.5
          ? 0.1
          : 0.16 + e.arraystretch - 1 + (e.addJot ? 0.09 : 0);
    f.setAttribute("rowspacing", z(g));
    var x = "",
      y = "";
    if (e.cols && e.cols.length > 0) {
      var S = e.cols,
        k = "",
        C = !1,
        B = 0,
        R = S.length;
      S[0].type === "separator" && ((x += "top "), (B = 1)),
        S[S.length - 1].type === "separator" && ((x += "bottom "), (R -= 1));
      for (var E = B; E < R; E++)
        S[E].type === "align"
          ? ((y += Ti[S[E].align]), C && (k += "none "), (C = !0))
          : S[E].type === "separator" &&
            C &&
            ((k += S[E].separator === "|" ? "solid " : "dashed "), (C = !1));
      f.setAttribute("columnalign", y.trim()),
        /[sd]/.test(k) && f.setAttribute("columnlines", k.trim());
    }
    if (e.colSeparationType === "align") {
      for (var P = e.cols || [], L = "", U = 1; U < P.length; U++)
        L += U % 2 ? "0em " : "1em ";
      f.setAttribute("columnspacing", L.trim());
    } else
      e.colSeparationType === "alignat" || e.colSeparationType === "gather"
        ? f.setAttribute("columnspacing", "0em")
        : e.colSeparationType === "small"
        ? f.setAttribute("columnspacing", "0.2778em")
        : e.colSeparationType === "CD"
        ? f.setAttribute("columnspacing", "0.5em")
        : f.setAttribute("columnspacing", "1em");
    var G = "",
      W = e.hLinesBeforeRow;
    (x += W[0].length > 0 ? "left " : ""),
      (x += W[W.length - 1].length > 0 ? "right " : "");
    for (var Y = 1; Y < W.length - 1; Y++)
      G += W[Y].length === 0 ? "none " : W[Y][0] ? "dashed " : "solid ";
    return (
      /[sd]/.test(G) && f.setAttribute("rowlines", G.trim()),
      x !== "" &&
        ((f = new M.MathNode("menclose", [f])),
        f.setAttribute("notation", x.trim())),
      e.arraystretch &&
        e.arraystretch < 1 &&
        ((f = new M.MathNode("mstyle", [f])),
        f.setAttribute("scriptlevel", "1")),
      f
    );
  },
  Da = function (e, t) {
    e.envName.indexOf("ed") === -1 && je(e);
    var a = [],
      n = e.envName.indexOf("at") > -1 ? "alignat" : "align",
      i = e.envName === "split",
      o = j0(
        e.parser,
        {
          cols: a,
          addJot: !0,
          autoTag: i ? void 0 : Xt(e.envName),
          emptySingleRow: !0,
          colSeparationType: n,
          maxNumCols: i ? 2 : void 0,
          leqno: e.parser.settings.leqno,
        },
        "display"
      ),
      u,
      c = 0,
      d = { type: "ordgroup", mode: e.mode, body: [] };
    if (t[0] && t[0].type === "ordgroup") {
      for (var f = "", g = 0; g < t[0].body.length; g++) {
        var x = H(t[0].body[g], "textord");
        f += x.text;
      }
      (u = Number(f)), (c = u * 2);
    }
    var y = !c;
    o.body.forEach(function (B) {
      for (var R = 1; R < B.length; R += 2) {
        var E = H(B[R], "styling"),
          P = H(E.body[0], "ordgroup");
        P.body.unshift(d);
      }
      if (y) c < B.length && (c = B.length);
      else {
        var L = B.length / 2;
        if (u < L)
          throw new T(
            "Too many math in a row: " + ("expected " + u + ", but got " + L),
            B[0]
          );
      }
    });
    for (var S = 0; S < c; ++S) {
      var k = "r",
        C = 0;
      S % 2 === 1 ? (k = "l") : S > 0 && y && (C = 1),
        (a[S] = { type: "align", align: k, pregap: C, postgap: 0 });
    }
    return (o.colSeparationType = y ? "align" : "alignat"), o;
  };
T0({
  type: "array",
  names: ["array", "darray"],
  props: { numArgs: 1 },
  handler(r, e) {
    var t = Ye(e[0]),
      a = t ? [e[0]] : H(e[0], "ordgroup").body,
      n = a.map(function (o) {
        var u = Gt(o),
          c = u.text;
        if ("lcr".indexOf(c) !== -1) return { type: "align", align: c };
        if (c === "|") return { type: "separator", separator: "|" };
        if (c === ":") return { type: "separator", separator: ":" };
        throw new T("Unknown column alignment: " + c, o);
      }),
      i = { cols: n, hskipBeforeAndAfter: !0, maxNumCols: n.length };
    return j0(r.parser, i, jt(r.envName));
  },
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: [
    "matrix",
    "pmatrix",
    "bmatrix",
    "Bmatrix",
    "vmatrix",
    "Vmatrix",
    "matrix*",
    "pmatrix*",
    "bmatrix*",
    "Bmatrix*",
    "vmatrix*",
    "Vmatrix*",
  ],
  props: { numArgs: 0 },
  handler(r) {
    var e = {
        matrix: null,
        pmatrix: ["(", ")"],
        bmatrix: ["[", "]"],
        Bmatrix: ["\\{", "\\}"],
        vmatrix: ["|", "|"],
        Vmatrix: ["\\Vert", "\\Vert"],
      }[r.envName.replace("*", "")],
      t = "c",
      a = { hskipBeforeAndAfter: !1, cols: [{ type: "align", align: t }] };
    if (r.envName.charAt(r.envName.length - 1) === "*") {
      var n = r.parser;
      if ((n.consumeSpaces(), n.fetch().text === "[")) {
        if (
          (n.consume(),
          n.consumeSpaces(),
          (t = n.fetch().text),
          "lcr".indexOf(t) === -1)
        )
          throw new T("Expected l or c or r", n.nextToken);
        n.consume(),
          n.consumeSpaces(),
          n.expect("]"),
          n.consume(),
          (a.cols = [{ type: "align", align: t }]);
      }
    }
    var i = j0(r.parser, a, jt(r.envName)),
      o = Math.max(0, ...i.body.map((u) => u.length));
    return (
      (i.cols = new Array(o).fill({ type: "align", align: t })),
      e
        ? {
            type: "leftright",
            mode: r.mode,
            body: [i],
            left: e[0],
            right: e[1],
            rightColor: void 0,
          }
        : i
    );
  },
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: ["smallmatrix"],
  props: { numArgs: 0 },
  handler(r) {
    var e = { arraystretch: 0.5 },
      t = j0(r.parser, e, "script");
    return (t.colSeparationType = "small"), t;
  },
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: ["subarray"],
  props: { numArgs: 1 },
  handler(r, e) {
    var t = Ye(e[0]),
      a = t ? [e[0]] : H(e[0], "ordgroup").body,
      n = a.map(function (o) {
        var u = Gt(o),
          c = u.text;
        if ("lc".indexOf(c) !== -1) return { type: "align", align: c };
        throw new T("Unknown column alignment: " + c, o);
      });
    if (n.length > 1) throw new T("{subarray} can contain only one column");
    var i = { cols: n, hskipBeforeAndAfter: !1, arraystretch: 0.5 };
    if (
      ((i = j0(r.parser, i, "script")),
      i.body.length > 0 && i.body[0].length > 1)
    )
      throw new T("{subarray} can contain only one column");
    return i;
  },
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: ["cases", "dcases", "rcases", "drcases"],
  props: { numArgs: 0 },
  handler(r) {
    var e = {
        arraystretch: 1.2,
        cols: [
          { type: "align", align: "l", pregap: 0, postgap: 1 },
          { type: "align", align: "l", pregap: 0, postgap: 0 },
        ],
      },
      t = j0(r.parser, e, jt(r.envName));
    return {
      type: "leftright",
      mode: r.mode,
      body: [t],
      left: r.envName.indexOf("r") > -1 ? "." : "\\{",
      right: r.envName.indexOf("r") > -1 ? "\\}" : ".",
      rightColor: void 0,
    };
  },
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: ["align", "align*", "aligned", "split"],
  props: { numArgs: 0 },
  handler: Da,
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: ["gathered", "gather", "gather*"],
  props: { numArgs: 0 },
  handler(r) {
    I.contains(["gather", "gather*"], r.envName) && je(r);
    var e = {
      cols: [{ type: "align", align: "c" }],
      addJot: !0,
      colSeparationType: "gather",
      autoTag: Xt(r.envName),
      emptySingleRow: !0,
      leqno: r.parser.settings.leqno,
    };
    return j0(r.parser, e, "display");
  },
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: ["alignat", "alignat*", "alignedat"],
  props: { numArgs: 1 },
  handler: Da,
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: ["equation", "equation*"],
  props: { numArgs: 0 },
  handler(r) {
    je(r);
    var e = {
      autoTag: Xt(r.envName),
      emptySingleRow: !0,
      singleRow: !0,
      maxNumCols: 1,
      leqno: r.parser.settings.leqno,
    };
    return j0(r.parser, e, "display");
  },
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
T0({
  type: "array",
  names: ["CD"],
  props: { numArgs: 0 },
  handler(r) {
    return je(r), mi(r.parser);
  },
  htmlBuilder: z0,
  mathmlBuilder: B0,
});
m("\\nonumber", "\\gdef\\@eqnsw{0}");
m("\\notag", "\\nonumber");
D({
  type: "text",
  names: ["\\hline", "\\hdashline"],
  props: { numArgs: 0, allowedInText: !0, allowedInMath: !0 },
  handler(r, e) {
    throw new T(r.funcName + " valid only within array environment");
  },
});
var Tr = Ba;
D({
  type: "environment",
  names: ["\\begin", "\\end"],
  props: { numArgs: 1, argTypes: ["text"] },
  handler(r, e) {
    var { parser: t, funcName: a } = r,
      n = e[0];
    if (n.type !== "ordgroup") throw new T("Invalid environment name", n);
    for (var i = "", o = 0; o < n.body.length; ++o)
      i += H(n.body[o], "textord").text;
    if (a === "\\begin") {
      if (!Tr.hasOwnProperty(i)) throw new T("No such environment: " + i, n);
      var u = Tr[i],
        { args: c, optArgs: d } = t.parseArguments("\\begin{" + i + "}", u),
        f = { mode: t.mode, envName: i, parser: t },
        g = u.handler(f, c, d);
      t.expect("\\end", !1);
      var x = t.nextToken,
        y = H(t.parseFunction(), "environment");
      if (y.name !== i)
        throw new T(
          "Mismatch: \\begin{" + i + "} matched by \\end{" + y.name + "}",
          x
        );
      return g;
    }
    return { type: "environment", mode: t.mode, name: i, nameGroup: n };
  },
});
var Na = (r, e) => {
    var t = r.font,
      a = e.withFont(t);
    return V(r.body, a);
  },
  Ea = (r, e) => {
    var t = r.font,
      a = e.withFont(t);
    return Q(r.body, a);
  },
  zr = {
    "\\Bbb": "\\mathbb",
    "\\bold": "\\mathbf",
    "\\frak": "\\mathfrak",
    "\\bm": "\\boldsymbol",
  };
D({
  type: "font",
  names: [
    "\\mathrm",
    "\\mathit",
    "\\mathbf",
    "\\mathnormal",
    "\\mathsfit",
    "\\mathbb",
    "\\mathcal",
    "\\mathfrak",
    "\\mathscr",
    "\\mathsf",
    "\\mathtt",
    "\\Bbb",
    "\\bold",
    "\\frak",
  ],
  props: { numArgs: 1, allowedInArgument: !0 },
  handler: (r, e) => {
    var { parser: t, funcName: a } = r,
      n = Ge(e[0]),
      i = a;
    return (
      i in zr && (i = zr[i]),
      { type: "font", mode: t.mode, font: i.slice(1), body: n }
    );
  },
  htmlBuilder: Na,
  mathmlBuilder: Ea,
});
D({
  type: "mclass",
  names: ["\\boldsymbol", "\\bm"],
  props: { numArgs: 1 },
  handler: (r, e) => {
    var { parser: t } = r,
      a = e[0],
      n = I.isCharacterBox(a);
    return {
      type: "mclass",
      mode: t.mode,
      mclass: Qe(a),
      body: [{ type: "font", mode: t.mode, font: "boldsymbol", body: a }],
      isCharacterBox: n,
    };
  },
});
D({
  type: "font",
  names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
  props: { numArgs: 0, allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t, funcName: a, breakOnTokenText: n } = r,
      { mode: i } = t,
      o = t.parseExpression(!0, n),
      u = "math" + a.slice(1);
    return {
      type: "font",
      mode: i,
      font: u,
      body: { type: "ordgroup", mode: t.mode, body: o },
    };
  },
  htmlBuilder: Na,
  mathmlBuilder: Ea,
});
var Ra = (r, e) => {
    var t = e;
    return (
      r === "display"
        ? (t = t.id >= q.SCRIPT.id ? t.text() : q.DISPLAY)
        : r === "text" && t.size === q.DISPLAY.size
        ? (t = q.TEXT)
        : r === "script"
        ? (t = q.SCRIPT)
        : r === "scriptscript" && (t = q.SCRIPTSCRIPT),
      t
    );
  },
  Kt = (r, e) => {
    var t = Ra(r.size, e.style),
      a = t.fracNum(),
      n = t.fracDen(),
      i;
    i = e.havingStyle(a);
    var o = V(r.numer, i, e);
    if (r.continued) {
      var u = 8.5 / e.fontMetrics().ptPerEm,
        c = 3.5 / e.fontMetrics().ptPerEm;
      (o.height = o.height < u ? u : o.height),
        (o.depth = o.depth < c ? c : o.depth);
    }
    i = e.havingStyle(n);
    var d = V(r.denom, i, e),
      f,
      g,
      x;
    r.hasBarLine
      ? (r.barSize
          ? ((g = Z(r.barSize, e)), (f = w.makeLineSpan("frac-line", e, g)))
          : (f = w.makeLineSpan("frac-line", e)),
        (g = f.height),
        (x = f.height))
      : ((f = null), (g = 0), (x = e.fontMetrics().defaultRuleThickness));
    var y, S, k;
    t.size === q.DISPLAY.size || r.size === "display"
      ? ((y = e.fontMetrics().num1),
        g > 0 ? (S = 3 * x) : (S = 7 * x),
        (k = e.fontMetrics().denom1))
      : (g > 0
          ? ((y = e.fontMetrics().num2), (S = x))
          : ((y = e.fontMetrics().num3), (S = 3 * x)),
        (k = e.fontMetrics().denom2));
    var C;
    if (f) {
      var R = e.fontMetrics().axisHeight;
      y - o.depth - (R + 0.5 * g) < S &&
        (y += S - (y - o.depth - (R + 0.5 * g))),
        R - 0.5 * g - (d.height - k) < S &&
          (k += S - (R - 0.5 * g - (d.height - k)));
      var E = -(R - 0.5 * g);
      C = w.makeVList(
        {
          positionType: "individualShift",
          children: [
            { type: "elem", elem: d, shift: k },
            { type: "elem", elem: f, shift: E },
            { type: "elem", elem: o, shift: -y },
          ],
        },
        e
      );
    } else {
      var B = y - o.depth - (d.height - k);
      B < S && ((y += 0.5 * (S - B)), (k += 0.5 * (S - B))),
        (C = w.makeVList(
          {
            positionType: "individualShift",
            children: [
              { type: "elem", elem: d, shift: k },
              { type: "elem", elem: o, shift: -y },
            ],
          },
          e
        ));
    }
    (i = e.havingStyle(t)),
      (C.height *= i.sizeMultiplier / e.sizeMultiplier),
      (C.depth *= i.sizeMultiplier / e.sizeMultiplier);
    var P;
    t.size === q.DISPLAY.size
      ? (P = e.fontMetrics().delim1)
      : t.size === q.SCRIPTSCRIPT.size
      ? (P = e.havingStyle(q.SCRIPT).fontMetrics().delim2)
      : (P = e.fontMetrics().delim2);
    var L, U;
    return (
      r.leftDelim == null
        ? (L = ge(e, ["mopen"]))
        : (L = I0.customSizedDelim(
            r.leftDelim,
            P,
            !0,
            e.havingStyle(t),
            r.mode,
            ["mopen"]
          )),
      r.continued
        ? (U = w.makeSpan([]))
        : r.rightDelim == null
        ? (U = ge(e, ["mclose"]))
        : (U = I0.customSizedDelim(
            r.rightDelim,
            P,
            !0,
            e.havingStyle(t),
            r.mode,
            ["mclose"]
          )),
      w.makeSpan(
        ["mord"].concat(i.sizingClasses(e)),
        [L, w.makeSpan(["mfrac"], [C]), U],
        e
      )
    );
  },
  Zt = (r, e) => {
    var t = new M.MathNode("mfrac", [Q(r.numer, e), Q(r.denom, e)]);
    if (!r.hasBarLine) t.setAttribute("linethickness", "0px");
    else if (r.barSize) {
      var a = Z(r.barSize, e);
      t.setAttribute("linethickness", z(a));
    }
    var n = Ra(r.size, e.style);
    if (n.size !== e.style.size) {
      t = new M.MathNode("mstyle", [t]);
      var i = n.size === q.DISPLAY.size ? "true" : "false";
      t.setAttribute("displaystyle", i), t.setAttribute("scriptlevel", "0");
    }
    if (r.leftDelim != null || r.rightDelim != null) {
      var o = [];
      if (r.leftDelim != null) {
        var u = new M.MathNode("mo", [
          new M.TextNode(r.leftDelim.replace("\\", "")),
        ]);
        u.setAttribute("fence", "true"), o.push(u);
      }
      if ((o.push(t), r.rightDelim != null)) {
        var c = new M.MathNode("mo", [
          new M.TextNode(r.rightDelim.replace("\\", "")),
        ]);
        c.setAttribute("fence", "true"), o.push(c);
      }
      return Pt(o);
    }
    return t;
  };
D({
  type: "genfrac",
  names: [
    "\\dfrac",
    "\\frac",
    "\\tfrac",
    "\\dbinom",
    "\\binom",
    "\\tbinom",
    "\\\\atopfrac",
    "\\\\bracefrac",
    "\\\\brackfrac",
  ],
  props: { numArgs: 2, allowedInArgument: !0 },
  handler: (r, e) => {
    var { parser: t, funcName: a } = r,
      n = e[0],
      i = e[1],
      o,
      u = null,
      c = null,
      d = "auto";
    switch (a) {
      case "\\dfrac":
      case "\\frac":
      case "\\tfrac":
        o = !0;
        break;
      case "\\\\atopfrac":
        o = !1;
        break;
      case "\\dbinom":
      case "\\binom":
      case "\\tbinom":
        (o = !1), (u = "("), (c = ")");
        break;
      case "\\\\bracefrac":
        (o = !1), (u = "\\{"), (c = "\\}");
        break;
      case "\\\\brackfrac":
        (o = !1), (u = "["), (c = "]");
        break;
      default:
        throw new Error("Unrecognized genfrac command");
    }
    switch (a) {
      case "\\dfrac":
      case "\\dbinom":
        d = "display";
        break;
      case "\\tfrac":
      case "\\tbinom":
        d = "text";
        break;
    }
    return {
      type: "genfrac",
      mode: t.mode,
      continued: !1,
      numer: n,
      denom: i,
      hasBarLine: o,
      leftDelim: u,
      rightDelim: c,
      size: d,
      barSize: null,
    };
  },
  htmlBuilder: Kt,
  mathmlBuilder: Zt,
});
D({
  type: "genfrac",
  names: ["\\cfrac"],
  props: { numArgs: 2 },
  handler: (r, e) => {
    var { parser: t, funcName: a } = r,
      n = e[0],
      i = e[1];
    return {
      type: "genfrac",
      mode: t.mode,
      continued: !0,
      numer: n,
      denom: i,
      hasBarLine: !0,
      leftDelim: null,
      rightDelim: null,
      size: "display",
      barSize: null,
    };
  },
});
D({
  type: "infix",
  names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
  props: { numArgs: 0, infix: !0 },
  handler(r) {
    var { parser: e, funcName: t, token: a } = r,
      n;
    switch (t) {
      case "\\over":
        n = "\\frac";
        break;
      case "\\choose":
        n = "\\binom";
        break;
      case "\\atop":
        n = "\\\\atopfrac";
        break;
      case "\\brace":
        n = "\\\\bracefrac";
        break;
      case "\\brack":
        n = "\\\\brackfrac";
        break;
      default:
        throw new Error("Unrecognized infix genfrac command");
    }
    return { type: "infix", mode: e.mode, replaceWith: n, token: a };
  },
});
var Br = ["display", "text", "script", "scriptscript"],
  Cr = function (e) {
    var t = null;
    return e.length > 0 && ((t = e), (t = t === "." ? null : t)), t;
  };
D({
  type: "genfrac",
  names: ["\\genfrac"],
  props: {
    numArgs: 6,
    allowedInArgument: !0,
    argTypes: ["math", "math", "size", "text", "math", "math"],
  },
  handler(r, e) {
    var { parser: t } = r,
      a = e[4],
      n = e[5],
      i = Ge(e[0]),
      o = i.type === "atom" && i.family === "open" ? Cr(i.text) : null,
      u = Ge(e[1]),
      c = u.type === "atom" && u.family === "close" ? Cr(u.text) : null,
      d = H(e[2], "size"),
      f,
      g = null;
    d.isBlank ? (f = !0) : ((g = d.value), (f = g.number > 0));
    var x = "auto",
      y = e[3];
    if (y.type === "ordgroup") {
      if (y.body.length > 0) {
        var S = H(y.body[0], "textord");
        x = Br[Number(S.text)];
      }
    } else (y = H(y, "textord")), (x = Br[Number(y.text)]);
    return {
      type: "genfrac",
      mode: t.mode,
      numer: a,
      denom: n,
      continued: !1,
      hasBarLine: f,
      barSize: g,
      leftDelim: o,
      rightDelim: c,
      size: x,
    };
  },
  htmlBuilder: Kt,
  mathmlBuilder: Zt,
});
D({
  type: "infix",
  names: ["\\above"],
  props: { numArgs: 1, argTypes: ["size"], infix: !0 },
  handler(r, e) {
    var { parser: t, funcName: a, token: n } = r;
    return {
      type: "infix",
      mode: t.mode,
      replaceWith: "\\\\abovefrac",
      size: H(e[0], "size").value,
      token: n,
    };
  },
});
D({
  type: "genfrac",
  names: ["\\\\abovefrac"],
  props: { numArgs: 3, argTypes: ["math", "size", "math"] },
  handler: (r, e) => {
    var { parser: t, funcName: a } = r,
      n = e[0],
      i = tn(H(e[1], "infix").size),
      o = e[2],
      u = i.number > 0;
    return {
      type: "genfrac",
      mode: t.mode,
      numer: n,
      denom: o,
      continued: !1,
      hasBarLine: u,
      barSize: i,
      leftDelim: null,
      rightDelim: null,
      size: "auto",
    };
  },
  htmlBuilder: Kt,
  mathmlBuilder: Zt,
});
var Ia = (r, e) => {
    var t = e.style,
      a,
      n;
    r.type === "supsub"
      ? ((a = r.sup
          ? V(r.sup, e.havingStyle(t.sup()), e)
          : V(r.sub, e.havingStyle(t.sub()), e)),
        (n = H(r.base, "horizBrace")))
      : (n = H(r, "horizBrace"));
    var i = V(n.base, e.havingBaseStyle(q.DISPLAY)),
      o = L0.svgSpan(n, e),
      u;
    if (
      (n.isOver
        ? ((u = w.makeVList(
            {
              positionType: "firstBaseline",
              children: [
                { type: "elem", elem: i },
                { type: "kern", size: 0.1 },
                { type: "elem", elem: o },
              ],
            },
            e
          )),
          u.children[0].children[0].children[1].classes.push("svg-align"))
        : ((u = w.makeVList(
            {
              positionType: "bottom",
              positionData: i.depth + 0.1 + o.height,
              children: [
                { type: "elem", elem: o },
                { type: "kern", size: 0.1 },
                { type: "elem", elem: i },
              ],
            },
            e
          )),
          u.children[0].children[0].children[0].classes.push("svg-align")),
      a)
    ) {
      var c = w.makeSpan(["mord", n.isOver ? "mover" : "munder"], [u], e);
      n.isOver
        ? (u = w.makeVList(
            {
              positionType: "firstBaseline",
              children: [
                { type: "elem", elem: c },
                { type: "kern", size: 0.2 },
                { type: "elem", elem: a },
              ],
            },
            e
          ))
        : (u = w.makeVList(
            {
              positionType: "bottom",
              positionData: c.depth + 0.2 + a.height + a.depth,
              children: [
                { type: "elem", elem: a },
                { type: "kern", size: 0.2 },
                { type: "elem", elem: c },
              ],
            },
            e
          ));
    }
    return w.makeSpan(["mord", n.isOver ? "mover" : "munder"], [u], e);
  },
  zi = (r, e) => {
    var t = L0.mathMLnode(r.label);
    return new M.MathNode(r.isOver ? "mover" : "munder", [Q(r.base, e), t]);
  };
D({
  type: "horizBrace",
  names: ["\\overbrace", "\\underbrace"],
  props: { numArgs: 1 },
  handler(r, e) {
    var { parser: t, funcName: a } = r;
    return {
      type: "horizBrace",
      mode: t.mode,
      label: a,
      isOver: /^\\over/.test(a),
      base: e[0],
    };
  },
  htmlBuilder: Ia,
  mathmlBuilder: zi,
});
D({
  type: "href",
  names: ["\\href"],
  props: { numArgs: 2, argTypes: ["url", "original"], allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t } = r,
      a = e[1],
      n = H(e[0], "url").url;
    return t.settings.isTrusted({ command: "\\href", url: n })
      ? { type: "href", mode: t.mode, href: n, body: $(a) }
      : t.formatUnsupportedCmd("\\href");
  },
  htmlBuilder: (r, e) => {
    var t = t0(r.body, e, !1);
    return w.makeAnchor(r.href, [], t, e);
  },
  mathmlBuilder: (r, e) => {
    var t = X0(r.body, e);
    return (
      t instanceof m0 || (t = new m0("mrow", [t])),
      t.setAttribute("href", r.href),
      t
    );
  },
});
D({
  type: "href",
  names: ["\\url"],
  props: { numArgs: 1, argTypes: ["url"], allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t } = r,
      a = H(e[0], "url").url;
    if (!t.settings.isTrusted({ command: "\\url", url: a }))
      return t.formatUnsupportedCmd("\\url");
    for (var n = [], i = 0; i < a.length; i++) {
      var o = a[i];
      o === "~" && (o = "\\textasciitilde"),
        n.push({ type: "textord", mode: "text", text: o });
    }
    var u = { type: "text", mode: t.mode, font: "\\texttt", body: n };
    return { type: "href", mode: t.mode, href: a, body: $(u) };
  },
});
D({
  type: "hbox",
  names: ["\\hbox"],
  props: { numArgs: 1, argTypes: ["text"], allowedInText: !0, primitive: !0 },
  handler(r, e) {
    var { parser: t } = r;
    return { type: "hbox", mode: t.mode, body: $(e[0]) };
  },
  htmlBuilder(r, e) {
    var t = t0(r.body, e, !1);
    return w.makeFragment(t);
  },
  mathmlBuilder(r, e) {
    return new M.MathNode("mrow", h0(r.body, e));
  },
});
D({
  type: "html",
  names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
  props: { numArgs: 2, argTypes: ["raw", "original"], allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t, funcName: a, token: n } = r,
      i = H(e[0], "raw").string,
      o = e[1];
    t.settings.strict &&
      t.settings.reportNonstrict(
        "htmlExtension",
        "HTML extension is disabled on strict mode"
      );
    var u,
      c = {};
    switch (a) {
      case "\\htmlClass":
        (c.class = i), (u = { command: "\\htmlClass", class: i });
        break;
      case "\\htmlId":
        (c.id = i), (u = { command: "\\htmlId", id: i });
        break;
      case "\\htmlStyle":
        (c.style = i), (u = { command: "\\htmlStyle", style: i });
        break;
      case "\\htmlData": {
        for (var d = i.split(","), f = 0; f < d.length; f++) {
          var g = d[f].split("=");
          if (g.length !== 2)
            throw new T("Error parsing key-value for \\htmlData");
          c["data-" + g[0].trim()] = g[1].trim();
        }
        u = { command: "\\htmlData", attributes: c };
        break;
      }
      default:
        throw new Error("Unrecognized html command");
    }
    return t.settings.isTrusted(u)
      ? { type: "html", mode: t.mode, attributes: c, body: $(o) }
      : t.formatUnsupportedCmd(a);
  },
  htmlBuilder: (r, e) => {
    var t = t0(r.body, e, !1),
      a = ["enclosing"];
    r.attributes.class && a.push(...r.attributes.class.trim().split(/\s+/));
    var n = w.makeSpan(a, t, e);
    for (var i in r.attributes)
      i !== "class" &&
        r.attributes.hasOwnProperty(i) &&
        n.setAttribute(i, r.attributes[i]);
    return n;
  },
  mathmlBuilder: (r, e) => X0(r.body, e),
});
D({
  type: "htmlmathml",
  names: ["\\html@mathml"],
  props: { numArgs: 2, allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t } = r;
    return { type: "htmlmathml", mode: t.mode, html: $(e[0]), mathml: $(e[1]) };
  },
  htmlBuilder: (r, e) => {
    var t = t0(r.html, e, !1);
    return w.makeFragment(t);
  },
  mathmlBuilder: (r, e) => X0(r.mathml, e),
});
var dt = function (e) {
  if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e)) return { number: +e, unit: "bp" };
  var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
  if (!t) throw new T("Invalid size: '" + e + "' in \\includegraphics");
  var a = { number: +(t[1] + t[2]), unit: t[3] };
  if (!_r(a))
    throw new T("Invalid unit: '" + a.unit + "' in \\includegraphics.");
  return a;
};
D({
  type: "includegraphics",
  names: ["\\includegraphics"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1,
    argTypes: ["raw", "url"],
    allowedInText: !1,
  },
  handler: (r, e, t) => {
    var { parser: a } = r,
      n = { number: 0, unit: "em" },
      i = { number: 0.9, unit: "em" },
      o = { number: 0, unit: "em" },
      u = "";
    if (t[0])
      for (
        var c = H(t[0], "raw").string, d = c.split(","), f = 0;
        f < d.length;
        f++
      ) {
        var g = d[f].split("=");
        if (g.length === 2) {
          var x = g[1].trim();
          switch (g[0].trim()) {
            case "alt":
              u = x;
              break;
            case "width":
              n = dt(x);
              break;
            case "height":
              i = dt(x);
              break;
            case "totalheight":
              o = dt(x);
              break;
            default:
              throw new T("Invalid key: '" + g[0] + "' in \\includegraphics.");
          }
        }
      }
    var y = H(e[0], "url").url;
    return (
      u === "" &&
        ((u = y),
        (u = u.replace(/^.*[\\/]/, "")),
        (u = u.substring(0, u.lastIndexOf(".")))),
      a.settings.isTrusted({ command: "\\includegraphics", url: y })
        ? {
            type: "includegraphics",
            mode: a.mode,
            alt: u,
            width: n,
            height: i,
            totalheight: o,
            src: y,
          }
        : a.formatUnsupportedCmd("\\includegraphics")
    );
  },
  htmlBuilder: (r, e) => {
    var t = Z(r.height, e),
      a = 0;
    r.totalheight.number > 0 && (a = Z(r.totalheight, e) - t);
    var n = 0;
    r.width.number > 0 && (n = Z(r.width, e));
    var i = { height: z(t + a) };
    n > 0 && (i.width = z(n)), a > 0 && (i.verticalAlign = z(-a));
    var o = new zn(r.src, r.alt, i);
    return (o.height = t), (o.depth = a), o;
  },
  mathmlBuilder: (r, e) => {
    var t = new M.MathNode("mglyph", []);
    t.setAttribute("alt", r.alt);
    var a = Z(r.height, e),
      n = 0;
    if (
      (r.totalheight.number > 0 &&
        ((n = Z(r.totalheight, e) - a), t.setAttribute("valign", z(-n))),
      t.setAttribute("height", z(a + n)),
      r.width.number > 0)
    ) {
      var i = Z(r.width, e);
      t.setAttribute("width", z(i));
    }
    return t.setAttribute("src", r.src), t;
  },
});
D({
  type: "kern",
  names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
  props: { numArgs: 1, argTypes: ["size"], primitive: !0, allowedInText: !0 },
  handler(r, e) {
    var { parser: t, funcName: a } = r,
      n = H(e[0], "size");
    if (t.settings.strict) {
      var i = a[1] === "m",
        o = n.value.unit === "mu";
      i
        ? (o ||
            t.settings.reportNonstrict(
              "mathVsTextUnits",
              "LaTeX's " +
                a +
                " supports only mu units, " +
                ("not " + n.value.unit + " units")
            ),
          t.mode !== "math" &&
            t.settings.reportNonstrict(
              "mathVsTextUnits",
              "LaTeX's " + a + " works only in math mode"
            ))
        : o &&
          t.settings.reportNonstrict(
            "mathVsTextUnits",
            "LaTeX's " + a + " doesn't support mu units"
          );
    }
    return { type: "kern", mode: t.mode, dimension: n.value };
  },
  htmlBuilder(r, e) {
    return w.makeGlue(r.dimension, e);
  },
  mathmlBuilder(r, e) {
    var t = Z(r.dimension, e);
    return new M.SpaceNode(t);
  },
});
D({
  type: "lap",
  names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
  props: { numArgs: 1, allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t, funcName: a } = r,
      n = e[0];
    return { type: "lap", mode: t.mode, alignment: a.slice(5), body: n };
  },
  htmlBuilder: (r, e) => {
    var t;
    r.alignment === "clap"
      ? ((t = w.makeSpan([], [V(r.body, e)])),
        (t = w.makeSpan(["inner"], [t], e)))
      : (t = w.makeSpan(["inner"], [V(r.body, e)]));
    var a = w.makeSpan(["fix"], []),
      n = w.makeSpan([r.alignment], [t, a], e),
      i = w.makeSpan(["strut"]);
    return (
      (i.style.height = z(n.height + n.depth)),
      n.depth && (i.style.verticalAlign = z(-n.depth)),
      n.children.unshift(i),
      (n = w.makeSpan(["thinbox"], [n], e)),
      w.makeSpan(["mord", "vbox"], [n], e)
    );
  },
  mathmlBuilder: (r, e) => {
    var t = new M.MathNode("mpadded", [Q(r.body, e)]);
    if (r.alignment !== "rlap") {
      var a = r.alignment === "llap" ? "-1" : "-0.5";
      t.setAttribute("lspace", a + "width");
    }
    return t.setAttribute("width", "0px"), t;
  },
});
D({
  type: "styling",
  names: ["\\(", "$"],
  props: { numArgs: 0, allowedInText: !0, allowedInMath: !1 },
  handler(r, e) {
    var { funcName: t, parser: a } = r,
      n = a.mode;
    a.switchMode("math");
    var i = t === "\\(" ? "\\)" : "$",
      o = a.parseExpression(!1, i);
    return (
      a.expect(i),
      a.switchMode(n),
      { type: "styling", mode: a.mode, style: "text", body: o }
    );
  },
});
D({
  type: "text",
  names: ["\\)", "\\]"],
  props: { numArgs: 0, allowedInText: !0, allowedInMath: !1 },
  handler(r, e) {
    throw new T("Mismatched " + r.funcName);
  },
});
var Dr = (r, e) => {
  switch (e.style.size) {
    case q.DISPLAY.size:
      return r.display;
    case q.TEXT.size:
      return r.text;
    case q.SCRIPT.size:
      return r.script;
    case q.SCRIPTSCRIPT.size:
      return r.scriptscript;
    default:
      return r.text;
  }
};
D({
  type: "mathchoice",
  names: ["\\mathchoice"],
  props: { numArgs: 4, primitive: !0 },
  handler: (r, e) => {
    var { parser: t } = r;
    return {
      type: "mathchoice",
      mode: t.mode,
      display: $(e[0]),
      text: $(e[1]),
      script: $(e[2]),
      scriptscript: $(e[3]),
    };
  },
  htmlBuilder: (r, e) => {
    var t = Dr(r, e),
      a = t0(t, e, !1);
    return w.makeFragment(a);
  },
  mathmlBuilder: (r, e) => {
    var t = Dr(r, e);
    return X0(t, e);
  },
});
var Oa = (r, e, t, a, n, i, o) => {
    r = w.makeSpan([], [r]);
    var u = t && I.isCharacterBox(t),
      c,
      d;
    if (e) {
      var f = V(e, a.havingStyle(n.sup()), a);
      d = {
        elem: f,
        kern: Math.max(
          a.fontMetrics().bigOpSpacing1,
          a.fontMetrics().bigOpSpacing3 - f.depth
        ),
      };
    }
    if (t) {
      var g = V(t, a.havingStyle(n.sub()), a);
      c = {
        elem: g,
        kern: Math.max(
          a.fontMetrics().bigOpSpacing2,
          a.fontMetrics().bigOpSpacing4 - g.height
        ),
      };
    }
    var x;
    if (d && c) {
      var y =
        a.fontMetrics().bigOpSpacing5 +
        c.elem.height +
        c.elem.depth +
        c.kern +
        r.depth +
        o;
      x = w.makeVList(
        {
          positionType: "bottom",
          positionData: y,
          children: [
            { type: "kern", size: a.fontMetrics().bigOpSpacing5 },
            { type: "elem", elem: c.elem, marginLeft: z(-i) },
            { type: "kern", size: c.kern },
            { type: "elem", elem: r },
            { type: "kern", size: d.kern },
            { type: "elem", elem: d.elem, marginLeft: z(i) },
            { type: "kern", size: a.fontMetrics().bigOpSpacing5 },
          ],
        },
        a
      );
    } else if (c) {
      var S = r.height - o;
      x = w.makeVList(
        {
          positionType: "top",
          positionData: S,
          children: [
            { type: "kern", size: a.fontMetrics().bigOpSpacing5 },
            { type: "elem", elem: c.elem, marginLeft: z(-i) },
            { type: "kern", size: c.kern },
            { type: "elem", elem: r },
          ],
        },
        a
      );
    } else if (d) {
      var k = r.depth + o;
      x = w.makeVList(
        {
          positionType: "bottom",
          positionData: k,
          children: [
            { type: "elem", elem: r },
            { type: "kern", size: d.kern },
            { type: "elem", elem: d.elem, marginLeft: z(i) },
            { type: "kern", size: a.fontMetrics().bigOpSpacing5 },
          ],
        },
        a
      );
    } else return r;
    var C = [x];
    if (c && i !== 0 && !u) {
      var B = w.makeSpan(["mspace"], [], a);
      (B.style.marginRight = z(i)), C.unshift(B);
    }
    return w.makeSpan(["mop", "op-limits"], C, a);
  },
  qa = ["\\smallint"],
  me = (r, e) => {
    var t,
      a,
      n = !1,
      i;
    r.type === "supsub"
      ? ((t = r.sup), (a = r.sub), (i = H(r.base, "op")), (n = !0))
      : (i = H(r, "op"));
    var o = e.style,
      u = !1;
    o.size === q.DISPLAY.size &&
      i.symbol &&
      !I.contains(qa, i.name) &&
      (u = !0);
    var c;
    if (i.symbol) {
      var d = u ? "Size2-Regular" : "Size1-Regular",
        f = "";
      if (
        ((i.name === "\\oiint" || i.name === "\\oiiint") &&
          ((f = i.name.slice(1)),
          (i.name = f === "oiint" ? "\\iint" : "\\iiint")),
        (c = w.makeSymbol(i.name, d, "math", e, [
          "mop",
          "op-symbol",
          u ? "large-op" : "small-op",
        ])),
        f.length > 0)
      ) {
        var g = c.italic,
          x = w.staticSvg(f + "Size" + (u ? "2" : "1"), e);
        (c = w.makeVList(
          {
            positionType: "individualShift",
            children: [
              { type: "elem", elem: c, shift: 0 },
              { type: "elem", elem: x, shift: u ? 0.08 : 0 },
            ],
          },
          e
        )),
          (i.name = "\\" + f),
          c.classes.unshift("mop"),
          (c.italic = g);
      }
    } else if (i.body) {
      var y = t0(i.body, e, !0);
      y.length === 1 && y[0] instanceof b0
        ? ((c = y[0]), (c.classes[0] = "mop"))
        : (c = w.makeSpan(["mop"], y, e));
    } else {
      for (var S = [], k = 1; k < i.name.length; k++)
        S.push(w.mathsym(i.name[k], i.mode, e));
      c = w.makeSpan(["mop"], S, e);
    }
    var C = 0,
      B = 0;
    return (
      (c instanceof b0 || i.name === "\\oiint" || i.name === "\\oiiint") &&
        !i.suppressBaseShift &&
        ((C = (c.height - c.depth) / 2 - e.fontMetrics().axisHeight),
        (B = c.italic)),
      n
        ? Oa(c, t, a, e, o, B, C)
        : (C && ((c.style.position = "relative"), (c.style.top = z(C))), c)
    );
  },
  we = (r, e) => {
    var t;
    if (r.symbol)
      (t = new m0("mo", [y0(r.name, r.mode)])),
        I.contains(qa, r.name) && t.setAttribute("largeop", "false");
    else if (r.body) t = new m0("mo", h0(r.body, e));
    else {
      t = new m0("mi", [new M0(r.name.slice(1))]);
      var a = new m0("mo", [y0("⁡", "text")]);
      r.parentIsSupSub ? (t = new m0("mrow", [t, a])) : (t = ha([t, a]));
    }
    return t;
  },
  Bi = {
    "∏": "\\prod",
    "∐": "\\coprod",
    "∑": "\\sum",
    "⋀": "\\bigwedge",
    "⋁": "\\bigvee",
    "⋂": "\\bigcap",
    "⋃": "\\bigcup",
    "⨀": "\\bigodot",
    "⨁": "\\bigoplus",
    "⨂": "\\bigotimes",
    "⨄": "\\biguplus",
    "⨆": "\\bigsqcup",
  };
D({
  type: "op",
  names: [
    "\\coprod",
    "\\bigvee",
    "\\bigwedge",
    "\\biguplus",
    "\\bigcap",
    "\\bigcup",
    "\\intop",
    "\\prod",
    "\\sum",
    "\\bigotimes",
    "\\bigoplus",
    "\\bigodot",
    "\\bigsqcup",
    "\\smallint",
    "∏",
    "∐",
    "∑",
    "⋀",
    "⋁",
    "⋂",
    "⋃",
    "⨀",
    "⨁",
    "⨂",
    "⨄",
    "⨆",
  ],
  props: { numArgs: 0 },
  handler: (r, e) => {
    var { parser: t, funcName: a } = r,
      n = a;
    return (
      n.length === 1 && (n = Bi[n]),
      {
        type: "op",
        mode: t.mode,
        limits: !0,
        parentIsSupSub: !1,
        symbol: !0,
        name: n,
      }
    );
  },
  htmlBuilder: me,
  mathmlBuilder: we,
});
D({
  type: "op",
  names: ["\\mathop"],
  props: { numArgs: 1, primitive: !0 },
  handler: (r, e) => {
    var { parser: t } = r,
      a = e[0];
    return {
      type: "op",
      mode: t.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      body: $(a),
    };
  },
  htmlBuilder: me,
  mathmlBuilder: we,
});
var Ci = {
  "∫": "\\int",
  "∬": "\\iint",
  "∭": "\\iiint",
  "∮": "\\oint",
  "∯": "\\oiint",
  "∰": "\\oiiint",
};
D({
  type: "op",
  names: [
    "\\arcsin",
    "\\arccos",
    "\\arctan",
    "\\arctg",
    "\\arcctg",
    "\\arg",
    "\\ch",
    "\\cos",
    "\\cosec",
    "\\cosh",
    "\\cot",
    "\\cotg",
    "\\coth",
    "\\csc",
    "\\ctg",
    "\\cth",
    "\\deg",
    "\\dim",
    "\\exp",
    "\\hom",
    "\\ker",
    "\\lg",
    "\\ln",
    "\\log",
    "\\sec",
    "\\sin",
    "\\sinh",
    "\\sh",
    "\\tan",
    "\\tanh",
    "\\tg",
    "\\th",
  ],
  props: { numArgs: 0 },
  handler(r) {
    var { parser: e, funcName: t } = r;
    return {
      type: "op",
      mode: e.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      name: t,
    };
  },
  htmlBuilder: me,
  mathmlBuilder: we,
});
D({
  type: "op",
  names: [
    "\\det",
    "\\gcd",
    "\\inf",
    "\\lim",
    "\\max",
    "\\min",
    "\\Pr",
    "\\sup",
  ],
  props: { numArgs: 0 },
  handler(r) {
    var { parser: e, funcName: t } = r;
    return {
      type: "op",
      mode: e.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !1,
      name: t,
    };
  },
  htmlBuilder: me,
  mathmlBuilder: we,
});
D({
  type: "op",
  names: [
    "\\int",
    "\\iint",
    "\\iiint",
    "\\oint",
    "\\oiint",
    "\\oiiint",
    "∫",
    "∬",
    "∭",
    "∮",
    "∯",
    "∰",
  ],
  props: { numArgs: 0 },
  handler(r) {
    var { parser: e, funcName: t } = r,
      a = t;
    return (
      a.length === 1 && (a = Ci[a]),
      {
        type: "op",
        mode: e.mode,
        limits: !1,
        parentIsSupSub: !1,
        symbol: !0,
        name: a,
      }
    );
  },
  htmlBuilder: me,
  mathmlBuilder: we,
});
var La = (r, e) => {
    var t,
      a,
      n = !1,
      i;
    r.type === "supsub"
      ? ((t = r.sup), (a = r.sub), (i = H(r.base, "operatorname")), (n = !0))
      : (i = H(r, "operatorname"));
    var o;
    if (i.body.length > 0) {
      for (
        var u = i.body.map((g) => {
            var x = g.text;
            return typeof x == "string"
              ? { type: "textord", mode: g.mode, text: x }
              : g;
          }),
          c = t0(u, e.withFont("mathrm"), !0),
          d = 0;
        d < c.length;
        d++
      ) {
        var f = c[d];
        f instanceof b0 &&
          (f.text = f.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
      }
      o = w.makeSpan(["mop"], c, e);
    } else o = w.makeSpan(["mop"], [], e);
    return n ? Oa(o, t, a, e, e.style, 0, 0) : o;
  },
  Di = (r, e) => {
    for (
      var t = h0(r.body, e.withFont("mathrm")), a = !0, n = 0;
      n < t.length;
      n++
    ) {
      var i = t[n];
      if (!(i instanceof M.SpaceNode))
        if (i instanceof M.MathNode)
          switch (i.type) {
            case "mi":
            case "mn":
            case "ms":
            case "mspace":
            case "mtext":
              break;
            case "mo": {
              var o = i.children[0];
              i.children.length === 1 && o instanceof M.TextNode
                ? (o.text = o.text
                    .replace(/\u2212/, "-")
                    .replace(/\u2217/, "*"))
                : (a = !1);
              break;
            }
            default:
              a = !1;
          }
        else a = !1;
    }
    if (a) {
      var u = t.map((f) => f.toText()).join("");
      t = [new M.TextNode(u)];
    }
    var c = new M.MathNode("mi", t);
    c.setAttribute("mathvariant", "normal");
    var d = new M.MathNode("mo", [y0("⁡", "text")]);
    return r.parentIsSupSub
      ? new M.MathNode("mrow", [c, d])
      : M.newDocumentFragment([c, d]);
  };
D({
  type: "operatorname",
  names: ["\\operatorname@", "\\operatornamewithlimits"],
  props: { numArgs: 1 },
  handler: (r, e) => {
    var { parser: t, funcName: a } = r,
      n = e[0];
    return {
      type: "operatorname",
      mode: t.mode,
      body: $(n),
      alwaysHandleSupSub: a === "\\operatornamewithlimits",
      limits: !1,
      parentIsSupSub: !1,
    };
  },
  htmlBuilder: La,
  mathmlBuilder: Di,
});
m("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
_0({
  type: "ordgroup",
  htmlBuilder(r, e) {
    return r.semisimple
      ? w.makeFragment(t0(r.body, e, !1))
      : w.makeSpan(["mord"], t0(r.body, e, !0), e);
  },
  mathmlBuilder(r, e) {
    return X0(r.body, e, !0);
  },
});
D({
  type: "overline",
  names: ["\\overline"],
  props: { numArgs: 1 },
  handler(r, e) {
    var { parser: t } = r,
      a = e[0];
    return { type: "overline", mode: t.mode, body: a };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e.havingCrampedStyle()),
      a = w.makeLineSpan("overline-line", e),
      n = e.fontMetrics().defaultRuleThickness,
      i = w.makeVList(
        {
          positionType: "firstBaseline",
          children: [
            { type: "elem", elem: t },
            { type: "kern", size: 3 * n },
            { type: "elem", elem: a },
            { type: "kern", size: n },
          ],
        },
        e
      );
    return w.makeSpan(["mord", "overline"], [i], e);
  },
  mathmlBuilder(r, e) {
    var t = new M.MathNode("mo", [new M.TextNode("‾")]);
    t.setAttribute("stretchy", "true");
    var a = new M.MathNode("mover", [Q(r.body, e), t]);
    return a.setAttribute("accent", "true"), a;
  },
});
D({
  type: "phantom",
  names: ["\\phantom"],
  props: { numArgs: 1, allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t } = r,
      a = e[0];
    return { type: "phantom", mode: t.mode, body: $(a) };
  },
  htmlBuilder: (r, e) => {
    var t = t0(r.body, e.withPhantom(), !1);
    return w.makeFragment(t);
  },
  mathmlBuilder: (r, e) => {
    var t = h0(r.body, e);
    return new M.MathNode("mphantom", t);
  },
});
D({
  type: "hphantom",
  names: ["\\hphantom"],
  props: { numArgs: 1, allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t } = r,
      a = e[0];
    return { type: "hphantom", mode: t.mode, body: a };
  },
  htmlBuilder: (r, e) => {
    var t = w.makeSpan([], [V(r.body, e.withPhantom())]);
    if (((t.height = 0), (t.depth = 0), t.children))
      for (var a = 0; a < t.children.length; a++)
        (t.children[a].height = 0), (t.children[a].depth = 0);
    return (
      (t = w.makeVList(
        {
          positionType: "firstBaseline",
          children: [{ type: "elem", elem: t }],
        },
        e
      )),
      w.makeSpan(["mord"], [t], e)
    );
  },
  mathmlBuilder: (r, e) => {
    var t = h0($(r.body), e),
      a = new M.MathNode("mphantom", t),
      n = new M.MathNode("mpadded", [a]);
    return n.setAttribute("height", "0px"), n.setAttribute("depth", "0px"), n;
  },
});
D({
  type: "vphantom",
  names: ["\\vphantom"],
  props: { numArgs: 1, allowedInText: !0 },
  handler: (r, e) => {
    var { parser: t } = r,
      a = e[0];
    return { type: "vphantom", mode: t.mode, body: a };
  },
  htmlBuilder: (r, e) => {
    var t = w.makeSpan(["inner"], [V(r.body, e.withPhantom())]),
      a = w.makeSpan(["fix"], []);
    return w.makeSpan(["mord", "rlap"], [t, a], e);
  },
  mathmlBuilder: (r, e) => {
    var t = h0($(r.body), e),
      a = new M.MathNode("mphantom", t),
      n = new M.MathNode("mpadded", [a]);
    return n.setAttribute("width", "0px"), n;
  },
});
D({
  type: "raisebox",
  names: ["\\raisebox"],
  props: { numArgs: 2, argTypes: ["size", "hbox"], allowedInText: !0 },
  handler(r, e) {
    var { parser: t } = r,
      a = H(e[0], "size").value,
      n = e[1];
    return { type: "raisebox", mode: t.mode, dy: a, body: n };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e),
      a = Z(r.dy, e);
    return w.makeVList(
      {
        positionType: "shift",
        positionData: -a,
        children: [{ type: "elem", elem: t }],
      },
      e
    );
  },
  mathmlBuilder(r, e) {
    var t = new M.MathNode("mpadded", [Q(r.body, e)]),
      a = r.dy.number + r.dy.unit;
    return t.setAttribute("voffset", a), t;
  },
});
D({
  type: "internal",
  names: ["\\relax"],
  props: { numArgs: 0, allowedInText: !0 },
  handler(r) {
    var { parser: e } = r;
    return { type: "internal", mode: e.mode };
  },
});
D({
  type: "rule",
  names: ["\\rule"],
  props: {
    numArgs: 2,
    numOptionalArgs: 1,
    allowedInText: !0,
    allowedInMath: !0,
    argTypes: ["size", "size", "size"],
  },
  handler(r, e, t) {
    var { parser: a } = r,
      n = t[0],
      i = H(e[0], "size"),
      o = H(e[1], "size");
    return {
      type: "rule",
      mode: a.mode,
      shift: n && H(n, "size").value,
      width: i.value,
      height: o.value,
    };
  },
  htmlBuilder(r, e) {
    var t = w.makeSpan(["mord", "rule"], [], e),
      a = Z(r.width, e),
      n = Z(r.height, e),
      i = r.shift ? Z(r.shift, e) : 0;
    return (
      (t.style.borderRightWidth = z(a)),
      (t.style.borderTopWidth = z(n)),
      (t.style.bottom = z(i)),
      (t.width = a),
      (t.height = n + i),
      (t.depth = -i),
      (t.maxFontSize = n * 1.125 * e.sizeMultiplier),
      t
    );
  },
  mathmlBuilder(r, e) {
    var t = Z(r.width, e),
      a = Z(r.height, e),
      n = r.shift ? Z(r.shift, e) : 0,
      i = (e.color && e.getColor()) || "black",
      o = new M.MathNode("mspace");
    o.setAttribute("mathbackground", i),
      o.setAttribute("width", z(t)),
      o.setAttribute("height", z(a));
    var u = new M.MathNode("mpadded", [o]);
    return (
      n >= 0
        ? u.setAttribute("height", z(n))
        : (u.setAttribute("height", z(n)), u.setAttribute("depth", z(-n))),
      u.setAttribute("voffset", z(n)),
      u
    );
  },
});
function Fa(r, e, t) {
  for (
    var a = t0(r, e, !1), n = e.sizeMultiplier / t.sizeMultiplier, i = 0;
    i < a.length;
    i++
  ) {
    var o = a[i].classes.indexOf("sizing");
    o < 0
      ? Array.prototype.push.apply(a[i].classes, e.sizingClasses(t))
      : a[i].classes[o + 1] === "reset-size" + e.size &&
        (a[i].classes[o + 1] = "reset-size" + t.size),
      (a[i].height *= n),
      (a[i].depth *= n);
  }
  return w.makeFragment(a);
}
var Nr = [
    "\\tiny",
    "\\sixptsize",
    "\\scriptsize",
    "\\footnotesize",
    "\\small",
    "\\normalsize",
    "\\large",
    "\\Large",
    "\\LARGE",
    "\\huge",
    "\\Huge",
  ],
  Ni = (r, e) => {
    var t = e.havingSize(r.size);
    return Fa(r.body, t, e);
  };
D({
  type: "sizing",
  names: Nr,
  props: { numArgs: 0, allowedInText: !0 },
  handler: (r, e) => {
    var { breakOnTokenText: t, funcName: a, parser: n } = r,
      i = n.parseExpression(!1, t);
    return { type: "sizing", mode: n.mode, size: Nr.indexOf(a) + 1, body: i };
  },
  htmlBuilder: Ni,
  mathmlBuilder: (r, e) => {
    var t = e.havingSize(r.size),
      a = h0(r.body, t),
      n = new M.MathNode("mstyle", a);
    return n.setAttribute("mathsize", z(t.sizeMultiplier)), n;
  },
});
D({
  type: "smash",
  names: ["\\smash"],
  props: { numArgs: 1, numOptionalArgs: 1, allowedInText: !0 },
  handler: (r, e, t) => {
    var { parser: a } = r,
      n = !1,
      i = !1,
      o = t[0] && H(t[0], "ordgroup");
    if (o)
      for (var u = "", c = 0; c < o.body.length; ++c) {
        var d = o.body[c];
        if (((u = d.text), u === "t")) n = !0;
        else if (u === "b") i = !0;
        else {
          (n = !1), (i = !1);
          break;
        }
      }
    else (n = !0), (i = !0);
    var f = e[0];
    return {
      type: "smash",
      mode: a.mode,
      body: f,
      smashHeight: n,
      smashDepth: i,
    };
  },
  htmlBuilder: (r, e) => {
    var t = w.makeSpan([], [V(r.body, e)]);
    if (!r.smashHeight && !r.smashDepth) return t;
    if (r.smashHeight && ((t.height = 0), t.children))
      for (var a = 0; a < t.children.length; a++) t.children[a].height = 0;
    if (r.smashDepth && ((t.depth = 0), t.children))
      for (var n = 0; n < t.children.length; n++) t.children[n].depth = 0;
    var i = w.makeVList(
      { positionType: "firstBaseline", children: [{ type: "elem", elem: t }] },
      e
    );
    return w.makeSpan(["mord"], [i], e);
  },
  mathmlBuilder: (r, e) => {
    var t = new M.MathNode("mpadded", [Q(r.body, e)]);
    return (
      r.smashHeight && t.setAttribute("height", "0px"),
      r.smashDepth && t.setAttribute("depth", "0px"),
      t
    );
  },
});
D({
  type: "sqrt",
  names: ["\\sqrt"],
  props: { numArgs: 1, numOptionalArgs: 1 },
  handler(r, e, t) {
    var { parser: a } = r,
      n = t[0],
      i = e[0];
    return { type: "sqrt", mode: a.mode, body: i, index: n };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e.havingCrampedStyle());
    t.height === 0 && (t.height = e.fontMetrics().xHeight),
      (t = w.wrapFragment(t, e));
    var a = e.fontMetrics(),
      n = a.defaultRuleThickness,
      i = n;
    e.style.id < q.TEXT.id && (i = e.fontMetrics().xHeight);
    var o = n + i / 4,
      u = t.height + t.depth + o + n,
      { span: c, ruleWidth: d, advanceWidth: f } = I0.sqrtImage(u, e),
      g = c.height - d;
    g > t.height + t.depth + o && (o = (o + g - t.height - t.depth) / 2);
    var x = c.height - t.height - o - d;
    t.style.paddingLeft = z(f);
    var y = w.makeVList(
      {
        positionType: "firstBaseline",
        children: [
          { type: "elem", elem: t, wrapperClasses: ["svg-align"] },
          { type: "kern", size: -(t.height + x) },
          { type: "elem", elem: c },
          { type: "kern", size: d },
        ],
      },
      e
    );
    if (r.index) {
      var S = e.havingStyle(q.SCRIPTSCRIPT),
        k = V(r.index, S, e),
        C = 0.6 * (y.height - y.depth),
        B = w.makeVList(
          {
            positionType: "shift",
            positionData: -C,
            children: [{ type: "elem", elem: k }],
          },
          e
        ),
        R = w.makeSpan(["root"], [B]);
      return w.makeSpan(["mord", "sqrt"], [R, y], e);
    } else return w.makeSpan(["mord", "sqrt"], [y], e);
  },
  mathmlBuilder(r, e) {
    var { body: t, index: a } = r;
    return a
      ? new M.MathNode("mroot", [Q(t, e), Q(a, e)])
      : new M.MathNode("msqrt", [Q(t, e)]);
  },
});
var Er = {
  display: q.DISPLAY,
  text: q.TEXT,
  script: q.SCRIPT,
  scriptscript: q.SCRIPTSCRIPT,
};
D({
  type: "styling",
  names: [
    "\\displaystyle",
    "\\textstyle",
    "\\scriptstyle",
    "\\scriptscriptstyle",
  ],
  props: { numArgs: 0, allowedInText: !0, primitive: !0 },
  handler(r, e) {
    var { breakOnTokenText: t, funcName: a, parser: n } = r,
      i = n.parseExpression(!0, t),
      o = a.slice(1, a.length - 5);
    return { type: "styling", mode: n.mode, style: o, body: i };
  },
  htmlBuilder(r, e) {
    var t = Er[r.style],
      a = e.havingStyle(t).withFont("");
    return Fa(r.body, a, e);
  },
  mathmlBuilder(r, e) {
    var t = Er[r.style],
      a = e.havingStyle(t),
      n = h0(r.body, a),
      i = new M.MathNode("mstyle", n),
      o = {
        display: ["0", "true"],
        text: ["0", "false"],
        script: ["1", "false"],
        scriptscript: ["2", "false"],
      },
      u = o[r.style];
    return (
      i.setAttribute("scriptlevel", u[0]),
      i.setAttribute("displaystyle", u[1]),
      i
    );
  },
});
var Ei = function (e, t) {
  var a = e.base;
  if (a)
    if (a.type === "op") {
      var n =
        a.limits && (t.style.size === q.DISPLAY.size || a.alwaysHandleSupSub);
      return n ? me : null;
    } else if (a.type === "operatorname") {
      var i =
        a.alwaysHandleSupSub && (t.style.size === q.DISPLAY.size || a.limits);
      return i ? La : null;
    } else {
      if (a.type === "accent") return I.isCharacterBox(a.base) ? Vt : null;
      if (a.type === "horizBrace") {
        var o = !e.sub;
        return o === a.isOver ? Ia : null;
      } else return null;
    }
  else return null;
};
_0({
  type: "supsub",
  htmlBuilder(r, e) {
    var t = Ei(r, e);
    if (t) return t(r, e);
    var { base: a, sup: n, sub: i } = r,
      o = V(a, e),
      u,
      c,
      d = e.fontMetrics(),
      f = 0,
      g = 0,
      x = a && I.isCharacterBox(a);
    if (n) {
      var y = e.havingStyle(e.style.sup());
      (u = V(n, y, e)),
        x ||
          (f =
            o.height -
            (y.fontMetrics().supDrop * y.sizeMultiplier) / e.sizeMultiplier);
    }
    if (i) {
      var S = e.havingStyle(e.style.sub());
      (c = V(i, S, e)),
        x ||
          (g =
            o.depth +
            (S.fontMetrics().subDrop * S.sizeMultiplier) / e.sizeMultiplier);
    }
    var k;
    e.style === q.DISPLAY
      ? (k = d.sup1)
      : e.style.cramped
      ? (k = d.sup3)
      : (k = d.sup2);
    var C = e.sizeMultiplier,
      B = z(0.5 / d.ptPerEm / C),
      R = null;
    if (c) {
      var E =
        r.base &&
        r.base.type === "op" &&
        r.base.name &&
        (r.base.name === "\\oiint" || r.base.name === "\\oiiint");
      (o instanceof b0 || E) && (R = z(-o.italic));
    }
    var P;
    if (u && c) {
      (f = Math.max(f, k, u.depth + 0.25 * d.xHeight)),
        (g = Math.max(g, d.sub2));
      var L = d.defaultRuleThickness,
        U = 4 * L;
      if (f - u.depth - (c.height - g) < U) {
        g = U - (f - u.depth) + c.height;
        var G = 0.8 * d.xHeight - (f - u.depth);
        G > 0 && ((f += G), (g -= G));
      }
      var W = [
        { type: "elem", elem: c, shift: g, marginRight: B, marginLeft: R },
        { type: "elem", elem: u, shift: -f, marginRight: B },
      ];
      P = w.makeVList({ positionType: "individualShift", children: W }, e);
    } else if (c) {
      g = Math.max(g, d.sub1, c.height - 0.8 * d.xHeight);
      var Y = [{ type: "elem", elem: c, marginLeft: R, marginRight: B }];
      P = w.makeVList(
        { positionType: "shift", positionData: g, children: Y },
        e
      );
    } else if (u)
      (f = Math.max(f, k, u.depth + 0.25 * d.xHeight)),
        (P = w.makeVList(
          {
            positionType: "shift",
            positionData: -f,
            children: [{ type: "elem", elem: u, marginRight: B }],
          },
          e
        ));
    else throw new Error("supsub must have either sup or sub.");
    var C0 = Ct(o, "right") || "mord";
    return w.makeSpan([C0], [o, w.makeSpan(["msupsub"], [P])], e);
  },
  mathmlBuilder(r, e) {
    var t = !1,
      a,
      n;
    r.base &&
      r.base.type === "horizBrace" &&
      ((n = !!r.sup), n === r.base.isOver && ((t = !0), (a = r.base.isOver))),
      r.base &&
        (r.base.type === "op" || r.base.type === "operatorname") &&
        (r.base.parentIsSupSub = !0);
    var i = [Q(r.base, e)];
    r.sub && i.push(Q(r.sub, e)), r.sup && i.push(Q(r.sup, e));
    var o;
    if (t) o = a ? "mover" : "munder";
    else if (r.sub)
      if (r.sup) {
        var d = r.base;
        (d && d.type === "op" && d.limits && e.style === q.DISPLAY) ||
        (d &&
          d.type === "operatorname" &&
          d.alwaysHandleSupSub &&
          (e.style === q.DISPLAY || d.limits))
          ? (o = "munderover")
          : (o = "msubsup");
      } else {
        var c = r.base;
        (c &&
          c.type === "op" &&
          c.limits &&
          (e.style === q.DISPLAY || c.alwaysHandleSupSub)) ||
        (c &&
          c.type === "operatorname" &&
          c.alwaysHandleSupSub &&
          (c.limits || e.style === q.DISPLAY))
          ? (o = "munder")
          : (o = "msub");
      }
    else {
      var u = r.base;
      (u &&
        u.type === "op" &&
        u.limits &&
        (e.style === q.DISPLAY || u.alwaysHandleSupSub)) ||
      (u &&
        u.type === "operatorname" &&
        u.alwaysHandleSupSub &&
        (u.limits || e.style === q.DISPLAY))
        ? (o = "mover")
        : (o = "msup");
    }
    return new M.MathNode(o, i);
  },
});
_0({
  type: "atom",
  htmlBuilder(r, e) {
    return w.mathsym(r.text, r.mode, e, ["m" + r.family]);
  },
  mathmlBuilder(r, e) {
    var t = new M.MathNode("mo", [y0(r.text, r.mode)]);
    if (r.family === "bin") {
      var a = Ut(r, e);
      a === "bold-italic" && t.setAttribute("mathvariant", a);
    } else
      r.family === "punct"
        ? t.setAttribute("separator", "true")
        : (r.family === "open" || r.family === "close") &&
          t.setAttribute("stretchy", "false");
    return t;
  },
});
var Ha = { mi: "italic", mn: "normal", mtext: "normal" };
_0({
  type: "mathord",
  htmlBuilder(r, e) {
    return w.makeOrd(r, e, "mathord");
  },
  mathmlBuilder(r, e) {
    var t = new M.MathNode("mi", [y0(r.text, r.mode, e)]),
      a = Ut(r, e) || "italic";
    return a !== Ha[t.type] && t.setAttribute("mathvariant", a), t;
  },
});
_0({
  type: "textord",
  htmlBuilder(r, e) {
    return w.makeOrd(r, e, "textord");
  },
  mathmlBuilder(r, e) {
    var t = y0(r.text, r.mode, e),
      a = Ut(r, e) || "normal",
      n;
    return (
      r.mode === "text"
        ? (n = new M.MathNode("mtext", [t]))
        : /[0-9]/.test(r.text)
        ? (n = new M.MathNode("mn", [t]))
        : r.text === "\\prime"
        ? (n = new M.MathNode("mo", [t]))
        : (n = new M.MathNode("mi", [t])),
      a !== Ha[n.type] && n.setAttribute("mathvariant", a),
      n
    );
  },
});
var ft = { "\\nobreak": "nobreak", "\\allowbreak": "allowbreak" },
  pt = {
    " ": {},
    "\\ ": {},
    "~": { className: "nobreak" },
    "\\space": {},
    "\\nobreakspace": { className: "nobreak" },
  };
_0({
  type: "spacing",
  htmlBuilder(r, e) {
    if (pt.hasOwnProperty(r.text)) {
      var t = pt[r.text].className || "";
      if (r.mode === "text") {
        var a = w.makeOrd(r, e, "textord");
        return a.classes.push(t), a;
      } else
        return w.makeSpan(["mspace", t], [w.mathsym(r.text, r.mode, e)], e);
    } else {
      if (ft.hasOwnProperty(r.text))
        return w.makeSpan(["mspace", ft[r.text]], [], e);
      throw new T('Unknown type of space "' + r.text + '"');
    }
  },
  mathmlBuilder(r, e) {
    var t;
    if (pt.hasOwnProperty(r.text))
      t = new M.MathNode("mtext", [new M.TextNode(" ")]);
    else {
      if (ft.hasOwnProperty(r.text)) return new M.MathNode("mspace");
      throw new T('Unknown type of space "' + r.text + '"');
    }
    return t;
  },
});
var Rr = () => {
  var r = new M.MathNode("mtd", []);
  return r.setAttribute("width", "50%"), r;
};
_0({
  type: "tag",
  mathmlBuilder(r, e) {
    var t = new M.MathNode("mtable", [
      new M.MathNode("mtr", [
        Rr(),
        new M.MathNode("mtd", [X0(r.body, e)]),
        Rr(),
        new M.MathNode("mtd", [X0(r.tag, e)]),
      ]),
    ]);
    return t.setAttribute("width", "100%"), t;
  },
});
var Ir = {
    "\\text": void 0,
    "\\textrm": "textrm",
    "\\textsf": "textsf",
    "\\texttt": "texttt",
    "\\textnormal": "textrm",
  },
  Or = { "\\textbf": "textbf", "\\textmd": "textmd" },
  Ri = { "\\textit": "textit", "\\textup": "textup" },
  qr = (r, e) => {
    var t = r.font;
    if (t) {
      if (Ir[t]) return e.withTextFontFamily(Ir[t]);
      if (Or[t]) return e.withTextFontWeight(Or[t]);
      if (t === "\\emph")
        return e.fontShape === "textit"
          ? e.withTextFontShape("textup")
          : e.withTextFontShape("textit");
    } else return e;
    return e.withTextFontShape(Ri[t]);
  };
D({
  type: "text",
  names: [
    "\\text",
    "\\textrm",
    "\\textsf",
    "\\texttt",
    "\\textnormal",
    "\\textbf",
    "\\textmd",
    "\\textit",
    "\\textup",
    "\\emph",
  ],
  props: {
    numArgs: 1,
    argTypes: ["text"],
    allowedInArgument: !0,
    allowedInText: !0,
  },
  handler(r, e) {
    var { parser: t, funcName: a } = r,
      n = e[0];
    return { type: "text", mode: t.mode, body: $(n), font: a };
  },
  htmlBuilder(r, e) {
    var t = qr(r, e),
      a = t0(r.body, t, !0);
    return w.makeSpan(["mord", "text"], a, t);
  },
  mathmlBuilder(r, e) {
    var t = qr(r, e);
    return X0(r.body, t);
  },
});
D({
  type: "underline",
  names: ["\\underline"],
  props: { numArgs: 1, allowedInText: !0 },
  handler(r, e) {
    var { parser: t } = r;
    return { type: "underline", mode: t.mode, body: e[0] };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e),
      a = w.makeLineSpan("underline-line", e),
      n = e.fontMetrics().defaultRuleThickness,
      i = w.makeVList(
        {
          positionType: "top",
          positionData: t.height,
          children: [
            { type: "kern", size: n },
            { type: "elem", elem: a },
            { type: "kern", size: 3 * n },
            { type: "elem", elem: t },
          ],
        },
        e
      );
    return w.makeSpan(["mord", "underline"], [i], e);
  },
  mathmlBuilder(r, e) {
    var t = new M.MathNode("mo", [new M.TextNode("‾")]);
    t.setAttribute("stretchy", "true");
    var a = new M.MathNode("munder", [Q(r.body, e), t]);
    return a.setAttribute("accentunder", "true"), a;
  },
});
D({
  type: "vcenter",
  names: ["\\vcenter"],
  props: { numArgs: 1, argTypes: ["original"], allowedInText: !1 },
  handler(r, e) {
    var { parser: t } = r;
    return { type: "vcenter", mode: t.mode, body: e[0] };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e),
      a = e.fontMetrics().axisHeight,
      n = 0.5 * (t.height - a - (t.depth + a));
    return w.makeVList(
      {
        positionType: "shift",
        positionData: n,
        children: [{ type: "elem", elem: t }],
      },
      e
    );
  },
  mathmlBuilder(r, e) {
    return new M.MathNode("mpadded", [Q(r.body, e)], ["vcenter"]);
  },
});
D({
  type: "verb",
  names: ["\\verb"],
  props: { numArgs: 0, allowedInText: !0 },
  handler(r, e, t) {
    throw new T("\\verb ended by end of line instead of matching delimiter");
  },
  htmlBuilder(r, e) {
    for (
      var t = Lr(r), a = [], n = e.havingStyle(e.style.text()), i = 0;
      i < t.length;
      i++
    ) {
      var o = t[i];
      o === "~" && (o = "\\textasciitilde"),
        a.push(
          w.makeSymbol(o, "Typewriter-Regular", r.mode, n, ["mord", "texttt"])
        );
    }
    return w.makeSpan(
      ["mord", "text"].concat(n.sizingClasses(e)),
      w.tryCombineChars(a),
      n
    );
  },
  mathmlBuilder(r, e) {
    var t = new M.TextNode(Lr(r)),
      a = new M.MathNode("mtext", [t]);
    return a.setAttribute("mathvariant", "monospace"), a;
  },
});
var Lr = (r) => r.body.replace(/ /g, r.star ? "␣" : " "),
  W0 = oa,
  Pa = `[ \r
	]`,
  Ii = "\\\\[a-zA-Z@]+",
  Oi = "\\\\[^\uD800-\uDFFF]",
  qi = "(" + Ii + ")" + Pa + "*",
  Li = `\\\\(
|[ \r	]+
?)[ \r	]*`,
  Rt = "[̀-ͯ]",
  Fi = new RegExp(Rt + "+$"),
  Hi =
    "(" +
    Pa +
    "+)|" +
    (Li + "|") +
    "([!-\\[\\]-‧‪-퟿豈-￿]" +
    (Rt + "*") +
    "|[\uD800-\uDBFF][\uDC00-\uDFFF]" +
    (Rt + "*") +
    "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" +
    ("|" + qi) +
    ("|" + Oi + ")");
class Fr {
  constructor(e, t) {
    (this.input = void 0),
      (this.settings = void 0),
      (this.tokenRegex = void 0),
      (this.catcodes = void 0),
      (this.input = e),
      (this.settings = t),
      (this.tokenRegex = new RegExp(Hi, "g")),
      (this.catcodes = { "%": 14, "~": 13 });
  }
  setCatcode(e, t) {
    this.catcodes[e] = t;
  }
  lex() {
    var e = this.input,
      t = this.tokenRegex.lastIndex;
    if (t === e.length) return new g0("EOF", new c0(this, t, t));
    var a = this.tokenRegex.exec(e);
    if (a === null || a.index !== t)
      throw new T(
        "Unexpected character: '" + e[t] + "'",
        new g0(e[t], new c0(this, t, t + 1))
      );
    var n = a[6] || a[3] || (a[2] ? "\\ " : " ");
    if (this.catcodes[n] === 14) {
      var i = e.indexOf(
        `
`,
        this.tokenRegex.lastIndex
      );
      return (
        i === -1
          ? ((this.tokenRegex.lastIndex = e.length),
            this.settings.reportNonstrict(
              "commentAtEnd",
              "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)"
            ))
          : (this.tokenRegex.lastIndex = i + 1),
        this.lex()
      );
    }
    return new g0(n, new c0(this, t, this.tokenRegex.lastIndex));
  }
}
class Pi {
  constructor(e, t) {
    e === void 0 && (e = {}),
      t === void 0 && (t = {}),
      (this.current = void 0),
      (this.builtins = void 0),
      (this.undefStack = void 0),
      (this.current = t),
      (this.builtins = e),
      (this.undefStack = []);
  }
  beginGroup() {
    this.undefStack.push({});
  }
  endGroup() {
    if (this.undefStack.length === 0)
      throw new T(
        "Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug"
      );
    var e = this.undefStack.pop();
    for (var t in e)
      e.hasOwnProperty(t) &&
        (e[t] == null ? delete this.current[t] : (this.current[t] = e[t]));
  }
  endGroups() {
    for (; this.undefStack.length > 0; ) this.endGroup();
  }
  has(e) {
    return this.current.hasOwnProperty(e) || this.builtins.hasOwnProperty(e);
  }
  get(e) {
    return this.current.hasOwnProperty(e) ? this.current[e] : this.builtins[e];
  }
  set(e, t, a) {
    if ((a === void 0 && (a = !1), a)) {
      for (var n = 0; n < this.undefStack.length; n++)
        delete this.undefStack[n][e];
      this.undefStack.length > 0 &&
        (this.undefStack[this.undefStack.length - 1][e] = t);
    } else {
      var i = this.undefStack[this.undefStack.length - 1];
      i && !i.hasOwnProperty(e) && (i[e] = this.current[e]);
    }
    t == null ? delete this.current[e] : (this.current[e] = t);
  }
}
var Ui = Ca;
m("\\noexpand", function (r) {
  var e = r.popToken();
  return (
    r.isExpandable(e.text) && ((e.noexpand = !0), (e.treatAsRelax = !0)),
    { tokens: [e], numArgs: 0 }
  );
});
m("\\expandafter", function (r) {
  var e = r.popToken();
  return r.expandOnce(!0), { tokens: [e], numArgs: 0 };
});
m("\\@firstoftwo", function (r) {
  var e = r.consumeArgs(2);
  return { tokens: e[0], numArgs: 0 };
});
m("\\@secondoftwo", function (r) {
  var e = r.consumeArgs(2);
  return { tokens: e[1], numArgs: 0 };
});
m("\\@ifnextchar", function (r) {
  var e = r.consumeArgs(3);
  r.consumeSpaces();
  var t = r.future();
  return e[0].length === 1 && e[0][0].text === t.text
    ? { tokens: e[1], numArgs: 0 }
    : { tokens: e[2], numArgs: 0 };
});
m("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
m("\\TextOrMath", function (r) {
  var e = r.consumeArgs(2);
  return r.mode === "text"
    ? { tokens: e[0], numArgs: 0 }
    : { tokens: e[1], numArgs: 0 };
});
var Hr = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15,
};
m("\\char", function (r) {
  var e = r.popToken(),
    t,
    a = "";
  if (e.text === "'") (t = 8), (e = r.popToken());
  else if (e.text === '"') (t = 16), (e = r.popToken());
  else if (e.text === "`")
    if (((e = r.popToken()), e.text[0] === "\\")) a = e.text.charCodeAt(1);
    else {
      if (e.text === "EOF") throw new T("\\char` missing argument");
      a = e.text.charCodeAt(0);
    }
  else t = 10;
  if (t) {
    if (((a = Hr[e.text]), a == null || a >= t))
      throw new T("Invalid base-" + t + " digit " + e.text);
    for (var n; (n = Hr[r.future().text]) != null && n < t; )
      (a *= t), (a += n), r.popToken();
  }
  return "\\@char{" + a + "}";
});
var Jt = (r, e, t, a) => {
  var n = r.consumeArg().tokens;
  if (n.length !== 1)
    throw new T("\\newcommand's first argument must be a macro name");
  var i = n[0].text,
    o = r.isDefined(i);
  if (o && !e)
    throw new T(
      "\\newcommand{" +
        i +
        "} attempting to redefine " +
        (i + "; use \\renewcommand")
    );
  if (!o && !t)
    throw new T(
      "\\renewcommand{" +
        i +
        "} when command " +
        i +
        " does not yet exist; use \\newcommand"
    );
  var u = 0;
  if (((n = r.consumeArg().tokens), n.length === 1 && n[0].text === "[")) {
    for (
      var c = "", d = r.expandNextToken();
      d.text !== "]" && d.text !== "EOF";

    )
      (c += d.text), (d = r.expandNextToken());
    if (!c.match(/^\s*[0-9]+\s*$/))
      throw new T("Invalid number of arguments: " + c);
    (u = parseInt(c)), (n = r.consumeArg().tokens);
  }
  return (o && a) || r.macros.set(i, { tokens: n, numArgs: u }), "";
};
m("\\newcommand", (r) => Jt(r, !1, !0, !1));
m("\\renewcommand", (r) => Jt(r, !0, !1, !1));
m("\\providecommand", (r) => Jt(r, !0, !0, !0));
m("\\message", (r) => {
  var e = r.consumeArgs(1)[0];
  return (
    console.log(
      e
        .reverse()
        .map((t) => t.text)
        .join("")
    ),
    ""
  );
});
m("\\errmessage", (r) => {
  var e = r.consumeArgs(1)[0];
  return (
    console.error(
      e
        .reverse()
        .map((t) => t.text)
        .join("")
    ),
    ""
  );
});
m("\\show", (r) => {
  var e = r.popToken(),
    t = e.text;
  return console.log(e, r.macros.get(t), W0[t], X.math[t], X.text[t]), "";
});
m("\\bgroup", "{");
m("\\egroup", "}");
m("~", "\\nobreakspace");
m("\\lq", "`");
m("\\rq", "'");
m("\\aa", "\\r a");
m("\\AA", "\\r A");
m("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
m("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
m("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
m("ℬ", "\\mathscr{B}");
m("ℰ", "\\mathscr{E}");
m("ℱ", "\\mathscr{F}");
m("ℋ", "\\mathscr{H}");
m("ℐ", "\\mathscr{I}");
m("ℒ", "\\mathscr{L}");
m("ℳ", "\\mathscr{M}");
m("ℛ", "\\mathscr{R}");
m("ℭ", "\\mathfrak{C}");
m("ℌ", "\\mathfrak{H}");
m("ℨ", "\\mathfrak{Z}");
m("\\Bbbk", "\\Bbb{k}");
m("·", "\\cdotp");
m("\\llap", "\\mathllap{\\textrm{#1}}");
m("\\rlap", "\\mathrlap{\\textrm{#1}}");
m("\\clap", "\\mathclap{\\textrm{#1}}");
m("\\mathstrut", "\\vphantom{(}");
m("\\underbar", "\\underline{\\text{#1}}");
m("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
m("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
m("\\ne", "\\neq");
m("≠", "\\neq");
m(
  "\\notin",
  "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}"
);
m("∉", "\\notin");
m(
  "≘",
  "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}"
);
m("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
m("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
m("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
m(
  "≝",
  "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}"
);
m("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
m("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
m("⟂", "\\perp");
m("‼", "\\mathclose{!\\mkern-0.8mu!}");
m("∌", "\\notni");
m("⌜", "\\ulcorner");
m("⌝", "\\urcorner");
m("⌞", "\\llcorner");
m("⌟", "\\lrcorner");
m("©", "\\copyright");
m("®", "\\textregistered");
m("️", "\\textregistered");
m("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
m("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
m("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
m("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
m("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
m("⋮", "\\vdots");
m("\\varGamma", "\\mathit{\\Gamma}");
m("\\varDelta", "\\mathit{\\Delta}");
m("\\varTheta", "\\mathit{\\Theta}");
m("\\varLambda", "\\mathit{\\Lambda}");
m("\\varXi", "\\mathit{\\Xi}");
m("\\varPi", "\\mathit{\\Pi}");
m("\\varSigma", "\\mathit{\\Sigma}");
m("\\varUpsilon", "\\mathit{\\Upsilon}");
m("\\varPhi", "\\mathit{\\Phi}");
m("\\varPsi", "\\mathit{\\Psi}");
m("\\varOmega", "\\mathit{\\Omega}");
m("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
m(
  "\\colon",
  "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax"
);
m("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
m("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
m("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
m("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
m("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
m("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
var Pr = {
  ",": "\\dotsc",
  "\\not": "\\dotsb",
  "+": "\\dotsb",
  "=": "\\dotsb",
  "<": "\\dotsb",
  ">": "\\dotsb",
  "-": "\\dotsb",
  "*": "\\dotsb",
  ":": "\\dotsb",
  "\\DOTSB": "\\dotsb",
  "\\coprod": "\\dotsb",
  "\\bigvee": "\\dotsb",
  "\\bigwedge": "\\dotsb",
  "\\biguplus": "\\dotsb",
  "\\bigcap": "\\dotsb",
  "\\bigcup": "\\dotsb",
  "\\prod": "\\dotsb",
  "\\sum": "\\dotsb",
  "\\bigotimes": "\\dotsb",
  "\\bigoplus": "\\dotsb",
  "\\bigodot": "\\dotsb",
  "\\bigsqcup": "\\dotsb",
  "\\And": "\\dotsb",
  "\\longrightarrow": "\\dotsb",
  "\\Longrightarrow": "\\dotsb",
  "\\longleftarrow": "\\dotsb",
  "\\Longleftarrow": "\\dotsb",
  "\\longleftrightarrow": "\\dotsb",
  "\\Longleftrightarrow": "\\dotsb",
  "\\mapsto": "\\dotsb",
  "\\longmapsto": "\\dotsb",
  "\\hookrightarrow": "\\dotsb",
  "\\doteq": "\\dotsb",
  "\\mathbin": "\\dotsb",
  "\\mathrel": "\\dotsb",
  "\\relbar": "\\dotsb",
  "\\Relbar": "\\dotsb",
  "\\xrightarrow": "\\dotsb",
  "\\xleftarrow": "\\dotsb",
  "\\DOTSI": "\\dotsi",
  "\\int": "\\dotsi",
  "\\oint": "\\dotsi",
  "\\iint": "\\dotsi",
  "\\iiint": "\\dotsi",
  "\\iiiint": "\\dotsi",
  "\\idotsint": "\\dotsi",
  "\\DOTSX": "\\dotsx",
};
m("\\dots", function (r) {
  var e = "\\dotso",
    t = r.expandAfterFuture().text;
  return (
    t in Pr
      ? (e = Pr[t])
      : (t.slice(0, 4) === "\\not" ||
          (t in X.math && I.contains(["bin", "rel"], X.math[t].group))) &&
        (e = "\\dotsb"),
    e
  );
});
var $t = {
  ")": !0,
  "]": !0,
  "\\rbrack": !0,
  "\\}": !0,
  "\\rbrace": !0,
  "\\rangle": !0,
  "\\rceil": !0,
  "\\rfloor": !0,
  "\\rgroup": !0,
  "\\rmoustache": !0,
  "\\right": !0,
  "\\bigr": !0,
  "\\biggr": !0,
  "\\Bigr": !0,
  "\\Biggr": !0,
  $: !0,
  ";": !0,
  ".": !0,
  ",": !0,
};
m("\\dotso", function (r) {
  var e = r.future().text;
  return e in $t ? "\\ldots\\," : "\\ldots";
});
m("\\dotsc", function (r) {
  var e = r.future().text;
  return e in $t && e !== "," ? "\\ldots\\," : "\\ldots";
});
m("\\cdots", function (r) {
  var e = r.future().text;
  return e in $t ? "\\@cdots\\," : "\\@cdots";
});
m("\\dotsb", "\\cdots");
m("\\dotsm", "\\cdots");
m("\\dotsi", "\\!\\cdots");
m("\\dotsx", "\\ldots\\,");
m("\\DOTSI", "\\relax");
m("\\DOTSB", "\\relax");
m("\\DOTSX", "\\relax");
m("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
m("\\,", "\\tmspace+{3mu}{.1667em}");
m("\\thinspace", "\\,");
m("\\>", "\\mskip{4mu}");
m("\\:", "\\tmspace+{4mu}{.2222em}");
m("\\medspace", "\\:");
m("\\;", "\\tmspace+{5mu}{.2777em}");
m("\\thickspace", "\\;");
m("\\!", "\\tmspace-{3mu}{.1667em}");
m("\\negthinspace", "\\!");
m("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
m("\\negthickspace", "\\tmspace-{5mu}{.277em}");
m("\\enspace", "\\kern.5em ");
m("\\enskip", "\\hskip.5em\\relax");
m("\\quad", "\\hskip1em\\relax");
m("\\qquad", "\\hskip2em\\relax");
m("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
m("\\tag@paren", "\\tag@literal{({#1})}");
m("\\tag@literal", (r) => {
  if (r.macros.get("\\df@tag")) throw new T("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
m(
  "\\bmod",
  "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}"
);
m(
  "\\pod",
  "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"
);
m("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
m(
  "\\mod",
  "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"
);
m("\\newline", "\\\\\\relax");
m(
  "\\TeX",
  "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}"
);
var Ua = z(k0["Main-Regular"][84][1] - 0.7 * k0["Main-Regular"][65][1]);
m(
  "\\LaTeX",
  "\\textrm{\\html@mathml{" +
    ("L\\kern-.36em\\raisebox{" + Ua + "}{\\scriptstyle A}") +
    "\\kern-.15em\\TeX}{LaTeX}}"
);
m(
  "\\KaTeX",
  "\\textrm{\\html@mathml{" +
    ("K\\kern-.17em\\raisebox{" + Ua + "}{\\scriptstyle A}") +
    "\\kern-.15em\\TeX}{KaTeX}}"
);
m("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
m("\\@hspace", "\\hskip #1\\relax");
m("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
m("\\ordinarycolon", ":");
m("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
m(
  "\\dblcolon",
  '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}'
);
m(
  "\\coloneqq",
  '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}'
);
m(
  "\\Coloneqq",
  '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}'
);
m(
  "\\coloneq",
  '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}'
);
m(
  "\\Coloneq",
  '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}'
);
m(
  "\\eqqcolon",
  '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}'
);
m(
  "\\Eqqcolon",
  '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}'
);
m(
  "\\eqcolon",
  '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}'
);
m(
  "\\Eqcolon",
  '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}'
);
m(
  "\\colonapprox",
  '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}'
);
m(
  "\\Colonapprox",
  '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}'
);
m(
  "\\colonsim",
  '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}'
);
m(
  "\\Colonsim",
  '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}'
);
m("∷", "\\dblcolon");
m("∹", "\\eqcolon");
m("≔", "\\coloneqq");
m("≕", "\\eqqcolon");
m("⩴", "\\Coloneqq");
m("\\ratio", "\\vcentcolon");
m("\\coloncolon", "\\dblcolon");
m("\\colonequals", "\\coloneqq");
m("\\coloncolonequals", "\\Coloneqq");
m("\\equalscolon", "\\eqqcolon");
m("\\equalscoloncolon", "\\Eqqcolon");
m("\\colonminus", "\\coloneq");
m("\\coloncolonminus", "\\Coloneq");
m("\\minuscolon", "\\eqcolon");
m("\\minuscoloncolon", "\\Eqcolon");
m("\\coloncolonapprox", "\\Colonapprox");
m("\\coloncolonsim", "\\Colonsim");
m("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
m("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
m("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
m(
  "\\approxcoloncolon",
  "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"
);
m("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
m("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
m("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
m("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
m("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
m("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
m("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
m("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
m("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
m("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
m("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
m("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
m("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
m("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
m("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
m("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
m("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
m("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
m("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
m("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
m("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
m("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
m("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
m("\\imath", "\\html@mathml{\\@imath}{ı}");
m("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
m(
  "\\llbracket",
  "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}"
);
m(
  "\\rrbracket",
  "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}"
);
m("⟦", "\\llbracket");
m("⟧", "\\rrbracket");
m(
  "\\lBrace",
  "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}"
);
m(
  "\\rBrace",
  "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}"
);
m("⦃", "\\lBrace");
m("⦄", "\\rBrace");
m(
  "\\minuso",
  "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}"
);
m("⦵", "\\minuso");
m("\\darr", "\\downarrow");
m("\\dArr", "\\Downarrow");
m("\\Darr", "\\Downarrow");
m("\\lang", "\\langle");
m("\\rang", "\\rangle");
m("\\uarr", "\\uparrow");
m("\\uArr", "\\Uparrow");
m("\\Uarr", "\\Uparrow");
m("\\N", "\\mathbb{N}");
m("\\R", "\\mathbb{R}");
m("\\Z", "\\mathbb{Z}");
m("\\alef", "\\aleph");
m("\\alefsym", "\\aleph");
m("\\Alpha", "\\mathrm{A}");
m("\\Beta", "\\mathrm{B}");
m("\\bull", "\\bullet");
m("\\Chi", "\\mathrm{X}");
m("\\clubs", "\\clubsuit");
m("\\cnums", "\\mathbb{C}");
m("\\Complex", "\\mathbb{C}");
m("\\Dagger", "\\ddagger");
m("\\diamonds", "\\diamondsuit");
m("\\empty", "\\emptyset");
m("\\Epsilon", "\\mathrm{E}");
m("\\Eta", "\\mathrm{H}");
m("\\exist", "\\exists");
m("\\harr", "\\leftrightarrow");
m("\\hArr", "\\Leftrightarrow");
m("\\Harr", "\\Leftrightarrow");
m("\\hearts", "\\heartsuit");
m("\\image", "\\Im");
m("\\infin", "\\infty");
m("\\Iota", "\\mathrm{I}");
m("\\isin", "\\in");
m("\\Kappa", "\\mathrm{K}");
m("\\larr", "\\leftarrow");
m("\\lArr", "\\Leftarrow");
m("\\Larr", "\\Leftarrow");
m("\\lrarr", "\\leftrightarrow");
m("\\lrArr", "\\Leftrightarrow");
m("\\Lrarr", "\\Leftrightarrow");
m("\\Mu", "\\mathrm{M}");
m("\\natnums", "\\mathbb{N}");
m("\\Nu", "\\mathrm{N}");
m("\\Omicron", "\\mathrm{O}");
m("\\plusmn", "\\pm");
m("\\rarr", "\\rightarrow");
m("\\rArr", "\\Rightarrow");
m("\\Rarr", "\\Rightarrow");
m("\\real", "\\Re");
m("\\reals", "\\mathbb{R}");
m("\\Reals", "\\mathbb{R}");
m("\\Rho", "\\mathrm{P}");
m("\\sdot", "\\cdot");
m("\\sect", "\\S");
m("\\spades", "\\spadesuit");
m("\\sub", "\\subset");
m("\\sube", "\\subseteq");
m("\\supe", "\\supseteq");
m("\\Tau", "\\mathrm{T}");
m("\\thetasym", "\\vartheta");
m("\\weierp", "\\wp");
m("\\Zeta", "\\mathrm{Z}");
m("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
m("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
m("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
m("\\bra", "\\mathinner{\\langle{#1}|}");
m("\\ket", "\\mathinner{|{#1}\\rangle}");
m("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
m("\\Bra", "\\left\\langle#1\\right|");
m("\\Ket", "\\left|#1\\right\\rangle");
var Ga = (r) => (e) => {
  var t = e.consumeArg().tokens,
    a = e.consumeArg().tokens,
    n = e.consumeArg().tokens,
    i = e.consumeArg().tokens,
    o = e.macros.get("|"),
    u = e.macros.get("\\|");
  e.macros.beginGroup();
  var c = (g) => (x) => {
    r && (x.macros.set("|", o), n.length && x.macros.set("\\|", u));
    var y = g;
    if (!g && n.length) {
      var S = x.future();
      S.text === "|" && (x.popToken(), (y = !0));
    }
    return { tokens: y ? n : a, numArgs: 0 };
  };
  e.macros.set("|", c(!1)), n.length && e.macros.set("\\|", c(!0));
  var d = e.consumeArg().tokens,
    f = e.expandTokens([...i, ...d, ...t]);
  return e.macros.endGroup(), { tokens: f.reverse(), numArgs: 0 };
};
m("\\bra@ket", Ga(!1));
m("\\bra@set", Ga(!0));
m(
  "\\Braket",
  "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}"
);
m(
  "\\Set",
  "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}"
);
m("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
m("\\angln", "{\\angl n}");
m("\\blue", "\\textcolor{##6495ed}{#1}");
m("\\orange", "\\textcolor{##ffa500}{#1}");
m("\\pink", "\\textcolor{##ff00af}{#1}");
m("\\red", "\\textcolor{##df0030}{#1}");
m("\\green", "\\textcolor{##28ae7b}{#1}");
m("\\gray", "\\textcolor{gray}{#1}");
m("\\purple", "\\textcolor{##9d38bd}{#1}");
m("\\blueA", "\\textcolor{##ccfaff}{#1}");
m("\\blueB", "\\textcolor{##80f6ff}{#1}");
m("\\blueC", "\\textcolor{##63d9ea}{#1}");
m("\\blueD", "\\textcolor{##11accd}{#1}");
m("\\blueE", "\\textcolor{##0c7f99}{#1}");
m("\\tealA", "\\textcolor{##94fff5}{#1}");
m("\\tealB", "\\textcolor{##26edd5}{#1}");
m("\\tealC", "\\textcolor{##01d1c1}{#1}");
m("\\tealD", "\\textcolor{##01a995}{#1}");
m("\\tealE", "\\textcolor{##208170}{#1}");
m("\\greenA", "\\textcolor{##b6ffb0}{#1}");
m("\\greenB", "\\textcolor{##8af281}{#1}");
m("\\greenC", "\\textcolor{##74cf70}{#1}");
m("\\greenD", "\\textcolor{##1fab54}{#1}");
m("\\greenE", "\\textcolor{##0d923f}{#1}");
m("\\goldA", "\\textcolor{##ffd0a9}{#1}");
m("\\goldB", "\\textcolor{##ffbb71}{#1}");
m("\\goldC", "\\textcolor{##ff9c39}{#1}");
m("\\goldD", "\\textcolor{##e07d10}{#1}");
m("\\goldE", "\\textcolor{##a75a05}{#1}");
m("\\redA", "\\textcolor{##fca9a9}{#1}");
m("\\redB", "\\textcolor{##ff8482}{#1}");
m("\\redC", "\\textcolor{##f9685d}{#1}");
m("\\redD", "\\textcolor{##e84d39}{#1}");
m("\\redE", "\\textcolor{##bc2612}{#1}");
m("\\maroonA", "\\textcolor{##ffbde0}{#1}");
m("\\maroonB", "\\textcolor{##ff92c6}{#1}");
m("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
m("\\maroonD", "\\textcolor{##ca337c}{#1}");
m("\\maroonE", "\\textcolor{##9e034e}{#1}");
m("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
m("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
m("\\purpleC", "\\textcolor{##aa87ff}{#1}");
m("\\purpleD", "\\textcolor{##7854ab}{#1}");
m("\\purpleE", "\\textcolor{##543b78}{#1}");
m("\\mintA", "\\textcolor{##f5f9e8}{#1}");
m("\\mintB", "\\textcolor{##edf2df}{#1}");
m("\\mintC", "\\textcolor{##e0e5cc}{#1}");
m("\\grayA", "\\textcolor{##f6f7f7}{#1}");
m("\\grayB", "\\textcolor{##f0f1f2}{#1}");
m("\\grayC", "\\textcolor{##e3e5e6}{#1}");
m("\\grayD", "\\textcolor{##d6d8da}{#1}");
m("\\grayE", "\\textcolor{##babec2}{#1}");
m("\\grayF", "\\textcolor{##888d93}{#1}");
m("\\grayG", "\\textcolor{##626569}{#1}");
m("\\grayH", "\\textcolor{##3b3e40}{#1}");
m("\\grayI", "\\textcolor{##21242c}{#1}");
m("\\kaBlue", "\\textcolor{##314453}{#1}");
m("\\kaGreen", "\\textcolor{##71B307}{#1}");
var Va = { "^": !0, _: !0, "\\limits": !0, "\\nolimits": !0 };
class Gi {
  constructor(e, t, a) {
    (this.settings = void 0),
      (this.expansionCount = void 0),
      (this.lexer = void 0),
      (this.macros = void 0),
      (this.stack = void 0),
      (this.mode = void 0),
      (this.settings = t),
      (this.expansionCount = 0),
      this.feed(e),
      (this.macros = new Pi(Ui, t.macros)),
      (this.mode = a),
      (this.stack = []);
  }
  feed(e) {
    this.lexer = new Fr(e, this.settings);
  }
  switchMode(e) {
    this.mode = e;
  }
  beginGroup() {
    this.macros.beginGroup();
  }
  endGroup() {
    this.macros.endGroup();
  }
  endGroups() {
    this.macros.endGroups();
  }
  future() {
    return (
      this.stack.length === 0 && this.pushToken(this.lexer.lex()),
      this.stack[this.stack.length - 1]
    );
  }
  popToken() {
    return this.future(), this.stack.pop();
  }
  pushToken(e) {
    this.stack.push(e);
  }
  pushTokens(e) {
    this.stack.push(...e);
  }
  scanArgument(e) {
    var t, a, n;
    if (e) {
      if ((this.consumeSpaces(), this.future().text !== "[")) return null;
      (t = this.popToken()), ({ tokens: n, end: a } = this.consumeArg(["]"]));
    } else ({ tokens: n, start: t, end: a } = this.consumeArg());
    return (
      this.pushToken(new g0("EOF", a.loc)), this.pushTokens(n), t.range(a, "")
    );
  }
  consumeSpaces() {
    for (;;) {
      var e = this.future();
      if (e.text === " ") this.stack.pop();
      else break;
    }
  }
  consumeArg(e) {
    var t = [],
      a = e && e.length > 0;
    a || this.consumeSpaces();
    var n = this.future(),
      i,
      o = 0,
      u = 0;
    do {
      if (((i = this.popToken()), t.push(i), i.text === "{")) ++o;
      else if (i.text === "}") {
        if ((--o, o === -1)) throw new T("Extra }", i);
      } else if (i.text === "EOF")
        throw new T(
          "Unexpected end of input in a macro argument, expected '" +
            (e && a ? e[u] : "}") +
            "'",
          i
        );
      if (e && a)
        if ((o === 0 || (o === 1 && e[u] === "{")) && i.text === e[u]) {
          if ((++u, u === e.length)) {
            t.splice(-u, u);
            break;
          }
        } else u = 0;
    } while (o !== 0 || a);
    return (
      n.text === "{" && t[t.length - 1].text === "}" && (t.pop(), t.shift()),
      t.reverse(),
      { tokens: t, start: n, end: i }
    );
  }
  consumeArgs(e, t) {
    if (t) {
      if (t.length !== e + 1)
        throw new T(
          "The length of delimiters doesn't match the number of args!"
        );
      for (var a = t[0], n = 0; n < a.length; n++) {
        var i = this.popToken();
        if (a[n] !== i.text)
          throw new T("Use of the macro doesn't match its definition", i);
      }
    }
    for (var o = [], u = 0; u < e; u++)
      o.push(this.consumeArg(t && t[u + 1]).tokens);
    return o;
  }
  countExpansion(e) {
    if (
      ((this.expansionCount += e),
      this.expansionCount > this.settings.maxExpand)
    )
      throw new T(
        "Too many expansions: infinite loop or need to increase maxExpand setting"
      );
  }
  expandOnce(e) {
    var t = this.popToken(),
      a = t.text,
      n = t.noexpand ? null : this._getExpansion(a);
    if (n == null || (e && n.unexpandable)) {
      if (e && n == null && a[0] === "\\" && !this.isDefined(a))
        throw new T("Undefined control sequence: " + a);
      return this.pushToken(t), !1;
    }
    this.countExpansion(1);
    var i = n.tokens,
      o = this.consumeArgs(n.numArgs, n.delimiters);
    if (n.numArgs) {
      i = i.slice();
      for (var u = i.length - 1; u >= 0; --u) {
        var c = i[u];
        if (c.text === "#") {
          if (u === 0)
            throw new T("Incomplete placeholder at end of macro body", c);
          if (((c = i[--u]), c.text === "#")) i.splice(u + 1, 1);
          else if (/^[1-9]$/.test(c.text)) i.splice(u, 2, ...o[+c.text - 1]);
          else throw new T("Not a valid argument number", c);
        }
      }
    }
    return this.pushTokens(i), i.length;
  }
  expandAfterFuture() {
    return this.expandOnce(), this.future();
  }
  expandNextToken() {
    for (;;)
      if (this.expandOnce() === !1) {
        var e = this.stack.pop();
        return e.treatAsRelax && (e.text = "\\relax"), e;
      }
    throw new Error();
  }
  expandMacro(e) {
    return this.macros.has(e) ? this.expandTokens([new g0(e)]) : void 0;
  }
  expandTokens(e) {
    var t = [],
      a = this.stack.length;
    for (this.pushTokens(e); this.stack.length > a; )
      if (this.expandOnce(!0) === !1) {
        var n = this.stack.pop();
        n.treatAsRelax && ((n.noexpand = !1), (n.treatAsRelax = !1)), t.push(n);
      }
    return this.countExpansion(t.length), t;
  }
  expandMacroAsText(e) {
    var t = this.expandMacro(e);
    return t && t.map((a) => a.text).join("");
  }
  _getExpansion(e) {
    var t = this.macros.get(e);
    if (t == null) return t;
    if (e.length === 1) {
      var a = this.lexer.catcodes[e];
      if (a != null && a !== 13) return;
    }
    var n = typeof t == "function" ? t(this) : t;
    if (typeof n == "string") {
      var i = 0;
      if (n.indexOf("#") !== -1)
        for (var o = n.replace(/##/g, ""); o.indexOf("#" + (i + 1)) !== -1; )
          ++i;
      for (
        var u = new Fr(n, this.settings), c = [], d = u.lex();
        d.text !== "EOF";

      )
        c.push(d), (d = u.lex());
      c.reverse();
      var f = { tokens: c, numArgs: i };
      return f;
    }
    return n;
  }
  isDefined(e) {
    return (
      this.macros.has(e) ||
      W0.hasOwnProperty(e) ||
      X.math.hasOwnProperty(e) ||
      X.text.hasOwnProperty(e) ||
      Va.hasOwnProperty(e)
    );
  }
  isExpandable(e) {
    var t = this.macros.get(e);
    return t != null
      ? typeof t == "string" || typeof t == "function" || !t.unexpandable
      : W0.hasOwnProperty(e) && !W0[e].primitive;
  }
}
var Ur = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/,
  Ie = Object.freeze({
    "₊": "+",
    "₋": "-",
    "₌": "=",
    "₍": "(",
    "₎": ")",
    "₀": "0",
    "₁": "1",
    "₂": "2",
    "₃": "3",
    "₄": "4",
    "₅": "5",
    "₆": "6",
    "₇": "7",
    "₈": "8",
    "₉": "9",
    ₐ: "a",
    ₑ: "e",
    ₕ: "h",
    ᵢ: "i",
    ⱼ: "j",
    ₖ: "k",
    ₗ: "l",
    ₘ: "m",
    ₙ: "n",
    ₒ: "o",
    ₚ: "p",
    ᵣ: "r",
    ₛ: "s",
    ₜ: "t",
    ᵤ: "u",
    ᵥ: "v",
    ₓ: "x",
    ᵦ: "β",
    ᵧ: "γ",
    ᵨ: "ρ",
    ᵩ: "ϕ",
    ᵪ: "χ",
    "⁺": "+",
    "⁻": "-",
    "⁼": "=",
    "⁽": "(",
    "⁾": ")",
    "⁰": "0",
    "¹": "1",
    "²": "2",
    "³": "3",
    "⁴": "4",
    "⁵": "5",
    "⁶": "6",
    "⁷": "7",
    "⁸": "8",
    "⁹": "9",
    ᴬ: "A",
    ᴮ: "B",
    ᴰ: "D",
    ᴱ: "E",
    ᴳ: "G",
    ᴴ: "H",
    ᴵ: "I",
    ᴶ: "J",
    ᴷ: "K",
    ᴸ: "L",
    ᴹ: "M",
    ᴺ: "N",
    ᴼ: "O",
    ᴾ: "P",
    ᴿ: "R",
    ᵀ: "T",
    ᵁ: "U",
    ⱽ: "V",
    ᵂ: "W",
    ᵃ: "a",
    ᵇ: "b",
    ᶜ: "c",
    ᵈ: "d",
    ᵉ: "e",
    ᶠ: "f",
    ᵍ: "g",
    ʰ: "h",
    ⁱ: "i",
    ʲ: "j",
    ᵏ: "k",
    ˡ: "l",
    ᵐ: "m",
    ⁿ: "n",
    ᵒ: "o",
    ᵖ: "p",
    ʳ: "r",
    ˢ: "s",
    ᵗ: "t",
    ᵘ: "u",
    ᵛ: "v",
    ʷ: "w",
    ˣ: "x",
    ʸ: "y",
    ᶻ: "z",
    ᵝ: "β",
    ᵞ: "γ",
    ᵟ: "δ",
    ᵠ: "ϕ",
    ᵡ: "χ",
    ᶿ: "θ",
  }),
  vt = {
    "́": { text: "\\'", math: "\\acute" },
    "̀": { text: "\\`", math: "\\grave" },
    "̈": { text: '\\"', math: "\\ddot" },
    "̃": { text: "\\~", math: "\\tilde" },
    "̄": { text: "\\=", math: "\\bar" },
    "̆": { text: "\\u", math: "\\breve" },
    "̌": { text: "\\v", math: "\\check" },
    "̂": { text: "\\^", math: "\\hat" },
    "̇": { text: "\\.", math: "\\dot" },
    "̊": { text: "\\r", math: "\\mathring" },
    "̋": { text: "\\H" },
    "̧": { text: "\\c" },
  },
  Gr = {
    á: "á",
    à: "à",
    ä: "ä",
    ǟ: "ǟ",
    ã: "ã",
    ā: "ā",
    ă: "ă",
    ắ: "ắ",
    ằ: "ằ",
    ẵ: "ẵ",
    ǎ: "ǎ",
    â: "â",
    ấ: "ấ",
    ầ: "ầ",
    ẫ: "ẫ",
    ȧ: "ȧ",
    ǡ: "ǡ",
    å: "å",
    ǻ: "ǻ",
    ḃ: "ḃ",
    ć: "ć",
    ḉ: "ḉ",
    č: "č",
    ĉ: "ĉ",
    ċ: "ċ",
    ç: "ç",
    ď: "ď",
    ḋ: "ḋ",
    ḑ: "ḑ",
    é: "é",
    è: "è",
    ë: "ë",
    ẽ: "ẽ",
    ē: "ē",
    ḗ: "ḗ",
    ḕ: "ḕ",
    ĕ: "ĕ",
    ḝ: "ḝ",
    ě: "ě",
    ê: "ê",
    ế: "ế",
    ề: "ề",
    ễ: "ễ",
    ė: "ė",
    ȩ: "ȩ",
    ḟ: "ḟ",
    ǵ: "ǵ",
    ḡ: "ḡ",
    ğ: "ğ",
    ǧ: "ǧ",
    ĝ: "ĝ",
    ġ: "ġ",
    ģ: "ģ",
    ḧ: "ḧ",
    ȟ: "ȟ",
    ĥ: "ĥ",
    ḣ: "ḣ",
    ḩ: "ḩ",
    í: "í",
    ì: "ì",
    ï: "ï",
    ḯ: "ḯ",
    ĩ: "ĩ",
    ī: "ī",
    ĭ: "ĭ",
    ǐ: "ǐ",
    î: "î",
    ǰ: "ǰ",
    ĵ: "ĵ",
    ḱ: "ḱ",
    ǩ: "ǩ",
    ķ: "ķ",
    ĺ: "ĺ",
    ľ: "ľ",
    ļ: "ļ",
    ḿ: "ḿ",
    ṁ: "ṁ",
    ń: "ń",
    ǹ: "ǹ",
    ñ: "ñ",
    ň: "ň",
    ṅ: "ṅ",
    ņ: "ņ",
    ó: "ó",
    ò: "ò",
    ö: "ö",
    ȫ: "ȫ",
    õ: "õ",
    ṍ: "ṍ",
    ṏ: "ṏ",
    ȭ: "ȭ",
    ō: "ō",
    ṓ: "ṓ",
    ṑ: "ṑ",
    ŏ: "ŏ",
    ǒ: "ǒ",
    ô: "ô",
    ố: "ố",
    ồ: "ồ",
    ỗ: "ỗ",
    ȯ: "ȯ",
    ȱ: "ȱ",
    ő: "ő",
    ṕ: "ṕ",
    ṗ: "ṗ",
    ŕ: "ŕ",
    ř: "ř",
    ṙ: "ṙ",
    ŗ: "ŗ",
    ś: "ś",
    ṥ: "ṥ",
    š: "š",
    ṧ: "ṧ",
    ŝ: "ŝ",
    ṡ: "ṡ",
    ş: "ş",
    ẗ: "ẗ",
    ť: "ť",
    ṫ: "ṫ",
    ţ: "ţ",
    ú: "ú",
    ù: "ù",
    ü: "ü",
    ǘ: "ǘ",
    ǜ: "ǜ",
    ǖ: "ǖ",
    ǚ: "ǚ",
    ũ: "ũ",
    ṹ: "ṹ",
    ū: "ū",
    ṻ: "ṻ",
    ŭ: "ŭ",
    ǔ: "ǔ",
    û: "û",
    ů: "ů",
    ű: "ű",
    ṽ: "ṽ",
    ẃ: "ẃ",
    ẁ: "ẁ",
    ẅ: "ẅ",
    ŵ: "ŵ",
    ẇ: "ẇ",
    ẘ: "ẘ",
    ẍ: "ẍ",
    ẋ: "ẋ",
    ý: "ý",
    ỳ: "ỳ",
    ÿ: "ÿ",
    ỹ: "ỹ",
    ȳ: "ȳ",
    ŷ: "ŷ",
    ẏ: "ẏ",
    ẙ: "ẙ",
    ź: "ź",
    ž: "ž",
    ẑ: "ẑ",
    ż: "ż",
    Á: "Á",
    À: "À",
    Ä: "Ä",
    Ǟ: "Ǟ",
    Ã: "Ã",
    Ā: "Ā",
    Ă: "Ă",
    Ắ: "Ắ",
    Ằ: "Ằ",
    Ẵ: "Ẵ",
    Ǎ: "Ǎ",
    Â: "Â",
    Ấ: "Ấ",
    Ầ: "Ầ",
    Ẫ: "Ẫ",
    Ȧ: "Ȧ",
    Ǡ: "Ǡ",
    Å: "Å",
    Ǻ: "Ǻ",
    Ḃ: "Ḃ",
    Ć: "Ć",
    Ḉ: "Ḉ",
    Č: "Č",
    Ĉ: "Ĉ",
    Ċ: "Ċ",
    Ç: "Ç",
    Ď: "Ď",
    Ḋ: "Ḋ",
    Ḑ: "Ḑ",
    É: "É",
    È: "È",
    Ë: "Ë",
    Ẽ: "Ẽ",
    Ē: "Ē",
    Ḗ: "Ḗ",
    Ḕ: "Ḕ",
    Ĕ: "Ĕ",
    Ḝ: "Ḝ",
    Ě: "Ě",
    Ê: "Ê",
    Ế: "Ế",
    Ề: "Ề",
    Ễ: "Ễ",
    Ė: "Ė",
    Ȩ: "Ȩ",
    Ḟ: "Ḟ",
    Ǵ: "Ǵ",
    Ḡ: "Ḡ",
    Ğ: "Ğ",
    Ǧ: "Ǧ",
    Ĝ: "Ĝ",
    Ġ: "Ġ",
    Ģ: "Ģ",
    Ḧ: "Ḧ",
    Ȟ: "Ȟ",
    Ĥ: "Ĥ",
    Ḣ: "Ḣ",
    Ḩ: "Ḩ",
    Í: "Í",
    Ì: "Ì",
    Ï: "Ï",
    Ḯ: "Ḯ",
    Ĩ: "Ĩ",
    Ī: "Ī",
    Ĭ: "Ĭ",
    Ǐ: "Ǐ",
    Î: "Î",
    İ: "İ",
    Ĵ: "Ĵ",
    Ḱ: "Ḱ",
    Ǩ: "Ǩ",
    Ķ: "Ķ",
    Ĺ: "Ĺ",
    Ľ: "Ľ",
    Ļ: "Ļ",
    Ḿ: "Ḿ",
    Ṁ: "Ṁ",
    Ń: "Ń",
    Ǹ: "Ǹ",
    Ñ: "Ñ",
    Ň: "Ň",
    Ṅ: "Ṅ",
    Ņ: "Ņ",
    Ó: "Ó",
    Ò: "Ò",
    Ö: "Ö",
    Ȫ: "Ȫ",
    Õ: "Õ",
    Ṍ: "Ṍ",
    Ṏ: "Ṏ",
    Ȭ: "Ȭ",
    Ō: "Ō",
    Ṓ: "Ṓ",
    Ṑ: "Ṑ",
    Ŏ: "Ŏ",
    Ǒ: "Ǒ",
    Ô: "Ô",
    Ố: "Ố",
    Ồ: "Ồ",
    Ỗ: "Ỗ",
    Ȯ: "Ȯ",
    Ȱ: "Ȱ",
    Ő: "Ő",
    Ṕ: "Ṕ",
    Ṗ: "Ṗ",
    Ŕ: "Ŕ",
    Ř: "Ř",
    Ṙ: "Ṙ",
    Ŗ: "Ŗ",
    Ś: "Ś",
    Ṥ: "Ṥ",
    Š: "Š",
    Ṧ: "Ṧ",
    Ŝ: "Ŝ",
    Ṡ: "Ṡ",
    Ş: "Ş",
    Ť: "Ť",
    Ṫ: "Ṫ",
    Ţ: "Ţ",
    Ú: "Ú",
    Ù: "Ù",
    Ü: "Ü",
    Ǘ: "Ǘ",
    Ǜ: "Ǜ",
    Ǖ: "Ǖ",
    Ǚ: "Ǚ",
    Ũ: "Ũ",
    Ṹ: "Ṹ",
    Ū: "Ū",
    Ṻ: "Ṻ",
    Ŭ: "Ŭ",
    Ǔ: "Ǔ",
    Û: "Û",
    Ů: "Ů",
    Ű: "Ű",
    Ṽ: "Ṽ",
    Ẃ: "Ẃ",
    Ẁ: "Ẁ",
    Ẅ: "Ẅ",
    Ŵ: "Ŵ",
    Ẇ: "Ẇ",
    Ẍ: "Ẍ",
    Ẋ: "Ẋ",
    Ý: "Ý",
    Ỳ: "Ỳ",
    Ÿ: "Ÿ",
    Ỹ: "Ỹ",
    Ȳ: "Ȳ",
    Ŷ: "Ŷ",
    Ẏ: "Ẏ",
    Ź: "Ź",
    Ž: "Ž",
    Ẑ: "Ẑ",
    Ż: "Ż",
    ά: "ά",
    ὰ: "ὰ",
    ᾱ: "ᾱ",
    ᾰ: "ᾰ",
    έ: "έ",
    ὲ: "ὲ",
    ή: "ή",
    ὴ: "ὴ",
    ί: "ί",
    ὶ: "ὶ",
    ϊ: "ϊ",
    ΐ: "ΐ",
    ῒ: "ῒ",
    ῑ: "ῑ",
    ῐ: "ῐ",
    ό: "ό",
    ὸ: "ὸ",
    ύ: "ύ",
    ὺ: "ὺ",
    ϋ: "ϋ",
    ΰ: "ΰ",
    ῢ: "ῢ",
    ῡ: "ῡ",
    ῠ: "ῠ",
    ώ: "ώ",
    ὼ: "ὼ",
    Ύ: "Ύ",
    Ὺ: "Ὺ",
    Ϋ: "Ϋ",
    Ῡ: "Ῡ",
    Ῠ: "Ῠ",
    Ώ: "Ώ",
    Ὼ: "Ὼ",
  };
class Ke {
  constructor(e, t) {
    (this.mode = void 0),
      (this.gullet = void 0),
      (this.settings = void 0),
      (this.leftrightDepth = void 0),
      (this.nextToken = void 0),
      (this.mode = "math"),
      (this.gullet = new Gi(e, t, this.mode)),
      (this.settings = t),
      (this.leftrightDepth = 0);
  }
  expect(e, t) {
    if ((t === void 0 && (t = !0), this.fetch().text !== e))
      throw new T(
        "Expected '" + e + "', got '" + this.fetch().text + "'",
        this.fetch()
      );
    t && this.consume();
  }
  consume() {
    this.nextToken = null;
  }
  fetch() {
    return (
      this.nextToken == null &&
        (this.nextToken = this.gullet.expandNextToken()),
      this.nextToken
    );
  }
  switchMode(e) {
    (this.mode = e), this.gullet.switchMode(e);
  }
  parse() {
    this.settings.globalGroup || this.gullet.beginGroup(),
      this.settings.colorIsTextColor &&
        this.gullet.macros.set("\\color", "\\textcolor");
    try {
      var e = this.parseExpression(!1);
      return (
        this.expect("EOF"),
        this.settings.globalGroup || this.gullet.endGroup(),
        e
      );
    } finally {
      this.gullet.endGroups();
    }
  }
  subparse(e) {
    var t = this.nextToken;
    this.consume(),
      this.gullet.pushToken(new g0("}")),
      this.gullet.pushTokens(e);
    var a = this.parseExpression(!1);
    return this.expect("}"), (this.nextToken = t), a;
  }
  parseExpression(e, t) {
    for (var a = []; ; ) {
      this.mode === "math" && this.consumeSpaces();
      var n = this.fetch();
      if (
        Ke.endOfExpression.indexOf(n.text) !== -1 ||
        (t && n.text === t) ||
        (e && W0[n.text] && W0[n.text].infix)
      )
        break;
      var i = this.parseAtom(t);
      if (i) {
        if (i.type === "internal") continue;
      } else break;
      a.push(i);
    }
    return (
      this.mode === "text" && this.formLigatures(a), this.handleInfixNodes(a)
    );
  }
  handleInfixNodes(e) {
    for (var t = -1, a, n = 0; n < e.length; n++)
      if (e[n].type === "infix") {
        if (t !== -1)
          throw new T("only one infix operator per group", e[n].token);
        (t = n), (a = e[n].replaceWith);
      }
    if (t !== -1 && a) {
      var i,
        o,
        u = e.slice(0, t),
        c = e.slice(t + 1);
      u.length === 1 && u[0].type === "ordgroup"
        ? (i = u[0])
        : (i = { type: "ordgroup", mode: this.mode, body: u }),
        c.length === 1 && c[0].type === "ordgroup"
          ? (o = c[0])
          : (o = { type: "ordgroup", mode: this.mode, body: c });
      var d;
      return (
        a === "\\\\abovefrac"
          ? (d = this.callFunction(a, [i, e[t], o], []))
          : (d = this.callFunction(a, [i, o], [])),
        [d]
      );
    } else return e;
  }
  handleSupSubscript(e) {
    var t = this.fetch(),
      a = t.text;
    this.consume(), this.consumeSpaces();
    var n = this.parseGroup(e);
    if (!n) throw new T("Expected group after '" + a + "'", t);
    return n;
  }
  formatUnsupportedCmd(e) {
    for (var t = [], a = 0; a < e.length; a++)
      t.push({ type: "textord", mode: "text", text: e[a] });
    var n = { type: "text", mode: this.mode, body: t },
      i = {
        type: "color",
        mode: this.mode,
        color: this.settings.errorColor,
        body: [n],
      };
    return i;
  }
  parseAtom(e) {
    var t = this.parseGroup("atom", e);
    if (this.mode === "text") return t;
    for (var a, n; ; ) {
      this.consumeSpaces();
      var i = this.fetch();
      if (i.text === "\\limits" || i.text === "\\nolimits") {
        if (t && t.type === "op") {
          var o = i.text === "\\limits";
          (t.limits = o), (t.alwaysHandleSupSub = !0);
        } else if (t && t.type === "operatorname")
          t.alwaysHandleSupSub && (t.limits = i.text === "\\limits");
        else throw new T("Limit controls must follow a math operator", i);
        this.consume();
      } else if (i.text === "^") {
        if (a) throw new T("Double superscript", i);
        a = this.handleSupSubscript("superscript");
      } else if (i.text === "_") {
        if (n) throw new T("Double subscript", i);
        n = this.handleSupSubscript("subscript");
      } else if (i.text === "'") {
        if (a) throw new T("Double superscript", i);
        var u = { type: "textord", mode: this.mode, text: "\\prime" },
          c = [u];
        for (this.consume(); this.fetch().text === "'"; )
          c.push(u), this.consume();
        this.fetch().text === "^" &&
          c.push(this.handleSupSubscript("superscript")),
          (a = { type: "ordgroup", mode: this.mode, body: c });
      } else if (Ie[i.text]) {
        var d = Ur.test(i.text),
          f = [];
        for (f.push(new g0(Ie[i.text])), this.consume(); ; ) {
          var g = this.fetch().text;
          if (!Ie[g] || Ur.test(g) !== d) break;
          f.unshift(new g0(Ie[g])), this.consume();
        }
        var x = this.subparse(f);
        d
          ? (n = { type: "ordgroup", mode: "math", body: x })
          : (a = { type: "ordgroup", mode: "math", body: x });
      } else break;
    }
    return a || n
      ? { type: "supsub", mode: this.mode, base: t, sup: a, sub: n }
      : t;
  }
  parseFunction(e, t) {
    var a = this.fetch(),
      n = a.text,
      i = W0[n];
    if (!i) return null;
    if ((this.consume(), t && t !== "atom" && !i.allowedInArgument))
      throw new T(
        "Got function '" + n + "' with no arguments" + (t ? " as " + t : ""),
        a
      );
    if (this.mode === "text" && !i.allowedInText)
      throw new T("Can't use function '" + n + "' in text mode", a);
    if (this.mode === "math" && i.allowedInMath === !1)
      throw new T("Can't use function '" + n + "' in math mode", a);
    var { args: o, optArgs: u } = this.parseArguments(n, i);
    return this.callFunction(n, o, u, a, e);
  }
  callFunction(e, t, a, n, i) {
    var o = { funcName: e, parser: this, token: n, breakOnTokenText: i },
      u = W0[e];
    if (u && u.handler) return u.handler(o, t, a);
    throw new T("No function handler for " + e);
  }
  parseArguments(e, t) {
    var a = t.numArgs + t.numOptionalArgs;
    if (a === 0) return { args: [], optArgs: [] };
    for (var n = [], i = [], o = 0; o < a; o++) {
      var u = t.argTypes && t.argTypes[o],
        c = o < t.numOptionalArgs;
      ((t.primitive && u == null) ||
        (t.type === "sqrt" && o === 1 && i[0] == null)) &&
        (u = "primitive");
      var d = this.parseGroupOfType("argument to '" + e + "'", u, c);
      if (c) i.push(d);
      else if (d != null) n.push(d);
      else throw new T("Null argument, please report this as a bug");
    }
    return { args: n, optArgs: i };
  }
  parseGroupOfType(e, t, a) {
    switch (t) {
      case "color":
        return this.parseColorGroup(a);
      case "size":
        return this.parseSizeGroup(a);
      case "url":
        return this.parseUrlGroup(a);
      case "math":
      case "text":
        return this.parseArgumentGroup(a, t);
      case "hbox": {
        var n = this.parseArgumentGroup(a, "text");
        return n != null
          ? { type: "styling", mode: n.mode, body: [n], style: "text" }
          : null;
      }
      case "raw": {
        var i = this.parseStringGroup("raw", a);
        return i != null ? { type: "raw", mode: "text", string: i.text } : null;
      }
      case "primitive": {
        if (a) throw new T("A primitive argument cannot be optional");
        var o = this.parseGroup(e);
        if (o == null) throw new T("Expected group as " + e, this.fetch());
        return o;
      }
      case "original":
      case null:
      case void 0:
        return this.parseArgumentGroup(a);
      default:
        throw new T("Unknown group type as " + e, this.fetch());
    }
  }
  consumeSpaces() {
    for (; this.fetch().text === " "; ) this.consume();
  }
  parseStringGroup(e, t) {
    var a = this.gullet.scanArgument(t);
    if (a == null) return null;
    for (var n = "", i; (i = this.fetch()).text !== "EOF"; )
      (n += i.text), this.consume();
    return this.consume(), (a.text = n), a;
  }
  parseRegexGroup(e, t) {
    for (
      var a = this.fetch(), n = a, i = "", o;
      (o = this.fetch()).text !== "EOF" && e.test(i + o.text);

    )
      (n = o), (i += n.text), this.consume();
    if (i === "") throw new T("Invalid " + t + ": '" + a.text + "'", a);
    return a.range(n, i);
  }
  parseColorGroup(e) {
    var t = this.parseStringGroup("color", e);
    if (t == null) return null;
    var a = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
    if (!a) throw new T("Invalid color: '" + t.text + "'", t);
    var n = a[0];
    return (
      /^[0-9a-f]{6}$/i.test(n) && (n = "#" + n),
      { type: "color-token", mode: this.mode, color: n }
    );
  }
  parseSizeGroup(e) {
    var t,
      a = !1;
    if (
      (this.gullet.consumeSpaces(),
      !e && this.gullet.future().text !== "{"
        ? (t = this.parseRegexGroup(
            /^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/,
            "size"
          ))
        : (t = this.parseStringGroup("size", e)),
      !t)
    )
      return null;
    !e && t.text.length === 0 && ((t.text = "0pt"), (a = !0));
    var n = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
    if (!n) throw new T("Invalid size: '" + t.text + "'", t);
    var i = { number: +(n[1] + n[2]), unit: n[3] };
    if (!_r(i)) throw new T("Invalid unit: '" + i.unit + "'", t);
    return { type: "size", mode: this.mode, value: i, isBlank: a };
  }
  parseUrlGroup(e) {
    this.gullet.lexer.setCatcode("%", 13),
      this.gullet.lexer.setCatcode("~", 12);
    var t = this.parseStringGroup("url", e);
    if (
      (this.gullet.lexer.setCatcode("%", 14),
      this.gullet.lexer.setCatcode("~", 13),
      t == null)
    )
      return null;
    var a = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
    return { type: "url", mode: this.mode, url: a };
  }
  parseArgumentGroup(e, t) {
    var a = this.gullet.scanArgument(e);
    if (a == null) return null;
    var n = this.mode;
    t && this.switchMode(t), this.gullet.beginGroup();
    var i = this.parseExpression(!1, "EOF");
    this.expect("EOF"), this.gullet.endGroup();
    var o = { type: "ordgroup", mode: this.mode, loc: a.loc, body: i };
    return t && this.switchMode(n), o;
  }
  parseGroup(e, t) {
    var a = this.fetch(),
      n = a.text,
      i;
    if (n === "{" || n === "\\begingroup") {
      this.consume();
      var o = n === "{" ? "}" : "\\endgroup";
      this.gullet.beginGroup();
      var u = this.parseExpression(!1, o),
        c = this.fetch();
      this.expect(o),
        this.gullet.endGroup(),
        (i = {
          type: "ordgroup",
          mode: this.mode,
          loc: c0.range(a, c),
          body: u,
          semisimple: n === "\\begingroup" || void 0,
        });
    } else if (
      ((i = this.parseFunction(t, e) || this.parseSymbol()),
      i == null && n[0] === "\\" && !Va.hasOwnProperty(n))
    ) {
      if (this.settings.throwOnError)
        throw new T("Undefined control sequence: " + n, a);
      (i = this.formatUnsupportedCmd(n)), this.consume();
    }
    return i;
  }
  formLigatures(e) {
    for (var t = e.length - 1, a = 0; a < t; ++a) {
      var n = e[a],
        i = n.text;
      i === "-" &&
        e[a + 1].text === "-" &&
        (a + 1 < t && e[a + 2].text === "-"
          ? (e.splice(a, 3, {
              type: "textord",
              mode: "text",
              loc: c0.range(n, e[a + 2]),
              text: "---",
            }),
            (t -= 2))
          : (e.splice(a, 2, {
              type: "textord",
              mode: "text",
              loc: c0.range(n, e[a + 1]),
              text: "--",
            }),
            (t -= 1))),
        (i === "'" || i === "`") &&
          e[a + 1].text === i &&
          (e.splice(a, 2, {
            type: "textord",
            mode: "text",
            loc: c0.range(n, e[a + 1]),
            text: i + i,
          }),
          (t -= 1));
    }
  }
  parseSymbol() {
    var e = this.fetch(),
      t = e.text;
    if (/^\\verb[^a-zA-Z]/.test(t)) {
      this.consume();
      var a = t.slice(5),
        n = a.charAt(0) === "*";
      if ((n && (a = a.slice(1)), a.length < 2 || a.charAt(0) !== a.slice(-1)))
        throw new T(`\\verb assertion failed --
                    please report what input caused this bug`);
      return (
        (a = a.slice(1, -1)), { type: "verb", mode: "text", body: a, star: n }
      );
    }
    Gr.hasOwnProperty(t[0]) &&
      !X[this.mode][t[0]] &&
      (this.settings.strict &&
        this.mode === "math" &&
        this.settings.reportNonstrict(
          "unicodeTextInMathMode",
          'Accented Unicode text character "' + t[0] + '" used in math mode',
          e
        ),
      (t = Gr[t[0]] + t.slice(1)));
    var i = Fi.exec(t);
    i &&
      ((t = t.substring(0, i.index)),
      t === "i" ? (t = "ı") : t === "j" && (t = "ȷ"));
    var o;
    if (X[this.mode][t]) {
      this.settings.strict &&
        this.mode === "math" &&
        Bt.indexOf(t) >= 0 &&
        this.settings.reportNonstrict(
          "unicodeTextInMathMode",
          'Latin-1/Unicode text character "' + t[0] + '" used in math mode',
          e
        );
      var u = X[this.mode][t].group,
        c = c0.range(e),
        d;
      if (Dn.hasOwnProperty(u)) {
        var f = u;
        d = { type: "atom", mode: this.mode, family: f, loc: c, text: t };
      } else d = { type: u, mode: this.mode, loc: c, text: t };
      o = d;
    } else if (t.charCodeAt(0) >= 128)
      this.settings.strict &&
        ($r(t.charCodeAt(0))
          ? this.mode === "math" &&
            this.settings.reportNonstrict(
              "unicodeTextInMathMode",
              'Unicode text character "' + t[0] + '" used in math mode',
              e
            )
          : this.settings.reportNonstrict(
              "unknownSymbol",
              'Unrecognized Unicode character "' +
                t[0] +
                '"' +
                (" (" + t.charCodeAt(0) + ")"),
              e
            )),
        (o = { type: "textord", mode: "text", loc: c0.range(e), text: t });
    else return null;
    if ((this.consume(), i))
      for (var g = 0; g < i[0].length; g++) {
        var x = i[0][g];
        if (!vt[x]) throw new T("Unknown accent ' " + x + "'", e);
        var y = vt[x][this.mode] || vt[x].text;
        if (!y)
          throw new T(
            "Accent " + x + " unsupported in " + this.mode + " mode",
            e
          );
        o = {
          type: "accent",
          mode: this.mode,
          loc: c0.range(e),
          label: y,
          isStretchy: !1,
          isShifty: !0,
          base: o,
        };
      }
    return o;
  }
}
Ke.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
var _t = function (e, t) {
    if (!(typeof e == "string" || e instanceof String))
      throw new TypeError("KaTeX can only parse string typed expression");
    var a = new Ke(e, t);
    delete a.gullet.macros.current["\\df@tag"];
    var n = a.parse();
    if (
      (delete a.gullet.macros.current["\\current@color"],
      delete a.gullet.macros.current["\\color"],
      a.gullet.macros.get("\\df@tag"))
    ) {
      if (!t.displayMode) throw new T("\\tag works only in display equations");
      n = [
        {
          type: "tag",
          mode: "text",
          body: n,
          tag: a.subparse([new g0("\\df@tag")]),
        },
      ];
    }
    return n;
  },
  Wa = function (e, t, a) {
    t.textContent = "";
    var n = er(e, a).toNode();
    t.appendChild(n);
  };
typeof document < "u" &&
  document.compatMode !== "CSS1Compat" &&
  (typeof console < "u" &&
    console.warn(
      "Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."
    ),
  (Wa = function () {
    throw new T("KaTeX doesn't work in quirks mode.");
  }));
var Vi = function (e, t) {
    var a = er(e, t).toMarkup();
    return a;
  },
  Wi = function (e, t) {
    var a = new Ot(t);
    return _t(e, a);
  },
  Ya = function (e, t, a) {
    if (a.throwOnError || !(e instanceof T)) throw e;
    var n = w.makeSpan(["katex-error"], [new b0(t)]);
    return (
      n.setAttribute("title", e.toString()),
      n.setAttribute("style", "color:" + a.errorColor),
      n
    );
  },
  er = function (e, t) {
    var a = new Ot(t);
    try {
      var n = _t(e, a);
      return _n(n, e, a);
    } catch (i) {
      return Ya(i, e, a);
    }
  },
  Yi = function (e, t) {
    var a = new Ot(t);
    try {
      var n = _t(e, a);
      return ei(n, e, a);
    } catch (i) {
      return Ya(i, e, a);
    }
  },
  Qi = "0.16.21",
  Xi = {
    Span: ye,
    Anchor: Ft,
    SymbolNode: b0,
    SvgNode: O0,
    PathNode: Q0,
    LineNode: zt,
  },
  Vr = {
    version: Qi,
    render: Wa,
    renderToString: Vi,
    ParseError: T,
    SETTINGS_SCHEMA: qe,
    __parse: Wi,
    __renderToDomTree: er,
    __renderToHTMLTree: Yi,
    __setFontMetrics: An,
    __defineSymbol: s,
    __defineFunction: D,
    __defineMacro: m,
    __domTree: Xi,
  };
const ji = new Set(["script", "style", "html", "div", "template"]);
function Ki(r) {
  const e = new Map(),
    t = r.split(""),
    a = [],
    n = [];
  let i = [],
    o = "",
    u = !1,
    c = !1;
  return (
    t.forEach((d, f) => {
      const g = d;
      if (g === "<") {
        (u = !0), (o = ""), n.push(g);
        return;
      }
      if (u)
        if (g === ">" || g === " ") {
          u = !1;
          const x = o.startsWith("/"),
            y = (x ? o.slice(1) : o).toLowerCase();
          x
            ? i[i.length - 1] === y && (i.pop(), (c = i.length > 0))
            : (ji.has(y) && (i.push(y), (c = !0)),
              t[f + 1] === "/" && (i.pop(), (c = i.length > 0)));
        } else /\s/.test(g) || (o += g.toLowerCase());
      if (c) {
        n.push(g);
        return;
      }
      if (d === "$") {
        if (
          (a.push(d),
          a.length === 1 || (a.length === 2 && a.every((x) => x === "$")))
        )
          return;
        if (a[1] !== "$" && a[a.length - 1] === "$") {
          const x = a.slice(1, -1).join(""),
            y = gt();
          try {
            e.set(y, Vr.renderToString(x, { throwOnError: !0 })),
              n.push(y),
              (a.length = 0);
          } catch {
            console.log("非公式：", a.join());
            const k = a.pop();
            n.push(...a.slice(1, -1)), (a.length = 0), a.push(k);
          }
          return;
        }
        if (a[1] === "$" && a[a.length - 2] === "$") {
          const x = a.slice(2, -2).join("").trim(),
            y = gt();
          e.set(y, Vr.renderToString(x, { displayMode: !0, throwOnError: !0 })),
            n.push(y),
            (a.length = 0);
          return;
        }
        return;
      }
      if (a.length) {
        a.push(d);
        return;
      }
      n.push(d);
    }),
    a.length && n.push(...a),
    {
      result: n.join(""),
      extract(d) {
        let f = d;
        for (const [g, x] of e) f = f.replace(g, x);
        return f;
      },
    }
  );
}
const Zi = {
  props: {
    content: { type: String, required: !1 },
    references: { type: Object, required: !0 },
    isPreview: { type: Boolean, default: !1 },
  },
  data() {
    return { md: "" };
  },
  created() {
    const r = new et.Renderer();
    (r.link = ({ href: e, title: t, text: a }) => {
      let n = a,
        i = "";
      return (
        /^\d+$/.test(a) &&
          ((n = `[${a}]`),
          (i = 'style="font-size: 0.8em; vertical-align: top;"')),
        `<a href="${e}" ${i} title="${
          t || ""
        }" target="_blank" rel="noopener noreferrer">${n}</a>`
      );
    }),
      et.setOptions({ renderer: r });
  },
  watch: {
    content: {
      immediate: !0,
      async handler(r) {
        if (!r) return;
        const { result: e, extract: t } = Ki(r),
          a = this.isPreview ? r : e,
          n = this.replaceReferencesLink(a),
          i = await et.parse(n);
        this.md = t(i);
      },
    },
  },
  methods: {
    deleteRemark(r) {
      const e = r.split(`
`);
      return (
        e[e.length - 1].includes("（注") && e.pop(),
        e.join(`
`)
      );
    },
    replaceReferencesLink(r) {
      const e = /\[(\d+)\](?:\["([^"]+)"\])\(([^)]+)\)/g,
        t = this.references.references,
        a = {};
      let n = r;
      (n = this.deleteRemark(n)),
        (n = n.replace(e, (o, u, c, d) => {
          const f = t == null ? void 0 : t.find((g) => g.title === c);
          return f
            ? ((a[u] = f.url),
              c ? `[${u}]["${c}"](${f.url})` : `[${u}](${f.url})`)
            : c
            ? `[${u}]["${c}"](${d})`
            : `[${u}](${d})`;
        }));
      const i = /\[(\d+)\]\(([^)]+)\)/g;
      return (
        (n = n.replace(i, (o, u, c) => {
          const d = a[u];
          return d ? `[${u}](${d})` : `[${u}](${c})`;
        })),
        n
      );
    },
  },
};
var Ji = function () {
    var e = this,
      t = e._self._c;
    return t("div", {
      staticClass: "relative",
      domProps: { innerHTML: e._s(e.md) },
    });
  },
  $i = [],
  _i = jr(Zi, Ji, $i, !1, null, "e77a2a28");
const es = _i.exports,
  ts =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAZ1SURBVHgBlVfNa1xVFD/nvpnJh00yacW01WIqbSJumqC4UTCiqOCiiiitCEmXbkyCCLrS9g+wExB0lxTBdlEkitSl1a0La1EsiDSRGkGrGdPJZGbevfd4zrn3vkmlX0648+68j/M7H7/zOy8Id/CpLlK11QOHMoIXCeAJQBgloCrqVazzuQuGFxk43zyCn92JTbwdYKcXZoFgDhgIEEkv6DdhYYH0PPIf8WcVEZd8BZZaL+Hq/wbuO0Oz6OE9vmOIbwqWicBD+gFxR+EyFgblNvaNVgzi8c2juHTHwHedoZP87Cz4FBUSeq8GC0Dia1gAQ8qB7oxclxOEaLC2eQTnbwvcf5oW+aGZkMKQWYgJRgHzYrPwhzMQouX0hmgxpgChSAZ/LTWP4rGbAvd9Qif5+dkIpCAKKweOeLgM8NgIwfggwYDx0LAAa02gi+uIP1zLBJ2x1BFURzA4Gd2vbb3ajbwA7l20M6ZkFkmcJdK0ypdGwGE9PkL07F7AnhKAcx4sO2UdQW495Px7pYHw+e8VaIFJRFNHQroCDFdurj2NCwVw7yKN8g1fcWpHi3sZVPbeAz2y0+PRgwYyEwxYBuoIuCUFldXh/WoD4NO1Xoka0OANcgr1HjD768ewboIlP83u3M8FI2IDxGiy9zlBn3f41N7gjIlOhWykH6GMkp17exyM9+Vsj21YPuHkCKR2Ze+g2rJ2TvmnwI7JZNkSL3TyG9UBMfDgIMBQiTS9OTtiObWOjXhdkpGwJx8cOtifiz0SWyRHIWPu2TZf52e9M29UT1K1VPnAHiaJlrragEkg+KHdvQIaLnguttBFwJwC8m9xwHcd2GUslJ3DHJRoKK0VOlAf5TNUbZTsRAk9TYm3mBpHiBW4qWBlkloKKAauhPIzsBAMlGA+LtlLreWZjs9CBD48w7FGA4QZ4OES3z3BTAh1Uy6yW5q2UMytDhOIs2dM0b3qukYco5S9Y0DLpWi3PWy2+U5DidWoaofhOekxPk6VmDsTIkxRaKFoXK8KjD9dRZrc5eQ5JRcVEZMeheGyzxl4s+XgCreVpB+izhgM8pa0XUWQYJRTDUNqizzGyxTFVh35dR1wbYPgnv4YMQZgL7otxJVe5tXYctBoWfjln351WppWoLxS3kQVimKCwlfrC2mJdrviQQHs3M8IL487qJQojqDglAC3udBNTm+D149/VeCPrZKgMqmyIN2YpI9ilShIS/lEc51/VrGQtkAImW8qu/H+gTIP47EcdvQEBlsfRKOVMzDz4OKfFVavHuLgkpBvW7FbpL5euV7niOEyG56MQSgZMIBpaBXO0sQewAO7SjTUb9A7y2C8OgBN6WuHyuB9AwADlRzXNjP4u20SUyBKZ4jeqG3J1fcldv8bjm2SFSB0i3jAEfWyJj83bmByr0Efh4b1holUgZ5yORCKa9vqJNnknud1cKeDjbaDS1czuHINwwhDUPqCS8WE77idaJldmNUhT1oDBXv+IQN3cbgYyeQo1FdogqECuq9kcs5oOWTlvHZwWSZGLFT5+UtXDeYUC23S4PRfl2zLXsiyrM52q1L4qQMZPD2WQZkNylBILcRBQR6bXZiaQRAVH6ezgUBIKZOJmbtvwMFwxcG3v1VoS9VPibzi3h9cNlAbrlNONRH0R/cZevJAYIcAlvlLIiqzpUzUTyOOQ0Ejjy1WkBaL94ekfH3cCQ/v6WCJeADoAKJTxZDwxi9Uy1B/ZoyF1cc3qaS/vjsMxCL52OO+y4d0TPukAxBbcrDiYYxrz4PicqXll7rTiaN+ZQKOp6kjR5m1HW6Vdkf0N8xeWc5RBIG4h+ucCeNPlgwQSK0JD+y0MFjOT7Q+Gl7pAvPnw9eGJN0Llm8W+ZM3CwEOK4DKEBBNznOvYzKB+3ie4tQKAoNFloL2u4V67e6lbUJ1/eedsxtLWWamTdRmFWmVyCCTVo2HqZSmU2gndth3J1Suw8NrV/C8OPXF/MjMdpwbvt6+ffZajes8mwQo8Ufmrk6iOCRsHIUBEBQsT+dcVGf0C+fmd8/9F+OmL/Rvnd6YYfK/yzeMQmSq8EnTmoAjoC32CVgzxC3qjn/55u7ajezf8l+YudPro96bGXZ9WkYZhdeowHQZiX5b5D6lHurOuYWmadbOz++v38z2LYG3f17/eP0Fm/spJs0Ev04d4npXXWizOg+MVT53nvt0GaB0YXl+uH47e/8CbwLh4s4OkMcAAAAASUVORK5CYII=",
  rs =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYQSURBVHgBrVdZbFRVGP7OXWY6nc50utFFa4uyxYTOQFzaWtISwYBRaYKBgEDbGJUXoJjwYHwhaGKIBiTBNwmLEg0JAi5RDJE2EJcoOhQVamnpFEhbqJ1p7+xzF/9zobWd3qEl4U9Peu89y/ev3/mHYSbi8XkkVfUxCI0AqzeASkZf+RQ9h+ifn8G4qDOjTVMunZzJkWx6QH0bLWsdA5pWDPQazDikqsJhxP29mZaJmSZkZ1WrYOAEA1tBoFmYqTB4aE+DyNDIbLNGjNQt/4yB5ZyqvWBs530BWinAWKNgK/boycHT0wLLLu9B2rUZD0jI+mpRLqnUU4OnMgKbls4A1ON2YsGCSpSWFiIaiSKRVDENui/d8vHkEl0LmwVDOJhpryAwXPrtBObMqbizkTHouj7+/NffXVhcvQb3FMPYnop0fPg/sMdXKWvGWcrISovVOHFsH3zLl6CEKyAKJtDk8wzoNM6SHn2fHsfmLe8iQ8GEUhKbjZA/JPA3m6o3ZQIdunketcvrUHaPwhtTpIzpaHqlEYN958y9FsLLs5U/mMAGY81Wq774fA8kSUQ3uEX6uHXpw3Q54ZQwAYYowW6X8dXx/bBUEmwb5weBYttoZe0jDxdhSd2T5nOVpkLVdBOENICma9BIEQ6o0n+mcwV05KRUaDS4A2prfJR8BRmshk8SDNZgNdtx4UtoBCjIEq6HR9F+rh3naHT7/0R4eBSJRJz8xWC32ZBXWIi5ixeiYekyPFNXjXwxC6Ih4se2o5g9f4WF1XojuZp50yfqlzyBJB0s2+1wZTsxr7AYWzc04epPv0OLJuDIssOTmwuPyw2HLQuxcBgd53/BG2vWosKZj9UvEaUTdbldTux4swVT483qeYx9Ez9lO2QcO/o+eEQPHPgYDocDeHoBPIFOJBq8uDHQj8uXL6Ojo8McVzqv4FZwGOrmNXB3XQSbPwsDt29h1653YLPbsGN7E4oK89Jtq+TAk8i/tmYRUqkUJFHEQyVlSCaTkF7fhHJPMXrWrcf1a9cQCoUQiUTMEQwG0dPVidHVLXi0sBzGshrEYzG4Hdk8HcyMX+SbjylxTv+iaxpitJFvCIaCcDqdUN7ejQt6AtoHB8AEEcZd4hgXDehaUYvulc9CPHIa+Y97MTQ8TIfp5lk6JeOUOMs53uBEq3OcWTj+2XuoqKhAQVEh0WOuqQSvVIOnq2kG1T4lFRdVVe+UEzPoj25lmvb6vDhz9gekEkn0BQJYuWoLlHBiIm6IA/8xOc4GKh4uwCmqQ40OLC4pgdvtQg+5uKvzH1yh+Pb39yMajUKkcOTn5aGsohzehVWYN2cucinphv4dIv5OIYuUq1+2CYHrtzGRyaj42snVRjt9nADMELgxTHHWKIYKlNFRsGQCSUmCx5OL6toaYh3qRQTh7ilEIJy3qbR6uq5SJcikEA0inpTdQaBDSKdPevPTXS9Ytiovrt4KRVHMBPqk5inEI2FSghQJjWBkZMRMMJ5YCpVShNbFRhRA0vBrfg7tobVKGEufa7E6mhQV2iRVgl9Wzb5pUnYPDA6jt3cA+UU5yBsNIhRVkFQSZrw5c3E3GxTvsUtDlmTo+U6I5KEoKdsduE0uV6aAUir0amH/SRHxgbhkK6ZiTWcwhm+//xmrXqhDfzIKd4TASRnuBR5fnq2xeAzxeJxYLIF4ikb5LMT6bqLA5sTGV3daWksJuk9PDrSNXYseWTWuIUNDt+G15Xjs5ecR++YMcbZmZrGZ6TQkij0fNmIzceNaBPcfwZ791o0mt1bQ2NI4NYHjUbc7fa3Unu6FtZ4mSPP6OiIWw7SYv3N388FrXZId2PvR17inGKwlFfEfuuPPCUKtD3UHdG1NI5JkwOW0m7dVJKZSBRiYXti+VNjfOv6WPi27qg6RZk14kMLY4ZTib574aUqXSQ3ZSdFWTKzOqvFgULmlUxpIy76awL8T7aUBCiMnlpn9gpgqIfLcWxTTnVaTGX9JUMr75ezSU1TtI6RA5X0oEKJ83+2U2Lqo4m/LtIhhhiK6fI2CoTfA5HWzeRhThJNPgFK2jbNgDhFSiLrI6c77D1I+m729Rq2EAAAAAElFTkSuQmCC",
  as =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB1ZeLcYMwDEBFFigjMAIjMEJX6AbdADYIGySdgG7gbpB0AtiAdALVvkiH+NjYYK7Xd6fjgiVLyLYiA/wxCWwAETP9YHmQ3JMkecBRaKeFllpLj3ZaLRejC7Egx2riyARxI2cNjU8DU5SpXc7PE6eVltyhn2u5UiaYEkLRRil9GWMcp4H2lbBvQuxBOG/3rCdlhLOhfI1K4TyDnZg5RBBnH2Umh0jgcyMzhUtR8ZpDZMSeULASZWvbMJQhhfZa0NiWjTZmb80CPo+P4eJw7ipCTO8IgrNQLw226Fh7HB/LNZRljpyDhIX0zAfGOiG45uEsZub3id7zV98hDq6i09EzkwGwwQ8cz7crgB6O50X64gA6ekYrPg7m2cahAvpsHi885kltA7ZjqNCfT8scfAxbfncS4x/0fIVl3uDZeq1hdN4tY/z+azaCQynu0V2KbQWpx5UuCIdiV9gUFClUEBkc/uaVS8nvbzPceS7mzdaUa94oGL8hqXyNlAhic22gjLLzJsRw2pQGdbZkXwp7hSFNqZioEpOYL7ngelte4rho1bAHHLogCR+5hoK64fLFpIBY0HpecXzpwIXA6hDHWy+nZj3NUqQknRF9Oe3gv/ELf2NN9Z+iwWQAAAAASUVORK5CYII=",
  ns =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGuSURBVHgB1ZeBccMgDEWVLtCMwAgewRs0GyQbNBvEG8QbpBtkBI+QdgK6Qa4TqNCIiywDxtj4rv+OS04C8ZARxgD/TYi4Ne1k2g0f0rCWzGTvpt1RCNYQrdqpM62OAZBfwRISkx+ZPQagyX2COaK0Ox2ELwbQsHFXu3cgY3LlW3kKAPkrlokOMgDc4DbgjwLAcxEuzjnWqUO/dCh9KQDUr2bxal+H0ORWu0jgAYB9VAS9F/Ym+CjYZJM2SgTAyp4XFbNv8XmG1KOBcgHI3vpWy7LQJgWaAeBdLT6q4i87SYFyAcjnVnsRdgemkgLNAHBniBb2G8/MCxTSZrP5pr9KuL64vRhARK/0ey8KwErwU7hcqf8UBTAKAQzthcpQk/uN2SvfxiwBcA5UwIevNPlRXFH5uLadCoD9o1gJn+YlyB0dhnXMALCT74T9RN29LyNF6dGiuZXMfR1XbEEKUsUyc4FMAOxfSBqYIhp8Dz2KMQB8XETc5FfIkRl4YOnbpwLg8Bo//VLKgjXo2ZQhAOxfZltYQgKiw/EPE5u5GpYUBdUoBGuK0mtrff2P0xL6BbFPAx0aqdjTAAAAAElFTkSuQmCC",
  is =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACoSURBVHgB1ZPdDYMwDIRtlPd2hHSDsFE7QTtCmYAZukE3aDfoCM0IMEE4hEFWFBTx88JJJ6NL7hOREqKN4jgIITww7pleA1fM/OaobDF+cJkBOLgG4GKishV6+neZveydMiNBjXGFW8m/KUAYmmVqwcOOMpJ9Vvzvs0KtN7RCBW3UcQHn8cPQcn0E8FoLuMF+vFQa4PQNm9FJlzWgf0BPUmebUaXLu6gDbRk98OiBGWwAAAAASUVORK5CYII=",
  Wr =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMRSURBVHgB7Zm/b9NAFMe/dw5SVTpkiGgBIQVRCSaUSJ1gIG3/gIatGz+mdkIZmNPsSDCWBcLG1vQPANyBrRKwgVREpIKgpRJBChUSsY93blTFjs/2uYmdSvlIkWX7xf7m3bu7916AMWNcMAyQ0neRp0Oe04fZaFkcLRhomefYewyIEwmWAnkGd4RAiR5UgEBW+SIGkw4Ny8KmeZ41EZNYgkloiRmoMhKKGEjxJLxGwk1ooiVYepSEPo8r1OftdftIeDP6VyIivcoNbAQNe0yarIPKq4usEcWYRzFa3BcPOMebIYiV5EUGGws/RTWKcaiHF/acB60hCQQqr2fYkyCTQMGL30RZ/nokiG1jPmgyKgU7S5YMAxoyJEuLRBdVE1EZw4w7YZBH8mQNWolUN3097KwIR95NDVVo+HpYbgpIGUOhoc/D3dj9ghGAvHzZG8sZrxFnKEOTvz8O8PHRM7R3dtH5c9h3P3eziNmVZUzM5KADOe4uPEtqX0gIjiVoit1eqaH14ZOvWMnB23fYXq05tjpQznHLe61PsG6esLP+Uim0l0770BkFHSgLLHivuQSXvooCNJHei0r78y40yXZz7GPcHjaGkiscI70cg3zviUuwwYcrOA48SLCwR0+wfQa/es9dgm3KTTFq/MPv3lPvKtGEJpmpSQwVKmJ7T12C5a4imNsgjKkrlyLbyg1EF2/F7ZdLaJXk1x7ej+TlzNlJzK4uQ4dupe2if+OwsAUNJqZzmFuvInfD33tSaPb6Vcw9rTq2OtAisOm9duqSnz4Pd+PYRMrIcPCrOnzzYUG9AqSMpdDgK1hm+ql6WaCuKkSVNR15+Z7uEjcIBO0FtlCPsFKwE8sWbiNhBHWBglpXgZ0fOSzU+6ogOWpmSMsqtFVlXqBOjJ3AJJRdn2m2FmYWvRm4J8pk/JgNuFch54kMvait10jNQIk5zRq088zT5wUGBJVAJokt6vSJU2loO0JFAg1tL3Ibp4bHEuXR5TDxUiTZbJFtPfG/DFSU9qmItahqoVKLU/XSLQiaJxE4ZkwI/wEKMiDSrNv5JAAAAABJRU5ErkJggg==",
  Yr =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHuSURBVHgB7ZnRbcMgEIbPncCdoGxQb1BG6AbOCN0g2aDZwNkg3QB1giQTWJ3A7QQU5EM5uTZQDLYf+KQTisHw+zisOwcgk5YCIiOlLFVT4c9rURTfsEWU0J0yIf9yUVbDVtAeVXYmArXoBo0+wBm9v7rgM/EkH+lnylrzMLAmGAYSBZWWcSU+kOYN1oJ4jnmMZWYnYA3UwtV/t5nENINAHiAchu0n+HPD9hkCmSM45MSbd/IjBDJH8CpkwanJglOTBacmC06NVTBmY5cl8ljM6IQrm3N5mENf7iyReDNcz5pn+IYEg7h0I9e8nOISfMWWWfpewB8z9mukzxSuNwhFlzyYvzYT/V1AAt9O9J+wn0MoeBA6tHKk/+CbxJPkvZ7ob/U6MBc1ydGxkBEixjyNnhW28ojUhg1EEMxtheagwDTCD2hicL2cWKP1DS1f0aaUf7eM2ZGFKTqcDpb79tG8SyY1sTwZGmSsLk5f8QEqx9ia7B6DmJDQcIr2nK8m83FIgbwfDs0eAtGhRebZQUrQ0y3ZSm9v470XEtsclkD2r6oT8ZIW3mDsVthvTO/KUd7PgEZEj1lP4Xwg3IWY69UoH7Rl/37laE/Y6msnZT/Q5x0fW/643cqJnGEuuURKTRZM2OYBGwPfv+v/AZMJ4Bf9SOxtPl60RgAAAABJRU5ErkJggg==",
  Qr =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANJSURBVHgB1ZlPctMwFMa/pyb83bSbFmaYoblBegLcXiDhBE1PQG/Q9ATQE7ScoLBnUvcG4QRkwQxDWRA2hYGJxXsCBUV1asux0vItYlt/PD/Ln56eHOA/E+GWKfmgV9U9dKHwLPuFo/QJDd36Bm6Bkk96UxG6GugQIbHlqoFvfNh3294YMEMmMoqkkVhI93Uz/FB/R9/vt1RLCKTS/Lob2GWi1XntDOwlttMWjc3oKxxYe0QdYdePPDTdKaSe32cGlvuTwikXt1XTVO/VDmwg76Pn+/E6SKfJa4bdn8I+wBlboG0qM5zLoRbgIj+WkcCebVDP3M+HNbxIsQjw1I8r6PDlJqpQ5sCK1EO85MIpLN92mD6mEUKA5alxBwmHms6MHxdUluGQYfr2eudCH/O9e24brf/YAUXAM35U/MQlJk3dsKadxht7fuUlJh91G00GdPwYQ1dgv+gDNmo/p+l4sEFr9sKMcJ1+rBl2xg6iBsP2ODAfY0kKgRWRYwcRL+HxXruvUFjT5284s2rwZBphCWLYPYY9sddlYN1wZqXY0H2Jg4ioKrAi378iJT8StDVhiAjyYZMLvVsG1vT1/CtS9kQ3sV0rNGGcEbZ8WI5GJyXvMOa+qV84BU7XaFwbtMCCM671f7uFQFjoDO/zypV7IdBn67TFp4eoKvZdNuGRnYVth8CKeMLltld5hTIR2XutoMkoE4T9OnhEiTuzJQHnWHqKQPnhzKpwPTMZPx/YKl1eqjfdpEeSbS4bqgzpuxy/iXY+a4HtIkwjHrQWqgAvosqrKOFksE57eVUKEUUreIEK4jkw14rRgCXrIycJD9KP+ZEqGjAn+gkqiMPZuezp5t4XkcQ5SgcVRDmrm6towDxSLVQQh9P0uvp4k47wFOEa+d/SfEWNEsGi60dXFHOEx8FdNN4WtYkHnJkvj0GaXN7gCHPynQa1LwhnVvHCWmCaWhTOrKIBZ3fD0smicGYVDVhya6LStigMZ1Zxk59JyY1A+QeLC2xyZMJRUbsy4cwq+sKRNdEv2ieWCWdW0YHN5naC53w6yqsvG86slrI0yx6Po8A2cqAJYfF6abmEhfbtkSF4N71cJV/5/4ufeCWbWVksBs6HljL6DQFshBWNhXVHAAAAAElFTkSuQmCC",
  Xr =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOcSURBVHgB1ZldTttAFIXPzDhRBUWiK2jYQXis+GlMG1CfSFcArKDsgLCClhUQVgB9qJD4kU1bxGu6A5YQnkM8vTdhgmOc2BMyKT0SyOO5tr9Mrs/cmQD/mQRemI6DYH42UjVI9Z6aB+v+UjPe7+EF6PT0puQV2wQpN6lZgeSzGjrSd3SwG4/9Z8Cn578qnidpFHUF6NCfTESIZkHO1pPXTTUlGFJI1JTEFj16fnikaHqY8X1/sXUaBCWF4h4e0sPpCMfzUSCqjYZ8CsvXKxSOBXRZ98Z2Z+LA/JDXkdpO5mOeL1MjOipgbtfAzqIQ0FXlh+4r/jcR4MF8NJB2Yth1f3Wbj1NgUYAM8Rxgk4+eFJs0fqXeKI6nOCxrDoWvOgZLavr+u1vYAPOnnumoilBqM56P42P2FEHvb/irddO+CH4f0j234zFkb1fm2MuCfMxHXYZiyHz5mB92pY4RsKyOxIk5fvLkH2fX5WIBm/18dKQk7GVwvUfn6imhraq//MY0uiM8mI+6BMeygEWkcRVve2eXP7eFFIfceG4+5pENLEsIcRJvSwhZwZRkC8sydmbkCa1v6WPAtWim2tnwlxumnQcWMTszktUPK3WtoyM4FMNSHdAw7ZywA3Zm1J2T1te6pt2EAyVhL4KbrTywrLidGfUnUQ9tHxOEpiRreRCLSViNTiPnLVqf/JUwebIPTOVRa1LQDKsg6JaPqwVLWGit/6SdHyhTGJpMepHC9zGm6EFXCmoxDnsWBGUb2K6EbKSdTq2rqmQ9HtSC1sj9MjJoN1/XVirxN5sLcDKnY1gqaWdGmX4WBDelNqIKAdWokC7RBf0iPKJiWwrNIxlWU/KNdR5cE6yuwUIC4vajv7SQ3udQvVlUHlpexsANAt5J6xuj1LZ4sJRfMIboGx2ais6Az4JrLsDLGEOvcD/UqZwBi6hbnlqLX152q2H97lJCck1tr0iLk9G3dSWtFzCGpBThqH53+xJCvIWl2M6qib20pJy6xBgKswJcArcs49FB53tWjMscvrO8AkV0wqwYZ8BUV4RW8Rl2ZuTOh7VdmZplZ0bOgD3ZbtjEZ9lZPw6O9PD1hnli2c7WM+zMyLGt5V4IhDnj3AJzjUw1xUFWXB47M3I+cSh5X0fGOjGPnRk5B+4tbtVnztO0/rx2ZjSVqZnXeArST4OmdWMIC02tljDQSKRHUXoNWGjqv4QGtEne1oVvtFM6zzuT8Y2WPPoLuDOIh8XSuWQAAAAASUVORK5CYII=",
  ss = {
    name: "ChatList",
    components: { MarkDown: es },
    mixins: [Q1],
    props: {
      renderMode: { type: String, default: "normal" },
      messageMap: { type: Map, required: !0 },
      currentSessionId: { type: [String, null], required: !0 },
    },
    data() {
      return {
        activeKey: ["1"],
        fileList: [],
        tempSessionId: null,
        sendIsDisabled: !1,
        isInputFocused: !1,
        playSessionId: null,
        modelList: [],
        selectMode: null,
        selectTipWidth: 0,
      };
    },
    computed: {
      isMultiMode() {
        return this.renderMode === "multiple";
      },
    },
    watch: {
      selectMode(r) {
        r &&
          this.$nextTick(() => {
            var e;
            this.selectTipWidth =
              ((e = this.$refs.selectTipRef) == null
                ? void 0
                : e.offsetWidth) || 0;
          });
      },
      recording(r) {
        r &&
          this.$nextTick(() => {
            var e, t;
            this.isMultiMode
              ? (e = this.$refs.multiInputRef) == null || e.focus()
              : (t = this.$refs.inputRef) == null || t.focus();
          });
      },
    },
    created() {
      this.initSpeechHelper();
    },
    methods: {
      handleFocus() {
        this.isInputFocused = !0;
      },
      handleBlur() {
        this.isInputFocused = !1;
      },
      handleBackspace(r) {
        (!this.recogonition || this.recogonition.trim() === "") &&
          ((this.selectMode = null),
          this.$emit("onModelSwitch", null),
          r.preventDefault());
      },
      processData(r, e) {
        let t = "";
        switch (r) {
          case "think":
            return (
              (t = e.history
                ? e.thinking
                : e.answers
                    .filter((a) => a.type === "thinking")
                    .map((a) => a.content)
                    .join("")),
              t
            );
          case "answer":
            return (
              (t = e.history
                ? e.answer
                : e.answers
                    .filter((a) => a.type === "text" || a.type === null)
                    .map((a) => a.content)
                    .join("")),
              t
            );
        }
        return t;
      },
      showThink(r) {
        return r.history
          ? r.thinking
          : r.answers
              .filter((e) => e.type === "thinking")
              .map((e) => e.content)
              .join("");
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const r = this.$refs.messageList;
          r && (r.scrollTop = r.scrollHeight);
        });
      },
      handlePlaySound(r, e) {
        this.playSessionId = e;
        const a = this.$refs.markDownRef.find((n) => n.dataset.sessionId === e);
        if (a) {
          const n = a.innerText;
          r === "play" ? this.playSound(n) : this.stopSound();
        }
      },
      handleToggle() {
        this.currentSessionId || this.toggleRecording(this.recogonition);
      },
      initModel(r) {
        this.modelList = r;
      },
      onModelSwitch(r) {
        var e;
        r.value === ((e = this.selectMode) == null ? void 0 : e.value)
          ? ((this.selectMode = null), this.$emit("onModelSwitch", null))
          : ((this.selectMode = r), this.$emit("onModelSwitch", r));
      },
      sendMessage() {
        this.recording && this.toggleRecording(),
          !this.currentSessionId &&
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
      toClip(r) {
        let e = "";
        r.history
          ? (e = r.answer)
          : (e = r.answers
              .filter((t) => t.type === "text")
              .map((t) => t.content)
              .join("")),
          v1(e),
          this.$message.success("复制成功");
      },
      stopStreaming() {
        this.$emit("stop");
      },
    },
  };
var ls = function () {
    var a;
    var e = this,
      t = e._self._c;
    return t("div", { staticClass: "chat-list" }, [
      t(
        "div",
        { ref: "messageList", staticClass: "message-list" },
        [
          e._l(Array.from(e.messageMap), function ([n, i]) {
            var o;
            return [
              t("div", { staticClass: "message-li user-role" }, [
                t("span", { staticClass: "message-text" }, [
                  e._v(e._s(i.prompt)),
                ]),
                t("img", {
                  staticClass: "w-30px h-30px",
                  attrs: { src: ts, alt: "" },
                }),
              ]),
              t("div", { staticClass: "message-li root-role" }, [
                t("img", {
                  staticClass: "w-30px h-30px",
                  attrs: { src: rs, alt: "" },
                }),
                t(
                  "span",
                  { staticClass: "message-text" },
                  [
                    e.showThink(i)
                      ? t(
                          "a-collapse",
                          {
                            staticClass: "message-collapse",
                            attrs: { bordered: !1 },
                            model: {
                              value: e.activeKey,
                              callback: function (u) {
                                e.activeKey = u;
                              },
                              expression: "activeKey",
                            },
                          },
                          [
                            t(
                              "a-collapse-panel",
                              {
                                key: "1",
                                attrs: { header: "思考过程和问题拆解过程" },
                              },
                              [t("p", [e._v(e._s(e.processData("think", i)))])]
                            ),
                          ],
                          1
                        )
                      : e._e(),
                    !(
                      (o = i == null ? void 0 : i.answers) != null && o.length
                    ) &&
                    e.currentSessionId &&
                    n === e.currentSessionId
                      ? t(
                          "div",
                          [
                            e._v("思考中"),
                            t("a-icon", {
                              staticClass: "ml-8px",
                              attrs: { type: "loading" },
                            }),
                          ],
                          1
                        )
                      : [
                          t("p", { staticClass: "mb-0px" }, [
                            e._v("答案内容如下："),
                          ]),
                          t(
                            "div",
                            {
                              ref: "markDownRef",
                              refInFor: !0,
                              attrs: { "data-session-id": n },
                            },
                            [
                              t("MarkDown", {
                                attrs: {
                                  content: e.processData("answer", i),
                                  references: i,
                                },
                              }),
                            ],
                            1
                          ),
                        ],
                  ],
                  2
                ),
                e.currentSessionId && n === e.currentSessionId
                  ? e._e()
                  : t("div", { staticClass: "extend-column" }, [
                      t("span", { staticClass: "flex items-center pl-5px" }, [
                        e.isPlaying && e.playSessionId === n
                          ? t("img", {
                              staticClass: "w-16px h-16px",
                              attrs: { src: as, alt: "" },
                              on: {
                                click: function (u) {
                                  return e.handlePlaySound("stop", n);
                                },
                              },
                            })
                          : t("img", {
                              staticClass: "w-16px h-16px",
                              attrs: { src: ns, alt: "" },
                              on: {
                                click: function (u) {
                                  return e.handlePlaySound("play", n);
                                },
                              },
                            }),
                        t("img", {
                          staticClass: "w-16px h-16px",
                          attrs: { src: is, alt: "" },
                          on: {
                            click: function (u) {
                              return e.toClip(i);
                            },
                          },
                        }),
                      ]),
                    ]),
              ]),
            ];
          }),
        ],
        2
      ),
      e.isMultiMode
        ? t(
            "div",
            { staticClass: "send-wrap multi-mode-send" },
            [
              e.selectMode
                ? t(
                    "div",
                    { ref: "selectTipRef", staticClass: "current-mode" },
                    [e._v(e._s((a = e.selectMode) == null ? void 0 : a.title))]
                  )
                : e._e(),
              t("a-textarea", {
                ref: "multiInputRef",
                class: ["send-btn", { "disabled-send": !!e.currentSessionId }],
                style: {
                  paddingLeft: e.selectMode
                    ? `${e.selectTipWidth + 15}px`
                    : "10px",
                },
                attrs: {
                  disabled: !!e.currentSessionId,
                  placeholder: "请输入",
                },
                on: {
                  keydown: [
                    function (n) {
                      return !n.type.indexOf("key") &&
                        e._k(n.keyCode, "enter", 13, n.key, "Enter")
                        ? null
                        : e.sendMessage.apply(null, arguments);
                    },
                    function (n) {
                      return !n.type.indexOf("key") &&
                        e._k(n.keyCode, "delete", [8, 46], n.key, [
                          "Backspace",
                          "Delete",
                          "Del",
                        ])
                        ? null
                        : e.handleBackspace.apply(null, arguments);
                    },
                  ],
                  focus: e.handleFocus,
                  blur: e.handleBlur,
                },
                model: {
                  value: e.recogonition,
                  callback: function (n) {
                    e.recogonition = n;
                  },
                  expression: "recogonition",
                },
              }),
              t(
                "div",
                { staticClass: "voice-icon", on: { click: e.handleToggle } },
                [
                  e.recording
                    ? t("img", {
                        staticClass: "stop",
                        attrs: { src: Wr, alt: "" },
                      })
                    : t("img", { attrs: { src: Yr, alt: "" } }),
                ]
              ),
              t(
                "div",
                { staticClass: "send-icon", on: { click: e.sendMessage } },
                [
                  e.isInputFocused
                    ? t("img", { attrs: { src: Qr, alt: "" } })
                    : t("img", { attrs: { src: Xr, alt: "" } }),
                ]
              ),
              t(
                "div",
                { staticClass: "multi-mode" },
                e._l(e.modelList, function (n, i) {
                  var o;
                  return t(
                    "div",
                    {
                      key: i,
                      class: [
                        "mode-item",
                        {
                          "mode-item-active":
                            ((o = e.selectMode) == null ? void 0 : o.value) ===
                            (n == null ? void 0 : n.value),
                        },
                      ],
                      on: {
                        click: function (u) {
                          return e.onModelSwitch(n);
                        },
                      },
                    },
                    [t("span", [e._v(e._s(n == null ? void 0 : n.title))])]
                  );
                }),
                0
              ),
            ],
            1
          )
        : t(
            "div",
            { staticClass: "send-wrap" },
            [
              t("a-textarea", {
                ref: "inputRef",
                class: ["send-btn", { "disabled-send": !!e.currentSessionId }],
                attrs: {
                  disabled: !!e.currentSessionId,
                  placeholder: "请输入",
                },
                on: {
                  keydown: function (n) {
                    return !n.type.indexOf("key") &&
                      e._k(n.keyCode, "enter", 13, n.key, "Enter")
                      ? null
                      : e.sendMessage.apply(null, arguments);
                  },
                  focus: e.handleFocus,
                  blur: e.handleBlur,
                },
                model: {
                  value: e.recogonition,
                  callback: function (n) {
                    e.recogonition = n;
                  },
                  expression: "recogonition",
                },
              }),
              t(
                "div",
                { staticClass: "voice-icon", on: { click: e.handleToggle } },
                [
                  e.recording
                    ? t("img", {
                        staticClass: "stop",
                        attrs: { src: Wr, alt: "" },
                      })
                    : t("img", { attrs: { src: Yr, alt: "" } }),
                ]
              ),
              t(
                "div",
                { staticClass: "send-icon", on: { click: e.sendMessage } },
                [
                  e.isInputFocused
                    ? t("img", { attrs: { src: Qr, alt: "" } })
                    : t("img", { attrs: { src: Xr, alt: "" } }),
                ]
              ),
            ],
            1
          ),
    ]);
  },
  os = [],
  us = jr(ss, ls, os, !1, null, "8b82d4e6");
const fs = us.exports;
export {
  fs as C,
  rs as _,
  cs as a,
  ms as b,
  Wr as c,
  Yr as d,
  Qr as e,
  Xr as f,
  ds as g,
  Q1 as s,
};
