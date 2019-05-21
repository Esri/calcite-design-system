import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
  Method,
  State,
  h,
  Host
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";

import { guid } from "../../utils/guid";
import { SPACE, ENTER, LEFT, RIGHT } from "../../utils/keys";

@Component({
  tag: "calcite-tab-title",
  styleUrl: "calcite-tab-title.scss",
  shadow: true
})
export class CalciteTabTitle {
  @Prop({ mutable: true, reflectToAttr: true }) id: string = `calite-tab-title-${guid()}`;
  @State() private controls: string;
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

  @Event() calciteActivateTab: EventEmitter<TabChangeEventDetail>;
  @Event() calciteFocusNextTab: EventEmitter;
  @Event() calciteFocusPreviousTab: EventEmitter;
  @Event() private calciteRegisterTabTitle: EventEmitter<
    TabRegisterEventDetail
  >;

  @Listen('calciteTabChange', { target: 'parent' }) tabChangeHand(
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

  @Listen("click") onClick() {
    this.calciteActivateTab.emit({
      tab: this.tab
    });
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    switch (e.keyCode) {
      case SPACE:
      case ENTER:
        this.onClick();
        break;
      case RIGHT:
        this.calciteFocusNextTab.emit();
        break;
      case LEFT:
        this.calciteFocusPreviousTab.emit();
        break;
    }
  }

  componentDidLoad() {
    this.getTabIndex().then(index => {
      this.calciteRegisterTabTitle.emit({
        id: this.id,
        index
      });
    });
  }

  @Method()
  async getTabIndex() {
    return Promise.resolve(
      Array.prototype.indexOf.call(
        this.el.parentElement.querySelectorAll("calcite-tab-title"),
        this.el
      )
    );
  }

  @Method()
  async setControledBy(id: string) {
    this.controls = id;
  }

  render() {
    return (
      <Host aria-controls={this.controls} aria-expanded={this.isActive ? "true" : "false"} role="tab" tabindex="0">
        <a>
          <slot />
        </a>
      </Host>
    );
  }
}
