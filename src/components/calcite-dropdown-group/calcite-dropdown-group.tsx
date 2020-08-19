import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop } from "@stencil/core";
import { GroupRegistration, ItemRegistration } from "../../interfaces/Dropdown";

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
  @Element() el: HTMLCalciteDropdownGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** optionally set a group title for display */
  @Prop({ reflect: true }) groupTitle?: string;

  /** specify the selection mode - multi (allow any number of (or no) active items), single (allow and require one active item),
   none (no active items), defaults to single */
  @Prop({ mutable: true, reflect: true }) selectionMode: "multi" | "single" | "none" = "single";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteDropdownGroupRegister: EventEmitter<GroupRegistration>;

  @Event() calciteDropdownItemChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // validate props
    const selectionMode = ["multi", "single", "none"];
    if (!selectionMode.includes(this.selectionMode)) this.selectionMode = "single";
  }

  componentDidLoad() {
    this.groupPosition = this.getGroupPosition();
    this.items = this.sortItems(this.items) as HTMLCalciteDropdownItemElement[];
    this.calciteDropdownGroupRegister.emit({
      items: this.items,
      position: this.groupPosition,
      group: this.el,
      titleEl: this.titleEl
    });
  }

  render() {
    const groupTitle = this.groupTitle ? (
      <span class="dropdown-title" ref={(node) => (this.titleEl = node)}>
        {this.groupTitle}
      </span>
    ) : null;

    return (
      <Host>
        {groupTitle}
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteDropdownItemRegister") registerCalciteDropdownItem(
    event: CustomEvent<ItemRegistration>
  ) {
    const item = event.target as HTMLCalciteDropdownItemElement;

    if (this.selectionMode === "none") {
      item.active = false;
    }

    this.items.push({
      item,
      position: event.detail.position
    });

    event.stopPropagation();
  }

  @Listen("calciteDropdownItemSelect") updateActiveItemOnChange(event: CustomEvent) {
    this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
    this.requestedDropdownItem = event.detail.requestedDropdownItem;
    this.calciteDropdownItemChange.emit({
      requestedDropdownGroup: this.requestedDropdownGroup,
      requestedDropdownItem: this.requestedDropdownItem
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of dropdown items */
  private items = [];

  /** position of group within a dropdown */
  private groupPosition: number;

  /** the requested group */
  private requestedDropdownGroup: HTMLCalciteDropdownGroupElement;

  /** the requested item */
  private requestedDropdownItem: HTMLCalciteDropdownItemElement;

  private titleEl: HTMLSpanElement = null;

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
    items.sort((a, b) => a.position - b.position).map((a) => a.item);
}
