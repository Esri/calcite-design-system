import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  // Listen,
  Prop,
  Method,
  State,
  Watch
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";
import { chevronLeft16, chevronRight16, ellipsis16 } from "@esri/calcite-ui-icons";
import CalciteIcon from "../../utils/CalciteIcon";

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

  /** starting number of the pagination */
  @Prop({ reflect: true }) start = 1;

  /** ending number of the pagination */
  @Prop({ reflect: true }) total = 2;

  /** specify the theme of accordion, defaults to light */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** starting selected index */
  @Prop({ reflect: true }) num = 1;
  @Watch("num") numWatchHandler(newValue) {
    this.selectedIndex = newValue;
  }


  @Prop({ reflect: true }) textLabelNext:string = TEXT.nextLabel;

  @Prop({ reflect: true }) textLabelPrevious:string = TEXT.previousLabel;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  @State() selectedIndex = this.num;
  @Watch('selectedIndex') selectedIndexWatchHandler() {
    this.calcitePageChange.emit({
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

  @Event() calcitePageChange: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async nextPage(): Promise<void> {
    this.selectedIndex = Math.min(this.total, this.selectedIndex + 1);
  }

  @Method()
  async previousPage(): Promise<void> {
    this.selectedIndex = Math.max(1, this.selectedIndex - 1);
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

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderPages() {
    let pages = [];
    let currentNum = this.start + 1;
    let end = this.total -1;

    // const startDelta = Math.abs( this.selectedIndex - this.start );
    // const endDelta = Math.abs( this.total - this.selectedIndex );
    // console.log("startDelta: " + startDelta);
    // console.log("endDelta: " + endDelta);

    if ( this.total <= maxPagesDisplayed ) {
      // ez no ellipsis
      currentNum = this.start;
      while (currentNum < end) {
        pages.push(currentNum);
        currentNum ++;
      }
    } else if ( this.selectedIndex < (maxPagesDisplayed) ) {
      currentNum = this.start + 1;
      end = maxPagesDisplayed;
      while (currentNum <= end) {
        pages.push(currentNum);
        currentNum ++;
      }
    }

    // } else {
    //   currentNum = this.selectedIndex - 1;
    //   end = this.selectedIndex + 1;
    //   while (currentNum <= end) {
    //     pages.push(currentNum);
    //     currentNum ++;
    //   }
    //   pages.unshift(this.start);
    //   pages.push(this.total);
    // }

    return pages.map(page => {
      return this.renderPage(page);
    });
  }

  // getPagesToDisplay() {
  //   const pageDisplayArray = [];
  //   if ( this.total <= maxPagesDisplayed ) {
  //     pageDisplayArray = [1,2,3,4,5];
  //   }
  //   pageDisplayArray.unshift(this.start);
  //   pageDisplayArray.push(this.total);
  // }

  renderPage(num) {
    return (
      <a class={{[CSS.page]:true, [CSS.selected]: (num === this.selectedIndex) }} onClick={() => {
        this.selectedIndex = num;
      }}>{num}</a>
    );
  }

  renderLeftEllipsis() {
    if ( this.total > maxPagesDisplayed && this.selectedIndex >= (maxPagesDisplayed) ) {
      return (
        <span class={CSS.ellipsis}>
          <CalciteIcon size="16" path={ellipsis16} />
        </span>
      );
    }
  }

  renderRightEllipsis() {
    if ( this.total > maxPagesDisplayed && this.selectedIndex <= (this.total - 2) ) {
      return (
        <span class={CSS.ellipsis}>
          <CalciteIcon size="16" path={ellipsis16} />
        </span>
      );
    }
  }

  render() {
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir}>
        <a class={{[CSS.previous]: true, [CSS.disabled]: this.selectedIndex <= 1}} title={this.textLabelPrevious} onClick={this.previousClicked}>
          <CalciteIcon size="16" path={chevronLeft16} />
        </a>
        {this.renderPage(this.start)}
        {this.renderLeftEllipsis()}
        {this.renderPages()}
        {this.renderRightEllipsis()}
        {this.renderPage(this.total)}
        <a class={{[CSS.next]: true, [CSS.disabled]: this.selectedIndex >= this.total}} title={this.textLabelNext} onClick={this.nextClicked}>
          <CalciteIcon size="16" path={chevronRight16} />
        </a>
      </Host>
    );
  }
}
