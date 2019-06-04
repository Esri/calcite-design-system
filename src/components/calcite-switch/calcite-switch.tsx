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
  tag: "calcite-switch",
  styleUrl: "calcite-switch.scss",
  shadow: true
})
export class CalciteSwitch {
  @Element() el: HTMLElement;

  @Prop({ reflectToAttr: true }) switched: boolean = false;

  @Prop() color: "red" | "blue" = "blue";

  @Event() calciteSwitchChange: EventEmitter;

  @Listen("click") onClick(e) {
    if (this.inputProxy && e.target === this.inputProxy) {
      this.switched = !this.switched;
    } else if (!this.inputProxy) {
      this.switched = !this.switched;
    }
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    if (e.keyCode === SPACE || e.keyCode === ENTER) {
      this.switched = !this.switched;
    }
  }

  @Watch("switched") switchWatcher() {
    this.calciteSwitchChange.emit();

    if (this.inputProxy) {
      if (this.switched) {
        this.inputProxy.setAttribute("checked", "");
      } else {
        this.inputProxy.removeAttribute("checked");
      }
    }
  }

  private inputProxy: HTMLInputElement;

  connectedCallback() {
    this.setupProxyInput();
  }

  disconnectedCallback() {
    if (this.inputProxy) {
      this.inputProxy.removeEventListener(
        "change",
        this.inputProxyChangeHandler
      );
    }
  }

  private setupProxyInput() {
    this.inputProxy = this.el.querySelector("input");

    if (this.inputProxy) {
      this.switched = this.inputProxy.checked;
      this.inputProxyChangeHandler = this.inputProxyChangeHandler.bind(this);
      this.inputProxy.addEventListener("change", this.inputProxyChangeHandler);
    }
  }

  render() {
    return (
      <Host role="checkbox" aria-checked={this.switched} tabindex="0">
        <div class={`toggle-switch__track toggle-switch__track--${this.color}`}>
          <div class="toggle-switch__handle" />
        </div>
        <slot />
      </Host>
    );
  }

  private inputProxyChangeHandler() {
    this.switched = this.inputProxy.hasAttribute("checked");
  }
}
