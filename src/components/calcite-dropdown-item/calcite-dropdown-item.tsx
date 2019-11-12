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
import {
  UP,
  DOWN,
  TAB,
  ENTER,
  ESCAPE,
  HOME,
  END,
  SPACE
} from "../../utils/keys";
import {
  getElementDir,
  getElementTheme,
  getElementProp
} from "../../utils/dom";
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
  @Prop() requestedDropdownGroup: string = "";

  /** @internal */
  @Prop() requestedDropdownItem: string = "";

  /** pass an optional href to render an anchor around the link items */
  @Prop() href?: string;

  /** pass an optional title for rendered href */
  @Prop() linkTitle?: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteDropdownItemKeyEvent: EventEmitter;
  @Event() calciteDropdownItemMouseover: EventEmitter;
  @Event() calciteDropdownItemSelected: EventEmitter;
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
    const theme = getElementTheme(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    if (!this.href) {
      return (
        <Host
          theme={theme}
          dir={dir}
          scale={scale}
          id={this.dropdownItemId}
          tabindex="0"
          role="menuitem"
          aria-selected={this.active ? "true" : "false"}
        >
          <slot />
        </Host>
      );
    } else {
      return (
        <Host
          theme={theme}
          dir={dir}
          scale={scale}
          id={this.dropdownItemId}
          tabindex="0"
          role="menuitem"
          aria-selected={this.active ? "true" : "false"}
          isLink
        >
          <a href={this.href} title={this.linkTitle}>
            <slot />
          </a>
        </Host>
      );
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(e) {
    this.emitRequestedItem(e);
  }

  @Listen("mouseover") onMouseover(e) {
    this.calciteDropdownItemMouseover.emit(e);
  }

  @Listen("keydown") keyDownHandler(e) {
    switch (e.keyCode) {
      case SPACE:
      case ENTER:
        this.emitRequestedItem(e);
        if (e.path && e.path[0].nodeName === "A") e.click();
        break;
      case ESCAPE:
        this.closeCalciteDropdown.emit();
        break;
      case TAB:
      case UP:
      case DOWN:
      case HOME:
      case END:
        this.calciteDropdownItemKeyEvent.emit({ item: e });
        break;
    }
    e.preventDefault();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** unique id for dropdown item */
  /** @internal */
  private dropdownItemId = `calcite-dropdown-item-${guid()}`;

  /** position withing group */
  /** @internal */
  private itemPosition: number;

  /** id of containing group */
  /** @internal */
  private currentDropdownGroup: string;

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
      requestedDropdownGroup: (e.target
        .parentElement as HTMLCalciteDropdownGroupElement).id
    });
    this.closeCalciteDropdown.emit();
  }

  private getItemPosition() {
    const group = this.el.parentElement as HTMLCalciteDropdownGroupElement;
    return Array.prototype.indexOf.call(
      group.querySelectorAll("calcite-dropdown-item"),
      this.el
    );
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
