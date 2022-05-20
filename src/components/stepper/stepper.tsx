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
  StepperItemKeyEventDetail
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
   *
   * @internal
   */
  @Event() calciteInternalStepperItemChange: EventEmitter<StepperItemChangeEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad(): void {
    // if no stepper items are set as active, default to the first one
    if (!this.currentPosition) {
      this.calciteInternalStepperItemChange.emit({
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

  @Listen("calciteInternalStepperItemKeyEvent")
  calciteInternalStepperItemKeyEvent(e: CustomEvent<StepperItemKeyEventDetail>): void {
    const item = e.detail.item;
    const itemToFocus = e.target as HTMLCalciteStepperItemElement;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.enabledItems.length - 1;
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
    e.stopPropagation();
  }

  @Listen("calciteInternalStepperItemRegister")
  registerItem(event: CustomEvent<StepperItemEventDetail>): void {
    const item = event.target as HTMLCalciteStepperItemElement;
    const { content, position } = event.detail;

    if (content && item.active) {
      this.requestedContent = content;
    }

    this.itemMap.set(item, { position, content });
    this.items = this.sortItems();
    this.enabledItems = this.filterItems();
    event.stopPropagation();
  }

  @Listen("calciteInternalStepperItemSelect")
  updateItem(event: CustomEvent<StepperItemEventDetail>): void {
    if (event.detail.content) {
      this.requestedContent = event.detail.content;
    }
    this.currentPosition = event.detail.position;
    this.calciteInternalStepperItemChange.emit({
      position: this.currentPosition
    });
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** set the next step as active */
  @Method()
  async nextStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentPosition + 1, "next");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /** set the previous step as active */
  @Method()
  async prevStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentPosition - 1, "previous");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /**
   * set the requested step as active
   *
   * @param step
   */
  @Method()
  async goToStep(step: number): Promise<void> {
    const position = step - 1;

    if (this.currentPosition !== position) {
      this.updateStep(position);
    }
  }

  /** set the first step as active */
  @Method()
  async startStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(0, "next");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /** set the last step as active */
  @Method()
  async endStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.items.length - 1, "previous");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private itemMap = new Map<HTMLCalciteStepperItemElement, { position: number; content: Node[] }>();

  /** list of sorted Stepper items */
  private items: HTMLCalciteStepperItemElement[] = [];

  /** list of enabled Stepper items */
  private enabledItems: HTMLCalciteStepperItemElement[] = [];

  /** keep track of the currently active item position */
  private currentPosition: number;

  /** the container where we place horizontal layout step content */
  private stepperContentContainer: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getEnabledStepIndex(
    startIndex: number,
    direction: "next" | "previous" = "next"
  ): number | null {
    const { items, currentPosition } = this;

    let newIndex = startIndex;

    while (items[newIndex]?.disabled) {
      newIndex = newIndex + (direction === "previous" ? -1 : 1);
    }

    return newIndex !== currentPosition && newIndex < items.length && newIndex >= 0
      ? newIndex
      : null;
  }

  private addHorizontalContentContainer(): void {
    this.stepperContentContainer = document.createElement("div") as HTMLDivElement;
    this.stepperContentContainer.classList.add("calcite-stepper-content");
    this.el.insertAdjacentElement("beforeend", this.stepperContentContainer);
  }

  private updateStep(position: number): void {
    const { itemMap, items } = this;

    this.currentPosition = position;

    const content = itemMap.get(items[position])?.content;

    if (content) {
      this.requestedContent = content;
    }

    this.calciteInternalStepperItemChange.emit({
      position
    });
  }

  private focusFirstItem(): void {
    const firstItem = this.enabledItems[0];
    this.focusElement(firstItem);
  }

  private focusLastItem(): void {
    const lastItem = this.enabledItems[this.enabledItems.length - 1];
    this.focusElement(lastItem);
  }

  private focusNextItem(e: HTMLCalciteStepperItemElement): void {
    const index = this.itemIndex(e);
    const nextItem = this.enabledItems[index + 1] || this.enabledItems[0];
    this.focusElement(nextItem);
  }

  private focusPrevItem(e: HTMLCalciteStepperItemElement): void {
    const index = this.itemIndex(e);
    const prevItem =
      this.enabledItems[index - 1] || this.enabledItems[this.enabledItems.length - 1];
    this.focusElement(prevItem);
  }

  private itemIndex(e: HTMLCalciteStepperItemElement): number {
    return this.enabledItems.indexOf(e);
  }

  private focusElement(item: HTMLCalciteStepperItemElement) {
    item.focus();
  }

  private sortItems(): HTMLCalciteStepperItemElement[] {
    const { itemMap } = this;

    return Array.from(itemMap.keys()).sort(
      (a, b) => itemMap.get(a).position - itemMap.get(b).position
    );
  }

  private filterItems(): HTMLCalciteStepperItemElement[] {
    return this.items.filter((item) => !item.disabled);
  }

  private updateContent(content: Node[]): void {
    this.stepperContentContainer.innerHTML = "";
    this.stepperContentContainer.append(...content);
  }
}
