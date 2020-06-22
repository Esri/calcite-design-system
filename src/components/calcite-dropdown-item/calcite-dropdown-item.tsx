import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
} from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { ItemKeyboardEvent, ItemRegistration } from "../../interfaces/Dropdown";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-dropdown-item",
  styleUrl: "calcite-dropdown-item.scss",
  shadow: true,
})
export class CalciteDropdownItem {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDropdownItemElement;

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

  @Event() calciteDropdownItemSelect: EventEmitter;

  /** @internal */
  @Event() calciteDropdownItemKeyEvent: EventEmitter<ItemKeyboardEvent>;

  /** @internal */
  @Event() calciteDropdownItemRegister: EventEmitter<ItemRegistration>;

  /** @internal */
  @Event() calciteDropdownCloseRequest: EventEmitter;
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Focuses the selected item. */
  @Method()
  async setFocus(): Promise<void> {
    this.el.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad() {
    this.itemPosition = this.getItemPosition();
    this.calciteDropdownItemRegister.emit({
      position: this.itemPosition,
    });
  }

  render() {
    const attributes = this.getAttributes();
    const dir = getElementDir(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const iconScale = scale === "s" || scale === "m" ? "s" : "m";
    const iconStartEl = (
      <calcite-icon
        class="dropdown-item-icon-start"
        icon={this.iconStart}
        scale={iconScale}
      />
    );
    const iconEndEl = (
      <calcite-icon
        class="dropdown-item-icon-end"
        icon={this.iconEnd}
        scale={iconScale}
      />
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
      <a {...attributes} ref={(el) => (this.childLink = el)}>
        {slottedContent}
      </a>
    );
    return (
      <Host
        dir={dir}
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

  @Listen("keydown") keyDownHandler(e: KeyboardEvent): void {
    switch (getKey(e.key)) {
      case " ":
        this.emitRequestedItem();
        if (this.href) {
          e.preventDefault();
          this.childLink.click();
        }
        break;
      case "Enter":
        this.emitRequestedItem();
        if (this.href) this.childLink.click();
        break;
      case "Escape":
        this.calciteDropdownCloseRequest.emit();
        break;
      case "Tab":
      case "ArrowUp":
      case "ArrowDown":
      case "Home":
      case "End":
        this.calciteDropdownItemKeyEvent.emit({ keyboardEvent: e });
        break;
    }
    e.preventDefault();
  }

  @Listen("calciteDropdownGroupRegister", { target: "parent" })
  registerCalciteDropdownGroup(event: CustomEvent) {
    this.currentDropdownGroup = event.detail.group;
  }

  @Listen("calciteDropdownItemChange", { target: "parent" })
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

  /** position withing group */
  private itemPosition: number;

  /** id of containing group */
  private currentDropdownGroup: HTMLCalciteDropdownGroupElement;

  /** requested group */
  private requestedDropdownGroup: HTMLCalciteDropdownGroupElement;

  /** requested item */
  private requestedDropdownItem: HTMLCalciteDropdownItemElement;

  /** what selection mode is the parent dropdown group in */
  private selectionMode = getElementProp(this.el, "selection-mode", "single");

  /** if href is requested, track the rendered child link*/
  private childLink: HTMLAnchorElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineActiveItem() {
    switch (this.selectionMode) {
      case "multi":
        if (this.el === this.requestedDropdownItem) this.active = !this.active;
        break;

      case "single":
        if (this.el === this.requestedDropdownItem) this.active = true;
        else if (this.requestedDropdownGroup === this.currentDropdownGroup)
          this.active = false;
        break;

      case "none":
        this.active = false;
        break;
    }
  }

  private emitRequestedItem() {
    this.calciteDropdownItemSelect.emit({
      requestedDropdownItem: this.el,
      requestedDropdownGroup: this.currentDropdownGroup,
    });
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
      "theme",
    ];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
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
