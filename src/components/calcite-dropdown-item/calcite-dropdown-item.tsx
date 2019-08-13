import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { guid } from "../../utils/guid";
import DropdownInterface from "../../interfaces/DropdownInterface";

@Component({
  tag: "calcite-dropdown-item",
  styleUrl: "calcite-dropdown-item.scss",
  shadow: true
})
export class CalciteDropdownItem {
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

  /** @internal */
  @Prop() currentDropdownGroup: string = this.el.parentElement.id;

  /** @internal */
  @Prop() requestedDropdownGroup: string = "";

  /** @internal */
  @Prop() requestedDropdownItem: string = "";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteDropdownItemSelected: EventEmitter;
  @Event() calciteDropdownItemKeyEvent: EventEmitter;
  @Event() closeCalciteDropdown: EventEmitter;
  @Event() registerCalciteDropdownItem: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad() {
    this.currentDropdownGroup = this.el.parentElement.id;
    this.itemPosition = this.getItemPosition();

    this.registerCalciteDropdownItem.emit({
      item: this.el,
      position: this.itemPosition
    });
  }

  componentDidUpdate() {
    this.determineActiveItem();
  }

  render() {
    const dir = getElementDir(this.el);
    const selected = this.active ? "true" : null;
    return (
      <Host
        dir={dir}
        id={this.dropdownItemId}
        tabindex="0"
        role="menuitem"
        aria-selected={selected}
      >
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(e) {
    this.emitRequestedItem(e);
  }

  @Listen("keydown") keyDownHandler(e) {
    switch (e.key) {
      case " ":
      case "Enter":
        this.emitRequestedItem(e);
        break;
      case "Escape":
        this.closeCalciteDropdown.emit();
        break;
      case "Tab":
      case "ArrowUp":
      case "ArrowDown":
      case "Home":
      case "End":
        this.calciteDropdownItemKeyEvent.emit({ item: e });
        break;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** unique id for dropdown item */
  /** @internal */
  private dropdownItemId = `calcite-dropdown-item-${guid()}`;

  /** @internal */
  @State() private itemPosition: number;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineActiveItem() {
    if (this.requestedDropdownItem === this.dropdownItemId) {
      this.active = true;
    } else if (this.requestedDropdownGroup === this.currentDropdownGroup) {
      this.active = false;
    }
  }

  private emitRequestedItem(e) {
    this.calciteDropdownItemSelected.emit({
      requestedDropdownItem: e.target.id,
      requestedDropdownGroup: e.target.parentElement.id
    });
    this.closeCalciteDropdown.emit();
  }

  private getItemPosition() {
    const itemPosition = Array.prototype.indexOf.call(
      this.el.parentElement.querySelectorAll("calcite-dropdown-item"),
      this.el
    );
    return itemPosition;
  }
}

//--------------------------------------------------------------------------
//
//  Inject Props
//
//--------------------------------------------------------------------------

DropdownInterface.injectProps(CalciteDropdownItem, [
  "requestedDropdownItem",
  "requestedDropdownGroup"
]);
