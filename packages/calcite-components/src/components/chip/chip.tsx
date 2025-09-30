// @ts-strict-ignore
import { PropertyValues, isServer } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { focusElement, slotChangeHasAssignedElement } from "../../utils/dom";
import { Appearance, Kind, Scale, SelectionMode } from "../interfaces";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { getIconScale } from "../../utils/component";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { ChipGroup } from "../chip-group/chip-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS, ICONS } from "./resources";
import { styles } from "./chip.scss";

declare global {
  interface DeclareElements {
    "calcite-chip": Chip;
  }
}

/**
 * @slot - A slot for adding text.
 * @slot image - A slot for adding an image.
 */
export class Chip extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private closeButtonRef = createRef<HTMLButtonElement>();

  private containerRef = createRef<HTMLDivElement>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() private hasImage = false;

  @state() private hasText = false;

  //#endregion

  //#region Public Properties

  /** Specifies the appearance style of the component. */
  @property({ reflect: true }) appearance: Extract<
    "outline" | "outline-fill" | "solid",
    Appearance
  > = "solid";

  /** When `true`, a close button is added to the component. */
  @property({ reflect: true }) closable = false;

  /** When `true`, hides the component. */
  @property({ reflect: true }) closed = false;

  /** When `true`, the component closes when the Delete or Backspace key is pressed while focused. */
  @property({ reflect: true }) closeOnDelete = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /**
   * When true, enables the chip to be focused, and allows the `calciteChipSelect` to emit.
   * This is set to `true` by a parent Chip Group component.
   *
   * @private
   */
  @property() interactive = false;

  /** Specifies the kind of the component, which will apply to border and background if applicable. */
  @property({ reflect: true }) kind: Extract<"brand" | "inverse" | "neutral", Kind> = "neutral";

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** @private */
  @property() parentChipGroup: ChipGroup["el"];

  /** Specifies the size of the component. When contained in a parent `calcite-chip-group` inherits the parent's `scale` value. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /**
   * This internal property, managed by a containing `calcite-chip-group`, is
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

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      if (this.interactive) {
        return this.containerRef.value;
      } else if (this.closable) {
        return this.closeButtonRef.value;
      }
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's close button is selected. */
  calciteChipClose = createEvent({ cancelable: false });

  /** Fires when the selected state of the component changes. */
  calciteChipSelect = createEvent({ cancelable: false });

  /** @private */
  calciteInternalChipKeyEvent = createEvent<KeyboardEvent>({ cancelable: false });

  /** @private */
  calciteInternalChipSelect = createEvent({ cancelable: false });

  /** @private */
  calciteInternalSyncSelectedChips = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
    this.listen("click", this.clickHandler);
  }

  async load(): Promise<void> {
    if (!isServer) {
      this.updateHasText();
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selected") && this.hasUpdated) {
      this.watchSelected(this.selected);
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
        case "Backspace":
        case "Delete":
          if (this.closable && !this.closed && this.closeOnDelete) {
            event.preventDefault();
            this.close();
          }
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalChipKeyEvent.emit(event);
          event.preventDefault();
          break;
      }
    }
  }

  private clickHandler(): void {
    if (!this.interactive && this.closable) {
      focusElement(this.closeButtonRef.value);
    }
  }

  private handleDefaultSlotChange(): void {
    this.updateHasText();
  }

  private close(): void {
    this.calciteChipClose.emit();
    this.selected = false;
    this.closed = true;
  }

  private closeButtonKeyDownHandler(event: KeyboardEvent): void {
    if (isActivationKey(event.key)) {
      event.preventDefault();
      this.close();
    }
  }

  private updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }

  private handleSlotImageChange(event: Event): void {
    this.hasImage = slotChangeHasAssignedElement(event);
  }

  private handleEmittingEvent(): void {
    if (this.interactive) {
      this.calciteChipSelect.emit();
    }
  }

  private handleSelectionPropertyChange(selected: boolean): void {
    if (this.selectionMode === "single") {
      this.calciteInternalSyncSelectedChips.emit();
    }
    const selectedInParent = this.parentChipGroup.selectedItems.includes(this.el);

    if (!selectedInParent && selected && this.selectionMode !== "multiple") {
      this.calciteInternalChipSelect.emit();
    }
    if (this.selectionMode !== "single") {
      this.calciteInternalSyncSelectedChips.emit();
    }
  }

  //#endregion

  //#region Rendering

  private renderChipImage(): JsxNode {
    return (
      <div class={CSS.imageContainer}>
        <slot name={SLOTS.image} onSlotChange={this.handleSlotImageChange} />
      </div>
    );
  }

  private renderSelectionIcon(): JsxNode {
    const icon =
      this.selectionMode === "multiple"
        ? this.selected
          ? ICONS.checkedMultiple
          : ICONS.uncheckedMultiple
        : this.selected
          ? ICONS.checkedSingle
          : undefined;

    return (
      <div
        class={{
          [CSS.selectIcon]: true,
          [CSS.selectIconActive]: this.selectionMode === "multiple" || this.selected,
        }}
      >
        {icon ? <calcite-icon icon={icon} scale={getIconScale(this.scale)} /> : null}
      </div>
    );
  }

  private renderCloseButton(): JsxNode {
    return (
      <button
        ariaLabel={this.messages.dismissLabel}
        class={CSS.close}
        onClick={this.close}
        onKeyDown={this.closeButtonKeyDownHandler}
        ref={this.closeButtonRef}
        tabIndex={this.disabled ? -1 : 0}
      >
        <calcite-icon icon={ICONS.close} scale={getIconScale(this.scale)} />
      </button>
    );
  }

  private renderIcon(): JsxNode {
    return (
      <calcite-icon
        class={CSS.chipIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.icon}
        scale={getIconScale(this.scale)}
      />
    );
  }

  override render(): JsxNode {
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
            [CSS.textSlotted]: this.hasText,
            [CSS.imageSlotted]: this.hasImage,
            [CSS.selectable]: this.selectionMode !== "none",
            [CSS.multiple]: this.selectionMode === "multiple",
            [CSS.single]:
              this.selectionMode === "single" || this.selectionMode === "single-persist",
            [CSS.selected]: this.selected,
            [CSS.closable]: this.closable,
            [CSS.nonInteractive]: !this.interactive,
            [CSS.isCircle]:
              !this.closable &&
              !this.hasText &&
              (!this.icon || !this.hasImage) &&
              (this.selectionMode === "none" ||
                (!!this.selectionMode && this.selectionMode !== "multiple" && !this.selected)),
          }}
          onClick={this.handleEmittingEvent}
          ref={this.containerRef}
          role={role}
          tabIndex={disableInteraction ? -1 : 0}
        >
          {this.selectionMode !== "none" && this.renderSelectionIcon()}
          {this.renderChipImage()}
          {this.icon && this.renderIcon()}
          <span class={CSS.title}>
            <slot onSlotChange={this.handleDefaultSlotChange} />
          </span>
          {this.closable && this.renderCloseButton()}
        </div>
      </InteractiveContainer>
    );
  }

  //#endregion
}
