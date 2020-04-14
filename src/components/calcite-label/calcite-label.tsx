import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Listen,
} from "@stencil/core";
import { getElementDir, getElementTheme } from "../../utils/dom";

@Component({
  tag: "calcite-label",
  styleUrl: "calcite-label.scss",
  shadow: true,
})
export class CalciteLabel {
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

  /** specify the status of the label and any child input / input messages */
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle" =
    "idle";

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" =
    "m";

  /** specify theme of the lavel and its any child input / input messages */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** is the wrapped element positioned inline with the label slotted text */
  @Prop({ mutable: true, reflect: true }) layout:
    | "inline"
    | "inline-space-between"
    | "default" = "default";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    let status = ["invalid", "valid", "idle"];
    if (!status.includes(this.status)) this.status = "idle";

    let layout = ["inline", "inline-space-between", "default"];
    if (!layout.includes(this.layout)) this.layout = "default";

    let theme = ["light", "dark"];
    if (!theme.includes(this.theme)) this.theme = "light";

    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  componentDidLoad() {
    this.requestedInputId = this.el.getAttribute("for");
    if (this.layout === "inline" || this.layout === "inline-space-between") {
      this.displayedSlottedContent = this.handleSlottedContent();
      this.slottedContent.innerHTML = "";
      this.slottedContent.append(...this.displayedSlottedContent);
    }
  }

  render() {
    const attributes = this.getAttributes();
    const dir = getElementDir(this.el);
    const theme = getElementTheme(this.el);
    return (
      <Host theme={theme} dir={dir}>
        <label {...attributes} ref={(el) => (this.slottedContent = el)}>
          <slot />
        </label>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  private slottedContent;
  @Listen("click") handleClick(e) {
    // don't refocus the input if the click occurs on a slotted input action
    // defer to slider click events if the click occurs on a calcite-slider
    if (
      e.target.parentElement.className !== "calcite-input-action-wrapper" &&
      e.target.nodeName !== "CALCITE-SLIDER" &&
      e.target.nodeName !== "CALCITE-RADIO-GROUP-ITEM"
    )
      this.focusChildEl();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteLabelSelectedEvent: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** the input requested with the for attribute */
  private requestedInputId: string;

  /** the slotted content after it has been interpreted */
  private displayedSlottedContent: HTMLElement[];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // take unique action on calcite child controls if present
  private focusChildEl() {
    if (this.requestedInputId) {
      this.emitSelectedItem();
      document.getElementById(this.requestedInputId).focus();
    } else if (this.el.querySelector("calcite-radio-group")) {
      (this.el.querySelectorAll(
        "calcite-radio-group-item[checked]"
      )[0] as HTMLCalciteRadioGroupItemElement).focus();
    } else if (this.el.querySelector("calcite-switch")) {
      this.el.querySelector("calcite-switch").focus();
      this.el.querySelector("calcite-switch").toggleAttribute("switched");
    } else if (this.el.querySelector("calcite-checkbox")) {
      this.el.querySelector("calcite-checkbox").focus();
      this.el.querySelector("calcite-checkbox").toggleAttribute("checked");
    } else if (this.el.querySelector("calcite-slider")) {
      this.el.querySelector("calcite-slider").setFocus();
    } else if (this.el.querySelector("textarea")) {
      this.el.querySelector("textarea").focus();
    } else if (this.el.querySelector("input")) {
      this.el.querySelector("input").focus();
    }
  }

  // wrap slotted text nodes in span to handle spacing of inline and inline space between layout
  private handleSlottedContent() {
    let nodeList = [];
    let requestedSlottedContent = this.el.shadowRoot.querySelector("slot")
      ? (this.el.shadowRoot
          .querySelector("slot")
          .assignedNodes({ flatten: true }) as HTMLElement[])
      : this.el.childNodes;
    // iterate over slotted nodes and wrap text nodes in span
    if (requestedSlottedContent) {
      requestedSlottedContent.forEach(function (item) {
         if (item.nodeName === "#text" && item.textContent.trim().length > 0) {
          const node = document.createElement("span");
          node.classList.add("calcite-label-text");
          node.classList.add("sc-calcite-label");
          node.innerHTML = item.textContent.trim();
          nodeList.push(node as HTMLSpanElement);
        } else if (item.nodeName !== "#text") {
          nodeList.push(item);
        }
      });
    }
    return nodeList;
  }

  private emitSelectedItem() {
    this.calciteLabelSelectedEvent.emit({
      requestedInput: this.requestedInputId,
    });
  }

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = ["layout", "theme", "scale", "status"];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }
}
