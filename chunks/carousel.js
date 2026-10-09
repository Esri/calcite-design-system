/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as F, L, c as m, A as u, s as l, b as c, I as M, d as U } from "./index.js";
import { c as B } from "./repeat.js";
import { e as y, n as I } from "./ref.js";
import { u as W } from "./index2.js";
import { B as j, b as K, e as f } from "./dom.js";
import { g as N } from "./guid.js";
import { c as q } from "./observers.js";
import { b as k } from "./responsive.js";
import { n as x } from "./locale.js";
import { g as z } from "./array.js";
import { u as V } from "./useT9n.js";
import { u as _ } from "./useFocusable.js";
import { u as G } from "./useInteractive.js";
import { s as Y } from "./screen-reader.js";
const Z = 6e3, a = {
  container: "container",
  containerOverlaid: "container--overlaid",
  containerEdged: "container--edged",
  itemContainer: "item-container",
  itemContainerForward: "item-container--forward",
  itemContainerBackward: "item-container--backward",
  controlsArea: "controls-area",
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
}, h = {
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
  inactive: "bullet-point",
  active: "bullet-point-large",
  pause: "pause-f",
  play: "play-f"
}, v = {
  medium: 7,
  small: 5,
  xsmall: 3,
  xxsmall: 1
}, J = "calcite-carousel-container", Q = {
  host: (D) => `${J}-${D}`
}, X = F`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%;--calcite-internal-carousel-pagination-space: 1.5rem;--calcite-internal-carousel-pagination-space-wide: 3.5rem;--calcite-internal-carousel-pagination-background-color: var( --calcite-carousel-pagination-background-color, transparent );--calcite-internal-carousel-pagination-background-color-hover: var( --calcite-carousel-pagination-background-color-hover, transparent );--calcite-internal-carousel-pagination-background-color-press: var( --calcite-carousel-pagination-background-color-press, transparent );--calcite-internal-carousel-pagination-background-color-selected: var( --calcite-carousel-pagination-background-color-selected, transparent );--calcite-internal-carousel-pagination-overlay-background-color: var( --calcite-carousel-pagination-background-color, var(--calcite-color-foreground-1) );--calcite-internal-carousel-pagination-overlay-background-color-hover: var( --calcite-carousel-pagination-background-color-hover, var(--calcite-color-foreground-2) );--calcite-internal-carousel-pagination-overlay-background-color-active: var( --calcite-carousel-pagination-background-color-press, var(--calcite-color-foreground-2) );--calcite-internal-carousel-pagination-overlay-background-color-selected: var( --calcite-carousel-pagination-background-color-selected, var(--calcite-color-foreground-1) );--calcite-internal-carousel-pagination-icon-color-hover: var( --calcite-carousel-pagination-icon-color-hover, var(--calcite-color-text-1) );--calcite-internal-carousel-pagination-icon-color: var( --calcite-carousel-pagination-icon-color, var(--calcite-color-border-1) );--calcite-internal-carousel-pagination-icon-color-selected: var( --calcite-carousel-pagination-icon-color-selected, var(--calcite-color-brand) );--calcite-internal-carousel-control-icon-color-hover: var( --calcite-carousel-control-icon-color-hover, var(--calcite-internal-carousel-pagination-icon-color-hover) );--calcite-internal-carousel-control-icon-color: var( --calcite-carousel-control-icon-color, var(--calcite-carousel-pagination-icon-color, var(--calcite-color-text-3)) );--calcite-internal-carousel-autoplay-progress-background-color: var( --calcite-carousel-autoplay-progress-background-color, var(--calcite-color-border-3) );--calcite-internal-carousel-autoplay-progress-fill-color: var( --calcite-carousel-autoplay-progress-fill-color, var(--calcite-color-brand) );--calcite-internal-carousel-autoplay-control-color: var( --calcite-carousel-pagination-icon-color, var(--calcite-color-text-3) )}.container{outline-color:transparent;position:relative;display:flex;flex-direction:column;overflow:hidden;color:var(--calcite-color-text-2);inline-size:100%;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}.container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}.container--edged:not(.container--overlaid){padding-inline:var(--calcite-internal-carousel-pagination-space-wide);inline-size:calc(100% - var(--calcite-internal-carousel-pagination-space-wide) * 2)}.item-container{display:flex;align-items:flex-start;justify-content:center;overflow:auto;flex:1 1 auto;padding:var(--calcite-space-2xs);animation-name:none;animation-duration:var(--calcite-animation-timing)}.container--overlaid .item-container{padding:0}.item-container--forward{animation-name:item-forward}.item-container--backward{animation-name:item-backward}calcite-carousel-item:not([selected]){opacity:0}.controls-area{display:flex;flex-direction:row;align-items:center;justify-content:center;margin:var(--calcite-space-md);inline-size:auto}.pagination{display:flex;flex-direction:row;align-items:center;justify-content:center}.pagination-items{display:flex;flex-direction:row;align-items:center}.container--overlaid .controls-area{position:absolute}.pagination-item.page-next,.pagination-item.page-previous{color:var(--calcite-internal-carousel-control-icon-color);--calcite-icon-color: var(--calcite-internal-carousel-control-icon-color)}.pagination-item.page-next:hover,.pagination-item.page-previous:hover{color:var(--calcite-internal-carousel-control-icon-color-hover);--calcite-icon-color: var(--calcite-internal-carousel-control-icon-color-hover)}.container--edged .page-next,.container--edged .page-previous{block-size:var(--calcite-size-xl);inline-size:var(--calcite-size-xl);position:absolute;inset-block-start:50%;transform:translateY(-50%)}.container--edged .page-next{inset-inline-end:0}.container--edged .page-previous{inset-inline-start:0}.container--overlaid .controls-area{inset-block-start:unset;inset-block-end:0;inset-inline:0}:host([pagination-position=top]) .container--overlaid .controls-area{inset-block-start:0;inset-block-end:unset}.pagination-item.autoplay-control{position:relative;color:var(--calcite-internal-carousel-autoplay-control-color);--calcite-progress-fill-color: var(--calcite-internal-carousel-autoplay-progress-fill-color);--calcite-progress-background-color: var(--calcite-internal-carousel-autoplay-progress-background-color)}.autoplay-control:focus .autoplay-progress{inset-block-end:4px;inset-inline:2px;inline-size:calc(100% - 4px)}.autoplay-progress{position:absolute;inset-block-end:2px;inset-inline:0;inline-size:100%}.pagination-item{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent;margin:0;block-size:var(--calcite-space-3xl);inline-size:var(--calcite-space-3xl);cursor:pointer;align-items:center;border-style:none;-webkit-appearance:none;display:flex;align-content:center;justify-content:center;background-color:var(--calcite-internal-carousel-pagination-background-color);color:var(--calcite-internal-carousel-pagination-icon-color)}.pagination-item:hover{background-color:var(--calcite-internal-carousel-pagination-background-color-hover);color:var(--calcite-internal-carousel-pagination-icon-color-hover)}.pagination-item:focus{background-color:var(--calcite-internal-carousel-pagination-background-color-press);outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}.pagination-item:active{background-color:var(--calcite-internal-carousel-pagination-background-color-press);color:var(--calcite-internal-carousel-pagination-icon-color-hover)}.pagination-item calcite-icon{color:inherit;pointer-events:none}.pagination-item.pagination-item--selected{background-color:var(--calcite-internal-carousel-pagination-background-color-selected);color:var(--calcite-internal-carousel-pagination-icon-color-selected)}.pagination-item--individual{inline-size:0;padding:0;opacity:0;pointer-events:none;visibility:hidden;transition:var(--calcite-animation-timing) ease-in-out inline-size,var(--calcite-animation-timing) ease-in-out padding,var(--calcite-animation-timing) ease-in-out opacity}.pagination-item--individual.pagination-item--visible{inline-size:var(--calcite-space-3xl);opacity:1;pointer-events:auto;visibility:visible}.pagination-item--range-edge calcite-icon{scale:.75;transition:var(--calcite-animation-timing) ease-in-out scale}.container--overlaid .pagination-item{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color)}.container--overlaid .pagination-item:hover{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-hover)}.container--overlaid .pagination-item:focus{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-active)}.container--overlaid .pagination-item:active{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-active)}.container--overlaid .pagination-item.pagination-item--selected{background-color:var(--calcite-internal-carousel-pagination-overlay-background-color-selected);color:var(--calcite-internal-carousel-pagination-icon-color-selected)}@keyframes item-forward{0%{transform:translate3d(100px,0,0)}to{transform:translateZ(0)}}@keyframes item-backward{0%{transform:translate3d(-100px,0,0)}to{transform:translateZ(0)}}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class ee extends L {
  constructor() {
    super(...arguments), this.autoplayHandler = () => {
      this.clearIntervals(), this.slideDurationInterval = setInterval(this.timer, this.autoplayDuration / 100);
    }, this.containerRef = y(), this.containerId = Q.host(N()), this.direction = W(), this.itemContainerRef = y(), this.resizeHandler = ({ contentRect: { width: e } }) => {
      this.setMaxItemsToBreakpoint(e);
    }, this.resizeObserver = q("resize", (e) => e.forEach(this.resizeHandler)), this.tabListRef = y(), this.timer = () => {
      let e = this.slideDurationRemaining;
      (!this.suspendedDueToFocus && !this.suspendedDueToHover || this.userPreventsSuspend) && (e <= 0.01 ? (e = 1, this.itemDirection = "forward", this.nextItem(!1)) : e = e - 0.01), e > 0 && (this.slideDurationRemaining = e);
    }, this.messages = V({ blocking: !0 }), this.focusSetter = _()(this), this.interactiveContainer = G(this), this.itemDirection = "standby", this.hasMultiple = !1, this.items = [], this.maxItems = v.xxsmall, this.playing = !1, this.selectedIndex = 0, this.slideDurationRemaining = 1, this.suspendedDueToFocus = !1, this.suspendedDueToHover = !1, this.suspendedSlideDurationRemaining = 1, this.userPreventsSuspend = !1, this.arrowType = "inline", this.autoplay = !1, this.autoplayDuration = Z, this.controlOverlay = !1, this.disabled = !1, this.paginationDisabled = !1, this.paginationPosition = "bottom", this.calciteCarouselChange = m({ cancelable: !1 }), this.calciteCarouselPause = m({ cancelable: !1 }), this.calciteCarouselPlay = m({ cancelable: !1 }), this.calciteCarouselResume = m({ cancelable: !1 }), this.calciteCarouselStop = m({ cancelable: !1 });
  }
  static {
    this.properties = { itemDirection: 16, hasMultiple: 16, items: 16, maxItems: 16, playing: 16, selectedIndex: 16, slideDurationRemaining: 16, suspendedDueToFocus: 16, suspendedDueToHover: 16, suspendedSlideDurationRemaining: 16, userPreventsSuspend: 16, arrowType: 3, autoplay: 3, autoplayDuration: 11, controlOverlay: 7, disabled: 7, label: 1, messageOverrides: 0, paginationDisabled: 5, paginationPosition: 3, paused: 5, selectedItem: 0 };
  }
  static {
    this.styles = [X, Y];
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
    e === "standby" || !this.itemContainerRef.value || (await j(this.itemContainerRef.value, e === "forward" ? "item-forward" : "item-backward"), this.itemDirection = "standby");
  }
  suspendWatcher() {
    !this.suspendedDueToFocus && !this.suspendedDueToHover ? this.suspendEnd() : this.suspendStart();
  }
  setMaxItemsToBreakpoint(e) {
    if (e) {
      if (e >= k.width.small) {
        this.maxItems = v.medium;
        return;
      }
      if (e >= k.width.xsmall) {
        this.maxItems = v.small;
        return;
      }
      if (e >= k.width.xxsmall) {
        this.maxItems = v.xsmall;
        return;
      }
      this.maxItems = v.xxsmall;
    }
  }
  clearIntervals() {
    clearInterval(this.slideDurationInterval), clearInterval(this.slideInterval);
  }
  nextItem(e) {
    this.playing && e && (this.playing = !1);
    const t = z(this.selectedIndex + 1, this.items.length);
    this.setSelectedItem(t, e);
  }
  previousItem() {
    this.playing = !1;
    const e = z(Math.max(this.selectedIndex - 1, -1), this.items.length);
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
    const t = K(e), i = t.findIndex((r) => r.selected), n = i > -1 ? i : 0;
    this.items = t, this.hasMultiple = t.length > 1, this.setSelectedItem(n, !1);
  }
  setSelectedItem(e, t) {
    const i = this.selectedIndex;
    this.items.forEach((n, r) => {
      const s = e === r;
      n.selected = s, s && (this.selectedItem = n, this.selectedIndex = r);
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
        f(t, i, "next");
        break;
      case "ArrowLeft":
        f(t, i, "previous");
        break;
      case "Home":
        e.preventDefault(), f(t, i, "first");
        break;
      case "End":
        e.preventDefault(), f(t, i, "last");
        break;
    }
  }
  renderRotationControl() {
    const e = this.playing ? this.messages.pause : this.messages.play, t = this.slideDurationRemaining * 100;
    return c`<button .ariaLabel=${e} class=${l({
      [a.paginationItem]: !0,
      [a.autoplayControl]: !0
    })} @click=${this.toggleRotation} title=${e ?? u}><calcite-icon .icon=${this.playing ? h.pause : h.play} scale=s></calcite-icon>${this.playing && c`<calcite-progress class=${l(a.autoplayProgress)} .label=${this.messages.carouselItemProgress} .value=${t}></calcite-progress>` || ""}</button>`;
  }
  renderControlsArea() {
    const e = (this.playing || this.autoplay === "" || this.autoplay === !0 || this.autoplay === "paused") && this.hasMultiple, t = this.arrowType === "inline" && this.hasMultiple;
    if (!(this.paginationDisabled && !e && !t))
      return c`<div class=${l({
        [a.controlsArea]: !0
      })}>${e && this.renderRotationControl() || ""}${t && this.renderArrow("previous") || ""}${!this.paginationDisabled && c`<div class=${l(a.pagination)}>${this.renderPaginationItems()}</div>` || ""}${t && this.renderArrow("next") || ""}</div>`;
  }
  renderPaginationItems() {
    const { selectedIndex: e, maxItems: t, items: i, label: n, handleItemSelection: r } = this;
    return c`<div .ariaLabel=${n} class=${l(a.paginationItems)} @keydown=${this.tabListKeyDownHandler} role=tablist ${I(this.tabListRef)}>${B(i, (s) => s.id, (s, o) => {
      const d = i.length, p = o === e, g = o === 0, A = o === d - 1, w = d - t - 1, b = e < t, $ = e >= w, C = b ? 0 : e - Math.floor(t / 2), O = $ ? d : C + t, R = b ? 0 : $ ? w : C, S = b ? t + 1 : O, H = !g && !A && !p && (o === R - 1 || o === S), P = p || o <= S && o >= R - 1, T = d - 1 <= t, E = p ? h.active : h.inactive;
      return c`<button aria-controls=${(p ? void 0 : s.id) ?? u} .ariaSelected=${p} class=${l({
        [a.paginationItem]: !0,
        [a.paginationItemIndividual]: !0,
        [a.paginationItemSelected]: p,
        [a.paginationItemRangeEdge]: d - 1 > t && H,
        [a.paginationItemOutOfRange]: !(T || P),
        [a.paginationItemVisible]: T || P
      })} data-index=${o ?? u} @click=${r} role=tab title=${s.label ?? u}><calcite-icon .icon=${E} scale=l></calcite-icon></button>`;
    })}</div>`;
  }
  renderPaginationAriaLive() {
    const { messages: e, messages: { _lang: t }, selectedIndex: i, items: n } = this;
    if (!e._loading)
      return x.numberFormatOptions = {
        locale: t
      }, c`<div aria-live=off class=${l(M.screenReaderText)} role=status>${e.paginationStatus.replace("{current}", x.localize(`${i + 1}`)).replace("{total}", x.localize(`${n.length}`))}</div>`;
  }
  renderArrow(e) {
    const t = e === "previous", i = this.direction, n = this.arrowType === "edge" ? "m" : "s", r = t ? a.pagePrevious : a.pageNext, s = t ? this.messages.previous : this.messages.next, o = t ? h.chevronLeft : h.chevronRight;
    return c`<button aria-controls=${this.containerId ?? u} class=${l({ [a.paginationItem]: !0, [r]: !0 })} data-item-direction=${e ?? u} @click=${this.handleArrowClick} title=${s ?? u}><calcite-icon .flipRtl=${i === "rtl"} .icon=${o} .scale=${n}></calcite-icon></button>`;
  }
  render() {
    const { arrowType: e, hasMultiple: t, itemDirection: i, items: n, paginationDisabled: r, paginationPosition: s } = this, o = n.length > 0 ? this.renderControlsArea() : void 0, d = r && n.length > 0 ? this.renderPaginationAriaLive() : void 0, g = [c`<section class=${l({
      [a.itemContainer]: !0,
      [a.itemContainerForward]: i === "forward",
      [a.itemContainerBackward]: i === "backward"
    })} id=${this.containerId ?? u} ${I(this.itemContainerRef)}><slot @slotchange=${this.handleSlotChange}></slot></section>`, o, d];
    return s === "top" && g.reverse(), e === "edge" && t && g.push(this.renderArrow("previous"), this.renderArrow("next")), this.interactiveContainer({ disabled: this.disabled, children: c`<div .ariaLabel=${this.label} .ariaLive=${this.playing ? "off" : "polite"} .ariaRoleDescription=${this.messages.carousel} class=${l({
      [a.container]: !0,
      [a.containerOverlaid]: this.controlOverlay,
      [a.containerEdged]: e === "edge"
    })} @focusin=${this.handleFocusIn} @focusout=${this.handleFocusOut} @keydown=${this.containerKeyDownHandler} @mouseenter=${this.handleMouseIn} @mouseleave=${this.handleMouseOut} role=group tabindex=0 ${I(this.containerRef)}>${g}</div>` });
  }
}
U("calcite-carousel", ee);
export {
  ee as Carousel
};
