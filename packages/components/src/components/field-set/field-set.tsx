import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import { queryAssignedElements } from "lit/decorators.js";
import type { Label } from "../label/label";
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

  // #region Private Properties

  @queryAssignedElements({ selector: "calcite-label" })
  private labels!: Label["el"][];

  // #endregion

  // #region Public Properties

  /** When `true`, disables the slotted labels and their associated inputs. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  // #endregion

  // #region Lifecycle

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("disabled")) {
      this.syncLabelsDisabledState();
    }
  }

  // #endregion

  // #region Private Methods

  private syncLabelsDisabledState(): void {
    this.labels?.forEach((label) => {
      label.disabled = this.disabled;
    });
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <fieldset aria-labelledby="fieldset-legend" class={CSS.container}>
        <legend class={CSS.legend} id="fieldset-legend">
          <slot name="legend" />
        </legend>
        <div
          class={{
            [CSS.fieldWrapper]: true,
            [CSS.fieldWrapperHorizontal]: this.layout === "horizontal",
            [CSS.fieldWrapperVertical]: this.layout === "vertical",
          }}
        >
          <slot onSlotChange={this.syncLabelsDisabledState} />
        </div>
      </fieldset>
    );
  }

  // #endregion
}
