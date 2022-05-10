import { Component, Prop, h, VNode, Host } from "@stencil/core";
import { CSS } from "./resources";

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
   * The title used for all nested `calcite-list-item` rows.
   *
   */
  @Prop({ reflect: true }) heading: string;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { heading } = this;

    return (
      <Host>
        <tr class={CSS.heading}>
          <td colSpan={3}>{heading}</td>
        </tr>
        <slot />
      </Host>
    );
  }
}
