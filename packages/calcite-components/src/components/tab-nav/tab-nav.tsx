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
import { ICON, CSS } from "./resources";

/**
 * @slot - A slot for adding `calcite-tab-title`s.
 */
@Component({
  tag: "calcite-tab-nav",
  styleUrl: "tab-nav.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class TabNav {
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
   * Specifies the component's selected tab-title.
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
    this.updateOffsetPosition();
    this.updateActiveWidth();
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
  }

  async componentWillLoad(): Promise<void> {
    const storageKey = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
      const storedTab = JSON.parse(localStorage.getItem(storageKey));
      this.selectedTabId = storedTab;
    }
  }

  componentWillRender(): void {
    const { parentTabsEl } = this;

    this.layout = parentTabsEl?.layout;
    this.bordered = parentTabsEl?.bordered;
    // fix issue with active tab-title not lining up with blue indicator
    if (this.selectedTitle) {
      this.updateOffsetPosition();
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
          ref={(el: HTMLDivElement) => (this.tabNavEl = el)}
        >
          <div class={CSS.tabTitleSlotWrapper} id="#wrapper">
            <slot />
          </div>
          <div
            class="tab-nav-active-indicator-container"
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
          {this.layout === "inline" && this.getOverflowIcons()}
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
    this.updateActiveWidth();
    this.updateOffsetPosition();
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

  @State() selectedTabId: TabID;

  @State() viewportVisibleTabTitleIndices: Map<object, number>;

  parentTabsEl: HTMLCalciteTabsElement;

  tabNavEl: HTMLDivElement;

  activeIndicatorEl: HTMLElement;

  activeIndicatorContainerEl: HTMLDivElement;

  animationActiveDuration = 0.3;

  resizeObserver = createObserver("resize", () => {
    if (!this.activeIndicatorEl) {
      return;
    }

    // remove active indicator transition duration during resize to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.updateActiveWidth();
    this.updateOffsetPosition();

    this.getOverflowIcons();
  });

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private findViewportVisibleTabTitleIndices = (): Map<object, number> => {
    const tabTitlesNodeList: NodeListOf<HTMLCalciteTabTitleElement> =
      this.el.querySelectorAll("calcite-tab-title");
    const elWidth = this.el.clientWidth;
    const tabTitlesMap = new Map<object, number>();

    function findIndex() {
      tabTitlesNodeList.forEach((tabTitle, index) => {
        const tabTitleRect = tabTitle?.getBoundingClientRect();

        if (tabTitleRect?.x >= 0 && tabTitleRect?.x <= elWidth) {
          tabTitlesMap.set(tabTitle, index);
        }
      });
    }

    findIndex();

    return tabTitlesMap;
  };

  private scrollToTabTitles = (direction: "forward" | "backward"): void => {
    const tabTitles = this.el.querySelectorAll("calcite-tab-title");

    let { viewportVisibleTabTitleIndices } = this;

    viewportVisibleTabTitleIndices = this.findViewportVisibleTabTitleIndices();
    const tabTitlesArray = Array.from(tabTitles);

    let lastValue: number;
    for (const value of viewportVisibleTabTitleIndices?.values()) {
      lastValue = value;
    }

    const valuesIterator = viewportVisibleTabTitleIndices?.values();
    const firstValue: number = valuesIterator?.next().value;

    requestAnimationFrame(() => {
      const targetIndex = direction === "forward" ? lastValue : firstValue - 1;
      const scrollInline = direction === "forward" ? "start" : "end";

      if (tabTitlesArray[targetIndex]) {
        tabTitlesArray[targetIndex].scrollIntoView({
          behavior: "smooth",
          inline: scrollInline,
        });
      }
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
    destination: FocusElementInGroupDestination
  ): void => {
    focusElementInGroup(this.enabledTabTitles, el, destination);

    event.stopPropagation();
  };

  handleContainerScroll = (): void => {
    // remove active indicator transition duration while container is scrolling to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.updateOffsetPosition();
  };

  updateOffsetPosition(): void {
    const dir = getElementDir(this.el);
    const navWidth = this.activeIndicatorContainerEl?.offsetWidth;
    const tabLeft = this.selectedTitle?.offsetLeft;
    const tabWidth = this.selectedTitle?.offsetWidth;
    const offsetRight = navWidth - (tabLeft + tabWidth);
    this.indicatorOffset =
      dir !== "rtl" ? tabLeft - this.tabNavEl?.scrollLeft : offsetRight + this.tabNavEl?.scrollLeft;
  }

  updateActiveWidth(): void {
    this.indicatorWidth = this.selectedTitle?.offsetWidth;
  }

  updateViewportVisibleTabTitleIndices(): void {
    this.viewportVisibleTabTitleIndices = this.findViewportVisibleTabTitleIndices();
  }

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
      "calcite-tab-title:not([disabled])"
    ).filter((tabTitle) => !tabTitle.closed);
  }

  private handleTabTitleClose(closedTabTitleEl: HTMLCalciteTabTitleElement): void {
    const { tabTitles } = this;

    const visibleTabTitlesIndices = tabTitles
      .filter((tabTitle) => !tabTitle.closed)
      .map((_, index) => index);

    const totalVisibleTabTitles = visibleTabTitlesIndices.length;

    if (totalVisibleTabTitles === 1 && tabTitles[visibleTabTitlesIndices[0]].closable) {
      tabTitles[visibleTabTitlesIndices[0]].closable = false;
      this.selectedTabId = visibleTabTitlesIndices[0];
    } else if (totalVisibleTabTitles > 1) {
      const closedTabTitleIndex = tabTitles.findIndex((el) => el === closedTabTitleEl);

      const nextTabTitleIndex = visibleTabTitlesIndices.find(
        (value) => value > closedTabTitleIndex
      );

      this.selectedTabId =
        nextTabTitleIndex !== undefined ? nextTabTitleIndex : totalVisibleTabTitles - 1;
    }

    requestAnimationFrame(() => {
      this.updateOffsetPosition();
      this.updateActiveWidth();

      tabTitles[this.selectedTabId].focus();
    });
    requestAnimationFrame(() => {
      this.updateViewportVisibleTabTitleIndices();
    });
  }

  getOverflowDirection(): {
    isOverflowingStart: boolean;
    isOverflowingEnd: boolean;
  } {
    const dir = getElementDir(this.el);
    const tabTitles = this.el.querySelectorAll("calcite-tab-title");
    const viewportVisibleTabTitleIndices = this.findViewportVisibleTabTitleIndices();

    let isOverflowingEnd = false;
    let isOverflowingStart = false;

    if (dir === "ltr" && viewportVisibleTabTitleIndices.size > 0) {
      let lastKey;
      for (const key of viewportVisibleTabTitleIndices.keys()) {
        lastKey = key;
      }

      if (viewportVisibleTabTitleIndices.keys().next().value !== 0) {
        isOverflowingStart = true;
      }

      if (viewportVisibleTabTitleIndices.get(lastKey) !== tabTitles.length - 1) {
        isOverflowingEnd = true;
      }
    }

    return { isOverflowingStart, isOverflowingEnd };
  }

  getOverflowActions(
    isOverflowingStart: boolean,
    isOverflowingEnd: boolean
  ): { showStartAction: string | null; showEndAction: string | null } {
    return {
      showStartAction: isOverflowingStart ? "start" : null,
      showEndAction: isOverflowingEnd ? "end" : null,
    };
  }

  getActionChevronDirection = (overflowDirection: string): VNode => {
    const isEnd = overflowDirection === "end";

    return (
      <calcite-action
        appearance={
          (this.el.parentElement as HTMLCalciteTabsElement).bordered ? "solid" : "transparent"
        }
        class={isEnd ? CSS.arrowEnd : CSS.arrowStart}
        icon={isEnd ? ICON.chevronRight : ICON.chevronLeft}
        onClick={isEnd ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles}
        scale={this.scale}
        text="Placeholder"
      />
    );
  };

  getOverflowIcons(): VNode[] {
    const { isOverflowingStart, isOverflowingEnd } = this.getOverflowDirection();
    const { showStartAction, showEndAction } = this.getOverflowActions(
      isOverflowingStart,
      isOverflowingEnd
    );

    const chevronEnd = this.getActionChevronDirection(showEndAction);
    const chevronStart = this.getActionChevronDirection(showStartAction);

    const tabTitleSlotWrapper: HTMLDivElement = this.el.shadowRoot.querySelector(
      `.${CSS.tabTitleSlotWrapper}`
    );
    if (tabTitleSlotWrapper) {
      const scaleValue = this.scale === "s" ? "1.5" : this.scale === "m" ? "2" : "2.5";
      console.log("tabTitleSlotWrapper", tabTitleSlotWrapper);
      const style = tabTitleSlotWrapper.style;

      console.log("isOverflowingStart", isOverflowingStart);
      console.log("isOverflowingEnd", isOverflowingEnd);
      style.paddingInlineStart = isOverflowingStart ? `${scaleValue}rem` : "";
      style.paddingInlineEnd = isOverflowingEnd ? `${scaleValue}rem` : "";
    }
    return [chevronEnd, chevronStart];
  }
}
