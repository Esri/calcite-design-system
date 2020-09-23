import { Component, Element, Host, h, Prop, VNode } from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";

@Component({
  tag: "calcite-input-message",
  styleUrl: "calcite-input-message.scss",
  shadow: true
})
export class CalciteInputMessage {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputMessageElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true }) active = false;

  /** optionally display an icon based on status */
  @Prop({ reflect: true }) icon: boolean;

  /** specify the scale of the input, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the status of the input field, determines message and icons */
  @Prop({ reflect: true }) status: "invalid" | "valid" | "idle" = "idle";

  /** specify the theme, defaults to light */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
  @Prop({ reflect: true }) type: "default" | "floating" = "default";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.status = getElementProp(this.el, "status", this.status);
    this.scale = getElementProp(this.el, "scale", this.scale);
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir} theme={this.theme}>
        {this.icon ? this.renderIcon(this.iconDefaults[this.status]) : null}
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  // icons for status and validation
  private iconDefaults = {
    valid: "check-circle",
    invalid: "exclamation-mark-triangle",
    idle: "information"
  };

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private renderIcon(iconName): VNode {
    return <calcite-icon class="calcite-input-message-icon" icon={iconName} scale="s" />;
  }
}
