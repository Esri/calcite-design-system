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
import { guid } from "../../utils/guid";
import { getElementTheme, getElementProp } from "../../utils/dom";
import DropdownInterface from "../../interfaces/DropdownInterface";

@Component({
  tag: "calcite-dropdown-group",
  styleUrl: "calcite-dropdown-group.scss",
  shadow: true
})
export class CalciteDropdownGroup {
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

  @State() requestedDropdownGroup: string = "";
  @State() requestedDropdownItem: string = "";

  /** optionally set a group title for display */
  @Prop({ reflect: true }) groupTitle?: string = null;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteDropdownItemHasChanged: EventEmitter;
  @Event() registerCalciteDropdownGroup: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad() {
    this.groupPosition = this.getGroupPosition();
    this.items = this.sortItems(this.items);
    this.registerCalciteDropdownGroup.emit({
      items: this.items,
      position: this.groupPosition
    });
  }

  render() {
    const theme = getElementTheme(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const dropdownState = {
      requestedDropdownGroup: this.requestedDropdownGroup,
      requestedDropdownItem: this.requestedDropdownItem
    };

    const groupTitle = this.groupTitle ? (
      <span class="dropdown-title">{this.groupTitle}</span>
    ) : null;

    return (
      <Host theme={theme} scale={scale} id={this.dropdownGroupId}>
        {groupTitle}
        <DropdownInterface.Provider state={dropdownState}>
          <slot />
        </DropdownInterface.Provider>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteDropdownItemSelected") updateActiveItemOnChange(
    event: CustomEvent
  ) {
    this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
    this.requestedDropdownItem = event.detail.requestedDropdownItem;
    this.calciteDropdownItemHasChanged.emit({
      requestedDropdownGroup: this.requestedDropdownGroup,
      requestedDropdownItem: this.requestedDropdownItem
    });
  }

  @Listen("registerCalciteDropdownItem") registerCalciteDropdownItem(
    e: CustomEvent
  ) {
    const item = {
      item: e.detail.item as HTMLCalciteDropdownItemElement,
      position: e.detail.position
    };
    this.items.push(item);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of dropdown items */
  private items = [];

  /** @internal */
  private groupPosition: number;

  /** unique id for dropdown group */
  /** @internal */
  private dropdownGroupId = `calcite-dropdown-group-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getGroupPosition() {
    return Array.prototype.indexOf.call(
      this.el.parentElement.querySelectorAll("calcite-dropdown-group"),
      this.el
    );
  }

  private sortItems = (items: any[]): any[] =>
    items.sort((a, b) => a.position - b.position).map(a => a.item);
}
