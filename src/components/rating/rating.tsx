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
  VNode,
  Watch
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel } from "../../utils/label";
import { connectForm, disconnectForm, FormComponent, HiddenFormInputSlot } from "../../utils/form";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { connectMessages, disconnectMessages, T9nComponent } from "../../utils/t9n";
import { Messages } from "./assets/rating/t9n";

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
  @Prop({ reflect: true }) average?: number;

  /** Specifies the number of previous ratings to display. */
  @Prop({ reflect: true }) count?: number;

  /** When true, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Accessible name for the component.
   *
   * @deprecated – translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlRating: string;

  /**
   * Accessible name for each star. The `${num}` in the string will be replaced by the number.
   *
   * @deprecated – translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlStars: string;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: Messages;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<Messages>;

  @Watch("intlRating")
  @Watch("intlStars")
  @Watch("defaultMessages")
  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /** Specifies the name of the component on form submission. */
  @Prop({ reflect: true }) name: string;

  /** When true, the component's value can be read, but cannot be modified. */
  @Prop({ reflect: true }) readOnly = false;

  /**
   * When true, the component must have a value in order for the form to submit.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** When true, and if available, displays the "average" and/or "count" data summary in a `calcite-chip`. */
  @Prop({ reflect: true }) showChip = false;

  /** The component's value. */
  @Prop({ reflect: true, mutable: true }) value = 0;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
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

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("blur")
  blurHandler(): void {
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
            onPointerOver={() => {
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
              // click is fired from the component's label, so we treat this as an internal event
              event.stopPropagation()
            }
            onFocus={() => this.onFocusChange(i)}
            onKeyDown={this.onKeyboardPressed}
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
    const { disabled, messages, showChip, scale, count, average } = this;

    return (
      <Fragment>
        <fieldset
          class="fieldset"
          disabled={disabled}
          onBlur={() => (this.hoverValue = null)}
          onPointerLeave={() => (this.hoverValue = null)}
          onTouchEnd={() => (this.hoverValue = null)}
        >
          <legend class="visually-hidden">{messages.rating}</legend>
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

  private updateValue(value: number) {
    this.value = value;
    this.calciteRatingChange.emit({ value });
  }

  private onKeyboardPressed = (event: KeyboardEvent): void => {
    if (!this.required && isActivationKey(event.key)) {
      event.preventDefault();
      this.updateValue(0);
    }
  };

  private onFocusChange = (selectedRatingValue: number): void => {
    this.hasFocus = true;
    if (!this.required && this.focusValue === selectedRatingValue) {
      this.updateValue(0);
    } else {
      this.focusValue = selectedRatingValue;
    }
  };

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

  @State() effectiveLocale = "";

  @State() defaultMessages: Messages;

  @State() hoverValue: number;

  @State() focusValue: number;

  @State() hasFocus: boolean;

  private guid = `calcite-ratings-${guid()}`;

  private inputFocusRef: HTMLInputElement;
}
