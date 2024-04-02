import { Component, h, VNode, Prop } from "@stencil/core";
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

  @Prop() language: string;

  @Prop() source: string;

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
      </pre>
    );
  }
}
