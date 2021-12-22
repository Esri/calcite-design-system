import { Component, Element, Event, h, Prop, EventEmitter, VNode, Host } from "@stencil/core";
import { Alignment, Scale, Status } from "../interfaces";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding text and a component that can be labeled.
 */
@Component({
  tag: "calcite-label",
  styleUrl: "label.scss",
  shadow: true
})
export class Label {
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

  /**
   * specify the status of the label and any child input / input messages
   * @deprecated set directly on child element instead
   */
  @Prop({ reflect: true }) status: Status = "idle";

  /** The id of the input associated with the label */
  @Prop({ reflect: true }) for: string;

  /** specify the scale of the label, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** is the wrapped element positioned inline with the label slotted text */
  @Prop({ reflect: true }) layout: "inline" | "inline-space-between" | "default" = "default";

  /** eliminates any space around the label */
  @Prop() disableSpacing = false;

  /**
   * is the label disabled
   *
   * @deprecated use the `disabled` property on the interactive components instead
   */
  @Prop({ reflect: true }) disabled = false;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ bubbles: false }) calciteInternalLabelClick: EventEmitter<{
    sourceEvent: MouseEvent;
  }>;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  labelClickHandler = (event: MouseEvent): void => {
    this.calciteInternalLabelClick.emit({
      sourceEvent: event
    });
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host onClick={this.labelClickHandler}>
        <div class={CSS.container}>
          <slot />
        </div>
      </Host>
    );
  }
}
