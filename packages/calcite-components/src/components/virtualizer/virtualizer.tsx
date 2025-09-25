import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { html } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { virtualize } from "@lit-labs/virtualizer/virtualize.js";
import { slotChangeGetAssignedElements } from "@arcgis/toolkit/dom";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { styles } from "./virtualizer.scss";

declare global {
  interface DeclareElements {
    "calcite-virtualizer": Virtualizer;
  }
}

/**
 * @slot - A slot for adding content.
 */
export class Virtualizer extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region State Properties

  @state() hasSlottedContent = false;

  @state() slotElements: Element[] = [];

  //#endregion

  //#region Public Properties

  /** When present, content interaction is prevented and displayed with lower opacity. */
  @property({ reflect: true }) scroller = false;

  //#endregion

  //#region Private Methods

  private handleDefaultSlotChange(event: Event): void {
    this.hasSlottedContent = slotChangeHasAssignedElement(event);
    this.slotElements = slotChangeGetAssignedElements(event);
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <div>
        <slot hidden onSlotChange={this.handleDefaultSlotChange} />
        {virtualize({
          scroller: this.scroller,
          items: this.slotElements,
          renderItem: (item) => html`${unsafeHTML(item.outerHTML)}`,
        })}
      </div>
    );
  }

  //#endregion
}
