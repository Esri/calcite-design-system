import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode, method } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { ComboboxChildElement } from "../combobox/types";
import { getAncestors, getDepth, isSingleLike } from "../combobox/utils";
import { Scale, SelectionAppearance, SelectionMode } from "../types";
import { getIconScale } from "../../utils/component";
import { IconName } from "../icon/types";
import { slotChangeHasContent } from "../../utils/dom";
import { highlightText } from "../../utils/text";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS, ICONS, SLOTS, itemSpacingMultiplier } from "./resources";
import { styles } from "./combobox-item.scss";

declare global {
  interface DeclareElements {
    "calcite-combobox-item": ComboboxItem;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's border color.
     *
     * @deprecated in v3.3.0, removal target v6.0.0.
     * @public
     */
    "--calcite-combobox-item-border-color": "*";
    /**
     * Specifies the component's text and `icon` color.
     *
     * @public
     */
    "--calcite-combobox-text-color": "*";
    /**
     * Specifies the component's text and `icon` color when hovered.
     *
     * @public
     */
    "--calcite-combobox-text-color-hover": "*";
    /**
     * When `active`, specifies the component's background color.
     *
     * @public
     */
    "--calcite-combobox-item-background-color-active": "*";
    /**
     * Specifies the component's background color when hovered.
     *
     * @public
     */
    "--calcite-combobox-item-background-color-hover": "*";
    /**
     * Specifies the component's shadow.
     *
     * @public
     */
    "--calcite-combobox-item-shadow": "*";
    /**
     * Specifies the component's `selected` indicator icon color.
     *
     * @public
     */
    "--calcite-combobox-selected-icon-color": "*";
    /**
     * Specifies the component's `description` and `shortHeading` text color.
     *
     * @public
     */
    "--calcite-combobox-description-text-color": "*";
    /**
     * Specifies the component's `description` and `shortHeading` text color when hovered.
     *
     * @public
     */
    "--calcite-combobox-description-text-color-press": "*";
    /**
     * Specifies the component's `heading` text color.
     *
     * @public
     */
    "--calcite-combobox-heading-text-color": "*";
  }
}

/** @public */
interface ComboboxItemSlots {
  /**
   * A slot for adding nested `calcite-combobox-item`s.
   *
   * @public
   */
  "": Node[];
  /**
   * A slot for adding non-actionable elements after the component's content.
   *
   * @public
   */
  "content-end": Node[];
  /**
   * A slot for adding non-actionable elements before the component's content.
   *
   * @public
   */
  "content-start": Node[];
}

/**
 * @public
 * @docGroup Combobox
 * @parent calcite-combobox
 */
export class ComboboxItem extends LitElement {
  //#region Type-only metadata members

  /** @public */
  override ["@slots"]!: ComboboxItemSlots;

  //#endregion

  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private _selected = false;

  private _value: any;

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region State Properties

  @state() hasContent = false;

  //#endregion

  //#region Public Properties

  /**
   * When `true`, the component is active.
   *
   * @public
   */
  @property({ reflect: true }) active = false;

  /**
   * Specifies the parent and grandparent `calcite-combobox-item`s, which are set on `calcite-combobox`.
   *
   * @public
   */
  @property() ancestors?: ComboboxChildElement[];

  /**
   * @public
   * @copyDoc
   */
  @property() description?: string;

  /**
   * When `true`, prevents interaction and decreases the component's opacity.
   *
   * @public
   */
  @property({ reflect: true }) disabled = false;

  /**
   * When `true`, omits the component from the `calcite-combobox` filtered search results.
   *
   * @public
   */
  @property({ reflect: true }) filterDisabled = false;

  /**
   * Pattern for highlighting filter text matches.
   * @internal
   */
  @property({ reflect: true }) filterTextMatchPattern?: RegExp;

  /**
   * The `id` attribute of the component. When omitted, a globally unique identifier is used.
   *
   * @public
   */
  @property({ reflect: true }) guid = guid();

  /**
   * @public
   * @copyDoc
   * @required
   */
  @property() heading!: string;

  /**
   * Specifies an icon to display.
   *
   * @public
   */
  @property({ reflect: true }) icon?: IconName;

  /**
   * When `true` and the element direction is right-to-left (`"rtl"`), flips the component`s `icon`.
   *
   * @public
   */
  @property({ reflect: true }) iconFlipRtl = false;

  /**
   * @public
   * @copyDoc
   */
  @property() label: any;

  /**
   * Specifies additional metadata to the component for use in filtering.
   *
   * @public
   */
  @property() metadata?: Record<string, unknown>;

  /**
   * Specifies the size of the component inherited from the `calcite-combobox`, defaults to `m`.
   * @internal
   */
  @property() scale: Scale = "m";

  /**
   * When `true`, the component is selected.
   *
   * @public
   */
  @property({ reflect: true })
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    const oldValue = this._selected;
    if (value !== oldValue) {
      this._selected = value;
      // we emit directly to avoid delays updating the parent combobox
      this.emitItemChange();
    }
  }

  /**
   * Specifies the selection mode of the component.
   *
   * - `"multiple"` allows any number of selections.
   * - `"single"` allows only one selection.
   * - `"single-persist"` allows one selection and prevents de-selection.
   * - `"ancestors"` allows multiple selections, but shows ancestors of selected items as selected, with only deepest children shown in chips.
   * @internal
   */
  @property({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "ancestors" | "multiple",
    SelectionMode
  > = "multiple";

  /**
   * Specifies the selection appearance.
   *
   * - `"icon"` displays a radio or checkbox.
   * - `"highlight"` displays a background highlight.
   * @internal
   */
  @property({ reflect: true }) selectionAppearance: Extract<
    "icon" | "highlight",
    SelectionAppearance
  > = "icon";

  /**
   * Specifies the component's short heading.
   *
   * When provided, the short heading will be displayed in the component's selection.
   *
   * It is recommended to use 5 characters or fewer.
   *
   * @public
   */
  @property() shortHeading?: string;

  /**
   * The component's value. Falls back to `heading` if not provided.
   *
   * @public
   */
  @property({ reflect: true })
  get value(): any {
    return this._value ?? this.heading;
  }
  set value(val: any) {
    this._value = val ?? this.heading;
  }

  /**
   * When `true`, the item will be hidden.
   * @internal
   */
  @property({ reflect: true }) itemHidden = false;

  /**
   * When `selectionMode` is `"multiple"` or `"ancestors"` and one or more, but not all `calcite-combobox-item`s are selected, displays an indeterminate "select all" checkbox.
   * @internal
   */
  @property({ reflect: true }) indeterminate = false;

  //#endregion

  //#region Public Methods

  /**
   * Toggle selection of the component.
   * @internal
   */
  @method()
  toggleSelection(): void {
    const isSinglePersistSelect = this.selectionMode === "single-persist";

    if (this.disabled || (isSinglePersistSelect && this.selected)) {
      return;
    }

    this.selected = !this.selected;
    this.calciteComboboxItemChange.emit();
  }

  //#endregion

  //#region Events

  /**
   * Fires whenever the component is selected or unselected.
   *
   * @public
   */
  calciteComboboxItemChange = createEvent({ cancelable: false });

  /**
   * Fires whenever a property the parent combobox needs to know about is changed.
   * @internal
   */
  calciteInternalComboboxItemChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.ancestors = getAncestors(this.el);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (
      this.hasUpdated &&
      (changes.has("disabled") || changes.has("heading") || changes.has("label"))
    ) {
      this.emitItemChange();
    }
  }

  //#endregion

  //#region Private Methods

  private emitItemChange(): void {
    this.calciteInternalComboboxItemChange.emit();
  }

  private handleDefaultSlotChange(event: Event): void {
    this.hasContent = slotChangeHasContent(event);
  }

  private itemClickHandler(): void {
    this.toggleSelection();
  }

  //#endregion

  //#region Rendering

  private renderIcon(iconPath: IconName | undefined): JsxNode {
    return this.icon ? (
      <calcite-icon
        class={{
          [CSS.iconCustom]: !!this.icon,
        }}
        flipRtl={this.iconFlipRtl}
        icon={this.icon || iconPath}
        key="icon"
        scale={getIconScale(this.scale)}
      />
    ) : null;
  }

  private renderSelectIndicator(icon: IconName): JsxNode | null {
    if (this.selectionAppearance === "highlight") {
      return null;
    }
    return (
      <calcite-icon
        class={{
          [CSS.icon]: true,
        }}
        flipRtl={this.iconFlipRtl}
        icon={icon}
        key="indicator"
        scale={getIconScale(this.scale)}
      />
    );
  }

  private renderChildren(): JsxNode {
    return (
      <ul hidden={!this.hasContent} key="default-slot-container">
        <slot onSlotChange={this.handleDefaultSlotChange} />
      </ul>
    );
  }

  override render(): JsxNode {
    const { disabled, heading, label, value, filterTextMatchPattern, description, shortHeading } =
      this;
    const isSingleSelect = isSingleLike(this.selectionMode);
    const icon = disabled || isSingleSelect ? undefined : ICONS.checked;
    const selectionIcon = isSingleSelect
      ? this.selected
        ? ICONS.selectedSingle
        : ICONS.circle
      : this.indeterminate
        ? ICONS.indeterminate
        : this.selected
          ? ICONS.checked
          : ICONS.unchecked;
    const itemLabel = label || value || heading;
    const headingText = heading || value;

    const classes = {
      [CSS.label]: true,
      [CSS.active]: this.active,
      [CSS.single]: isSingleSelect,
      [CSS.containerHighlightSelected]: this.selected && this.selectionAppearance === "highlight",
    };
    const depth = getDepth(this.el);

    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaHidden = "true";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = itemLabel;

    return (
      <this.interactiveContainer disabled={disabled}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.scale(this.scale)]: true,
          }}
          style={{ [itemSpacingMultiplier]: `${depth}` }}
        >
          <li class={classes} id={this.guid} onClick={this.itemClickHandler}>
            {this.renderSelectIndicator(selectionIcon)}
            <slot name={SLOTS.contentStart} />
            {this.renderIcon(icon)}
            <div class={CSS.centerContent}>
              <div class={CSS.heading}>
                {highlightText({
                  text: headingText,
                  pattern: filterTextMatchPattern,
                })}
              </div>
              {description ? (
                <div class={CSS.description}>
                  {highlightText({
                    text: description,
                    pattern: filterTextMatchPattern,
                  })}
                </div>
              ) : null}
            </div>
            {shortHeading ? (
              <div class={CSS.shortText}>
                {highlightText({
                  text: shortHeading,
                  pattern: filterTextMatchPattern,
                })}
              </div>
            ) : null}
            <slot name={SLOTS.contentEnd} />
          </li>
          {this.renderChildren()}
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
