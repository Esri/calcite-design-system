import {
  Component,
  Element,
  h,
  Host,
  Method,
  Prop,
  Build
} from "@stencil/core";

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
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the scale of the button, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" =
    "m";

  /** specify the width of the button, defaults to auto */
  @Prop({ mutable: true, reflect: true }) width: "auto" | "half" | "full" =
    "auto";

  /** optionally add a calcite-loader component to the button, disabling interaction.  */
  @Prop({ reflect: true }) loading?: boolean = false;

  /** optionally add a round style to the button  */
  @Prop({ reflect: true }) round?: boolean = false;

  /** optionally add a floating style to the button - this should be positioned fixed or sticky */
  @Prop({ reflect: true }) floating?: boolean = false;

  /** optionally pass a href - used to determine if the component should render as a button or an anchor */
  @Prop({ reflect: true }) href?: string;

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  /** optionally used with icon, select where to position the icon */
  @Prop({ reflect: true, mutable: true }) iconPosition?: "start" | "end" =
    "start";

  /** is the button disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

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
    let iconPosition = ["start", "end"];
    if (this.icon !== null && !iconPosition.includes(this.iconPosition))
      this.iconPosition = "start";

    this.childElType = this.href
      ? "a"
      : this.appearance === "inline"
      ? "span"
      : "button";
  }

  componentWillLoad() {
    if (Build.isBrowser) {
      this.hasText = this.el.textContent.length > 0;
      const elType = this.el.getAttribute("type");
      this.type = this.childElType === "button" && elType ? elType : "submit";
    }
  }

  render() {
    const attributes = this.getAttributes();
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "button" : null;
    const tabIndex = this.childElType === "span" ? 0 : null;

    const loader = (
      <div class="calcite-button--loader">
        <calcite-loader is-active inline></calcite-loader>
      </div>
    );

    const iconScale =
      this.appearance === "inline" ||
      this.scale === "xs" ||
      this.scale === "s" ||
      this.scale === "m"
        ? "s"
        : this.scale === "l"
        ? "m"
        : "l";

    const iconEl = (
      <calcite-icon
        class="calcite-button--icon"
        icon={this.icon}
        scale={iconScale}
      />
    );

    return (
      <Host hasText={this.hasText}>
        <Tag
          {...attributes}
          role={role}
          tabindex={tabIndex}
          onClick={e => this.handleClick(e)}
          disabled={this.disabled}
          ref={el => (this.childEl = el)}
        >
          {this.loading ? loader : null}
          {this.icon && this.iconPosition === "start" ? iconEl : null}
          <slot />
          {this.icon && this.iconPosition === "end" ? iconEl : null}
        </Tag>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus() {
    this.childEl.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** if button type is present, assign as prop */
  private type?: string;

  /** the rendered child element */
  private childEl?: HTMLElement;

  /** the node type of the rendered child element */
  private childElType?: "a" | "span" | "button" = "button";

  /** determine if there is slotted text for styling purposes */
  private hasText: boolean = false;

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = [
      "appearance",
      "color",
      "dir",
      "hasText",
      "icon",
      "iconPosition",
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // act on a requested or nearby form based on type
  private handleClick = (e: Event) => {
    // this.type refers to type attribute, not child element type
    if (this.childElType === "button" && this.type !== "button") {
      const requestedForm = this.el.getAttribute("form");
      const targetForm = requestedForm
        ? (document.getElementsByName(`${requestedForm}`)[0] as HTMLFormElement)
        : (this.el.closest("form") as HTMLFormElement);

      if (targetForm) {
        const targetFormSubmitFunction = targetForm.onsubmit as Function;
        switch (this.type) {
          case "submit":
            if (targetFormSubmitFunction) targetFormSubmitFunction();
            else if (targetForm.checkValidity()) targetForm.submit();
            else targetForm.reportValidity();
            break;
          case "reset":
            targetForm.reset();
            break;
        }
      }
      e.preventDefault();
    }
  };
}
