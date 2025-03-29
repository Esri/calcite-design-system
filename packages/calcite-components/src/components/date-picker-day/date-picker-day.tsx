// @ts-strict-ignore
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  JsxNode,
  setAttribute,
} from "@arcgis/lumina";
import { dateToISO } from "../../utils/date";
import { closestElementCrossShadowBoundary, toAriaBoolean } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { numberStringFormatter } from "../../utils/locale";
import { Scale } from "../interfaces";
import type { DatePicker } from "../date-picker/date-picker";
import { useSetFocus } from "../../controllers/useSetFocus";
import { styles } from "./date-picker-day.scss";

declare global {
  interface DeclareElements {
    "calcite-date-picker-day": DatePickerDay;
  }
}

export class DatePickerDay extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private parentDatePickerEl: DatePicker["el"];

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** When `true`, the component is active. */
  @property({ reflect: true }) active = false;

  /** Date is in the current month. */
  @property({ reflect: true }) currentMonth = false;

  /**
   * The DateTimeFormat used to provide screen reader labels.
   *
   * @private
   */
  @property() dateTimeFormat: Intl.DateTimeFormat;

  /**
   * Day of the month to be shown.
   *
   * @required
   */
  @property() day: number;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Date is the end of date range. */
  @property({ reflect: true }) endOfRange = false;

  /** Date is currently highlighted as part of the range, */
  @property({ reflect: true }) highlighted = false;

  /** When `true`, activates the component's range mode to allow a start and end date. */
  @property({ reflect: true }) range = false;

  /**
   * When `true`, highlight styling for edge dates is applied.
   *
   * @private
   */
  @property({ reflect: true }) rangeEdge: "start" | "end" | undefined;

  /** Date is being hovered and within the set range. */
  @property({ reflect: true }) rangeHover = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale;

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /** Date is the start of date range. */
  @property({ reflect: true }) startOfRange = false;

  /** The component's value. */
  @property() value: Date;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    });
  }

  // #endregion

  // #region Events

  /**
   * Fires when user hovers over a day.
   *
   * @private
   */
  calciteInternalDayHover = createEvent({ cancelable: false });

  /**
   * Fires when user selects day.
   *
   * @private
   */
  calciteInternalDaySelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("pointerover", this.pointerOverHandler);
    this.listen("click", this.onClick);
    this.listen("keydown", this.keyDownHandler);
  }

  load(): void {
    this.parentDatePickerEl = closestElementCrossShadowBoundary(this.el, "calcite-date-picker");
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods

  private onClick(): void {
    if (this.disabled) {
      return;
    }

    this.calciteInternalDaySelect.emit();
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (isActivationKey(event.key)) {
      if (!this.disabled) {
        this.calciteInternalDaySelect.emit();
      }
      event.preventDefault();
    }
  }

  private pointerOverHandler(): void {
    if (this.disabled) {
      return;
    }

    this.calciteInternalDayHover.emit();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const dayId = dateToISO(this.value).replaceAll("-", "");
    if (this.parentDatePickerEl) {
      const { numberingSystem, lang: locale } = this.parentDatePickerEl;

      numberStringFormatter.numberFormatOptions = {
        useGrouping: false,
        ...(numberingSystem && { numberingSystem }),
        ...(locale && { locale }),
      };
    }
    const formattedDay = numberStringFormatter.localize(String(this.day));
    const dayLabel = this.dateTimeFormat.format(this.value);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = dayLabel;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaSelected = toAriaBoolean(this.active);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", dayId);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "button";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "tabIndex", this.active && !this.disabled ? 0 : -1);

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div ariaHidden="true" class="day-wrapper">
          <span class="day">
            <span class="text">{formattedDay}</span>
          </span>
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
