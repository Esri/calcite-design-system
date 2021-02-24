import { Component, Element, Host, Method, Prop, h, forceUpdate, VNode } from "@stencil/core";

import { Appearance, Scale, Theme } from "../interfaces";

import { CSS, TEXT } from "./resources";

import { CSS_UTILITY } from "../../utils/resources";

import { getElementDir } from "../../utils/dom";

/**
 * @slot - A slot for adding a `calcite-icon`.
 */
@Component({
  tag: "calcite-action",
  styleUrl: "calcite-action.scss",
  shadow: true
})
export class CalciteAction {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------
  /** Specify the appearance style of the action, defaults to solid. */
  @Prop({ reflect: true }) appearance: Appearance = "solid";

  /**
   * Indicates whether the action is highlighted.
   */
  @Prop({ reflect: true }) active = false;

  /**
   * Compact mode is used internally by components to reduce side padding, e.g. calcite-block-section.
   */
  @Prop({ reflect: true }) compact = false;

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
   */
  @Prop() icon?: string;

  /**
   * Indicates unread changes.
   */
  @Prop({ reflect: true }) indicator = false;

  /** string to override English loading text */
  @Prop() intlLoading?: string = TEXT.loading;

  /**
   * The label of the action. If no label is provided, the label inherits what's provided for the `text` prop.
   */
  @Prop() label?: string;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Specifies the size of the action.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Text that accompanies the action icon.
   */
  @Prop() text!: string;

  /**
   * Indicates whether the text is displayed.
   */
  @Prop({ reflect: true }) textEnabled = false;

  /**
   * Used to set the component's color scheme.
   */
  @Prop({ reflect: true }) theme: Theme;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionElement;

  buttonEl: HTMLButtonElement;

  observer = new MutationObserver(() => forceUpdate(this));

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.observer.observe(this.el, { childList: true, subtree: true });
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    this.buttonEl.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderTextContainer(): VNode {
    const { text, textEnabled } = this;

    const textContainerClasses = {
      [CSS.textContainer]: true,
      [CSS.textContainerVisible]: textEnabled
    };

    return text ? (
      <div class={textContainerClasses} key="text-container">
        {text}
      </div>
    ) : null;
  }

  renderIconContainer(): VNode {
    const { loading, icon, scale, el, intlLoading } = this;
    const iconScale = scale === "l" ? "m" : "s";
    const calciteLoaderNode = loading ? (
      <calcite-loader active inline label={intlLoading} scale={iconScale} />
    ) : null;
    const calciteIconNode = icon ? <calcite-icon icon={icon} scale={iconScale} /> : null;
    const iconNode = calciteLoaderNode || calciteIconNode;
    const hasIconToDisplay = iconNode || el.children?.length;

    const slotContainerNode = (
      <div
        class={{
          [CSS.slotContainer]: true,
          [CSS.slotContainerHidden]: loading
        }}
      >
        <slot />
      </div>
    );

    return hasIconToDisplay ? (
      <div aria-hidden="true" class={CSS.iconContainer} key="icon-container">
        {iconNode}
        {slotContainerNode}
      </div>
    ) : null;
  }

  render(): VNode {
    const { compact, disabled, loading, el, textEnabled, label, text } = this;

    const ariaLabel = label || text;
    const rtl = getElementDir(el) === "rtl";

    const buttonClasses = {
      [CSS.button]: true,
      [CSS.buttonTextVisible]: textEnabled,
      [CSS.buttonCompact]: compact,
      [CSS_UTILITY.rtl]: rtl
    };

    return (
      <Host>
        <button
          aria-busy={loading.toString()}
          aria-disabled={disabled.toString()}
          aria-label={ariaLabel}
          class={buttonClasses}
          disabled={disabled}
          ref={(buttonEl): HTMLButtonElement => (this.buttonEl = buttonEl)}
        >
          {this.renderIconContainer()}
          {this.renderTextContainer()}
        </button>
      </Host>
    );
  }
}
