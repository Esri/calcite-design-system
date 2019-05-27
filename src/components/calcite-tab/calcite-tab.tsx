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

@Component({
  tag: "calcite-tab",
  styleUrl: "calcite-tab.scss",
  shadow: true
})
export class CalciteTab {
  @Prop({ mutable: true, reflectToAttr: true })
  id: string = `calite-tab-${guid()}`;

  @State() private labeledBy: string;

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

  @Listen("calciteTabChange", { target: "parent" }) tabChangeHandler(
    event: CustomEvent<TabChangeEventDetail>
  ) {
    if (
      ![...(event.target as any).parentNode.children].some(
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

  @Event() calciteRegisterTab: EventEmitter<TabRegisterEventDetail>;

  componentDidLoad() {
    this.getTabIndex().then(index => {
      this.calciteRegisterTab.emit({
        id: this.id,
        index
      });
    });
  }

  @Method()
  async getTabIndex() {
    return Promise.resolve(
      Array.prototype.indexOf.call(
        [...(this as any).el.parentElement.children].filter(e =>
          e.matches("calcite-tab")
        ),
        this.el
      )
    );
  }

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
