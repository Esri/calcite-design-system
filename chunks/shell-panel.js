/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as M, L as V, c as x, s as p, b as v, I as z, d as D, K as E, Q as H } from "./index.js";
import { i as g } from "./keyed.js";
import { u as U, i as R } from "./useSizeOverride.js";
import { e as w, n as S } from "./ref.js";
import { u as _ } from "./index2.js";
import { j as l, b as P, s as L } from "./dom.js";
import { g as C } from "./dynamicClasses.js";
import { a as k } from "./aria.js";
import { u as W } from "./useT9n.js";
import { i as O } from "./resources6.js";
import { I as A, S as $, C as c } from "./resources25.js";
const N = M`.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-right{animation-name:in-right}.calcite-animate__in-left{animation-name:in-left}.calcite-animate__in-scale{animation-name:in-scale}@keyframes in{0%{opacity:0}to{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0,-5px,0)}to{opacity:1;transform:translateZ(0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0,5px,0)}to{opacity:1;transform:translateZ(0)}}@keyframes in-right{0%{opacity:0;transform:translate3D(-5px,0,0)}to{opacity:1;transform:translateZ(0)}}@keyframes in-left{0%{opacity:0;transform:translate3D(5px,0,0)}to{opacity:1;transform:translateZ(0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(.95,.95,1)}to{opacity:1;transform:scaleZ(1)}}`, K = M`:host{pointer-events:none;position:relative;display:flex;flex:0 1 auto;align-items:stretch;z-index:var(--calcite-shell-panel-z-index, var(--calcite-z-index));--calcite-shell-panel-max-height: unset;--calcite-internal-shell-panel-shadow-block-start: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-block-end: 0 -4px 8px -1px rgba(0, 0, 0, .08), 0 -2px 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-start: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-end: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04)}.calcite--rtl.content--overlay{--calcite-internal-shell-panel-shadow-inline-start: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-end: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04)}:host([layout=vertical]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index) + 1))}:host([layout=vertical][display-mode=overlay]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index-header) + 1))}:host([layout=vertical][display-mode=float-all]) .content{flex:2}:host([layout=vertical]:not([display-mode=float-all])) .width-s{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 300px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][display-mode=float-all]) .width-s{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical]:not([display-mode=float-all])) .width-m{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 420px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][display-mode=float-all]) .width-m{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical]:not([display-mode=float-all])) .width-l{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 680px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 340px)}:host([layout=vertical][display-mode=float-all]) .width-l{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 340px)}:host([layout=horizontal]) .content{--calcite-internal-shell-panel-height: var(--calcite-shell-panel-height);--calcite-internal-shell-panel-min-height: var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height: var(--calcite-shell-panel-max-height, 30vh)}:host([layout=horizontal]) .height-s{--calcite-internal-shell-panel-height: var(--calcite-shell-panel-height);--calcite-internal-shell-panel-min-height: var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height: var(--calcite-shell-panel-max-height, 20vh)}:host([layout=horizontal]) .height-l{--calcite-internal-shell-panel-height: var(--calcite-shell-panel-height);--calcite-internal-shell-panel-min-height: var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height: var(--calcite-shell-panel-max-height, 40vh)}:host([display-mode=float-all][height=s]),:host([display-mode=float-all][height-scale=s]) .content{min-block-size:var(--calcite-shell-panel-height, 20vh)}:host([display-mode=float-all][height=m]),:host([display-mode=float-all][height-scale=m]) .content{min-block-size:var(--calcite-shell-panel-height, 30vh)}:host([display-mode=float-all][height=l]),:host([display-mode=float-all][height-scale=l]) .content{min-block-size:var(--calcite-shell-panel-height, 40vh)}.container{pointer-events:none;box-sizing:border-box;display:flex;block-size:100%;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size-relative-base);color:var(--calcite-shell-panel-text-color, var(--calcite-color-text-2))}.container *{box-sizing:border-box}.container.float-all{margin-block:var(--calcite-theme-space-sm, var(--calcite-spacing-sm));margin-inline:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}.float-all{max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem) );box-shadow:var(--calcite-shell-panel-shadow, var(--calcite-shadow-sm));border-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)));overflow:hidden}:host([layout=vertical][position=start]) .float-all{border-inline-start:var(--calcite-border-width-sm) solid var(--calcite-shell-panel-border-color, var(--calcite-color-border-3))}:host([layout=vertical][position=end]) .float-all{border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-shell-panel-border-color, var(--calcite-color-border-3)))}:host([layout=horizontal]) .float-all{border-inline:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-shell-panel-border-color, var(--calcite-color-border-3)))}:host([layout=horizontal]) .container{block-size:auto;inline-size:100%;flex-direction:column}.resize-handle{position:absolute;box-sizing:border-box;display:flex;-webkit-user-select:none;user-select:none;align-items:center;justify-content:center;outline:2px solid transparent;outline-offset:2px;--calcite-internal-shell-panel-resize-handle-offset: calc( (var(--calcite-size-fixed-xxl) - var(--calcite-size-fixed-sm-plus)) / 2 * -1 );z-index:var(--calcite-z-index-header);touch-action:none}.resize-handle:active .resize-handle-bar,.resize-handle:hover .resize-handle-bar{color:var(--calcite-shell-panel-resize-icon-color, var(--calcite-color-text-1));background-color:var(--calcite-shell-panel-resize-background-color, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)))}.resize-handle-bar{pointer-events:none;display:flex;align-items:center;justify-content:center;color:var(--calcite-shell-panel-resize-icon-color, var(--calcite-color-border-input));background-color:var(--calcite-shell-panel-resize-background-color, var(--calcite-theme-color-surface-1, var(--calcite-color-background)))}.resize-handle:focus .resize-handle-bar{outline-color:transparent;outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)))}:host([position=start][layout=vertical]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);inset-inline-end:var(--calcite-internal-shell-panel-resize-handle-offset);block-size:100%}:host([position=start][layout=vertical]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-start:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=start][layout=vertical]):host([display-mode^=float]) .resize-handle-bar{border-start-end-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)));border-end-end-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)))}:host([position=end][layout=vertical]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);inset-inline-start:var(--calcite-internal-shell-panel-resize-handle-offset);block-size:100%}:host([position=end][layout=vertical]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=end][layout=vertical]):host([display-mode^=float]) .resize-handle-bar{border-start-start-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)));border-end-start-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)))}:host([position=start][layout=horizontal]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-end:var(--calcite-internal-shell-panel-resize-handle-offset)}:host([position=start][layout=horizontal]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-start:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=start][layout=horizontal]):host([display-mode^=float]) .resize-handle-bar{border-end-end-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)));border-end-start-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)))}:host([position=end][layout=horizontal]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-start:var(--calcite-internal-shell-panel-resize-handle-offset)}:host([position=end][layout=horizontal]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-end:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=end][layout=horizontal]):host([display-mode^=float]) .resize-handle-bar{border-start-start-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)));border-start-end-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)))}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}.action-bar-container{pointer-events:auto;box-sizing:border-box;display:flex;flex:1 1 auto}.content-container{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;align-items:stretch;align-self:stretch}:host([layout=horizontal]) .action-bar-container,:host([layout=horizontal]) .content-container{flex-direction:column}.content{pointer-events:auto;position:relative;box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;padding:0;background-color:var(--calcite-shell-panel-background-color, var(--calcite-theme-color-surface-1, var(--calcite-color-background)));transition:max-block-size var(--calcite-animation-timing),max-inline-size var(--calcite-animation-timing)}:host([layout=vertical]:not([display-mode=float-all])) .content{inline-size:var(--calcite-internal-shell-panel-width);max-inline-size:var(--calcite-internal-shell-panel-max-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=vertical][display-mode=float-all]) .content{inline-size:var(--calcite-internal-shell-panel-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=horizontal]) .content{block-size:var(--calcite-internal-shell-panel-height);max-block-size:var(--calcite-internal-shell-panel-max-height);min-block-size:var(--calcite-internal-shell-panel-min-height)}:host([resizable][layout=vertical][position=start]) .content{padding-inline-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][layout=vertical][position=end]) .content{padding-inline-start:var(--calcite-size-fixed-sm-plus)}:host([resizable][layout=horizontal][position=start]) .content{padding-block-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][layout=horizontal][position=end]) .content{padding-block-start:var(--calcite-size-fixed-sm-plus)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}.content--overlay{position:absolute;box-shadow:var(--calcite-shell-panel-shadow, var(--calcite-shadow-sm))}:host([layout=vertical]) .content--overlay{inset-block-start:0px;block-size:100%}:host([layout=horizontal]) .content--overlay{inset-inline-start:0px;inline-size:100%}:host([layout=vertical][position=start]) .content--overlay{inset-inline-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-start)}:host([layout=vertical][position=end]) .content--overlay{inset-inline-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-end)}:host([layout=horizontal][position=start]) .content--overlay{inset-block-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-start)}:host([layout=horizontal][position=end]) .content--overlay{inset-block-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-end)}.float--content{margin-block-end:auto;block-size:auto;overflow:hidden;box-shadow:var(--calcite-shell-panel-shadow, var(--calcite-shadow-sm));border-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)));margin-inline:var(--calcite-theme-space-sm, var(--calcite-spacing-sm));margin-block-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm));max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem) )}.float--content ::slotted(calcite-panel),.float--content ::slotted(calcite-flow){max-block-size:unset}:host([layout=horizontal]) .float--content{margin-block:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([position=start]) .float--content ::slotted(calcite-panel),:host([position=start]) .float--content ::slotted(calcite-flow),:host([position=end]) .float--content ::slotted(calcite-panel),:host([position=end]) .float--content ::slotted(calcite-flow){border-style:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([closed])){border:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=start]:not([slot=panel-end])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]:not([slot=panel-end])) .content ::slotted(calcite-flow),:host([position=start]:not([slot=panel-end])) .content ::slotted(calcite-panel),:host([position=end][slot=panel-start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end][slot=panel-start]) .content ::slotted(calcite-flow),:host([position=end][slot=panel-start]) .content ::slotted(calcite-panel){border-inline-start:none}:host([resizable][layout=vertical]) .content ::slotted(calcite-flow),:host([resizable][layout=vertical]) .content ::slotted(calcite-panel){border-inline-start:none;border-inline-end:none}:host([resizable][layout=horizontal]) .content ::slotted(calcite-flow),:host([resizable][layout=horizontal]) .content ::slotted(calcite-panel){border-block-start:none;border-block-end:none}:host([position=end]:not([slot=panel-start])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-flow),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-panel),:host([position=start][slot=panel-end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start][slot=panel-end]) .content ::slotted(calcite-flow),:host([position=start][slot=panel-end]) .content ::slotted(calcite-panel){border-inline-end:none}:host([layout=horizontal]) slot[name=action-bar]::slotted(calcite-action-bar){border-inline:0}:host([layout=horizontal][position=start]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=start]) .content ::slotted(calcite-panel){border-inline:0;border-block-start:0}:host([layout=horizontal][position=end]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=end]) .content ::slotted(calcite-panel){border-inline:0;border-block-end:0}:host([display-mode=dock]) .resize-handle-bar,:host([display-mode=float-all]) .resize-handle-bar,:host([display-mode=overlay]) .resize-handle-bar{border-block-start:var(--calcite-border-width-sm) solid var(--calcite-color-border-3);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-color-border-3);border-block-end:var(--calcite-border-width-sm) solid var(--calcite-color-border-3)}:host([hidden]){display:none}[hidden]{display:none}`;
class T extends V {
  constructor() {
    super(...arguments), this.direction = _(), this.resizeHandleRef = w(), this.actionBars = [], this.contentRef = w(), this.containerRef = w(), this.messages = W(), this.sizeOverride = U({
      targetElement: this.contentRef,
      getBounds: () => ({
        inline: { min: this.resizeValues.minInlineSize, max: this.getMaxInlineSize() },
        block: { min: this.resizeValues.minBlockSize, max: this.getMaxBlockSize() }
      }),
      onResize: (e) => {
        this.resizeValues = e;
      }
    }), this.resizeValues = {
      inlineSize: null,
      blockSize: null,
      minInlineSize: null,
      minBlockSize: null,
      maxInlineSize: null,
      maxBlockSize: null
    }, this.hasHeader = !1, this.collapsed = !1, this.displayMode = "dock", this.layout = "vertical", this.position = "start", this.resizable = !1, this.widthScale = "m", this.calciteInternalShellPanelResizeEnd = x({ cancelable: !1 }), this.calciteInternalShellPanelResizeStart = x({ cancelable: !1 }), this.calciteShellPanelCollapse = x({ cancelable: !1 }), this.calciteShellPanelExpand = x({ cancelable: !1 });
  }
  static {
    this.properties = { resizeValues: 16, hasHeader: 16, collapsed: 7, displayMode: 3, heightScale: 3, layout: 3, messageOverrides: 0, position: 3, resizable: 7, shellSizingDataProvider: 0, height: 3, widthScale: 3, width: 3 };
  }
  static {
    this.styles = [K, N];
  }
  async updateSize(e) {
    this.updateSizeInternal(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasUpdated && this.refreshResize();
  }
  willUpdate(e) {
    let t = !1;
    e.has("layout") && (this.hasUpdated || this.layout !== "vertical") && (this.setActionBarsLayout(this.actionBars), this.updateSizeInternal({ inline: null, block: null }), t = !0), (e.has("direction") && this.hasUpdated || e.has("position") && (this.hasUpdated || this.position !== "start")) && (t = !0), (e.has("collapsed") && (this.hasUpdated || this.collapsed !== !1) || e.has("resizable") && (this.hasUpdated || this.resizable !== !1)) && (t = this.resizable && !this.collapsed, t || this.cleanUpInteractions()), t && this.refreshResize(), e.has("collapsed") && this.hasUpdated && (this.collapsed ? this.calciteShellPanelCollapse.emit() : this.calciteShellPanelExpand.emit());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.cleanUpInteractions();
  }
  updateSizeInternal(e) {
    this.contentRef.value && this.sizeOverride.resize(e);
  }
  handleKeyDown(e) {
    const { key: t, defaultPrevented: a, shiftKey: o } = e, { position: i, layout: n, resizable: r, contentRef: s, resizeValues: { maxBlockSize: h, maxInlineSize: m, minBlockSize: u, minInlineSize: b } } = this, I = [...n === "horizontal" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"], "Home", "End"];
    if (!r || !s.value || a || !I.includes(t))
      return;
    const f = s.value.getBoundingClientRect(), B = this.direction === "rtl" ? -1 : 1, d = o ? E : H;
    switch (t) {
      case "ArrowUp":
        this.updateSizeInternal({
          block: f.height + (n === "horizontal" && i === "end" ? d : -d)
        }), e.preventDefault();
        break;
      case "ArrowDown":
        this.updateSizeInternal({
          block: f.height + (n === "horizontal" && i === "end" ? -d : d)
        }), e.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSizeInternal({
          inline: f.width + (n === "vertical" && i === "end" ? d : -d) * B
        }), e.preventDefault();
        break;
      case "ArrowRight":
        this.updateSizeInternal({
          inline: f.width + (n === "vertical" && i === "end" ? -d : d) * B
        }), e.preventDefault();
        break;
      case "Home":
        this.updateSizeInternal(n === "horizontal" ? { block: u } : { inline: b }), e.preventDefault();
        break;
      case "End":
        this.updateSizeInternal(n === "horizontal" ? { block: h } : { inline: m }), e.preventDefault();
        break;
    }
  }
  cleanUpInteractions() {
    this.interaction?.unset();
  }
  updateResizeValues() {
    const { contentRef: e, layout: t } = this;
    if (!e.value)
      return;
    const a = window.getComputedStyle(e.value), o = l(a.maxInlineSize) || window.innerWidth, i = l(a.maxBlockSize) || window.innerHeight, n = t === "vertical" ? this.getAvailableInlineSize() : null, r = t === "horizontal" ? this.getAvailableBlockSize() : null;
    this.resizeValues = {
      inlineSize: l(a.inlineSize),
      blockSize: l(a.blockSize),
      minInlineSize: l(a.minInlineSize),
      minBlockSize: l(a.minBlockSize),
      maxInlineSize: n === null ? o : Math.min(o, n),
      maxBlockSize: r === null ? i : Math.min(i, r)
    };
  }
  getAvailableBlockSize() {
    return this.getAvailableSize("block");
  }
  getAvailableInlineSize() {
    return this.getAvailableSize("inline");
  }
  getAvailableSize(e) {
    const t = e === "inline" ? "width" : "height", a = this.shellSizingDataProvider?.(e), o = this.actionBarContainerEl?.getBoundingClientRect()[t] ?? 0, i = Math.max(o, this.actionBars.reduce((h, m) => h + m.getBoundingClientRect()[t], 0));
    if (!a)
      return null;
    const { availableSize: n } = a, r = this.getContainerSpacingSize(e), s = this.getContentSpacingSize(e);
    return Math.max(Math.floor(n) - Math.ceil(i) - Math.ceil(r) - Math.ceil(s), 0);
  }
  getContentSpacingSize(e) {
    const t = this.contentRef.value;
    if (!t)
      return 0;
    const a = window.getComputedStyle(t);
    return e === "inline" ? l(a.marginInlineStart) + l(a.marginInlineEnd) + l(a.borderInlineStartWidth) + l(a.borderInlineEndWidth) : l(a.marginBlockStart) + l(a.marginBlockEnd) + l(a.borderBlockStartWidth) + l(a.borderBlockEndWidth);
  }
  getContainerSpacingSize(e) {
    const t = this.containerRef.value;
    if (!t)
      return 0;
    const a = window.getComputedStyle(t);
    return e === "inline" ? l(a.marginInlineStart) + l(a.marginInlineEnd) + l(a.borderInlineStartWidth) + l(a.borderInlineEndWidth) : l(a.marginBlockStart) + l(a.marginBlockEnd) + l(a.borderBlockStartWidth) + l(a.borderBlockEndWidth);
  }
  getMaxBlockSize() {
    const { layout: e, contentRef: t } = this;
    if (e !== "horizontal")
      return this.resizeValues.maxBlockSize;
    if (!t.value)
      return this.resizeValues.maxBlockSize;
    const a = window.getComputedStyle(t.value), o = l(a.maxBlockSize) || window.innerHeight, i = this.getAvailableBlockSize();
    return i === null ? o : Math.min(o, i);
  }
  getMaxInlineSize() {
    const { layout: e, contentRef: t } = this;
    if (e !== "vertical")
      return this.resizeValues.maxInlineSize;
    if (!t.value)
      return this.resizeValues.maxInlineSize;
    const a = window.getComputedStyle(t.value), o = l(a.maxInlineSize) || window.innerWidth, i = this.getAvailableInlineSize();
    return i === null ? o : Math.min(o, i);
  }
  async refreshResize() {
    await this.componentOnReady(), await this.updateComplete, this.updateResizeValues(), this.setUpResizeInteractions();
  }
  setUpResizeInteractions() {
    this.cleanUpInteractions();
    const { el: e, contentRef: t, resizable: a, position: o, collapsed: i, resizeHandleRef: n, layout: r } = this, s = n.value;
    if (!t.value || i || !a || !s)
      return;
    const h = this.direction === "rtl", m = this.resizeValues.minInlineSize === null || this.resizeValues.minBlockSize === null ? void 0 : { width: this.resizeValues.minInlineSize, height: this.resizeValues.minBlockSize };
    this.interaction = R(t.value, { context: e.ownerDocument }).resizable({
      edges: {
        top: o === "end" && r === "horizontal" ? s : !1,
        right: o === (h ? "end" : "start") && r === "vertical" ? s : !1,
        bottom: o === "start" && r === "horizontal" ? s : !1,
        left: o === (h ? "start" : "end") && r === "vertical" ? s : !1
      },
      modifiers: [R.modifiers.restrictSize({ min: m })],
      listeners: {
        resizestart: () => {
          this.calciteInternalShellPanelResizeStart.emit();
        },
        resizeend: () => {
          this.calciteInternalShellPanelResizeEnd.emit();
        },
        move: ({ rect: u }) => {
          const b = r === "horizontal";
          this.updateSize(b ? { block: u.height } : { inline: u.width });
        }
      }
    });
  }
  setActionBarsLayout(e) {
    e.forEach((t) => t.layout = this.layout);
  }
  handleActionBarSlotChange(e) {
    const t = P(e).filter(O);
    this.actionBars = t, this.setActionBarsLayout(t);
  }
  handleHeaderSlotChange(e) {
    this.hasHeader = L(e);
  }
  getResizeIcon() {
    const { layout: e } = this;
    return e === "horizontal" ? A.dragVertical : A.dragHorizontal;
  }
  renderHeader() {
    return g("header", v`<div class=${p(c.contentHeader)} .hidden=${!this.hasHeader}><slot name=${$.header} @slotchange=${this.handleHeaderSlotChange}></slot></div>`);
  }
  render() {
    const { collapsed: e, position: t, resizable: a, layout: o, displayMode: i, resizeValues: n } = this, r = this.direction, s = o === "horizontal", h = !e && a ? g("resize-handle", v`<div .ariaLabel=${this.messages.resize} .ariaOrientation=${s ? "vertical" : "horizontal"} .ariaValueMax=${k(s ? "block" : "inline", n.maxBlockSize, n.maxInlineSize)} .ariaValueMin=${k(s ? "block" : "inline", n.minBlockSize, n.minInlineSize)} .ariaValueNow=${k(s ? "block" : "inline", n.blockSize, n.inlineSize)} class=${p(c.resizeHandle)} @keydown=${this.handleKeyDown} role=separator tabindex=0 ${S(this.resizeHandleRef)}><div class=${p(c.resizeHandleBar)}><calcite-icon .icon=${this.getResizeIcon()} scale=s></calcite-icon></div></div>`) : null, m = () => o === "horizontal" ? t === "start" ? z.calciteAnimateInDown : z.calciteAnimateInUp : r === "ltr" && t === "end" || r === "rtl" && t === "start" ? z.calciteAnimateInLeft : z.calciteAnimateInRight, u = v`<div class=${p(c.contentContainer)}>${g("content", v`<div class=${p({
      [z.rtl]: r === "rtl",
      [c.content]: !0,
      [c.contentOverlay]: i === "overlay",
      [c.floatContent]: i === "float-content" || i === "float",
      [z.calciteAnimate]: i === "overlay",
      [m()]: i === "overlay",
      [C("width", this.width, this.widthScale)]: !!(this.width || this.widthScale),
      [C("height", this.height, this.heightScale)]: !!(this.height || this.heightScale)
    })} .hidden=${e} ${S(this.contentRef)}>${this.renderHeader()}<div class=${p(c.contentBody)}><slot></slot></div>${h}</div>`)}</div>`, y = [g("action-bar-container", v`<div class=${p(c.actionBarContainer)}><slot name=${$.actionBar} @slotchange=${this.handleActionBarSlotChange}></slot></div>`), u];
    return t === "end" && y.reverse(), v`<div class=${p({ [c.container]: !0, [c.floatAll]: i === "float-all" })} ${S(this.containerRef)}>${y}</div>`;
  }
}
D("calcite-shell-panel", T);
export {
  T as ShellPanel
};
