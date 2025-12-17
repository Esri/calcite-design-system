import { LitElement, h, property, type JsxNode } from "@arcgis/lumina";
import { slotChangeGetTextContent } from "../../utils/dom";
import { styles } from "./typography.scss";

declare global {
  interface DeclareElements {
    // Declare a custom element with a given tag name
    "calcite-typography": Typography;
  }
}

export class Typography extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private handleDefaultSlot = (event: Event): void => {
    const text = slotChangeGetTextContent(event);
    console.log(text);
  };

  //#endregion

  //#region Public Properties

  @property() ellipsis: boolean;

  @property() nowrap: boolean;

  @property({ reflect: true }) maxLines: number;

  @property({ reflect: true }) truncatePosition: "start" | "middle" | "end" = "end";

  //#endregion

  //#region Lifecycle

  async loaded(): Promise<void> {
    this.el.style.setProperty("--calcite-internal-text-max-lines", this.maxLines?.toString());
  }

  //#endregion

  //#region Rendering

  //   override createRenderRoot(): DocumentFragment | HTMLElement {
  //     return this.el;
  //   }
  override render(): JsxNode {
    return <slot onSlotChange={this.handleDefaultSlot} />;
  }

  //#endregion
}
