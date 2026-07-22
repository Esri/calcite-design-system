import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import { queryAssignedElements } from "lit/decorators.js";
import type { Input } from "../input/input";
import type { Scale } from "../interfaces";
import { CSS } from "./resources";
import { styles } from "./field-set.scss";

type Layout = "grid" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

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

  @queryAssignedElements({ selector: "calcite-input" })
  private inputs!: Input["el"][];

  private inputDisabledState = new WeakMap<Input["el"], boolean>();

  // #endregion

  // #region Public Properties

  /** When `true`, disables the slotted inputs. */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** When `true`, disables the slotted inputs. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  /** Specifies the scale of the slotted inputs. */
  @property({ reflect: true }) scale: Scale = "m";

  // #endregion

  // #region Lifecycle

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("disabled")) {
      this.syncInputsDisabledState(changes.get("disabled"));
    }

    if (changes.has("scale")) {
      this.syncInputsScale();
    }
  }

  // #endregion

  // #region Private Methods

  private getInputDisabledState(input: Input["el"]): boolean {
    return input.hasAttribute("disabled") || input.disabled;
  }

  private syncInputsDisabledState(previousDisabled = this.disabled): void {
    const wasDisabled = previousDisabled;

    this.inputs?.forEach((input) => {
      if (this.disabled) {
        if (!wasDisabled || !this.inputDisabledState.has(input)) {
          this.inputDisabledState.set(input, this.getInputDisabledState(input));
        }

        input.toggleAttribute("disabled", true);
        input.disabled = true;
        return;
      }

      if (!wasDisabled) {
        this.inputDisabledState.set(input, this.getInputDisabledState(input));
        return;
      }

      const inputDisabled = this.inputDisabledState.get(input);
      const nextDisabled = inputDisabled ?? this.getInputDisabledState(input);

      input.toggleAttribute("disabled", nextDisabled);
      input.disabled = nextDisabled;
      this.inputDisabledState.set(input, nextDisabled);
    });
  }

  private handleInputSlotChange(): void {
    this.syncInputsDisabledState();
    this.syncInputsScale();
  }

  private syncInputsScale(): void {
    this.inputs?.forEach((input) => {
      input.scale = this.scale;
    });
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <fieldset class={CSS.container} disabled={this.disabled}>
        <legend class={CSS.legend}>
          <slot name="legend" />
        </legend>
        <div
          class={{
            [CSS.fieldWrapper]: true,
            [CSS.fieldWrapperVertical]: this.layout === "vertical",
            [CSS.fieldWrapperHorizontal]: this.layout === "horizontal",
            [CSS.fieldWrapperGrid]: this.layout === "grid",
          }}
        >
          <slot onSlotChange={this.handleInputSlotChange} />
        </div>
      </fieldset>
    );
  }

  // #endregion
}
