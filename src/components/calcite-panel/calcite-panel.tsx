import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  h
} from "@stencil/core";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { getElementDir, getSlotted, getElementTheme } from "../utils/dom";
import { CSS_UTILITY } from "../utils/resources";
import { VNode } from "@stencil/core/internal";
import { CalciteScale, CalciteTheme } from "../interfaces";

/**
 * @slot header-content - A slot for adding content in the center of the header.
 * @slot header-leading-content - A slot for adding a `calcite-action` on the leading side of the header.
 * @slot header-trailing-content - A slot for adding a `calcite-action` on the trailing side of the header.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer - A slot for adding `calcite-button`s to the footer.
 * @slot - A slot for adding content to the panel.
 */
@Component({
  tag: "calcite-panel",
  styleUrl: "calcite-panel.scss",
  shadow: true
})
export class CalcitePanel {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Hides the panel.
   */
  @Prop({ mutable: true, reflect: true }) dismissed = false;

  @Watch("dismissed")
  dismissedHandler(): void {
    this.calcitePanelDismissedChange.emit();
  }

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Displays a close button in the trailing side of the header.
   */
  @Prop({ reflect: true }) dismissible = false;

  /**
   * Specifies the maxiumum height of the panel.
   */
  @Prop({ reflect: true }) heightScale: CalciteScale;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * 'Close' text string for the close button. The close button will only be shown when 'dismissible' is true.
   */
  @Prop() intlClose?: string;

  /**
   * Used to set the component's color scheme.
   */

  @Prop({ reflect: true }) theme: CalciteTheme;
  /**
   * Heading text.
   */

  @Prop() heading?: string;
  /**
   * Summary text. A description displayed underneath the heading.
   */
  @Prop() summary?: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePanelElement;

  dismissButtonEl: HTMLCalciteActionElement;

  containerEl: HTMLElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the close button has been clicked.
   */

  @Event() calcitePanelDismissedChange: EventEmitter;

  /**
   * Emitted when the content has been scrolled.
   */

  @Event() calcitePanelScroll: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  panelKeyUpHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.dismiss();
    }
  };

  dismiss = (): void => {
    this.dismissed = true;
  };

  panelScrollHandler = (): void => {
    this.calcitePanelScroll.emit();
  };

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async setFocus(focusId?: "dismiss-button"): Promise<void> {
    if (focusId === "dismiss-button") {
      this.dismissButtonEl?.setFocus();
      return;
    }

    this.containerEl?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderHeaderContent(): VNode {
    const { heading, summary } = this;
    const headingNode = heading ? <h4 class={CSS.heading}>{heading}</h4> : null;
    const summaryNode = summary ? <span class={CSS.summary}>{summary}</span> : null;

    return (
      <div key="header-content" class={CSS.headerContent}>
        {headingNode}
        {summaryNode}
      </div>
    );
  }

  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent(): VNode {
    return (
      <div key="header-content" class={CSS.headerContent}>
        <slot name={SLOTS.headerContent} />
      </div>
    );
  }

  renderHeaderTrailingContent(): VNode {
    const { dismiss, dismissible, intlClose } = this;
    const text = intlClose || TEXT.close;

    const dismissibleNode = dismissible ? (
      <calcite-action
        ref={(dismissButtonEl): HTMLCalciteActionElement =>
          (this.dismissButtonEl = dismissButtonEl)
        }
        aria-label={text}
        text={text}
        onClick={dismiss}
        icon={ICONS.close}
      />
    ) : null;

    const slotNode = <slot name={SLOTS.headerTrailingActions} />;

    return (
      <div key="header-trailing-content" class={CSS.headerTrailingActions}>
        {slotNode}
        {dismissibleNode}
      </div>
    );
  }

  renderHeaderNode(): VNode {
    const hasHeaderContent = getSlotted(this.el, SLOTS.headerContent);
    const headerContentNode = hasHeaderContent ? this.renderHeaderSlottedContent() : this.renderHeaderContent();
    const headerTrailingActionsNode = this.renderHeaderTrailingContent();

    const canDisplayHeader =
      headerContentNode || headerTrailingActionsNode;

    return canDisplayHeader ? (
      <header class={CSS.header}>
        <slot name={SLOTS.headerLeadingActions} />
        {headerContentNode}
        {headerTrailingActionsNode}
      </header>
    ) : null;
  }

  renderFooter(): VNode {
    const { el } = this;

    const hasFooter = getSlotted(el, SLOTS.footer);

    return hasFooter ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footer} />
      </footer>
    ) : null;
  }

  renderContent(): VNode {
    return (
      <section tabIndex={0} class={CSS.contentContainer} onScroll={this.panelScrollHandler}>
        <slot />
        {this.renderFab()}
      </section>
    );
  }

  renderFab(): VNode {
    const hasFab = getSlotted(this.el, SLOTS.fab);

    return hasFab ? (
      <div class={CSS.fabContainer}>
        <slot name={SLOTS.fab} />
      </div>
    ) : null;
  }

  render(): VNode {
    const { dismissed, disabled, dismissible, el, loading, panelKeyUpHandler } = this;

    const rtl = getElementDir(el) === "rtl";

    const panelNode = (
      <article
        aria-busy={loading.toString()}
        onKeyUp={panelKeyUpHandler}
        tabIndex={dismissible ? 0 : -1}
        hidden={dismissible && dismissed}
        ref={(containerEl): HTMLElement => (this.containerEl = containerEl)}
        class={{
          [CSS.container]: true,
          [CSS_UTILITY.rtl]: rtl
        }}
      >
        {this.renderHeaderNode()}
        {this.renderContent()}
        {this.renderFooter()}
      </article>
    );

    return (
      <Host>
        {loading || disabled ? (
          <calcite-scrim theme={getElementTheme(el)} loading={loading}>
            {panelNode}
          </calcite-scrim>
        ) : (
          panelNode
        )}
      </Host>
    );
  }
}
