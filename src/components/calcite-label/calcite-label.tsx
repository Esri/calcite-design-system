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
import { getElementDir, getElementTheme } from "../../utils/dom";

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
  }

  componentDidLoad() {
    this.requestedInputId = this.el.getAttribute("for");
  }

  render() {
    const attributes = this.getAttributes();
    const dir = getElementDir(this.el);
    const theme = getElementTheme(this.el);
    return (
      <Host {...attributes} theme={theme} dir={dir}>
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
    // don't refocus the input if the click occurs on a slotted input action
    if (e.target.parentElement.className !== "calcite-input-action-wrapper")
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // todo cleanup this mess
  private focusChildEl() {
    if (this.requestedInputId) {
      this.emitSelectedItem();
      document.getElementById(this.requestedInputId).focus();
    } else if (this.el.querySelector("calcite-radio-group")) {
      // todo timeout prevents clicks from focusing the previously focused item
      setTimeout(() => {
        (this.el.querySelector(
          "calcite-radio-group-item[checked]"
        ) as HTMLCalciteRadioGroupItemElement).focus();
      }, 10);
    } else if (this.el.querySelector("calcite-switch")) {
      this.el.querySelector("calcite-switch").focus();
      this.el.querySelector("calcite-switch").toggleAttribute("switched");
    } else if (this.el.querySelector("calcite-checkbox")) {
      this.el.querySelector("calcite-checkbox").focus();
      this.el.querySelector("calcite-checkbox").toggleAttribute("checked");
    } else if (this.el.querySelector("textarea")) {
      this.el.querySelector("textarea").focus();
    } else if (this.el.querySelector("input")) {
      this.el.querySelector("input").focus();
    }
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
