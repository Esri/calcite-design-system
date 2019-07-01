import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  EventEmitter,
  Listen,
  Watch
} from "@stencil/core";
import { SPACE, ENTER } from "../../utils/keys";

@Component({
  tag: "calcite-checkbox",
  styleUrl: "calcite-checkbox.scss",
  shadow: true
})
export class CalciteCheckbox {
  @Element() el: HTMLElement;
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;
  @Prop({ reflect: true, mutable: true }) indeterminate?: boolean = false;
  @Prop({ reflect: true, mutable: true }) name?: string = "";
  @Prop({ reflect: true, mutable: true }) value?: string = "";

  @Prop() color?: "red" | "blue" = "blue";

  @Event() calciteCheckboxChange: EventEmitter;

  private observer: MutationObserver;

  @Listen("click") onClick(e) {
    // prevent duplicate click events that occur
    // when the component is wrapped in a label and checkbox is clicked

    if (
      (this.el.closest("label") && e.target === this.inputProxy) ||
      (!this.el.closest("label") && e.target === this.el)
    ) {
      this.checked = !this.checked;
      this.indeterminate = false;
    }
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    if (e.keyCode === SPACE || e.keyCode === ENTER) {
      this.checked = !this.checked;
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

  render() {
    const path = this.indeterminate
      ? "M4 7h8v2H4z"
      : this.checked
      ? "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z"
      : "";
    return (
      <Host role="checkbox" aria-checked={this.checked} tabindex="0">
        <svg class="check-svg" viewBox="0 0 16 16">
          <path d={path} />
        </svg>
        {/* <div class="track">
          <div class="handle" />
        </div> */}
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
    this.observer = new MutationObserver(this.syncThisToProxyInput);
    this.observer.observe(this.inputProxy, { attributes: true });
  }

  private syncThisToProxyInput = () => {
    this.checked = this.inputProxy.checked;
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
