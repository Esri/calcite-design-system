import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  VNode,
  Watch
} from "@stencil/core";
import { getElementProp, toAriaBoolean } from "../../utils/dom";
import { Scale } from "../interfaces";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  StepperItemChangeEventDetail,
  StepperItemEventDetail,
  StepperItemKeyEventDetail
} from "../stepper/interfaces";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-stepper-item",
  styleUrl: "stepper-item.scss",
  shadow: true
})
export class StepperItem implements InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteStepperItemElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** is the step active */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** has the step been completed */
  @Prop({ reflect: true }) complete = false;

  /** does the step contain an error that needs to be resolved by the user */
  @Prop() error = false;

  /** is the step disabled and not navigable to by a user */
  @Prop({ reflect: true }) disabled = false;

  /** pass a title for the stepper item */
  @Prop() itemTitle?: string;

  /** pass a title for the stepper item */
  @Prop() itemSubtitle?: string;

  // internal props inherited from wrapping calcite-stepper
  /** pass a title for the stepper item */
  /** @internal */

  @Prop({ reflect: true, mutable: true }) layout?: string;

  /** should the items display an icon based on status */
  /** @internal */
  @Prop({ mutable: true }) icon = false;

  /** optionally display the step number next to the title and subtitle */
  /** @internal */
  @Prop({ mutable: true }) numbered = false;

  /** the scale of the item */
  /** @internal */
  @Prop({ reflect: true, mutable: true }) scale: Scale = "m";

  // watch for removal of disabled to register step
  @Watch("disabled")
  disabledWatcher(): void {
    this.registerStepperItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteStepperItemKeyEvent: EventEmitter<StepperItemKeyEventDetail>;

  /**
   * @internal
   */
  @Event() calciteStepperItemSelect: EventEmitter<StepperItemEventDetail>;

  /**
   * @internal
   */
  @Event() calciteStepperItemRegister: EventEmitter<StepperItemEventDetail>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.icon = getElementProp(this.el, "icon", false);
    this.numbered = getElementProp(this.el, "numbered", false);
    this.layout = getElementProp(this.el, "layout", false);
    this.scale = getElementProp(this.el, "scale", "m");
    this.parentStepperEl = this.el.parentElement as HTMLCalciteStepperElement;
  }

  componentDidRender(): void {
    updateHostInteraction(this, true);
  }

  render(): VNode {
    return (
      <Host
        aria-expanded={toAriaBoolean(this.active)}
        onClick={this.emitRequestedItem}
        onKeyDown={this.keyDownHandler}
      >
        <div class="container">
          <div class="stepper-item-header">
            {this.icon ? this.renderIcon() : null}
            {this.numbered ? (
              <div class="stepper-item-number">{this.getItemPosition() + 1}.</div>
            ) : null}
            <div class="stepper-item-header-text">
              <span class="stepper-item-title">{this.itemTitle}</span>
              <span class="stepper-item-subtitle">{this.itemSubtitle}</span>
            </div>
          </div>
          <div class="stepper-item-content">
            <slot onSlotchange={this.setItemContent} />
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteStepperItemChange", { target: "body" })
  updateActiveItemOnChange(event: CustomEvent<StepperItemChangeEventDetail>): void {
    if (
      event.target === this.parentStepperEl ||
      event.composedPath().includes(this.parentStepperEl)
    ) {
      this.activePosition = event.detail.position;
      this.determineActiveItem();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  /** position within parent */
  private itemPosition: number;

  /** the latest requested item position*/
  private activePosition: number;

  /** the slotted item content */
  private itemContent: Node[];

  /** the parent stepper component */
  private parentStepperEl: HTMLCalciteStepperElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private keyDownHandler = (e: KeyboardEvent): void => {
    if (!this.disabled && e.target === this.el) {
      switch (e.key) {
        case " ":
        case "Enter":
          this.emitRequestedItem();
          e.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "Home":
        case "End":
          this.calciteStepperItemKeyEvent.emit({ item: e });
          e.preventDefault();
          break;
      }
    }
  };

  private renderIcon(): VNode {
    const path = this.active
      ? "circleF"
      : this.error
      ? "exclamationMarkCircleF"
      : this.complete
      ? "checkCircleF"
      : "circle";

    return <calcite-icon class="stepper-item-icon" icon={path} scale="s" />;
  }

  private determineActiveItem(): void {
    this.active = !this.disabled && this.itemPosition === this.activePosition;
  }

  private registerStepperItem(): void {
    this.calciteStepperItemRegister.emit({
      position: this.itemPosition,
      content: this.itemContent
    });
  }

  private emitRequestedItem = (): void => {
    if (!this.disabled) {
      this.calciteStepperItemSelect.emit({
        position: this.itemPosition,
        content: this.itemContent
      });
    }
  };

  private setItemContent = (event: Event): void => {
    this.itemPosition = this.getItemPosition();

    const itemContent = (event.target as HTMLSlotElement).assignedNodes({ flatten: true });

    if (itemContent.length) {
      this.itemContent = itemContent;
    }

    this.registerStepperItem();

    if (this.active) {
      this.emitRequestedItem();
    }
  };

  private getItemPosition(): number {
    return Array.prototype.indexOf.call(
      this.parentStepperEl.querySelectorAll("calcite-stepper-item"),
      this.el
    );
  }
}
