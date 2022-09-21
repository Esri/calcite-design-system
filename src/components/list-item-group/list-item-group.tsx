import { Component, Prop, h, VNode, Host, Element } from "@stencil/core";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { CSS } from "./resources";
import { MAX_COLUMNS } from "../list-item/resources";
import { HeadingLevel } from "../functional/Heading";

/**
 * @slot - A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.
 */
@Component({
  tag: "calcite-list-item-group",
  styleUrl: "list-item-group.scss",
  shadow: true
})
export class ListItemGroup implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The header text for all nested `calcite-list-item` rows.
   *
   */
  @Prop({ reflect: true }) heading: string;

  /**
   * Specifies the number at which section headings should start.
   *
   * @deprecated no longer necessary.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

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
    const { heading } = this;

    return (
      <Host>
        <tr class={CSS.heading}>
          <td colSpan={MAX_COLUMNS}>{heading}</td>
        </tr>
        <slot />
      </Host>
    );
  }
}
