/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as v, L as $, b as l, s as h, d as w } from "./index.js";
import { i as s } from "./keyed.js";
import { e as f, n as b } from "./ref.js";
import { s as d, b as c, h as S } from "./dom.js";
import { i as B } from "./resources7.js";
import { b as R } from "./resources15.js";
import { i as x } from "./resources24.js";
import { i as m } from "./resources25.js";
const C = v`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:absolute;inset:0;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;border-radius:var(--calcite-shell-corner-radius);box-shadow:var(--calcite-shell-shadow)}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;overflow:auto;justify-content:space-between}.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0;border-width:0px;z-index:calc(var(--calcite-z-index) - 1);display:initial}.content--non-interactive{pointer-events:none;display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap}::slotted(calcite-shell-panel){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug);font-weight:var(--calcite-font-weight-normal)}slot[name=panel-start]::slotted(calcite-shell-panel),slot[name=panel-end]::slotted(calcite-shell-panel){position:relative;z-index:calc(var(--calcite-z-index) + 1)}slot[name=panel-end]::slotted(calcite-shell-panel){margin-inline-start:auto}::slotted(calcite-panel),::slotted(calcite-flow){border-width:var(--calcite-border-width-sm);border-color:var(--calcite-shell-border-color, var(--calcite-color-border-3));border-inline-start-width:var(--calcite-border-width-none);border-inline-end-width:var(--calcite-border-width-none);border-style:solid}slot[name=panel-top]::slotted(calcite-shell-panel:not([display-mode^=float])),slot[name=panel-bottom]::slotted(calcite-shell-panel:not([display-mode^=float])){border-color:var(--calcite-shell-border-color, var(--calcite-color-border-3));border-inline-start-width:var(--calcite-border-width-sm);border-inline-end-width:var(--calcite-border-width-sm)}.center-content{display:flex;flex-direction:column;justify-content:space-between;block-size:100%;inline-size:100%;min-inline-size:0}.content-bottom{justify-content:flex-end}::slotted(calcite-shell-panel){flex:none;align-self:stretch}::slotted(calcite-tip-manager){position:absolute;z-index:var(--calcite-z-index-toast);box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0,5px,0)}to{opacity:1;transform:translateZ(0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:.25rem;--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);inset-block-end:.5rem;inset-inline:var(--calcite-shell-tip-spacing, 26vw)}slot[name=panel-bottom]::slotted(calcite-shell-panel){margin-block-start:auto}slot[name=panel-top]::slotted(calcite-shell-panel){margin-block-end:auto}.position-wrapper{position:absolute;pointer-events:none;inset:0}.main.has-resizable-panel-top ::slotted(calcite-panel){border-block-start:none}.main.has-resizable-panel-bottom ::slotted(calcite-panel){border-block-end:none}.main.has-action-bar-position-panel ::slotted(calcite-panel){border:0}:host([hidden]){display:none}[hidden]{display:none}`, o = {
  main: "main",
  content: "content",
  contentBehind: "content--behind",
  contentBottom: "content-bottom",
  contentNonInteractive: "content--non-interactive",
  hasActionBarPositionPanel: "has-action-bar-position-panel",
  hasResizablePanelBottom: "has-resizable-panel-bottom",
  hasResizablePanelTop: "has-resizable-panel-top",
  footer: "footer",
  positionedSlotWrapper: "positioned-slot-wrapper",
  contentBehindCenterContent: "center-content"
}, r = {
  panelStart: "panel-start",
  panelEnd: "panel-end",
  panelTop: "panel-top",
  panelBottom: "panel-bottom",
  header: "header",
  footer: "footer",
  alerts: "alerts",
  sheets: "sheets",
  dialogs: "dialogs"
}, u = ["panel-start", "panel-end", "panel-top", "panel-bottom"];
class y extends $ {
  constructor() {
    super(), this.defaultSlotRef = f(), this.panelBottomSlotRef = f(), this.panelEndSlotRef = f(), this.panelStartSlotRef = f(), this.panelTopSlotRef = f(), this.panelSlotState = {
      "panel-start": { elements: [], resizable: !1 },
      "panel-end": { elements: [], resizable: !1 },
      "panel-top": { elements: [], resizable: !1 },
      "panel-bottom": { elements: [], resizable: !1 }
    }, this.hasAlerts = !1, this.hasDialogs = !1, this.hasFooter = !1, this.hasHeader = !1, this.hasActionBarPositionPanel = !1, this.hasOnlyPanelBottom = !1, this.hasPanelBottom = !1, this.hasPanelTop = !1, this.hasResizablePanelBottom = !1, this.hasResizablePanelTop = !1, this.hasSheets = !1, this.panelIsResizing = !1, this.contentBehind = !1, this.listen("calciteInternalShellPanelResizeStart", this.handleCalciteInternalShellPanelResizeStart), this.listen("calciteInternalShellPanelResizeEnd", this.handleCalciteInternalShellPanelResizeEnd), this.listen("calciteInternalShellPanelResizableChange", this.handleCalciteInternalShellPanelResizableChange), this.listen("calciteInternalShellPanelActionBarPositionChange", this.handleCalciteInternalShellPanelActionBarPositionChange);
  }
  static {
    this.properties = { hasAlerts: 16, hasDialogs: 16, hasFooter: 16, hasHeader: 16, hasActionBarPositionPanel: 16, hasOnlyPanelBottom: 16, hasPanelBottom: 16, hasPanelTop: 16, hasResizablePanelBottom: 16, hasResizablePanelTop: 16, hasSheets: 16, panelIsResizing: 16, contentBehind: 7 };
  }
  static {
    this.styles = C;
  }
  willUpdate(e) {
    (e.has("hasPanelTop") && (this.hasUpdated || this.hasPanelTop !== !1) || e.has("hasPanelBottom") && (this.hasUpdated || this.hasPanelBottom !== !1)) && (this.hasOnlyPanelBottom = !this.hasPanelTop && this.hasPanelBottom);
  }
  handleCalciteInternalShellPanelResizableChange(e) {
    const t = e.composedPath().find(m);
    t?.slot && u.includes(t.slot) && this.updateResizableSlotState(t.slot), e.stopPropagation();
  }
  handleCalciteInternalShellPanelActionBarPositionChange(e) {
    const t = e.composedPath().find(m);
    t?.slot && u.includes(t.slot) && this.updateResizableSlotState(t.slot), e.stopPropagation();
  }
  handleCalciteInternalShellPanelResizeStart(e) {
    this.panelIsResizing = !0, e.stopPropagation();
  }
  handleCalciteInternalShellPanelResizeEnd(e) {
    this.panelIsResizing = !1, e.stopPropagation();
  }
  handleHeaderSlotChange(e) {
    this.hasHeader = !!d(e);
  }
  handleFooterSlotChange(e) {
    this.hasFooter = !!d(e);
  }
  handleAlertsSlotChange(e) {
    this.hasAlerts = !!d(e), c(e).filter(B).forEach((t) => {
      t.embedded = !0;
    });
  }
  handleSheetsSlotChange(e) {
    this.hasSheets = !!d(e), c(e).filter(x).forEach((t) => {
      t.embedded = !0;
    });
  }
  configurePanels(e, t, n) {
    e.forEach((a) => {
      const i = a;
      a.layout = t, a.position = n, i.shellSizingDataProvider = (p) => this.getShellPanelSizingData(a, p);
    });
  }
  getDefaultSlotMinSize(e) {
    return this.defaultSlotRef.value?.assignedElements({ flatten: !0 }).reduce((t, n) => {
      const a = window.getComputedStyle(n);
      return e === "inline" ? t + S(a.borderInlineStartWidth) + S(a.borderInlineEndWidth) : t + S(a.borderBlockStartWidth) + S(a.borderBlockEndWidth);
    }, 0) ?? 0;
  }
  getDefaultSlotBounds() {
    const e = this.defaultSlotRef.value?.assignedElements({ flatten: !0 }) ?? [];
    return e.length ? e.reduce((t, n) => {
      const a = n.getBoundingClientRect();
      return t ? {
        bottom: Math.max(t.bottom, a.bottom),
        left: Math.min(t.left, a.left),
        right: Math.max(t.right, a.right),
        top: Math.min(t.top, a.top)
      } : {
        bottom: a.bottom,
        left: a.left,
        right: a.right,
        top: a.top
      };
    }, null) : null;
  }
  getShellPanelSizingData(e, t) {
    const n = e.assignedSlot?.parentElement;
    if (!n)
      return null;
    const a = n.getBoundingClientRect(), i = this.getDefaultSlotBounds();
    if (!i)
      return {
        availableSize: t === "inline" ? a.width : a.height
      };
    const p = this.getDefaultSlotMinSize(t), z = window.getComputedStyle(this).direction === "rtl";
    let g;
    if (t === "inline") {
      const P = e.position === "start";
      g = z ? P ? a.right - i.left : i.right - a.left : P ? i.right - a.left : a.right - i.left;
    } else
      g = e.position === "start" ? i.bottom - a.top : a.bottom - i.top;
    return {
      availableSize: Math.max(Math.floor(g) - Math.ceil(p), 0)
    };
  }
  handlePanelTopChange(e) {
    const t = c(e).filter(m);
    this.hasPanelTop = d(e), this.configurePanels(t, "horizontal", "start"), t.forEach((n) => {
      n.layout = "horizontal", n.position = "start";
    }), this.updateResizableSlotState("panel-top", t);
  }
  handlePanelBottomChange(e) {
    const t = c(e).filter(m);
    this.hasPanelBottom = d(e), this.configurePanels(t, "horizontal", "end"), t.forEach((n) => {
      n.layout = "horizontal", n.position = "end";
    }), this.updateResizableSlotState("panel-bottom", t);
  }
  handlePanelStartChange(e) {
    const t = c(e).filter(m);
    this.configurePanels(t, "vertical", "start"), t.forEach((n) => {
      n.layout = "vertical", n.position = "start";
    }), this.updateResizableSlotState("panel-start", t);
  }
  handlePanelEndChange(e) {
    const t = c(e).filter(m);
    this.configurePanels(t, "vertical", "end"), t.forEach((n) => {
      n.layout = "vertical", n.position = "end";
    }), this.updateResizableSlotState("panel-end", t);
  }
  handleDialogsSlotChange(e) {
    this.hasDialogs = !!d(e), c(e).filter(R).forEach((t) => {
      t.embedded = !0;
    });
  }
  updateResizableSlotState(e, t = this.panelSlotState[e].elements) {
    this.panelSlotState[e] = {
      elements: t,
      resizable: t.some((n) => n.resizable)
    }, this.syncResizableState(), this.syncActionBarPositionPanelState();
  }
  syncActionBarPositionPanelState() {
    this.hasActionBarPositionPanel = u.some((e) => this.panelSlotState[e].elements.some((t) => !!t.actionBarPosition));
  }
  syncResizableState() {
    this.hasResizablePanelBottom = this.panelSlotState["panel-bottom"].resizable, this.hasResizablePanelTop = this.panelSlotState["panel-top"].resizable;
  }
  renderHeader() {
    return l`<div .hidden=${!this.hasHeader}>${s("header", l`<slot name=${r.header} @slotchange=${this.handleHeaderSlotChange}></slot>`)}</div>`;
  }
  renderFooter() {
    return s("footer", l`<div class=${h(o.footer)} .hidden=${!this.hasFooter}><slot name=${r.footer} @slotchange=${this.handleFooterSlotChange}></slot></div>`);
  }
  renderAlerts() {
    return l`<div .hidden=${!this.hasAlerts}>${s("alerts", l`<slot name=${r.alerts} @slotchange=${this.handleAlertsSlotChange}></slot>`)}</div>`;
  }
  renderSheets() {
    return l`<div .hidden=${!this.hasSheets}>${s("sheets", l`<slot name=${r.sheets} @slotchange=${this.handleSheetsSlotChange}></slot>`)}</div>`;
  }
  renderDialogs() {
    return l`<div .hidden=${!this.hasDialogs}>${s("dialogs", l`<slot name=${r.dialogs} @slotchange=${this.handleDialogsSlotChange}></slot>`)}</div>`;
  }
  renderContent() {
    const { panelIsResizing: e } = this, t = s("default-slot", l`<slot ${b(this.defaultSlotRef)}></slot>`), n = e ? l`<div class=${h(o.contentNonInteractive)}>${t}</div>` : t, a = s("panel-bottom-slot", l`<slot name=${r.panelBottom} @slotchange=${this.handlePanelBottomChange} ${b(this.panelBottomSlotRef)}></slot>`), i = s("panel-top-slot", l`<slot name=${r.panelTop} @slotchange=${this.handlePanelTopChange} ${b(this.panelTopSlotRef)}></slot>`), p = "content-container";
    return this.contentBehind ? [
      s(p, l`<div class=${h({
        [o.content]: !0,
        [o.contentBehind]: !0
      })}>${n}</div>`),
      l`<div class=${h({
        [o.contentBehindCenterContent]: !0,
        [o.contentBottom]: this.hasOnlyPanelBottom
      })}>${i}${a}</div>`
    ] : [
      s(p, l`<div class=${h({ [o.content]: !0, [o.contentBottom]: this.hasOnlyPanelBottom })}>${i}${n}${a}</div>`)
    ];
  }
  renderMain() {
    return l`<div class=${h({
      [o.main]: !0,
      [o.hasActionBarPositionPanel]: this.hasActionBarPositionPanel,
      [o.hasResizablePanelBottom]: this.hasResizablePanelBottom,
      [o.hasResizablePanelTop]: this.hasResizablePanelTop
    })}><slot name=${r.panelStart} @slotchange=${this.handlePanelStartChange} ${b(this.panelStartSlotRef)}></slot>${this.renderContent()}<slot name=${r.panelEnd} @slotchange=${this.handlePanelEndChange} ${b(this.panelEndSlotRef)}></slot></div>`;
  }
  renderPositionedSlots() {
    return l`<div class=${h(o.positionedSlotWrapper)}>${this.renderAlerts()}${this.renderDialogs()}${this.renderSheets()}</div>`;
  }
  render() {
    return l`${this.renderHeader()}${this.renderMain()}${this.renderFooter()}${this.renderPositionedSlots()}`;
  }
}
w("calcite-shell", y);
export {
  y as Shell
};
