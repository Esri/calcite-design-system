import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  EventEmitter,
  Listen,
  Watch,
  Build
} from "@stencil/core";
import { SPACE, ENTER } from "../../utils/keys";

@Component({
  tag: "calcite-checkbox",
  styleUrl: "calcite-checkbox.scss",
  shadow: true
})
export class CalciteCheckbox {
  @Element() el: HTMLElement;

  /** True if the checkbox is initially checked */
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;

  /**
   * True if the checkbox is initially indeterminate,
   * which is independent from its checked state
   * https://css-tricks.com/indeterminate-checkboxes/
   * */
  @Prop({ reflect: true, mutable: true }) indeterminate?: boolean = false;

  /** The name of the checkbox input */
  @Prop({ reflect: true, mutable: true }) name?: string = "";

  /** The value of the checkbox input */
  @Prop({ reflect: true, mutable: true }) value?: string = "";

  /** Size of the checkbox  */
  @Prop({ reflect: true }) size?: "small" | "large" = null;

  /** True if the checkbox is disabled */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /** Determines what theme to use */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** Emitted when the checkbox checked status changes */
  @Event() calciteCheckboxChange: EventEmitter;

  private observer: MutationObserver;

  private toggle = () => {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.indeterminate = false;
    }
  };

  @Listen("click") onClick({ target }: MouseEvent) {
    // prevent duplicate click events that occur
    // when the component is wrapped in a label and checkbox is clicked
    if (
      (this.el.closest("label") && target === this.inputProxy) ||
      (!this.el.closest("label") && target === this.el)
    ) {
      this.toggle();
    }
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    if (e.keyCode === SPACE || e.keyCode === ENTER) {
      e.preventDefault();
      this.toggle();
    }
  }

  @Watch("checked") checkedWatcher() {
    this.calciteCheckboxChange.emit();
    this.checked
      ? this.inputProxy.setAttribute("checked", "")
      : this.inputProxy.removeAttribute("checked");
  }

  private inputProxy: HTMLInputElement;

  connectedCallback() {
    this.setupProxyInput();
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  componentWillRender() {
    this.syncProxyInputToThis();
  }

  private readonly indeterminatePath = "M4 7h8v2H4z";
  private readonly checkedPath =
    "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";

  private getPath = (): string =>
    this.indeterminate
      ? this.indeterminatePath
      : this.checked
      ? this.checkedPath
      : "";

  render() {
    return (
      <Host
        role="checkbox"
        aria-checked={this.checked.toString()}
        tabindex={this.disabled ? "-1" : "0"}
      >
        <svg class="check-svg" viewBox="0 0 16 16">
          <path d={this.getPath()} fill="white" />
        </svg>
        <slot />
      </Host>
    );
  }

  private setupProxyInput() {
    // check for a proxy input
    this.inputProxy = this.el.querySelector("input");

    // if the user didn't pass a proxy input create one for them
    if (!this.inputProxy) {
      this.inputProxy = document.createElement("input");
      this.inputProxy.type = "checkbox";
      this.syncProxyInputToThis();
      this.el.appendChild(this.inputProxy);
    }

    this.syncThisToProxyInput();
    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.syncThisToProxyInput);
      this.observer.observe(this.inputProxy, { attributes: true });
    }
  }

  private syncThisToProxyInput = () => {
    this.checked = this.inputProxy.hasAttribute("checked");
    this.name = this.inputProxy.name;
    this.value = this.inputProxy.value;
  };

  private syncProxyInputToThis = () => {
    this.checked
      ? this.inputProxy.setAttribute("checked", "")
      : this.inputProxy.removeAttribute("checked");
    this.inputProxy.name = this.name;
    this.inputProxy.value = this.value;
  };
}
