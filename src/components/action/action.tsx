import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  h,
  forceUpdate,
  VNode
} from "@stencil/core";

import { Alignment, Appearance, Scale } from "../interfaces";

import { CSS, TEXT } from "./resources";

import { createObserver } from "../../utils/observers";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { toAriaBoolean } from "../../utils/dom";

/**
 * @slot - A slot for adding a `calcite-icon`.
 */
@Component({
  tag: "calcite-action",
  styleUrl: "action.scss",
  shadow: true
})
export class Action implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, the component is highlighted.
   */
  @Prop({ reflect: true }) active = false;

  /**
   * Specifies the horizontal alignment of button elements with text content.
   */
  @Prop({ reflect: true }) alignment?: Alignment;

  /** Specifies the appearance of the component. */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "clear", Appearance> = "solid";

  /**
   * When true, the side padding of the component is reduced. Compact mode is used internally by components, e.g. `calcite-block-section`.
   */
  @Prop({ reflect: true }) compact = false;

  /**
   * When true, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /** Specifies an icon to display - accepts Calcite UI icon names.  */
  @Prop() icon?: string;

  /**
   * When true, indicates unread changes.
   */
  @Prop({ reflect: true }) indicator = false;

  /**
   * Specifies the text label to display while loading.
   *
   * @default "Loading"
   */
  @Prop() intlLoading?: string = TEXT.loading;

  /**
   * Specifies the label of the component. If no label is provided, the label inherits what's provided for the `text` prop.
   */
  @Prop() label?: string;

  /**
   * When true, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Specifies the size of the component.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies text that accompanies the icon.
   */
  @Prop() text!: string;

  /**
   * Indicates whether the text is displayed.
   */
  @Prop({ reflect: true }) textEnabled = false;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when the component has been clicked.
   *
   * @deprecated use onClick instead.
   */
  @Event() calciteActionClick: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionElement;

  buttonEl: HTMLButtonElement;

  mutationObserver = createObserver("mutation", () => forceUpdate(this));

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.buttonEl?.focus();
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
    const loaderScale = scale === "l" ? "l" : "m";
    const calciteLoaderNode = loading ? (
      <calcite-loader active inline label={intlLoading} scale={loaderScale} />
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
    const { compact, disabled, loading, textEnabled, label, text } = this;

    const ariaLabel = label || text;

    const buttonClasses = {
      [CSS.button]: true,
      [CSS.buttonTextVisible]: textEnabled,
      [CSS.buttonCompact]: compact
    };

    return (
      <Host onClick={this.calciteActionClickHandler}>
        <button
          aria-busy={toAriaBoolean(loading)}
          aria-disabled={toAriaBoolean(disabled)}
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

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  calciteActionClickHandler = (): void => {
    if (!this.disabled) {
      this.calciteActionClick.emit();
    }
  };
}
