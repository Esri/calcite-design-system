/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as F, L as M, c as g, A as u, s, b as l, d as L } from "./index.js";
import { c as U } from "./repeat.js";
import { e as b, n as y } from "./ref.js";
import { u as B } from "./index2.js";
import { B as W, b as K, d as v } from "./dom.js";
import { g as N } from "./guid.js";
import { c as j } from "./observers.js";
import { b as k } from "./responsive.js";
import { n as I } from "./locale.js";
import { g as T } from "./array.js";
import { u as q } from "./useT9n.js";
import { u as V } from "./useSetFocus.js";
import { u as G } from "./useInteractive.js";
const Z = 6e3, a = {
  container: "container",
  containerOverlaid: "container--overlaid",
  containerEdged: "container--edged",
  itemContainer: "item-container",
  itemContainerForward: "item-container--forward",
  itemContainerBackward: "item-container--backward",
  pagination: "pagination",
  paginationAriaLive: "pagination-aria-live",
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
}, _ = "calcite-carousel-container", Y = {
  host: (x) => `${_}-${x}`
}, J = F`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%;--calcite-internal-carousel-pagination-space: 1.5rem;--calcite-internal-carousel-pagination-space-wide: 3.5rem;--calcite-internal-carousel-pagination-background-color: var( --calcite-carousel-pagination-background-color, transparent );--calcite-internal-carousel-pagination-background-color-hover: var( --calcite-carousel-pagination-background-color-hover, transparent );--calcite-internal-carousel-pagination-background-color-press: var( --calcite-carousel-pagination-background-color-press, transparent );--calcite-internal-carousel-pagination-background-color-selected: var( --calcite-carousel-pagination-background-color-selected, transparent );--calcite-internal-carousel-pagination-overlay-background-color: var( --calcite-carousel-pagination-background-color, var(--calcite-color-foreground-1) );--calcite-internal-carousel-pagination-overlay-background-color-hover: var( --calcite-carousel-pagination-background-color-hover, var(--calcite-color-foreground-2) );--calcite-internal-carousel-pagination-overlay-background-color-active: var( --calcite-carousel-pagination-background-color-press, var(--calcite-color-foreground-2) );--calcite-internal-carousel-pagination-overlay-background-color-selected: var( --calcite-carousel-pagination-background-color-selected, var(--calcite-color-foreground-1) );--calcite-internal-carousel-pagination-icon-color-hover: var( --calcite-carousel-pagination-icon-color-hover, var(--calcite-color-text-1) );--calcite-internal-carousel-pagination-icon-color: var( --calcite-carousel-pagination-icon-color, var(--calcite-color-border-1) );--calcite-internal-carousel-pagination-icon-color-selected: var( --calcite-carousel-pagination-icon-color-selected, var(--calcite-color-brand) );--calcite-internal-carousel-control-icon-color-hover: var( --calcite-carousel-control-icon-color-hover, var(--calcite-internal-carousel-pagination-icon-color-hover) );--calcite-internal-carousel-control-icon-color: var( --calcite-carousel-control-icon-color, var(--calcite-carousel-pagination-icon-color, var(--calcite-color-text-3)) );--calcite-internal-carousel-autoplay-progress-background-color: var( --calcite-carousel-autoplay-progress-background-color, var(--calcite-color-border-3) );--calcite-internal-carousel-autoplay-progress-fill-color: var( --calcite-carousel-autoplay-progress-fill-color, var(--calcite-color-brand) );--calcite-internal-carousel-autoplay-control-color: var( --calcite-carousel-pagination-icon-color, var(--calcite-color-text-3) )}.container{position:relative;display:flex;inline-size:100%;flex-direction:column;overflow:hidden;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);color:var(--calcite-color-text-2);outline-color:transparent}.container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container--edged:not(.container--overlaid){padding-inline:var(--calcite-internal-carousel-pagination-space-wide);inline-size:calc(100% - var(--calcite-internal-carousel-pagination-space-wide) * 2)}.item-container{display:flex;flex:1 1 auto;align-items:flex-start;justify-content:center;overflow:auto;padding:.25rem;animation-name:none;animation-duration:var(--calcite-animation-timing)}.container--overlaid .item-container{padding:0}.item-container--forward{animation-name:item-forward}.item-container--backward{animation-name:item-backward}calcite-carousel-item:not([selected]){opacity:0}.pagination-aria-live{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.pagination{margin:.75rem;display:flex;flex-direction:row;align-items:center;justify-content:center;inline-size:auto}.pagination-items{display:flex;flex-direction:row;align-items:center}.container--overlaid .pagination{position:absolute}.pagination-item.page-next,.pagination-item.page-previous{color:var(--calcite-internal-carousel-control-icon-color);--calcite-icon-color: var(--calcite-internal-carousel-control-icon-color)}.pagination-item.page-next:hover,.pagination-item.page-previous:hover{color:var(--calcite-internal-carousel-control-icon-color-hover);--calcite-icon-color: var(--calcite-internal-carousel-control-icon-color-hover)}.container--edged .page-next,.container--edged .page-previous{block-size:3rem;inline-size:3rem;position:absolute;inset-block-start:50%;transform:translateY(-50%)}.container--edged .page-next{inset-inline-end:0}.container--edged .page-previous{inset-inline-start:0}.container--overlaid .pagination{inset-block-start:unset;inset-block-end:0;inset-inline:0}:host([pagination-position=top]) .container--overlaid .pagination{inset-block-start:0;inset-block-end:unset}.pagination-item.autoplay-control{position:relative;color:var(--calcite-internal-carousel-autoplay-control-color);--calcite-progress-fill-color: var(--calcite-internal-carousel-autoplay-progress-fill-color);--calcite-progress-background-color: var(--calcite-internal-carousel-autoplay-progress-background-color)}.autoplay-control:focus .autoplay-progress{inset-block-end:4px;inset-inline:2px;inline-size:calc(100% - 4px)}.autoplay-progress{position:absolute;inset-block-end:2px;inset-inline:0;inline-size:100%}.pagination-item{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;margin:0;block-size:2rem;inline-size:2rem;cursor:pointer;align-items:center;border-style:none;background-color:transparent;outline-color:transparent;-webkit-appearance:none;display:flex;align-content:center;justify-content:center;background-color:var(--calcite-internal-carousel-pagination-background-color);color:var(--calcite-internal-carousel-pagination-icon-color)}.pagination-item:hover{background-color:var(--calcite-internal-carousel-pagination-background-color-hover);color:var(--calcite-internal-carousel-pagination-icon-color-hover)}.pagination-item:focus{background-color:var(--calcite-internal-carousel-pagination-background-color-press);outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.pagination-item:active{background-color:var(--calcite-internal-carousel-pagination-background-color-press);color:var(--calcite-internal-carousel-pagination-icon-color-hover)}.pagination-item calcite-icon{color:inherit;pointer-events:none}.pagination-item.pagination-item--selected{background-color:var(--calcite-internal-carousel-pagination-background-color-selected);color:var(--calcite-internal-carousel-pagination-icon-color-selected)}.pagination-item--individual{pointer-events:none;inline-size:0px;padding:0;opacity:0;visibility:hidden;transition:var(--calcite-animation-timing) ease-in-out inline-size,var(--calcite-animation-timing) ease-in-out padding,var(--calcite-animation-timing) ease-in-out opacity}.pagination-item--individual.pagination-item--visible{pointer-events:auto;inline-size:2rem;opacity:1;visibility:visible}.pagination-item--range-edge calcite-icon{scale:.75;transition:var(--calcite-animation-timing) ease-in-out scale}.container--overlaid .pagination-item{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color)}.container--overlaid .pagination-item:hover{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-hover)}.container--overlaid .pagination-item:focus{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-active)}.container--overlaid .pagination-item:active{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-active)}.container--overlaid .pagination-item.pagination-item--selected{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-selected);color:var(--calcite-internal-carousel-pagination-icon-color-selected)}@keyframes item-forward{0%{transform:translate3d(100px,0,0)}to{transform:translateZ(0)}}@keyframes item-backward{0%{transform:translate3d(-100px,0,0)}to{transform:translateZ(0)}}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class Q extends M {
  constructor() {
    super(...arguments), this.autoplayHandler = () => {
      this.clearIntervals(), this.slideDurationInterval = setInterval(this.timer, this.autoplayDuration / 100);
    }, this.containerRef = b(), this.containerId = Y.host(N()), this.direction = B(), this.itemContainerRef = b(), this.resizeHandler = ({ contentRect: { width: e } }) => {
      this.setMaxItemsToBreakpoint(e);
    }, this.resizeObserver = j("resize", (e) => e.forEach(this.resizeHandler)), this.tabListRef = b(), this.timer = () => {
      let e = this.slideDurationRemaining;
      (!this.suspendedDueToFocus && !this.suspendedDueToHover || this.userPreventsSuspend) && (e <= 0.01 ? (e = 1, this.itemDirection = "forward", this.nextItem(!1)) : e = e - 0.01), e > 0 && (this.slideDurationRemaining = e);
    }, this.messages = q({ blocking: !0 }), this.focusSetter = V()(this), this.interactiveContainer = G(this), this.itemDirection = "standby", this.hasMultiple = !1, this.items = [], this.maxItems = m.xxsmall, this.playing = !1, this.selectedIndex = 0, this.slideDurationRemaining = 1, this.suspendedDueToFocus = !1, this.suspendedDueToHover = !1, this.suspendedSlideDurationRemaining = 1, this.userPreventsSuspend = !1, this.arrowType = "inline", this.autoplay = !1, this.autoplayDuration = Z, this.controlOverlay = !1, this.disabled = !1, this.paginationDisabled = !1, this.paginationPosition = "bottom", this.calciteCarouselChange = g({ cancelable: !1 }), this.calciteCarouselPause = g({ cancelable: !1 }), this.calciteCarouselPlay = g({ cancelable: !1 }), this.calciteCarouselResume = g({ cancelable: !1 }), this.calciteCarouselStop = g({ cancelable: !1 });
  }
  static {
    this.properties = { itemDirection: 16, hasMultiple: 16, items: 16, maxItems: 16, playing: 16, selectedIndex: 16, slideDurationRemaining: 16, suspendedDueToFocus: 16, suspendedDueToHover: 16, suspendedSlideDurationRemaining: 16, userPreventsSuspend: 16, arrowType: 3, autoplay: 3, autoplayDuration: 11, controlOverlay: 7, disabled: 7, label: 1, messageOverrides: 0, paginationDisabled: 5, paginationPosition: 3, paused: 5, selectedItem: 0 };
  }
  static {
    this.styles = J;
  }
  async play() {
    this.playing || !this.hasMultiple || this.autoplay !== "" && this.autoplay !== !0 && this.autoplay !== "paused" || this.handlePlay(!0);
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
    this.hasUpdated && !this.hasMultiple && this.handlePause(!1), e.has("autoplay") && this.hasUpdated && this.autoplayWatcher(this.autoplay), e.has("itemDirection") && (this.hasUpdated || this.itemDirection !== "standby") && this.itemDirectionWatcher(this.itemDirection), e.has("playing") && (this.hasUpdated || this.playing !== !1) && (this.paused = !this.playing), (e.has("suspendedDueToFocus") && (this.hasUpdated || this.suspendedDueToFocus !== !1) || e.has("suspendedDueToHover") && (this.hasUpdated || this.suspendedDueToHover !== !1)) && this.suspendWatcher();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearIntervals(), this.resizeObserver?.disconnect();
  }
  autoplayWatcher(e) {
    e || this.handlePause(!1);
  }
  async itemDirectionWatcher(e) {
    e === "standby" || !this.itemContainerRef.value || (await W(this.itemContainerRef.value, e === "forward" ? "item-forward" : "item-backward"), this.itemDirection = "standby");
  }
  suspendWatcher() {
    !this.suspendedDueToFocus && !this.suspendedDueToHover ? this.suspendEnd() : this.suspendStart();
  }
  setMaxItemsToBreakpoint(e) {
    if (e) {
      if (e >= k.width.small) {
        this.maxItems = m.medium;
        return;
      }
      if (e >= k.width.xsmall) {
        this.maxItems = m.small;
        return;
      }
      if (e >= k.width.xxsmall) {
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
    const t = T(this.selectedIndex + 1, this.items.length);
    this.setSelectedItem(t, e);
  }
  previousItem() {
    this.playing = !1;
    const e = T(Math.max(this.selectedIndex - 1, -1), this.items.length);
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
    const t = K(e);
    if (t.length < 1)
      return;
    const i = t.findIndex((c) => c.selected), n = i > -1 ? i : 0;
    this.items = t, this.hasMultiple = t.length > 1, this.setSelectedItem(n, !1);
  }
  setSelectedItem(e, t) {
    const i = this.selectedIndex;
    this.items.forEach((n, c) => {
      const r = e === c;
      n.selected = r, r && (this.selectedItem = n, this.selectedIndex = c);
    }), t && (this.playing = !1, i !== this.selectedIndex && this.calciteCarouselChange.emit());
  }
  handleArrowClick(e) {
    const t = e.target.dataset.itemDirection;
    this.playing && this.handlePause(!0), t === "next" ? (this.itemDirection = "forward", this.nextItem(!0)) : t === "previous" && (this.itemDirection = "backward", this.previousItem());
  }
  handleItemSelection(e) {
    const t = e.currentTarget, i = parseInt(t.dataset.index, 10);
    i !== this.selectedIndex && (this.playing && this.handlePause(!0), this.itemDirection = i > this.selectedIndex ? "forward" : "backward", this.setSelectedItem(i, !0));
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
    if (e.target !== this.containerRef.value)
      return;
    const t = this.items.length - 1;
    switch (e.key) {
      case " ":
      case "Enter":
        e.preventDefault(), (this.autoplay === "" || this.autoplay === !0 || this.autoplay === "paused") && this.toggleRotation();
        break;
      case "ArrowRight":
        if (e.preventDefault(), !this.hasMultiple)
          return;
        this.itemDirection = "forward", this.nextItem(!0);
        break;
      case "ArrowLeft":
        if (e.preventDefault(), !this.hasMultiple)
          return;
        this.itemDirection = "backward", this.previousItem();
        break;
      case "Home":
        if (e.preventDefault(), this.selectedIndex === 0)
          return;
        this.itemDirection = "backward", this.setSelectedItem(0, !0);
        break;
      case "End":
        if (e.preventDefault(), this.selectedIndex === t)
          return;
        this.itemDirection = "forward", this.setSelectedItem(t, !0);
        break;
    }
  }
  tabListKeyDownHandler(e) {
    const t = Array(...this.tabListRef.value.querySelectorAll(`button:not(.${a.paginationItemOutOfRange})`)), i = e.target;
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
  renderRotationControl() {
    const e = this.playing ? this.messages.pause : this.messages.play, t = this.slideDurationRemaining * 100;
    return l`<button .ariaLabel=${e} class=${s({
      [a.paginationItem]: !0,
      [a.autoplayControl]: !0
    })} @click=${this.toggleRotation} title=${e ?? u}><calcite-icon .icon=${this.playing ? p.pause : p.play} scale=s></calcite-icon>${this.playing && l`<calcite-progress class=${s(a.autoplayProgress)} .label=${this.messages.carouselItemProgress} .value=${t}></calcite-progress>` || ""}</button>`;
  }
  renderPaginationArea() {
    return l`<div class=${s({
      [a.pagination]: !0,
      [a.containerOverlaid]: this.controlOverlay
    })} @keydown=${this.tabListKeyDownHandler} ${y(this.tabListRef)}>${(this.playing || this.autoplay === "" || this.autoplay === !0 || this.autoplay === "paused") && this.hasMultiple && this.renderRotationControl() || ""}${this.arrowType === "inline" && this.hasMultiple && this.renderArrow("previous") || ""}${this.paginationDisabled ? this.renderPaginationAriaLive() : this.renderPaginationItems()}${this.arrowType === "inline" && this.hasMultiple && this.renderArrow("next") || ""}</div>`;
  }
  renderPaginationItems() {
    const { selectedIndex: e, maxItems: t, items: i, label: n, handleItemSelection: c } = this;
    return l`<div .ariaLabel=${n} class=${s(a.paginationItems)} role=tablist>${U(i, (r) => r.id, (r, o) => {
      const h = i.length, d = o === e, z = o === 0, A = o === h - 1, D = h - t - 1, f = e < t, w = e >= D, $ = f ? 0 : e - Math.floor(t / 2), O = w ? h : $ + t, R = f ? 0 : w ? D : $, C = f ? t + 1 : O, H = !z && !A && !d && (o === R - 1 || o === C), S = d || o <= C && o >= R - 1, P = h - 1 <= t, E = d ? p.active : p.inactive;
      return l`<button aria-controls=${(d ? void 0 : r.id) ?? u} .ariaSelected=${d} class=${s({
        [a.paginationItem]: !0,
        [a.paginationItemIndividual]: !0,
        [a.paginationItemSelected]: d,
        [a.paginationItemRangeEdge]: h - 1 > t && H,
        [a.paginationItemOutOfRange]: !(P || S),
        [a.paginationItemVisible]: P || S
      })} data-index=${o ?? u} @click=${c} role=tab title=${r.label ?? u}><calcite-icon .icon=${E} scale=l></calcite-icon></button>`;
    })}</div>`;
  }
  renderPaginationAriaLive() {
    const { messages: e, messages: { _lang: t }, selectedIndex: i, items: n } = this;
    if (!e._loading)
      return I.numberFormatOptions = {
        locale: t
      }, l`<div aria-live=off class=${s(a.paginationAriaLive)} role=status>${e.paginationStatus.replace("{current}", I.localize(`${i + 1}`)).replace("{total}", I.localize(`${n.length}`))}</div>`;
  }
  renderArrow(e) {
    const t = e === "previous", i = this.direction, n = this.arrowType === "edge" ? "m" : "s", c = t ? a.pagePrevious : a.pageNext, r = t ? this.messages.previous : this.messages.next, o = t ? p.chevronLeft : p.chevronRight;
    return l`<button aria-controls=${this.containerId ?? u} class=${s({ [a.paginationItem]: !0, [c]: !0 })} data-item-direction=${e ?? u} @click=${this.handleArrowClick} title=${r ?? u}><calcite-icon .flipRtl=${i === "rtl"} .icon=${o} .scale=${n}></calcite-icon></button>`;
  }
  render() {
    const { itemDirection: e, paginationPosition: t } = this, i = this.renderPaginationArea(), n = l`<section class=${s({
      [a.itemContainer]: !0,
      [a.itemContainerForward]: e === "forward",
      [a.itemContainerBackward]: e === "backward"
    })} id=${this.containerId ?? u} ${y(this.itemContainerRef)}><slot @slotchange=${this.handleSlotChange}></slot></section>`;
    return this.interactiveContainer({ disabled: this.disabled, children: l`<div .ariaLabel=${this.label} .ariaLive=${this.playing ? "off" : "polite"} .ariaRoleDescription=${this.messages.carousel} class=${s({
      [a.container]: !0,
      [a.containerOverlaid]: this.controlOverlay,
      [a.containerEdged]: this.arrowType === "edge"
    })} @focusin=${this.handleFocusIn} @focusout=${this.handleFocusOut} @keydown=${this.containerKeyDownHandler} @mouseenter=${this.handleMouseIn} @mouseleave=${this.handleMouseOut} role=group tabindex=0 ${y(this.containerRef)}>${t === "top" ? i : n}${t === "top" ? n : i}${this.arrowType === "edge" && this.hasMultiple && this.renderArrow("previous") || ""}${this.arrowType === "edge" && this.hasMultiple && this.renderArrow("next") || ""}</div>` });
  }
}
L("calcite-carousel", Q);
export {
  Q as Carousel
};
