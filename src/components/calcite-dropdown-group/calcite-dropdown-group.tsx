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
import { SelectionMode } from "./interfaces";
import { Scale } from "../interfaces";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding `calcite-dropdown-item`s.
 */
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
  @Event() calciteDropdownItemChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.groupPosition = this.getGroupPosition();
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const scale: Scale = this.scale || getElementProp(this.el, "scale", "m");
    const groupTitle = this.groupTitle ? (
      <span aria-hidden="true" class="dropdown-title">
        {this.groupTitle}
      </span>
    ) : null;

    const dropdownSeparator =
      this.groupPosition > 0 ? <div class="dropdown-separator" role="separator" /> : null;

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

  /** position of group within a dropdown */
  private groupPosition: number;

  /** the requested group */
  private requestedDropdownGroup: HTMLCalciteDropdownGroupElement;

  /** the requested item */
  private requestedDropdownItem: HTMLCalciteDropdownItemElement;

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
}
