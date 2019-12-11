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
import { chevronLeft16, chevronRight16 } from "@esri/calcite-ui-icons";
import CalciteIcon from "../../utils/CalciteIcon";

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
    this.selectedIndex = Math.max(this.total, this.selectedIndex + 1);
  }

  @Method()
  async previousPage(): Promise<void> {
    this.selectedIndex = Math.min(1, this.selectedIndex - 1);
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

  renderPage(num) {
    return (
      <a class={{[CSS.page]:true, [CSS.selected]: (num === this.selectedIndex) }} onClick={() => {
        this.selectedIndex = num;
      }}>{num}</a>
    );
  }

  renderPages() {
    let pages = [];
    let currentNum = this.start;
    while (currentNum <= this.total) {
      pages.push(this.renderPage(currentNum));
      currentNum ++;
    }
    return pages;
  }

  render() {
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir}>
        <a class={{[CSS.previous]: true, [CSS.disabled]: this.selectedIndex <= 1}} title={this.textLabelPrevious} onClick={this.previousClicked}>
          <CalciteIcon size="16" path={chevronLeft16} />
        </a>
        {this.renderPages()}
        <a class={{[CSS.next]: true, [CSS.disabled]: this.selectedIndex >= this.total}} title={this.textLabelNext} onClick={this.nextClicked}>
          <CalciteIcon size="16" path={chevronRight16} />
        </a>
      </Host>
    );
  }
}
