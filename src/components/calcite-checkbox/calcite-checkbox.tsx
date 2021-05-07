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
  Watch
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { focusElement, getElementDir } from "../../utils/dom";
import { Scale, Theme } from "../interfaces";
import { hiddenInputStyle } from "../../utils/form";

@Component({
  tag: "calcite-checkbox",
  styleUrl: "calcite-checkbox.scss",
  shadow: true
})
export class CalciteCheckbox {
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
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;

  @Watch("checked")
  checkedWatcher(newChecked: boolean): void {
    this.input.checked = newChecked;
  }

  /** True if the checkbox is disabled */
  @Prop({ reflect: true }) disabled?: boolean = false;

  @Watch("disabled")
  disabledChanged(disabled: boolean): void {
    this.input.disabled = disabled;
  }

  /** The id attribute of the checkbox.  When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true, mutable: true }) guid: string;

  /**
   * The hovered state of the checkbox.
   * @private
   */
  @Prop({ reflect: true, mutable: true }) hovered = false;

  /**
   * True if the checkbox is initially indeterminate,
   * which is independent from its checked state
   * https://css-tricks.com/indeterminate-checkboxes/
   * */
  @Prop({ reflect: true, mutable: true }) indeterminate?: boolean = false;

  /** The name of the checkbox input */
  @Prop({ reflect: true }) name?: string = "";

  @Watch("name")
  nameChanged(newName: string): void {
    this.input.name = newName;
  }

  /** specify the scale of the checkbox, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Determines what theme to use */
  @Prop({ reflect: true }) theme: Theme;

  /** The value of the checkbox input */
  @Prop() value?: any;

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private readonly checkedPath = "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";

  private readonly indeterminatePath = "M4 7h8v2H4z";

  private initialChecked: boolean;

  private input: HTMLInputElement;

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

  @Listen("click")
  onClick(event: MouseEvent): void {
    // This line prevents double-triggering when wrapped inside either a <label> or a <calcite-label>
    // by preventing the browser default behavior, which is to click the label's first input child element
    if (event.target === this.el) {
      event.preventDefault();
    }
    this.toggle();
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
  };

  private nativeLabelClickHandler = ({ target }: MouseEvent): void => {
    if (
      !this.el.closest("calcite-label") &&
      (target as HTMLElement).nodeName === "LABEL" &&
      (target as HTMLLabelElement).parentNode.nodeName !== "CALCITE-LABEL" &&
      this.el.id &&
      (target as HTMLLabelElement).htmlFor === this.el.id
    ) {
      this.toggle();
    }
  };

  private onInputBlur() {
    this.focused = false;
    this.calciteCheckboxFocusedChange.emit(false);
  }

  private onInputFocus() {
    this.focused = true;
    this.calciteCheckboxFocusedChange.emit(true);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.guid = this.el.id || `calcite-checkbox-${guid()}`;
    this.initialChecked = this.checked;
    this.renderHiddenCheckboxInput();
    const form = this.el.closest("form");
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
    document.addEventListener("click", this.nativeLabelClickHandler);
  }

  disconnectedCallback(): void {
    this.input.parentNode.removeChild(this.input);
    const form = this.el.closest("form");
    if (form) {
      form.removeEventListener("reset", this.formResetHandler);
    }
    document.removeEventListener("click", this.nativeLabelClickHandler);
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
    this.input.style.setProperty(
      "top",
      this.el.textContent ? (this.scale === "s" ? "0.125em" : "0.25em") : "0",
      "important"
    );
    this.input.type = "checkbox";
    if (this.value) {
      this.input.value = this.value != null ? this.value.toString() : "";
    }
    this.el.appendChild(this.input);
  }

  render(): VNode {
    if (this.el.textContent) {
      return (
        <Host>
          <div class={{ focused: this.focused, hasLabel: true }}>
            <svg class="check-svg" viewBox="0 0 16 16">
              <path d={this.getPath()} />
            </svg>
            <calcite-label dir={getElementDir(this.el)} disable-spacing scale={this.scale}>
              <slot />
            </calcite-label>
          </div>
        </Host>
      );
    }
    return (
      <Host>
        <div class={{ focused: this.focused }}>
          <svg class="check-svg" viewBox="0 0 16 16">
            <path d={this.getPath()} />
          </svg>
          <slot />
        </div>
      </Host>
    );
  }
}
