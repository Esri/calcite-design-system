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
  Build,
  VNode
} from "@stencil/core";
import { getElementDir, hasLabel } from "../../utils/dom";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch {
  @Element() el: HTMLCalciteSwitchElement;

  /** True if the switch is disabled */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /** What color the switch should be */
  @Prop({ reflect: true }) color: "red" | "blue" = "blue";

  /** The name of the checkbox input */
  @Prop({ reflect: true, mutable: true }) name?: string = "";

  /** The scale of the switch */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** True if the switch is initially on */
  @Prop({ reflect: true, mutable: true }) switched?: boolean = false;

  /** The component's theme. */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** The value of the checkbox input */
  @Prop({ reflect: true, mutable: true }) value?: string = "";

  @Event() calciteSwitchChange: EventEmitter;

  private observer: MutationObserver;

  @Listen("calciteLabelFocus", { target: "window" }) handleLabelFocus(e: CustomEvent): void {
    if (
      !this.disabled &&
      !this.el.contains(e.detail.interactedEl) &&
      hasLabel(e.detail.labelEl, this.el)
    ) {
      this.el.focus();
    } else return;
  }

  @Listen("click") onClick(e: MouseEvent): void {
    // prevent duplicate click events that occur
    // when the component is wrapped in a label and checkbox is clicked
    if (
      (!this.disabled && this.el.closest("label") && e.target === this.inputProxy) ||
      (!this.el.closest("label") && e.target === this.el)
    ) {
      this.updateSwitch(e);
    }
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent): void {
    const key = getKey(e.key);
    if (!this.disabled && (key === " " || key === "Enter")) {
      this.updateSwitch(e);
    }
  }

  @Watch("switched") switchWatcher(): void {
    this.switched
      ? this.inputProxy.setAttribute("checked", "")
      : this.inputProxy.removeAttribute("checked");
  }

  private inputProxy: HTMLInputElement;

  connectedCallback(): void {
    this.setupProxyInput();
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
  }

  componentWillRender(): void {
    this.syncProxyInputToThis();
  }

  render(): VNode {
    const dir = getElementDir(this.el);

    return (
      <Host
        aria-checked={this.switched.toString()}
        dir={dir}
        tabIndex={this.disabled ? -1 : this.tabIndex}
      >
        <div class="track">
          <div class="handle" />
        </div>
      </Host>
    );
  }

  private get tabIndex(): number {
    const hasTabIndex = this.el.hasAttribute("tabindex");

    if (hasTabIndex) {
      return Number(this.el.getAttribute("tabindex"));
    }

    return 0;
  }

  private setupProxyInput(): void {
    // check for a proxy input
    this.inputProxy = this.el.querySelector("input");

    // if the user didn't pass a proxy input create one for them
    if (!this.inputProxy) {
      this.inputProxy = document.createElement("input");
      this.inputProxy.type = "checkbox";
      this.inputProxy.disabled = this.disabled;
      this.syncProxyInputToThis();
      this.el.appendChild(this.inputProxy);
    }

    this.syncThisToProxyInput();
    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.syncThisToProxyInput);
      this.observer.observe(this.inputProxy, { attributes: true });
    }
  }

  private syncThisToProxyInput = (): void => {
    this.switched = this.inputProxy.hasAttribute("checked");
    this.name = this.inputProxy.name;
    this.value = this.inputProxy.value;
  };

  private syncProxyInputToThis = (): void => {
    this.switched
      ? this.inputProxy.setAttribute("checked", "")
      : this.inputProxy.removeAttribute("checked");
    this.inputProxy.setAttribute("name", this.name);
    this.inputProxy.setAttribute("value", this.value);
  };

  private updateSwitch(e: Event): void {
    e.preventDefault();
    this.switched = !this.switched;
    this.calciteSwitchChange.emit({
      switched: this.switched
    });
  }
}
