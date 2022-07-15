import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  VNode
} from "@stencil/core";

import { Layout, Scale } from "../interfaces";
import { StepperItemChangeEventDetail, StepperItemKeyEventDetail } from "./interfaces";
import { focusElement } from "../../utils/dom";

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
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "horizontal";

  /** optionally display the number next to the step title */
  @Prop({ reflect: true }) numbered = false;

  /** specify the scale of stepper, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * This event fires when the active stepper item has changed.
   *
   */
  @Event() calciteStepperItemChange: EventEmitter<StepperItemChangeEventDetail>;

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
    if (typeof this.currentPosition !== "number") {
      this.calciteInternalStepperItemChange.emit({
        position: 0
      });
    }
  }

  render(): VNode {
    return (
      <slot
        onSlotchange={(event: Event) => {
          const items = (event.currentTarget as HTMLSlotElement)
            .assignedElements()
            .filter((el) => el?.tagName === "CALCITE-STEPPER-ITEM");

          const spacing = Array(items.length).fill("1fr").join(" ");
          this.el.style.gridTemplateAreas = spacing;
          this.el.style.gridTemplateColumns = spacing;
        }}
      />
    );
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

  @Listen("calciteInternalStepperItemRegister") registerItem(event: CustomEvent): void {
    const item = event.target as HTMLCalciteStepperItemElement;
    const { content, position } = event.detail;

    this.itemMap.set(item, { position, content });
    this.items = this.sortItems();
    this.enabledItems = this.filterItems();
    event.stopPropagation();
  }

  @Listen("calciteInternalStepperItemSelect") updateItem(event: CustomEvent): void {
    const { position } = event.detail;

    if (typeof position === "number") {
      this.currentPosition = position;
    }

    this.calciteInternalStepperItemChange.emit({
      position
    });
  }

  @Listen("calciteInternalUserRequestedStepperItemSelect")
  handleUserRequestedStepperItemSelect(event: CustomEvent<StepperItemChangeEventDetail>): void {
    const { position } = event.detail;

    this.calciteStepperItemChange.emit({
      position
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

  private updateStep(position: number): void {
    this.currentPosition = position;
    this.calciteInternalStepperItemChange.emit({
      position
    });
  }

  private focusFirstItem(): void {
    const firstItem = this.enabledItems[0];
    focusElement(firstItem);
  }

  private focusLastItem(): void {
    const lastItem = this.enabledItems[this.enabledItems.length - 1];
    focusElement(lastItem);
  }

  private focusNextItem(e: HTMLCalciteStepperItemElement): void {
    const index = this.itemIndex(e);
    const nextItem = this.enabledItems[index + 1] || this.enabledItems[0];
    focusElement(nextItem);
  }

  private focusPrevItem(e: HTMLCalciteStepperItemElement): void {
    const index = this.itemIndex(e);
    const prevItem =
      this.enabledItems[index - 1] || this.enabledItems[this.enabledItems.length - 1];
    focusElement(prevItem);
  }

  private itemIndex(e: HTMLCalciteStepperItemElement): number {
    return this.enabledItems.indexOf(e);
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
}
