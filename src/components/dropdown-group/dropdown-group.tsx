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
import { getElementProp } from "../../utils/dom";
import { RequestedItem, SelectionMode } from "./interfaces";
import { Scale } from "../interfaces";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding `calcite-dropdown-item`s.
 */
@Component({
  tag: "calcite-dropdown-group",
  styleUrl: "dropdown-group.scss",
  shadow: true
})
export class DropdownGroup {
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

  /** Specifies and displays a group title. */
  @Prop({ reflect: true }) groupTitle: string;

  /**
   * Specifies the component's selection mode, where
   * `"multi"` allows any number of (or no) selected `calcite-dropdown-item`s,
   * `"single"` allows and requires one selected `calcite-dropdown-item`, and
   * `"none"` does not allow selection on `calcite-dropdown-item`s.
   */
  @Prop({ reflect: true }) selectionMode: SelectionMode = "single";

  /**
   * Specifies the size of the component.
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
  @Event({ cancelable: false }) calciteInternalDropdownItemChange: EventEmitter<RequestedItem>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.groupPosition = this.getGroupPosition();
  }

  render(): VNode {
    const scale: Scale = this.scale || getElementProp(this.el, "scale", "m");
    const groupTitle = this.groupTitle ? (
      <span aria-hidden="true" class="dropdown-title">
        {this.groupTitle}
      </span>
    ) : null;

    const dropdownSeparator =
      this.groupPosition > 0 ? <div class="dropdown-separator" role="separator" /> : null;

    return (
      <Host aria-label={this.groupTitle} role="group">
        <div
          class={{
            container: true,
            [CSS.containerSmall]: scale === "s",
            [CSS.containerMedium]: scale === "m",
            [CSS.containerLarge]: scale === "l"
          }}
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

  @Listen("calciteInternalDropdownItemSelect")
  updateActiveItemOnChange(event: CustomEvent): void {
    this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
    this.requestedDropdownItem = event.detail.requestedDropdownItem;
    this.calciteInternalDropdownItemChange.emit({
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
