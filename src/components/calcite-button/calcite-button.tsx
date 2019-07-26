import { Component, Element, h, Host, Prop } from "@stencil/core";

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

  getAttributes() {
    // spreadable attributes to pass to component child, if they aren't props
    let props = ["appearance", "color", "loading", "scale", "width", "icon"];
    return Array.from(this.el.attributes)
      .filter(a => !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  render() {
    const attributes = this.getAttributes();
    const Type = this.href || this.appearance === "inline" ? "a" : "button";
    const role = Type === "a" ? "link" : "button";
    const loader = <calcite-loader is-active inline></calcite-loader>;
    const graphic = this.loading ? (
      <div class="calcite-button--graphic">{loader}</div>
    ) : this.icon ? (
      <div class="calcite-button--graphic">
        <svg
          class="calcite-button--icon"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path d={this.icon} />
        </svg>
      </div>
    ) : null;
    return (
      <Host>
        <Type {...attributes} role={role}>
          {graphic}
          <slot />
        </Type>
      </Host>
    );
  }
}
