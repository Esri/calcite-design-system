import {
  Component,
  Element,
  Event,
  Host,
  Listen,
  h,
  Prop,
  EventEmitter,
  VNode,
  State,
  Watch
} from "@stencil/core";
import { getElementDir, queryElementRoots } from "../../utils/dom";
import { FocusRequest } from "./interfaces";
import { Alignment, Scale, Status } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { guid } from "../../utils/guid";

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

  @Listen("click")
  onClick(): void {
    this.calciteLabelFocus.emit({
      labelEl: this.el,
      requestedInput: this.for
    });
    this.handleCalciteHtmlForClicks();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  guid = `calcite-label-${guid()}`;

  mutationObserver = new MutationObserver(() => this.setEffectiveForElement());

  @State() effectiveForElement: HTMLElement;

  @Watch("effectiveForElement")
  effectiveForElementHandler(newValue: HTMLElement, oldValue: HTMLElement): void {
    const id = this.el.id || this.guid;

    if (oldValue?.getAttribute("aria-labelledby") === id) {
      oldValue.removeAttribute("aria-labelledby");
    }

    newValue?.setAttribute("aria-labelledby", id);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  setEffectiveForElement = (): void => {
    if (this.for) {
      this.effectiveForElement = queryElementRoots(this.el, `#${this.for}`);
      return;
    }

    // 4. target is not a labelable calcite form element
    const labelableCalciteElements = [
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
      "calcite-switch"
    ];

    this.effectiveForElement = this.el.querySelector(labelableCalciteElements.join(","));
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
      <Host id={this.el.id || this.guid}>
        <div class={{ container: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          <slot />
        </div>
      </Host>
    );
  }
}
