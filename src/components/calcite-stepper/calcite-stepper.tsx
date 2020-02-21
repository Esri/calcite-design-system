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
  State
} from "@stencil/core";
import { UP, DOWN, HOME, END, LEFT, RIGHT } from "../../utils/keys";
import { getElementDir } from "../../utils/dom";

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

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** specify the theme of stepper, defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** specify the scale of stepper, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** optionally display the number next to the step title */
  @Prop({ mutable: true, reflect: true }) numbered: boolean = false;

  /** optionally display a status icon next to the step title */
  @Prop({ mutable: true, reflect: true }) icon: boolean = false;

  /** specify the layout of stepper, defaults to horizontal */
  @Prop({ mutable: true, reflect: true }) layout: "horizontal" | "vertical" =
    "horizontal";

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

    let theme = ["light", "dark"];
    if (!theme.includes(this.theme)) this.theme = "light";

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let numbered = [true, false];
    if (!numbered.includes(this.numbered)) this.numbered = false;

    let icon = [true, false];
    if (!icon.includes(this.icon)) this.icon = false;
  }

  componentDidLoad() {
    if (!this.sorted) {
      this.items = this.sortItems(this.items);
      this.sorted = true;
    }
    // if no stepper items are set as active, default to the first one
    if (!this.currentStepperItemPosition) {
      this.calciteStepperItemHasChanged.emit({
        requestedStepperItemPosition: 0
      });
    }
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <slot />
        {this.layout === "horizontal" &&
        this.requestedStepperItemContent !== null ? (
          <div
            class="stepper-content"
            innerHTML={this.requestedStepperItemContent}
          ></div>
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
    let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
    switch (item.keyCode) {
      case DOWN:
      case RIGHT:
        if (isLastItem) this.focusFirstItem();
        else this.focusNextItem(itemToFocus);
        break;
      case UP:
      case LEFT:
        if (isFirstItem) this.focusLastItem();
        else this.focusPrevItem(itemToFocus);
        break;
      case HOME:
        this.focusFirstItem();
        break;
      case END:
        this.focusLastItem();
        break;
    }
  }

  @Listen("registerCalciteStepperItem") registerCalciteStepperItem(
    e: CustomEvent
  ) {
    const item = {
      item: e.target as HTMLCalciteStepperItemElement,
      position: e.detail.position
    };
    this.items.push(item);
  }

  @Listen("calciteStepperItemSelected") updateActiveItemOnChange(
    event: CustomEvent
  ) {
    this.currentStepperItemPosition = event.detail.requestedStepperItemPosition;
    this.requestedStepperItemPosition =
      event.detail.requestedStepperItemPosition;

    this.requestedStepperItemContent = event.detail.requestedStepperItemContent;

    this.calciteStepperItemHasChanged.emit({
      requestedStepperItemPosition: this.requestedStepperItemPosition
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
    this.requestedStepperItemPosition =
      this.requestedStepperItemPosition + 1 < this.items.length
        ? this.currentStepperItemPosition + 1
        : this.currentStepperItemPosition;
    console.log(this.requestedStepperItemPosition, this.items.length);
    this.emitChangedItem();
  }

  /** set the previous step as active */
  @Method()
  async prevStep(): Promise<void> {
    this.requestedStepperItemPosition =
      this.requestedStepperItemPosition - 1 >= 0
        ? this.currentStepperItemPosition - 1
        : this.currentStepperItemPosition;
    this.emitChangedItem();
  }

  /** set the requested step as active */
  @Method()
  async goToStep(num: number): Promise<void> {
    this.requestedStepperItemPosition = num - 1;
    this.emitChangedItem();
  }

  /** set the first step as active */
  @Method()
  async startStep(): Promise<void> {
    this.requestedStepperItemPosition = 0;
    this.emitChangedItem();
  }

  /** set the last step as active */
  @Method()
  async endStep(): Promise<void> {
    this.requestedStepperItemPosition = this.items.length - 1;
    this.emitChangedItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of Stepper items */
  private items = [];

  /** keep track of whether the items have been sorted so we don't re-sort */
  private sorted = false;

  /** keep track of the currently active item position */
  private currentStepperItemPosition: number;

  /** keep track of the requested item position */
  private requestedStepperItemPosition: number;

  /** the slotted content of the selected step - for horizontal layout use */
  @State() requestedStepperItemContent: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private emitChangedItem() {
    this.calciteStepperItemHasChanged.emit({
      requestedStepperItemPosition: this.requestedStepperItemPosition
    });
  }

  private focusFirstItem() {
    const firstItem = this.items[0];
    this.focusElement(firstItem);
  }

  private focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    this.focusElement(lastItem);
  }

  private focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    this.focusElement(nextItem);
  }

  private focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.focusElement(prevItem);
  }

  private itemIndex(e) {
    return this.items.indexOf(e);
  }

  private focusElement(item) {
    const target = item as HTMLCalciteStepperItemElement;
    target.focus();
  }

  private sortItems = (items: any[]): any[] =>
    items.sort((a, b) => a.position - b.position).map(a => a.item);
}
