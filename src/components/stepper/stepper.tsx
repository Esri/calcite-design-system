import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  VNode,
  Watch
} from "@stencil/core";

import { Layout, Scale } from "../interfaces";
import {
  StepperItemChangeEventDetail,
  StepperItemEventDetail,
  StepperItemKeyEventDetail,
  StepperItemLookup
} from "./interfaces";

/**
 * @slot - A slot for adding `calcite-stepper-item`s.
 */
@Component({
  tag: "calcite-stepper",
  styleUrl: "stepper.scss",
  shadow: true
})
export class Stepper {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteStepperElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** optionally display a status icon next to the step title */
  @Prop({ reflect: true }) icon = false;

  /** specify the layout of stepper, defaults to horizontal */
  @Prop({ reflect: true }) layout: Layout = "horizontal";

  /** optionally display the number next to the step title */
  @Prop({ reflect: true }) numbered = false;

  /** specify the scale of stepper, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** @internal */
  @Prop({ mutable: true }) requestedContent: Node[];

  // watch for removal of disabled to register step
  @Watch("requestedContent")
  contentWatcher(): void {
    if (this.layout === "horizontal") {
      if (!this.stepperContentContainer && this.requestedContent) {
        this.addHorizontalContentContainer();
      }
      this.updateContent(this.requestedContent);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * This event fires when the active stepper item has changed.
   * @internal
   */
  @Event() calciteStepperItemChange: EventEmitter<StepperItemChangeEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad(): void {
    // if no stepper items are set as active, default to the first one
    if (!this.currentPosition) {
      this.calciteStepperItemChange.emit({
        position: 0
      });
    }
  }

  componentWillLoad() {
    if (this.layout === "horizontal" && !this.stepperContentContainer) {
      this.addHorizontalContentContainer();
    }
  }

  render(): VNode {
    return <slot />;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteStepperItemKeyEvent")
  calciteStepperItemKeyEvent(e: CustomEvent<StepperItemKeyEventDetail>): void {
    const item = e.detail.item;
    const itemToFocus = e.target as HTMLCalciteStepperItemElement;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.curatedItems.length - 1;
    switch (item.key) {
      case "ArrowDown":
      case "ArrowRight":
        if (isLastItem) {
          this.focusFirstItem();
        } else {
          this.focusNextItem(itemToFocus);
        }
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (isFirstItem) {
          this.focusLastItem();
        } else {
          this.focusPrevItem(itemToFocus);
        }
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }
  }

  @Listen("calciteStepperItemRegister")
  registerItem(event: CustomEvent<StepperItemEventDetail>): void {
    const item: StepperItemLookup = {
      item: event.target as HTMLCalciteStepperItemElement,
      position: event.detail.position,
      content: event.detail.content
    };
    if (item.content && item.item.active) {
      this.requestedContent = item.content;
    }
    if (!this.items.includes(item)) {
      this.items.push(item);
    }
    this.items = this.sortItems();
    this.curatedItems = this.curateItems();
  }

  @Listen("calciteStepperItemSelect")
  updateItem(event: CustomEvent<StepperItemEventDetail>): void {
    if (event.detail.content) {
      this.requestedContent = event.detail.content;
    }
    this.currentPosition = event.detail.position;
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** set the next step as active */
  @Method()
  async nextStep(): Promise<void> {
    const { currentPosition } = this;

    const enabledStepIndex = this.getEnabledStepIndex(currentPosition + 1, 1);

    if (currentPosition !== enabledStepIndex) {
      this.currentPosition = enabledStepIndex;
      this.emitChangedItem();
    }
  }

  /** set the previous step as active */
  @Method()
  async prevStep(): Promise<void> {
    const { currentPosition } = this;

    const enabledStepIndex = this.getEnabledStepIndex(currentPosition - 1, -1);

    if (currentPosition !== enabledStepIndex) {
      this.currentPosition = enabledStepIndex;
      this.emitChangedItem();
    }
  }

  /** set the requested step as active */
  @Method()
  async goToStep(step: number): Promise<void> {
    const position = step - 1;

    if (this.currentPosition !== position) {
      this.currentPosition = position;
      this.emitChangedItem();
    }
  }

  /** set the first step as active */
  @Method()
  async startStep(): Promise<void> {
    const { currentPosition } = this;

    const enabledStepIndex = this.getEnabledStepIndex(0, 1);

    if (currentPosition !== enabledStepIndex) {
      this.currentPosition = enabledStepIndex;
      this.emitChangedItem();
    }
  }

  /** set the last step as active */
  @Method()
  async endStep(): Promise<void> {
    const { currentPosition, items } = this;

    const enabledStepIndex = this.getEnabledStepIndex(items.length - 1, -1);

    if (currentPosition !== enabledStepIndex) {
      this.currentPosition = enabledStepIndex;
      this.emitChangedItem();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of Stepper items */
  private items: StepperItemLookup[] = [];

  /** filtered and sorted list of Stepper items */
  private curatedItems: HTMLCalciteStepperItemElement[] = [];

  /** keep track of the currently active item position */
  private currentPosition: number;

  /** the container where we place horizontal layout step content */
  private stepperContentContainer: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getEnabledStepIndex(index: number, offset: number): number {
    const { items } = this;

    let newIndex = index;

    while (items[newIndex]?.item.disabled) {
      newIndex = newIndex + offset;
    }

    return newIndex < items.length && newIndex >= 0 ? newIndex : index;
  }

  private addHorizontalContentContainer(): void {
    this.stepperContentContainer = document.createElement("div") as HTMLDivElement;
    this.stepperContentContainer.classList.add("calcite-stepper-content");
    this.el.insertAdjacentElement("beforeend", this.stepperContentContainer);
  }

  private emitChangedItem(): void {
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }

  private focusFirstItem(): void {
    const firstItem = this.curatedItems[0];
    this.focusElement(firstItem);
  }

  private focusLastItem(): void {
    const lastItem = this.curatedItems[this.curatedItems.length - 1];
    this.focusElement(lastItem);
  }

  private focusNextItem(e: HTMLCalciteStepperItemElement): void {
    const index = this.itemIndex(e);
    const nextItem = this.curatedItems[index + 1] || this.curatedItems[0];
    this.focusElement(nextItem);
  }

  private focusPrevItem(e: HTMLCalciteStepperItemElement): void {
    const index = this.itemIndex(e);
    const prevItem =
      this.curatedItems[index - 1] || this.curatedItems[this.curatedItems.length - 1];
    this.focusElement(prevItem);
  }

  private itemIndex(e: HTMLCalciteStepperItemElement): number {
    return this.curatedItems.indexOf(e);
  }

  private focusElement(item: HTMLCalciteStepperItemElement) {
    item.focus();
  }

  private sortItems(): StepperItemLookup[] {
    return Array.from(this.items).sort((a, b) => a.position - b.position);
  }

  private curateItems(): HTMLCalciteStepperItemElement[] {
    const items = Array.from(this.items)
      .filter((a) => !a.item.disabled)
      .map((a) => a.item);

    return [...Array.from(new Set(items))];
  }

  private updateContent(content: Node[]): void {
    this.stepperContentContainer.innerHTML = "";
    this.stepperContentContainer.append(...content);
  }
}
