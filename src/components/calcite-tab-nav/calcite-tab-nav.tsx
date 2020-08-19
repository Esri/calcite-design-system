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
  @State() indicatorOffset: number;

  /**
   * @internal
   */
  @State() indicatorWidth: number;

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
      this.selectedTabEl = storedTab;
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
    this.getOffsetPosition();
    this.getActiveWidth();
  }

  componentDidUpdate() {
    this.selectedTabEl = this.tabTitles.filter((el) => el.active)[0];
  }

  render() {
    const dir = getElementDir(this.el);

    const style =
      dir !== "rtl"
        ? {
            width: `${this.indicatorWidth}px`,
            left: `${this.indicatorOffset}px`
          }
        : {
            width: `${this.indicatorWidth}px`,
            left: `${this.indicatorOffset}px`
          };
    return (
      <Host role="tablist">
        <div
          class="tab-nav"
          ref={(el) => (this.tabNavEl = el as HTMLElement)}
          onScroll={() => this.getOffsetPosition()}
        >
          <div class="tab-nav-active-indicator" style={style}></div>
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
    // adjust the width of the active indicator on resize for centered items
    this.getActiveWidth();
    this.getOffsetPosition();
  }

  /**
   * @internal
   */
  @Listen("calciteTabsFocusPrevious") focusPreviousTabHandler(e: CustomEvent) {
    const currentIndex = this.getIndexOfTabTitle(e.target as HTMLCalciteTabTitleElement);

    const previousTab =
      this.tabTitles[currentIndex - 1] || this.tabTitles[this.tabTitles.length - 1];

    previousTab.focus();

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * @internal
   */
  @Listen("calciteTabsFocusNext") focusNextTabHandler(e: CustomEvent) {
    const currentIndex = this.getIndexOfTabTitle(e.target as HTMLCalciteTabTitleElement);

    const nextTab = this.tabTitles[currentIndex + 1] || this.tabTitles[0];

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
    this.selectedTabEl = e.target as HTMLCalciteTabTitleElement;
    e.stopPropagation();
    e.preventDefault();
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getOffsetPosition() {
    this.indicatorOffset = this.selectedTabEl?.offsetLeft - this.tabNavEl?.scrollLeft;
  }

  private getActiveWidth() {
    this.indicatorWidth = this.selectedTabEl?.offsetWidth;
  }

  private getIndexOfTabTitle(el: HTMLCalciteTabTitleElement) {
    return this.tabTitles.indexOf(el);
  }

  private get tabTitles(): HTMLCalciteTabTitleElement[] {
    if (this.tabNavEl) {
      return getSlottedElements<HTMLCalciteTabTitleElement>(this.tabNavEl, "calcite-tab-title");
    }
    return [];
  }
}
