import { isServer, PropertyValues } from "lit";
import { createRef, Ref } from "lit/directives/ref.js";
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
import { useDirection } from "@arcgis/lumina/controllers";
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
import { numberKeys } from "../../utils/key";
import { getLabelText } from "../../utils/label";
import { getIconScale } from "../../utils/component";
import { type LabelableComponent, useLabel } from "../../controllers/useLabel";
import {
  getDateFormatSupportedLocale,
  getSupportedNumberingSystem,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";
import { toggleOpenClose } from "../../utils/openCloseComponent";
import {
  DateLocaleData,
  getLocaleData,
  getValueAsDateRange,
  applyLocaleOverride,
  getMinMaxSource,
} from "../date-picker/utils";
import { HeadingLevel } from "../functional/Heading";
import { guid } from "../../utils/guid";
import { Status } from "../interfaces";
import { InternalLabel } from "../functional/InternalLabel";
import { Validation } from "../functional/Validation";
import { IconName } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { DatePicker } from "../date-picker/date-picker";
import type { InputText } from "../input-text/input-text";
import type { Label } from "../label/label";
import type { Input } from "../input/input";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { useTopLayer } from "../../controllers/useTopLayer";
import { useForm } from "../../controllers/useForm";
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
export class InputDatePicker extends LitElement implements FloatingUIComponent, LabelableComponent {
  //#region Static Members

  static formAssociated = true;

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private commonDateSeparators = [".", "-", "/"];

  private currentOpenInput?: "start" | "end";

  private datePickerEl?: DatePicker["el"];

  private dateTimeFormat?: Intl.DateTimeFormat;

  defaultValue?: InputDatePicker["value"];

  private dialogId = IDS.dialog(guid());

  private direction = useDirection();

  private endInputRef = createRef<InputText["el"]>();

  private endWrapper?: HTMLDivElement;

  private filteredFlipPlacements?: FlipPlacement[];

  floatingEl?: HTMLDivElement;

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

  formSupport = useForm<this>({
    inputType: "date",
  })(this);

  labelEl?: Label["el"];

  labelable = useLabel<this>()(this);

  transitionProp = "opacity" as const;

  private placeholderTextId = IDS.placeholder(guid());

  private rangeStartValueChangedByUser = false;

  referenceEl?: HTMLDivElement;

  private startInputRef = createRef<InputText["el"]>();

  private startWrapper?: HTMLDivElement;

  transitionRef = createRef<HTMLDivElement>();

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

  private interactiveContainer = useInteractive(this);

  private topLayer = useTopLayer<this>({
    target: () => this.floatingEl,
  })(this);

  //#endregion

  //#region State Properties

  @state() datePickerActiveDate?: Date;

  @state() focusedInput: "start" | "end" = "start";

  @state() private localeData!: DateLocaleData;

  //#endregion

  //#region Public Properties

  /** When `range` is `true`, specifies the number of calendars displayed. */
  @property({ type: Number, reflect: true }) calendars: 1 | 2 = 2;

  /** When `true`, prevents interaction and decreases the component's opacity. */
  @property({ reflect: true }) disabled = false;

  /** @copyDoc */
  @property() flipPlacements?: FlipPlacement[];

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /** @copyDoc */
  @property({ reflect: true }) form?: string;

  /** @copyDoc */
  @property({ type: Number, reflect: true }) headingLevel?: HeadingLevel;

  /** @copyDoc */
  @property() label?: string;

  /** @copyDoc */
  @property() labelText?: string;

  /** Defines the component's layout. */
  @property({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  /**
   * When the component resides in a form,
   * specifies the latest allowed date ("yyyy-mm-dd").
   */
  @property({ reflect: true }) max?: string;

  /** Specifies the latest allowed date as a full date object. */
  @property() maxAsDate?: Date;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides & DatePicker["messageOverrides"];

  /**
   * When the component resides in a form,
   * specifies the earliest allowed date ("yyyy-mm-dd").
   */
  @property({ reflect: true }) min?: string;

  /** Specifies the earliest allowed date as a full date object. */
  @property() minAsDate?: Date;

  /** Specifies the component's month style. */
  @property() monthStyle: "abbreviated" | "wide" = "wide";

  /** @copyDoc */
  @property({ reflect: true }) name?: string;

  /** Specifies the Unicode numeral system used by the component for localization. This property cannot be dynamically changed. */
  @property({ reflect: true }) numberingSystem?: NumberingSystem;

  /** When `true`, displays the `calcite-date-picker` component. */
  @property({ reflect: true }) open = false;

  /** @copyDoc */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Specifies placeholder text for the component.
   *
   * @see [MDN - placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder)
   */
  @property() placeholder?: string;

  /**
   * Determines the `calcite-date-picker`'s placement relative to the input.
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
   * When `true`, the component's `value` can be read, but controls are not accessible and the `value` cannot be modified.
   *
   * @see [MDN - readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @property({ reflect: true }) readOnly = false;

  /**
   * When `true` and the component resides in a form,
   * the component must have a `value` in order for the form to submit.
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Specifies the input field's status, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /**
   * @copyDoc
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean, type: String }) validationIcon?:
    | IconName
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage?: string;

  /**
   * @copyDoc
   *
   * @readonly
   * @see [MDN - ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property({ readOnly: true }) validity!: ValidityState;

  /** Selected date as a string in ISO format (`"yyyy-mm-dd"`). */
  @property()
  get value(): string | string[] {
    return this._value;
  }
  set value(value: string | string[]) {
    const valueChanged = value !== this._value;
    const invalidValueCleared =
      value === "" &&
      (this.startInputRef.value?.value !== "" || this.endInputRef.value?.value !== "");

    if (valueChanged || invalidValueCleared) {
      this._value = value;
      this.valueWatcher(value);
    }
  }

  /** The component's `value` as a full date object. */
  @property() valueAsDate?: Date | Date[];

  //#endregion

  //#region Public Methods

  /**
   * Updates the component's position.
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
        direction: this.direction,
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
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
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

  /** Fires when the component is opened and animation is complete. */
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

    this.setFilteredPlacements();
    connectFloatingUI(this);
  }

  async load(): Promise<void> {
    this.handleDateTimeFormatChange();
    await this.loadLocaleData();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledAndReadOnlyChange(this.disabled);
    }

    if (changes.has("readOnly") && (this.hasUpdated || this.readOnly !== false)) {
      this.handleDisabledAndReadOnlyChange(this.readOnly);
    }

    if (changes.has("flipPlacements")) {
      this.flipPlacementsHandler();
    }

    const minSource = getMinMaxSource(changes, "min");
    const maxSource = getMinMaxSource(changes, "max");

    if (minSource === "min") {
      this.minAsDate = dateFromISO(this.min!);
    } else if (minSource === "minAsDate") {
      this.minAsDate = dateFromISO(dateToISO(this.minAsDate));
    }

    if (maxSource === "max") {
      this.maxAsDate = dateFromISO(this.max!);
    } else if (maxSource === "maxAsDate") {
      this.maxAsDate = dateFromISO(dateToISO(this.maxAsDate));
    }

    if ((minSource || maxSource) && !Array.isArray(this.valueAsDate)) {
      const validValueAsDate = dateFromRange(this.valueAsDate, this.minAsDate, this.maxAsDate);
      if (validValueAsDate !== this.valueAsDate) {
        this.valueAsDate = validValueAsDate;
      }
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

    if (changes.has("valueAsDate")) {
      this.valueAsDateWatcher(this.valueAsDate);
    }

    if (changes.has("messages")) {
      this.loadLocaleData();
      this.localizeInputValues();
    }
  }

  loaded(): void {
    this.localizeInputValues();
    connectFloatingUI(this);
  }

  override disconnectedCallback(): void {
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
      let newValueAsDate: Date | (Date | undefined)[] | undefined;

      try {
        if (Array.isArray(newValue)) {
          newValueAsDate = getValueAsDateRange(newValue);
        } else if (newValue) {
          newValueAsDate = dateFromISO(newValue);
        } else {
          newValueAsDate = undefined;
        }
      } catch {
        if (!Array.isArray(newValue)) {
          this.warnAboutInvalidValue(newValue);
          this.value = "";
        }
      }

      if (!this.valueAsDateChangedExternally && newValueAsDate !== this.valueAsDate) {
        // @ts-expect-error -- updating public type at v6.0.0 (see #14582)
        this.valueAsDate = newValueAsDate;
      }

      this.localizeInputValues();
    }
    this.userChangedValue = false;
  }

  private valueAsDateWatcher(valueAsDate?: Date | (Date | undefined)[]): void {
    const newValue = Array.isArray(valueAsDate)
      ? [dateToISO(valueAsDate[0]), dateToISO(valueAsDate[1])]
      : dateToISO(valueAsDate);
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

  private openHandler(): void {
    if (this.disabled || this.readOnly) {
      return;
    }

    toggleOpenClose(this);
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
      getDateFormatSupportedLocale(applyLocaleOverride(this.messages._lang)),
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
    const { range, endInputRef, startInputRef, currentOpenInput } = this;
    const currentTarget = event.currentTarget as HTMLDivElement;
    const position = currentTarget.getAttribute("data-position") as "start" | "end";
    const path = event.composedPath();
    const wasToggleClicked = path.find((el) =>
      (el as HTMLElement).classList?.contains(CSS.toggleIcon),
    );

    if (wasToggleClicked) {
      const targetInput = position === "start" ? startInputRef : endInputRef;
      targetInput.value?.setFocus();
    }

    if (!range || !this.open || currentOpenInput === position) {
      this.open = !this.open;
    }
  }

  private setFilteredPlacements(): void {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : undefined;
  }

  onLabelClick(): void {
    this.setFocus();
  }

  onBeforeOpen(): void {
    this.calciteInputDatePickerBeforeOpen.emit();
    this.topLayer.show();
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
    this.topLayer.hide();
  }

  private blurHandler(): void {
    this.open = false;
  }

  private commitValue(): void {
    const { focusedInput, value } = this;
    const focusedInputRef = this.getInputRef(focusedInput);

    const date = focusedInputRef.value
      ? dateFromLocalizedString(focusedInputRef.value?.value, this.localeData)
      : undefined;
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
            focusedInput === "end" ? dateFromISO(value[0]) : undefined,
            focusedInput === "start" ? dateFromISO(value[1]) : undefined,
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
      .some((el) => (el as HTMLElement).tagName === "CALCITE-SELECT");

    if (key === "Enter") {
      const preCommitValue = this.value;
      this.commitValue();

      const focusRangeEnd = this.shouldFocusRangeEnd();
      const focusRangeStart = !focusRangeEnd && this.shouldFocusRangeStart();

      if (focusRangeEnd || focusRangeStart) {
        event.preventDefault();

        if (focusRangeEnd) {
          this.endInputRef.value?.setFocus();
        } else if (focusRangeStart) {
          this.startInputRef.value?.setFocus();
        }

        return;
      }

      if (this.open) {
        this.restoreInputFocus(true);
        event.preventDefault();
      } else {
        const formActive = this.formSupport.active;
        const handledKey = preCommitValue !== this.value || formActive;

        if (handledKey) {
          event.preventDefault();
        }

        if (formActive) {
          this.formSupport.requestSubmit();
        }
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
    this.datePickerEl = el;

    if (el) {
      this.focusTrap.overrideFocusTrapEl(el);
    }
  }

  private async loadLocaleData(): Promise<void> {
    if (isServer) {
      return;
    }

    const locale = applyLocaleOverride(this.messages._lang);

    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale,
      useGrouping: false,
    };

    this.localeData = await getLocaleData(locale);
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
    return !!(endValue && !startValue && this.focusedInput === "end" && this.startInputRef);
  }

  private shouldFocusRangeEnd(): boolean {
    const startValue = this.value[0];
    const endValue = this.value[1];
    return !!(startValue && !endValue && this.focusedInput === "start" && this.endInputRef);
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
      this.startInputRef.value?.setFocus();
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

    if (
      this.proximitySelectionDisabled &&
      Array.isArray(this.valueAsDate) &&
      this.valueAsDate[1] === undefined
    ) {
      return;
    }

    this.open = false;
    this.focusInput();
  }

  private localizeInputValues(): void {
    const date = dateFromRange(
      this.range ? Array.isArray(this.valueAsDate) && this.valueAsDate[0] : this.valueAsDate,
      this.minAsDate,
      this.maxAsDate,
    );
    const endDate = this.range
      ? dateFromRange(
          Array.isArray(this.valueAsDate) && this.valueAsDate[1],
          this.minAsDate,
          this.maxAsDate,
        )
      : undefined;

    this.setInputValue((date && this.dateTimeFormat?.format(date)) ?? "", "start");
    this.setInputValue(
      (this.range && endDate && this.dateTimeFormat?.format(endDate)) || "",
      "end",
    );
  }

  private getInputRef(input: "start" | "end" = "start"): Ref<InputText["el"]> {
    return input === "start" ? this.startInputRef : this.endInputRef;
  }

  private setInputValue(newValue: string, input: "start" | "end" = "start"): void {
    const inputRef = this.getInputRef(input);
    if (!inputRef.value) {
      return;
    }
    inputRef.value.value = newValue;
  }

  private setRangeValue(valueAsDate: (Date | undefined)[]): void {
    if (!this.range) {
      return;
    }

    const { value: oldValue } = this;
    const oldValueIsArray = Array.isArray(oldValue);
    const valueIsArray = Array.isArray(valueAsDate);

    const newStartDate = valueIsArray ? valueAsDate[0] : undefined;
    let newStartDateISO = valueIsArray ? dateToISO(newStartDate) : "";
    if (newStartDateISO) {
      newStartDateISO = this.getNormalizedDate(newStartDateISO);
    }

    const newEndDate = valueIsArray ? valueAsDate[1] : undefined;
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
    // @ts-expect-error -- updating public type at v6.0.0 (see #14582)
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

  private setValue(value: Date | string | undefined): void {
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
    const focusedInput = this.focusedInput === "start" ? this.startInputRef : this.endInputRef;
    focusedInput.value?.setFocus();
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
      <this.interactiveContainer disabled={this.disabled}>
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
                  [CSS.startInput]: true,
                }}
                disabled={disabled}
                icon={ICONS.calendar}
                label={this.range ? this.messages.startDate : this.messages.date}
                oncalciteInputTextInput={this.calciteInternalInputInputHandler}
                oncalciteInternalInputTextBlur={this.calciteInternalInputBlurHandler}
                oncalciteInternalInputTextFocus={this.startInputFocus}
                placeholder={this.placeholder || this.localeData?.placeholder}
                readOnly={readOnly}
                ref={this.startInputRef}
                role="combobox"
                scale={this.scale}
                status={this.status}
              />
              {!this.readOnly &&
                !this.range &&
                this.renderToggleIcon(this.open && this.focusedInput === "start")}
              <span ariaHidden="true" class={CSS.assistiveText} id={this.placeholderTextId}>
                {this.placeholder ||
                  messages.dateFormat.replace("{format}", this.localeData?.placeholder)}
              </span>
            </div>
            <div
              ariaHidden={!this.open}
              ariaLabel={messages.chooseDate}
              ariaLive="polite"
              ariaModal={false}
              class={CSS.menu}
              id={this.dialogId}
              popover="manual"
              ref={this.setFloatingEl}
              role="dialog"
            >
              <div
                class={{
                  [CSS.calendarWrapper]: true,
                  [FloatingCSS.animation]: true,
                  [FloatingCSS.animationActive]: this.open,
                }}
                ref={this.transitionRef}
              >
                <calcite-date-picker
                  activeDate={this.datePickerActiveDate}
                  activeRange={this.focusedInput}
                  calendars={this.calendars}
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
                    [CSS.endInput]: true,
                  }}
                  disabled={disabled}
                  icon={ICONS.calendar}
                  label={this.messages.endDate}
                  oncalciteInputTextInput={this.calciteInternalInputInputHandler}
                  oncalciteInternalInputTextBlur={this.calciteInternalInputBlurHandler}
                  oncalciteInternalInputTextFocus={this.endInputFocus}
                  placeholder={this.placeholder || this.localeData?.placeholder}
                  readOnly={readOnly}
                  ref={this.endInputRef}
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
        {this.validationMessage && this.status === "invalid" ? (
          <Validation
            icon={this.validationIcon}
            id={IDS.validationMessage}
            message={this.validationMessage}
            scale={this.scale}
            status={this.status}
          />
        ) : null}
      </this.interactiveContainer>
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
