import { Component, Element, h, Prop, VNode } from "@stencil/core";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { CSS, SLOTS } from "./resources";
import { Alignment, Scale } from "../interfaces";

/**
 * @slot content-top - A slot for adding non-actionable elements above the component's content.  Content slotted here will render in place of the `icon` property.
 * @slot content-bottom - A slot for adding non-actionable elements below the component's content.
 * @slot content-start - [Deprecated] use `content-top` slot instead.  A slot for adding non-actionable elements before the component's content.
 * @slot content-end - [Deprecated] use `content-bottom` slot instead. A slot for adding non-actionable elements after the component's content.
 */
@Component({
  tag: "calcite-tile",
  styleUrl: "tile.scss",
  shadow: true,
})
export class Tile implements InteractiveComponent {
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
   * Specifies the alignment of the Tile's content.
   */
  @Prop({ reflect: true }) alignment: Exclude<Alignment, "end"> = "start";

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
   *
   * @deprecated No longer necessary.
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
    connectInteractive(this);
  }

  disconnectedCallback(): void {
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
    const { icon, heading, description, iconFlipRtl } = this;
    const isLargeVisual = heading && icon && !description;

    return (
      <div class={{ [CSS.container]: true, [CSS.largeVisual]: isLargeVisual }}>
        <slot name={SLOTS.contentTop} />
        {icon && <calcite-icon flipRtl={iconFlipRtl} icon={icon} scale="l" />}
        <div class={CSS.contentContainer}>
          <slot name={SLOTS.contentStart} />
          <div class={CSS.content}>
            {heading && <div class={CSS.heading}>{heading}</div>}
            {description && <div class={CSS.description}>{description}</div>}
          </div>
          <slot name={SLOTS.contentEnd} />
        </div>
        <slot name={SLOTS.contentBottom} />
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
