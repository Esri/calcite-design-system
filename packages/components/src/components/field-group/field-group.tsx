import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import type { Input } from "../input/input";
import type { InputNumber } from "../input-number/input-number";
import type { InputText } from "../input-text/input-text";
import type { Autocomplete } from "../autocomplete/autocomplete";
import type { Scale } from "../types";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./field-group.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

const originalDisabledState = Symbol("calciteFieldGroupOriginalDisabledState");

const controlBoundarySelector =
  "calcite-field-group, calcite-field-set, calcite-radio-button-group, calcite-segmented-control";
const affixInputSelector =
  "calcite-autocomplete, calcite-input, calcite-input-number, calcite-input-text";

type DisabledControl = HTMLElement & {
  disabled: boolean;
  [originalDisabledState]?: boolean;
};

type ScaledControl = HTMLElement & { scale: Scale };

type Affix = "prefix" | "suffix";

type AffixInput = Autocomplete["el"] | Input["el"] | InputNumber["el"] | InputText["el"];

type PreviousAffixStyle = {
  priority: string;
  value: string;
};

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

  private affixWidthRequestIds = {
    prefix: 0,
    suffix: 0,
  };

  private previousAffixStyles = new WeakMap<
    AffixInput,
    Partial<Record<Affix, PreviousAffixStyle>>
  >();

  private controlElements: HTMLElement[] = [];

  private affixInputs: AffixInput[] = [];

  private get disabledControls(): DisabledControl[] {
    return this.controlElements.filter(
      (element): element is DisabledControl => "disabled" in element,
    );
  }

  private get scaledControls(): ScaledControl[] {
    return this.controlElements.filter((element): element is ScaledControl => "scale" in element);
  }

  //#endregion

  //#region Public Properties

  /** When `true`, disables slotted controls and propagates to Field Groups and Field Sets. */
  @property({ reflect: true }) disabled = false;

  /** When `layout` is `"columns"`, specifies the number of columns in the Field Group it's applied to (does not propagate). */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** Specifies the component layout of the Field Group it's applied to (does not propagate). */
  @property({ reflect: true }) layout: Layout = "vertical";

  /** When `true`, slotted input component prefixes share the same width within the Field Group it's applied to (does not propagate). */
  @property({ reflect: true }) prefixAutoWidth = false;

  /** Specifies the scale of slotted controls, Field Groups, and Field Sets. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, slotted input component suffixes share the same width within the Field Group it's applied to (does not propagate). */
  @property({ reflect: true }) suffixAutoWidth = false;

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalInputAffixChange", this.handleAffixChange);
  }

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

  private handleSlotChange(event: Event): void {
    const slottedElements = slotChangeGetAssignedElements<HTMLElement>(event);

    this.controlElements = slottedElements.flatMap((element) =>
      [element, ...element.querySelectorAll<HTMLElement>("*")].filter(
        (control) => control.parentElement?.closest(controlBoundarySelector) === this.el,
      ),
    );
    this.affixInputs = slottedElements
      .flatMap((element) => [
        ...(element.matches(affixInputSelector) ? [element] : []),
        ...element.querySelectorAll<AffixInput>(affixInputSelector),
      ])
      .filter((input): input is AffixInput => input.closest("calcite-field-group") === this.el);

    this.syncControlsScale();
    this.syncControlsDisabled();

    if (this.disabled) {
      void this.queueControlsDisabledResync();
    }

    void this.syncInputsAffixWidths();
  }

  private async getInputAffixWidth(input: AffixInput, affix: Affix): Promise<number> {
    const readyInput = input as Input["el"] & {
      componentOnReady?: () => Promise<void>;
      updateComplete?: Promise<unknown>;
    };

    await readyInput.componentOnReady?.();
    await readyInput.updateComplete;

    return Math.ceil(this.getInputAffixElement(input, affix)?.getBoundingClientRect().width ?? 0);
  }

  private getInputAffixTrailingWidth(input: AffixInput, affix: Affix): number {
    if (affix !== "suffix" || !input.matches("calcite-input-number")) {
      return 0;
    }

    return Math.ceil(
      input.shadowRoot
        ?.querySelector<HTMLElement>(".number-button-wrapper")
        ?.getBoundingClientRect().width ?? 0,
    );
  }

  private getAffixInput(input: AffixInput): AffixInput | undefined {
    return input.matches("calcite-autocomplete")
      ? (input.shadowRoot?.querySelector<Input["el"]>("calcite-input") ?? undefined)
      : input;
  }

  private getInputAffixElement(input: AffixInput, affix: Affix): HTMLElement | undefined {
    return (
      this.getAffixInput(input)?.shadowRoot?.querySelector<HTMLElement>(`.${affix}`) ?? undefined
    );
  }

  private handleAffixChange(): void {
    void this.syncInputsAffixWidths();
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

  private async syncInputAffixWidth(affix: Affix, shouldSync: boolean): Promise<void> {
    const requestId = ++this.affixWidthRequestIds[affix];
    const inputs = this.affixInputs;

    inputs.forEach((input) => {
      const affixElement = this.getInputAffixElement(input, affix);

      if (!affixElement) {
        return;
      }

      const previousStyles = this.previousAffixStyles.get(input) ?? {};

      if (!previousStyles[affix]) {
        previousStyles[affix] = {
          priority: affixElement.style.getPropertyPriority("width"),
          value: affixElement.style.width,
        };
        this.previousAffixStyles.set(input, previousStyles);
      }

      affixElement.style.removeProperty("width");
    });

    if (!shouldSync) {
      inputs.forEach((input) => {
        const affixElement = this.getInputAffixElement(input, affix);
        const previousStyles = this.previousAffixStyles.get(input);
        const previousStyle = previousStyles?.[affix];

        if (affixElement) {
          if (previousStyle?.value) {
            affixElement.style.setProperty("width", previousStyle.value, previousStyle.priority);
          } else {
            affixElement.style.removeProperty("width");
          }
        }

        if (previousStyles) {
          delete previousStyles[affix];
        }
      });

      return;
    }

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    if (requestId !== this.affixWidthRequestIds[affix]) {
      return;
    }

    const nextWidth = Math.max(
      0,
      ...(await Promise.all(
        inputs.map(
          async (input) =>
            (await this.getInputAffixWidth(input, affix)) +
            this.getInputAffixTrailingWidth(input, affix),
        ),
      )),
    );

    if (requestId !== this.affixWidthRequestIds[affix]) {
      return;
    }

    inputs.forEach((input) => {
      const affixElement = this.getInputAffixElement(input, affix);

      if (affixElement && nextWidth) {
        affixElement.style.width = `${nextWidth - this.getInputAffixTrailingWidth(input, affix)}px`;
      }
    });
  }

  private async syncInputsAffixWidths(): Promise<void> {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await this.syncInputAffixWidth("prefix", this.prefixAutoWidth);
    await this.syncInputAffixWidth("suffix", this.suffixAutoWidth);
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
