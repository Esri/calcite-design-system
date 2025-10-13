import { LitElement, h, property, type JsxNode } from "@arcgis/lumina";
import { styles } from "./text.scss";

declare global {
  interface DeclareElements {
    // Declare a custom element with a given tag name
    "calcite-text": Text;
  }
}

export class Text extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Public Properties

  @property() ellipsis: boolean;

  @property() nowrap: boolean;

  @property({ reflect: true }) maxLines: number;

  //#endregion

  //#region Lifecycle

  async loaded(): Promise<void> {
    this.el.style.setProperty("--calcite-internal-text-max-lines", this.maxLines.toString());
  }

  //#endregion

  //#region Rendering

  //   override createRenderRoot(): DocumentFragment | HTMLElement {
  //     return this.el;
  //   }
  override render(): JsxNode {
    return <slot />;
  }

  //#endregion
}
