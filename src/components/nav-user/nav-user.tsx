import { Component, Element, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "calcite-nav-user",
  styleUrl: "nav-user.scss",
  shadow: true
})
export class CalciteNavUser {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNavUserElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** When `true`, visually highlight the component */
  @Prop({ reflect: true }) active?;

  /** Specifies the image src to display */
  @Prop({ reflect: true }) src?;

  /** Specifies the subtext to display, for example a user organization or role */
  @Prop({ reflect: true }) subText?: string;

  /** Specifies the text to display, for example a user name or full name */
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
        <a tabIndex={0}>
          <calcite-avatar full-name={this.text} thumbnail={this.src ? this.src : null} />
          {(this.text || this.subText) && this.textEnabled && (
            <div class="text-container">
              {this.text && this.textEnabled ? <span class="user-text">{this.text}</span> : null}
              {this.subText && this.textEnabled ? (
                <span class="user-subtext">{this.subText}</span>
              ) : null}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
