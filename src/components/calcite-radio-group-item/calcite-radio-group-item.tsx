import {
  Component,
  Event,
  h,
  EventEmitter,
  Prop,
  Element,
  Host,
  Watch,
  Build,
  State,
} from "@stencil/core";
import { getElementProp } from "../../utils/dom";
@Component({
  tag: "calcite-radio-group-item",
  styleUrl: "calcite-radio-group-item.scss",
  shadow: true,
})
export class CalciteRadioGroupItem {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Indicates whether the control is checked.
   */
  @Prop({ reflect: true, mutable: true }) checked = false;

  @Watch("checked")
  protected handleCheckedChange(): void {
    this.calciteRadioGroupItemChange.emit();
    this.syncToExternalInput();
  }

  /**
   * The control's value.
   */
  @Prop()
  value: any | null;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    let inputProxy: HTMLInputElement = this.el.querySelector(
      `input[slot="input"]`
    );

    if (inputProxy) {
      this.value = inputProxy.value;
      this.checked = inputProxy.checked;
      if (Build.isBrowser) {
        this.mutationObserver.observe(inputProxy, { attributes: true });
      }
    }

    this.inputProxy = inputProxy;
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }

  componentDidLoad() {
    // only use default slot content in browsers that support shadow dom
    // or if ie11 has no label provided (#374)
    const label = this.el.querySelector("label");
    this.useFallback = !label || label.textContent === "";
  }

  render() {
    const { checked, useFallback, value } = this;
    const scale = getElementProp(this.el, "scale", "m");
    const appearance = getElementProp(this.el, "appearance", "m");

    return (
      <Host
        role="radio"
        aria-checked={checked.toString()}
        scale={scale}
        appearance={appearance}
      >
        <label>
          <slot>{useFallback ? value : ""}</slot>
          <slot name="input" />
        </label>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event()
  calciteRadioGroupItemChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() private useFallback: boolean;

  private inputProxy: HTMLInputElement;

  private mutationObserver = this.getMutationObserver();

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getMutationObserver(): MutationObserver | null {
    return (
      Build.isBrowser &&
      new MutationObserver(() => this.syncFromExternalInput())
    );
  }

  private syncFromExternalInput(): void {
    if (this.inputProxy) {
      this.value = this.inputProxy.value;
      this.checked = this.inputProxy.checked;
    }
  }

  private syncToExternalInput(): void {
    if (!this.inputProxy) {
      return;
    }

    this.inputProxy.value = this.value;
    if (this.checked) {
      this.inputProxy.setAttribute("checked", "true");
    } else {
      this.inputProxy.removeAttribute("checked");
    }
  }
}
