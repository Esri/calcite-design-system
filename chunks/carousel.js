import { a as E, L as H, d as m, s as l, E as c, x as d, c as A } from "./iframe.js";
import { n as b } from "./ref.js";
import { c as F } from "./repeat.js";
import { p as L, d as M, b as v, g as U } from "./dom.js";
import { g as B } from "./guid.js";
import { u as W, I as K } from "./interactive.js";
import { c as N } from "./component.js";
import { c as j } from "./observers.js";
import { b as y } from "./responsive.js";
import { g as R } from "./array.js";
import { u as q } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const V = 6e3, a = {
  container: "container",
  containerOverlaid: "container--overlaid",
  containerEdged: "container--edged",
  itemContainer: "item-container",
  itemContainerForward: "item-container--forward",
  itemContainerBackward: "item-container--backward",
  pagination: "pagination",
  paginationItems: "pagination-items",
  paginationItem: "pagination-item",
  paginationItemIndividual: "pagination-item--individual",
  paginationItemVisible: "pagination-item--visible",
  paginationItemOutOfRange: "pagination-item--out-of-range",
  paginationItemSelected: "pagination-item--selected",
  paginationItemRangeEdge: "pagination-item--range-edge",
  pageNext: "page-next",
  pagePrevious: "page-previous",
  autoplayControl: "autoplay-control",
  autoplayProgress: "autoplay-progress"
}, p = {
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
  inactive: "bullet-point",
  active: "bullet-point-large",
  pause: "pause-f",
  play: "play-f"
}, g = {
  medium: 7,
  small: 5,
  xsmall: 3,
  xxsmall: 1
}, G = E`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%;--calcite-internal-internal-carousel-item-space: 1.5rem;--calcite-internal-internal-carousel-item-space-wide: 3.5rem;--calcite-internal-internal-carousel-item-background-color: var( --calcite-internal-carousel-item-background-color, var(--calcite-color-foreground-1) );--calcite-internal-internal-carousel-item-background-color-hover: var( --calcite-internal-carousel-item-background-color-hover, var(--calcite-color-foreground-2) );--calcite-internal-internal-carousel-item-background-color-active: var( --calcite-internal-carousel-item-background-color-active, var(--calcite-color-foreground-2) );--calcite-internal-internal-carousel-item-background-color-selected: var( --calcite-internal-carousel-item-background-color-selected, var(--calcite-color-foreground-1) );--calcite-internal-internal-carousel-item-icon-color-hover: var( --calcite-internal-carousel-item-icon-color-hover, var(--calcite-color-text-1) );--calcite-internal-internal-carousel-item-icon-color: var( --calcite-internal-carousel-item-icon-color, var(--calcite-color-border-1) );--calcite-internal-internal-carousel-item-icon-color-selected: var( --calcite-internal-carousel-item-icon-color-selected, var(--calcite-color-brand) );--calcite-internal-internal-carousel-control-color-hover: var( --calcite-internal-carousel-control-color-hover, var(--calcite-color-text-1) );--calcite-internal-internal-carousel-control-color: var( --calcite-internal-carousel-item-icon-color, var(--calcite-color-text-3) );--calcite-internal-internal-carousel-autoplay-progress-background-color: var( --calcite-internal-carousel-autoplay-progress-background-color, var(--calcite-color-border-3) );--calcite-internal-internal-carousel-autoplay-progress-fill-color: var( --calcite-internal-carousel-autoplay-progress-fill-color, var(--calcite-color-brand) )}.container{position:relative;display:flex;inline-size:100%;flex-direction:column;overflow:hidden;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2);outline-color:transparent}.container:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container--edged:not(.container--overlaid){padding-inline:var(--calcite-internal-internal-carousel-item-space-wide);inline-size:calc(100% - var(--calcite-internal-internal-carousel-item-space-wide) * 2)}.item-container{display:flex;flex:1 1 auto;align-items:flex-start;justify-content:center;overflow:auto;padding:.25rem;animation-name:none;animation-duration:var(--calcite-animation-timing)}.container--overlaid .item-container{padding:0}.item-container--forward{animation-name:item-forward}.item-container--backward{animation-name:item-backward}calcite-carousel-item:not([selected]){opacity:0}.pagination{margin:.75rem;display:flex;flex-direction:row;align-items:center;justify-content:center;inline-size:auto}.pagination-items{display:flex;flex-direction:row;align-items:center}.container--overlaid .pagination{position:absolute}.pagination-item.page-next,.pagination-item.page-previous{color:var(--calcite-internal-internal-carousel-control-color)}.pagination-item.page-next:hover,.pagination-item.page-previous:hover{color:var(--calcite-internal-internal-carousel-control-color-hover)}.container--edged .page-next,.container--edged .page-previous{block-size:3rem;inline-size:3rem;position:absolute;inset-block-start:50%;transform:translateY(-50%)}.container--edged .page-next{inset-inline-end:0}.container--edged .page-previous{inset-inline-start:0}.container--overlaid .pagination{inset-block-start:unset;inset-block-end:0;inset-inline:0}.pagination-item.autoplay-control{position:relative;color:var(--calcite-internal-internal-carousel-control-color);--calcite-progress-fill-color: var(--calcite-internal-internal-carousel-autoplay-progress-fill-color);--calcite-progress-background-color: var(--calcite-internal-internal-carousel-autoplay-progress-background-color)}.autoplay-control:focus .autoplay-progress{inset-block-end:4px;inset-inline:2px;inline-size:calc(100% - 4px)}.autoplay-progress{position:absolute;inset-block-end:2px;inset-inline:0;inline-size:100%}.pagination-item{margin:0;block-size:2rem;inline-size:2rem;cursor:pointer;align-items:center;border-style:none;background-color:transparent;outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;-webkit-appearance:none;display:flex;align-content:center;justify-content:center;--calcite-color-foreground-1: var(--calcite-internal-internal-carousel-item-background-color);color:var(--calcite-internal-internal-carousel-item-icon-color)}.pagination-item:hover{background-color:var(--calcite-internal-internal-carousel-item-background-color-hover);color:var(--calcite-internal-internal-carousel-item-icon-color-hover)}.pagination-item:focus{background-color:var(--calcite-internal-internal-carousel-item-background-color-active);outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.pagination-item:active{background-color:var(--calcite-internal-internal-carousel-item-background-color-active);color:var(--calcite-internal-internal-carousel-item-icon-color-hover)}.pagination-item calcite-icon{color:inherit;pointer-events:none}.pagination-item.pagination-item--selected{--calcite-color-foreground-1: var(--calcite-internal-internal-carousel-item-background-color-selected);--calcite-color-foreground-3: var(--calcite-internal-internal-carousel-item-background-color-selected);color:var(--calcite-internal-internal-carousel-item-icon-color-selected)}.pagination-item--individual{pointer-events:none;inline-size:0px;padding:0;opacity:0;visibility:hidden;transition:var(--calcite-animation-timing) ease-in-out inline-size,var(--calcite-animation-timing) ease-in-out padding,var(--calcite-animation-timing) ease-in-out opacity}.pagination-item--individual.pagination-item--visible{pointer-events:auto;inline-size:2rem;opacity:1;visibility:visible}.pagination-item--range-edge calcite-icon{scale:.75;transition:var(--calcite-animation-timing) ease-in-out scale}.container--overlaid .pagination-item{background-color:var(--calcite-internal-internal-carousel-item-background-color)}.container--overlaid .pagination-item:hover{background-color:var(--calcite-internal-internal-carousel-item-background-color-hover)}.container--overlaid .pagination-item:focus{background-color:var(--calcite-internal-internal-carousel-item-background-color-active)}.container--overlaid .pagination-item:active{background-color:var(--calcite-internal-internal-carousel-item-background-color-active)}@keyframes item-forward{0%{transform:translate3d(100px,0,0)}to{transform:translateZ(0)}}@keyframes item-backward{0%{transform:translate3d(-100px,0,0)}to{transform:translateZ(0)}}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class Z extends H {
  constructor() {
    super(...arguments), this.autoplayHandler = () => {
      this.clearIntervals(), this.slideDurationInterval = setInterval(this.timer, this.autoplayDuration / 100);
    }, this.containerId = `calcite-carousel-container-${B()}`, this.resizeHandler = ({ contentRect: { width: e } }) => {
      this.setMaxItemsToBreakpoint(e);
    }, this.resizeObserver = j("resize", (e) => e.forEach(this.resizeHandler)), this.slideDurationInterval = null, this.slideInterval = null, this.timer = () => {
      let e = this.slideDurationRemaining;
      (!this.suspendedDueToFocus && !this.suspendedDueToHover || this.userPreventsSuspend) && (e <= 0.01 ? (e = 1, this.direction = "forward", this.nextItem(!1)) : e = e - 0.01), e > 0 && (this.slideDurationRemaining = e);
    }, this.messages = q(), this.direction = "standby", this.items = [], this.maxItems = g.xxsmall, this.playing = !1, this.slideDurationRemaining = 1, this.suspendedDueToFocus = !1, this.suspendedDueToHover = !1, this.suspendedSlideDurationRemaining = 1, this.userPreventsSuspend = !1, this.arrowType = "inline", this.autoplay = !1, this.autoplayDuration = V, this.controlOverlay = !1, this.disabled = !1, this.calciteCarouselChange = m({ cancelable: !1 }), this.calciteCarouselPause = m({ cancelable: !1 }), this.calciteCarouselPlay = m({ cancelable: !1 }), this.calciteCarouselResume = m({ cancelable: !1 }), this.calciteCarouselStop = m({ cancelable: !1 });
  }
  static {
    this.properties = { direction: 16, items: 16, maxItems: 16, playing: 16, selectedIndex: 16, slideDurationRemaining: 16, suspendedDueToFocus: 16, suspendedDueToHover: 16, suspendedSlideDurationRemaining: 16, userPreventsSuspend: 16, arrowType: 3, autoplay: 3, autoplayDuration: 11, controlOverlay: 7, disabled: 7, label: 1, messageOverrides: 0, paused: 5, selectedItem: 0 };
  }
  static {
    this.styles = G;
  }
  async play() {
    this.playing || this.autoplay !== "" && !this.autoplay && this.autoplay !== "paused" || this.handlePlay(!0);
  }
  async setFocus() {
    await N(this), this.container?.focus();
  }
  async stop() {
    this.playing && this.handlePause(!0);
  }
  connectedCallback() {
    super.connectedCallback(), this.resizeObserver?.observe(this.el);
  }
  async load() {
    (this.autoplay === "" || this.autoplay) && this.autoplay !== "paused" ? this.handlePlay(!1) : this.autoplay === "paused" && (this.paused = !0);
  }
  willUpdate(e) {
    e.has("autoplay") && this.hasUpdated && this.autoplayWatcher(this.autoplay), e.has("direction") && (this.hasUpdated || this.direction !== "standby") && this.directionWatcher(this.direction), e.has("playing") && (this.hasUpdated || this.playing !== !1) && (this.paused = !this.playing), (e.has("suspendedDueToFocus") && (this.hasUpdated || this.suspendedDueToFocus !== !1) || e.has("suspendedDueToHover") && (this.hasUpdated || this.suspendedDueToHover !== !1)) && this.suspendWatcher();
  }
  updated() {
    W(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearIntervals(), this.resizeObserver?.disconnect();
  }
  autoplayWatcher(e) {
    e || this.handlePause(!1);
  }
  async directionWatcher(e) {
    e !== "standby" && (await L(this.itemContainer, e === "forward" ? "item-forward" : "item-backward"), this.direction = "standby");
  }
  suspendWatcher() {
    !this.suspendedDueToFocus && !this.suspendedDueToHover ? this.suspendEnd() : this.suspendStart();
  }
  setMaxItemsToBreakpoint(e) {
    if (e) {
      if (e >= y.width.small) {
        this.maxItems = g.medium;
        return;
      }
      if (e >= y.width.xsmall) {
        this.maxItems = g.small;
        return;
      }
      if (e >= y.width.xxsmall) {
        this.maxItems = g.xsmall;
        return;
      }
      this.maxItems = g.xxsmall;
    }
  }
  clearIntervals() {
    clearInterval(this.slideDurationInterval), clearInterval(this.slideInterval);
  }
  nextItem(e) {
    this.playing && e && (this.playing = !1);
    const t = R(this.selectedIndex + 1, this.items.length);
    this.setSelectedItem(t, e);
  }
  previousItem() {
    this.playing = !1;
    const e = R(Math.max(this.selectedIndex - 1, -1), this.items.length);
    this.setSelectedItem(e, !0);
  }
  handlePlay(e) {
    this.playing = !0, this.autoplayHandler(), this.slideInterval = setInterval(this.autoplayHandler, this.autoplayDuration), e && this.calciteCarouselPlay.emit();
  }
  handlePause(e) {
    this.playing = !1, this.clearIntervals(), this.slideDurationRemaining = 1, this.suspendedSlideDurationRemaining = 1, e && this.calciteCarouselStop.emit();
  }
  suspendStart() {
    this.suspendedSlideDurationRemaining = this.slideDurationRemaining;
  }
  suspendEnd() {
    this.slideDurationRemaining = this.suspendedSlideDurationRemaining;
  }
  handleSlotChange(e) {
    const t = M(e);
    if (t.length < 1)
      return;
    const i = t.findIndex((s) => s.selected), r = i > -1 ? i : 0;
    this.items = t, this.setSelectedItem(r, !1);
  }
  setSelectedItem(e, t) {
    const i = this.selectedIndex;
    this.items.forEach((r, s) => {
      const o = e === s;
      r.selected = o, o && (this.selectedItem = r, this.selectedIndex = s);
    }), t && (this.playing = !1, i !== this.selectedIndex && this.calciteCarouselChange.emit());
  }
  handleArrowClick(e) {
    const t = e.target.dataset.direction;
    this.playing && this.handlePause(!0), t === "next" ? (this.direction = "forward", this.nextItem(!0)) : t === "previous" && (this.direction = "backward", this.previousItem());
  }
  handleItemSelection(e) {
    const t = e.target, i = parseInt(t.dataset.index);
    i !== this.selectedIndex && (this.playing && this.handlePause(!0), this.direction = i > this.selectedIndex ? "forward" : "backward", this.setSelectedItem(i, !0));
  }
  toggleRotation() {
    this.userPreventsSuspend = !0, this.playing ? this.handlePause(!0) : this.handlePlay(!0);
  }
  handleFocusIn() {
    const e = this.playing;
    e && (this.suspendedDueToFocus = !0), (!this.suspendedDueToFocus || !this.suspendedDueToHover) && e && this.calciteCarouselPause.emit();
  }
  handleMouseIn() {
    const e = this.playing;
    e && (this.suspendedDueToHover = !0), (!this.suspendedDueToFocus || !this.suspendedDueToHover) && e && this.calciteCarouselPause.emit();
  }
  handleMouseOut(e) {
    const t = !this.el.contains(e.relatedTarget), i = this.playing;
    t && i && (this.suspendedDueToHover = !1), t && i && !this.suspendedDueToFocus && (this.userPreventsSuspend = !1, this.calciteCarouselResume.emit());
  }
  handleFocusOut(e) {
    const t = !e.composedPath().includes(e.relatedTarget), i = this.playing;
    t && i && (this.suspendedDueToFocus = !1), t && i && !this.suspendedDueToHover && (this.userPreventsSuspend = !1, this.calciteCarouselResume.emit());
  }
  containerKeyDownHandler(e) {
    if (e.target !== this.container)
      return;
    const t = this.items.length - 1;
    switch (e.key) {
      case " ":
      case "Enter":
        e.preventDefault(), (this.autoplay === "" || this.autoplay || this.autoplay === "paused") && this.toggleRotation();
        break;
      case "ArrowRight":
        e.preventDefault(), this.direction = "forward", this.nextItem(!0);
        break;
      case "ArrowLeft":
        e.preventDefault(), this.direction = "backward", this.previousItem();
        break;
      case "Home":
        if (e.preventDefault(), this.selectedIndex === 0)
          return;
        this.direction = "backward", this.setSelectedItem(0, !0);
        break;
      case "End":
        if (e.preventDefault(), this.selectedIndex === t)
          return;
        this.direction = "forward", this.setSelectedItem(t, !0);
        break;
    }
  }
  tabListKeyDownHandler(e) {
    const t = Array(...this.tabList.querySelectorAll(`button:not(.${a.paginationItemOutOfRange})`)), i = e.target;
    switch (e.key) {
      case "ArrowRight":
        v(t, i, "next");
        break;
      case "ArrowLeft":
        v(t, i, "previous");
        break;
      case "Home":
        e.preventDefault(), v(t, i, "first");
        break;
      case "End":
        e.preventDefault(), v(t, i, "last");
        break;
    }
  }
  storeTabListRef(e) {
    this.tabList = e;
  }
  storeContainerRef(e) {
    this.container = e;
  }
  storeItemContainerRef(e) {
    this.itemContainer = e;
  }
  renderRotationControl() {
    const e = this.playing ? this.messages.pause : this.messages.play, t = this.slideDurationRemaining * 100;
    return d`<button .ariaLabel=${e} class=${l({
      [a.paginationItem]: !0,
      [a.autoplayControl]: !0
    })} @click=${this.toggleRotation} title=${e ?? c}><calcite-icon .icon=${this.playing ? p.pause : p.play} scale=s></calcite-icon>${this.playing && d`<calcite-progress class=${l(a.autoplayProgress)} .label=${this.messages.carouselItemProgress} .value=${t}></calcite-progress>` || ""}</button>`;
  }
  renderPaginationArea() {
    return d`<div class=${l({
      [a.pagination]: !0,
      [a.containerOverlaid]: this.controlOverlay
    })} @keydown=${this.tabListKeyDownHandler} ${b(this.storeTabListRef)}>${(this.playing || this.autoplay === "" || this.autoplay || this.autoplay === "paused") && this.renderRotationControl() || ""}${this.arrowType === "inline" && this.renderArrow("previous") || ""}${this.renderPaginationItems()}${this.arrowType === "inline" && this.renderArrow("next") || ""}</div>`;
  }
  renderPaginationItems() {
    const { selectedIndex: e, maxItems: t, items: i, label: r, handleItemSelection: s } = this;
    return d`<div .ariaLabel=${r} class=${l(a.paginationItems)} role=tablist>${F(i, (o) => o.id, (o, n) => {
      const h = i.length, u = n === e, S = n === 0, P = n === h - 1, I = h - t - 1, f = e < t, k = e >= I, x = f ? 0 : e - Math.floor(t / 2), T = k ? h : x + t, w = f ? 0 : k ? I : x, D = f ? t + 1 : T, O = !S && !P && !u && (n === w - 1 || n === D), $ = u || n <= D && n >= w - 1, C = h - 1 <= t, z = u ? p.active : p.inactive;
      return d`<button aria-controls=${(u ? void 0 : o.id) ?? c} .ariaSelected=${u} class=${l({
        [a.paginationItem]: !0,
        [a.paginationItemIndividual]: !0,
        [a.paginationItemSelected]: u,
        [a.paginationItemRangeEdge]: h - 1 > t && O,
        [a.paginationItemOutOfRange]: !(C || $),
        [a.paginationItemVisible]: C || $
      })} data-index=${n ?? c} @click=${s} role=tab title=${o.label ?? c}><calcite-icon .icon=${z} scale=l></calcite-icon></button>`;
    })}</div>`;
  }
  renderArrow(e) {
    const t = e === "previous", i = U(this.el), r = this.arrowType === "edge" ? "m" : "s", s = t ? a.pagePrevious : a.pageNext, o = t ? this.messages.previous : this.messages.next, n = t ? p.chevronLeft : p.chevronRight;
    return d`<button aria-controls=${this.containerId ?? c} class=${l({ [a.paginationItem]: !0, [s]: !0 })} data-direction=${e ?? c} @click=${this.handleArrowClick} title=${o ?? c}><calcite-icon .flipRtl=${i === "rtl"} .icon=${n} .scale=${r}></calcite-icon></button>`;
  }
  render() {
    const { direction: e } = this;
    return K({ disabled: this.disabled, children: d`<div .ariaLabel=${this.label} .ariaLive=${this.playing ? "off" : "polite"} .ariaRoleDescription=${this.messages.carousel} class=${l({
      [a.container]: !0,
      [a.containerOverlaid]: this.controlOverlay,
      [a.containerEdged]: this.arrowType === "edge"
    })} @focusin=${this.handleFocusIn} @focusout=${this.handleFocusOut} @keydown=${this.containerKeyDownHandler} @mouseenter=${this.handleMouseIn} @mouseleave=${this.handleMouseOut} role=group tabindex=0 ${b(this.storeContainerRef)}><section class=${l({
      [a.itemContainer]: !0,
      [a.itemContainerForward]: e === "forward",
      [a.itemContainerBackward]: e === "backward"
    })} id=${this.containerId ?? c} ${b(this.storeItemContainerRef)}><slot @slotchange=${this.handleSlotChange}></slot></section>${this.items.length > 1 && this.renderPaginationArea() || ""}${this.arrowType === "edge" && this.renderArrow("previous") || ""}${this.arrowType === "edge" && this.renderArrow("next") || ""}</div>` });
  }
}
A("calcite-carousel", Z);
export {
  Z as Carousel
};
