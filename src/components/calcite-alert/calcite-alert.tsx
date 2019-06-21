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
import AlertInterface from "../../interfaces/AlertInterface";
import ConfigInterface from "../../interfaces/ConfigInterface";

/**
 * @slot alert-title - Title of the alert (optional)
 * @slot alert-message - Main text of the alert
 * @slot alert-link - Optional action to take from the alert (undo, try again, etc.)
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

  /** Unique ID for this alert */
  @Prop() id: string = "1";

  /** Color for the alert (will apply to top border and icon) */
  @Prop({ reflect: true }) color: "blue" | "green" | "red" | "yellow" = "blue";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: string;

  /** If false, no icon will be shown in the alert */
  @Prop() icon: boolean = false;

  /** Close the alert automatically (recommended for passive, non-blocking alerts) */
  @Prop() dismiss: boolean = false;

  /** Length before autodismissal (only used with `dismiss`) */
  @Prop({ reflect: true }) duration: "fast" | "medium" | "slow" = this.dismiss
    ? "medium"
    : null;

  /** @internal */
  @Prop() currentAlert: string = "";

  /** @internal */
  @Prop() queueLength: number = 0;

  /** @internal */
  /** make the globalTheme available as a prop */
  @Prop() globalTheme: string;

  /** @internal */
  /** set an initial value for requested theme */
  @Prop() initialTheme: string = this.theme;


  /** watch for changes to currentAlert passed from <calcite-alerts> */
  @Watch("currentAlert") watchCurrentAlert() {
    this.active = this.currentAlert === this.id;
    if (this.active) this.openCalciteAlert();
    if (this.active && this.dismiss)
      setTimeout(
        () => this.closeCalciteAlert(),
        this.durationDefaults[this.duration]
      );
  }

  /** Fired when an alert is closed */
  @Event() calciteAlertClose: EventEmitter;

  /** Fired when an alert is opened  */
  @Event() calciteAlertOpen: EventEmitter;

  /** emit the `calciteAlertClose` event - <calcite-alerts> listens for this */
  @Method() async closeCalciteAlert() {
    this.calciteAlertClose.emit(this.id);
  }

  /** emit the `calciteAlertOpen` event - <calcite-alerts> listens for this */
  @Method() async openCalciteAlert() {
    this.calciteAlertOpen.emit(this.id);
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
    if (!themes.includes(this.theme)) this.theme = this.globalTheme;
  }

  componentWillUpdate() {
    if (!this.initialTheme) this.theme = this.globalTheme;
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
      this.active && this.dismiss ? <div class="alert-dismiss" /> : "";
    return (
      <Host active={!!this.active} duration={this.duration}>
        {icon}
        <div class="alert-content">
          <slot name="alert-title" />
          <slot name="alert-message" />
          <slot name="alert-link" />
        </div>
        {count}
        {close}
        {progress}
      </Host>
    );
  }
}

AlertInterface.injectProps(CalciteAlert, ["currentAlert", "queueLength"]);
ConfigInterface.injectProps(CalciteAlert, ["globalTheme"]);
