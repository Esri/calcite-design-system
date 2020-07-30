import { Component, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import { CalciteTheme } from "../interfaces";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { VNode } from "@stencil/core/internal";
import { getSlotted } from "../utils/dom";

/**
 * @slot thumbnail - A slot for adding an HTML image element to the tip.
 */
@Component({
  tag: "calcite-tip",
  styleUrl: "./calcite-tip.scss",
  shadow: true
})
export class CalciteTip {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------
  /**
   * No longer displays the tip.
   */
  @Prop({ mutable: true }) dismissed = false;

  /**
   * Indicates whether the tip can be dismissed.
   */
  @Prop({ reflect: true }) nonDismissible = false;

  /**
   * The heading of the tip.
   */
  @Prop() heading?: string;

  /**
   * The selected state of the tip if it is being used inside a `calcite-tip-manager`.
   */
  @Prop({ reflect: true }) selected?: boolean;

  /**
   * Alternate text for closing the tip.
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

  @Element() el: HTMLCalciteTipElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the component has been dismissed.
   */
  @Event() calciteTipDismiss: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  hideTip = (): void => {
    this.dismissed = true;

    this.calciteTipDismiss.emit();
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderHeader(): VNode {
    const { nonDismissible, hideTip, intlClose, heading } = this;
    const text = intlClose || TEXT.close;

    const dismissButtonNode = !nonDismissible ? (
      <calcite-action text={text} onClick={hideTip} class={CSS.close} icon={ICONS.close} />
    ) : null;

    const headingNode = heading ? <h3 class={CSS.heading}>{heading}</h3> : null;

    return dismissButtonNode || headingNode ? (
      <header class={CSS.header}>
        {headingNode}
        {dismissButtonNode}
      </header>
    ) : null;
  }

  renderImageFrame(): VNode {
    const { el } = this;

    return getSlotted(el, SLOTS.thumbnail) ? (
      <div class={CSS.imageFrame}>
        <slot name={SLOTS.thumbnail} />
      </div>
    ) : null;
  }

  renderInfoNode(): VNode {
    return (
      <div class={CSS.info}>
        <slot />
      </div>
    );
  }

  renderContent(): VNode {
    return (
      <div class={CSS.content}>
        {this.renderImageFrame()}
        {this.renderInfoNode()}
      </div>
    );
  }

  render(): VNode {
    return (
      <Host>
        <article class={CSS.container} hidden={this.dismissed}>
          {this.renderHeader()}
          {this.renderContent()}
        </article>
      </Host>
    );
  }
}
