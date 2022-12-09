import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  VNode,
  Method,
  Listen
} from "@stencil/core";
import { getElementProp, getSlotted, toAriaBoolean } from "../../utils/dom";
import { CSS, TEXT, SLOTS, ICONS } from "./resources";
import { ChipColor, ItemKeyEvent, RegistryEntry, RequestedItem } from "./interfaces";
import { Appearance, DeprecatedEventPayload, Scale } from "../interfaces";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";

/**
 * @slot - A slot for adding text.
 * @slot image - A slot for adding an image.
 */
@Component({
  tag: "calcite-chip",
  styleUrl: "chip.scss",
  shadow: true
})
export class Chip implements ConditionalSlotComponent, LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteChipElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance style of the component. */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /** specify the color of the chip */
  @Prop({ reflect: true }) color: ChipColor = "neutral";

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true, mutable: true }) closable = false;

  /**
   * Accessible name for the component's close button.
   *
   * @default "Close"
   */
  @Prop() dismissLabel: string = TEXT.close;

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The component's value. */
  @Prop() value!: any;

  /** When `true`, hides the component. */
  @Prop({ reflect: true, mutable: true }) closed = false;

  /** Is the chip selectable  */
  @Prop({ reflect: true, mutable: true }) selectable = false;

  /** Is the chip selected  */
  @Prop({ reflect: true, mutable: true }) selected = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private containerEl: HTMLDivElement;

  private closeButton: HTMLButtonElement;

  /** the containing accordion element */
  private parent: HTMLCalciteChipGroupElement;

  /** position within parent */
  private itemPosition: number;

  /** what selection mode is the parent accordion in */
  private selectionMode: string;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the dismiss button is clicked.
   *
   * **Note:**: The `el` event payload props is deprecated, please use the event's `target`/`currentTarget` instead.
   */
  @Event({ cancelable: false }) calciteChipDismiss: EventEmitter<DeprecatedEventPayload>;

  /**
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalChipRegister: EventEmitter<RegistryEntry>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalChipKeyEvent: EventEmitter<ItemKeyEvent>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalChipSelect: EventEmitter<RequestedItem>;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.parent = this.el.parentElement as HTMLCalciteChipGroupElement;
    this.selectionMode = getElementProp(this.el, "selection-mode", "none");
    connectConditionalSlotComponent(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.itemPosition = this.getItemPosition();
    this.calciteInternalChipRegister.emit({
      parent: this.parent,
      position: this.itemPosition
    });
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown", { capture: true })
  keyDownHandler(event: KeyboardEvent): void {
    if (
      (event as any).path.includes(this.closeButton) &&
      (event.key === " " || event.key === "Enter")
    ) {
      this.closeHandler();
    }
    if (event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.itemSelectHandler();
          event.preventDefault();
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalChipKeyEvent.emit({
            parent: this.parent,
            item: event
          });
          event.preventDefault();
          break;
      }
    }
  }

  @Listen("calciteChipInternalSelectionChange", { target: "body" })
  updateActiveItemOnChange(event: CustomEvent): void {
    if (this.el.parentNode !== event.detail.requestedChip.parentNode) {
      return;
    }
    this.determineActiveItem(event.detail.requestedChip);
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

    this.containerEl?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private closeHandler = (): void => {
    this.closed = true;
    this.selected = false;
    this.itemSelectHandler();
    this.calciteChipDismiss.emit(this.el);
    event.stopPropagation();
  };

  private getItemPosition(): number {
    return Array.prototype.indexOf.call(this.parent.querySelectorAll("calcite-chip"), this.el);
  }

  private itemSelectHandler = (): void => {
    // q - expected to not interact when "none" ?
    if (this.selectionMode !== "none") {
      this.calciteInternalChipSelect.emit({
        requestedChip: this.el as HTMLCalciteChipElement
      });
    }
  };

  private determineActiveItem(requestedChip): void {
    switch (this.selectionMode) {
      case "multiple":
        if (this.el === requestedChip) {
          this.selected = !this.selected;
        }
        break;

      case "single":
        this.selected = this.el === requestedChip ? !this.selected : false;
        break;

      case "single-persist":
        this.selected = this.el === requestedChip;
        break;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderSelectionIcon(): VNode {
    const icon =
      this.selectionMode === "multiple" && this.selected
        ? "check-circle-f"
        : this.selectionMode === "multiple"
        ? "circle"
        : this.selected && "circle-f";

    return (
      <div
        class={`select-icon ${this.selectionMode === "multiple" || this.selected ? "active" : ""}`}
      >
        <calcite-icon class={CSS.chipIcon} icon={icon} scale={this.scale === "l" ? "m" : "s"} />
      </div>
    );
  }

  renderCloseButton(): VNode {
    return (
      <button
        aria-label={this.dismissLabel}
        class={CSS.close}
        onClick={() => this.closeHandler()}
        ref={(el) => (this.closeButton = el)}
      >
        <calcite-icon class={CSS.closeIcon} icon={ICONS.close} scale="s" />
      </button>
    );
  }

  renderImageSlot(): VNode {
    return (
      <div class={CSS.imageContainer} key="image">
        <slot name={SLOTS.image} />
      </div>
    );
  }

  renderIcon(): VNode {
    return (
      <calcite-icon class={CSS.chipIcon} flipRtl={this.iconFlipRtl} icon={this.icon} scale="s" />
    );
  }

  render(): VNode {
    const hasImageSlot = getSlotted(this.el, SLOTS.image);

    let aria = {};
    switch (this.selectionMode) {
      case "single":
      case "single-persist":
        aria = {
          "aria-checked": toAriaBoolean(this.selected),
          "aria-labelledby": this.parent,
          role: "radio"
        };
        break;
      case "multiple":
        aria = {
          "aria-checked": toAriaBoolean(this.selected),
          "aria-labelledby": this.parent,
          role: "checkbox"
        };
        break;
    }

    return (
      <div
        {...aria}
        class={`container ${this.selectable ? "cursor-pointer" : ""}`}
        onClick={this.itemSelectHandler}
        ref={(el) => (this.containerEl = el)}
        tabIndex={0}
      >
        {this.selectable && this.selectionMode !== "none" && this.renderSelectionIcon()}
        {hasImageSlot && this.renderImageSlot()}
        {this.icon && this.renderIcon()}
        <span class={CSS.title}>
          <slot />
        </span>
        {this.closable && this.renderCloseButton()}
      </div>
    );
  }
}
