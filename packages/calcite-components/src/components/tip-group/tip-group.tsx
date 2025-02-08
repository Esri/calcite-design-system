import { Component, h, Prop, VNode } from "@stencil/core";
import { logger } from "../../utils/logger";

/**
 * @deprecated Use the `calcite-carousel` and `calcite-carousel-item` components instead.
 * @slot - A slot for adding `calcite-tip`s.
 */
@Component({
  tag: "calcite-tip-group",
  styleUrl: "tip-group.scss",
  shadow: true,
})
export class TipGroup {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    logger.deprecated("component", {
      name: "tip-group",
      removalVersion: 4,
      suggested: ["carousel", "carousel-item"],
    });
  }

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * The component header text for all nested `calcite-tip`s.
   *
   */
  @Prop() groupTitle: string;

  render(): VNode {
    return <slot />;
  }
}
