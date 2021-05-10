import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  VNode
} from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { GroupRegistration, ItemRegistration } from "../calcite-dropdown/interfaces";
import { SelectionMode } from "./interfaces";
import { Scale } from "../interfaces";
import { CSS } from "./resources";

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
  @Prop({ reflect: true }) selectionMode: SelectionMode = "single";

  /**
   * Specifies the size of the action.
   */
  @Prop({ reflect: true }) scale: Scale;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteDropdownGroupRegister: EventEmitter<GroupRegistration>;

  /**
   * @internal
   */
  @Event() calciteDropdownItemChange: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  setDropdownTitleRef = (node: HTMLSpanElement): void => {
    this.titleEl = node;
  };

  setDropdownSeparatorRef = (node: HTMLDivElement): void => {
    this.separatorEl = node;
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.groupPosition = this.getGroupPosition();
  }

  componentDidLoad(): void {
    this.items = this.sortItems(this.items) as HTMLCalciteDropdownItemElement[];
    this.calciteDropdownGroupRegister.emit({
      items: this.items,
      position: this.groupPosition,
      group: this.el,
      titleEl: this.titleEl,
      separatorEl: this.separatorEl
    });
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const scale: Scale = this.scale || getElementProp(this.el, "scale", "m");
    const groupTitle = this.groupTitle ? (
      <span aria-hidden="true" class="dropdown-title" ref={this.setDropdownTitleRef}>
        {this.groupTitle}
      </span>
    ) : null;

    const dropdownSeparator =
      this.groupPosition > 0 ? (
        <div class="dropdown-separator" ref={this.setDropdownSeparatorRef} role="separator" />
      ) : null;

    return (
      <Host role="menu">
        <div
          class={{
            container: true,
            [CSS.containerSmall]: scale === "s",
            [CSS.containerMedium]: scale === "m",
            [CSS.containerLarge]: scale === "l"
          }}
          dir={dir}
          title={this.groupTitle}
        >
          {dropdownSeparator}
          {groupTitle}
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

  @Listen("calciteDropdownItemRegister") registerCalciteDropdownItem(
    event: CustomEvent<ItemRegistration>
  ): void {
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

  @Listen("calciteDropdownItemSelect") updateActiveItemOnChange(event: CustomEvent): void {
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

  private separatorEl: HTMLDivElement = null;

  private titleEl: HTMLSpanElement = null;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getGroupPosition(): number {
    return Array.prototype.indexOf.call(
      this.el.parentElement.querySelectorAll("calcite-dropdown-group"),
      this.el
    );
  }

  private sortItems = (items: any[]): any[] =>
    items.sort((a, b) => a.position - b.position).map((a) => a.item);
}
