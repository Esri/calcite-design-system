// @ts-strict-ignore
import { PropertyValues, isServer } from "lit";
import {
  createEvent,
  h,
  JsxNode,
  LitElement,
  method,
  property,
  state,
  stringOrBoolean,
} from "@arcgis/lumina";
import { useFocusTrap } from "../../controllers/useFocusTrap";
import {
  dateFromISO,
  dateFromLocalizedString,
  dateFromRange,
  datePartsFromISO,
  datePartsFromLocalizedString,
  dateToISO,
  inRange,
} from "../../utils/date";
import {
  connectFloatingUI,
  defaultMenuPlacement,
  disconnectFloatingUI,
  filterValidFlipPlacements,
  FlipPlacement,
  FloatingCSS,
  FloatingUIComponent,
  hideFloatingUI,
  MenuPlacement,
  OverlayPositioning,
  reposition,
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
import { connectLabel, disconnectLabel, LabelableComponent, getLabelText } from "../../utils/label";
import { getIconScale } from "../../utils/component";
import {
  getDateFormatSupportedLocale,
  getSupportedLocale,
  getSupportedNumberingSystem,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";
import { toggleOpenClose, OpenCloseComponent } from "../../utils/openCloseComponent";
import { DateLocaleData, getLocaleData, getValueAsDateRange } from "../date-picker/utils";
import { HeadingLevel } from "../functional/Heading";
import { guid } from "../../utils/guid";
import { Status } from "../interfaces";
import { InternalLabel } from "../functional/InternalLabel";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import { syncHiddenFormInput } from "../input/common/input";
import { useT9n } from "../../controllers/useT9n";
import type { DatePicker } from "../date-picker/date-picker";
import type { InputText } from "../input-text/input-text";
import type { Label } from "../label/label";
import type { Input } from "../input/input";
import { useSetFocus } from "../../controllers/useSetFocus";
import { styles } from "./input-date-picker.scss";
import { CSS, ICONS, IDS, POSITION } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { isTwoDigitYear, normalizeToCurrentCentury } from "./utils";

declare global {
  interface DeclareElements {
    "calcite-input-date-picker": InputDatePicker;
  }
}

/**
 * @slot label-content - A slot for rendering content next to the component's `labelText`.
 */
export class InputDatePicker
  extends LitElement
  implements
    FloatingUIComponent,
    FormComponent,
    InteractiveComponent,
    LabelableComponent,
    OpenCloseComponent
{
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private commonDateSeparators = [".", "-", "/"];

  private currentOpenInput: "start" | "end";

  private datePickerEl: DatePicker["el"];

  private dateTimeFormat: Intl.DateTimeFormat;

  defaultValue: InputDatePicker["value"];

  private dialogId = IDS.dialog(guid());

  private endInput: InputText["el"];

  private endWrapper: HTMLDivElement;

  private filteredFlipPlacements: FlipPlacement[];

  floatingEl: HTMLDivElement;

  private focusOnOpen = false;

  focusTrap = useFocusTrap<this>({
    triggerProp: "open",
    focusTrapOptions: {
      onActivate: () => {
        if (this.focusOnOpen) {
          this.datePickerEl?.setFocus();
          this.focusOnOpen = false;
        }
      },
      allowOutsideClick: true,
      // Allow outside click and let the popover manager take care of closing the popover.
      clickOutsideDeactivates: false,
      initialFocus: false,
      setReturnFocus: false,
      onDeactivate: () => {
        this.open = false;
      },
    },
  })(this);

  formEl: HTMLFormElement;

  labelEl: Label["el"];

  transitionProp = "opacity" as const;

  private placeholderTextId = IDS.placeholder(guid());

  private rangeStartValueChangedByUser = false;

  referenceEl: HTMLDivElement;

  private startInput: InputText["el"];

  private startWrapper: HTMLDivElement;

  transitionEl: HTMLDivElement;

  private userChangedValue = false;

  private _value: string | string[] = "";

  private valueAsDateChangedExternally = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() datePickerActiveDate: Date;

  @state() focusedInput: "start" | "end" = "start";

  @state() private localeData: DateLocaleData;

  //#endregion

  //#region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component's fallback `calcite-date-picker` `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Accessible name for the component. */
  @property() label: string;

  /** When provided, displays label text on the component. */
  @property() labelText: string;

  /** Defines the layout of the component. */
  @property({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  /**
   * When the component resides in a form,
   * specifies the latest allowed date ("yyyy-mm-dd").
   */
  @property({ reflect: true }) max: string;

  /** Specifies the latest allowed date as a full date object. */
  @property() maxAsDate: Date;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides & DatePicker["messageOverrides"];

  /**
   * When the component resides in a form,
   * specifies the earliest allowed date ("yyyy-mm-dd").
   */
  @property({ reflect: true }) min: string;

  /** Specifies the earliest allowed date as a full date object. */
  @property() minAsDate: Date;

  /** Specifies the monthStyle used by the component. */
  @property() monthStyle: "abbreviated" | "wide" = "wide";

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /** Specifies the Unicode numeral system used by the component for localization. This property cannot be dynamically changed. */
  @property({ reflect: true }) numberingSystem: NumberingSystem;

  /** When `true`, displays the `calcite-date-picker` component. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Specifies the placement of the `calcite-date-picker` relative to the component.
   *
   * @default "bottom-start"
   */
  @property({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /**
   * When `true`, disables the default behavior on the third click of narrowing or extending the range.
   * Instead starts a new range.
   */
  @property() proximitySelectionDisabled = false;

  /** When `true`, activates a range for the component. */
  @property({ reflect: true }) range = false;

  /**
   * When `true`, the component's value can be read, but controls are not accessible and the value cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @property({ reflect: true }) readOnly = false;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean }) validationIcon:
    | IconNameOrString
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage: string;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property() validity: MutableValidityState = {
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

  /** Selected date as a string in ISO format (`"yyyy-mm-dd"`). */
  @property()
  get value(): string | string[] {
    return this._value;
  }
  set value(value: string | string[]) {
    const valueChanged = value !== this._value;
    const invalidValueCleared =
      value === "" && (this.startInput?.value !== "" || this.endInput?.value !== "");

    if (valueChanged || invalidValueCleared) {
      this._value = value;
      this.valueWatcher(value);
    }
  }

  /** The component's value as a full date object. */
  @property() valueAsDate: Date | Date[];

  //#endregion

  //#region Public Methods

  /**
   * Updates the position of the component.
   *
   * @param delayed If true, the repositioning is delayed.
   * @returns void
   */
  @method()
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

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteInputDatePickerBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteInputDatePickerBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component's `value` changes. */
  calciteInputDatePickerChange = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteInputDatePickerClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteInputDatePickerOpen = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("blur", this.blurHandler);
    this.listen("keydown", this.keyDownHandler);
    this.handleDateTimeFormatChange();
  }

  override connectedCallback(): void {
    const { open } = this;

    if (open) {
      this.openHandler();
    }

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
      } catch {
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
    this.setFilteredPlacements();

    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.messages._lang,
      useGrouping: false,
    };

    connectFloatingUI(this);
  }

  async load(): Promise<void> {
    this.handleDateTimeFormatChange();
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledAndReadOnlyChange(this.disabled);
    }

    if (changes.has("readOnly") && (this.hasUpdated || this.readOnly !== false)) {
      this.handleDisabledAndReadOnlyChange(this.readOnly);
    }

    if (changes.has("valueAsDate")) {
      this.valueAsDateWatcher(this.valueAsDate);
    }

    if (changes.has("flipPlacements")) {
      this.flipPlacementsHandler();
    }

    if (changes.has("min")) {
      this.onMinChanged(this.min);
    }

    if (changes.has("max")) {
      this.onMaxChanged(this.max);
    }

    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }

    if (
      changes.has("overlayPositioning") &&
      (this.hasUpdated || this.overlayPositioning !== "absolute")
    ) {
      this.reposition(true);
    }

    if (changes.has("numberingSystem") || changes.has("messages")) {
      this.handleDateTimeFormatChange();
    }

    if (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) {
      this.setReferenceEl();
    }

    if (changes.has("messages")) {
      this.loadLocaleData();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.localizeInputValues();
    connectFloatingUI(this);
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this);
  }

  //#endregion

  //#region Private Methods

  private handleDisabledAndReadOnlyChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  private valueWatcher(newValue: string | string[]): void {
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

  private valueAsDateWatcher(valueAsDate: Date | Date[]): void {
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

  private flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  private onMinChanged(min: string): void {
    this.minAsDate = dateFromISO(min);
  }

  private onMaxChanged(max: string): void {
    this.maxAsDate = dateFromISO(max);
  }

  private openHandler(): void {
    toggleOpenClose(this);

    if (this.disabled || this.readOnly) {
      return;
    }

    this.reposition(true);
  }

  private calciteInternalInputInputHandler(event: CustomEvent<any>): void {
    const target = event.target as Input["el"];
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
  }

  private calciteInternalInputBlurHandler(): void {
    this.commitValue();
  }

  private handleDateTimeFormatChange(): void {
    const formattingOptions: Intl.DateTimeFormatOptions = {
      // we explicitly set numberingSystem to prevent the browser-inferred value
      // @see [Arabic numbering system support context](https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195) for more info.
      numberingSystem: getSupportedNumberingSystem(this.numberingSystem),
    };

    this.dateTimeFormat = new Intl.DateTimeFormat(
      getDateFormatSupportedLocale(getSupportedLocale(this.messages._lang)),
      formattingOptions,
    );
  }

  private setReferenceEl(): void {
    const { focusedInput, layout, endWrapper, startWrapper } = this;

    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;

    requestAnimationFrame(() => connectFloatingUI(this));
  }

  private onInputWrapperPointerDown(): void {
    this.currentOpenInput = this.focusedInput;
  }

  private onInputWrapperClick(event: MouseEvent) {
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
  }

  private setFilteredPlacements(): void {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : null;
  }

  private setTransitionEl(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    this.transitionEl = el;
  }

  onLabelClick(): void {
    this.setFocus();
  }

  onBeforeOpen(): void {
    this.calciteInputDatePickerBeforeOpen.emit();
  }

  onOpen(): void {
    this.focusTrap.activate();
    this.calciteInputDatePickerOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteInputDatePickerBeforeClose.emit();
  }

  onClose(): void {
    this.calciteInputDatePickerClose.emit();
    hideFloatingUI(this);
    this.focusTrap.deactivate();
    this.focusOnOpen = false;
    this.datePickerEl?.reset();
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("date", this, input);
  }

  private setStartInput(el: InputText["el"]): void {
    this.startInput = el;
  }

  private setEndInput(el: InputText["el"]): void {
    this.endInput = el;
  }

  private blurHandler(): void {
    this.open = false;
  }

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

  private keyDownHandler(event: KeyboardEvent): void {
    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    const targetHasSelect = event
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
    } else if ((key === "ArrowDown" || key === "ArrowUp") && !targetHasSelect) {
      this.open = true;
      this.focusOnOpen = true;
      event.preventDefault();
    } else if (this.open && key === "Escape") {
      this.open = false;
      event.preventDefault();
      this.restoreInputFocus(true);
    }
  }

  private startInputFocus(): void {
    this.focusedInput = "start";
  }

  private endInputFocus(): void {
    this.focusedInput = "end";
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;
    connectFloatingUI(this);
  }

  private setStartWrapper(el: HTMLDivElement): void {
    this.startWrapper = el;
    this.setReferenceEl();
  }

  private setEndWrapper(el: HTMLDivElement): void {
    this.endWrapper = el;
    this.setReferenceEl();
  }

  private setDatePickerRef(el: DatePicker["el"]): void {
    if (!el) {
      return;
    }

    this.datePickerEl = el;
    this.focusTrap.overrideFocusTrapEl(el);
  }

  private async loadLocaleData(): Promise<void> {
    if (isServer) {
      return;
    }
    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.messages._lang,
      useGrouping: false,
    };
    this.localeData = await getLocaleData(this.messages._lang);
    this.localizeInputValues();
  }

  /**
   * Event handler for when the selected date changes
   *
   * @param event CalciteDatePicker custom change event
   */
  private handleDateChange(event: CustomEvent<void>): void {
    if (this.range) {
      return;
    }

    event.stopPropagation();

    this.setValue((event.target as DatePicker["el"]).valueAsDate as Date);
    this.localizeInputValues();
    this.restoreInputFocus();
  }

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

  private handleDateRangeChange(event: CustomEvent<void>): void {
    if (!this.range) {
      return;
    }

    event.stopPropagation();

    const value = (event.target as DatePicker["el"]).valueAsDate as Date[];

    this.setRangeValue(value);
    this.localizeInputValues();
    this.restoreInputFocus();
  }

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

    if (this.proximitySelectionDisabled && this.valueAsDate[1] === null) {
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

  private setInputValue(newValue: string, input: "start" | "end" = "start"): void {
    const inputEl = this[`${input}Input`];
    if (!inputEl) {
      return;
    }
    inputEl.value = newValue;
  }

  private setRangeValue(valueAsDate: Date[]): void {
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
  }

  private setValue(value: Date | string): void {
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
  }

  private warnAboutInvalidValue(value: string): void {
    console.warn(
      `The specified value "${value}" does not conform to the required format, "YYYY-MM-DD".`,
    );
  }

  private formatNumerals(value: string): string {
    return value
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
  }

  private parseNumerals(value: string): string {
    return value
      ? value
          .split("")
          .map((char: string) =>
            numberKeys.includes(char) ? numberStringFormatter.delocalize(char) : char,
          )
          .join("")
      : "";
  }

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

  private focusInput(): void {
    const focusedInput = this.focusedInput === "start" ? this.startInput : this.endInput;
    focusedInput.setFocus();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const {
      disabled,
      messages: { _lang: effectiveLocale },
      messages,
      numberingSystem,
      readOnly,
    } = this;
    numberStringFormatter.numberFormatOptions = {
      numberingSystem,
      locale: effectiveLocale,
      useGrouping: false,
    };

    return (
      <InteractiveContainer disabled={this.disabled}>
        {this.labelText && (
          <InternalLabel
            labelText={this.labelText}
            onClick={this.onLabelClick}
            required={this.required}
            tooltipText={this.messages.required}
          />
        )}
        <div class={CSS.container}>
          <div
            aria-label={getLabelText(this)}
            ariaRequired={this.required}
            class={CSS.inputContainer}
            role="group"
          >
            <div
              class={CSS.inputWrapper}
              data-position={POSITION.start}
              onClick={this.onInputWrapperClick}
              onPointerDown={this.onInputWrapperPointerDown}
              ref={this.setStartWrapper}
            >
              <calcite-input-text
                aria-controls={this.dialogId}
                aria-describedby={this.placeholderTextId}
                aria-errormessage={IDS.validationMessage}
                ariaAutoComplete="none"
                ariaExpanded={this.open}
                ariaHasPopup="dialog"
                ariaInvalid={this.status === "invalid"}
                class={{
                  [CSS.input]: true,
                  [CSS.inputNoBottomBorder]: this.layout === "vertical" && this.range,
                  [CSS.inputNoRightBorder]: this.range,
                }}
                disabled={disabled}
                icon={ICONS.calendar}
                label={this.range ? this.messages.startDate : this.messages.date}
                oncalciteInputTextInput={this.calciteInternalInputInputHandler}
                oncalciteInternalInputTextBlur={this.calciteInternalInputBlurHandler}
                oncalciteInternalInputTextFocus={this.startInputFocus}
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
              <span ariaHidden="true" class={CSS.assistiveText} id={this.placeholderTextId}>
                {messages.dateFormat.replace("{format}", this.localeData?.placeholder)}
              </span>
            </div>
            <div
              ariaHidden={!this.open}
              ariaLabel={messages.chooseDate}
              ariaLive="polite"
              ariaModal="true"
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
                  oncalciteDatePickerChange={this.handleDateChange}
                  oncalciteDatePickerRangeChange={this.handleDateRangeChange}
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
                data-position={POSITION.end}
                onClick={this.onInputWrapperClick}
                onPointerDown={this.onInputWrapperPointerDown}
                ref={this.setEndWrapper}
              >
                <calcite-input-text
                  aria-controls={this.dialogId}
                  ariaAutoComplete="none"
                  ariaExpanded={this.open}
                  ariaHasPopup="dialog"
                  class={{
                    [CSS.input]: true,
                    [CSS.inputNoTopBorder]: this.layout === "vertical" && this.range,
                    [CSS.inputNoLeftBorder]: this.layout === "horizontal" && this.range,
                    [CSS.inputNoRightBorder]: this.layout === "vertical" && this.range,
                  }}
                  disabled={disabled}
                  icon={ICONS.calendar}
                  label={this.messages.endDate}
                  oncalciteInputTextInput={this.calciteInternalInputInputHandler}
                  oncalciteInternalInputTextBlur={this.calciteInternalInputBlurHandler}
                  oncalciteInternalInputTextFocus={this.endInputFocus}
                  placeholder={this.localeData?.placeholder}
                  readOnly={readOnly}
                  ref={this.setEndInput}
                  role="combobox"
                  scale={this.scale}
                  status={this.status}
                />
                {!this.readOnly && this.layout === "horizontal" && this.renderToggleIcon(this.open)}
              </div>
            )}
          </div>
          {this.range && this.layout === "vertical" && (
            <div class={CSS.verticalChevronContainer}>
              <calcite-icon
                icon={this.open ? ICONS.chevronUp : ICONS.chevronDown}
                scale={getIconScale(this.scale)}
              />
            </div>
          )}
        </div>
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
    );
  }

  private renderToggleIcon(open: boolean): JsxNode {
    return (
      // we set tab index to -1 to prevent delegatesFocus from stealing focus before we can set it
      <span class={CSS.toggleIcon} tabIndex={-1}>
        <calcite-icon
          class={CSS.chevronIcon}
          icon={open ? ICONS.chevronUp : ICONS.chevronDown}
          scale={getIconScale(this.scale)}
        />
      </span>
    );
  }

  //#endregion
}
