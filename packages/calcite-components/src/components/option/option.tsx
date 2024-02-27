import { Component, Element, Event, EventEmitter, h, Prop, VNode, Watch } from "@stencil/core";
import { createObserver } from "../../utils/observers";

@Component({
  tag: "calcite-option",
  styleUrl: "option.scss",
  shadow: true,
})
export class Option {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({
    reflect: true,
  })
  disabled = false;

  /**
   * Accessible name for the component.
   */
  @Prop({ mutable: true })
  label: string;

  /**
   * When `true`, the component is selected.
   */
  @Prop({
    reflect: true,
  })
  selected: boolean;

  /**
   * The component's value.
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

    this.calciteInternalOptionChange.emit();
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

  private mutationObserver: MutationObserver = createObserver("mutation", () => {
    this.ensureTextContentDependentProps();
    this.calciteInternalOptionChange.emit();
  });

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false })
  private calciteInternalOptionChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private ensureTextContentDependentProps(): void {
    const {
      el: { textContent },
      internallySetLabel,
      internallySetValue,
      label,
      value,
    } = this;

    if (!label || label === internallySetLabel) {
      this.label = textContent;
      this.internallySetLabel = textContent;
    }

    if (
      value == null /* intentional loose equals to handle both undefined & null */ ||
      value === internallySetValue
    ) {
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
    this.mutationObserver?.observe(this.el, {
      attributeFilter: ["label", "value"],
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
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
