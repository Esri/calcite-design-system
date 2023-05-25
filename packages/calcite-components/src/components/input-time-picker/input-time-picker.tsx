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
  numberStringFormatter,
  SupportedLocales
} from "../../utils/locale";
import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  FocusTrapComponent
} from "../../utils/focusTrapComponent";
import { FocusTrap } from "focus-trap";
import {
  formatTimeString,
  isValidTime,
  localizeTimeString,
  toISOTimeString
} from "../../utils/time";
import { Scale } from "../interfaces";
import { TimePickerMessages } from "../time-picker/assets/time-picker/t9n";
import { connectMessages, disconnectMessages, setUpMessages, T9nComponent } from "../../utils/t9n";
import { InputTimePickerMessages } from "./assets/input-time-picker/t9n";
import { CSS, supportedDayJsLocaleToLocaleConfigImport } from "./resources";

import dayjs from "dayjs/esm";
import customParseFormat from "dayjs/esm/plugin/customParseFormat";
import localeData from "dayjs/esm/plugin/localeData";
import localizedFormat from "dayjs/esm/plugin/localizedFormat";
import preParsePostFormat from "dayjs/esm/plugin/preParsePostFormat";
import updateLocale from "dayjs/esm/plugin/updateLocale";

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(preParsePostFormat);
dayjs.extend(updateLocale);

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
    FloatingUIComponent,
    FocusTrapComponent,
    FormComponent,
    InteractiveComponent,
    LabelableComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
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
        includeSeconds: this.shouldIncludeSeconds()
      })
    );
  }

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

  defaultValue: InputTimePicker["value"];

  formEl: HTMLFormElement;

  labelEl: HTMLCalciteLabelElement;

  popoverEl: HTMLCalcitePopoverElement;

  private calciteInputEl: HTMLCalciteInputElement;

  private calciteTimePickerEl: HTMLCalciteTimePickerElement;

  private focusOnOpen = false;

  focusTrap: FocusTrap;

  private dialogId = `time-picker-dialog--${guid()}`;

  /** whether the value of the input was changed as a result of user typing or not */
  private userChangedValue = false;

  private referenceElementId = `input-time-picker-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() defaultMessages: InputTimePickerMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  async effectiveLocaleWatcher(locale: SupportedLocales): Promise<void> {
    await this.loadDateTimeLocaleData();
    this.setInputValue(
      localizeTimeString({
        value: this.value,
        locale,
        numberingSystem: this.numberingSystem,
        includeSeconds: this.shouldIncludeSeconds()
      })
    );
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
      includeSeconds: this.shouldIncludeSeconds()
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
        includeSeconds
      })
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
    // we need to set the corresponding locale before parsing, otherwise it defaults to English (possible dayjs bug)
    dayjs.locale(this.effectiveLocale.toLowerCase());

    const dayjsParseResult = dayjs(value, ["LTS", "LT"]);

    if (dayjsParseResult.isValid()) {
      let unformattedTimeString = `${dayjsParseResult.get("hour")}:${dayjsParseResult.get(
        "minute"
      )}`;

      if (this.shouldIncludeSeconds()) {
        unformattedTimeString += `:${dayjsParseResult.get("seconds") || 0}`;
      }

      return formatTimeString(unformattedTimeString) || "";
    }
    return "";
  }

  private popoverCloseHandler = () => {
    deactivateFocusTrap(this, {
      onDeactivate: () => {
        this.calciteInputEl.setFocus();
        this.focusOnOpen = false;
      }
    });
  };

  private popoverOpenHandler = () => {
    activateFocusTrap(this, {
      onActivate: () => {
        if (this.focusOnOpen) {
          this.calciteTimePickerEl.setFocus();
          this.focusOnOpen = false;
        }
      }
    });
  };

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
    } else if (key === "ArrowDown") {
      this.open = true;
      this.focusOnOpen = true;
      event.preventDefault();
    } else if (key === "Escape" && this.open) {
      this.open = false;
      event.preventDefault();
      this.calciteInputEl.setFocus();
    }
  };

  private async loadDateTimeLocaleData(): Promise<void> {
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

    const { default: localeConfig } = await supportedDayJsLocaleToLocaleConfigImport.get(
      dayjsLocale
    )();

    dayjs.locale(localeConfig, null, true);
    dayjs.updateLocale(dayjsLocale, this.getExtendedLocaleConfig(dayjsLocale));
  }

  private getExtendedLocaleConfig(
    locale: string
  ): Parameters<(typeof dayjs)["updateLocale"]>[1] | undefined {
    if (locale === "ar") {
      return {
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
    }

    if (locale === "en-au") {
      return {
        meridiem: (hour) => (hour > 12 ? "pm" : "am")
      };
    }

    if (locale === "en-ca") {
      return {
        meridiem: (hour) => (hour > 12 ? "p.m." : "a.m.")
      };
    }

    if (locale === "el") {
      return {
        meridiem: (hour) => (hour > 12 ? "μ.μ." : "π.μ.")
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
          LLLL: "dddd, D MMMM YYYY, h:mm A"
        },
        meridiem: (hour) => (hour > 12 ? "pm" : "am")
      };
    }

    if (locale === "ko") {
      return {
        meridiem: (hour) => (hour > 12 ? "오후" : "오전")
      };
    }

    if (locale === "zh-tw") {
      return {
        formats: {
          LT: "AHH:mm",
          LTS: "AHH:mm:ss"
        }
      };
    }

    if (locale === "zh-hk") {
      return {
        formats: {
          LT: "AHH:mm",
          LTS: "AHH:mm:ss"
        },
        meridiem: (hour) => (hour > 12 ? "下午" : "上午")
      };
    }
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
    connectFocusTrap(this, {
      focusTrapEl: el,
      focusTrapOptions: {
        initialFocus: false,
        setReturnFocus: false
      }
    });
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
   * @param value
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
          includeSeconds: this.shouldIncludeSeconds()
        })
      );
    }
  };

  /**
   * Sets the value directly without emitting a change event.
   * This is used to update the value on initial load and when props change that are not the result of user interaction.
   *
   * @param value
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
            numberingSystem: this.numberingSystem
          })
        : ""
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

    let { effectiveLocale } = this;
    if (effectiveLocale === "en-US") {
      effectiveLocale = "en";
    }
    if (effectiveLocale === "pt-PT") {
      effectiveLocale = "pt";
    }
    if (effectiveLocale === "no") {
      effectiveLocale = "nb";
    }
    this.effectiveLocale = effectiveLocale;

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
          includeSeconds: this.shouldIncludeSeconds()
        })
      );
    }
  }

  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    deactivateFocusTrap(this);
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
    const { disabled, messages, readOnly, dialogId } = this;
    return (
      <Host onBlur={this.hostBlurHandler} onKeyDown={this.keyDownHandler}>
        <div class="input-wrapper" onClick={this.onInputWrapperClick}>
          <calcite-input
            aria-autocomplete="none"
            aria-haspopup="dialog"
            disabled={disabled}
            icon="clock"
            id={this.referenceElementId}
            label={getLabelText(this)}
            lang={this.effectiveLocale}
            onCalciteInputInput={this.calciteInternalInputInputHandler}
            onCalciteInternalInputFocus={this.calciteInternalInputFocusHandler}
            readOnly={readOnly}
            role="combobox"
            scale={this.scale}
            step={this.step}
            // eslint-disable-next-line react/jsx-sort-props
            ref={this.setCalciteInputEl}
          />
          {this.renderToggleIcon(this.open)}
        </div>
        <calcite-popover
          focusTrapDisabled={true}
          id={dialogId}
          label={messages.chooseTime}
          lang={this.effectiveLocale}
          onCalcitePopoverClose={this.popoverCloseHandler}
          onCalcitePopoverOpen={this.popoverOpenHandler}
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
            messageOverrides={this.messageOverrides}
            numberingSystem={this.numberingSystem}
            onCalciteInternalTimePickerChange={this.timePickerChangeHandler}
            scale={this.scale}
            step={this.step}
            tabIndex={this.open ? undefined : -1}
            value={this.value}
            // eslint-disable-next-line react/jsx-sort-props
            ref={this.setCalciteTimePickerEl}
          />
        </calcite-popover>
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }

  renderToggleIcon(open: boolean): VNode {
    return (
      <span class={CSS.toggleIcon}>
        <calcite-icon icon={open ? "chevron-up" : "chevron-down"} scale="s" />
      </span>
    );
  }
}
