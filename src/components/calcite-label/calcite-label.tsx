import {
  Component,
  Element,
  Event,
  Listen,
  Host,
  h,
  Prop,
  EventEmitter,
  Watch
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-label",
  styleUrl: "calcite-label.scss",
  scoped: true
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
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle" = "idle";

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify theme of the label and its any child input / input messages */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** is the wrapped element positioned inline with the label slotted text */
  @Prop({ mutable: true, reflect: true }) layout: "inline" | "inline-space-between" | "default" =
    "default";

  /** is the label disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  @Watch("disabled") disabledWatcher() {
    if (this.disabled) this.setDisabledControls();
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteLabelFocus: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(event: MouseEvent) {
    const forAttr = this.el.getAttribute("for");
    this.calciteLabelFocus.emit({
      labelEl: this.el,
      interactedEl: event.target,
      requestedInput: forAttr
    });
    if (forAttr) {
      document.getElementById(forAttr).click();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    const props = ["layout", "theme", "scale", "status", "disabled"];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    const status = ["invalid", "valid", "idle"];
    if (!status.includes(this.status)) this.status = "idle";

    const layout = ["inline", "inline-space-between", "default"];
    if (!layout.includes(this.layout)) this.layout = "default";

    const scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  componentDidLoad() {
    const labelNode = this.el.querySelector("label");
    labelNode.childNodes.forEach((childNode) => {
      if (childNode.nodeName === "#text" && childNode.textContent.trim().length > 0) {
        const newChildNode = document.createElement("span");
        newChildNode.classList.add("calcite-label-text");
        const newChildNodeText = document.createTextNode(childNode.textContent.trim());
        newChildNode.appendChild(newChildNodeText);
        childNode.parentNode.replaceChild(newChildNode, childNode);
      }
    });
    if (this.disabled) this.setDisabledControls();
  }

  render() {
    const attributes = this.getAttributes();
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <label {...attributes} ref={(el) => (this.childLabelEl = el)}>
          <slot />
        </label>
      </Host>
    );
  }
  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  // the rendered wrapping label element
  private childLabelEl: HTMLLabelElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setDisabledControls() {
    this.childLabelEl?.childNodes.forEach((item) => {
      if (item.nodeName.includes("CALCITE")) {
        (item as HTMLElement).setAttribute("disabled", "");
      }
    });
  }
}
