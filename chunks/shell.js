import { d as g, L as f, x as t, s as i, h as w } from "./iframe.js";
import { i as n } from "./keyed.js";
import { s as l, d as r } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
const $ = g`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:absolute;inset:0;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing: 26vw}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;overflow:auto;justify-content:space-between}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0;border-width:0px;z-index:calc(var(--calcite-z-index) - 1);display:initial}.content--non-interactive{pointer-events:none;display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap}::slotted(calcite-shell-center-row){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal)}slot[name=panel-start]::slotted(calcite-shell-panel),slot[name=panel-end]::slotted(calcite-shell-panel){position:relative;z-index:calc(var(--calcite-z-index) + 1)}slot[name=panel-end]::slotted(calcite-shell-panel){margin-inline-start:auto}::slotted(calcite-panel),::slotted(calcite-flow){border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-3)}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-top]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-bottom]::slotted(calcite-shell-center-row:not([detached])){border-inline-start-width:1px;border-inline-end-width:1px;border-color:var(--calcite-color-border-3)}.center-content{display:flex;flex-direction:column;justify-content:space-between;block-size:100%;inline-size:100%;min-inline-size:0}.content-bottom{justify-content:flex-end}::slotted(calcite-shell-center-row){flex:none;align-self:stretch}::slotted(calcite-tip-manager){position:absolute;z-index:var(--calcite-z-index-toast);box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0,5px,0)}to{opacity:1;transform:translateZ(0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:.25rem;--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);inset-block-end:.5rem;inset-inline:var(--calcite-shell-tip-spacing)}slot[name=center-row]::slotted(calcite-shell-center-row),slot[name=panel-bottom]::slotted(calcite-shell-center-row){margin-block-start:auto}slot[name=panel-top]::slotted(calcite-shell-center-row){margin-block-end:auto}.position-wrapper{position:absolute;pointer-events:none;inset:0}slot[name=modals]::slotted(calcite-modal){position:absolute}:host([hidden]){display:none}[hidden]{display:none}`, s = {
  main: "main",
  content: "content",
  contentBehind: "content--behind",
  contentBottom: "content-bottom",
  contentNonInteractive: "content--non-interactive",
  footer: "footer",
  positionedSlotWrapper: "positioned-slot-wrapper",
  contentBehindCenterContent: "center-content"
}, a = {
  centerRow: "center-row",
  panelStart: "panel-start",
  panelEnd: "panel-end",
  panelTop: "panel-top",
  panelBottom: "panel-bottom",
  header: "header",
  footer: "footer",
  alerts: "alerts",
  sheets: "sheets",
  modals: "modals",
  dialogs: "dialogs"
};
class b extends f {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.hasAlerts = !1, this.hasDialogs = !1, this.hasFooter = !1, this.hasHeader = !1, this.hasModals = !1, this.hasOnlyPanelBottom = !1, this.hasPanelBottom = !1, this.hasPanelTop = !1, this.hasSheets = !1, this.panelIsResizing = !1, this.contentBehind = !1, this.listen("calciteInternalShellPanelResizeStart", this.handleCalciteInternalShellPanelResizeStart), this.listen("calciteInternalShellPanelResizeEnd", this.handleCalciteInternalShellPanelResizeEnd);
  }
  static {
    this.properties = { hasAlerts: 16, hasDialogs: 16, hasFooter: 16, hasHeader: 16, hasModals: 16, hasOnlyPanelBottom: 16, hasPanelBottom: 16, hasPanelTop: 16, hasSheets: 16, panelIsResizing: 16, contentBehind: 7 };
  }
  static {
    this.styles = $;
  }
  willUpdate(e) {
    (e.has("hasPanelTop") && (this.hasUpdated || this.hasPanelTop !== !1) || e.has("hasPanelBottom") && (this.hasUpdated || this.hasPanelBottom !== !1)) && (this.hasOnlyPanelBottom = !this.hasPanelTop && this.hasPanelBottom);
  }
  // #endregion
  // #region Private Methods
  handleCalciteInternalShellPanelResizeStart(e) {
    this.panelIsResizing = !0, e.stopPropagation();
  }
  handleCalciteInternalShellPanelResizeEnd(e) {
    this.panelIsResizing = !1, e.stopPropagation();
  }
  handleHeaderSlotChange(e) {
    this.hasHeader = !!l(e);
  }
  handleFooterSlotChange(e) {
    this.hasFooter = !!l(e);
  }
  handleAlertsSlotChange(e) {
    this.hasAlerts = !!l(e), r(e)?.map((o) => {
      o.tagName === "CALCITE-ALERT" && (o.embedded = !0);
    });
  }
  handleSheetsSlotChange(e) {
    this.hasSheets = !!l(e), r(e)?.map((o) => {
      o.tagName === "CALCITE-SHEET" && (o.embedded = !0);
    });
  }
  handleModalsSlotChange(e) {
    this.hasModals = !!l(e);
  }
  handlePanelTopChange(e) {
    this.hasPanelTop = l(e);
  }
  handlePanelBottomChange(e) {
    this.hasPanelBottom = l(e);
  }
  handleDialogsSlotChange(e) {
    this.hasDialogs = !!l(e), r(e)?.map((o) => {
      o.tagName === "CALCITE-DIALOG" && (o.embedded = !0);
    });
  }
  // #endregion
  // #region Rendering
  renderHeader() {
    return t`<div .hidden=${!this.hasHeader}>${n("header", t`<slot name=${a.header} @slotchange=${this.handleHeaderSlotChange}></slot>`)}</div>`;
  }
  renderFooter() {
    return n("footer", t`<div class=${i(s.footer)} .hidden=${!this.hasFooter}><slot name=${a.footer} @slotchange=${this.handleFooterSlotChange}></slot></div>`);
  }
  renderAlerts() {
    return t`<div .hidden=${!this.hasAlerts}>${n("alerts", t`<slot name=${a.alerts} @slotchange=${this.handleAlertsSlotChange}></slot>`)}</div>`;
  }
  renderSheets() {
    return t`<div .hidden=${!this.hasSheets}>${n("sheets", t`<slot name=${a.sheets} @slotchange=${this.handleSheetsSlotChange}></slot>`)}</div>`;
  }
  renderModals() {
    return t`<div .hidden=${!this.hasModals}>${n("modals", t`<slot name=${a.modals} @slotchange=${this.handleModalsSlotChange}></slot>`)}</div>`;
  }
  renderDialogs() {
    return t`<div .hidden=${!this.hasDialogs}>${n("dialogs", t`<slot name=${a.dialogs} @slotchange=${this.handleDialogsSlotChange}></slot>`)}</div>`;
  }
  renderContent() {
    const { panelIsResizing: e } = this, o = n("default-slot", t`<slot></slot>`), d = e ? t`<div class=${i(s.contentNonInteractive)}>${o}</div>` : o, h = n("center-row-slot", t`<slot name=${a.centerRow}></slot>`), c = n("panel-bottom-slot", t`<slot name=${a.panelBottom} @slotchange=${this.handlePanelBottomChange}></slot>`), p = n("panel-top-slot", t`<slot name=${a.panelTop} @slotchange=${this.handlePanelTopChange}></slot>`), m = "content-container";
    return this.contentBehind ? [
      n(m, t`<div class=${i({
        [s.content]: !0,
        [s.contentBehind]: !0
      })}>${d}</div>`),
      t`<div class=${i({
        [s.contentBehindCenterContent]: !0,
        [s.contentBottom]: this.hasOnlyPanelBottom
      })}>${p}${c}${h}</div>`
    ] : [
      n(m, t`<div class=${i({ [s.content]: !0, [s.contentBottom]: this.hasOnlyPanelBottom })}>${p}${d}${c}${h}</div>`)
    ];
  }
  renderMain() {
    return t`<div class=${i(s.main)}><slot name=${a.panelStart}></slot>${this.renderContent()}<slot name=${a.panelEnd}></slot></div>`;
  }
  renderPositionedSlots() {
    return t`<div class=${i(s.positionedSlotWrapper)}>${this.renderAlerts()}${this.renderModals()}${this.renderDialogs()}${this.renderSheets()}</div>`;
  }
  render() {
    return t`${this.renderHeader()}${this.renderMain()}${this.renderFooter()}${this.renderPositionedSlots()}`;
  }
}
w("calcite-shell", b);
export {
  b as Shell
};
