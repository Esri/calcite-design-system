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
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { getElementDir, getElementProp, getSlotted, toAriaBoolean } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { SLOTS, CSS } from "./resources";
import { FlipContext, Position, Scale } from "../interfaces";
import { RegistryEntry, RequestedItem } from "./interfaces";

/**
 * @slot - A slot for adding custom content, including nested `calcite-accordion-item`s.
 * @slot actions-end - A slot for adding `calcite-action`s or content to the end side of the component's header.
 * @slot actions-start - A slot for adding `calcite-action`s or content to the start side of the component's header.
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

  /** When `true`, the component is expanded. */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  /** Specifies heading text for the component. */
  @Prop() heading: string;

  /** Specifies a description for the component. */
  @Prop() description: string;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalAccordionItemSelect: EventEmitter<RequestedItem>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalAccordionItemClose: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalAccordionItemRegister: EventEmitter<RegistryEntry>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.parent = this.el.parentElement as HTMLCalciteAccordionElement;
    this.iconType = getElementProp(this.el, "icon-type", "chevron");
    this.iconPosition = getElementProp(this.el, "icon-position", this.iconPosition);
    this.scale = getElementProp(this.el, "scale", this.scale);

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
    const { iconFlipRtl } = this;
    const dir = getElementDir(this.el);
    const iconStartEl = this.iconStart ? (
      <calcite-icon
        class={CSS.iconStart}
        flipRtl={iconFlipRtl === "both" || iconFlipRtl === "start"}
        icon={this.iconStart}
        key="icon-start"
        scale={this.scale === "l" ? "m" : "s"}
      />
    ) : null;
    const iconEndEl = this.iconEnd ? (
      <calcite-icon
        class={CSS.iconEnd}
        flipRtl={iconFlipRtl === "both" || iconFlipRtl === "end"}
        icon={this.iconEnd}
        key="icon-end"
        scale={this.scale === "l" ? "m" : "s"}
      />
    ) : null;
    const { description } = this;
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
              aria-expanded={toAriaBoolean(this.expanded)}
              class={CSS.headerContent}
              onClick={this.itemHeaderClickHandler}
              role="button"
              tabindex="0"
            >
              <div class={CSS.headerContainer}>
                {iconStartEl}
                <div class={CSS.headerText}>
                  <span class={CSS.heading}>{this.heading}</span>
                  {description ? <span class={CSS.description}>{description}</span> : null}
                </div>
                {iconEndEl}
              </div>
              <calcite-icon
                class={CSS.expandIcon}
                icon={
                  this.iconType === "chevron"
                    ? "chevronDown"
                    : this.iconType === "caret"
                    ? "caretDown"
                    : this.expanded
                    ? "minus"
                    : "plus"
                }
                scale={this.scale === "l" ? "m" : "s"}
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

  /** Specifies the scale of the `accordion-item` controlled by the parent, defaults to m */
  scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineActiveItem(): void {
    this.selectionMode = getElementProp(this.el, "selection-mode", "multiple");
    switch (this.selectionMode) {
      case "multiple":
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
