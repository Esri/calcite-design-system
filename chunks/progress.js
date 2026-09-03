/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as n, L as o, s as t, F as l, J as c, b as r, d } from "./index.js";
import { u as v } from "./index2.js";
const p = n`:host{position:relative;display:block;inline-size:100%}.track,.bar{position:absolute;inset-block-start:0px;block-size:2px}.track{z-index:var(--calcite-z-index);inline-size:100%;overflow:hidden;background-color:var(--calcite-progress-background-color, var(--calcite-color-border-3))}.bar{z-index:var(--calcite-z-index);background-color:var(--calcite-progress-fill-color, var(--calcite-color-brand))}@media(forced-colors:active){.track{background-color:highlightText}.bar{background-color:linkText}}.indeterminate{inline-size:20%;animation:looping-progress-bar-ani calc(var(--calcite-internal-animation-timing-medium) / var(--calcite-internal-duration-factor) * 11 / var(--calcite-internal-duration-factor)) linear infinite}.indeterminate.calcite--rtl{animation-name:looping-progress-bar-ani-rtl}.reversed{animation-direction:reverse}.text{padding-inline:0px;padding-block:1rem 0px;text-align:center;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-progress-text-color, var(--calcite-color-text-2))}@keyframes looping-progress-bar-ani{0%{transform:translate3d(-100%,0,0)}50%{inline-size:40%}to{transform:translate3d(600%,0,0)}}@keyframes looping-progress-bar-ani-rtl{0%{transform:translate3d(100%,0,0)}50%{inline-size:40%}to{transform:translate3d(-600%,0,0)}}:host([hidden]){display:none}[hidden]{display:none}`, i = {
  track: "track",
  bar: "bar",
  text: "text"
};
class m extends o {
  constructor() {
    super(...arguments), this.direction = v(), this.reversed = !1, this.type = "determinate", this.value = 0;
  }
  static {
    this.properties = { label: 1, reversed: 7, text: 1, type: 3, value: 9 };
  }
  static {
    this.styles = p;
  }
  render() {
    const e = this.type === "determinate", a = e ? { width: `${this.value}%` } : {}, s = this.direction;
    return r`<div .ariaLabel=${this.label || this.text} .ariaValueMax=${e ? "100" : void 0} .ariaValueMin=${e ? "0" : void 0} .ariaValueNow=${e ? this.value : void 0} role=progressbar><div class=${t(i.track)}><div class=${t({
      [i.bar]: !0,
      indeterminate: this.type === "indeterminate",
      [l.rtl]: s === "rtl",
      reversed: this.reversed
    })} style=${c(a)}></div></div>${this.text ? r`<div class=${t(i.text)}>${this.text}</div>` : null}</div>`;
  }
}
d("calcite-progress", m);
export {
  m as Progress
};
