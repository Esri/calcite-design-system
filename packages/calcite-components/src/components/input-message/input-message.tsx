import { Component, Element, h, Host, Prop, VNode, Watch } from "@stencil/core";
import { setRequestedIcon } from "../../utils/dom";
import { Scale, Status } from "../interfaces";
import { StatusIconDefaults } from "./interfaces";

/**
 * @slot - A slot for adding text.
 */
@Component({
  tag: "calcite-input-message",
  styleUrl: "input-message.scss",
  shadow: true,
})
export class InputMessage {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: boolean | string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ reflect: true }) status: Status = "idle";

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
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }

  render(): VNode {
    const hidden = this.el.hidden;
    return (
      <Host calcite-hydrated-hidden={hidden}>
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

  @Element() el: HTMLCalciteInputMessageElement;

  /** the computed icon to render */
  private requestedIcon?: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private renderIcon(iconName: string): VNode {
    if (iconName) {
      return (
        <calcite-icon
          class="calcite-input-message-icon"
          flipRtl={this.iconFlipRtl}
          icon={iconName}
          scale="s"
        />
      );
    }
  }
}
