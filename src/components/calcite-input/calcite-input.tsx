import {
  Component,
  Element,
  Host,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
} from "@stencil/core";
import {
  getElementDir,
  getElementProp,
  getElementTheme,
} from "../../utils/dom";

@Component({
  tag: "calcite-input",
  styleUrl: "calcite-input.scss",
  shadow: false,
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
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l";

  /** specify the alignment of the value of the input */
  @Prop({ mutable: true, reflect: true }) alignment: "start" | "end" = "start";

  /** input value */
  @Prop({ mutable: true, reflect: true }) value?: string = "";

  /** input step */
  @Prop({ mutable: true, reflect: true }) step?: string = "";

  /** input min */
  @Prop({ mutable: true, reflect: true }) min?: string = "";

  /** input max */
  @Prop({ mutable: true, reflect: true }) max?: string = "";

  /** optionally add prefix  **/
  @Prop({ mutable: true }) prefixText?: string;

  /** optionally add suffix  **/
  @Prop({ mutable: true }) suffixText?: string;

  /** for recognized input types, show an icon if applicable */
  @Prop({ mutable: true, reflect: true }) icon: string | boolean = false;

  /** specify the input type */
  @Prop({ mutable: true, reflect: true }) type:
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "image"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "textarea"
    | "time"
    | "url"
    | "week" = "text";

  /** specify the placement of the number buttons */
  @Prop({ mutable: true, reflect: true }) numberButtonType?:
    | "vertical"
    | "horizontal"
    | "none" = "vertical";

  /** specify the alignment of dropdown, defaults to left */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark";

  /** is the input required */
  @Prop() required: boolean = false;

  /** should the input autofocus */
  @Prop() autofocus: boolean = false;

  /** explicitly whitelist placeholder attribute */
  @Prop() placeholder: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // validate props
    let statusOptions = ["invalid", "valid", "idle"];
    if (!statusOptions.includes(this.status))
      this.status = getElementProp(this.el.parentElement, "status", "idle");

    let theme = ["light", "dark"];
    if (!theme.includes(this.theme))
      this.theme = getElementProp(this.el.parentElement, "theme", "light");

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale))
      this.scale = getElementProp(this.el.parentElement, "scale", "m");

    let alignment = ["start", "end"];
    if (!alignment.includes(this.alignment)) this.alignment = "start";

    let type = [
      "color",
      "date",
      "datetime-local",
      "email",
      "file",
      "image",
      "month",
      "number",
      "password",
      "search",
      "tel",
      "text",
      "textarea",
      "time",
      "url",
      "week",
    ];
    if (!type.includes(this.type)) this.type = "text";

    let numberButtonType = ["vertical", "horizontal", "none"];
    if (!numberButtonType.includes(this.numberButtonType))
      this.numberButtonType = "vertical";

    // if an icon string is not provided, but icon is true and a default icon is present
    // for the requested type, set that as the icon
    let typesWithIcons = ["date", "email", "password", "search", "tel", "time"];
    this.icon = this.icon
      ? (this.icon as string)
      : this.icon !== false && typesWithIcons.includes(this.type)
      ? this.iconTypeDefaults[this.type]
      : false;
  }

  componentDidLoad() {
    this.childEl = this.el.querySelector(`${this.childElType}`);
  }

  componentWillLoad() {
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.hasAction = !!this.el.querySelector("[slot=input-action]");
  }

  componentWillUpdate() {
    this.calciteInputChange.emit({
      element: this.childEl as HTMLInputElement,
      value: this.value,
    });
  }

  render() {
    const dir = getElementDir(this.el);
    const theme = getElementTheme(this.el);
    const attributes = this.getAttributes();
    const loader = (
      <div class="calcite-input-loading">
        <calcite-progress type="indeterminate"></calcite-progress>
      </div>
    );

    const numberButtonClassModifier =
      this.numberButtonType === "horizontal"
        ? "number-button-item-horizontal"
        : null;

    const numberButtonsHorizontalUp = (
      <div
        class={`calcite-input-number-button-item ${numberButtonClassModifier}`}
        onMouseDown={this.updateNumberValue}
        data-adjustment="up"
      >
        <calcite-icon theme={this.theme} icon="chevron-up"></calcite-icon>
      </div>
    );

    const numberButtonsHorizontalDown = (
      <div
        class={`calcite-input-number-button-item ${numberButtonClassModifier}`}
        onMouseDown={this.updateNumberValue}
        data-adjustment="down"
      >
        <calcite-icon theme={this.theme} icon="chevron-down"></calcite-icon>
      </div>
    );

    const numberButtonsVertical = (
      <div class={`calcite-input-number-button-wrapper`}>
        {numberButtonsHorizontalUp}
        {numberButtonsHorizontalDown}
      </div>
    );
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";

    const iconEl = (
      <calcite-icon
        class="calcite-input-icon"
        scale={iconScale}
        theme={this.theme}
        icon={this.icon as string}
      ></calcite-icon>
    );

    const inputAction = (
      <div class="calcite-input-action-wrapper">
        <slot name="input-action"></slot>
      </div>
    );

    const prefixText = (
      <div class="calcite-input-prefix">{this.prefixText}</div>
    );

    const suffixText = (
      <div class="calcite-input-suffix">{this.suffixText}</div>
    );
    const childEl =
      this.childElType !== "textarea" ? (
        <input
          {...attributes}
          onBlur={() => this.inputBlurHandler()}
          onFocus={() => this.inputFocusHandler()}
          onInput={(e) => this.inputChangeHandler(e)}
          type={this.type}
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          placeholder={this.placeholder || ""}
          required={this.required ? true : null}
          autofocus={this.autofocus ? true : null}
        />
      ) : (
        [
          <textarea
            {...attributes}
            onBlur={() => this.inputBlurHandler()}
            onFocus={() => this.inputFocusHandler()}
            onInput={(e) => this.inputChangeHandler(e)}
            required={this.required ? true : null}
            placeholder={this.placeholder || ""}
            autofocus={this.autofocus ? true : null}
          >
            <slot />
          </textarea>,
          <div class="calcite-input-resize-icon-wrapper">
            <calcite-icon icon="chevron-down" scale="s"></calcite-icon>
          </div>,
        ]
      );

    return (
      <Host dir={dir} theme={theme}>
        <div class="calcite-input-wrapper">
          {this.type === "number" && this.numberButtonType === "horizontal"
            ? numberButtonsHorizontalDown
            : null}
          {this.prefixText ? prefixText : null}
          {childEl}
          {this.hasAction ? inputAction : null}
          {this.type === "number" && this.numberButtonType === "vertical"
            ? numberButtonsVertical
            : null}
          {this.suffixText ? suffixText : null}
          {this.type === "number" && this.numberButtonType === "horizontal"
            ? numberButtonsHorizontalUp
            : null}
          {this.icon ? iconEl : null}
          {this.loading ? loader : null}
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

  /** focus the rendered child element */
  @Method()
  async setFocus() {
    if (!this.childEl) {
      return;
    } else if (this.childEl) {
      this.childEl.focus();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** keep track of the rendered child type */
  private childElType?: "input" | "textarea" = "input";

  /** keep track of the rendered child type */
  private childEl?: HTMLInputElement;

  /** determine if there is a slotted action for styling purposes */
  private hasAction: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /** map icons to colors */
  private iconTypeDefaults = {
    tel: "phone",
    password: "lock",
    email: "send",
    date: "calendar",
    time: "clock",
    search: "search",
  };

  private focusChildEl() {
    this.childEl.focus();
  }

  private inputChangeHandler(e) {
    this.value = e.target.value;
    this.calciteInputChange.emit({
      element: this.childEl as HTMLInputElement,
      value: this.value,
    });
  }

  private inputBlurHandler() {
    this.calciteInputBlur.emit({
      element: this.childEl as HTMLInputElement,
      value: this.value,
    });
  }

  private inputFocusHandler() {
    this.calciteInputFocus.emit({
      element: this.childEl as HTMLInputElement,
      value: this.value,
    });
  }

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = [
      "min",
      "max",
      "step",
      "value",
      "icon",
      "loading",
      "scale",
      "status",
      "theme",
      "number-button-type",
    ];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  private updateNumberValue = (e) => {
    // todo, when dropping ie11 support, refactor to use stepup/stepdown
    // prevent blur and re-focus of input on mousedown
    e.preventDefault();
    if (this.childElType === "input" && this.type === "number") {
      let inputMax = this.max && this.max !== "" ? parseFloat(this.max) : null;
      let inputMin = this.min && this.min !== "" ? parseFloat(this.min) : null;
      let inputStep = this.step && this.step !== "" ? parseFloat(this.step) : 1;
      let inputVal =
        this.value && this.value !== "" ? parseFloat(this.value) : 0;

      switch (e.target.dataset.adjustment) {
        case "up":
          if (!inputMax || inputVal < inputMax)
            this.childEl.value = (inputVal += inputStep).toString();
          break;
        case "down":
          if (!inputMin || inputVal > inputMin)
            this.childEl.value = (inputVal -= inputStep).toString();
          break;
      }
      this.value = this.childEl.value.toString();
    }
  };
}
