import { Scale, Status, Theme } from "../interfaces";
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
import { getAttributes, getElementDir, getElementProp, setRequestedIcon } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { INPUT_TYPE_ICONS } from "./calcite-input.resources";
import { InputPlacement } from "./interfaces";
import { Position } from "../interfaces";

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

  /** specify the alignment of the value of the input */
  @Prop({ reflect: true }) alignment: Position = "start";

  /** should the input autofocus */
  @Prop() autofocus = false;

  /** optionally display a clear button that displays when field has a value
   * shows by default for search, time, date
   * will not display for type="textarea" */
  @Prop({ reflect: true }) clearable?: boolean;

  /** is the input disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  @Watch("disabled")
  disabledWatcher(): void {
    if (this.disabled) this.setDisabledAction();
  }

  /** when used as a boolean set to true, show a default recommended icon for certain
   * input types (tel, password, email, date, time, search). You can also pass a
   * calcite-ui-icon name to this prop to display a requested icon for any input type */
  @Prop({ reflect: true }) icon: string | boolean;

  /** flip the icon in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: boolean;

  /** specify if the input is in loading state */
  @Prop({ reflect: true }) loading = false;

  /** input max */
  @Prop({ reflect: true }) max?: number;

  /** watcher to update number-to-string for max */
  @Watch("max")
  maxWatcher(): void {
    this.maxString = this.max?.toString() || null;
  }

  /** input min */
  @Prop({ reflect: true }) min?: number;

  /** watcher to update number-to-string for min */
  @Watch("min")
  minWatcher(): void {
    this.minString = this.min?.toString() || null;
  }

  /** maximum length of text input */
  @Prop({ reflect: true }) maxlength?: number;

  /** specify the placement of the number buttons */
  @Prop({ reflect: true }) numberButtonType?: InputPlacement = "vertical";

  /** explicitly whitelist placeholder attribute */
  @Prop() placeholder: string;

  /** optionally add prefix  */
  @Prop() prefixText?: string;

  /** is the input required */
  @Prop() required = false;

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: Scale = "m";

  /** specify the status of the input field, determines message and icons */
  @Prop({ mutable: true, reflect: true }) status: Status = "idle";

  /** input step */
  @Prop({ reflect: true }) step?: number | "any";

  @Watch("step")
  stepWatcher(): void {
    this.stepString = this.step?.toString() || null;
  }

  /** optionally add suffix  **/
  @Prop() suffixText?: string;

  /** specify the theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

  /** specify the input type */
  @Prop({ reflect: true }) type:
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

  /** input value */
  @Prop({ mutable: true, reflect: true }) value?: string = "";

  @Watch("value")
  valueWatcher(): void {
    this.calciteInputInput.emit({
      element: this.childEl,
      value: this.value
    });
  }

  @Watch("icon")
  @Watch("type")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.status = getElementProp(this.el, "status", this.status);
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.form = this.el.closest("form");
    this.form?.addEventListener("reset", this.reset);
  }

  disconnectedCallback(): void {
    this.form?.removeEventListener("reset", this.reset);
  }

  componentWillLoad(): void {
    this.defaultValue = this.value;
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
    this.minString = this.min?.toString();
    this.maxString = this.max?.toString();
    this.stepString = this.step?.toString();
  }

  componentDidLoad(): void {
    this.slottedActionEl = this.el.querySelector("[slot=input-action]");
    if (this.disabled) this.setDisabledAction();
  }

  get isTextarea(): boolean {
    return this.childElType === "textarea";
  }

  get isClearable(): boolean {
    return !this.isTextarea && (this.clearable || this.type === "search") && this.value.length > 0;
  }

  render(): VNode {
    const dir = getElementDir(this.el);

    const attributes = getAttributes(this.el, [
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
    ]);

    const loader = (
      <div class="calcite-input-loading">
        <calcite-progress type="indeterminate" />
      </div>
    );

    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";

    const inputClearButton = (
      <button
        class="calcite-input-clear-button"
        disabled={this.loading}
        onClick={this.clearInputValue}
      >
        <calcite-icon icon="x" scale={iconScale} theme={this.theme} />
      </button>
    );
    const iconEl = (
      <calcite-icon
        class="calcite-input-icon"
        dir={dir}
        flipRtl={this.iconFlipRtl}
        icon={this.requestedIcon}
        scale={iconScale}
        theme={this.theme}
      />
    );

    const numberButtonClassModifier =
      this.numberButtonType === "horizontal" ? "number-button-item-horizontal" : null;

    const numberButtonsHorizontalUp = (
      <div
        class={`calcite-input-number-button-item ${numberButtonClassModifier}`}
        data-adjustment="up"
        onMouseDown={this.updateNumberValue}
      >
        <calcite-icon icon="chevron-up" scale={iconScale} theme={this.theme} />
      </div>
    );

    const numberButtonsHorizontalDown = (
      <div
        class={`calcite-input-number-button-item ${numberButtonClassModifier}`}
        data-adjustment="down"
        onMouseDown={this.updateNumberValue}
      >
        <calcite-icon icon="chevron-down" scale={iconScale} theme={this.theme} />
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

    const childEl = [
      <this.childElType
        {...attributes}
        autofocus={this.autofocus ? true : null}
        defaultValue={this.defaultValue}
        disabled={this.disabled ? true : null}
        max={this.maxString}
        maxlength={this.maxlength}
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
      >
        {this.value}
      </this.childElType>,
      this.isTextarea ? (
        <div class="calcite-input-resize-icon-wrapper">
          <calcite-icon icon="chevron-down" scale="s" />
        </div>
      ) : null
    ];

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
            {this.requestedIcon ? iconEl : null}
            {this.loading ? loader : null}
          </div>
          <div class="calcite-input-action-wrapper">
            <slot name="input-action" />
          </div>
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

  @Event({ eventName: "calciteInputInput", cancelable: true }) calciteInputInput: EventEmitter;

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

  private form: HTMLFormElement;

  /** keep track of the initial value */
  private defaultValue: string;

  /** keep track of the rendered child type */
  private childElType?: "input" | "textarea" = "input";

  /** keep track of the rendered child type */
  private childEl?: HTMLInputElement | HTMLTextAreaElement;

  /** determine if there is a slotted action for styling purposes */
  private slottedActionEl?: HTMLSlotElement;

  private minString?: string;

  private maxString?: string;

  private stepString?: string;

  /** the computed icon to render */
  private requestedIcon?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private reset = (): void => {
    this.value = this.defaultValue;
  };

  private inputInputHandler = (e) => {
    this.value = e.target.value;
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

  private setDisabledAction(): void {
    if (this.slottedActionEl) (this.slottedActionEl as HTMLElement).setAttribute("disabled", "");
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
      const inputStep = Number(this.stepString) > 0 ? parseFloat(this.stepString) : 1;
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
    }
  };
}
