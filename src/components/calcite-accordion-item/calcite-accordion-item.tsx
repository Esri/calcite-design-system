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
import { UP, DOWN, ENTER, HOME, END, SPACE } from "../../utils/keys";
import {
  getElementDir,
  getElementTheme,
  getElementProp
} from "../../utils/dom";
import { guid } from "../../utils/guid";
import { chevronLeft16 } from "@esri/calcite-ui-icons";
import CalciteIcon from "../../utils/CalciteIcon";

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

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /** pass a title for the accordion item */
  @Prop() itemTitle: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteAccordionItemKeyEvent: EventEmitter;
  @Event() calciteAccordionItemSelected: EventEmitter;
  @Event() closeCalciteAccordionItem: EventEmitter;
  @Event() registerCalciteAccordionItem: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad() {
    this.itemPosition = this.getItemPosition();
    this.registerCalciteAccordionItem.emit({
      item: this.el,
      position: this.itemPosition
    });
  }

  render() {
    const dir = getElementDir(this.el);
    const theme = getElementTheme(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const appearance = getElementProp(this.el, "appearance", "default");
    const iconPosition = getElementProp(this.el, "icon-position", "end");
    return (
      <Host
        theme={theme}
        dir={dir}
        scale={scale}
        appearance={appearance}
        icon-position={iconPosition}
        id={this.accordionItemId}
        tabindex="0"
        role="menuitem"
        aria-expanded={this.active ? "true" : "false"}
      >
        <div
          class="accordion-item-header"
          onClick={() => this.emitRequestedItem()}
        >
          <span class="accordion-item-title">{this.itemTitle}</span>
          <div class="accordion-item-icon">
            <CalciteIcon size="16" path={chevronLeft16} />
          </div>
        </div>
        <div class="accordion-item-content">
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

  @Listen("keydown") keyDownHandler(e) {
    switch (e.keyCode) {
      case SPACE:
      case ENTER:
        this.emitRequestedItem();
        e.preventDefault();
        break;
      case UP:
      case DOWN:
      case HOME:
      case END:
        this.calciteAccordionItemKeyEvent.emit({ item: e });
        e.preventDefault();
        break;
    }
  }

  @Listen("calciteAccordionItemHasChanged", { target: "parent" })
  updateActiveItemOnChange(event: CustomEvent) {
    this.requestedAccordionItem = event.detail.requestedAccordionItem;
    this.determineActiveItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** unique id for Accordion item */
  private accordionItemId = `calcite-accordion-item-${guid()}`;

  /** position within parent */
  private itemPosition: number;

  /** the latest requested item */
  private requestedAccordionItem: string;

  /** what selection mode is the parent accordion in */
  private selectionMode = getElementProp(this.el, "selection-mode", "multi");

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineActiveItem() {
    switch (this.selectionMode) {
      case "multi":
        if (this.accordionItemId === this.requestedAccordionItem)
          this.active = !this.active;
        break;

      case "single":
        if (this.accordionItemId === this.requestedAccordionItem)
          this.active = !this.active;
        else this.active = false;
        break;

      case "single-persist":
        this.active = this.accordionItemId === this.requestedAccordionItem;
        break;
    }
  }

  private emitRequestedItem() {
    this.calciteAccordionItemSelected.emit({
      requestedAccordionItem: this.el.id
    });
  }

  private getItemPosition() {
    const parent = this.el.parentElement as HTMLCalciteAccordionElement;
    return Array.prototype.indexOf.call(
      parent.querySelectorAll("calcite-accordion-item"),
      this.el
    );
  }
}
