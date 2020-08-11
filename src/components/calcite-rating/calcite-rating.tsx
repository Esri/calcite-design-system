import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop
} from "@stencil/core";
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
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteLabelFocus", { target: "window" }) handleLabelFocus(e) {
    if (e.detail.labelEl.contains(this.el) || e.detail.labelEl.shadowRoot.contains(this.el)) {
      this.setFocus();
    }
  }
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
    this.determineInitialRating();
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
    this.dir = getElementDir(this.el);

    return (
      <Host dir={this.dir}>
        <div
          class="calcite-rating-item-container"
          onBlur={() => this.resetHoverState()}
          onMouseLeave={() => this.resetHoverState()}
          onTouchEnd={() => this.resetHoverState()}
        >
          {[...Array(5).keys()].map((e) => {
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
        </div>
        {this.count || this.average ? (
          <calcite-chip
            dir={this.dir}
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
        parseInt(item.dataset.value) <= valueToUse || this.readOnly
          ? this.selectedIconType
          : this.iconType;
    });

    if (this.average) {
      this.determinePartialStar();
    }
  }

  private determinePartialStar() {
    // position an extra icon and fill to width of percentage
    const rootVal = Math.floor(this.average);
    const decimalVal = parseInt((this.average % 1).toFixed(2).split(".")[1]);

    // track the closest full star to position the partial icon
    this.ratingItems?.forEach((item) => {
      if (this.average && !this.value && parseInt(item.dataset.value) === rootVal + 1) {
        this.rootStar = item;
        this.rootStar.dataset.partialparent = "true";
      }
    });

    // only generate partial star if there is a root with a partial
    if (this.rootStar) {
      this.partialStar = document.createElement("CALCITE-ICON") as HTMLCalciteIconElement;
      this.partialStar.dataset.partial = "true";
      this.partialStar.dataset.value = (rootVal + 1).toString();
      this.partialStar.scale = this.scale;
      this.partialStar.theme = this.theme;
      this.partialStar.icon = this.selectedIconType;

      // clip the icon to the partial percentage
      this.partialStar.style.clipPath =
        this.dir !== "rtl"
          ? `polygon(0 0, ${decimalVal}% 0, ${decimalVal}% 100%, 0% 100%)`
          : `polygon(${100 - decimalVal}% 0, 100% 0%, 100% 100%, ${100 - decimalVal}% 100%)`;

      // compensate for margin based on scale
      const margin =
        this.scale === "s" ? rootVal * 4 : this.scale === "m" ? rootVal * 8 : rootVal * 12;

      this.partialStar.style.margin =
        this.dir !== "rtl"
          ? `0 0 0 ${this.rootStar.offsetWidth * rootVal + margin}px`
          : `0 ${this.rootStar.offsetWidth * rootVal + margin}px 0 0`;

      this.rootStar.insertAdjacentElement("afterend", this.partialStar);
    }
  }

  private resetHoverState() {
    this.partialStar.dataset.partialhidden = "false";
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
        parseInt(item.dataset.value) <= this.value || this.readOnly
          ? this.selectedIconType
          : this.iconType;
    });
  }

  private showSelectedIconOnHover(e) {
    if (!this.readOnly) {
      this.partialStar.dataset.partialhidden =
        parseInt(this.partialStar.dataset.value) <= e.target.dataset.value ? "true" : "false";
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

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus() {
    this.ratingItems[0].focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private ratingItems: NodeListOf<HTMLCalciteIconElement>;

  private selectedIconType: "star-f" | "circle-f" = "star-f";

  private dir;

  // the absolutely positioned star when an average rating has decimal
  private partialStar: HTMLCalciteIconElement;

  // track the last full value star to position the partial star
  private rootStar: HTMLCalciteIconElement;
}
