import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "calcite-scrim",
  styleUrl: "calcite-scrim.scss",
  shadow: true
})

/**
 * @slot - Default slot for esri scrim loader.
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
    const loaderNode = this.loading ? <calcite-loader is-active></calcite-loader> : null;

    return (
      <Host>
      {loaderNode}
      <slot />
      </Host>
    )
  }
}
