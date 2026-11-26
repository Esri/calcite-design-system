/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as l, L as d, s as h, q as u, b as p, d as x } from "./index.js";
import { c as m } from "./observers.js";
import { i as W } from "./resources2.js";
const r = {
  container: "container",
  containerColumns: "container--columns",
  containerHorizontal: "container--horizontal",
  containerVertical: "container--vertical"
}, g = W("calcite-field-group"), A = l`:host{display:block;inline-size:100%;--calcite-internal-text-area-block-size: auto}.container{display:flex;gap:var(--calcite-field-group-gap, var(--calcite-field-set-gap, var(--calcite-space-md)))}.container--vertical{flex-direction:column;flex-wrap:nowrap}.container--horizontal{flex-direction:row;flex-wrap:wrap}.container--columns{display:grid;place-content:stretch;align-items:start;column-gap:var(--calcite-field-group-column-gap, var(--calcite-field-group-gap, var(--calcite-field-set-gap, var(--calcite-space-md))));grid-template-columns:repeat(var(--calcite-field-group-columns, var(--calcite-internal-field-group-columns, 1)),minmax(0,1fr))}:host([layout=horizontal]) ::slotted(calcite-field-set){inline-size:auto}:host([hidden]){display:none}[hidden]{display:none}`;
class v extends d {
  constructor() {
    super(), this.affixWidthRequestId = 0, this.affixInputs = [], this.mutationObserver = m("mutation", () => this.updateAffixInputs()), this.layout = "vertical", this.prefixAutoWidth = !1, this.suffixAutoWidth = !1, this.listen("calciteInternalAffixChange", this.handleAffixChange);
  }
  static {
    this.properties = { columns: 11, layout: 3, prefixAutoWidth: 7, suffixAutoWidth: 7 };
  }
  static {
    this.styles = A;
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  updated(t) {
    (t.has("prefixAutoWidth") || t.has("suffixAutoWidth")) && this.syncInputsAffixWidths();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  collectOwnedAffixInputs(t) {
    return "affixWidth" in t ? [t] : g(t) ? [] : Array.from(t.children).flatMap((e) => this.collectOwnedAffixInputs(e));
  }
  updateAffixInputs() {
    const t = Array.from(this.el.children).flatMap((e) => this.collectOwnedAffixInputs(e));
    this.affixInputs.filter((e) => !t.includes(e)).forEach((e) => {
      e.affixWidth?.setAffixWidth("prefix", void 0), e.affixWidth?.setAffixWidth("suffix", void 0);
    }), this.affixInputs = t, this.syncInputsAffixWidths();
  }
  handleAffixChange(t) {
    t.stopPropagation(), this.syncInputsAffixWidths();
  }
  async syncInputsAffixWidths() {
    const t = ++this.affixWidthRequestId, e = this.affixInputs, c = ["prefix", "suffix"];
    if (await Promise.all(e.map(async (i) => {
      await i.componentOnReady(), await i.updateComplete, await i.affixWidth?.trailingWidthReady();
    })), t !== this.affixWidthRequestId)
      return;
    for (const i of c)
      e.forEach((a) => a.affixWidth?.setAffixWidth(i, void 0));
    const f = c.filter((i) => i === "prefix" ? this.prefixAutoWidth : this.suffixAutoWidth).map((i) => {
      const a = e.map((s) => {
        const n = s.affixWidth, o = n?.getTrailingWidth(i) ?? 0;
        return {
          provider: n,
          trailingWidth: o,
          width: (n?.getAffixWidth(i) ?? 0) + o
        };
      });
      return { affix: i, widths: a, nextWidth: Math.max(0, ...a.map(({ width: s }) => s)) };
    });
    for (const { affix: i, widths: a, nextWidth: s } of f)
      s && a.forEach(({ provider: n, trailingWidth: o }) => {
        n?.setAffixWidth(i, s - o);
      });
  }
  render() {
    return p`<div class=${h({
      [r.container]: !0,
      [r.containerColumns]: this.layout === "columns",
      [r.containerHorizontal]: this.layout === "horizontal",
      [r.containerVertical]: this.layout === "vertical"
    })} style=${u({ "--calcite-internal-field-group-columns": this.columns })}><slot @slotchange=${this.updateAffixInputs}></slot></div>`;
  }
}
x("calcite-field-group", v);
export {
  v as FieldGroup
};
