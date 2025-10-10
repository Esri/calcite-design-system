import { b as h, L as p, A as f, s as o, x as d, w as z, E as u, d as k, q as x } from "./index.js";
import { g as b } from "./guid.js";
import { u as y } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  percentage: "percentage",
  progressRing: "ring--progress",
  ring: "ring",
  rings: "rings",
  text: "text",
  trackRing: "ring--track"
}, w = h`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{position:relative;margin-inline:auto;display:flex;align-items:center;justify-content:center;opacity:1;flex-direction:column;min-block-size:var(--calcite-loader-size);font-size:var(--calcite-loader-font-size);stroke-width:var(--calcite-internal-stroke-width);fill:none;transform:scale(1);padding-block:var(--calcite-loader-spacing, 4rem)}:host([scale=s]){--calcite-internal-stroke-width: 3;--calcite-internal-text-offset: var(--calcite-spacing-xxs);--calcite-internal-loader-font-size: var(--calcite-font-size--3);--calcite-internal-loader-size: 2rem;--calcite-internal-loader-size-inline: .75rem;--calcite-internal-loader-value-line-height: .625rem}:host([scale=m]){--calcite-internal-stroke-width: 6;--calcite-internal-text-offset: var(--calcite-spacing-sm);--calcite-internal-loader-font-size: var(--calcite-font-size-0);--calcite-internal-loader-size: 4rem;--calcite-internal-loader-size-inline: 1rem;--calcite-internal-loader-value-line-height: 1.375rem}:host([scale=l]){--calcite-internal-stroke-width: 8;--calcite-internal-text-offset: var(--calcite-spacing-md);--calcite-internal-loader-font-size: var(--calcite-font-size-2);--calcite-internal-loader-size: 6rem;--calcite-internal-loader-size-inline: 1.5rem;--calcite-internal-loader-value-line-height: 1.71875rem}.text{display:block;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;margin-block-start:var(--calcite-loader-text-spacing, var(--calcite-internal-text-offset));font-weight:var(--calcite-loader-text-weight, var(--calcite-font-weight-normal));color:var(--calcite-loader-text-color, var(--calcite-color-text-1))}.percentage{display:block;text-align:center;font-size:var(--calcite-loader-font-size);inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));line-height:var(--calcite-internal-loader-value-line-height);align-self:center;color:var(--calcite-loader-text-color, var(--calcite-color-text-1))}.rings{position:relative;display:flex;overflow:visible;opacity:1;inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));block-size:var(--calcite-loader-size, var(--calcite-internal-loader-size))}.ring{position:absolute;inset-block-start:0px;transform-origin:center;overflow:visible;inset-inline-start:0;inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));block-size:var(--calcite-loader-size, var(--calcite-internal-loader-size))}.ring--track{stroke:var(--calcite-loader-track-color, var(--calcite-color-transparent-press))}.ring--progress{stroke:var(--calcite-loader-progress-color, var(--calcite-color-brand));transform:rotate(-90deg);transition:all var(--calcite-internal-animation-timing-fast) linear}:host([type=indeterminate]) .ring--progress{animation:loader-clockwise calc(var(--calcite-internal-animation-timing-slow) / var(--calcite-internal-duration-factor) * 2 / var(--calcite-internal-duration-factor)) linear infinite}:host([inline]){--calcite-internal-stroke-width: 2;position:relative;margin:0;stroke:currentColor;stroke-width:2;padding-block:0px;block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));min-block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));vertical-align:calc(var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline))) * -1 * .2)}:host([inline]) .rings{inset-block-start:0px;margin:0;inset-inline-start:0;inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)))}:host([inline]) .ring{inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)))}:host([inline]) .ring--progress{stroke:var(--calcite-loader-progress-color-inline, currentColor)}:host([complete]){opacity:0;transform:scale(.75);transform-origin:center;transition:opacity var(--calcite-internal-animation-timing-medium) linear 1s,transform var(--calcite-internal-animation-timing-medium) linear 1s}:host([complete]) .rings{opacity:0;transform:scale(.75);transform-origin:center;transition:opacity calc(.18s * var(--calcite-internal-duration-factor)) linear .8s,transform calc(.18s * var(--calcite-internal-duration-factor)) linear .8s}:host([complete]) .percentage{color:var(--calcite-color-brand);transform:scale(1.05);transform-origin:center;transition:color var(--calcite-internal-animation-timing-medium) linear,transform var(--calcite-internal-animation-timing-medium) linear}@keyframes loader-clockwise{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:host([hidden]){display:none}[hidden]{display:none}`;
class $ extends p {
  constructor() {
    super(...arguments), this.messages = y({ name: null }), this.complete = !1, this.inline = !1, this.scale = "m", this.text = "", this.type = "indeterminate", this.value = 0;
  }
  static {
    this.properties = { complete: 7, inline: 7, label: 1, scale: 3, text: 1, type: 3, value: 9 };
  }
  static {
    this.styles = w;
  }
  connectedCallback() {
    super.connectedCallback(), this.updateFormatter();
  }
  load() {
    requestAnimationFrame(() => this.valueChangeHandler());
  }
  willUpdate(e) {
    e.has("value") && (this.hasUpdated || this.value !== 0) && this.valueChangeHandler(), (e.has("type") && (this.hasUpdated || this.type !== "indeterminate") || e.has("messages")) && this.updateFormatter();
  }
  valueChangeHandler() {
    this.complete = this.type.startsWith("determinate") && this.value === 100;
  }
  formatValue() {
    return this.type !== "determinate-value" ? `${this.value}` : this.formatter.format(this.value / 100);
  }
  getSize(e) {
    return {
      s: 32,
      m: 64,
      l: 96
    }[e];
  }
  getInlineSize(e) {
    return {
      s: 12,
      m: 16,
      l: 24
    }[e];
  }
  updateFormatter() {
    this.type !== "determinate-value" || this.formatter?.resolvedOptions().locale === this.messages._lang || (this.formatter = new Intl.NumberFormat(this.messages._lang, {
      style: "percent"
    }));
  }
  render() {
    const { el: e, inline: r, label: l, text: n, type: i, value: v } = this, s = e.id || b(), a = i !== "indeterminate", c = Math.floor(v);
    return this.el.ariaLabel = l, this.el.ariaValueMax = a ? "100" : void 0, this.el.ariaValueMin = a ? "0" : void 0, this.el.ariaValueNow = a ? c.toString() : void 0, f(this.el, "id", s), this.el.role = "progressbar", d`<div class=${o(t.rings)}>${this.renderRing("track")}${this.renderRing("progress")}${!r && a && d`<div class=${o(t.percentage)}>${this.formatValue()}</div>` || ""}</div>${!r && n && d`<div class=${o(t.text)}>${n}</div>` || ""}`;
  }
  renderRing(e) {
    const { inline: r, scale: l, value: n } = this, i = r ? this.getInlineSize(l) : this.getSize(l), s = i * 0.45;
    let a;
    if (e === "progress") {
      const c = 2 * s * Math.PI, m = (this.type.startsWith("determinate") ? n : 24) / 100 * c, g = c - m;
      a = { "stroke-dasharray": `${m} ${g}` };
    }
    return d`<svg aria-hidden=true class=${o({
      [t.ring]: !0,
      [t.trackRing]: e === "track",
      [t.progressRing]: e === "progress"
    })} style=${z(a)} viewBox=${`0 0 ${i} ${i}`}>${k`<circle cx=${i / 2} cy=${i / 2} r=${s ?? u} />`}</svg>`;
  }
}
x("calcite-loader", $);
export {
  $ as Loader
};
