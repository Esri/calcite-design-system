import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import type { Input } from "../input/input";
import type { Scale } from "../interfaces";
import { getSlotAssignedElements, getStylePixelValue } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./field-set.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

const internalPrefixWidthVar = "--calcite-internal-input-prefix-width";
const internalSuffixWidthVar = "--calcite-internal-input-suffix-width";
const prefixSizeVar = "--calcite-input-prefix-size";
const suffixSizeVar = "--calcite-input-suffix-size";

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

  private inputDisabledState = new WeakMap<Input["el"], boolean>();

  // #endregion

  // #region Public Properties

  /** When `layout` is `"columns"`, specifies the number of columns. */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** When `true`, disables the slotted inputs. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  /** When `true`, slotted input prefixes share the same width. */
  @property({ reflect: true }) prefixAutoWidth = false;

  /** Specifies the scale of the slotted inputs. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, slotted input suffixes share the same width. */
  @property({ reflect: true }) suffixAutoWidth = false;

  // #endregion

  // #region Lifecycle

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("disabled")) {
      this.syncInputsDisabledState(changes.get("disabled"));
    }

    if (changes.has("scale")) {
      this.syncInputsScale();
    }

    if (changes.has("prefixAutoWidth") || changes.has("scale") || changes.has("suffixAutoWidth")) {
      void this.syncInputsAffixWidths();
    }
  }

  // #endregion

  // #region Private Methods

  private get inputs(): Input["el"][] {
    return (
      this.slottedElements.flatMap((element) => {
        if (element.matches("calcite-input")) {
          return [element];
        }

        return Array.from(element.querySelectorAll<Input["el"]>("calcite-input"));
      }) ?? []
    );
  }

  private get labels(): (HTMLElement & { scale?: Scale })[] {
    return (
      this.slottedElements.flatMap((element) => {
        if (element.matches("calcite-label")) {
          return [element];
        }

        return Array.from(
          element.querySelectorAll<HTMLElement & { scale?: Scale }>("calcite-label"),
        );
      }) ?? []
    );
  }

  private get textAreas(): (HTMLElement & { scale?: Scale })[] {
    return (
      this.slottedElements.flatMap((element) => {
        if (element.matches("calcite-text-area")) {
          return [element];
        }

        return Array.from(
          element.querySelectorAll<HTMLElement & { scale?: Scale }>("calcite-text-area"),
        );
      }) ?? []
    );
  }

  private get inlineEditableComponents(): (HTMLElement & { scale?: Scale })[] {
    return (
      this.slottedElements.flatMap((element) => {
        if (element.matches("calcite-inline-editable")) {
          return [element];
        }

        return Array.from(
          element.querySelectorAll<HTMLElement & { scale?: Scale }>("calcite-inline-editable"),
        );
      }) ?? []
    );
  }

  private get slottedElements(): HTMLElement[] {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>("slot:not([name])");

    return slot ? getSlotAssignedElements<HTMLElement>(slot) : [];
  }

  private getInputDisabledState(input: Input["el"]): boolean {
    return input.hasAttribute("disabled") || input.disabled;
  }

  private async getInputAffixWidth(
    input: Input["el"],
    affixWidthProperty: typeof internalPrefixWidthVar | typeof internalSuffixWidthVar,
  ): Promise<number> {
    const readyInput = input as Input["el"] & {
      componentOnReady?: () => Promise<void>;
      updateComplete?: Promise<unknown>;
    };

    await readyInput.componentOnReady?.();
    await readyInput.updateComplete;

    return getStylePixelValue(getComputedStyle(input).getPropertyValue(affixWidthProperty).trim());
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
    void this.syncInputsAffixWidths();
  }

  private async syncInputAffixWidth(
    affixWidthProperty: typeof internalPrefixWidthVar | typeof internalSuffixWidthVar,
    shouldSync: boolean,
    styleProperty: typeof prefixSizeVar | typeof suffixSizeVar,
  ): Promise<void> {
    const inputs = this.inputs;

    if (!shouldSync) {
      inputs.forEach((input) => input.style.removeProperty(styleProperty));
      return;
    }

    inputs.forEach((input) => input.style.removeProperty(styleProperty));

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });

    const nextWidth = Math.max(
      0,
      ...(await Promise.all(
        inputs.map((input) => this.getInputAffixWidth(input, affixWidthProperty)),
      )),
    );

    inputs.forEach((input) => {
      if (!nextWidth) {
        input.style.removeProperty(styleProperty);
        return;
      }

      input.style.setProperty(styleProperty, `${nextWidth}px`);
    });
  }

  private async syncInputsAffixWidths(): Promise<void> {
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });

    await this.syncInputAffixWidth(internalPrefixWidthVar, this.prefixAutoWidth, prefixSizeVar);
    await this.syncInputAffixWidth(internalSuffixWidthVar, this.suffixAutoWidth, suffixSizeVar);
  }

  private syncInputsScale(): void {
    this.labels.forEach((label) => {
      label.scale = this.scale;
    });

    this.inlineEditableComponents.forEach((inlineEditableComponent) => {
      inlineEditableComponent.scale = this.scale;
    });

    this.textAreas.forEach((textArea) => {
      textArea.scale = this.scale;
    });

    this.inputs.forEach((input) => {
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
            [CSS.fieldWrapperColumns]: this.layout === "columns",
          }}
        >
          <slot onSlotChange={this.handleInputSlotChange} />
        </div>
      </fieldset>
    );
  }

  // #endregion
}
