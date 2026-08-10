import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import type { Input } from "../input/input";
import type { Scale } from "../interfaces";
import { getStylePixelValue } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./field-set.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

const internalPrefixWidthVar = "--calcite-internal-input-prefix-width";
const internalSuffixWidthVar = "--calcite-internal-input-suffix-width";
const prefixSizeVar = "--calcite-input-prefix-size";
const suffixSizeVar = "--calcite-input-suffix-size";

type DisabledElement = HTMLElement & { disabled: boolean };
type ReadOnlyElement = HTMLElement & { readOnly: boolean };
type ScaledElement = HTMLElement & { scale: Scale };

const controlBoundarySelector =
  "calcite-field-set, calcite-radio-button-group, calcite-segmented-control";

function hasDisabledProperty(element: HTMLElement): element is DisabledElement {
  return "disabled" in element;
}

function hasReadOnlyProperty(element: HTMLElement): element is ReadOnlyElement {
  return "readOnly" in element;
}

function hasScaleProperty(element: HTMLElement): element is ScaledElement {
  return "scale" in element;
}

declare global {
  interface DeclareElements {
    "calcite-field-set": FieldSet;
  }
}

/**
 * @slot - A slot for adding content to the field set.
 */
export class FieldSet extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private controlDisabledState = new WeakMap<DisabledElement, boolean>();

  private controlReadOnlyState = new WeakMap<ReadOnlyElement, boolean>();

  private get inputs(): Input["el"][] {
    return this.controlElements.filter((element): element is Input["el"] =>
      element.matches("calcite-input"),
    );
  }

  private get controlElements(): HTMLElement[] {
    return Array.from(this.el.querySelectorAll<HTMLElement>("*")).filter((element) => {
      if (element.matches("calcite-field-set")) {
        return false;
      }

      const closestBoundary = element.closest(controlBoundarySelector);
      return closestBoundary === this.el || closestBoundary === element;
    });
  }

  private get disabledElements(): DisabledElement[] {
    return this.controlElements.filter(hasDisabledProperty);
  }

  private get readOnlyElements(): ReadOnlyElement[] {
    return this.controlElements.filter(hasReadOnlyProperty);
  }

  private get scaledElements(): ScaledElement[] {
    return this.controlElements.filter(hasScaleProperty);
  }

  //#endregion

  //#region Public Properties

  /** When `layout` is `"columns"`, specifies the number of columns. */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** When `true`, disables slotted controls. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  /** Specifies the field set legend. */
  @property() legend?: string;

  /** When `true`, sets slotted controls to read-only. */
  @property({ reflect: true }) readOnly = false;

  /** When `true`, slotted input prefixes share the same width. */
  @property({ reflect: true }) prefixAutoWidth = false;

  /** Specifies the scale of slotted controls. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, slotted input suffixes share the same width. */
  @property({ reflect: true }) suffixAutoWidth = false;

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    super.connectedCallback();
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("disabled")) {
      this.syncControlsDisabledState(changes.get("disabled"));
    }

    if (changes.has("scale")) {
      this.syncControlsScale();
    }

    if (changes.has("readOnly")) {
      this.syncControlsReadOnlyState(changes.get("readOnly"));
    }

    if (changes.has("prefixAutoWidth") || changes.has("scale") || changes.has("suffixAutoWidth")) {
      void this.syncInputsAffixWidths();
    }
  }

  //#endregion

  //#region Private Methods

  private getControlDisabledState(control: DisabledElement): boolean {
    return control.hasAttribute("disabled") || control.disabled;
  }

  private getControlReadOnlyState(control: ReadOnlyElement): boolean {
    return control.hasAttribute("read-only") || control.readOnly;
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

  private syncControlsDisabledState(previousDisabled = this.disabled): void {
    const wasDisabled = previousDisabled;

    this.disabledElements.forEach((control) => {
      if (this.disabled) {
        if (!wasDisabled || !this.controlDisabledState.has(control)) {
          this.controlDisabledState.set(control, this.getControlDisabledState(control));
        }

        control.toggleAttribute("disabled", true);
        control.disabled = true;
        return;
      }

      if (!wasDisabled) {
        this.controlDisabledState.set(control, this.getControlDisabledState(control));
        return;
      }

      const controlDisabled = this.controlDisabledState.get(control);
      const nextDisabled = controlDisabled ?? this.getControlDisabledState(control);

      control.toggleAttribute("disabled", nextDisabled);
      control.disabled = nextDisabled;
      this.controlDisabledState.set(control, nextDisabled);
    });
  }

  private handleInputSlotChange(): void {
    this.syncControlsDisabledState();
    this.syncControlsReadOnlyState();
    this.syncControlsScale();
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

  private syncControlsScale(): void {
    this.scaledElements.forEach((control) => {
      control.scale = this.scale;
    });
  }

  private syncControlsReadOnlyState(previousReadOnly = this.readOnly): void {
    const wasReadOnly = previousReadOnly;

    this.readOnlyElements.forEach((control) => {
      if (this.readOnly) {
        if (!wasReadOnly || !this.controlReadOnlyState.has(control)) {
          this.controlReadOnlyState.set(control, this.getControlReadOnlyState(control));
        }

        control.toggleAttribute("read-only", true);
        control.readOnly = true;
        return;
      }

      if (!wasReadOnly) {
        this.controlReadOnlyState.set(control, this.getControlReadOnlyState(control));
        return;
      }

      const controlReadOnly = this.controlReadOnlyState.get(control);
      const nextReadOnly = controlReadOnly ?? this.getControlReadOnlyState(control);

      control.toggleAttribute("read-only", nextReadOnly);
      control.readOnly = nextReadOnly;
      this.controlReadOnlyState.set(control, nextReadOnly);
    });
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <fieldset class={CSS.container} disabled={this.disabled}>
        <div class={CSS.legendWrapper} hidden={!this.legend}>
          <legend class={CSS.legend}>{this.legend}</legend>
        </div>
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

  //#endregion
}
