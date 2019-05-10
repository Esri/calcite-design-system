import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";

@Component({
  tag: "calcite-tab-title",
  styleUrl: "calcite-tab-title.scss",
  shadow: true
})
export class CalciteTabTitle {
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

  @Event() tabTitleClicked: EventEmitter<TabChangeEventDetail>;

  @Listen("click") onClick() {
    this.tabTitleClicked.emit({
      tab: this.tab
    });
  }

  @Listen("parent:tabChange") tabChangeHand(
    event: CustomEvent<TabChangeEventDetail>
  ) {
    if (this.tab) {
      this.isActive = this.tab === event.detail.tab;
    } else {
      const index = Array.prototype.indexOf.call(
        this.el.parentElement.children,
        this.el
      );

      this.isActive = index === event.detail.tab;
    }
  }

  render() {
    return (
      <a>
        <slot />
      </a>
    );
  }
}
