// @ts-strict-ignore
import { PropertyValues } from "lit";
import { render } from "lit-html";
import { createRef } from "lit-html/directives/ref.js";
import { createEvent, h, Fragment, JsxNode, LitElement, property, state } from "@arcgis/lumina";
import { Scale, SelectionMode } from "../interfaces";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { getUserAgentString } from "../../utils/browser";
import { useT9n } from "../../controllers/useT9n";
import type { TableRow } from "../table-row/table-row";
import type { Pagination } from "../pagination/pagination";
import { isHidden } from "../../utils/component";
import {
  TableInteractionMode,
  TableLayout,
  TableRowFocusEvent,
  TableSelectionDisplay,
} from "./interfaces";
import { CSS, ICONS, SLOTS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./table.scss";

declare global {
  interface DeclareElements {
    "calcite-table": Table;
  }
}

/**
 * @slot - A slot for adding `calcite-table-row` elements containing `calcite-table-cell` and/or `calcite-table-header` elements.
 * @slot table-header - A slot for adding `calcite-table-row` elements containing `calcite-table-header` elements.
 * @slot table-footer - A slot for adding `calcite-table-row` elements containing `calcite-table-cell` and/or `calcite-table-header` elements.
 * @slot selection-actions - A slot for adding `calcite-actions` or other elements to display when `selectionMode` is not `"none"` and `selectionDisplay` is not `"none"`.
 */
export class Table extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private allRows: TableRow["el"][];

  private bodyRows: TableRow["el"][];

  private footRows: TableRow["el"][];

  private headRows: TableRow["el"][];

  private paginationEl = createRef<Pagination["el"]>();

  private tableBodySlotEl = createRef<HTMLSlotElement>();

  private tableFootSlotEl = createRef<HTMLSlotElement>();

  private tableHeadSlotEl = createRef<HTMLSlotElement>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  //#endregion

  //#region State Properties

  @state() colCount = 0;

  @state() pageStartRow = 1;

  @state() readCellContentsToAT: boolean;

  @state() selectedCount = 0;

  @state() _selectedItems: TableRow["el"][] = [];

  //#endregion

  //#region Public Properties

  /** When `true`, displays borders in the component. */
  @property({ reflect: true }) bordered = false;

  /**
   * Specifies an accessible title for the component.
   *
   * @required
   */
  @property() caption: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @property({ reflect: true }) groupSeparator = false;

  /** When `"interactive"`, allows focus and keyboard navigation of `table-header`s and `table-cell`s.  When `"static"`, prevents focus and keyboard navigation of `table-header`s and `table-cell`s when assistive technologies are not active. Selection affordances and slotted content within `table-cell`s remain focusable. */
  @property({ reflect: true }) interactionMode: TableInteractionMode = "interactive";

  /** Specifies the layout of the component. */
  @property({ reflect: true }) layout: TableLayout = "auto";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, displays the position of the row in numeric form. */
  @property({ reflect: true }) numbered = false;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property({ reflect: true }) numberingSystem?: NumberingSystem;

  /** Specifies the page size of the component. When `true`, renders `calcite-pagination`. */
  @property({ reflect: true }) pageSize = 0;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @property() get selectedItems(): TableRow["el"][] {
    return this._selectedItems;
  }

  /** Specifies the display of the selection interface when `selection-mode` is not `"none"`. When `"none"`, content slotted the `selection-actions` slot will not be displayed. */
  @property({ reflect: true }) selectionDisplay: TableSelectionDisplay = "top";

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"multiple"` allows any number of selections,
   *
   * `"single"` allows only one selection, and
   *
   * `"none"` does not allow any selections.
   */
  @property({ reflect: true }) selectionMode: Extract<
    "none" | "multiple" | "single",
    SelectionMode
  > = "none";

  /** When `true`, displays striped styling in the component. */
  @property({ reflect: true }) striped = false;

  /** Paginates to a specific page */
  @property({ reflect: true }) startPage: number = 1;

  /**
   * Specifies the current page
   *
   * @readonly
   */
  @property() get currentPage(): number {
    return Math.ceil(this.pageStartRow / this.pageSize);
  }

  //#endregion

  //#region Events

  /** @private */
  calciteInternalTableRowFocusChange = createEvent<TableRowFocusEvent>({ cancelable: false });

  /** Emits when the component's page selection changes. */
  calciteTablePageChange = createEvent({ cancelable: false });

  /** Emits when the component's selected rows change. */
  calciteTableSelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteTableRowSelect", this.calciteTableRowSelectListener);
    this.listen("calciteInternalTableRowSelect", this.calciteInternalTableRowSelectListener);
    this.listen("calciteInternalTableRowFocusRequest", this.calciteInternalTableRowFocusEvent);
  }

  async load(): Promise<void> {
    /* Workaround for Safari https://bugs.webkit.org/show_bug.cgi?id=258430 https://bugs.webkit.org/show_bug.cgi?id=239478 */
    // ⚠️ browser-sniffing is not a best practice and should be avoided ⚠️
    this.readCellContentsToAT = /safari/i.test(getUserAgentString());

    this.listenOn(this.el.shadowRoot, "slotchange", this.handleSlotChange);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    const updateStartPage =
      changes.has("startPage") && (this.hasUpdated || this.startPage > 1) && this.pageSize > 0;
    if (updateStartPage) {
      this.pageStartRow = (this.startPage - 1) * this.pageSize + 1;
    }

    if (
      (changes.has("groupSeparator") && (this.hasUpdated || this.groupSeparator !== false)) ||
      (changes.has("interactionMode") &&
        (this.hasUpdated || this.interactionMode !== "interactive")) ||
      (changes.has("numbered") && (this.hasUpdated || this.numbered !== false)) ||
      changes.has("numberingSystem") ||
      (changes.has("pageSize") && (this.hasUpdated || this.pageSize !== 0)) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) ||
      (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none")) ||
      updateStartPage
    ) {
      this.updateRows();
    }
  }

  //#endregion

  //#region Private Methods

  private handleSlotChange(): void {
    this.updateRows();
  }

  private calciteTableRowSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(event.target as TableRow["el"]);
    }
  }

  private calciteInternalTableRowSelectListener(event: CustomEvent): void {
    if (!event.composedPath().includes(this.el)) {
      return;
    }

    this.updateSelectedItems(false);
    event.stopPropagation();
  }

  private calciteInternalTableRowFocusEvent(event: CustomEvent<TableRowFocusEvent>): void {
    const cellPosition = event.detail.cellPosition;
    const rowPos = event.detail.rowPosition;
    const destination = event.detail.destination;
    const lastCell = event.detail.lastCell;

    const visibleBody = this.bodyRows?.filter((row) => !isHidden(row));
    const visibleAll = this.allRows?.filter((row) => !isHidden(row));

    const lastHeadRow = this.headRows[this.headRows.length - 1]?.positionAll;
    const firstBodyRow = visibleBody[0]?.positionAll;
    const lastBodyRow = visibleBody[visibleBody.length - 1]?.positionAll;
    const firstFootRow = this.footRows[0]?.positionAll;
    const lastTableRow = visibleAll[visibleAll.length - 1]?.positionAll;

    const leavingHeader = destination === "next" && rowPos === lastHeadRow;
    const leavingFooter = destination === "previous" && rowPos === firstFootRow;
    const enteringHeader = destination === "previous" && rowPos === firstBodyRow;
    const enteringFooter = destination === "next" && rowPos === lastBodyRow;

    let rowPosition: number;

    switch (destination) {
      case "first":
        rowPosition = 0;
        break;
      case "last":
        rowPosition = lastTableRow;
        break;
      case "next":
        rowPosition = leavingHeader ? firstBodyRow : enteringFooter ? firstFootRow : rowPos + 1;
        break;
      case "previous":
        rowPosition = leavingFooter ? lastBodyRow : enteringHeader ? lastHeadRow : rowPos - 1;
        break;
    }

    const destinationCount = this.allRows?.find(
      (row) => row.positionAll === rowPosition,
    )?.cellCount;

    const adjustedPos = cellPosition > destinationCount ? destinationCount : cellPosition;

    if (rowPosition !== undefined) {
      this.calciteInternalTableRowFocusChange.emit({
        cellPosition: adjustedPos,
        rowPosition,
        destination,
        lastCell,
      });
    }
  }

  private getSlottedRows(el: HTMLSlotElement): TableRow["el"][] {
    return el
      ?.assignedElements({ flatten: true })
      ?.filter((el) => el?.matches("calcite-table-row")) as TableRow["el"][];
  }

  private updateRows(): void {
    const headRows = this.getSlottedRows(this.tableHeadSlotEl.value) || [];
    const bodyRows = this.getSlottedRows(this.tableBodySlotEl.value) || [];
    const footRows = this.getSlottedRows(this.tableFootSlotEl.value) || [];
    const allRows = [...headRows, ...bodyRows, ...footRows];

    headRows?.forEach((row) => {
      const position = headRows?.indexOf(row);
      row.rowType = "head";
      row.positionSection = position;
      row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
    });

    bodyRows?.forEach((row) => {
      const position = bodyRows?.indexOf(row);
      row.rowType = "body";
      row.positionSection = position;
      row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
    });

    footRows?.forEach((row) => {
      const position = footRows?.indexOf(row);
      row.rowType = "foot";
      row.positionSection = position;
      row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
    });

    allRows?.forEach((row) => {
      row.interactionMode = this.interactionMode;
      row.selectionMode = this.selectionMode;
      row.bodyRowCount = bodyRows?.length;
      row.positionAll = allRows?.indexOf(row);
      row.numbered = this.numbered;
      row.scale = this.scale;
      row.readCellContentsToAT = this.readCellContentsToAT;
      row.lastVisibleRow = allRows?.indexOf(row) === allRows.length - 1;
    });

    const colCount =
      headRows[0]?.cellCount || headRows[0]?.querySelectorAll("calcite-table-header")?.length;

    this.colCount = colCount;
    this.headRows = headRows;
    this.bodyRows = bodyRows;
    this.footRows = footRows;
    this.allRows = allRows;

    this.updateSelectedItems();
    this.paginateRows();
  }

  private handlePaginationChange(): void {
    const requestedItem = this.paginationEl.value?.startItem;
    this.pageStartRow = requestedItem || 1;
    this.calciteTablePageChange.emit();
    this.updateRows();
  }

  private paginateRows(): void {
    this.bodyRows?.forEach((row) => {
      const rowPos = row.positionSection + 1;
      const inView = rowPos >= this.pageStartRow && rowPos < this.pageStartRow + this.pageSize;
      row.itemHidden = this.pageSize > 0 && !inView && !this.footRows.includes(row);
      row.lastVisibleRow =
        rowPos === this.pageStartRow + this.pageSize - 1 || rowPos === this.bodyRows.length;
    });
  }

  private async updateSelectedItems(emit?: boolean): Promise<void> {
    const selectedItems = this.bodyRows?.filter((el) => el.selected);
    this._selectedItems = selectedItems;
    this.selectedCount = selectedItems?.length;
    this.allRows?.forEach((row) => {
      row.selectedRowCount = this.selectedCount;
      row.selectedRowCountLocalized = this.localizeNumber(this.selectedCount);
    });
    if (emit) {
      this.calciteTableSelect.emit();
    }
  }

  private handleDeselectAllRows(): void {
    this.bodyRows?.forEach((row) => {
      row.selected = false;
    });
    this.updateSelectedItems(true);
  }

  private setSelectedItems(elToMatch?: TableRow["el"]): void {
    this.bodyRows?.forEach((el) => {
      if (elToMatch?.rowType === "head") {
        el.selected = this.selectedCount !== this.bodyRows?.length;
      } else {
        el.selected = this.selectionMode === "multiple" || elToMatch === el ? el.selected : false;
      }
    });
    this.updateSelectedItems(true);
  }

  private localizeNumber(value: number | string): string {
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    return numberStringFormatter.localize(value.toString());
  }

  //#endregion

  //#region Rendering

  private renderSelectionArea(): JsxNode {
    const outOfViewCount = this._selectedItems?.filter((el) => isHidden(el))?.length;
    const localizedOutOfView = this.localizeNumber(outOfViewCount?.toString());
    const localizedSelectedCount = this.localizeNumber(this.selectedCount?.toString());
    const selectionText = `${localizedSelectedCount} ${this.messages.selected}`;
    const outOfView = `${localizedOutOfView} ${this.messages.hiddenSelected}`;

    return (
      <div class={CSS.selectionArea}>
        <calcite-chip
          class={{
            [CSS.selectionCountChip]: true,
            [CSS.selectionChipActive]: this.selectedCount > 0,
          }}
          kind={this.selectedCount > 0 ? "brand" : "neutral"}
          label={selectionText}
          scale={this.scale}
          value={selectionText}
        >
          {selectionText}
        </calcite-chip>
        {outOfViewCount > 0 && (
          <calcite-chip
            class={CSS.selectionOutOfViewChip}
            icon={ICONS.hideEmpty}
            label={outOfView}
            scale={this.scale}
            title={outOfView}
            value={outOfView}
          >
            {localizedOutOfView}
          </calcite-chip>
        )}
        {this.selectedCount > 0 && (
          <calcite-button
            class={CSS.dismissButton}
            iconStart={ICONS.clear}
            kind="neutral"
            onClick={this.handleDeselectAllRows}
            round
            scale={this.scale}
            title={`${this.messages.clear} ${selectionText} ${this.messages.row}`}
          >
            {this.messages.clear}
          </calcite-button>
        )}
        <div class={CSS.selectionActions}>
          <slot name={SLOTS.selectionActions} />
        </div>
      </div>
    );
  }

  private renderPaginationArea(): JsxNode {
    return (
      <div class={CSS.paginationArea}>
        <calcite-pagination
          groupSeparator={this.groupSeparator}
          numberingSystem={this.numberingSystem}
          oncalcitePaginationChange={this.handlePaginationChange}
          pageSize={this.pageSize}
          ref={this.paginationEl}
          scale={this.scale}
          startItem={this.pageStartRow}
          totalItems={this.bodyRows?.length}
        />
      </div>
    );
  }

  renderTHead(): JsxNode {
    return (
      <thead>
        <slot name={SLOTS.tableHeader} ref={this.tableHeadSlotEl} />
      </thead>
    );
  }

  renderTBody(): JsxNode {
    return (
      <tbody>
        <slot ref={this.tableBodySlotEl} />
      </tbody>
    );
  }

  renderTFoot(): JsxNode {
    return (
      <tfoot>
        <slot name={SLOTS.tableFooter} ref={this.tableFootSlotEl} />
      </tfoot>
    );
  }

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        {this.selectionMode !== "none" &&
          this.selectionDisplay !== "none" &&
          this.renderSelectionArea()}
        <div
          class={{
            [CSS.bordered]: this.bordered,
            [CSS.striped]: this.striped,
            [CSS.tableContainer]: true,
          }}
        >
          <table
            ariaColCount={this.colCount}
            ariaMultiSelectable={
              /* workaround to ensure the attr gets removed; we should be able to avoid the ternary when fixed */
              this.selectionMode === "multiple" ? "true" : null
            }
            ariaRowCount={this.allRows?.length}
            class={{ [CSS.tableFixed]: this.layout === "fixed" }}
            ref={(el) => {
              if (!el) {
                return;
              }

              /* work around for https://github.com/Esri/calcite-design-system/issues/10495 */
              render(
                <>
                  <caption class={CSS.assistiveText}>{this.caption}</caption>
                  {this.renderTHead()}
                  {this.renderTBody()}
                  {this.renderTFoot()}
                </>,
                el,
              );
            }}
            role={this.interactionMode === "interactive" ? "grid" : "table"}
          />
        </div>
        {this.pageSize > 0 && this.renderPaginationArea()}
      </div>
    );
  }

  //#endregion
}
