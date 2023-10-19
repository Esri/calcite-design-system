import { Component, Element, h, VNode } from "@stencil/core";

import hljs from "highlight.js";
import { slotChangeGetAssignedElements } from "../../utils/dom";

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

  _highlight = (event: Event): void => {
    const code = slotChangeGetAssignedElements(event)[0] as HTMLElement;

    if (!code) {
      return;
    }

    hljs.highlightElement(code);
  };

  render(): VNode {
    return (
      <div>
        <slot onSlotchange={this._highlight} />
      </div>
    );
  }
}
