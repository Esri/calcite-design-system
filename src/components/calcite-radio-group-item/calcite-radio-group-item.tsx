import {
  Component,
  Event,
  h,
  EventEmitter,
  Prop,
  Element,
  Host,
  Watch
} from "@stencil/core";
import { getElementProp } from "../../utils/dom";
@Component({
  tag: "calcite-radio-group-item",
  styleUrl: "calcite-radio-group-item.scss",
  shadow: true
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
  @Prop({
    reflect: true,
    mutable: true
  })
  checked = false;

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

      this.mutationObserver.observe(inputProxy, { attributes: true });
    }

    this.inputProxy = inputProxy;

    const futureSlotted = Array.from(this.el.childNodes);
    this.hasLabel = futureSlotted.some(
      child => child.nodeType === Node.TEXT_NODE
    );
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }

  render() {
    const { checked, value } = this;
    const scale = getElementProp(this.el, "scale", "m");
    return (
      <Host role="radio" aria-checked={checked ? "true" : "false"} scale={scale}>
        <label>
          {this.hasLabel ? <slot /> : value}
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

  private hasLabel = false;

  private inputProxy: HTMLInputElement;

  private mutationObserver = new MutationObserver(() =>
    this.syncFromExternalInput()
  );

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

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
    this.inputProxy.toggleAttribute("checked", this.checked);
  }
}
