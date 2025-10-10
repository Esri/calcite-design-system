import { b as h, L as g, c as u, s as n, x as p, q as m } from "./index.js";
import { n as f } from "./ref.js";
import { i as v } from "./keyed.js";
import { a as x } from "./dom.js";
import { c as b } from "./observers.js";
import { H as T } from "./Heading.js";
import { l as y } from "./logger.js";
import { u as $ } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const i = {
  header: "header",
  heading: "heading",
  close: "close",
  container: "container",
  tipContainer: "tip-container",
  tipContainerAdvancing: "tip-container--advancing",
  tipContainerRetreating: "tip-container--retreating",
  pagination: "pagination",
  pagePosition: "page-position",
  pageNext: "page-next",
  pagePrevious: "page-previous"
}, c = {
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
  close: "x"
}, k = h`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2);--calcite-tip-manager-height: 19vh}:host *{box-sizing:border-box}:host([closed]){display:none}.header{margin:0;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0;padding:0;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:.5rem}.header{border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);padding-block:0px;padding-inline-end:0px;padding-inline-start:1rem}.header .heading{padding:0;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.container{position:relative;overflow:hidden;outline-color:transparent;min-block-size:150px}.container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.tip-container{margin-block-start:1px;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:1rem;outline-color:transparent;animation-name:none;animation-duration:var(--calcite-animation-timing);block-size:var(--calcite-tip-manager-height)}.tip-container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}::slotted(calcite-tip){margin:0;border-style:none;max-inline-size:var(--calcite-tip-max-width)}.tip-container--advancing{animation-name:tip-advance}.tip-container--retreating{animation-name:tip-retreat}.pagination{display:flex;align-items:center;justify-content:center;padding-inline:0px;padding-block:.75rem .5rem}.page-position{margin-block:0px;margin-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}@keyframes tip-advance{0%{opacity:0;transform:translate3d(50px,0,0) scale(.99)}to{opacity:1;transform:translateZ(0) scale(1)}}@keyframes tip-retreat{0%{opacity:0;transform:translate3d(-50px,0,0) scale(.99)}to{opacity:1;transform:translateZ(0) scale(1)}}:host([hidden]){display:none}[hidden]{display:none}`;
class w extends g {
  constructor() {
    super(...arguments), this.messages = $(), this.mutationObserver = b("mutation", () => this.setUpTips()), this.closed = !1, this.calciteTipManagerClose = u({ cancelable: !1 });
  }
  static {
    this.properties = { direction: 16, groupTitle: 16, selectedIndex: 16, tips: 16, total: 16, closed: 7, headingLevel: 11, messageOverrides: 0 };
  }
  static {
    this.styles = k;
  }
  async nextTip() {
    this.direction = "advancing";
    const e = this.selectedIndex + 1;
    this.selectedIndex = (e + this.total) % this.total;
  }
  async previousTip() {
    this.direction = "retreating";
    const e = this.selectedIndex - 1;
    this.selectedIndex = (e + this.total) % this.total;
  }
  connectedCallback() {
    super.connectedCallback(), this.setUpTips(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  async load() {
    y.deprecated("component", {
      name: "tip-manager",
      removalVersion: 4,
      suggested: "carousel"
    });
  }
  willUpdate(e) {
    e.has("closed") && (this.hasUpdated || this.closed !== !1) && (this.direction = null), e.has("selectedIndex") && this.selectedChangeHandler(), e.has("messages") && this.updateGroupTitle();
  }
  loaded() {
    this.updateGroupTitle();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  selectedChangeHandler() {
    this.showSelectedTip(), this.updateGroupTitle();
  }
  setUpTips() {
    const e = Array.from(this.el.querySelectorAll("calcite-tip"));
    if (this.total = e.length, this.total === 0)
      return;
    const t = this.el.querySelector("calcite-tip[selected]");
    this.tips = e, this.selectedIndex = t ? e.indexOf(t) : 0, e.forEach((a) => {
      a.closeDisabled = !0;
    }), this.showSelectedTip();
  }
  hideTipManager() {
    this.closed = !0, this.calciteTipManagerClose.emit();
  }
  showSelectedTip() {
    this.tips.forEach((e, t) => {
      const a = this.selectedIndex === t;
      e.selected = a, e.hidden = !a;
    });
  }
  updateGroupTitle() {
    if (this.tips) {
      const t = this.tips[this.selectedIndex].closest("calcite-tip-group");
      this.groupTitle = t?.groupTitle || this.messages?.defaultGroupTitle;
    }
  }
  previousClicked() {
    this.previousTip();
  }
  nextClicked() {
    this.nextTip();
  }
  tipManagerKeyDownHandler(e) {
    if (e.target === this.container)
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault(), this.nextTip();
          break;
        case "ArrowLeft":
          e.preventDefault(), this.previousTip();
          break;
        case "Home":
          e.preventDefault(), this.selectedIndex = 0;
          break;
        case "End":
          e.preventDefault(), this.selectedIndex = this.total - 1;
          break;
      }
  }
  storeContainerRef(e) {
    this.container = e;
  }
  renderPagination() {
    const e = x(this.el), { selectedIndex: t, tips: a, total: s, messages: o } = this, r = o.next, l = o.previous, d = o.defaultPaginationLabel;
    return a.length > 1 ? p`<footer class=${n(i.pagination)}><calcite-action class=${n(i.pagePrevious)} .icon=${e === "ltr" ? c.chevronLeft : c.chevronRight} @click=${this.previousClicked} scale=m .text=${l}></calcite-action><span class=${n(i.pagePosition)}>${`${d} ${t + 1}/${s}`}</span><calcite-action class=${n(i.pageNext)} .icon=${e === "ltr" ? c.chevronRight : c.chevronLeft} @click=${this.nextClicked} scale=m .text=${r}></calcite-action></footer>` : null;
  }
  render() {
    const { closed: e, direction: t, headingLevel: a, groupTitle: s, selectedIndex: o, messages: r, total: l } = this, d = r.close;
    return l === 0 ? null : p`<section .ariaHidden=${e} class=${n(i.container)} .hidden=${e} @keydown=${this.tipManagerKeyDownHandler} tabindex=0 ${f(this.storeContainerRef)}><header class=${n(i.header)}>${T({ class: i.heading, level: a, children: s })}<calcite-action class=${n(i.close)} @click=${this.hideTipManager} scale=m .text=${d}><calcite-icon .icon=${c.close} scale=m></calcite-icon></calcite-action></header>${v(o, p`<div class=${n({
      [i.tipContainer]: !0,
      [i.tipContainerAdvancing]: !e && t === "advancing",
      [i.tipContainerRetreating]: !e && t === "retreating"
    })} tabindex=0><slot></slot></div>`)}${this.renderPagination()}</section>`;
  }
}
m("calcite-tip-manager", w);
export {
  w as TipManager
};
