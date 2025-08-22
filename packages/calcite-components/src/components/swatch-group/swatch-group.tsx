import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Scale, SelectionMode } from "../interfaces";
import { useSetFocus } from "../../controllers/useSetFocus";
import type { Swatch } from "../swatch/swatch";
import { CSS } from "./resources";
import { styles } from "./swatch-group.scss";

declare global {
  interface DeclareElements {
    "calcite-swatch-group": SwatchGroup;
  }
}
/** @slot - A slot for adding one or more `calcite-swatch`s. */
export class SwatchGroup extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private items: Swatch["el"][] = [];

  private slotRef = createRef<HTMLSlotElement>();

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** Specifies the size of the component. Child `calcite-swatch`s inherit the component's value. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: Swatch["el"][] = [];

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"multiple"` allows any number of selections,
   *
   * `"single"` allows only one selection,
   *
   * `"single-persist"` allows one selection and prevents de-selection, and
   *
   * `"none"` does not allow any selections.
   */
  @property({ reflect: true }) selectionMode: Extract<
    "multiple" | "single" | "single-persist" | "none",
    SelectionMode
  > = "none";

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  // #endregion

  // #region Events

  /** Fires when the component's selection changes. */
  calciteSwatchGroupSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalSwatchKeyEvent", this.calciteInternalSwatchKeyEventListener);
    this.listen("calciteSwatchSelect", this.calciteSwatchSelectListener);
    this.listen("calciteInternalSwatchSelect", this.calciteInternalSwatchSelectListener);
    this.listen("calciteInternalSyncSelectedSwatches", this.calciteInternalSyncSelectedSwatches);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none")) {
      this.updateItems();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods
  private calciteInternalSwatchKeyEventListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      const interactiveItems = this.items?.filter((el) => !el.disabled);
      switch (event.detail.key) {
        case "ArrowRight":
          focusElementInGroup(interactiveItems, event.detail.target, "next");
          break;
        case "ArrowLeft":
          focusElementInGroup(interactiveItems, event.detail.target, "previous");
          break;
        case "Home":
          focusElementInGroup(interactiveItems, event.detail.target, "first");
          break;
        case "End":
          focusElementInGroup(interactiveItems, event.detail.target, "last");
          break;
      }
    }
    event.stopPropagation();
  }

  private calciteSwatchSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(true, event.target as Swatch["el"]);
    }
    event.stopPropagation();
  }

  private calciteInternalSwatchSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(false, event.target as Swatch["el"]);
    }
    event.stopPropagation();
  }

  private calciteInternalSyncSelectedSwatches(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.updateSelectedItems();
      if (this.selectionMode === "single" && this.selectedItems.length > 1) {
        this.setSelectedItems(false, event.target as Swatch["el"]);
      }
    }
    event.stopPropagation();
  }

  private updateItems(event?: Event): void {
    const itemsFromSlot = this.slotRef.value
      ?.assignedElements({ flatten: true })
      .filter((el): el is Swatch["el"] => el?.matches("calcite-swatch"));

    this.items = !event ? itemsFromSlot : slotChangeGetAssignedElements<Swatch["el"]>(event);

    if (this.items?.length < 1) {
      return;
    }

    this.items?.forEach((el) => {
      el.interactive = true;
      el.scale = this.scale;
      el.selectionMode = this.selectionMode;
      el.parentSwatchGroup = this.el;
    });

    this.setSelectedItems(false);
  }

  private updateSelectedItems(): void {
    this.selectedItems = this.items?.filter((el) => el.selected);
  }

  private setSelectedItems(emit: boolean, elToMatch?: Swatch["el"]): void {
    if (elToMatch) {
      this.items?.forEach((el) => {
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

    this.updateSelectedItems();

    if (emit) {
      this.calciteSwatchGroupSelect.emit();
    }
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const role =
      this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    const { disabled } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        <div ariaLabel={this.label} class={CSS.container} role={role}>
          <slot onSlotChange={this.updateItems} ref={this.slotRef} />
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
