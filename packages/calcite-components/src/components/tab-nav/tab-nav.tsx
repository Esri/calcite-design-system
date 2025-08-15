// @ts-strict-ignore
import {
  calciteSize24,
  calciteSize32,
  calciteSize44,
} from "@esri/calcite-design-tokens/dist/es6/core";
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode } from "@arcgis/lumina";
import {
  Direction,
  filterDirectChildren,
  focusElementInGroup,
  FocusElementInGroupDestination,
  getElementDir,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";
import { TabChangeEventDetail, TabCloseEventDetail } from "../tab/interfaces";
import { TabID, TabLayout, TabPosition } from "../tabs/interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import type { TabTitle } from "../tab-title/tab-title";
import type { Tabs } from "../tabs/tabs";
import { CSS, ICON } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./tab-nav.scss";

declare global {
  interface DeclareElements {
    "calcite-tab-nav": TabNav;
  }
}

/** @slot - A slot for adding `calcite-tab-title`s. */
export class TabNav extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private effectiveDir: Direction = "ltr";

  private intersectionObserver: IntersectionObserver;

  private lastScrollWheelAxis: "x" | "y" = "x";

  private parentTabsEl: Tabs["el"];

  private resizeObserver = createObserver("resize", () => {
    this.updateScrollingState();
  });

  private tabTitleContainerEl: HTMLDivElement;

  private makeFirstVisibleTabClosable = false;

  /**
   * Made into a prop for testing purposes only.
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  //#endregion

  //#region State Properties

  @state() private hasOverflowingEndTabTitle = false;

  @state() private hasOverflowingStartTabTitle = false;

  @state() selectedTabId: TabID;

  //#endregion

  //#region Public Properties

  /** @private */
  @property({ reflect: true }) bordered = false;

  /** @private */
  @property({ reflect: true }) layout: TabLayout = "inline";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the position of `calcite-tab-nav` and `calcite-tab-title` components in relation to, and is inherited from the parent `calcite-tabs`, defaults to `top`.
   *
   *  `@internal`
   */
  @property() position: TabPosition = "bottom";

  /**
   * Specifies the size of the component inherited from the parent `calcite-tabs`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /**
   * Specifies the component's selected `calcite-tab-title`.
   *
   * @readonly
   */
  @property() selectedTitle: TabTitle["el"] = null;

  /** Specifies the name when saving selected `calcite-tab` data to `localStorage`. */
  @property({ reflect: true }) storageId: string;

  /** Specifies text to update multiple components to keep in sync if one changes. */
  @property({ reflect: true }) syncId: string;

  //#endregion

  //#region Events

  /** @private */
  calciteInternalTabChange = createEvent<TabChangeEventDetail>({ cancelable: false });

  /** @private */
  calciteInternalTabNavSlotChange = createEvent<Element[]>();

  /** Emits when the selected `calcite-tab` changes. */
  calciteTabChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalTabsFocusPrevious", this.focusPreviousTabHandler);
    this.listen("calciteInternalTabsFocusNext", this.focusNextTabHandler);
    this.listen("calciteInternalTabsFocusFirst", this.focusFirstTabHandler);
    this.listen("calciteInternalTabsFocusLast", this.focusLastTabHandler);
    this.listen("calciteInternalTabsActivate", this.internalActivateTabHandler);
    this.listen("calciteInternalTabsClose", this.internalCloseTabHandler);
    this.listen("calciteInternalTabTitleRegister", this.updateTabTitles);
    this.listenOn<CustomEvent<TabChangeEventDetail>>(
      document.body,
      "calciteInternalTabChange",
      this.globalInternalTabChangeHandler,
    );
  }

  override connectedCallback(): void {
    this.parentTabsEl = this.el.closest("calcite-tabs");
    this.resizeObserver?.observe(this.el);
  }

  async load(): Promise<void> {
    const storageKey = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
      const storedTab = JSON.parse(localStorage.getItem(storageKey));
      this.selectedTabId = storedTab;
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selectedTitle") && (this.hasUpdated || this.selectedTitle !== null)) {
      this.calciteInternalTabChange.emit({
        tab: this.selectedTabId,
      });
    }

    if (changes.has("selectedTabId")) {
      this.selectedTabIdChanged();
    }

    const { parentTabsEl } = this;

    this.layout = parentTabsEl?.layout;
    this.bordered = parentTabsEl?.bordered;
    this.effectiveDir = getElementDir(this.el);
  }

  loaded(): void {
    this.scrollTabTitleIntoView(this.selectedTitle, "instant");

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

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  get enabledTabTitles(): TabTitle["el"][] {
    return filterDirectChildren<TabTitle["el"]>(
      this.el,
      "calcite-tab-title:not([disabled])",
    ).filter((tabTitle) => !tabTitle.closed);
  }

  private get scrollerButtonWidth(): number {
    const { scale } = this;
    return parseInt(scale === "s" ? calciteSize24 : scale === "m" ? calciteSize32 : calciteSize44);
  }

  get tabTitles(): TabTitle["el"][] {
    return filterDirectChildren<TabTitle["el"]>(this.el, "calcite-tab-title");
  }

  private focusPreviousTabHandler(event: CustomEvent): void {
    this.handleTabFocus(event, event.target as TabTitle["el"], "previous");
  }

  private focusNextTabHandler(event: CustomEvent): void {
    this.handleTabFocus(event, event.target as TabTitle["el"], "next");
  }

  private focusFirstTabHandler(event: CustomEvent): void {
    this.handleTabFocus(event, event.target as TabTitle["el"], "first");
  }

  private focusLastTabHandler(event: CustomEvent): void {
    this.handleTabFocus(event, event.target as TabTitle["el"], "last");
  }

  private internalActivateTabHandler(event: CustomEvent<TabChangeEventDetail>): void {
    const activatedTabTitle = event.target as TabTitle["el"];
    const currentSelectedTabTitle = this.selectedTitle;

    this.selectedTabId = event.detail.tab
      ? event.detail.tab
      : this.getIndexOfTabTitle(activatedTabTitle);
    event.stopPropagation();

    this.selectedTitle = activatedTabTitle;
    if (currentSelectedTabTitle?.id !== activatedTabTitle.id && event.detail.userTriggered) {
      this.calciteTabChange.emit();
    }
    this.scrollTabTitleIntoView(activatedTabTitle);
  }

  private scrollTabTitleIntoView(
    activatedTabTitle: TabTitle["el"],
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

  private internalCloseTabHandler(event: CustomEvent<TabCloseEventDetail>): void {
    const closedTabTitleEl = event.target as TabTitle["el"];
    this.handleTabTitleClose(closedTabTitleEl);
    event.stopPropagation();
  }

  /**
   * Check for active tabs on register and update selected
   *
   * @param event
   */
  private async updateTabTitles(event: CustomEvent<TabID>): Promise<void> {
    if ((event.target as TabTitle["el"]).selected) {
      this.selectedTabId = event.detail;
      this.selectedTitle = await this.getTabTitleById(this.selectedTabId);
    }
  }

  private globalInternalTabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void {
    if (
      this.syncId &&
      event.target !== this.el &&
      (event.target as TabNav["el"]).syncId === this.syncId &&
      this.selectedTabId !== event.detail.tab
    ) {
      this.selectedTabId = event.detail.tab;
    }
    event.stopPropagation();
  }

  private async selectedTabIdChanged(): Promise<void> {
    await this.componentOnReady();

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

  private onTabTitleWheel(event: WheelEvent): void {
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
  }

  private onSlotChange(): void {
    this.intersectionObserver?.disconnect();

    const tabTitles = this.tabTitles;
    tabTitles.forEach((child) => {
      this.intersectionObserver?.observe(child);
    });
    const visibleTabTitlesIndices = this.getVisibleTabTitlesIndices(tabTitles);
    const totalVisibleTabTitles = visibleTabTitlesIndices.length;
    if (totalVisibleTabTitles > 1 && this.makeFirstVisibleTabClosable) {
      tabTitles[visibleTabTitlesIndices[0]].closable = true;
      this.makeFirstVisibleTabClosable = false;
    }

    this.calciteInternalTabNavSlotChange.emit(tabTitles);
  }

  private storeTabTitleWrapperRef(el: HTMLDivElement) {
    if (!el) {
      return;
    }

    this.tabTitleContainerEl = el;
    this.intersectionObserver = createObserver("intersection", () => this.updateScrollingState(), {
      root: el,
      threshold: [0, 0.5, 1],
    });
  }

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

  private scrollToTabTitles(direction: "forward" | "backward"): void {
    requestAnimationFrame(() => {
      const tabTitleContainer = this.tabTitleContainerEl;
      const containerBounds = tabTitleContainer.getBoundingClientRect();
      const tabTitles = Array.from(this.el.querySelectorAll("calcite-tab-title"));
      const { effectiveDir } = this;

      if (direction === "forward") {
        tabTitles.reverse();
      }

      let closestToEdge: TabTitle["el"] = null;

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
  }

  private scrollToNextTabTitles(): void {
    this.scrollToTabTitles("forward");
  }

  private scrollToPreviousTabTitles(): void {
    this.scrollToTabTitles("backward");
  }

  private handleTabFocus(
    event: CustomEvent,
    el: TabTitle["el"],
    destination: FocusElementInGroupDestination,
  ): void {
    const focused = focusElementInGroup<TabTitle["el"]>(this.enabledTabTitles, el, destination);
    this.scrollTabTitleIntoView(focused, "instant");

    event.stopPropagation();
  }

  private getIndexOfTabTitle(el: TabTitle["el"], tabTitles = this.tabTitles): number {
    // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
    // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
    return tabTitles.indexOf(el);
  }

  private onTabTitleScroll(): void {
    this.updateScrollingState();
  }

  private async getTabTitleById(id: TabID): Promise<TabTitle["el"] | null> {
    return Promise.all(this.tabTitles.map((el) => el.getTabIdentifier())).then((ids) => {
      return this.tabTitles[ids.indexOf(id)];
    });
  }

  private getVisibleTabTitlesIndices(tabTitles: TabTitle["el"][]): number[] {
    return tabTitles.reduce(
      (tabTitleIndices: number[], tabTitle, index) =>
        !tabTitle.closed ? [...tabTitleIndices, index] : tabTitleIndices,
      [],
    );
  }

  private handleTabTitleClose(closedTabTitleEl: TabTitle["el"]): void {
    const { tabTitles } = this;
    const selectionModified = closedTabTitleEl.selected;

    const visibleTabTitlesIndices = this.getVisibleTabTitlesIndices(tabTitles);
    const totalVisibleTabTitles = visibleTabTitlesIndices.length;

    if (totalVisibleTabTitles === 1 && tabTitles[visibleTabTitlesIndices[0]].closable) {
      this.makeFirstVisibleTabClosable = true;
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

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "tablist";
    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerHasStartTabTitleOverflow]: !!this.hasOverflowingStartTabTitle,
          [CSS.containerHasEndTabTitleOverflow]: !!this.hasOverflowingEndTabTitle,
          [CSS.scale(this.scale)]: true,
          [CSS.position(this.position)]: true,
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
          <slot onSlotChange={this.onSlotChange} />
        </div>
        {this.renderScrollButton("end")}
      </div>
    );
  }

  private renderScrollButton(overflowDirection: "start" | "end"): JsxNode {
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
          ariaLabel={isEnd ? messages.nextTabTitles : messages.previousTabTitles}
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
  }

  //#endregion
}
