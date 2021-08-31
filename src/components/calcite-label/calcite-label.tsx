import { Component, Element, Event, h, Prop, EventEmitter, VNode, Host } from "@stencil/core";
import { getElementDir, queryElementRoots } from "../../utils/dom";
import { FocusRequest } from "./interfaces";
import { Alignment, Scale, Status } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";

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
  @Prop() disableSpacing?: boolean;

  /** is the label disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   * @deprecated use calciteInternalLabelClick
   */
  @Event() calciteLabelFocus: EventEmitter<FocusRequest>;

  /**
   * @internal
   */
  @Event() calciteInternalLabelClick: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  labelClickHandler = (event: MouseEvent): void => {
    this.calciteLabelFocus.emit({
      labelEl: this.el,
      interactedEl: event.target as HTMLElement,
      requestedInput: this.for
    });

    this.calciteInternalLabelClick.emit();
  };

  getEffectiveForElement = (): HTMLElement => {
    const { el, for: forProperty } = this;

    return (
      (forProperty && queryElementRoots(el, `#${forProperty}`)) || el.querySelector(":first-child")
    );
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
        <div class={{ container: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          <slot />
        </div>
      </Host>
    );
  }
}
