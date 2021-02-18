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
  VNode
} from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { Position } from "../interfaces";

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
  el: HTMLCalciteRadioGroupItemElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Indicates whether the control is checked. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  @Watch("checked")
  protected handleCheckedChange(): void {
    this.calciteRadioGroupItemChange.emit();
    this.syncToExternalInput();
  }

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  /** flip the icon in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: boolean;

  /** optionally used with icon, select where to position the icon */
  @Prop({ reflect: true }) iconPosition?: Position = "start";

  /**
   * The control's value.
   */
  @Prop({ mutable: true })
  value: any | null;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const inputProxy: HTMLInputElement = this.el.querySelector(`input[slot="input"]`);

    if (inputProxy) {
      this.value = inputProxy.value;
      this.checked = inputProxy.checked;
      if (Build.isBrowser) {
        this.mutationObserver.observe(inputProxy, { attributes: true });
      }
    }

    this.inputProxy = inputProxy;
  }

  disconnectedCallback(): void {
    this.mutationObserver.disconnect();
  }

  componentWillLoad(): void {
    // only use default slot content in browsers that support shadow dom
    // or if ie11 has no label provided (#374)
    const label = this.el.querySelector("label");
    this.useFallback = !label || label.textContent === "";
  }

  render(): VNode {
    const { checked, useFallback, value } = this;
    const dir = getElementDir(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const appearance = getElementProp(this.el, "appearance", "solid");
    const layout = getElementProp(this.el, "layout", "horizontal");

    const iconEl = (
      <calcite-icon
        class="radio-group-item-icon"
        dir={dir}
        flipRtl={this.iconFlipRtl}
        icon={this.icon}
        scale="s"
      />
    );

    return (
      <Host
        appearance={appearance}
        aria-checked={checked.toString()}
        layout={layout}
        role="radio"
        scale={scale}
      >
        <label>
          {this.icon && this.iconPosition === "start" ? iconEl : null}
          <slot>{useFallback ? value : ""}</slot>
          <slot name="input" />
          {this.icon && this.iconPosition === "end" ? iconEl : null}
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
    return Build.isBrowser && new MutationObserver(() => this.syncFromExternalInput());
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
