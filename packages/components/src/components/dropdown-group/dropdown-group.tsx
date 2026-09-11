import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import { Scale, SelectionMode } from "../types";
import { createObserver } from "../../utils/observers";
import { CSS as ItemCSS } from "../dropdown-item/resources";
import type { DropdownItem } from "../dropdown-item/dropdown-item";
import { CSS } from "./resources";
import { RequestedItem } from "./types";
import { styles } from "./dropdown-group.scss";

declare global {
  interface DeclareElements {
    "calcite-dropdown-group": DropdownGroup;
  }
}

/**
 * @parent calcite-dropdown
 * @slot - A slot for adding `calcite-dropdown-item`s.
 */
export class DropdownGroup extends LitElement {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  /** the requested group */
  private requestedDropdownGroup?: DropdownGroup["el"];

  /** the requested item */
  private requestedDropdownItem?: DropdownItem["el"];

  private items: DropdownItem["el"][] = [];

  private describedItems = new Set<DropdownItem["el"]>();

  private currentItems = new Set<DropdownItem["el"]>();

  // #endregion

  // #region Public Properties

  /** When specified, displays a group title. */
  @property({ reflect: true }) groupTitle?: string;

  /**
   * The position of the group in the dropdown menu.
   *
   * @internal
   */
  @property() position: number = -1;

  /**
   * Specifies the size of the component inherited from the parent `calcite-dropdown`, defaults to `m`.
   *
   * @private
   */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the selection mode of the component.
   *
   * - `"multiple"` allows any number of selections.
   * - `"single"` allows only one selection.
   * - `"none"` does not allow any selections.
   */
  @property({ reflect: true }) selectionMode: Extract<
    "none" | "single" | "multiple",
    SelectionMode
  > = "single";

  // #endregion

  // #region Events

  /** @private */
  calciteInternalDropdownItemChange = createEvent<RequestedItem>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalDropdownItemSelect", this.updateActiveItemOnChange);
  }

  override connectedCallback(): void {
    this.updateItems();
    this.mutationObserver?.observe(this.el, { childList: true });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "single")) {
      this.updateItems();
    }
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("groupTitle")) {
      this.syncItemGroupDescriptions(this.getItems());
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();

    this.describedItems.forEach((item) => {
      item.ariaDescribedByElements =
        item.ariaDescribedByElements?.filter((el) => el !== this.el) ?? null;
    });

    this.describedItems.clear();
    this.currentItems.clear();
    this.items = [];
  }

  // #endregion

  // #region Private Methods
  private updateActiveItemOnChange(event: CustomEvent): void {
    this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
    this.requestedDropdownItem = event.detail.requestedDropdownItem;
    this.calciteInternalDropdownItemChange.emit({
      requestedDropdownGroup: this.requestedDropdownGroup!,
      requestedDropdownItem: this.requestedDropdownItem!,
    });
  }

  private updateItems(): void {
    const items = this.getItems();

    this.items = items;

    items.forEach((item) => {
      item.selectionMode = this.selectionMode;
    });

    this.syncItemGroupDescriptions(items);
  }

  private getItems(): DropdownItem["el"][] {
    return Array.from(this.el.querySelectorAll("calcite-dropdown-item"));
  }

  private syncItemGroupDescriptions(items: DropdownItem["el"][] = this.items): void {
    const descriptionEl = this.groupTitle ? this.el : null;

    const currentItems = this.currentItems;
    currentItems.clear();
    items.forEach((item) => currentItems.add(item));

    const staleItems: DropdownItem["el"][] = [];

    this.describedItems.forEach((item) => {
      if (!currentItems.has(item)) {
        item.ariaDescribedByElements =
          item.ariaDescribedByElements?.filter((el) => el !== this.el) ?? null;
        staleItems.push(item);
      }
    });

    staleItems.forEach((item) => this.describedItems.delete(item));

    currentItems.forEach((item) => {
      const currentDescriptions =
        item.ariaDescribedByElements?.filter((el) => el !== this.el) ?? [];

      item.ariaDescribedByElements = descriptionEl
        ? [...currentDescriptions, descriptionEl]
        : currentDescriptions;

      this.describedItems.add(item);
    });

    this.items = items;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const groupTitle = this.groupTitle ? (
      <span ariaHidden="true" class={{ [CSS.title]: true, [CSS.firstTitle]: this.position === 0 }}>
        {this.groupTitle}
      </span>
    ) : null;

    const dropdownSeparator =
      this.position > 0 ? <div class={CSS.separator} role="separator" /> : null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = this.groupTitle ?? null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "group";

    return (
      <div
        class={{
          [ItemCSS.container]: true,
        }}
      >
        {dropdownSeparator}
        {groupTitle}
        <slot />
      </div>
    );
  }

  // #endregion
}
