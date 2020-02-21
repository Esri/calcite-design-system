import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop
} from "@stencil/core";
import {
  UP,
  DOWN,
  ENTER,
  HOME,
  END,
  SPACE,
  LEFT,
  RIGHT
} from "../../utils/keys";
import {
  getElementDir,
  getElementProp,
  getSlottedElements
} from "../../utils/dom";

@Component({
  tag: "calcite-stepper-item",
  styleUrl: "calcite-stepper-item.scss",
  shadow: true
})
export class CalciteStepperItem {
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

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /** has the step been completed */
  @Prop({ reflect: true, mutable: true }) complete: boolean = false;

  /** optionally display the step number next to the title and subtitle */
  @Prop({ mutable: true }) numbered: boolean = false;

  /** does the step contain an error that needs to be resolved by the user */
  @Prop({ mutable: true }) error: boolean = false;

  /** is the step disabled and not navigable to by a user */
  @Prop({ mutable: true }) disabled: boolean = false;

  /** should the items display an icon based on status */
  @Prop({ mutable: true }) icon: boolean = false;

  /** pass a title for the stepper item */
  @Prop() itemTitle?: string;

  /** pass a title for the stepper item */
  @Prop() itemSubtitle?: string;

  /** pass a title for the stepper item */
  @Prop({ reflect: true, mutable: true }) layout?: string;
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteStepperItemKeyEvent: EventEmitter;
  @Event() calciteStepperItemSelected: EventEmitter;
  @Event() closeCalciteStepperItem: EventEmitter;
  @Event() registerCalciteStepperItem: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad() {
    this.registerCalciteStepperItem.emit({
      position: this.itemPosition
    });
    if (this.active) {
      this.emitRequestedItem();
    }
  }
  componentDidUpdate() {
    if (this.active) {
      this.emitRequestedItem();
    }
  }
  componentWillLoad() {
    this.itemPosition = this.getItemPosition();
    this.itemContent = this.getItemContent();
    this.icon = getElementProp(this.el, "icon", false);
    this.numbered = getElementProp(this.el, "numbered", false);
    this.layout = getElementProp(this.el, "layout", false);
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host
        dir={dir}
        tabindex="0"
        aria-expanded={this.active.toString()}
        onClick={this.itemClickHander}
      >
        <div class="stepper-item-header">
          {this.icon ? this.setIcon() : null}
          {this.numbered ? (
            <div class="stepper-item-number">{this.getItemPosition() + 1}.</div>
          ) : null}
          <div class="stepper-item-header-text">
            <span class="stepper-item-title">{this.itemTitle}</span>
            <span class="stepper-item-subtitle">{this.itemSubtitle}</span>
          </div>
        </div>
        {this.active && this.itemContent ? (
          <div class="stepper-item-content">
            <slot />
          </div>
        ) : null}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown") keyDownHandler(e) {
    if (e.target === this.el) {
      switch (e.keyCode) {
        case SPACE:
        case ENTER:
          this.emitRequestedItem();
          e.preventDefault();
          break;
        case UP:
        case DOWN:
        case LEFT:
        case RIGHT:
        case HOME:
        case END:
          this.calciteStepperItemKeyEvent.emit({ item: e });
          e.preventDefault();
          break;
      }
    }
  }

  @Listen("calciteStepperItemHasChanged", { target: "parent" })
  updateActiveItemOnChange(event: CustomEvent) {
    console.log(event.detail)
    this.requestedStepperItemPosition =
      event.detail.requestedStepperItemPosition;
    this.determineActiveItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  /** position within parent */
  private itemPosition: number;

  /** the latest requested item position*/
  private requestedStepperItemPosition: number;

  /** the slotted item content */
  private itemContent: string | null;

  /** handle clicks on item header */
  private itemClickHander = () => this.emitRequestedItem();

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setIcon() {
    var path = this.error
      ? "exclamationMarkCircle"
      : this.complete
      ? "checkCircle"
      : "circle";
    return (
      <calcite-icon
        icon={path}
        filled
        scale="s"
        class="stepper-item-icon"
      ></calcite-icon>
    );
  }

  private determineActiveItem() {
    this.active =
      this.itemPosition === this.requestedStepperItemPosition && !this.disabled;
  }

  private emitRequestedItem() {
    if (!this.disabled) {
      this.calciteStepperItemSelected.emit({
        requestedStepperItemPosition: this.itemPosition,
        requestedStepperItemContent: this.itemContent
      });
    }
  }

  private getItemContent() {
    return (
      getSlottedElements(this.el, "*")[0] &&
      getSlottedElements(this.el, "*")[0].outerHTML
    );
  }

  private getItemPosition() {
    const parent = this.el.parentElement as HTMLCalciteStepperElement;
    return Array.prototype.indexOf.call(
      parent.querySelectorAll("calcite-stepper-item"),
      this.el
    );
  }
}
