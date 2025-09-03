// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { focusElementInGroup } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { SelectionMode } from "../interfaces";
import type { Card } from "../card/card";
import { useSetFocus } from "../../controllers/useSetFocus";
import { styles } from "./card-group.scss";
import { CSS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-card-group": CardGroup;
  }
}

/** @slot - A slot for adding one or more `calcite-card`s. */
export class CardGroup extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private items: Card["el"][] = [];

  private slotRefEl = createRef<HTMLSlotElement>();

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** When present, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

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

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.items[0];
    }, options);
  }

  // #endregion

  // #region Events

  /** Emits when the component's selection changes and the `selectionMode` is not `none`. */
  calciteCardGroupSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalCardKeyEvent", this.calciteInternalCardKeyEventListener);
    this.listen("calciteCardSelect", this.calciteCardSelectListener);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selectionMode") && this.hasUpdated) {
      this.updateItemsOnSelectionModeChange();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.updateSelectedItems();
  }

  // #endregion

  // #region Private Methods

  private calciteInternalCardKeyEventListener(event: KeyboardEvent): void {
    if (event.composedPath().includes(this.el)) {
      const interactiveItems = this.items.filter((el) => !el.disabled);
      switch (event.detail["key"]) {
        case "ArrowRight":
          focusElementInGroup(interactiveItems, event.target as Card["el"], "next", true, false);
          break;
        case "ArrowLeft":
          focusElementInGroup(
            interactiveItems,
            event.target as Card["el"],
            "previous",
            true,
            false,
          );
          break;
        case "Home":
          focusElementInGroup(interactiveItems, event.target as Card["el"], "first", true, false);
          break;
        case "End":
          focusElementInGroup(interactiveItems, event.target as Card["el"], "last", true, false);
          break;
      }
    }
  }

  private calciteCardSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el) && !(event.target as Card["el"]).selectable) {
      this.setSelectedItems(true, event.target as Card["el"]);
    }
  }

  private updateItemsOnSelectionModeChange(): void {
    this.updateSlottedItems(this.slotRefEl.value);
    this.updateSelectedItems();
  }

  private updateItemsOnSlotChange(event: Event): void {
    this.updateSlottedItems(event.target as HTMLSlotElement);
    this.updateSelectedItems();
  }

  private updateSlottedItems(target: HTMLSlotElement): void {
    this.items = target
      .assignedElements({ flatten: true })
      .filter((el): el is Card["el"] => el?.matches("calcite-card"));
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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const role =
      this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div ariaLabel={this.label} class={CSS.container} role={role}>
          <slot onSlotChange={this.updateItemsOnSlotChange} ref={this.slotRefEl} />
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
