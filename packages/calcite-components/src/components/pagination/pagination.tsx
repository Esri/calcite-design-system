import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Scale } from "../interfaces";
import { PaginationMessages } from "./assets/pagination/t9n";
import { CSS } from "./resources";
import { createObserver } from "../../utils/observers";
import { Breakpoints, getBreakpoints } from "../../utils/responsive";

export interface PaginationDetail {
  start: number;
  totalItems: number;
  startItem: number;
}

@Component({
  tag: "calcite-pagination",
  styleUrl: "pagination.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
})
export class Pagination
  implements LocalizedComponent, LocalizedComponent, LoadableComponent, T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, number values are displayed with a group separator corresponding to the language and country format.
   */
  @Prop({ reflect: true }) groupSeparator = false;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<PaginationMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /** Specifies the number of items per page. */
  @Prop({ reflect: true }) pageSize = 20;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  /** Specifies the starting item number. */
  @Prop({ mutable: true, reflect: true }) startItem = 1;

  /** Specifies the total number of items. */
  @Prop({ reflect: true }) totalItems = 0;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePaginationElement;

  @State() maxPagesDisplayed = 5;

  private resizeObserver = createObserver("resize", (entries) =>
    entries.forEach(this.resizeHandler)
  );

  private breakpoints: Breakpoints;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() defaultMessages: PaginationMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @Watch("effectiveLocale")
  effectiveLocaleWatcher(): void {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: PaginationMessages;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits when the selected page changes.
   */
  @Event({ cancelable: false }) calcitePaginationChange: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.resizeObserver?.observe(this.el);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
    this.breakpoints = await getBreakpoints();
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.resize(this.el.clientWidth);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.el.focus();
  }

  /** Go to the next page of results. */
  @Method()
  async nextPage(): Promise<void> {
    this.startItem = Math.min(this.getLastStart(), this.startItem + this.pageSize);
  }

  /** Go to the previous page of results. */
  @Method()
  async previousPage(): Promise<void> {
    this.startItem = Math.max(1, this.startItem - this.pageSize);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private resize(width: number): void {
    const { breakpoints } = this;

    if (!breakpoints || !width) {
      return;
    }

    this.maxPagesDisplayed = width < breakpoints.width.xsmall ? 3 : 5;
  }

  private resizeHandler = ({ contentRect: { width } }: ResizeObserverEntry): void => {
    this.resize(width);
  };

  private getLastStart(): number {
    const { totalItems, pageSize } = this;
    const lastStart =
      totalItems % pageSize === 0
        ? totalItems - pageSize
        : Math.floor(totalItems / pageSize) * pageSize;
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
    return Math.floor(this.startItem / this.pageSize) > this.maxPagesDisplayed - 2;
  }

  private showRightEllipsis() {
    const singleCenterPage = this.maxPagesDisplayed < 5;
    return (
      (this.totalItems - this.startItem) / this.pageSize >
      this.maxPagesDisplayed - (singleCenterPage ? 0 : 2)
    );
  }

  private emitUpdate() {
    this.calcitePaginationChange.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderPages(): VNode[] {
    const { maxPagesDisplayed } = this;
    const lastStart = this.getLastStart();
    let end: number;
    let nextStart: number;
    const singleCenterPage = maxPagesDisplayed < 5;

    // if we don't need ellipses render the whole set
    if (this.totalItems / this.pageSize <= maxPagesDisplayed) {
      nextStart = 1 + this.pageSize;
      end = lastStart - this.pageSize;
    } else {
      // if we're within max pages of page 1
      if (this.startItem / this.pageSize < maxPagesDisplayed - 1) {
        nextStart = 1 + this.pageSize;
        end = 1 + (maxPagesDisplayed - 1) * this.pageSize;
      } else {
        // if we're within max pages of last page
        if (this.startItem + 3 * this.pageSize >= this.totalItems) {
          nextStart = lastStart - (maxPagesDisplayed - 1) * this.pageSize;
          end = lastStart - this.pageSize;
        } else {
          nextStart = this.startItem - (singleCenterPage ? 0 : this.pageSize);
          end = this.startItem + (singleCenterPage ? 0 : this.pageSize);
        }
      }
    }

    const pages: number[] = [];

    while (nextStart <= end) {
      pages.push(nextStart);
      nextStart = nextStart + this.pageSize;
    }

    return pages.map((page) => this.renderPage(page));
  }

  renderPage(start: number): VNode {
    const page = Math.floor(start / this.pageSize) + (this.pageSize === 1 ? 0 : 1);
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    const displayedPage = numberStringFormatter.localize(page.toString());
    const selected = start === this.startItem;

    return (
      <button
        aria-current={selected ? "page" : "false"}
        class={{
          [CSS.page]: true,
          [CSS.selected]: selected,
        }}
        onClick={() => {
          this.startItem = start;
          this.emitUpdate();
        }}
      >
        {displayedPage}
      </button>
    );
  }

  renderLeftEllipsis(): VNode {
    if (this.totalItems / this.pageSize > this.maxPagesDisplayed && this.showLeftEllipsis()) {
      return <span class={`${CSS.ellipsis} ${CSS.ellipsisStart}`}>&hellip;</span>;
    }
  }

  renderRightEllipsis(): VNode {
    if (this.totalItems / this.pageSize > this.maxPagesDisplayed && this.showRightEllipsis()) {
      return <span class={`${CSS.ellipsis} ${CSS.ellipsisEnd}`}>&hellip;</span>;
    }
  }

  render(): VNode {
    const { totalItems, pageSize, startItem } = this;
    const prevDisabled = pageSize === 1 ? startItem <= pageSize : startItem < pageSize;
    const nextDisabled =
      pageSize === 1 ? startItem + pageSize > totalItems : startItem + pageSize > totalItems;
    return (
      <Fragment>
        <button
          aria-label={this.messages.previous}
          class={{
            [CSS.previous]: true,
            [CSS.disabled]: prevDisabled,
          }}
          disabled={prevDisabled}
          onClick={this.previousClicked}
        >
          <calcite-icon flipRtl icon="chevronLeft" scale={this.scale === "l" ? "m" : "s"} />
        </button>
        {totalItems > pageSize ? this.renderPage(1) : null}
        {this.renderLeftEllipsis()}
        {this.renderPages()}
        {this.renderRightEllipsis()}
        {this.renderPage(this.getLastStart())}
        <button
          aria-label={this.messages.next}
          class={{
            [CSS.next]: true,
            [CSS.disabled]: nextDisabled,
          }}
          disabled={nextDisabled}
          onClick={this.nextClicked}
        >
          <calcite-icon flipRtl icon="chevronRight" scale={this.scale === "l" ? "m" : "s"} />
        </button>
      </Fragment>
    );
  }
}
