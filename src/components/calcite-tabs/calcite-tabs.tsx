import { Component, Prop, Listen, State, h } from "@stencil/core";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";

interface TabRegister {
  [key: string]: {
    id: string;
    tab: HTMLCalciteTabElement;
  };
}

interface TabTitleRegister {
  [key: string]: {
    id: string;
    title: HTMLCalciteTabTitleElement;
  };
}

@Component({
  tag: "calcite-tabs",
  styleUrl: "calcite-tabs.scss",
  shadow: true
})
export class CalciteTabs {
  @State() tabs: TabRegister = {};
  @State() tabTitles: TabTitleRegister = {};
  @Prop({
    reflectToAttr: true
  })
  theme: "light" | "dark" = "light";

  @Listen("calciteRegisterTabTitle") tabTitleRegistationHandler(
    e: CustomEvent<TabRegisterEventDetail>
  ) {
    const { index, id } = e.detail;

    this.tabTitles[index] = {
      id: id,
      title: e.target as HTMLCalciteTabTitleElement
    };

    if (this.tabs[index]) {
      this.tabs[index].tab.registerLabeledBy(id);
    }
  }

  @Listen("calciteRegisterTab") tabRegistationHandler(
    e: CustomEvent<TabRegisterEventDetail>
  ) {
    const { index, id } = e.detail;
    this.tabs[index] = {
      id: id,
      tab: e.target as HTMLCalciteTabElement
    };

    if (this.tabTitles[index]) {
      this.tabs[index].tab.registerLabeledBy(this.tabTitles[index].id);
    }
  }

  render() {
    return (
      <div>
        <slot name="tab-nav" />
        <section class="tab-contents">
          <slot />
        </section>
      </div>
    );
  }
}
