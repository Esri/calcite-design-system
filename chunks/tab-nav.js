/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as y, L as B, c as v, s as u, F as O, b as C, d as V } from "./index.js";
import { n as k } from "./ref.js";
import { i as E } from "./keyed.js";
import { u as L } from "./index2.js";
import { H as I, d as $, f as F } from "./dom.js";
import { c as m } from "./observers.js";
import { u as z } from "./useT9n.js";
const w = {
  chevronRight: "chevron-right",
  chevronLeft: "chevron-left"
}, c = {
  container: "container",
  scrollButton: "scroll-button",
  scrollButtonContainer: "scroll-button-container",
  scrollBackwardButton: "scroll-button--backward",
  scrollForwardButton: "scroll-button--forward",
  tabTitleSlotWrapper: "tab-titles-slot-wrapper",
  scale: (f) => `scale-${f}`,
  position: (f) => `position-${f}`
}, d = 1, H = y`:host{position:relative;display:flex}:host([bordered]) .scroll-button--forward calcite-button{--calcite-internal-button-border-inline-end-color: var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]) .scroll-button--backward calcite-button{--calcite-internal-button-border-inline-start-color: var( --calcite-tab-border-color, var(--calcite-color-border-1) )}.scale-s{--calcite-internal-tab-nav-button-width: 24px;min-block-size:1.5rem}.scale-m{--calcite-internal-tab-nav-button-width: 32px;min-block-size:2rem}.scale-l{--calcite-internal-tab-nav-button-width: 44px;min-block-size:2.75rem}.container::-webkit-scrollbar{display:none;-ms-overflow-style:none;scrollbar-width:none}:host([layout=center]) ::slotted(calcite-tab-title){display:flex;flex-grow:1;flex-shrink:0;min-inline-size:auto;white-space:nowrap}:host([layout=center]) ::slotted(calcite-tab-title[selected]){overflow:unset}:host(:not([bordered])) .scale-l{--calcite-internal-tab-nav-gap: var(--calcite-spacing-xxl)}:host(:not([bordered])) .scale-m{--calcite-internal-tab-nav-gap: var(--calcite-spacing-xl)}:host(:not([bordered])) .scale-s{--calcite-internal-tab-nav-gap: var(--calcite-spacing-lg)}:host(:not([bordered])) .tab-titles-slot-wrapper{gap:var(--calcite-internal-tab-nav-gap)}:host([layout=center]:not([bordered])) .tab-titles-slot-wrapper{padding-inline:var(--calcite-spacing-xl)}.tab-titles-slot-wrapper{flex:1 1 0%}.container,.tab-titles-slot-wrapper{display:flex;inline-size:100%;justify-content:flex-start;overflow:hidden;white-space:nowrap}.scroll-button{position:absolute;inset-block:0px}.scroll-button calcite-button{--calcite-button-text-color: var(--calcite-tab-text-color, var(--calcite-color-text-3));--calcite-button-background-color: var(--calcite-color-transparent);--calcite-offset-invert-focus: 1;block-size:var(--calcite-container-size-content-fluid)}.scroll-button-container{display:flex;inset-block-start:var(--calcite-border-width-md);inset-block-end:var(--calcite-border-width-md);inset-inline-end:0;inline-size:calc(2 * var(--calcite-internal-tab-nav-button-width))}.scroll-button--forward{inset-inline-end:0;z-index:var(--calcite-z-index)}.scroll-button--backward{inset-inline-end:var(--calcite-internal-tab-nav-button-width);z-index:var(--calcite-z-index)}:host(:not([bordered])) .scroll-button--backward:before{background-color:var(--calcite-tab-border-color, var(--calcite-color-border-3));content:"";inline-size:var(--calcite-border-width-sm);inset-block-start:var(--calcite-border-width-md);inset-block-end:var(--calcite-border-width-md);position:absolute;inset-inline-start:0}:host([hidden]){display:none}[hidden]{display:none}`;
class N extends B {
  constructor() {
    super(), this.direction = L(), this.effectiveDir = "ltr", this.lastScrollWheelAxis = "x", this.resizeObserver = m("resize", () => {
      this.updateScrollingState();
    }), this.messages = z(), this.hasOverflowingEndTabTitle = !1, this.hasOverflowingStartTabTitle = !1, this.hasVisibleTabTitles = !0, this.bordered = !1, this.layout = "inline", this.lastTabClosable = !1, this.position = "bottom", this.scale = "m", this.selectedTitle = null, this.calciteInternalTabChange = v({ cancelable: !1 }), this.calciteInternalTabNavSlotChange = v(), this.calciteTabChange = v({ cancelable: !1 }), this.listen("calciteInternalTabsFocusPrevious", this.focusPreviousTabHandler), this.listen("calciteInternalTabsFocusNext", this.focusNextTabHandler), this.listen("calciteInternalTabsFocusFirst", this.focusFirstTabHandler), this.listen("calciteInternalTabsFocusLast", this.focusLastTabHandler), this.listen("calciteInternalTabTitleCloseChange", this.syncVisibleTabTitlesState), this.listen("calciteInternalTabTitleRegister", this.updateTabTitles), this.listen("calciteInternalTabsActivate", this.internalActivateTabHandler), this.listen("calciteInternalTabsClose", this.internalCloseTabHandler), this.listenOn(document.body, "calciteInternalTabChange", this.globalInternalTabChangeHandler);
  }
  static {
    this.properties = { hasOverflowingEndTabTitle: 16, hasOverflowingStartTabTitle: 16, hasVisibleTabTitles: 16, selectedTabId: 16, bordered: 7, layout: 3, lastTabClosable: 5, messageOverrides: 0, position: 1, scale: 1, selectedTitle: 0, storageId: 3, syncId: 3 };
  }
  static {
    this.styles = H;
  }
  connectedCallback() {
    super.connectedCallback(), this.parentTabsEl = this.el.closest("calcite-tabs") ?? void 0, this.resizeObserver?.observe(this.el);
  }
  async load() {
    const t = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId) {
      const e = localStorage.getItem(t);
      if (e) {
        const i = JSON.parse(e);
        this.selectedTabId = i;
      }
    }
  }
  willUpdate(t) {
    t.has("selectedTitle") && (this.hasUpdated || this.selectedTitle !== null) && this.selectedTabId !== void 0 && this.calciteInternalTabChange.emit({
      tab: this.selectedTabId
    }), t.has("selectedTabId") && this.selectedTabIdChanged(), t.has("lastTabClosable") && this.hasUpdated && this.updateLastVisibleTabClosable();
    const { parentTabsEl: e } = this;
    e && (this.layout = e.layout, this.bordered = e.bordered), this.effectiveDir = this.direction;
  }
  loaded() {
    this.scrollTabTitleIntoView(this.selectedTitle, "instant"), this.tabTitles.length && this.tabTitles.every((t) => !t.selected) && this.selectedTabId === void 0 && this.tabTitles[0].getTabIdentifier().then((t) => {
      this.calciteInternalTabChange.emit({
        tab: t
      });
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  get enabledTabTitles() {
    return I(this.el, "calcite-tab-title:not([disabled])").filter((t) => !t.closed);
  }
  get tabTitles() {
    return I(this.el, "calcite-tab-title");
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
      const i = this.tabTitleContainerEl;
      if (!i)
        return;
      const s = i.getBoundingClientRect(), a = t.getBoundingClientRect(), l = i.scrollLeft, n = a.left - s.left;
      if (n < 0) {
        const o = l + n;
        i.scrollTo({ left: o, behavior: e });
      } else if (a.right > s.right) {
        const o = l + Math.min(a.right - s.right, n);
        i.scrollTo({ left: o, behavior: e });
      }
    });
  }
  internalCloseTabHandler(t) {
    const e = t.target;
    this.handleTabTitleClose(e), t.stopPropagation();
  }
  async updateTabTitles(t) {
    t.target.selected && (this.selectedTabId = t.detail, this.selectedTitle = await this.getTabTitleById(this.selectedTabId)), this.syncVisibleTabTitlesState();
  }
  globalInternalTabChangeHandler(t) {
    this.syncId && t.target !== this.el && t.target.syncId === this.syncId && this.selectedTabId !== t.detail.tab && (this.selectedTabId = t.detail.tab), t.stopPropagation();
  }
  async selectedTabIdChanged() {
    await this.componentOnReady(), this.selectedTabId !== void 0 && (localStorage && this.storageId && localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTabId)), this.calciteInternalTabChange.emit({
      tab: this.selectedTabId
    }));
  }
  onTabTitleWheel(t) {
    t.preventDefault();
    const { deltaX: e, deltaY: i } = t, s = Math.abs(e), a = Math.abs(i);
    let l;
    s === a ? l = this.lastScrollWheelAxis === "x" ? e : i : s > a ? (l = e, this.lastScrollWheelAxis = "x") : (l = i, this.lastScrollWheelAxis = "y");
    const n = (this.effectiveDir === "rtl" ? -1 : 1) * l;
    t.currentTarget.scrollBy(n, 0);
  }
  onSlotChange() {
    this.intersectionObserver?.disconnect(), this.tabTitles.forEach((e) => {
      this.intersectionObserver?.observe(e);
    }), this.syncVisibleTabTitlesState();
  }
  syncVisibleTabTitlesState() {
    this.updateLastVisibleTabClosable(), this.hasVisibleTabTitles = this.getVisibleTabTitlesIndices(this.tabTitles).length > 0, this.calciteInternalTabNavSlotChange.emit([...this.tabTitles]);
  }
  updateLastVisibleTabClosable() {
    const { tabTitles: t } = this, e = this.getVisibleTabTitlesIndices(t), i = e.length;
    if (i === 0)
      return;
    const s = t[e[0]];
    if (!this.lastTabClosable && i === 1) {
      s.closable && (this.firstVisibleTabMadeNonClosable = s, s.closable = !1);
      return;
    }
    this.firstVisibleTabMadeNonClosable && !this.firstVisibleTabMadeNonClosable.closed && (this.firstVisibleTabMadeNonClosable.closable = !0), this.firstVisibleTabMadeNonClosable = void 0;
  }
  setTabTitleContainerEl(t) {
    this.tabTitleContainerEl = t, this.intersectionObserver?.disconnect(), t && (this.intersectionObserver = m("intersection", () => this.updateScrollingState(), {
      root: t,
      threshold: [0, 0.5, 1]
    }));
  }
  updateScrollingState() {
    const t = this.tabTitleContainerEl;
    if (!t)
      return;
    let e, i;
    const s = t.scrollLeft, a = t.clientWidth, l = t.scrollWidth;
    this.effectiveDir === "ltr" ? (e = s > d, i = l - (s + a) > d) : (e = s < -d, i = l - a + s > d), this.hasOverflowingStartTabTitle = e, this.hasOverflowingEndTabTitle = i;
  }
  scrollToTabTitles(t) {
    requestAnimationFrame(() => {
      const e = this.tabTitleContainerEl;
      if (!e)
        return;
      const i = e.getBoundingClientRect(), { effectiveDir: s } = this, a = t === "forward" && s === "ltr" || t === "backward" && s === "rtl";
      let l;
      const n = t === "forward" ? [...this.tabTitles].reverse() : this.tabTitles;
      if (!n.length)
        return;
      if (a) {
        let h;
        l = n.find((T) => {
          const r = T.getBoundingClientRect(), g = r.left >= i.right, p = r.left < i.right && r.right > i.right && r.right - i.right > d;
          return g && (h = T), p;
        }) ?? h;
      } else {
        let h;
        l = n.find((T) => {
          const r = T.getBoundingClientRect(), g = r.right <= i.left, p = r.left < i.left && r.right > i.left && i.left - r.left > d;
          return g && (h = T), p;
        }) ?? h;
      }
      if (!l)
        return;
      const o = l.getBoundingClientRect(), b = e.scrollLeft, S = a ? b + (o.right - i.right) : b + (o.left - i.left);
      e.scrollTo({
        left: Math.round(S),
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
    const s = $(this.enabledTabTitles, e, i);
    this.scrollTabTitleIntoView(s, "instant"), t.stopPropagation();
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
    return t.reduce((e, i, s) => i.closed ? e : [...e, s], []);
  }
  handleTabTitleClose(t) {
    const { tabTitles: e } = this, i = e.filter((n) => !n.closed), s = this.enabledTabTitles, a = i.length, l = t.selected;
    if (this.hasVisibleTabTitles = a > 0, this.calciteInternalTabNavSlotChange.emit([...e]), a === 0) {
      this.selectedTitle = null, this.selectedTabId = void 0;
      return;
    }
    if (l) {
      const n = e.findIndex((b) => b === t), o = s.find((b) => e.indexOf(b) > n) || s.at(-1);
      if (!o) {
        this.selectedTitle = null, this.selectedTabId = void 0, this.updateLastVisibleTabClosable();
        return;
      }
      o.activateTab();
    }
    this.updateLastVisibleTabClosable(), requestAnimationFrame(() => {
      const n = this.selectedTitle;
      n && F(n);
    });
  }
  render() {
    return this.el.role = "tablist", C`<div class=${u({
      [c.container]: !0,
      [c.scale(this.scale)]: !0,
      [c.position(this.position)]: !0,
      [O.rtl]: this.effectiveDir === "rtl"
    })} .hidden=${!this.hasVisibleTabTitles}><div class=${u({
      [c.tabTitleSlotWrapper]: !0
    })} @scroll=${this.onTabTitleScroll} @wheel=${this.onTabTitleWheel} ${k(this.setTabTitleContainerEl)}><slot @slotchange=${this.onSlotChange}></slot></div><div class=${u(c.scrollButtonContainer)} .hidden=${!this.hasOverflowingEndTabTitle && !this.hasOverflowingStartTabTitle}>${this.renderScrollButton("start")}${this.renderScrollButton("end")}</div></div>`;
  }
  renderScrollButton(t) {
    const { messages: e, scale: i, hasOverflowingEndTabTitle: s, hasOverflowingStartTabTitle: a } = this, l = t === "end";
    return E(t, C`<div class=${u({
      [c.scrollButton]: !0,
      [c.scrollBackwardButton]: !l,
      [c.scrollForwardButton]: l
    })}><calcite-button .ariaLabel=${l ? e.nextTabTitles : e.previousTabTitles} .disabled=${l ? !s : !a} icon-flip-rtl=both .iconStart=${l ? w.chevronRight : w.chevronLeft} kind=neutral @click=${l ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles} .scale=${i} tabindex=-1></calcite-button></div>`);
  }
}
V("calcite-tab-nav", N);
export {
  N as TabNav
};
