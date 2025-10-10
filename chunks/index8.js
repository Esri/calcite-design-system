/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
class f {
  constructor() {
    this._formatterCache = /* @__PURE__ */ new Map(), this._commonDateTimeFormatterOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZoneName: "shortOffset"
    };
  }
  get name() {
    return "native";
  }
  create(t) {
    return new Date(t);
  }
  increase(t) {
    return new Date(t.getTime() + 864e5);
  }
  formatToIsoDateString(t) {
    const e = t.getFullYear(), n = t.getMonth() + 1, r = t.getDate();
    return `${e}-${n.toString().padStart(2, "0")}-${r.toString().padStart(2, "0")}`;
  }
  isoToTimeZone(t, e) {
    const n = this._toDate(t), o = this._getFormatter(e).formatToParts(n), [i] = o.filter(({ type: s }) => s === "timeZoneName").map(({ value: s }) => s), a = this._getTimeZoneOffsetInMins(i), m = n.getMinutes() - (n.getTimezoneOffset() - a);
    return n.setMinutes(m), n;
  }
  same(t, e) {
    return t.getTime() === e.getTime();
  }
  _toDate(t) {
    return new Date(t);
  }
  _getFormatter(t) {
    t === "Factory" && (t = "Etc/GMT");
    let e = this._formatterCache.get(t);
    return e || (e = new Intl.DateTimeFormat("en-US", {
      timeZone: t,
      ...this._commonDateTimeFormatterOptions
    }), this._formatterCache.set(t, e)), e;
  }
  _getTimeZoneOffsetInMins(t) {
    const [e, ...n] = t.slice(3), [r, o] = n.join("").split(":");
    return (e === "+" ? 1 : -1) * (Number(r) * 60 + Number(o || 0));
  }
}
export {
  f as DateEngine
};
