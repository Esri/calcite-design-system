import { Component, Element, Event, EventEmitter, h, Host, Prop, VNode } from "@stencil/core";
import { CSS, HEADING_LEVEL, ICONS, SLOTS, TEXT } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
import { getElementDir, getSlotted } from "../../utils/dom";
import { CalciteHeading, HeadingLevel } from "../functional/CalciteHeading";
import { Status } from "../interfaces";

/**
 * @slot - A slot for adding content to the block.
 * @slot icon - A slot for adding a leading header icon.
 * @slot control - A slot for adding a single HTML input element in a header.
 * @slot header-menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 */
@Component({
  tag: "calcite-block",
  styleUrl: "calcite-block.scss",
  shadow: true
})
export class CalciteBlock {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, this block will be collapsible.
   */
  @Prop() collapsible = false;

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, displays a drag handle in the header.
   */
  @Prop({ reflect: true }) dragHandle = false;

  /**
   * Block heading.
   */
  @Prop() heading!: string;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  /**
   * Tooltip used for the toggle when expanded.
   */
  @Prop() intlCollapse?: string;

  /**
   * Tooltip used for the toggle when collapsed.
   */
  @Prop() intlExpand?: string;

  /** string to override English loading text
   * @default "Loading"
   */
  @Prop() intlLoading?: string = TEXT.loading;

  /** Text string used for the actions menu
   * @default "Options"
   */
  @Prop() intlOptions?: string = TEXT.options;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * When true, the block's content will be displayed.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /**
   * Block status. Updates or adds icon to show related icon and color.
   */
  @Prop({ reflect: true }) status?: Status;

  /**
   * Block summary.
   */
  @Prop() summary: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteBlockElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the header has been clicked.
   */
  @Event() calciteBlockToggle: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  onHeaderClick = (): void => {
    this.open = !this.open;
    this.calciteBlockToggle.emit();
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderScrim(): VNode[] {
    const { disabled, loading } = this;

    const defaultSlot = <slot />;

    return [loading || disabled ? <calcite-scrim loading={loading} /> : null, defaultSlot];
  }

  renderIcon(): VNode[] {
    const { el, status } = this;

    const icon = ICONS[status] ?? false;

    const hasIcon = getSlotted(el, SLOTS.icon) || icon;

    const iconEl = !icon ? (
      <slot name={SLOTS.icon} />
    ) : (
      <calcite-icon
        class={{
          [CSS.statusIcon]: true,
          [CSS.valid]: status == "valid",
          [CSS.invalid]: status == "invalid"
        }}
        icon={icon}
        scale="m"
      />
    );

    return hasIcon ? <div class={CSS.icon}>{iconEl}</div> : null;
  }

  render(): VNode {
    const {
      collapsible,
      disabled,
      el,
      heading,
      intlCollapse,
      intlExpand,
      loading,
      open,
      summary,
      intlLoading,
      headingLevel
    } = this;

    const toggleLabel = open ? intlCollapse || TEXT.collapse : intlExpand || TEXT.expand;

    const headerContent = (
      <header class={CSS.header}>
        {this.renderIcon()}
        <div class={CSS.title}>
          <CalciteHeading class={CSS.heading} level={headingLevel || HEADING_LEVEL}>
            {heading}
          </CalciteHeading>
          {summary ? <div class={CSS.summary}>{summary}</div> : null}
        </div>
      </header>
    );

    const hasControl = !!getSlotted(el, SLOTS.control);
    const hasMenuActions = !!getSlotted(el, SLOTS.headerMenuActions);
    const collapseIcon = open ? ICONS.opened : ICONS.closed;

    const headerNode = (
      <div class={CSS.headerContainer}>
        {this.dragHandle ? <calcite-handle /> : null}
        {collapsible ? (
          <button
            aria-expanded={collapsible ? open.toString() : null}
            aria-label={toggleLabel}
            class={CSS.toggle}
            onClick={this.onHeaderClick}
            title={toggleLabel}
          >
            {headerContent}
            {!hasControl && !hasMenuActions ? (
              <calcite-icon
                aria-hidden="true"
                class={CSS.toggleIcon}
                icon={collapseIcon}
                scale="s"
              />
            ) : null}
          </button>
        ) : (
          headerContent
        )}
        {loading ? (
          <calcite-loader inline is-active label={intlLoading} />
        ) : hasControl ? (
          <div class={CSS.controlContainer}>
            <slot name={SLOTS.control} />
          </div>
        ) : null}
        {hasMenuActions ? (
          <calcite-action-menu label={this.intlOptions || TEXT.options}>
            <slot name={SLOTS.headerMenuActions} />
          </calcite-action-menu>
        ) : null}
      </div>
    );

    const rtl = getElementDir(el) === "rtl";

    return (
      <Host tabIndex={disabled ? -1 : null}>
        <article
          aria-busy={loading.toString()}
          class={{
            [CSS.article]: true,
            [CSS_UTILITY.rtl]: rtl
          }}
        >
          {headerNode}
          <div class={CSS.content} hidden={!open}>
            {this.renderScrim()}
          </div>
        </article>
      </Host>
    );
  }
}
