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
import { UP, DOWN, HOME, END } from "../../utils/keys";
import { getElementDir } from "../../utils/dom";
import { guid } from "../../utils/guid";

@Component({
  tag: "calcite-accordion",
  styleUrl: "calcite-accordion.scss",
  shadow: true
})
export class CalciteAccordion {
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

  /** specify the theme of dropdrown, defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** specify the scale of dropdrown, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the appearance, defaults to default */
  @Prop({ mutable: true, reflect: true }) appearance: "default" | "minimal" =
    "default";

  /** specify the placement of the icon, defaults to end */
  @Prop({ mutable: true, reflect: true }) iconPosition: "start" | "end" = "end";

  /** specify the selection mode - defaults to multi */
  @Prop({ mutable: true, reflect: true }) selectionMode:
    | "multi"
    | "single"
    | "single-persist" = "multi";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteAccordionItemHasChanged: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // validate props
    let appearance = ["default", "minimal"];
    if (!appearance.includes(this.appearance)) this.appearance = "default";

    let iconPosition = ["start", "end"];
    if (!iconPosition.includes(this.iconPosition)) this.iconPosition = "end";

    let theme = ["light", "dark"];
    if (!theme.includes(this.theme)) this.theme = "light";

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let selectionMode = ["multi", "single", "single-persist"];
    if (!selectionMode.includes(this.selectionMode))
      this.selectionMode = "multi";
  }

  componentDidLoad() {
    if (!this.sorted) {
      this.items = this.sortItems(this.items);
      this.sorted = true;
    }
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir} id={this.accordionId} tabindex="-1">
        <div class="calcite-accordion-wrapper" role="menu">
          <slot />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteAccordionItemKeyEvent") calciteAccordionItemKeyEvent(
    item: CustomEvent
  ) {
    let e = item.detail.item;
    let itemToFocus = e.target;
    let isFirstItem = this.itemIndex(itemToFocus) === 0;
    let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
    switch (e.keyCode) {
      case DOWN:
        if (isLastItem) this.focusFirstItem();
        else this.focusNextItem(itemToFocus);
        break;
      case UP:
        if (isFirstItem) this.focusLastItem();
        else this.focusPrevItem(itemToFocus);
        break;
      case HOME:
        this.focusFirstItem();
        break;
      case END:
        this.focusLastItem();
        break;
    }
  }

  @Listen("registerCalciteAccordionItem") registerCalciteAccordionItem(
    e: CustomEvent
  ) {
    const item = {
      item: e.detail.item as HTMLCalciteAccordionItemElement,
      position: e.detail.position
    };
    this.items.push(item);
  }

  @Listen("calciteAccordionItemSelected") updateActiveItemOnChange(
    event: CustomEvent
  ) {
    this.requestedAccordionItem = event.detail.requestedAccordionItem;
    this.calciteAccordionItemHasChanged.emit({
      requestedAccordionItem: this.requestedAccordionItem
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of Accordion items */
  private items = [];

  /** keep track of whether the items have been sorted so we don't re-sort */
  private sorted = false;

  /** keep track of the requested item for multi mode */
  private requestedAccordionItem: string = "";

  /** unique id for accordion */
  private accordionId = `calcite-accordion-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private focusFirstItem() {
    const firstItem = this.items[0];
    this.getFocusableElement(firstItem);
  }

  private focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    this.getFocusableElement(lastItem);
  }

  private focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    this.getFocusableElement(nextItem);
  }

  private focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.getFocusableElement(prevItem);
  }

  private itemIndex(e) {
    return this.items.indexOf(e);
  }

  private getFocusableElement(item) {
    const target = item as HTMLCalciteAccordionItemElement;
    target.focus();
  }

  private sortItems = (items: any[]): any[] =>
    items.sort((a, b) => a.position - b.position).map(a => a.item);
}
