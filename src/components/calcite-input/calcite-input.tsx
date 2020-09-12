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
  Watch,
  VNode
} from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-input",
  styleUrl: "calcite-input.scss",
  scoped: true
})
export class CalciteInput {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** specify the status of the input field, determines message and icons */
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle";

  /** specify if the input is in loading state */
  @Prop({ reflect: true }) loading = false;

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l";

  /** specify the alignment of the value of the input */
  @Prop({ mutable: true, reflect: true }) alignment: "start" | "end" = "start";

  /** input value */
  @Prop({ mutable: true, reflect: true }) value?: string = "";

  /** optionally display a clear button that displays when field has a value  */
  /** shows by default for search, time, date */
  /** will not display for type="textarea" */
  @Prop({ reflect: true }) clearable?: boolean;

  /** input step */
  @Prop({ reflect: true }) step?: number;

  /** input min */
  @Prop({ reflect: true }) min?: number;

  /** input max */
  @Prop({ reflect: true }) max?: number;

  /** optionally add prefix  **/
  @Prop() prefixText?: string;

  /** optionally add suffix  **/
  @Prop() suffixText?: string;

  /** for recognized input types, show an icon if applicable */
  @Prop({ reflect: true }) icon: string | boolean = false;

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
  @Prop({ mutable: true, reflect: true }) numberButtonType?: "vertical" | "horizontal" | "none" =
    "vertical";

  /** specify the alignment of dropdown, defaults to left */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** is the input required */
  @Prop() required = false;

  /** should the input autofocus */
  @Prop() autofocus = false;

  /** explicitly whitelist placeholder attribute */
  @Prop() placeholder: string;

  /** is the input disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  @Watch("disabled")
  disabledWatcher(): void {
    if (this.disabled) this.setDisabledAction();
  }

  /** watcher to update number-to-string for min max */
  @Watch("min")
  minWatcher(): void {
    this.minString = this.min.toString() || null;
  }

  @Watch("max")
  maxWatcher(): void {
    this.maxString = this.max.toString() || null;
  }

  @Watch("step")
  stepWatcher(): void {
    this.maxString = this.max.toString() || null;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    // validate props
    const status = ["invalid", "valid", "idle"];
    const foundStatus = getElementProp(this.el, "status", "idle");
    if (!status.includes(this.status))
      this.status = !status.includes(foundStatus) ? "idle" : foundStatus;

    const scale = ["s", "m", "l"];
    const foundScale = getElementProp(this.el, "scale", "m");
    if (!scale.includes(this.scale)) {
      this.scale = !scale.includes(foundScale) ? "m" : foundScale;
    }

    const alignment = ["start", "end"];
    if (!alignment.includes(this.alignment)) this.alignment = "start";

    const type = [
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
      "week"
    ];
    if (!type.includes(this.type)) this.type = "text";

    const numberButtonType = ["vertical", "horizontal", "none"];
    if (!numberButtonType.includes(this.numberButtonType)) this.numberButtonType = "vertical";

    // if an icon string is not provided, but icon is true and a default icon is present
    // for the requested type, set that as the icon
    const typesWithIcons = ["date", "email", "password", "search", "tel", "time"];
    this.icon = this.icon
      ? (this.icon as string)
      : this.icon !== false && typesWithIcons.includes(this.type)
      ? this.iconTypeDefaults[this.type]
      : false;

    this.determineClearable();
  }

  componentDidLoad(): void {
    this.minString = this.min?.toString();
    this.maxString = this.max?.toString();
    this.stepString = this.step?.toString();
    this.slottedActionEl = this.el.querySelector("[slot=input-action]");
    this.setDisabledAction();
  }

  componentWillLoad(): void {
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.hasAction = !!this.el.querySelector("[slot=input-action]");
  }

  componentWillUpdate(): void {
    this.determineClearable();
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const attributes = this.getAttributes();

    const loader = (
      <div class="calcite-input-loading">
        <calcite-progress type="indeterminate"></calcite-progress>
      </div>
    );

    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";

    const inputClearButton = (
      <div class="calcite-input-clear-button" onClick={this.clearInputValue}>
        <calcite-icon icon="x" scale={iconScale} theme={this.theme}></calcite-icon>
      </div>
    );
    const iconEl = (
      <calcite-icon
        class="calcite-input-icon"
        icon={this.icon as string}
        scale={iconScale}
        theme={this.theme}
      ></calcite-icon>
    );

    const inputAction = (
      <div class="calcite-input-action-wrapper">
        <slot name="input-action"></slot>
      </div>
    );

    const numberButtonClassModifier =
      this.numberButtonType === "horizontal" ? "number-button-item-horizontal" : null;

    const numberButtonsHorizontalUp = (
      <div
        class={`calcite-input-number-button-item ${numberButtonClassModifier}`}
        data-adjustment="up"
        onMouseDown={this.updateNumberValue}
      >
        <calcite-icon icon="chevron-up" scale={iconScale} theme={this.theme}></calcite-icon>
      </div>
    );

    const numberButtonsHorizontalDown = (
      <div
        class={`calcite-input-number-button-item ${numberButtonClassModifier}`}
        data-adjustment="down"
        onMouseDown={this.updateNumberValue}
      >
        <calcite-icon icon="chevron-down" scale={iconScale} theme={this.theme}></calcite-icon>
      </div>
    );

    const numberButtonsVertical = (
      <div class={`calcite-input-number-button-wrapper`}>
        {numberButtonsHorizontalUp}
        {numberButtonsHorizontalDown}
      </div>
    );

    const prefixText = <div class="calcite-input-prefix">{this.prefixText}</div>;

    const suffixText = <div class="calcite-input-suffix">{this.suffixText}</div>;

    const childEl =
      this.childElType !== "textarea" ? (
        <input
          {...attributes}
          autofocus={this.autofocus ? true : null}
          disabled={this.disabled ? true : null}
          max={this.maxString}
          min={this.minString}
          onBlur={this.inputBlurHandler}
          onFocus={this.inputFocusHandler}
          onInput={this.inputInputHandler}
          placeholder={this.placeholder || ""}
          ref={(el) => (this.childEl = el)}
          required={this.required ? true : null}
          step={this.stepString}
          tabIndex={this.disabled ? -1 : null}
          type={this.type}
          value={this.value}
        />
      ) : (
        [
          <textarea
            {...attributes}
            autofocus={this.autofocus ? true : null}
            disabled={this.disabled ? true : null}
            onBlur={this.inputBlurHandler}
            onFocus={this.inputFocusHandler}
            onInput={this.inputInputHandler}
            placeholder={this.placeholder || ""}
            ref={(el) => (this.childEl = el)}
            required={this.required ? true : null}
            tabIndex={this.disabled ? -1 : null}
          >
            <slot />
          </textarea>,
          <div class="calcite-input-resize-icon-wrapper">
            <calcite-icon icon="chevron-down" scale="s"></calcite-icon>
          </div>
        ]
      );

    return (
      <Host dir={dir} onClick={this.inputFocusHandler}>
        <div class="calcite-input-wrapper">
          {this.type === "number" && this.numberButtonType === "horizontal"
            ? numberButtonsHorizontalDown
            : null}
          {this.prefixText ? prefixText : null}
          <div class="calcite-input-element-wrapper">
            {childEl}
            {this.isClearable ? inputClearButton : null}
            {this.icon ? iconEl : null}
            {this.loading ? loader : null}
          </div>
          {this.hasAction ? inputAction : null}
          {this.type === "number" && this.numberButtonType === "vertical"
            ? numberButtonsVertical
            : null}
          {this.suffixText ? suffixText : null}
          {this.type === "number" && this.numberButtonType === "horizontal"
            ? numberButtonsHorizontalUp
            : null}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown")
  keyDownHandler(e: KeyboardEvent): void {
    if (this.isClearable && getKey(e.key) === "Escape") {
      this.clearInputValue();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteInputFocus: EventEmitter;

  @Event() calciteInputBlur: EventEmitter;

  @Event({
    eventName: "calciteInputInput",
    cancelable: true
  })
  calciteInputInput: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** focus the rendered child element */
  @Method()
  async setFocus(): Promise<void> {
    this.childEl?.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** keep track of the rendered child type */
  private childElType?: "input" | "textarea" = "input";

  /** keep track of the rendered child type */
  private childEl?: HTMLInputElement | HTMLTextAreaElement;

  /** determine if there is a slotted action for styling purposes */
  private hasAction = false;

  /** determine if there is a slotted action for styling purposes */
  private slottedActionEl?: HTMLSlotElement;

  /** track if the input is clearable */
  private isClearable = false;

  private minString?: string;

  private maxString?: string;

  private stepString?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /** map icons to colors */
  private iconTypeDefaults = {
    tel: "phone",
    password: "lock",
    email: "email-address",
    date: "calendar",
    time: "clock",
    search: "search"
  };

  private inputInputHandler = (e) => {
    this.value = e.target.value;
    this.calciteInputInput.emit({
      element: this.childEl,
      value: this.value
    });
  };

  private inputBlurHandler = () => {
    this.calciteInputBlur.emit({
      element: this.childEl,
      value: this.value
    });
  };

  private inputFocusHandler = (e) => {
    if (e.target !== this.slottedActionEl) this.setFocus();
    this.calciteInputFocus.emit({
      element: this.childEl,
      value: this.value
    });
  };

  private determineClearable(): void {
    this.isClearable =
      this.type !== "textarea" &&
      (this.clearable || this.type === "search") &&
      this.value.length > 0;
  }

  private setDisabledAction(): void {
    if (this.slottedActionEl) (this.slottedActionEl as HTMLElement).setAttribute("disabled", "");
  }

  private getAttributes(): Record<string, any> {
    // spread attributes from the component to rendered child, filtering out props
    const props = [
      "alignment",
      "dir",
      "clearable",
      "min",
      "max",
      "step",
      "value",
      "icon",
      "loading",
      "prefix-text",
      "scale",
      "status",
      "suffix-text",
      "theme",
      "number-button-type"
    ];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  private clearInputValue = () => {
    this.value = "";
  };

  private updateNumberValue = (e) => {
    // todo, when dropping ie11 support, refactor to use stepup/stepdown
    // prevent blur and re-focus of input on mousedown
    e.preventDefault();
    if (this.childElType === "input" && this.type === "number") {
      const inputMax = this.maxString ? parseFloat(this.maxString) : null;
      const inputMin = this.minString ? parseFloat(this.minString) : null;
      const inputStep = this.stepString ? parseFloat(this.stepString) : 1;
      let inputVal = this.value && this.value !== "" ? parseFloat(this.value) : 0;

      switch (e.target.dataset.adjustment) {
        case "up":
          if ((!inputMax && inputMax !== 0) || inputVal < inputMax)
            this.childEl.value = (inputVal += inputStep).toString();
          break;
        case "down":
          if ((!inputMin && inputMin !== 0) || inputVal > inputMin)
            this.childEl.value = (inputVal -= inputStep).toString();
          break;
      }
      this.value = this.childEl.value.toString();
      this.calciteInputInput.emit({
        element: this.childEl,
        value: this.value
      });
    }
  };
}
