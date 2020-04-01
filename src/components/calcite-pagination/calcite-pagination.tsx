import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Method,
  State,
  Watch
} from "@stencil/core";

import { CSS, TEXT } from "./resources";

const maxPagesDisplayed = 5;

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

  /** Change between foreground colors or background colors for container background */
  @Prop({ reflect: true }) backgroundStyle: "backgroundColor" | "foregroundColor" = "foregroundColor";

  /** starting selected index */
  @Prop({ reflect: true }) num = 1;
  @Watch("num") numWatchHandler(newValue) {
    this.selectedIndex = newValue;
  }

  /** starting number of the pagination */
  @Prop({ reflect: true }) start = 1;

  /** title of the next button */
  @Prop({ reflect: true }) textLabelNext:string = TEXT.nextLabel;

  /** title of the previous button */
  @Prop({ reflect: true }) textLabelPrevious:string = TEXT.previousLabel;

  /** specify the theme of accordion, defaults to light */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** ending number of the pagination */
  @Prop({ reflect: true }) total = 2;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  @State() selectedIndex = this.num;
  @Watch('selectedIndex') selectedIndexWatchHandler() {
    this.calcitePaginationUpdate.emit({
      start: this.start,
      total: this.total,
      num: this.selectedIndex
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emitted whenever the selected page changes.
   * @event calcitePaginationUpdate
   */
  @Event() calcitePaginationUpdate: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** When called, selected page will increment by 1.
   */
  @Method()
  async nextPage(): Promise<void> {
    this.selectedIndex = Math.min(this.total, this.selectedIndex + 1);
  }

  /** When called, selected page will decrement by 1.
   */
  @Method()
  async previousPage(): Promise<void> {
    this.selectedIndex = Math.max(this.start, this.selectedIndex - 1);
  }

  /** Set selected page to a specific page number. Will not go below start or above total.
   */
  @Method()
  async setPage(num: number): Promise<void> {
    this.selectedIndex = Math.max(this.start, Math.min(this.total, num));
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  previousClicked = (): void => {
    this.previousPage();
  };

  nextClicked = (): void => {
    this.nextPage();
  };

  showLeftEllipsis() {
    return (this.selectedIndex - this.start) > 3;
  }

  showRightEllipsis() {
    return (this.total - this.selectedIndex) > 3;
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderPages() {
    let pages = [];
    let currentNum;
    let end;

    if ( this.total <= maxPagesDisplayed ) {
      currentNum = this.start + 1;
      end = this.total - 1;
    } else {
      if ( this.selectedIndex < maxPagesDisplayed ) {
        currentNum = this.start + 1;
        end = this.start + 4;
      } else {
        if ( this.selectedIndex + 3 >= this.total ) {
          currentNum = this.total - 4;
          end = this.total -1;
        } else {
          currentNum = this.selectedIndex - 1;
          end = this.selectedIndex + 1;
        }
      }
    }

    while (currentNum <= end) {
      pages.push(currentNum);
      currentNum ++;
    }

    return pages.map(page => this.renderPage(page));
  }

  renderPage(num) {
    return (
      <a class={{[CSS.page]:true, [CSS.selected]: (num === this.selectedIndex) }} onClick={() => {
        this.selectedIndex = num;
      }}>{num}</a>
    );
  }

  renderLeftEllipsis() {
    if ( this.total > maxPagesDisplayed && this.showLeftEllipsis() ) {
      return (
        <span class={`${CSS.ellipsis} ${CSS.ellipsisStart}`}>
          <calcite-icon scale="s" icon="ellipsis" />
        </span>
      );
    }
  }

  renderRightEllipsis() {
    if ( this.total > maxPagesDisplayed && this.showRightEllipsis() ) {
      return (
        <span class={`${CSS.ellipsis} ${CSS.ellipsisEnd}`}>
          <calcite-icon scale="s" icon="ellipsis" />
        </span>
      );
    }
  }

  render() {

    return (
      <Host class={this.backgroundStyle}>
        <a class={{[CSS.previous]: true, [CSS.disabled]: this.selectedIndex <= 1}} title={this.textLabelPrevious} onClick={this.previousClicked}>
          <calcite-icon scale="s" icon="chevronLeft" />
        </a>
        {this.renderPage(this.start)}
        {this.renderLeftEllipsis()}
        {this.renderPages()}
        {this.renderRightEllipsis()}
        {this.renderPage(this.total)}
        <a class={{[CSS.next]: true, [CSS.disabled]: this.selectedIndex >= this.total}} title={this.textLabelNext} onClick={this.nextClicked}>
          <calcite-icon scale="s" icon="chevronRight" />
        </a>
      </Host>
    );
  }
}
