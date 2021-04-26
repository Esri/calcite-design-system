import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Method,
  VNode
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { Scale, Theme } from "../interfaces";

import { CSS, TEXT } from "./resources";

const maxPagesDisplayed = 5;
export interface CalcitePaginationDetail {
  start: number;
  total: number;
  num: number;
}

@Component({
  tag: "calcite-pagination",
  styleUrl: "calcite-pagination.scss",
  shadow: true
})
export class CalcitePagination {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** number of items per page */
  @Prop() num = 20;

  /** index of item that should begin the page */
  @Prop({ mutable: true }) start = 1;

  /** total number of items */
  @Prop() total = 0;

  /** title of the next button */
  @Prop() textLabelNext: string = TEXT.nextLabel;

  /** title of the previous button */
  @Prop() textLabelPrevious: string = TEXT.previousLabel;

  /** specify the theme of accordion, defaults to light */
  @Prop({ reflect: true }) theme: Theme;

  /** The scale of the pagination */
  @Prop({ reflect: true }) scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------
  @Element() el: HTMLCalcitePaginationElement;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted whenever the selected page changes.
   * @deprecated use calcitePaginationChange instead
   */
  @Event() calcitePaginationUpdate: EventEmitter<CalcitePaginationDetail>;

  /**
   * Emitted whenever the selected page changes.
   */
  @Event() calcitePaginationChange: EventEmitter<CalcitePaginationDetail>;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Go to the next page of results */
  @Method() async nextPage(): Promise<void> {
    this.start = Math.min(this.getLastStart(), this.start + this.num);
  }

  /** Go to the previous page of results */
  @Method() async previousPage(): Promise<void> {
    this.start = Math.max(1, this.start - this.num);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private getLastStart(): number {
    const { total, num } = this;
    const lastStart = total % num === 0 ? total - num : Math.floor(total / num) * num;
    return lastStart + 1;
  }

  private previousClicked = (): void => {
    this.previousPage().then();
    this.emitUpdate();
  };

  private nextClicked = (): void => {
    this.nextPage();
    this.emitUpdate();
  };

  private showLeftEllipsis() {
    return Math.floor(this.start / this.num) > 3;
  }

  private showRightEllipsis() {
    return (this.total - this.start) / this.num > 3;
  }

  private emitUpdate() {
    const changePayload = {
      start: this.start,
      total: this.total,
      num: this.num
    };

    this.calcitePaginationChange.emit(changePayload);
    this.calcitePaginationUpdate.emit(changePayload);
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderPages(): VNode[] {
    const lastStart = this.getLastStart();
    let end;
    let nextStart;

    // if we don't need ellipses render the whole set
    if (this.total / this.num <= maxPagesDisplayed) {
      nextStart = 1 + this.num;
      end = lastStart - this.num;
    } else {
      // if we're within max pages of page 1
      if (this.start / this.num < maxPagesDisplayed - 1) {
        nextStart = 1 + this.num;
        end = 1 + 4 * this.num;
      } else {
        // if we're within max pages of last page
        if (this.start + 3 * this.num >= this.total) {
          nextStart = lastStart - 4 * this.num;
          end = lastStart - this.num;
        } else {
          nextStart = this.start - this.num;
          end = this.start + this.num;
        }
      }
    }

    const pages = [];
    while (nextStart <= end) {
      pages.push(nextStart);
      nextStart = nextStart + this.num;
    }

    return pages.map((page) => this.renderPage(page));
  }

  renderPage(start: number): VNode {
    const page = Math.floor(start / this.num) + (this.num === 1 ? 0 : 1);
    return (
      <button
        class={{
          [CSS.page]: true,
          [CSS.selected]: start === this.start
        }}
        onClick={() => {
          this.start = start;
          this.emitUpdate();
        }}
      >
        {page}
      </button>
    );
  }

  renderLeftEllipsis(iconScale: this["scale"]): VNode {
    if (this.total / this.num > maxPagesDisplayed && this.showLeftEllipsis()) {
      return (
        <span class={`${CSS.ellipsis} ${CSS.ellipsisStart}`}>
          <calcite-icon icon="ellipsis" scale={iconScale} />
        </span>
      );
    }
  }

  renderRightEllipsis(iconScale: this["scale"]): VNode {
    if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
      return (
        <span class={`${CSS.ellipsis} ${CSS.ellipsisEnd}`}>
          <calcite-icon icon="ellipsis" scale={iconScale} />
        </span>
      );
    }
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const { total, num, start } = this;
    const iconScale = this.scale === "l" ? "m" : "s";
    const prevDisabled = num === 1 ? start <= num : start < num;
    const nextDisabled = num === 1 ? start + num > total : start + num > total;
    return (
      <Host>
        <button
          aria-label={this.textLabelPrevious}
          class={{
            [CSS.previous]: true,
            [CSS.disabled]: prevDisabled
          }}
          disabled={prevDisabled}
          onClick={this.previousClicked}
        >
          <calcite-icon dir={dir} flipRtl icon="chevronLeft" scale={iconScale} />
        </button>
        {total > num ? this.renderPage(1) : null}
        {this.renderLeftEllipsis(iconScale)}
        {this.renderPages()}
        {this.renderRightEllipsis(iconScale)}
        {this.renderPage(this.getLastStart())}
        <button
          aria-label={this.textLabelNext}
          class={{
            [CSS.next]: true,
            [CSS.disabled]: nextDisabled
          }}
          disabled={nextDisabled}
          onClick={this.nextClicked}
        >
          <calcite-icon dir={dir} flipRtl icon="chevronRight" scale={iconScale} />
        </button>
      </Host>
    );
  }
}
