import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { LocalizedComponent } from "../../utils/locale";
import { Scale, SelectionMode } from "../interfaces";
import { focusElementInGroup, FocusElementInGroupDestination } from "../../utils/dom";
import { RowType, TableRowFocusEvent } from "../table/interfaces";
import { isActivationKey } from "../../utils/key";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction,
} from "../../utils/interactive";
import { getIconScale } from "../../utils/component";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding `calcite-table-cell` or `calcite-table-header` elements.
 */

@Component({
  tag: "calcite-table-row",
  styleUrl: "table-row.scss",
  shadow: true,
})
export class TableRow implements InteractiveComponent, LocalizedComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** When `true`, the component is selected. */
  @Prop({ reflect: true }) selected = false;

  /** @internal */
  @Prop({ mutable: true }) cellCount: number;

  /** @internal */
  @Prop() lastVisibleRow: boolean;

  /** @internal */
  @Prop() rowType: RowType;

  /** @internal */
  @Prop() numbered = false;

  /** @internal */
  @Prop() positionSection: number;

  /** @internal */
  @Prop() positionSectionLocalized: string;

  /** @internal */
  @Prop() positionAll: number;

  /** @internal */
  @Prop() readCellContentsToAT: boolean;

  /** @internal */
  @Prop() scale: Scale;

  /** @internal */
  @Prop() selectionMode: Extract<"multiple" | "single" | "none", SelectionMode> = "none";

  /** @internal */
  @Prop() selectedRowCount: number;

  /** @internal */
  @Prop() selectedRowCountLocalized: string;

  /** @internal */
  @Prop() bodyRowCount: number;

  @Watch("bodyRowCount")
  @Watch("scale")
  @Watch("selected")
  @Watch("selectedRowCount")
  handleCellChanges(): void {
    if (this.tableRowEl && this.rowCells.length > 0) {
      this.updateCells();
    }
  }

  @Watch("numbered")
  @Watch("selectionMode")
  handleDelayedCellChanges(): void {
    if (this.tableRowEl && this.rowCells.length > 0) {
      requestAnimationFrame(() => this.updateCells());
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad(): void {
    if (this.tableRowEl && this.rowCells.length > 0) {
      this.updateCells();
    }
  }

  connectedCallback(): void {
    connectInteractive(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTableRowElement;

  private rowCells: (HTMLCalciteTableCellElement | HTMLCalciteTableHeaderElement)[] = [];

  private tableRowEl: HTMLTableRowElement;

  private tableRowSlotEl: HTMLSlotElement;

  @State() effectiveLocale = "";

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the selected state of the component changes.
   */
  @Event({ cancelable: false }) calciteTableRowSelect: EventEmitter<void>;

  /** @internal */
  @Event({ cancelable: false })
  calciteInternalTableRowFocusRequest: EventEmitter<TableRowFocusEvent>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalTableRowFocusChange", { target: "document" })
  calciteInternalTableRowFocusChangeHandler(event: CustomEvent): void {
    if ((event.target as Element).contains(this.el)) {
      const position = event.detail.cellPosition;
      const rowPosition = event.detail.rowPosition;
      const destination = event.detail.destination;
      const lastCell = event.detail.lastCell;

      if (rowPosition === this.positionAll) {
        if (this.disabled) {
          const deflectDirection =
            destination === "last" ? "previous" : destination === "first" ? "next" : destination;
          this.emitTableRowFocusRequest(position, this.positionAll, deflectDirection);
          return;
        }
        const cellPosition = lastCell
          ? this.rowCells[this.rowCells.length - 1]
          : this.rowCells?.find((_, index) => index + 1 === position);

        if (cellPosition) {
          cellPosition.setFocus();
        }
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private keyDownHandler(event: KeyboardEvent): void {
    const el = event.target as HTMLCalciteTableCellElement | HTMLCalciteTableHeaderElement;
    const key = event.key;
    const isControl = event.ctrlKey;
    const cells = this.rowCells;
    if (el.matches("calcite-table-cell") || el.matches("calcite-table-header")) {
      switch (key) {
        case "ArrowUp":
          this.emitTableRowFocusRequest(el.positionInRow, this.positionAll, "previous");
          event.preventDefault();
          break;
        case "ArrowDown":
          this.emitTableRowFocusRequest(el.positionInRow, this.positionAll, "next");
          event.preventDefault();
          break;
        case "PageUp":
          this.emitTableRowFocusRequest(el.positionInRow, this.positionAll, "first");
          event.preventDefault();
          break;
        case "PageDown":
          this.emitTableRowFocusRequest(el.positionInRow, this.positionAll, "last");
          event.preventDefault();
          break;
        case "ArrowLeft":
          focusElementInGroup(cells, el, "previous", false);
          event.preventDefault();
          break;
        case "ArrowRight":
          focusElementInGroup(cells, el, "next", false);
          event.preventDefault();
          break;
        case "Home":
          if (isControl) {
            this.emitTableRowFocusRequest(1, this.positionAll, "first");
            event.preventDefault();
          } else {
            focusElementInGroup(cells, el, "first", false);
            event.preventDefault();
          }
          break;
        case "End":
          if (isControl) {
            this.emitTableRowFocusRequest(this.rowCells?.length, this.positionAll, "last", true);
            event.preventDefault();
          } else {
            focusElementInGroup(cells, el, "last", false);
            event.preventDefault();
          }
          break;
      }
    }
  }

  private emitTableRowFocusRequest = (
    cellPosition: number,
    rowPosition: number,
    destination: FocusElementInGroupDestination,
    lastCell?: boolean
  ): void => {
    this.calciteInternalTableRowFocusRequest.emit({
      cellPosition,
      rowPosition,
      destination,
      lastCell,
    });
  };

  private updateCells = (): void => {
    const slottedCells = this.tableRowSlotEl
      ?.assignedElements({ flatten: true })
      ?.filter(
        (el: HTMLCalciteTableCellElement | HTMLCalciteTableHeaderElement) =>
          el.matches("calcite-table-cell") || el.matches("calcite-table-header")
      );

    const renderedCells = Array.from(
      this.tableRowEl?.querySelectorAll("calcite-table-header, calcite-table-cell")
    )?.filter(
      (el: HTMLCalciteTableCellElement | HTMLCalciteTableHeaderElement) =>
        el.numberCell || el.selectionCell
    );

    const cells = renderedCells ? renderedCells.concat(slottedCells) : slottedCells;

    if (cells.length > 0) {
      cells?.forEach((cell: HTMLCalciteTableCellElement | HTMLCalciteTableHeaderElement, index) => {
        cell.positionInRow = index + 1;
        cell.parentRowType = this.rowType;
        cell.scale = this.scale;
        cell.lastCell = index === cells.length - 1;

        if (cell.nodeName === "CALCITE-TABLE-CELL") {
          (cell as HTMLCalciteTableCellElement).readCellContentsToAT = this.readCellContentsToAT;
          (cell as HTMLCalciteTableCellElement).disabled = this.disabled;
          (cell as HTMLCalciteTableCellElement).parentRowIsSelected = this.selected;
        }
      });
    }

    this.rowCells =
      (cells as (HTMLCalciteTableCellElement | HTMLCalciteTableHeaderElement)[]) || [];
    this.cellCount = cells?.length;
  };

  private handleSelectionOfRow = (): void => {
    this.calciteTableRowSelect.emit();
  };

  private handleKeyboardSelection = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      if (event.key === " ") {
        event.preventDefault();
      }
      this.handleSelectionOfRow();
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderSelectionIcon(): VNode {
    const icon =
      this.selectionMode === "multiple" && this.selected
        ? "check-square-f"
        : this.selectionMode === "multiple"
        ? "square"
        : this.selected
        ? "circle-f"
        : "circle";

    return <calcite-icon icon={icon} scale={getIconScale(this.scale)} />;
  }

  renderSelectableCell(): VNode {
    return this.rowType === "head" ? (
      <calcite-table-header
        alignment="center"
        bodyRowCount={this.bodyRowCount}
        key="selection-head"
        onClick={this.selectionMode === "multiple" && this.handleSelectionOfRow}
        onKeyDown={this.selectionMode === "multiple" && this.handleKeyboardSelection}
        selectedRowCount={this.selectedRowCount}
        selectedRowCountLocalized={this.selectedRowCountLocalized}
        selectionCell={true}
        selectionMode={this.selectionMode}
      />
    ) : this.rowType === "body" ? (
      <calcite-table-cell
        alignment="center"
        key="selection-body"
        onClick={this.handleSelectionOfRow}
        onKeyDown={this.handleKeyboardSelection}
        parentRowIsSelected={this.selected}
        parentRowPositionLocalized={this.positionSectionLocalized}
        selectionCell={true}
      >
        {this.renderSelectionIcon()}
      </calcite-table-cell>
    ) : (
      <calcite-table-cell alignment="center" key="selection-foot" selectionCell={true} />
    );
  }

  renderNumberedCell(): VNode {
    return this.rowType === "head" ? (
      <calcite-table-header alignment="center" key="numbered-head" numberCell={true} />
    ) : this.rowType === "body" ? (
      <calcite-table-cell alignment="center" key="numbered-body" numberCell={true}>
        {this.positionSectionLocalized}
      </calcite-table-cell>
    ) : (
      <calcite-table-cell alignment="center" key="numbered-foot" numberCell={true} />
    );
  }

  render(): VNode {
    return (
      <Host>
        <tr
          aria-disabled={this.disabled}
          aria-rowindex={this.positionAll + 1}
          aria-selected={this.selected}
          class={{ [CSS.lastVisibleRow]: this.lastVisibleRow }}
          onKeyDown={(event) => this.keyDownHandler(event)}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(el) => (this.tableRowEl = el)}
        >
          {this.numbered && this.renderNumberedCell()}
          {this.selectionMode !== "none" && this.renderSelectableCell()}
          <slot
            onSlotchange={this.updateCells}
            ref={(el) => (this.tableRowSlotEl = el as HTMLSlotElement)}
          />
        </tr>
      </Host>
    );
  }
}
