/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as $, L as w, b as l, s as h, f as z } from "./index.js";
import { i } from "./keyed.js";
import { e as f, n as m } from "./ref.js";
import { s as d, b as c, j as g } from "./dom.js";
import { i as x } from "./resources7.js";
import { b as P } from "./resources15.js";
import { i as C } from "./resources24.js";
import { i as u } from "./resources25.js";
const y = $`:host{box-sizing:border-box;background-color:var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1));color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:absolute;inset:0;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;border-radius:var(--calcite-shell-corner-radius);box-shadow:var(--calcite-shell-shadow)}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;overflow:auto;justify-content:space-between}.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0;border-width:0px;z-index:calc(var(--calcite-z-index) - 1);display:initial}.content--non-interactive{pointer-events:none;display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap}::slotted(calcite-shell-panel){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug);font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal))}slot[name=panel-start]::slotted(calcite-shell-panel),slot[name=panel-end]::slotted(calcite-shell-panel){position:relative;z-index:calc(var(--calcite-z-index) + 1)}slot[name=panel-end]::slotted(calcite-shell-panel){margin-inline-start:auto}::slotted(calcite-panel),::slotted(calcite-flow){border-width:var(--calcite-border-width-sm);border-color:var(--calcite-shell-border-color, var(--calcite-color-border-3));border-inline-start-width:var(--calcite-border-width-none);border-inline-end-width:var(--calcite-border-width-none);border-style:solid}slot[name=panel-top]::slotted(calcite-shell-panel:not([display-mode^=float])),slot[name=panel-bottom]::slotted(calcite-shell-panel:not([display-mode^=float])){border-color:var(--calcite-shell-border-color, var(--calcite-color-border-3));border-inline-start-width:var(--calcite-border-width-sm);border-inline-end-width:var(--calcite-border-width-sm)}.center-content{display:flex;flex-direction:column;justify-content:space-between;block-size:100%;inline-size:100%;min-inline-size:0}.content-bottom{justify-content:flex-end}::slotted(calcite-shell-panel){flex:none;align-self:stretch}::slotted(calcite-tip-manager){position:absolute;z-index:var(--calcite-z-index-toast);box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0,5px,0)}to{opacity:1;transform:translateZ(0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:.25rem;--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);inset-block-end:.5rem;inset-inline:var(--calcite-shell-tip-spacing, 26vw)}slot[name=panel-bottom]::slotted(calcite-shell-panel){margin-block-start:auto}slot[name=panel-top]::slotted(calcite-shell-panel){margin-block-end:auto}.position-wrapper{position:absolute;pointer-events:none;inset:0}:host([hidden]){display:none}[hidden]{display:none}`, s = {
  main: "main",
  content: "content",
  contentBehind: "content--behind",
  contentBottom: "content-bottom",
  contentNonInteractive: "content--non-interactive",
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
};
class B extends w {
  constructor() {
    super(), this.defaultSlotRef = f(), this.panelBottomSlotRef = f(), this.panelEndSlotRef = f(), this.panelStartSlotRef = f(), this.panelTopSlotRef = f(), this.hasAlerts = !1, this.hasDialogs = !1, this.hasFooter = !1, this.hasHeader = !1, this.hasOnlyPanelBottom = !1, this.hasPanelBottom = !1, this.hasPanelTop = !1, this.hasSheets = !1, this.panelIsResizing = !1, this.contentBehind = !1, this.listen("calciteInternalShellPanelResizeStart", this.handleCalciteInternalShellPanelResizeStart), this.listen("calciteInternalShellPanelResizeEnd", this.handleCalciteInternalShellPanelResizeEnd);
  }
  static {
    this.properties = { hasAlerts: 16, hasDialogs: 16, hasFooter: 16, hasHeader: 16, hasOnlyPanelBottom: 16, hasPanelBottom: 16, hasPanelTop: 16, hasSheets: 16, panelIsResizing: 16, contentBehind: 7 };
  }
  static {
    this.styles = y;
  }
  willUpdate(e) {
    (e.has("hasPanelTop") && (this.hasUpdated || this.hasPanelTop !== !1) || e.has("hasPanelBottom") && (this.hasUpdated || this.hasPanelBottom !== !1)) && (this.hasOnlyPanelBottom = !this.hasPanelTop && this.hasPanelBottom);
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
    this.hasAlerts = !!d(e), c(e).filter(x).forEach((t) => {
      t.embedded = !0;
    });
  }
  handleSheetsSlotChange(e) {
    this.hasSheets = !!d(e), c(e).filter(C).forEach((t) => {
      t.embedded = !0;
    });
  }
  configurePanels(e, t, o) {
    e.forEach((n) => {
      const a = n;
      n.layout = t, n.position = o, a.shellSizingDataProvider = (p) => this.getShellPanelSizingData(n, p);
    });
  }
  getDefaultSlotMinSize(e) {
    return this.defaultSlotRef.value?.assignedElements({ flatten: !0 }).reduce((t, o) => {
      const n = window.getComputedStyle(o);
      return e === "inline" ? t + g(n.borderInlineStartWidth) + g(n.borderInlineEndWidth) : t + g(n.borderBlockStartWidth) + g(n.borderBlockEndWidth);
    }, 0) ?? 0;
  }
  getDefaultSlotBounds() {
    const e = this.defaultSlotRef.value?.assignedElements({ flatten: !0 }) ?? [];
    return e.length ? e.reduce((t, o) => {
      const n = o.getBoundingClientRect();
      return t ? {
        bottom: Math.max(t.bottom, n.bottom),
        left: Math.min(t.left, n.left),
        right: Math.max(t.right, n.right),
        top: Math.min(t.top, n.top)
      } : {
        bottom: n.bottom,
        left: n.left,
        right: n.right,
        top: n.top
      };
    }, null) : null;
  }
  getShellPanelSizingData(e, t) {
    const o = e.assignedSlot?.parentElement;
    if (!o)
      return null;
    const n = o.getBoundingClientRect(), a = this.getDefaultSlotBounds();
    if (!a)
      return {
        availableSize: t === "inline" ? n.width : n.height
      };
    const p = this.getDefaultSlotMinSize(t), b = window.getComputedStyle(this).direction === "rtl";
    let S;
    if (t === "inline") {
      const v = e.position === "start";
      S = b ? v ? n.right - a.left : a.right - n.left : v ? a.right - n.left : n.right - a.left;
    } else
      S = e.position === "start" ? a.bottom - n.top : n.bottom - a.top;
    return {
      availableSize: Math.max(Math.floor(S) - Math.ceil(p), 0)
    };
  }
  handlePanelTopChange(e) {
    const t = c(e).filter(u);
    this.hasPanelTop = d(e), this.configurePanels(t, "horizontal", "start"), t.forEach((o) => {
      o.layout = "horizontal", o.position = "start";
    });
  }
  handlePanelBottomChange(e) {
    const t = c(e).filter(u);
    this.hasPanelBottom = d(e), this.configurePanels(t, "horizontal", "end"), t.forEach((o) => {
      o.layout = "horizontal", o.position = "end";
    });
  }
  handlePanelStartChange(e) {
    const t = c(e).filter(u);
    this.configurePanels(t, "vertical", "start"), t.forEach((o) => {
      o.layout = "vertical", o.position = "start";
    });
  }
  handlePanelEndChange(e) {
    const t = c(e).filter(u);
    this.configurePanels(t, "vertical", "end"), t.forEach((o) => {
      o.layout = "vertical", o.position = "end";
    });
  }
  handleDialogsSlotChange(e) {
    this.hasDialogs = !!d(e), c(e).filter(P).forEach((t) => {
      t.embedded = !0;
    });
  }
  renderHeader() {
    return l`<div .hidden=${!this.hasHeader}>${i("header", l`<slot name=${r.header} @slotchange=${this.handleHeaderSlotChange}></slot>`)}</div>`;
  }
  renderFooter() {
    return i("footer", l`<div class=${h(s.footer)} .hidden=${!this.hasFooter}><slot name=${r.footer} @slotchange=${this.handleFooterSlotChange}></slot></div>`);
  }
  renderAlerts() {
    return l`<div .hidden=${!this.hasAlerts}>${i("alerts", l`<slot name=${r.alerts} @slotchange=${this.handleAlertsSlotChange}></slot>`)}</div>`;
  }
  renderSheets() {
    return l`<div .hidden=${!this.hasSheets}>${i("sheets", l`<slot name=${r.sheets} @slotchange=${this.handleSheetsSlotChange}></slot>`)}</div>`;
  }
  renderDialogs() {
    return l`<div .hidden=${!this.hasDialogs}>${i("dialogs", l`<slot name=${r.dialogs} @slotchange=${this.handleDialogsSlotChange}></slot>`)}</div>`;
  }
  renderContent() {
    const { panelIsResizing: e } = this, t = i("default-slot", l`<slot ${m(this.defaultSlotRef)}></slot>`), o = e ? l`<div class=${h(s.contentNonInteractive)}>${t}</div>` : t, n = i("panel-bottom-slot", l`<slot name=${r.panelBottom} @slotchange=${this.handlePanelBottomChange} ${m(this.panelBottomSlotRef)}></slot>`), a = i("panel-top-slot", l`<slot name=${r.panelTop} @slotchange=${this.handlePanelTopChange} ${m(this.panelTopSlotRef)}></slot>`), p = "content-container";
    return this.contentBehind ? [
      i(p, l`<div class=${h({
        [s.content]: !0,
        [s.contentBehind]: !0
      })}>${o}</div>`),
      l`<div class=${h({
        [s.contentBehindCenterContent]: !0,
        [s.contentBottom]: this.hasOnlyPanelBottom
      })}>${a}${n}</div>`
    ] : [
      i(p, l`<div class=${h({ [s.content]: !0, [s.contentBottom]: this.hasOnlyPanelBottom })}>${a}${o}${n}</div>`)
    ];
  }
  renderMain() {
    return l`<div class=${h(s.main)}><slot name=${r.panelStart} @slotchange=${this.handlePanelStartChange} ${m(this.panelStartSlotRef)}></slot>${this.renderContent()}<slot name=${r.panelEnd} @slotchange=${this.handlePanelEndChange} ${m(this.panelEndSlotRef)}></slot></div>`;
  }
  renderPositionedSlots() {
    return l`<div class=${h(s.positionedSlotWrapper)}>${this.renderAlerts()}${this.renderDialogs()}${this.renderSheets()}</div>`;
  }
  render() {
    return l`${this.renderHeader()}${this.renderMain()}${this.renderFooter()}${this.renderPositionedSlots()}`;
  }
}
z("calcite-shell", B);
export {
  B as Shell
};
