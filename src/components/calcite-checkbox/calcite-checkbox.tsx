import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  VNode
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { CheckableFormCompoment, HiddenFormInputSlot } from "../../utils/form";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import { connectForm, disconnectForm } from "../../utils/form";

@Component({
  tag: "calcite-checkbox",
  styleUrl: "calcite-checkbox.scss",
  shadow: true
})
export class CalciteCheckbox implements LabelableComponent, CheckableFormCompoment {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteCheckboxElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The checked state of the checkbox. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  /** True if the checkbox is disabled */
  @Prop({ reflect: true }) disabled = false;

  /** The id attribute of the checkbox.  When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true, mutable: true }) guid: string;

  /**
   * The hovered state of the checkbox.
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) hovered = false;

  /**
   * True if the checkbox is initially indeterminate,
   * which is independent from its checked state
   * https://css-tricks.com/indeterminate-checkboxes/
   * */
  @Prop({ reflect: true, mutable: true }) indeterminate = false;

  /**
   * The label of the checkbox input
   * @internal
   */
  @Prop() label?: string;

  /** The name of the checkbox input */
  @Prop({ reflect: true }) name;

  /**
   * When true, makes the component required for form-submission.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** specify the scale of the checkbox, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The value of the checkbox input */
  @Prop() value: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  readonly checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";

  readonly indeterminatePath = "M13 8v1H3V8z";

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: CalciteCheckbox["checked"];

  toggleEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.toggleEl?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  getPath = (): string =>
    this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";

  toggle = (): void => {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.setFocus();
      this.indeterminate = false;
      this.calciteCheckboxChange.emit();
    }
  };

  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === " " || event.key === "Enter") {
      this.toggle();
      event.preventDefault();
    }
  };

  clickHandler = (): void => {
    this.toggle();
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when the checkbox is blurred
   *
   * @internal
   */
  @Event() calciteInternalCheckboxBlur: EventEmitter;

  /** Emitted when the checkbox checked status changes */
  @Event() calciteCheckboxChange: EventEmitter;

  /**
   * Emitted when the checkbox is focused
   *
   * @internal
   */
  @Event() calciteInternalCheckboxFocus: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  onToggleBlur = (): void => {
    this.calciteInternalCheckboxBlur.emit(false);
  };

  onToggleFocus = (): void => {
    this.calciteInternalCheckboxFocus.emit(true);
  };

  onLabelClick = (): void => {
    this.toggle();
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.guid = this.el.id || `calcite-checkbox-${guid()}`;
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host onClick={this.clickHandler} onKeyDown={this.keyDownHandler}>
        <div
          aria-checked={this.checked.toString()}
          aria-label={getLabelText(this)}
          class="toggle"
          onBlur={this.onToggleBlur}
          onFocus={this.onToggleFocus}
          ref={(toggleEl) => (this.toggleEl = toggleEl)}
          role="checkbox"
          tabIndex={0}
        >
          <svg class="check-svg" viewBox="0 0 16 16">
            <path d={this.getPath()} />
          </svg>
          <slot />
        </div>
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }
}
