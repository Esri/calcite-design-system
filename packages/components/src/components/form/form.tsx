import { LitElement, h, JsxNode } from "@arcgis/lumina";
import { CSS } from "./resources";
import { styles } from "./form.scss";

declare global {
  interface DeclareElements {
    "calcite-form": Form;
  }
}

/** @slot - A slot for adding one or more `calcite-field-set` components. */
export class Form extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        <slot />
      </div>
    );
  }

  // #endregion
}
