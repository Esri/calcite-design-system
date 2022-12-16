import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  VNode,
  Method,
  Listen,
  Build,
  State,
  Watch
} from "@stencil/core";
import { getElementProp, toAriaBoolean } from "../../utils/dom";
import { CSS, SLOTS, ICONS } from "./resources";
import { ItemKeyEvent, RegistryEntry, RequestedItem } from "./interfaces";
import { Appearance, Kind, Scale } from "../interfaces";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { Messages } from "./assets/chip/t9n";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { slotChangeHasAssignedElement } from "../../utils/dom";

/**
 * @slot - A slot for adding text.
 * @slot image - A slot for adding an image.
 */
@Component({
  tag: "calcite-chip",
  styleUrl: "chip.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Chip
  implements ConditionalSlotComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
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
  @Prop({ reflect: true }) appearance: Extract<"outline" | "outline-fill" | "solid", Appearance> =
    "solid";

  /** Specifies the kind of the component (will apply to border and background if applicable). */
  @Prop({ reflect: true }) kind: Extract<"brand" | "inverse" | "neutral", Kind> = "neutral";

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true, mutable: true }) closable = false;

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

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<Messages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: Messages;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties / State
  //
  //--------------------------------------------------------------------------
  @State() defaultMessages: Messages;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  private mutationObserver = createObserver("mutation", () => this.updateHasContent());

  private closeButton: HTMLButtonElement;

  /** determine if there is slotted content for styling purposes */
  @State() private hasContent = false;

  /** determine if there is slotted image for styling purposes */
  @State() private hasImage = false;

  private containerEl: HTMLDivElement;

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
   * Fires when the close button is clicked.
   */
  @Event({ cancelable: false }) calciteChipClose: EventEmitter<void>;

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
    connectLocalized(this);
    connectMessages(this);
    this.setupTextContentObserver();
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
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    if (Build.isBrowser) {
      await setUpMessages(this);
      this.updateHasContent();
    }
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
      this.closeHandler(event);
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

  private closeHandler = (event): void => {
    this.calciteChipClose.emit();
    this.closed = true;
    this.selected = false;
    this.itemSelectHandler();
    event.stopPropagation();
  };

  private getItemPosition(): number {
    return Array.prototype.indexOf.call(this.parent.querySelectorAll("calcite-chip"), this.el);
  }

  private updateHasContent() {
    const slottedContent = this.el.textContent.trim().length > 0 || this.el.childNodes.length > 0;
    this.hasContent =
      this.el.childNodes.length > 0 && this.el.childNodes[0]?.nodeName === "#text"
        ? this.el.textContent?.trim().length > 0
        : slottedContent;
  }

  private setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  private handleSlotImageChange = (event: Event): void => {
    this.hasImage = slotChangeHasAssignedElement(event);
  };

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

  renderChipImage(): VNode {
    return (
      <div class={CSS.imageContainer} key="image">
        <slot name={SLOTS.image} onSlotchange={this.handleSlotImageChange} />
      </div>
    );
  }

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
        aria-label={this.messages.dismissLabel}
        class={CSS.close}
        onClick={(event) => this.closeHandler(event)}
        ref={(el) => (this.closeButton = el)}
      >
        <calcite-icon
          class={CSS.closeIcon}
          icon={ICONS.close}
          scale={this.scale === "l" ? "m" : "s"}
        />
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
        class={{
          [CSS.container]: true,
          [CSS.contentSlotted]: this.hasContent,
          [CSS.imageSlotted]: this.hasImage
        }}
        onClick={this.itemSelectHandler}
        ref={(el) => (this.containerEl = el)}
        tabIndex={0}
      >
        {this.selectable && this.selectionMode !== "none" && this.renderSelectionIcon()}
        {this.renderChipImage()}
        {this.icon && this.renderIcon()}
        <span class={CSS.title}>
          <slot />
        </span>
        {this.closable && this.renderCloseButton()}
      </div>
    );
  }
}
