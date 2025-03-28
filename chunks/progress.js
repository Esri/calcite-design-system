import { d as a, L as s, s as n, n as o, C as l, x as t, h as c } from "./iframe.js";
import { g as d } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const v = a`:host{position:relative;display:block;inline-size:100%}.track,.bar{position:absolute;inset-block-start:0px;block-size:2px}.track{z-index:var(--calcite-z-index);inline-size:100%;overflow:hidden;background-color:var(--calcite-progress-background-color, var(--calcite-color-border-3))}.bar{z-index:var(--calcite-z-index);background-color:var(--calcite-progress-fill-color, var(--calcite-color-brand))}@media (forced-colors: active){.track{background-color:highlightText}.bar{background-color:linkText}}.indeterminate{inline-size:20%;animation:looping-progress-bar-ani calc(var(--calcite-internal-animation-timing-medium) / var(--calcite-internal-duration-factor) * 11 / var(--calcite-internal-duration-factor)) linear infinite}.indeterminate.calcite--rtl{animation-name:looping-progress-bar-ani-rtl}.reversed{animation-direction:reverse}.text{padding-inline:0px;padding-block:1rem 0px;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-progress-text-color, var(--calcite-color-text-2))}@keyframes looping-progress-bar-ani{0%{transform:translate3d(-100%,0,0)}50%{inline-size:40%}to{transform:translate3d(600%,0,0)}}@keyframes looping-progress-bar-ani-rtl{0%{transform:translate3d(100%,0,0)}50%{inline-size:40%}to{transform:translate3d(-600%,0,0)}}:host([hidden]){display:none}[hidden]{display:none}`;
class p extends s {
  constructor() {
    super(...arguments), this.reversed = !1, this.type = "determinate", this.value = 0;
  }
  static {
    this.properties = { label: 1, reversed: 7, text: 1, type: 3, value: 9 };
  }
  static {
    this.styles = v;
  }
  // #endregion
  // #region Rendering
  render() {
    const e = this.type === "determinate", i = e ? { width: `${this.value}%` } : {}, r = d(this.el);
    return t`<div .ariaLabel=${this.label || this.text} .ariaValueMax=${e ? "100" : void 0} .ariaValueMin=${e ? "0" : void 0} .ariaValueNow=${e ? this.value : void 0} role=progressbar><div class="track"><div class=${n({
      bar: !0,
      indeterminate: this.type === "indeterminate",
      [l.rtl]: r === "rtl",
      reversed: this.reversed
    })} style=${o(i)}></div></div>${this.text ? t`<div class="text">${this.text}</div>` : null}</div>`;
  }
}
c("calcite-progress", p);
export {
  p as Progress
};
