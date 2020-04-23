import { Component, Host, Prop, h } from "@stencil/core";

import { CSS } from "./resources";

@Component({
  tag: "calcite-scrim",
  styleUrl: "calcite-scrim.scss",
  shadow: true,
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

  /**
   * Determines if the component will have the loader overlay.
   * Otherwise, will render opaque disabled state.
   */
  @Prop({ reflect: true }) loading = false;

  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------

  render() {
    const loaderNode = this.loading ? (
      <calcite-loader is-active></calcite-loader>
    ) : null;

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
