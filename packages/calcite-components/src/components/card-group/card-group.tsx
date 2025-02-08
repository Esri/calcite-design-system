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
  Host,
} from "@stencil/core";
import { focusElement, focusElementInGroup } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { SelectionMode } from "../interfaces";
import {
  LoadableComponent,
  componentLoaded,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

/**
 * @slot - A slot for adding one or more `calcite-card`s.
 */

@Component({
  tag: "calcite-card-group",
  styleUrl: "card-group.scss",
  shadow: true,
})
export class CardGroup implements InteractiveComponent, LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteCardGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible name for the component. */
  @Prop() label!: string;

  /** Specifies the selection mode of the component. */
  @Prop({ reflect: true }) selectionMode: Extract<
    "multiple" | "single" | "single-persist" | "none",
    SelectionMode
  > = "none";

  @Watch("selectionMode")
  onSelectionModeChange(): void {
    this.updateItemsOnSelectionModeChange();
  }

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteCardElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private items: HTMLCalciteCardElement[] = [];

  private slotRefEl: HTMLSlotElement;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emits when the component's selection changes and the `selectionMode` is not `none`. */
  @Event({ cancelable: false }) calciteCardGroupSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
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

  @Listen("calciteInternalCardKeyEvent")
  calciteInternalCardKeyEventListener(event: KeyboardEvent): void {
    if (event.composedPath().includes(this.el)) {
      const interactiveItems = this.items.filter((el) => !el.disabled);
      switch (event.detail["key"]) {
        case "ArrowRight":
          focusElementInGroup(interactiveItems, event.target as HTMLCalciteCardElement, "next");
          break;
        case "ArrowLeft":
          focusElementInGroup(interactiveItems, event.target as HTMLCalciteCardElement, "previous");
          break;
        case "Home":
          focusElementInGroup(interactiveItems, event.target as HTMLCalciteCardElement, "first");
          break;
        case "End":
          focusElementInGroup(interactiveItems, event.target as HTMLCalciteCardElement, "last");
          break;
      }
    }
  }

  @Listen("calciteCardSelect")
  calciteCardSelectListener(event: CustomEvent): void {
    if (
      event.composedPath().includes(this.el) &&
      !(event.target as HTMLCalciteCardElement).selectable
    ) {
      this.setSelectedItems(true, event.target as HTMLCalciteCardElement);
    }
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
    await componentLoaded(this);
    if (!this.disabled) {
      focusElement(this.items[0]);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateItemsOnSelectionModeChange = (): void => {
    this.updateSlottedItems(this.slotRefEl);
    this.updateSelectedItems();
  };

  private updateItemsOnSlotChange = (event: Event): void => {
    this.updateSlottedItems(event.target as HTMLSlotElement);
    this.updateSelectedItems();
  };

  private updateSlottedItems = (target: HTMLSlotElement): void => {
    this.items = target
      .assignedElements({ flatten: true })
      .filter((el): el is HTMLCalciteCardElement => el?.matches("calcite-card"));
  };

  private updateSelectedItems = (): void => {
    this.items.forEach((el) => {
      el.selectionMode = this.selectionMode;
    });

    this.setSelectedItems(false);
  };

  private setSelectedItems = (emit: boolean, elToMatch?: HTMLCalciteCardElement): void => {
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
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const role =
      this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";

    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <div aria-label={this.label} class="container" role={role}>
            <slot
              onSlotchange={this.updateItemsOnSlotChange}
              ref={(el) => (this.slotRefEl = el as HTMLSlotElement)}
            />
          </div>
        </InteractiveContainer>
      </Host>
    );
  }
}
