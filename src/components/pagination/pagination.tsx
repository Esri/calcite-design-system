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
  Watch
} from "@stencil/core";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter
} from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { Scale } from "../interfaces";
import { PaginationMessages } from "./assets/pagination/t9n";
import { CSS } from "./resources";

const maxPagesDisplayed = 5;
export interface PaginationDetail {
  start: number;
  totalItems: number;
  startItemIndex: number;
}

@Component({
  tag: "calcite-pagination",
  styleUrl: "pagination.scss",
  shadow: {
    delegatesFocus: true
  },
  assetsDirs: ["assets"]
})
export class Pagination implements LocalizedComponent, LocalizedComponent, T9nComponent {
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
  @Prop({ mutable: true, reflect: true }) startItemIndex = 1;

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
      useGrouping: this.groupSeparator
    };
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
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
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Go to the next page of results. */
  @Method()
  async nextPage(): Promise<void> {
    this.startItemIndex = Math.min(this.getLastStart(), this.startItemIndex + this.pageSize);
  }

  /** Go to the previous page of results. */
  @Method()
  async previousPage(): Promise<void> {
    this.startItemIndex = Math.max(1, this.startItemIndex - this.pageSize);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

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
    return Math.floor(this.startItemIndex / this.pageSize) > 3;
  }

  private showRightEllipsis() {
    return (this.totalItems - this.startItemIndex) / this.pageSize > 3;
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
    const lastStart = this.getLastStart();
    let end: number;
    let nextStart: number;

    // if we don't need ellipses render the whole set
    if (this.totalItems / this.pageSize <= maxPagesDisplayed) {
      nextStart = 1 + this.pageSize;
      end = lastStart - this.pageSize;
    } else {
      // if we're within max pages of page 1
      if (this.startItemIndex / this.pageSize < maxPagesDisplayed - 1) {
        nextStart = 1 + this.pageSize;
        end = 1 + 4 * this.pageSize;
      } else {
        // if we're within max pages of last page
        if (this.startItemIndex + 3 * this.pageSize >= this.totalItems) {
          nextStart = lastStart - 4 * this.pageSize;
          end = lastStart - this.pageSize;
        } else {
          nextStart = this.startItemIndex - this.pageSize;
          end = this.startItemIndex + this.pageSize;
        }
      }
    }

    const pages = [];
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
      useGrouping: this.groupSeparator
    };

    const displayedPage = numberStringFormatter.localize(page.toString());

    return (
      <button
        class={{
          [CSS.page]: true,
          [CSS.selected]: start === this.startItemIndex
        }}
        onClick={() => {
          this.startItemIndex = start;
          this.emitUpdate();
        }}
      >
        {displayedPage}
      </button>
    );
  }

  renderLeftEllipsis(): VNode {
    if (this.totalItems / this.pageSize > maxPagesDisplayed && this.showLeftEllipsis()) {
      return <span class={`${CSS.ellipsis} ${CSS.ellipsisStart}`}>&hellip;</span>;
    }
  }

  renderRightEllipsis(): VNode {
    if (this.totalItems / this.pageSize > maxPagesDisplayed && this.showRightEllipsis()) {
      return <span class={`${CSS.ellipsis} ${CSS.ellipsisEnd}`}>&hellip;</span>;
    }
  }

  render(): VNode {
    const { totalItems, pageSize, startItemIndex } = this;
    const prevDisabled = pageSize === 1 ? startItemIndex <= pageSize : startItemIndex < pageSize;
    const nextDisabled =
      pageSize === 1
        ? startItemIndex + pageSize > totalItems
        : startItemIndex + pageSize > totalItems;
    return (
      <Fragment>
        <button
          aria-label={this.messages.previous}
          class={{
            [CSS.previous]: true,
            [CSS.disabled]: prevDisabled
          }}
          disabled={prevDisabled}
          onClick={this.previousClicked}
        >
          <calcite-icon flipRtl icon="chevronLeft" scale="s" />
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
            [CSS.disabled]: nextDisabled
          }}
          disabled={nextDisabled}
          onClick={this.nextClicked}
        >
          <calcite-icon flipRtl icon="chevronRight" scale="s" />
        </button>
      </Fragment>
    );
  }
}
