import {
  Component,
  Element,
  Host,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State
} from "@stencil/core";
import { getElementProp } from "../../utils/dom";
import { chevronUp16F } from "@esri/calcite-ui-icons";
import { chevronDown16F } from "@esri/calcite-ui-icons";
import { phone16F } from "@esri/calcite-ui-icons";
import { send16F } from "@esri/calcite-ui-icons";
import { lock16F } from "@esri/calcite-ui-icons";
import { calendar16F } from "@esri/calcite-ui-icons";
import { clock16F } from "@esri/calcite-ui-icons";
import { search16F } from "@esri/calcite-ui-icons";
import { getElementDir } from "../../utils/dom";
import CalciteIcon from "../../utils/CalciteIcon";

@Component({
  tag: "calcite-input",
  styleUrl: "calcite-input.scss",
  shadow: false
})

export class CalciteInput {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** specify the status of the input field, determines message and icons */
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle";

  /** specify if the input is in loading state */
  @Prop({ mutable: true, reflect: true }) loading: boolean = false;

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the appearance type - minimal or default */
  @Prop({ mutable: true, reflect: true }) appearance: "minimal" | "default" =
    "default";

  /** specify the width */
  @Prop({ mutable: true, reflect: true }) width: "auto" | "half" | "full" =
    "full";

  /** optionally pass icon path data - pass only raw path data from calcite ui helper  */
  @Prop({ mutable: true, reflect: true }) icon?: string;

  /** specify the placement of the number buttons */
  @Prop({ mutable: true, reflect: true }) numberType?:
    | "vertical"
    | "horizontal" = "vertical";

  /** specify the alignment of dropdown, defaults to left */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** is the input required */
  @Prop() required: boolean = false;

  /** should the input autofocus */
  @Prop() autofocus: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // validate props
    let statusOptions = ["invalid", "valid", "idle"];
    if (!statusOptions.includes(this.status))
      this.status = getElementProp(this.el, "status", "idle");

    let theme = ["light", "dark"];
    if (!theme.includes(this.theme)) this.theme = "light";

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let width = ["auto", "half", "full"];
    if (!width.includes(this.width)) this.width = "full";

    let appearance = ["minimal", "default"];
    if (!appearance.includes(this.appearance)) this.appearance = "default";

    let numberType = ["vertical", "horizontal"];
    if (this.inputType === "number" && !numberType.includes(this.numberType))
      this.numberType = "vertical";
  }

  componentDidLoad() {
    this.childEl = this.el.querySelector(`${this.childElType}`);
  }

  componentWillLoad() {
    this.inputType = this.el.getAttribute("type");
    this.inputValue = this.el.getAttribute("value");
    this.childElType = this.inputType === "textarea" ? "textarea" : "input";
    if (!this.icon && this.iconTypeDefaults[this.inputType])
      this.icon = this.iconTypeDefaults[this.inputType];
  }

  componentWillUpdate() {
    this.calciteInputChange.emit({
      element: this.childEl as HTMLInputElement,
      value: this.inputValue
    });
  }

  render() {
    const dir = getElementDir(this.el);
    const attributes = this.getAttributes();
    const loader = (
      <div class="calcite-input-loading">
        <calcite-progress type="indeterminate"></calcite-progress>
      </div>
    );
    const icon = this.setIcon(this.icon);

    // todo cleanup
    const numberButtonClass =
      this.numberType === "horizontal"
        ? "calcite-input-number-button-wrapper-horizontal"
        : null;

    const numberButtons = (
      <div class={`calcite-input-number-button-wrapper ${numberButtonClass}`}>
        <div
          class="calcite-input-number-button-item"
          onClick={e => this.handleNumberButtonClick(e)}
          data-adjustment="up"
        >
          <CalciteIcon size="16" path={chevronUp16F} />
        </div>
        <div
          class="calcite-input-number-button-item"
          onClick={e => this.handleNumberButtonClick(e)}
          data-adjustment="down"
        >
          <CalciteIcon size="16" path={chevronDown16F} />
        </div>
      </div>
    );

    const childEl =
      this.childElType !== "textarea" ? (
        <input
          {...attributes}
          onBlur={() => this.inputBlurHandler()}
          onFocus={() => this.inputFocusHandler()}
          onInput={e => this.inputChangeHandler(e)}
          value={this.inputValue}
          required={this.required ? true : null}
          autofocus={this.autofocus ? true : null}
        />
      ) : (
        <textarea
          {...attributes}
          onBlur={() => this.inputBlurHandler()}
          onFocus={() => this.inputFocusHandler()}
          onInput={e => this.inputChangeHandler(e)}
          required={this.required ? true : null}
          autofocus={this.autofocus ? true : null}
        >
          <slot />
        </textarea>
      );
    return (
      <Host dir={dir}>
        <div class="calcite-input-wrapper">
          {childEl}
          {this.icon ? icon : null}
          {this.loading ? loader : null}
          {this.inputType === "number" ? numberButtons : null}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("calciteLabelSelectedEvent", { target: "parent" })
  calciteInputLabelSelected(e: CustomEvent) {
    if (e.detail.requestedInput === this.el.id) this.focusChildEl();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteInputFocus: EventEmitter;
  @Event() calciteInputBlur: EventEmitter;
  @Event() calciteInputChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  //* @internal
  @State() inputValue?: any;

  /** keep track of the rendered child type */
  private childElType?: "input" | "textarea" = "input";

  /** keep track of the rendered child type */
  private childEl?: HTMLInputElement;

  // internal input type - refers to number, email, etc not rendered type of child
  private inputType: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /** map icons to colors */
  private iconTypeDefaults = {
    tel: phone16F,
    password: lock16F,
    email: send16F,
    date: calendar16F,
    time: clock16F,
    search: search16F
  };

  private focusChildEl() {
    this.childEl.focus();
  }

  private inputChangeHandler(e) {
    this.inputValue = e.target.value;
    this.calciteInputChange.emit({
      element: this.childEl as HTMLInputElement,
      value: this.inputValue
    });
  }

  private inputBlurHandler() {
    this.calciteInputBlur.emit({
      element: this.childEl as HTMLInputElement,
      value: this.inputValue
    });
  }

  private inputFocusHandler() {
    this.calciteInputFocus.emit({
      element: this.childEl as HTMLInputElement,
      value: this.inputValue
    });
  }

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = [
      "appearance",
      "icon",
      "loading",
      "scale",
      "status",
      "theme",
    ];
    return Array.from(this.el.attributes)
      .filter(a => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  //todo cleanup
  private handleNumberButtonClick(e) {
    if (this.inputType === "number") {
      let numberInputMax = this.childEl.max
        ? parseFloat(this.childEl.max)
        : null;
      let numberInputMin = this.childEl.min
        ? parseFloat(this.childEl.min)
        : null;
      let numberInputStep = this.childEl.step
        ? parseFloat(this.childEl.step)
        : 1;
      let inputValueAsNumber = parseFloat(this.childEl.value)
        ? parseFloat(this.childEl.value)
        : numberInputMin;

      switch (e.target.dataset.adjustment) {
        case "up":
          if (!numberInputMax || inputValueAsNumber < numberInputMax)
            this.childEl.value = (inputValueAsNumber += numberInputStep).toString();
          break;
        case "down":
          if (!numberInputMin || inputValueAsNumber > numberInputMin)
            this.childEl.value = (inputValueAsNumber -= numberInputStep).toString();
          break;
      }
      this.inputValue = this.childEl.value.toString();
    }
  }

  private setIcon(path) {
    return (
      <div class="calcite-input-icon">
        <CalciteIcon size="16" path={path} />
      </div>
    );
  }
}
