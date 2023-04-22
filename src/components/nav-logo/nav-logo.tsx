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
  @Prop({ reflect: true }) active?;

  /** Specifies the href destination of the component */
  @Prop({ reflect: true }) href?;

  /** Specifies the `src` to an image  */
  @Prop({ reflect: true }) thumbnail?;

  /** Specifies the subtext to display, for example an organization or application description */
  @Prop({ reflect: true }) subText?: string;

  /** Specifies the text to display, for example a product name */
  @Prop({ reflect: true }) text?: string;

  /** When `true`, makes `text` and `subText` visible */
  @Prop({ reflect: true }) textEnabled?: boolean;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <a href={this.href} tabIndex={0}>
          {this.thumbnail && <img src={this.thumbnail} />}
          {(this.text || this.subText) && this.textEnabled && (
            <div class={CSS.textContainer}>
              {this.text && this.textEnabled ? <span class={CSS.logoText}>{this.text}</span> : null}
              {this.subText && this.textEnabled ? (
                <span class={CSS.logoSubtext}>{this.subText}</span>
              ) : null}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
