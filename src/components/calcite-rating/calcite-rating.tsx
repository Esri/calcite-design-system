import { Component, Element, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import { getKey } from "../../utils/key";
import { getElementDir } from "../utils/dom";

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
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the icon used for the rating, defaults to star */
  @Prop({ reflect: true }) iconType: "star" | "circle" = "star";

  /** specify the scale of the component, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the total number of items in of rating scale, defaults to 5 */
  @Prop({ reflect: true }) total = 5;

  /** the value of the rating component */
  @Prop({ reflect: true }) value = 0;

  /** the precision of the rating component - half or whole step */
  @Prop({ reflect: true }) precision: "half" | "whole" = "whole";

  /** is the rating component in a selectable mode */
  @Prop({ reflect: true }) readOnly = false;

  /** is the rating component in a selectable mode */
  @Prop({ reflect: true }) disabled = false;

  /** display rating value */
  @Prop({ reflect: true }) displayValue = false;

  /** optionally pass a number of previous ratings to display */
  @Prop({ reflect: true }) count?: number;

  /** optionally pass a cumulative average rating to display */
  @Prop({ reflect: true }) average?: number;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteRatingChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    // ensure only allowed icons are used
    const icon = ["star", "circle"];
    if (!icon.includes(this.iconType)) this.iconType = "star";
    this.selectedIconType = this.iconType === "star" ? "star-f" : "circle-f";
  }

  componentDidLoad() {
    this.ratingItems = this.el.shadowRoot.querySelectorAll("calcite-icon");
    if (this.average || this.value) this.determineInitialRating();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------
  //todo
  // arrow key nav
  // tests
  // whole / half precision

  render() {
    const dir = getElementDir(this.el);

    return (
      <Host
        dir={dir}
        onBlur={() => this.resetHoverState()}
        onMouseLeave={() => this.resetHoverState()}
        onTouchEnd={() => this.resetHoverState()}
      >
        {[...Array(this.total).keys()].map((e) => {
          return (
            <calcite-icon
              data-value={e + 1}
              onClick={(e) => this.determineRatingPosition(e)}
              onKeyDown={(e) => this.handleKeyDown(e)}
              onMouseEnter={(e) => this.showSelectedIconOnHover(e)}
              onTouchStart={(e) => this.showSelectedIconOnHover(e)}
              onFocus={(e) => this.showSelectedIconOnHover(e)}
              tabindex={!this.readOnly && !this.disabled ? 0 : null}
              icon={this.iconType}
              scale={this.scale}
            />
          );
        })}
        {this.count || this.average ? (
          <calcite-chip
            dir={dir}
            theme={this.theme}
            scale={this.scale}
            value={this.count?.toString()}
          >
            {this.average ? (
              <span class="calcite-rating-average">{this.average.toString()}</span>
            ) : null}
            {this.count ? (
              <span class="calcite-rating-count">({this.count?.toString()})</span>
            ) : null}
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
  private handleKeyDown(e) {
    if (!this.readOnly) {
      const itemToFocus = e.target;
      const isFirstItem = this.itemIndex(itemToFocus) === 0;
      const isLastItem = this.itemIndex(itemToFocus) === this.ratingItems.length - 1;
      switch (getKey(e.key)) {
        case " ":
        case "Enter":
          e.preventDefault();
          this.determineRatingPosition(e);
          break;
        case "ArrowRight":
          if (isLastItem) this.focusFirstItem();
          else this.focusNextItem(itemToFocus);
          break;
        case "ArrowLeft":
          if (isFirstItem) this.focusLastItem();
          else this.focusPrevItem(itemToFocus);
          break;
        case "Home":
          this.focusFirstItem();
          e.preventDefault();
          break;
        case "End":
          this.focusLastItem();
          e.preventDefault();
          break;
      }
    }
  }

  private determineRatingPosition(e) {
    if (!this.readOnly) {
      this.value = e.target.dataset.value;
      this.emitRatingChange();
      this.determineActiveItems();
    }
  }

  private determineInitialRating() {
    const valueToUse = this.value ? this.value : this.average;
    this.ratingItems?.forEach((item) => {
      item.dataset.average =
        this.average && !this.value && parseInt(item.dataset.value) <= this.average
          ? "true"
          : "false";
      item.dataset.selected =
        item.dataset.average === "false" && parseInt(item.dataset.value) <= valueToUse
          ? "true"
          : "false";
      item.icon =
        parseInt(item.dataset.value) <= valueToUse ? this.selectedIconType : this.iconType;
    });
  }

  private resetHoverState() {
    this.ratingItems?.forEach((item) => {
      item.dataset.hovered = "false";
    });
  }

  private determineActiveItems() {
    const valueToUse = this.value ? this.value : this.average;
    this.ratingItems?.forEach((item) => {
      item.dataset.hovered = "false";
      item.dataset.average = "false";
      item.dataset.selected = parseInt(item.dataset.value) <= valueToUse ? "true" : "false";
      item.icon =
        (this.average && !this.value && item.dataset.average === "true") ||
        parseInt(item.dataset.value) <= this.value
          ? this.selectedIconType
          : this.iconType;
    });
  }

  private showSelectedIconOnHover(e) {
    if (!this.readOnly) {
      this.ratingItems?.forEach((item) => {
        item.dataset.hovered =
          parseInt(item.dataset.value) <= e.target.dataset.value ? "true" : "false";
      });
    }
  }

  private emitRatingChange() {
    this.calciteRatingChange.emit({
      value: this.value
    });
  }

  // focus helpers

  private focusFirstItem() {
    const firstItem = this.ratingItems[0];
    this.focusElement(firstItem);
  }

  private focusLastItem() {
    const lastItem = this.ratingItems[this.ratingItems.length - 1];
    this.focusElement(lastItem);
  }

  private focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.ratingItems[index + 1] || this.ratingItems[0];
    this.focusElement(nextItem);
  }

  private focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.ratingItems[index - 1] || this.ratingItems[this.ratingItems.length - 1];
    this.focusElement(prevItem);
  }

  private itemIndex(e) {
    return Array.from(this.ratingItems).indexOf(e);
  }

  private focusElement(item) {
    const target = item as HTMLCalciteAccordionItemElement;
    target.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private ratingItems: NodeListOf<HTMLCalciteIconElement>;

  private selectedIconType: "star-f" | "circle-f" = "star-f";
}
