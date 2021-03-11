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
import { Layout, Scale, Theme } from "../interfaces";

@Component({
  tag: "calcite-radio-button-group",
  styleUrl: "calcite-radio-button-group.scss",
  shadow: true
})
export class CalciteRadioButtonGroup {
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

  /** The disabled state of the radio button group. */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  onDisabledChange(): void {
    this.passPropsToRadioButtons();
  }

  /** The radio button group's hidden status.  When a radio button group is hidden none of its options are focusable or checkable. */
  @Prop({ reflect: true }) hidden = false;

  @Watch("hidden")
  onHiddenChange(): void {
    this.passPropsToRadioButtons();
  }

  /** The layout direction of the radio buttons in a group. */
  @Prop({ reflect: true }) layout: Layout = "horizontal";

  @Watch("layout")
  onLayoutChange(): void {
    this.passPropsToRadioButtons();
  }

  /** The name of the radio button group. <code>name</code> must be unique to other radio button group instances. */
  @Prop({ reflect: true }) name!: string;

  /** Requires that a value is selected for the radio button group before the parent form will submit. */
  @Prop({ reflect: true }) required = false;

  /** The scale (size) of the radio button group. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  onScaleChange(): void {
    this.passPropsToRadioButtons();
  }

  /** The color theme of the radio button group. */
  @Prop({ reflect: true }) theme: Theme;

  @Watch("theme")
  onThemeChange(): void {
    this.passPropsToRadioButtons();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.passPropsToRadioButtons();
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
        radioButton.theme = this.theme;
      });
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @todo doc
   */
  @Event() calciteRadioButtonGroupChange: EventEmitter;

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
