import {
  Component,
  h,
  VNode,
  Prop,
  Element,
  Listen,
  EventEmitter,
  Event,
  Method,
  Watch,
} from "@stencil/core";
import { focusElementInGroup, slotChangeGetAssignedElements, toAriaBoolean } from "../../utils/dom";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Scale, SelectionMode } from "../interfaces";
import {
  componentFocusable,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
/**
 * @slot - A slot for adding one or more `calcite-chip`s.
 */
@Component({
  tag: "calcite-chip-group",
  styleUrl: "chip-group.scss",
  shadow: true,
})
export class ChipGroup implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible name for the component. */
  @Prop() label!: string;

  /** Specifies the size of the component. Child `calcite-chip`s inherit the component's value. */
  @Prop({ reflect: true }) scale: Scale = "m";

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
  @Prop({ reflect: true }) selectionMode: Extract<
    "multiple" | "single" | "single-persist" | "none",
    SelectionMode
  > = "none";

  @Watch("selectionMode")
  onSelectionModeChange(): void {
    this.updateItems();
  }

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteChipElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteChipGroupElement;

  private items: HTMLCalciteChipElement[] = [];

  private slotRefEl: HTMLSlotElement;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the component's selection changes. */
  @Event({ cancelable: false }) calciteChipGroupSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
  }

  componentDidRender(): void {
    disconnectInteractive(this);
    updateHostInteraction(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown")
  keyDownEventListener(event: KeyboardEvent): void {
    if (event.composedPath().includes(this.el)) {
      const interactiveItems = this.items?.filter((el) => !el.disabled);

      const key = event.key;
      const toDirection =
        key === "ArrowRight"
          ? "next"
          : key === "ArrowLeft"
            ? "previous"
            : key === "Home"
              ? "first"
              : key === "End"
                ? "last"
                : null;

      if (!toDirection) {
        return;
      }

      event.preventDefault();
      focusElementInGroup(interactiveItems, event.target as HTMLCalciteCardElement, toDirection);
    }
  }

  @Listen("calciteChipClose")
  calciteChipCloseListener(event: CustomEvent): void {
    const item = event.target as HTMLCalciteChipElement;
    if (this.items?.includes(item)) {
      if (this.items?.indexOf(item) > 0) {
        focusElementInGroup(this.items, item as HTMLCalciteChipElement, "previous");
      } else if (this.items?.indexOf(item) === 0) {
        focusElementInGroup(this.items, item as HTMLCalciteChipElement, "next");
      } else {
        focusElementInGroup(this.items, item as HTMLCalciteChipElement, "first");
      }
    }
    this.items = this.items?.filter((el) => el !== item);
    event.stopPropagation();
  }

  @Listen("calciteChipSelect")
  calciteChipSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(true, event.target as HTMLCalciteChipElement);
    }
    event.stopPropagation();
  }

  @Listen("calciteInternalChipSelect")
  calciteInternalChipSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(false, event.target as HTMLCalciteChipElement);
    }
    event.stopPropagation();
  }

  @Listen("calciteInternalSyncSelectedChips")
  calciteInternalSyncSelectedChips(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.updateSelectedItems();
      if (this.selectionMode === "single" && this.selectedItems.length > 1) {
        this.setSelectedItems(false, event.target as HTMLCalciteChipElement);
      }
    }
    event.stopPropagation();
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Sets focus on the component's first focusable element.
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    if (!this.disabled) {
      return (this.selectedItems[0] || this.items[0])?.setFocus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateItems = (event?: Event): void => {
    const itemsFromSlot = this.slotRefEl
      ?.assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-chip")) as HTMLCalciteChipElement[];

    this.items = !event
      ? itemsFromSlot
      : (slotChangeGetAssignedElements(event) as HTMLCalciteChipElement[]);

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
  };

  private updateSelectedItems = (): void => {
    this.selectedItems = this.items?.filter((el) => el.selected);
  };

  private setSelectedItems = (emit: boolean, elToMatch?: HTMLCalciteChipElement): void => {
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
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const role =
      this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    const { disabled } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        <div
          aria-disabled={toAriaBoolean(disabled)}
          aria-label={this.label}
          class="container"
          role={role}
        >
          <slot
            onSlotchange={this.updateItems}
            // eslint-disable-next-line react/jsx-sort-props -- auto-generated by @esri/calcite-components/enforce-ref-last-prop
            ref={(el) => (this.slotRefEl = el as HTMLSlotElement)}
          />
        </div>
      </InteractiveContainer>
    );
  }
}
