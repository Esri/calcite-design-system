import {
  Component,
  Host,
  h,
  Listen,
  Prop,
  Element,
  Watch,
  Event,
  EventEmitter,
  VNode
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-radio-button",
  styleUrl: "calcite-radio-button.scss",
  shadow: true
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
    this.input.checked = newChecked;
    this.calciteRadioButtonCheckedChange.emit(newChecked);
  }

  /** The disabled state of the radio button. */
  @Prop({ reflect: true }) disabled?: boolean = false;

  @Watch("disabled")
  disabledChanged(disabled: boolean): void {
    this.input.disabled = disabled;
  }

  /** The focused state of the radio button. */
  @Prop({ mutable: true, reflect: true }) focused = false;

  @Watch("focused")
  focusedChanged(focused: boolean): void {
    if (focused && !this.el.hasAttribute("hidden")) {
      this.input.focus();
    } else {
      this.input.blur();
    }
  }

  /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true }) guid: string;

  /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
  @Prop({ reflect: true }) hidden = false;

  @Watch("hidden")
  hiddenChanged(newHidden: boolean): void {
    this.input.hidden = newHidden;
  }

  /** The hovered state of the radio button. */
  @Prop({ reflect: true, mutable: true }) hovered = false;

  /** The name of the radio button.  <code>name</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
  @Prop({ reflect: true }) name!: string;

  @Watch("name")
  nameChanged(newName: string): void {
    this.input.name = newName;
    this.checkFirstRadioButton();
    const currentValue: HTMLInputElement = document.querySelector(
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
    this.input.required = required;
  }

  /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** The value of the radio button. */
  @Prop({ reflect: true }) value!: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private input: HTMLInputElement;

  private label: HTMLCalciteLabelElement;

  private titleAttributeObserver: MutationObserver;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private checkFirstRadioButton(): void {
    const radioButtons = Array.from(document.querySelectorAll("calcite-radio-button")).filter(
      (radioButton) => radioButton.name === this.name
    ) as HTMLCalciteRadioButtonElement[];
    let firstCheckedRadioButton: HTMLCalciteRadioButtonElement;
    if (radioButtons?.length > 0) {
      radioButtons.forEach((radioButton: HTMLCalciteRadioButtonElement) => {
        if (firstCheckedRadioButton) {
          radioButton.checked = false;
          this.calciteRadioButtonCheckedChange.emit(false);
        } else if (radioButton.checked) {
          firstCheckedRadioButton = radioButton;
        }
      });
    }
  }

  private setupTitleAttributeObserver(): void {
    this.titleAttributeObserver = new MutationObserver(() => {
      this.input.title = this.el.getAttribute("title");
    });
    this.titleAttributeObserver.observe(this.el, {
      attributes: true,
      attributeFilter: ["title"]
    });
  }

  private uncheckAllRadioButtonsInGroup(): void {
    const otherRadioButtons = Array.from(document.querySelectorAll("calcite-radio-button")).filter(
      (radioButton) => radioButton.name === this.name
    ) as HTMLCalciteRadioButtonElement[];
    otherRadioButtons.forEach((otherRadioButton: HTMLCalciteRadioButtonElement) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }

  private uncheckOtherRadioButtonsInGroup(): void {
    const otherRadioButtons = Array.from(document.querySelectorAll("calcite-radio-button")).filter(
      (radioButton) => radioButton.name === this.name && radioButton.guid !== this.guid
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

  /** Fires only when the radio button is checked.  This behavior is identical to the native HTML input element.
   * Since this event does not fire when the radio button is unchecked, it's not recommended to attach a listener for this event
   * directly on the element, but instead either attach it to a node that contains all of the radio buttons in the group
   * or use the calciteRadioButtonGroupChange event if using this with calcite-radio-button-group.
   */
  @Event() calciteRadioButtonChange: EventEmitter;

  /** Fires when the checked property changes.  This is an internal event used for styling purposes only.
   * Use calciteRadioButtonChange or calciteRadioButtonGroupChange for responding to changes in the checked value for forms.
   * @internal
   */
  @Event() calciteRadioButtonCheckedChange: EventEmitter;

  /** Fires when the radio button is either focused or blurred. */
  @Event() calciteRadioButtonFocusedChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  check(event: MouseEvent | FocusEvent): void {
    // Prevent parent label from clicking the first radio when calcite-radio-button is clicked
    if (this.el.closest("label") && event.target === this.el) {
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

  private onInputBlur(): void {
    this.focused = false;
    this.calciteRadioButtonFocusedChange.emit();
  }

  private onInputFocus(): void {
    this.focused = true;
    this.calciteRadioButtonFocusedChange.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.guid = this.el.id || `calcite-radio-button-${guid()}`;
    this.renderInput();
    this.renderLabel();
    this.setupTitleAttributeObserver();
    if (this.name) {
      this.checkFirstRadioButton();
    }
  }

  componentDidLoad(): void {
    if (this.focused) {
      this.input.focus();
    }
  }

  disconnectedCallback(): void {
    this.input.parentNode.removeChild(this.input);
    this.titleAttributeObserver.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderInput(): void {
    // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
    // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
    this.input = document.createElement("input");
    this.input.setAttribute("aria-label", this.value || this.guid);
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.hidden = this.hidden;
    this.input.id = `${this.guid}-input`;
    if (this.name) {
      this.input.name = this.name;
    }
    this.input.onblur = this.onInputBlur.bind(this);
    this.input.onfocus = this.onInputFocus.bind(this);

    // We're using option #3 explained here to hide the radio input without compromising accessibility
    // @link https://blog.bitsrc.io/customise-radio-buttons-without-compromising-accessibility-b03061b5ba93
    // The only difference is we're using "fixed" instead of "absolute" positioning thanks to this StackOverflow:
    // @link https://stackoverflow.com/questions/24299567/radio-button-causes-browser-to-jump-to-the-top/24323870
    this.input.style.opacity = "0";
    this.input.style.position = "fixed";
    this.input.style.zIndex = "-1";

    if (this.value) {
      this.input.value = this.value;
    }
    this.input.required = this.required;

    if (this.el.getAttribute("title")) {
      this.input.title = this.el.getAttribute("title");
    } else if (this.name && this.value) {
      this.input.title = `Radio button with name of ${this.name} and value of ${this.value}`;
    } else {
      this.input.title = this.guid;
    }

    this.input.type = "radio";
    this.el.insertAdjacentElement("beforeend", this.input);
  }

  private renderLabel(): void {
    // Rendering a calcite-label outside of Shadow DOM for accessibility and form participation
    this.el.childNodes.forEach((childNode) => {
      if (childNode.nodeName === "#text" && childNode.textContent.trim().length > 0) {
        this.label = document.createElement("calcite-label");
        this.label.setAttribute("dir", getElementDir(this.el));
        this.disabled && this.label.setAttribute("disabled", "");
        this.label.setAttribute("disable-spacing", "");
        this.label.setAttribute("scale", this.scale);
        this.label.appendChild(document.createTextNode(childNode.textContent.trim()));
        childNode.parentNode.replaceChild(this.label, childNode);
      }
    });
  }

  render(): VNode {
    return (
      <Host
        aria-checked={this.checked.toString()}
        aria-disabled={this.disabled.toString()}
        labeled={this.el.textContent ? true : false}
      >
        <div class="radio" />
        <slot />
      </Host>
    );
  }
}
