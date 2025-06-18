// @ts-strict-ignore
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
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
} from "../../utils/form";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import { componentFocusable } from "../../utils/component";
import { Scale, Status } from "../interfaces";
import { focusFirstTabbable } from "../../utils/dom";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Label } from "../label/label";
import T9nStrings from "./assets/t9n/messages.en.json";
import { StarIcon } from "./functional/star";
import { Star } from "./interfaces";
import { IDS } from "./resources";
import { styles } from "./rating.scss";

declare global {
  interface DeclareElements {
    "calcite-rating": Rating;
  }
}

export class Rating
  extends LitElement
  implements LabelableComponent, FormComponent, InteractiveComponent
{
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  defaultValue: Rating["value"];

  private emit = false;

  formEl: HTMLFormElement;

  private guid = `calcite-ratings-${guid()}`;

  private isKeyboardInteraction = true;

  labelEl: Label["el"];

  private labelElements: HTMLLabelElement[] = [];

  private max = 5;

  private starsMap: Star[];

  private _value = 0;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  //#endregion

  //#region State Properties

  @state() hoverValue: number;

  //#endregion

  //#region Public Properties

  /** Specifies a cumulative average from previous ratings to display. */
  @property({ reflect: true }) average: number;

  /** Specifies the number of previous ratings to display. */
  @property({ reflect: true }) count: number;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @property({ reflect: true }) name: string;

  /** When `true`, the component's value can be read, but cannot be modified. */
  @property({ reflect: true }) readOnly = false;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   *
   * @private
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true`, and if available, displays the `average` and/or `count` data summary in a `calcite-chip`. */
  @property({ reflect: true }) showChip = false;

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

  /** The component's value. */
  @property({ reflect: true })
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    const oldValue = this._value;
    if (value !== oldValue) {
      this._value = value;
      if (this.hasUpdated) {
        this.handleValueUpdate(value);
      }
    }
  }

  //#endregion

  //#region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  //#endregion

  //#region Events

  /** Fires when the component's value changes. */
  calciteRatingChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.handleHostKeyDown);
    this.listen("pointerout", this.handleRatingPointerOut);
    this.listen("pointerover", this.handleRatingPointerOver);
  }

  override connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
  }

  async load(): Promise<void> {
    this.requestUpdate("value");
  }

  override willUpdate(): void {
    this.starsMap = Array.from({ length: this.max }, (_, i) => {
      const value = i + 1;
      const average = !this.hoverValue && this.average && !this.value && value <= this.average;
      const checked = value === this.value;
      const fraction = this.average && this.average + 1 - value;
      const hovered = value <= this.hoverValue;
      const id = `${this.guid}-${value}`;
      const partial = !this.hoverValue && !this.value && !hovered && fraction > 0 && fraction < 1;
      const selected = this.value >= value;
      const tabIndex = this.getTabIndex(value);
      return {
        average,
        checked,
        fraction,
        hovered,
        id,
        partial,
        selected,
        value,
        tabIndex,
      };
    });
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.labelElements = Array.from(this.renderRoot.querySelectorAll("label"));
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  //#endregion

  //#region Private Methods

  private handleValueUpdate(newValue: number): void {
    this.hoverValue = newValue;
    if (this.emit) {
      this.calciteRatingChange.emit();
    }

    this.emit = false;
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private handleRatingPointerOver() {
    this.isKeyboardInteraction = false;
  }

  private handleRatingPointerOut() {
    this.isKeyboardInteraction = true;
    this.hoverValue = null;
  }

  private handleHostKeyDown() {
    this.isKeyboardInteraction = true;
  }

  private handleLabelKeyDown(event: KeyboardEvent) {
    const inputValue = this.getValueFromLabelEvent(event);
    const key = event.key;
    const numberKey = key == " " ? undefined : Number(key);

    this.emit = true;
    if (isNaN(numberKey)) {
      switch (key) {
        case "Enter":
        case " ":
          this.value = !this.required && this.value === inputValue ? 0 : inputValue;
          break;
        case "ArrowLeft":
          this.value = this.getPreviousRatingValue(inputValue);
          this.updateFocus();
          event.preventDefault();
          break;
        case "ArrowRight":
          this.value = this.getNextRatingValue(inputValue);
          this.updateFocus();
          event.preventDefault();
          break;
        case "Tab":
          this.hoverValue = null;
          break;
      }
    } else {
      if (!this.required && numberKey >= 0 && numberKey <= this.max) {
        this.value = numberKey;
      } else if (this.required && numberKey > 0 && numberKey <= this.max) {
        this.value = numberKey;
      }
      this.updateFocus();
    }
  }

  private handleInputChange(event: Event) {
    if (this.isKeyboardInteraction === true) {
      const inputVal = Number(event.target["value"]);
      this.hoverValue = inputVal;
      this.value = inputVal;
    }
  }

  private handleLabelPointerOver(event: PointerEvent) {
    this.hoverValue = this.getValueFromLabelEvent(event);
  }

  private handleLabelPointerDown(event: PointerEvent) {
    const target = event.currentTarget as HTMLLabelElement;
    const inputValue = this.getValueFromLabelEvent(event);
    this.hoverValue = inputValue;
    this.emit = true;
    this.value = !this.required && this.value === inputValue ? 0 : inputValue;
    target.focus();
  }

  private handleLabelClick(event: MouseEvent) {
    //preventing pointerdown event will suppress any compatibility mouse events except for click event.
    event.preventDefault();
  }

  private handleLabelFocus(event: FocusEvent) {
    const inputValue = this.getValueFromLabelEvent(event);
    this.hoverValue = inputValue;
  }

  private updateFocus(): void {
    this.hoverValue = this.value;
    this.labelElements[this.value - 1].focus();
  }

  private getTabIndex(value: number): number {
    if (this.readOnly || (this.value !== value && (this.value || value !== 1))) {
      return -1;
    }
    return 0;
  }

  private getValueFromLabelEvent(event: FocusEvent | PointerEvent | KeyboardEvent): number {
    const target = event.currentTarget as HTMLLabelElement;
    return Number(target.getAttribute("data-value"));
  }

  private getNextRatingValue(currentValue: number): number {
    return currentValue === 5 ? 1 : currentValue + 1;
  }

  private getPreviousRatingValue(currentValue: number): number {
    return currentValue === 1 ? 5 : currentValue - 1;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const countString = this.count?.toString();

    return (
      <InteractiveContainer disabled={this.disabled}>
        <span class="wrapper">
          <fieldset class="fieldset" disabled={this.disabled}>
            <legend class="visually-hidden">{this.messages.rating}</legend>
            {this.starsMap.map(
              ({ average, checked, fraction, hovered, id, partial, selected, value, tabIndex }) => {
                return (
                  <label
                    class={{
                      star: true,
                      selected,
                      hovered,
                      average,
                      partial,
                    }}
                    data-value={value}
                    htmlFor={id}
                    onClick={this.handleLabelClick}
                    onFocus={this.handleLabelFocus}
                    onKeyDown={this.handleLabelKeyDown}
                    onPointerDown={this.handleLabelPointerDown}
                    onPointerOver={this.handleLabelPointerOver}
                    tabIndex={tabIndex}
                  >
                    <input
                      aria-errormessage={IDS.validationMessage}
                      ariaInvalid={this.status === "invalid"}
                      checked={checked}
                      class="visually-hidden"
                      disabled={this.disabled || this.readOnly}
                      id={id}
                      name={this.guid}
                      onChange={this.handleInputChange}
                      tabIndex={-1}
                      type="radio"
                      value={value}
                    />
                    <StarIcon full={selected || average || hovered} scale={this.scale} />
                    {partial && (
                      <div class="fraction" style={{ width: `${fraction * 100}%` }}>
                        <StarIcon full partial scale={this.scale} />
                      </div>
                    )}
                    <span class="visually-hidden">
                      {this.messages.stars.replace("{num}", `${value}`)}
                    </span>
                  </label>
                );
              },
            )}

            {(this.count || this.average) && this.showChip ? (
              <calcite-chip label={countString} scale={this.scale} value={countString}>
                {!!this.average && <span class="number--average">{this.average.toString()}</span>}
                {!!this.count && <span class="number--count">({countString})</span>}
              </calcite-chip>
            ) : null}
          </fieldset>
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
        </span>
      </InteractiveContainer>
    );
  }

  //#endregion
}
