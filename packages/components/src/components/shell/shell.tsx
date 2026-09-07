import { type PropertyValues } from "lit";
import { LitElement, property, Fragment, h, state, JsxNode, ToEvents } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import {
  getStylePixelValue,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import type { ShellPanel, ShellPanelSizingData } from "../shell-panel/shell-panel";
import { isAlert } from "../alert/resources";
import { isDialog } from "../dialog/resources";
import { isSheet } from "../sheet/resources";
import { isShellPanel } from "../shell-panel/resources";
import { styles } from "./shell.scss";
import { CSS, SLOTS } from "./resources";

type ShellPanelWithSizingProvider = ShellPanel["el"] & {
  shellSizingDataProvider?: (axis: "inline" | "block") => ShellPanelSizingData | null;
};

type Bounds = Pick<DOMRectReadOnly, "bottom" | "left" | "right" | "top">;

const panelSlots = ["panel-start", "panel-end", "panel-top", "panel-bottom"] as const;

type PanelSlot = (typeof panelSlots)[number];

declare global {
  interface DeclareElements {
    "calcite-shell": Shell;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's border color.
     */
    "--calcite-shell-border-color": "*";
    /**
     * Specifies the component's corner radius.
     */
    "--calcite-shell-corner-radius": "*";
    /**
     * Specifies the component's shadow.
     */
    "--calcite-shell-shadow": "*";
  }
}

interface ShellSlots {
  /**
   * A slot for adding custom content. This content will appear between any leading and trailing panels added to the component, such as a map.
   */
  "": Node[];
  /**
   * A slot for adding header content. This content will be positioned at the top of the component.
   */
  header: Node[];
  /**
   * A slot for adding footer content. This content will be positioned at the bottom of the component.
   */
  footer: Node[];
  /**
   * A slot for adding the starting `calcite-shell-panel`.
   */
  "panel-start": Node[];
  /**
   * A slot for adding the ending `calcite-shell-panel`.
   */
  "panel-end": Node[];
  /**
   * A slot for adding the top `calcite-shell-panel`.
   */
  "panel-top": Node[];
  /**
   * A slot for adding the bottom `calcite-shell-panel`.
   */
  "panel-bottom": Node[];
  /**
   * A slot for adding `calcite-dialog` components. When placed in this slot, the dialog position will be constrained to the extent of the `calcite-shell`.
   */
  dialogs: Node[];
  /**
   * A slot for adding `calcite-alert` components. When placed in this slot, the alert position will be constrained to the extent of the `calcite-shell`.
   */
  alerts: Node[];
  /**
   * A slot for adding `calcite-sheet` components. When placed in this slot, the sheet position will be constrained to the extent of the `calcite-shell`.
   */
  sheets: Node[];
}

export class Shell extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  override ["@slots"]!: ShellSlots;

  private defaultSlotRef = createRef<HTMLSlotElement>();

  private panelBottomSlotRef = createRef<HTMLSlotElement>();

  private panelEndSlotRef = createRef<HTMLSlotElement>();

  private panelStartSlotRef = createRef<HTMLSlotElement>();

  private panelTopSlotRef = createRef<HTMLSlotElement>();

  private panelSlotState: Record<PanelSlot, { elements: ShellPanel["el"][]; resizable: boolean }> =
    {
      "panel-start": { elements: [], resizable: false },
      "panel-end": { elements: [], resizable: false },
      "panel-top": { elements: [], resizable: false },
      "panel-bottom": { elements: [], resizable: false },
    };

  //#endregion

  //#region State Properties

  @state() hasAlerts = false;

  @state() hasDialogs = false;

  @state() hasFooter = false;

  @state() hasHeader = false;

  @state() hasActionBarPositionPanel = false;

  @state() hasOnlyPanelBottom = false;

  @state() hasPanelBottom = false;

  @state() hasPanelTop = false;

  @state() hasResizablePanelBottom = false;

  @state() hasResizablePanelTop = false;

  @state() hasSheets = false;

  @state() panelIsResizing = false;

  //#endregion

  //#region Public Properties

  /** When `true`, positions the center content behind any `calcite-shell-panel`s. */
  @property({ reflect: true }) contentBehind = false;

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen<ToEvents<ShellPanel>["calciteInternalShellPanelResizeStart"]>(
      "calciteInternalShellPanelResizeStart",
      this.handleCalciteInternalShellPanelResizeStart,
    );
    this.listen<ToEvents<ShellPanel>["calciteInternalShellPanelResizeEnd"]>(
      "calciteInternalShellPanelResizeEnd",
      this.handleCalciteInternalShellPanelResizeEnd,
    );
    this.listen<ToEvents<ShellPanel>["calciteInternalShellPanelResizableChange"]>(
      "calciteInternalShellPanelResizableChange",
      this.handleCalciteInternalShellPanelResizableChange,
    );
    this.listen<ToEvents<ShellPanel>["calciteInternalShellPanelActionBarPositionChange"]>(
      "calciteInternalShellPanelActionBarPositionChange",
      this.handleCalciteInternalShellPanelActionBarPositionChange,
    );
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("hasPanelTop") && (this.hasUpdated || this.hasPanelTop !== false)) ||
      (changes.has("hasPanelBottom") && (this.hasUpdated || this.hasPanelBottom !== false))
    ) {
      this.hasOnlyPanelBottom = !this.hasPanelTop && this.hasPanelBottom;
    }
  }

  //#endregion

  //#region Private Methods

  private handleCalciteInternalShellPanelResizableChange(event: CustomEvent<void>): void {
    const panel = event.composedPath().find(isShellPanel);

    if (panel?.slot && panelSlots.includes(panel.slot as PanelSlot)) {
      this.updateResizableSlotState(panel.slot as PanelSlot);
    }

    event.stopPropagation();
  }

  private handleCalciteInternalShellPanelActionBarPositionChange(event: CustomEvent<void>): void {
    const panel = event.composedPath().find(isShellPanel);

    if (panel?.slot && panelSlots.includes(panel.slot as PanelSlot)) {
      this.updateResizableSlotState(panel.slot as PanelSlot);
    }

    event.stopPropagation();
  }

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
    slotChangeGetAssignedElements(event)
      .filter(isAlert)
      .forEach((el) => {
        el.embedded = true;
      });
  }

  private handleSheetsSlotChange(event: Event): void {
    this.hasSheets = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)
      .filter(isSheet)
      .forEach((el) => {
        el.embedded = true;
      });
  }

  private configurePanels(
    panels: ShellPanel["el"][],
    layout: Extract<"horizontal" | "vertical", ShellPanel["layout"]>,
    position: Extract<"start" | "end", ShellPanel["position"]>,
  ): void {
    panels.forEach((panel) => {
      const sizingPanel = panel as ShellPanelWithSizingProvider;

      panel.layout = layout;
      panel.position = position;
      sizingPanel.shellSizingDataProvider = (axis) => this.getShellPanelSizingData(panel, axis);
    });
  }

  private getDefaultSlotMinSize(axis: "inline" | "block"): number {
    return (
      this.defaultSlotRef.value?.assignedElements({ flatten: true }).reduce((total, element) => {
        const computedStyle = window.getComputedStyle(element);

        return axis === "inline"
          ? total +
              getStylePixelValue(computedStyle.borderInlineStartWidth) +
              getStylePixelValue(computedStyle.borderInlineEndWidth)
          : total +
              getStylePixelValue(computedStyle.borderBlockStartWidth) +
              getStylePixelValue(computedStyle.borderBlockEndWidth);
      }, 0) ?? 0
    );
  }

  private getDefaultSlotBounds(): Bounds | null {
    const defaultSlotElements =
      this.defaultSlotRef.value?.assignedElements({ flatten: true }) ?? [];

    if (!defaultSlotElements.length) {
      return null;
    }

    return defaultSlotElements.reduce<Bounds | null>((bounds, element) => {
      const rect = element.getBoundingClientRect();

      return bounds
        ? {
            bottom: Math.max(bounds.bottom, rect.bottom),
            left: Math.min(bounds.left, rect.left),
            right: Math.max(bounds.right, rect.right),
            top: Math.min(bounds.top, rect.top),
          }
        : {
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            top: rect.top,
          };
    }, null);
  }

  private getShellPanelSizingData(
    panel: ShellPanel["el"],
    axis: "inline" | "block",
  ): ShellPanelSizingData | null {
    const panelLayoutContainer = panel.assignedSlot?.parentElement;

    if (!panelLayoutContainer) {
      return null;
    }

    const containerRect = panelLayoutContainer.getBoundingClientRect();
    const defaultSlotRect = this.getDefaultSlotBounds();

    if (!defaultSlotRect) {
      return {
        availableSize: axis === "inline" ? containerRect.width : containerRect.height,
      };
    }

    const defaultSlotMinSize = this.getDefaultSlotMinSize(axis);
    const isRTL = window.getComputedStyle(this).direction === "rtl";
    let availableOccupiedSize: number;

    if (axis === "inline") {
      const isStart = panel.position === "start";
      availableOccupiedSize = isRTL
        ? isStart
          ? containerRect.right - defaultSlotRect.left
          : defaultSlotRect.right - containerRect.left
        : isStart
          ? defaultSlotRect.right - containerRect.left
          : containerRect.right - defaultSlotRect.left;
    } else {
      availableOccupiedSize =
        panel.position === "start"
          ? defaultSlotRect.bottom - containerRect.top
          : containerRect.bottom - defaultSlotRect.top;
    }
    const availableSize = Math.max(
      Math.floor(availableOccupiedSize) - Math.ceil(defaultSlotMinSize),
      0,
    );

    return {
      availableSize,
    };
  }

  private handlePanelTopChange(event: Event): void {
    const panelElements = slotChangeGetAssignedElements(event).filter(isShellPanel);

    this.hasPanelTop = slotChangeHasAssignedElement(event);
    this.configurePanels(panelElements, "horizontal", "start");
    panelElements.forEach((el) => {
      el.layout = "horizontal";
      el.position = "start";
    });
    this.updateResizableSlotState("panel-top", panelElements);
  }

  private handlePanelBottomChange(event: Event): void {
    const panelElements = slotChangeGetAssignedElements(event).filter(isShellPanel);

    this.hasPanelBottom = slotChangeHasAssignedElement(event);
    this.configurePanels(panelElements, "horizontal", "end");
    panelElements.forEach((el) => {
      el.layout = "horizontal";
      el.position = "end";
    });
    this.updateResizableSlotState("panel-bottom", panelElements);
  }

  private handlePanelStartChange(event: Event): void {
    const panelElements = slotChangeGetAssignedElements(event).filter(isShellPanel);

    this.configurePanels(panelElements, "vertical", "start");
    panelElements.forEach((el) => {
      el.layout = "vertical";
      el.position = "start";
    });
    this.updateResizableSlotState("panel-start", panelElements);
  }

  private handlePanelEndChange(event: Event): void {
    const panelElements = slotChangeGetAssignedElements(event).filter(isShellPanel);

    this.configurePanels(panelElements, "vertical", "end");
    panelElements.forEach((el) => {
      el.layout = "vertical";
      el.position = "end";
    });
    this.updateResizableSlotState("panel-end", panelElements);
  }

  private handleDialogsSlotChange(event: Event): void {
    this.hasDialogs = !!slotChangeHasAssignedElement(event);
    slotChangeGetAssignedElements(event)
      .filter(isDialog)
      .forEach((el) => {
        el.embedded = true;
      });
  }

  private updateResizableSlotState(
    slot: PanelSlot,
    panelElements = this.panelSlotState[slot].elements,
  ): void {
    this.panelSlotState[slot] = {
      elements: panelElements,
      resizable: panelElements.some((panel) => panel.resizable),
    };
    this.syncResizableState();
    this.syncActionBarPositionPanelState();
  }

  private syncActionBarPositionPanelState(): void {
    this.hasActionBarPositionPanel = panelSlots.some((slot) =>
      this.panelSlotState[slot].elements.some((panel) => !!panel.actionBarPosition),
    );
  }

  private syncResizableState(): void {
    this.hasResizablePanelBottom = this.panelSlotState["panel-bottom"].resizable;
    this.hasResizablePanelTop = this.panelSlotState["panel-top"].resizable;
  }

  //#endregion

  //#region Rendering

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

  private renderDialogs(): JsxNode {
    return (
      <div hidden={!this.hasDialogs}>
        <slot key="dialogs" name={SLOTS.dialogs} onSlotChange={this.handleDialogsSlotChange} />
      </div>
    );
  }

  private renderContent(): JsxNode {
    const { panelIsResizing } = this;
    const defaultSlotNode: JsxNode = <slot key="default-slot" ref={this.defaultSlotRef} />;
    const defaultSlotContainerNode = panelIsResizing ? (
      <div class={CSS.contentNonInteractive}>{defaultSlotNode}</div>
    ) : (
      defaultSlotNode
    );
    const panelBottomSlotNode: JsxNode = (
      <slot
        key="panel-bottom-slot"
        name={SLOTS.panelBottom}
        onSlotChange={this.handlePanelBottomChange}
        ref={this.panelBottomSlotRef}
      />
    );
    const panelTopSlotNode: JsxNode = (
      <slot
        key="panel-top-slot"
        name={SLOTS.panelTop}
        onSlotChange={this.handlePanelTopChange}
        ref={this.panelTopSlotRef}
      />
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
          </div>,
        ];

    return content;
  }

  private renderMain(): JsxNode {
    return (
      <div
        class={{
          [CSS.main]: true,
          [CSS.hasActionBarPositionPanel]: this.hasActionBarPositionPanel,
          [CSS.hasResizablePanelBottom]: this.hasResizablePanelBottom,
          [CSS.hasResizablePanelTop]: this.hasResizablePanelTop,
        }}
      >
        <slot
          name={SLOTS.panelStart}
          onSlotChange={this.handlePanelStartChange}
          ref={this.panelStartSlotRef}
        />
        {this.renderContent()}
        <slot
          name={SLOTS.panelEnd}
          onSlotChange={this.handlePanelEndChange}
          ref={this.panelEndSlotRef}
        />
      </div>
    );
  }

  private renderPositionedSlots(): JsxNode {
    return (
      <div class={CSS.positionedSlotWrapper}>
        {this.renderAlerts()}
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

  //#endregion
}
