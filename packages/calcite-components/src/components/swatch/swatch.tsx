import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import Color from "color";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { Scale, SelectionMode } from "../interfaces";
import { componentFocusable } from "../../utils/component";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import type { SwatchGroup } from "../swatch-group/swatch-group";
import { hexify } from "../color-picker/utils";
import { CSS, SLOTS } from "./resources";
import { styles } from "./swatch.scss";

declare global {
  interface DeclareElements {
    "calcite-swatch": Swatch;
  }
}

export class Swatch extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private closeButtonEl = createRef<HTMLButtonElement>();

  private containerEl = createRef<HTMLDivElement>();

  private internalColor: Color;

  //#endregion

  //#region State Properties

  @state() private hasImage = false;

  //#endregion

  //#region Public Properties

  /**
   * The color value.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  @property() color: string | null;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * When true, enables the swatch to be focused, and allows the `calciteSwatchSelect` to emit.
   * This is set to `true` by a parent Swatch Group component.
   *
   * @private
   */
  @property() interactive = false;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** @private */
  @property() parentSwatchGroup: SwatchGroup["el"];

  /** Specifies the size of the component. When contained in a parent `calcite-swatch-group` inherits the parent's `scale` value. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /**
   * This internal property, managed by a containing `calcite-swatch-group`, is
   * conditionally set based on the `selectionMode` of the parent
   *
   * @private
   */
  @property() selectionMode: Extract<
    "multiple" | "single" | "single-persist" | "none",
    SelectionMode
  > = "none";

  /** The component's value. */
  @property() value: any;

  //#endregion

  //#region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    if (!this.disabled && this.interactive) {
      this.containerEl.value?.focus();
    } else if (!this.disabled) {
      this.closeButtonEl.value?.focus();
    }
  }

  //#endregion

  //#region Events

  /** @private */
  calciteInternalSwatchKeyEvent = createEvent<KeyboardEvent>({ cancelable: false });

  /** @private */
  calciteInternalSwatchSelect = createEvent({ cancelable: false });

  /** @private */
  calciteInternalSyncSelectedSwatches = createEvent({ cancelable: false });

  /** Fires when the component's close button is selected. */
  calciteSwatchClose = createEvent({ cancelable: false });

  /** Fires when the selected state of the component changes. */
  calciteSwatchSelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
    this.listen("click", this.clickHandler);
  }

  async load(): Promise<void> {
    this.handleColorChange(this.color);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selected") && this.hasUpdated) {
      this.watchSelected(this.selected);
    }
    if (changes.has("color")) {
      this.handleColorChange(this.color);
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    if (this.selectionMode !== "none" && this.interactive && this.selected) {
      this.handleSelectionPropertyChange(this.selected);
    }
  }

  //#endregion

  //#region Private Methods

  private watchSelected(selected: boolean): void {
    if (this.selectionMode === "none") {
      return;
    }
    this.handleSelectionPropertyChange(selected);
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.handleEmittingEvent();
          event.preventDefault();
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalSwatchKeyEvent.emit(event);
          event.preventDefault();
          break;
      }
    }
  }

  private clickHandler(): void {
    if (!this.interactive) {
      this.closeButtonEl.value.focus();
    }
  }

  private handleSlotImageChange(event: Event): void {
    this.hasImage = slotChangeHasAssignedElement(event);
  }

  private handleEmittingEvent(): void {
    if (this.interactive) {
      this.calciteSwatchSelect.emit();
    }
  }

  private handleSelectionPropertyChange(selected: boolean): void {
    if (this.selectionMode === "single") {
      this.calciteInternalSyncSelectedSwatches.emit();
    }
    const selectedInParent = this.parentSwatchGroup.selectedItems.includes(this.el);

    if (!selectedInParent && selected && this.selectionMode !== "multiple") {
      this.calciteInternalSwatchSelect.emit();
    }
    if (this.selectionMode !== "single") {
      this.calciteInternalSyncSelectedSwatches.emit();
    }
  }

  private handleColorChange(color: string | null): void {
    this.internalColor = color ? Color(color) : null;
  }

  private getFormattedColor(): JsxNode {
    const { internalColor } = this;

    const alpha = internalColor.alpha();
    //  const hex = hexify(internalColor);
    const hexa = hexify(internalColor, alpha < 1);
    // todo if hexa render opacity grid behind
    return hexa;
  }

  //#endregion

  //#region Rendering

  private renderSwatchImage(): JsxNode {
    return (
      <div class={CSS.imageContainer}>
        <slot name={SLOTS.image} onSlotChange={this.handleSlotImageChange} />
      </div>
    );
  }

  override render(): JsxNode {
    // todo
    const { disabled } = this;
    const disableInteraction = disabled || (!disabled && !this.interactive);
    const role =
      this.selectionMode === "multiple" && this.interactive
        ? "checkbox"
        : this.selectionMode !== "none" && this.interactive
          ? "radio"
          : this.interactive
            ? "button"
            : "img";
    return (
      <InteractiveContainer disabled={disabled}>
        <div
          ariaChecked={
            this.selectionMode !== "none" && this.interactive ? this.selected : undefined
          }
          ariaLabel={this.label}
          class={{
            [CSS.container]: true,
            [CSS.selectable]: this.selectionMode !== "none",
            [CSS.selected]: this.selected,
            [CSS.nonInteractive]: !this.interactive,
          }}
          onClick={this.handleEmittingEvent}
          ref={this.containerEl}
          role={role}
          style={{
            backgroundColor: this.internalColor ? this.getFormattedColor() : "",
          }}
          tabIndex={disableInteraction ? -1 : 0}
        >
          {this.renderSwatchImage()}
        </div>
      </InteractiveContainer>
    );
  }

  //#endregion
}
