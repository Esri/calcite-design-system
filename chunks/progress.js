import { b as o, L as n, s as t, w as l, C as c, x as a, q as d } from "./index.js";
import { a as v } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const p = o`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{position:relative;display:block;inline-size:100%}.track,.bar{position:absolute;inset-block-start:0px;block-size:2px}.track{z-index:var(--calcite-z-index);inline-size:100%;overflow:hidden;background-color:var(--calcite-progress-background-color, var(--calcite-color-border-3))}.bar{z-index:var(--calcite-z-index);background-color:var(--calcite-progress-fill-color, var(--calcite-color-brand))}@media (forced-colors: active){.track{background-color:highlightText}.bar{background-color:linkText}}.indeterminate{inline-size:20%;animation:looping-progress-bar-ani calc(var(--calcite-internal-animation-timing-medium) / var(--calcite-internal-duration-factor) * 11 / var(--calcite-internal-duration-factor)) linear infinite}.indeterminate.calcite--rtl{animation-name:looping-progress-bar-ani-rtl}.reversed{animation-direction:reverse}.text{padding-inline:0px;padding-block:1rem 0px;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-progress-text-color, var(--calcite-color-text-2))}@keyframes looping-progress-bar-ani{0%{transform:translate3d(-100%,0,0)}50%{inline-size:40%}to{transform:translate3d(600%,0,0)}}@keyframes looping-progress-bar-ani-rtl{0%{transform:translate3d(100%,0,0)}50%{inline-size:40%}to{transform:translate3d(-600%,0,0)}}:host([hidden]){display:none}[hidden]{display:none}`, r = {
  track: "track",
  bar: "bar",
  text: "text"
};
class m extends n {
  constructor() {
    super(...arguments), this.reversed = !1, this.type = "determinate", this.value = 0;
  }
  static {
    this.properties = { label: 1, reversed: 7, text: 1, type: 3, value: 9 };
  }
  static {
    this.styles = p;
  }
  render() {
    const e = this.type === "determinate", i = e ? { width: `${this.value}%` } : {}, s = v(this.el);
    return a`<div .ariaLabel=${this.label || this.text} .ariaValueMax=${e ? "100" : void 0} .ariaValueMin=${e ? "0" : void 0} .ariaValueNow=${e ? this.value : void 0} role=progressbar><div class=${t(r.track)}><div class=${t({
      [r.bar]: !0,
      indeterminate: this.type === "indeterminate",
      [c.rtl]: s === "rtl",
      reversed: this.reversed
    })} style=${l(i)}></div></div>${this.text ? a`<div class=${t(r.text)}>${this.text}</div>` : null}</div>`;
  }
}
d("calcite-progress", m);
export {
  m as Progress
};
