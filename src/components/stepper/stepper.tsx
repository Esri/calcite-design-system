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
import { NumberingSystem } from "../../utils/locale";

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

  /** When `true`, displays a status icon in the `calcite-stepper-item` heading. */
  @Prop({ reflect: true }) icon = false;

  /** Defines the layout of the component. */
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "horizontal";

  /** When `true`, displays the step number in the `calcite-stepper-item` heading. */
  @Prop({ reflect: true }) numbered = false;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop({ reflect: true }) numberingSystem?: NumberingSystem;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the active `calcite-stepper-item` changes.
   *
   */
  @Event({ cancelable: false })
  calciteStepperItemChange: EventEmitter<StepperItemChangeEventDetail>;

  /**
   * Fires when the active `calcite-stepper-item` changes.
   *
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalStepperItemChange: EventEmitter<StepperItemChangeEventDetail>;

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
  calciteInternalStepperItemKeyEvent(event: CustomEvent<StepperItemKeyEventDetail>): void {
    const item = event.detail.item;
    const itemToFocus = event.target as HTMLCalciteStepperItemElement;
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
    event.stopPropagation();
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

  /** Set the next `calcite-stepper-item` as active. */
  @Method()
  async nextStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentPosition + 1, "next");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /** Set the previous `calcite-stepper-item` as active. */
  @Method()
  async prevStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(this.currentPosition - 1, "previous");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /**
   * Set a specified `calcite-stepper-item` as active.
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

  /** Set the first `calcite-stepper-item` as active. */
  @Method()
  async startStep(): Promise<void> {
    const enabledStepIndex = this.getEnabledStepIndex(0, "next");

    if (typeof enabledStepIndex !== "number") {
      return;
    }

    this.updateStep(enabledStepIndex);
  }

  /** Set the last `calcite-stepper-item` as active. */
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

  private focusNextItem(el: HTMLCalciteStepperItemElement): void {
    const index = this.itemIndex(el);
    const nextItem = this.enabledItems[index + 1] || this.enabledItems[0];
    focusElement(nextItem);
  }

  private focusPrevItem(el: HTMLCalciteStepperItemElement): void {
    const index = this.itemIndex(el);
    const prevItem =
      this.enabledItems[index - 1] || this.enabledItems[this.enabledItems.length - 1];
    focusElement(prevItem);
  }

  private itemIndex(el: HTMLCalciteStepperItemElement): number {
    return this.enabledItems.indexOf(el);
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
