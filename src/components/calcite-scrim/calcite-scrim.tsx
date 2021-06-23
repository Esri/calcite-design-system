import { Component, Prop, h, VNode } from "@stencil/core";

import { CSS, TEXT } from "./resources";

@Component({
  tag: "calcite-scrim",
  styleUrl: "calcite-scrim.scss",
  shadow: true
})
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

  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const loaderNode = this.loading ? <calcite-loader active label={this.intlLoading} /> : null;

    return <div class={CSS.scrim}>{loaderNode}</div>;
  }
}
