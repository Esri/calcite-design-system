import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property, state } from "@arcgis/lumina";
import type { Scale } from "../interfaces";
import { getSlotAssignedElements, slotChangeHasAssignedElement } from "../../utils/dom";
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

  //#region Private Properties

  private buttonDisabledState = new WeakMap<HTMLElement & { disabled?: boolean }, boolean>();

  private fieldSetDisabledState = new WeakMap<HTMLElement & { disabled?: boolean }, boolean>();

  private fieldSetReadOnlyState = new WeakMap<HTMLElement & { readOnly?: boolean }, boolean>();

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

  private get buttons(): Array<HTMLElement & { disabled?: boolean; scale?: Scale }> {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="buttons"]');

    return slot ? getSlotAssignedElements<HTMLElement>(slot) : [];
  }

  //#endregion

  //#region State Properties

  @state() private hasButtons = false;

  @state() private hasNotice = false;

  //#endregion

  //#region Public Properties

  /** When `true`, disables slotted field sets and buttons. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, sets slotted field sets to read-only. */
  @property({ reflect: true }) readOnly = false;

  /** Specifies the scale of slotted field sets, notices, and buttons. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Lifecycle

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("disabled")) {
      this.syncFieldSetsDisabledState(changes.get("disabled"));
      this.syncButtonsDisabledState(changes.get("disabled"));
    }

    if (changes.has("readOnly")) {
      this.syncFieldSetsReadOnlyState(changes.get("readOnly"));
    }

    this.syncFieldSetsScale();
    this.syncNoticesScale();
    this.syncButtonsScale();
  }

  //#endregion

  //#region Private Methods

  private handleButtonsSlotChange(event: Event): void {
    this.hasButtons = slotChangeHasAssignedElement(event);
    this.syncButtonsDisabledState();
    this.syncButtonsScale();
  }

  private handleNoticeSlotChange(event: Event): void {
    this.hasNotice = slotChangeHasAssignedElement(event);
    this.syncNoticesScale();
  }

  private handleDefaultSlotChange(): void {
    this.syncFieldSetsDisabledState();
    this.syncFieldSetsReadOnlyState();
    this.syncFieldSetsScale();
  }

  private getButtonDisabledState(button: HTMLElement & { disabled?: boolean }): boolean {
    return button.hasAttribute("disabled") || !!button.disabled;
  }

  private getFieldSetDisabledState(fieldSet: HTMLElement & { disabled?: boolean }): boolean {
    return fieldSet.hasAttribute("disabled") || !!fieldSet.disabled;
  }

  private getFieldSetReadOnlyState(fieldSet: HTMLElement & { readOnly?: boolean }): boolean {
    return fieldSet.hasAttribute("read-only") || !!fieldSet.readOnly;
  }

  private syncButtonsDisabledState(previousDisabled = this.disabled): void {
    const wasDisabled = previousDisabled;

    this.buttons.forEach((button) => {
      if (this.disabled) {
        if (!wasDisabled || !this.buttonDisabledState.has(button)) {
          this.buttonDisabledState.set(button, this.getButtonDisabledState(button));
        }

        button.toggleAttribute("disabled", true);
        button.disabled = true;
        return;
      }

      if (!wasDisabled) {
        this.buttonDisabledState.set(button, this.getButtonDisabledState(button));
        return;
      }

      const buttonDisabled = this.buttonDisabledState.get(button);
      const nextDisabled = buttonDisabled ?? this.getButtonDisabledState(button);

      button.toggleAttribute("disabled", nextDisabled);
      button.disabled = nextDisabled;
      this.buttonDisabledState.set(button, nextDisabled);
    });
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

  private syncButtonsScale(): void {
    this.buttons.forEach((button) => {
      button.scale = this.scale;
    });
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const hasFooterContent = this.hasNotice || this.hasButtons;

    return (
      <div class={CSS.container}>
        <slot onSlotChange={this.handleDefaultSlotChange} />
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
