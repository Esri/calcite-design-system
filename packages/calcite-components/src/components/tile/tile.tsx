// @ts-strict-ignore
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Alignment, Layout, Scale, SelectionAppearance, SelectionMode } from "../interfaces";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { SelectableComponent } from "../../utils/selectableComponent";
import { IconNameOrString } from "../icon/interfaces";
import { componentFocusable } from "../../utils/component";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./tile.scss";

declare global {
  interface DeclareElements {
    "calcite-tile": Tile;
  }
}

/**
 * @slot content-top - A slot for adding non-actionable elements above the component's content.  Content slotted here will render in place of the `icon` property.
 * @slot content-bottom - A slot for adding non-actionable elements below the component's content.
 * @slot content-start - [Deprecated] use `content-top` slot instead.  A slot for adding non-actionable elements before the component's content.
 * @slot content-end - [Deprecated] use `content-bottom` slot instead. A slot for adding non-actionable elements after the component's content.
 */
export class Tile extends LitElement implements InteractiveComponent, SelectableComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private containerEl: HTMLDivElement;

  // #endregion

  // #region State Properties

  @state() hasContentBottom = false;

  @state() hasContentEnd = false;

  @state() hasContentStart = false;

  @state() hasContentTop = false;

  // #endregion

  // #region Public Properties

  /**
   * When `true`, the component is active.
   *
   * @deprecated
   */
  @property({ reflect: true }) active = false;

  /** Specifies the alignment of the Tile's content. */
  @property({ reflect: true }) alignment: Exclude<Alignment, "end"> = "start";

  /** A description for the component, which displays below the heading. */
  @property({ reflect: true }) description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The component's embed mode.
   *
   * When `true`, renders without a border and padding for use by other components.
   *
   * @deprecated No longer necessary.
   */
  @property({ reflect: true }) embed = false;

  /** The component header text, which displays between the icon and description. */
  @property({ reflect: true }) heading: string;

  /** When embed is `"false"`, the URL for the component. */
  @property({ reflect: true }) href: string;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /**
   * When true, enables the tile to be focused, and allows the `calciteTileSelect` to emit.
   * This is set to `true` by a parent Tile Group component.
   *
   * @private
   */
  @property() interactive = false;

  /** Accessible name for the component. */
  @property() label: string;

  /**
   * Defines the layout of the component.
   *
   * Use `"horizontal"` for rows, and `"vertical"` for a single column.
   *
   * @private
   */
  @property({ reflect: true }) layout: Extract<Layout, "horizontal" | "vertical"> = "horizontal";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When `true` and the parent's `selectionMode` is `"single"`, `"single-persist"', or `"multiple"`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /**
   * Specifies the selection appearance, where:
   *
   * - `"icon"` (displays a checkmark or dot), or
   * - `"border"` (displays a border).
   *
   * This property is set by the parent tile-group.
   *
   * @private
   */
  @property({ reflect: true }) selectionAppearance: SelectionAppearance = "icon";

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
   * @private
   */
  @property({ reflect: true }) selectionMode: Extract<
    "multiple" | "none" | "single" | "single-persist",
    SelectionMode
  > = "none";

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    if (!this.disabled && this.interactive) {
      this.containerEl?.focus();
    }
  }

  // #endregion

  // #region Events

  /** @private */
  calciteInternalTileKeyEvent = createEvent<KeyboardEvent>({ cancelable: false });

  /** Fires when the selected state of the component changes. */
  calciteTileSelect = createEvent();

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods

  private clickHandler(): void {
    if (this.interactive) {
      this.setFocus();
      this.handleSelectEvent();
    }
  }

  private handleSelectEvent(): void {
    if (
      this.disabled ||
      !this.interactive ||
      (this.selectionMode === "single-persist" && this.selected === true)
    ) {
      return;
    }
    this.calciteTileSelect.emit();
  }

  private handleSlotChange(event: Event): void {
    const slotName = (event.target as HTMLSlotElement).dataset.name;
    this[`has${slotName}`] = slotChangeHasAssignedElement(event);
  }

  private setContainerEl(el): void {
    this.containerEl = el;
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.handleSelectEvent();
          event.preventDefault();
          break;
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "Home":
        case "End":
          this.calciteInternalTileKeyEvent.emit(event);
          event.preventDefault();
          break;
      }
    }
  }

  // #endregion

  // #region Rendering

  private renderSelectionIcon(): JsxNode {
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

  private renderTile(): JsxNode {
    const {
      description,
      disabled,
      hasContentBottom,
      hasContentEnd,
      hasContentStart,
      hasContentTop,
      heading,
      icon,
      iconFlipRtl,
      interactive,
      selectionMode,
    } = this;
    const isLargeVisual = heading && icon && !description;
    const disableInteraction = Boolean(this.href) || !interactive;
    const role =
      selectionMode === "multiple" && interactive
        ? "checkbox"
        : selectionMode !== "none" && interactive
          ? "radio"
          : interactive
            ? "button"
            : undefined;
    const hasContent = !!(description || hasContentEnd || hasContentStart || heading || icon);
    const hasOnlyContentTopAndBottom = !hasContent && hasContentTop && hasContentBottom;
    return (
      <div
        ariaChecked={selectionMode !== "none" && interactive ? this.selected : undefined}
        ariaDisabled={disableInteraction ? disabled : undefined}
        ariaLabel={role && this.label}
        class={{
          [CSS.container]: true,
          [CSS.interactive]: interactive,
          // [Deprecated] Use the content-top slot for rendering icon with alignment="center" instead
          [CSS.largeVisualDeprecated]: isLargeVisual,
          [CSS.row]: true,
          [CSS.selected]: this.selected,
        }}
        onClick={this.clickHandler}
        ref={this.setContainerEl}
        role={role}
        tabIndex={disableInteraction ? undefined : 0}
      >
        {this.renderSelectionIcon()}
        <div
          class={{
            [CSS.contentContainer]: true,
            [CSS.contentContainerHasContent]: hasContent,
            [CSS.contentContainerHasOnlyContentTopAndBottom]: hasOnlyContentTopAndBottom,
          }}
        >
          <slot name={SLOTS.contentTop} onSlotChange={this.handleSlotChange} />
          {icon && <calcite-icon class={CSS.icon} flipRtl={iconFlipRtl} icon={icon} scale="l" />}
          <div class={{ [CSS.textContentContainer]: true, [CSS.row]: true }}>
            <slot name={SLOTS.contentStart} onSlotChange={this.handleSlotChange} />
            <div class={CSS.textContent}>
              {heading && <div class={CSS.heading}>{heading}</div>}
              {description && <div class={CSS.description}>{description}</div>}
            </div>
            <slot name={SLOTS.contentEnd} onSlotChange={this.handleSlotChange} />
          </div>
          <slot name={SLOTS.contentBottom} onSlotChange={this.handleSlotChange} />
        </div>
      </div>
    );
  }

  override render(): JsxNode {
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

  // #endregion
}
