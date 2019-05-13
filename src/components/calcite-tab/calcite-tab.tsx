import { Component, Prop, Element, Listen } from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";

@Component({
  tag: "calcite-tab",
  styleUrl: "calcite-tab.scss",
  shadow: true
})
export class CalciteTab {
  @Element() el: HTMLElement;

  @Prop({
    reflectToAttr: true,
    mutable: true
  })
  tab: string;

  @Prop({
    reflectToAttr: true,
    mutable: true
  })
  isActive: boolean = false;

  @Listen("parent:tabChange") tabChangeHandler(
    event: CustomEvent<TabChangeEventDetail>
  ) {
    if (this.tab) {
      this.isActive = this.tab === event.detail.tab;
    } else {
      const index = Array.prototype.indexOf.call(
        this.el.parentElement.querySelectorAll("calcite-tab"),
        this.el
      );
      this.isActive = index === event.detail.tab;
    }
  }

  render() {
    return (
      <section>
        <slot />
      </section>
    );
  }
}
