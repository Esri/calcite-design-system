import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { focusElementInGroup } from "../../utils/dom";
import { Scale, SelectionMode } from "../types";
import type { Card } from "../card/card";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { styles } from "./card-group.scss";
import { CSS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-card-group": CardGroup;
  }
}

/** @slot - A slot for adding one or more `calcite-card`s. */
export class CardGroup extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private items: Card["el"][] = [];

  private slotRef = createRef<HTMLSlotElement>();

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * @copyDoc
   * @required
   */
  @property() label!: string;

  /** Specifies the size of the component. Child `calcite-card`s inherit the component's value. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: Card["el"][] = [];

  /** Specifies the selection mode of the component. */
  @property({ reflect: true }) selectionMode: Extract<
    "multiple" | "single" | "single-persist" | "none",
    SelectionMode
  > = "none";

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.items[0], options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's selection changes and the `selectionMode` is not `none`. */
  calciteCardGroupSelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
    this.listen("calciteCardSelect", this.calciteCardSelectListener);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selectionMode") && this.hasUpdated) {
      this.updateItemsOnSelectionModeChange();
    }

    if (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) {
      this.updateItemsScale();
    }
  }

  loaded(): void {
    this.updateSelectedItems();
  }

  //#endregion

  //#region Private Methods

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.defaultPrevented || this.disabled || !event.composedPath().includes(this.el)) {
      return;
    }

    const card = this.items.find((item) => item === event.target);

    if (!card || card.disabled || card.selectable) {
      return;
    }

    const interactiveItems = this.items.filter((el) => !el.disabled);
    switch (event.key) {
      case "ArrowRight":
        focusElementInGroup(interactiveItems, card, "next", true, false);
        event.preventDefault();
        break;
      case "ArrowLeft":
        focusElementInGroup(interactiveItems, card, "previous", true, false);
        event.preventDefault();
        break;
      case "Home":
        focusElementInGroup(interactiveItems, card, "first", true, false);
        event.preventDefault();
        break;
      case "End":
        focusElementInGroup(interactiveItems, card, "last", true, false);
        event.preventDefault();
        break;
    }
  }

  private calciteCardSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el) && !(event.target as Card["el"]).selectable) {
      this.setSelectedItems(true, event.target as Card["el"]);
    }
  }

  private updateItemsOnSelectionModeChange(): void {
    this.updateSlottedItems(this.slotRef.value);
    this.updateSelectedItems();
  }

  private updateItemsOnSlotChange(event: Event): void {
    this.updateSlottedItems(event.target as HTMLSlotElement);
    this.updateSelectedItems();
    this.updateItemsScale();
  }

  private updateSlottedItems(target?: HTMLSlotElement): void {
    this.items =
      target
        ?.assignedElements({ flatten: true })
        .filter((el): el is Card["el"] => el?.matches("calcite-card")) || [];
  }

  private updateItemsScale(): void {
    this.items.forEach((el) => {
      el.scale = this.scale;
    });
  }

  private updateSelectedItems(): void {
    this.items.forEach((el) => {
      el.selectionMode = this.selectionMode;
    });

    this.setSelectedItems(false);
  }

  private setSelectedItems(emit: boolean, elToMatch?: Card["el"]): void {
    if (elToMatch) {
      this.items.forEach((el) => {
        const matchingEl = elToMatch === el;
        switch (this.selectionMode) {
          case "multiple":
            if (matchingEl) {
              el.selected = !el.selected;
            }
            break;

          case "single":
            el.selected = matchingEl ? !el.selected : false;
            break;

          case "single-persist":
            el.selected = !!matchingEl;
            break;
        }
      });
    }

    this.selectedItems = this.items.filter((el) => el.selected);

    if (emit && this.selectionMode !== "none" && !this.disabled) {
      this.calciteCardGroupSelect.emit();
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const role =
      this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div ariaLabel={this.label} class={CSS.container} role={role}>
          <slot onSlotChange={this.updateItemsOnSlotChange} ref={this.slotRef} />
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
