import {
  Component,
  Listen,
  Prop,
  Watch,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";
import { Guid } from "../../utils/guid";

@Component({
  tag: "calcite-tab-nav",
  styleUrl: "calcite-tab-nav.scss",
  shadow: true
})
export class CalciteTabNav {
  @Element() el;
  @Prop({ mutable: true, reflectToAttr: true })
  private id: string = `calite-tab-nav-${Guid.raw()}`;

  @Event() calciteTabChange!: EventEmitter<TabChangeEventDetail>;

  @Prop({ mutable: true })
  selectedTab: number | string = 0;

  @Watch("selectedTab")
  selectedTabChanged() {
    this.calciteTabChange.emit({
      tab: this.selectedTab
    });
  }

  @Listen("calciteFocusPreviousTab") focusPreviousTabHandler(e: CustomEvent) {
    const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
    const currentIndex = this.getIndexOfTabTitle(
      e.target as HTMLCalciteTabTitleElement
    );
    const previousTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
    previousTab.focus();
  }

  @Listen("calciteFocusNextTab") focusNextTabHandler(e: CustomEvent) {
    const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
    const currentIndex = this.getIndexOfTabTitle(
      e.target as HTMLCalciteTabTitleElement
    );
    const nextTab = tabs[currentIndex + 1] || tabs[0];
    nextTab.focus();
  }

  @Listen("calciteRegisterTabTitle")
  tabTitleRegistationHandler(e: CustomEvent<TabRegisterEventDetail>) {
    (e.target as HTMLCalciteTabTitleElement).setControledBy(this.id);
  }

  @Listen("calciteActivateTab") activateTabHandler(
    e: CustomEvent<TabChangeEventDetail>
  ) {
    if (e.detail.tab) {
      this.selectedTab = e.detail.tab;
    } else {
      this.selectedTab = this.getIndexOfTabTitle(
        e.target as HTMLCalciteTabTitleElement
      );
    }
  }

  getIndexOfTabTitle(el: HTMLCalciteTabTitleElement) {
    const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
    return [...tabs].indexOf(el);
  }

  componentWillLoad() {
    this.selectedTabChanged();
  }

  hostData() {
    return {
      role: "tablist"
    };
  }

  render() {
    return (
      <nav class="tab-nav">
        <slot />
      </nav>
    );
  }
}
