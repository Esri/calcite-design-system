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
  Watch
} from "@stencil/core";
import { TabChangeEventDetail } from "../tab/interfaces";
import { getElementDir, filterDirectChildren } from "../../utils/dom";
import { TabID, TabLayout } from "../tabs/interfaces";
import { TabPosition } from "../tabs/interfaces";
import { Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";

/**
 * @slot - A slot for adding `calcite-tab-title`s.
 */
@Component({
  tag: "calcite-tab-nav",
  styleUrl: "tab-nav.scss",
  shadow: true
})
export class TabNav {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTabNavElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Name to use when saving selected tab data to localStorage
   */
  @Prop() storageId: string;

  /**
   * Pass the same string to multiple tab navs to keep them all in sync if one changes
   */
  @Prop() syncId: string;

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
  @Prop({ reflect: true, mutable: true }) position: TabPosition = "below";

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

  @Watch("selectedTab")
  async selectedTabChanged(): Promise<void> {
    if (
      localStorage &&
      this.storageId &&
      this.selectedTab !== undefined &&
      this.selectedTab !== null
    ) {
      localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTab));
    }

    this.calciteInternalTabChange.emit({
      tab: this.selectedTab
    });

    this.selectedTabEl = await this.getTabTitleById(this.selectedTab);
  }

  @Watch("selectedTabEl") selectedTabElChanged(): void {
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

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  componentWillLoad(): void {
    const storageKey = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
      const storedTab = JSON.parse(localStorage.getItem(storageKey));
      this.selectedTab = storedTab;
    }
  }

  componentWillRender(): void {
    const { parentTabsEl } = this;

    this.layout = parentTabsEl?.layout;
    this.position = parentTabsEl?.position;
    this.scale = parentTabsEl?.scale;
    this.bordered = parentTabsEl?.bordered;
    // fix issue with active tab-title not lining up with blue indicator
    if (this.selectedTabEl) {
      this.updateOffsetPosition();
    }
  }

  componentDidRender(): void {
    // if every tab title is active select the first tab.
    if (
      this.tabTitles.length &&
      this.tabTitles.every((title) => !title.active) &&
      !this.selectedTab
    ) {
      this.tabTitles[0].getTabIdentifier().then((tab) => {
        this.calciteInternalTabChange.emit({
          tab
        });
      });
    }
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const width = `${this.indicatorWidth}px`;
    const offset = `${this.indicatorOffset}px`;
    const indicatorStyle = dir !== "rtl" ? { width, left: offset } : { width, right: offset };
    return (
      <Host role="tablist">
        <div
          class="tab-nav"
          onScroll={this.handleContainerScroll}
          ref={(el: HTMLDivElement) => (this.tabNavEl = el)}
        >
          <div
            class="tab-nav-active-indicator-container"
            ref={(el) => (this.activeIndicatorContainerEl = el)}
          >
            <div
              class="tab-nav-active-indicator"
              ref={(el) => (this.activeIndicatorEl = el as HTMLElement)}
              style={indicatorStyle}
            />
          </div>
          <slot />
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
  focusPreviousTabHandler(e: CustomEvent): void {
    const currentIndex = this.getIndexOfTabTitle(
      e.target as HTMLCalciteTabTitleElement,
      this.enabledTabTitles
    );

    const previousTab =
      this.enabledTabTitles[currentIndex - 1] ||
      this.enabledTabTitles[this.enabledTabTitles.length - 1];

    previousTab.focus();

    e.stopPropagation();
    e.preventDefault();
  }

  @Listen("calciteInternalTabsFocusNext")
  focusNextTabHandler(e: CustomEvent): void {
    const currentIndex = this.getIndexOfTabTitle(
      e.target as HTMLCalciteTabTitleElement,
      this.enabledTabTitles
    );

    const nextTab = this.enabledTabTitles[currentIndex + 1] || this.enabledTabTitles[0];

    nextTab.focus();

    e.stopPropagation();
    e.preventDefault();
  }

  @Listen("calciteInternalTabsActivate")
  internalActivateTabHandler(e: CustomEvent<TabChangeEventDetail>): void {
    this.selectedTab = e.detail.tab
      ? e.detail.tab
      : this.getIndexOfTabTitle(e.target as HTMLCalciteTabTitleElement);
    e.stopPropagation();
    e.preventDefault();
  }

  @Listen("calciteTabsActivate") activateTabHandler(e: CustomEvent<TabChangeEventDetail>): void {
    this.calciteTabChange.emit({
      tab: this.selectedTab
    });

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * Check for active tabs on register and update selected
   *
   * @param e
   */
  @Listen("calciteInternalTabTitleRegister")
  updateTabTitles(e: CustomEvent<TabID>): void {
    if ((e.target as HTMLCalciteTabTitleElement).active) {
      this.selectedTab = e.detail;
    }
  }

  @Listen("calciteInternalTabChange", { target: "body" })
  globalInternalTabChangeHandler(e: CustomEvent<TabChangeEventDetail>): void {
    if (
      this.syncId &&
      e.target !== this.el &&
      (e.target as HTMLCalciteTabNavElement).syncId === this.syncId &&
      this.selectedTab !== e.detail.tab
    ) {
      this.selectedTab = e.detail.tab;
      e.stopPropagation();
    }
    e.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when the active tab changes
   *
   * @see [TabChangeEventDetail](https://github.com/Esri/calcite-components/blob/master/src/components/tab/interfaces.ts#L1)
   */
  @Event() calciteTabChange: EventEmitter<TabChangeEventDetail>;

  /**
   * @internal
   */
  @Event() calciteInternalTabChange: EventEmitter<TabChangeEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @State() selectedTab: TabID;

  @State() selectedTabEl: HTMLCalciteTabTitleElement;

  parentTabsEl: HTMLCalciteTabsElement;

  tabNavEl: HTMLDivElement;

  activeIndicatorEl: HTMLElement;

  activeIndicatorContainerEl: HTMLDivElement;

  animationActiveDuration = 0.3;

  resizeObserver = createObserver("resize", () => {
    // remove active indicator transition duration during resize to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.updateActiveWidth();
    this.updateOffsetPosition();
  });

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  handleContainerScroll = (): void => {
    // remove active indicator transition duration while container is scrolling to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.updateOffsetPosition();
  };

  updateOffsetPosition(): void {
    const dir = getElementDir(this.el);
    const navWidth = this.activeIndicatorContainerEl?.offsetWidth;
    const tabLeft = this.selectedTabEl?.offsetLeft;
    const tabWidth = this.selectedTabEl?.offsetWidth;
    const offsetRight = navWidth - (tabLeft + tabWidth);
    this.indicatorOffset =
      dir !== "rtl" ? tabLeft - this.tabNavEl?.scrollLeft : offsetRight + this.tabNavEl?.scrollLeft;
  }

  updateActiveWidth(): void {
    this.indicatorWidth = this.selectedTabEl?.offsetWidth;
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
    );
  }
}
