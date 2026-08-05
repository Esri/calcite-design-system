import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property, state } from "@arcgis/lumina";
import type { Scale } from "../interfaces";
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

  private fieldSetDisabledState = new WeakMap<HTMLElement & { disabled?: boolean }, boolean>();

  private fieldSetReadOnlyState = new WeakMap<HTMLElement & { readOnly?: boolean }, boolean>();

  private syncHasNotice = (): void => {
    this.hasNotice = this.notices.some((notice) => notice.hasAttribute("open"));
  };

  private get fieldSets(): Array<
    HTMLElement & { disabled?: boolean; readOnly?: boolean; scale?: Scale }
  > {
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

  /** When `true`, disables slotted field sets. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, sets slotted field sets to read-only. */
  @property({ reflect: true }) readOnly = false;

  /** Specifies the scale of slotted field sets and notices. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    super.connectedCallback();
    this.el.addEventListener("calciteNoticeBeforeOpen", this.syncHasNotice);
    this.el.addEventListener("calciteNoticeClose", this.syncHasNotice);
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("disabled")) {
      this.syncFieldSetsDisabledState(changes.get("disabled"));
    }

    if (changes.has("readOnly")) {
      this.syncFieldSetsReadOnlyState(changes.get("readOnly"));
    }

    this.syncFieldSetsScale();
    this.syncNoticesScale();
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
    this.syncNoticesScale();
  }

  private handleDefaultSlotChange(): void {
    this.syncFieldSetsDisabledState();
    this.syncFieldSetsReadOnlyState();
    this.syncFieldSetsScale();
  }

  private getFieldSetDisabledState(fieldSet: HTMLElement & { disabled?: boolean }): boolean {
    return fieldSet.hasAttribute("disabled") || !!fieldSet.disabled;
  }

  private getFieldSetReadOnlyState(fieldSet: HTMLElement & { readOnly?: boolean }): boolean {
    return fieldSet.hasAttribute("read-only") || !!fieldSet.readOnly;
  }

  private syncFieldSetsDisabledState(previousDisabled = this.disabled): void {
    const wasDisabled = previousDisabled;

    this.fieldSets.forEach((fieldSet) => {
      if (this.disabled) {
        if (!wasDisabled || !this.fieldSetDisabledState.has(fieldSet)) {
          this.fieldSetDisabledState.set(fieldSet, this.getFieldSetDisabledState(fieldSet));
        }

        fieldSet.toggleAttribute("disabled", true);
        fieldSet.disabled = true;
        return;
      }

      if (!wasDisabled) {
        this.fieldSetDisabledState.set(fieldSet, this.getFieldSetDisabledState(fieldSet));
        return;
      }

      const fieldSetDisabled = this.fieldSetDisabledState.get(fieldSet);
      const nextDisabled = fieldSetDisabled ?? this.getFieldSetDisabledState(fieldSet);

      fieldSet.toggleAttribute("disabled", nextDisabled);
      fieldSet.disabled = nextDisabled;
      this.fieldSetDisabledState.set(fieldSet, nextDisabled);
    });
  }

  private syncFieldSetsReadOnlyState(previousReadOnly = this.readOnly): void {
    const wasReadOnly = previousReadOnly;

    this.fieldSets.forEach((fieldSet) => {
      if (this.readOnly) {
        if (!wasReadOnly || !this.fieldSetReadOnlyState.has(fieldSet)) {
          this.fieldSetReadOnlyState.set(fieldSet, this.getFieldSetReadOnlyState(fieldSet));
        }

        fieldSet.toggleAttribute("read-only", true);
        fieldSet.readOnly = true;
        return;
      }

      if (!wasReadOnly) {
        this.fieldSetReadOnlyState.set(fieldSet, this.getFieldSetReadOnlyState(fieldSet));
        return;
      }

      const fieldSetReadOnly = this.fieldSetReadOnlyState.get(fieldSet);
      const nextReadOnly = fieldSetReadOnly ?? this.getFieldSetReadOnlyState(fieldSet);

      fieldSet.toggleAttribute("read-only", nextReadOnly);
      fieldSet.readOnly = nextReadOnly;
      this.fieldSetReadOnlyState.set(fieldSet, nextReadOnly);
    });
  }

  private syncFieldSetsScale(): void {
    this.fieldSets.forEach((fieldSet) => {
      fieldSet.scale = this.scale;
    });
  }

  private syncNoticesScale(): void {
    this.notices.forEach((notice) => {
      notice.scale = this.scale;
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
