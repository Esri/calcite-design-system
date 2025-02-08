import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
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

/**
 * @slot - A slot for adding nested `calcite-combobox-item`s.
 * @slot content-end - A slot for adding non-actionable elements after the component's content.
 */
@Component({
  tag: "calcite-combobox-item",
  styleUrl: "combobox-item.scss",
  shadow: true,
})
export class ComboboxItem implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** When `true`, the component is active. */
  @Prop({ reflect: true }) active = false;

  /** Specifies the parent and grandparent items, which are set on `calcite-combobox`. */
  @Prop({ mutable: true }) ancestors: ComboboxChildElement[];

  /**
   * A description for the component, which displays below the label.
   */
  @Prop() description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  @Watch("textLabel")
  handleComboboxItemPropsChange(): void {
    this.calciteInternalComboboxItemChange.emit();
  }

  /**
   * When `true`, omits the component from the `calcite-combobox` filtered search results.
   */
  @Prop({ reflect: true }) filterDisabled: boolean;

  /**
   * Pattern for highlighting filter text matches.
   *
   * @internal
   */
  @Prop({ reflect: true }) filterTextMatchPattern: RegExp;

  /** The `id` attribute of the component. When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true }) guid = guid();

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: IconNameOrString;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  @Watch("selected")
  selectedWatchHandler(): void {
    this.calciteComboboxItemChange.emit();
  }

  /**
   * Provides additional metadata to the component used in filtering.
   */
  @Prop() metadata: Record<string, unknown>;

  /**
   * Specifies the size of the component inherited from the `calcite-combobox`, defaults to `m`.
   *
   * @internal
   */
  @Prop() scale: Scale = "m";

  /**
   * When `true`, the component is selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

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
   * @internal
   */
  @Prop({ reflect: true }) selectionMode: Extract<
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
  @Prop() shortHeading: string;

  /** The component's text. */
  @Prop() heading: string;

  /**
   * The component's text.
   *
   * @deprecated Use `heading` instead.
   */
  @Prop({ reflect: true }) textLabel!: string;

  /** The component's value. */
  @Prop() value!: any;

  /** The component's label. */
  @Prop() label: any;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteComboboxItemElement;

  @State() hasContent = false;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.ancestors = getAncestors(this.el);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires whenever the component is selected or unselected.
   *
   */
  @Event({ cancelable: false }) calciteComboboxItemChange: EventEmitter<void>;

  /**
   * Fires whenever a property the parent combobox needs to know about is changed.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalComboboxItemChange: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private handleDefaultSlotChange = (event: Event): void => {
    this.hasContent = slotChangeHasContent(event);
  };

  toggleSelected(): Promise<void> {
    const isSinglePersistSelect = this.selectionMode === "single-persist";

    if (this.disabled || (isSinglePersistSelect && this.selected)) {
      return;
    }

    this.selected = !this.selected;
  }

  private itemClickHandler = (): void => {
    this.toggleSelected();
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon(iconPath: IconNameOrString): VNode {
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

  renderSelectIndicator(showDot: boolean): VNode;
  renderSelectIndicator(showDot: boolean, iconPath: IconNameOrString): VNode;
  renderSelectIndicator(showDot: boolean, iconPath?: IconNameOrString): VNode {
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

  renderChildren(): VNode {
    return (
      <ul hidden={!this.hasContent} key="default-slot-container">
        <slot onSlotchange={this.handleDefaultSlotChange} />
      </ul>
    );
  }

  render(): VNode {
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
    const depth = getDepth(this.el) + 1;

    return (
      <Host aria-hidden="true" aria-label={itemLabel}>
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
      </Host>
    );
  }

  private renderTextContent(text: string): string | (string | VNode)[] {
    const pattern = this.filterTextMatchPattern;

    if (!pattern || !text) {
      return text;
    }

    const parts: (string | VNode)[] = text.split(pattern);

    if (parts.length > 1) {
      // we only highlight the first match
      parts[1] = <mark class={CSS.filterMatch}>{parts[1]}</mark>;
    }

    return parts;
  }
}
