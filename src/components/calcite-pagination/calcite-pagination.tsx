import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Method,
} from "@stencil/core";

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
  shadow: true,
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
  @Prop() start = 1;

  /** total number of items */
  @Prop() total = 0;

  /** title of the next button */
  @Prop() textLabelNext: string = TEXT.nextLabel;

  /** title of the previous button */
  @Prop() textLabelPrevious: string = TEXT.previousLabel;

  /** specify the theme of accordion, defaults to light */
  @Prop({ reflect: true }) theme: "light" | "dark";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emitted whenever the selected page changes.
   * @event calcitePaginationUpdate
   */
  @Event() calcitePaginationUpdate: EventEmitter<CalcitePaginationDetail>;

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
    const lastStart =
      total % num === 0 ? total - num : Math.floor(total / num) * num;
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
    this.calcitePaginationUpdate.emit({
      start: this.start,
      total: this.total,
      num: this.num,
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderPages() {
    let lastStart = this.getLastStart();
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

  renderPage(start: number) {
    const page = Math.floor(start / this.num) + 1;
    return (
      <button
        class={{
          [CSS.page]: true,
          [CSS.selected]: start === this.start,
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

  renderLeftEllipsis() {
    if (this.total / this.num > maxPagesDisplayed && this.showLeftEllipsis()) {
      return (
        <span class={`${CSS.ellipsis} ${CSS.ellipsisStart}`}>
          <calcite-icon scale="s" icon="ellipsis" />
        </span>
      );
    }
  }

  renderRightEllipsis() {
    if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
      return (
        <span class={`${CSS.ellipsis} ${CSS.ellipsisEnd}`}>
          <calcite-icon scale="s" icon="ellipsis" />
        </span>
      );
    }
  }

  render() {
    const { total, num, start } = this;
    return (
      <Host>
        <button
          class={{
            [CSS.previous]: true,
            [CSS.disabled]: start < num,
          }}
          aria-label={this.textLabelPrevious}
          onClick={this.previousClicked}
          disabled={start < num}
        >
          <calcite-icon scale="s" icon="chevronLeft" />
        </button>
        {this.renderPage(1)}
        {this.renderLeftEllipsis()}
        {this.renderPages()}
        {this.renderRightEllipsis()}
        {this.renderPage(this.getLastStart())}
        <button
          class={{
            [CSS.next]: true,
            [CSS.disabled]: start + num >= total,
          }}
          aria-label={this.textLabelNext}
          onClick={this.nextClicked}
          disabled={start + num >= total}
        >
          <calcite-icon scale="s" icon="chevronRight" />
        </button>
      </Host>
    );
  }
}
