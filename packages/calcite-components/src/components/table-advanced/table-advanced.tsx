import { PropertyValues } from "lit";
import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import type { ColumnDefinition, OptionsData } from "tabulator-tables";
import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
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

  private customSlotTableEl: HTMLElement;

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

    if (this.el.querySelector("table")) {
      this.customSlotTableEl = this.el.querySelector("table");
      this.tabulator = new Tabulator(this.customSlotTableEl, {});
    } else {
      this.tabulator = new Tabulator(this.tableEl, {
        data: this.data || [],
        columns: this.columns || [],
      });
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
  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        {this.el.querySelector("table") ? (
          <div>{this.customSlotTableEl}</div>
        ) : (
          <div class={CSS.tableContainer} ref={this.setTableElRef} />
        )}
      </div>
    );
  }

  // #endregion
}
