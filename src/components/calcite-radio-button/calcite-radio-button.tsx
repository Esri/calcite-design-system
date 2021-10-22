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
import { focusElement } from "../../utils/dom";
import { Scale } from "../interfaces";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  hiddenInputStyle,
  FormAssociatedComponent,
  connectForm,
  disconnectForm
} from "../../utils/form";
import { CSS } from "./resources";
import { getKey } from "../../utils/key";
import { getElementDir } from "../../utils/dom";
import { getRoundRobinIndex } from "../../utils/array";

@Component({
  tag: "calcite-radio-button",
  styleUrl: "calcite-radio-button.scss",
  shadow: true
})
export class CalciteRadioButton implements LabelableComponent, FormAssociatedComponent {
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
    this.calciteInternalRadioButtonCheckedChange.emit(newChecked);
  }

  /** The disabled state of the radio button. */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledChanged(disabled: boolean): void {
    this.inputEl.disabled = disabled;
  }

  /**
   * The focused state of the radio button.
   * @internal
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
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) hovered = false;

  /**
   * The label of the radio input
   * @internal
   */
  @Prop() label?: string;

  /** The name of the radio button. `name` is passed as a property automatically from `calcite-radio-button-group`. */
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

  /** The scale (size) of the radio button. `scale` is passed as a property automatically from `calcite-radio-button-group`. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The value of the radio button. */
  @Prop({ mutable: true }) value!: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: CalciteRadioButton["value"];

  private inputEl: HTMLInputElement;

  private rootNode: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.inputEl);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  selectItem = (items: HTMLCalciteRadioButtonElement[], selectedIndex: number): void => {
    items.forEach((item, index) => {
      const selected = index === selectedIndex;
      item.checked = selected;
      item.focused = selected;
    });
  };

  toggle = (): void => {
    this.uncheckAllRadioButtonsInGroup();
    this.checked = true;
    this.focused = true;
    this.calciteRadioButtonChange.emit();
  };

  private clickHandler = (): void => {
    this.toggle();
  };

  onLabelClick(event: CustomEvent): void {
    if (!this.disabled && !this.hidden) {
      this.uncheckOtherRadioButtonsInGroup();
      const label = event.currentTarget as HTMLCalciteLabelElement;
      const radioButton = label.for
        ? this.rootNode.querySelector<HTMLCalciteRadioButtonElement>(
            `calcite-radio-button[id="${label.for}"]`
          )
        : label.querySelector<HTMLCalciteRadioButtonElement>(
            `calcite-radio-button[name="${this.name}"]`
          );

      if (radioButton) {
        radioButton.checked = true;
        radioButton.focused = true;
      }

      this.calciteRadioButtonChange.emit();
      this.setFocus();
    }
  }

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
    this.calciteInternalRadioButtonCheckedChange.emit();
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
      this.rootNode.querySelectorAll(
        `calcite-radio-button[name="${this.name}"]:not([guid="${this.guid}"])`
      )
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
   * Fires when the radio button is blurred.
   * @internal
   */
  @Event() calciteInternalRadioButtonBlur: EventEmitter;

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
  @Event() calciteInternalRadioButtonCheckedChange: EventEmitter;

  /**
   * Fires when the radio button is focused.
   * @internal
   */
  @Event() calciteInternalRadioButtonFocus: EventEmitter;

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

  @Listen("keydown")
  protected handleKeyDown(event: KeyboardEvent): void {
    const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
    const key = getKey(event.key);
    const { el } = this;

    if (keys.indexOf(key) === -1) {
      return;
    }

    let adjustedKey = key;

    if (getElementDir(el) === "rtl") {
      if (key === "ArrowRight") {
        adjustedKey = "ArrowLeft";
      }
      if (key === "ArrowLeft") {
        adjustedKey = "ArrowRight";
      }
    }

    const radioButtons = Array.from(
      this.rootNode.querySelectorAll("calcite-radio-button:not([hidden]")
    ).filter(
      (radioButton: HTMLCalciteRadioButtonElement) => radioButton.name === this.name
    ) as HTMLCalciteRadioButtonElement[];
    let currentIndex = -1;

    const radioButtonsLength = radioButtons.length;

    radioButtons.some((item, index) => {
      if (item.checked) {
        currentIndex = index;
        return true;
      }
    });

    switch (adjustedKey) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        this.selectItem(
          radioButtons,
          getRoundRobinIndex(Math.max(currentIndex - 1, -1), radioButtonsLength)
        );
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        this.selectItem(radioButtons, getRoundRobinIndex(currentIndex + 1, radioButtonsLength));
        return;
      default:
        return;
    }
  }

  private hideInputEl = (): void => {
    this.inputEl.style.cssText = hiddenInputStyle;
  };

  private onInputBlur = (): void => {
    this.focused = false;
    this.calciteInternalRadioButtonBlur.emit();
  };

  private onInputFocus = (): void => {
    this.focused = true;
    this.calciteInternalRadioButtonFocus.emit();
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.rootNode = this.el.getRootNode() as HTMLElement;
    this.guid = this.el.id || `calcite-radio-button-${guid()}`;
    if (this.name) {
      this.checkLastRadioButton();
    }
    connectLabel(this);
    connectForm(this);
  }

  componentDidLoad(): void {
    this.hideInputEl();
    if (this.focused) {
      this.inputEl.focus();
    }
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
    const value = this.value?.toString();

    return (
      <Host onClick={this.clickHandler}>
        <div class={CSS.container}>
          <input
            aria-label={getLabelText(this)}
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
            scale={this.scale}
          />
        </div>
      </Host>
    );
  }
}
