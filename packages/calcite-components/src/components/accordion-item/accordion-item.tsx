// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit-html/directives/ref.js";
import {
  closestElementCrossShadowBoundary,
  getElementDir,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { getIconScale } from "../../utils/component";
import { FlipContext, Position, Scale, SelectionMode, IconType, Appearance } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import type { Accordion } from "../accordion/accordion";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useT9n } from "../../controllers/useT9n";
import { Heading, HeadingLevel } from "../functional/Heading";
import { SLOTS, CSS, IDS, ICONS } from "./resources";
import { RequestedItem } from "./interfaces";
import { styles } from "./accordion-item.scss";
import T9nStrings from "./assets/t9n/messages.en.json";

declare global {
  interface DeclareElements {
    "calcite-accordion-item": AccordionItem;
  }
}

/**
 * @slot - A slot for adding custom content, including nested `calcite-accordion-item`s.
 * @slot actions-end - A slot for adding `calcite-action`s or content to the end side of the component's header.
 * @slot actions-start - A slot for adding `calcite-action`s or content to the start side of the component's header.
 * @slot content-end - A slot for adding non-actionable elements after the component's header text.
 * @slot content-start - A slot for adding non-actionable elements before the component's header text.
 */
export class AccordionItem extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private headerRef = createRef<HTMLDivElement>();

  private focusSetter = useSetFocus<this>()(this);

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  //#endregion

  //#region State Properties

  @state() hasActionsEnd = false;

  @state() hasActionsStart = false;

  @state() hasContentEnd = false;

  @state() hasContentStart = false;

  //#endregion

  //#region Public Properties

  /**
   * The containing `accordion` element.
   *
   * @private
   */
  @property() accordionParent: Accordion["el"];

  /** Specifies a description for the component. */
  @property() description: string;

  /** When present, expands the component and its contents. */
  @property({ reflect: true }) expanded = false;

  /** Specifies heading text for the component. */
  @property() heading: string;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /**
   * Specifies the appearance of the component. Inherited from the `calcite-accordion`.
   *
   * @private
   */
  @property() appearance: Extract<"solid" | "transparent", Appearance>;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /**
   * Specifies the placement of the icon in the header inherited from the `calcite-accordion`.
   *
   * @private
   */
  @property() iconPosition: Extract<"start" | "end", Position>;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /**
   * Specifies the type of the icon in the header inherited from the `calcite-accordion`.
   *
   * @private
   */
  @property() iconType: Extract<"chevron" | "caret" | "plus-minus", IconType>;

  /**
   * Specifies the size of the component inherited from the `calcite-accordion`.
   *
   * @private
   */
  @property({ reflect: true }) scale: Scale;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.headerRef.value, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's content area is collapsed. */
  calciteAccordionItemCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteAccordionItemExpand = createEvent({ cancelable: false });

  /** @private */
  calciteInternalAccordionItemClose = createEvent({ cancelable: false });

  /** @private */
  calciteInternalAccordionItemSelect = createEvent<RequestedItem>({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
    this.listenOn<CustomEvent>(
      document.body,
      "calciteInternalAccordionChange",
      this.updateActiveItemOnChange,
    );
    this.listenOn<CustomEvent>(
      document,
      "calciteInternalAccordionItemsSync",
      this.accordionItemSyncHandler,
    );
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("expanded") && this.hasUpdated) {
      if (this.expanded) {
        this.calciteAccordionItemExpand.emit();
      } else {
        this.calciteAccordionItemCollapse.emit();
      }
    }
  }

  //#endregion

  //#region Private Methods

  private keyDownHandler(event: KeyboardEvent): void {
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

  private updateActiveItemOnChange(event: CustomEvent): void {
    const [accordion] = event.composedPath();
    const parent = closestElementCrossShadowBoundary(this.el, "calcite-accordion");

    if (accordion !== parent) {
      return;
    }

    this.determineActiveItem(parent.selectionMode, event.detail.requestedAccordionItem);
    event.stopPropagation();
  }

  private accordionItemSyncHandler(event: CustomEvent): void {
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

    this.appearance = closestAccordionParent.appearance;
    this.iconPosition = closestAccordionParent.iconPosition;
    this.iconType = closestAccordionParent.iconType;
    this.scale = closestAccordionParent.scale;
    event.stopPropagation();
  }

  private handleActionsStartSlotChange(event: Event): void {
    this.hasActionsStart = slotChangeHasAssignedElement(event);
  }

  private handleActionsEndSlotChange(event: Event): void {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  }

  private handleContentEndSlotChange(event: Event): void {
    this.hasContentEnd = slotChangeHasAssignedElement(event);
  }

  private handleContentStartSlotChange(event: Event): void {
    this.hasContentStart = slotChangeHasAssignedElement(event);
  }

  /** handle clicks on item header */
  private itemHeaderClickHandler(): void {
    this.emitRequestedItem();
  }

  private determineActiveItem(
    selectionMode: SelectionMode,
    requestedItem: AccordionItem["el"],
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

  //#endregion

  //#region Rendering

  private renderActionsStart(): JsxNode {
    return (
      <div class={CSS.actionsStart} hidden={!this.hasActionsStart}>
        <slot name={SLOTS.actionsStart} onSlotChange={this.handleActionsStartSlotChange} />
      </div>
    );
  }

  private renderActionsEnd(): JsxNode {
    return (
      <div class={CSS.actionsEnd} hidden={!this.hasActionsEnd}>
        <slot name={SLOTS.actionsEnd} onSlotChange={this.handleActionsEndSlotChange} />
      </div>
    );
  }

  private renderContentEnd(): JsxNode {
    return (
      <div class={CSS.slotContentEnd} hidden={!this.hasContentEnd}>
        <slot name={SLOTS.contentEnd} onSlotChange={this.handleContentEndSlotChange} />
      </div>
    );
  }

  private renderContentStart(): JsxNode {
    return (
      <div class={CSS.slotContentStart} hidden={!this.hasContentStart}>
        <slot name={SLOTS.contentStart} onSlotChange={this.handleContentStartSlotChange} />
      </div>
    );
  }

  override render(): JsxNode {
    const { iconFlipRtl, heading, headingLevel, messages, expanded } = this;
    const dir = getElementDir(this.el);
    const expandIconTitle = expanded ? messages.collapse : messages.expand;

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
      <div
        class={{
          [CSS.iconPosition(this.iconPosition)]: true,
          [CSS.iconType(this.iconType)]: true,
        }}
      >
        <div
          class={{
            [CSS.header]: true,
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.headerAppearance(this.appearance)]: true,
          }}
        >
          {this.renderActionsStart()}
          <div
            aria-controls={IDS.section}
            ariaExpanded={expanded}
            class={CSS.headerContent}
            id={IDS.sectionToggle}
            onClick={this.itemHeaderClickHandler}
            ref={this.headerRef}
            role="button"
            tabIndex="0"
          >
            <div class={CSS.headerContainer}>
              {this.renderContentStart()}
              {iconStartEl}
              <div class={CSS.headerText}>
                <Heading class={CSS.heading} level={headingLevel}>
                  {heading}
                </Heading>
                {description ? <span class={CSS.description}>{description}</span> : null}
              </div>
              {iconEndEl}
              {this.renderContentEnd()}
            </div>
            <calcite-icon
              class={CSS.expandIcon}
              icon={
                this.iconType === "chevron"
                  ? ICONS.chevronDown
                  : this.iconType === "caret"
                    ? ICONS.caretDown
                    : expanded
                      ? ICONS.minus
                      : ICONS.plus
              }
              scale={getIconScale(this.scale)}
              title={expandIconTitle}
            />
          </div>
          {this.renderActionsEnd()}
        </div>
        <section aria-labelledby={IDS.sectionToggle} class={CSS.content} id={IDS.section}>
          <slot />
        </section>
      </div>
    );
  }

  //#endregion
}
