import { Component, Element, Prop, h, VNode, Host } from "@stencil/core";
import { CSS } from "./resources";
import { HEADING_LEVEL } from "./resources";
import { HeadingLevel, Heading, constrainHeadingLevel } from "../functional/Heading";

/**
 * @slot - A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.
 */
@Component({
  tag: "calcite-list-item-group",
  styleUrl: "list-item-group.scss",
  shadow: true
})
export class ListItemGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * The title for all nested `calcite-list-item` rows.
   *
   */
  @Prop({ reflect: true }) heading: string;

  /**
   * Number at which section headings should start for the group.
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
    const { el, heading, headingLevel } = this;

    const parentLevel = el.closest<HTMLCalciteListElement | HTMLCalciteListItemGroupElement>(
      "calcite-list, calcite-list-item-group"
    )?.headingLevel;
    const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
    const level = headingLevel || relativeLevel || HEADING_LEVEL;

    return (
      <Host>
        {heading ? (
          <Heading class={CSS.heading} level={level}>
            {heading}
          </Heading>
        ) : null}
        <div class={CSS.container} role="group">
          <slot />
        </div>
      </Host>
    );
  }
}
