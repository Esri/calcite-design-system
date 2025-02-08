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
import dayjs from "dayjs/esm";
import customParseFormat from "dayjs/esm/plugin/customParseFormat";
import localeData from "dayjs/esm/plugin/localeData";
import localizedFormat from "dayjs/esm/plugin/localizedFormat";
import preParsePostFormat from "dayjs/esm/plugin/preParsePostFormat";
import updateLocale from "dayjs/esm/plugin/updateLocale";
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
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
  SupportedLocale,
} from "../../utils/locale";
import {
  formatTimePart,
  formatTimeString,
  FractionalSecondDigits,
  isValidTime,
  localizeTimeString,
  toISOTimeString,
} from "../../utils/time";
import { Scale, Status } from "../interfaces";
import { TimePickerMessages } from "../time-picker/assets/time-picker/t9n";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { getSupportedLocale } from "../../utils/locale";
import { decimalPlaces } from "../../utils/math";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import { focusFirstTabbable, toAriaBoolean } from "../../utils/dom";
import { IconNameOrString } from "../icon/interfaces";
import { syncHiddenFormInput } from "../input/common/input";
import { CSS, IDS } from "./resources";
import { InputTimePickerMessages } from "./assets/input-time-picker/t9n";

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

@Component({
  tag: "calcite-input-time-picker",
  styleUrl: "input-time-picker.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
})
export class InputTimePicker
  implements
    FormComponent,
    InteractiveComponent,
    LabelableComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, displays the `calcite-time-picker` component. */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    if (this.disabled || this.readOnly) {
      this.open = false;
      return;
    }

    // we set the property instead of the attribute to ensure popover's open/close events are emitted properly
    this.popoverEl.open = this.open;
  }

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When `true`, prevents focus trapping.
   */
  @Prop({ reflect: true }) focusTrapDisabled = false;

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

  /**
   * Specifies the maximum value.
   *
   * @mdn [max](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#max)
   */
  @Prop({ reflect: true }) max: string;

  /**
   * Specifies the minimum value.
   *
   * @mdn [min](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#min)
   */
  @Prop({ reflect: true }) min: string;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<InputTimePickerMessages & TimePickerMessages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: InputTimePickerMessages;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
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

  /** Specifies the name of the component on form submission. */
  @Prop() name: string;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  @Watch("numberingSystem")
  numberingSystemWatcher(numberingSystem: NumberingSystem): void {
    this.setInputValue(
      localizeTimeString({
        value: this.value,
        locale: this.effectiveLocale,
        numberingSystem,
        includeSeconds: this.shouldIncludeSeconds(),
        fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
      }),
    );
  }

  /** When `true`, the component must have a value in order for the form to submit. */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ reflect: true }) status: Status = "idle";

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the popover will be positioned relative to the input.
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = "auto";

  /** Specifies the granularity the component's `value` must adhere to (in seconds). */
  @Prop() step = 60;

  @Watch("step")
  stepWatcher(newStep: number, oldStep: number): void {
    if (
      (oldStep >= 60 && newStep > 0 && newStep < 60) ||
      (newStep >= 60 && oldStep > 0 && oldStep < 60)
    ) {
      this.setValueDirectly(this.value);
    }
  }

  /** The time value in ISO (24-hour) format. */
  @Prop({ mutable: true }) value: string = null;

  @Watch("value")
  valueWatcher(newValue: string): void {
    if (!this.userChangedValue) {
      this.setValueDirectly(newValue);
    }
    this.userChangedValue = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputTimePickerElement;

  @State() calciteInputEl: HTMLCalciteInputTextElement;

  defaultValue: InputTimePicker["value"];

  formEl: HTMLFormElement;

  labelEl: HTMLCalciteLabelElement;

  popoverEl: HTMLCalcitePopoverElement;

  private calciteTimePickerEl: HTMLCalciteTimePickerElement;

  private localeConfig: ILocale;

  /** whether the value of the input was changed as a result of user typing or not */
  private userChangedValue = false;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() defaultMessages: InputTimePickerMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  async effectiveLocaleWatcher(locale: SupportedLocale): Promise<void> {
    await Promise.all([this.loadDateTimeLocaleData(), updateMessages(this, this.effectiveLocale)]);

    this.setInputValue(
      localizeTimeString({
        value: this.value,
        locale,
        numberingSystem: this.numberingSystem,
        includeSeconds: this.shouldIncludeSeconds(),
        fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
      }),
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteInputTimePickerBeforeClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteInputTimePickerBeforeOpen: EventEmitter<void>;

  /**
   * Fires when the component's `value` is changes.
   */
  @Event({ cancelable: true }) calciteInputTimePickerChange: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteInputTimePickerClose: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteInputTimePickerOpen: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  private hostBlurHandler = (): void => {
    const inputValue = this.calciteInputEl.value;
    const delocalizedInputValue = this.delocalizeTimeString(inputValue);

    if (!delocalizedInputValue) {
      this.setValue("");
      return;
    }

    if (delocalizedInputValue !== this.value) {
      this.setValue(delocalizedInputValue);
    }

    const localizedTimeString = localizeTimeString({
      value: this.value,
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      includeSeconds: this.shouldIncludeSeconds(),
      fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
    });

    if (localizedTimeString !== inputValue) {
      this.setInputValue(localizedTimeString);
    }

    this.deactivate();
  };

  private calciteInternalInputFocusHandler = (event: CustomEvent): void => {
    if (!this.readOnly) {
      event.stopPropagation();
    }
  };

  private calciteInternalInputInputHandler = (event: CustomEvent): void => {
    const { effectiveLocale: locale, numberingSystem } = this;

    if (numberingSystem && numberingSystem !== "latn") {
      const target = event.target as HTMLCalciteTimePickerElement;

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
  };

  private timePickerChangeHandler = (event: CustomEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLCalciteTimePickerElement;
    const value = target.value;
    const includeSeconds = this.shouldIncludeSeconds();
    this.setValue(toISOTimeString(value, includeSeconds));
    this.setInputValue(
      localizeTimeString({
        value,
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        includeSeconds,
        fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
      }),
    );
  };

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
   * @param delayed If true, delay the repositioning.
   */
  @Method()
  async reposition(delayed = false): Promise<void> {
    this.popoverEl?.reposition(delayed);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private popoverBeforeOpenHandler = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteInputTimePickerBeforeOpen.emit();
  };

  private popoverOpenHandler = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteInputTimePickerOpen.emit();
  };

  private popoverBeforeCloseHandler = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteInputTimePickerBeforeClose.emit();
  };

  private popoverCloseHandler = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteInputTimePickerClose.emit();
    this.open = false;
  };

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("time", this, input);
  }

  private delocalizeTimeString(value: string): string {
    // we need to set the corresponding locale before parsing, otherwise it defaults to English (possible dayjs bug)
    dayjs.locale(this.effectiveLocale.toLowerCase());

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
    localizedTimeString: string,
    fractionalSecondFormatToken?: "S" | "SS" | "SSS",
  ): DayjsTimeParts {
    const ltsFormatString = this.localeConfig?.formats?.LTS;
    const fractionalSecondTokenMatch = ltsFormatString.match(/ss\.*(S+)/g);

    if (fractionalSecondFormatToken && this.shouldIncludeFractionalSeconds()) {
      const secondFormatToken = `ss.${fractionalSecondFormatToken}`;
      this.localeConfig.formats.LTS = fractionalSecondTokenMatch
        ? ltsFormatString.replace(fractionalSecondTokenMatch[0], secondFormatToken)
        : ltsFormatString.replace("ss", secondFormatToken);
    } else if (fractionalSecondTokenMatch) {
      this.localeConfig.formats.LTS = ltsFormatString.replace(fractionalSecondTokenMatch[0], "ss");
    }

    dayjs.updateLocale(
      this.getSupportedDayjsLocale(getSupportedLocale(this.effectiveLocale)),
      this.localeConfig as Record<string, any>,
    );

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

  keyDownHandler = (event: KeyboardEvent): void => {
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

        const localizedTimeString = localizeTimeString({
          value: this.value,
          locale: this.effectiveLocale,
          numberingSystem: this.numberingSystem,
          includeSeconds: this.shouldIncludeSeconds(),
          fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
        });

        if (newValue && this.calciteInputEl.value !== localizedTimeString) {
          this.setInputValue(localizedTimeString);
        }
      }
    } else if (key === "ArrowDown") {
      this.open = true;
      event.preventDefault();
    }
  };

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

  private async loadDateTimeLocaleData(): Promise<void> {
    let supportedLocale = getSupportedLocale(this.effectiveLocale).toLowerCase();

    supportedLocale = this.getSupportedDayjsLocale(supportedLocale);

    const { default: localeConfig } =
      await supportedDayjsLocaleToLocaleConfigImport.get(supportedLocale)();

    this.localeConfig = localeConfig;

    dayjs.locale(this.localeConfig, null, true);
    dayjs.updateLocale(supportedLocale, this.getExtendedLocaleConfig(supportedLocale));
  }

  private getExtendedLocaleConfig(
    locale: string,
  ): Parameters<(typeof dayjs)["updateLocale"]>[1] | undefined {
    if (locale === "ar") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "م" : "ص"),
        formats: {
          LT: "HH:mm A",
          LTS: "HH:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm A",
          LLLL: "dddd D MMMM YYYY HH:mm A",
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

    if (locale === "ko") {
      return {
        meridiem: (hour: number) => (hour > 12 ? "오후" : "오전"),
      };
    }

    if (locale === "zh-tw") {
      return {
        formats: {
          LT: "AHH:mm",
          LTS: "AHH:mm:ss",
        },
      };
    }

    if (locale === "zh-hk") {
      return {
        formats: {
          LT: "AHH:mm",
          LTS: "AHH:mm:ss",
        },
        meridiem: (hour: number) => (hour > 12 ? "下午" : "上午"),
      };
    }
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

  private setCalcitePopoverEl = (el: HTMLCalcitePopoverElement): void => {
    this.popoverEl = el;
    this.openHandler();
  };

  private setInputEl = (el: HTMLCalciteInputTextElement): void => {
    this.calciteInputEl = el;
  };

  private setCalciteTimePickerEl = (el: HTMLCalciteTimePickerElement): void => {
    this.calciteTimePickerEl = el;
  };

  private setInputValue = (newInputValue: string): void => {
    if (!this.calciteInputEl) {
      return;
    }
    this.calciteInputEl.value = newInputValue;
  };

  /**
   * Sets the value and emits a change event.
   * This is used to update the value as a result of user interaction.
   *
   * @param value The new value
   */
  private setValue = (value: string): void => {
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
      this.setInputValue(
        localizeTimeString({
          value: oldValue,
          locale: this.effectiveLocale,
          numberingSystem: this.numberingSystem,
          includeSeconds: this.shouldIncludeSeconds(),
          fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
        }),
      );
    }
  };

  /**
   * Sets the value directly without emitting a change event.
   * This is used to update the value on initial load and when props change that are not the result of user interaction.
   *
   * @param value The new value
   */
  private setValueDirectly = (value: string): void => {
    const includeSeconds = this.shouldIncludeSeconds();
    this.value = toISOTimeString(value, includeSeconds);
    this.setInputValue(
      this.value
        ? localizeTimeString({
            value: this.value,
            includeSeconds,
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
          })
        : "",
    );
  };

  private onInputWrapperClick = () => {
    this.open = !this.open;
  };

  deactivate = (): void => {
    this.open = false;
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    connectLocalized(this);

    if (isValidTime(this.value)) {
      this.setValueDirectly(this.value);
    } else {
      this.value = undefined;
    }

    connectLabel(this);
    connectForm(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await Promise.all([setUpMessages(this), this.loadDateTimeLocaleData()]);
  }

  componentDidLoad() {
    setComponentLoaded(this);
    if (isValidTime(this.value)) {
      this.setInputValue(
        localizeTimeString({
          value: this.value,
          locale: this.effectiveLocale,
          numberingSystem: this.numberingSystem,
          includeSeconds: this.shouldIncludeSeconds(),
          fractionalSecondDigits: decimalPlaces(this.step) as FractionalSecondDigits,
        }),
      );
    }
  }

  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { disabled, messages, readOnly } = this;
    return (
      <Host onBlur={this.hostBlurHandler} onKeyDown={this.keyDownHandler}>
        <InteractiveContainer disabled={this.disabled}>
          <div class="input-wrapper" onClick={this.onInputWrapperClick}>
            <calcite-input-text
              aria-autocomplete="none"
              aria-errormessage={IDS.validationMessage}
              aria-haspopup="dialog"
              aria-invalid={toAriaBoolean(this.status === "invalid")}
              disabled={disabled}
              icon="clock"
              label={getLabelText(this)}
              lang={this.effectiveLocale}
              onCalciteInputTextInput={this.calciteInternalInputInputHandler}
              onCalciteInternalInputTextFocus={this.calciteInternalInputFocusHandler}
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
            label={messages.chooseTime}
            lang={this.effectiveLocale}
            onCalcitePopoverBeforeClose={this.popoverBeforeCloseHandler}
            onCalcitePopoverBeforeOpen={this.popoverBeforeOpenHandler}
            onCalcitePopoverClose={this.popoverCloseHandler}
            onCalcitePopoverOpen={this.popoverOpenHandler}
            overlayPositioning={this.overlayPositioning}
            placement={this.placement}
            ref={this.setCalcitePopoverEl}
            referenceElement={this.calciteInputEl}
            triggerDisabled={true}
          >
            <calcite-time-picker
              lang={this.effectiveLocale}
              messageOverrides={this.messageOverrides}
              numberingSystem={this.numberingSystem}
              onCalciteInternalTimePickerChange={this.timePickerChangeHandler}
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
      </Host>
    );
  }

  renderToggleIcon(open: boolean): VNode {
    return (
      <span class={CSS.toggleIcon} slot="action">
        <calcite-icon
          icon={open ? "chevron-up" : "chevron-down"}
          scale={getIconScale(this.scale)}
        />
      </span>
    );
  }
}
