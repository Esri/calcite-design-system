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
    this.itemPosition = this.getItemPosition();
    this.registerCalciteDropdownItem.emit({
      position: this.itemPosition
    });
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

  @Listen("click") onClick() {
    this.emitRequestedItem();
  }

  @Listen("mouseover") onMouseover(e) {
    this.calciteDropdownItemMouseover.emit(e);
  }

  @Listen("keydown") keyDownHandler(e) {
    switch (e.keyCode) {
      case SPACE:
      case ENTER:
        this.emitRequestedItem();
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

  @Listen("registerCalciteDropdownGroup", { target: "parent" })
  registerCalciteDropdownGroup(event: CustomEvent) {
    this.currentDropdownGroup = event.detail.groupId;
  }

  @Listen("calciteDropdownItemHasChanged", { target: "parent" })
  updateActiveItemOnChange(event: CustomEvent) {
    this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
    this.requestedDropdownItem = event.detail.requestedDropdownItem;
    this.determineActiveItem();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  private dropdownItemId = `calcite-dropdown-item-${guid()}`;

  /** position withing group */
  private itemPosition: number;

  /** id of containing group */
  private currentDropdownGroup: string;

  /** requested group */
  private requestedDropdownGroup: string;

  /** requested item */
  private requestedDropdownItem: string;

  /** what selection mode is the parent dropdown group in */
  private selectionMode = getElementProp(this.el, "selection-mode", "single");

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineActiveItem() {
    switch (this.selectionMode) {
      case "multi":
        if (this.dropdownItemId === this.requestedDropdownItem)
          this.active = !this.active;
        break;

      case "single":
        if (this.dropdownItemId === this.requestedDropdownItem)
          this.active = true;
        else if (this.requestedDropdownGroup === this.currentDropdownGroup)
          this.active = false;
        break;

      case "none":
        this.active = false;
        break;
    }
  }

  private emitRequestedItem() {
    this.calciteDropdownItemSelected.emit({
      requestedDropdownItem: this.dropdownItemId,
      requestedDropdownGroup: this.currentDropdownGroup
    });
    this.closeCalciteDropdown.emit();
  }

  private getItemPosition() {
    const group = this.el.closest(
      "calcite-dropdown-group"
    ) as HTMLCalciteDropdownGroupElement;
    return Array.prototype.indexOf.call(
      group.querySelectorAll("calcite-dropdown-item"),
      this.el
    );
  }
}
