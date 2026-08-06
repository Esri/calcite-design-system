import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import { CSS } from "./resources";
import { styles } from "./field-set-row.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

declare global {
  interface DeclareElements {
    "calcite-field-set-row": FieldSetRow;
  }
}

/** @slot - A slot for adding field set row content. */
export class FieldSetRow extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Public Properties

  /** When `layout` is `"columns"`, specifies the number of columns. */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** Specifies the component layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerColumns]: this.layout === "columns",
          [CSS.containerHorizontal]: this.layout === "horizontal",
          [CSS.containerVertical]: this.layout === "vertical",
        }}
        style={{ "--calcite-internal-field-set-row-columns": this.columns }}
      >
        <slot />
      </div>
    );
  }

  //#endregion
}
