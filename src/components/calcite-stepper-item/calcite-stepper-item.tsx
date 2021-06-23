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
import { getElementDir, getElementProp } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { Scale } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";

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
  @Prop() disabled = false;

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
  @Watch("disabled") disabledWatcher(): void {
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
  @Event() calciteStepperItemKeyEvent: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteStepperItemSelect: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteStepperItemRegister: EventEmitter;

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

  componentDidLoad(): void {
    this.itemPosition = this.getItemPosition();
    this.itemContent = this.getItemContent();
    this.registerStepperItem();
    if (this.active) {
      this.emitRequestedItem();
    }
  }

  componentDidUpdate(): void {
    if (this.active) {
      this.emitRequestedItem();
    }
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host
        aria-expanded={this.active.toString()}
        onClick={() => this.emitRequestedItem()}
        tabindex={this.disabled ? null : 0}
      >
        <div class={{ container: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
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
            <slot />
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

  @Listen("keydown") keyDownHandler(e: KeyboardEvent): void {
    if (!this.disabled && e.target === this.el) {
      switch (getKey(e.key)) {
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
  }

  @Listen("calciteStepperItemChange", { target: "body" })
  updateActiveItemOnChange(event: CustomEvent): void {
    if (event.target === this.parentStepperEl) {
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
  private itemContent: HTMLElement[] | NodeListOf<any>;

  /** the parent stepper component */
  private parentStepperEl: HTMLCalciteStepperElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

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

  private emitRequestedItem(): void {
    if (!this.disabled) {
      this.calciteStepperItemSelect.emit({
        position: this.itemPosition,
        content: this.itemContent
      });
    }
  }

  private getItemContent(): HTMLElement[] | NodeListOf<any> {
    // handle ie and edge
    return this.el.shadowRoot?.querySelector("slot")
      ? (this.el.shadowRoot.querySelector("slot").assignedNodes({ flatten: true }) as HTMLElement[])
      : this.el.querySelector(".stepper-item-content")
      ? (this.el.querySelector(".stepper-item-content").childNodes as NodeListOf<any>)
      : null;
  }

  private getItemPosition(): number {
    return Array.prototype.indexOf.call(
      this.parentStepperEl.querySelectorAll("calcite-stepper-item"),
      this.el
    );
  }
}
