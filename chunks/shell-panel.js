import { j as N, L as K, n as S, x as y, s as b, q as B, C as g, k as D } from "./iframe.js";
import { i as z } from "./keyed.js";
import { n as E } from "./ref.js";
import { e as W, g as M, d as L, s as V } from "./dom.js";
import { c as A } from "./math.js";
import { g as P } from "./dynamicClasses.js";
import { u as U } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const u = {
  container: "container",
  content: "content",
  contentHeader: "content__header",
  contentBody: "content__body",
  contentOverlay: "content--overlay",
  floatAll: "float-all",
  floatContent: "float--content",
  separator: "separator"
}, $ = {
  actionBar: "action-bar",
  header: "header"
}, _ = N`:host{pointer-events:none;position:relative;display:flex;flex:0 1 auto;align-items:stretch;z-index:var(--calcite-shell-panel-z-index, var(--calcite-z-index));--calcite-shell-panel-max-height: unset;--calcite-internal-shell-panel-shadow-block-start: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-block-end: 0 -4px 8px -1px rgba(0, 0, 0, .08), 0 -2px 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-start: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-end: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04)}.calcite--rtl.content--overlay{--calcite-internal-shell-panel-shadow-inline-start: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-end: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04)}:host([layout=vertical]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index) + 1))}:host([layout=vertical][display-mode=overlay]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index-header) + 1))}:host([layout=vertical][display-mode=float-all]) .content{flex:2}:host([layout=vertical]:not([display-mode=float-all])) .width-s{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 300px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][display-mode=float-all]) .width-s{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical]:not([display-mode=float-all])) .width-m{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 420px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][display-mode=float-all]) .width-m{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical]:not([display-mode=float-all])) .width-l{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 680px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 340px)}:host([layout=vertical][display-mode=float-all]) .width-l{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 340px)}:host([layout=horizontal]) .height-s{--calcite-internal-shell-panel-max-height: var( --calcite-shell-panel-max-height, var(--calcite-shell-panel-detached-max-height, 20vh) )}:host([layout=horizontal]) .content{--calcite-internal-shell-panel-min-height: var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height: var(--calcite-shell-panel-max-height, 30vh)}:host([layout=horizontal]) .height-l{--calcite-internal-shell-panel-max-height: var( --calcite-shell-panel-max-height, var(--calcite-shell-panel-detached-max-height, 40vh) )}.container{pointer-events:none;box-sizing:border-box;display:flex;block-size:100%;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}.container *{box-sizing:border-box}.container.float-all{margin-block:.5rem;margin-inline:.5rem}.float-all{max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem) );box-shadow:var(--calcite-shell-panel-shadow, var(--calcite-shadow-sm));border-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round));overflow:hidden}:host([layout=vertical][position=start]) .float-all{border-inline-start:1px solid var(--calcite-shell-panel-border-color, var(--calcite-color-border-3))}:host([layout=vertical][position=end]) .float-all{border-inline-end:1px solid var(--calcite-shell-panel-border-color, var(--calcite-color-border-3))}:host([layout=horizontal]) .float-all{border-inline:1px solid var(--calcite-shell-panel-border-color, var(--calcite-color-border-3))}:host([layout=horizontal]) .container{block-size:auto;inline-size:100%;flex-direction:column}:host(:hover) .separator:not(:hover):not(:focus),:host(:focus-within) .separator:not(:hover):not(:focus){opacity:1;background-color:var(--calcite-color-border-3)}.separator{pointer-events:auto;position:absolute;display:flex;background-color:transparent;opacity:0;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;cursor:col-resize;outline:none}.separator:hover{opacity:1;background-color:var(--calcite-color-border-2)}.separator:focus{background-color:var(--calcite-color-brand);opacity:1}:host([layout=vertical]) .separator{inset-block:0px;block-size:100%;inline-size:.125rem;cursor:col-resize}:host([layout=horizontal][position=start]) .separator{inset-block-end:0px}:host([layout=horizontal][position=end]) .separator{inset-block-start:0px}:host([layout=horizontal]) .separator{inset-inline-end:0px;block-size:.125rem;inline-size:100%;cursor:row-resize}:host([layout=vertical][position=start]) .separator{inset-inline-end:-2px}:host([layout=horizontal][position=start]) .separator{inset-block-end:-2px}:host([layout=vertical][position=end]) .separator{inset-inline-start:-2px}:host([layout=horizontal][position=end]) .separator{inset-block-start:-2px}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.content{pointer-events:auto;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;background-color:var(--calcite-color-background);padding:0;transition:max-block-size var(--calcite-animation-timing),max-inline-size var(--calcite-animation-timing)}:host([layout=vertical]:not([display-mode=float-all])) .content{inline-size:var(--calcite-internal-shell-panel-width);max-inline-size:var(--calcite-internal-shell-panel-max-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=vertical][display-mode=float-all]) .content{inline-size:var(--calcite-internal-shell-panel-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=horizontal]) .content{block-size:var(--calcite-internal-shell-panel-height);max-block-size:var(--calcite-internal-shell-panel-max-height);min-block-size:var(--calcite-internal-shell-panel-min-height)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}.content--overlay{position:absolute;--tw-shadow: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--tw-shadow-colored: 0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:host([layout=vertical]) .content--overlay{inset-block-start:0px;block-size:100%}:host([layout=horizontal]) .content--overlay{inset-inline-start:0px;inline-size:100%}:host([layout=vertical][position=start]) .content--overlay{inset-inline-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-start)}:host([layout=vertical][position=end]) .content--overlay{inset-inline-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-end)}:host([layout=horizontal][position=start]) .content--overlay{inset-block-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-start)}:host([layout=horizontal][position=end]) .content--overlay{inset-block-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-end)}.float--content{margin-inline:.5rem;margin-block:.5rem auto;block-size:auto;overflow:hidden;border-radius:.25rem;--tw-shadow: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--tw-shadow-colored: 0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem) )}.float--content ::slotted(calcite-panel),.float--content ::slotted(calcite-flow){max-block-size:unset}:host([layout=horizontal]) .float--content{margin-block:.5rem}:host([position=start]) .float--content ::slotted(calcite-panel),:host([position=start]) .float--content ::slotted(calcite-flow),:host([position=end]) .float--content ::slotted(calcite-panel),:host([position=end]) .float--content ::slotted(calcite-flow){border-style:none}.content[hidden]{display:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([closed])){border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3)}:host([position=start]:not([slot=panel-end])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]:not([slot=panel-end])) .content ::slotted(calcite-flow),:host([position=start]:not([slot=panel-end])) .content ::slotted(calcite-panel),:host([position=end][slot=panel-start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end][slot=panel-start]) .content ::slotted(calcite-flow),:host([position=end][slot=panel-start]) .content ::slotted(calcite-panel){border-inline-start:none}:host([position=end]:not([slot=panel-start])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-flow),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-panel),:host([position=start][slot=panel-end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start][slot=panel-end]) .content ::slotted(calcite-flow),:host([position=start][slot=panel-end]) .content ::slotted(calcite-panel){border-inline-end:none}:host([layout=horizontal]) slot[name=action-bar]::slotted(calcite-action-bar){border-inline:0}:host([layout=horizontal][position=start]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=start]) .content ::slotted(calcite-panel){border-inline:0;border-block-start:0}:host([layout=horizontal][position=end]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=end]) .content ::slotted(calcite-panel){border-inline:0;border-block-end:0}:host([hidden]){display:none}[hidden]{display:none}`;
class R extends K {
  constructor() {
    super(...arguments), this.actionBars = [], this.contentHeightMax = null, this.contentHeightMin = null, this.contentWidthMax = null, this.contentWidthMin = null, this.initialClientX = null, this.initialClientY = null, this.initialContentHeight = null, this.initialContentWidth = null, this.separatorPointerDown = (e) => {
      if (!W(e))
        return;
      this.calciteInternalShellPanelResizeStart.emit(), e.preventDefault();
      const { separatorEl: t } = this;
      t && document.activeElement !== t && t.focus(), this.layout === "horizontal" ? (this.setInitialContentHeight(), this.initialClientY = e.clientY) : (this.setInitialContentWidth(), this.initialClientX = e.clientX), window.addEventListener("pointerup", this.separatorPointerUp), window.addEventListener("pointermove", this.separatorPointerMove);
    }, this.separatorPointerMove = (e) => {
      e.preventDefault();
      const { el: t, layout: i, initialContentWidth: n, initialContentHeight: x, position: a, initialClientX: w, initialClientY: d } = this, l = i === "horizontal" ? e.clientY - d : e.clientX - w, s = i === "vertical" && M(t) === "rtl" ? -1 : 1, m = a === "end" ? -s * l : s * l;
      i === "horizontal" ? this.setContentHeight(x + m) : this.setContentWidth(n + m);
    }, this.separatorPointerUp = (e) => {
      W(e) && (this.calciteInternalShellPanelResizeEnd.emit(), e.preventDefault(), window.removeEventListener("pointerup", this.separatorPointerUp), window.removeEventListener("pointermove", this.separatorPointerMove));
    }, this.step = 1, this.stepMultiplier = 10, this.contentHeight = null, this.contentWidth = null, this.hasHeader = !1, this.collapsed = !1, this.displayMode = "dock", this.layout = "vertical", this.messages = U(), this.position = "start", this.resizable = !1, this.widthScale = "m", this.calciteInternalShellPanelResizeEnd = S({ cancelable: !1 }), this.calciteInternalShellPanelResizeStart = S({ cancelable: !1 });
  }
  static {
    this.properties = { contentHeight: 16, contentWidth: 16, hasHeader: 16, collapsed: 7, displayMode: 3, heightScale: 3, layout: 3, messageOverrides: 0, position: 3, resizable: 7, height: 3, widthScale: 3, width: 3 };
  }
  static {
    this.styles = _;
  }
  // #endregion
  // #region Lifecycle
  willUpdate(e) {
    e.has("layout") && (this.hasUpdated || this.layout !== "vertical") && this.setActionBarsLayout(this.actionBars);
  }
  loaded() {
    this.updateAriaValues();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectSeparator();
  }
  // #endregion
  // #region Private Methods
  setContentWidth(e) {
    const { contentWidthMax: t, contentWidthMin: i } = this, n = Math.round(e);
    this.contentWidth = typeof t == "number" && typeof i == "number" ? A(n, i, t) : n;
  }
  updateAriaValues() {
    const { contentEl: e } = this, t = e && getComputedStyle(e);
    t && (this.layout === "horizontal" ? this.updateHeights(t) : this.updateWidths(t), this.requestUpdate());
  }
  setContentHeight(e) {
    const { contentHeightMax: t, contentHeightMin: i } = this, n = Math.round(e);
    this.contentHeight = typeof t == "number" && typeof i == "number" ? A(n, i, t) : n;
  }
  updateWidths(e) {
    const t = parseInt(e.getPropertyValue("max-width")), i = parseInt(e.getPropertyValue("min-width")), n = parseInt(e.getPropertyValue("width"));
    typeof n == "number" && !isNaN(n) && (this.initialContentWidth = n), typeof t == "number" && !isNaN(t) && (this.contentWidthMax = t), typeof i == "number" && !isNaN(i) && (this.contentWidthMin = i);
  }
  updateHeights(e) {
    const t = parseInt(e.getPropertyValue("max-height")), i = parseInt(e.getPropertyValue("min-height")), n = parseInt(e.getPropertyValue("height"));
    typeof n == "number" && !isNaN(n) && (this.initialContentHeight = n), typeof t == "number" && !isNaN(t) && (this.contentHeightMax = t), typeof i == "number" && !isNaN(i) && (this.contentHeightMin = i);
  }
  storeContentEl(e) {
    this.contentEl = e;
  }
  getKeyAdjustedSize(e) {
    const { key: t } = e, { el: i, step: n, stepMultiplier: x, layout: a, contentWidthMin: w, contentWidthMax: d, initialContentWidth: l, initialContentHeight: s, contentHeightMin: m, contentHeightMax: h, position: o } = this, c = n * x;
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      "PageUp",
      "PageDown"
    ].indexOf(t) > -1 && e.preventDefault();
    const k = M(i), r = ["ArrowLeft", "ArrowRight"], p = ["ArrowDown", "ArrowUp"], v = k === "rtl" && r.includes(t) ? -1 : 1;
    if (a === "horizontal" ? o === "end" ? t === p[1] || t === r[0] : t === p[0] || t === r[1] : t === p[1] || (o === "end" ? t === r[0] : t === r[1])) {
      const f = e.shiftKey ? c : n;
      return a === "horizontal" ? s + v * f : l + v * f;
    }
    if (a === "horizontal" ? o === "end" ? t === p[0] || t === r[0] : t === p[1] || t === r[1] : t === p[0] || (o === "end" ? t === r[1] : t === r[0])) {
      const f = e.shiftKey ? c : n;
      return a === "horizontal" ? s - v * f : l - v * f;
    }
    return t === "Home" && a === "horizontal" && typeof m == "number" ? m : t === "Home" && a === "vertical" && typeof w == "number" ? w : t === "End" && a === "horizontal" && typeof h == "number" ? h : t === "End" && a === "vertical" && typeof d == "number" ? d : t === "PageDown" ? a === "horizontal" ? s - c : l - c : t === "PageUp" ? a === "horizontal" ? s + c : l + c : null;
  }
  initialKeydownWidth(e) {
    this.setInitialContentWidth();
    const t = this.getKeyAdjustedSize(e);
    typeof t == "number" && this.setContentWidth(t);
  }
  initialKeydownHeight(e) {
    this.setInitialContentHeight();
    const t = this.getKeyAdjustedSize(e);
    typeof t == "number" && this.setContentHeight(t);
  }
  separatorKeyDown(e) {
    this.layout === "horizontal" ? this.initialKeydownHeight(e) : this.initialKeydownWidth(e);
  }
  setInitialContentHeight() {
    this.initialContentHeight = this.contentEl?.getBoundingClientRect().height;
  }
  setInitialContentWidth() {
    this.initialContentWidth = this.contentEl?.getBoundingClientRect().width;
  }
  connectSeparator(e) {
    this.disconnectSeparator(), this.separatorEl = e, e?.addEventListener("pointerdown", this.separatorPointerDown);
  }
  disconnectSeparator() {
    this.separatorEl?.removeEventListener("pointerdown", this.separatorPointerDown);
  }
  setActionBarsLayout(e) {
    e.forEach((t) => t.layout = this.layout);
  }
  handleActionBarSlotChange(e) {
    const t = L(e).filter((i) => i?.matches("calcite-action-bar"));
    this.actionBars = t, this.setActionBarsLayout(t);
  }
  handleHeaderSlotChange(e) {
    this.hasHeader = V(e);
  }
  // #endregion
  // #region Rendering
  renderHeader() {
    return z("header", y`<div class=${b(u.contentHeader)} .hidden=${!this.hasHeader}><slot name=${$.header} @slotchange=${this.handleHeaderSlotChange}></slot></div>`);
  }
  render() {
    const { collapsed: e, position: t, initialContentWidth: i, initialContentHeight: n, contentWidth: x, contentWidthMax: a, contentWidthMin: w, contentHeight: d, contentHeightMax: l, contentHeightMin: s, resizable: m, layout: h, displayMode: o } = this, c = M(this.el), C = o !== "float-content" && o !== "float" && m, k = C ? h === "horizontal" ? d ? { height: `${d}px` } : null : x ? { width: `${x}px` } : null : null, r = !e && C ? z("separator", y`<div .ariaLabel=${this.messages.resize} .ariaOrientation=${h === "horizontal" ? "vertical" : "horizontal"} .ariaValueMax=${h == "horizontal" ? l : a} .ariaValueMin=${h == "horizontal" ? s : w} .ariaValueNow=${h == "horizontal" ? d ?? n : x ?? i} class=${b(u.separator)} @keydown=${this.separatorKeyDown} role=separator tabindex=0 touch-action=none ${E(this.connectSeparator)}></div>`) : null, p = () => h === "horizontal" ? t === "start" ? g.calciteAnimateInDown : g.calciteAnimateInUp : c === "ltr" && t === "end" || c === "rtl" && t === "start" ? g.calciteAnimateInLeft : g.calciteAnimateInRight, v = z("content", y`<div class=${b({
      [g.rtl]: c === "rtl",
      [u.content]: !0,
      [u.contentOverlay]: o === "overlay",
      [u.floatContent]: o === "float-content" || o === "float",
      [g.calciteAnimate]: o === "overlay",
      [p()]: o === "overlay",
      [P("width", this.width, this.widthScale)]: !!(this.width || this.widthScale),
      [P("height", this.height, this.heightScale)]: !!(this.height || this.heightScale)
    })} .hidden=${e} style=${B(k)} ${E(this.storeContentEl)}>${this.renderHeader()}<div class=${b(u.contentBody)}><slot></slot></div>${r}</div>`), H = [z("action-bar", y`<slot name=${$.actionBar} @slotchange=${this.handleActionBarSlotChange}></slot>`), v];
    return t === "end" && H.reverse(), y`<div class=${b({ [u.container]: !0, [u.floatAll]: o === "float-all" })}>${H}</div>`;
  }
}
D("calcite-shell-panel", R);
export {
  R as ShellPanel
};
