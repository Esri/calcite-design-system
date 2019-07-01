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
  @Prop({ reflect: true, mutable: true }) name?: string = "";
  @Prop({ reflect: true, mutable: true }) value?: string = "";

  @Prop() color?: "red" | "blue" = "blue";
  @Event() calciteCheckboxChange: EventEmitter;

  private observer: MutationObserver;

  @Listen("click") onClick(e) {
    // If this is contained by a label only toggle if the target is our input
    // proxy to prevent duplicate toggles when <calcite-checkbox> is contained by
    // a <label> and the checkbox is clicked causing a click from BOTH the checkbox
    // and input.
    // If this is NOT contained by a label only check if the target
    // is the checkbox.
    if (
      (this.el.closest("label") && e.target === this.inputProxy) ||
      (!this.el.closest("label") && e.target === this.el)
    ) {
      this.checked = !this.checked;
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
    return (
      <Host role="checkbox" aria-checked={this.checked} tabindex="0">
        <div class="track">
          <div class="handle" />
        </div>
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
