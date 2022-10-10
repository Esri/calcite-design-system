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
  Watch
} from "@stencil/core";
import { getSlotted, setRequestedIcon, toAriaBoolean } from "../../utils/dom";
import { DURATIONS, SLOTS, TEXT } from "./resources";
import { Scale } from "../interfaces";
import { AlertDuration, AlertPlacement, StatusColor, StatusIcons, Sync } from "./interfaces";
import {
  OpenCloseComponent,
  connectOpenCloseComponent,
  disconnectOpenCloseComponent
} from "../../utils/openCloseComponent";
import {
  createLocaleNumberFormatter,
  LocalizedComponent,
  connectLocalized,
  disconnectLocalized,
  NumberingSystem
} from "../../utils/locale";

/**
 * Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided.
 */

/**
 * @slot title - A slot for optionally adding a title to the component.
 * @slot message - A slot for adding main text to the component.
 * @slot link - A slot for optionally adding an action to take from the alert (undo, try again, link to page, etc.)
 */

@Component({
  tag: "calcite-alert",
  styleUrl: "alert.scss",
  shadow: true
})
export class Alert implements OpenCloseComponent, LocalizedComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAlertElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------------------------------

  /**
   * When true, opens the combobox
   *
   * @deprecated use open instead
   */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** When true, opens the dropdown */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("active")
  activeHandler(value: boolean): void {
    this.open = value;
  }

  @Watch("open")
  openHandler(value: boolean): void {
    if (this.open && !this.queued) {
      this.calciteInternalAlertRegister.emit();
      this.active = value;
    }
    if (!this.open) {
      this.queue = this.queue.filter((el) => el !== this.el);
      this.calciteInternalAlertSync.emit({ queue: this.queue });
      this.active = false;
    }
  }

  /** When true, the component closes automatically (recommended for passive, non-blocking alerts). */
  @Prop({ reflect: true }) autoDismiss = false;

  /** Specifies the duration before the component automatically closes (only use with `autoDismiss`). */
  @Prop({ reflect: true }) autoDismissDuration: AlertDuration = this.autoDismiss ? "medium" : null;

  /** Specifies the color for the component (will apply to top border and icon). */
  @Prop({ reflect: true }) color: StatusColor = "blue";

  /**
   * When true, shows a default recommended icon. Alternatively,
   * pass a Calcite UI Icon name to display a specific icon.
   */
  @Prop({ reflect: true }) icon: string | boolean;

  /**
   * Specifies the text label for the close button.
   *
   * @default "Close"
   */
  @Prop() intlClose: string = TEXT.intlClose;

  /** Specifies an accessible name for the component. */
  @Prop() label!: string;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop({ reflect: true }) numberingSystem?: NumberingSystem;

  /** Specifies the placement of the component */
  @Prop({ reflect: true }) placement: AlertPlacement = "bottom";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("icon")
  @Watch("color")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }

  @Watch("autoDismissDuration")
  updateDuration(): void {
    if (this.autoDismiss && this.autoDismissTimeoutId) {
      window.clearTimeout(this.autoDismissTimeoutId);
      this.autoDismissTimeoutId = window.setTimeout(
        () => this.closeAlert(),
        DURATIONS[this.autoDismissDuration] - (Date.now() - this.trackTimer)
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
    const open = this.open || this.active;
    if (open && !this.queued) {
      this.activeHandler(open);
      this.openHandler(open);
      this.calciteInternalAlertRegister.emit();
    }
    connectOpenCloseComponent(this);
  }

  componentWillLoad(): void {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }

  disconnectedCallback(): void {
    window.clearTimeout(this.autoDismissTimeoutId);
    disconnectOpenCloseComponent(this);
    disconnectLocalized(this);
  }

  render(): VNode {
    const closeButton = (
      <button
        aria-label={this.intlClose}
        class="alert-close"
        onClick={this.closeAlert}
        ref={(el) => (this.closeButton = el)}
        type="button"
      >
        <calcite-icon icon="x" scale={this.scale === "l" ? "m" : "s"} />
      </button>
    );
    const formatter = createLocaleNumberFormatter(
      this.effectiveLocale,
      this.numberingSystem,
      "always"
    );
    const queueNumber = this.queueLength > 2 ? this.queueLength - 1 : 1;
    const queueText = formatter.format(queueNumber);

    const queueCount = (
      <div class={`${this.queueLength > 1 ? "active " : ""}alert-queue-count`}>
        <calcite-chip scale={this.scale} value={queueText}>
          {queueText}
        </calcite-chip>
      </div>
    );

    const { active, autoDismiss, label, placement, queued, requestedIcon } = this;
    const role = autoDismiss ? "alert" : "alertdialog";
    const hidden = !active;
    return (
      <Host
        aria-hidden={toAriaBoolean(hidden)}
        aria-label={label}
        calcite-hydrated-hidden={hidden}
        role={role}
      >
        <div
          class={{
            container: true,
            queued,
            [placement]: true
          }}
          ref={this.setTransitionEl}
        >
          {requestedIcon ? (
            <div class="alert-icon">
              <calcite-icon icon={requestedIcon} scale={this.scale === "l" ? "m" : "s"} />
            </div>
          ) : null}
          <div class="alert-content">
            <slot name={SLOTS.title} />
            <slot name={SLOTS.message} />
            <slot name={SLOTS.link} />
          </div>
          {queueCount}
          {!autoDismiss ? closeButton : null}
          {active && !queued && autoDismiss ? <div class="alert-dismiss-progress" /> : null}
        </div>
      </Host>
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

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    const alertLinkEl: HTMLCalciteLinkElement = getSlotted(this.el, { selector: "calcite-link" });

    if (!this.closeButton && !alertLinkEl) {
      return;
    } else if (alertLinkEl) {
      alertLinkEl.setFocus();
    } else if (this.closeButton) {
      this.closeButton.focus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @State() effectiveLocale = "";

  /** the list of queued alerts */
  @State() queue: HTMLCalciteAlertElement[] = [];

  /** the count of queued alerts */
  @State() queueLength = 0;

  /** is the alert queued */
  @State() queued = false;

  /** the close button element */
  private closeButton?: HTMLButtonElement;

  private autoDismissTimeoutId: number = null;

  private queueTimeout: number;

  private trackTimer = Date.now();

  /** the computed icon to render */
  /* @internal */
  @State() requestedIcon?: string;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setTransitionEl = (el): void => {
    this.transitionEl = el;
    connectOpenCloseComponent(this);
  };

  /** determine which alert is active */
  private determineActiveAlert(): void {
    if (this.queue?.[0] === this.el) {
      this.openAlert();
      if (this.autoDismiss && !this.autoDismissTimeoutId) {
        this.trackTimer = Date.now();
        this.autoDismissTimeoutId = window.setTimeout(
          () => this.closeAlert(),
          DURATIONS[this.autoDismissDuration]
        );
      }
    } else {
      return;
    }
  }

  /** close and emit calciteInternalAlertSync event with the updated queue payload */
  private closeAlert = (): void => {
    this.autoDismissTimeoutId = null;
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
}
