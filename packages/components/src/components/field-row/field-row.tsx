import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import { CSS } from "./resources";
import { styles } from "./field-row.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

declare global {
  interface DeclareElements {
    "calcite-field-row": FieldRow;
  }
}

/** @slot - A slot for adding row content. */
export class FieldRow extends LitElement {
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
        style={{ "--calcite-internal-field-row-columns": this.columns }}
      >
        <slot />
      </div>
    );
  }

  //#endregion
}
