import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
  Method,
  State
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";
import { TabRegisterEventDetail } from "../../interfaces/TabRegister";

import { Guid } from "../../utils/guid";

@Component({
  tag: "calcite-tab-title",
  styleUrl: "calcite-tab-title.scss",
  shadow: true
})
export class CalciteTabTitle {
  @Prop({ mutable: true, reflectToAttr: true })
  private id: string = `calite-tab-title-${Guid.raw()}`;
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

  @Listen("parent:calciteTabChange") tabChangeHand(
    event: CustomEvent<TabChangeEventDetail>
  ) {
    if (this.tab) {
      this.isActive = this.tab === event.detail.tab;
    } else {
      this.isActive = this.getTabIndex() === event.detail.tab;
    }
  }

  @Listen("click") onClick() {
    this.calciteActivateTab.emit({
      tab: this.tab
    });
  }

  @Listen("keydown") keyDownHandler(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 13:
      case 32:
        this.onClick();
        break;
      case 37:
        this.calciteFocusNextTab.emit();
        break;
      case 39:
        this.calciteFocusPreviousTab.emit();
        break;
    }
  }

  componentDidLoad() {
    this.calciteRegisterTabTitle.emit({
      id: this.id,
      index: this.getTabIndex()
    });
  }

  @Method()
  getTabIndex() {
    return Array.prototype.indexOf.call(
      this.el.parentElement.children,
      this.el
    );
  }

  hostData() {
    return {
      "aria-expanded": this.isActive ? "true" : "false",
      role: "tab",
      "aria-controls": this.controls,
      tabindex: 0
    };
  }

  @Method()
  setControledBy(id: string) {
    this.controls = id;
  }

  render() {
    return (
      <a>
        <slot />
      </a>
    );
  }
}
