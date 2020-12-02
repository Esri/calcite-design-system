import { Component, Host, Prop, h, VNode } from "@stencil/core";

import { CSS, TEXT } from "./resources";

@Component({
  tag: "calcite-scrim",
  styleUrl: "calcite-scrim.scss",
  shadow: true
})

/**
 * @slot - Default slot for content.
 */
export class CalciteScrim {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** string to override English loading text */
  @Prop() intlLoading?: string = TEXT.loading;

  /**
   * Determines if the component will have the loader overlay.
   * Otherwise, will render opaque disabled state.
   */
  @Prop({ reflect: true }) loading = false;

  /** specify the theme of scrim, defaults to light */
  @Prop({ reflect: true }) theme: "light" | "dark";

  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const loaderNode = this.loading ? <calcite-loader active label={this.intlLoading} /> : null;

    const scrimNode = <div class={CSS.scrim}>{loaderNode}</div>;

    const contentNode = (
      <div class={CSS.content}>
        <slot />
      </div>
    );

    return (
      <Host>
        {scrimNode}
        {contentNode}
      </Host>
    );
  }
}
