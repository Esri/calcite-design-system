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
  State,
  VNode,
  Watch
} from "@stencil/core";
import { getAttributes, getElementDir, getElementProp, setRequestedIcon } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { INPUT_TYPE_ICONS } from "./calcite-input.resources";
import { InputPlacement } from "./interfaces";
import { Position } from "../interfaces";
import {
  getDecimalSeparator,
  delocalizeNumberString,
  localizeNumberString,
  getGroupSeparator
} from "../../utils/locale";
import { numberKeys } from "../../utils/key";
import { hiddenInputStyle } from "../../utils/form";

type NumberNudgeDirection = "up" | "down";

/**
 * @slot `calcite-action` - A slot for positioning a button next to an input
 */
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
    this.setDisabledAction();
  }

  /** for number values, displays the locale's group separator */
  @Prop() displayGroupSeparator = false;

  /** when used as a boolean set to true, show a default recommended icon for certain
   * input types (tel, password, email, date, time, search). You can also pass a
   * calcite-ui-icon name to this prop to display a requested icon for any input type */
  @Prop({ reflect: true }) icon: string | boolean;

  /** flip the icon in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: boolean;

  /** specify if the input is in loading state */
  @Prop({ reflect: true }) loading = false;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = document.documentElement.lang || "en";

  /**
   * Toggles locale formatting for numbers.
   * @internal
   */
  @Prop() localeFormat = false;

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

  /**
   * Maximum length of text input.
   * @deprecated use maxLength instead
   */
  @Prop({ reflect: true }) maxlength?: number;

  /** Maximum length of the input value */
  @Prop({ reflect: true }) maxLength?: number;

  /** Minimum length of the text input */
  @Prop({ reflect: true }) minLength?: number;

  @Prop({ reflect: true }) name?: string;

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
  @Prop({ mutable: true, reflect: true }) step?: number | "any";

  /** optionally add suffix  **/
  @Prop() suffixText?: string;

  /** specify the theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

  /**
   * specify the input type
   *
   * Note that the following types add type-specific icons by default: `date`, `email`, `password`, `search`, `tel`, `time`
   */
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
  valueWatcher(newValue: string): void {
    if (this.shouldFormatNumberByLocale()) {
      this.setLocalizedValue(newValue);
    }
  }

  @Watch("icon")
  @Watch("type")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  /** keep track of the rendered child type */
  private childEl?: HTMLInputElement | HTMLTextAreaElement;

  /** keep track of the rendered child type */
  private childElType?: "input" | "textarea" = "input";

  /** number text input element for locale */
  private childNumberEl?: HTMLInputElement;

  /** keep track of the initial value */
  private defaultValue: string;

  private form: HTMLFormElement;

  get isClearable(): boolean {
    return !this.isTextarea && (this.clearable || this.type === "search") && this.value.length > 0;
  }

  get isTextarea(): boolean {
    return this.childElType === "textarea";
  }

  private minString?: string;

  private maxString?: string;

  /** the computed icon to render */
  private requestedIcon?: string;

  /** determine if there is a slotted action for styling purposes */
  private slottedActionEl?: HTMLSlotElement;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() localizedValue: string = localizeNumberString(
    this.value,
    this.locale,
    this.displayGroupSeparator
  );

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.form = this.el.closest("form");
    this.form?.addEventListener("reset", this.reset);
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.status = getElementProp(this.el, "status", this.status);
    this.step = !this.step && this.shouldFormatNumberByLocale() ? "any" : this.step;
  }

  disconnectedCallback(): void {
    this.form?.removeEventListener("reset", this.reset);
  }

  componentWillLoad(): void {
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.defaultValue = this.value;
    this.maxString = this.max?.toString();
    this.minString = this.min?.toString();
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }

  componentDidLoad(): void {
    this.slottedActionEl = this.el.querySelector("[slot=input-action]");
    this.setDisabledAction();
    if (this.shouldFormatNumberByLocale()) {
      this.childEl.style.cssText = hiddenInputStyle;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteInputFocus: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteInputBlur: EventEmitter;

  /**
   * This event fires when the value of the input changes.
   */
  @Event({ eventName: "calciteInputInput", cancelable: true }) calciteInputInput: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    if (this.isClearable && getKey(event.key) === "Escape") {
      this.clearInputValue(event);
      event.preventDefault();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** focus the rendered child element */
  @Method()
  async setFocus(): Promise<void> {
    if (this.shouldFormatNumberByLocale()) {
      this.childNumberEl?.focus();
    } else {
      this.childEl?.focus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private clearInputValue = (nativeEvent: KeyboardEvent | MouseEvent): void => {
    this.setValue("", nativeEvent);
  };

  private inputBlurHandler = () => {
    this.calciteInputBlur.emit({
      element: this.childEl,
      value: this.value
    });
  };

  private inputFocusHandler = (event: FocusEvent): void => {
    if (event.target !== this.slottedActionEl) {
      this.setFocus();
    }
    this.calciteInputFocus.emit({
      element: this.childEl,
      value: this.value
    });
  };

  private inputInputHandler = (nativeEvent: InputEvent): void => {
    const value = (nativeEvent.target as HTMLInputElement).value;
    const newValue = this.shouldFormatNumberByLocale()
      ? delocalizeNumberString(value, this.locale)
      : value;
    this.setValue(newValue, nativeEvent);
  };

  private inputNumberKeyDownHandler = (event: KeyboardEvent): void => {
    if (!this.shouldFormatNumberByLocale()) {
      return;
    }
    if (event.key === "ArrowUp") {
      this.nudgeNumberValue("up", event);
      return;
    }
    if (event.key === "ArrowDown") {
      this.nudgeNumberValue("down", event);
      return;
    }
    const supportedKeys = [
      ...numberKeys,
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "Backspace",
      "Escape",
      "Tab",
      "-"
    ];
    if (event.metaKey) {
      return;
    }
    if (supportedKeys.includes(event.key)) {
      return;
    }
    if (event.key == getGroupSeparator(this.locale)) {
      return;
    }
    if (
      event.key == getDecimalSeparator(this.locale) &&
      this.localizedValue.indexOf(event.key) === -1
    ) {
      return;
    }
    event.preventDefault();
  };

  private nudgeNumberValue = (
    direction: NumberNudgeDirection,
    nativeEvent: KeyboardEvent | MouseEvent
  ): void => {
    if (this.type !== "number") {
      return;
    }
    const decimals = this.value?.split(".")[1]?.length || 0;
    const inputMax = this.maxString ? parseFloat(this.maxString) : null;
    const inputMin = this.minString ? parseFloat(this.minString) : null;
    const inputStep = this.step === "any" ? 1 : Math.abs(this.step || 1);
    let inputVal = this.value && this.value !== "" ? parseFloat(this.value) : 0;
    let newValue = this.value;

    if (direction === "up" && ((!inputMax && inputMax !== 0) || inputVal < inputMax)) {
      newValue = (inputVal += inputStep).toFixed(decimals).toString();
    }

    if (direction === "down" && ((!inputMin && inputMin !== 0) || inputVal > inputMin)) {
      newValue = (inputVal -= inputStep).toFixed(decimals).toString();
    }

    this.setValue(newValue, nativeEvent);
  };

  private numberButtonMouseDownHandler = (event: MouseEvent): void => {
    // todo, when dropping ie11 support, refactor to use stepup/stepdown
    // prevent blur and re-focus of input on mousedown
    event.preventDefault();
    const direction = (event.target as HTMLDivElement).dataset.adjustment as NumberNudgeDirection;
    this.nudgeNumberValue(direction, event);
  };

  private reset = (event): void => {
    if (this.type === "number") {
      event.preventDefault();
    }
    this.setValue(this.defaultValue, event);
  };

  private sanitizeNumberString(value: string) {
    return value.endsWith(".") ? value.replace(".", "") : value;
  }

  private setChildElRef = (el) => {
    this.childEl = el;
  };

  private setChildNumberElRef = (el) => {
    this.childNumberEl = el;
  };

  private setDisabledAction(): void {
    if (!this.slottedActionEl) {
      return;
    }
    const slottedActionEl = this.slottedActionEl as HTMLElement;

    this.disabled
      ? slottedActionEl.setAttribute("disabled", "")
      : slottedActionEl.removeAttribute("disabled");
  }

  private setLocalizedValue = (unlocalizedValue: string): void => {
    this.localizedValue = localizeNumberString(
      this.sanitizeNumberString(unlocalizedValue),
      this.locale,
      this.displayGroupSeparator
    );
  };

  private setValue = (value: string, nativeEvent): void => {
    const previousValue = this.value;
    this.value = this.type === "number" ? this.sanitizeNumberString(value) : value;
    if (this.shouldFormatNumberByLocale()) {
      this.setLocalizedValue(value);
    }
    if (this.type === "number" && value.endsWith(".")) {
      return;
    }
    const calciteInputInputEvent = this.calciteInputInput.emit({
      element: this.childEl,
      nativeEvent,
      value
    });
    if (calciteInputInputEvent.defaultPrevented) {
      this.value = previousValue;
      this.setLocalizedValue(previousValue);
    }
  };

  private shouldFormatNumberByLocale = () => {
    return this.type === "number";
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

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
      "number-button-type",
      "locale",
      "display-group-separator"
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
        onMouseDown={this.numberButtonMouseDownHandler}
      >
        <calcite-icon icon="chevron-up" scale={iconScale} theme={this.theme} />
      </div>
    );

    const numberButtonsHorizontalDown = (
      <div
        class={`calcite-input-number-button-item ${numberButtonClassModifier}`}
        data-adjustment="down"
        onMouseDown={this.numberButtonMouseDownHandler}
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

    const localeNumberInput = this.shouldFormatNumberByLocale() ? (
      <input
        autofocus={this.autofocus ? true : null}
        defaultValue={this.defaultValue}
        disabled={this.disabled ? true : null}
        maxLength={this.maxLength}
        minLength={this.minLength}
        onBlur={this.inputBlurHandler}
        onFocus={this.inputFocusHandler}
        onInput={this.inputInputHandler}
        onKeyDown={this.inputNumberKeyDownHandler}
        placeholder={this.placeholder || ""}
        ref={this.setChildNumberElRef}
        tabIndex={0}
        type="text"
        value={this.localizedValue}
      />
    ) : null;

    const childEl = [
      <this.childElType
        {...attributes}
        autofocus={this.autofocus ? true : null}
        defaultValue={this.defaultValue}
        disabled={this.disabled ? true : null}
        max={this.maxString}
        maxLength={this.maxLength}
        min={this.minString}
        minLength={this.minLength}
        onBlur={this.inputBlurHandler}
        onFocus={this.inputFocusHandler}
        onInput={this.inputInputHandler}
        placeholder={this.placeholder || ""}
        ref={this.setChildElRef}
        required={this.required ? true : null}
        step={this.step}
        tabIndex={this.disabled || this.shouldFormatNumberByLocale() ? -1 : null}
        type={this.type}
        value={this.value}
      />,
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
            {localeNumberInput}
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
}
