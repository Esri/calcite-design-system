import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import type { Input } from "../input/input";
import type { Scale } from "../types";
import { getStylePixelValue } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./field-group.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

const originalDisabledState = Symbol("calciteFieldGroupOriginalDisabledState");

const internalPrefixWidthVar = "--calcite-internal-input-prefix-width";
const internalSuffixWidthVar = "--calcite-internal-input-suffix-width";
const prefixSizeVar = "--calcite-input-prefix-size";
const suffixSizeVar = "--calcite-input-suffix-size";

const controlBoundarySelector =
  "calcite-field-group, calcite-field-set, calcite-radio-button-group, calcite-segmented-control";

type DisabledControl = HTMLElement & {
  disabled: boolean;
  [originalDisabledState]?: boolean;
};

type ScaledControl = HTMLElement & { scale: Scale };

declare global {
  interface DeclareElements {
    "calcite-field-group": FieldGroup;
  }
}

/**
 * @slot - A slot for adding controls, `calcite-field-group`, and `calcite-field-set` components.
 */
export class FieldGroup extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private controlsDisabledSyncQueued = false;

  private get controlElements(): HTMLElement[] {
    return Array.from(this.el.querySelectorAll<HTMLElement>("*")).filter(
      (element) => element.parentElement?.closest(controlBoundarySelector) === this.el,
    );
  }

  private get disabledControls(): DisabledControl[] {
    return this.controlElements.filter(
      (element): element is DisabledControl => "disabled" in element,
    );
  }

  private get inputs(): Input["el"][] {
    return Array.from(this.el.querySelectorAll<Input["el"]>("calcite-input")).filter(
      (input) => input.closest("calcite-field-group") === this.el,
    );
  }

  private get scaledControls(): ScaledControl[] {
    return this.controlElements.filter((element): element is ScaledControl => "scale" in element);
  }

  //#endregion

  //#region Public Properties

  /** When `true`, disables slotted controls and propagates to Field Groups and and Field Sets. */
  @property({ reflect: true }) disabled = false;

  /** When `layout` is `"columns"`, specifies the number of columns in the Field Group it's applied to (does not propagate). */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** Specifies the component layout of the Field Group it's applied to (does not propagate). */
  @property({ reflect: true }) layout: Layout = "vertical";

  /** When `true`, slotted input prefixes share the same width within the Field Group it's applied to (does not propagate). */
  @property({ reflect: true }) prefixAutoWidth = false;

  /** Specifies the scale of slotted controls, Field Groups, and Field Sets. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, slotted input suffixes share the same width within the Field Group it's applied to (does not propagate). */
  @property({ reflect: true }) suffixAutoWidth = false;

  //#endregion

  //#region Lifecycle

  override updated(changes: PropertyValues<this>): void {
    this.syncControlsScale();

    if (changes.has("disabled")) {
      this.syncControlsDisabled();

      if (this.disabled) {
        void this.queueControlsDisabledResync();
      }
    }

    if (changes.has("prefixAutoWidth") || changes.has("scale") || changes.has("suffixAutoWidth")) {
      void this.syncInputsAffixWidths();
    }
  }

  //#endregion

  //#region Private Methods

  private handleSlotChange(): void {
    this.syncControlsScale();
    this.syncControlsDisabled();

    if (this.disabled) {
      void this.queueControlsDisabledResync();
    }

    void this.syncInputsAffixWidths();
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

  private async queueControlsDisabledResync(): Promise<void> {
    if (this.controlsDisabledSyncQueued) {
      return;
    }

    this.controlsDisabledSyncQueued = true;

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    this.controlsDisabledSyncQueued = false;

    if (this.disabled) {
      this.syncControlsDisabled();
    }
  }

  private syncControlsDisabled(): void {
    this.disabledControls.forEach((control) => {
      if (this.disabled) {
        if (control[originalDisabledState] === undefined) {
          control[originalDisabledState] = control.disabled;
        }

        control.disabled = true;
        return;
      }

      if (control[originalDisabledState] === undefined) {
        return;
      }

      control.disabled = control[originalDisabledState];
      delete control[originalDisabledState];
    });
  }

  private syncControlsScale(): void {
    this.scaledControls.forEach((control) => {
      control.scale = this.scale;
    });
  }

  private async syncInputAffixWidth(
    affixWidthProperty: typeof internalPrefixWidthVar | typeof internalSuffixWidthVar,
    shouldSync: boolean,
    styleProperty: typeof prefixSizeVar | typeof suffixSizeVar,
  ): Promise<void> {
    const inputs = this.inputs;

    inputs.forEach((input) => input.style.removeProperty(styleProperty));

    if (!shouldSync) {
      return;
    }

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    const nextWidth = Math.max(
      0,
      ...(await Promise.all(
        inputs.map((input) => this.getInputAffixWidth(input, affixWidthProperty)),
      )),
    );

    inputs.forEach((input) => {
      if (nextWidth) {
        input.style.setProperty(styleProperty, `${nextWidth}px`);
      }
    });
  }

  private async syncInputsAffixWidths(): Promise<void> {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await this.syncInputAffixWidth(internalPrefixWidthVar, this.prefixAutoWidth, prefixSizeVar);
    await this.syncInputAffixWidth(internalSuffixWidthVar, this.suffixAutoWidth, suffixSizeVar);
  }

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
        style={{ "--calcite-internal-field-group-columns": this.columns }}
      >
        <slot onSlotChange={this.handleSlotChange} />
      </div>
    );
  }

  //#endregion
}
