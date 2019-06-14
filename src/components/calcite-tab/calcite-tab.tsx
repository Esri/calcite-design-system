import {
  Component,
  Prop,
  Element,
  Listen,
  Method,
  Event,
  EventEmitter,
  State,
  h,
  Host
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { guid } from "../../utils/guid";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";
import { nodeListToArray } from "../../utils/dom";

@Component({
  tag: "calcite-tab",
  styleUrl: "calcite-tab.scss",
  shadow: true
})
export class CalciteTab {
  /**
   * @internal
   */
  @Prop({ mutable: true, reflectToAttr: true })
  id: string = `calcite-tab-${guid()}`;

  @State() private labeledBy: string;

  @Element() el: HTMLElement;

  /**
  * Optionally include a unique name for this tab,
  * be sure to also set this name on the associated title.
  */
  @Prop({
    reflectToAttr: true,
    mutable: true
  })
  tab: string;

  /**
  * when active, the tab will be visible
  */
  @Prop({
    reflectToAttr: true,
    mutable: true
  })
  isActive: boolean = false;

  @Listen("calciteTabChange", { target: "parent" }) tabChangeHandler(
    event: CustomEvent<TabChangeEventDetail>
  ) {
    if (
      !nodeListToArray((event.target as HTMLElement).parentNode.children).some(
        child => child == this.el
      )
    ) {
      return;
    }

    if (this.tab) {
      this.isActive = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then(index => {
        this.isActive = index === event.detail.tab;
      });
    }
  }

  /**
  * @internal
  */
  @Event() calciteTabsRegisterTab: EventEmitter<TabRegisterEventDetail>;

  componentDidLoad() {
    this.getTabIndex().then(index => {
      this.calciteTabsRegisterTab.emit({
        id: this.id,
        index
      });
    });
  }

  /**
   * Return the index of this tab within the tab array
  */
  @Method()
  async getTabIndex():Promise<number> {
    return Promise.resolve(
      Array.prototype.indexOf.call(
        nodeListToArray(this.el.parentElement.children).filter(e =>
          e.matches("calcite-tab")
        ),
        this.el
      )
    );
  }

  /**
  * Set which element is the aria label for this tab
  */
  @Method()
  async registerLabeledBy(id) {
    this.labeledBy = id;
  }

  render() {
    return (
      <Host
        aria-labeledby={this.labeledBy}
        aria-expanded={this.isActive ? "true" : "false"}
        role="tabpanel"
      >
        <section>
          <slot />
        </section>
      </Host>
    );
  }
}
