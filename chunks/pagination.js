import { b as P, L as w, c as E, s as r, E as z, x as m, q as X } from "./index.js";
import { i as p } from "./keyed.js";
import { n as f } from "./locale.js";
import { c as L } from "./observers.js";
import { b as g } from "./responsive.js";
import { g as v } from "./component.js";
import { u as M } from "./useT9n.js";
import { u as U } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const s = {
  list: "list",
  listItem: "list-item",
  hiddenItem: "hidden-item",
  page: "page",
  selected: "selected",
  chevron: "chevron",
  disabled: "disabled",
  ellipsis: "ellipsis"
}, b = {
  next: "chevron-right",
  previous: "chevron-left",
  first: "chevron-start",
  last: "chevron-end"
}, F = P`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:flex;writing-mode:horizontal-tb}.list{margin:0;display:flex;list-style-type:none;padding:0;column-gap:var(--calcite-spacing-base)}.list-item{margin:0;display:flex;padding:0}.hidden-item{display:none}:host([scale=s]) .chevron,:host([scale=s]) .page,:host([scale=s]) .ellipsis{block-size:1.5rem;padding-inline:.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;min-inline-size:1.5rem}:host([scale=m]) .chevron,:host([scale=m]) .page,:host([scale=m]) .ellipsis{block-size:2rem;padding-inline:.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;min-inline-size:2rem}:host([scale=l]) .chevron,:host([scale=l]) .page,:host([scale=l]) .ellipsis{block-size:2.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;min-inline-size:2.75rem}:host([scale=l]) .chevron{padding-inline:.625rem}:host([scale=l]) .page,:host([scale=l]) .ellipsis{padding-inline:.75rem}:host button{outline-color:transparent}:host button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.chevron,.page,.ellipsis{margin:0;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-style:none;--tw-border-opacity: 0;background-color:transparent;padding:0;vertical-align:baseline;font-family:inherit;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-pagination-color, var(--calcite-color-text-3))}.chevron,.page{cursor:pointer;border-block:2px solid transparent}.chevron:hover,.page:hover{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-pagination-color-hover, var(--calcite-color-text-1))}.chevron:active,.page:active{color:var(--calcite-pagination-color-hover, var(--calcite-color-text-1))}.page:hover{border-block-end-color:var(--calcite-pagination-color-border-hover, var(--calcite-color-border-2))}.page:active{background-color:var(--calcite-pagination-background-color, var(--calcite-color-foreground-3))}.page.selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-pagination-color-hover, var(--calcite-color-text-1));border-block-end-color:var(--calcite-pagination-color-border-active, var(--calcite-color-brand))}.page.selected:focus{border-block-end-width:var(--calcite-spacing-xxs);padding-block-start:var(--calcite-spacing-base)}.chevron:hover{background-color:var(--calcite-pagination-icon-color-background-hover, var(--calcite-color-foreground-2))}.chevron:active{background-color:var(--calcite-pagination-background-color, var(--calcite-color-foreground-3))}.chevron.disabled{pointer-events:none;background-color:transparent}.chevron.disabled>calcite-icon{opacity:var(--calcite-opacity-disabled)}:host([hidden]){display:none}[hidden]{display:none}`, I = 2, $ = 2, h = {
  large: 11,
  medium: 9,
  small: 7,
  xsmall: 5,
  xxsmall: 1
};
class O extends w {
  constructor() {
    super(...arguments), this.resizeHandler = ({ contentRect: { width: t } }) => this.setMaxItemsToBreakpoint(t), this.resizeObserver = L("resize", (t) => t.forEach(this.resizeHandler)), this.messages = M(), this.focusSetter = U()(this), this.maxItems = h.xxsmall, this.groupSeparator = !1, this.pageSize = 20, this.scale = "m", this.startItem = 1, this.totalItems = 0, this.calcitePaginationChange = E({ cancelable: !1 });
  }
  static {
    this.properties = { isXXSmall: 16, lastStartItem: 16, maxItems: 16, totalPages: 16, groupSeparator: 7, messageOverrides: 0, numberingSystem: 1, pageSize: 11, scale: 3, startItem: 11, totalItems: 11 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = F;
  }
  async goTo(t) {
    switch (t) {
      case "start":
        this.startItem = 1;
        break;
      case "end":
        this.startItem = this.lastStartItem;
        break;
      default:
        t >= Math.ceil(this.totalPages) ? this.startItem = this.lastStartItem : t <= 0 ? this.startItem = 1 : this.startItem = (t - 1) * this.pageSize + 1;
    }
  }
  async nextPage() {
    this.startItem = Math.min(this.lastStartItem, this.startItem + this.pageSize);
  }
  async previousPage() {
    this.startItem = Math.max(1, this.startItem - this.pageSize);
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.resizeObserver?.observe(this.el);
  }
  async load() {
    this.handleTotalPages(), this.handleLastStartItemChange(), this.handleIsXXSmall();
  }
  willUpdate(t) {
    (t.has("totalItems") && (this.hasUpdated || this.totalItems !== 0) || t.has("pageSize") && (this.hasUpdated || this.pageSize !== 20)) && this.handleTotalPages(), (t.has("totalItems") && (this.hasUpdated || this.totalItems !== 0) || t.has("pageSize") && (this.hasUpdated || this.pageSize !== 20) || t.has("totalPages")) && this.handleLastStartItemChange(), t.has("maxItems") && (this.hasUpdated || this.maxItems !== h.xxsmall) && this.handleIsXXSmall(), t.has("messages") && this.effectiveLocaleChange();
  }
  loaded() {
    this.setMaxItemsToBreakpoint(this.el.clientWidth);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  handleTotalPages() {
    this.pageSize = Math.max(1, this.pageSize), this.totalPages = Math.max(1, this.totalItems / this.pageSize);
  }
  effectiveLocaleChange() {
    f.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
  }
  handleLastStartItemChange() {
    const { totalItems: t, pageSize: e } = this;
    this.lastStartItem = Math.max(1, Math.floor((t - 1) / e) * e + 1);
  }
  handleIsXXSmall() {
    this.isXXSmall = this.maxItems === h.xxsmall;
  }
  setMaxItemsToBreakpoint(t) {
    if (!(!g || !t)) {
      if (t >= g.width.medium) {
        this.maxItems = h.large;
        return;
      }
      if (t >= g.width.small) {
        this.maxItems = h.medium;
        return;
      }
      if (t >= g.width.xsmall) {
        this.maxItems = h.small;
        return;
      }
      if (t >= g.width.xxsmall) {
        this.maxItems = h.xsmall;
        return;
      }
      this.maxItems = h.xxsmall;
    }
  }
  firstClicked() {
    this.startItem = 1, this.emitUpdate();
  }
  lastClicked() {
    this.startItem = this.lastStartItem, this.emitUpdate();
  }
  async previousClicked() {
    await this.previousPage(), this.emitUpdate();
  }
  async nextClicked() {
    await this.nextPage(), this.emitUpdate();
  }
  showStartEllipsis() {
    return this.totalPages > this.maxItems && Math.floor(this.startItem / this.pageSize) > this.maxItems - I - $;
  }
  showEndEllipsis() {
    return this.totalPages > this.maxItems && (this.totalItems - this.startItem) / this.pageSize > this.maxItems - I - ($ - 1);
  }
  emitUpdate() {
    this.calcitePaginationChange.emit();
  }
  handlePageClick(t) {
    const e = t.target;
    this.startItem = parseInt(e.value), this.emitUpdate();
  }
  renderEllipsis(t) {
    return p(t, m`<span class=${r(s.ellipsis)} data-test-ellipsis=${t ?? z}>&hellip;</span>`);
  }
  renderItems() {
    const { totalItems: t, pageSize: e, startItem: i, maxItems: a, totalPages: l, lastStartItem: u, isXXSmall: C } = this, o = [];
    if (C)
      return o.push(this.renderPage(i)), o;
    const y = t > e, x = this.showStartEllipsis(), S = this.showEndEllipsis();
    y && o.push(this.renderPage(1)), x && o.push(this.renderEllipsis("start"));
    const n = a - I - (S ? 1 : 0) - (x ? 1 : 0);
    let d, c;
    l - 1 <= n ? (c = 1 + e, d = u - e) : i / e < n ? (c = 1 + e, d = 1 + n * e) : i + n * e >= t ? (c = u - n * e, d = u - e) : (c = i - e * ((n - 1) / 2), d = i + e * ((n - 1) / 2));
    for (let k = 0; k < n && c <= d; k++)
      o.push(this.renderPage(c)), c = c + e;
    return S && o.push(this.renderEllipsis("end")), o.push(this.renderPage(u)), o;
  }
  renderPage(t) {
    const { pageSize: e } = this, i = Math.floor(t / e) + (e === 1 ? 0 : 1);
    f.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const a = f.localize(i.toString()), l = t === this.startItem;
    return m`<li class=${r(s.listItem)}><button .ariaCurrent=${l ? "page" : "false"} class=${r({
      [s.page]: !0,
      [s.selected]: l
    })} @click=${this.handlePageClick} value=${t ?? z}>${a}</button></li>`;
  }
  renderPreviousChevron() {
    const { pageSize: t, startItem: e, messages: i } = this, a = t === 1 ? e <= t : e < t;
    return p("previous", m`<button .ariaLabel=${i.previous} class=${r({
      [s.chevron]: !0,
      [s.disabled]: a
    })} data-test-chevron=previous .disabled=${a} @click=${this.previousClicked}><calcite-icon flip-rtl .icon=${b.previous} .scale=${v(this.scale)}></calcite-icon></button>`);
  }
  renderNextChevron() {
    const { totalItems: t, pageSize: e, startItem: i, messages: a } = this, l = i + e > t;
    return p("next-button", m`<button .ariaLabel=${a.next} class=${r({
      [s.chevron]: !0,
      [s.disabled]: l
    })} data-test-chevron=next .disabled=${l} @click=${this.nextClicked}><calcite-icon flip-rtl .icon=${b.next} .scale=${v(this.scale)}></calcite-icon></button>`);
  }
  renderFirstChevron() {
    const { messages: t, startItem: e, isXXSmall: i } = this, a = e === 1;
    return i ? p("first-button", m`<button .ariaLabel=${t.first} class=${r({
      [s.chevron]: !0,
      [s.disabled]: a
    })} .disabled=${a} @click=${this.firstClicked}><calcite-icon flip-rtl .icon=${b.first} .scale=${v(this.scale)}></calcite-icon></button>`) : null;
  }
  renderLastChevron() {
    const { messages: t, startItem: e, isXXSmall: i, lastStartItem: a } = this, l = e === a;
    return i ? p("last-button", m`<button .ariaLabel=${t.last} class=${r({
      [s.chevron]: !0,
      [s.disabled]: l
    })} .disabled=${l} @click=${this.lastClicked}><calcite-icon flip-rtl .icon=${b.last} .scale=${v(this.scale)}></calcite-icon></button>`) : null;
  }
  render() {
    const t = this.renderFirstChevron(), e = this.renderLastChevron();
    return m`<ul class=${r(s.list)}><li class=${r({
      [s.listItem]: !0,
      [s.hiddenItem]: !t
    })}>${t}</li><li class=${r(s.listItem)}>${this.renderPreviousChevron()}</li>${this.renderItems()}<li class=${r(s.listItem)}>${this.renderNextChevron()}</li><li class=${r({
      [s.listItem]: !0,
      [s.hiddenItem]: !e
    })}>${e}</li></ul>`;
  }
}
X("calcite-pagination", O);
export {
  O as Pagination
};
