import { Component, Element, Event, h, Prop, EventEmitter, VNode, Host } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { Alignment, Scale, Status } from "../interfaces";
import { CSS } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";

/**
 * @slot - A slot for adding text and a component that can be labeled.
 */
@Component({
  tag: "calcite-label",
  styleUrl: "calcite-label.scss",
  shadow: true
})
export class CalciteLabel {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteLabelElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** specify the text alignment of the label */
  @Prop({ reflect: true }) alignment: Alignment = "start";

  /** specify the status of the label and any child input / input messages */
  @Prop({ reflect: true }) status: Status = "idle";

  /** The id of the input associated with the label */
  @Prop({ reflect: true }) for: string;

  /** specify the scale of the input, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** is the wrapped element positioned inline with the label slotted text */
  @Prop({ reflect: true }) layout: "inline" | "inline-space-between" | "default" = "default";

  /** eliminates any space around the label */
  @Prop() disableSpacing = false;

  /** is the label disabled  */
  @Prop({ reflect: true }) disabled = false;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ bubbles: false }) calciteInternalLabelClick: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  labelClickHandler = (): void => {
    this.calciteInternalLabelClick.emit();
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host onClick={this.labelClickHandler}>
        <div class={{ [CSS.container]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          <slot />
        </div>
      </Host>
    );
  }
}
