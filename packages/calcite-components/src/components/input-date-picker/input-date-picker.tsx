import {
  Build,
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
  Watch,
} from "@stencil/core";
import {
  dateFromISO,
  dateFromLocalizedString,
  dateFromRange,
  datePartsFromISO,
  datePartsFromLocalizedString,
  dateToISO,
  inRange,
} from "../../utils/date";
import { toAriaBoolean } from "../../utils/dom";
import {
  connectFloatingUI,
  defaultMenuPlacement,
  disconnectFloatingUI,
  EffectivePlacement,
  filterComputedPlacements,
  FloatingCSS,
  FloatingUIComponent,
  MenuPlacement,
  OverlayPositioning,
  reposition,
} from "../../utils/floating-ui";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm,
} from "../../utils/form";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
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
  defaultNumberingSystem,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { DatePickerMessages } from "../date-picker/assets/date-picker/t9n";
import { DateLocaleData, getLocaleData, getValueAsDateRange } from "../date-picker/utils";
import { HeadingLevel } from "../functional/Heading";
import { CSS } from "./resources";
import { connectMessages, disconnectMessages, setUpMessages, T9nComponent } from "../../utils/t9n";
import { InputDatePickerMessages } from "./assets/input-date-picker/t9n";
import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  FocusTrapComponent,
} from "../../utils/focusTrapComponent";
import { FocusTrap } from "focus-trap";
import { guid } from "../../utils/guid";
import { normalizeToCurrentCentury, isTwoDigitYear } from "./utils";
import { getIconScale } from "../../utils/component";
import { Status } from "../interfaces";

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
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true })
  form: string;

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

  /** Selected date as a string in ISO format (YYYY-MM-DD) */
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
  valueAsDateWatcher(valueAsDate: Date): void {
    this.datePickerActiveDate = valueAsDate;
    const newValue =
      this.range && Array.isArray(valueAsDate)
        ? [dateToISO(valueAsDate[0]), dateToISO(valueAsDate[1])]
        : dateToISO(valueAsDate);
    if (this.value !== newValue) {
      this.valueAsDateChangedExternally = true;
      this.value = newValue;
      this.valueAsDateChangedExternally = false;
    }
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements: EffectivePlacement[];

  @Watch("flipPlacements")
  flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  /**
   * Specifies the number at which section headings should start.
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
  @Prop() min: string;

  @Watch("min")
  onMinChanged(min: string): void {
    if (min) {
      this.minAsDate = dateFromISO(min);
    }
  }

  /** Specifies the latest allowed date ("yyyy-mm-dd"). */
  @Prop() max: string;

  @Watch("max")
  onMaxChanged(max: string): void {
    if (max) {
      this.maxAsDate = dateFromISO(max);
    }
  }

  /** When `true`, displays the `calcite-date-picker` component. */
  @Prop({ mutable: true, reflect: true }) open = false;

  @Watch("open")
  openHandler(): void {
    onToggleOpenCloseComponent(this);

    if (this.disabled || this.readOnly) {
      this.open = false;
      return;
    }
  }

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

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
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

  @Listen("calciteDaySelect")
  calciteDaySelectHandler(): void {
    if (this.shouldFocusRangeStart() || this.shouldFocusRangeEnd()) {
      return;
    }

    this.open = false;
  }

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

    const date = dateFromLocalizedString(value, this.localeData) as Date;

    if (inRange(date, this.min, this.max)) {
      this.datePickerActiveDate = date;
    }
  };

  private calciteInternalInputBlurHandler = (): void => {
    this.commitValue();
  };

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the component's value changes.
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
    this.el.focus();
  }

  /**
   * Updates the position of the component.
   *
   * @param delayed
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
      delayed
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);

    const { open } = this;
    open && this.openHandler();
    if (Array.isArray(this.value)) {
      this.valueAsDate = getValueAsDateRange(this.value);
    } else if (this.value) {
      try {
        this.valueAsDate = dateFromISO(this.value);
      } catch (error) {
        this.warnAboutInvalidValue(this.value);
        this.value = "";
      }
    } else if (this.valueAsDate) {
      if (this.range) {
        this.setRangeValue(this.valueAsDate as Date[]);
      } else if (!Array.isArray(this.valueAsDate)) {
        this.userChangedValue = true;
        this.value = dateToISO(this.valueAsDate);
      }
    }

    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }

    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }

    connectLabel(this);
    connectForm(this);
    connectMessages(this);

    this.setFilteredPlacements();
    this.reposition(true);

    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false,
    };

    if (this.open) {
      onToggleOpenCloseComponent(this);
    }
    connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
    this.reposition(true);
  }

  disconnectedCallback(): void {
    deactivateFocusTrap(this);
    disconnectInteractive(this);
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
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
      <Host onBlur={this.deactivate} onKeyDown={this.keyDownHandler}>
        {this.localeData && (
          <div class="input-container">
            <div
              class="input-wrapper"
              onClick={this.onInputWrapperClick}
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.setStartWrapper}
            >
              <calcite-input-text
                aria-autocomplete="none"
                aria-controls={this.dialogId}
                aria-describedby={this.placeholderTextId}
                aria-expanded={toAriaBoolean(this.open)}
                aria-haspopup="dialog"
                class={`input ${
                  this.layout === "vertical" && this.range ? `no-bottom-border` : ``
                }`}
                disabled={disabled}
                icon="calendar"
                onCalciteInputTextInput={this.calciteInternalInputInputHandler}
                onCalciteInternalInputTextBlur={this.calciteInternalInputBlurHandler}
                onCalciteInternalInputTextFocus={this.startInputFocus}
                onFocus={this.startEndInputFocus}
                placeholder={this.localeData?.placeholder}
                readOnly={readOnly}
                role="combobox"
                scale={this.scale}
                status={this.status}
                // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                ref={this.setStartInput}
              />
              {!this.readOnly && this.renderToggleIcon(this.open && this.focusedInput === "start")}
              <span aria-hidden="true" class={CSS.assistiveText} id={this.placeholderTextId}>
                Date Format: {this.localeData?.placeholder}
              </span>
            </div>
            <div
              aria-hidden={toAriaBoolean(!this.open)}
              aria-label={messages.chooseDate}
              aria-live="polite"
              aria-modal="true"
              class={{
                [CSS.menu]: true,
                [CSS.menuActive]: this.open,
              }}
              id={this.dialogId}
              role="dialog"
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.setFloatingEl}
            >
              <div
                class={{
                  ["calendar-picker-wrapper"]: true,
                  ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
                  [FloatingCSS.animation]: true,
                  [FloatingCSS.animationActive]: this.open,
                }}
                // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                ref={this.setTransitionEl}
              >
                <calcite-date-picker
                  activeDate={this.datePickerActiveDate}
                  activeRange={this.focusedInput}
                  headingLevel={this.headingLevel}
                  max={this.max}
                  maxAsDate={this.maxAsDate}
                  messageOverrides={this.messageOverrides}
                  min={this.min}
                  minAsDate={this.minAsDate}
                  numberingSystem={numberingSystem}
                  onCalciteDatePickerChange={this.handleDateChange}
                  onCalciteDatePickerRangeChange={this.handleDateRangeChange}
                  proximitySelectionDisabled={this.proximitySelectionDisabled}
                  range={this.range}
                  scale={this.scale}
                  tabIndex={this.open ? undefined : -1}
                  valueAsDate={this.valueAsDate}
                  // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                  ref={this.setDatePickerRef}
                />
              </div>
            </div>

            {this.range && this.layout === "horizontal" && (
              <div class="horizontal-arrow-container">
                <calcite-icon flipRtl={true} icon="arrow-right" scale={getIconScale(this.scale)} />
              </div>
            )}
            {this.range && this.layout === "vertical" && this.scale !== "s" && (
              <div class="vertical-arrow-container">
                <calcite-icon icon="arrow-down" scale={getIconScale(this.scale)} />
              </div>
            )}
            {this.range && (
              <div
                class="input-wrapper"
                onClick={this.onInputWrapperClick}
                // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                ref={this.setEndWrapper}
              >
                <calcite-input-text
                  aria-autocomplete="none"
                  aria-controls={this.dialogId}
                  aria-expanded={toAriaBoolean(this.open)}
                  aria-haspopup="dialog"
                  class={{
                    input: true,
                    "border-top-color-one": this.layout === "vertical" && this.range,
                  }}
                  disabled={disabled}
                  icon="calendar"
                  onCalciteInputTextInput={this.calciteInternalInputInputHandler}
                  onCalciteInternalInputTextBlur={this.calciteInternalInputBlurHandler}
                  onCalciteInternalInputTextFocus={this.endInputFocus}
                  onFocus={this.startEndInputFocus}
                  placeholder={this.localeData?.placeholder}
                  readOnly={readOnly}
                  role="combobox"
                  scale={this.scale}
                  status={this.status}
                  // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                  ref={this.setEndInput}
                />
                {!this.readOnly && this.renderToggleIcon(this.open && this.focusedInput === "end")}
              </div>
            )}
          </div>
        )}
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }

  renderToggleIcon(open: boolean): VNode {
    return (
      <span class={CSS.toggleIcon}>
        <calcite-icon
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

  private datePickerEl: HTMLCalciteDatePickerElement;

  private dialogId = `date-picker-dialog--${guid()}`;

  filteredFlipPlacements: EffectivePlacement[];

  private focusOnOpen = false;

  focusTrap: FocusTrap;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: InputDatePicker["value"];

  @State() datePickerActiveDate: Date;

  @State() defaultMessages: InputDatePickerMessages;

  @State() effectiveLocale = "";

  @State() focusedInput: "start" | "end" = "start";

  private lastBlurredInput: "start" | "end" | "none" = "none";

  @State() private localeData: DateLocaleData;

  private startInput: HTMLCalciteInputElement;

  private endInput: HTMLCalciteInputElement;

  private floatingEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private startWrapper: HTMLDivElement;

  private endWrapper: HTMLDivElement;

  private userChangedValue = false;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  @Watch("layout")
  @Watch("focusedInput")
  setReferenceEl(): void {
    const { focusedInput, layout, endWrapper, startWrapper } = this;

    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;

    requestAnimationFrame(() => connectFloatingUI(this, this.referenceEl, this.floatingEl));
  }

  private valueAsDateChangedExternally = false;

  private placeholderTextId = `calcite-input-date-picker-placeholder-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private onInputWrapperClick = () => {
    if (this.range && this.lastBlurredInput !== "none" && this.open) {
      // we keep the date-picker open when moving between inputs
    } else {
      this.open = !this.open;
    }

    this.lastBlurredInput = "none";
  };

  setFilteredPlacements = (): void => {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterComputedPlacements(flipPlacements, el)
      : null;
  };

  private setTransitionEl = (el): void => {
    this.transitionEl = el;
  };

  onLabelClick(): void {
    this.setFocus();
  }

  onBeforeOpen(): void {
    this.reposition(true);
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
    deactivateFocusTrap(this);
    this.restoreInputFocus();
    this.focusOnOpen = false;
    this.datePickerEl.reset();
    this.reposition(true);
  }

  setStartInput = (el: HTMLCalciteInputElement): void => {
    this.startInput = el;
  };

  setEndInput = (el: HTMLCalciteInputElement): void => {
    this.endInput = el;
  };

  deactivate = (): void => {
    this.open = false;
    this.lastBlurredInput = "none";
  };

  private commitValue(): void {
    const { focusedInput, value } = this;
    const focusedInputName = `${focusedInput}Input`;
    const focusedInputValue = this[focusedInputName].value;
    const date = dateFromLocalizedString(focusedInputValue, this.localeData) as Date;
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

    if (key === "Enter") {
      this.commitValue();

      if (this.shouldFocusRangeEnd()) {
        this.endInput?.setFocus();
      } else if (this.shouldFocusRangeStart()) {
        this.startInput?.setFocus();
      }

      if (submitForm(this)) {
        event.preventDefault();
        this.restoreInputFocus();
      }
    } else if (key === "ArrowDown") {
      this.open = true;
      this.focusOnOpen = true;
      event.preventDefault();
    } else if (key === "Escape") {
      this.open = false;
      event.preventDefault();
      this.restoreInputFocus();
    }
  };

  startInputFocus = (): void => {
    this.focusedInput = "start";
  };

  startEndInputFocus = (event: FocusEvent): void => {
    const blurredEl = event.relatedTarget as HTMLElement;
    this.lastBlurredInput =
      blurredEl === this.startInput ? "start" : blurredEl === this.endInput ? "end" : "none";
  };

  endInputFocus = (): void => {
    this.focusedInput = "end";
  };

  setFloatingEl = (el: HTMLDivElement): void => {
    this.floatingEl = el;
    connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
        initialFocus: false,
        setReturnFocus: false,
      },
    });
  };

  @Watch("effectiveLocale")
  private async loadLocaleData(): Promise<void> {
    if (!Build.isBrowser) {
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

  private restoreInputFocus(): void {
    if (!this.range) {
      this.startInput.setFocus();
      return;
    }

    const focusedInput = this.focusedInput === "start" ? this.startInput : this.endInput;
    focusedInput.setFocus();
  }

  private localizeInputValues(): void {
    const date = dateFromRange(
      (this.range
        ? (Array.isArray(this.valueAsDate) && this.valueAsDate[0]) || undefined
        : this.valueAsDate) as Date,
      this.minAsDate,
      this.maxAsDate
    );
    const endDate = this.range
      ? dateFromRange(
          (Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined,
          this.minAsDate,
          this.maxAsDate
        )
      : null;

    const formattingOptions = {
      // we explicitly set numberingSystem to prevent the browser-inferred value
      // see https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195 for more info
      numberingSystem: defaultNumberingSystem,
    };

    const localizedDate =
      date && this.formatNumerals(date.toLocaleDateString(this.effectiveLocale, formattingOptions));
    const localizedEndDate =
      endDate &&
      this.formatNumerals(endDate.toLocaleDateString(this.effectiveLocale, formattingOptions));

    this.setInputValue(localizedDate ?? "", "start");
    this.setInputValue((this.range && localizedEndDate) ?? "", "end");
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
        this.setInputValue(oldValue as string);
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
      `The specified value "${value}" does not conform to the required format, "YYYY-MM-DD".`
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
              : char
          )
          .join("")
      : "";

  private parseNumerals = (value: string): string =>
    value
      ? value
          .split("")
          .map((char: string) =>
            numberKeys.includes(char) ? numberStringFormatter.delocalize(char) : char
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
}
