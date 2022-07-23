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
import { getElementDir, getElementProp, getSlotted, toAriaBoolean } from "../../utils/dom";
import {
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
  ConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { CSS_UTILITY } from "../../utils/resources";
import { SLOTS, CSS } from "./resources";
import { Position } from "../interfaces";

/**
 * @slot - A slot for adding custom content, including nested `calcite-accordion-item`s.
 */
@Component({
  tag: "calcite-accordion-item",
  styleUrl: "accordion-item.scss",
  shadow: true
})
export class AccordionItem implements ConditionalSlotComponent {
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

  /**
   * When true, the component is active.
   *
   * @deprecated use expanded instead
   */

  @Prop({ reflect: true, mutable: true }) active = false;

  @Watch("active")
  activeHandler(value: boolean): void {
    this.expanded = value;
  }

  /** When true, item is expanded */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(value: boolean): void {
    this.active = value;
  }

  /**
   * Specifies a title for the component.
   *
   * @deprecated Use `heading` instead.
   */
  @Prop()
  itemTitle?: string;

  /**
   * Specifies a subtitle for the component.
   *
   * @deprecated Use `description` instead.
   */
  @Prop() itemSubtitle?: string;

  /** Specifies heading text for the component. */
  @Prop() heading?: string;

  /** Specifies a description for the component. */
  @Prop() description: string;

  /** Specifies an icon to display - accepts Calcite UI icon names. */
  @Prop({ reflect: true }) icon?: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteInternalAccordionItemKeyEvent: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteInternalAccordionItemSelect: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteInternalAccordionItemClose: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteInternalAccordionItemRegister: EventEmitter;

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
    const isExpanded = this.active || this.expanded;
    if (isExpanded) {
      this.activeHandler(isExpanded);
      this.expandedHandler(isExpanded);
    }
    connectConditionalSlotComponent(this);
  }

  componentDidLoad(): void {
    this.itemPosition = this.getItemPosition();
    this.calciteInternalAccordionItemRegister.emit({
      parent: this.parent,
      position: this.itemPosition
    });
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderActionsStart(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsStart) ? (
      <div class={CSS.actionsStart}>
        <slot name={SLOTS.actionsStart} />
      </div>
    ) : null;
  }

  renderActionsEnd(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsEnd) ? (
      <div class={CSS.actionsEnd}>
        <slot name={SLOTS.actionsEnd} />
      </div>
    ) : null;
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const iconEl = <calcite-icon class={CSS.icon} icon={this.icon} scale="s" />;
    return (
      <Host>
        <div
          class={{
            [`icon-position--${this.iconPosition}`]: true,
            [`icon-type--${this.iconType}`]: true
          }}
        >
          <div class={{ [CSS.header]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
            {this.renderActionsStart()}
            <div
              aria-expanded={toAriaBoolean(this.active || this.expanded)}
              class={CSS.headerContent}
              onClick={this.itemHeaderClickHandler}
              role="button"
              tabindex="0"
            >
              {this.icon ? iconEl : null}
              <div class={CSS.headerText}>
                <span class={CSS.heading}>{this.heading || this.itemTitle}</span>
                {this.itemSubtitle || this.description ? (
                  <span class={CSS.description}>{this.description || this.itemSubtitle}</span>
                ) : null}
              </div>
              <calcite-icon
                class={CSS.expandIcon}
                icon={
                  this.iconType === "chevron"
                    ? "chevronDown"
                    : this.iconType === "caret"
                    ? "caretDown"
                    : this.expanded || this.active
                    ? "minus"
                    : "plus"
                }
                scale="s"
              />
            </div>
            {this.renderActionsEnd()}
          </div>
          <div class={CSS.content}>
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

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    if (event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.emitRequestedItem();
          event.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "Home":
        case "End":
          this.calciteInternalAccordionItemKeyEvent.emit({
            parent: this.parent,
            item: event
          });
          event.preventDefault();
          break;
      }
    }
  }

  @Listen("calciteInternalAccordionChange", { target: "body" })
  updateActiveItemOnChange(event: CustomEvent): void {
    this.requestedAccordionItem = event.detail
      .requestedAccordionItem as HTMLCalciteAccordionItemElement;
    if (this.el.parentNode !== this.requestedAccordionItem.parentNode) {
      return;
    }
    this.determineActiveItem();
    event.stopPropagation();
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
          this.expanded = !this.expanded;
        }
        break;

      case "single":
        this.expanded = this.el === this.requestedAccordionItem ? !this.expanded : false;
        break;

      case "single-persist":
        this.expanded = this.el === this.requestedAccordionItem;
        break;
    }
  }

  private emitRequestedItem(): void {
    this.calciteInternalAccordionItemSelect.emit({
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
