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

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

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
  @Prop({ reflect: true }) icon?: string;

  /** optionally used with icon, select where to position the icon */
  @Prop({ reflect: true, mutable: true }) iconposition?: "start" | "end" =
    "start";

  /** is the button disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  /** @internal */
  // hastext prop for spacing icon when text is present in slot
  @Prop({ mutable: true }) hastext: boolean = false;

  connectedCallback() {
    // prop validations
    let appearance = ["solid", "outline", "clear", "inline", "transparent"];
    if (!appearance.includes(this.appearance)) this.appearance = "solid";

    let color = ["blue", "red", "dark", "light"];
    if (!color.includes(this.color)) this.color = "blue";

    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let width = ["auto", "half", "full"];
    if (!width.includes(this.width)) this.width = "auto";

    let theme = ["dark", "light"];
    if (!theme.includes(this.theme)) this.theme = "light";

    let iconposition = ["start", "end"];
    if (this.icon !== null && !iconposition.includes(this.iconposition))
      this.iconposition = "start";
  }

  componentDidLoad() {
    if (Build.isBrowser) {
      this.hastext = this.el.textContent.length > 0;
    }
  }

  getAttributes() {
    // spread attributes specified on the component to rendered child, if they aren't props
    let props = [
      "appearance",
      "color",
      "dir",
      "hastext",
      "icon",
      "iconposition",
      "id",
      "loading",
      "scale",
      "width",
      "theme"
    ];
    return Array.from(this.el.attributes)
      .filter(a => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  // if a button has an associated form, create a proxy button and click it
  private handleClick = (e: Event) => {
    const requestedForm = this.el.getAttribute("form");
    const targetForm = requestedForm
      ? document.getElementsByName(`${requestedForm}`)[0]
      : this.el.closest("form");
    if (targetForm) {
      const proxyElement = document.createElement("button");
      proxyElement.style.display = "none";
      targetForm.appendChild(proxyElement);
      proxyElement.click();
      proxyElement.remove();
      e.preventDefault();
    }
  };

  render() {
    const dir = getElementDir(this.el);
    const attributes = this.getAttributes();
    const Tag = this.href
      ? "a"
      : this.appearance === "inline"
      ? "span"
      : "button";
    const role = Tag === "span" ? "button" : null;
    const tabIndex = Tag === "span" ? 0 : null;
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

    if (this.iconposition === "start") {
      return (
        <Host dir={dir} hastext={this.hastext}>
          <Tag
            {...attributes}
            role={role}
            tabindex={tabIndex}
            onClick={e => this.handleClick(e)}
            disabled={this.disabled}
          >
            {loader}
            {icon}
            <slot />
          </Tag>
        </Host>
      );
    } else if (this.iconposition === "end") {
      return (
        <Host dir={dir} hastext={this.hastext}>
          <Tag
            {...attributes}
            role={role}
            tabindex={tabIndex}
            onClick={e => this.handleClick(e)}
            disabled={this.disabled}
          >
            {loader}
            <slot />
            {icon}
          </Tag>
        </Host>
      );
    } else {
      return (
        <Host dir={dir} hastext={this.hastext}>
          <Tag
            {...attributes}
            role={role}
            tabindex={tabIndex}
            onClick={e => this.handleClick(e)}
            disabled={this.disabled}
          >
            {loader}
            <slot />
          </Tag>
        </Host>
      );
    }
  }
}
