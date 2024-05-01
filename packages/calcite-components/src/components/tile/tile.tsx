import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  VNode,
} from "@stencil/core";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Alignment, Layout, Scale, SelectionAppearance, SelectionMode } from "../interfaces";
import { toAriaBoolean } from "../../utils/dom";
import {
  componentFocusable,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { SelectableComponent } from "../../utils/selectableComponent";
import { CSS, ICONS, SLOTS } from "./resources";

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
export class Tile implements InteractiveComponent, SelectableComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, the component is active.
   *
   * @deprecated
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

  /** The component header text, which displays between the icon and description. */
  @Prop({ reflect: true }) heading: string;

  /** When embed is `"false"`, the URL for the component. */
  @Prop({ reflect: true }) href: string;

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */

  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * When true, enables the tile to be focused, and allows the `calciteTileSelect` to emit.
   * This is set to `true` by a parent Tile Group component.
   *
   * @internal
   */
  @Prop() interactive = false;

  /** Accessible name for the component. */
  @Prop() label: string;

  /**
   * Defines the layout of the component.
   *
   * Use `"horizontal"` for rows, and `"vertical"` for a single column.
   *
   * @internal
   */
  @Prop({ reflect: true }) layout: Exclude<Layout, "grid"> = "horizontal";

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * When `true` and the parent's `selectionMode` is `"single"`, `"single-persist"', or `"multiple"`, the component is selected.
   *
   * @internal
   */
  @Prop({ reflect: true }) selected = false;

  /**
   * Specifies the selection appearance, where:
   *
   * - `"icon"` (displays a checkmark or dot), or
   * - `"border"` (displays a border).
   *
   * This property is set by the parent tile-group.
   *
   * @internal
   */
  @Prop({ reflect: true }) selectionAppearance: SelectionAppearance = "icon";

  /**
   * Specifies the selection mode, where:
   *
   * - `"multiple"` (allows any number of selected items),
   * - `"single"` (allows only one selected item),
   * - `"single-persist"` (allows only one selected item and prevents de-selection),
   * - `"none"` (allows no selected items).
   *
   * This property is set by the parent tile-group.
   *
   * @internal
   */
  @Prop({ reflect: true }) selectionMode: Extract<
    "multiple" | "none" | "single" | "single-persist",
    SelectionMode
  > = "none";

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    if (!this.disabled && this.interactive) {
      this.containerEl?.focus();
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTileElement;

  private clickHandler = (): void => {
    if (this.interactive) {
      this.setFocus();
      this.handleSelectEvent();
    }
  };

  private containerEl: HTMLDivElement;

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
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private handleSelectEvent = (): void => {
    if (
      this.disabled ||
      !this.interactive ||
      (this.selectionMode === "single-persist" && this.selected === true)
    ) {
      return;
    }
    this.calciteTileSelect.emit();
  };

  private setContainerEl = (el): void => {
    this.containerEl = el;
  };

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    if (event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.handleSelectEvent();
          event.preventDefault();
          break;
      }
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderSelectionIcon(): VNode {
    const { selected, selectionAppearance, selectionMode } = this;
    if (selectionAppearance === "icon" && selectionMode !== "none") {
      return (
        <calcite-icon
          class={CSS.selectionIcon}
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
    return;
  }

  renderTile(): VNode {
    const { description, disabled, heading, icon, iconFlipRtl, interactive, selectionMode } = this;
    const isLargeVisual = heading && icon && !Boolean(description);
    const disableInteraction = Boolean(this.href) || !interactive;
    const role =
      selectionMode === "multiple" && interactive
        ? "checkbox"
        : selectionMode !== "none" && interactive
          ? "radio"
          : interactive
            ? "button"
            : undefined;
    return (
      <div
        aria-checked={
          selectionMode !== "none" && interactive ? toAriaBoolean(this.selected) : undefined
        }
        aria-disabled={disableInteraction ? toAriaBoolean(disabled) : undefined}
        aria-label={role && this.label}
        class={{
          [CSS.container]: true,
          [CSS.interactive]: interactive,
          // [Deprecated] Use the content-top slot for rendering icon with alignment="center" instead
          [CSS.largeVisualDeprecated]: isLargeVisual,
          [CSS.row]: true,
          [CSS.selected]: this.selected,
        }}
        onClick={this.clickHandler}
        role={role}
        tabIndex={disableInteraction ? undefined : 0}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.setContainerEl}
      >
        {this.renderSelectionIcon()}
        <div class={CSS.column}>
          <slot name={SLOTS.contentTop} />
          {icon && <calcite-icon flipRtl={iconFlipRtl} icon={icon} scale="l" />}
          <div class={{ [CSS.contentContainer]: true, [CSS.row]: true }}>
            <slot name={SLOTS.contentStart} />
            <div class={CSS.textContent}>
              {heading && <div class={CSS.heading}>{heading}</div>}
              {description && <div class={CSS.description}>{description}</div>}
            </div>
            <slot name={SLOTS.contentEnd} />
          </div>
          <slot name={SLOTS.contentBottom} />
        </div>
      </div>
    );
  }

  render(): VNode {
    const { disabled } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        {!!this.href ? (
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
