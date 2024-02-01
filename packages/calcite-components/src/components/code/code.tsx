import { Component, Element, h, VNode, Prop } from "@stencil/core";

import hljs from "highlight.js";

@Component({
  tag: "calcite-code",
  styleUrl: "code.scss",
  shadow: true,
})
export class Code {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  @Prop() code: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCodeElement;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <pre>
        <code innerHTML={hljs.highlightAuto(this.code).value} />
      </pre>
    );
  }
}
