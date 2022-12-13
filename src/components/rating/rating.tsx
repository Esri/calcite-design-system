import {
  Component,
  Element,
  Event,
  EventEmitter,
  FunctionalComponent,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel } from "../../utils/label";
import { connectForm, disconnectForm, FormComponent, HiddenFormInputSlot } from "../../utils/form";
import { TEXT } from "./resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";
import { Star, StarIconProps } from "./interfaces";

const StarIcon: FunctionalComponent<StarIconProps> = ({ icon, scale, partial }) => (
  <calcite-icon
    {...{
      "aria-hidden": "true",
      class: !partial && "icon",
      icon,
      scale
    }}
  />
);

@Component({
  tag: "calcite-rating",
  styleUrl: "rating.scss",
  shadow: true
})
export class Rating
  implements LabelableComponent, FormComponent, InteractiveComponent, LoadableComponent
{
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

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The component's value. */
  @Prop({ reflect: true, mutable: true }) value = 0;

  @Watch("value")
  handleValueUpdate(newValue: number): void {
    if (this.emit) {
      this.calciteRatingChange.emit({ value: newValue });
    }

    this.emit = false;
  }

  /** When `true`, the component's value can be read, but cannot be modified. */
  @Prop({ reflect: true }) readOnly = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** When `true`, and if available, displays the `average` and/or `count` data summary in a `calcite-chip`. */
  @Prop({ reflect: true }) showChip = false;

  /** Specifies the number of previous ratings to display. */
  @Prop({ reflect: true }) count: number;

  /** Specifies a cumulative average from previous ratings to display. */
  @Prop({ reflect: true }) average: number;

  /** Specifies the name of the component on form submission. */
  @Prop({ reflect: true }) name: string;

  /**
   * Accessible name for the component.
   *
   * @default "Rating"
   */
  @Prop() intlRating: string = TEXT.rating;

  /**
   * Accessible name for each star. The `${num}` in the string will be replaced by the number.
   *
   * @default "Stars: ${num}"
   */
  @Prop() intlStars: string = TEXT.stars;

  /**
   * When `true`, the component must have a value in order for the form to submit.
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

  componentWillLoad(): void {
    setUpLoadableComponent(this);
    this.inputRefs = Array(this.max);
  }

  componentWillRender(): void {
    this.starsMap = Array.from({ length: this.max }, (_, i) => {
      const value = i + 1;
      const average = this.average && !this.value && value <= this.average;
      const checked = value === this.value;
      const focused = this.isKeyboardInteraction && this.hasFocus && this.focusValue === value;
      const fraction = this.average && this.average + 1 - value;
      const hovered = value <= this.hoverValue;
      const id = `${this.guid}-${value}`;
      const partial = !this.value && !hovered && fraction > 0 && fraction < 1;
      const selected = this.value >= value;

      return {
        average,
        checked,
        focused,
        fraction,
        hovered,
        id,
        idx: i,
        partial,
        selected,
        value
      };
    });
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
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
   * Fires when the component's value changes.
   */
  @Event({ cancelable: false }) calciteRatingChange: EventEmitter<{ value: number }>;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return (
      <Host
        onBlur={this.handleRatingFocusLeave}
        onFocus={this.handleRatingFocusIn}
        onKeyDown={this.handleHostKeyDown}
        onPointerOut={this.handleRatingPointerOut}
        onPointerOver={this.handleRatingPointerOver}
      >
        <span class="wrapper">
          <fieldset class="fieldset" disabled={this.disabled}>
            <legend class="visually-hidden">{this.intlRating}</legend>
            {this.starsMap.map(
              ({
                average,
                checked,
                focused,
                fraction,
                hovered,
                id,
                idx,
                partial,
                selected,
                value
              }) => {
                return (
                  <label
                    class={{
                      star: true,
                      focused,
                      selected,
                      hovered,
                      average,
                      partial
                    }}
                    htmlFor={id}
                    onPointerDown={this.handleLabelPointerDown}
                    onPointerOver={this.handleLabelPointerOver}
                  >
                    <input
                      checked={checked}
                      class="visually-hidden"
                      disabled={this.disabled || this.readOnly}
                      id={id}
                      name={this.guid}
                      onChange={this.handleInputChange}
                      onKeyDown={this.handleInputKeyDown}
                      ref={(el) => {
                        this.inputRefs[idx] = el;
                        return (
                          (value === 1 || value === this.value) &&
                          (this.inputFocusRef = el as HTMLInputElement)
                        );
                      }}
                      type="radio"
                      value={value}
                    />
                    <StarIcon icon={selected || average ? "star-f" : "star"} scale={this.scale} />
                    {partial && (
                      <div class="fraction" style={{ width: `${fraction * 100}%` }}>
                        <StarIcon icon="star-f" partial scale={this.scale} />
                      </div>
                    )}
                    <span class="visually-hidden">
                      {this.intlStars.replace("${num}", `${value}`)}
                    </span>
                  </label>
                );
              }
            )}

            {(this.count || this.average) && this.showChip ? (
              <calcite-chip scale={this.scale} value={this.count?.toString()}>
                {!!this.average && <span class="number--average">{this.average.toString()}</span>}
                {!!this.count && <span class="number--count">({this.count?.toString()})</span>}
              </calcite-chip>
            ) : null}
          </fieldset>
          <HiddenFormInputSlot component={this} />
        </span>
      </Host>
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

  private handleRatingPointerOver = () => {
    this.isKeyboardInteraction = false;
  };

  private handleRatingPointerOut = () => {
    this.isKeyboardInteraction = true;
    this.hoverValue = null;
    this.focusValue = null;
    this.hasFocus = false;
  };

  private handleRatingFocusIn = (): void => {
    const selectedInput = this.value > 0 ? this.value - 1 : 0;
    const focusInput = this.inputRefs[selectedInput];
    const focusValue = Number(focusInput.value);

    focusInput.select();
    this.focusValue = focusValue;
    this.hoverValue = focusValue;
    this.hasFocus = true;
  };

  private handleRatingFocusLeave = (): void => {
    this.focusValue = null;
    this.hoverValue = null;
    this.hasFocus = false;
  };

  private handleHostKeyDown = () => {
    this.isKeyboardInteraction = true;
  };

  private handleInputKeyDown = (event: KeyboardEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    const inputVal = Number(target.value);
    const key = event.key;
    const numberKey = key == " " ? undefined : Number(key);

    this.emit = true;
    if (isNaN(numberKey)) {
      switch (key) {
        case "Enter":
        case " ":
          this.value = this.value === inputVal ? 0 : inputVal;
          break;
        case "ArrowLeft":
          this.value = inputVal - 1;
          break;
        case "ArrowRight":
          this.value = inputVal + 1;
          break;
        case "Tab":
          if (this.hasFocus) {
            this.hasFocus = false;
            this.focusValue = null;
            this.hoverValue = null;
          }
        default:
          break;
      }
    } else {
      if (numberKey >= 0 && numberKey <= this.max) {
        this.value = numberKey;
      }
    }
  };

  private handleInputChange = (event: InputEvent) => {
    if (this.isKeyboardInteraction === true) {
      const inputVal = Number(event.target["value"]);
      this.focusValue = inputVal;
      this.hoverValue = inputVal;
      this.value = inputVal;
    }
  };

  private handleLabelPointerOver = (event: PointerEvent) => {
    const target = event.currentTarget as HTMLLabelElement;
    const newPointerValue = Number(target.firstChild["value"] || 0);
    this.hoverValue = newPointerValue;
    this.focusValue = null;
  };

  private handleLabelPointerDown = (event: PointerEvent) => {
    const target = event.currentTarget as HTMLLabelElement;
    const inputVal = Number(target.firstChild["value"] || 0);

    this.focusValue = null;
    this.hoverValue = null;
    this.emit = true;
    this.value = this.value === inputVal ? 0 : inputVal;
  };

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.inputFocusRef?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private State / Properties
  //
  // --------------------------------------------------------------------------
  private emit = false;

  private max = 5;

  private starsMap: Star[];

  private isKeyboardInteraction = true;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Rating["value"];

  @State() hoverValue: number;

  @State() focusValue: number;

  @State() hasFocus: boolean;

  private guid = `calcite-ratings-${guid()}`;

  private inputFocusRef: HTMLInputElement;

  private inputRefs: HTMLInputElement[];
}
