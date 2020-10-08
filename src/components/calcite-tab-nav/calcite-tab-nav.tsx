import {
  Component,
  Listen,
  Prop,
  Watch,
  Event,
  EventEmitter,
  Element,
  State,
  h,
  Host
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { getElementDir, getSlottedElements } from "../../utils/dom";

@Component({
  tag: "calcite-tab-nav",
  styleUrl: "calcite-tab-nav.scss",
  shadow: true
})
export class CalciteTabNav {
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

  /** @internal Parent tabs component layout value */
  @Prop({ reflect: true, mutable: true }) layout: "center" | "inline" = "inline";

  /** @internal Parent tabs component position value */
  @Prop({ reflect: true, mutable: true }) position: "above" | "below" = "below";

  /**
   * @internal
   */
  @State() selectedTab: number | string;

  /**
   * @internal
   */
  @State() selectedTabEl: HTMLCalciteTabTitleElement;

  /**
   * @internal
   */
  @Prop({ mutable: true }) indicatorOffset: number;

  /**
   * @internal
   */
  @Prop({ mutable: true }) indicatorWidth: number;

  @Watch("selectedTab")
  selectedTabChanged() {
    if (
      localStorage &&
      this.storageId &&
      this.selectedTab !== undefined &&
      this.selectedTab !== null
    ) {
      localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTab));
    }

    this.calciteTabChange.emit({
      tab: this.selectedTab
    });

    this.getTabTitleById(this.selectedTab).then((el) => (this.selectedTabEl = el));
  }

  @Watch("selectedTabEl") selectedTabElChanged() {
    this.getOffsetPosition();
    this.getActiveWidth();
    // reset the animation time on tab selection
    this.activeIndicatorEl.style.transitionDuration = this.animationActiveDuration;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad() {
    const storageKey = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
      const storedTab = JSON.parse(localStorage.getItem(storageKey));
      this.selectedTab = storedTab;
      this.calciteTabChange.emit({
        tab: this.selectedTab
      });
    }
  }

  componentWillRender() {
    this.layout = this.el.closest("calcite-tabs")?.layout;
    this.position = this.el.closest("calcite-tabs")?.position;
  }

  componentDidRender() {
    // if every tab title is active select the first tab.
    if (
      this.tabTitles.length &&
      this.tabTitles.every((title) => !title.active) &&
      !this.selectedTab
    ) {
      this.tabTitles[0].getTabIdentifier().then((tab) => {
        this.calciteTabChange.emit({
          tab
        });
      });
    }
  }

  render() {
    this.dir = getElementDir(this.el);

    const indicatorStyle =
      this.dir !== "rtl"
        ? {
            width: `${this.indicatorWidth}px`,
            left: `${this.indicatorOffset}px`
          }
        : {
            width: `${this.indicatorWidth}px`,
            right: `${this.indicatorOffset}px`
          };
    return (
      <Host role="tablist">
        <div
          class="tab-nav"
          ref={(el) => (this.tabNavEl = el as HTMLElement)}
          onScroll={() => this.handleContainerScroll()}
        >
          <div class="tab-nav-active-indicator-container">
            <div
              class="tab-nav-active-indicator"
              style={indicatorStyle}
              ref={(el) => (this.activeIndicatorEl = el as HTMLElement)}
            ></div>
          </div>
          <slot />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events Listeners
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Listen("resize", { target: "window" }) resizeHandler() {
    // remove active indicator transition duration during resize to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.getActiveWidth();
    this.getOffsetPosition();
  }

  /**
   * @internal
   */
  @Listen("calciteTabsFocusPrevious") focusPreviousTabHandler(e: CustomEvent) {
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

  /**
   * @internal
   */
  @Listen("calciteTabsFocusNext") focusNextTabHandler(e: CustomEvent) {
    const currentIndex = this.getIndexOfTabTitle(
      e.target as HTMLCalciteTabTitleElement,
      this.enabledTabTitles
    );

    const nextTab = this.enabledTabTitles[currentIndex + 1] || this.enabledTabTitles[0];

    nextTab.focus();

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * @internal
   */
  @Listen("calciteTabsActivate") activateTabHandler(e: CustomEvent<TabChangeEventDetail>) {
    if (e.detail.tab) {
      this.selectedTab = e.detail.tab;
    } else {
      this.selectedTab = this.getIndexOfTabTitle(e.target as HTMLCalciteTabTitleElement);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * Check for active tabs on register and update selected
   */
  @Listen("calciteTabTitleRegister") updateTabTitles(e: CustomEvent<string | number>) {
    if ((e.target as HTMLCalciteTabTitleElement).active) {
      this.selectedTab = e.detail;
    }
  }

  /**
   * @internal
   */
  @Listen("calciteTabChange", { target: "body" }) globalTabChangeHandler(
    e: CustomEvent<TabChangeEventDetail>
  ) {
    if (
      this.syncId &&
      e.target !== this.el &&
      (e.target as HTMLCalciteTabNavElement).syncId === this.syncId &&
      this.selectedTab !== e.detail.tab
    ) {
      this.selectedTab = e.detail.tab;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when the active tab changes
   */
  @Event() calciteTabChange!: EventEmitter<TabChangeEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private tabNavEl: HTMLElement;

  private activeIndicatorEl: HTMLElement;

  // the duration of active indicator animation
  private animationActiveDuration = "0.3s";

  // component dir
  private dir: "ltr" | "rtl";

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private handleContainerScroll() {
    // remove active indicator transition duration while container is scrolling to prevent wobble
    this.activeIndicatorEl.style.transitionDuration = "0s";
    this.getOffsetPosition();
  }

  private getOffsetPosition() {
    this.indicatorOffset =
      this.dir !== "rtl"
        ? this.selectedTabEl?.offsetLeft - this.tabNavEl?.scrollLeft
        : this.tabNavEl?.offsetWidth - this.selectedTabEl.getBoundingClientRect().right;
  }

  private getActiveWidth() {
    this.indicatorWidth = this.selectedTabEl?.offsetWidth;
  }

  private getIndexOfTabTitle(el: HTMLCalciteTabTitleElement, tabTitles = this.tabTitles) {
    // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
    // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
    return tabTitles.indexOf(el);
  }

  private getTabTitleById(id: string | number): Promise<HTMLCalciteTabTitleElement | null> {
    return Promise.all(this.tabTitles.map((el) => el.getTabIdentifier())).then((ids) => {
      return this.tabTitles[ids.indexOf(id)];
    });
  }

  private get tabTitles(): HTMLCalciteTabTitleElement[] {
    if (this.tabNavEl) {
      return getSlottedElements<HTMLCalciteTabTitleElement>(this.tabNavEl, "calcite-tab-title");
    }
    return [];
  }

  private get enabledTabTitles(): HTMLCalciteTabTitleElement[] {
    if (this.tabNavEl) {
      return getSlottedElements<HTMLCalciteTabTitleElement>(
        this.tabNavEl,
        "calcite-tab-title:not([disabled])"
      );
    }
    return [];
  }
}
