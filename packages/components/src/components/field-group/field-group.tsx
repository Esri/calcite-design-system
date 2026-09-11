import type { PropertyValues } from "lit";
import { LitElement, h, JsxNode, property } from "@arcgis/lumina";
import type { Scale } from "../types";
import { getSlotAssignedElements } from "../../utils/dom";
import { CSS } from "./resources";
import { styles } from "./field-group.scss";

type Layout = "columns" | "horizontal" | "vertical";
type Columns = 1 | 2 | 3 | 4 | 5 | 6;

const originalDisabledState = Symbol("calciteFieldGroupOriginalDisabledState");

type FieldSetElement = HTMLElement & {
  scale?: Scale;
  disabled?: boolean;
  [originalDisabledState]?: boolean;
};

declare global {
  interface DeclareElements {
    "calcite-field-group": FieldGroup;
  }
}

/**
 * @slot - A slot for adding one or more `calcite-field-set` components or controls.
 */
export class FieldGroup extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private get fieldSets(): FieldSetElement[] {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>("slot");

    return slot
      ? getSlotAssignedElements<HTMLElement>(slot).flatMap((element) => {
          if (element.matches("calcite-field-set")) {
            return [element];
          }

          return Array.from(element.querySelectorAll<HTMLElement>("calcite-field-set"));
        })
      : [];
  }

  private get nestedFieldGroups(): Array<HTMLElement & { scale?: Scale }> {
    return Array.from(this.el.querySelectorAll<HTMLElement>("calcite-field-group")).filter(
      (element) => element !== this.el,
    );
  }

  //#endregion

  //#region Public Properties

  /** When `true`, disables slotted field sets. */
  @property({ reflect: true }) disabled = false;

  /** When `layout` is `"columns"`, specifies the number of columns. */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** Specifies the component layout. */
  @property({ reflect: true }) layout: Layout = "vertical";

  /** Specifies the scale of slotted field sets. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Lifecycle

  override updated(changes: PropertyValues<this>): void {
    this.syncFieldSetsScale();

    if (changes.has("disabled")) {
      this.syncFieldSetsDisabled();
    }
  }

  //#endregion

  //#region Private Methods

  private handleSlotChange(): void {
    this.syncFieldSetsScale();
    this.syncFieldSetsDisabled();
  }

  private syncFieldSetsScale(): void {
    this.nestedFieldGroups.forEach((fieldGroup) => {
      fieldGroup.scale = this.scale;
    });

    this.fieldSets.forEach((fieldSet) => {
      fieldSet.scale = this.scale;
    });
  }

  private syncFieldSetsDisabled(): void {
    this.fieldSets.forEach((fieldSet) => {
      if (this.disabled) {
        if (fieldSet[originalDisabledState] === undefined) {
          fieldSet[originalDisabledState] = fieldSet.disabled;
        }

        fieldSet.disabled = true;
        return;
      }

      if (fieldSet[originalDisabledState] === undefined) {
        return;
      }

      fieldSet.disabled = fieldSet[originalDisabledState];
      delete fieldSet[originalDisabledState];
    });
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerColumns]: this.layout === "columns",
          [CSS.containerHorizontal]: this.layout === "horizontal",
          [CSS.containerVertical]: this.layout === "vertical",
        }}
        style={{ "--calcite-internal-field-group-columns": this.columns }}
      >
        <slot onSlotChange={this.handleSlotChange} />
      </div>
    );
  }

  //#endregion
}
