import { Component, Element, Fragment, h, Listen, Prop, State, VNode, Watch } from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { slotChangeGetAssignedElements, slotChangeHasAssignedElement } from "../../utils/dom";
import { CSS, SLOTS } from "./resources";

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
 * @slot alerts - A slot for adding `calcite-alert` components. When placed in this slot, the alert position will be constrained to the extent of the `calcite-shell`.
 * @slot sheets - A slot for adding `calcite-sheet` components. When placed in this slot, the sheet position will be constrained to the extent of the `calcite-shell`.
 */

@Component({
  tag: "calcite-shell",
  styleUrl: "shell.scss",
  shadow: true,
})
export class Shell implements ConditionalSlotComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Positions the center content behind any `calcite-shell-panel`s.
   */
  @Prop({ reflect: true }) contentBehind = false;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalShellPanelResizeStart")
  handleCalciteInternalShellPanelResizeStart(event: CustomEvent<void>): void {
    this.panelIsResizing = true;
    event.stopPropagation();
  }

  @Listen("calciteInternalShellPanelResizeEnd")
  handleCalciteInternalShellPanelResizeEnd(event: CustomEvent<void>): void {
    this.panelIsResizing = false;
    event.stopPropagation();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteShellElement;

  @State() hasHeader = false;

  @State() hasFooter = false;

  @State() hasAlerts = false;

  @State() hasModals = false;

  @State() hasSheets = false;

  @State() hasPanelTop = false;

  @State() hasPanelBottom = false;

  @State() hasOnlyPanelBottom = false;

  @State() panelIsResizing = false;

  @Watch("hasPanelTop")
  @Watch("hasPanelBottom")
  updateHasOnlyPanelBottom(): void {
    this.hasOnlyPanelBottom = !this.hasPanelTop && this.hasPanelBottom;
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleHeaderSlotChange = (event: Event): void => {
    this.hasHeader = !!slotChangeHasAssignedElement(event);
  };

  handleFooterSlotChange = (event: Event): void => {
    this.hasFooter = !!slotChangeHasAssignedElement(event);
  };

  handleAlertsSlotChange = (event: Event): void => {
    this.hasAlerts = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.nodeName === "CALCITE-ALERT") {
        (el as HTMLCalciteAlertElement).embedded = true;
      }
    });
  };

  handleSheetsSlotChange = (event: Event): void => {
    this.hasSheets = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.nodeName === "CALCITE-SHEET") {
        (el as HTMLCalciteSheetElement).embedded = true;
      }
    });
  };

  handleModalsSlotChange = (event: Event): void => {
    this.hasModals = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.nodeName === "CALCITE-MODAL") {
        (el as HTMLCalciteModalElement).embedded = true;
      }
    });
  };

  handlePanelTopChange = (event: Event): void => {
    this.hasPanelTop = slotChangeHasAssignedElement(event);
  };

  handlePanelBottomChange = (event: Event): void => {
    this.hasPanelBottom = slotChangeHasAssignedElement(event);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderHeader(): VNode {
    return (
      <div hidden={!this.hasHeader}>
        <slot key="header" name={SLOTS.header} onSlotchange={this.handleHeaderSlotChange} />
      </div>
    );
  }

  renderFooter(): VNode {
    return (
      <div class={CSS.footer} hidden={!this.hasFooter} key="footer">
        <slot name={SLOTS.footer} onSlotchange={this.handleFooterSlotChange} />
      </div>
    );
  }

  renderAlerts(): VNode {
    return (
      <div hidden={!this.hasAlerts}>
        <slot key="alerts" name={SLOTS.alerts} onSlotchange={this.handleAlertsSlotChange} />
      </div>
    );
  }

  renderSheets(): VNode {
    return (
      <div hidden={!this.hasSheets}>
        <slot key="sheets" name={SLOTS.sheets} onSlotchange={this.handleSheetsSlotChange} />
      </div>
    );
  }

  renderModals(): VNode {
    return (
      <div hidden={!this.hasModals}>
        <slot key="modals" name={SLOTS.modals} onSlotchange={this.handleModalsSlotChange} />
      </div>
    );
  }

  renderContent(): VNode[] {
    const defaultSlotContainerNode = (
      <div class={{ [CSS.contentNonInteractive]: this.panelIsResizing }}>
        <slot key="default-slot" />
      </div>
    );

    const deprecatedCenterRowSlotNode: VNode = (
      <slot key="center-row-slot" name={SLOTS.centerRow} />
    );
    const panelBottomSlotNode: VNode = (
      <slot
        key="panel-bottom-slot"
        name={SLOTS.panelBottom}
        onSlotchange={this.handlePanelBottomChange}
      />
    );
    const panelTopSlotNode: VNode = (
      <slot key="panel-top-slot" name={SLOTS.panelTop} onSlotchange={this.handlePanelTopChange} />
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

  renderMain(): VNode {
    return (
      <div class={CSS.main}>
        <slot name={SLOTS.panelStart} />
        {this.renderContent()}
        <slot name={SLOTS.panelEnd} />
      </div>
    );
  }

  renderPositionedSlots(): VNode {
    return (
      <div class={CSS.positionedSlotWrapper}>
        {this.renderAlerts()}
        {this.renderModals()}
        {this.renderSheets()}
      </div>
    );
  }

  render(): VNode {
    return (
      <Fragment>
        {this.renderHeader()}
        {this.renderMain()}
        {this.renderFooter()}
        {this.renderPositionedSlots()}
      </Fragment>
    );
  }
}
