import { a as w, L as I, d as h, s as b, C as m, x as T, c as C } from "./iframe.js";
import { n as x } from "./ref.js";
import { i as S } from "./keyed.js";
import { a as y, b as k, d as O } from "./core.js";
import { g as B, G as f, b as E } from "./dom.js";
import { c as u } from "./observers.js";
import { u as W } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
const g = {
  chevronRight: "chevron-right",
  chevronLeft: "chevron-left"
}, o = {
  container: "container",
  containerHasEndTabTitleOverflow: "container--end-overflow",
  containerHasStartTabTitleOverflow: "container--start-overflow",
  scrollButton: "scroll-button",
  scrollButtonContainer: "scroll-button-container",
  scrollBackwardContainerButton: "scroll-button-container--backward",
  scrollForwardContainerButton: "scroll-button-container--forward",
  tabTitleSlotWrapper: "tab-titles-slot-wrapper"
}, F = w`:host{--calcite-internal-tab-nav-gradient-start-side: left;--calcite-internal-tab-nav-gradient-end-side: right;position:relative;display:flex}:host([bordered]):not([selected]) .container{background-color:var(--calcite-tab-background-color, var(--calcite-color-foreground-1))}:host([bordered]) calcite-button{--calcite-button-border-color: var(--calcite-tab-border-color, var(--calcite-color-border-1))}.scale-s{--calcite-internal-tab-nav-button-width: 24px;min-block-size:1.5rem}.scale-m{--calcite-internal-tab-nav-button-width: 32px;min-block-size:2rem}.scale-l{--calcite-internal-tab-nav-button-width: 44px;min-block-size:2.75rem}.calcite--rtl{--calcite-internal-tab-nav-gradient-start-side: right;--calcite-internal-tab-nav-gradient-end-side: left}.container--start-overflow .tab-titles-slot-wrapper{mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side),transparent,transparent var(--calcite-internal-tab-nav-button-width),white var(--calcite-internal-tab-nav-button-width),white 51%)}.container--end-overflow .tab-titles-slot-wrapper{mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side),transparent,transparent var(--calcite-internal-tab-nav-button-width),white var(--calcite-internal-tab-nav-button-width),white 51%)}.container--start-overflow.container--end-overflow .tab-titles-slot-wrapper{mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side),transparent,transparent var(--calcite-internal-tab-nav-button-width),white var(--calcite-internal-tab-nav-button-width),white 51%,transparent 51%),linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side),transparent,transparent var(--calcite-internal-tab-nav-button-width),white var(--calcite-internal-tab-nav-button-width),white 51%,transparent 51%)}.container::-webkit-scrollbar{display:none;-ms-overflow-style:none;scrollbar-width:none}:host([layout=center]) ::slotted(calcite-tab-title){display:flex;flex-grow:1;flex-shrink:0;min-inline-size:auto;white-space:nowrap}:host([layout=center]) ::slotted(calcite-tab-title[selected]){overflow:unset}:host(:not([bordered])) .scale-l{--calcite-internal-tab-nav-gap: var(--calcite-spacing-xxl)}:host(:not([bordered])) .scale-m{--calcite-internal-tab-nav-gap: var(--calcite-spacing-xl)}:host(:not([bordered])) .scale-s{--calcite-internal-tab-nav-gap: var(--calcite-spacing-lg)}:host(:not([bordered])) .tab-titles-slot-wrapper{gap:var(--calcite-internal-tab-nav-gap)}:host([layout=center]:not([bordered])) .tab-titles-slot-wrapper{padding-inline:var(--calcite-spacing-xl)}.container,.tab-titles-slot-wrapper{display:flex;inline-size:100%;justify-content:flex-start;overflow:hidden;white-space:nowrap}.scroll-button-container{position:absolute;inset-block:0px}.scroll-button-container calcite-button{--calcite-button-text-color: var(--calcite-tab-text-color, var(--calcite-color-text-3));--calcite-button-background-color: var(--calcite-color-transparent);--calcite-offset-invert-focus: 1;block-size:var(--calcite-container-size-content-fluid)}.scroll-button-container calcite-button:hover .scroll-button-container calcite-button:focus{--calcite-button-background-color: var(--calcite-color-transparent-hover)}.scroll-button-container calcite-button:active{--calcite-button-background-color: var(--calcite-color-transparent-press)}.scroll-button-container--forward{inset-inline-end:0;z-index:var(--calcite-z-index)}.scroll-button-container--backward{inset-inline-start:0;z-index:var(--calcite-z-index)}:host(:not([bordered])) .scroll-button-container--backward:before,:host(:not([bordered])) .scroll-button-container--forward:before{background-color:var(--calcite-tab-border-color, var(--calcite-color-border-1));opacity:.5;content:"";inline-size:var(--calcite-border-width-sm);inset-block-start:var(--calcite-border-width-md);inset-block-end:var(--calcite-border-width-md);position:absolute}:host(:not([bordered])) .scroll-button-container--backward:before{inset-inline-end:0}:host(:not([bordered])) .scroll-button-container--forward:before{inset-inline-start:0}:host([hidden]){display:none}[hidden]{display:none}`;
class $ extends I {
  constructor() {
    super(), this.effectiveDir = "ltr", this.lastScrollWheelAxis = "x", this.resizeObserver = u("resize", () => {
      this.updateScrollingState();
    }), this.makeFirstVisibleTabClosable = !1, this.messages = W(), this.hasOverflowingEndTabTitle = !1, this.hasOverflowingStartTabTitle = !1, this.bordered = !1, this.layout = "inline", this.position = "bottom", this.scale = "m", this.selectedTitle = null, this.calciteInternalTabChange = h({ cancelable: !1 }), this.calciteInternalTabNavSlotChange = h(), this.calciteTabChange = h({ cancelable: !1 }), this.listen("calciteInternalTabsFocusPrevious", this.focusPreviousTabHandler), this.listen("calciteInternalTabsFocusNext", this.focusNextTabHandler), this.listen("calciteInternalTabsFocusFirst", this.focusFirstTabHandler), this.listen("calciteInternalTabsFocusLast", this.focusLastTabHandler), this.listen("calciteInternalTabsActivate", this.internalActivateTabHandler), this.listen("calciteInternalTabsClose", this.internalCloseTabHandler), this.listen("calciteInternalTabTitleRegister", this.updateTabTitles), this.listenOn(document.body, "calciteInternalTabChange", this.globalInternalTabChangeHandler);
  }
  static {
    this.properties = { hasOverflowingEndTabTitle: 16, hasOverflowingStartTabTitle: 16, selectedTabId: 16, bordered: 7, layout: 3, messageOverrides: 0, position: 1, scale: 1, selectedTitle: 0, storageId: 3, syncId: 3 };
  }
  static {
    this.styles = F;
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
  get enabledTabTitles() {
    return f(this.el, "calcite-tab-title:not([disabled])").filter((t) => !t.closed);
  }
  get scrollerButtonWidth() {
    const { scale: t } = this;
    return parseInt(t === "s" ? y : t === "m" ? k : O);
  }
  get tabTitles() {
    return f(this.el, "calcite-tab-title");
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
      const i = this.effectiveDir === "ltr", a = this.tabTitleContainerEl, n = a.getBoundingClientRect(), l = t.getBoundingClientRect(), s = a.scrollLeft, r = i ? this.hasOverflowingStartTabTitle : this.hasOverflowingEndTabTitle, c = i ? this.hasOverflowingEndTabTitle : this.hasOverflowingStartTabTitle;
      if (l.left < n.left + (r ? this.scrollerButtonWidth : 0)) {
        const d = s + (l.left - n.left) - this.scrollerButtonWidth;
        a.scrollTo({ left: d, behavior: e });
      } else if (l.right > n.right - (c ? this.scrollerButtonWidth : 0)) {
        const d = s + (l.right - n.right) + this.scrollerButtonWidth;
        a.scrollTo({ left: d, behavior: e });
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
    const { deltaX: e, deltaY: i } = t, a = Math.abs(e), n = Math.abs(i);
    let l;
    a === n ? l = this.lastScrollWheelAxis === "x" ? e : i : a > n ? (l = e, this.lastScrollWheelAxis = "x") : (l = i, this.lastScrollWheelAxis = "y");
    const s = (this.effectiveDir === "rtl" ? -1 : 1) * l;
    t.currentTarget.scrollBy(s, 0);
  }
  onSlotChange() {
    this.intersectionObserver?.disconnect();
    const t = this.tabTitles;
    t.forEach((a) => {
      this.intersectionObserver?.observe(a);
    });
    const e = this.getVisibleTabTitlesIndices(t);
    e.length > 1 && this.makeFirstVisibleTabClosable && (t[e[0]].closable = !0, this.makeFirstVisibleTabClosable = !1), this.calciteInternalTabNavSlotChange.emit(t);
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
    let e, i;
    const a = t.scrollLeft, n = t.clientWidth, l = t.scrollWidth;
    this.effectiveDir === "ltr" ? (e = a > 0, i = a + n < l) : (e = a < 0, i = a !== -(l - n)), this.hasOverflowingStartTabTitle = e, this.hasOverflowingEndTabTitle = i;
  }
  scrollToTabTitles(t) {
    requestAnimationFrame(() => {
      const e = this.tabTitleContainerEl, i = e.getBoundingClientRect(), a = Array.from(this.el.querySelectorAll("calcite-tab-title")), { effectiveDir: n } = this;
      t === "forward" && a.reverse();
      let l = null;
      if (a.forEach((s) => {
        const r = s.getBoundingClientRect(), c = i.x + i.width, d = r.x + r.width;
        t === "forward" && n === "ltr" || t === "backward" && n === "rtl" ? (r.x > c || d > c && r.x > i.x) && (l = s) : (d < i.x || d < c && r.x < i.x) && (l = s);
      }), l) {
        const { scrollerButtonWidth: s } = this, r = t === "forward" && n === "ltr" || t === "backward" && n === "rtl" ? -s : l.offsetWidth - e.clientWidth + s, c = l.offsetLeft + r;
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
  handleTabFocus(t, e, i) {
    const a = E(this.enabledTabTitles, e, i);
    this.scrollTabTitleIntoView(a, "instant"), t.stopPropagation();
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
    return t.reduce((e, i, a) => i.closed ? e : [...e, a], []);
  }
  handleTabTitleClose(t) {
    const { tabTitles: e } = this, i = t.selected, a = this.getVisibleTabTitlesIndices(e), n = a.length;
    if (n === 1 && e[a[0]].closable)
      this.makeFirstVisibleTabClosable = !0, e[a[0]].closable = !1, this.selectedTabId = a[0], i && e[a[0]].activateTab();
    else if (n > 1) {
      const l = e.findIndex((r) => r === t), s = a.find((r) => r > l);
      this.selectedTabId === l && (this.selectedTabId = s || n - 1, e[this.selectedTabId].activateTab());
    }
    requestAnimationFrame(() => {
      e[this.selectedTabId].focus();
    });
  }
  render() {
    return this.el.role = "tablist", T`<div class=${b({
      [o.container]: !0,
      [o.containerHasStartTabTitleOverflow]: !!this.hasOverflowingStartTabTitle,
      [o.containerHasEndTabTitleOverflow]: !!this.hasOverflowingEndTabTitle,
      [`scale-${this.scale}`]: !0,
      [`position-${this.position}`]: !0,
      [m.rtl]: this.effectiveDir === "rtl"
    })}>${this.renderScrollButton("start")}<div class=${b({
      [o.tabTitleSlotWrapper]: !0
    })} @scroll=${this.onTabTitleScroll} @wheel=${this.onTabTitleWheel} ${x(this.storeTabTitleWrapperRef)}><slot @slotchange=${this.onSlotChange}></slot></div>${this.renderScrollButton("end")}</div>`;
  }
  renderScrollButton(t) {
    const { bordered: e, messages: i, hasOverflowingStartTabTitle: a, hasOverflowingEndTabTitle: n, scale: l } = this, s = t === "end";
    return S(t, T`<div class=${b({
      [o.scrollButtonContainer]: !0,
      [o.scrollBackwardContainerButton]: !s,
      [o.scrollForwardContainerButton]: s
    })} .hidden=${s && !n || !s && !a}><calcite-button .appearance=${e ? "outline-fill" : "transparent"} .ariaLabel=${s ? i.nextTabTitles : i.previousTabTitles} class=${b({
      [o.scrollButton]: !0
    })} icon-flip-rtl=both .iconStart=${s ? g.chevronRight : g.chevronLeft} kind=neutral @click=${s ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles} .scale=${l} tabindex=-1></calcite-button></div>`);
  }
}
C("calcite-tab-nav", $);
export {
  $ as TabNav
};
