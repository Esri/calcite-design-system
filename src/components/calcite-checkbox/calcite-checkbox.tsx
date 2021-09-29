import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { focusElement, closestElementCrossShadowBoundary } from "../../utils/dom";
import { Scale } from "../interfaces";
import { hiddenInputStyle } from "../../utils/form";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";

@Component({
  tag: "calcite-checkbox",
  styleUrl: "calcite-checkbox.scss",
  shadow: true
})
export class CalciteCheckbox implements LabelableComponent {
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

  @Watch("checked")
  checkedWatcher(newChecked: boolean): void {
    this.input.checked = newChecked;
  }

  /** True if the checkbox is disabled */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledChanged(disabled: boolean): void {
    this.input.disabled = disabled;
  }

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
  @Prop({ reflect: true }) name?: string = "";

  @Watch("name")
  nameChanged(newName: string): void {
    this.input.name = newName;
  }

  /** specify the scale of the checkbox, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The value of the checkbox input */
  @Prop() value?: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private readonly checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";

  private readonly indeterminatePath = "M13 8v1H3V8z";

  private initialChecked: boolean;

  private input: HTMLInputElement;

  labelEl: HTMLCalciteLabelElement;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  /** The focused state of the checkbox. */
  @State() focused = false;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.input);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getPath = (): string =>
    this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";

  private toggle = (): void => {
    if (!this.disabled) {
      this.checked = !this.checked;
      focusElement(this.input);
      this.indeterminate = false;
      this.calciteCheckboxChange.emit();
    }
  };

  private clickHandler = (): void => {
    if (this.labelEl) {
      return;
    }

    this.toggle();
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emitted when the checkbox checked status changes */
  @Event() calciteCheckboxChange: EventEmitter;

  /**
   * Emitted when the checkbox focused state changes
   *
   * @internal
   */
  @Event() calciteCheckboxFocusedChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("mouseenter")
  mouseenter(): void {
    this.hovered = true;
  }

  @Listen("mouseleave")
  mouseleave(): void {
    this.hovered = false;
  }

  private formResetHandler = (): void => {
    this.checked = this.initialChecked;
  };

  private onInputBlur() {
    this.focused = false;
    this.calciteCheckboxFocusedChange.emit(false);
  }

  private onInputFocus() {
    this.focused = true;
    this.calciteCheckboxFocusedChange.emit(true);
  }

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
    this.initialChecked = this.checked;
    this.renderHiddenCheckboxInput();
    const form = closestElementCrossShadowBoundary(this.el, "form") as HTMLFormElement;
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
    connectLabel(this);
  }

  componentDidLoad(): void {
    this.input.setAttribute("aria-label", getLabelText(this));
  }

  disconnectedCallback(): void {
    this.input.parentNode.removeChild(this.input);
    const form = closestElementCrossShadowBoundary(this.el, "form") as HTMLFormElement;
    if (form) {
      form.removeEventListener("reset", this.formResetHandler);
    }
    disconnectLabel(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderHiddenCheckboxInput() {
    this.input = document.createElement("input");
    this.checked && this.input.setAttribute("checked", "");
    this.input.disabled = this.disabled;
    this.input.id = `${this.guid}-input`;
    this.input.name = this.name;
    this.input.onblur = this.onInputBlur.bind(this);
    this.input.onfocus = this.onInputFocus.bind(this);
    this.input.style.cssText = hiddenInputStyle;
    this.input.type = "checkbox";
    this.input.setAttribute("aria-label", getLabelText(this));
    if (this.value) {
      this.input.value = this.value != null ? this.value.toString() : "";
    }
    this.el.appendChild(this.input);
  }

  render(): VNode {
    return (
      <div class={{ focused: this.focused }} onClick={this.clickHandler}>
        <svg class="check-svg" viewBox="0 0 16 16">
          <path d={this.getPath()} />
        </svg>
        <slot />
      </div>
    );
  }
}
