import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  calciteSize24,
  calciteSize32,
  calciteSize44,
} from "@esri/calcite-design-tokens/dist/es6/core";
import {
  Direction,
  filterDirectChildren,
  focusElementInGroup,
  FocusElementInGroupDestination,
  getElementDir,
  slotChangeGetAssignedElements,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";
import { TabChangeEventDetail, TabCloseEventDetail } from "../tab/interfaces";
import { TabID, TabLayout, TabPosition } from "../tabs/interfaces";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { CSS_UTILITY } from "../../utils/resources";
import { CSS, ICON } from "./resources";
import { TabNavMessages } from "./assets/tab-nav/t9n";

/**
 * @slot - A slot for adding `calcite-tab-title`s.
 */
@Component({
  tag: "calcite-tab-nav",
  styleUrl: "tab-nav.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class TabNav implements LocalizedComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Specifies the name when saving selected `calcite-tab` data to `localStorage`.
   */
  @Prop({ reflect: true }) storageId: string;

  /**
   * Specifies text to update multiple components to keep in sync if one changes.
   */
  @Prop({ reflect: true }) syncId: string;

  /**
   * Specifies the component's selected `calcite-tab-title`.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedTitle: HTMLCalciteTabTitleElement = null;

  @Watch("selectedTitle")
  selectedTitleChanged(): void {
    this.calciteInternalTabChange.emit({
      tab: this.selectedTabId,
    });
  }

  /**
   * Specifies the size of the component inherited from the parent `calcite-tabs`, defaults to `m`.
   *
   * @internal
   */
  @Prop() scale: Scale = "m";

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) layout: TabLayout = "inline";

  /**
   * Specifies the position of `calcite-tab-nav` and `calcite-tab-title` components in relation to, and is inherited from the parent `calcite-tabs`, defaults to `top`.
   *
   *  @internal
   */
  @Prop() position: TabPosition = "bottom";

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) bordered = false;

  /**
   * Made into a prop for testing purposes only.
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TabNavMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TabNavMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.parentTabsEl = this.el.closest("calcite-tabs");
    this.resizeObserver?.observe(this.el);
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    const storageKey = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
      const storedTab = JSON.parse(localStorage.getItem(storageKey));
      this.selectedTabId = storedTab;
    }
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    this.scrollTabTitleIntoView(this.selectedTitle, "instant");
  }

  componentWillRender(): void {
    const { parentTabsEl } = this;

    this.layout = parentTabsEl?.layout;
    this.bordered = parentTabsEl?.bordered;
    this.effectiveDir = getElementDir(this.el);
  }

  componentDidRender(): void {
    // if every tab title is active select the first tab.
    if (
      this.tabTitles.length &&
      this.tabTitles.every((title) => !title.selected) &&
      !this.selectedTabId
    ) {
      this.tabTitles[0].getTabIdentifier().then((tab) => {
        this.calciteInternalTabChange.emit({
          tab,
        });
      });
    }
  }

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host role="tablist">
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerHasStartTabTitleOverflow]: !!this.hasOverflowingStartTabTitle,
            [CSS.containerHasEndTabTitleOverflow]: !!this.hasOverflowingEndTabTitle,
            [`scale-${this.scale}`]: true,
            [`position-${this.position}`]: true,
            [CSS_UTILITY.rtl]: this.effectiveDir === "rtl",
          }}
        >
          {this.renderScrollButton("start")}
          <div
            class={{
              [CSS.tabTitleSlotWrapper]: true,
            }}
            onScroll={this.onTabTitleScroll}
            onWheel={this.onTabTitleWheel}
            ref={this.storeTabTitleWrapperRef}
          >
            <slot onSlotchange={this.onSlotChange} />
          </div>
          {this.renderScrollButton("end")}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalTabsFocusPrevious")
  focusPreviousTabHandler(event: CustomEvent): void {
    this.handleTabFocus(event, event.target as HTMLCalciteTabTitleElement, "previous");
  }

  @Listen("calciteInternalTabsFocusNext")
  focusNextTabHandler(event: CustomEvent): void {
    this.handleTabFocus(event, event.target as HTMLCalciteTabTitleElement, "next");
  }

  @Listen("calciteInternalTabsFocusFirst")
  focusFirstTabHandler(event: CustomEvent): void {
    this.handleTabFocus(event, event.target as HTMLCalciteTabTitleElement, "first");
  }

  @Listen("calciteInternalTabsFocusLast")
  focusLastTabHandler(event: CustomEvent): void {
    this.handleTabFocus(event, event.target as HTMLCalciteTabTitleElement, "last");
  }

  @Listen("calciteInternalTabsActivate")
  internalActivateTabHandler(event: CustomEvent<TabChangeEventDetail>): void {
    const activatedTabTitle = event.target as HTMLCalciteTabTitleElement;

    this.selectedTabId = event.detail.tab
      ? event.detail.tab
      : this.getIndexOfTabTitle(activatedTabTitle);
    event.stopPropagation();

    this.selectedTitle = activatedTabTitle;
    this.scrollTabTitleIntoView(activatedTabTitle);
  }

  private scrollTabTitleIntoView(
    activatedTabTitle: HTMLCalciteTabTitleElement,
    behavior: ScrollBehavior = "smooth",
  ): void {
    if (!activatedTabTitle) {
      return;
    }

    requestAnimationFrame(() => {
      const isLTR = this.effectiveDir === "ltr";
      const tabTitleContainer = this.tabTitleContainerEl;
      const containerBounds = tabTitleContainer.getBoundingClientRect();
      const tabTitleBounds = activatedTabTitle.getBoundingClientRect();
      const scrollPosition = tabTitleContainer.scrollLeft;
      const overflowingStartTabTitle = isLTR
        ? this.hasOverflowingStartTabTitle
        : this.hasOverflowingEndTabTitle;
      const overflowingEndTabTitle = isLTR
        ? this.hasOverflowingEndTabTitle
        : this.hasOverflowingStartTabTitle;

      if (
        tabTitleBounds.left <
        containerBounds.left + (overflowingStartTabTitle ? this.scrollerButtonWidth : 0)
      ) {
        const left =
          scrollPosition + (tabTitleBounds.left - containerBounds.left) - this.scrollerButtonWidth;
        tabTitleContainer.scrollTo({ left, behavior });
      } else if (
        tabTitleBounds.right >
        containerBounds.right - (overflowingEndTabTitle ? this.scrollerButtonWidth : 0)
      ) {
        const left =
          scrollPosition +
          (tabTitleBounds.right - containerBounds.right) +
          this.scrollerButtonWidth;
        tabTitleContainer.scrollTo({ left, behavior });
      }
    });
  }

  @Listen("calciteTabsActivate")
  activateTabHandler(event: CustomEvent<void>): void {
    this.calciteTabChange.emit();
    event.stopPropagation();
  }

  @Listen("calciteInternalTabsClose")
  internalCloseTabHandler(event: CustomEvent<TabCloseEventDetail>): void {
    const closedTabTitleEl = event.target as HTMLCalciteTabTitleElement;
    this.handleTabTitleClose(closedTabTitleEl);
    event.stopPropagation();
  }

  /**
   * Check for active tabs on register and update selected
   *
   * @param event
   */
  @Listen("calciteInternalTabTitleRegister")
  async updateTabTitles(event: CustomEvent<TabID>): Promise<void> {
    if ((event.target as HTMLCalciteTabTitleElement).selected) {
      this.selectedTabId = event.detail;
      this.selectedTitle = await this.getTabTitleById(this.selectedTabId);
    }
  }

  @Listen("calciteInternalTabChange", { target: "body" })
  globalInternalTabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void {
    if (
      this.syncId &&
      event.target !== this.el &&
      (event.target as HTMLCalciteTabNavElement).syncId === this.syncId &&
      this.selectedTabId !== event.detail.tab
    ) {
      this.selectedTabId = event.detail.tab;
    }
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits when the selected `calcite-tab` changes.
   */
  @Event({ cancelable: false }) calciteTabChange: EventEmitter<void>;

  /**
   * @internal
   */
  @Event() calciteInternalTabNavSlotChange: EventEmitter<Element[]>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTabChange: EventEmitter<TabChangeEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTabNavElement;

  @State() defaultMessages: TabNavMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() private hasOverflowingStartTabTitle = false;

  @State() private hasOverflowingEndTabTitle = false;

  @State() private selectedTabId: TabID;

  @Watch("selectedTabId")
  async selectedTabIdChanged(): Promise<void> {
    if (
      localStorage &&
      this.storageId &&
      this.selectedTabId !== undefined &&
      this.selectedTabId !== null
    ) {
      localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTabId));
    }

    this.calciteInternalTabChange.emit({
      tab: this.selectedTabId,
    });
  }

  private effectiveDir: Direction = "ltr";

  private lastScrollWheelAxis: "x" | "y" = "x";

  private parentTabsEl: HTMLCalciteTabsElement;

  private tabTitleContainerEl: HTMLDivElement;

  private intersectionObserver: IntersectionObserver;

  private resizeObserver = createObserver("resize", () => {
    this.updateScrollingState();
  });

  private get scrollerButtonWidth(): number {
    const { scale } = this;
    return parseInt(scale === "s" ? calciteSize24 : scale === "m" ? calciteSize32 : calciteSize44);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private onTabTitleWheel = (event: WheelEvent): void => {
    event.preventDefault();

    const { deltaX, deltaY } = event;
    const x = Math.abs(deltaX);
    const y = Math.abs(deltaY);

    let scrollBy: number;

    if (x === y) {
      scrollBy = this.lastScrollWheelAxis === "x" ? deltaX : deltaY;
    } else if (x > y) {
      scrollBy = deltaX;
      this.lastScrollWheelAxis = "x";
    } else {
      scrollBy = deltaY;
      this.lastScrollWheelAxis = "y";
    }

    const scrollByX = (this.effectiveDir === "rtl" ? -1 : 1) * scrollBy;
    (event.currentTarget as HTMLDivElement).scrollBy(scrollByX, 0);
  };

  private onSlotChange = (event: Event): void => {
    this.intersectionObserver?.disconnect();

    const slottedElements = slotChangeGetAssignedElements(event, "calcite-tab-title");
    slottedElements.forEach((child) => {
      this.intersectionObserver?.observe(child);
    });
    this.calciteInternalTabNavSlotChange.emit(slottedElements);
  };

  private storeTabTitleWrapperRef = (el: HTMLDivElement) => {
    this.tabTitleContainerEl = el;
    this.intersectionObserver = createObserver("intersection", () => this.updateScrollingState(), {
      root: el,
      threshold: [0, 0.5, 1],
    });
  };

  private updateScrollingState(): void {
    const tabTitleContainer = this.tabTitleContainerEl;

    if (!tabTitleContainer) {
      return;
    }

    let isOverflowStart: boolean;
    let isOverflowEnd: boolean;

    const scrollPosition = tabTitleContainer.scrollLeft;
    const visibleWidth = tabTitleContainer.clientWidth;
    const totalContentWidth = tabTitleContainer.scrollWidth;

    if (this.effectiveDir === "ltr") {
      isOverflowStart = scrollPosition > 0;
      isOverflowEnd = scrollPosition + visibleWidth < totalContentWidth;
    } else {
      isOverflowStart = scrollPosition < 0;
      isOverflowEnd = scrollPosition !== -(totalContentWidth - visibleWidth);
    }

    this.hasOverflowingStartTabTitle = isOverflowStart;
    this.hasOverflowingEndTabTitle = isOverflowEnd;
  }

  private scrollToTabTitles = (direction: "forward" | "backward"): void => {
    requestAnimationFrame(() => {
      const tabTitleContainer = this.tabTitleContainerEl;
      const containerBounds = tabTitleContainer.getBoundingClientRect();
      const tabTitles = Array.from(this.el.querySelectorAll("calcite-tab-title"));
      const { effectiveDir } = this;

      if (direction === "forward") {
        tabTitles.reverse();
      }

      let closestToEdge: HTMLCalciteTabTitleElement = null;

      tabTitles.forEach((tabTitle) => {
        const tabTitleBounds = tabTitle.getBoundingClientRect();
        const containerEndX = containerBounds.x + containerBounds.width;
        const tabTitleEndX = tabTitleBounds.x + tabTitleBounds.width;

        if (
          (direction === "forward" && effectiveDir === "ltr") ||
          (direction === "backward" && effectiveDir === "rtl")
        ) {
          const afterContainerEnd = tabTitleBounds.x > containerEndX;

          if (afterContainerEnd) {
            closestToEdge = tabTitle;
          } else {
            const crossingContainerEnd =
              tabTitleEndX > containerEndX && tabTitleBounds.x > containerBounds.x;

            if (crossingContainerEnd) {
              closestToEdge = tabTitle;
            }
          }
        } else {
          const beforeContainerStart = tabTitleEndX < containerBounds.x;

          if (beforeContainerStart) {
            closestToEdge = tabTitle;
          } else {
            const crossingContainerStart =
              tabTitleEndX < containerEndX && tabTitleBounds.x < containerBounds.x;

            if (crossingContainerStart) {
              closestToEdge = tabTitle;
            }
          }
        }
      });

      if (closestToEdge) {
        const { scrollerButtonWidth } = this;
        const offsetAdjustment =
          (direction === "forward" && effectiveDir === "ltr") ||
          (direction === "backward" && effectiveDir === "rtl")
            ? -scrollerButtonWidth
            : closestToEdge.offsetWidth - tabTitleContainer.clientWidth + scrollerButtonWidth;
        const scrollTo = closestToEdge.offsetLeft + offsetAdjustment;

        tabTitleContainer.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });
      }
    });
  };

  private scrollToNextTabTitles = (): void => this.scrollToTabTitles("forward");

  private scrollToPreviousTabTitles = (): void => this.scrollToTabTitles("backward");

  handleTabFocus = (
    event: CustomEvent,
    el: HTMLCalciteTabTitleElement,
    destination: FocusElementInGroupDestination,
  ): void => {
    const focused = focusElementInGroup<HTMLCalciteTabTitleElement>(
      this.enabledTabTitles,
      el,
      destination,
    );
    this.scrollTabTitleIntoView(focused, "instant");

    event.stopPropagation();
  };

  getIndexOfTabTitle(el: HTMLCalciteTabTitleElement, tabTitles = this.tabTitles): number {
    // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
    // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
    return tabTitles.indexOf(el);
  }

  private onTabTitleScroll = (): void => {
    this.updateScrollingState();
  };

  async getTabTitleById(id: TabID): Promise<HTMLCalciteTabTitleElement | null> {
    return Promise.all(this.tabTitles.map((el) => el.getTabIdentifier())).then((ids) => {
      return this.tabTitles[ids.indexOf(id)];
    });
  }

  get tabTitles(): HTMLCalciteTabTitleElement[] {
    return filterDirectChildren<HTMLCalciteTabTitleElement>(this.el, "calcite-tab-title");
  }

  get enabledTabTitles(): HTMLCalciteTabTitleElement[] {
    return filterDirectChildren<HTMLCalciteTabTitleElement>(
      this.el,
      "calcite-tab-title:not([disabled])",
    ).filter((tabTitle) => !tabTitle.closed);
  }

  private handleTabTitleClose(closedTabTitleEl: HTMLCalciteTabTitleElement): void {
    const { tabTitles } = this;
    const selectionModified = closedTabTitleEl.selected;

    const visibleTabTitlesIndices = tabTitles.reduce(
      (tabTitleIndices: number[], tabTitle, index) =>
        !tabTitle.closed ? [...tabTitleIndices, index] : tabTitleIndices,
      [],
    );
    const totalVisibleTabTitles = visibleTabTitlesIndices.length;

    if (totalVisibleTabTitles === 1 && tabTitles[visibleTabTitlesIndices[0]].closable) {
      tabTitles[visibleTabTitlesIndices[0]].closable = false;
      this.selectedTabId = visibleTabTitlesIndices[0];

      if (selectionModified) {
        tabTitles[visibleTabTitlesIndices[0]].activateTab();
      }
    } else if (totalVisibleTabTitles > 1) {
      const closedTabTitleIndex = tabTitles.findIndex((el) => el === closedTabTitleEl);

      const nextTabTitleIndex = visibleTabTitlesIndices.find(
        (value) => value > closedTabTitleIndex,
      );

      if (this.selectedTabId === closedTabTitleIndex) {
        this.selectedTabId = nextTabTitleIndex ? nextTabTitleIndex : totalVisibleTabTitles - 1;
        tabTitles[this.selectedTabId].activateTab();
      }
    }

    requestAnimationFrame(() => {
      tabTitles[this.selectedTabId].focus();
    });
  }

  private renderScrollButton = (overflowDirection: "start" | "end"): VNode => {
    const { bordered, messages, hasOverflowingStartTabTitle, hasOverflowingEndTabTitle, scale } =
      this;
    const isEnd = overflowDirection === "end";

    return (
      <div
        class={{
          [CSS.scrollButtonContainer]: true,
          [CSS.scrollBackwardContainerButton]: !isEnd,
          [CSS.scrollForwardContainerButton]: isEnd,
        }}
        hidden={(isEnd && !hasOverflowingEndTabTitle) || (!isEnd && !hasOverflowingStartTabTitle)}
        key={overflowDirection}
      >
        <calcite-button
          appearance={bordered ? "outline-fill" : "transparent"}
          aria-label={isEnd ? messages.nextTabTitles : messages.previousTabTitles}
          class={{
            [CSS.scrollButton]: true,
          }}
          iconFlipRtl="both"
          iconStart={isEnd ? ICON.chevronRight : ICON.chevronLeft}
          kind="neutral"
          onClick={isEnd ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles}
          scale={scale}
          tabIndex={-1}
        />
      </div>
    );
  };
}
