import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
  Method,
  h,
  Host
} from "@stencil/core";
import { TabChangeEventDetail } from "../../interfaces/TabChange";

import { guid } from "../../utils/guid";
import { SPACE, ENTER, LEFT, RIGHT } from "../../utils/keys";

@Component({
  tag: "calcite-tab-title",
  styleUrl: "calcite-tab-title.scss",
  shadow: true
})
export class CalciteTabTitle {
  @Element() el: HTMLElement;

  /**
   * Optionally include a unique name for the tab title,
   * be sure to also set this name on the associated tab.
   */
  @Prop({
    reflectToAttr: true,
    mutable: true
  })
  tab: string;

  /**
   * Show this title as selected
   */
  @Prop({
    reflectToAttr: true,
    mutable: true
  })
  isActive: boolean = false;

  /**
   * Fires when a specific tab is activated. `event.details`: [TabChangeEventDetail](../../interfaces/TabChange.ts)
   */
  @Event() calciteTabsActivate: EventEmitter<TabChangeEventDetail>;
  /**
   * @internal
   */
  @Event() calciteTabsFocusNext: EventEmitter;
  /**
   * @internal
   */
  @Event() calciteTabsFocusPrevious: EventEmitter;

  @Listen("calciteTabChange", { target: "parent" }) tabChangeHandler(
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
    this.calciteTabsActivate.emit({
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
        this.calciteTabsFocusNext.emit();
        break;
      case LEFT:
        this.calciteTabsFocusPrevious.emit();
        break;
    }
  }

  guid = `calcite-tab-title-${guid()}`;

  /**
   * Return the index of this title within the nav
   */
  @Method()
  async getTabIndex(): Promise<number> {
    return Promise.resolve(
      Array.prototype.indexOf.call(
        this.el.parentElement.querySelectorAll("calcite-tab-title"),
        this.el
      )
    );
  }

  render() {
    const parentTabs = this.el.closest("calcite-tabs");
    const id = this.el.id || this.guid;

    var controls = null;
    if (parentTabs) {
      const { titleIds, tabIds } = parentTabs;
      const index = titleIds && titleIds.indexOf(id);
      controls = tabIds && tabIds[index];
    }

    return (
      <Host
        id={id}
        aria-controls={controls}
        aria-expanded={this.isActive ? "true" : "false"}
        role="tab"
        tabindex="0"
      >
        <a>
          <slot />
        </a>
      </Host>
    );
  }

  @Event() calciteTabTitleRegister: EventEmitter;
  @Event() calciteTabTitleUnregister: EventEmitter;

  componentDidLoad() {
    this.calciteTabTitleRegister.emit();
  }

  componentDidUnload() {
    this.calciteTabTitleUnregister.emit();
  }
}
