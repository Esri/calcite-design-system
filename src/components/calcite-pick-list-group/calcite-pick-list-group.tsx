import { Component, Element, Host, Prop, h, VNode } from "@stencil/core";
import { CSS, SLOTS } from "./resources";
import { CSS_UTILITY } from "../utils/resources";
import { getElementDir, getSlotted } from "../utils/dom";

/**
 * @slot - A slot for adding `calcite-pick-list-item` elements.
 */
@Component({
  tag: "calcite-pick-list-group",
  styleUrl: "./calcite-pick-list-group.scss",
  shadow: true
})
export class CalcitePickListGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * The title used for all nested `calcite-pick-list` rows
   */
  @Prop({ reflect: true }) textGroupTitle: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePickListGroupElement;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el, textGroupTitle } = this;
    const rtl = getElementDir(el) === "rtl";
    const hasParentItem = getSlotted(el, SLOTS.parentItem) !== null;
    const sectionClasses = {
      [CSS.container]: true,
      [CSS.indented]: hasParentItem,
      [CSS_UTILITY.rtl]: rtl
    };

    return (
      <Host>
        {textGroupTitle ? <h3 class={CSS.heading}>{textGroupTitle}</h3> : null}
        <slot name={SLOTS.parentItem} />
        <section class={sectionClasses}>
          <slot />
        </section>
      </Host>
    );
  }
}
