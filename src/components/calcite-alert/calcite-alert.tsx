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
  Watch
} from "@stencil/core";
import {
  lightbulb24F,
  exclamationMarkTriangle24F,
  checkCircle24F,
  x32
} from "@esri/calcite-ui-icons";
import { getElementDir } from "../../utils/dom";
import AlertInterface from "../../interfaces/AlertInterface";

/** Alerts are not meant to be used inline with content, or be present in view on page load.
 * As such, calcite-alert relies on calcite-alerts for positioning - displaying an alert on its own
 * will lead to unexpected and potentially undesireable results
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
  @Element() el: HTMLElement;

  /** Is the alert currently active or not */
  @State() active: boolean = false;

  /** Close the alert automatically (recommended for passive, non-blocking alerts) */
  @Prop() dismiss: boolean = false;

  /** Length before autodismissal (only used with `dismiss`) */
  @Prop({ reflect: true }) duration: "fast" | "medium" | "slow" = this.dismiss
    ? "medium"
    : null;

  /** Color for the alert (will apply to top border and icon) */
  @Prop({ reflect: true }) color: "blue" | "green" | "red" | "yellow" = "blue";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** If false, no icon will be shown in the alert */
  @Prop() icon: boolean = false;

  /** Unique ID for this alert */
  /** @internal */
  @Prop() alertId: string = this.el.id;

  /** @internal */
  @Prop() currentAlert: string = "";

  /** @internal */
  @Prop() queueLength: number = 0;

  /** watch for changes to currentAlert passed from <calcite-alerts> */
  @Watch("currentAlert") watchCurrentAlert() {
    if (!this.active && this.currentAlert === this.alertId) {
      if (this.dismiss)
        setTimeout(
          () => this.closeCalciteAlert(),
          this.durationDefaults[this.duration]
        );
      setTimeout(() => (this.active = true), 300);
    } else {
      this.active = false;
    }
  }

  /** Fired when an alert is closed */
  @Event() calciteAlertClose: EventEmitter;

  /** Fired when an alert is opened */
  @Event() calciteAlertOpen: EventEmitter;

  /** emit the `calciteAlertClose` event - <calcite-alerts> listens for this */
  @Method() async closeCalciteAlert() {
    this.calciteAlertClose.emit({ requestedAlert: this.alertId });
  }

  /**  emit the `calciteAlertOpen` event - <calcite-alerts> listens for this  */
  @Method() async openCalciteAlert() {
    this.calciteAlertOpen.emit({ requestedAlert: this.alertId });
  }

  private durationDefaults = {
    slow: 14000,
    medium: 10000,
    fast: 6000
  };

  private iconDefaults = {
    green: checkCircle24F,
    yellow: exclamationMarkTriangle24F,
    red: exclamationMarkTriangle24F,
    blue: lightbulb24F
  };

  connectedCallback() {
    // prop validations
    let colors = ["blue", "red", "green", "yellow"];
    if (!colors.includes(this.color)) this.color = "blue";

    let durations = ["slow", "medium", "fast"];
    if (this.duration !== null && !durations.includes(this.duration))
      this.duration = "medium";

    let themes = ["dark", "light"];
    if (!themes.includes(this.theme)) this.theme = "light";
  }

  setIcon() {
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

  render() {
    const dir = getElementDir(this.el);
    const closeButton = (
      <button
        class="alert-close"
        aria-label="close"
        onClick={() => this.closeCalciteAlert()}
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

    const close = !this.dismiss ? closeButton : "";
    const icon = this.icon ? this.setIcon() : "";
    const count = (
      <div class={`${this.queueLength > 0 ? "active " : ""}alert-count`}>
        +{this.queueLength > 0 ? this.queueLength : 1}
      </div>
    );
    const progress =
      this.active && this.dismiss ? <div class="alert-dismiss"></div> : "";
    return (
      <Host active={this.active} dir={dir}>
        {icon}
        <div class="alert-content">
          <slot name="alert-title"></slot>
          <slot name="alert-message"></slot>
          <slot name="alert-link"></slot>
        </div>
        {count}
        {close}
        {progress}
      </Host>
    );
  }
}

AlertInterface.injectProps(CalciteAlert, ["currentAlert", "queueLength"]);
