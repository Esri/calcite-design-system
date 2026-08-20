import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode, ToEvents } from "@arcgis/lumina";
import { useDirection } from "@arcgis/lumina/controllers";
import {
  Direction,
  filterDirectChildren,
  focusElement,
  focusElementInGroup,
  FocusElementInGroupDestination,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { Scale } from "../types";
import { TabChangeEventDetail, TabCloseEventDetail } from "../tab/types";
import { TabID, TabLayout, TabPosition } from "../tabs/types";
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

  private direction = useDirection();

  private effectiveDir: Direction = "ltr";

  private intersectionObserver?: IntersectionObserver;

  private lastScrollWheelAxis: "x" | "y" = "x";

  private parentTabsEl?: Tabs["el"];

  private resizeObserver = createObserver("resize", () => {
    this.updateScrollingState();
  });

  private tabTitleContainerEl?: HTMLDivElement;

  private firstVisibleTabMadeNonClosable?: TabTitle["el"];

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

  @state() private hasVisibleTabTitles = true;

  @state() selectedTabId?: TabID;

  //#endregion

  //#region Public Properties

  /** @private */
  @property({ reflect: true }) bordered = false;

  /** @private */
  @property({ reflect: true }) layout: TabLayout = "inline";

  /** @private */
  @property() lastTabClosable = false;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the position of `calcite-tab-nav` and `calcite-tab-title` components in relation to, and is inherited from the parent `calcite-tabs`, defaults to `top`.
   *
   *  @internal
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
  @property() selectedTitle: TabTitle["el"] | null = null;

  /** Specifies the name when saving selected `calcite-tab` data to `localStorage`. */
  @property({ reflect: true }) storageId?: string;

  /** Specifies text to update multiple components to keep in sync if one changes. */
  @property({ reflect: true }) syncId?: string;

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
    this.listen("calciteInternalTabTitleCloseChange", this.syncVisibleTabTitlesState);
    this.listen("calciteInternalTabTitleRegister", this.updateTabTitles);
    this.listen<ToEvents<TabTitle>["calciteInternalTabsActivate"]>(
      "calciteInternalTabsActivate",
      this.internalActivateTabHandler,
    );
    this.listen<ToEvents<TabTitle>["calciteInternalTabsClose"]>(
      "calciteInternalTabsClose",
      this.internalCloseTabHandler,
    );
    this.listenOn<CustomEvent<TabChangeEventDetail>>(
      document.body,
      "calciteInternalTabChange",
      this.globalInternalTabChangeHandler,
    );
  }

  override connectedCallback(): void {
    this.parentTabsEl = this.el.closest("calcite-tabs") ?? undefined;

    this.resizeObserver?.observe(this.el);
  }

  async load(): Promise<void> {
    const storageKey = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId) {
      const storageItem = localStorage.getItem(storageKey);
      if (storageItem) {
        const storedTab = JSON.parse(storageItem);
        this.selectedTabId = storedTab;
      }
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      changes.has("selectedTitle") &&
      (this.hasUpdated || this.selectedTitle !== null) &&
      this.selectedTabId !== undefined
    ) {
      this.calciteInternalTabChange.emit({
        tab: this.selectedTabId,
      });
    }

    if (changes.has("selectedTabId")) {
      this.selectedTabIdChanged();
    }

    if (changes.has("lastTabClosable") && this.hasUpdated) {
      this.updateLastVisibleTabClosable();
    }

    const { parentTabsEl } = this;

    if (parentTabsEl) {
      this.layout = parentTabsEl.layout;
      this.bordered = parentTabsEl.bordered;
    }

    this.effectiveDir = this.direction;
  }

  loaded(): void {
    this.scrollTabTitleIntoView(this.selectedTitle, "instant");

    // if every tab title is active select the first tab.
    if (
      this.tabTitles.length &&
      this.tabTitles.every((title) => !title.selected) &&
      this.selectedTabId === undefined
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
    activatedTabTitle: TabTitle["el"] | null,
    behavior: ScrollBehavior = "smooth",
  ): void {
    if (!activatedTabTitle) {
      return;
    }

    requestAnimationFrame(() => {
      const tabTitleContainer = this.tabTitleContainerEl;

      if (!tabTitleContainer) {
        return;
      }

      const containerBounds = tabTitleContainer.getBoundingClientRect();
      const tabTitleBounds = activatedTabTitle.getBoundingClientRect();
      const scrollPosition = tabTitleContainer.scrollLeft;

      const offsetLeft = tabTitleBounds.left - containerBounds.left;
      if (offsetLeft < 0) {
        const left = scrollPosition + offsetLeft;
        tabTitleContainer.scrollTo({ left, behavior });
      } else if (tabTitleBounds.right > containerBounds.right) {
        const left =
          scrollPosition + Math.min(tabTitleBounds.right - containerBounds.right, offsetLeft);
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

    this.syncVisibleTabTitlesState();
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

    if (this.selectedTabId === undefined) {
      return;
    }

    if (localStorage && this.storageId) {
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
    this.syncVisibleTabTitlesState();
  }

  private syncVisibleTabTitlesState(): void {
    this.updateLastVisibleTabClosable();
    this.hasVisibleTabTitles = this.getVisibleTabTitlesIndices(this.tabTitles).length > 0;
    this.calciteInternalTabNavSlotChange.emit([...this.tabTitles]);
  }

  private updateLastVisibleTabClosable(): void {
    const { tabTitles } = this;
    const visibleTabTitlesIndices = this.getVisibleTabTitlesIndices(tabTitles);
    const totalVisibleTabTitles = visibleTabTitlesIndices.length;

    if (totalVisibleTabTitles === 0) {
      return;
    }

    const firstVisibleTabTitle = tabTitles[visibleTabTitlesIndices[0]];
    const shouldDisableCloseButton = !this.lastTabClosable && totalVisibleTabTitles === 1;

    if (shouldDisableCloseButton) {
      if (firstVisibleTabTitle.closable) {
        this.firstVisibleTabMadeNonClosable = firstVisibleTabTitle;
        firstVisibleTabTitle.closable = false;
      }
      return;
    }

    if (this.firstVisibleTabMadeNonClosable && !this.firstVisibleTabMadeNonClosable.closed) {
      this.firstVisibleTabMadeNonClosable.closable = true;
    }

    this.firstVisibleTabMadeNonClosable = undefined;
  }

  private setTabTitleContainerEl(el: HTMLDivElement) {
    this.tabTitleContainerEl = el;
    this.intersectionObserver?.disconnect();
    if (el) {
      this.intersectionObserver = createObserver(
        "intersection",
        () => this.updateScrollingState(),
        {
          root: el,
          threshold: [0, 0.5, 1],
        },
      );
    }
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

      if (!tabTitleContainer) {
        return;
      }

      const containerBounds = tabTitleContainer.getBoundingClientRect();
      const { effectiveDir } = this;

      const scrollToRightTabTiles =
        (direction === "forward" && effectiveDir === "ltr") ||
        (direction === "backward" && effectiveDir === "rtl");

      let tabTitleToScroll: TabTitle["el"] | undefined;
      const tabTitles = direction === "forward" ? [...this.tabTitles].reverse() : this.tabTitles;

      if (!tabTitles.length) {
        return;
      }

      if (scrollToRightTabTiles) {
        let closestTabTitleAfterContainerEnd: TabTitle["el"] | undefined;
        const closestTabTitleCrossingContainerEnd = tabTitles.find((tabTitle) => {
          const tabTitleBounds = tabTitle.getBoundingClientRect();
          const isAfterContainerEnd = tabTitleBounds.left >= containerBounds.right;
          const isClippingContainerEnd =
            tabTitleBounds.left < containerBounds.right &&
            tabTitleBounds.right > containerBounds.right;

          if (isAfterContainerEnd) {
            closestTabTitleAfterContainerEnd = tabTitle;
          }

          return isClippingContainerEnd;
        });

        tabTitleToScroll = closestTabTitleCrossingContainerEnd ?? closestTabTitleAfterContainerEnd;
      } else {
        let closestTabTitleBeforeContainerStart: TabTitle["el"] | undefined;
        const closestTabTitleCrossingContainerStart = tabTitles.find((tabTitle) => {
          const tabTitleBounds = tabTitle.getBoundingClientRect();
          const isBeforeContainerStart = tabTitleBounds.right <= containerBounds.left;
          const isClippingContainerStart =
            tabTitleBounds.left < containerBounds.left &&
            tabTitleBounds.right > containerBounds.left;

          if (isBeforeContainerStart) {
            closestTabTitleBeforeContainerStart = tabTitle;
          }

          return isClippingContainerStart;
        });

        tabTitleToScroll =
          closestTabTitleCrossingContainerStart ?? closestTabTitleBeforeContainerStart;
      }

      if (!tabTitleToScroll) {
        return;
      }

      const tabTitleBounds = tabTitleToScroll.getBoundingClientRect();
      const containerScrollPosition = tabTitleContainer.scrollLeft;
      const scrollLeft = scrollToRightTabTiles
        ? Math.ceil(containerScrollPosition + (tabTitleBounds.right - containerBounds.right))
        : Math.floor(containerScrollPosition + (tabTitleBounds.left - containerBounds.left));

      tabTitleContainer.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
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
    const visibleTabTitles = tabTitles.filter((tabTitle) => !tabTitle.closed);
    const enabledVisibleTabTitles = this.enabledTabTitles;
    const totalVisibleTabTitles = visibleTabTitles.length;
    const selectionModified = closedTabTitleEl.selected;

    this.hasVisibleTabTitles = totalVisibleTabTitles > 0;
    this.calciteInternalTabNavSlotChange.emit([...tabTitles]);

    if (totalVisibleTabTitles === 0) {
      this.selectedTitle = null;
      this.selectedTabId = undefined;
      return;
    }

    if (selectionModified) {
      const closedTabTitleIndex = tabTitles.findIndex((el) => el === closedTabTitleEl);
      const nextVisibleTabTitle =
        enabledVisibleTabTitles.find(
          (tabTitle) => tabTitles.indexOf(tabTitle) > closedTabTitleIndex,
        ) || enabledVisibleTabTitles.at(-1);

      if (!nextVisibleTabTitle) {
        this.selectedTitle = null;
        this.selectedTabId = undefined;
        this.updateLastVisibleTabClosable();
        return;
      }

      nextVisibleTabTitle.activateTab();
    }

    this.updateLastVisibleTabClosable();

    requestAnimationFrame(() => {
      const selectedTitle = this.selectedTitle;

      if (!selectedTitle) {
        return;
      }

      focusElement(selectedTitle);
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
          [CSS.scale(this.scale)]: true,
          [CSS.position(this.position)]: true,
          [CSS_UTILITY.rtl]: this.effectiveDir === "rtl",
        }}
        hidden={!this.hasVisibleTabTitles}
      >
        <div
          class={{
            [CSS.tabTitleSlotWrapper]: true,
          }}
          data-testid="tab-title-container"
          onScroll={this.onTabTitleScroll}
          onWheel={this.onTabTitleWheel}
          ref={this.setTabTitleContainerEl}
        >
          <slot onSlotChange={this.onSlotChange} />
        </div>

        <div
          class={CSS.scrollButtonContainer}
          hidden={!this.hasOverflowingEndTabTitle && !this.hasOverflowingStartTabTitle}
        >
          {this.renderScrollButton("start")}
          {this.renderScrollButton("end")}
        </div>
      </div>
    );
  }

  private renderScrollButton(overflowDirection: "start" | "end"): JsxNode {
    const { messages, scale, hasOverflowingEndTabTitle, hasOverflowingStartTabTitle } = this;
    const isEnd = overflowDirection === "end";

    return (
      <div
        class={{
          [CSS.scrollButton]: true,
          [CSS.scrollBackwardButton]: !isEnd,
          [CSS.scrollForwardButton]: isEnd,
        }}
        key={overflowDirection}
      >
        <calcite-button
          ariaLabel={isEnd ? messages.nextTabTitles : messages.previousTabTitles}
          disabled={isEnd ? !hasOverflowingEndTabTitle : !hasOverflowingStartTabTitle}
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
