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
  Watch,
} from "@stencil/core";
import { Scale, SelectionMode } from "../interfaces";
import { RequestedItem } from "./interfaces";
import { createObserver } from "../../utils/observers";

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
   * Specifies the selection mode for `calcite-dropdown-item` children, defaults to `single`:
   * - `multiple` allows any number of selected items,
   * - `single` allows only one selection (default),
   * - `none` doesn't allow for any selection.
   */
  @Prop({ reflect: true }) selectionMode: Extract<"none" | "single" | "multiple", SelectionMode> =
    "single";

  @Watch("selectionMode")
  handlePropsChange(): void {
    this.updateItems();
  }

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

  connectedCallback(): void {
    this.updateItems();
  }

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

  private updateItems = (): void => {
    console.log("this.selectionMode", this.selectionMode);
    const items: HTMLCalciteDropdownItemElement[] = Array.from(
      this.el.querySelectorAll("calcite-dropdown-item")
    );
    items.forEach((item) => {
      item.selectionMode = this.selectionMode;
    });
  };

  mutationObserver = createObserver("mutation", () => this.updateItems());

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
