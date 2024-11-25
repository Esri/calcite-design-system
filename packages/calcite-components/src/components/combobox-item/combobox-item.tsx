import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { ComboboxChildElement } from "../combobox/interfaces";
import { getAncestors, getDepth, isSingleLike } from "../combobox/utils";
import { Scale, SelectionMode } from "../interfaces";
import { getIconScale } from "../../utils/component";
import { IconNameOrString } from "../icon/interfaces";
import { slotChangeHasContent } from "../../utils/dom";
import { CSS, SLOTS } from "./resources";
import { styles } from "./combobox-item.scss";

declare global {
  interface DeclareElements {
    "calcite-combobox-item": ComboboxItem;
  }
}

/**
 * @slot - A slot for adding nested `calcite-combobox-item`s.
 * @slot content-end - A slot for adding non-actionable elements after the component's content.
 */
export class ComboboxItem extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private _selected = false;

  // #endregion

  // #region State Properties

  @state() hasContent = false;

  // #endregion

  // #region Public Properties

  /** When `true`, the component is active. */
  @property({ reflect: true }) active = false;

  /** Specifies the parent and grandparent items, which are set on `calcite-combobox`. */
  @property() ancestors: ComboboxChildElement[];

  /** A description for the component, which displays below the heading. */
  @property() description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, omits the component from the `calcite-combobox` filtered search results. */
  @property({ reflect: true }) filterDisabled: boolean;

  /**
   * Pattern for highlighting filter text matches.
   *
   * @private
   */
  @property({ reflect: true }) filterTextMatchPattern: RegExp;

  /** The `id` attribute of the component. When omitted, a globally unique identifier is used. */
  @property({ reflect: true }) guid = guid();

  /** The component's text. */
  @property() heading: string;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** The component's label. */
  @property() label: any;

  /** Provides additional metadata to the component used in filtering. */
  @property() metadata: Record<string, unknown>;

  /**
   * Specifies the size of the component inherited from the `calcite-combobox`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /** When `true`, the component is selected. */
  @property({ reflect: true })
  get selected(): boolean {
    return this._selected;
  }

  set selected(selected: boolean) {
    const oldSelected = this._selected;
    if (selected !== oldSelected) {
      this._selected = selected;
      this.selectedWatchHandler();
    }
  }

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"multiple"` allows any number of selections,
   *
   * `"single"` allows only one selection,
   *
   * `"single-persist"` allows one selection and prevents de-selection, and
   *
   * `"ancestors"` allows multiple selections, but shows ancestors of selected items as selected, with only deepest children shown in chips.
   *
   * @private
   */
  @property({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "ancestors" | "multiple",
    SelectionMode
  > = "multiple";

  /**
   * The component's short heading.
   *
   * When provided, the short heading will be displayed in the component's selection.
   *
   * It is recommended to use 5 characters or fewer.
   */
  @property() shortHeading: string;

  /**
   * The component's text.
   *
   * @deprecated Use `heading` instead.
   * @required
   */
  @property({ reflect: true }) textLabel: string;

  /**
   * The component's value.
   *
   * @required
   */
  @property() value: any;

  // #endregion

  // #region Events

  /** Fires whenever the component is selected or unselected. */
  calciteComboboxItemChange = createEvent({ cancelable: false });

  /**
   * Fires whenever a property the parent combobox needs to know about is changed.
   *
   * @private
   */
  calciteInternalComboboxItemChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.ancestors = getAncestors(this.el);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) ||
      changes.has("textLabel")
    ) {
      this.calciteInternalComboboxItemChange.emit();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods
  private selectedWatchHandler(): void {
    this.calciteComboboxItemChange.emit();
  }

  private handleDefaultSlotChange(event: Event): void {
    this.hasContent = slotChangeHasContent(event);
  }

  private toggleSelected(): Promise<void> {
    const isSinglePersistSelect = this.selectionMode === "single-persist";

    if (this.disabled || (isSinglePersistSelect && this.selected)) {
      return;
    }

    this.selected = !this.selected;
  }

  private itemClickHandler(): void {
    this.toggleSelected();
  }

  // #endregion

  // #region Rendering

  private renderIcon(iconPath: IconNameOrString): JsxNode {
    return this.icon ? (
      <calcite-icon
        class={{
          [CSS.custom]: !!this.icon,
          [CSS.iconActive]: this.icon && this.selected,
        }}
        flipRtl={this.iconFlipRtl}
        icon={this.icon || iconPath}
        key="icon"
        scale={getIconScale(this.scale)}
      />
    ) : null;
  }

  private renderSelectIndicator(showDot: boolean): JsxNode;

  private renderSelectIndicator(showDot: boolean, iconPath: IconNameOrString): JsxNode;

  private renderSelectIndicator(showDot: boolean, iconPath?: IconNameOrString): JsxNode {
    return showDot ? (
      <span
        class={{
          [CSS.icon]: true,
          [CSS.dot]: true,
        }}
      />
    ) : (
      <calcite-icon
        class={{
          [CSS.icon]: true,
          [CSS.iconActive]: this.selected,
        }}
        flipRtl={this.iconFlipRtl}
        icon={iconPath}
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
    const { disabled, heading, label, textLabel, value } = this;
    const isSingleSelect = isSingleLike(this.selectionMode);
    const defaultIcon = isSingleSelect ? undefined : "check";
    const headingText = heading || textLabel;
    const iconPath = disabled ? undefined : defaultIcon;
    const itemLabel = label || value;
    const showDot = isSingleSelect && !disabled;

    const classes = {
      [CSS.label]: true,
      [CSS.selected]: this.selected,
      [CSS.active]: this.active,
      [CSS.single]: isSingleSelect,
    };
    const depth = getDepth(this.el) === 0 ? 1 : getDepth(this.el) + 1;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaHidden = "true";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = itemLabel;

    return (
      <InteractiveContainer disabled={disabled}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.scale(this.scale)]: true,
          }}
          style={{ "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` }}
        >
          <li class={classes} id={this.guid} onClick={this.itemClickHandler}>
            {this.renderSelectIndicator(showDot, iconPath)}
            {this.renderIcon(iconPath)}
            <div class={CSS.centerContent}>
              <div class={CSS.title}>{this.renderTextContent(headingText)}</div>
              {this.description ? (
                <div class={CSS.description}>{this.renderTextContent(this.description)}</div>
              ) : null}
            </div>
            {this.shortHeading ? (
              <div class={CSS.shortText}>{this.renderTextContent(this.shortHeading)}</div>
            ) : null}
            <slot name={SLOTS.contentEnd} />
          </li>
          {this.renderChildren()}
        </div>
      </InteractiveContainer>
    );
  }

  private renderTextContent(text: string): string | (string | JsxNode)[] {
    const pattern = this.filterTextMatchPattern;

    if (!pattern || !text) {
      return text;
    }

    const parts: (string | JsxNode)[] = text.split(pattern);

    if (parts.length > 1) {
      // we only highlight the first match
      parts[1] = <mark class={CSS.filterMatch}>{parts[1]}</mark>;
    }

    return parts;
  }

  // #endregion
}
