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
    this.requestedInput = this.el.getAttribute("for");
  }

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

  @Event() calciteLabelSelectedEvent: EventEmitter;

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

  /** the input requested with the for attribute */
  private requestedInput: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private focusChildEl() {
    console.log(this.requestedInput);
    var elToFocus;
    if (this.requestedInput) {
      this.calciteLabelSelectedEvent.emit({
        requestedInput: this.requestedInput
      });
      elToFocus = document.getElementById(this.requestedInput);
    } else {
      elToFocus = this.el.querySelector("input")
        ? this.el.querySelector("input")
        : this.el.querySelector("textarea");
      console.log(elToFocus);
    }
    elToFocus.focus();
  }

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = ["status", "theme"];
    return Array.from(this.el.attributes)
      .filter(a => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }
}
