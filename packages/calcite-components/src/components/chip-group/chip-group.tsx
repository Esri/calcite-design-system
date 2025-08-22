// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import {
  focusElementInGroup,
  FocusElementInGroupDestination,
  slotChangeGetAssignedElements,
} from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Scale, SelectionMode } from "../interfaces";
import type { Chip } from "../chip/chip";
import { useSetFocus } from "../../controllers/useSetFocus";
import { styles } from "./chip-group.scss";

declare global {
  interface DeclareElements {
    "calcite-chip-group": ChipGroup;
  }
}
/** @slot - A slot for adding one or more `calcite-chip`s. */
export class ChipGroup extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private items: Chip["el"][] = [];

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

  /** Specifies the size of the component. Child `calcite-chip`s inherit the component's value. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: Chip["el"][] = [];

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
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.selectedItems[0] || this.items[0];
    }, options);
  }

  // #endregion

  // #region Events

  /** Fires when the component's selection changes. */
  calciteChipGroupSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalChipKeyEvent", this.calciteInternalChipKeyEventListener);
    this.listen("calciteChipClose", this.calciteChipCloseListener);
    this.listen("calciteChipSelect", this.calciteChipSelectListener);
    this.listen("calciteInternalChipSelect", this.calciteInternalChipSelectListener);
    this.listen("calciteInternalSyncSelectedChips", this.calciteInternalSyncSelectedChips);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none")) {
      this.updateItems();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods

  private calciteInternalChipKeyEventListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      const destinationFromKey: Record<string, FocusElementInGroupDestination> = {
        ArrowRight: "next",
        ArrowLeft: "previous",
        Home: "first",
        End: "last",
      };
      const destination = destinationFromKey[event.detail.key];

      if (destination) {
        const interactiveItems = this.items?.filter((el) => !el.disabled);
        focusElementInGroup(interactiveItems, event.detail.target, destination, true, true, true);
      }
    }
    event.stopPropagation();
  }

  private calciteChipCloseListener(event: CustomEvent): void {
    const item = event.target as Chip["el"];
    if (this.items?.includes(item)) {
      if (this.items?.indexOf(item) > 0) {
        focusElementInGroup(this.items, item, "previous", false, false);
      } else if (this.items?.indexOf(item) === 0) {
        focusElementInGroup(this.items, item, "next", false, false);
      } else {
        focusElementInGroup(this.items, item, "first", false, false);
      }
    }
    this.items = this.items?.filter((el) => el !== item);
    event.stopPropagation();
  }

  private calciteChipSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(true, event.target as Chip["el"]);
    }
    event.stopPropagation();
  }

  private calciteInternalChipSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(false, event.target as Chip["el"]);
    }
    event.stopPropagation();
  }

  private calciteInternalSyncSelectedChips(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.updateSelectedItems();
      if (this.selectionMode === "single" && this.selectedItems.length > 1) {
        this.setSelectedItems(false, event.target as Chip["el"]);
      }
    }
    event.stopPropagation();
  }

  private updateItems(event?: Event): void {
    const itemsFromSlot = this.slotRef.value
      ?.assignedElements({ flatten: true })
      .filter((el): el is Chip["el"] => el?.matches("calcite-chip"));

    this.items = !event ? itemsFromSlot : slotChangeGetAssignedElements<Chip["el"]>(event);

    if (this.items?.length < 1) {
      return;
    }

    this.items?.forEach((el) => {
      el.interactive = true;
      el.scale = this.scale;
      el.selectionMode = this.selectionMode;
      el.parentChipGroup = this.el;
    });

    this.setSelectedItems(false);
  }

  private updateSelectedItems(): void {
    this.selectedItems = this.items?.filter((el) => el.selected);
  }

  private setSelectedItems(emit: boolean, elToMatch?: Chip["el"]): void {
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
      this.calciteChipGroupSelect.emit();
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
        <div ariaLabel={this.label} class="container" role={role}>
          <slot onSlotChange={this.updateItems} ref={this.slotRef} />
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
