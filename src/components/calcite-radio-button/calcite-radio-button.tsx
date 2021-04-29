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
  VNode,
  Watch
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { focusElement, getElementDir } from "../../utils/dom";
import { Scale, Theme } from "../interfaces";
import { hiddenInputStyle } from "../../utils/form";

@Component({
  tag: "calcite-radio-button",
  styleUrl: "calcite-radio-button.scss",
  scoped: true
})
export class CalciteRadioButton {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteRadioButtonElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The checked state of the radio button. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  @Watch("checked")
  checkedChanged(newChecked: boolean): void {
    if (newChecked) {
      this.uncheckOtherRadioButtonsInGroup();
    }
    if (this.inputEl) {
      this.inputEl.checked = newChecked;
    }
    this.calciteRadioButtonCheckedChange.emit(newChecked);
  }

  /** The disabled state of the radio button. */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledChanged(disabled: boolean): void {
    this.inputEl.disabled = disabled;
  }

  /**
   * The focused state of the radio button.
   * @private
   */
  @Prop({ mutable: true, reflect: true }) focused = false;

  @Watch("focused")
  focusedChanged(focused: boolean): void {
    if (!this.inputEl) {
      return;
    }
    if (focused && !this.el.hasAttribute("hidden")) {
      this.inputEl.focus();
    } else {
      this.inputEl.blur();
    }
  }

  /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true, mutable: true }) guid: string;

  /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
  @Prop({ reflect: true }) hidden = false;

  @Watch("hidden")
  hiddenChanged(newHidden: boolean): void {
    this.inputEl.hidden = newHidden;
  }

  /**
   * The hovered state of the radio button.
   * @private
   */
  @Prop({ reflect: true, mutable: true }) hovered = false;

  /** The name of the radio button.  <code>name</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
  @Prop({ reflect: true }) name: string;

  @Watch("name")
  nameChanged(newName: string): void {
    if (this.name === newName) {
      return;
    }
    if (this.inputEl) {
      this.inputEl.name = newName;
    }
    this.checkLastRadioButton();
    const currentValue: HTMLInputElement = this.rootNode.querySelector(
      `input[name="${this.name}"]:checked`
    );
    if (!currentValue?.value) {
      this.uncheckAllRadioButtonsInGroup();
    }
  }

  /** Requires that a value is selected for the radio button group before the parent form will submit. */
  @Prop({ reflect: true }) required = false;

  @Watch("required")
  requiredChanged(required: boolean): void {
    this.inputEl.required = required;
  }

  /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
  @Prop({ reflect: true }) theme: Theme;

  /** The value of the radio button. */
  @Prop() value!: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private initialChecked: boolean;

  private inputEl: HTMLInputElement;

  private radio: HTMLCalciteRadioElement;

  private rootNode: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.inputEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private checkLastRadioButton(): void {
    const radioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter(
      (radioButton: HTMLCalciteRadioButtonElement) => radioButton.name === this.name
    ) as HTMLCalciteRadioButtonElement[];

    const checkedRadioButtons = radioButtons.filter((radioButton) => radioButton.checked);

    if (checkedRadioButtons?.length > 1) {
      const lastCheckedRadioButton = checkedRadioButtons[checkedRadioButtons.length - 1];
      checkedRadioButtons
        .filter((checkedRadioButton) => checkedRadioButton !== lastCheckedRadioButton)
        .forEach((checkedRadioButton: HTMLCalciteRadioButtonElement) => {
          checkedRadioButton.checked = false;
          checkedRadioButton.emitCheckedChange();
        });
    }
  }

  /** @internal */
  @Method()
  async emitCheckedChange(): Promise<void> {
    this.calciteRadioButtonCheckedChange.emit();
  }

  private setInputEl = (el): void => {
    this.inputEl = el;
  };

  private uncheckAllRadioButtonsInGroup(): void {
    const otherRadioButtons = Array.from(
      this.rootNode.querySelectorAll("calcite-radio-button")
    ).filter(
      (radioButton: HTMLCalciteRadioButtonElement) => radioButton.name === this.name
    ) as HTMLCalciteRadioButtonElement[];
    otherRadioButtons.forEach((otherRadioButton: HTMLCalciteRadioButtonElement) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }

  private uncheckOtherRadioButtonsInGroup(): void {
    const otherRadioButtons = Array.from(
      this.rootNode.querySelectorAll("calcite-radio-button")
    ).filter(
      (radioButton: HTMLCalciteRadioButtonElement) =>
        radioButton.name === this.name && radioButton.guid !== this.guid
    ) as HTMLCalciteRadioButtonElement[];
    otherRadioButtons.forEach((otherRadioButton: HTMLCalciteRadioButtonElement) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires only when the radio button is checked.  This behavior is identical to the native HTML input element.
   * Since this event does not fire when the radio button is unchecked, it's not recommended to attach a listener for this event
   * directly on the element, but instead either attach it to a node that contains all of the radio buttons in the group
   * or use the calciteRadioButtonGroupChange event if using this with calcite-radio-button-group.
   */
  @Event() calciteRadioButtonChange: EventEmitter;

  /**
   * Fires when the checked property changes.  This is an internal event used for styling purposes only.
   * Use calciteRadioButtonChange or calciteRadioButtonGroupChange for responding to changes in the checked value for forms.
   * @internal
   */
  @Event() calciteRadioButtonCheckedChange: EventEmitter;

  /**
   * Fires when the radio button is either focused or blurred.
   * @internal
   */
  @Event() calciteRadioButtonFocusedChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  check(event: MouseEvent | FocusEvent): void {
    // Prevent parent label from clicking the first radio when calcite-radio-button is clicked
    if (this.el.closest("label") && (event.target === this.el || event.target === this.radio)) {
      event.preventDefault();
    }
    if (!this.disabled && !this.hidden) {
      this.uncheckOtherRadioButtonsInGroup();
      this.checked = true;
      this.focused = true;
      this.calciteRadioButtonChange.emit();
    }
  }

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
    this.initialChecked && this.inputEl?.setAttribute("checked", "");
  };

  private hideInputEl = (): void => {
    this.inputEl.style.cssText = hiddenInputStyle;
  };

  private onInputBlur = (): void => {
    this.focused = false;
    this.calciteRadioButtonFocusedChange.emit();
  };

  private onInputFocus = (): void => {
    this.focused = true;
    this.calciteRadioButtonFocusedChange.emit();
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.rootNode = this.el.getRootNode() as HTMLElement;
    this.guid = this.el.id || `calcite-radio-button-${guid()}`;
    this.initialChecked = this.checked;
    if (this.name) {
      this.checkLastRadioButton();
    }
    const form = this.el.closest("form");
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
  }

  componentDidLoad(): void {
    this.hideInputEl();
    if (this.focused) {
      this.inputEl.focus();
    }
  }

  disconnectedCallback(): void {
    const form = this.el.closest("form");
    if (form) {
      form.removeEventListener("reset", this.formResetHandler);
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderLabel(): VNode {
    if (this.el.textContent) {
      return (
        <calcite-label
          dir={getElementDir(this.el)}
          disable-spacing
          disabled={this.disabled}
          for={`${this.guid}-input`}
          layout="inline"
          scale={this.scale}
        >
          <slot />
        </calcite-label>
      );
    }
    return <slot />;
  }

  render(): VNode {
    const value = this.value?.toString();

    return (
      <Host>
        <div class={{ container: true, "container--labeled": !!this.el.textContent }}>
          <input
            aria-label={value || this.guid}
            checked={this.checked}
            disabled={this.disabled}
            hidden={this.hidden}
            id={`${this.guid}-input`}
            name={this.name}
            onBlur={this.onInputBlur}
            onFocus={this.onInputFocus}
            ref={this.setInputEl}
            required={this.required}
            type="radio"
            value={value}
          />
          <calcite-radio
            checked={this.checked}
            disabled={this.disabled}
            focused={this.focused}
            hidden={this.hidden}
            hovered={this.hovered}
            ref={(el) => (this.radio = el)}
            scale={this.scale}
            theme={this.theme}
          />
          {this.renderLabel()}
        </div>
      </Host>
    );
  }
}
