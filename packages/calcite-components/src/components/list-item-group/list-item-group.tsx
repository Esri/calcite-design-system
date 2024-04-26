import { Component, Element, Event, EventEmitter, h, Host, Prop, VNode } from "@stencil/core";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { MAX_COLUMNS } from "../list-item/resources";
import { CSS } from "./resources";
/**
 * @slot - A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.
 */
@Component({
  tag: "calcite-list-item-group",
  styleUrl: "list-item-group.scss",
  shadow: true,
})
export class ListItemGroup implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Hides the component when filtered.
   *
   * @internal
   */
  @Prop({ reflect: true }) filterHidden = false;

  /**
   * The header text for all nested `calcite-list-item` rows.
   *
   */
  @Prop({ reflect: true }) heading: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when changes occur in the default slot, notifying parent lists of the changes.
   */
  @Event({ cancelable: false })
  calciteInternalListItemGroupDefaultSlotChange: EventEmitter<DragEvent>;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
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
    const { disabled, heading } = this;
    return (
      <Host>
        <InteractiveContainer disabled={disabled}>
          <tr class={CSS.container}>
            <td class={CSS.heading} colSpan={MAX_COLUMNS}>
              {heading}
            </td>
          </tr>
          <slot onSlotchange={this.handleDefaultSlotChange} />
        </InteractiveContainer>
      </Host>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private handleDefaultSlotChange = (): void => {
    this.calciteInternalListItemGroupDefaultSlotChange.emit();
  };
}
