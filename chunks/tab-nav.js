import { b as w, L as C, c as f, s as h, C as x, x as g, q as S } from "./index.js";
import { n as y } from "./ref.js";
import { i as k } from "./keyed.js";
import { a as B, b as O, d as E } from "./core.js";
import { a as W, F as p, b as F } from "./dom.js";
import { c as v } from "./observers.js";
import { u as $ } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const I = {
  chevronRight: "chevron-right",
  chevronLeft: "chevron-left"
}, c = {
  container: "container",
  scrollButton: "scroll-button",
  scrollButtonContainer: "scroll-button-container",
  scrollBackwardButton: "scroll-button--backward",
  scrollForwardButton: "scroll-button--forward",
  tabTitleSlotWrapper: "tab-titles-slot-wrapper",
  scale: (b) => `scale-${b}`,
  position: (b) => `position-${b}`
}, z = w`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{position:relative;display:flex}:host([bordered]) .scroll-button--forward calcite-button{--calcite-internal-button-border-inline-end-color: var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]) .scroll-button--backward calcite-button{--calcite-internal-button-border-inline-start-color: var( --calcite-tab-border-color, var(--calcite-color-border-1) )}.scale-s{--calcite-internal-tab-nav-button-width: 24px;min-block-size:1.5rem}.scale-m{--calcite-internal-tab-nav-button-width: 32px;min-block-size:2rem}.scale-l{--calcite-internal-tab-nav-button-width: 44px;min-block-size:2.75rem}.container::-webkit-scrollbar{display:none;-ms-overflow-style:none;scrollbar-width:none}:host([layout=center]) ::slotted(calcite-tab-title){display:flex;flex-grow:1;flex-shrink:0;min-inline-size:auto;white-space:nowrap}:host([layout=center]) ::slotted(calcite-tab-title[selected]){overflow:unset}:host(:not([bordered])) .scale-l{--calcite-internal-tab-nav-gap: var(--calcite-spacing-xxl)}:host(:not([bordered])) .scale-m{--calcite-internal-tab-nav-gap: var(--calcite-spacing-xl)}:host(:not([bordered])) .scale-s{--calcite-internal-tab-nav-gap: var(--calcite-spacing-lg)}:host(:not([bordered])) .tab-titles-slot-wrapper{gap:var(--calcite-internal-tab-nav-gap)}:host([layout=center]:not([bordered])) .tab-titles-slot-wrapper{padding-inline:var(--calcite-spacing-xl)}.tab-titles-slot-wrapper{flex:1 1 0%}.container,.tab-titles-slot-wrapper{display:flex;inline-size:100%;justify-content:flex-start;overflow:hidden;white-space:nowrap}.scroll-button{position:absolute;inset-block:0px}.scroll-button calcite-button{--calcite-button-text-color: var(--calcite-tab-text-color, var(--calcite-color-text-3));--calcite-button-background-color: var(--calcite-color-transparent);--calcite-offset-invert-focus: 1;block-size:var(--calcite-container-size-content-fluid)}.scroll-button-container{display:flex;inset-block-start:var(--calcite-border-width-md);inset-block-end:var(--calcite-border-width-md);inset-inline-end:0;inline-size:calc(2 * var(--calcite-internal-tab-nav-button-width))}.scroll-button--forward{inset-inline-end:0;z-index:var(--calcite-z-index)}.scroll-button--backward{inset-inline-end:var(--calcite-internal-tab-nav-button-width);z-index:var(--calcite-z-index)}:host(:not([bordered])) .scroll-button--backward:before{background-color:var(--calcite-tab-border-color, var(--calcite-color-border-3));content:"";inline-size:var(--calcite-border-width-sm);inset-block-start:var(--calcite-border-width-md);inset-block-end:var(--calcite-border-width-md);position:absolute;inset-inline-start:0}:host([hidden]){display:none}[hidden]{display:none}`;
class H extends C {
  constructor() {
    super(), this.effectiveDir = "ltr", this.lastScrollWheelAxis = "x", this.resizeObserver = v("resize", () => {
      this.updateScrollingState();
    }), this.makeFirstVisibleTabClosable = !1, this.messages = $(), this.hasOverflowingEndTabTitle = !1, this.hasOverflowingStartTabTitle = !1, this.bordered = !1, this.layout = "inline", this.position = "bottom", this.scale = "m", this.selectedTitle = null, this.calciteInternalTabChange = f({ cancelable: !1 }), this.calciteInternalTabNavSlotChange = f(), this.calciteTabChange = f({ cancelable: !1 }), this.listen("calciteInternalTabsFocusPrevious", this.focusPreviousTabHandler), this.listen("calciteInternalTabsFocusNext", this.focusNextTabHandler), this.listen("calciteInternalTabsFocusFirst", this.focusFirstTabHandler), this.listen("calciteInternalTabsFocusLast", this.focusLastTabHandler), this.listen("calciteInternalTabsActivate", this.internalActivateTabHandler), this.listen("calciteInternalTabsClose", this.internalCloseTabHandler), this.listen("calciteInternalTabTitleRegister", this.updateTabTitles), this.listenOn(document.body, "calciteInternalTabChange", this.globalInternalTabChangeHandler);
  }
  static {
    this.properties = { hasOverflowingEndTabTitle: 16, hasOverflowingStartTabTitle: 16, selectedTabId: 16, bordered: 7, layout: 3, messageOverrides: 0, position: 1, scale: 1, selectedTitle: 0, storageId: 3, syncId: 3 };
  }
  static {
    this.styles = z;
  }
  connectedCallback() {
    super.connectedCallback(), this.parentTabsEl = this.el.closest("calcite-tabs"), this.resizeObserver?.observe(this.el);
  }
  async load() {
    const t = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId && localStorage.getItem(t)) {
      const e = JSON.parse(localStorage.getItem(t));
      this.selectedTabId = e;
    }
  }
  willUpdate(t) {
    t.has("selectedTitle") && (this.hasUpdated || this.selectedTitle !== null) && this.calciteInternalTabChange.emit({
      tab: this.selectedTabId
    }), t.has("selectedTabId") && this.selectedTabIdChanged();
    const { parentTabsEl: e } = this;
    this.layout = e?.layout, this.bordered = e?.bordered, this.effectiveDir = W(this.el);
  }
  loaded() {
    this.scrollTabTitleIntoView(this.selectedTitle, "instant"), this.tabTitles.length && this.tabTitles.every((t) => !t.selected) && !this.selectedTabId && this.tabTitles[0].getTabIdentifier().then((t) => {
      this.calciteInternalTabChange.emit({
        tab: t
      });
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  get enabledTabTitles() {
    return p(this.el, "calcite-tab-title:not([disabled])").filter((t) => !t.closed);
  }
  get scrollerButtonWidth() {
    const { scale: t } = this;
    return parseInt(t === "s" ? B : t === "m" ? O : E);
  }
  get tabTitles() {
    return p(this.el, "calcite-tab-title");
  }
  focusPreviousTabHandler(t) {
    this.handleTabFocus(t, t.target, "previous");
  }
  focusNextTabHandler(t) {
    this.handleTabFocus(t, t.target, "next");
  }
  focusFirstTabHandler(t) {
    this.handleTabFocus(t, t.target, "first");
  }
  focusLastTabHandler(t) {
    this.handleTabFocus(t, t.target, "last");
  }
  internalActivateTabHandler(t) {
    const e = t.target, i = this.selectedTitle;
    this.selectedTabId = t.detail.tab ? t.detail.tab : this.getIndexOfTabTitle(e), t.stopPropagation(), this.selectedTitle = e, i?.id !== e.id && t.detail.userTriggered && this.calciteTabChange.emit(), this.scrollTabTitleIntoView(e);
  }
  scrollTabTitleIntoView(t, e = "smooth") {
    t && requestAnimationFrame(() => {
      const i = this.tabTitleContainerEl, l = i.getBoundingClientRect(), s = t.getBoundingClientRect(), a = i.scrollLeft;
      if (s.left < l.left) {
        const n = a + (s.left - l.left);
        i.scrollTo({ left: n, behavior: e });
      } else if (s.right > l.right) {
        const n = a + (s.right - l.right);
        i.scrollTo({ left: n, behavior: e });
      }
    });
  }
  internalCloseTabHandler(t) {
    const e = t.target;
    this.handleTabTitleClose(e), t.stopPropagation();
  }
  async updateTabTitles(t) {
    t.target.selected && (this.selectedTabId = t.detail, this.selectedTitle = await this.getTabTitleById(this.selectedTabId));
  }
  globalInternalTabChangeHandler(t) {
    this.syncId && t.target !== this.el && t.target.syncId === this.syncId && this.selectedTabId !== t.detail.tab && (this.selectedTabId = t.detail.tab), t.stopPropagation();
  }
  async selectedTabIdChanged() {
    await this.componentOnReady(), localStorage && this.storageId && this.selectedTabId !== void 0 && this.selectedTabId !== null && localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTabId)), this.calciteInternalTabChange.emit({
      tab: this.selectedTabId
    });
  }
  onTabTitleWheel(t) {
    t.preventDefault();
    const { deltaX: e, deltaY: i } = t, l = Math.abs(e), s = Math.abs(i);
    let a;
    l === s ? a = this.lastScrollWheelAxis === "x" ? e : i : l > s ? (a = e, this.lastScrollWheelAxis = "x") : (a = i, this.lastScrollWheelAxis = "y");
    const n = (this.effectiveDir === "rtl" ? -1 : 1) * a;
    t.currentTarget.scrollBy(n, 0);
  }
  onSlotChange() {
    this.intersectionObserver?.disconnect();
    const t = this.tabTitles;
    t.forEach((l) => {
      this.intersectionObserver?.observe(l);
    });
    const e = this.getVisibleTabTitlesIndices(t);
    e.length > 1 && this.makeFirstVisibleTabClosable && (t[e[0]].closable = !0, this.makeFirstVisibleTabClosable = !1), this.calciteInternalTabNavSlotChange.emit(t);
  }
  storeTabTitleWrapperRef(t) {
    t && (this.tabTitleContainerEl = t, this.intersectionObserver = v("intersection", () => this.updateScrollingState(), {
      root: t,
      threshold: [0, 0.5, 1]
    }));
  }
  updateScrollingState() {
    const t = this.tabTitleContainerEl;
    if (!t)
      return;
    let e, i;
    const l = t.scrollLeft, s = t.clientWidth, a = t.scrollWidth;
    this.effectiveDir === "ltr" ? (e = l > 0, i = l + s < a) : (e = l < 0, i = l !== -(a - s)), this.hasOverflowingStartTabTitle = e, this.hasOverflowingEndTabTitle = i;
  }
  scrollToTabTitles(t) {
    requestAnimationFrame(() => {
      const e = this.tabTitleContainerEl, i = e.getBoundingClientRect(), l = Array.from(this.el.querySelectorAll("calcite-tab-title")), { effectiveDir: s } = this;
      t === "forward" && l.reverse();
      let a = null;
      l.forEach((o) => {
        const r = o.getBoundingClientRect(), T = i.x + i.width, d = r.x + r.width;
        t === "forward" && s === "ltr" || t === "backward" && s === "rtl" ? (r.x > T || d > T && r.x > i.x) && (a = o) : (d < i.x || r.x < i.x && d > i.x) && (a = o);
      });
      let n;
      if (a) {
        const o = 2 * this.scrollerButtonWidth, r = t === "forward" && s === "ltr" || t === "backward" && s === "rtl" ? -o : a.offsetWidth - (e.clientWidth + o);
        n = a.offsetLeft + r;
      } else {
        const o = e.scrollLeft, r = i.width, d = e.scrollWidth - (r + Math.abs(o));
        d > 0 && (n = o + (s === "ltr" ? 1 : -1) * d);
      }
      e.scrollTo({
        left: n,
        behavior: "smooth"
      });
    });
  }
  scrollToNextTabTitles() {
    this.scrollToTabTitles("forward");
  }
  scrollToPreviousTabTitles() {
    this.scrollToTabTitles("backward");
  }
  handleTabFocus(t, e, i) {
    const l = F(this.enabledTabTitles, e, i);
    this.scrollTabTitleIntoView(l, "instant"), t.stopPropagation();
  }
  getIndexOfTabTitle(t, e = this.tabTitles) {
    return e.indexOf(t);
  }
  onTabTitleScroll() {
    this.updateScrollingState();
  }
  async getTabTitleById(t) {
    return Promise.all(this.tabTitles.map((e) => e.getTabIdentifier())).then((e) => this.tabTitles[e.indexOf(t)]);
  }
  getVisibleTabTitlesIndices(t) {
    return t.reduce((e, i, l) => i.closed ? e : [...e, l], []);
  }
  handleTabTitleClose(t) {
    const { tabTitles: e } = this, i = t.selected, l = this.getVisibleTabTitlesIndices(e), s = l.length;
    if (s === 1 && e[l[0]].closable)
      this.makeFirstVisibleTabClosable = !0, e[l[0]].closable = !1, this.selectedTabId = l[0], i && e[l[0]].activateTab();
    else if (s > 1) {
      const a = e.findIndex((o) => o === t), n = l.find((o) => o > a);
      this.selectedTabId === a && (this.selectedTabId = n || s - 1, e[this.selectedTabId].activateTab());
    }
    requestAnimationFrame(() => {
      e[this.selectedTabId].focus();
    });
  }
  render() {
    return this.el.role = "tablist", g`<div class=${h({
      [c.container]: !0,
      [c.scale(this.scale)]: !0,
      [c.position(this.position)]: !0,
      [x.rtl]: this.effectiveDir === "rtl"
    })}><div class=${h({
      [c.tabTitleSlotWrapper]: !0
    })} @scroll=${this.onTabTitleScroll} @wheel=${this.onTabTitleWheel} ${y(this.storeTabTitleWrapperRef)}><slot @slotchange=${this.onSlotChange}></slot></div><div class=${h(c.scrollButtonContainer)} .hidden=${!this.hasOverflowingEndTabTitle && !this.hasOverflowingStartTabTitle}>${this.renderScrollButton("start")}${this.renderScrollButton("end")}</div></div>`;
  }
  renderScrollButton(t) {
    const { messages: e, scale: i, hasOverflowingEndTabTitle: l, hasOverflowingStartTabTitle: s } = this, a = t === "end";
    return k(t, g`<div class=${h({
      [c.scrollButton]: !0,
      [c.scrollBackwardButton]: !a,
      [c.scrollForwardButton]: a
    })}><calcite-button appearance=transparent .ariaLabel=${a ? e.nextTabTitles : e.previousTabTitles} .disabled=${a ? !l : !s} icon-flip-rtl=both .iconStart=${a ? I.chevronRight : I.chevronLeft} kind=neutral @click=${a ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles} .scale=${i} tabindex=-1></calcite-button></div>`);
  }
}
S("calcite-tab-nav", H);
export {
  H as TabNav
};
