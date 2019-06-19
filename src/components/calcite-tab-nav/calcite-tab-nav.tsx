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

  @Element() el;

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
  @State()
  selectedTab: number | string = 0;

  @Watch("selectedTab")
  selectedTabChanged() {
    if (
      localStorage &&
      this.storageId &&
      this.selectedTab !== undefined &&
      this.selectedTab !== null
    ) {
      localStorage.setItem(
        `calcite-tab-nav-${this.storageId}`,
        JSON.stringify(this.selectedTab)
      );
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
    if (
      localStorage &&
      this.storageId &&
      localStorage.getItem(`calcite-tab-nav-${this.storageId}`)
    ) {
      this.selectedTab =
        JSON.parse(localStorage.getItem(`calcite-tab-nav-${this.storageId}`)) ||
        this.selectedTab;

      this.calciteTabChange.emit({
        tab: this.selectedTab
      });
    }
  }

  render() {
    return (
      <Host role="tablist">
        <nav class="tab-nav">
          <slot />
        </nav>
      </Host>
    );
  }

  componentDidRender() {
    if (this.tabTitles.every(title => !title.isActive)) {
      this.tabTitles[0].getTabIdentifier().then(tab => {
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
    const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
    const currentIndex = this.getIndexOfTabTitle(
      e.target as HTMLCalciteTabTitleElement
    );
    const previousTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
    previousTab.focus();

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * @internal
   */
  @Listen("calciteTabsFocusNext") focusNextTabHandler(e: CustomEvent) {
    const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
    const currentIndex = this.getIndexOfTabTitle(
      e.target as HTMLCalciteTabTitleElement
    );
    const nextTab = tabs[currentIndex + 1] || tabs[0];
    nextTab.focus();

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * @internal
   */
  @Listen("calciteTabsActivate") activateTabHandler(
    e: CustomEvent<TabChangeEventDetail>
  ) {
    if (e.detail.tab) {
      this.selectedTab = e.detail.tab;
    } else {
      this.selectedTab = this.getIndexOfTabTitle(
        e.target as HTMLCalciteTabTitleElement
      );
    }

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * @internal
   */
  @Listen("calciteTabsChange", { target: "body" }) globalTabChangeHandler(
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getIndexOfTabTitle(el: HTMLCalciteTabTitleElement) {
    return this.tabTitles.indexOf(el);
  }

  private get tabTitles(): HTMLCalciteTabTitleElement[] {
    return this.el.shadowRoot.querySelector("slot").assignedElements();
  }
}
