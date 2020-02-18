import {
  Component,
  Element,
  h,
  Host,
  Prop
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-button-with-overflow",
  styleUrl: "calcite-button-with-overflow.scss",
  shadow: true
})

export class CalciteButtonWithOverflow {
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

  /** specify the color of the control, defaults to blue */
  @Prop({ mutable: true, reflect: true }) color:
    | "blue"
    | "dark"
    | "light"
    | "red" = "blue";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** specify the scale of the control, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" = "xs";

  /** optionally add a calcite-loader component to the control, disabling interaction.  */
  @Prop({ reflect: true }) loading?: boolean = false;

  /** is the control disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    let color = ["blue", "red", "dark", "light"];
    if (!color.includes(this.color)) this.color = "blue";

    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "xs";

    let theme = ["dark", "light"];
    if (!theme.includes(this.theme)) this.theme = "light";
  }

  render() {
    const dir = getElementDir(this.el);
    // const attributes = this.getAttributes();

    return (
      <Host dir={dir}>
        <calcite-button
            color={this.color}
            scale={this.scale}
            loading={this.loading}
            disabled={this.disabled}
            theme={this.theme}>
          Primary Option
        </calcite-button>
        <div class='divider-container'>
          <div class='divider'/>
        </div>
        <calcite-dropdown
            alignment={dir === "rtl" ? "right" : "left"}
            theme={this.theme}
            scale={this.scale === 'xs' ? 's' : this.scale === 'xl' ? 'l' : this.scale}>
          <div slot="dropdown-trigger">
            <calcite-button
                class='dropdown-trigger'
                slot="dropdown-trigger"
                scale={this.scale}
                color={this.color}
                disabled={this.disabled}
                theme={this.theme}>
              <calcite-icon icon="caretDown" scale="s" filled={true}></calcite-icon>
            </calcite-button>
          </div>
          <slot />
        </calcite-dropdown>
      </Host>
    );
  }
}