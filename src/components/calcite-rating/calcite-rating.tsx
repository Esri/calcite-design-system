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

  @Listen("calciteLabelFocus", { target: "window" }) handleLabelFocus(e) {
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
    this.ratingItems = this.el.shadowRoot.querySelectorAll(
      "calcite-icon:not([data-partial='true'])"
    );
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
          icon={this.selectedIconType}
          scale={this.scale}
          theme={this.theme}
          data-partial="true"
          ref={(el) => (this.partialStar = el)}
        ></calcite-icon>
      </div>
    );

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
          {this.average && !this.value ? partialRatingStarContainer : null}
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
        case "Tab":
          if (isLastItem || (isFirstItem && e.shiftKey)) this.resetHoverState();
          break;
      }
    }
  }

  private determineRatingPosition(e) {
    if (!this.readOnly) {
      // handle edge not interpreting mapped stars
      const isEdge = window.navigator.userAgent.indexOf("Edge") > -1;
      const value = !isEdge
        ? e.target.dataset.value
        : e.target.closest("CALCITE-ICON").dataset.value;
      console.log(e.target);
      this.value = value;
      this.emitRatingChange();
      this.determineActiveItems();
    }
  }

  private determineInitialRating() {
    const valueToUse = this.value ? this.value : this.average;
    this.ratingItems?.forEach((item) => {
      item.dataset.hovered = "false";
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
    const decimal = parseInt((this.average % 1).toFixed(2).split(".")[1]);

    // track the closest full star to position the partial icon
    this.ratingItems?.forEach((item) => {
      if (this.average && !this.value && parseInt(item.dataset.value) === rootVal + 1) {
        this.rootStar = item;
        this.rootStar.dataset.partialparent = "true";
      }
    });

    if (this.rootStar) {
      this.partialStar.dataset.rootvalue = (rootVal + 1).toString();

      // get margin from first star item in case partial is last and has none
      const marginProp = this.dir === "rtl" ? "margin-left" : "margin-right";
      const margin = window.getComputedStyle(this.ratingItems[0]).getPropertyValue(marginProp);
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
    this.ratingItems?.forEach((item) => {
      item.dataset.hovered = "false";
      item.dataset.average = "false";
      item.dataset.selected = parseInt(item.dataset.value) <= valueToUse ? "true" : "false";
      item.icon =
        this.readOnly || parseInt(item.dataset.value) <= this.value
          ? this.selectedIconType
          : this.iconType;
    });
  }

  private showSelectedIconOnHover(e) {
    if (!this.readOnly) {
      const isEdge = window.navigator.userAgent.indexOf("Edge") > -1;
      const value = !isEdge ? e.target.dataset.value : e.target.parentNode.dataset.value;
      if (this.partialStarContainer)
        this.partialStarContainer.dataset.partialhidden =
          parseInt(this.partialStar.dataset.rootvalue) <= value ? "true" : "false";
      this.ratingItems?.forEach((item) => {
        item.dataset.hovered = parseInt(item.dataset.value) <= value ? "true" : "false";
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

  private iconType = "star";

  private selectedIconType = "star-f";

  private dir;

  // the absolutely positioned star when an average rating has decimal
  private partialStar: HTMLCalciteIconElement;

  private partialStarContainer: HTMLDivElement;

  // track the last full value star to position the partial star
  private rootStar: HTMLCalciteIconElement;
}
