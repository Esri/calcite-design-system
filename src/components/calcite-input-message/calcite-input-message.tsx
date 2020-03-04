import { Component, Element, Host, h, Prop } from "@stencil/core";
import {
  getElementDir,
  getElementProp,
  getElementTheme
} from "../../utils/dom";

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

  /** specify the appearance type - minimal or default */
  @Prop({ mutable: true, reflect: true }) appearance: "default" | "minimal" =
    "default";

  /** optionally display an icon based on status */
  @Prop({ reflect: true }) icon: boolean;

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the status of the input field, determines message and icons */
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle";

  /** specify the theme, defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
  @Prop({ mutable: true, reflect: true }) type: "default" | "floating" =
    "default";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.hasParentLabel = this.el.parentElement.nodeName === "CALCITE-LABEL";

    // validate props
    let appearance = ["default", "minimal"];
    if (!appearance.includes(this.appearance)) this.appearance = "default";

    let statusOptions = ["invalid", "valid", "idle"];
    if (!statusOptions.includes(this.status))
      this.status = this.hasParentLabel
        ? getElementProp(this.el.parentElement, "status", "idle")
        : "idle";

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale))
      this.scale = getElementProp(this.el, "scale", "m");

    let theme = ["light", "dark"];
    if (!theme.includes(this.theme))
      this.theme = this.hasParentLabel
        ? getElementTheme(this.el.parentElement)
        : "light";

    let type = ["default", "floating"];
    if (!type.includes(this.type)) this.type = "default";
  }

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

  // store if the parent is a calcite label
  private hasParentLabel: boolean;
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
