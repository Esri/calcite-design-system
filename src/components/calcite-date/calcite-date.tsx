import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  State,
  Listen,
  Build,
  EventEmitter,
  Watch,
  VNode,
  Method
} from "@stencil/core";
import { getLocaleData, DateLocaleData } from "./utils";
import { getElementDir } from "../../utils/dom";
import { dateFromRange, inRange, dateFromISO, parseDateString, dateToISO } from "../../utils/date";
import { getKey } from "../../utils/key";
import { TEXT } from "./calcite-date-resources";
import { createPopper, updatePopper, CSS as PopperCSS } from "../../utils/popper";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";

const DEFAULT_PLACEMENT = "bottom-start";

@Component({
  assetsDirs: ["calcite-date-nls"],
  tag: "calcite-date",
  styleUrl: "calcite-date.scss",
  shadow: true
})
export class CalciteDate {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteDateElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** Selected date */
  @Prop() value?: string;

  /** Selected date as full date object*/
  @Prop({ mutable: true }) valueAsDate?: Date;

  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop() min?: string;

  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop() max?: string;

  /** Expand or collapse when calendar does not have input */
  @Prop({ reflect: true }) active = false;

  @Watch("active")
  activeHandler(): void {
    this.reposition();
  }

  /** Localized string for "previous month" (used for aria label) */
  @Prop() intlPrevMonth?: string = TEXT.prevMonth;

  /** Localized string for "next month" (used for aria label) */
  @Prop() intlNextMonth?: string = TEXT.nextMonth;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = document.documentElement.lang || "en-US";

  /** Show only calendar popup */
  @Prop() noCalendarInput?: boolean = false;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("blur")
  focusOutHandler(): void {
    this.reset();
  }

  /**
   * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
   * Check if the focused element is inside the date picker, if not close
   */
  @Listen("focusin", { target: "window" })
  focusInHandler(e: FocusEvent): void {
    if (!this.hasShadow && !this.el.contains(e.srcElement as HTMLElement)) {
      this.reset();
    }
  }

  @Listen("keyup")
  keyDownHandler(e: KeyboardEvent): void {
    if (getKey(e.key) === "Escape") {
      this.reset();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async reposition(): Promise<void> {
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();

    popper
      ? updatePopper({
          el: menuEl,
          modifiers,
          placement: DEFAULT_PLACEMENT,
          popper
        })
      : this.createPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Trigger calcite date change when a user changes the date.
   */
  @Event() calciteDateChange: EventEmitter<Date>;

  /**
   * Active date.
   */
  @State() activeDate: Date;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback(): void {
    this.loadLocaleData();
    if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
    }

    this.createPopper();
  }

  disconnectedCallback(): void {
    this.destroyPopper();
  }

  render(): VNode {
    const min = dateFromISO(this.min);
    const max = dateFromISO(this.max);
    const date = dateFromRange(this.valueAsDate, min, max);
    const activeDate = this.getActiveDate(date, min, max);
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir} role="application">
        {!this.noCalendarInput && this.localeData && (
          <div aria-expanded={this.active.toString()} ref={this.setReferenceEl} role="application">
            <calcite-input
              class="input"
              icon="calendar"
              number-button-type="none"
              onCalciteInputBlur={(e) => this.blur(e.detail)}
              onCalciteInputFocus={() => (this.active = true)}
              onCalciteInputInput={(e) => this.input(e.detail.value)}
              placeholder={this.localeData.placeholder}
              scale={this.scale}
              type="text"
              value={formattedDate}
            />
          </div>
        )}
        {this.localeData && (
          <div aria-hidden={(!this.active).toString()} class="menu-container" ref={this.setMenuEl}>
            <div
              class={{
                ["calendar-picker-wrapper"]: true,
                [PopperCSS.animation]: true,
                [PopperCSS.animationActive]: this.active
              }}
            >
              <calcite-date-month-header
                activeDate={activeDate}
                dir={dir}
                intlNextMonth={this.intlNextMonth}
                intlPrevMonth={this.intlPrevMonth}
                localeData={this.localeData}
                max={max}
                min={min}
                onCalciteDateSelect={this.updateSelectedDate}
                scale={this.scale}
                selectedDate={date || new Date()}
              />
              <calcite-date-month
                activeDate={activeDate}
                dir={dir}
                localeData={this.localeData}
                max={max}
                min={min}
                onCalciteActiveDateChange={this.updateActiveDate}
                onCalciteDateSelect={this.updateSelectedDateAndClose}
                scale={this.scale}
                selectedDate={date}
              />
            </div>
          </div>
        )}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() private localeData: DateLocaleData;

  private hasShadow: boolean = Build.isBrowser && !!document.head.attachShadow;

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  updateActiveDate = (e: CustomEvent<Date>): void => {
    this.activeDate = e.detail;
  };

  updateSelectedDate = (e: CustomEvent<Date>): void => {
    this.value = dateToISO(e.detail);
    this.valueAsDate = e.detail;
    this.activeDate = e.detail;
    this.calciteDateChange.emit(new Date(e.detail));
  };

  updateSelectedDateAndClose = (e: CustomEvent<Date>): void => {
    this.updateSelectedDate(e);
    this.reset();
  };

  setMenuEl = (el: HTMLDivElement): void => {
    this.menuEl = el;
  };

  setReferenceEl = (el: HTMLDivElement): void => {
    this.referenceEl = el;
  };

  getModifiers(): Partial<StrictModifiers>[] {
    const flipModifier: Partial<StrictModifiers> = {
      name: "flip",
      enabled: true
    };

    flipModifier.options = {
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };

    return [flipModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { menuEl, referenceEl } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      placement: DEFAULT_PLACEMENT,
      referenceEl
    });
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

  @Watch("locale")
  private async loadLocaleData(): Promise<void> {
    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }

  /**
   * Reset active date and close
   */
  private reset(): void {
    if (this.valueAsDate && this.valueAsDate?.getTime() !== this.activeDate?.getTime()) {
      this.activeDate = new Date(this.valueAsDate);
    }
    if (!this.noCalendarInput) {
      this.active = false;
    }
  }

  /**
   * If inputted string is a valid date, update value/active
   */
  private input(value: string): void {
    const date = this.getDateFromInput(value);
    if (date) {
      this.valueAsDate = date;
      this.activeDate = date;
      this.calciteDateChange.emit(new Date(date));
    }
  }

  /**
   * Clean up invalid date from input on blur
   */
  private blur(target: HTMLInputElement): void {
    const date = this.getDateFromInput(target.value);
    if (!date && this.valueAsDate) {
      target.value = this.valueAsDate.toLocaleDateString(this.locale);
    }
  }

  /**
   * Get an active date using the value, or current date as default
   */
  private getActiveDate(value: Date | null, min: Date | null, max: Date | null): Date {
    return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
  }

  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   */
  private getDateFromInput(value: string): Date | false {
    if (!this.localeData) {
      return false;
    }
    const { separator } = this.localeData;
    const { day, month, year } = parseDateString(value, this.localeData);
    const validDay = day > 0;
    const validMonth = month > -1;
    const date = new Date(year, month, day);
    date.setFullYear(year);
    const validDate = !isNaN(date.getTime());
    const validLength = value.split(separator).filter((c) => c).length > 2;
    const validYear = year.toString().length > 0;
    if (
      validDay &&
      validMonth &&
      validDate &&
      validLength &&
      validYear &&
      inRange(date, this.min, this.max)
    ) {
      return date;
    }
    return false;
  }
}
