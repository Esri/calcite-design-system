import { Component, Prop, h, Host, Element, Listen } from "@stencil/core";
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

  updateRegistry() {
    if (
      this.tabElements.some(e => e.tab) ||
      this.titleElements.some(e => e.tab)
    ) {
      this.tabIds = this.tabElements
        .sort((a, b) => a.tab.localeCompare(b.tab))
        .map(e => e.id);
      this.titleIds = this.titleElements
        .sort((a, b) => a.tab.localeCompare(b.tab))
        .map(e => e.id);
    } else {
      this.tabIds = this.tabElements.map(e => e.id);
      this.titleIds = this.titleElements.map(e => e.id);
    }
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

  @Listen("calciteTabTitleRegister") calciteTabTitleRegister(e: CustomEvent) {
    this.registryHandler(e);
  }

  @Listen("calciteTabTitleUnregister") calciteTabTitleUnregister(
    e: CustomEvent
  ) {
    this.registryHandler(e);
  }

  @Listen("calciteTabRegister") calciteTabRegister(e: CustomEvent) {
    this.registryHandler(e);
  }

  @Listen("calciteTabUnregister") calciteTabUnregister(e: CustomEvent) {
    this.registryHandler(e);
  }

  registryHandler(e: CustomEvent) {
    this.updateRegistry();
    (e.target as
      | HTMLCalciteTabTitleElement
      | HTMLCalciteTabElement).forceUpdate();
    e.stopPropagation();
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
