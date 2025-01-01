// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, Fragment, h, state, JsxNode } from "@arcgis/lumina";
import { slotChangeGetAssignedElements, slotChangeHasAssignedElement } from "../../utils/dom";
import type { Dialog } from "../dialog/dialog";
import type { Sheet } from "../sheet/sheet";
import type { Alert } from "../alert/alert";
import { styles } from "./shell.scss";
import { CSS, SLOTS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-shell": Shell;
  }
}

/**
 * @slot - A slot for adding custom content. This content will appear between any leading and trailing panels added to the component, such as a map.
 * @slot header - A slot for adding header content. This content will be positioned at the top of the component.
 * @slot footer - A slot for adding footer content. This content will be positioned at the bottom of the component.
 * @slot panel-start - A slot for adding the starting `calcite-shell-panel`.
 * @slot panel-end - A slot for adding the ending `calcite-shell-panel`.
 * @slot panel-top - A slot for adding the top `calcite-shell-panel`.
 * @slot panel-bottom - A slot for adding the bottom `calcite-shell-panel`.
 * @slot center-row - [Deprecated] Use the `"panel-bottom"` slot instead. A slot for adding the bottom `calcite-shell-center-row`.
 * @slot modals - A slot for adding `calcite-modal` components. When placed in this slot, the modal position will be constrained to the extent of the `calcite-shell`.
 * @slot dialogs - A slot for adding `calcite-dialog` components. When placed in this slot, the dialog position will be constrained to the extent of the `calcite-shell`.
 * @slot alerts - A slot for adding `calcite-alert` components. When placed in this slot, the alert position will be constrained to the extent of the `calcite-shell`.
 * @slot sheets - A slot for adding `calcite-sheet` components. When placed in this slot, the sheet position will be constrained to the extent of the `calcite-shell`.
 */
export class Shell extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region State Properties

  @state() hasAlerts = false;

  @state() hasDialogs = false;

  @state() hasFooter = false;

  @state() hasHeader = false;

  @state() hasModals = false;

  @state() hasOnlyPanelBottom = false;

  @state() hasPanelBottom = false;

  @state() hasPanelTop = false;

  @state() hasSheets = false;

  @state() panelIsResizing = false;

  // #endregion

  // #region Public Properties

  /** Positions the center content behind any `calcite-shell-panel`s. */
  @property({ reflect: true }) contentBehind = false;

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen(
      "calciteInternalShellPanelResizeStart",
      this.handleCalciteInternalShellPanelResizeStart,
    );
    this.listen(
      "calciteInternalShellPanelResizeEnd",
      this.handleCalciteInternalShellPanelResizeEnd,
    );
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("hasPanelTop") && (this.hasUpdated || this.hasPanelTop !== false)) ||
      (changes.has("hasPanelBottom") && (this.hasUpdated || this.hasPanelBottom !== false))
    ) {
      this.hasOnlyPanelBottom = !this.hasPanelTop && this.hasPanelBottom;
    }
  }

  // #endregion

  // #region Private Methods

  private handleCalciteInternalShellPanelResizeStart(event: CustomEvent<void>): void {
    this.panelIsResizing = true;
    event.stopPropagation();
  }

  private handleCalciteInternalShellPanelResizeEnd(event: CustomEvent<void>): void {
    this.panelIsResizing = false;
    event.stopPropagation();
  }

  private handleHeaderSlotChange(event: Event): void {
    this.hasHeader = !!slotChangeHasAssignedElement(event);
  }

  private handleFooterSlotChange(event: Event): void {
    this.hasFooter = !!slotChangeHasAssignedElement(event);
  }

  private handleAlertsSlotChange(event: Event): void {
    this.hasAlerts = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.tagName === "CALCITE-ALERT") {
        (el as Alert["el"]).embedded = true;
      }
    });
  }

  private handleSheetsSlotChange(event: Event): void {
    this.hasSheets = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.tagName === "CALCITE-SHEET") {
        (el as Sheet["el"]).embedded = true;
      }
    });
  }

  private handleModalsSlotChange(event: Event): void {
    this.hasModals = !!slotChangeHasAssignedElement(event);
  }

  private handlePanelTopChange(event: Event): void {
    this.hasPanelTop = slotChangeHasAssignedElement(event);
  }

  private handlePanelBottomChange(event: Event): void {
    this.hasPanelBottom = slotChangeHasAssignedElement(event);
  }

  private handleDialogsSlotChange(event: Event): void {
    this.hasDialogs = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.tagName === "CALCITE-DIALOG") {
        (el as Dialog["el"]).embedded = true;
      }
    });
  }

  // #endregion

  // #region Rendering

  private renderHeader(): JsxNode {
    return (
      <div hidden={!this.hasHeader}>
        <slot key="header" name={SLOTS.header} onSlotChange={this.handleHeaderSlotChange} />
      </div>
    );
  }

  private renderFooter(): JsxNode {
    return (
      <div class={CSS.footer} hidden={!this.hasFooter} key="footer">
        <slot name={SLOTS.footer} onSlotChange={this.handleFooterSlotChange} />
      </div>
    );
  }

  private renderAlerts(): JsxNode {
    return (
      <div hidden={!this.hasAlerts}>
        <slot key="alerts" name={SLOTS.alerts} onSlotChange={this.handleAlertsSlotChange} />
      </div>
    );
  }

  private renderSheets(): JsxNode {
    return (
      <div hidden={!this.hasSheets}>
        <slot key="sheets" name={SLOTS.sheets} onSlotChange={this.handleSheetsSlotChange} />
      </div>
    );
  }

  private renderModals(): JsxNode {
    return (
      <div hidden={!this.hasModals}>
        <slot key="modals" name={SLOTS.modals} onSlotChange={this.handleModalsSlotChange} />
      </div>
    );
  }

  private renderDialogs(): JsxNode {
    return (
      <div hidden={!this.hasDialogs}>
        <slot key="dialogs" name={SLOTS.dialogs} onSlotChange={this.handleDialogsSlotChange} />
      </div>
    );
  }

  private renderContent(): JsxNode {
    const { panelIsResizing } = this;
    const defaultSlotNode: JsxNode = <slot key="default-slot" />;
    const defaultSlotContainerNode = panelIsResizing ? (
      <div class={CSS.contentNonInteractive}>{defaultSlotNode}</div>
    ) : (
      defaultSlotNode
    );
    const deprecatedCenterRowSlotNode: JsxNode = (
      <slot key="center-row-slot" name={SLOTS.centerRow} />
    );
    const panelBottomSlotNode: JsxNode = (
      <slot
        key="panel-bottom-slot"
        name={SLOTS.panelBottom}
        onSlotChange={this.handlePanelBottomChange}
      />
    );
    const panelTopSlotNode: JsxNode = (
      <slot key="panel-top-slot" name={SLOTS.panelTop} onSlotChange={this.handlePanelTopChange} />
    );

    const contentContainerKey = "content-container";

    const content = this.contentBehind
      ? [
          <div
            class={{
              [CSS.content]: true,
              [CSS.contentBehind]: true,
            }}
            key={contentContainerKey}
          >
            {defaultSlotContainerNode}
          </div>,
          <div
            class={{
              [CSS.contentBehindCenterContent]: true,
              [CSS.contentBottom]: this.hasOnlyPanelBottom,
            }}
          >
            {panelTopSlotNode}
            {panelBottomSlotNode}
            {deprecatedCenterRowSlotNode}
          </div>,
        ]
      : [
          <div
            class={{ [CSS.content]: true, [CSS.contentBottom]: this.hasOnlyPanelBottom }}
            key={contentContainerKey}
          >
            {panelTopSlotNode}
            {defaultSlotContainerNode}
            {panelBottomSlotNode}
            {deprecatedCenterRowSlotNode}
          </div>,
        ];

    return content;
  }

  private renderMain(): JsxNode {
    return (
      <div class={CSS.main}>
        <slot name={SLOTS.panelStart} />
        {this.renderContent()}
        <slot name={SLOTS.panelEnd} />
      </div>
    );
  }

  private renderPositionedSlots(): JsxNode {
    return (
      <div class={CSS.positionedSlotWrapper}>
        {this.renderAlerts()}
        {this.renderModals()}
        {this.renderDialogs()}
        {this.renderSheets()}
      </div>
    );
  }

  override render(): JsxNode {
    return (
      <>
        {this.renderHeader()}
        {this.renderMain()}
        {this.renderFooter()}
        {this.renderPositionedSlots()}
      </>
    );
  }

  // #endregion
}
