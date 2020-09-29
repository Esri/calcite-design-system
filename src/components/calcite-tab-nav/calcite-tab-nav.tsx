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
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { filterDirectChildren } from "../../utils/dom";

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
  selectedTabChanged(): void {
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

  componentWillLoad(): void {
    const storageKey = `calcite-tab-nav-${this.storageId}`;

    if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
      this.selectedTab = JSON.parse(localStorage.getItem(storageKey));

      this.calciteTabChange.emit({
        tab: this.selectedTab
      });
    }
  }

  componentWillRender(): void {
    this.layout = this.el.closest("calcite-tabs")?.layout;
  }

  render(): VNode {
    return (
      <Host role="tablist">
        <div class="tab-nav">
          <slot />
        </div>
      </Host>
    );
  }

  componentDidRender(): void {
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
  @Listen("calciteTabsFocusPrevious") focusPreviousTabHandler(e: CustomEvent): void {
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
  @Listen("calciteTabsFocusNext") focusNextTabHandler(e: CustomEvent): void {
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
  @Listen("calciteTabsActivate") activateTabHandler(e: CustomEvent<TabChangeEventDetail>): void {
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
  ): void {
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
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getIndexOfTabTitle(el: HTMLCalciteTabTitleElement, tabTitles = this.tabTitles): number {
    // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
    // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
    return tabTitles.indexOf(el);
  }

  private get tabTitles(): HTMLCalciteTabTitleElement[] {
    return filterDirectChildren<HTMLCalciteTabTitleElement>(this.el, "calcite-tab-title");
  }

  private get enabledTabTitles(): HTMLCalciteTabTitleElement[] {
    return filterDirectChildren<HTMLCalciteTabTitleElement>(
      this.el,
      "calcite-tab-title:not([disabled])"
    );
  }
}
