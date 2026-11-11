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
import { closestElementCrossShadowBoundary } from "../../utils/dom";
import { toAriaBoolean } from "../../utils/aria";
import { isActivationKey } from "../../utils/key";
import { numberStringFormatter } from "../../utils/locale";
import { Scale } from "../types";
import type { DatePicker } from "../date-picker/date-picker";
import { useFocusable } from "../../controllers/useFocusable";
import { useInteractive } from "../../controllers/useInteractive";
import { styles } from "./date-picker-day.scss";
import { CSS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-date-picker-day": DatePickerDay;
  }
}

/** @internal */
export class DatePickerDay extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private parentDatePickerEl?: DatePicker["el"];

  private focusSetter = useFocusable<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /**
   * When `true`, the component is active.
   *
   * @internal
   */
  @property({ reflect: true }) active = false;

  /**
   * Date is in the current month.
   *
   * @internal
   */
  @property({ reflect: true }) currentMonth = false;

  /**
   * The DateTimeFormat used to provide screen reader labels.
   * @internal
   */
  @property() dateTimeFormat!: Intl.DateTimeFormat;

  /**
   * Day of the month to be shown.
   *
   * @internal
   * @required
   */
  @property() day!: number;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @internal
   */
  @property({ reflect: true }) disabled = false;

  /**
   * Date is the end of date range.
   *
   * @internal
   */
  @property({ reflect: true }) endOfRange = false;

  /**
   * Date is currently highlighted as part of the range,
   *
   * @internal
   */
  @property({ reflect: true }) highlighted = false;

  /**
   * When `true`, activates the component's range mode to allow a start and end date.
   *
   * @internal
   */
  @property({ reflect: true }) range = false;

  /**
   * Date is being hovered and within the set range.
   *
   * @internal
   */
  @property({ reflect: true }) rangeHover = false;

  /**
   * Specifies the size of the component.
   *
   * @internal
   */
  @property({ reflect: true }) scale!: Scale;

  /**
   * When `true`, the component is selected.
   *
   * @internal
   */
  @property({ reflect: true }) selected = false;

  /**
   * Date is the start of date range.
   *
   * @internal
   */
  @property({ reflect: true }) startOfRange = false;

  /**
   * The component's value.
   *
   * @internal
   */
  @property() value!: Date;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @internal
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
  }

  //#endregion

  //#region Events

  /**
   * Fires when user hovers over a day.
   * @internal
   */
  calciteInternalDayHover = createEvent({ cancelable: false });

  /**
   * Fires when user selects day.
   * @internal
   */
  calciteInternalDaySelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("pointerover", this.pointerOverHandler);
    this.listen("click", this.onClick);
    this.listen("keydown", this.keyDownHandler);
  }

  load(): void {
    this.parentDatePickerEl =
      closestElementCrossShadowBoundary(this.el, "calcite-date-picker") ?? undefined;
  }

  //#endregion

  //#region Private Methods

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

  //#endregion

  //#region Rendering

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
    const dayLabel = this.dateTimeFormat.format(this.value) ?? null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = dayLabel;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaSelected = toAriaBoolean(this.active);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", dayId);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "gridcell";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "tabIndex", this.active && !this.disabled ? 0 : -1);

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div ariaHidden="true" class={CSS.dayWrapper}>
          <span class={CSS.day}>
            <span class={CSS.text}>{formattedDay}</span>
          </span>
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
