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
import { getSlottedElements } from "../../utils/dom";

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
  @Prop({ reflect: true, mutable: true }) layout: "center" | "inline";

  /**
   * @internal
   */
  @State()
  selectedTab: number | string;

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
      this.selectedTab = JSON.parse(localStorage.getItem(storageKey));

      this.calciteTabChange.emit({
        tab: this.selectedTab
      });
    }
  }

  componentWillRender() {
    this.layout = this.el.closest("calcite-tabs")?.layout;
  }

  render() {
    return (
      <Host role="tablist">
        <div class="tab-nav" ref={(el) => (this.tabNavEl = el as HTMLElement)}>
          <slot />
        </div>
      </Host>
    );
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

  //--------------------------------------------------------------------------
  //
  //  Events Listeners
  //
  //--------------------------------------------------------------------------

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

  private getIndexOfTabTitle(el: HTMLCalciteTabTitleElement, tabTitles = this.tabTitles) {
    // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
    // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
    return tabTitles.indexOf(el);
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
