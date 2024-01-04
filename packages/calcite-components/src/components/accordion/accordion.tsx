import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  VNode,
  Watch,
} from "@stencil/core";
import { Appearance, Position, Scale, SelectionMode } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { RequestedItem } from "./interfaces";
/**
 * @slot - A slot for adding `calcite-accordion-item`s. `calcite-accordion` cannot be nested, however `calcite-accordion-item`s can.
 */
@Component({
  tag: "calcite-accordion",
  styleUrl: "accordion.scss",
  shadow: true,
})
export class Accordion {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance of the component. */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /** Specifies the placement of the icon in the header. */
  @Prop({ reflect: true }) iconPosition: Position = "end";

  /** Specifies the type of the icon in the header. */
  @Prop({ reflect: true }) iconType: "chevron" | "caret" | "plus-minus" = "chevron";

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the selection mode of the component:
   *
   * `"multiple"`: Allows any number of selections.
   *
   * `"single"`: Allows only one selection.
   *
   * `"single-persist"`: Allows one selection and prevents de-selection.
   */
  @Prop({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "multiple",
    SelectionMode
  > = "multiple";

  @Watch("iconPosition")
  @Watch("iconType")
  @Watch("scale")
  @Watch("selectionMode")
  handlePropsChange(): void {
    this.updateAccordionItems();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false }) private calciteInternalAccordionChange: EventEmitter<RequestedItem>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true });
    this.updateAccordionItems();
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  render(): VNode {
    const transparent = this.appearance === "transparent";
    return (
      <div
        class={{
          "accordion--transparent": transparent,
          accordion: !transparent,
        }}
      >
        <slot />
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalAccordionItemSelect")
  updateActiveItemOnChange(event: CustomEvent): void {
    this.calciteInternalAccordionChange.emit({
      requestedAccordionItem: event.detail.requestedAccordionItem,
    });
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAccordionElement;

  mutationObserver = createObserver("mutation", () => this.updateAccordionItems());

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private updateAccordionItems(): void {
    this.el.querySelectorAll("calcite-accordion-item").forEach((item) => {
      item.iconPosition = this.iconPosition;
      item.iconType = this.iconType;
      item.scale = this.scale;
    });

    // sync props on items across shadow DOM
    document.dispatchEvent(new CustomEvent("calciteInternalAccordionItemsSync"));
  }
}
