import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
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
  numberStringFormatter,
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
import { AlertMessages } from "./assets/alert/t9n";
import { AlertDuration, Sync, Unregister } from "./interfaces";
import { CSS, DURATIONS, SLOTS } from "./resources";

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

  /** When `true`, displays and positions the component. */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    onToggleOpenCloseComponent(this);
    if (this.open && !this.queued) {
      this.calciteInternalAlertRegister.emit();
    }
    if (!this.open) {
      this.queue = this.queue.filter((el) => el !== this.el);
      this.calciteInternalAlertSync.emit({ queue: this.queue });
    }
  }

  /** When `true`, the component closes automatically. Recommended for passive, non-blocking alerts. */
  @Prop({ reflect: true }) autoClose = false;

  /** Specifies the duration before the component automatically closes - only use with `autoClose`. */
  @Prop({ reflect: true }) autoCloseDuration: AlertDuration = "medium";

  /** Specifies the kind of the component, which will apply to top border and icon. */
  @Prop({ reflect: true }) kind: Extract<
    "brand" | "danger" | "info" | "success" | "warning",
    Kind
  > = "brand";

  /**
   * When `true`, shows a default recommended icon. Alternatively,
   * pass a Calcite UI Icon name to display a specific icon.
   */
  @Prop({ reflect: true }) icon: string | boolean;

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

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @internal
   */
  @Prop({ mutable: true }) slottedInShell: boolean;

  @Watch("autoCloseDuration")
  updateDuration(): void {
    if (this.autoClose && this.autoCloseTimeoutId) {
      window.clearTimeout(this.autoCloseTimeoutId);
      this.autoCloseTimeoutId = window.setTimeout(
        () => this.closeAlert(),
        DURATIONS[this.autoCloseDuration],
      );
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
    if (open && !this.queued) {
      this.calciteInternalAlertRegister.emit();
    }
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
    window.dispatchEvent(
      new CustomEvent<Unregister>("calciteInternalAlertUnregister", {
        detail: { alert: this.el },
      }),
    );
    window.clearTimeout(this.autoCloseTimeoutId);
    window.clearTimeout(this.queueTimeout);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.slottedInShell = false;
  }

  render(): VNode {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      signDisplay: "always",
    };

    const { open, autoClose, label, placement, queued } = this;
    const role = autoClose ? "alert" : "alertdialog";
    const hidden = !open;
    const effectiveIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
    const hasQueuedAlerts = this.queueLength > 1;

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
            [CSS.containerQueued]: queued,
            [`${CSS.container}--${placement}`]: true,
            [CSS.containerSlottedInShell]: this.slottedInShell,
          }}
          onPointerEnter={this.autoClose && this.autoCloseTimeoutId ? this.handleMouseOver : null}
          onPointerLeave={this.autoClose && this.autoCloseTimeoutId ? this.handleMouseLeave : null}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setTransitionEl}
        >
          {effectiveIcon && this.renderIcon(effectiveIcon)}
          <div class={CSS.textContainer}>
            <slot name={SLOTS.title} />
            <slot name={SLOTS.message} />
            <slot name={SLOTS.link} />
          </div>
          {this.renderActionsEnd()}
          {hasQueuedAlerts ? this.renderQueueCount() : null}
          {this.renderCloseButton()}
          {open && !queued && autoClose ? <div class={CSS.dismissProgress} /> : null}
        </div>
      </Host>
    );
  }

  private renderCloseButton(): VNode {
    return (
      <button
        aria-label={this.messages.close}
        class={CSS.close}
        key="close"
        onClick={this.closeAlert}
        type="button"
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={(el) => (this.closeButton = el)}
      >
        <calcite-icon icon="x" scale={getIconScale(this.scale)} />
      </button>
    );
  }

  private renderQueueCount(): VNode {
    const queueNumber = this.queueLength > 2 ? this.queueLength - 1 : 1;
    const queueText = numberStringFormatter.numberFormatter.format(queueNumber);

    return (
      <div
        class={{
          [CSS.queueCount]: true,
          [CSS.queueCountActive]: this.queueLength > 1,
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

  private renderIcon(icon: string): VNode {
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

  /**
   * Fires to sync queue when opened or closed.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalAlertSync: EventEmitter<Sync>;

  /**
   * Fires when the component is added to DOM - used to receive initial queue.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalAlertRegister: EventEmitter<void>;

  // when an alert is opened or closed, update queue and determine active alert
  @Listen("calciteInternalAlertSync", { target: "window" })
  alertSync(event: CustomEvent): void {
    if (this.queue !== event.detail.queue) {
      this.queue = event.detail.queue;
    }
    this.queueLength = this.queue.length;
    this.determineActiveAlert();
    event.stopPropagation();
  }

  // when an alert is first registered, trigger a queue sync
  @Listen("calciteInternalAlertRegister", { target: "window" })
  alertRegister(): void {
    if (this.open && !this.queue.includes(this.el as HTMLCalciteAlertElement)) {
      this.queued = true;
      this.queue.push(this.el as HTMLCalciteAlertElement);
    }
    this.calciteInternalAlertSync.emit({ queue: this.queue });
    this.determineActiveAlert();
  }

  // Event is dispatched on the window because the element is not in the DOM so bubbling won't occur.
  @Listen("calciteInternalAlertUnregister", { target: "window" })
  alertUnregister(event: CustomEvent<Unregister>): void {
    const queue = this.queue.filter((el) => el !== event.detail.alert);
    this.queue = queue;

    window.dispatchEvent(
      new CustomEvent<Sync>("calciteInternalAlertSync", {
        detail: { queue },
      }),
    );
  }

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
  }

  @State() hasEndActions = false;

  /** the list of queued alerts */
  @State() queue: HTMLCalciteAlertElement[] = [];

  /** the count of queued alerts */
  @State() queueLength = 0;

  /** is the alert queued */
  @State() queued = false;

  private autoCloseTimeoutId: number = null;

  private closeButton: HTMLButtonElement;

  private initialOpenTime: number;

  private lastMouseOverBegin: number;

  private queueTimeout: number;

  private totalOpenTime = 0;

  private totalHoverTime = 0;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
  };

  /** determine which alert is active */
  private determineActiveAlert(): void {
    if (this.queue?.[0] === this.el) {
      this.openAlert();
      if (this.autoClose && !this.autoCloseTimeoutId) {
        this.initialOpenTime = Date.now();
        this.autoCloseTimeoutId = window.setTimeout(
          () => this.closeAlert(),
          DURATIONS[this.autoCloseDuration],
        );
      }
    } else {
      return;
    }
  }

  /** close and emit calciteInternalAlertSync event with the updated queue payload */
  private closeAlert = (): void => {
    this.autoCloseTimeoutId = null;
    this.queued = false;
    this.open = false;
    this.queue = this.queue.filter((el) => el !== this.el);
    this.determineActiveAlert();
    this.calciteInternalAlertSync.emit({ queue: this.queue });
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

  /** remove queued class after animation completes */
  private openAlert(): void {
    window.clearTimeout(this.queueTimeout);
    this.queueTimeout = window.setTimeout(() => (this.queued = false), 300);
  }

  private actionsEndSlotChangeHandler = (event: Event): void => {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  };

  private handleMouseOver = (): void => {
    window.clearTimeout(this.autoCloseTimeoutId);
    this.totalOpenTime = Date.now() - this.initialOpenTime;
    this.lastMouseOverBegin = Date.now();
  };

  private handleMouseLeave = (): void => {
    const hoverDuration = Date.now() - this.lastMouseOverBegin;
    const timeRemaining =
      DURATIONS[this.autoCloseDuration] - this.totalOpenTime + this.totalHoverTime;
    this.totalHoverTime = this.totalHoverTime ? hoverDuration + this.totalHoverTime : hoverDuration;
    this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), timeRemaining);
  };
}
