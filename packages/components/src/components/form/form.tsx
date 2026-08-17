import { LitElement, h, JsxNode, property, state } from "@arcgis/lumina";
import type { Scale } from "../types";
import { getSlotAssignedElements } from "../../utils/dom";
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
 */
export class Form extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private syncHasNotice = (): void => {
    this.hasNotice = this.notices.some((notice) => notice.hasAttribute("open"));
  };

  private get fieldSets(): Array<HTMLElement & { scale?: Scale }> {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>("slot:not([name])");

    return slot
      ? getSlotAssignedElements<HTMLElement>(slot).flatMap((element) => {
          if (element.matches("calcite-field-set")) {
            return [element];
          }

          return Array.from(element.querySelectorAll<HTMLElement>("calcite-field-set"));
        })
      : [];
  }

  private get notices(): Array<HTMLElement & { scale?: Scale }> {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="notice"]');

    return slot ? getSlotAssignedElements<HTMLElement>(slot) : [];
  }

  //#endregion

  //#region State Properties

  @state() private hasNotice = false;

  //#endregion

  //#region Public Properties

  /** Specifies the scale of slotted field sets. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    super.connectedCallback();
    this.el.addEventListener("calciteNoticeBeforeOpen", this.syncHasNotice);
    this.el.addEventListener("calciteNoticeClose", this.syncHasNotice);
  }

  override updated(): void {
    this.syncFieldSetsScale();
  }

  override disconnectedCallback(): void {
    this.el.removeEventListener("calciteNoticeBeforeOpen", this.syncHasNotice);
    this.el.removeEventListener("calciteNoticeClose", this.syncHasNotice);
    super.disconnectedCallback();
  }

  //#endregion

  //#region Private Methods

  private handleNoticeSlotChange(): void {
    this.syncHasNotice();
  }

  private handleDefaultSlotChange(): void {
    this.syncFieldSetsScale();
  }

  private syncFieldSetsScale(): void {
    this.fieldSets.forEach((fieldSet) => {
      fieldSet.scale = this.scale;
    });
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        <slot onSlotChange={this.handleDefaultSlotChange} />
        <div class={CSS.divider} hidden={!this.hasNotice} />
        <div class={CSS.noticeContainer} hidden={!this.hasNotice}>
          <slot name="notice" onSlotChange={this.handleNoticeSlotChange} />
        </div>
      </div>
    );
  }

  //#endregion
}
