import { Component, Element, Event, EventEmitter, h, Listen, Prop, VNode } from "@stencil/core";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { CSS, ICONS, SLOTS } from "./resources";
import { Alignment, Scale, SelectionAppearance, SelectionMode } from "../interfaces";

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
   * When true, enables the tile to be focused, and allows the `calciteChipSelect` to emit.
   * This is set to `true` by a parent Chip Group component.
   *
   * @internal
   */
  @Prop() interactive = false;

  /**
   * When `true` and the parent's `selectionMode` is `"single"`, `"single-persist"', or `"multiple"`, the component is selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * Specifies the selection appearance, where:
   *
   * - `"icon"` (displays a checkmark or dot), or
   * - `"border"` (displays a border).
   *
   * @internal
   */
  @Prop() selectionAppearance: SelectionAppearance = null;

  /**
   * Specifies the selection mode, where:
   *
   * - `"multiple"` (allows any number of selected items),
   * - `"single"` (allows only one selected item),
   * - `"single-persist"` (allows only one selected item and prevents de-selection),
   * - `"none"` (allows no selected items).
   *
   * @internal
   */
  @Prop() selectionMode: Extract<"multiple" | "none" | "single" | "single-persist", SelectionMode> =
    "none";

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

  @Listen("click")
  toggleSelected(): void {
    const { selectionMode, selected } = this;
    const previousSelected = selected;

    if (this.disabled) {
      return;
    }

    if (selectionMode === "multiple" || selectionMode === "single") {
      this.selected = !selected;
    } else if (selectionMode === "single-persist") {
      this.selected = true;
    }

    if (previousSelected !== this.selected) {
      this.calciteTileSelect.emit();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the selected state of the component changes.
   */
  @Event() calciteTileSelect: EventEmitter<void>;

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

  renderSelected(): VNode {
    const { selected, selectionMode } = this;
    if (selectionMode === "none") {
      return;
    }
    return (
      <calcite-icon
        icon={
          selected
            ? selectionMode === "multiple"
              ? ICONS.selectedMultiple
              : ICONS.selectedSingle
            : selectionMode === "multiple"
              ? ICONS.unselectedMultiple
              : ICONS.unselectedSingle
        }
        scale="s"
      />
    );
  }

  renderTile(): VNode {
    const { disabled, icon, heading, description, iconFlipRtl } = this;
    const isLargeVisual = heading && icon && !description;
    const disableInteraction = disabled || (!disabled && !this.interactive);
    return (
      <div
        class={{ [CSS.container]: true, [CSS.largeVisual]: isLargeVisual }}
        tabIndex={disableInteraction ? -1 : 0}
      >
        {this.renderSelected()}
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
