import {
  Component,
  Listen,
  Prop,
  Watch,
  Event,
  EventEmitter,
  Element,
  h,
  Host
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";
import { guid } from "../../utils/guid";

@Component({
  tag: "calcite-tab-nav",
  styleUrl: "calcite-tab-nav.scss",
  shadow: true
})
export class CalciteTabNav {
  @Element() el;
  @Prop() storageId: string;
  @Prop() syncId: string;

  @Prop({ mutable: true, reflectToAttr: true })
  id: string = `calcite-tab-nav-${guid()}`;

  @Event() calciteTabChange!: EventEmitter<TabChangeEventDetail>;

  @Prop({ mutable: true })
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

  @Listen("calciteTabsRegisterTitle")
  tabTitleRegistationHandler(e: CustomEvent<TabRegisterEventDetail>) {
    (e.target as HTMLCalciteTabTitleElement).setControlledBy(this.id);
  }

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

  getIndexOfTabTitle(el: HTMLCalciteTabTitleElement) {
    const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
    return Array.prototype.slice.call(tabs).indexOf(el);
  }

  componentWillLoad() {
    if (
      localStorage &&
      this.storageId &&
      localStorage.getItem(`calcite-tab-nav-${this.storageId}`)
    ) {
      this.selectedTab =
        JSON.parse(localStorage.getItem(`calcite-tab-nav-${this.storageId}`)) ||
        this.selectedTab;
    }

    this.selectedTabChanged();
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
}
