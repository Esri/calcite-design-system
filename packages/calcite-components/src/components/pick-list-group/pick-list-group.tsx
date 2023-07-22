import { Component, Element, Fragment, h, Prop, VNode } from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted } from "../../utils/dom";
import { constrainHeadingLevel, Heading, HeadingLevel } from "../functional/Heading";
import { CSS, SLOTS } from "./resources";

/**
 * @deprecated Use the `list` component instead.
 * @slot - A slot for adding `calcite-pick-list-item` elements.
 */
@Component({
  tag: "calcite-pick-list-group",
  styleUrl: "pick-list-group.scss",
  shadow: true,
})
export class PickListGroup implements ConditionalSlotComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Specifies the title for all nested `calcite-pick-list-item`s.
   *
   */
  @Prop({ reflect: true }) groupTitle: string;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePickListGroupElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el, groupTitle, headingLevel } = this;
    const hasParentItem = getSlotted(el, SLOTS.parentItem) !== null;
    const sectionClasses = {
      [CSS.container]: true,
      [CSS.indented]: hasParentItem,
    };

    const title = groupTitle;
    const parentLevel = el.closest("calcite-pick-list")?.headingLevel;
    const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
    const level = headingLevel || relativeLevel;

    return (
      <Fragment>
        {title ? (
          <Heading class={CSS.heading} level={level}>
            {title}
          </Heading>
        ) : null}
        <slot name={SLOTS.parentItem} />
        <section class={sectionClasses}>
          <slot />
        </section>
      </Fragment>
    );
  }
}
