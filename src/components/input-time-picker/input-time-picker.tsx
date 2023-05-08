import {
  Component,
  Element,
  Event,
  EventEmitter,
  getAssetPath,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import { FloatingUIComponent, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm
} from "../../utils/form";
import { guid } from "../../utils/guid";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { numberKeys } from "../../utils/key";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter
} from "../../utils/locale";
import {
  formatTimeString,
  isValidTime,
  localizeTimeString,
  toISOTimeString
} from "../../utils/time";
import { Scale } from "../interfaces";
import { TimePickerMessages } from "../time-picker/assets/time-picker/t9n";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import preParsePostFormat from "dayjs/plugin/preParsePostFormat";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(preParsePostFormat);
dayjs.extend(updateLocale);

// This dayjs global is needed by the lazy-loaded locale files
(window as any).dayjs = dayjs;

@Component({
  tag: "calcite-input-time-picker",
  styleUrl: "input-time-picker.scss",
  shadow: {
    delegatesFocus: true
  },
  assetsDirs: ["assets"]
})
export class InputTimePicker
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    FloatingUIComponent,
    LocalizedComponent,
    LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputTimePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, displays the `calcite-time-picker` component. */

  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(value: boolean): void {
    if (this.disabled || this.readOnly) {
      this.open = false;
      return;
    }

    if (value) {
      this.reposition(true);
    }
  }

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

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

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop() messagesOverrides: Partial<TimePickerMessages>;

  /** Specifies the name of the component on form submission. */
  @Prop() name: string;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem = "latn";

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

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

  /** The component's value in UTC (always 24-hour format). */
  @Prop({ mutable: true }) value: string = null;

  @Watch("value")
  valueWatcher(newValue: string): void {
    if (!this.userChangedValue) {
      this.value = isValidTime(newValue) ? newValue : "";
      this.setInputValue(
        this.value
          ? localizeTimeString({
              value: newValue,
              includeSeconds: this.shouldIncludeSeconds(),
              locale: this.effectiveLocale,
              numberingSystem: this.numberingSystem
            })
          : ""
      );
    }
    this.userChangedValue = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: InputTimePicker["value"];

  private calciteInputEl: HTMLCalciteInputElement;

  private calciteTimePickerEl: HTMLCalciteTimePickerElement;

  /** whether the value of the input was changed as a result of user typing or not */
  private userChangedValue = false;

  private referenceElementId = `input-time-picker-${guid()}`;

  popoverEl: HTMLCalcitePopoverElement;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  @Watch("step")
  valueRelatedPropChange(): void {
    this.setInputValue(
      localizeTimeString({
        value: this.value,
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        includeSeconds: this.shouldIncludeSeconds()
      })
    );
    this.loadLocaleDefinition();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the time value is changed as a result of user input.
   */
  @Event({ cancelable: true }) calciteInputTimePickerChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  private calciteInternalInputBlurHandler = (): void => {
    this.open = false;
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
      includeSeconds: this.shouldIncludeSeconds()
    });

    if (localizedTimeString !== inputValue) {
      this.setInputValue(localizedTimeString);
    }
  };

  private calciteInternalInputFocusHandler = (event: CustomEvent): void => {
    if (!this.readOnly) {
      this.open = true;
      event.stopPropagation();
    }
  };

  private calciteInternalInputInputHandler = (event: CustomEvent): void => {
    const { effectiveLocale: locale, numberingSystem } = this;

    if (numberingSystem === "latn") {
      return;
    }

    const target = event.target as HTMLCalciteTimePickerElement;

    numberStringFormatter.numberFormatOptions = {
      locale,
      numberingSystem,
      useGrouping: false
    };

    const valueInNumberingSystem = numberStringFormatter
      .delocalize(target.value)
      .split("")
      .map((char) =>
        numberKeys.includes(char)
          ? numberStringFormatter.numberFormatter.format(Number(char))
          : char
      )
      .join("");

    this.setInputValue(valueInNumberingSystem);
  };

  @Listen("click")
  clickHandler(event: MouseEvent): void {
    if (event.composedPath().includes(this.calciteTimePickerEl)) {
      return;
    }
    this.setFocus();
  }

  @Listen("calciteInternalTimePickerBlur")
  timePickerBlurHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.open = false;
  }

  private timePickerChangeHandler = (event: CustomEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLCalciteTimePickerElement;
    const value = target.value;
    this.setValue(toISOTimeString(value));
    this.setInputValue(
      localizeTimeString({
        value,
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        includeSeconds: this.shouldIncludeSeconds()
      })
    );
  };

  @Listen("calciteInternalTimePickerFocus")
  timePickerFocusHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.readOnly) {
      this.open = true;
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

    this.el.focus();
  }

  /**
   * Updates the position of the component.
   *
   * @param delayed
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

  private delocalizeTimeString(value: string): string {
    const locale = this.effectiveLocale.toLowerCase();
    let localeConfig,
      valueToParse = value;

    if (locale === "ar") {
      if (this.numberingSystem === "arab") {
        const arabNumberMap = {
          "١": "1",
          "٢": "2",
          "٣": "3",
          "٤": "4",
          "٥": "5",
          "٦": "6",
          "٧": "7",
          "٨": "8",
          "٩": "9",
          "٠": "0"
        };
        valueToParse = value.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (match) => arabNumberMap[match]);
      } else if (this.numberingSystem === "arabext") {
        const arabextNumberMap = {
          "۱": "1",
          "۲": "2",
          "۳": "3",
          "۴": "4",
          "۵": "5",
          "۶": "6",
          "۷": "7",
          "۸": "8",
          "۹": "9",
          "۰": "0"
        };
        valueToParse = value.replace(/[۱۲۳۴۵۶۷۸۹۰]/g, (match) => arabextNumberMap[match]);
      }
      localeConfig = {
        meridiem: (hour) => (hour > 12 ? "م" : "ص"),
        formats: {
          LT: "HH:mm A",
          LTS: "HH:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm A",
          LLLL: "dddd D MMMM YYYY HH:mm A"
        }
      };
    } else if (locale === "en-au") {
      localeConfig = {
        meridiem: (hour) => (hour > 12 ? "pm" : "am")
      };
    } else if (locale === "en-ca") {
      localeConfig = {
        meridiem: (hour) => (hour > 12 ? "p.m." : "a.m.")
      };
    } else if (locale === "el") {
      localeConfig = {
        meridiem: (hour) => (hour > 12 ? "μ.μ." : "π.μ.")
      };
    } else if (locale === "hi") {
      localeConfig = {
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, h:mm A",
          LLLL: "dddd, D MMMM YYYY, h:mm A"
        },
        meridiem: (hour) => (hour > 12 ? "pm" : "am")
      };
    } else if (locale === "ko") {
      localeConfig = {
        meridiem: (hour) => (hour > 12 ? "오후" : "오전")
      };
    } else if (locale === "zh-tw") {
      localeConfig = {
        formats: {
          LT: "AHH:mm",
          LTS: "AHH:mm:ss"
        }
      };
    } else if (locale === "zh-hk") {
      localeConfig = {
        formats: {
          LT: "AHH:mm",
          LTS: "AHH:mm:ss"
        },
        meridiem: (hour) => (hour > 12 ? "下午" : "上午")
      };
    }

    dayjs.updateLocale(locale, localeConfig);

    const dayjsParseResult = dayjs(valueToParse, ["LTS", "LT"], locale.toLowerCase());

    if (dayjsParseResult.isValid()) {
      const unformattedTimeString = `${dayjsParseResult.get("hour")}:${dayjsParseResult.get(
        "minute"
      )}:${this.shouldIncludeSeconds() ? dayjsParseResult.get("seconds") : 0}`;

      return formatTimeString(unformattedTimeString) || "";
    }
    return "";
  }

  keyDownHandler = (event: KeyboardEvent): void => {
    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    if (key === "Enter") {
      if (submitForm(this)) {
        event.preventDefault();
      }

      if (event.composedPath().includes(this.calciteTimePickerEl)) {
        return;
      }

      const newValue = this.delocalizeTimeString(this.calciteInputEl.value);

      this.setValue(newValue);

      const localizedTimeString = localizeTimeString({
        value: this.value,
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        includeSeconds: this.shouldIncludeSeconds()
      });

      if (newValue && this.calciteInputEl.value !== localizedTimeString) {
        this.setInputValue(localizedTimeString);
      }
    }

    if (key === "Escape" && this.open) {
      this.open = false;
      event.preventDefault();
    }
  };

  private async loadLocaleDefinition(): Promise<void> {
    const { effectiveLocale } = this;
    if (effectiveLocale === "en" || effectiveLocale === "en-US") {
      return;
    }
    let dayjsLocale = effectiveLocale.toLowerCase();
    if (effectiveLocale === "pt-PT") {
      dayjsLocale = "pt";
    }
    if (effectiveLocale === "no") {
      dayjsLocale = "nb";
    }
    await import(getAssetPath(`assets/nls/dayjs/input-time-picker/${dayjsLocale}.js`));
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private shouldIncludeSeconds(): boolean {
    return this.step < 60;
  }

  private setCalcitePopoverEl = (el: HTMLCalcitePopoverElement): void => {
    this.popoverEl = el;
  };

  private setCalciteInputEl = (el: HTMLCalciteInputElement): void => {
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
          includeSeconds: this.shouldIncludeSeconds()
        })
      );
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    connectLocalized(this);

    if (isValidTime(this.value)) {
      const includeSeconds = this.shouldIncludeSeconds();
      this.value = toISOTimeString(this.value, includeSeconds);
      this.setInputValue(
        localizeTimeString({
          value: this.value,
          includeSeconds,
          locale: this.effectiveLocale,
          numberingSystem: this.numberingSystem
        })
      );
    } else {
      this.value = undefined;
    }

    connectLabel(this);
    connectForm(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
    this.loadLocaleDefinition();
  }

  componentDidLoad() {
    setComponentLoaded(this);
    if (isValidTime(this.value)) {
      this.setInputValue(
        localizeTimeString({
          value: this.value,
          locale: this.effectiveLocale,
          numberingSystem: this.numberingSystem,
          includeSeconds: this.shouldIncludeSeconds()
        })
      );
    }
  }

  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
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
    const popoverId = `${this.referenceElementId}-popover`;
    return (
      <Host onKeyDown={this.keyDownHandler}>
        <div
          aria-controls={popoverId}
          aria-haspopup="dialog"
          aria-label={this.name}
          aria-owns={popoverId}
          id={this.referenceElementId}
          role="combobox"
        >
          <calcite-input
            disabled={this.disabled}
            icon="clock"
            label={getLabelText(this)}
            lang={this.effectiveLocale}
            onCalciteInputInput={this.calciteInternalInputInputHandler}
            onCalciteInternalInputBlur={this.calciteInternalInputBlurHandler}
            onCalciteInternalInputFocus={this.calciteInternalInputFocusHandler}
            readOnly={this.readOnly}
            scale={this.scale}
            step={this.step}
            // eslint-disable-next-line react/jsx-sort-props
            ref={this.setCalciteInputEl}
          />
        </div>
        <calcite-popover
          focusTrapDisabled={true}
          id={popoverId}
          label="Time Picker"
          lang={this.effectiveLocale}
          open={this.open}
          overlayPositioning={this.overlayPositioning}
          placement={this.placement}
          referenceElement={this.referenceElementId}
          triggerDisabled={true}
          // eslint-disable-next-line react/jsx-sort-props
          ref={this.setCalcitePopoverEl}
        >
          <calcite-time-picker
            lang={this.effectiveLocale}
            messageOverrides={this.messagesOverrides}
            numberingSystem={this.numberingSystem}
            onCalciteInternalTimePickerChange={this.timePickerChangeHandler}
            scale={this.scale}
            step={this.step}
            value={this.value}
            // eslint-disable-next-line react/jsx-sort-props
            ref={this.setCalciteTimePickerEl}
          />
        </calcite-popover>
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }
}
