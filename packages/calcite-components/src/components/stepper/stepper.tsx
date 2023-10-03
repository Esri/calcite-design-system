import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";

import { focusElementInGroup, getElementDir, slotChangeGetAssignedElements } from "../../utils/dom";
import { NumberingSystem } from "../../utils/locale";
import { Layout, Position, Scale } from "../interfaces";
import { StepperItemChangeEventDetail, StepperItemKeyEventDetail } from "./interfaces";
import { createObserver } from "../../utils/observers";
import { StepBar } from "./step-bar";
import { ITEM_MIN_WIDTH, CSS } from "./resources";
import { isActivationKey } from "../../utils/key";

/**
 * @slot - A slot for adding `calcite-stepper-item` elements.
 */
@Component({
  tag: "calcite-stepper",
  styleUrl: "stepper.scss",
  shadow: true,
})
export class Stepper {
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

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("icon")
  @Watch("layout")
  @Watch("numbered")
  @Watch("scale")
  handleItemPropChange(): void {
    this.updateItems();
  }

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop({ reflect: true }) numberingSystem?: NumberingSystem;

  @Watch("numberingSystem")
  numberingSystemChange(): void {
    this.setStepperItemNumberingSystem();
  }

  /**
   * Specifies the component's selected item.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItem: HTMLCalciteStepperItemElement = null;

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
  calciteStepperItemChange: EventEmitter<void>;

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

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateItems();
    this.resizeObserver?.observe(this.el);
  }

  componentDidLoad(): void {
    // if no stepper items are set as active, default to the first one
    if (typeof this.currentPosition !== "number") {
      this.calciteInternalStepperItemChange.emit({
        position: this.getFirstEnabledStepperPosition(),
      });
    }
  }

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  render(): VNode {
    return (
      <Host aria-label={"Progress steps"} role="region">
        {this.singleViewMode && (
          <div class="step-bar-container">
            {this.items.map((item, index) => (
              <StepBar
                isActive={index === this.currentPosition}
                isComplete={item.complete && index !== this.currentPosition}
                isError={item.error && index !== this.currentPosition}
              />
            ))}
          </div>
        )}
        {this.renderAction("start")}
        {this.renderAction("end")}
        <slot onSlotchange={this.handleDefaultSlotChange} />
      </Host>
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

    switch (item.key) {
      case "ArrowDown":
      case "ArrowRight":
        focusElementInGroup(this.enabledItems, itemToFocus, "next");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        focusElementInGroup(this.enabledItems, itemToFocus, "previous");
        break;
      case "Home":
        focusElementInGroup(this.enabledItems, itemToFocus, "first");
        break;
      case "End":
        focusElementInGroup(this.enabledItems, itemToFocus, "last");
        break;
    }
    event.stopPropagation();
  }

  @Listen("calciteInternalStepperItemRegister")
  registerItem(event: CustomEvent): void {
    const item = event.target as HTMLCalciteStepperItemElement;
    const { content, position } = event.detail;

    this.itemMap.set(item, { position, content });
    this.enabledItems = this.filterItems();
    event.stopPropagation();
  }

  @Listen("calciteInternalStepperItemSelect")
  updateItem(event: CustomEvent): void {
    const { position } = event.detail;

    if (typeof position === "number") {
      this.currentPosition = position;
      this.selectedItem = event.target as HTMLCalciteStepperItemElement;
    }

    this.calciteInternalStepperItemChange.emit({
      position,
    });
  }

  @Listen("calciteInternalUserRequestedStepperItemSelect")
  handleUserRequestedStepperItemSelect(): void {
    this.calciteStepperItemChange.emit();
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

  @Element() el: HTMLCalciteStepperElement;

  /** keep track of the currently active item position */
  @State() currentPosition: number;

  @Watch("currentPosition")
  handlePositionChange(): void {
    this.determineActiveStepper();
  }

  @State() elWidth: number;

  @Watch("elWidth")
  handleElWidthChange(): void {
    this.determineActiveStepper();
  }

  //private breakpoints: Breakpoints;

  /** list of enabled Stepper items */
  private enabledItems: HTMLCalciteStepperItemElement[] = [];

  private itemMap = new Map<HTMLCalciteStepperItemElement, { position: number; content: Node[] }>();

  /** list of sorted Stepper items */
  private items: HTMLCalciteStepperItemElement[] = [];

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  private singleViewMode = false;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private resizeObserver = createObserver(
    "resize",
    (entries) => (this.elWidth = entries[0].contentRect.width)
  );

  private updateItems(): void {
    this.el.querySelectorAll("calcite-stepper-item").forEach((item) => {
      item.icon = this.icon;
      item.numbered = this.numbered;
      item.layout = this.layout;
      item.scale = this.scale;
    });
  }

  private determineActiveStepper(): void {
    const totalItems = this.items.length;
    if (!this.elWidth || !totalItems || this.layout !== "horizontal") {
      return;
    }

    const activePosition = this.currentPosition || 0;
    const totalMinWidthOfItems = totalItems * this.getMinWidthOfStepperItem();
    const totalRowGap = (totalItems - 1) * (parseInt(window.getComputedStyle(this.el).rowGap) || 0);

    if (this.elWidth <= totalMinWidthOfItems + totalRowGap) {
      this.el.style.gridTemplateColumns = "none";
      this.singleViewMode = true;
      this.el.style.display = "flex";

      this.items.forEach((item: HTMLCalciteStepperItemElement, index) => {
        if (index !== activePosition) {
          item.style.display = "none";
        } else {
          item.style.display = "contents";
          item.singleViewMode = true;
        }
      });
    } else if (this.elWidth > totalMinWidthOfItems + totalRowGap) {
      this.el.style.display = "grid";
      this.singleViewMode = false;
      this.setGridTemplateColumns(this.items);

      this.items.forEach((item: HTMLCalciteStepperItemElement) => {
        item.style.display = "contents";
        item.singleViewMode = false;
      });
    }
  }

  private getEnabledStepIndex(
    startIndex: number,
    direction: "next" | "previous" = "next"
  ): number | null {
    const { items, currentPosition } = this;

    let newIndex = startIndex;

    while (items[newIndex]?.disabled && !this.singleViewMode) {
      newIndex = newIndex + (direction === "previous" ? -1 : 1);
    }

    return newIndex !== currentPosition && newIndex < items.length && newIndex >= 0
      ? newIndex
      : null;
  }

  private updateStep(position: number): void {
    this.currentPosition = position;
    this.calciteInternalStepperItemChange.emit({
      position,
    });
  }

  private filterItems(): HTMLCalciteStepperItemElement[] {
    return this.items.filter((item) => !item.disabled);
  }

  private setStepperItemNumberingSystem(): void {
    this.items.forEach((item: HTMLCalciteStepperItemElement) => {
      item.numberingSystem = this.numberingSystem;
    });
  }

  private renderAction(position: Position): VNode {
    const isPositionStart = position === "start";
    const path = isPositionStart ? "chevron-left" : "chevron-right";
    const { currentPosition, singleViewMode, layout } = this;
    const dir = getElementDir(this.el);
    const totalItems = this.items.length;

    return layout === "horizontal" && singleViewMode ? (
      <calcite-action
        alignment="center"
        appearance="transparent"
        class={{
          [CSS.actionIcon]: true,
          [CSS.actionIconStart]: isPositionStart,
          [CSS.actionIconEnd]: !isPositionStart,
        }}
        compact={true}
        disabled={
          (currentPosition === 0 && isPositionStart) ||
          (currentPosition === totalItems - 1 && !isPositionStart)
        }
        icon={path}
        iconFlipRtl={dir === "rtl"}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(event) => this.handleActionClick(event, position)}
        onKeyDown={(event) => this.handleActionKeyDown(event, position)}
        scale={this.scale}
        text={isPositionStart ? "Previous Step" : "Next Step"}
      />
    ) : null;
  }

  private handleActionClick(event: MouseEvent, position: Position): void {
    event.stopPropagation();
    this.getStepFromActions(position);
  }

  private handleActionKeyDown(event: KeyboardEvent, position: Position): void {
    if (!isActivationKey(event.key)) {
      return;
    }
    event.stopPropagation();
    this.getStepFromActions(position);
  }

  private getStepFromActions(position: Position): void {
    if (position === "start") {
      this.prevStep();
    } else {
      this.nextStep();
    }
  }

  private getFirstEnabledStepperPosition(): number {
    let index = 0;
    while (index < this.items.length) {
      if (!this.items[index].disabled) {
        return index;
      }
      index++;
    }
    return 0;
  }

  handleDefaultSlotChange = (event: Event): void => {
    const items = slotChangeGetAssignedElements(event).filter(
      (el) => el?.tagName === "CALCITE-STEPPER-ITEM"
    );
    this.items = items as HTMLCalciteStepperItemElement[];
    this.setGridTemplateColumns(items);
    this.setStepperItemNumberingSystem();
  };

  setGridTemplateColumns = (items: Element[]): void => {
    const minWidth = this.getMinWidthOfStepperItem();
    const spacing = Array(items.length).fill(`minmax(${minWidth}px,1fr)`).join(" ");
    this.el.style.gridTemplateAreas = spacing;
    this.el.style.gridTemplateColumns = spacing;
  };

  getMinWidthOfStepperItem = (): number => {
    return parseInt(ITEM_MIN_WIDTH[this.scale]);
  };
}
