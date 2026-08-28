import { LitElement, property, h, JsxNode, setAttribute } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { CSS, IDS } from "./resources";
import { styles } from "./carousel-item.scss";

declare global {
  interface DeclareElements {
    "calcite-carousel-item": CarouselItem;
  }
}

interface CarouselItemSlots {
  /**
   * A slot for adding content.
   */
  "": Node[];
}

export class CarouselItem extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  override ["@slots"]!: CarouselItemSlots;

  private guid = IDS.host(guid());

  //#endregion

  //#region Public Properties

  /**
   * @copyDoc
   * @required
   */
  @property() label!: string;

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const id = this.el.id || this.guid;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", id);
    return (
      <div
        ariaLabel={this.label}
        class={{ [CSS.container]: true, [CSS.selected]: this.selected }}
        role="tabpanel"
      >
        <slot />
      </div>
    );
  }

  //#endregion
}
