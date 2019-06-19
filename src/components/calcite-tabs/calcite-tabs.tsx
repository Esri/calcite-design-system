import { Component, Prop, h, Host, Element, Listen } from "@stencil/core";
import { getElementDir, nodeListToArray } from "../../utils/dom";

@Component({
  tag: "calcite-tabs",
  styleUrl: "calcite-tabs.scss",
  shadow: true
})
export class CalciteTabs {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

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

  private registryHandler(e: CustomEvent) {
    // update the `tabIds` and `titleIds` properties from the slotted elements
    this.updateRegistry();

    // force the element that triggered this event to re-render causing it to
    // re-render from the updated `tabIds` and `titleIds` properties.
    (e.target as
      | HTMLCalciteTabTitleElement
      | HTMLCalciteTabElement).forceUpdate();

    // stop propagation to prevent this event from bubbling to other
    // `<calcite-tabs>` elements.
    e.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /**
   * internal
   * Stores an array of ids of <calcite-tab-titles> ids. Needs to be a `Prop` so
   * that child components can access it.
   */
  @Prop({ mutable: true }) titleIds: string[];

  /**
   * internal
   * Stores an array of ids of <calcite-tab> ids. Needs to be a `Prop` so
   * that child components can access it.
   */
  @Prop({ mutable: true }) tabIds: string[];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateRegistry() {
    // determine if we are using `tab` based or `index` based tab identifiers.
    if (
      this.tabElements.some(e => e.tab) ||
      this.titleElements.some(e => e.tab)
    ) {
      // if we are using `tab` based identifiers sort by `tab` to account for
      // possible out of order tabs.
      this.tabIds = this.tabElements
        .sort((a, b) => a.tab.localeCompare(b.tab))
        .map(e => e.id);
      this.titleIds = this.titleElements
        .sort((a, b) => a.tab.localeCompare(b.tab))
        .map(e => e.id);
    } else {
      // if we are using `index` based identifiers the dom order is enough.
      this.tabIds = this.tabElements.map(e => e.id);
      this.titleIds = this.titleElements.map(e => e.id);
    }
  }

  /**
   * internal
   *
   * Returns the child `<calcite-tab>` elements from the `<slot>`.
   */
  private get tabElements() {
    return nodeListToArray(this.el.children).filter(e =>
      e.matches("calcite-tab")
    ) as HTMLCalciteTabElement[];
  }

  /**
   * internal
   *
   * Returns the child `<calcite-tab>` elements from the `<slot>`.
   */
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
}
