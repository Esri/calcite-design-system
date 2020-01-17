import { Component, Element, Host, h, Prop } from "@stencil/core";
import { getElementProp, getElementTheme } from "../../utils/dom";

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

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /** specify the status of the input field, determines message and icons */
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle";

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the appearance type - minimal or default */
  @Prop({ mutable: true, reflect: true }) appearance: "minimal" | "default" =
    "default";

  /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
  @Prop({ mutable: true, reflect: true }) type: "default" | "floating" =
    "default";

  /** optionally pass icon path data - pass only raw path data from calcite ui helper  */
  @Prop({ reflect: true }) icon?: string;

  /** specify the theme, defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    // validate props
    let statusOptions = ["invalid", "valid", "idle"];
    if (!statusOptions.includes(this.status))
      this.status = getElementProp(this.el, "status", "idle");

    if (!this.icon && this.iconDefaults[this.status])
      this.icon = this.iconDefaults[this.status];
  }

  render() {
    const theme = getElementTheme(this.el);
    const icon = this.setIcon(this.iconDefaults[this.status]);
    return (
      <Host theme={theme}>
        {icon}
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
    valid: "check",
    invalid: "exclamation-mark-triangle",
    idle: "information"
  };

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setIcon(iconName) {
    return (
      <calcite-icon
        class="calcite-input-message-icon"
        scale="s"
        icon={iconName}
      ></calcite-icon>
    );
  }
}
