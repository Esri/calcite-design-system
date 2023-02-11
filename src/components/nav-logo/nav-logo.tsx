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
  @Prop({ reflect: true }) active?;

  @Prop({ reflect: true }) href?;

  @Prop({ reflect: true }) src?;

  @Prop({ reflect: true }) textEnabled?: boolean;

  @Prop({ reflect: true }) text?: string;

  @Prop({ reflect: true }) subText?: string;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host tabIndex={0}>
        <a href={this.href} tabIndex={1}>
          {this.src && <img src={this.src} />}
          {(this.text || this.subText) && this.textEnabled && (
            <div class={`text-container`}>
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
