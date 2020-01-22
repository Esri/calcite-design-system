import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Listen
} from "@stencil/core";
import { getElementTheme } from "../../utils/dom";

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

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** specify the status of the label and any child input / input messages */
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle" =
    "idle";

  /** specify theme of the lavel and its any child input / input messages */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** is the wrapped element positioned inline with the label slotted text */
  @Prop({ mutable: true, reflect: true }) appearance:
    | "inline"
    | "inline-space-between"
    | "default" = "default";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    let statusOptions = ["invalid", "valid", "idle"];
    if (!statusOptions.includes(this.status)) this.status = "idle";

    let theme = ["light", "dark"];
    if (!theme.includes(this.theme)) this.theme = "light";
  }

  componentDidLoad() {
    this.requestedInputId = this.el.getAttribute("for");
  }

  render() {
    const theme = getElementTheme(this.el);
    const attributes = this.getAttributes();
    return (
      <Host {...attributes} theme={theme}>
        <label>
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

  @Listen("click") handleClick(e) {
    this.focusChildEl(e);
  }

  @Listen("keydown") handleKeydown(e) {
    this.focusChildEl(e);
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // todo cleanup this mess
  private focusChildEl(e) {
    if (this.requestedInputId) {
      this.emitSelectedItem();
      document.getElementById(this.requestedInputId).focus();
    } else if (this.el.querySelector("calcite-switch"))
      e.type === "click"
        ? this.el.querySelector("calcite-switch").toggleAttribute("switched")
        : this.el.querySelector("calcite-switch").focus();
    else if (this.el.querySelector("calcite-checkbox"))
      e.type === "click"
        ? this.el.querySelector("calcite-checkbox").toggleAttribute("checked")
        : this.el.querySelector("calcite-checkbox").focus();
    else if (this.el.querySelector("textarea"))
      this.el.querySelector("textarea").focus();
    else if (this.el.querySelector("input"))
      this.el.querySelector("input").focus();
  }

  private emitSelectedItem() {
    this.calciteLabelSelectedEvent.emit({
      requestedInput: this.requestedInputId
    });
  }

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = ["status", "theme"];
    return Array.from(this.el.attributes)
      .filter(a => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }
}
