import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from "@stencil/core";
import { getElementDir, focusElement } from "../../utils/dom";

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

  @Element() el: HTMLCalciteLabelElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** specify the status of the label and any child input / input messages */
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle" =
    "idle";

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify theme of the label and its any child input / input messages */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark";

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

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  componentDidLoad() {
    this.requestedFor = this.el.getAttribute("for");
    if (this.layout === "inline" || this.layout === "inline-space-between") {
      this.displayedSlottedContent = this.handleSlottedContent();
      this.slottedContent.innerHTML = "";
      this.displayedSlottedContent.map((item) => {
        this.slottedContent.append(item);
      });
    }
  }

  render() {
    const attributes = this.getAttributes();
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir} onClick={this.handleClick}>
        <label {...attributes} ref={(el) => (this.slottedContent = el)}>
          <slot />
        </label>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteLabelFocus: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  private slottedContent;

  /** the input requested with the for attribute */
  private requestedFor: string;

  /** the slotted content after it has been interpreted */
  private displayedSlottedContent: HTMLElement[];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // emit focus event and focus the requested input if available
  private handleClick = (event: MouseEvent) => {
    this.emitSelectedItem(event.target);
    if (this.requestedFor) {
      focusElement(document.getElementById(this.requestedFor));
    } else if (this.el.querySelector("textarea")) {
      this.el.querySelector("textarea").focus();
    } else if (this.el.querySelector("input")) {
      this.el.querySelector("input").focus();
    }
  };

  // wrap slotted text nodes in span to handle spacing of inline and inline space between layouts
  private handleSlottedContent() {
    let nodeList = [];
    let requestedSlottedContent = this.el.childNodes;
    // iterate over slotted nodes and wrap text nodes in span
    if (requestedSlottedContent) {
      requestedSlottedContent.forEach(function (item) {
        if (item.nodeName === "#text" && item.textContent.trim().length > 0) {
          const node = document.createElement("span");
          node.classList.add("calcite-label-text");
          node.innerHTML = item.textContent.trim();
          nodeList.push(node as HTMLSpanElement);
        } else if (item.nodeName !== "#text") {
          nodeList.push(item);
        }
      });
    }
    return [...Array.from(new Set(nodeList))];
  }

  private emitSelectedItem(target) {
    this.calciteLabelFocus.emit({
      labelEl: this.el,
      interactedEl: target,
      requestedInput: this.requestedFor,
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
