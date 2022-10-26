import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  VNode,
  Method,
  Watch,
  State
} from "@stencil/core";
import { getSlotted } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { CSS, SLOTS, ICONS } from "./resources";
import { ChipColor } from "./interfaces";
import { Appearance, DeprecatedEventPayload, Scale } from "../interfaces";
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
  updateMessages
} from "../../utils/t9n";
import { connectLocalized, disconnectLocalized } from "../../utils/locale";

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
export class Chip implements ConditionalSlotComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance style of the component. */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "clear", Appearance> = "solid";

  /** Specifies the color for the component. */
  @Prop({ reflect: true }) color: ChipColor = "grey";

  /**
   * When `true`, a close button is added to the component.
   *
   * @deprecated use `closable` instead.
   */
  @Prop({ reflect: true, mutable: true }) dismissible = false;

  @Watch("dismissible")
  handleDismissible(value: boolean): void {
    this.closable = value;
  }

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true, mutable: true }) closable = false;

  @Watch("closable")
  handleClosable(value: boolean): void {
    this.dismissible = value;
  }

  /**
   * Accessible name for the component's close button.
   *
   * @default "Close"
   * @deprecated – translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() dismissLabel?: string;

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon?: string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The component's value. */
  @Prop() value!: any;

  /** When `true`, hides the component. */
  @Prop({ reflect: true, mutable: true }) closed = false;

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

  @Watch("dismissLabel")
  @Watch("defaultMessages")
  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private State/Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteChipElement;

  @State() defaultMessages: Messages;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    if (this.dismissible) {
      this.handleDismissible(this.dismissible);
    }
    if (this.closable) {
      this.handleClosable(this.closable);
    }
    connectLocalized(this);
    connectMessages(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.closeButton?.focus();
  }

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

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  closeClickHandler = (event: MouseEvent): void => {
    event.preventDefault();
    this.calciteChipDismiss.emit(this.el);
    this.closed = true;
  };

  private closeButton: HTMLButtonElement;

  private guid: string = guid();

  getExtraMessageOverrides(): Partial<Messages> {
    const extraOverrides: Partial<Messages> = {};

    if (this.dismissLabel) {
      extraOverrides.dismissLabel = this.dismissLabel;
    }

    return extraOverrides;
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderChipImage(): VNode {
    const { el } = this;
    const hasChipImage = getSlotted(el, SLOTS.image);

    return hasChipImage ? (
      <div class={CSS.imageContainer} key="image">
        <slot name={SLOTS.image} />
      </div>
    ) : null;
  }

  render(): VNode {
    const iconEl = (
      <calcite-icon class={CSS.chipIcon} flipRtl={this.iconFlipRtl} icon={this.icon} scale="s" />
    );

    const closeButton = (
      <button
        aria-describedby={this.guid}
        aria-label={this.messages.dismissLabel}
        class={CSS.close}
        onClick={this.closeClickHandler}
        ref={(el) => (this.closeButton = el)}
      >
        <calcite-icon class={CSS.closeIcon} icon={ICONS.close} scale="s" />
      </button>
    );

    return (
      <div class="container">
        {this.renderChipImage()}
        {this.icon ? iconEl : null}
        <span class={CSS.title} id={this.guid}>
          <slot />
        </span>
        {this.closable ? closeButton : null}
      </div>
    );
  }
}
