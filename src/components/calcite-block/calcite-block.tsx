import { Component, Element, Event, EventEmitter, Host, Prop, h, VNode } from "@stencil/core";
import { CSS, SLOTS, TEXT } from "./resources";
import { CSS_UTILITY } from "../utils/resources";
import { CalciteTheme } from "../interfaces";
import { getElementDir, getSlotted, getElementTheme } from "../utils/dom";

/**
 * @slot icon - A slot for adding a trailing header icon.
 * @slot control - A slot for adding a single HTML input element in a header.
 * @slot - A slot for adding content to the block.
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
  @Prop() heading: string;

  /**
   * Tooltip used for the toggle when expanded.
   */
  @Prop() intlCollapse?: string;

  /**
   * Tooltip used for the toggle when collapsed.
   */
  @Prop() intlExpand?: string;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * When true, the block's content will be displayed.
   */
  @Prop({ reflect: true }) open = false;

  /**
   * Block summary.
   */
  @Prop() summary: string;

  /**
   * Used to set the component's color scheme.
   */
  @Prop({ reflect: true }) theme: CalciteTheme;

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

  renderScrim(): VNode {
    const { disabled, loading, el } = this;

    const defaultSlot = <slot />;

    return loading || disabled ? (
      <calcite-scrim theme={getElementTheme(el)} loading={loading}>
        {defaultSlot}
      </calcite-scrim>
    ) : (
      defaultSlot
    );
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
      summary
    } = this;

    const toggleLabel = open ? intlCollapse || TEXT.collapse : intlExpand || TEXT.expand;

    const hasIcon = getSlotted(el, SLOTS.icon);
    const headerContent = (
      <header class={CSS.header}>
        {hasIcon ? (
          <div class={CSS.icon}>
            <slot name={SLOTS.icon} />
          </div>
        ) : null}
        <div class={CSS.title}>
          <h3 class={CSS.heading}>{heading}</h3>
          {summary ? <div class={CSS.summary}>{summary}</div> : null}
        </div>
      </header>
    );

    const hasControl = getSlotted(el, SLOTS.control);

    const headerNode = (
      <div class={CSS.headerContainer}>
        {this.dragHandle ? <calcite-handle /> : null}
        {collapsible ? (
          <button
            aria-label={toggleLabel}
            class={CSS.toggle}
            onClick={this.onHeaderClick}
            title={toggleLabel}
          >
            {headerContent}
          </button>
        ) : (
          headerContent
        )}
        {loading ? (
          <calcite-loader inline is-active></calcite-loader>
        ) : hasControl ? (
          <div class={CSS.controlContainer}>
            <slot name={SLOTS.control} />
          </div>
        ) : null}
      </div>
    );

    const rtl = getElementDir(el) === "rtl";

    return (
      <Host tabIndex={disabled ? -1 : null}>
        <article
          aria-expanded={collapsible ? open.toString() : null}
          aria-busy={loading.toString()}
          class={rtl ? CSS_UTILITY.rtl : null}
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
