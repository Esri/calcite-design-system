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
  Watch,
} from "@stencil/core";
import { connectForm, disconnectForm, FormComponent, HiddenFormInputSlot } from "../../utils/form";
import { guid } from "../../utils/guid";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Scale } from "../interfaces";
import { RatingMessages } from "./assets/rating/t9n";
import { StarIcon } from "./functional/star";
import { Star } from "./interfaces";
import { focusFirstTabbable } from "../../utils/dom";

@Component({
  tag: "calcite-rating",
  styleUrl: "rating.scss",
  shadow: true,
  assetsDirs: ["assets"],
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
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true }) form: string;

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
  }

  componentWillRender(): void {
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
        onKeyDown={this.handleHostKeyDown}
        onPointerOut={this.handleRatingPointerOut}
        onPointerOver={this.handleRatingPointerOver}
      >
        <InteractiveContainer disabled={this.disabled}>
          <span class="wrapper">
            <fieldset class="fieldset" disabled={this.disabled}>
              <legend class="visually-hidden">{this.messages.rating}</legend>
              {this.starsMap.map(
                ({
                  average,
                  checked,
                  fraction,
                  hovered,
                  id,
                  partial,
                  selected,
                  value,
                  tabIndex,
                }) => {
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
                      // eslint-disable-next-line react/jsx-sort-props
                      ref={this.setLabelEl}
                    >
                      <input
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
                },
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
        </InteractiveContainer>
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
  };

  private handleHostKeyDown = () => {
    this.isKeyboardInteraction = true;
  };

  private handleLabelKeyDown = (event: KeyboardEvent) => {
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
        default:
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
  };

  private handleInputChange = (event: InputEvent) => {
    if (this.isKeyboardInteraction === true) {
      const inputVal = Number(event.target["value"]);
      this.hoverValue = inputVal;
      this.value = inputVal;
    }
  };

  private handleLabelPointerOver = (event: PointerEvent) => {
    this.hoverValue = this.getValueFromLabelEvent(event);
  };

  private handleLabelPointerDown = (event: PointerEvent) => {
    const target = event.currentTarget as HTMLLabelElement;
    const inputValue = this.getValueFromLabelEvent(event);
    this.hoverValue = inputValue;
    this.emit = true;
    this.value = !this.required && this.value === inputValue ? 0 : inputValue;
    target.focus();
  };

  private handleLabelClick = (event: Event) => {
    //preventing pointerdown event will supress any compatability mouse events except for click event.
    event.preventDefault();
  };

  private handleLabelFocus = (event: FocusEvent) => {
    const inputValue = this.getValueFromLabelEvent(event);
    this.hoverValue = inputValue;
  };

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

  private setLabelEl = (el: HTMLLabelElement): void => {
    this.labelElements.push(el);
  };

  private getValueFromLabelEvent(event: FocusEvent | PointerEvent | KeyboardEvent): number {
    const target = event.currentTarget as HTMLLabelElement;
    return Number(target.getAttribute("data-value"));
  }

  getNextRatingValue(currentValue: number): number {
    return currentValue === 5 ? 1 : currentValue + 1;
  }

  getPreviousRatingValue(currentValue: number): number {
    return currentValue === 1 ? 5 : currentValue - 1;
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  // --------------------------------------------------------------------------
  //
  //  Private State / Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteRatingElement;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Rating["value"];

  private emit = false;

  private guid = `calcite-ratings-${guid()}`;

  private isKeyboardInteraction = true;

  private labelElements: HTMLLabelElement[] = [];

  private max = 5;

  private starsMap: Star[];
}
