import { b as A, L as F, c as g, s as l, E as c, x as d, q as L } from "./index.js";
import { c as M } from "./repeat.js";
import { e as b, n as y } from "./ref.js";
import { p as U, d as B, b as v, a as W } from "./dom.js";
import { g as q } from "./guid.js";
import { u as K, I as N } from "./interactive.js";
import { c as j } from "./observers.js";
import { b as I } from "./responsive.js";
import { g as P } from "./array.js";
import { u as V } from "./useT9n.js";
import { u as G } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const Z = 6e3, i = {
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
}, m = {
  medium: 7,
  small: 5,
  xsmall: 3,
  xxsmall: 1
}, Y = "calcite-carousel-container", J = {
  host: (k) => `${Y}-${k}`
}, Q = A`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%;--calcite-internal-carousel-pagination-space: 1.5rem;--calcite-internal-carousel-pagination-space-wide: 3.5rem;--calcite-internal-carousel-pagination-background-color: var( --calcite-carousel-pagination-background-color, transparent );--calcite-internal-carousel-pagination-background-color-hover: var( --calcite-carousel-pagination-background-color-hover, transparent );--calcite-internal-carousel-pagination-background-color-press: var( --calcite-carousel-pagination-background-color-press, transparent );--calcite-internal-carousel-pagination-background-color-selected: var( --calcite-carousel-pagination-background-color-selected, transparent );--calcite-internal-carousel-pagination-overlay-background-color: var( --calcite-carousel-pagination-background-color, var(--calcite-color-foreground-1) );--calcite-internal-carousel-pagination-overlay-background-color-hover: var( --calcite-carousel-pagination-background-color-hover, var(--calcite-color-foreground-2) );--calcite-internal-carousel-pagination-overlay-background-color-active: var( --calcite-carousel-pagination-background-color-press, var(--calcite-color-foreground-2) );--calcite-internal-carousel-pagination-overlay-background-color-selected: var( --calcite-carousel-pagination-background-color-selected, var(--calcite-color-foreground-1) );--calcite-internal-carousel-pagination-icon-color-hover: var( --calcite-carousel-pagination-icon-color-hover, var(--calcite-color-text-1) );--calcite-internal-carousel-pagination-icon-color: var( --calcite-carousel-pagination-icon-color, var(--calcite-color-border-1) );--calcite-internal-carousel-pagination-icon-color-selected: var( --calcite-carousel-pagination-icon-color-selected, var(--calcite-color-brand) );--calcite-internal-carousel-control-icon-color-hover: var( --calcite-carousel-control-icon-color-hover, var(--calcite-internal-carousel-pagination-icon-color-hover) );--calcite-internal-carousel-control-icon-color: var( --calcite-carousel-control-icon-color, var(--calcite-carousel-pagination-icon-color, var(--calcite-color-text-3)) );--calcite-internal-carousel-autoplay-progress-background-color: var( --calcite-carousel-autoplay-progress-background-color, var(--calcite-color-border-3) );--calcite-internal-carousel-autoplay-progress-fill-color: var( --calcite-carousel-autoplay-progress-fill-color, var(--calcite-color-brand) );--calcite-internal-carousel-autoplay-control-color: var( --calcite-carousel-pagination-icon-color, var(--calcite-color-text-3) )}.container{position:relative;display:flex;inline-size:100%;flex-direction:column;overflow:hidden;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2);outline-color:transparent}.container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container--edged:not(.container--overlaid){padding-inline:var(--calcite-internal-carousel-pagination-space-wide);inline-size:calc(100% - var(--calcite-internal-carousel-pagination-space-wide) * 2)}.item-container{display:flex;flex:1 1 auto;align-items:flex-start;justify-content:center;overflow:auto;padding:.25rem;animation-name:none;animation-duration:var(--calcite-animation-timing)}.container--overlaid .item-container{padding:0}.item-container--forward{animation-name:item-forward}.item-container--backward{animation-name:item-backward}calcite-carousel-item:not([selected]){opacity:0}.pagination{margin:.75rem;display:flex;flex-direction:row;align-items:center;justify-content:center;inline-size:auto}.pagination-items{display:flex;flex-direction:row;align-items:center}.container--overlaid .pagination{position:absolute}.pagination-item.page-next,.pagination-item.page-previous{color:var(--calcite-internal-carousel-control-icon-color);--calcite-icon-color: var(--calcite-internal-carousel-control-icon-color)}.pagination-item.page-next:hover,.pagination-item.page-previous:hover{color:var(--calcite-internal-carousel-control-icon-color-hover);--calcite-icon-color: var(--calcite-internal-carousel-control-icon-color-hover)}.container--edged .page-next,.container--edged .page-previous{block-size:3rem;inline-size:3rem;position:absolute;inset-block-start:50%;transform:translateY(-50%)}.container--edged .page-next{inset-inline-end:0}.container--edged .page-previous{inset-inline-start:0}.container--overlaid .pagination{inset-block-start:unset;inset-block-end:0;inset-inline:0}.pagination-item.autoplay-control{position:relative;color:var(--calcite-internal-carousel-autoplay-control-color);--calcite-progress-fill-color: var(--calcite-internal-carousel-autoplay-progress-fill-color);--calcite-progress-background-color: var(--calcite-internal-carousel-autoplay-progress-background-color)}.autoplay-control:focus .autoplay-progress{inset-block-end:4px;inset-inline:2px;inline-size:calc(100% - 4px)}.autoplay-progress{position:absolute;inset-block-end:2px;inset-inline:0;inline-size:100%}.pagination-item{margin:0;block-size:2rem;inline-size:2rem;cursor:pointer;align-items:center;border-style:none;background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent;-webkit-appearance:none;display:flex;align-content:center;justify-content:center;background-color:var(--calcite-internal-carousel-pagination-background-color);color:var(--calcite-internal-carousel-pagination-icon-color)}.pagination-item:hover{background-color:var(--calcite-internal-carousel-pagination-background-color-hover);color:var(--calcite-internal-carousel-pagination-icon-color-hover)}.pagination-item:focus{background-color:var(--calcite-internal-carousel-pagination-background-color-press);outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.pagination-item:active{background-color:var(--calcite-internal-carousel-pagination-background-color-press);color:var(--calcite-internal-carousel-pagination-icon-color-hover)}.pagination-item calcite-icon{color:inherit;pointer-events:none}.pagination-item.pagination-item--selected{background-color:var(--calcite-internal-carousel-pagination-background-color-selected);color:var(--calcite-internal-carousel-pagination-icon-color-selected)}.pagination-item--individual{pointer-events:none;inline-size:0px;padding:0;opacity:0;visibility:hidden;transition:var(--calcite-animation-timing) ease-in-out inline-size,var(--calcite-animation-timing) ease-in-out padding,var(--calcite-animation-timing) ease-in-out opacity}.pagination-item--individual.pagination-item--visible{pointer-events:auto;inline-size:2rem;opacity:1;visibility:visible}.pagination-item--range-edge calcite-icon{scale:.75;transition:var(--calcite-animation-timing) ease-in-out scale}.container--overlaid .pagination-item{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color)}.container--overlaid .pagination-item:hover{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-hover)}.container--overlaid .pagination-item:focus{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-active)}.container--overlaid .pagination-item:active{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-active)}.container--overlaid .pagination-item.pagination-item--selected{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-selected);color:var(--calcite-internal-carousel-pagination-icon-color-selected)}@keyframes item-forward{0%{transform:translate3d(100px,0,0)}to{transform:translateZ(0)}}@keyframes item-backward{0%{transform:translate3d(-100px,0,0)}to{transform:translateZ(0)}}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class X extends F {
  constructor() {
    super(...arguments), this.autoplayHandler = () => {
      this.clearIntervals(), this.slideDurationInterval = setInterval(this.timer, this.autoplayDuration / 100);
    }, this.containerRef = b(), this.containerId = J.host(q()), this.itemContainerRef = b(), this.resizeHandler = ({ contentRect: { width: e } }) => {
      this.setMaxItemsToBreakpoint(e);
    }, this.resizeObserver = j("resize", (e) => e.forEach(this.resizeHandler)), this.slideDurationInterval = null, this.slideInterval = null, this.tabListRef = b(), this.timer = () => {
      let e = this.slideDurationRemaining;
      (!this.suspendedDueToFocus && !this.suspendedDueToHover || this.userPreventsSuspend) && (e <= 0.01 ? (e = 1, this.direction = "forward", this.nextItem(!1)) : e = e - 0.01), e > 0 && (this.slideDurationRemaining = e);
    }, this.messages = V(), this.focusSetter = G()(this), this.direction = "standby", this.items = [], this.maxItems = m.xxsmall, this.playing = !1, this.slideDurationRemaining = 1, this.suspendedDueToFocus = !1, this.suspendedDueToHover = !1, this.suspendedSlideDurationRemaining = 1, this.userPreventsSuspend = !1, this.arrowType = "inline", this.autoplay = !1, this.autoplayDuration = Z, this.controlOverlay = !1, this.disabled = !1, this.calciteCarouselChange = g({ cancelable: !1 }), this.calciteCarouselPause = g({ cancelable: !1 }), this.calciteCarouselPlay = g({ cancelable: !1 }), this.calciteCarouselResume = g({ cancelable: !1 }), this.calciteCarouselStop = g({ cancelable: !1 });
  }
  static {
    this.properties = { direction: 16, items: 16, maxItems: 16, playing: 16, selectedIndex: 16, slideDurationRemaining: 16, suspendedDueToFocus: 16, suspendedDueToHover: 16, suspendedSlideDurationRemaining: 16, userPreventsSuspend: 16, arrowType: 3, autoplay: 3, autoplayDuration: 11, controlOverlay: 7, disabled: 7, label: 1, messageOverrides: 0, paused: 5, selectedItem: 0 };
  }
  static {
    this.styles = Q;
  }
  async play() {
    this.playing || this.autoplay !== "" && !this.autoplay && this.autoplay !== "paused" || this.handlePlay(!0);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.containerRef.value, e);
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
    K(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearIntervals(), this.resizeObserver?.disconnect();
  }
  autoplayWatcher(e) {
    e || this.handlePause(!1);
  }
  async directionWatcher(e) {
    e === "standby" || !this.itemContainerRef.value || (await U(this.itemContainerRef.value, e === "forward" ? "item-forward" : "item-backward"), this.direction = "standby");
  }
  suspendWatcher() {
    !this.suspendedDueToFocus && !this.suspendedDueToHover ? this.suspendEnd() : this.suspendStart();
  }
  setMaxItemsToBreakpoint(e) {
    if (e) {
      if (e >= I.width.small) {
        this.maxItems = m.medium;
        return;
      }
      if (e >= I.width.xsmall) {
        this.maxItems = m.small;
        return;
      }
      if (e >= I.width.xxsmall) {
        this.maxItems = m.xsmall;
        return;
      }
      this.maxItems = m.xxsmall;
    }
  }
  clearIntervals() {
    clearInterval(this.slideDurationInterval), clearInterval(this.slideInterval);
  }
  nextItem(e) {
    this.playing && e && (this.playing = !1);
    const t = P(this.selectedIndex + 1, this.items.length);
    this.setSelectedItem(t, e);
  }
  previousItem() {
    this.playing = !1;
    const e = P(Math.max(this.selectedIndex - 1, -1), this.items.length);
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
    const t = B(e);
    if (t.length < 1)
      return;
    const a = t.findIndex((s) => s.selected), r = a > -1 ? a : 0;
    this.items = t, this.setSelectedItem(r, !1);
  }
  setSelectedItem(e, t) {
    const a = this.selectedIndex;
    this.items.forEach((r, s) => {
      const o = e === s;
      r.selected = o, o && (this.selectedItem = r, this.selectedIndex = s);
    }), t && (this.playing = !1, a !== this.selectedIndex && this.calciteCarouselChange.emit());
  }
  handleArrowClick(e) {
    const t = e.target.dataset.direction;
    this.playing && this.handlePause(!0), t === "next" ? (this.direction = "forward", this.nextItem(!0)) : t === "previous" && (this.direction = "backward", this.previousItem());
  }
  handleItemSelection(e) {
    const t = e.target, a = parseInt(t.dataset.index);
    a !== this.selectedIndex && (this.playing && this.handlePause(!0), this.direction = a > this.selectedIndex ? "forward" : "backward", this.setSelectedItem(a, !0));
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
    const t = !this.el.contains(e.relatedTarget), a = this.playing;
    t && a && (this.suspendedDueToHover = !1), t && a && !this.suspendedDueToFocus && (this.userPreventsSuspend = !1, this.calciteCarouselResume.emit());
  }
  handleFocusOut(e) {
    const t = !e.composedPath().includes(e.relatedTarget), a = this.playing;
    t && a && (this.suspendedDueToFocus = !1), t && a && !this.suspendedDueToHover && (this.userPreventsSuspend = !1, this.calciteCarouselResume.emit());
  }
  containerKeyDownHandler(e) {
    if (e.target !== this.containerRef.value)
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
    const t = Array(...this.tabListRef.value.querySelectorAll(`button:not(.${i.paginationItemOutOfRange})`)), a = e.target;
    switch (e.key) {
      case "ArrowRight":
        v(t, a, "next");
        break;
      case "ArrowLeft":
        v(t, a, "previous");
        break;
      case "Home":
        e.preventDefault(), v(t, a, "first");
        break;
      case "End":
        e.preventDefault(), v(t, a, "last");
        break;
    }
  }
  renderRotationControl() {
    const e = this.playing ? this.messages.pause : this.messages.play, t = this.slideDurationRemaining * 100;
    return d`<button .ariaLabel=${e} class=${l({
      [i.paginationItem]: !0,
      [i.autoplayControl]: !0
    })} @click=${this.toggleRotation} title=${e ?? c}><calcite-icon .icon=${this.playing ? p.pause : p.play} scale=s></calcite-icon>${this.playing && d`<calcite-progress class=${l(i.autoplayProgress)} .label=${this.messages.carouselItemProgress} .value=${t}></calcite-progress>` || ""}</button>`;
  }
  renderPaginationArea() {
    return d`<div class=${l({
      [i.pagination]: !0,
      [i.containerOverlaid]: this.controlOverlay
    })} @keydown=${this.tabListKeyDownHandler} ${y(this.tabListRef)}>${(this.playing || this.autoplay === "" || this.autoplay || this.autoplay === "paused") && this.renderRotationControl() || ""}${this.arrowType === "inline" && this.renderArrow("previous") || ""}${this.renderPaginationItems()}${this.arrowType === "inline" && this.renderArrow("next") || ""}</div>`;
  }
  renderPaginationItems() {
    const { selectedIndex: e, maxItems: t, items: a, label: r, handleItemSelection: s } = this;
    return d`<div .ariaLabel=${r} class=${l(i.paginationItems)} role=tablist>${M(a, (o) => o.id, (o, n) => {
      const h = a.length, u = n === e, T = n === 0, O = n === h - 1, x = h - t - 1, f = e < t, w = e >= x, D = f ? 0 : e - Math.floor(t / 2), z = w ? h : D + t, $ = f ? 0 : w ? x : D, R = f ? t + 1 : z, E = !T && !O && !u && (n === $ - 1 || n === R), C = u || n <= R && n >= $ - 1, S = h - 1 <= t, H = u ? p.active : p.inactive;
      return d`<button aria-controls=${(u ? void 0 : o.id) ?? c} .ariaSelected=${u} class=${l({
        [i.paginationItem]: !0,
        [i.paginationItemIndividual]: !0,
        [i.paginationItemSelected]: u,
        [i.paginationItemRangeEdge]: h - 1 > t && E,
        [i.paginationItemOutOfRange]: !(S || C),
        [i.paginationItemVisible]: S || C
      })} data-index=${n ?? c} @click=${s} role=tab title=${o.label ?? c}><calcite-icon .icon=${H} scale=l></calcite-icon></button>`;
    })}</div>`;
  }
  renderArrow(e) {
    const t = e === "previous", a = W(this.el), r = this.arrowType === "edge" ? "m" : "s", s = t ? i.pagePrevious : i.pageNext, o = t ? this.messages.previous : this.messages.next, n = t ? p.chevronLeft : p.chevronRight;
    return d`<button aria-controls=${this.containerId ?? c} class=${l({ [i.paginationItem]: !0, [s]: !0 })} data-direction=${e ?? c} @click=${this.handleArrowClick} title=${o ?? c}><calcite-icon .flipRtl=${a === "rtl"} .icon=${n} .scale=${r}></calcite-icon></button>`;
  }
  render() {
    const { direction: e } = this;
    return N({ disabled: this.disabled, children: d`<div .ariaLabel=${this.label} .ariaLive=${this.playing ? "off" : "polite"} .ariaRoleDescription=${this.messages.carousel} class=${l({
      [i.container]: !0,
      [i.containerOverlaid]: this.controlOverlay,
      [i.containerEdged]: this.arrowType === "edge"
    })} @focusin=${this.handleFocusIn} @focusout=${this.handleFocusOut} @keydown=${this.containerKeyDownHandler} @mouseenter=${this.handleMouseIn} @mouseleave=${this.handleMouseOut} role=group tabindex=0 ${y(this.containerRef)}><section class=${l({
      [i.itemContainer]: !0,
      [i.itemContainerForward]: e === "forward",
      [i.itemContainerBackward]: e === "backward"
    })} id=${this.containerId ?? c} ${y(this.itemContainerRef)}><slot @slotchange=${this.handleSlotChange}></slot></section>${this.items.length > 1 && this.renderPaginationArea() || ""}${this.arrowType === "edge" && this.renderArrow("previous") || ""}${this.arrowType === "edge" && this.renderArrow("next") || ""}</div>` });
  }
}
L("calcite-carousel", X);
export {
  X as Carousel
};
