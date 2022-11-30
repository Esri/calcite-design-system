import { Component, h, Prop, Event, EventEmitter, Element, VNode, Method } from "@stencil/core";
import { getSlotted } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { CSS, TEXT, SLOTS, ICONS } from "./resources";
import { ChipColor } from "./interfaces";
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
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance style of the component. */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /** Specifies the color for the component. */
  @Prop({ reflect: true }) color: ChipColor = "grey";

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true, mutable: true }) closable = false;

  /**
   * Accessible name for the component's close button.
   *
   * @default "Close"
   */
  @Prop() dismissLabel?: string = TEXT.close;

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

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteChipElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
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
        aria-label={this.dismissLabel}
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
