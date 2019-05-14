import {
  Component,
  Prop,
  Element,
  Listen,
  Method,
  Event,
  EventEmitter,
  State
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { Guid } from "../../utils/guid";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";

@Component({
  tag: "calcite-tab",
  styleUrl: "calcite-tab.scss",
  shadow: true
})
export class CalciteTab {
  @Prop({ mutable: true, reflectToAttr: true })
  private id: string = `calite-tab-${Guid.raw()}`;

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

  @Listen("parent:calciteTabChange") tabChangeHandler(
    event: CustomEvent<TabChangeEventDetail>
  ) {
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
        this.el.parentElement.querySelectorAll("calcite-tab"),
        this.el
      )
    );
  }

  @Method()
  registerLabeledBy(id) {
    this.labeledBy = id;
  }

  hostData() {
    return {
      "aria-labeledby": this.labeledBy,
      role: "tabpanel",
      "aria-expanded": this.isActive ? "true" : "false"
    };
  }

  render() {
    return (
      <section>
        <slot />
      </section>
    );
  }
}
