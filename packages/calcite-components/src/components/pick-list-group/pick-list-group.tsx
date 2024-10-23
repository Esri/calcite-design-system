import { LitElement, property, Fragment, h, JsxNode } from "@arcgis/lumina";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted } from "../../utils/dom";
import { constrainHeadingLevel, Heading, HeadingLevel } from "../functional/Heading";
import { logger } from "../../utils/logger";
import { CSS, SLOTS } from "./resources";
import { styles } from "./pick-list-group.scss";

declare global {
  interface DeclareElements {
    "calcite-pick-list-group": PickListGroup;
  }
}

logger.deprecated("component", {
  name: "pick-list-group",
  removalVersion: 3,
  suggested: "list-item-group",
});

/**
 * @deprecated Use the `calcite-list` component instead.
 * @slot - A slot for adding `calcite-pick-list-item` elements.
 */
export class PickListGroup extends LitElement implements ConditionalSlotComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** Specifies the title for all nested `calcite-pick-list-item`s. */
  @property({ reflect: true }) groupTitle: string;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  override disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
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
      <>
        {title ? (
          <Heading class={CSS.heading} level={level}>
            {title}
          </Heading>
        ) : null}
        <slot name={SLOTS.parentItem} />
        <section class={sectionClasses}>
          <slot />
        </section>
      </>
    );
  }

  // #endregion
}
