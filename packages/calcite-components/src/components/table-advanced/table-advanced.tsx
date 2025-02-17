// @ts-strict-ignore
import { debounce } from "lodash-es";
import { PropertyValues } from "lit";
import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import type { ColumnDefinition, OptionsData } from "tabulator-tables";
import type { Input } from "../input/input";
import { Scale } from "../interfaces";
import { DEBOUNCE } from "../../utils/resources";
import { CSS } from "./resources";
import { styles } from "./table-advanced.scss";

declare global {
  interface DeclareElements {
    "calcite-table-advanced": TableAdvanced;
  }
}

/** @slot - A slot for adding HTML tables */
export class TableAdvanced extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private tableEl: HTMLElement;

  private customSlotTableEl: HTMLElement = this.el.querySelector("table");

  // #endregion

  // #region State Properties

  @state() tabulator: Tabulator;

  // #endregion

  // #region Public Properties

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the table data of the component. */
  @property() data: OptionsData[];

  /** Specifies the table columns of the component. */
  @property() columns: ColumnDefinition[];

  /** Specifies the component's height. Default is `auto`. */
  @property() height: string = "auto";

  /** When true, an input appears that can be used to scroll to a specific table row by row index. Default row index is `id`, a custom row index can be set in `rowIndexProp`. */
  @property() scrollToRowEnabled = false;

  /** Specifies the scroll to row input value. */
  @property() scrollToRowInputValue: string;

  /** Specifies the property to be used as row index. Default is `id`. */
  @property() rowIndexProp: string = "id";

  /** When true, an input appears that can be used to filter `calcite-table-advanced` items. Default filter property is `id`, a custom property can be set in `filterByProp`.  */
  @property() filterEnabled = false;

  /** Specifies the filter input value. */
  @property() filterInputValue: string;

  /** Specifies the property to be used to filter `calcite-table-advanced` items. Default is `id`. */
  @property() filterByProp: string = "id";

  /**
   * Specifies a function to handle filtering.
   *
   * @example
   * myTable.filterPredicate = (myTableItem) => {
   *   // returns true to show the table item if some condition is met
   *   return data.someProp == "someValue";
   * };
   */
  @property() filterPredicate?: (item: any) => boolean;

  /** Specifies the table columns to always be visible when scrolling horizontally */
  @property() frozenColumns: Array<string>[] = [];

  /** Specifies the property to be used to find frozen columns. Default is `name` */
  @property() frozenColumnProp: string = "name";

  // #endregion

  // #region Events

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("data") && this.hasUpdated) {
      this.dataWatcher(this.data);
    }

    if (changes.has("columns") && this.hasUpdated) {
      this.columnsWatcher(this.columns);
    }

    if (changes.has("filterPredicate") && this.hasUpdated) {
      if (this.validFilterPredicate()) {
        this.tabulator.setFilter(this.filterPredicate);
      } else {
        this.tabulator.clearFilter(false);
      }
    }
  }

  loaded(): void {
    this.tabulator = this.customSlotTableEl
      ? new Tabulator(this.customSlotTableEl, {})
      : new Tabulator(this.tableEl, {
          data: this.data || [],
          columns: this.setFrozenColumns(this.columns) || [],
          index: this.rowIndexProp,
          height: this.height,
        });

    if (this.validFilterPredicate()) {
      this.tabulator.setFilter(this.filterPredicate);
    }
  }

  // #endregion

  // #region Private Methods

  private setTableElRef(el: HTMLElement) {
    this.tableEl = el;
  }

  private dataWatcher(data: OptionsData[]): void {
    if (this.tabulator) {
      this.tabulator.setData(data);
    }
  }

  private columnsWatcher(columns: ColumnDefinition[]): void {
    if (this.tabulator) {
      this.tabulator.setColumns(columns);
    }
  }

  private scrollToRowChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.scrollToRowInputValue = (event.target as Input["el"]).value;
  }

  private scrollToRowInputHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.scrollToRowInputValue = (event.target as Input["el"]).value;
  }

  private handleScrollToRow(): void {
    if (this.scrollToRowInputValue) {
      this.tabulator.scrollToRow(this.scrollToRowInputValue, "top", true);
    }
  }

  private scrollToRowKeyDownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case "Enter":
        this.handleScrollToRow();
        event.preventDefault();
        break;
    }
  }

  private filterChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.filterInputValue = (event.target as Input["el"]).value;

    if (!this.validFilterPredicate()) {
      this.handleSetFilter();
    }
  }

  private filterInputHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.filterInputValue = (event.target as Input["el"]).value;

    if (!this.validFilterPredicate()) {
      this.handleSetFilter();
    }
  }

  private handleSetFilter = debounce((): void => {
    if (this.filterInputValue) {
      this.tabulator.setFilter(this.filterByProp, "like", this.filterInputValue);
    } else {
      this.tabulator.clearFilter(false);
    }
  }, DEBOUNCE.filter);

  private validFilterPredicate(): boolean {
    return typeof this.filterPredicate === "function";
  }

  private setFrozenColumns(columns: ColumnDefinition[]): Array<ColumnDefinition> {
    this.frozenColumns.forEach((frozenColumn) => {
      const column = columns.find(
        (column) =>
          column[this.frozenColumnProp].toString().toLowerCase() ===
          frozenColumn.toString().toLowerCase(),
      );

      if (column) {
        column.frozen = true;
      }
    });

    return columns;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        {this.scrollToRowEnabled && (
          <div>
            <calcite-input
              onKeyDown={this.scrollToRowKeyDownHandler}
              oncalciteInputChange={this.scrollToRowChangeHandler}
              oncalciteInputInput={this.scrollToRowInputHandler}
              placeholder="Scroll"
              type="text"
              value={this.scrollToRowInputValue}
            />
            <button
              onClick={() => {
                this.handleScrollToRow();
              }}
            >
              Scroll to row
            </button>
          </div>
        )}

        {this.filterEnabled && (
          <div>
            <calcite-input
              oncalciteInputChange={this.filterChangeHandler}
              oncalciteInputInput={this.filterInputHandler}
              placeholder="Filter"
              type="text"
              value={this.filterInputValue}
            />
          </div>
        )}

        {this.customSlotTableEl ? (
          <span>{this.customSlotTableEl}</span>
        ) : (
          <div ref={this.setTableElRef} />
        )}
      </div>
    );
  }

  // #endregion
}
