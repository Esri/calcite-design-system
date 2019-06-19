import { Component, Prop, h, Host, Element } from "@stencil/core";
import { getElementDir, nodeListToArray } from "../../utils/dom";

@Component({
  tag: "calcite-tabs",
  styleUrl: "calcite-tabs.scss",
  shadow: true
})
export class CalciteTabs {
  @Element() el: HTMLElement;
  @Prop({ mutable: true }) titleIds: string[];
  @Prop({ mutable: true }) tabIds: string[];

  navMutationObserver: MutationObserver;
  tabsMutationObserver: MutationObserver;

  /**
   * Select theme (light or dark)
   */
  @Prop({
    reflectToAttr: true
  })
  theme: "light" | "dark" = "light";

  /**
   * Align tab titles to the edge or fully justify them across the tab nav ("center")
   */
  @Prop({
    reflectToAttr: true
  })
  layout: "center" | "inline" = "inline";

  componentWillLoad() {
    this.tabIds = this.tabElements.map(e => e.id);
    this.titleIds = this.titleElements.map(e => e.id);

    this.tabsMutationObserver = new MutationObserver(() => {
      this.tabIds = this.tabElements.map(e => e.id);
    });
    this.tabsMutationObserver.observe(this.el, { childList: true });

    this.navMutationObserver = new MutationObserver(() => {
      this.titleIds = this.titleElements.map(e => e.id);
    });
    this.navMutationObserver.observe(this.navElement, { childList: true });
  }

  componentWillUnload() {
    this.tabsMutationObserver.disconnect();
    this.navMutationObserver.disconnect();
  }

  private get tabElements() {
    return nodeListToArray(this.el.children).filter(e =>
      e.matches("calcite-tab")
    ) as HTMLCalciteTabElement[];
  }

  private get navElement() {
    return nodeListToArray(this.el.children).find(e =>
      e.matches("calcite-tab-nav")
    ) as HTMLCalciteTabNavElement;
  }

  private get titleElements() {
    return nodeListToArray(this.navElement.children).filter(e =>
      e.matches("calcite-tab-title")
    ) as HTMLCalciteTabTitleElement[];
  }

  render() {
    const dir = getElementDir(this.el);

    return (
      <Host dir={dir}>
        <div>
          <slot name="tab-nav" />
          <section class="tab-contents">
            <slot />
          </section>
        </div>
      </Host>
    );
  }
}
