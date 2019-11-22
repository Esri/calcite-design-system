import { Component, Element, Host, h, Prop, Listen } from "@stencil/core";

@Component({
  tag: "calcite-label",
  styleUrl: "calcite-label.scss",
  shadow: true
})

// slot calcite-input-message - place <div slot="calcite-input-message">Inside your input component</div>. The status of the input will determine icon of message and styling
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

  /** specify the status of the input field, determines message and icons */
  @Prop({ mutable: true, reflect: true }) status: "invalid" | "valid" | "idle" =
    "idle";

  /** optionally pass icon path data - pass only raw path data from calcite ui helper  */
  @Prop({ mutable: true, reflect: true }) icon?: string;

  /** specify the alignment of dropdown, defaults to left */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

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
  // todo fieldset
  // todo check radio group
  // todo separate input + label
  //todo onclick on this.el, focus child input

  render() {
    const attributes = this.getAttributes();
    return (
      <Host {...attributes}>
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

  @Listen("click") handleClick() {
    this.focusChildEl();
  }

  @Listen("keydown") handleKeydown() {
    this.focusChildEl();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  //todo cleanup
  private focusChildEl() {
    let requestedFor = this.el.getAttribute("for");
    var elToFocus = requestedFor
      ? document.getElementById(requestedFor)
      : this.el.querySelector("input")
      ? this.el.querySelector("input")
      : this.el.querySelector("textarea")
      ? this.el.querySelector("textarea")
      : this.el;
    elToFocus.focus();
  }

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = [
      "icon",
      "id",
      "status",
      "theme"
    ];
    return Array.from(this.el.attributes)
      .filter(a => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }
}
