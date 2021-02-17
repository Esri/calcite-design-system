import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode
} from "@stencil/core";
import { getElementDir, hasLabel } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { Scale, Theme } from "../interfaces";
import { TEXT } from "./calcite-rating-resources";

@Component({
  tag: "calcite-rating",
  styleUrl: "calcite-rating.scss",
  shadow: true
})
export class CalciteRating {
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

  /** specify the theme of scrim, defaults to light */
  @Prop({ reflect: true }) theme: Theme;

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

  /** Localized string for "Rating" (used for aria label) */
  @Prop() intlRating?: string = TEXT.rating;

  /** Localized string for labelling each star, `${num}` in the string will be replaced by the number */
  @Prop() intlStars?: string = TEXT.stars;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteRatingChange: EventEmitter<{ value: number }>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteLabelFocus", { target: "window" }) handleLabelFocus(e: CustomEvent): void {
    if (
      hasLabel(e.detail.labelEl, this.el) &&
      e.detail.interactedEl !== this.el &&
      !this.el.contains(e.detail.interactedEl)
    ) {
      this.setFocus();
    }
  }

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
                <calcite-icon icon="star-f" scale={this.scale} theme={this.theme} />
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
            onFocus={() => {
              this.hasFocus = true;
              this.focusValue = i;
            }}
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
    const { intlRating, showChip, scale, theme, count, average } = this;
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <fieldset
          class="fieldset"
          onBlur={() => (this.hoverValue = null)}
          onMouseLeave={() => (this.hoverValue = null)}
          onTouchEnd={() => (this.hoverValue = null)}
        >
          <legend class="visually-hidden">{intlRating}</legend>
          {this.renderStars()}
        </fieldset>
        {(count || average) && showChip ? (
          <calcite-chip dir={dir} scale={scale} theme={theme} value={count?.toString()}>
            {!!average && <span class="number--average">{average.toString()}</span>}
            {!!count && <span class="number--count">({count?.toString()})</span>}
          </calcite-chip>
        ) : null}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private updateValue(value: number) {
    this.value = value;
    this.calciteRatingChange.emit({ value });
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  @Method()
  async setFocus(): Promise<void> {
    this.inputFocusRef.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private State / Properties
  //
  // --------------------------------------------------------------------------

  @State() hoverValue: number;

  @State() focusValue: number;

  @State() hasFocus: boolean;

  private guid = `calcite-ratings-${guid()}`;

  private inputFocusRef: HTMLInputElement;
}
