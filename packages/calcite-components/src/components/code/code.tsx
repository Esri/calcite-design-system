import hljs from "highlight.js";
import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { styles } from "./code.scss";

declare global {
  interface DeclareElements {
    "calcite-code": Code;
  }
}

export class Code extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region State Properties

  @state() source: string;

  // #endregion

  // #region Public Properties

  @property() language: string;

  // #endregion

  // #region Private Methods

  private handleDefaultSlotChange(event: Event) {
    this.source = slotChangeGetAssignedElements(event)[0]?.textContent;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
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
          <slot onSlotChange={this.handleDefaultSlotChange} />
        </div>
      </pre>
    );
  }

  // #endregion
}
