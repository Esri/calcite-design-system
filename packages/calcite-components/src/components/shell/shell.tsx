import { Component, Element, Fragment, h, Listen, Prop, State, VNode } from "@stencil/core";
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
 * @slot panel-top - A slot for adding the top `calcite-shell-center-row`.
 * @slot panel-bottom - A slot for adding the bottom `calcite-shell-center-row`.
 * @slot center-row - [Deprecated] Use the `"panel-bottom"` slot instead. A slot for adding the bottom `calcite-shell-center-row`.
 * @slot modals - A slot for adding `calcite-modal` components. When placed in this slot, the modal position will be constrained to the extent of the shell.
 * @slot alerts - A slot for adding `calcite-alert` components. When placed in this slot, the alert position will be constrained to the extent of the shell.
 * @slot sheets - A slot for adding `calcite-sheet` components. When placed in this slot, the sheet position will be constrained to the extent of the shell.
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

  @State() panelIsResizing = false;

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
        (el as HTMLCalciteAlertElement).slottedInShell = true;
      }
    });
  };

  handleSheetsSlotChange = (event: Event): void => {
    this.hasSheets = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.nodeName === "CALCITE-SHEET") {
        (el as HTMLCalciteSheetElement).slottedInShell = true;
      }
    });
  };

  handleModalsSlotChange = (event: Event): void => {
    this.hasModals = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.nodeName === "CALCITE-MODAL") {
        (el as HTMLCalciteModalElement).slottedInShell = true;
      }
    });
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
    const { panelIsResizing } = this;
    const defaultSlotNode: VNode = <slot key="default-slot" />;
    const defaultSlotContainerNode = panelIsResizing ? (
      <div class={CSS.contentNonInteractive}>{defaultSlotNode}</div>
    ) : (
      defaultSlotNode
    );
    const deprecatedCenterRowSlotNode: VNode = (
      <slot key="center-row-slot" name={SLOTS.centerRow} />
    );
    const panelBottomSlotNode: VNode = <slot key="panel-bottom-slot" name={SLOTS.panelBottom} />;
    const panelTopSlotNode: VNode = <slot key="panel-top-slot" name={SLOTS.panelTop} />;

    const contentContainerKey = "content-container";

    const content = !!this.contentBehind
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
          <div class={CSS.contentBehindCenterContent}>
            {panelTopSlotNode}
            {panelBottomSlotNode}
            {deprecatedCenterRowSlotNode}
          </div>,
        ]
      : [
          <div class={CSS.content} key={contentContainerKey}>
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
