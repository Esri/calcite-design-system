import { LitElement, h, JsxNode, property, state } from "@arcgis/lumina";
import { CSS } from "./resources";
import { styles } from "./field-set.scss";

declare global {
  interface DeclareElements {
    "calcite-field-set": FieldSet;
  }
}

/**
 * @slot - A slot for adding controls and `calcite-field-group`s.
 * @slot legend - A slot for adding legend content.
 */
export class FieldSet extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region State Properties

  @state() private hasLegendSlot = false;

  //#endregion

  //#region Public Properties

  /** Specifies the component's legend text. */
  @property() legend?: string;

  //#endregion

  //#region Private Methods

  private handleLegendSlotChange(event: Event): void {
    this.hasLegendSlot = (event.target as HTMLSlotElement).assignedElements().length > 0;
  }
  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <fieldset class={CSS.container}>
        <legend class={CSS.legend} hidden={!this.legend && !this.hasLegendSlot}>
          <slot name="legend" onSlotChange={this.handleLegendSlotChange}>
            {this.legend}
          </slot>
        </legend>
        <div class={CSS.fieldWrapper}>
          <slot />
        </div>
      </fieldset>
    );
  }

  //#endregion
}
