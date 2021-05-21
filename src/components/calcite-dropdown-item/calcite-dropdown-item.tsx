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
  VNode
} from "@stencil/core";
import { getAttributes, getElementDir, getElementProp } from "../../utils/dom";
import { ItemKeyboardEvent, ItemRegistration } from "../calcite-dropdown/interfaces";
import { getKey } from "../../utils/key";
import { FlipContext } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { CSS } from "./resources";
import { SelectionMode } from "../calcite-dropdown-group/interfaces";

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

  @Element() el: HTMLCalciteDropdownItemElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true, mutable: true }) active = false;

  /** flip the icon(s) in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: FlipContext;

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

  /**
   * @internal
   */
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

  connectedCallback(): void {
    this.selectionMode = getElementProp(this.el, "selection-mode", "single");
    this.parentDropdownGroupEl = this.el.closest("calcite-dropdown-group");
    if (this.selectionMode === "none") {
      this.active = false;
    }
  }

  componentWillLoad(): void {
    this.itemPosition = this.getItemPosition();
    this.calciteDropdownItemRegister.emit({
      position: this.itemPosition
    });
  }

  render(): VNode {
    const attributes = getAttributes(this.el, [
      "icon-start",
      "icon-end",
      "active",
      "has-text",
      "is-link",
      "dir",
      "id"
    ]);
    const dir = getElementDir(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const iconScale = scale === "l" ? "m" : "s";
    const iconStartEl = (
      <calcite-icon
        class="dropdown-item-icon-start"
        dir={dir}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={iconScale}
      />
    );
    const contentNode = (
      <span class="dropdown-item-content">
        <slot />
      </span>
    );
    const iconEndEl = (
      <calcite-icon
        class="dropdown-item-icon-end"
        dir={dir}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale={iconScale}
      />
    );

    const slottedContent =
      this.iconStart && this.iconEnd
        ? [iconStartEl, contentNode, iconEndEl]
        : this.iconStart
        ? [iconStartEl, <slot />]
        : this.iconEnd
        ? [contentNode, iconEndEl]
        : contentNode;

    const contentEl = !this.href ? (
      slottedContent
    ) : (
      <a {...attributes} class="dropdown-link" ref={(el) => (this.childLink = el)}>
        {slottedContent}
      </a>
    );

    const itemRole = this.href
      ? null
      : this.selectionMode === "single"
      ? "menuitemradio"
      : this.selectionMode === "multi"
      ? "menuitemcheckbox"
      : "menuitem";

    const itemAria = this.selectionMode !== "none" ? this.active.toString() : null;

    return (
      <Host aria-checked={itemAria} role={itemRole} tabindex="0">
        <div
          class={{
            container: true,
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.containerLink]: !!this.href,
            [CSS.containerSmall]: scale === "s",
            [CSS.containerMedium]: scale === "m",
            [CSS.containerLarge]: scale === "l",
            [CSS.containerMulti]: this.selectionMode === "multi",
            [CSS.containerSingle]: this.selectionMode === "single",
            [CSS.containerNone]: this.selectionMode === "none"
          }}
        >
          {this.selectionMode === "multi" ? (
            <calcite-icon class="dropdown-item-check-icon" icon="check" scale="s" />
          ) : null}
          {contentEl}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(): void {
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
        if (this.href) {
          this.childLink.click();
        }
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

  @Listen("calciteDropdownItemChange", { target: "body" })
  updateActiveItemOnChange(event: CustomEvent): void {
    const parentEmittedChange = event.composedPath().includes(this.parentDropdownGroupEl);

    if (parentEmittedChange) {
      this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
      this.requestedDropdownItem = event.detail.requestedDropdownItem;
      this.determineActiveItem();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** position withing group */
  private itemPosition: number;

  /** id of containing group */
  private parentDropdownGroupEl: HTMLCalciteDropdownGroupElement;

  /** requested group */
  private requestedDropdownGroup: HTMLCalciteDropdownGroupElement;

  /** requested item */
  private requestedDropdownItem: HTMLCalciteDropdownItemElement;

  /** what selection mode is the parent dropdown group in */
  private selectionMode: SelectionMode;

  /** if href is requested, track the rendered child link*/
  private childLink: HTMLAnchorElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private determineActiveItem(): void {
    switch (this.selectionMode) {
      case "multi":
        if (this.el === this.requestedDropdownItem) {
          this.active = !this.active;
        }
        break;

      case "single":
        if (this.el === this.requestedDropdownItem) {
          this.active = true;
        } else if (this.requestedDropdownGroup === this.parentDropdownGroupEl) {
          this.active = false;
        }
        break;

      case "none":
        this.active = false;
        break;
    }
  }

  private emitRequestedItem(): void {
    this.calciteDropdownItemSelect.emit({
      requestedDropdownItem: this.el,
      requestedDropdownGroup: this.parentDropdownGroupEl
    });
  }

  private getItemPosition(): number {
    const group = this.el.closest("calcite-dropdown-group") as HTMLCalciteDropdownGroupElement;

    return group
      ? Array.prototype.indexOf.call(group.querySelectorAll("calcite-dropdown-item"), this.el)
      : 1;
  }
}
