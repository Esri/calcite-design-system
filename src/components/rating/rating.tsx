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
  setValue(newValue: number, oldValue: number): void {
    if (newValue == oldValue && !this.required) {
      this.value = 0;
    }

    if (this.emit) {
      this.calciteRatingChange.emit({ value: newValue });
    }

    this.focusValue = null;
    this.hoverValue = null;
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

  /**
   * Set the maximum number of stars
   *
   * @default 5
   */
  @Prop() max = 5;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
    this.renderArray = Array.from({ length: this.max }, (_, i) => i + 1);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
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

  renderStars(): VNode[] {
    return this.renderArray.map((i) => {
      const selected = this.value >= i;
      const average = this.average && !this.value && i <= this.average;
      const hovered = i <= this.hoverValue;
      const fraction = this.average && this.average + 1 - i;
      const partial = !this.value && !hovered && fraction > 0 && fraction < 1;
      const focused = this.isKeyboardInteraction && this.hasFocus && Number(this.focusValue) === i;
      return (
        <span class={{ wrapper: true }}>
          <label
            class={{ star: true, focused, selected, average, hovered, partial }}
            htmlFor={`${this.guid}-${i}`}
            onPointerDown={this.handleLabelPointerDown}
            onPointerOver={this.handleLabelPointerOver}
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
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
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
    return (
      <Host
        onBlur={this.handleRatingFocusLeave}
        onFocus={this.handleRatingFocusIn}
        onKeyDown={this.handleKeyDown}
        onPointerOut={this.handleRatingPointerOut}
        onPointerOver={this.handleRatingPointerOver}
        tabindex="0"
      >
        <fieldset class="fieldset" disabled={this.disabled}>
          <legend class="visually-hidden">{this.intlRating}</legend>
          {this.renderStars()}
        </fieldset>
        {(this.count || this.average) && this.showChip ? (
          <calcite-chip scale={this.scale} value={this.count?.toString()}>
            {!!this.average && <span class="number--average">{this.average.toString()}</span>}
            {!!this.count && <span class="number--count">({this.count?.toString()})</span>}
          </calcite-chip>
        ) : null}
        <HiddenFormInputSlot component={this} />
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

  private updateValue(value: number) {
    this.value = value;
  }

  private handleRatingPointerOver = () => {
    this.isKeyboardInteraction = false;
  };

  private handleRatingPointerOut = () => {
    this.isKeyboardInteraction = true;
    this.hoverValue = null;
    this.focusValue = null;
  };

  private handleRatingFocusLeave = (): void => {
    this.focusValue = null;
    this.hasFocus = false;
    this.hoverValue = null;
  };

  private handleRatingFocusIn = (): void => {
    this.focusValue = this.value > 0 ? this.value : 1;
    this.hasFocus = true;
    this.hoverValue = this.value > 0 ? this.value : 1;
  };

  private handleLabelPointerOver = (ev: PointerEvent) => {
    const newPointerValue = ev.currentTarget["nextElementSibling"]["value"] || this.value || 0;
    this.hoverValue = newPointerValue;
    //  when switching from keyboard to mouse this prop change is required to remove the focus styles from the element which are needed when navigating with a keyboard.
    this.focusValue = null;
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.target["nodeName"] === "CALCITE-RATING") {
      this.isKeyboardInteraction = true;
    } else {
      const inputVal = Number(ev.target["value"]);
      const key = ev.key;
      const numberKey = Number(key);

      this.emit = true;

      if (isNaN(numberKey)) {
        switch (key) {
          case "Enter":
            this.value = this.value === inputVal ? 0 : inputVal;
            break;
          case "ArrowLeft":
            this.value = inputVal - 1;
            break;
          case "ArrowRight":
            this.value = inputVal + 1;
            break;
          default:
            break;
        }
      } else {
        if (numberKey >= 0 && numberKey <= this.max) {
          this.value = numberKey;
        }
      }

      this.emit = false;
      this.focusValue = null;
    }
  };

  private handleInputChange = (ev: Event) => {
    if (this.isKeyboardInteraction === true) {
      const inputVal = Number(ev.target["value"]);
      this.focusValue = inputVal;
      this.hoverValue = inputVal;
    }
  };

  private handleLabelPointerDown = (ev: PointerEvent) => {
    const inputVal = Number(ev.target["parentElement"]["nextElementSibling"]["value"]);

    this.focusValue = null;
    this.hoverValue = null;
    this.emit = true;
    this.value = this.value === inputVal ? 0 : inputVal;
    this.emit = false;
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

  renderArray: number[];

  isKeyboardInteraction = true;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Rating["value"];

  @State() hoverValue: number;

  @State() focusValue: number;

  @State() hasFocus: boolean;

  private guid = `calcite-ratings-${guid()}`;

  private inputFocusRef: HTMLInputElement;
}
