import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  VNode,
  Watch
} from "@stencil/core";

import { CSS, SLOTS, TEXT } from "./resources";
import { Scale, Width } from "../interfaces";
import { StatusColor, StatusIcons } from "../alert/interfaces";
import { getSlotted, setRequestedIcon } from "../../utils/dom";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";

/**
 * Notices are intended to be used to present users with important-but-not-crucial contextual tips or copy. Because
 * notices are displayed inline, a common use case is displaying them on page-load to present users with short hints or contextual copy.
 * They are optionally dismissible - useful for keeping track of whether or not a user has dismissed the notice. You can also choose not
 * to display a notice on page load and set the "active" attribute as needed to contextually provide inline messaging to users.
 */

/**
 * @slot title - A slot for adding the title (optional).
 * @slot message - A slot for adding the message.
 * @slot link - A slot for adding actions to take, such as: undo, try again, link to page, etc. (optional).
 * @slot actions-end - A slot for adding actions to the end of the `calcite-notice` (optional). It is recommended to use two or less actions.
 */

@Component({
  tag: "calcite-notice",
  styleUrl: "notice.scss",
  shadow: true
})
export class Notice implements ConditionalSlotComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNoticeElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------------------------------

  /** When true, the `calcite-notice` is active. */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** The color for the `calcite-notice`. Color will apply to top border and icon. */
  @Prop({ reflect: true }) color: StatusColor = "blue";

  /** Shows a button the user can click to dismiss the `calcite-notice`. */
  @Prop({ reflect: true }) dismissible? = false;

  /**
   * When present, shows a default recommended icon. You can
   * also pass a calcite-ui-icon name to display a requested icon.
   */
  @Prop({ reflect: true }) icon: string | boolean;

  /**
   * Accessible label for the close button.
   *
   * @default "Close"
   */
  @Prop({ reflect: false }) intlClose: string = TEXT.close;

  /** Specify the scale of `calcite-notice`. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specify the width of the `calcite-notice`. */
  @Prop({ reflect: true }) width: Width = "auto";

  @Watch("icon")
  @Watch("color")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  componentWillLoad(): void {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }

  render(): VNode {
    const { el } = this;
    const closeButton = (
      <button
        aria-label={this.intlClose}
        class={CSS.close}
        onClick={this.close}
        ref={(el) => (this.closeButton = el)}
      >
        <calcite-icon icon="x" scale={this.scale === "l" ? "m" : "s"} />
      </button>
    );

    const hasActionEnd = getSlotted(el, SLOTS.actionsEnd);

    return (
      <div class={CSS.container}>
        {this.requestedIcon ? (
          <div class={CSS.icon}>
            <calcite-icon icon={this.requestedIcon} scale={this.scale === "l" ? "m" : "s"} />
          </div>
        ) : null}
        <div class={CSS.content}>
          <slot name={SLOTS.title} />
          <slot name={SLOTS.message} />
          <slot name={SLOTS.link} />
        </div>
        {hasActionEnd ? (
          <div class={CSS.actionsEnd}>
            <slot name={SLOTS.actionsEnd} />
          </div>
        ) : null}
        {this.dismissible ? closeButton : null}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fired when `calcite-notice` is closed. */
  @Event() calciteNoticeClose: EventEmitter;

  /** Fired when `calcite-notice` is opened. */
  @Event() calciteNoticeOpen: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the `calcite-notice`. */
  @Method()
  async setFocus(): Promise<void> {
    const noticeLinkEl = this.el.querySelector("calcite-link");

    if (!this.closeButton && !noticeLinkEl) {
      return;
    }
    if (noticeLinkEl) {
      noticeLinkEl.setFocus();
    } else if (this.closeButton) {
      this.closeButton.focus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private close = (): void => {
    this.active = false;
    this.calciteNoticeClose.emit();
  };

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** The close button element. */
  private closeButton?: HTMLButtonElement;

  /** The computed icon to render. */
  private requestedIcon?: string;
}
