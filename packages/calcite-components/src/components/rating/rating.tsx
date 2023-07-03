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
  Watch
} from "@stencil/core";
import { connectForm, disconnectForm, FormComponent, HiddenFormInputSlot } from "../../utils/form";
import { guid } from "../../utils/guid";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { Scale } from "../interfaces";
import { RatingMessages } from "./assets/rating/t9n";
import { StarIcon } from "./function/star";
import { Star } from "./interfaces";

@Component({
  tag: "calcite-rating",
  styleUrl: "rating.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Rating
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
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

  /** Specifies a cumulative average from previous ratings to display. */
  @Prop({ reflect: true }) average: number;

  /** Specifies the number of previous ratings to display. */
  @Prop({ reflect: true }) count: number;

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
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: RatingMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<RatingMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   */
  @Prop({ reflect: true }) name: string;

  /** When `true`, the component's value can be read, but cannot be modified. */
  @Prop({ reflect: true }) readOnly = false;

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** When `true`, and if available, displays the `average` and/or `count` data summary in a `calcite-chip`. */
  @Prop({ reflect: true }) showChip = false;

  /** The component's value. */
  @Prop({ reflect: true, mutable: true }) value = 0;

  @Watch("value")
  handleValueUpdate(newValue: number): void {
    this.hoverValue = newValue;
    this.focusValue = newValue;
    if (this.emit) {
      this.calciteRatingChange.emit();
    }

    this.emit = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the component's value changes.
   */
  @Event({ cancelable: false }) calciteRatingChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Static
  //
  //--------------------------------------------------------------------------

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: RatingMessages;

  @State() hoverValue: number;

  @State() focusValue: number;

  @State() hasFocus: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
    connectLabel(this);
    connectForm(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
    this.inputRefs = Array(this.max);
  }

  componentWillRender(): void {
    this.starsMap = Array.from({ length: this.max }, (_, i) => {
      const value = i + 1;
      const average =
        !this.focusValue &&
        !this.hoverValue &&
        this.average &&
        !this.value &&
        value <= this.average;
      const checked = value === this.value;
      const focused = this.isKeyboardInteraction && this.hasFocus && this.focusValue === value;
      const fraction = this.average && this.average + 1 - value;
      const hovered = value <= this.hoverValue;
      const id = `${this.guid}-${value}`;
      const partial =
        !this.focusValue &&
        !this.hoverValue &&
        !this.value &&
        !hovered &&
        fraction > 0 &&
        fraction < 1;
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
    disconnectInteractive(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

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
            <legend class="visually-hidden">{this.messages.rating}</legend>
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
                      type="radio"
                      value={value}
                      // eslint-disable-next-line react/jsx-sort-props
                      ref={(el) => {
                        this.inputRefs[idx] = el;
                        return (
                          (value === 1 || value === this.value) &&
                          (this.inputFocusRef = el as HTMLInputElement)
                        );
                      }}
                    />
                    <StarIcon full={selected || average} scale={this.scale} />
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
          this.value = !this.required && this.value === inputVal ? 0 : inputVal;
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
      if (!this.required && numberKey >= 0 && numberKey <= this.max) {
        this.value = numberKey;
      } else if (this.required && numberKey > 0 && numberKey <= this.max) {
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
    this.value = !this.required && this.value === inputVal ? 0 : inputVal;
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

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Rating["value"];

  private emit = false;

  private guid = `calcite-ratings-${guid()}`;

  private inputRefs: HTMLInputElement[];

  private inputFocusRef: HTMLInputElement;

  private isKeyboardInteraction = true;

  private max = 5;

  private starsMap: Star[];
}
