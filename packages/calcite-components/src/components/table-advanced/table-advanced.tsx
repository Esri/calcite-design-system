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

export class TableAdvanced extends LitElement implements LoadableComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private tableEl: HTMLElement;

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

  override connectedCallback(): void {
    this.tabulator = new Tabulator(this.tableEl, {
      data: this.data,
      columns: this.columns,
    });
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  // #endregion

  // #region Private Methods

  private setTableElRef(el: HTMLElement) {
    this.tableEl = el;
  }
  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        <div class={CSS.tableContainer} ref={this.setTableElRef} />
      </div>
    );
  }

  // #endregion
}
