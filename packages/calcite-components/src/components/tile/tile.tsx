import { Component, Element, h, Prop, VNode } from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted } from "../../utils/dom";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { SLOTS } from "./resources";
import { Scale } from "../interfaces";

/**
 * @slot content-start - A slot for adding non-actionable elements before the component's content.
 * @slot content-end - A slot for adding non-actionable elements after the component's content.
 */
@Component({
  tag: "calcite-tile",
  styleUrl: "tile.scss",
  shadow: true,
})
export class Tile implements ConditionalSlotComponent, InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, the component is active.
   */
  @Prop({ reflect: true }) active = false;

  /**
   * A description for the component, which displays below the heading.
   */
  @Prop({ reflect: true }) description: string;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The component's embed mode.
   *
   * When `true`, renders without a border and padding for use by other components.
   */
  @Prop({ reflect: true }) embed = false;

  /**
   * The focused state of the component.
   *
   * @internal
   */
  @Prop({ reflect: true }) focused = false;

  /** The component header text, which displays between the icon and description. */
  @Prop({ reflect: true }) heading: string;

  /** When `true`, the component is not displayed and is not focusable.  */
  @Prop({ reflect: true }) hidden = false;

  /** When embed is `"false"`, the URL for the component. */
  @Prop({ reflect: true }) href: string;

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */

  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTileElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    connectInteractive(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
    disconnectInteractive(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderTile(): VNode {
    const { icon, el, heading, description, iconFlipRtl } = this;
    const isLargeVisual = heading && icon && !description;

    return (
      <div class={{ container: true, "large-visual": isLargeVisual }}>
        {icon && <calcite-icon flipRtl={iconFlipRtl} icon={icon} scale="l" />}
        <div class="content-container">
          {getSlotted(el, SLOTS.contentStart) ? (
            <div class="content-slot-container">
              <slot name={SLOTS.contentStart} />
            </div>
          ) : null}
          <div class="content">
            {heading && <div class="heading">{heading}</div>}
            {description && <div class="description">{description}</div>}
          </div>
          {getSlotted(el, SLOTS.contentEnd) ? (
            <div class="content-slot-container">
              <slot name={SLOTS.contentEnd} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  render(): VNode {
    const { disabled } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        {this.href ? (
          <calcite-link disabled={disabled} href={this.href}>
            {this.renderTile()}
          </calcite-link>
        ) : (
          this.renderTile()
        )}
      </InteractiveContainer>
    );
  }
}
