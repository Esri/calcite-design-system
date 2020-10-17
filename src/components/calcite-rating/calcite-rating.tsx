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
  State
} from "@stencil/core";
import { getKey } from "../../utils/key";
import { getElementDir, hasLabel } from "../../utils/dom";

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

  /** specify the scale of the component, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** the value of the rating component */
  @Prop({ reflect: true }) value = 0;

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

  @Listen("calciteLabelFocus", { target: "window" }) handleLabelFocus(e: CustomEvent): void {
    if (
      hasLabel(e.detail.labelEl, this.el) &&
      e.detail.interactedEl !== this.el &&
      !this.el.contains(e.detail.interactedEl)
    ) {
      this.setFocus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad() {
    this.determineInitialRating();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------

  render() {
    this.dir = getElementDir(this.el);

    const partialRatingStarContainer = (
      <div
        class="partial-rating-star-container"
        data-partialhidden="false"
        ref={(el) => (this.partialStarContainer = el)}
      >
        <calcite-icon
          data-partial="true"
          icon={this.selectedIconType}
          ref={(el) => (this.partialStar = el)}
          scale={this.scale}
          theme={this.theme}
        />
      </div>
    );

    // ie11 safe version of array / spread / keys
    const iconsToRender = [];
    for (let i = 0; i < 5; i++) {
      iconsToRender.push(
        <calcite-icon
          icon={this.iconType}
          onClick={(e) => this.determineRatingPosition(e)}
          onFocus={(e) => this.showSelectedIconOnHover(e)}
          onKeyDown={(e) => this.handleKeyDown(e)}
          onMouseEnter={(e) => this.showSelectedIconOnHover(e)}
          onTouchStart={(e) => this.showSelectedIconOnHover(e)}
          ref={(el) => this.ratingItems.set(i + 1, el)}
          scale={this.scale}
          tabindex={!this.readOnly && !this.disabled ? 0 : null}
        />
      );
    }
    return (
      <Host dir={this.dir}>
        <div
          class="calcite-rating-item-container"
          onBlur={() => this.resetHoverState()}
          onMouseLeave={() => this.resetHoverState()}
          onTouchEnd={() => this.resetHoverState()}
        >
          {iconsToRender}
          {this.average && !this.value ? partialRatingStarContainer : null}
        </div>
        {this.count || this.average ? (
          <calcite-chip
            dir={this.dir}
            scale={this.scale}
            theme={this.theme}
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
      const isFirstItem = this.itemValue(itemToFocus) === 1;
      const isLastItem = this.itemValue(itemToFocus) === this.ratingItems.size;
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
        case "Tab":
          if (isLastItem || (isFirstItem && e.shiftKey)) this.resetHoverState();
          break;
      }
    }
  }

  private determineRatingPosition(e) {
    if (!this.readOnly) {
      const isEdgeOrIE =
        window.navigator.userAgent.indexOf("Edge") > -1 ||
        !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/));
      const value = !isEdgeOrIE
        ? this.itemValue(e.target)
        : this.itemValue(e.target.closest("CALCITE-ICON"));

      this.value = value;
      this.emitRatingChange();
      this.determineActiveItems();
    }
  }

  private determineInitialRating() {
    const valueToUse = this.value ? this.value : this.average;
    this.ratingItems?.forEach((item, value) => {
      item.dataset.hovered = "false";
      item.dataset.average =
        this.average && !this.value && value <= this.average ? "true" : "false";
      item.dataset.selected =
        item.dataset.average === "false" && value <= valueToUse ? "true" : "false";
      item.icon = value <= valueToUse || this.readOnly ? this.selectedIconType : this.iconType;
    });

    if (this.average) {
      this.determinePartialStar();
    }
  }

  private determinePartialStar() {
    // position an extra icon and fill to width of percentage
    const rootVal = Math.floor(this.average);
    const decimal = parseInt((this.average % 1).toFixed(2).split(".")[1]);

    // track the closest full star to position the partial icon
    this.ratingItems?.forEach((item, value) => {
      if (this.average && !this.value && value === rootVal + 1) {
        this.rootStar = item;
        this.rootStar.dataset.partialparent = "true";
      }
    });
    if (this.rootStar) {
      this.partialStar.dataset.rootvalue = (rootVal + 1).toString();
      // get margin from first star item in case partial is last and has none
      const marginProp = this.dir === "rtl" ? "margin-left" : "margin-right";
      const margin = window.getComputedStyle(this.ratingItems.get(1)).getPropertyValue(marginProp);
      const offset = `calc((${this.rootStar.offsetWidth}px + ${margin}) * ${rootVal})`;

      this.partialStarContainer.style.width = `${(decimal / 100) * this.rootStar.offsetWidth}px`;
      this.partialStarContainer.style.height = `${this.rootStar.offsetHeight}px`;

      this.dir === "rtl"
        ? (this.partialStarContainer.style.right = offset)
        : (this.partialStarContainer.style.left = offset);
    }
  }

  private resetHoverState() {
    if (this.partialStarContainer) this.partialStarContainer.dataset.partialhidden = "false";
    this.ratingItems?.forEach((item) => {
      item.dataset.hovered = "false";
    });
  }

  private determineActiveItems() {
    const valueToUse = this.value ? this.value : this.average;
    this.ratingItems?.forEach((item, value) => {
      item.dataset.hovered = "false";
      item.dataset.average = "false";
      item.dataset.selected = value <= valueToUse ? "true" : "false";
      item.icon = this.readOnly || value <= this.value ? this.selectedIconType : this.iconType;
    });
  }

  private showSelectedIconOnHover(e) {
    if (!this.readOnly) {
      const hoveredValue = this.itemValue(e.target);
      if (this.partialStarContainer)
        this.partialStarContainer.dataset.partialhidden =
          parseInt(this.partialStar.dataset.rootvalue) <= hoveredValue ? "true" : "false";
      this.ratingItems?.forEach((item, value) => {
        item.dataset.hovered = hoveredValue >= value ? "true" : "false";
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
    const firstItem = this.ratingItems.get(1);
    this.focusElement(firstItem);
  }

  private focusLastItem() {
    const lastItem = this.ratingItems.get(this.ratingItems.size);
    this.focusElement(lastItem);
  }

  private focusNextItem(e) {
    const position = this.itemValue(e);
    const nextItem = this.ratingItems.get(position + 1) || this.ratingItems.get(1);
    this.focusElement(nextItem);
  }

  private focusPrevItem(e) {
    const position = this.itemValue(e);
    const prevItem =
      this.ratingItems.get(position - 1) || this.ratingItems.get(this.ratingItems.size);
    this.focusElement(prevItem);
  }

  private itemValue(e) {
    return Array.from(this.ratingItems.values()).indexOf(e) + 1;
  }

  private focusElement(item) {
    const target = item as HTMLCalciteIconElement;
    target.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    this.ratingItems.get(1).focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  /* @internal */
  @State() ratingItems: Map<number, HTMLCalciteIconElement> = new Map();

  private iconType = "star";

  private selectedIconType = "star-f";

  private dir;

  // the absolutely positioned star when an average rating has decimal
  private partialStar: HTMLCalciteIconElement;

  private partialStarContainer: HTMLDivElement;

  // track the last full value star to position the partial star
  private rootStar: HTMLCalciteIconElement;
}
