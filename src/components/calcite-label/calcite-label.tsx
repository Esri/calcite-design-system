import { Component, Element, Event, h, Prop, EventEmitter, VNode, Host } from "@stencil/core";
import { focusElement, getElementDir, queryElementRoots } from "../../utils/dom";
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
   */
  @Event() calciteLabelFocus: EventEmitter<FocusRequest>;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  labelClickHandler = (event: MouseEvent): void => {
    const effectiveForElement = this.getEffectiveForElement();

    if (!effectiveForElement || event.composedPath().includes(effectiveForElement)) {
      return;
    }

    this.calciteLabelFocus.emit({
      labelEl: this.el,
      requestedInput: this.for
    });

    effectiveForElement.click();
    focusElement(effectiveForElement);
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
