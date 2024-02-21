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
import { componentLoaded, setComponentLoaded, setUpLoadableComponent } from "../../utils/loadable";
/**
 * @slot - A slot for adding one or more `calcite-card`s.
 */
@Component({
  tag: "calcite-card-group",
  styleUrl: "card-group.scss",
  shadow: true,
})
export class CardGroup implements InteractiveComponent {
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

  /** Specifies the size of the component. Child `calcite-card`s inherit the component's value. */
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
  @Prop({ mutable: true }) selectedItems: HTMLCalciteCardElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  mutationObserver = createObserver("mutation", () => this.updateItems());

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

  @Listen("calciteInternalCardKeyEvent")
  calciteInternalCardKeyEventListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      const interactiveItems = this.items.filter((el) => !el.disabled);
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
      (this.selectedItems[0] || this.items[0])?.setFocus();
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
      .assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-card")) as HTMLCalciteCardElement[];

    this.items.forEach((el) => {
      el.interactive = true;
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
      <InteractiveContainer disabled={this.disabled}>
        <div
          aria-disabled={toAriaBoolean(this.disabled)}
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
