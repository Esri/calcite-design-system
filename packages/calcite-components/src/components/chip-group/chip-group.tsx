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
import { focusElementInGroup, toAriaBoolean } from "../../utils/dom";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
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

  /** Specifies the selection mode of the component. */
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

  mutationObserver = createObserver("mutation", () => this.updateItems());

  private items: HTMLCalciteChipElement[] = [];

  private slotRefEl: HTMLSlotElement;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emits when the component's selection changes. */
  @Event({ cancelable: false }) calciteChipGroupSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  componentDidRender(): void {
    disconnectInteractive(this);
    updateHostInteraction(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalChipKeyEvent")
  calciteInternalChipKeyEventListener(event: CustomEvent): void {
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
  }

  @Listen("calciteChipSelect")
  calciteChipSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(true, event.target as HTMLCalciteChipElement);
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
    const target = event ? (event.target as HTMLSlotElement) : this.slotRefEl;
    this.items = target
      ?.assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-chip")) as HTMLCalciteChipElement[];

    this.items?.forEach((el) => {
      el.interactive = true;
      el.scale = this.scale;
      el.selectionMode = this.selectionMode;
    });

    this.setSelectedItems(false);
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

    this.selectedItems = this.items?.filter((el) => el.selected);

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
            ref={(el) => (this.slotRefEl = el as HTMLSlotElement)}
          />
        </div>
      </InteractiveContainer>
    );
  }
}
