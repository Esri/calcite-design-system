import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { createObserver } from "../../utils/observers";
import { Layout, Scale } from "../interfaces";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

/**
 * @slot - A slot for adding `calcite-radio-button`s.
 */
@Component({
  tag: "calcite-radio-button-group",
  styleUrl: "radio-button-group.scss",
  shadow: true,
})
export class RadioButtonGroup implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Global attributes
  //
  //--------------------------------------------------------------------------

  @Watch("hidden")
  handleHiddenChange(): void {
    this.passPropsToRadioButtons();
  }

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

  /**
   * Specifies the component's selected item.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItem: HTMLCalciteRadioButtonElement = null;

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

  @Element() el!: HTMLCalciteRadioButtonGroupElement;

  mutationObserver = createObserver("mutation", () => this.passPropsToRadioButtons());

  @State() radioButtons: HTMLCalciteRadioButtonElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.passPropsToRadioButtons();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
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
    this.radioButtons = Array.from(this.el.querySelectorAll("calcite-radio-button"));
    this.selectedItem =
      Array.from(this.radioButtons).find((radioButton) => radioButton.checked) || null;
    if (this.radioButtons.length > 0) {
      this.radioButtons.forEach((radioButton) => {
        radioButton.disabled = this.disabled || radioButton.disabled;
        radioButton.hidden = this.el.hidden;
        radioButton.name = this.name;
        radioButton.required = this.required;
        radioButton.scale = this.scale;
      });
    }
  };

  private getFocusableRadioButton(): HTMLCalciteRadioButtonElement | null {
    return this.radioButtons.find((radiobutton) => !radiobutton.disabled) ?? null;
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the component has changed.
   */
  @Event({ cancelable: false }) calciteRadioButtonGroupChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Method
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the fist focusable `calcite-radio-button` element in the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    if (this.selectedItem && !this.selectedItem.disabled) {
      return this.selectedItem.setFocus();
    }
    if (this.radioButtons.length > 0) {
      return this.getFocusableRadioButton()?.setFocus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteRadioButtonChange")
  radioButtonChangeHandler(event: CustomEvent): void {
    this.selectedItem = event.target as HTMLCalciteRadioButtonElement;
    this.calciteRadioButtonGroupChange.emit();
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
