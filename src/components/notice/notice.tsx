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
 * @slot title - A slot for adding the title.
 * @slot message - A slot for adding the message.
 * @slot link - A slot for adding actions to take, such as: undo, try again, link to page, etc.
 * @slot actions-end - A slot for adding actions to the end of the component. It is recommended to use two or less actions.
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

  /**
   * When `true`, the component is active.
   *
   * @deprecated Use `open` instead.
   */
  @Prop({ reflect: true, mutable: true }) active = false;

  @Watch("active")
  activeHandler(value: boolean): void {
    this.open = value;
  }

  /** When `true`, the component is visible. */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(value: boolean): void {
    this.active = value;
  }

  /** The color for the component's top border and icon. */
  @Prop({ reflect: true }) color: StatusColor = "blue";

  /**
   * When `true`, a close button is added to the component.
   *
   * @deprecated use `closable` instead.
   */
  @Prop({ reflect: true }) dismissible? = false;

  @Watch("dismissible")
  handleDismissible(value: boolean): void {
    this.closable = value;
  }

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true }) closable? = false;

  @Watch("closable")
  handleClosable(value: boolean): void {
    this.dismissible = value;
  }

  /**
   * When `true`, shows a default recommended icon. Alternatively, pass a Calcite UI Icon name to display a specific icon.
   */
  @Prop({ reflect: true }) icon: string | boolean;

  /**
   * Accessible name for the close button.
   *
   * @default "Close"
   */
  @Prop({ reflect: false }) intlClose: string = TEXT.close;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the width of the component. */
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
    const isOpen = this.active || this.open;

    if (isOpen) {
      this.activeHandler(isOpen);
      this.openHandler(isOpen);
    }
    if (this.dismissible) {
      this.handleDismissible(this.dismissible);
    }
    if (this.closable) {
      this.handleClosable(this.closable);
    }
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
        {this.closable ? closeButton : null}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fired when the component is closed. */
  @Event({ cancelable: false }) calciteNoticeClose: EventEmitter<void>;

  /** Fired when the component is opened. */
  @Event({ cancelable: false }) calciteNoticeOpen: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
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
    this.open = false;
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
