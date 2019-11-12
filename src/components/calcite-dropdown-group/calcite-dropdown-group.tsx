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
import { getElementTheme, getElementProp } from "../../utils/dom";
import { guid } from "../../utils/guid";

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

  /** optionally set a group title for display */
  @Prop({ reflect: true }) groupTitle?: string;

  /** specify the selection mode - multi (allow any number of (or no) active items), single (allow and require one active item),
   none (no active items), defaults to single */
  @Prop({ mutable: true, reflect: true }) selectionMode:
    | "multi"
    | "single"
    | "none" = "single";

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

  connectedCallback() {
    // validate props
    let selectionMode = ["multi", "single", "none"];
    if (!selectionMode.includes(this.selectionMode))
      this.selectionMode = "single";
  }

  componentDidLoad() {
    this.groupPosition = this.getGroupPosition();
    this.items = this.sortItems(this.items);
    this.registerCalciteDropdownGroup.emit({
      items: this.items,
      position: this.groupPosition,
      groupId: this.dropdownGroupId
    });
  }

  render() {
    const theme = getElementTheme(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const groupTitle = this.groupTitle ? (
      <span class="dropdown-title">{this.groupTitle}</span>
    ) : null;

    return (
      <Host theme={theme} scale={scale}>
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

  @Listen("registerCalciteDropdownItem") registerCalciteDropdownItem(
    event: CustomEvent
  ) {
    const item = {
      item: event.target as HTMLCalciteDropdownItemElement,
      position: event.detail.position
    };
    this.items.push(item);
    this.requestedDropdownItem = event.detail.requestedDropdownItem;
  }

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

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of dropdown items */
  private items = [];

  /** unique id for dropdown group */
  private dropdownGroupId = `calcite-dropdown-group-${guid()}`;

  /** position of group within a dropdown */
  private groupPosition: number;

  /** the requested group */
  private requestedDropdownGroup: string;

  /** the requested item */
  private requestedDropdownItem: string;

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
