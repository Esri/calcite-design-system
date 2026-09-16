import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode, Fragment } from "@arcgis/lumina";
import { render } from "lit";
import { createRef } from "lit/directives/ref.js";
import { Alignment, Scale, SelectionMode } from "../types";
import {
  focusElementInGroup,
  FocusElementInGroupDestination,
  getSlotAssignedElements,
} from "../../utils/dom";
import { RowType, TableInteractionMode, TableRowFocusEvent } from "../table/types";
import { isActivationKey } from "../../utils/key";
import { getIconScale } from "../../utils/component";
import type { TableHeader } from "../table-header/table-header";
import { isTableHeader } from "../table-header/resources";
import type { TableCell } from "../table-cell/table-cell";
import { isTableCell } from "../table-cell/resources";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS, ICONS } from "./resources";
import { styles } from "./table-row.scss";

declare global {
  interface DeclareElements {
    "calcite-table-row": TableRow;
  }
}

/** @slot - A slot for adding `calcite-table-cell` or `calcite-table-header` elements. */
export class TableRow extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private numberedCellRef = createRef<TableCell["el"]>();

  private numberedHeaderRef = createRef<TableHeader["el"]>();

  private rowCells: (TableCell["el"] | TableHeader["el"])[] = [];

  private rowSlotRef = createRef<HTMLSlotElement>();

  private selectionCellRef = createRef<TableCell["el"]>();

  private selectionHeaderRef = createRef<TableHeader["el"]>();

  private userTriggered = false;

  private _selected = false;

  private clickHandler = (): void => {
    this.handleRowSelection();
  };

  private handleKeyboardSelection = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      if (event.key === " ") {
        event.preventDefault();
      }
      this.handleRowSelection();
    }
  };

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /**
   * Specifies the vertical alignment of content within child `calcite-table-cell`s.
   *
   * - `"start"` positions content at the top of a `calcite-table-cell`.
   * - `"center"` positions content in the middle of a `calcite-table-cell`.
   * - `"end"` positions content at the bottom of a `calcite-table-cell`.
   */
  @property({ reflect: true }) alignment!: Alignment;

  /**
   * When `true`, the item will be hidden
   *
   * @private
   *  */
  @property({ reflect: true }) itemHidden = false;

  /** @private */
  @property() bodyRowCount!: number;

  /** @private */
  @property() cellCount!: number;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** @private */
  @property() interactionMode: TableInteractionMode = "interactive";

  /** @private */
  @property() lastVisibleRow = false;

  /** @private */
  @property() numbered = false;

  /** @private */
  @property() positionAll!: number;

  /** @private */
  @property() positionSection!: number;

  /** @private */
  @property() positionSectionLocalized!: string;

  /** @private */
  @property() readCellContentsToAT!: boolean;

  /** @private */
  @property() rowType!: RowType;

  /** @private */
  @property() scale!: Scale;

  /** @private */
  @property() stickyHeaderEnabled = false;

  /** When `true`, the component is selected. */
  @property({ reflect: true })
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    const oldValue = this._selected;
    if (value !== oldValue) {
      this._selected = value;
      this.handleCellChanges();
    }
  }

  /** @private */
  @property() selectedRowCount!: number;

  /** @private */
  @property() selectedRowCountLocalized!: string;

  /** @private */
  @property() selectionMode: Extract<"multiple" | "single" | "none", SelectionMode> = "none";

  //#endregion

  //#region Events

  /** @private */
  calciteInternalTableRowFocusRequest = createEvent<TableRowFocusEvent>({ cancelable: false });

  /** @private */
  calciteInternalTableRowSelect = createEvent({ cancelable: false });

  /** Fires when the selected state of the component changes. */
  calciteTableRowSelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listenOn<CustomEvent>(
      document,
      "calciteInternalTableRowFocusChange",
      this.calciteInternalTableRowFocusChangeHandler,
    );
  }

  load(): void {
    this.listenOn(this.el.shadowRoot, "slotchange", this.handleSlotChange);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      changes.has("bodyRowCount") ||
      changes.has("scale") ||
      changes.has("selectedRowCount") ||
      (changes.has("interactionMode") &&
        (this.hasUpdated || this.interactionMode !== "interactive"))
    ) {
      this.handleCellChanges();
    }

    if (
      (changes.has("numbered") && (this.hasUpdated || this.numbered !== false)) ||
      (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none"))
    ) {
      this.handleDelayedCellChanges();
    }

    if (
      changes.has("selected") &&
      (this.hasUpdated || this.selected !== false) &&
      !this.userTriggered
    ) {
      this.calciteInternalTableRowSelect.emit();
    }
  }

  loaded(): void {
    if (this.rowCells.length > 0) {
      this.updateCells();
    }
  }

  //#endregion

  //#region Private Methods

  private handleSlotChange(): void {
    this.updateCells();
  }

  private handleCellChanges(): void {
    if (this.rowCells.length > 0) {
      this.updateCells();
    }
  }

  private handleDelayedCellChanges(): void {
    if (this.rowCells.length > 0) {
      requestAnimationFrame(() => this.updateCells());
    }
  }

  private calciteInternalTableRowFocusChangeHandler(event: CustomEvent): void {
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

  private keyDownHandler(event: KeyboardEvent): void {
    if (this.interactionMode !== "interactive") {
      return;
    }
    const el = event.target;
    const key = event.key;
    const isControl = event.ctrlKey;
    const cells = this.rowCells;
    if (isTableCell(el) || isTableHeader(el)) {
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
          focusElementInGroup(cells, el, "previous", false, false);
          event.preventDefault();
          break;
        case "ArrowRight":
          focusElementInGroup(cells, el, "next", false, false);
          event.preventDefault();
          break;
        case "Home":
          if (isControl) {
            this.emitTableRowFocusRequest(1, this.positionAll, "first");
            event.preventDefault();
          } else {
            focusElementInGroup(cells, el, "first", false, false);
            event.preventDefault();
          }
          break;
        case "End":
          if (isControl) {
            this.emitTableRowFocusRequest(this.rowCells?.length, this.positionAll, "last", true);
            event.preventDefault();
          } else {
            focusElementInGroup(cells, el, "last", false, false);
            event.preventDefault();
          }
          break;
      }
    }
  }

  private emitTableRowFocusRequest(
    cellPosition: number,
    rowPosition: number,
    destination: FocusElementInGroupDestination,
    lastCell = false,
  ): void {
    this.calciteInternalTableRowFocusRequest.emit({
      cellPosition,
      rowPosition,
      destination,
      lastCell: lastCell,
    });
  }

  private updateCells(): void {
    const alignment = this.alignment
      ? this.alignment
      : this.rowType !== "head"
        ? "center"
        : "start";
    const slottedCells = this.rowSlotRef.value
      ? getSlotAssignedElements<TableCell["el"] | TableHeader["el"]>(
          this.rowSlotRef.value,
          "calcite-table-cell, calcite-table-header",
        )
      : [];
    const renderedCells = [
      this.numberedCellRef.value,
      this.numberedHeaderRef.value,
      this.selectionCellRef.value,
      this.selectionHeaderRef.value,
    ].filter((cell) => cell != null);
    const cells = renderedCells.concat(slottedCells);

    if (cells.length > 0) {
      cells?.forEach((cell, index) => {
        cell.interactionMode = this.interactionMode;
        cell.lastCell = index === cells.length - 1;
        cell.parentRowAlignment = alignment;
        cell.parentRowIsSelected = this.selected;
        cell.parentRowType = this.rowType;
        cell.positionInRow = index + 1;
        cell.scale = this.scale;

        if (cell.nodeName === "CALCITE-TABLE-CELL") {
          const rowSpan = cell.rowSpan || 1;
          const reachesBodyEnd =
            this.rowType === "body" &&
            rowSpan > 1 &&
            this.positionSection + rowSpan >= this.bodyRowCount;

          (cell as TableCell["el"]).readCellContentsToAT = this.readCellContentsToAT;
          (cell as TableCell["el"]).disabled = this.disabled;
          (cell as TableCell["el"]).reachesBodyEnd = reachesBodyEnd;
        }
      });
    }

    this.rowCells = cells || [];
    this.cellCount = cells?.length;
  }

  private async handleRowSelection(): Promise<void> {
    if (this.rowType === "body" || (this.rowType === "head" && this.selectionMode === "multiple")) {
      this.userTriggered = true;
      this.selected = !this.selected;
      await this.updateComplete;
      this.calciteTableRowSelect.emit();
    }
  }

  //#endregion

  //#region Rendering

  renderSelectionIcon(): JsxNode {
    const icon =
      this.selectionMode === "multiple" && this.selected
        ? ICONS.checkSquare
        : this.selectionMode === "multiple"
          ? ICONS.square
          : this.selected
            ? ICONS.circleF
            : ICONS.circle;

    return <calcite-icon icon={icon} scale={getIconScale(this.scale)} />;
  }

  renderSelectableCell(): JsxNode {
    return this.rowType === "head" ? (
      <calcite-table-header
        alignment="center"
        bodyRowCount={this.bodyRowCount}
        key="selection-head"
        onClick={this.clickHandler}
        onKeyDown={this.handleKeyboardSelection}
        parentRowAlignment={this.alignment}
        ref={this.selectionHeaderRef}
        selectedRowCount={this.selectedRowCount}
        selectedRowCountLocalized={this.selectedRowCountLocalized}
        selectionCell={true}
        selectionMode={this.selectionMode}
      />
    ) : this.rowType === "body" ? (
      <calcite-table-cell
        alignment="center"
        key="selection-body"
        onClick={this.clickHandler}
        onKeyDown={this.handleKeyboardSelection}
        parentRowAlignment={this.alignment}
        parentRowIsSelected={this.selected}
        parentRowPositionLocalized={this.positionSectionLocalized}
        ref={this.selectionCellRef}
        selectionCell={true}
      >
        {this.renderSelectionIcon()}
      </calcite-table-cell>
    ) : (
      <calcite-table-cell
        alignment="center"
        key="selection-foot"
        parentRowAlignment={this.alignment}
        ref={this.selectionCellRef}
        selectionCell={true}
      />
    );
  }

  renderNumberedCell(): JsxNode {
    return this.rowType === "head" ? (
      <calcite-table-header
        alignment="center"
        key="numbered-head"
        numberCell={true}
        parentRowAlignment={this.alignment}
        ref={this.numberedHeaderRef}
      />
    ) : this.rowType === "body" ? (
      <calcite-table-cell
        alignment="center"
        key="numbered-body"
        numberCell={true}
        parentRowAlignment={this.alignment}
        ref={this.numberedCellRef}
      >
        {this.positionSectionLocalized}
      </calcite-table-cell>
    ) : (
      <calcite-table-cell
        alignment="center"
        key="numbered-foot"
        numberCell={true}
        parentRowAlignment={this.alignment}
        ref={this.numberedCellRef}
      />
    );
  }

  override render(): JsxNode {
    return (
      <this.interactiveContainer disabled={this.disabled}>
        <tr
          ariaRowIndex={this.positionAll + 1}
          ariaSelected={this.selected}
          class={{ [CSS.lastVisibleRow]: this.lastVisibleRow }}
          onKeyDown={this.keyDownHandler}
          ref={(el) => {
            if (!el) {
              return;
            }

            /* work around for https://github.com/Esri/calcite-design-system/issues/10495 */
            render(
              <>
                {this.numbered && this.renderNumberedCell()}
                {this.selectionMode !== "none" && this.renderSelectableCell()}
                <slot ref={this.rowSlotRef} />
              </>,
              el,
            );
          }}
        />
      </this.interactiveContainer>
    );
  }

  //#endregion
}
