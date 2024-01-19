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
  filterDirectChildren,
  focusElementInGroup,
  FocusElementInGroupDestination,
  getElementDir,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";
import { TabChangeEventDetail, TabCloseEventDetail } from "../tab/interfaces";
import { TabID, TabLayout, TabPosition } from "../tabs/interfaces";
import { CSS, ICON } from "./resources";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
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
   * @internal
   */
  @Prop({ mutable: true }) indicatorOffset: number;

  /**
   * @internal
   */
  @Prop({ mutable: true }) indicatorWidth: number;

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

    this.selectedTitle = await this.getTabTitleById(this.selectedTabId);
  }

  @Watch("selectedTitle")
  selectedTitleChanged(): void {
    this.updateActiveIndicator();
    // reset the animation time on tab selection
    this.activeIndicatorEl.style.transitionDuration = `${this.animationActiveDuration}s`;
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

  componentWillRender(): void {
    const { parentTabsEl } = this;

    this.layout = parentTabsEl?.layout;
    this.bordered = parentTabsEl?.bordered;

    if (this.selectedTitle) {
      this.updateActiveIndicator();
    }
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
    this.disconnectIntersectionObserver();
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);
    const width = `${this.indicatorWidth}px`;
    const offset = `${this.indicatorOffset}px`;
    const indicatorStyle = dir !== "rtl" ? { width, left: offset } : { width, right: offset };

    return (
      <Host role="tablist">
        <div
          class={{
            [CSS.container]: true,
            [`scale-${this.scale}`]: true,
            [`position-${this.position}`]: true,
          }}
          onScroll={this.handleContainerScroll}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.storeContainerRef}
        >
          <div
            class={{
              [CSS.tabTitleSlotWrapper]: true,
              [CSS.tabTitleSlotWrapperStartOverflow]: !!this.overflowingStartTabTitle,
              [CSS.tabTitleSlotWrapperEndOverflow]: !!this.overflowingEndTabTitle,
            }}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(el) => (this.tabTitleContainerEl = el)}
          >
            <slot onSlotchange={this.onSlotChange} />
          </div>
          <div
            class={{
              [CSS.activeIndicatorContainer]: true,
            }}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(el) => (this.activeIndicatorContainerEl = el)}
          >
            <div
              class="tab-nav-active-indicator"
              style={indicatorStyle}
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={(el) => (this.activeIndicatorEl = el as HTMLElement)}
            />
          </div>
          {this.layout === "inline" && [
            this.renderScrollButton("start"),
            this.renderScrollButton("end"),
          ]}
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
    this.selectedTabId = event.detail.tab
      ? event.detail.tab
      : this.getIndexOfTabTitle(event.target as HTMLCalciteTabTitleElement);
    event.stopPropagation();

    if (this.selectedTabId === this.getIndexOfTabTitle(this.overflowingEndTabTitle)) {
      this.scrollToNextTabTitles();
    } else if (this.selectedTabId === this.getIndexOfTabTitle(this.overflowingStartTabTitle)) {
      this.scrollToPreviousTabTitles();
    }
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
  updateTabTitles(event: CustomEvent<TabID>): void {
    if ((event.target as HTMLCalciteTabTitleElement).selected) {
      this.selectedTabId = event.detail;
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

  @Listen("calciteInternalTabIconChanged")
  iconStartChangeHandler(): void {
    this.updateActiveIndicator();
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
  @Event({ cancelable: false }) calciteInternalTabChange: EventEmitter<TabChangeEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTabNavElement;

  @State() private overflowingStartTabTitle: HTMLCalciteTabTitleElement = null;

  @State() private overflowingEndTabTitle: HTMLCalciteTabTitleElement = null;

  @State() private selectedTabId: TabID;

  private activeIndicatorEl: HTMLElement;

  private activeIndicatorContainerEl: HTMLDivElement;

  private animationActiveDuration = 0.3;

  private parentTabsEl: HTMLCalciteTabsElement;

  private tabNavEl: HTMLDivElement;

  private tabTitleContainerEl: HTMLDivElement;

  @State() defaultMessages: TabNavMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  resizeObserver = createObserver("resize", () => {
    if (!this.activeIndicatorEl) {
      return;
    }

    // remove active indicator transition duration during resize to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.updateActiveIndicator();
  });

  private intersectionObserver: IntersectionObserver;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateActiveIndicator(): void {
    const dir = getElementDir(this.el);
    const tabTitleScrollLeft = this.tabTitleContainerEl?.scrollLeft;
    const navWidth = this.activeIndicatorContainerEl?.offsetWidth;
    const tabLeft = this.selectedTitle?.offsetLeft;
    const tabWidth = this.selectedTitle?.offsetWidth;
    const offsetRight = navWidth - tabLeft - tabWidth;
    this.indicatorOffset =
      (dir === "ltr"
        ? tabLeft - this.tabNavEl?.scrollLeft
        : offsetRight + this.tabNavEl?.scrollLeft) - tabTitleScrollLeft;
    this.indicatorWidth = this.selectedTitle?.offsetWidth;
  }

  private disconnectIntersectionObserver(): void {
    this.intersectionObserver?.disconnect();
  }

  private onSlotChange = (event: Event): void => {
    this.disconnectIntersectionObserver();

    const slottedChildren = (event.target as HTMLSlotElement).assignedElements();
    slottedChildren.forEach((child) => {
      this.intersectionObserver?.observe(child);
    });
  };

  private storeContainerRef = (el: HTMLDivElement) => {
    this.tabNavEl = el;
    this.disconnectIntersectionObserver();

    if (!el || this.layout === "center") {
      return;
    }

    this.intersectionObserver = createObserver(
      "intersection",
      (entries) => {
        this.overflowingStartTabTitle = this.findFirstClippedOrOutsideOfViewport(entries);
        this.overflowingEndTabTitle = this.findFirstClippedOrOutsideOfViewport(entries.reverse());
      },
      {
        root: this.tabNavEl,
        threshold: [0, 1],
      },
    );
  };

  private findFirstClippedOrOutsideOfViewport(
    entries: IntersectionObserverEntry[],
  ): HTMLCalciteTabTitleElement {
    let firstClippedOrOutsideOfViewport: IntersectionObserverEntry = null;

    for (const entry of entries) {
      if (!entry.isIntersecting) {
        firstClippedOrOutsideOfViewport = entry;
        continue;
      }

      if (entry.isIntersecting) {
        if (entry.intersectionRatio < 1) {
          firstClippedOrOutsideOfViewport = entry;
        }
        break;
      }
    }

    return firstClippedOrOutsideOfViewport?.target as HTMLCalciteTabTitleElement;
  }

  private scrollToTabTitles = (direction: "forward" | "backward"): void => {
    requestAnimationFrame(() => {
      const targetTabTitle =
        direction === "forward" ? this.overflowingEndTabTitle : this.overflowingStartTabTitle;

      targetTabTitle.scrollIntoView({
        behavior: "smooth",
        inline: direction === "forward" ? "start" : "end",
      });

      this.updateActiveIndicator();
    });
  };

  private scrollToNextTabTitles = (): void => {
    this.scrollToTabTitles("forward");
  };

  private scrollToPreviousTabTitles = (): void => {
    this.scrollToTabTitles("backward");
  };

  handleTabFocus = (
    event: CustomEvent,
    el: HTMLCalciteTabTitleElement,
    destination: FocusElementInGroupDestination,
  ): void => {
    focusElementInGroup(this.enabledTabTitles, el, destination);

    event.stopPropagation();
  };

  private handleContainerScroll = (): void => {
    // remove active indicator transition duration while container is scrolling to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.updateActiveIndicator();
  };

  getIndexOfTabTitle(el: HTMLCalciteTabTitleElement, tabTitles = this.tabTitles): number {
    // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
    // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
    return tabTitles.indexOf(el);
  }

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
      this.updateActiveIndicator();
      tabTitles[this.selectedTabId].focus();
    });
  }

  private renderScrollButton = (overflowDirection: "start" | "end"): VNode => {
    const { bordered, messages, overflowingStartTabTitle, overflowingEndTabTitle, scale } = this;
    const isEnd = overflowDirection === "end";

    return (
      <calcite-action
        appearance={bordered ? "solid" : "transparent"}
        class={{
          [CSS.scrollButton]: true,
          [CSS.scrollBackwardButton]: !isEnd,
          [CSS.scrollForwardButton]: isEnd,
        }}
        hidden={(isEnd && !overflowingEndTabTitle) || (!isEnd && !overflowingStartTabTitle)}
        icon={isEnd ? ICON.chevronRight : ICON.chevronLeft}
        key={overflowDirection}
        onClick={isEnd ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles}
        scale={scale}
        text={isEnd ? messages.nextTabTitles : messages.previousTabTitles}
      />
    );
  };
}
