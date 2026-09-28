import { LitElement, h, JsxNode, property, state } from "@arcgis/lumina";
import type { Scale } from "../types";
import { nextFrame, slotChangeGetAssignedElements } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./field-set.scss";

const controlBoundarySelector =
  "calcite-field-group, calcite-field-set, calcite-radio-button-group, calcite-segmented-control";

const originalDisabledState = Symbol("calciteFieldSetOriginalDisabledState");

type DisabledControl = HTMLElement & {
  disabled: boolean;
  [originalDisabledState]?: boolean;
};

type ScaledControl = HTMLElement & { scale: Scale };

declare global {
  interface DeclareElements {
    "calcite-field-set": FieldSet;
  }
}

/**
 * @slot - A slot for adding controls and `calcite-field-group` components to the field set.
 * @slot legend - A slot for adding legend content to the field set.
 */
export class FieldSet extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private controlsDisabledSyncQueued = false;

  private disabledControls: DisabledControl[] = [];

  private scaledControls: ScaledControl[] = [];

  //#endregion

  //#region State Properties

  @state() private hasLegendSlot = false;

  //#endregion

  //#region Public Properties

  /** When `true`, disables slotted controls. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the field set legend. */
  @property() legend?: string;

  /** Specifies the scale of the component and its slotted controls and field groups. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Lifecycle

  override updated(): void {
    this.syncControlsDisabled();
    this.syncControlsScale();

    if (this.disabled) {
      void this.queueControlsDisabledResync();
    }
  }

  //#endregion

  //#region Private Methods

  private collectOwnedControls(element: HTMLElement): HTMLElement[] {
    const controls = "disabled" in element || "scale" in element ? [element] : [];

    if (element.matches(controlBoundarySelector)) {
      return controls;
    }

    return [
      ...controls,
      ...Array.from(element.children).flatMap((child) =>
        this.collectOwnedControls(child as HTMLElement),
      ),
    ];
  }

  private handleInputSlotChange(event: Event): void {
    const slottedElements = slotChangeGetAssignedElements<HTMLElement>(event);
    const controls = slottedElements.flatMap((element) => this.collectOwnedControls(element));

    this.disabledControls = controls.filter(
      (control): control is DisabledControl => "disabled" in control,
    );
    this.scaledControls = controls.filter(
      (control): control is ScaledControl => "scale" in control,
    );

    this.syncControlsDisabled();
    this.syncControlsScale();

    if (this.disabled) {
      void this.queueControlsDisabledResync();
    }
  }

  private handleLegendSlotChange(event: Event): void {
    this.hasLegendSlot = (event.target as HTMLSlotElement).assignedElements().length > 0;
  }

  private async queueControlsDisabledResync(): Promise<void> {
    if (this.controlsDisabledSyncQueued) {
      return;
    }

    this.controlsDisabledSyncQueued = true;

    await nextFrame();

    this.controlsDisabledSyncQueued = false;

    if (this.disabled) {
      this.syncControlsDisabled();
    }
  }

  private syncControlsDisabled(): void {
    const controls = this.disabledControls;

    if (this.disabled) {
      controls.forEach((control) => {
        if (control[originalDisabledState] === undefined) {
          control[originalDisabledState] = control.disabled;
        }

        control.disabled = true;
      });

      return;
    }

    controls.forEach((control) => {
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
          <slot onSlotChange={this.handleInputSlotChange} />
        </div>
      </fieldset>
    );
  }

  //#endregion
}
