import { Component, h, VNode, Prop, State } from "@stencil/core";
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

  @Prop() language: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @State() source: string;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { source, language } = this;
    return (
      <pre>
        <code
          innerHTML={
            source
              ? language
                ? hljs.highlight(source, { language, ignoreIllegals: true }).value
                : hljs.highlightAuto(source).value
              : null
          }
        />
        <div hidden>
          <slot onSlotchange={this.handleDefaultSlotChange} />
        </div>
      </pre>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private handleDefaultSlotChange = (event: Event) => {
    this.source = slotChangeGetAssignedElements(event)[0]?.textContent;
  };
}
