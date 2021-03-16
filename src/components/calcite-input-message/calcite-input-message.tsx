import { Component, Element, Host, h, Prop, VNode, Watch } from "@stencil/core";
import { getElementDir, getElementProp, setRequestedIcon } from "../../utils/dom";
import { Scale, Status, Theme } from "../interfaces";
import { InputMessageType, StatusIconDefaults } from "./interfaces";

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

  /** when used as a boolean set to true, show a default icon based on status. You can
   * also pass a calcite-ui-icon name to this prop to display a custom icon */
  @Prop({ reflect: true }) icon: boolean | string;

  /** specify the scale of the input, defaults to m */
  @Prop({ reflect: true, mutable: true }) scale: Scale = "m";

  /** specify the status of the input field, determines message and icons */
  @Prop({ reflect: true, mutable: true }) status: Status = "idle";

  /** specify the theme, defaults to light */
  @Prop({ reflect: true }) theme: Theme;

  /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
  @Prop({ reflect: true }) type: InputMessageType = "default";

  @Watch("status")
  @Watch("icon")
  handleIconEl(): void {
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.status = getElementProp(this.el, "status", this.status);
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const hidden = !this.active;
    return (
      <Host calcite-hydrated-hidden={hidden} dir={dir} theme={this.theme}>
        {this.renderIcon(this.requestedIcon)}
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** the computed icon to render */
  private requestedIcon?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private renderIcon(iconName: string): VNode {
    if (iconName) {
      return <calcite-icon class="calcite-input-message-icon" icon={iconName} scale="s" />;
    }
  }
}
