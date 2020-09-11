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

  renderHeaderLeadingContent(): VNode {
    const hasLeadingContent = getSlotted(this.el, SLOTS.headerLeadingContent);
    return hasLeadingContent ? (
      <div class={CSS.headerLeadingContent} key="header-leading-content">
        <slot name={SLOTS.headerLeadingContent} />
      </div>
    ) : null;
  }

  renderHeaderContent(): VNode {
    return (
      <div class={CSS.headerContent} key="header-content">
        <slot name={SLOTS.headerContent} />
      </div>
    );
  }

  renderHeaderTrailingContent(): VNode {
    const { dismiss, dismissible, intlClose } = this;
    const text = intlClose || TEXT.close;

    const dismissibleNode = dismissible ? (
      <calcite-action
        aria-label={text}
        icon={ICONS.close}
        onClick={dismiss}
        ref={(dismissButtonEl): HTMLCalciteActionElement =>
          (this.dismissButtonEl = dismissButtonEl)
        }
        text={text}
      />
    ) : null;

    const slotNode = <slot name={SLOTS.headerTrailingContent} />;

    return (
      <div class={CSS.headerTrailingContent} key="header-trailing-content">
        {slotNode}
        {dismissibleNode}
      </div>
    );
  }

  renderHeader(): VNode {
    const headerLeadingContentNode = this.renderHeaderLeadingContent();
    const headerContentNode = this.renderHeaderContent();
    const headerTrailingContentNode = this.renderHeaderTrailingContent();

    const canDisplayHeader =
      headerContentNode || headerLeadingContentNode || headerTrailingContentNode;

    return canDisplayHeader ? (
      <header class={CSS.header}>
        {headerLeadingContentNode}
        {headerContentNode}
        {headerTrailingContentNode}
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
      <section class={CSS.contentContainer} onScroll={this.panelScrollHandler} tabIndex={0}>
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
        class={{
          [CSS.container]: true,
          [CSS_UTILITY.rtl]: rtl
        }}
        hidden={dismissible && dismissed}
        onKeyUp={panelKeyUpHandler}
        ref={(containerEl): HTMLElement => (this.containerEl = containerEl)}
        tabIndex={dismissible ? 0 : -1}
      >
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </article>
    );

    return (
      <Host>
        {loading || disabled ? (
          <calcite-scrim loading={loading} theme={getElementTheme(el)}>
            {panelNode}
          </calcite-scrim>
        ) : (
          panelNode
        )}
      </Host>
    );
  }
}
