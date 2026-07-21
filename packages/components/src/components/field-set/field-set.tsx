import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import { CSS } from "./resources";
import { styles } from "./field-set.scss";

type Layout = "horizontal" | "vertical";

declare global {
  interface DeclareElements {
    "calcite-field-set": FieldSet;
  }
}

/**
 * @slot - A slot for adding content to the field set.
 * @slot legend - A slot for adding legend content.
 */
export class FieldSet extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** Specifies the component layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <fieldset aria-labelledby="fieldset-legend" class={CSS.container}>
        <div class={CSS.legend} id="fieldset-legend">
          <slot name="legend" />
        </div>
        <div
          class={{
            [CSS.fieldWrapper]: true,
            [CSS.fieldWrapperHorizontal]: this.layout === "horizontal",
            [CSS.fieldWrapperVertical]: this.layout === "vertical",
          }}
        >
          <slot />
        </div>
      </fieldset>
    );
  }

  // #endregion
}
