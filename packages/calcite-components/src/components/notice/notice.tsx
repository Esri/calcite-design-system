import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted, setRequestedIcon } from "../../utils/dom";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Kind, Scale, Width } from "../interfaces";
import { KindIcons } from "../resources";
import { NoticeMessages } from "./assets/notice/t9n";
import { CSS, SLOTS } from "./resources";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";

/**
 * Notices are intended to be used to present users with important-but-not-crucial contextual tips or copy. Because
 * notices are displayed inline, a common use case is displaying them on page-load to present users with short hints or contextual copy.
 * They are optionally closable - useful for keeping track of whether or not a user has closed the notice. You can also choose not
 * to display a notice on page load and set the "active" attribute as needed to contextually provide inline messaging to users.
 */

/**
 * @slot title - A slot for adding the title.
 * @slot message - A slot for adding the message.
 * @slot link - A slot for adding a `calcite-action` to take, such as: "undo", "try again", "link to page", etc.
 * @slot actions-end - A slot for adding `calcite-action`s to the end of the component. It is recommended to use two or less actions.
 */

@Component({
  tag: "calcite-notice",
  styleUrl: "notice.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Notice
  implements
    ConditionalSlotComponent,
    LoadableComponent,
    T9nComponent,
    LocalizedComponent,
    OpenCloseComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------------------------------

  /** When `true`, the component is visible. */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    onToggleOpenCloseComponent(this);
  }

  /** Specifies the kind of the component (will apply to top border and icon). */
  @Prop({ reflect: true }) kind: Extract<
    "brand" | "danger" | "info" | "success" | "warning",
    Kind
  > = "brand";

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true }) closable = false;

  /**
   * When `true`, shows a default recommended icon. Alternatively, pass a Calcite UI Icon name to display a specific icon.
   */
  @Prop({ reflect: true }) icon: string | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the width of the component. */
  @Prop({ reflect: true }) width: Width = "auto";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: NoticeMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<NoticeMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  @Watch("icon")
  @Watch("kind")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    connectLocalized(this);
    connectMessages(this);

    if (this.open) {
      this.openHandler();
    }
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    this.requestedIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  render(): VNode {
    const { el } = this;
    const closeButton = (
      <button
        aria-label={this.messages.close}
        class={CSS.close}
        onClick={this.close}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={(el) => (this.closeButton = el)}
      >
        <calcite-icon icon="x" scale={this.scale === "l" ? "m" : "s"} />
      </button>
    );

    const hasActionEnd = getSlotted(el, SLOTS.actionsEnd);

    return (
      <div
        class={CSS.container}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.setTransitionEl}
      >
        {this.requestedIcon ? (
          <div class={CSS.icon}>
            <calcite-icon
              flipRtl={this.iconFlipRtl}
              icon={this.requestedIcon}
              scale={this.scale === "l" ? "m" : "s"}
            />
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

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteNoticeBeforeClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteNoticeBeforeOpen: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteNoticeClose: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteNoticeOpen: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    const noticeLinkEl = this.el.querySelector("calcite-link");

    if (!this.closeButton && !noticeLinkEl) {
      return;
    }
    if (noticeLinkEl) {
      return noticeLinkEl.setFocus();
    } else if (this.closeButton) {
      this.closeButton.focus();
    }
  }

  onBeforeClose(): void {
    this.calciteNoticeBeforeClose.emit();
  }

  onBeforeOpen(): void {
    this.calciteNoticeBeforeOpen.emit();
  }

  onClose(): void {
    this.calciteNoticeClose.emit();
  }

  onOpen(): void {
    this.calciteNoticeOpen.emit();
  }

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
  };

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private close = (): void => {
    this.open = false;
  };

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNoticeElement;

  /** The close button element. */
  private closeButton?: HTMLButtonElement;

  /** The computed icon to render. */
  private requestedIcon?: string;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: NoticeMessages;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;
}
