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
  Watch,
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-stepper",
  styleUrl: "calcite-stepper.scss",
  shadow: true,
})
export class CalciteStepper {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** specify the theme of stepper, defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark";

  /** specify the scale of stepper, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** optionally display the number next to the step title */
  @Prop({ mutable: true, reflect: true }) numbered: boolean = false;

  /** optionally display a status icon next to the step title */
  @Prop({ mutable: true, reflect: true }) icon: boolean = false;

  /** specify the layout of stepper, defaults to horizontal */
  @Prop({ mutable: true, reflect: true }) layout: "horizontal" | "vertical" =
    "horizontal";

  /** @internal */
  @Prop() requestedContent: HTMLElement[] | HTMLElement;

  // watch for removal of disabled to register step
  @Watch("requestedContent") contentWatcher() {
    this.updateContent(this.requestedContent);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteStepperItemHasChanged: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // validate props
    let layout = ["horizontal", "vertical"];
    if (!layout.includes(this.layout)) this.layout = "horizontal";

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let numbered = [true, false];
    if (!numbered.includes(this.numbered)) this.numbered = false;

    let icon = [true, false];
    if (!icon.includes(this.icon)) this.icon = false;
  }

  componentDidLoad() {
    // if no stepper items are set as active, default to the first one
    if (!this.currentPosition) {
      this.calciteStepperItemHasChanged.emit({
        position: 0,
      });
    }
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <slot />
        {this.layout === "horizontal" ? (
          <div
            class="stepper-content"
            ref={(el) => (this.stepperContentContainer = el as HTMLDivElement)}
          />
        ) : null}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteStepperItemKeyEvent") calciteStepperItemKeyEvent(
    e: CustomEvent
  ) {
    let item = e.detail.item;
    let itemToFocus = e.target;
    let isFirstItem = this.itemIndex(itemToFocus) === 0;
    let isLastItem =
      this.itemIndex(itemToFocus) === this.sortedItems.length - 1;
    switch (getKey(item.key)) {
      case "ArrowDown":
      case "ArrowRight":
        if (isLastItem) this.focusFirstItem();
        else this.focusNextItem(itemToFocus);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (isFirstItem) this.focusLastItem();
        else this.focusPrevItem(itemToFocus);
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }
  }

  @Listen("registerCalciteStepperItem") registerItem(event: CustomEvent) {
    const item = {
      item: event.target as HTMLCalciteStepperItemElement,
      position: event.detail.position,
      content: event.detail.content,
    };
    if (item.content !== null && item.item.active)
      this.requestedContent = [item.content];
    if (!this.items.includes(item)) this.items.push(item);
    this.sortedItems = this.sortItems();
  }

  @Listen("calciteStepperItemSelected") updateItem(event: CustomEvent) {
    if (event.detail.content)
      this.requestedContent =
        event.detail.content.length > 0
          ? event.detail.content
          : [event.detail.content];
    this.currentPosition = event.detail.position;
    this.calciteStepperItemHasChanged.emit({
      position: this.currentPosition,
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
      this.currentPosition - 1 >= 0
        ? this.currentPosition - 1
        : this.currentPosition;
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

  /** the referenced content container element */
  private stepperContentContainer: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private emitChangedItem() {
    this.calciteStepperItemHasChanged.emit({
      position: this.currentPosition,
    });
  }

  private focusFirstItem() {
    const firstItem = this.sortedItems[0];
    this.focusElement(firstItem);
  }

  private focusLastItem() {
    const lastItem = this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(lastItem);
  }

  private focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.sortedItems[index + 1] || this.sortedItems[0];
    this.focusElement(nextItem);
  }

  private focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem =
      this.sortedItems[index - 1] ||
      this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(prevItem);
  }

  private itemIndex(e) {
    return this.sortedItems.indexOf(e);
  }

  private focusElement(item) {
    const target = item as HTMLCalciteStepperItemElement;
    target.focus();
  }

  private sortItems() {
    let items = Array.from(this.items)
      .filter((a) => !a.item.disabled)
      .sort((a, b) => a.position - b.position)
      .map((a) => a.item);

    return [...new Set(items)];
  }

  private updateContent(content) {
    if (this.stepperContentContainer) {
      this.stepperContentContainer.innerHTML = ``;
      this.stepperContentContainer.append(...content);
    }
  }
}
