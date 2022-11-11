import { Component, Element, Prop, h, VNode } from "@stencil/core";

import { CSS, TEXT } from "./resources";

/**
 * @slot - A slot for adding custom content, primarily loading information.
 */
@Component({
  tag: "calcite-scrim",
  styleUrl: "scrim.scss",
  shadow: true
})
export class Scrim {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Accessible name when the component is loading.
   *
   * @default "Loading"
   */
  @Prop() intlLoading?: string = TEXT.loading;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteScrimElement;

  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el, loading, intlLoading } = this;
    const hasContent = el.innerHTML.trim().length > 0;
    const loaderNode = loading ? <calcite-loader active label={intlLoading} /> : null;
    const contentNode = hasContent ? (
      <div class={CSS.content}>
        <slot />
      </div>
    ) : null;

    return (
      <div class={CSS.scrim}>
        {loaderNode}
        {contentNode}
      </div>
    );
  }
}
