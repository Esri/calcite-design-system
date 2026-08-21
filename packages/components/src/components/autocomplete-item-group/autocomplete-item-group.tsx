import { LitElement, property, h, createEvent, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { getSlotAssignedElements } from "../../utils/dom";
import type { Scale } from "../types";
import type { AutocompleteItem } from "../autocomplete-item/autocomplete-item";
import { CSS } from "./resources";
import { styles } from "./autocomplete-item-group.scss";

const itemSelector = "calcite-autocomplete-item";

declare global {
  interface DeclareElements {
    "calcite-autocomplete-item-group": AutocompleteItemGroup;
  }
}

/**
 * @parent calcite-autocomplete
 * @slot - A slot for adding `calcite-autocomplete-item`s.
 */
export class AutocompleteItemGroup extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private defaultSlotRef = createRef<HTMLSlotElement>();

  private _items: AutocompleteItem["el"][] = [];

  //#endregion

  //#region Public Properties

  /**
   * When `true`, signifies that the group should not have extra spacing. Used for styling.
   *
   * @private
   */
  @property() disableSpacing = false;

  /**
   * @copyDoc
   * @required
   */
  @property() heading!: string;

  /** @copyDoc */
  @property() label: any;

  /**
   * Specifies the position of the group in the autocomplete menu.
   *
   * @internal
   */
  @property() position: number = 0;

  /**
   * Specifies the size of the component inherited from the `calcite-autocomplete`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /**
   * Specifies the `calcite-autocomplete-item`s in the group.
   *
   * @internal
   */
  @property() get items(): AutocompleteItem["el"][] {
    return this._items;
  }

  //#endregion

  //#region Events

  /**
   * Fires after the component's slotted `calcite-autocomplete-item`s change.
   *
   * @private
   */
  calciteInternalAutocompleteItemGroupItemsChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  loaded(): void {
    this.updateItems();
  }

  //#endregion

  //#region Private Methods

  private handleDefaultSlotChange(): void {
    this.updateItems();
  }

  private updateItems(): void {
    const items = this.defaultSlotRef.value
      ? getSlotAssignedElements<AutocompleteItem["el"]>(this.defaultSlotRef.value, itemSelector)
      : Array.from(this.el.children).filter((child): child is AutocompleteItem["el"] =>
          child.matches(itemSelector),
        );

    this._items = items;
    this.calciteInternalAutocompleteItemGroupItemsChange.emit();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { scale } = this;
    const autocompleteSeparator =
      this.position > 0 ? <div class={CSS.separator} role="separator" /> : null;
    return (
      <div
        aria-label={this.label ?? this.heading}
        class={{
          [CSS.container]: true,
          [CSS.containerNoSpacing]: this.disableSpacing,
          [CSS.scale(scale)]: true,
        }}
        role="group"
      >
        {autocompleteSeparator}
        <div class={{ [CSS.heading]: true, [CSS.firstTitle]: this.position === 0 }}>
          {this.heading}
        </div>
        <slot onSlotChange={this.handleDefaultSlotChange} ref={this.defaultSlotRef} />
      </div>
    );
  }

  //#endregion
}
