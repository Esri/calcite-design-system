import { j as w, L as m, n as h, x as T, s as b, C as I, k as C } from "./iframe.js";
import { n as x } from "./ref.js";
import { i as S } from "./keyed.js";
import { a as y, b as O, d as E } from "./core.js";
import { G as f, g as B, d as k, b as W } from "./dom.js";
import { c as u } from "./observers.js";
import { u as $ } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const g = {
  chevronRight: "chevron-right",
  chevronLeft: "chevron-left"
}, o = {
  container: "tab-nav",
  containerHasEndTabTitleOverflow: "tab-nav--end-overflow",
  containerHasStartTabTitleOverflow: "tab-nav--start-overflow",
  scrollButton: "scroll-button",
  scrollButtonContainer: "scroll-button-container",
  scrollBackwardContainerButton: "scroll-button-container--backward",
  scrollForwardContainerButton: "scroll-button-container--forward",
  tabTitleSlotWrapper: "tab-titles-slot-wrapper"
}, H = w`:host{--calcite-internal-tab-nav-gradient-start-side: left;--calcite-internal-tab-nav-gradient-end-side: right;position:relative;display:flex}.scale-s{--calcite-internal-tab-nav-scroller-button-width: 24px;min-block-size:1.5rem}.scale-m{--calcite-internal-tab-nav-scroller-button-width: 32px;min-block-size:2rem}.scale-l{--calcite-internal-tab-nav-scroller-button-width: 44px;min-block-size:2.75rem}.calcite--rtl{--calcite-internal-tab-nav-gradient-start-side: right;--calcite-internal-tab-nav-gradient-end-side: left}.tab-nav--start-overflow .tab-titles-slot-wrapper{mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side),transparent,transparent var(--calcite-internal-tab-nav-scroller-button-width),white var(--calcite-internal-tab-nav-scroller-button-width),white 51%)}.tab-nav--end-overflow .tab-titles-slot-wrapper{mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side),transparent,transparent var(--calcite-internal-tab-nav-scroller-button-width),white var(--calcite-internal-tab-nav-scroller-button-width),white 51%)}.tab-nav--start-overflow.tab-nav--end-overflow .tab-titles-slot-wrapper{mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side),transparent,transparent var(--calcite-internal-tab-nav-scroller-button-width),white var(--calcite-internal-tab-nav-scroller-button-width),white 51%,transparent 51%),linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side),transparent,transparent var(--calcite-internal-tab-nav-scroller-button-width),white var(--calcite-internal-tab-nav-scroller-button-width),white 51%,transparent 51%)}.tab-nav::-webkit-scrollbar{display:none;-ms-overflow-style:none;scrollbar-width:none}:host([layout=center]) ::slotted(calcite-tab-title){display:flex;flex-grow:1;flex-shrink:0;min-inline-size:auto;white-space:nowrap}:host([layout=center]) ::slotted(calcite-tab-title[selected]){overflow:unset}:host(:not([bordered])) .scale-l{--calcite-internal-tab-nav-gap: var(--calcite-spacing-xxl)}:host(:not([bordered])) .scale-m{--calcite-internal-tab-nav-gap: var(--calcite-spacing-xl)}:host(:not([bordered])) .scale-s{--calcite-internal-tab-nav-gap: var(--calcite-spacing-lg)}:host(:not([bordered])) .tab-titles-slot-wrapper{gap:var(--calcite-internal-tab-nav-gap)}:host([layout=center]:not([bordered])) .tab-titles-slot-wrapper{padding-inline:var(--calcite-spacing-xl)}.tab-nav,.tab-titles-slot-wrapper{display:flex;inline-size:100%;justify-content:flex-start;overflow:hidden;white-space:nowrap}.scroll-button-container{position:absolute;inset-block:0px}.scroll-button-container calcite-button{--calcite-offset-invert-focus: 1;--calcite-color-text-1: var(--calcite-color-text-3);block-size:100%}.scroll-button-container calcite-button:hover{--calcite-color-text-1: unset;--calcite-color-foreground-1: var(--calcite-color-transparent-hover);--calcite-color-foreground-3: var(--calcite-color-transparent)}.scroll-button-container--forward{inset-inline-end:0;z-index:var(--calcite-z-index)}.scroll-button-container--backward{inset-inline-start:0;z-index:var(--calcite-z-index)}:host(:not([bordered])) .scroll-button-container--backward:before,:host(:not([bordered])) .scroll-button-container--forward:before{background-color:var(--calcite-color-border-3);content:"";inline-size:var(--calcite-border-width-sm);inset-block-start:var(--calcite-border-width-md);inset-block-end:var(--calcite-border-width-md);position:absolute}:host(:not([bordered])) .scroll-button-container--backward:before{inset-inline-end:0}:host(:not([bordered])) .scroll-button-container--forward:before{inset-inline-start:0}:host([hidden]){display:none}[hidden]{display:none}`;
class z extends m {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.effectiveDir = "ltr", this.lastScrollWheelAxis = "x", this.resizeObserver = u("resize", () => {
      this.updateScrollingState();
    }), this.hasOverflowingEndTabTitle = !1, this.hasOverflowingStartTabTitle = !1, this.bordered = !1, this.layout = "inline", this.messages = $(), this.position = "bottom", this.scale = "m", this.selectedTitle = null, this.calciteInternalTabChange = h({ cancelable: !1 }), this.calciteInternalTabNavSlotChange = h(), this.calciteTabChange = h({ cancelable: !1 }), this.listen("calciteInternalTabsFocusPrevious", this.focusPreviousTabHandler), this.listen("calciteInternalTabsFocusNext", this.focusNextTabHandler), this.listen("calciteInternalTabsFocusFirst", this.focusFirstTabHandler), this.listen("calciteInternalTabsFocusLast", this.focusLastTabHandler), this.listen("calciteInternalTabsActivate", this.internalActivateTabHandler), this.listen("calciteTabsActivate", this.activateTabHandler), this.listen("calciteInternalTabsClose", this.internalCloseTabHandler), this.listen("calciteInternalTabTitleRegister", this.updateTabTitles), this.listenOn(document.body, "calciteInternalTabChange", this.globalInternalTabChangeHandler);
  }
  static {
    this.properties = { hasOverflowingEndTabTitle: 16, hasOverflowingStartTabTitle: 16, selectedTabId: 16, bordered: 7, layout: 3, messageOverrides: 0, position: 1, scale: 1, selectedTitle: 0, storageId: 3, syncId: 3 };
  }
  static {
    this.styles = H;
  }
  get enabledTabTitles() {
    return f(this.el, "calcite-tab-title:not([disabled])").filter((t) => !t.closed);
  }
  get scrollerButtonWidth() {
    const { scale: t } = this;
    return parseInt(t === "s" ? y : t === "m" ? O : E);
  }
  get tabTitles() {
    return f(this.el, "calcite-tab-title");
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
    this.layout = e?.layout, this.bordered = e?.bordered, this.effectiveDir = B(this.el);
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
  // #endregion
  // #region Private Methods
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
    const e = t.target;
    this.selectedTabId = t.detail.tab ? t.detail.tab : this.getIndexOfTabTitle(e), t.stopPropagation(), this.selectedTitle = e, this.scrollTabTitleIntoView(e);
  }
  scrollTabTitleIntoView(t, e = "smooth") {
    t && requestAnimationFrame(() => {
      const s = this.effectiveDir === "ltr", i = this.tabTitleContainerEl, n = i.getBoundingClientRect(), a = t.getBoundingClientRect(), l = i.scrollLeft, r = s ? this.hasOverflowingStartTabTitle : this.hasOverflowingEndTabTitle, c = s ? this.hasOverflowingEndTabTitle : this.hasOverflowingStartTabTitle;
      if (a.left < n.left + (r ? this.scrollerButtonWidth : 0)) {
        const d = l + (a.left - n.left) - this.scrollerButtonWidth;
        i.scrollTo({ left: d, behavior: e });
      } else if (a.right > n.right - (c ? this.scrollerButtonWidth : 0)) {
        const d = l + (a.right - n.right) + this.scrollerButtonWidth;
        i.scrollTo({ left: d, behavior: e });
      }
    });
  }
  activateTabHandler(t) {
    this.calciteTabChange.emit(), t.stopPropagation();
  }
  internalCloseTabHandler(t) {
    const e = t.target;
    this.handleTabTitleClose(e), t.stopPropagation();
  }
  /**
   * Check for active tabs on register and update selected
   *
   * @param event
   */
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
    const { deltaX: e, deltaY: s } = t, i = Math.abs(e), n = Math.abs(s);
    let a;
    i === n ? a = this.lastScrollWheelAxis === "x" ? e : s : i > n ? (a = e, this.lastScrollWheelAxis = "x") : (a = s, this.lastScrollWheelAxis = "y");
    const l = (this.effectiveDir === "rtl" ? -1 : 1) * a;
    t.currentTarget.scrollBy(l, 0);
  }
  onSlotChange(t) {
    this.intersectionObserver?.disconnect();
    const e = k(t, "calcite-tab-title");
    e.forEach((s) => {
      this.intersectionObserver?.observe(s);
    }), this.calciteInternalTabNavSlotChange.emit(e);
  }
  storeTabTitleWrapperRef(t) {
    t && (this.tabTitleContainerEl = t, this.intersectionObserver = u("intersection", () => this.updateScrollingState(), {
      root: t,
      threshold: [0, 0.5, 1]
    }));
  }
  updateScrollingState() {
    const t = this.tabTitleContainerEl;
    if (!t)
      return;
    let e, s;
    const i = t.scrollLeft, n = t.clientWidth, a = t.scrollWidth;
    this.effectiveDir === "ltr" ? (e = i > 0, s = i + n < a) : (e = i < 0, s = i !== -(a - n)), this.hasOverflowingStartTabTitle = e, this.hasOverflowingEndTabTitle = s;
  }
  scrollToTabTitles(t) {
    requestAnimationFrame(() => {
      const e = this.tabTitleContainerEl, s = e.getBoundingClientRect(), i = Array.from(this.el.querySelectorAll("calcite-tab-title")), { effectiveDir: n } = this;
      t === "forward" && i.reverse();
      let a = null;
      if (i.forEach((l) => {
        const r = l.getBoundingClientRect(), c = s.x + s.width, d = r.x + r.width;
        t === "forward" && n === "ltr" || t === "backward" && n === "rtl" ? (r.x > c || d > c && r.x > s.x) && (a = l) : (d < s.x || d < c && r.x < s.x) && (a = l);
      }), a) {
        const { scrollerButtonWidth: l } = this, r = t === "forward" && n === "ltr" || t === "backward" && n === "rtl" ? -l : a.offsetWidth - e.clientWidth + l, c = a.offsetLeft + r;
        e.scrollTo({
          left: c,
          behavior: "smooth"
        });
      }
    });
  }
  scrollToNextTabTitles() {
    this.scrollToTabTitles("forward");
  }
  scrollToPreviousTabTitles() {
    this.scrollToTabTitles("backward");
  }
  handleTabFocus(t, e, s) {
    const i = W(this.enabledTabTitles, e, s);
    this.scrollTabTitleIntoView(i, "instant"), t.stopPropagation();
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
  handleTabTitleClose(t) {
    const { tabTitles: e } = this, s = t.selected, i = e.reduce((a, l, r) => l.closed ? a : [...a, r], []), n = i.length;
    if (n === 1 && e[i[0]].closable)
      e[i[0]].closable = !1, this.selectedTabId = i[0], s && e[i[0]].activateTab();
    else if (n > 1) {
      const a = e.findIndex((r) => r === t), l = i.find((r) => r > a);
      this.selectedTabId === a && (this.selectedTabId = l || n - 1, e[this.selectedTabId].activateTab());
    }
    requestAnimationFrame(() => {
      e[this.selectedTabId].focus();
    });
  }
  // #endregion
  // #region Rendering
  render() {
    return this.el.role = "tablist", T`<div class=${b({
      [o.container]: !0,
      [o.containerHasStartTabTitleOverflow]: !!this.hasOverflowingStartTabTitle,
      [o.containerHasEndTabTitleOverflow]: !!this.hasOverflowingEndTabTitle,
      [`scale-${this.scale}`]: !0,
      [`position-${this.position}`]: !0,
      [I.rtl]: this.effectiveDir === "rtl"
    })}>${this.renderScrollButton("start")}<div class=${b({
      [o.tabTitleSlotWrapper]: !0
    })} @scroll=${this.onTabTitleScroll} @wheel=${this.onTabTitleWheel} ${x(this.storeTabTitleWrapperRef)}><slot @slotchange=${this.onSlotChange}></slot></div>${this.renderScrollButton("end")}</div>`;
  }
  renderScrollButton(t) {
    const { bordered: e, messages: s, hasOverflowingStartTabTitle: i, hasOverflowingEndTabTitle: n, scale: a } = this, l = t === "end";
    return S(t, T`<div class=${b({
      [o.scrollButtonContainer]: !0,
      [o.scrollBackwardContainerButton]: !l,
      [o.scrollForwardContainerButton]: l
    })} .hidden=${l && !n || !l && !i}><calcite-button .appearance=${e ? "outline-fill" : "transparent"} .ariaLabel=${l ? s.nextTabTitles : s.previousTabTitles} class=${b({
      [o.scrollButton]: !0
    })} icon-flip-rtl=both .iconStart=${l ? g.chevronRight : g.chevronLeft} kind=neutral @click=${l ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles} .scale=${a} tabindex=-1></calcite-button></div>`);
  }
}
C("calcite-tab-nav", z);
export {
  z as TabNav
};
