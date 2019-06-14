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
  /**
  * True if the control should be switched on
  */
  @Prop({ reflect: true }) switched?: boolean = false;
  /**
  * Name of the form control (useful for specifying input/label relationship)
  */
  @Prop({ reflect: true }) name?: string = "";
  /**
  * Value of the form control
  */
  @Prop({ reflect: true }) value?: string = "";
  /**
  * Color of the switch. Use red to denote destructive settings/actions.
  */
  @Prop() color?: "red" | "blue" = "blue";
  /**
   * @todo document what gets passed to the handler for these events
   */
  @Event() calciteSwitchChange: EventEmitter;

  private observer: MutationObserver;

  @Listen("click") onClick(e) {
    // If this is contained by a label only toggle if the target is our input
    // proxy to prevent duplicate toggles when <calcite-switch> is contained by
    // a <label> and the switch is clicked causing a click from BOTH the switch
    // and input.
    // If this is NOT contained by a label only switch if the target
    // is the switch.
    if (
      (this.el.closest("label") && e.target === this.inputProxy) ||
      (!this.el.closest("label") && e.target === this.el)
    ) {
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
    if (this.switched) {
      this.inputProxy.setAttribute("checked", "");
    } else {
      this.inputProxy.removeAttribute("checked");
    }
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
      <Host role="checkbox" aria-checked={this.switched} tabindex="0">
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
    this.switched = this.inputProxy.checked;
    this.name = this.inputProxy.name;
    this.value = this.inputProxy.value;
  };

  private syncProxyInputToThis = () => {
    this.inputProxy.checked = this.switched;
    this.inputProxy.name = this.name;
    this.inputProxy.value = this.value;
  };
}
