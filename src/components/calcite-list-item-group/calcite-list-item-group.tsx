import { Component, Element, Prop, h, VNode, Host } from "@stencil/core";
import { CSS } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
import { HEADING_LEVEL } from "./resources";
import { getElementDir } from "../../utils/dom";
import { HeadingLevel, CalciteHeading, constrainHeadingLevel } from "../functional/CalciteHeading";

/**
 * @slot - A slot for adding `calcite-list-item` elements.
 */
@Component({
  tag: "calcite-list-item-group",
  styleUrl: "./calcite-list-item-group.scss",
  shadow: true
})
export class CalciteListItemGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * The title used for all nested `calcite-list-item` rows.
   *
   */
  @Prop({ reflect: true }) label: string;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListItemGroupElement;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el, label, headingLevel } = this;
    const rtl = getElementDir(el) === "rtl";
    const containerClasses = {
      [CSS.container]: true,
      [CSS_UTILITY.rtl]: rtl
    };

    const parentLevel = el.closest<HTMLCalciteListElement | HTMLCalciteListItemGroupElement>(
      "calcite-list, calcite-list-item-group"
    )?.headingLevel;
    const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
    const level = headingLevel || relativeLevel || HEADING_LEVEL;

    return (
      <Host>
        {label ? (
          <CalciteHeading class={CSS.heading} level={level}>
            {label}
          </CalciteHeading>
        ) : null}
        <div class={containerClasses} role="group">
          <slot />
        </div>
      </Host>
    );
  }
}
