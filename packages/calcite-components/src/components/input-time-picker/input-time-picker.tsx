// @ts-strict-ignore
import dayjs from "dayjs/esm/index.js";
import customParseFormat from "dayjs/esm/plugin/customParseFormat/index.js";
import localeData from "dayjs/esm/plugin/localeData/index.js";
import localizedFormat from "dayjs/esm/plugin/localizedFormat/index.js";
import preParsePostFormat from "dayjs/esm/plugin/preParsePostFormat/index.js";
import updateLocale from "dayjs/esm/plugin/updateLocale/index.js";
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
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
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  localizedTwentyFourHourMeridiems,
  getSupportedLocale,
  NumberingSystem,
  numberStringFormatter,
  SupportedLocale,
} from "../../utils/locale";
import {
  formatTimePart,
  formatTimeString,
  FractionalSecondDigits,
  getLocaleHourFormat,
  getLocaleOppositeHourFormat,
  getMeridiemFormatToken,
  getMeridiemOrder,
  EffectiveHourFormat,
  isLocaleHourFormatOpposite,
  isValidTime,
  localizeTimeString,
  toISOTimeString,
  HourFormat,
} from "../../utils/time";
import { Scale, Status } from "../interfaces";
import { decimalPlaces } from "../../utils/math";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import { syncHiddenFormInput } from "../input/common/input";
import { useT9n } from "../../controllers/useT9n";
import type { TimePicker } from "../time-picker/time-picker";
import type { InputText } from "../input-text/input-text";
import type { Popover } from "../popover/popover";
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { styles } from "./input-time-picker.scss";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-input-time-picker": InputTimePicker;
  }
}

// some bundlers (e.g., Webpack) need dynamic import paths to be static
const supportedDayjsLocaleToLocaleConfigImport = new Map([
  ["ar", () => import("dayjs/esm/locale/ar.js")],
  ["bg", () => import("dayjs/esm/locale/bg.js")],
  ["bs", () => import("dayjs/esm/locale/bs.js")],
  ["ca", () => import("dayjs/esm/locale/ca.js")],
  ["cs", () => import("dayjs/esm/locale/cs.js")],
  ["da", () => import("dayjs/esm/locale/da.js")],
  ["de", () => import("dayjs/esm/locale/de.js")],
  ["de-at", () => import("dayjs/esm/locale/de-at.js")],
  ["de-ch", () => import("dayjs/esm/locale/de-ch.js")],
  ["el", () => import("dayjs/esm/locale/el.js")],
  ["en", () => import("dayjs/esm/locale/en.js")],
  ["en-au", () => import("dayjs/esm/locale/en-au.js")],
  ["en-ca", () => import("dayjs/esm/locale/en-ca.js")],
  ["en-gb", () => import("dayjs/esm/locale/en-gb.js")],
  ["es", () => import("dayjs/esm/locale/es.js")],
  ["es-mx", () => import("dayjs/esm/locale/es-mx.js")],
  ["et", () => import("dayjs/esm/locale/et.js")],
  ["fi", () => import("dayjs/esm/locale/fi.js")],
  ["fr", () => import("dayjs/esm/locale/fr.js")],
  ["fr-ch", () => import("dayjs/esm/locale/fr-ch.js")],
  ["he", () => import("dayjs/esm/locale/he.js")],
  ["hi", () => import("dayjs/esm/locale/hi.js")],
  ["hr", () => import("dayjs/esm/locale/hr.js")],
  ["hu", () => import("dayjs/esm/locale/hu.js")],
  ["id", () => import("dayjs/esm/locale/id.js")],
  ["it", () => import("dayjs/esm/locale/it.js")],
  ["it-ch", () => import("dayjs/esm/locale/it-ch.js")],
  ["ja", () => import("dayjs/esm/locale/ja.js")],
  ["ko", () => import("dayjs/esm/locale/ko.js")],
  ["lt", () => import("dayjs/esm/locale/lt.js")],
  ["lv", () => import("dayjs/esm/locale/lv.js")],
  ["mk", () => import("dayjs/esm/locale/mk.js")],
  ["nl", () => import("dayjs/esm/locale/nl.js")],
  ["nb", () => import("dayjs/esm/locale/nb.js")],
  ["pl", () => import("dayjs/esm/locale/pl.js")],
  ["pt", () => import("dayjs/esm/locale/pt.js")],
  ["pt-br", () => import("dayjs/esm/locale/pt-br.js")],
  ["ro", () => import("dayjs/esm/locale/ro.js")],
  ["ru", () => import("dayjs/esm/locale/ru.js")],
  ["sk", () => import("dayjs/esm/locale/sk.js")],
  ["sl", () => import("dayjs/esm/locale/sl.js")],
  ["sr", () => import("dayjs/esm/locale/sr.js")],
  ["sv", () => import("dayjs/esm/locale/sv.js")],
  ["th", () => import("dayjs/esm/locale/th.js")],
  ["tr", () => import("dayjs/esm/locale/tr.js")],
  ["uk", () => import("dayjs/esm/locale/uk.js")],
  ["vi", () => import("dayjs/esm/locale/vi.js")],
  ["zh-cn", () => import("dayjs/esm/locale/zh-cn.js")],
  ["zh-hk", () => import("dayjs/esm/locale/zh-hk.js")],
  ["zh-tw", () => import("dayjs/esm/locale/zh-tw.js")],
]);

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(preParsePostFormat);
dayjs.extend(updateLocale);

interface DayjsTimeParts {
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

interface GetLocalizedTimeStringParameters {
  hourFormat?: EffectiveHourFormat;
  isoTimeString?: string;
  locale?: SupportedLocale;
  numberingSystem?: NumberingSystem;
}

export class InputTimePicker
  extends LitElement
  implements FormComponent, InteractiveComponent, LabelableComponent
{
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private calciteTimePickerEl: TimePicker["el"];

  defaultValue: InputTimePicker["value"];

  formEl: HTMLFormElement;

  labelEl: Label["el"];

  private localeConfig: ILocale;

  private localeDefaultLTFormat: string;

  private localeDefaultLTSFormat: string;

  private popoverEl: Popover["el"];

  /** whether the value of the input was changed as a result of user typing or not */
  private userChangedValue = false;

  private _value = null;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private setLocalizedInputValue = (params?: GetLocalizedTimeStringParameters): void => {
    this.setInputValue(this.getLocalizedTimeString(params));
  };

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  @state() calciteInputEl: InputText["el"];

  @state() effectiveHourFormat: EffectiveHourFormat;

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /**
   * Specifies the component's hour format, where:
   *
   * `"user"` displays the user's locale format,
   * `"12"` displays a 12-hour format, and
   * `"24"` displays a 24-hour format.
   *
   * @default "user"
   */
  @property({ reflect: true }) hourFormat: HourFormat = "user";

  /**
   * When the component resides in a form,
   * specifies the maximum value.
   *
   * @mdn [max](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#max)
   */
  @property({ reflect: true }) max: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides & TimePicker["messageOverrides"];

  /**
   * When the component resides in a form,
   * specifies the minimum value.
   *
   * @mdn [min](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#min)
   */
  @property({ reflect: true }) min: string;

  /** Specifies the name of the component on form submission. */
  @property() name: string;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /** When `true`, displays the `calcite-time-picker` component. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property() overlayPositioning: OverlayPositioning = "absolute";

  /** Determines where the popover will be positioned relative to the input. */
  @property({ reflect: true }) placement: LogicalPlacement = "auto";

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
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies the granularity the component's `value` must adhere to (in seconds). */
  @property() step = 60;

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

  /** The time value in ISO (24-hour) format. */
  @property()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    const oldValue = this._value;
    if (value !== oldValue) {
      this._value = value;
      this.valueWatcher(value);
    }
  }

  // #endregion

  // #region Public Methods

  /**
   * Updates the position of the component.
   *
   * @param delayed If true, delay the repositioning.
   */
  @method()
  async reposition(delayed = false): Promise<void> {
    this.popoverEl?.reposition(delayed);
  }

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    });
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteInputTimePickerBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteInputTimePickerBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component's `value` is changes. */
  calciteInputTimePickerChange = createEvent();

  /** Fires when the component is closed and animation is complete. */
  calciteInputTimePickerClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteInputTimePickerOpen = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("blur", this.hostBlurHandler);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    if (isValidTime(this.value)) {
      this.setValueDirectly(this.value);
    } else {
      this.value = undefined;
    }

    connectLabel(this);
    connectForm(this);
  }

  async load(): Promise<void> {
    await this.loadLocaleData();
    this.updateLocale();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }

    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      if (!this.disabled) {
        this.open = false;
      }
    }

    if (changes.has("hourFormat")) {
      this.updateLocale();
    }

    if (changes.has("readOnly") && (this.hasUpdated || this.readOnly !== false)) {
      if (!this.readOnly) {
        this.open = false;
      }
    }

    if (changes.has("messages")) {
      this.langWatcher();
    }

    if (changes.has("numberingSystem")) {
      this.setLocalizedInputValue({ numberingSystem: changes.get("numberingSystem") });
    }

    if (changes.has("step") && (this.hasUpdated || this.step !== 60)) {
      this.stepWatcher(this.step, changes.get("step"));
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    if (isValidTime(this.value)) {
      this.setLocalizedInputValue();
    }
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  // #endregion

  // #region Private Methods

  private async langWatcher(): Promise<void> {
    await this.loadLocaleData();
    this.updateLocale();
  }

  private openHandler(): void {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (this.popoverEl) {
      // we set the property instead of the attribute to ensure popover's open/close events are emitted properly
      this.popoverEl.open = this.open;
    }
  }

  private stepWatcher(newStep: number, oldStep?: number): void {
    if (
      (oldStep >= 60 && newStep > 0 && newStep < 60) ||
      (newStep >= 60 && oldStep > 0 && oldStep < 60)
    ) {
      this.setValueDirectly(this.value);
    }
  }

  private valueWatcher(newValue: string): void {
    if (!this.userChangedValue) {
      this.setValueDirectly(newValue);
    }
    this.userChangedValue = false;
  }

  private hostBlurHandler(): void {
    const delocalizedInputValue = this.delocalizeTimeString(this.calciteInputEl.value);

    if (!delocalizedInputValue) {
      this.setValue("");
    } else if (delocalizedInputValue !== this.value) {
      this.setValue(delocalizedInputValue);
      this.setLocalizedInputValue();
    }

    this.deactivate();
  }

  private calciteInternalInputFocusHandler(event: CustomEvent): void {
    if (!this.readOnly) {
      event.stopPropagation();
    }
  }

  private calciteInternalInputInputHandler(event: CustomEvent): void {
    const {
      messages: { _lang: locale },
      numberingSystem,
    } = this;

    if (numberingSystem && numberingSystem !== "latn") {
      const target = event.target as TimePicker["el"];

      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem,
        useGrouping: false,
      };

      const valueInNumberingSystem = numberStringFormatter
        .delocalize(target.value)
        .split("")
        .map((char) =>
          numberKeys.includes(char)
            ? numberStringFormatter.numberFormatter.format(Number(char))
            : char,
        )
        .join("");

      this.setInputValue(valueInNumberingSystem);
    }
  }

  private timePickerChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    const target = event.target as TimePicker["el"];
    const value = target.value;
    const includeSeconds = this.shouldIncludeSeconds();
    this.setValue(toISOTimeString(value, includeSeconds));
    this.setLocalizedInputValue({ isoTimeString: value });
  }

  private updateLocale(locale: SupportedLocale = this.messages._lang): void {
    this.effectiveHourFormat =
      this.hourFormat === "user" ? getLocaleHourFormat(this.messages._lang) : this.hourFormat;
    this.localeDefaultLTFormat = this.localeConfig.formats.LT;
    this.localeDefaultLTSFormat = this.localeConfig.formats.LTS;
    this.setLocalizedInputValue({ locale });
  }

  private popoverBeforeOpenHandler(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteInputTimePickerBeforeOpen.emit();
  }

  private popoverOpenHandler(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteInputTimePickerOpen.emit();
  }

  private popoverBeforeCloseHandler(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteInputTimePickerBeforeClose.emit();
  }

  private popoverCloseHandler(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteInputTimePickerClose.emit();
    this.open = false;
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("time", this, input);
  }

  private delocalizeTimeString(value: string): string {
    // we need to set the corresponding locale before parsing, otherwise it defaults to English (possible dayjs bug)
    dayjs.locale(this.getSupportedDayjsLocale(this.messages._lang.toLowerCase()));

    const nonFractionalSecondParts = this.delocalizeTimeStringToParts(value);

    let delocalizedTimeString: string;

    if (this.shouldIncludeFractionalSeconds()) {
      const stepPrecision = decimalPlaces(this.step);
      const centisecondParts = this.delocalizeTimeStringToParts(value, "S");

      if (stepPrecision === 1) {
        delocalizedTimeString =
          centisecondParts.millisecond !== 0
            ? this.getTimeStringFromParts(centisecondParts)
            : this.getTimeStringFromParts(nonFractionalSecondParts);
      } else {
        const decisecondParts = this.delocalizeTimeStringToParts(value, "SS");

        if (stepPrecision === 2) {
          if (decisecondParts.millisecond !== 0) {
            delocalizedTimeString = this.getTimeStringFromParts(decisecondParts);
          } else if (centisecondParts.millisecond !== 0) {
            delocalizedTimeString = this.getTimeStringFromParts(centisecondParts);
          } else {
            delocalizedTimeString = this.getTimeStringFromParts(nonFractionalSecondParts);
          }
        } else if (stepPrecision >= 3) {
          const millisecondParts = this.delocalizeTimeStringToParts(value, "SSS");

          if (millisecondParts.millisecond !== 0) {
            delocalizedTimeString = this.getTimeStringFromParts(millisecondParts);
          } else if (decisecondParts.millisecond !== 0) {
            delocalizedTimeString = this.getTimeStringFromParts(decisecondParts);
          } else if (centisecondParts.millisecond !== 0) {
            delocalizedTimeString = this.getTimeStringFromParts(centisecondParts);
          } else {
            delocalizedTimeString = this.getTimeStringFromParts(nonFractionalSecondParts);
          }
        }
      }
    } else {
      delocalizedTimeString = this.getTimeStringFromParts(nonFractionalSecondParts);
    }

    return delocalizedTimeString;
  }

  private delocalizeTimeStringToParts(
    value: string,
    fractionalSecondFormatToken?: "S" | "SS" | "SSS",
  ): DayjsTimeParts {
    const effectiveLocale = this.messages._lang;
    let localizedTimeString = value;
    const effectiveHourFormat = isLocaleHourFormatOpposite(
      this.effectiveHourFormat,
      effectiveLocale,
    )
      ? getLocaleOppositeHourFormat(effectiveLocale)
      : getLocaleHourFormat(effectiveLocale);

    if (localizedTwentyFourHourMeridiems.has(effectiveLocale) && effectiveHourFormat === "12") {
      const localizedAM = localizedTwentyFourHourMeridiems.get(effectiveLocale).am;
      const localizedPM = localizedTwentyFourHourMeridiems.get(effectiveLocale).pm;
      const meridiemFormatToken = getMeridiemFormatToken(effectiveLocale);
      const caseAdjustedAMString =
        meridiemFormatToken === meridiemFormatToken.toUpperCase() ? "AM" : "am";
      const caseAdjustedPMString =
        meridiemFormatToken === meridiemFormatToken.toUpperCase() ? "PM" : "pm";

      localizedTimeString = localizedTimeString.includes(localizedPM)
        ? localizedTimeString.replaceAll(localizedPM, caseAdjustedPMString)
        : localizedTimeString.replaceAll(localizedAM, caseAdjustedAMString);
    }

    this.setLocaleTimeFormat({
      fractionalSecondFormatToken,
      hourFormat: effectiveHourFormat,
    });

    const dayjsParseResult = dayjs(localizedTimeString, ["LTS", "LT"]);
    if (dayjsParseResult.isValid()) {
      return {
        hour: dayjsParseResult.get("hour"),
        minute: dayjsParseResult.get("minute"),
        second: dayjsParseResult.get("second"),
        millisecond: dayjsParseResult.get("millisecond"),
      };
    }
    return {
      hour: null,
      minute: null,
      second: null,
      millisecond: null,
    };
  }

  private getTimeStringFromParts(parts: DayjsTimeParts): string {
    let timeString = "";
    if (!parts) {
      return timeString;
    }
    if (parts.hour !== null && parts.minute !== null) {
      timeString = `${formatTimePart(parts.hour)}:${formatTimePart(parts.minute)}`;
      if (this.shouldIncludeSeconds() && parts.second !== null) {
        timeString += `:${formatTimePart(parts.second)}`;
        if (this.shouldIncludeFractionalSeconds() && parts.millisecond !== null) {
          const second = (parts.millisecond * 0.001).toFixed(decimalPlaces(this.step));
          timeString += `.${second.toString().replace("0.", "")}`;
        }
      }
    }
    return timeString;
  }

  private keyDownHandler(event: KeyboardEvent): void {
    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    if (key === "Enter") {
      if (submitForm(this)) {
        event.preventDefault();
        this.calciteInputEl.setFocus();
      }

      if (event.composedPath().includes(this.calciteTimePickerEl)) {
        return;
      }

      const newValue = this.delocalizeTimeString(this.calciteInputEl.value);

      if (isValidTime(newValue)) {
        this.setValue(newValue);
        this.setLocalizedInputValue();
      } else {
        this.setValue("");
      }
    } else if (key === "ArrowDown") {
      this.open = true;
      event.preventDefault();
    } else if (this.open && this.focusTrapDisabled && key === "Escape") {
      this.open = false;
      event.preventDefault();
    }
  }

  private getSupportedDayjsLocale(locale: string) {
    const dayjsLocale = locale.toLowerCase();
    if (dayjsLocale === "no") {
      return "nb";
    }
    if (dayjsLocale === "pt-pt") {
      return "pt";
    }
    return dayjsLocale;
  }

  private async loadLocaleData(): Promise<void> {
    let supportedLocale = getSupportedLocale(this.messages._lang).toLowerCase();

    supportedLocale = this.getSupportedDayjsLocale(supportedLocale);

    const { default: localeConfig } =
      await supportedDayjsLocaleToLocaleConfigImport.get(supportedLocale)();

    this.localeConfig = localeConfig;

    dayjs.locale(this.localeConfig, null, true);
    dayjs.updateLocale(supportedLocale, this.getExtendedLocaleConfig(supportedLocale));
  }

  private getExtendedLocaleConfig(
    locale: SupportedLocale,
  ): Parameters<(typeof dayjs)["updateLocale"]>[1] | undefined {
    /*
     * Meridiem and format tokens below are based on https://github.com/unicode-org/cldr-json/
     *
     * To reference a specific locale, check:
     * https://github.com/unicode-org/cldr-json/blob/main/cldr-json/cldr-dates-modern/main/<locale>/ca-generic.json
     *
     * Example (es-MX):
     * https://github.com/unicode-org/cldr-json/blob/d38478855dd8342749f0494332cc8acc2895d20d/cldr-json/cldr-dates-modern/main/es-MX/ca-generic.json#L227
     */
    if (locale === "ar") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "م" : "ص"),
        formats: {
          LT: "h:mm a",
          LTS: "h:mm:ss a",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm a",
          LLLL: "dddd D MMMM YYYY h:mm a",
        },
      };
    }

    if (locale === "en-au") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "pm" : "am"),
      };
    }

    if (locale === "en-ca") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "p.m." : "a.m."),
      };
    }

    if (locale === "el") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "μ.μ." : "π.μ."),
      };
    }

    if (locale === "es-mx") {
      return {
        formats: {
          LT: "h:mm a",
          LTS: "h:mm:ss a",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY H:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
        },
      };
    }

    if (locale === "hi") {
      return {
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, h:mm A",
          LLLL: "dddd, D MMMM YYYY, h:mm A",
        },
        meridiem: (hour: number) => (hour > 12 ? "pm" : "am"),
      };
    }

    if (locale === "ja") {
      return {
        meridiem: (hour) => (hour > 12 ? "午後" : "午前"),
      };
    }

    if (locale === "ko") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "오후" : "오전"),
      };
    }

    if (locale === "no") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "p.m." : "a.m."),
      };
    }

    if (locale === "ru") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "PM" : "AM"),
      };
    }

    if (locale === "zh-cn") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "下午" : "上午"),
      };
    }

    if (locale === "zh-tw") {
      return {
        formats: {
          LT: "Ah:mm",
          LTS: "Ah:mm:ss",
        },
      };
    }

    if (locale === "zh-hk") {
      return {
        formats: {
          LT: "Ah:mm",
          LTS: "Ah:mm:ss",
        },
        meridiem: (hour: number) => (hour > 12 ? "下午" : "上午"),
      };
    }
  }

  private getLocalizedTimeString(params?: GetLocalizedTimeStringParameters): string {
    const hour12 =
      params?.hourFormat === "12" ||
      (this.effectiveHourFormat && this.effectiveHourFormat === "12");
    const locale = params?.locale ?? this.messages._lang;
    const numberingSystem = params?.numberingSystem ?? this.numberingSystem;
    const value = params?.isoTimeString ?? this.value;
    return (
      localizeTimeString({
        fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
        hour12,
        includeSeconds: this.shouldIncludeSeconds(),
        locale,
        numberingSystem,
        value,
      }) ?? ""
    );
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private shouldIncludeSeconds(): boolean {
    return this.step < 60;
  }

  private shouldIncludeFractionalSeconds(): boolean {
    return decimalPlaces(this.step) > 0;
  }

  private setCalcitePopoverEl(el: Popover["el"]): void {
    this.popoverEl = el;
    this.openHandler();
  }

  private setInputEl(el: InputText["el"]): void {
    if (!el) {
      return;
    }
    this.calciteInputEl = el;
  }

  private setCalciteTimePickerEl(el: TimePicker["el"]): void {
    if (!el) {
      return;
    }
    this.calciteTimePickerEl = el;
  }

  private setLocaleTimeFormat({
    fractionalSecondFormatToken,
    hourFormat,
  }: {
    fractionalSecondFormatToken?: "S" | "SS" | "SSS";
    hourFormat: EffectiveHourFormat;
  }): void {
    const effectiveLocale = this.messages._lang;
    const localeDefaultHourFormat = getLocaleHourFormat(effectiveLocale);
    const hourRegEx = /h+|H+/g;
    const meridiemRegEx = /\s+|a+|A+|\s+/g;

    let ltFormatString = this.localeConfig.formats.LT;
    let ltsFormatString = this.localeConfig.formats.LTS;

    if (hourFormat === "12" && localeDefaultHourFormat === "24") {
      const meridiemFormatToken = getMeridiemFormatToken(effectiveLocale);
      const meridiemOrder = getMeridiemOrder(effectiveLocale);
      ltFormatString = ltFormatString.replaceAll(hourRegEx, "h");
      ltFormatString = ltFormatString.replaceAll(meridiemRegEx, "");
      ltFormatString =
        meridiemOrder === 0
          ? `${meridiemFormatToken}${ltFormatString}`
          : `${ltFormatString}${meridiemFormatToken}`;
      ltsFormatString = ltsFormatString.replaceAll(hourRegEx, "h");
      ltsFormatString = ltsFormatString.replaceAll(meridiemRegEx, "");
      ltsFormatString =
        meridiemOrder === 0
          ? `${meridiemFormatToken}${ltsFormatString}`
          : `${ltsFormatString}${meridiemFormatToken}`;
    } else if (hourFormat === "24" && localeDefaultHourFormat === "12") {
      ltFormatString = ltFormatString.replaceAll(hourRegEx, "H");
      ltFormatString = ltFormatString.replaceAll(meridiemRegEx, "");
      ltsFormatString = ltsFormatString.replaceAll(hourRegEx, "H");
      ltsFormatString = ltsFormatString.replaceAll(meridiemRegEx, "");
    } else {
      ltFormatString = this.localeDefaultLTFormat;
      ltsFormatString = this.localeDefaultLTSFormat;
    }

    const fractionalSecondTokenMatch = ltsFormatString?.match(/ss\.*(S+)/g);
    if (fractionalSecondFormatToken && this.shouldIncludeFractionalSeconds()) {
      const secondFormatToken = `ss.${fractionalSecondFormatToken}`;
      ltsFormatString = fractionalSecondTokenMatch
        ? ltsFormatString.replace(fractionalSecondTokenMatch[0], secondFormatToken)
        : ltsFormatString.replace("ss", secondFormatToken);
    } else if (fractionalSecondTokenMatch) {
      ltsFormatString = ltsFormatString.replace(fractionalSecondTokenMatch[0], "ss");
    }

    this.localeConfig.formats.LT = ltFormatString;
    this.localeConfig.formats.LTS = ltsFormatString;

    dayjs.updateLocale(
      this.getSupportedDayjsLocale(getSupportedLocale(effectiveLocale)),
      this.localeConfig as Record<string, any>,
    );
  }

  private setInputValue(newInputValue: string): void {
    if (!this.calciteInputEl) {
      return;
    }
    this.calciteInputEl.value = newInputValue;
  }

  /**
   * Sets the value and emits a change event.
   * This is used to update the value as a result of user interaction.
   *
   * @param value The new value
   */
  private setValue(value: string): void {
    const oldValue = this.value;
    const newValue = formatTimeString(value) || "";

    if (newValue === oldValue) {
      return;
    }

    this.userChangedValue = true;
    this.value = newValue || "";

    const changeEvent = this.calciteInputTimePickerChange.emit();

    if (changeEvent.defaultPrevented) {
      this.userChangedValue = false;
      this.value = oldValue;
      this.setLocalizedInputValue({ isoTimeString: oldValue });
    }
  }

  /**
   * Sets the value directly without emitting a change event.
   * This is used to update the value on initial load and when props change that are not the result of user interaction.
   *
   * @param value The new value
   */
  private setValueDirectly(value: string): void {
    const includeSeconds = this.shouldIncludeSeconds();
    this.value = toISOTimeString(value, includeSeconds);
    this.setLocalizedInputValue();
  }

  private onInputWrapperClick() {
    this.open = !this.open;
  }

  private deactivate(): void {
    this.open = false;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { disabled, messages, readOnly } = this;
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class="input-wrapper" onClick={this.onInputWrapperClick}>
          <calcite-input-text
            aria-errormessage={IDS.validationMessage}
            ariaAutoComplete="none"
            ariaHasPopup="dialog"
            ariaInvalid={this.status === "invalid"}
            disabled={disabled}
            icon="clock"
            label={getLabelText(this)}
            lang={this.messages._lang}
            oncalciteInputTextInput={this.calciteInternalInputInputHandler}
            oncalciteInternalInputTextFocus={this.calciteInternalInputFocusHandler}
            readOnly={readOnly}
            ref={this.setInputEl}
            role="combobox"
            scale={this.scale}
            status={this.status}
          >
            {!this.readOnly && this.renderToggleIcon(this.open)}
          </calcite-input-text>
        </div>
        <calcite-popover
          autoClose={true}
          focusTrapDisabled={this.focusTrapDisabled}
          focusTrapOptions={{ initialFocus: false }}
          label={messages.chooseTime}
          lang={this.messages._lang}
          oncalcitePopoverBeforeClose={this.popoverBeforeCloseHandler}
          oncalcitePopoverBeforeOpen={this.popoverBeforeOpenHandler}
          oncalcitePopoverClose={this.popoverCloseHandler}
          oncalcitePopoverOpen={this.popoverOpenHandler}
          overlayPositioning={this.overlayPositioning}
          placement={this.placement}
          ref={this.setCalcitePopoverEl}
          referenceElement={this.calciteInputEl}
          triggerDisabled={true}
        >
          <calcite-time-picker
            hourFormat={this.effectiveHourFormat}
            lang={this.messages._lang}
            messageOverrides={this.messageOverrides}
            numberingSystem={this.numberingSystem}
            oncalciteTimePickerChange={this.timePickerChangeHandler}
            ref={this.setCalciteTimePickerEl}
            scale={this.scale}
            step={this.step}
            tabIndex={this.open ? undefined : -1}
            value={this.value}
          />
        </calcite-popover>
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
      <span class={CSS.toggleIcon} slot="action">
        <calcite-icon
          icon={open ? "chevron-up" : "chevron-down"}
          scale={getIconScale(this.scale)}
        />
      </span>
    );
  }

  // #endregion
}
