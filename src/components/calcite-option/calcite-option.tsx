import { Component, h, Prop, VNode, Element, EventEmitter, Event, Watch } from "@stencil/core";

@Component({
  tag: "calcite-option",
  shadow: true
})
export class CalciteOption {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When true, it prevents the option from being selected.
   */
  @Prop({
    reflect: true
  })
  disabled = false;

  /**
   * The option label.
   */
  @Prop({ mutable: true })
  label: string;

  /**
   * When true, this option is selected. Otherwise, false.
   */
  @Prop({
    reflect: true
  })
  selected: boolean;

  /**
   * The value associated with this option.
   */
  @Prop({ mutable: true })
  value: any;

  @Watch("disabled")
  @Watch("label")
  @Watch("selected")
  @Watch("value")
  protected handlePropChange(_newValue: any, _oldValue: any, propName: string): void {
    if (propName === "label" || propName === "value") {
      this.ensureTextContentDependentProps();
    }

    this.calciteOptionChange.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  @Element()
  private el: HTMLCalciteOptionElement;

  private internallySetLabel: string;

  private internallySetValue: any;

  private mutationObserver = new MutationObserver(() => {
    this.ensureTextContentDependentProps();
    this.calciteOptionChange.emit();
  });

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event()
  private calciteOptionChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private ensureTextContentDependentProps(): void {
    const {
      el: { textContent }
    } = this;

    if (!this.label || this.label === this.internallySetLabel) {
      this.label = textContent;
      this.internallySetLabel = textContent;
    }

    if (!this.value || this.value === this.internallySetValue) {
      this.value = textContent;
      this.internallySetValue = textContent;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.ensureTextContentDependentProps();
    this.mutationObserver.observe(this.el, {
      childList: true,
      attributeFilter: ["label", "value"]
    });
  }

  disconnectedCallback(): void {
    this.mutationObserver.disconnect();
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return <slot>{this.label}</slot>;
  }
}
