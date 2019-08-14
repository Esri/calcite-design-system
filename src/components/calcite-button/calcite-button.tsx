import { Component, Element, h, Host, Prop, Build } from "@stencil/core";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-button",
  styleUrl: "calcite-button.scss",
  shadow: true
})

/** @slot default text slot for button text */

/** Any attributes placed on <calcite-button> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
/** Using appearance=inline will also render as an anchor link. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission */
export class CalciteButton {
  @Element() el: HTMLElement;

  /** specify the color of the button, defaults to blue */
  @Prop({ mutable: true, reflect: true }) color:
    | "blue"
    | "dark"
    | "light"
    | "red" = "blue";

  /** specify the appearance style of the button, defaults to solid. Specifying "inline" will render the component as an anchor */
  @Prop({ mutable: true, reflect: true }) appearance:
    | "solid"
    | "outline"
    | "clear"
    | "inline" = "solid";

  /** specify the scale of the button, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" =
    "m";

  /** specify the width of the button, defaults to auto */
  @Prop({ mutable: true, reflect: true }) width: "auto" | "half" | "full" =
    "auto";

  /** optionally add a calcite-loader component inline to indicate loading is occuring. You can add and remove this prop depending on status  */
  @Prop({ reflect: true }) loading?: boolean = false;

  /** optionally pass a href - used to determine if the component should render as a button or an anchor */
  @Prop({ reflect: true }) href?: string;

  /** optionally pass icon path data to be positioned within the button - pass only raw path data from calcite ui helper  */
  @Prop({ reflect: true }) icon?: string = null;

  /**
   * @internal
   */
  // hastext prop for spacing graphic when text is present in slot
  @Prop({ mutable: true }) hastext: boolean = false;

  connectedCallback() {
    // prop validations
    let appearance = ["solid", "outline", "clear", "inline"];
    if (!appearance.includes(this.appearance)) this.appearance = "solid";

    let color = ["blue", "red", "dark", "light"];
    if (!color.includes(this.color)) this.color = "blue";

    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let width = ["auto", "half", "full"];
    if (!width.includes(this.width)) this.width = "auto";
  }

  componentDidLoad() {
    if (Build.isBrowser) {
      let textSlot = this.el.shadowRoot.querySelector("slot");
      let textNode = textSlot ? textSlot.assignedNodes() : null;
      if (textNode && (textNode[0] !== undefined && textNode[0] !== null))
        this.hastext = true;
    }
  }

  getAttributes() {
    // spreadable attributes to pass to component child, if they aren't props
    let props = [
      "appearance",
      "color",
      "loading",
      "scale",
      "width",
      "icon",
      "dir"
    ];
    return Array.from(this.el.attributes)
      .filter(a => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  render() {
    const dir = getElementDir(this.el);
    const attributes = this.getAttributes();
    const Type = this.href || this.appearance === "inline" ? "a" : "button";
    const role = Type === "a" ? "link" : "button";
    const loader = this.loading ? (
      <div class="calcite-button--loader">
        <calcite-loader is-active inline></calcite-loader>
      </div>
    ) : null;
    const icon = this.icon ? (
      <svg
        class="calcite-button--icon"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path d={this.icon} />
      </svg>
    ) : null;
    if (this.appearance === "inline") {
      return (
        <Host dir={dir} hastext={this.hastext}>
          <Type {...attributes} role={role}>
            {loader}
            <slot />
            {icon}
          </Type>
        </Host>
      );
    } else {
      return (
        <Host dir={dir} hastext={this.hastext}>
          <Type {...attributes} role={role}>
            {loader}
            {icon}
            <slot />
          </Type>
        </Host>
      );
    }
  }
}
