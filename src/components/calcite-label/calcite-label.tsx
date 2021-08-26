import { Component, Element, Event, h, Prop, EventEmitter, VNode } from "@stencil/core";
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
   */
  @Event() calciteLabelFocus: EventEmitter<FocusRequest>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  clickHandler = (): void => {
    this.calciteLabelFocus.emit({
      labelEl: this.el,
      requestedInput: this.for
    });
    this.handleCalciteHtmlForClicks();
  };

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  mutationObserver = new MutationObserver(() => this.setEffectiveForElement());

  effectiveForElement: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  setEffectiveForElement = (): void => {
    const labelableElements = [
      "calcite-button",
      "calcite-checkbox",
      "calcite-date",
      "calcite-inline-editable",
      "calcite-input",
      "calcite-radio",
      "calcite-radio-button",
      "calcite-radio-button-group",
      "calcite-radio-group",
      "calcite-rating",
      "calcite-select",
      "calcite-slider",
      "calcite-switch",
      "button",
      "input",
      "meter",
      "output",
      "progress",
      "select",
      "textarea"
    ];

    const { el, for: forProperty } = this;

    this.effectiveForElement =
      (forProperty && queryElementRoots(el, `#${forProperty}`)) ||
      el.querySelector(labelableElements.join(","));
  };

  private handleCalciteHtmlForClicks = () => {
    this.effectiveForElement?.click();
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver.observe(this.el, { childList: true, subtree: true });
    this.setEffectiveForElement();
  }

  disconnectedCallback(): void {
    this.mutationObserver.disconnect();
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <div
        class={{ container: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
        onClick={this.clickHandler}
      >
        <slot />
      </div>
    );
  }
}
