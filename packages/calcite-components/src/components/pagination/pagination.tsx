// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { breakpoints } from "../../utils/responsive";
import { getIconScale } from "../../utils/component";
import { useT9n } from "../../controllers/useT9n";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, ICONS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./pagination.scss";

declare global {
  interface DeclareElements {
    "calcite-pagination": Pagination;
  }
}

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

export class Pagination extends LitElement {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private resizeHandler = ({ contentRect: { width } }: ResizeObserverEntry): void =>
    this.setMaxItemsToBreakpoint(width);

  private resizeObserver = createObserver("resize", (entries) =>
    entries.forEach(this.resizeHandler),
  );

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() isXXSmall: boolean;

  @state() lastStartItem: number;

  @state() maxItems = maxItemBreakpoints.xxsmall;

  @state() totalPages: number;

  //#endregion

  //#region Public Properties

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @property({ reflect: true }) groupSeparator = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /** Specifies the number of items per page. */
  @property({ reflect: true }) pageSize = 20;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the starting item number. */
  @property({ reflect: true }) startItem = 1;

  /** Specifies the total number of items. */
  @property({ reflect: true }) totalItems = 1;

  //#endregion

  //#region Public Methods

  /**
   * Set a specified page as active.
   *
   * @param page
   */
  @method()
  async goTo(page: number | "start" | "end"): Promise<void> {
    switch (page) {
      case "start":
        this.startItem = 1;
        break;
      case "end":
        this.startItem = this.lastStartItem;
        break;
      default: {
        if (page >= Math.ceil(this.totalPages)) {
          this.startItem = this.lastStartItem;
        } else if (page <= 0) {
          this.startItem = 1;
        } else {
          this.startItem = (page - 1) * this.pageSize + 1;
        }
      }
    }
  }

  /** Go to the next page of results. */
  @method()
  async nextPage(): Promise<void> {
    this.startItem = Math.min(this.lastStartItem, this.startItem + this.pageSize);
  }

  /** Go to the previous page of results. */
  @method()
  async previousPage(): Promise<void> {
    this.startItem = Math.max(1, this.startItem - this.pageSize);
  }

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  //#endregion

  //#region Events

  /** Emits when the selected page changes. */
  calcitePaginationChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.resizeObserver?.observe(this.el);
  }

  async load(): Promise<void> {
    this.handleTotalPages();
    this.handleLastStartItemChange();
    this.handleIsXXSmall();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("totalItems") && (this.hasUpdated || this.totalItems !== 0)) ||
      (changes.has("pageSize") && (this.hasUpdated || this.pageSize !== 20))
    ) {
      this.handleTotalPages();
    }

    if (
      (changes.has("totalItems") && (this.hasUpdated || this.totalItems !== 0)) ||
      (changes.has("pageSize") && (this.hasUpdated || this.pageSize !== 20)) ||
      changes.has("totalPages")
    ) {
      this.handleLastStartItemChange();
    }

    if (
      changes.has("maxItems") &&
      (this.hasUpdated || this.maxItems !== maxItemBreakpoints.xxsmall)
    ) {
      this.handleIsXXSmall();
    }

    if (changes.has("messages")) {
      this.effectiveLocaleChange();
    }
  }

  loaded(): void {
    this.setMaxItemsToBreakpoint(this.el.clientWidth);
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private handleTotalPages(): void {
    if (this.pageSize < 1) {
      this.pageSize = 1;
    }
    this.totalPages = this.totalItems / this.pageSize;
  }

  private effectiveLocaleChange(): void {
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };
  }

  private handleLastStartItemChange(): void {
    const { totalItems, pageSize, totalPages } = this;

    const isStartNegative = totalItems - pageSize < 0;

    this.lastStartItem =
      (totalItems % pageSize === 0
        ? isStartNegative
          ? 0
          : totalItems - pageSize
        : Math.floor(totalPages) * pageSize) + 1;
  }

  private handleIsXXSmall(): void {
    this.isXXSmall = this.maxItems === maxItemBreakpoints.xxsmall;
  }

  private setMaxItemsToBreakpoint(width: number): void {
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

  private firstClicked(): void {
    this.startItem = 1;
    this.emitUpdate();
  }

  private lastClicked(): void {
    this.startItem = this.lastStartItem;
    this.emitUpdate();
  }

  private async previousClicked(): Promise<void> {
    await this.previousPage();
    this.emitUpdate();
  }

  private async nextClicked(): Promise<void> {
    await this.nextPage();
    this.emitUpdate();
  }

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

  private handlePageClick(event: Event) {
    const target = event.target as HTMLButtonElement;
    this.startItem = parseInt(target.value);
    this.emitUpdate();
  }

  //#endregion

  //#region Rendering

  private renderEllipsis(type: "start" | "end"): JsxNode {
    return (
      <span class={CSS.ellipsis} data-test-ellipsis={type} key={type}>
        &hellip;
      </span>
    );
  }

  private renderItems(): JsxNode {
    const { totalItems, pageSize, startItem, maxItems, totalPages, lastStartItem, isXXSmall } =
      this;

    const items: JsxNode[] = [];

    if (isXXSmall) {
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

  private renderPage(start: number): JsxNode {
    const { pageSize } = this;
    const page = Math.floor(start / pageSize) + (pageSize === 1 ? 0 : 1);

    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    const displayedPage = numberStringFormatter.localize(page.toString());
    const selected = start === this.startItem;

    return (
      <li class={CSS.listItem}>
        <button
          ariaCurrent={selected ? "page" : "false"}
          class={{
            [CSS.page]: true,
            [CSS.selected]: selected,
          }}
          onClick={this.handlePageClick}
          value={start}
        >
          {displayedPage}
        </button>
      </li>
    );
  }

  private renderPreviousChevron(): JsxNode {
    const { pageSize, startItem, messages } = this;

    const disabled = pageSize === 1 ? startItem <= pageSize : startItem < pageSize;

    return (
      <button
        ariaLabel={messages.previous}
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

  private renderNextChevron(): JsxNode {
    const { totalItems, pageSize, startItem, messages } = this;

    const disabled =
      pageSize === 1 ? startItem + pageSize > totalItems : startItem + pageSize > totalItems;

    return (
      <button
        ariaLabel={messages.next}
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

  private renderFirstChevron(): JsxNode {
    const { messages, startItem, isXXSmall } = this;

    const disabled = startItem === 1;

    return isXXSmall ? (
      <button
        ariaLabel={messages.first}
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

  private renderLastChevron(): JsxNode {
    const { messages, startItem, isXXSmall, lastStartItem } = this;

    const disabled = startItem === lastStartItem;

    return isXXSmall ? (
      <button
        ariaLabel={messages.last}
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

  override render(): JsxNode {
    const firstChevron = this.renderFirstChevron();
    const lastChevron = this.renderLastChevron();

    return (
      <ul class={CSS.list}>
        <li
          class={{
            [CSS.listItem]: true,
            [CSS.hiddenItem]: !firstChevron,
          }}
        >
          {firstChevron}
        </li>
        <li class={CSS.listItem}>{this.renderPreviousChevron()}</li>
        {this.renderItems()}
        <li class={CSS.listItem}>{this.renderNextChevron()}</li>
        <li
          class={{
            [CSS.listItem]: true,
            [CSS.hiddenItem]: !lastChevron,
          }}
        >
          {lastChevron}
        </li>
      </ul>
    );
  }

  //#endregion
}
