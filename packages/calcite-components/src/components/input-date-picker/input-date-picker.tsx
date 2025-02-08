import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { FocusTrap } from "focus-trap";
import {
  dateFromISO,
  dateFromLocalizedString,
  dateFromRange,
  datePartsFromISO,
  datePartsFromLocalizedString,
  dateToISO,
  inRange,
} from "../../utils/date";
import { focusFirstTabbable, toAriaBoolean } from "../../utils/dom";
import {
  connectFloatingUI,
  defaultMenuPlacement,
  disconnectFloatingUI,
  filterValidFlipPlacements,
  FloatingCSS,
  FloatingUIComponent,
  FlipPlacement,
  MenuPlacement,
  OverlayPositioning,
  reposition,
  hideFloatingUI,
} from "../../utils/floating-ui";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
  submitForm,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { numberKeys } from "../../utils/key";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectLocalized,
  getSupportedNumberingSystem,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
  getDateFormatSupportedLocale,
} from "../../utils/locale";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { DatePickerMessages } from "../date-picker/assets/date-picker/t9n";
import { DateLocaleData, getLocaleData, getValueAsDateRange } from "../date-picker/utils";
import { HeadingLevel } from "../functional/Heading";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  FocusTrapComponent,
} from "../../utils/focusTrapComponent";
import { guid } from "../../utils/guid";
import { getIconScale } from "../../utils/component";
import { Status } from "../interfaces";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import { syncHiddenFormInput } from "../input/common/input";
import { isBrowser } from "../../utils/browser";
import { normalizeToCurrentCentury, isTwoDigitYear } from "./utils";
import { InputDatePickerMessages } from "./assets/input-date-picker/t9n";
import { CSS, IDS } from "./resources";

@Component({
  tag: "calcite-input-date-picker",
  styleUrl: "input-date-picker.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
})
export class InputDatePicker
  implements
    FloatingUIComponent,
    FocusTrapComponent,
    FormComponent,
    InteractiveComponent,
    LabelableComponent,
    LoadableComponent,
    LocalizedComponent,
    OpenCloseComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When `true`, prevents focus trapping.
   */
  @Prop({ reflect: true }) focusTrapDisabled = false;

  @Watch("focusTrapDisabled")
  handleFocusTrapDisabled(focusTrapDisabled: boolean): void {
    if (!this.open) {
      return;
    }

    focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
  }

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true }) form: string;

  /**
   * When `true`, the component's value can be read, but controls are not accessible and the value cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop({ reflect: true }) readOnly = false;

  @Watch("disabled")
  @Watch("readOnly")
  handleDisabledAndReadOnlyChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  /** Selected date as a string in ISO format (`"yyyy-mm-dd"`). */
  @Prop({ mutable: true }) value: string | string[] = "";

  @Watch("value")
  valueWatcher(newValue: string | string[]): void {
    if (!this.userChangedValue) {
      let newValueAsDate: Date | Date[];

      if (Array.isArray(newValue)) {
        newValueAsDate = getValueAsDateRange(newValue);
      } else if (newValue) {
        newValueAsDate = dateFromISO(newValue);
      } else {
        newValueAsDate = undefined;
      }

      if (!this.valueAsDateChangedExternally && newValueAsDate !== this.valueAsDate) {
        this.valueAsDate = newValueAsDate;
      }

      this.localizeInputValues();
    }
    this.userChangedValue = false;
  }

  @Watch("valueAsDate")
  valueAsDateWatcher(valueAsDate: Date | Date[]): void {
    const newValue = Array.isArray(valueAsDate)
      ? [dateToISO(valueAsDate[0]), dateToISO(valueAsDate[1])]
      : dateToISO(valueAsDate);
    this.datePickerActiveDate = Array.isArray(valueAsDate) ? valueAsDate[0] : valueAsDate;

    if (this.value !== newValue) {
      this.valueAsDateChangedExternally = true;
      this.value = newValue;
      this.valueAsDateChangedExternally = false;
    }
  }

  /**
   * Specifies the component's fallback `calcite-date-picker` `placement` when it's initial or specified `placement` has insufficient space available.
   */
  @Prop() flipPlacements: FlipPlacement[];

  @Watch("flipPlacements")
  flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  /**
   * Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /** The component's value as a full date object. */
  @Prop({ mutable: true }) valueAsDate: Date | Date[];

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<InputDatePickerMessages & DatePickerMessages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: InputDatePickerMessages;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /** Specifies the earliest allowed date as a full date object. */
  @Prop({ mutable: true }) minAsDate: Date;

  /** Specifies the latest allowed date as a full date object. */
  @Prop({ mutable: true }) maxAsDate: Date;

  /** Specifies the earliest allowed date ("yyyy-mm-dd"). */
  @Prop({ reflect: true }) min: string;

  @Watch("min")
  onMinChanged(min: string): void {
    this.minAsDate = dateFromISO(min);
  }

  /** Specifies the latest allowed date ("yyyy-mm-dd"). */
  @Prop({ reflect: true }) max: string;

  @Watch("max")
  onMaxChanged(max: string): void {
    this.maxAsDate = dateFromISO(max);
  }

  /**
   * Specifies the monthStyle used by the component.
   */
  @Prop() monthStyle: "abbreviated" | "wide" = "wide";

  /** When `true`, displays the `calcite-date-picker` component. */
  @Prop({ mutable: true, reflect: true }) open = false;

  @Watch("open")
  openHandler(): void {
    onToggleOpenCloseComponent(this);

    if (this.disabled || this.readOnly) {
      this.open = false;
      return;
    }

    this.reposition(true);
  }

  /** Specifies the validation message to display under the component. */
  @Prop() validationMessage: string;

  /** Specifies the validation icon to display under the component. */
  @Prop({ reflect: true }) validationIcon: IconNameOrString | boolean;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated in form util when syncing hidden input
  @Prop({ mutable: true }) validity: MutableValidityState = {
    valid: false,
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: false,
  };

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /**
   * Specifies the Unicode numeral system used by the component for localization. This property cannot be dynamically changed.
   *
   */
  @Prop({ reflect: true }) numberingSystem: NumberingSystem;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ reflect: true }) status: Status = "idle";

  /**
   * Specifies the placement of the `calcite-date-picker` relative to the component.
   *
   * @default "bottom-start"
   */
  @Prop({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /** When `true`, activates a range for the component. */
  @Prop({ reflect: true }) range = false;

  /** When `true`, the component must have a value in order for the form to submit. */
  @Prop({ reflect: true }) required = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  @Watch("overlayPositioning")
  overlayPositioningHandler(): void {
    this.reposition(true);
  }

  /**
   * When `true`, disables the default behavior on the third click of narrowing or extending the range.
   * Instead starts a new range.
   */
  @Prop() proximitySelectionDisabled = false;

  /** Defines the layout of the component. */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  private calciteInternalInputInputHandler = (event: CustomEvent<any>): void => {
    const target = event.target as HTMLCalciteInputElement;
    const value = target.value;
    const parsedValue = this.parseNumerals(value);
    const formattedValue = this.formatNumerals(parsedValue);

    target.value = formattedValue;

    const { year } = datePartsFromLocalizedString(value, this.localeData);

    if (year && year.length < 4) {
      return;
    }

    const date = dateFromLocalizedString(value, this.localeData);

    if (inRange(date, this.min, this.max)) {
      this.datePickerActiveDate = date;
    }
  };

  private calciteInternalInputBlurHandler = (): void => {
    this.commitValue();
  };

  private focusTrapDeactivates = (): void => {
    this.open = false;
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the component's `value` changes.
   */
  @Event({ cancelable: false }) calciteInputDatePickerChange: EventEmitter<void>;

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteInputDatePickerBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteInputDatePickerClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteInputDatePickerBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteInputDatePickerOpen: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  /**
   * Updates the position of the component.
   *
   * @param delayed If true, the repositioning is delayed.
   * @returns void
   */
  @Method()
  async reposition(delayed = false): Promise<void> {
    const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;

    return reposition(
      this,
      {
        floatingEl,
        referenceEl,
        overlayPositioning,
        placement,
        flipPlacements: filteredFlipPlacements,
        type: "menu",
      },
      delayed,
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);

    const { open } = this;
    open && this.openHandler();

    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }

    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }

    if (Array.isArray(this.value)) {
      this.valueAsDate = getValueAsDateRange(this.value);
    } else if (this.value) {
      try {
        const date = dateFromISO(this.value);
        const dateInRange = dateFromRange(date, this.minAsDate, this.maxAsDate);
        this.valueAsDate = dateInRange;
      } catch (error) {
        this.warnAboutInvalidValue(this.value);
        this.value = "";
      }
    } else if (this.valueAsDate) {
      if (this.range && Array.isArray(this.valueAsDate)) {
        this.value = [dateToISO(this.valueAsDate[0]), dateToISO(this.valueAsDate[1])];
      } else if (!this.range && !Array.isArray(this.valueAsDate)) {
        this.value = dateToISO(this.valueAsDate);
      }
    }

    connectLabel(this);
    connectForm(this);
    connectMessages(this);

    this.setFilteredPlacements();

    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false,
    };

    if (this.open) {
      onToggleOpenCloseComponent(this);
    }

    connectFloatingUI(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await Promise.all([this.loadLocaleData(), setUpMessages(this)]);
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.localizeInputValues();
    connectFloatingUI(this);
  }

  disconnectedCallback(): void {
    deactivateFocusTrap(this);
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    const { disabled, effectiveLocale, messages, numberingSystem, readOnly } = this;
    numberStringFormatter.numberFormatOptions = {
      numberingSystem,
      locale: effectiveLocale,
      useGrouping: false,
    };

    return (
      <Host onBlur={this.blurHandler} onKeyDown={this.keyDownHandler}>
        <InteractiveContainer disabled={this.disabled}>
          {this.localeData && (
            <div class={CSS.container}>
              <div class={CSS.inputContainer}>
                <div
                  class={CSS.inputWrapper}
                  data-position="start"
                  onClick={this.onInputWrapperClick}
                  onPointerDown={this.onInputWrapperPointerDown}
                  ref={this.setStartWrapper}
                >
                  <calcite-input-text
                    aria-autocomplete="none"
                    aria-controls={this.dialogId}
                    aria-describedby={this.placeholderTextId}
                    aria-errormessage={IDS.validationMessage}
                    aria-expanded={toAriaBoolean(this.open)}
                    aria-haspopup="dialog"
                    aria-invalid={toAriaBoolean(this.status === "invalid")}
                    class={{
                      [CSS.input]: true,
                      [CSS.inputNoBottomBorder]: this.layout === "vertical" && this.range,
                      [CSS.inputNoRightBorder]: this.range,
                    }}
                    disabled={disabled}
                    icon="calendar"
                    onCalciteInputTextInput={this.calciteInternalInputInputHandler}
                    onCalciteInternalInputTextBlur={this.calciteInternalInputBlurHandler}
                    onCalciteInternalInputTextFocus={this.startInputFocus}
                    placeholder={this.localeData?.placeholder}
                    readOnly={readOnly}
                    ref={this.setStartInput}
                    role="combobox"
                    scale={this.scale}
                    status={this.status}
                  />
                  {!this.readOnly &&
                    !this.range &&
                    this.renderToggleIcon(this.open && this.focusedInput === "start")}
                  <span aria-hidden="true" class={CSS.assistiveText} id={this.placeholderTextId}>
                    Date Format: {this.localeData?.placeholder}
                  </span>
                </div>
                <div
                  aria-hidden={toAriaBoolean(!this.open)}
                  aria-label={messages.chooseDate}
                  aria-live="polite"
                  aria-modal="true"
                  class={CSS.menu}
                  id={this.dialogId}
                  ref={this.setFloatingEl}
                  role="dialog"
                >
                  <div
                    class={{
                      [CSS.calendarWrapper]: true,
                      [FloatingCSS.animation]: true,
                      [FloatingCSS.animationActive]: this.open,
                    }}
                    ref={this.setTransitionEl}
                  >
                    <calcite-date-picker
                      activeDate={this.datePickerActiveDate}
                      activeRange={this.focusedInput}
                      headingLevel={this.headingLevel}
                      layout={this.layout}
                      max={this.max}
                      maxAsDate={this.maxAsDate}
                      messageOverrides={this.messageOverrides}
                      min={this.min}
                      minAsDate={this.minAsDate}
                      monthStyle={this.monthStyle}
                      numberingSystem={numberingSystem}
                      onCalciteDatePickerChange={this.handleDateChange}
                      onCalciteDatePickerRangeChange={this.handleDateRangeChange}
                      proximitySelectionDisabled={this.proximitySelectionDisabled}
                      range={this.range}
                      ref={this.setDatePickerRef}
                      scale={this.scale}
                      tabIndex={this.open ? undefined : -1}
                      valueAsDate={this.valueAsDate}
                    />
                  </div>
                </div>
                {this.range && (
                  <div class={CSS.dividerContainer}>
                    <div class={CSS.divider} />
                  </div>
                )}
                {this.range && (
                  <div
                    class={CSS.inputWrapper}
                    data-position="end"
                    onClick={this.onInputWrapperClick}
                    onPointerDown={this.onInputWrapperPointerDown}
                    ref={this.setEndWrapper}
                  >
                    <calcite-input-text
                      aria-autocomplete="none"
                      aria-controls={this.dialogId}
                      aria-expanded={toAriaBoolean(this.open)}
                      aria-haspopup="dialog"
                      class={{
                        [CSS.input]: true,
                        [CSS.inputNoTopBorder]: this.layout === "vertical" && this.range,
                        [CSS.inputNoLeftBorder]: this.layout === "horizontal" && this.range,
                        [CSS.inputNoRightBorder]: this.layout === "vertical" && this.range,
                      }}
                      disabled={disabled}
                      icon="calendar"
                      onCalciteInputTextInput={this.calciteInternalInputInputHandler}
                      onCalciteInternalInputTextBlur={this.calciteInternalInputBlurHandler}
                      onCalciteInternalInputTextFocus={this.endInputFocus}
                      placeholder={this.localeData?.placeholder}
                      readOnly={readOnly}
                      ref={this.setEndInput}
                      role="combobox"
                      scale={this.scale}
                      status={this.status}
                    />
                    {!this.readOnly &&
                      this.layout === "horizontal" &&
                      this.renderToggleIcon(this.open)}
                  </div>
                )}
              </div>
              {this.range && this.layout === "vertical" && (
                <div class={CSS.verticalChevronContainer}>
                  <calcite-icon
                    icon={this.open ? "chevron-up" : "chevron-down"}
                    scale={getIconScale(this.scale)}
                  />
                </div>
              )}
            </div>
          )}
          <HiddenFormInputSlot component={this} />
          {this.validationMessage && this.status === "invalid" ? (
            <Validation
              icon={this.validationIcon}
              id={IDS.validationMessage}
              message={this.validationMessage}
              scale={this.scale}
              status={this.status}
            />
          ) : null}
        </InteractiveContainer>
      </Host>
    );
  }

  renderToggleIcon(open: boolean): VNode {
    return (
      // we set tab index to -1 to prevent delegatesFocus from stealing focus before we can set it
      <span class={CSS.toggleIcon} tabIndex={-1}>
        <calcite-icon
          class={CSS.chevronIcon}
          icon={open ? "chevron-up" : "chevron-down"}
          scale={getIconScale(this.scale)}
        />
      </span>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputDatePickerElement;

  private currentOpenInput: "start" | "end";

  private datePickerEl: HTMLCalciteDatePickerElement;

  private dialogId = `date-picker-dialog--${guid()}`;

  filteredFlipPlacements: FlipPlacement[];

  private focusOnOpen = false;

  focusTrap: FocusTrap;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: InputDatePicker["value"];

  private dateTimeFormat: Intl.DateTimeFormat;

  @State() datePickerActiveDate: Date;

  @State() defaultMessages: InputDatePickerMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
    this.loadLocaleData();
  }

  @Watch("effectiveLocale")
  @Watch("numberingSystem")
  handleDateTimeFormatChange(): void {
    const formattingOptions: Intl.DateTimeFormatOptions = {
      // we explicitly set numberingSystem to prevent the browser-inferred value
      // see https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195 for more info
      numberingSystem: getSupportedNumberingSystem(this.numberingSystem),
    };

    this.dateTimeFormat = new Intl.DateTimeFormat(
      getDateFormatSupportedLocale(this.effectiveLocale),
      formattingOptions,
    );
  }

  @State() focusedInput: "start" | "end" = "start";

  @State() private localeData: DateLocaleData;

  private startInput: HTMLCalciteInputTextElement;

  private endInput: HTMLCalciteInputTextElement;

  floatingEl: HTMLDivElement;

  referenceEl: HTMLDivElement;

  private startWrapper: HTMLDivElement;

  private endWrapper: HTMLDivElement;

  private userChangedValue = false;

  private rangeStartValueChangedByUser = false;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  @Watch("layout")
  setReferenceEl(): void {
    const { focusedInput, layout, endWrapper, startWrapper } = this;

    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;

    requestAnimationFrame(() => connectFloatingUI(this));
  }

  private valueAsDateChangedExternally = false;

  private placeholderTextId = `calcite-input-date-picker-placeholder-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private onInputWrapperPointerDown = (): void => {
    this.currentOpenInput = this.focusedInput;
  };

  private onInputWrapperClick = (event: MouseEvent) => {
    const { range, endInput, startInput, currentOpenInput } = this;
    const currentTarget = event.currentTarget as HTMLDivElement;
    const position = currentTarget.getAttribute("data-position") as "start" | "end";
    const path = event.composedPath();
    const wasToggleClicked = path.find((el: HTMLElement) => el.classList?.contains(CSS.toggleIcon));

    if (wasToggleClicked) {
      const targetInput = position === "start" ? startInput : endInput;
      targetInput.setFocus();
    }

    if (!range || !this.open || currentOpenInput === position) {
      this.open = !this.open;
    }
  };

  setFilteredPlacements = (): void => {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : null;
  };

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
  };

  onLabelClick(): void {
    this.setFocus();
  }

  onBeforeOpen(): void {
    this.calciteInputDatePickerBeforeOpen.emit();
  }

  onOpen(): void {
    activateFocusTrap(this, {
      onActivate: () => {
        if (this.focusOnOpen) {
          this.datePickerEl.setFocus();
          this.focusOnOpen = false;
        }
      },
    });
    this.calciteInputDatePickerOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteInputDatePickerBeforeClose.emit();
  }

  onClose(): void {
    this.calciteInputDatePickerClose.emit();
    hideFloatingUI(this);
    deactivateFocusTrap(this);
    this.focusOnOpen = false;
    this.datePickerEl.reset();
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("date", this, input);
  }

  setStartInput = (el: HTMLCalciteInputTextElement): void => {
    this.startInput = el;
  };

  setEndInput = (el: HTMLCalciteInputTextElement): void => {
    this.endInput = el;
  };

  private blurHandler = (): void => {
    this.open = false;
  };

  private commitValue(): void {
    const { focusedInput, value } = this;
    const focusedInputName = `${focusedInput}Input`;
    const focusedInputValue = this[focusedInputName].value;
    const date = dateFromLocalizedString(focusedInputValue, this.localeData);
    const dateAsISO = dateToISO(date);
    const valueIsArray = Array.isArray(value);
    if (this.range) {
      const focusedInputValueIndex = focusedInput === "start" ? 0 : 1;
      if (valueIsArray) {
        if (dateAsISO === value[focusedInputValueIndex]) {
          return;
        }
        if (date) {
          this.setRangeValue([
            focusedInput === "start" ? date : dateFromISO(value[0]),
            focusedInput === "end" ? date : dateFromISO(value[1]),
          ]);
          this.localizeInputValues();
        } else {
          this.setRangeValue([
            focusedInput === "end" && dateFromISO(value[0]),
            focusedInput === "start" && dateFromISO(value[1]),
          ]);
        }
      } else {
        if (date) {
          this.setRangeValue([
            focusedInput === "start" ? date : dateFromISO(value[0]),
            focusedInput === "end" ? date : dateFromISO(value[1]),
          ]);
          this.localizeInputValues();
        }
      }
    } else {
      if (dateAsISO === value) {
        return;
      }
      this.setValue(date);
      this.localizeInputValues();
    }
  }

  keyDownHandler = (event: KeyboardEvent): void => {
    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    const targeHasSelect = event
      .composedPath()
      .some((el: HTMLElement) => el.tagName === "CALCITE-SELECT");

    if (key === "Enter") {
      event.preventDefault();
      this.commitValue();

      if (this.shouldFocusRangeEnd()) {
        this.endInput?.setFocus();
      } else if (this.shouldFocusRangeStart()) {
        this.startInput?.setFocus();
      }

      if (submitForm(this)) {
        this.restoreInputFocus(true);
      }
    } else if ((key === "ArrowDown" || key === "ArrowUp") && !targeHasSelect) {
      this.open = true;
      this.focusOnOpen = true;
      event.preventDefault();
    } else if (key === "Escape") {
      this.open = false;
      event.preventDefault();
      this.restoreInputFocus(true);
    }
  };

  startInputFocus = (): void => {
    this.focusedInput = "start";
  };

  endInputFocus = (): void => {
    this.focusedInput = "end";
  };

  setFloatingEl = (el: HTMLDivElement): void => {
    this.floatingEl = el;
    connectFloatingUI(this);
  };

  setStartWrapper = (el: HTMLDivElement): void => {
    this.startWrapper = el;
    this.setReferenceEl();
  };

  setEndWrapper = (el: HTMLDivElement): void => {
    this.endWrapper = el;
    this.setReferenceEl();
  };

  setDatePickerRef = (el: HTMLCalciteDatePickerElement): void => {
    this.datePickerEl = el;
    connectFocusTrap(this, {
      focusTrapEl: el,
      focusTrapOptions: {
        allowOutsideClick: true,
        // Allow outside click and let the popover manager take care of closing the popover.
        clickOutsideDeactivates: false,
        initialFocus: false,
        setReturnFocus: false,
        onDeactivate: this.focusTrapDeactivates,
      },
    });
  };

  private async loadLocaleData(): Promise<void> {
    if (!isBrowser()) {
      return;
    }
    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false,
    };
    this.localeData = await getLocaleData(this.effectiveLocale);
    this.localizeInputValues();
  }

  /**
   * Event handler for when the selected date changes
   *
   * @param event CalciteDatePicker custom change event
   */
  handleDateChange = (event: CustomEvent<void>): void => {
    if (this.range) {
      return;
    }

    event.stopPropagation();

    this.setValue((event.target as HTMLCalciteDatePickerElement).valueAsDate as Date);
    this.localizeInputValues();
    this.restoreInputFocus();
  };

  private shouldFocusRangeStart(): boolean {
    const startValue = this.value[0];
    const endValue = this.value[1];
    return !!(endValue && !startValue && this.focusedInput === "end" && this.startInput);
  }

  private shouldFocusRangeEnd(): boolean {
    const startValue = this.value[0];
    const endValue = this.value[1];
    return !!(startValue && !endValue && this.focusedInput === "start" && this.endInput);
  }

  private handleDateRangeChange = (event: CustomEvent<void>): void => {
    if (!this.range) {
      return;
    }

    event.stopPropagation();

    const value = (event.target as HTMLCalciteDatePickerElement).valueAsDate as Date[];

    this.setRangeValue(value);
    this.localizeInputValues();
    this.restoreInputFocus();
  };

  private restoreInputFocus(isDatePickerClosed = false): void {
    if (!this.range) {
      this.startInput.setFocus();
      this.open = false;
      return;
    }

    if (isDatePickerClosed) {
      this.focusInput();
      return;
    }

    this.rangeStartValueChangedByUser = this.focusedInput === "start";
    this.focusedInput = "end";

    if (this.shouldFocusRangeStart() || this.rangeStartValueChangedByUser) {
      return;
    }
    this.open = false;
    this.focusInput();
  }

  private localizeInputValues(): void {
    const date = dateFromRange(
      (this.range
        ? (Array.isArray(this.valueAsDate) && this.valueAsDate[0]) || undefined
        : this.valueAsDate) as Date,
      this.minAsDate,
      this.maxAsDate,
    );
    const endDate = this.range
      ? dateFromRange(
          (Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined,
          this.minAsDate,
          this.maxAsDate,
        )
      : null;

    this.setInputValue((date && this.dateTimeFormat.format(date)) ?? "", "start");
    this.setInputValue((this.range && endDate && this.dateTimeFormat.format(endDate)) ?? "", "end");
  }

  private setInputValue = (newValue: string, input: "start" | "end" = "start"): void => {
    const inputEl = this[`${input}Input`];
    if (!inputEl) {
      return;
    }
    inputEl.value = newValue;
  };

  private setRangeValue = (valueAsDate: Date[]): void => {
    if (!this.range) {
      return;
    }

    const { value: oldValue } = this;
    const oldValueIsArray = Array.isArray(oldValue);
    const valueIsArray = Array.isArray(valueAsDate);

    const newStartDate = valueIsArray ? valueAsDate[0] : null;
    let newStartDateISO = valueIsArray ? dateToISO(newStartDate) : "";
    if (newStartDateISO) {
      newStartDateISO = this.getNormalizedDate(newStartDateISO);
    }

    const newEndDate = valueIsArray ? valueAsDate[1] : null;
    let newEndDateISO = valueIsArray ? dateToISO(newEndDate) : "";
    if (newEndDateISO) {
      newEndDateISO = this.getNormalizedDate(newEndDateISO);
    }

    const newValue = newStartDateISO || newEndDateISO ? [newStartDateISO, newEndDateISO] : "";

    if (newValue === oldValue) {
      return;
    }

    this.userChangedValue = true;
    this.value = newValue;
    this.valueAsDate = newValue ? getValueAsDateRange(newValue) : undefined;

    const changeEvent = this.calciteInputDatePickerChange.emit();

    if (changeEvent && changeEvent.defaultPrevented) {
      this.value = oldValue;
      if (oldValueIsArray) {
        this.setInputValue(oldValue[0], "start");
        this.setInputValue(oldValue[1], "end");
      } else {
        this.value = oldValue;
        this.setInputValue(oldValue);
      }
    }
  };

  private setValue = (value: Date | string): void => {
    if (this.range) {
      return;
    }

    const oldValue = this.value;
    let newValue = dateToISO(value as Date);
    newValue = this.getNormalizedDate(newValue);

    if (newValue === oldValue) {
      return;
    }

    this.userChangedValue = true;
    this.valueAsDate = newValue ? dateFromISO(newValue) : undefined;
    this.value = newValue || "";

    const changeEvent = this.calciteInputDatePickerChange.emit();

    if (changeEvent.defaultPrevented) {
      this.value = oldValue;
      this.setInputValue(oldValue as string);
    }
  };

  private warnAboutInvalidValue(value: string): void {
    console.warn(
      `The specified value "${value}" does not conform to the required format, "YYYY-MM-DD".`,
    );
  }

  private commonDateSeparators = [".", "-", "/"];

  private formatNumerals = (value: string): string =>
    value
      ? value
          .split("")
          .map((char: string) =>
            this.commonDateSeparators?.includes(char)
              ? this.localeData?.separator
              : numberKeys?.includes(char)
                ? numberStringFormatter?.numberFormatter?.format(Number(char))
                : char,
          )
          .join("")
      : "";

  private parseNumerals = (value: string): string =>
    value
      ? value
          .split("")
          .map((char: string) =>
            numberKeys.includes(char) ? numberStringFormatter.delocalize(char) : char,
          )
          .join("")
      : "";

  private getNormalizedDate(value: string): string {
    if (!value) {
      return "";
    }

    if (!isTwoDigitYear(value)) {
      return value;
    }

    const { day, month, year } = datePartsFromISO(value);
    const normalizedYear = normalizeToCurrentCentury(Number(year));
    return `${normalizedYear}-${month}-${day}`;
  }

  private focusInput = (): void => {
    const focusedInput = this.focusedInput === "start" ? this.startInput : this.endInput;
    focusedInput.setFocus();
  };
}
