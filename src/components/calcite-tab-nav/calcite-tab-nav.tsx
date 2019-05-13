import {
  Component,
  Listen,
  Prop,
  Watch,
  Event,
  EventEmitter
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";

@Component({
  tag: "calcite-tab-nav",
  styleUrl: "calcite-tab-nav.scss",
  shadow: true
})
export class CalciteTabNav {
  @Event() tabChange!: EventEmitter<TabChangeEventDetail>;

  @Prop({ mutable: true })
  selectedTab: number | string = 0;
  @Watch("selectedTab")
  selectedTabChanged() {
    this.tabChange.emit({
      tab: this.selectedTab
    });
  }

  @Listen("tabTitleClicked") tabTitleClickedHandler(
    e: CustomEvent<TabChangeEventDetail>
  ) {
    if (e.detail.tab) {
      this.selectedTab = e.detail.tab;
    } else {
      this.selectedTab = Array.prototype.indexOf.call(
        (e.target as HTMLElement).parentElement.children,
        e.target
      );
    }
  }

  componentWillLoad() {
    this.selectedTabChanged();
  }

  render() {
    return (
      <nav class="tab-nav">
        <slot />
      </nav>
    );
  }
}
