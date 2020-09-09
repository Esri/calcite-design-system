import { Component, Element, Host, h, Prop } from "@stencil/core";
import { getElementDir } from "../../utils/dom";

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
  @Prop({ reflect: true }) scale: "s" | "m" | "l";

  /** specify the status of the input field, determines message and icons */
  @Prop({ reflect: true }) status: "invalid" | "valid" | "idle";

  /** specify the theme, defaults to light */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
  @Prop({ reflect: true }) type: "default" | "floating" = "default";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate() {
    this.iconEl = this.setIcon(this.iconDefaults[this.status]);
  }

  render() {
    const dir = getElementDir(this.el);
    this.iconEl = this.setIcon(this.iconDefaults[this.status]);
    return (
      <Host theme={this.theme} dir={dir}>
        {this.icon ? this.iconEl : null}
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

  // the icon to be rendered if icon is requested
  private iconEl: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setIcon(iconName) {
    return (
      <calcite-icon class="calcite-input-message-icon" scale="s" icon={iconName}></calcite-icon>
    );
  }
}
