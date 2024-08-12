import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  getSlotted,
  setRequestedIcon,
  slotChangeHasAssignedElement,
  toAriaBoolean,
} from "../../utils/dom";
import { MenuPlacement } from "../../utils/floating-ui";
import { getIconScale } from "../../utils/component";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectLocalized,
  disconnectLocalized,
  NumberingSystem,
  NumberStringFormat,
} from "../../utils/locale";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Kind, Scale } from "../interfaces";
import { KindIcons } from "../resources";
import { IconNameOrString } from "../icon/interfaces";
import { AlertMessages } from "./assets/alert/t9n";
import { AlertDuration } from "./interfaces";
import { CSS, DURATIONS, SLOTS } from "./resources";
import AlertManager from "./AlertManager";

const manager = new AlertManager();

/**
 * Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided.
 */

/**
 * @slot title - A slot for adding a title to the component.
 * @slot message - A slot for adding main text to the component.
 * @slot link - A slot for adding a `calcite-action` to take from the component such as: "undo", "try again", "link to page", etc.
 * @slot actions-end - A slot for adding `calcite-action`s to the end of the component. It is recommended to use two or fewer actions.
 */

@Component({
  tag: "calcite-alert",
  styleUrl: "alert.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Alert implements OpenCloseComponent, LoadableComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------------------------------

  /**
   * This internal property, managed by the AlertManager, is used
   * to inform the component if it is the active open Alert.
   *
   * @internal
   */
  @Prop() active = false;

  @Watch("active")
  handleActiveChange(): void {
    this.clearAutoCloseTimeout();
    if (this.active && this.autoClose && !this.autoCloseTimeoutId) {
      this.initialOpenTime = Date.now();
      this.autoCloseTimeoutId = window.setTimeout(
        () => this.closeAlert(),
        DURATIONS[this.autoCloseDuration],
      );
    }
  }

  /**
   * This internal property, managed by the AlertManager, is used
   * to inform the component of how many alerts are currently open.
   *
   * @internal
   */
  @Prop() activeAlertCount = 0;

  /** When `true`, displays and positions the component. */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    onToggleOpenCloseComponent(this);
    if (this.open) {
      manager.registerElement(this.el);
    } else {
      manager.unregisterElement(this.el);
    }
  }

  /** When `true`, the component closes automatically. Recommended for passive, non-blocking alerts. */
  @Prop({ reflect: true }) autoClose = false;

  /** Specifies the duration before the component automatically closes - only use with `autoClose`. */
  @Prop({ reflect: true }) autoCloseDuration: AlertDuration = "medium";

  @Watch("autoCloseDuration")
  updateDuration(): void {
    if (this.autoClose && this.autoCloseTimeoutId) {
      this.clearAutoCloseTimeout();
      this.autoCloseTimeoutId = window.setTimeout(
        () => this.closeAlert(),
        DURATIONS[this.autoCloseDuration],
      );
    }
  }

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @internal
   */
  @Prop({ mutable: true }) embedded = false;

  /** Specifies the kind of the component, which will apply to top border and icon. */
  @Prop({ reflect: true }) kind: Extract<
    "brand" | "danger" | "info" | "success" | "warning",
    Kind
  > = "brand";

  /**
   * When `true`, shows a default recommended icon. Alternatively,
   * pass a Calcite UI Icon name to display a specific icon.
   */
  @Prop({ reflect: true }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Specifies an accessible name for the component. */
  @Prop() label!: string;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop({ reflect: true }) numberingSystem: NumberingSystem;

  /** Specifies the placement of the component. */
  @Prop({ reflect: true }) placement: MenuPlacement = "bottom";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: AlertMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<AlertMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /** Specifies the priority of the component. urgent alerts will be shown first. */
  @Prop({ reflect: true }) urgent = false;

  @Watch("urgent")
  handleUrgentChange(): void {
    if (this.open && this.urgent) {
      manager.unregisterElement(this.el);
      manager.registerElement(this.el);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);

    const open = this.open;

    if (open) {
      manager.registerElement(this.el);
    }

    this.numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      signDisplay: "always",
    };
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
    if (this.open) {
      onToggleOpenCloseComponent(this);
    }
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    manager.unregisterElement(this.el);
    this.clearAutoCloseTimeout();
    disconnectLocalized(this);
    disconnectMessages(this);
    this.embedded = false;
  }

  render(): VNode {
    const { open, autoClose, label, placement, active, activeAlertCount } = this;
    const role = autoClose ? "alert" : "alertdialog";
    const hidden = !open;
    const effectiveIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
    const hasQueuedAlerts = activeAlertCount > 1;

    return (
      <Host
        aria-hidden={toAriaBoolean(hidden)}
        aria-label={label}
        calcite-hydrated-hidden={hidden}
        role={role}
      >
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerActive]: active,
            [`${CSS.container}--${placement}`]: true,
            [CSS.containerEmbedded]: this.embedded,
            [CSS.focused]: this.isFocused,
          }}
          onPointerEnter={this.autoClose && this.autoCloseTimeoutId ? this.handleMouseOver : null}
          onPointerLeave={this.autoClose ? this.handleMouseLeave : null}
          ref={this.setTransitionEl}
        >
          {effectiveIcon && this.renderIcon(effectiveIcon)}
          <div
            class={CSS.textContainer}
            onFocusin={this.autoClose && this.autoCloseTimeoutId ? this.handleKeyBoardFocus : null}
            onFocusout={this.autoClose ? this.handleKeyBoardBlur : null}
          >
            <slot name={SLOTS.title} />
            <slot name={SLOTS.message} />
            <slot name={SLOTS.link} />
          </div>
          {this.renderActionsEnd()}
          {hasQueuedAlerts ? this.renderQueueCount() : null}
          {this.renderCloseButton()}
          {open && active && autoClose ? <div class={CSS.dismissProgress} /> : null}
        </div>
      </Host>
    );
  }

  private handleKeyBoardFocus = (): void => {
    this.isFocused = true;
    this.handleFocus();
  };

  private handleKeyBoardBlur = (): void => {
    this.isFocused = false;
    if (!this.isHovered) {
      this.handleBlur();
    }
  };

  private renderCloseButton(): VNode {
    return (
      <button
        aria-label={this.messages.close}
        class={CSS.close}
        key="close"
        onClick={this.closeAlert}
        onFocusin={this.autoClose ? this.handleKeyBoardFocus : null}
        onFocusout={this.autoClose ? this.handleKeyBoardBlur : null}
        ref={(el) => (this.closeButton = el)}
        type="button"
      >
        <calcite-icon icon="x" scale={getIconScale(this.scale)} />
      </button>
    );
  }

  private renderQueueCount(): VNode {
    const { activeAlertCount } = this;
    const queueNumber = activeAlertCount > 2 ? activeAlertCount - 1 : 1;
    const queueText = this.numberStringFormatter.numberFormatter.format(queueNumber);

    return (
      <div
        class={{
          [CSS.queueCount]: true,
          [CSS.queueCountActive]: activeAlertCount > 1,
        }}
        key="queue-count"
      >
        <calcite-chip scale={this.scale} value={queueText}>
          {queueText}
        </calcite-chip>
      </div>
    );
  }

  private renderActionsEnd(): VNode {
    return (
      <div class={CSS.actionsEnd}>
        <slot name={SLOTS.actionsEnd} onSlotchange={this.actionsEndSlotChangeHandler} />
      </div>
    );
  }

  private renderIcon(icon: IconNameOrString): VNode {
    return (
      <div class={CSS.icon}>
        <calcite-icon flipRtl={this.iconFlipRtl} icon={icon} scale={getIconScale(this.scale)} />
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteAlertBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteAlertClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteAlertBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteAlertOpen: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's "close" button, the first focusable item. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    const alertLinkEl: HTMLCalciteLinkElement = getSlotted(this.el, { selector: "calcite-link" });

    if (!this.closeButton && !alertLinkEl) {
      return;
    } else if (alertLinkEl) {
      return alertLinkEl.setFocus();
    } else if (this.closeButton) {
      this.closeButton.focus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAlertElement;

  @State() defaultMessages: AlertMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
    this.numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      signDisplay: "always",
    };
  }

  @State() numberStringFormatter = new NumberStringFormat();

  @Watch("numberingSystem")
  numberingSystemChange(): void {
    this.numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      signDisplay: "always",
    };
  }

  @State() hasEndActions = false;

  @State() isFocused = false;

  private autoCloseTimeoutId: number = null;

  private closeButton: HTMLButtonElement;

  private initialOpenTime: number;

  private lastMouseOverBegin: number;

  private totalOpenTime = 0;

  private totalHoverTime = 0;

  private isHovered: boolean;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private clearAutoCloseTimeout = (): void => {
    window.clearTimeout(this.autoCloseTimeoutId);
    this.autoCloseTimeoutId = null;
  };

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
  };

  /** close and emit calciteInternalAlertSync event with the updated queue payload */
  private closeAlert = (): void => {
    this.open = false;
    this.clearAutoCloseTimeout();
  };

  onBeforeOpen(): void {
    this.calciteAlertBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteAlertOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteAlertBeforeClose.emit();
  }

  onClose(): void {
    this.calciteAlertClose.emit();
  }

  private actionsEndSlotChangeHandler = (event: Event): void => {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  };

  private handleMouseOver = (): void => {
    this.isHovered = true;
    this.handleFocus();
  };

  private handleMouseLeave = (): void => {
    this.isHovered = false;
    if (!this.isFocused) {
      this.handleBlur();
    }
  };

  private handleFocus = (): void => {
    this.clearAutoCloseTimeout();
    this.totalOpenTime = Date.now() - this.initialOpenTime;
    this.lastMouseOverBegin = Date.now();
  };

  private handleBlur = (): void => {
    const hoverDuration = Date.now() - this.lastMouseOverBegin;
    const timeRemaining =
      DURATIONS[this.autoCloseDuration] - this.totalOpenTime + this.totalHoverTime;
    this.totalHoverTime = this.totalHoverTime ? hoverDuration + this.totalHoverTime : hoverDuration;
    this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), timeRemaining);
  };
}
