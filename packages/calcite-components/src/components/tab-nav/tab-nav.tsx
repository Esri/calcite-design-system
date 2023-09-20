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
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import {
  filterDirectChildren,
  focusElementInGroup,
  FocusElementInGroupDestination,
  getElementDir,
} from "../../utils/dom";
// import { Breakpoints, getBreakpoints } from "../../utils/responsive";
import { createObserver } from "../../utils/observers";
import { Scale } from "../interfaces";
import { TabChangeEventDetail, TabCloseEventDetail } from "../tab/interfaces";
import { TabID, TabLayout, TabPosition } from "../tabs/interfaces";
import { LocalizedComponent, connectLocalized, disconnectLocalized } from "../../utils/locale";
import { TabNavMessages } from "./assets/tab-nav/t9n";
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
   * Specifies the component's selected tab-title.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedTitle: HTMLCalciteTabTitleElement = null;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) scale: Scale = "m";

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) layout: TabLayout = "inline";

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) position: TabPosition = "bottom";

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
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TabNavMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Made into a prop for testing purposes only.
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TabNavMessages;

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
    this.position = parentTabsEl?.position;
    this.scale = parentTabsEl?.scale;
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

    // const widthBreakpoints = this.breakpoints.width;
    // const { elWidth } = this;

    return (
      <Host role="tablist">
        <div
          class="tab-nav"
          onScroll={this.handleContainerScroll}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(el: HTMLDivElement) => (this.tabNavEl = el)}
        >
          <slot />
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
          {console.log(this.getOverflowIcons())}
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

  parentTabsEl: HTMLCalciteTabsElement;

  tabNavEl: HTMLDivElement;

  activeIndicatorEl: HTMLElement;

  activeIndicatorContainerEl: HTMLDivElement;

  animationActiveDuration = 0.3;

  @State() defaultMessages: TabNavMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() elWidth: number;

  resizeObserver = createObserver("resize", (entries) => {
    if (!this.activeIndicatorEl) {
      return;
    }

    // remove active indicator transition duration during resize to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.updateActiveWidth();
    this.updateOffsetPosition();

    this.elWidth = entries[0].contentRect.width;

    this.getOverflowIcons();
  });

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private scrollToNextTabTitles = (): void => {
    const tabTitles = this.el.querySelectorAll("calcite-tab-title");
    const mobilePageWidth = window.innerWidth;

    let lastVisibleTabTitleIndex = -1;
    let scrollAmount = 0;

    // Find the index of the last tab title visible within the mobile-sized tab nav
    for (let i = 0; i < tabTitles.length; i++) {
      const tabTitle = tabTitles[i];
      const tabTitleRect = tabTitle.getBoundingClientRect();

      if (tabTitleRect.right <= mobilePageWidth) {
        lastVisibleTabTitleIndex = i;
      } else {
        break;
      }
    }

    // Calculate the scroll amount to bring the next set of tab titles into view
    if (lastVisibleTabTitleIndex !== -1) {
      const nextTabTitleIndex = lastVisibleTabTitleIndex + 1;
      const nextTabTitle = tabTitles[nextTabTitleIndex];
      if (nextTabTitle) {
        const nextTabTitleRect = nextTabTitle.getBoundingClientRect();
        scrollAmount = nextTabTitleRect.left - this.el.getBoundingClientRect().left;
      }
    }

    requestAnimationFrame(() => {
      this.tabNavEl.scrollLeft += scrollAmount;
    });
  };

  private scrollToPreviousTabTitles = (): void => {
    const tabTitles = this.el.querySelectorAll("calcite-tab-title");
    const mobilePageWidth = window.innerWidth;

    let firstVisibleTabTitleIndex = -1;
    let scrollAmount = 0;

    // Find the index of the first tab title visible within the mobile-sized tab nav
    for (let i = 0; i < tabTitles.length; i++) {
      const tabTitle = tabTitles[i];
      const tabTitleRect = tabTitle.getBoundingClientRect();

      if (tabTitleRect.left >= 0) {
        firstVisibleTabTitleIndex = i;
        break;
      }
    }

    // Calculate the scroll amount to bring the previous set of tab titles into view
    if (firstVisibleTabTitleIndex !== 0) {
      const previousTabTitleIndex = firstVisibleTabTitleIndex - 1;
      const previousTabTitle = tabTitles[previousTabTitleIndex];
      if (previousTabTitle) {
        const previousTabTitleRect = previousTabTitle.getBoundingClientRect();
        scrollAmount = previousTabTitleRect.right - mobilePageWidth;
      }
    }

    requestAnimationFrame(() => {
      this.tabNavEl.scrollLeft += scrollAmount;
    });
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

    const visibleTabTitlesIndices = tabTitles.reduce(
      (tabTitleIndices, tabTitle, index) =>
        !tabTitle.closed ? [...tabTitleIndices, index] : tabTitleIndices,
      []
    );
    const totalVisibleTabTitles = visibleTabTitlesIndices.length;

    if (totalVisibleTabTitles === 1 && tabTitles[visibleTabTitlesIndices[0]].closable) {
      tabTitles[visibleTabTitlesIndices[0]].closable = false;
      this.selectedTabId = visibleTabTitlesIndices[0];
    } else if (totalVisibleTabTitles > 1) {
      const closedTabTitleIndex = tabTitles.findIndex((el) => el === closedTabTitleEl);
      const nextTabTitleIndex = visibleTabTitlesIndices.find(
        (value) => value > closedTabTitleIndex
      );

      if (this.selectedTabId === closedTabTitleIndex) {
        this.selectedTabId = nextTabTitleIndex ? nextTabTitleIndex : totalVisibleTabTitles - 1;
      }
    }

    requestAnimationFrame(() => {
      this.updateOffsetPosition();
      this.updateActiveWidth();
      tabTitles[this.selectedTabId].focus();
    });
  }

  private getOverflowIcons(): VNode | VNode[] {
    const { messages } = this;
    console.log("getOverflowIcons function is running");
    const tabNavWidth = this.el.offsetWidth;

    const tabTitles = Array.from(this.el.querySelectorAll("calcite-tab-title"));

    const firstTitle = tabTitles[0].getBoundingClientRect();
    const lastTitle = tabTitles[tabTitles.length - 1].getBoundingClientRect();

    const isOverflowingRight = lastTitle.right > tabNavWidth;
    const isOverflowingLeft = firstTitle.left < 0;

    const getActionChevronDirection = (overflowDirection: string): VNode => {
      const dirActionClass: string = overflowDirection === "right" ? CSS.arrowRight : CSS.arrowLeft;
      const dirChevronIcon: string =
        overflowDirection === "right" ? ICON.arrowRight : ICON.arrowLeft;

      const dirText: string =
        overflowDirection === "right" ? messages.nextTabTitles : messages.previousTabsTitles;

      const dirScroll =
        overflowDirection === "right" ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles;

      return (
        <calcite-action
          class={dirActionClass}
          icon={dirChevronIcon}
          onClick={() => dirScroll}
          onKeyDown={() => dirScroll}
          text={dirText}
        />
      );
    };

    const showRightArrow: VNode = getActionChevronDirection("right");
    const showLeftArrow: VNode = getActionChevronDirection("left");

    console.log("isOverflowingRight", isOverflowingRight);

    const action =
      !isOverflowingRight && !isOverflowingLeft
        ? null
        : isOverflowingRight && !isOverflowingLeft
        ? showRightArrow
        : !isOverflowingRight && isOverflowingLeft
        ? showLeftArrow
        : [showRightArrow, showLeftArrow];

    console.log("action returned from getOverflowIcons", action);
    return action;
  }
}
