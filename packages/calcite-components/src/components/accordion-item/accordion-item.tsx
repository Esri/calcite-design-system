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
} from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import {
  closestElementCrossShadowBoundary,
  getElementDir,
  getSlotted,
  toAriaBoolean,
} from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { SLOTS, CSS, IDS } from "./resources";
import { FlipContext, Position, Scale, SelectionMode } from "../interfaces";
import { RequestedItem } from "./interfaces";
import { getMode, Mode } from "../../utils/modePublisher";

/**
 * @slot - A slot for adding custom content, including nested `calcite-accordion-item`s.
 * @slot actions-end - A slot for adding `calcite-action`s or content to the end side of the component's header.
 * @slot actions-start - A slot for adding `calcite-action`s or content to the start side of the component's header.
 */
@Component({
  tag: "calcite-accordion-item",
  styleUrl: "accordion-item.scss",
  shadow: true,
})
export class AccordionItem implements ConditionalSlotComponent {
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

  /**
   * Specifies the placement of the icon in the header inherited from the `calcite-accordion`.
   *
   * @internal
   */
  @Prop() iconPosition: Position;

  /** Specifies the type of the icon in the header inherited from the `calcite-accordion`.
   *
   * @internal
   */
  @Prop() iconType: "chevron" | "caret" | "plus-minus";

  /**
   * The containing `accordion` element.
   *
   * @internal
   */
  @Prop() accordionParent: HTMLCalciteAccordionElement;

  /**
   * Specifies the size of the component inherited from the `calcite-accordion`.
   *
   * @internal
   */
  @Prop() scale: Scale;

  @Prop({ mutable: true, reflect: true }) calciteMode: Mode;

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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad(): void {
    // TODO: check if this attribute is manually set by the user before getting the theme set in local storage.
    // TODO: make this a part of the generic component setup.
    this.calciteMode = getMode();
  }

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
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
            [`icon-type--${this.iconType}`]: true,
          }}
        >
          <div class={{ [CSS.header]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
            {this.renderActionsStart()}
            <div
              aria-controls={IDS.section}
              aria-expanded={toAriaBoolean(this.expanded)}
              class={CSS.headerContent}
              id={IDS.sectionToggle}
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
          <section aria-labelledby={IDS.sectionToggle} class={CSS.content} id={IDS.section}>
            <slot />
          </section>
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
    const [accordion] = event.composedPath();
    const parent = closestElementCrossShadowBoundary<HTMLCalciteAccordionElement>(
      this.el,
      "calcite-accordion"
    );

    if (accordion !== parent) {
      return;
    }

    this.determineActiveItem(parent.selectionMode, event.detail.requestedAccordionItem);
    event.stopPropagation();
  }

  @Listen("calciteInternalAccordionItemsSync", { target: "document" })
  accordionItemSyncHandler(event: CustomEvent): void {
    const [accordion] = event.composedPath();
    const accordionItem = this.el;

    // we sync with our accordion parent via event only if the item is wrapped within another component's shadow DOM,
    // otherwise, the accordion parent will sync the item directly

    const willBeSyncedByDirectParent = accordionItem.parentElement === accordion;
    if (willBeSyncedByDirectParent) {
      return;
    }

    const closestAccordionParent = closestElementCrossShadowBoundary<HTMLCalciteAccordionElement>(
      accordionItem,
      "calcite-accordion"
    );

    if (accordion !== closestAccordionParent) {
      return;
    }

    accordionItem.iconPosition = closestAccordionParent.iconPosition;
    accordionItem.iconType = closestAccordionParent.iconType;
    accordionItem.scale = closestAccordionParent.scale;
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAccordionItemElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /** handle clicks on item header */
  private itemHeaderClickHandler = (): void => this.emitRequestedItem();

  private determineActiveItem(
    selectionMode: SelectionMode,
    requestedItem: HTMLCalciteAccordionItemElement
  ): void {
    switch (selectionMode) {
      case "multiple":
        if (this.el === requestedItem) {
          this.expanded = !this.expanded;
        }
        break;

      case "single":
        this.expanded = this.el === requestedItem ? !this.expanded : false;
        break;

      case "single-persist":
        this.expanded = this.el === requestedItem;
        break;
    }
  }

  private emitRequestedItem(): void {
    this.calciteInternalAccordionItemSelect.emit({
      requestedAccordionItem: this.el as HTMLCalciteAccordionItemElement,
    });
  }
}
