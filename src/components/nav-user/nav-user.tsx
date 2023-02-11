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

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true }) userName?;

  @Prop({ reflect: true }) userImageSrc?;

  @Prop({ reflect: true }) userOrganization?;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return (
      <Host tabIndex={0}>
        <div class="container">
          <div class={`user-details`}>
            <calcite-avatar
              full-name={this.userName}
              thumbnail={this.userImageSrc ? this.userImageSrc : null}
            />
            <div class={`user-text`}>
              <span class="user-name">{this.userName}</span>
              <span class="user-organization">{this.userOrganization}</span>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
