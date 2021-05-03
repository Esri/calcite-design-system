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
  VNode,
  Watch
} from "@stencil/core";
import { IESTYLES } from "./calcite-stepper.resources";
import { getKey } from "../../utils/key";
import { Layout, Scale, Theme } from "../interfaces";

@Component({
  tag: "calcite-stepper",
  styleUrl: "calcite-stepper.scss",
  shadow: true
})
export class CalciteStepper {
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

  /** specify the theme of stepper, defaults to light */
  @Prop({ reflect: true }) theme: Theme;

  /** @internal */
  @Prop({ mutable: true }) requestedContent: HTMLElement[] | NodeListOf<any>;

  // watch for removal of disabled to register step
  @Watch("requestedContent") contentWatcher(): void {
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
  @Event() calciteStepperItemChange: EventEmitter;

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
    return (
      <Host>
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteStepperItemKeyEvent") calciteStepperItemKeyEvent(e: CustomEvent): void {
    const item = e.detail.item;
    const itemToFocus = e.target;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.sortedItems.length - 1;
    switch (getKey(item.key)) {
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

  @Listen("calciteStepperItemRegister") registerItem(event: CustomEvent): void {
    const item = {
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
    this.sortedItems = this.sortItems();
  }

  @Listen("calciteStepperItemSelect") updateItem(event: CustomEvent): void {
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
    this.currentPosition =
      this.currentPosition + 1 < this.items.length
        ? this.currentPosition + 1
        : this.currentPosition;
    this.emitChangedItem();
  }

  /** set the previous step as active */
  @Method()
  async prevStep(): Promise<void> {
    this.currentPosition =
      this.currentPosition - 1 >= 0 ? this.currentPosition - 1 : this.currentPosition;
    this.emitChangedItem();
  }

  /** set the requested step as active */
  @Method()
  async goToStep(num: number): Promise<void> {
    this.currentPosition = num - 1;
    this.emitChangedItem();
  }

  /** set the first step as active */
  @Method()
  async startStep(): Promise<void> {
    this.currentPosition = 0;
    this.emitChangedItem();
  }

  /** set the last step as active */
  @Method()
  async endStep(): Promise<void> {
    this.currentPosition = this.items.length - 1;
    this.emitChangedItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of Stepper items */
  private items = [];

  /** sorted list of Stepper items */
  private sortedItems = [];

  /** keep track of the currently active item position */
  private currentPosition: number;

  /** the container where we place horizontal layout step content */
  private stepperContentContainer: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private addHorizontalContentContainer(): void {
    this.stepperContentContainer = document.createElement("div") as HTMLDivElement;
    this.stepperContentContainer.classList.add("calcite-stepper-content");
    // handle ie styles
    const isIE = !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/));
    if (isIE) {
      this.stepperContentContainer.style.cssText = IESTYLES;
    }
    this.el.insertAdjacentElement("beforeend", this.stepperContentContainer);
  }

  private emitChangedItem(): void {
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }

  private focusFirstItem(): void {
    const firstItem = this.sortedItems[0];
    this.focusElement(firstItem);
  }

  private focusLastItem(): void {
    const lastItem = this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(lastItem);
  }

  private focusNextItem(e): void {
    const index = this.itemIndex(e);
    const nextItem = this.sortedItems[index + 1] || this.sortedItems[0];
    this.focusElement(nextItem);
  }

  private focusPrevItem(e): void {
    const index = this.itemIndex(e);
    const prevItem = this.sortedItems[index - 1] || this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(prevItem);
  }

  private itemIndex(e): number {
    return this.sortedItems.indexOf(e);
  }

  private focusElement(item) {
    const target = item as HTMLCalciteStepperItemElement;
    target.focus();
  }

  private sortItems() {
    const items = Array.from(this.items)
      .filter((a) => !a.item.disabled)
      .sort((a, b) => a.position - b.position)
      .map((a) => a.item);

    return [...Array.from(new Set(items))];
  }

  private updateContent(content) {
    this.stepperContentContainer.innerHTML = "";
    // handle ie
    const isIE = !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/));
    if (!isIE) {
      this.stepperContentContainer.append(...content);
    } else {
      // handle ie content
      content.forEach((contentItem) => {
        if (contentItem.nodeName === "#text") {
          const text = document.createTextNode(contentItem.textContent.trim());
          if (text.length > 0) {
            this.stepperContentContainer.appendChild(text);
          }
        } else if (contentItem.nodeName) {
          this.stepperContentContainer.insertAdjacentHTML("beforeend", contentItem.outerHTML);
        } else {
          return;
        }
      });
    }
  }
}
