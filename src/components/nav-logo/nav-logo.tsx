import { Component, Element, h, Host, Prop } from "@stencil/core";
import { CSS } from "./resources";

@Component({
  tag: "calcite-nav-logo",
  styleUrl: "nav-logo.scss",
  shadow: true
})
export class CalciteNavLogo {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteNavLogoElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** When `true`, visually highlight the component */
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the href destination of the component */
  @Prop({ reflect: true }) href: string;

  /** Specifies the `src` to an image  */
  @Prop({ reflect: true }) thumbnail: string;

  /** Specifies the subtext to display, for example an organization or application description */
  @Prop({ reflect: true }) subText: string;

  /** Specifies accesible label for the component */
  @Prop({ reflect: true }) label: string;

  /** Specifies the text to display, for example a product name */
  @Prop({ reflect: true }) text: string;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <a aria-label={this.label || this.text} href={this.href} tabIndex={0}>
          {this.thumbnail && <img src={this.thumbnail} />}
          {(this.text || this.subText) && (
            <div class={CSS.textContainer}>
              {!!this.text ? <span class={CSS.logoText}>{this.text}</span> : null}
              {!!this.subText ? <span class={CSS.logoSubtext}>{this.subText}</span> : null}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
