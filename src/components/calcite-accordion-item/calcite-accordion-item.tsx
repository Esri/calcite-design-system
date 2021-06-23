import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  VNode
} from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { CSS_UTILITY } from "../../utils/resources";
import { Position } from "../interfaces";

@Component({
  tag: "calcite-accordion-item",
  styleUrl: "calcite-accordion-item.scss",
  shadow: true
})
export class CalciteAccordionItem {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAccordionItemElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true, mutable: true }) active = false;

  /** pass a title for the accordion item */
  @Prop() itemTitle?: string;

  /** pass a title for the accordion item */
  @Prop() itemSubtitle?: string;

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteAccordionItemKeyEvent: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteAccordionItemSelect: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteAccordionItemClose: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteAccordionItemRegister: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.parent = this.el.parentElement as HTMLCalciteAccordionElement;
    this.selectionMode = getElementProp(this.el, "selection-mode", "multi");
    this.iconType = getElementProp(this.el, "icon-type", "chevron");
    this.iconPosition = getElementProp(this.el, "icon-position", this.iconPosition);
  }

  componentDidLoad(): void {
    this.itemPosition = this.getItemPosition();
    this.calciteAccordionItemRegister.emit({
      parent: this.parent,
      position: this.itemPosition
    });
  }

  render(): VNode {
    const dir = getElementDir(this.el);

    const iconEl = <calcite-icon class="accordion-item-icon" icon={this.icon} scale="s" />;

    return (
      <Host aria-expanded={this.active.toString()} tabindex="0">
        <div
          class={{
            [`icon-position--${this.iconPosition}`]: true,
            [`icon-type--${this.iconType}`]: true
          }}
        >
          <div
            class={{ "accordion-item-header": true, [CSS_UTILITY.rtl]: dir === "rtl" }}
            onClick={this.itemHeaderClickHandler}
          >
            {this.icon ? iconEl : null}
            <div class="accordion-item-header-text">
              <span class="accordion-item-title">{this.itemTitle}</span>
              {this.itemSubtitle ? (
                <span class="accordion-item-subtitle">{this.itemSubtitle}</span>
              ) : null}
            </div>
            <calcite-icon
              class="accordion-item-expand-icon"
              icon={
                this.iconType === "chevron"
                  ? "chevronUp"
                  : this.iconType === "caret"
                  ? "caretUp"
                  : this.active
                  ? "minus"
                  : "plus"
              }
              scale="s"
            />
          </div>
          <div class="accordion-item-content">
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
    if (e.target === this.el) {
      switch (getKey(e.key)) {
        case " ":
        case "Enter":
          this.emitRequestedItem();
          e.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "Home":
        case "End":
          this.calciteAccordionItemKeyEvent.emit({
            parent: this.parent,
            item: e
          });
          e.preventDefault();
          break;
      }
    }
  }

  @Listen("calciteAccordionChange", { target: "body" })
  updateActiveItemOnChange(event: CustomEvent): void {
    this.requestedAccordionItem = event.detail
      .requestedAccordionItem as HTMLCalciteAccordionItemElement;
    this.determineActiveItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** the containing accordion element */
  private parent: HTMLCalciteAccordionElement;

  /** position within parent */
  private itemPosition: number;

  /** the latest requested item */
  private requestedAccordionItem: HTMLCalciteAccordionItemElement;

  /** what selection mode is the parent accordion in */
  private selectionMode: string;

  /** what icon position does the parent accordion specify */
  private iconPosition: Position = "end";

  /** what icon type does the parent accordion specify */
  private iconType: string;

  /** handle clicks on item header */
  private itemHeaderClickHandler = (): void => this.emitRequestedItem();
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineActiveItem(): void {
    switch (this.selectionMode) {
      case "multi":
        if (this.el === this.requestedAccordionItem) {
          this.active = !this.active;
        }
        break;

      case "single":
        if (this.el === this.requestedAccordionItem) {
          this.active = !this.active;
        } else {
          this.active = false;
        }
        break;

      case "single-persist":
        this.active = this.el === this.requestedAccordionItem;
        break;
    }
  }

  private emitRequestedItem(): void {
    this.calciteAccordionItemSelect.emit({
      requestedAccordionItem: this.el as HTMLCalciteAccordionItemElement
    });
  }

  private getItemPosition(): number {
    return Array.prototype.indexOf.call(
      this.parent.querySelectorAll("calcite-accordion-item"),
      this.el
    );
  }
}
