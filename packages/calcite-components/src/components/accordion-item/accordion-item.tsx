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
  State,
  VNode,
} from "@stencil/core";
import {
  closestElementCrossShadowBoundary,
  getElementDir,
  slotChangeHasAssignedElement,
  toAriaBoolean,
} from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { getIconScale } from "../../utils/component";
import { FlipContext, Position, Scale, SelectionMode, IconType } from "../interfaces";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { IconNameOrString } from "../icon/interfaces";
import { SLOTS, CSS, IDS } from "./resources";
import { RequestedItem } from "./interfaces";

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
export class AccordionItem implements LoadableComponent {
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
  @Prop({ reflect: true }) iconStart: IconNameOrString;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /**
   * Specifies the placement of the icon in the header inherited from the `calcite-accordion`.
   *
   * @internal
   */
  @Prop() iconPosition: Extract<"start" | "end", Position>;

  /** Specifies the type of the icon in the header inherited from the `calcite-accordion`.
   *
   * @internal
   */
  @Prop() iconType: Extract<"chevron" | "caret" | "plus-minus", IconType>;

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
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderActionsStart(): VNode {
    return (
      <div class={CSS.actionsStart} hidden={!this.hasActionsStart}>
        <slot name={SLOTS.actionsStart} onSlotchange={this.handleActionsStartSlotChange} />
      </div>
    );
  }

  renderActionsEnd(): VNode {
    return (
      <div class={CSS.actionsEnd} hidden={!this.hasActionsEnd}>
        <slot name={SLOTS.actionsEnd} onSlotchange={this.handleActionsEndSlotChange} />
      </div>
    );
  }

  render(): VNode {
    const { iconFlipRtl } = this;
    const dir = getElementDir(this.el);
    const iconStartEl = this.iconStart ? (
      <calcite-icon
        class={{ [CSS.icon]: true, [CSS.iconStart]: true }}
        flipRtl={iconFlipRtl === "both" || iconFlipRtl === "start"}
        icon={this.iconStart}
        key="icon-start"
        scale={getIconScale(this.scale)}
      />
    ) : null;
    const iconEndEl = this.iconEnd ? (
      <calcite-icon
        class={{ [CSS.iconEnd]: true, [CSS.icon]: true }}
        flipRtl={iconFlipRtl === "both" || iconFlipRtl === "end"}
        icon={this.iconEnd}
        key="icon-end"
        scale={getIconScale(this.scale)}
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
              ref={this.storeHeaderEl}
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
                scale={getIconScale(this.scale)}
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
    const parent = closestElementCrossShadowBoundary(this.el, "calcite-accordion");

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

    const closestAccordionParent = closestElementCrossShadowBoundary(
      accordionItem,
      "calcite-accordion",
    );

    if (accordion !== closestAccordionParent) {
      return;
    }

    this.iconPosition = closestAccordionParent.iconPosition;
    this.iconType = closestAccordionParent.iconType;
    this.scale = closestAccordionParent.scale;
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAccordionItemElement;

  private headerEl: HTMLDivElement;

  @State() hasActionsStart = false;

  @State() hasActionsEnd = false;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.headerEl.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private handleActionsStartSlotChange = (event: Event): void => {
    this.hasActionsStart = slotChangeHasAssignedElement(event);
  };

  private handleActionsEndSlotChange = (event: Event): void => {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  };

  private storeHeaderEl = (el: HTMLDivElement): void => {
    this.headerEl = el;
  };

  /** handle clicks on item header */
  private itemHeaderClickHandler = (): void => this.emitRequestedItem();

  private determineActiveItem(
    selectionMode: SelectionMode,
    requestedItem: HTMLCalciteAccordionItemElement,
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
      requestedAccordionItem: this.el,
    });
  }
}
