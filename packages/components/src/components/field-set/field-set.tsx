import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property, state } from "@arcgis/lumina";
import type { Input } from "../input/input";
import type { Scale } from "../interfaces";
import { getSlotAssignedElements, getStylePixelValue } from "../../utils/dom";
import { guid } from "../../utils/guid";
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
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private inputDisabledState = new WeakMap<Input["el"], boolean>();

  private inputReadOnlyState = new WeakMap<Input["el"], boolean>();

  private legendId = `calcite-field-set-legend-${guid()}`;

  private legendObserver: MutationObserver | undefined;

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

  private get slottedElements(): HTMLElement[] {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>("slot:not([name])");

    return slot ? getSlotAssignedElements<HTMLElement>(slot) : [];
  }

  //#endregion

  //#region State Properties

  @state() private hasLegend = false;

  //#endregion

  //#region Public Properties

  /** When `layout` is `"columns"`, specifies the number of columns. */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** When `true`, disables the slotted inputs. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  /** When `true`, sets slotted inputs to read-only. */
  @property({ reflect: true }) readOnly = false;

  /** When `true`, slotted input prefixes share the same width. */
  @property({ reflect: true }) prefixAutoWidth = false;

  /** Specifies the scale of the slotted inputs. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, slotted input suffixes share the same width. */
  @property({ reflect: true }) suffixAutoWidth = false;

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    super.connectedCallback();

    this.syncHasLegend();

    this.legendObserver = new MutationObserver(() => {
      this.syncHasLegend();
    });

    this.legendObserver.observe(this.el, {
      attributes: true,
      attributeFilter: ["slot"],
      childList: true,
    });
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("disabled")) {
      this.syncInputsDisabledState(changes.get("disabled"));
    }

    if (changes.has("scale")) {
      this.syncInputsScale();
    }

    if (changes.has("readOnly")) {
      this.syncInputsReadOnlyState(changes.get("readOnly"));
    }

    if (changes.has("prefixAutoWidth") || changes.has("scale") || changes.has("suffixAutoWidth")) {
      void this.syncInputsAffixWidths();
    }
  }

  override disconnectedCallback(): void {
    this.legendObserver?.disconnect();
    this.legendObserver = undefined;

    super.disconnectedCallback();
  }

  //#endregion

  //#region Private Methods

  private getInputDisabledState(input: Input["el"]): boolean {
    return input.hasAttribute("disabled") || input.disabled;
  }

  private getInputReadOnlyState(input: Input["el"]): boolean {
    return input.hasAttribute("read-only") || input.readOnly;
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
    this.syncInputsReadOnlyState();
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
    this.inputs.forEach((input) => {
      input.scale = this.scale;
    });
  }

  private syncInputsReadOnlyState(previousReadOnly = this.readOnly): void {
    const wasReadOnly = previousReadOnly;

    this.inputs?.forEach((input) => {
      if (this.readOnly) {
        if (!wasReadOnly || !this.inputReadOnlyState.has(input)) {
          this.inputReadOnlyState.set(input, this.getInputReadOnlyState(input));
        }

        input.toggleAttribute("read-only", true);
        input.readOnly = true;
        return;
      }

      if (!wasReadOnly) {
        this.inputReadOnlyState.set(input, this.getInputReadOnlyState(input));
        return;
      }

      const inputReadOnly = this.inputReadOnlyState.get(input);
      const nextReadOnly = inputReadOnly ?? this.getInputReadOnlyState(input);

      input.toggleAttribute("read-only", nextReadOnly);
      input.readOnly = nextReadOnly;
      this.inputReadOnlyState.set(input, nextReadOnly);
    });
  }

  private syncHasLegend(): void {
    this.hasLegend = Array.from(this.el.children).some(
      (element) => element.getAttribute("slot") === "legend",
    );
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <fieldset
        aria-labelledby={this.hasLegend ? this.legendId : undefined}
        class={CSS.container}
        disabled={this.disabled}
      >
        {this.hasLegend ? (
          <div class={CSS.legend} id={this.legendId}>
            <slot name="legend" />
          </div>
        ) : null}
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
