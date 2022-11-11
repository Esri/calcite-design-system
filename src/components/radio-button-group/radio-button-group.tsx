import {
  Component,
  Host,
  h,
  Element,
  Prop,
  Watch,
  VNode,
  Event,
  EventEmitter,
  Listen
} from "@stencil/core";
import { createObserver } from "../../utils/observers";
import { Layout, Scale } from "../interfaces";

/**
 * @slot - A slot for adding `calcite-radio-button`s.
 */
@Component({
  tag: "calcite-radio-button-group",
  styleUrl: "radio-button-group.scss",
  shadow: true
})
export class RadioButtonGroup {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el!: HTMLCalciteRadioButtonGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  onDisabledChange(): void {
    this.passPropsToRadioButtons();
  }

  /** When `true`, the component is not displayed and its `calcite-radio-button`s are not focusable or checkable. */
  @Prop({ reflect: true }) hidden = false;

  @Watch("hidden")
  onHiddenChange(): void {
    this.passPropsToRadioButtons();
  }

  /** Defines the layout of the component. */
  @Prop({ reflect: true }) layout: Layout = "horizontal";

  @Watch("layout")
  onLayoutChange(): void {
    this.passPropsToRadioButtons();
  }

  /** Specifies the name of the component on form submission. Must be unique to other component instances. */
  @Prop({ reflect: true }) name!: string;

  /** When `true`, the component must have a value in order for the form to submit. */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  onScaleChange(): void {
    this.passPropsToRadioButtons();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  mutationObserver = createObserver("mutation", () => this.passPropsToRadioButtons());

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.passPropsToRadioButtons();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private passPropsToRadioButtons = (): void => {
    const radioButtons = this.el.querySelectorAll("calcite-radio-button");
    if (radioButtons.length > 0) {
      radioButtons.forEach((radioButton) => {
        radioButton.disabled = this.disabled || radioButton.disabled;
        radioButton.hidden = this.hidden;
        radioButton.name = this.name;
        radioButton.required = this.required;
        radioButton.scale = this.scale;
      });
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the component has changed.
   */
  @Event({ cancelable: false }) calciteRadioButtonGroupChange: EventEmitter<any>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteRadioButtonChange")
  radioButtonChangeHandler(event: CustomEvent): void {
    this.calciteRadioButtonGroupChange.emit((event.target as HTMLCalciteRadioButtonElement).value);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host role="radiogroup">
        <slot />
      </Host>
    );
  }
}
