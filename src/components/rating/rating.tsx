import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel } from "../../utils/label";
import { connectForm, disconnectForm, FormComponent, HiddenFormInputSlot } from "../../utils/form";
import { TEXT } from "./resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
// import { autobind } from "../../utils/decorators";

@Component({
  tag: "calcite-rating",
  styleUrl: "rating.scss",
  shadow: true
})
export class Rating implements LabelableComponent, FormComponent, InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteRatingElement;

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** specify the scale of the component, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** the value of the rating component */
  @Prop({ reflect: true, mutable: true }) value = 0;

  /** is the rating component in a selectable mode */
  @Prop({ reflect: true }) readOnly = false;

  /** is the rating component in a selectable mode */
  @Prop({ reflect: true }) disabled = false;

  /** Show average and count data summary chip (if available) */
  @Prop({ reflect: true }) showChip = false;

  /** optionally pass a number of previous ratings to display */
  @Prop({ reflect: true }) count?: number;

  /** optionally pass a cumulative average rating to display */
  @Prop({ reflect: true }) average?: number;

  /** The name of the rating */
  @Prop({ reflect: true }) name: string;

  /**
   * Localized string for "Rating" (used for aria label)
   *
   * @default "Rating"
   */
  @Prop() intlRating?: string = TEXT.rating;

  /**
   * Localized string for labelling each star, `${num}` in the string will be replaced by the number
   *
   * @default "Stars: ${num}"
   */
  @Prop() intlStars?: string = TEXT.stars;

  /**
   * When true, makes the component required for form-submission.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the rating value has changed.
   */
  @Event() calciteRatingChange: EventEmitter<{ value: number }>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("blur") blurHandler(): void {
    this.hasFocus = false;
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderStars(): VNode[] {
    return [1, 2, 3, 4, 5].map((i) => {
      const selected = this.value >= i;
      const average = this.average && !this.value && i <= this.average;
      const hovered = i <= this.hoverValue;
      const fraction = this.average && this.average + 1 - i;
      const partial = !this.value && !hovered && fraction > 0 && fraction < 1;
      const focused = this.hasFocus && this.focusValue === i;
      return (
        <span class={{ wrapper: true }}>
          <label
            class={{ star: true, focused, selected, average, hovered, partial }}
            htmlFor={`${this.guid}-${i}`}
            onMouseOver={() => {
              this.hoverValue = i;
            }}
          >
            <calcite-icon
              aria-hidden="true"
              class="icon"
              icon={selected || average || this.readOnly ? "star-f" : "star"}
              scale={this.scale}
            />
            {partial && (
              <div class="fraction" style={{ width: `${fraction * 100}%` }}>
                <calcite-icon icon="star-f" scale={this.scale} />
              </div>
            )}
            <span class="visually-hidden">{this.intlStars.replace("${num}", `${i}`)}</span>
          </label>
          <input
            checked={i === this.value}
            class="visually-hidden"
            disabled={this.disabled || this.readOnly}
            id={`${this.guid}-${i}`}
            name={this.guid}
            onChange={() => this.updateValue(i)}
            onClick={(event) =>
              // click is fired from the the component's label, so we treat this as an internal event
              event.stopPropagation()
            }
            onFocus={() => this.onFocusChange(i)}
            onKeyPress={this.onKeyboardPressed.bind(this)}
            onKeyUp={this.onKeyboardPressed.bind(this)}
            ref={(el) =>
              (i === 1 || i === this.value) && (this.inputFocusRef = el as HTMLInputElement)
            }
            type="radio"
            value={i}
          />
        </span>
      );
    });
  }

  render() {
    const { disabled, intlRating, showChip, scale, count, average } = this;

    return (
      <Fragment>
        <fieldset
          class="fieldset"
          disabled={disabled}
          onBlur={() => (this.hoverValue = null)}
          onMouseLeave={() => (this.hoverValue = null)}
          onTouchEnd={() => (this.hoverValue = null)}
        >
          <legend class="visually-hidden">{intlRating}</legend>
          {this.renderStars()}
        </fieldset>
        {(count || average) && showChip ? (
          <calcite-chip scale={scale} value={count?.toString()}>
            {!!average && <span class="number--average">{average.toString()}</span>}
            {!!count && <span class="number--count">({count?.toString()})</span>}
          </calcite-chip>
        ) : null}
        <HiddenFormInputSlot component={this} />
      </Fragment>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onLabelClick(): void {
    this.setFocus();
  }

  /**
   * update `value` property of the rating component
   *
   * @param value value used to update `value` property
   * @internal
   */
  private updateValue(value: number) {
    this.value = value;
    this.calciteRatingChange.emit({ value });
  }

  /**
   * register keyboard input and reset `value` property to `0` if user enters 'Space' or 'Enter'
   *
   * @param event keyboard event
   * @internal
   */
  private onKeyboardPressed(event: KeyboardEvent): void {
    // click is fired from the the component's input, so we treat this as an internal event
    event.stopPropagation();
    event.preventDefault();
    if (event.key === "Enter" || event.code === "Space") {
      this.updateValue(0);
    }
  }

  /**
   * handle focus change
   *
   * @param index index of the star input element in the component
   * @internal
   */
  private onFocusChange(index: number): void {
    this.hasFocus = true;
    // reset input values when the user re-clicks on the input with the focus
    if (this.focusValue === index) {
      this.updateValue(0);
    } else {
      this.focusValue = index;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.inputFocusRef?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private State / Properties
  //
  // --------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Rating["value"];

  @State() hoverValue: number;

  @State() focusValue: number;

  @State() hasFocus: boolean;

  private guid = `calcite-ratings-${guid()}`;

  private inputFocusRef: HTMLInputElement;
}
