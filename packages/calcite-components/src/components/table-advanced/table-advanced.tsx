import { PropertyValues } from "lit";
import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import type { ColumnDefinition, OptionsData } from "tabulator-tables";
import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import type { Input } from "../input/input";
import { Scale } from "../interfaces";
import { CSS } from "./resources";
import { styles } from "./table-advanced.scss";

declare global {
  interface DeclareElements {
    "calcite-table-advanced": TableAdvanced;
  }
}

/** @slot - A slot for adding HTML tables */
export class TableAdvanced extends LitElement implements LoadableComponent {
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

  /** Specifies the field to be used as row index. Default is `id`. */
  @property() rowIndexField: string;

  /** Specifies the component's height. Default is `auto`. */
  @property() height: string;

  /** When true, the component shows scroll to row input. */
  @property() showScrollToRow = false;

  /** Scroll to row input value. */
  @property() scrollToRowInputValue: string;

  // #endregion

  // #region Events

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
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
  }

  loaded(): void {
    setComponentLoaded(this);

    this.tabulator = this.customSlotTableEl
      ? new Tabulator(this.customSlotTableEl, {})
      : new Tabulator(this.tableEl, {
          data: this.data || [],
          columns: this.columns || [],
          index: this.rowIndexField || "id",
          height: this.height || "auto",
        });
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

  private changeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.scrollToRowInputValue = (event.target as Input["el"]).value;
  }

  private inputHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.scrollToRowInputValue = (event.target as Input["el"]).value;
  }
  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        {this.showScrollToRow && (
          <div>
            <calcite-input
              oncalciteInputChange={this.changeHandler}
              oncalciteInputInput={this.inputHandler}
              type="search"
              value={this.scrollToRowInputValue}
            />
            <button
              onClick={() => {
                console.log("row", this.tabulator.getRow(this.scrollToRowInputValue).getData());
                this.tabulator.scrollToRow(this.scrollToRowInputValue, "top", true);
              }}
            >
              Scroll to row
            </button>
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
