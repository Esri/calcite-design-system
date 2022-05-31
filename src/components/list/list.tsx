import { Component, Element, h, VNode, Prop, Method } from "@stencil/core";
import { CSS } from "./resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 * @slot - A slot for adding `calcite-list-item` elements.
 */
@Component({
  tag: "calcite-list",
  styleUrl: "list.scss",
  shadow: true
})
export class List implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, prevents user interaction.
   */
  @Prop({ reflect: true }) disabled = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListElement;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    // todo
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <table role="treegrid">
        <tbody class={CSS.container}>
          <slot />
        </tbody>
      </table>
    );
  }
}
