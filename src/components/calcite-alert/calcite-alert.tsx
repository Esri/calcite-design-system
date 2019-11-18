import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Listen,
  Prop
} from "@stencil/core";
import {
  lightbulb24F,
  exclamationMarkTriangle24F,
  checkCircle24F,
  x32
} from "@esri/calcite-ui-icons";
import { getElementDir } from "../../utils/dom";

/** Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided. You can keep alerts in your DOM or create/open, close/destroy
 * as needed.
 */

/**
 * @slot alert-title - Title of the alert (optional)
 * @slot alert-message - Main text of the alert
 * @slot alert-link - Optional action to take from the alert (undo, try again, link to page, etc.)
 */

@Component({
  tag: "calcite-alert",
  styleUrl: "calcite-alert.scss",
  shadow: true
})
export class CalciteAlert {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------------------------------

  /** Is the alert currently active or not */
  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /** Close the alert automatically (recommended for passive, non-blocking alerts) */
  @Prop() autoDismiss: boolean = false;

  /** Duration of autoDismiss (only used with `autoDismiss`) */
  @Prop({ reflect: true, mutable: true }) autoDismissDuration:
    | "fast"
    | "medium"
    | "slow" = this.autoDismiss ? "medium" : null;

  /** Color for the alert (will apply to top border and icon) */
  @Prop({ reflect: true, mutable: true }) color:
    | "blue"
    | "green"
    | "red"
    | "yellow" = "blue";

  /** Select theme (light or dark) */
  @Prop({ reflect: true, mutable: true }) theme: "light" | "dark" = "light";

  /** specify the scale of the button, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify if the alert should display an icon */
  @Prop() icon: boolean = false;

  // listen for emitted open event from other calcite alerts and determine active state
  @Listen("calciteAlertOpen", { target: "window" }) alertOpen(
    event: CustomEvent
  ) {
    this.calciteAlertSync.emit({ alertQueue: this.alertQueue });
    if (!this.alertQueue.includes(event.detail.requestedAlert)) {
      this.alertQueue.push(event.detail.requestedAlert);
    }
    this.determineActiveAlert();
  }

  // listen for emitted close event from other calcite alerts and determine active state
  @Listen("calciteAlertClose", { target: "window" }) alertClose(
    event: CustomEvent
  ) {
    if (this.alertQueue.includes(event.detail.requestedAlert)) {
      this.alertQueue = this.alertQueue.filter(
        e => e !== event.detail.requestedAlert
      );
    }
    if (this.alertId === event.detail.requestedAlert) this.active = false;
    this.determineActiveAlert();
  }

  // when an alert is opened / added to dom, update the queue to match any previously present queues
  @Listen("calciteAlertSync", { target: "window" })
  alertRegister(event: CustomEvent) {
    if (this.alertQueue !== event.detail.alertQueue) {
      this.alertQueue = event.detail.alertQueue;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    let colors = ["blue", "red", "green", "yellow"];
    if (!colors.includes(this.color)) this.color = "blue";

    let themes = ["dark", "light"];
    if (!themes.includes(this.theme)) this.theme = "light";

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let durations = ["slow", "medium", "fast"];
    if (
      this.autoDismissDuration !== null &&
      !durations.includes(this.autoDismissDuration)
    ) {
      this.autoDismissDuration = "medium";
    }
  }

  render() {
    const dir = getElementDir(this.el);
    const closeButton = (
      <button
        class="alert-close"
        aria-label="close"
        onClick={() => this.close()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          width="32"
          viewBox="0 0 32 32"
        >
          <path d={x32} />
        </svg>
      </button>
    );

    const count = (
      <div class={`${this.alertQueue.length > 1 ? "active " : ""}alert-count`}>
        +{this.alertQueue.length > 2 ? this.alertQueue.length - 1 : 1}
      </div>
    );

    const progress = <div class="alert-dismiss-progress"></div>;
    const role = !this.active
      ? null
      : this.autoDismiss
      ? "alert"
      : "alertdialog";

    return (
      <Host active={this.active} dir={dir} role={role}>
        {this.icon ? this.setIcon() : null}
        <div class="alert-content">
          <slot name="alert-title"></slot>
          <slot name="alert-message"></slot>
          <slot name="alert-link"></slot>
        </div>
        {count}
        {!this.autoDismiss ? closeButton : null}
        {this.active && this.autoDismiss ? progress : null}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fired when an alert is closed */
  @Event() calciteAlertClose: EventEmitter;

  /** Fired when an alert is opened */
  @Event() calciteAlertOpen: EventEmitter;

  /** Fired when an alert is opened */
  @Event() calciteAlertSync: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** open alert and emit the opened alert  */
  @Method() async open() {
    this.calciteAlertOpen.emit({
      requestedAlert: this.alertId,
      alertQueue: this.alertQueue
    });
  }

  /** close alert and emit the closed alert */
  @Method() async close() {
    this.calciteAlertClose.emit({
      requestedAlert: this.alertId,
      alertQueue: this.alertQueue
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** a managed list of alerts */
  @Prop() alertQueue: string[] = [];

  /** a managed list of alerts */
  @Prop() alertQueueLength: number;

  /** the determined current alert */
  @Prop() currentAlert: string;

  /** Unique ID for this alert */
  private alertId: string = this.el.id;

  /** map dismissal durations */
  private autoDismissDurations = {
    slow: 14000,
    medium: 10000,
    fast: 6000
  };

  /** map icons to colors */
  private iconDefaults = {
    green: checkCircle24F,
    yellow: exclamationMarkTriangle24F,
    red: exclamationMarkTriangle24F,
    blue: lightbulb24F
  };

  /** based on the current alert determine which alert is active */
  private determineActiveAlert() {
    this.alertQueueLength = this.alertQueue.length;
    this.currentAlert = this.alertQueue.length > 0 ? this.alertQueue[0] : null;
    if (!this.active && this.currentAlert === this.alertId) {
      setTimeout(() => (this.active = true), 300);
      if (this.autoDismiss) {
        setTimeout(
          () => this.close(),
          this.autoDismissDurations[this.autoDismissDuration]
        );
      }
    }
  }

  /** set the icon */
  private setIcon() {
    var path = this.iconDefaults[this.color];
    return (
      <div class="alert-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          viewBox="0 0 24 24"
        >
          <path d={path} />
        </svg>
      </div>
    );
  }
}
