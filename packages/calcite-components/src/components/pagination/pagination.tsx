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
import { CSS, ICONS } from "./resources";
import { createObserver } from "../../utils/observers";
import { Breakpoints, getBreakpoints } from "../../utils/responsive";
import { getIconScale } from "../../utils/component";

export interface PaginationDetail {
  start: number;
  totalItems: number;
  startItem: number;
}

const firstAndLastPageCount = 2;
const ellipsisCount = 2;

const maxItemBreakpoints = {
  large: 11,
  medium: 9,
  small: 7,
  xsmall: 5,
  xxsmall: 1,
};

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
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: PaginationMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<PaginationMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  /** Specifies the number of items per page. */
  @Prop({ mutable: true, reflect: true }) pageSize = 20;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the starting item number. */
  @Prop({ mutable: true, reflect: true }) startItem = 1;

  /** Specifies the total number of items. */
  @Prop({ reflect: true }) totalItems = 0;

  @Watch("totalItems")
  @Watch("pageSize")
  handleTotalPages(): void {
    if (this.pageSize < 1) {
      this.pageSize = 1;
    }
    this.totalPages = this.totalItems / this.pageSize;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePaginationElement;

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

  @State() maxItems = maxItemBreakpoints.xxsmall;

  @State() totalPages: number;

  @State() lastStartItem: number;

  @Watch("totalItems")
  @Watch("pageSize")
  @Watch("totalPages")
  handleLastStartItemChange(): void {
    const { totalItems, pageSize, totalPages } = this;

    this.lastStartItem =
      (totalItems % pageSize === 0 ? totalItems - pageSize : Math.floor(totalPages) * pageSize) + 1;
  }

  @State() isExtraExtraSmall: boolean;

  @Watch("maxItems")
  handleIsExtraExtraSmall(): void {
    this.isExtraExtraSmall = this.maxItems === maxItemBreakpoints.xxsmall;
  }

  private breakpoints: Breakpoints;

  private resizeObserver = createObserver("resize", (entries) =>
    entries.forEach(this.resizeHandler)
  );

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
    const [, breakpoints] = await Promise.all([setUpMessages(this), getBreakpoints()]);
    this.breakpoints = breakpoints;
    setUpLoadableComponent(this);
    this.handleTotalPages();
    this.handleLastStartItemChange();
    this.handleIsExtraExtraSmall();
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.setMaxItemsToBreakpoint(this.el.clientWidth);
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
    this.startItem = Math.min(this.lastStartItem, this.startItem + this.pageSize);
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

  private setMaxItemsToBreakpoint(width: number): void {
    const { breakpoints } = this;

    if (!breakpoints || !width) {
      return;
    }

    if (width >= breakpoints.width.medium) {
      this.maxItems = maxItemBreakpoints.large;
      return;
    }

    if (width >= breakpoints.width.small) {
      this.maxItems = maxItemBreakpoints.medium;
      return;
    }

    if (width >= breakpoints.width.xsmall) {
      this.maxItems = maxItemBreakpoints.small;
      return;
    }

    if (width >= breakpoints.width.xxsmall) {
      this.maxItems = maxItemBreakpoints.xsmall;
      return;
    }

    this.maxItems = maxItemBreakpoints.xxsmall;
  }

  private resizeHandler = ({ contentRect: { width } }: ResizeObserverEntry): void =>
    this.setMaxItemsToBreakpoint(width);

  private firstClicked = (): void => {
    this.startItem = 1;
    this.emitUpdate();
  };

  private lastClicked = (): void => {
    this.startItem = this.lastStartItem;
    this.emitUpdate();
  };

  private previousClicked = async (): Promise<void> => {
    await this.previousPage();
    this.emitUpdate();
  };

  private nextClicked = async (): Promise<void> => {
    await this.nextPage();
    this.emitUpdate();
  };

  private showStartEllipsis() {
    return (
      this.totalPages > this.maxItems &&
      Math.floor(this.startItem / this.pageSize) >
        this.maxItems - firstAndLastPageCount - ellipsisCount
    );
  }

  private showEndEllipsis() {
    return (
      this.totalPages > this.maxItems &&
      (this.totalItems - this.startItem) / this.pageSize >
        this.maxItems - firstAndLastPageCount - (ellipsisCount - 1)
    );
  }

  private emitUpdate() {
    this.calcitePaginationChange.emit();
  }

  private handlePageClick = (event: Event) => {
    const target = event.target as HTMLButtonElement;
    this.startItem = parseInt(target.value, 10);
    this.emitUpdate();
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderEllipsis(type: "start" | "end"): VNode {
    return (
      <span class={CSS.ellipsis} data-test-ellipsis={type} key={type}>
        &hellip;
      </span>
    );
  }

  renderItems(): VNode[] {
    const {
      totalItems,
      pageSize,
      startItem,
      maxItems,
      totalPages,
      lastStartItem,
      isExtraExtraSmall,
    } = this;

    const items: VNode[] = [];

    if (isExtraExtraSmall) {
      items.push(this.renderPage(startItem));
      return items;
    }

    const renderFirstPage = totalItems > pageSize;
    const renderStartEllipsis = this.showStartEllipsis();
    const renderEndEllipsis = this.showEndEllipsis();

    if (renderFirstPage) {
      items.push(this.renderPage(1));
    }

    if (renderStartEllipsis) {
      items.push(this.renderEllipsis("start"));
    }

    const remainingItems =
      maxItems -
      firstAndLastPageCount -
      (renderEndEllipsis ? 1 : 0) -
      (renderStartEllipsis ? 1 : 0);

    let end: number;
    let nextStart: number;

    // if we don't need ellipses render the whole set
    if (totalPages - 1 <= remainingItems) {
      nextStart = 1 + pageSize;
      end = lastStartItem - pageSize;
    } else {
      // if we're within max pages of page 1
      if (startItem / pageSize < remainingItems) {
        nextStart = 1 + pageSize;
        end = 1 + remainingItems * pageSize;
      } else {
        // if we're within max pages of last page
        if (startItem + remainingItems * pageSize >= totalItems) {
          nextStart = lastStartItem - remainingItems * pageSize;
          end = lastStartItem - pageSize;
        } else {
          // if we're within the center pages
          nextStart = startItem - pageSize * ((remainingItems - 1) / 2);
          end = startItem + pageSize * ((remainingItems - 1) / 2);
        }
      }
    }

    for (let i = 0; i < remainingItems && nextStart <= end; i++) {
      items.push(this.renderPage(nextStart));
      nextStart = nextStart + pageSize;
    }

    if (renderEndEllipsis) {
      items.push(this.renderEllipsis("end"));
    }

    items.push(this.renderPage(lastStartItem));

    return items;
  }

  renderPage(start: number): VNode {
    const { pageSize } = this;
    const page = Math.floor(start / pageSize) + (pageSize === 1 ? 0 : 1);

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
        onClick={this.handlePageClick}
        value={start}
      >
        {displayedPage}
      </button>
    );
  }

  renderPreviousChevron(): VNode {
    const { pageSize, startItem, messages } = this;

    const disabled = pageSize === 1 ? startItem <= pageSize : startItem < pageSize;

    return (
      <button
        aria-label={messages.previous}
        class={{
          [CSS.chevron]: true,
          [CSS.disabled]: disabled,
        }}
        data-test-chevron="previous"
        disabled={disabled}
        key="previous"
        onClick={this.previousClicked}
      >
        <calcite-icon flipRtl icon={ICONS.previous} scale={getIconScale(this.scale)} />
      </button>
    );
  }

  renderNextChevron(): VNode {
    const { totalItems, pageSize, startItem, messages } = this;

    const disabled =
      pageSize === 1 ? startItem + pageSize > totalItems : startItem + pageSize > totalItems;

    return (
      <button
        aria-label={messages.next}
        class={{
          [CSS.chevron]: true,
          [CSS.disabled]: disabled,
        }}
        data-test-chevron="next"
        disabled={disabled}
        key="next-button"
        onClick={this.nextClicked}
      >
        <calcite-icon flipRtl icon={ICONS.next} scale={getIconScale(this.scale)} />
      </button>
    );
  }

  renderFirstChevron(): VNode {
    const { messages, startItem, isExtraExtraSmall } = this;

    const disabled = startItem === 1;

    return isExtraExtraSmall ? (
      <button
        aria-label={messages.first}
        class={{
          [CSS.chevron]: true,
          [CSS.disabled]: disabled,
        }}
        disabled={disabled}
        key="first-button"
        onClick={this.firstClicked}
      >
        <calcite-icon flipRtl icon={ICONS.first} scale={getIconScale(this.scale)} />
      </button>
    ) : null;
  }

  renderLastChevron(): VNode {
    const { messages, startItem, isExtraExtraSmall, lastStartItem } = this;

    const disabled = startItem === lastStartItem;

    return isExtraExtraSmall ? (
      <button
        aria-label={messages.last}
        class={{
          [CSS.chevron]: true,
          [CSS.disabled]: disabled,
        }}
        disabled={disabled}
        key="last-button"
        onClick={this.lastClicked}
      >
        <calcite-icon flipRtl icon={ICONS.last} scale={getIconScale(this.scale)} />
      </button>
    ) : null;
  }

  render(): VNode {
    return (
      <Fragment>
        {this.renderFirstChevron()}
        {this.renderPreviousChevron()}
        {this.renderItems()}
        {this.renderNextChevron()}
        {this.renderLastChevron()}
      </Fragment>
    );
  }
}
