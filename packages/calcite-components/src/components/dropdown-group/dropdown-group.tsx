import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  VNode,
} from "@stencil/core";
import { Scale, SelectionMode } from "../interfaces";
import { RequestedItem } from "./interfaces";

/**
 * @slot - A slot for adding `calcite-dropdown-item`s.
 */
@Component({
  tag: "calcite-dropdown-group",
  styleUrl: "dropdown-group.scss",
  shadow: {
    delegatesFocus: true,
  },
})
export class DropdownGroup {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies and displays a group title. */
  @Prop({ reflect: true }) groupTitle: string;

  /**
   * Specifies the size of the group inherited from the parent, defaults to `m`.
   *
   * @internal
   */
  @Prop() scale: Scale = "m";

  /**
   * Specifies the selection mode:
   * - `multiple` allows any number of selected items (default),
   * - `single` allows only one selection,
   * - `none` doesn't allow for any selection.
   *
   * @internal
   */
  @Prop() selectionMode: Extract<"none" | "single" | "multiple", SelectionMode> = "multiple";

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
            ["container"]: true,
            [`scale--${this.scale}`]: true,
          }}
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
      requestedDropdownItem: this.requestedDropdownItem,
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDropdownGroupElement;

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
