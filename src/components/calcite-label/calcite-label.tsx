import {
  Component,
  Element,
  Event,
  Listen,
  Host,
  h,
  Prop,
  EventEmitter,
  VNode,
  Watch
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { FocusRequest } from "../../interfaces/Label";

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

  /** The id of the input associated with the label */
  @Prop({ reflect: true }) for: string;

  /** specify the scale of the input, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify theme of the label and its any child input / input messages */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** is the wrapped element positioned inline with the label slotted text */
  @Prop({ mutable: true, reflect: true }) layout: "inline" | "inline-space-between" | "default" =
    "default";

  /** Turn off spacing around the label */
  @Prop() disableSpacing?: boolean;

  /** is the label disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  @Watch("disabled")
  disabledWatcher(): void {
    if (this.disabled) this.setDisabledControls();
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteLabelFocus: EventEmitter<FocusRequest>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  onClick({ target }: MouseEvent): void {
    if (
      (target === this.el) ||
      (target === this.labelEl) ||
      (target === this.spanEl)
    ) {
      const forAttr = this.el.getAttribute("for");
      this.calciteLabelFocus.emit({
        labelEl: this.el,
        interactedEl: target as HTMLElement,
        requestedInput: forAttr
      });
      const inputForThisLabel: HTMLElement = forAttr ? document.getElementById(forAttr) : this.el.querySelector("input");
      if (
        (inputForThisLabel && inputForThisLabel.nodeName.startsWith("CALCITE-")) ||
        (inputForThisLabel && inputForThisLabel.nodeName === "INPUT" && target === this.el)
      ) {
        inputForThisLabel.click();
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getAttributes(): Record<string, any> {
    // spread attributes from the component to rendered child, filtering out props
    const props = ["disabled", "id", "layout", "scale", "status", "theme"];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const status = ["invalid", "valid", "idle"];
    if (!status.includes(this.status)) this.status = "idle";

    const layout = ["inline", "inline-space-between", "default"];
    if (!layout.includes(this.layout)) this.layout = "default";

    const scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  componentDidLoad(): void {
    this.labelEl.childNodes.forEach((childNode) => {
      if (childNode.nodeName === "#text" && childNode.textContent.trim().length > 0) {
        this.spanEl = document.createElement("span");
        this.spanEl.classList.add("calcite-label-text");
        this.spanEl.appendChild(document.createTextNode(childNode.textContent.trim()));
        childNode.parentNode.replaceChild(this.spanEl, childNode);
      }
    });
    if (this.disabled) this.setDisabledControls();
  }

  render(): VNode {
    const attributes = this.getAttributes();
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <label {...attributes} ref={(el) => (this.labelEl = el)}>
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
  private labelEl: HTMLLabelElement;

  // the span element that contains the computed label text
  private spanEl: HTMLSpanElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setDisabledControls() {
    this.labelEl?.childNodes.forEach((item) => {
      if (item.nodeName.includes("CALCITE")) {
        (item as HTMLElement).setAttribute("disabled", "");
      }
    });
  }
}
