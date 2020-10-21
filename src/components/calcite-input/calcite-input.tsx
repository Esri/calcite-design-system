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

  /** specify the alignment of the value of the input */
  @Prop({ reflect: true }) alignment: "start" | "end" = "start";

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

  /** for recognized input types, show an icon if applicable */
  @Prop({ reflect: true }) icon: string | boolean = false;

  /** flip the icon in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: boolean;

  /** Allow toggling between read only / editable state */
  @Prop() inlineEditable?: boolean = false;

  /** Enable editing mode for inline-editable inputs */
  @Prop({ mutable: true, reflect: true }) editingEnabled?: boolean = false;

  /** Flag used to disable input controls while an async/longer-running task is in progress. */
  @Prop() isActionInProgress?: boolean = false;

  /** specify if the input is in loading state */
  @Prop({ reflect: true }) loading = false;

  /** input max */
  @Prop({ reflect: true }) max?: number;

  /** watcher to update number-to-string for max */
  @Watch("max")
  maxWatcher(): void {
    this.maxString = this.max.toString() || null;
  }

  /** input min */
  @Prop({ reflect: true }) min?: number;

  /** watcher to update number-to-string for min */
  @Watch("min")
  minWatcher(): void {
    this.minString = this.min.toString() || null;
  }

  /** specify the placement of the number buttons */
  @Prop({ reflect: true }) numberButtonType?: "vertical" | "horizontal" | "none" = "vertical";

  /** explicitly whitelist placeholder attribute */
  @Prop() placeholder: string;

  /** optionally add prefix  **/
  @Prop() prefixText?: string;

  /** is the input required */
  @Prop() required = false;

  /** specify the scale of the input, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the status of the input field, determines message and icons */
  @Prop({ reflect: true }) status: "invalid" | "valid" | "idle" = "idle";

  /** input step */
  @Prop({ reflect: true }) step?: number;

  @Watch("step")
  stepWatcher(): void {
    this.maxString = this.max.toString() || null;
  }

  /** optionally add suffix  **/
  @Prop() suffixText?: string;

  /** specify the alignment of dropdown, defaults to left */
  @Prop({ reflect: true }) theme: "light" | "dark";

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

  @Watch("value") valueWatcher(): void {
    this.calciteInputInput.emit({
      element: this.childEl,
      value: this.value
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.status = getElementProp(this.el, "status", this.status);
    this.scale = getElementProp(this.el, "scale", this.scale);

    // if an icon string is not provided, but icon is true and a default icon is present
    // for the requested type, set that as the icon
    const typesWithIcons = ["date", "email", "password", "search", "tel", "time"];
    this.icon = this.icon
      ? (this.icon as string)
      : this.icon !== false && typesWithIcons.includes(this.type)
      ? this.iconTypeDefaults[this.type]
      : false;
  }

  componentDidLoad(): void {
    this.minString = this.min?.toString();
    this.maxString = this.max?.toString();
    this.stepString = this.step?.toString();
    this.slottedActionEl = this.el.querySelector("[slot=input-action]");
    if (this.disabled) this.setDisabledAction();
    if (this.type === "textarea") this.value = this.slotValue;
  }

  componentDidRender(): void {
    this.labelValue = this.value || this.placeholder;
  }

  componentWillLoad(): void {
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.hasAction = !!this.el.querySelector("[slot=input-action]");
  }

  componentShouldUpdate(newValue: any, _oldValue: any, state: string): boolean {
    if (state === "editingEnabled" && newValue === true) {
      this.shouldSetFocus = true;
      return true;
    }
  }

  componentDidUpdate() {
    if (this.shouldSetFocus) this.setFocus();
    this.shouldSetFocus = false;
  }

  get shouldShowAction(): boolean {
    return this.inlineEditable ? this.hasAction && this.editingEnabled : this.hasAction;
  }

  get shouldShowLoadingIndicator(): boolean {
    return this.loading && !this.inlineEditable;
  }

  get shouldShowInputControls(): boolean {
    return (this.inlineEditable && this.editingEnabled) || !this.inlineEditable;
  }

  get isTextarea(): boolean {
    return this.childElType === "textarea";
  }

  get slotValue(): string | undefined {
    return this.slotRef?.innerText.trim();
  }

  get isClearable(): boolean {
    if (this.inlineEditable && this.editingEnabled && this.hasAction) return true;
    return (
      !this.inlineEditable &&
      this.type !== "textarea" &&
      (this.clearable || this.type === "search") &&
      this.value.length > 0
    );
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const attributes = this.getAttributes();

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
        icon={this.icon as string}
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
      >
        {this.value}
      </this.childElType>,
      this.isTextarea ? (
        <div class="calcite-input-resize-icon-wrapper">
          <calcite-icon icon="chevron-down" scale="s" />
        </div>
      ) : null
    ];

    const labelEl = (
      <div
        class={`calcite-input-inline-editable-label-wrapper ${
          this.shouldShowInputControls ? "" : "is-visible"
        } ${this.hasAction ? "has-action" : ""}`}
      >
        <calcite-label
          class={`calcite-input-inline-editable-label ${!this.value ? "with-placeholder" : ""}`}
          disable-spacing="true"
          onClick={this.enableInputEditingHandler}
          scale={this.scale}
          theme={this.theme}
        >
          {this.labelValue}
        </calcite-label>
        <calcite-button
          appearance="transparent"
          class="calcite-input-enable-editing-button"
          color="dark"
          disabled={this.disabled}
          iconStart="pencil"
          onClick={this.enableInputEditingHandler}
          scale={this.scale}
          theme={this.theme}
        />
      </div>
    );

    return (
      <Host dir={dir} onClick={this.inputFocusHandler}>
        <div ref={(el) => (this.slotRef = el)} style={{ display: "none" }}>
          <slot />
        </div>
        <div class="calcite-input-wrapper">
          {this.type === "number" &&
          this.numberButtonType === "horizontal" &&
          this.shouldShowInputControls ? (
            numberButtonsHorizontalDown
          ) : (
            <div />
          )}
          {this.prefixText && this.shouldShowInputControls ? prefixText : <div />}
          {labelEl}
          <div
            class={`calcite-input-element-wrapper ${
              this.shouldShowInputControls ? "is-visible" : ""
            }`}
          >
            {childEl}
            {this.isClearable && !this.inlineEditable ? inputClearButton : <div />}
            {this.icon && this.shouldShowInputControls ? iconEl : <div />}
            {this.shouldShowLoadingIndicator ? loader : <div />}
          </div>
          <div class="calcite-input-buttons-wrapper">
            {this.isClearable && this.inlineEditable ? inputClearButton : <div />}
            <div
              class={`calcite-input-action-wrapper ${this.shouldShowAction ? "is-visible" : ""}`}
            >
              <slot name="input-action" />
            </div>
          </div>
          {this.type === "number" &&
          this.numberButtonType === "vertical" &&
          this.shouldShowInputControls ? (
            numberButtonsVertical
          ) : (
            <div />
          )}
          {this.suffixText && this.shouldShowInputControls ? suffixText : <div />}
          {this.type === "number" &&
          this.numberButtonType === "horizontal" &&
          this.shouldShowInputControls ? (
            numberButtonsHorizontalUp
          ) : (
            <div />
          )}
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

  @Event() calciteInputEnableEditing: EventEmitter;

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

  /** textarea types set their value via a slot. this ref provides access to it */
  private slotRef?: HTMLElement;

  @State() private labelValue?: string;

  private shouldSetFocus = false;

  private valuePriorToInlineEdit? = this.value;

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
  };

  private inputBlurHandler = () => {
    if (this.inlineEditable && this.editingEnabled && !this.hasAction) this.editingEnabled = false;
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

  private enableInputEditingHandler = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.valuePriorToInlineEdit = this.value;
    this.calciteInputEnableEditing.emit();
  };

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
    if (this.inlineEditable) {
      this.value = this.valuePriorToInlineEdit;
      this.editingEnabled = false;
      return;
    }
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
    }
  };
}
