import { LitElement, h, JsxNode, state } from "@arcgis/lumina";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./form.scss";

declare global {
  interface DeclareElements {
    "calcite-form": Form;
  }
}

/**
 * @slot - A slot for adding one or more `calcite-field-set` components.
 * @slot notice - A slot for adding a form `calcite-notice` component.
 * @slot buttons - A slot for adding form `calcite-button` components.
 */
export class Form extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region State Properties

  @state() private hasButtons = false;

  @state() private hasNotice = false;

  //#endregion

  //#region Private Methods

  private handleButtonsSlotChange(event: Event): void {
    this.hasButtons = slotChangeHasAssignedElement(event);
  }

  private handleNoticeSlotChange(event: Event): void {
    this.hasNotice = slotChangeHasAssignedElement(event);
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const hasFooterContent = this.hasNotice || this.hasButtons;

    return (
      <div class={CSS.container}>
        <slot />
        <div class={CSS.divider} hidden={!hasFooterContent} />
        <div class={CSS.noticeContainer} hidden={!this.hasNotice}>
          <slot name="notice" onSlotChange={this.handleNoticeSlotChange} />
        </div>
        <div class={CSS.buttonContainer} hidden={!this.hasButtons}>
          <slot name="buttons" onSlotChange={this.handleButtonsSlotChange} />
        </div>
      </div>
    );
  }

  //#endregion
}
