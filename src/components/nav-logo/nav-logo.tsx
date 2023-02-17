import { Component, Element, h, Host, Prop } from "@stencil/core";

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

  /** Specifies image src to display */
  @Prop({ reflect: true }) href?;

  /** Specifies the image src to display */
  @Prop({ reflect: true }) src?;

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
          {this.src && <img src={this.src} />}
          {(this.text || this.subText) && this.textEnabled && (
            <div class="text-container">
              {this.text && this.textEnabled ? <span class="logo-text">{this.text}</span> : null}
              {this.subText && this.textEnabled ? (
                <span class="logo-subtext">{this.subText}</span>
              ) : null}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
