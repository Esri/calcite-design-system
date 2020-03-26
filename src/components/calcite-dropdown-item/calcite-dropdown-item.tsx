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
import { getElementProp } from "../../utils/dom";
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

  /** optionally pass an icon to display at the start of an item - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconStart?: string;

  /** optionally pass an icon to display at the end of an item - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconEnd?: string;

  /** optionally pass a href - used to determine if the component should render as anchor */
  @Prop({ reflect: true }) href?: string;
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
    const attributes = this.getAttributes();
    const scale = getElementProp(this.el, "scale", "m");
    const iconScale = scale === "s" || scale === "m" ? "s" : "m";
    const iconStartEl = (
      <calcite-icon
        class="dropdown-item-icon-start"
        icon={this.iconStart}
        scale={iconScale}
      ></calcite-icon>
    );
    const iconEndEl = (
      <calcite-icon
        class="dropdown-item-icon-end"
        icon={this.iconEnd}
        scale={iconScale}
      ></calcite-icon>
    );

    const slottedContent =
      this.iconStart && this.iconEnd ? (
        [iconStartEl, <slot />, iconEndEl]
      ) : this.iconStart ? (
        [iconStartEl, <slot />]
      ) : this.iconEnd ? (
        [<slot />, iconEndEl]
      ) : (
        <slot />
      );

    const contentEl = !this.href ? (
      slottedContent
    ) : (
      <a {...attributes}>{slottedContent}</a>
    );
    return (
      <Host

        tabindex="0"
        role="menuitem"
        selection-mode={this.selectionMode}
        aria-selected={this.active.toString()}
        isLink={this.href}
      >
        {this.selectionMode === "multi" ? (
          <calcite-icon
            class="dropdown-item-check-icon"
            scale="s"
            icon="check"
          />
        ) : null}
        {contentEl}
      </Host>
    );
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

  private getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    let props = [
      "icon-start",
      "icon-end",
      "active",
      "hasText",
      "isLink",
      "dir",
      "id",
      "theme"
    ];
    return Array.from(this.el.attributes)
      .filter(a => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
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
