import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode
} from "@stencil/core";
import { FlipContext } from "../interfaces";
import { Direction, getElementDir, slotChangeGetAssignedElements } from "../../utils/dom";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import { MenuItemEvent } from "./interfaces";

@Component({
  tag: "calcite-menu-item",
  styleUrl: "menu-item.scss",
  shadow: true
})
export class CalciteMenuItem implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el!: HTMLCalciteMenuItemElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, the component is highlighted.  */
  @Prop({ reflect: true, mutable: true }) active: boolean;

  /** When true, the component displays a visual indication of breadcrumb */
  @Prop({ reflect: true }) breadcrumb: boolean;

  /** When true and `textEnabled` is true, the `text` will be user-editable, and the component will emit an event. */
  @Prop({ reflect: true }) editable: boolean;

  /** When true, provide a navigable href link */
  @Prop({ reflect: true }) href: string;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop() iconFlipRtl: FlipContext;

  /** Accessible name for the component. */
  @Prop() label: string;

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @mdn [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @Prop({ reflect: true }) rel: string;

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @mdn [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @Prop({ reflect: true }) target: string;

  /** Specifies the text the component displays */
  @Prop({ reflect: true }) text: string;

  /**
   * @internal
   */
  @Prop({ mutable: true }) open = false;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private anchorEl: HTMLAnchorElement;

  private dropDownActionEl: HTMLCalciteActionElement;

  private isFocused: boolean;

  @State() editingActive = false;

  @State() hasSubMenu = false;

  @State() isTopLevelItem: boolean;

  // need to track the parent type of layout to determine if the nested dropdown position absolutely (horizontal parent),
  // or position downward and expand relative (vertical parent)
  @State() topLevelLayout: "vertical" | "horizontal";

  @State() subMenuItems: HTMLCalciteMenuItemElement[];

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.anchorEl.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** @internal */
  @Event({ cancelable: true })
  calciteInternalNavItemKeyEvent: EventEmitter<MenuItemEvent>;

  /** @internal */
  @Event({ cancelable: false })
  calciteInternalNavItemClickEvent: EventEmitter<MouseEvent>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("click", { target: "window" })
  handleClickOut(event: Event): void {
    if (
      this.topLevelLayout !== "vertical" &&
      this.hasSubMenu &&
      this.open &&
      !this.el.contains(event.target as Element)
    ) {
      this.open = false;
    }
  }

  @Listen("focusout")
  handleFocusout(event: FocusEvent): void {
    if (!this.el.contains(event.relatedTarget as Element)) {
      this.open = false;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.active = this.active || this.editable;
    this.isFocused = this.active;
    // todo just get any nav items in the default slot?
    // this.hasSubMenu = this.hasSlottedItems();

    // for now to detect nesting only working two level for demo.need to just check if it has any parent originating at top lvel
    this.isTopLevelItem = !(
      this.el.parentElement?.slot === "menu-item-dropdown" || this.el.slot !== ""
    );
    this.topLevelLayout = this.el.closest("calcite-menu")?.layout || "horizontal";
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private keyDownHandler = async (event: KeyboardEvent): Promise<void> => {
    // todo refactor all of this
    // probably need to maintain index of all "parents" and track where
    // user currently is focused in
    // probably move logic to parent menu, just emit key from here
    switch (event.key) {
      case " ":
      case "Enter":
        if (this.href) {
          if (event.target === this.dropDownActionEl && this.hasSubMenu) {
            if (!this.open) {
              this.focusFirst();
            }
          }
          return;
        } else if (this.hasSubMenu && !this.open) {
          this.open = true;
          this.focusFirst();
        } else if (this.hasSubMenu) {
          this.open = false;
        } else {
          this.calciteInternalNavItemKeyEvent.emit({
            event,
            children: this.subMenuItems
          });
        }
        event.preventDefault();
        break;
      case "Escape":
        if (this.isTopLevelItem) {
          this.calciteInternalNavItemKeyEvent.emit({
            event: event,
            children: this.subMenuItems
          });
          return;
        }
        if (this.open) {
          this.open = false;
        } else {
          if (this.el.parentElement.nodeName === "CALCITE-MENU-ITEM") {
            this.focusParentElement();
          }
        }
        break;
      case "ArrowDown":
        if (this.topLevelLayout === "horizontal") {
          if (this.isTopLevelItem && this.hasSubMenu) {
            if (!!this.href && event.target !== this.dropDownActionEl) {
              return;
            }
            this.open ? this.focusFirst() : (this.open = true);
            return;
          }
          this.calciteInternalNavItemKeyEvent.emit({
            event,
            children: this.subMenuItems
          });
        }
        if (this.topLevelLayout === "vertical") {
          event.preventDefault();
          this.calciteInternalNavItemKeyEvent.emit({
            event: event,

            children: this.subMenuItems
          });
        }
        break;

      case "ArrowUp":
        if (this.topLevelLayout === "horizontal") {
          if (this.isTopLevelItem && this.hasSubMenu) {
            if (!!this.href && event.target !== this.dropDownActionEl) {
              return;
            }
            this.open ? this.focusLast() : (this.open = true);
            return;
          }
          this.calciteInternalNavItemKeyEvent.emit({
            event: event,
            children: this.subMenuItems
          });
        }

        if (this.topLevelLayout === "vertical") {
          event.preventDefault();
          this.calciteInternalNavItemKeyEvent.emit({
            event: event,
            children: this.subMenuItems
          });
        }
        break;
      case "ArrowLeft":
        if (this.topLevelLayout === "horizontal") {
          if (this.isTopLevelItem) {
            this.calciteInternalNavItemKeyEvent.emit({
              event: event,
              children: this.subMenuItems
            });
            return;
          }
          if (this.el.parentElement.nodeName === "CALCITE-MENU-ITEM") {
            this.focusParentElement();
          }
        } else {
          if (this.hasSubMenu && this.open) {
            this.open = false;
            return;
          }
          if (this.el.parentElement.nodeName === "CALCITE-MENU-ITEM") {
            const parentEl = this.el.parentElement as HTMLCalciteMenuItemElement;
            parentEl.setFocus();
          }
        }
        break;

      case "ArrowRight":
        if (this.topLevelLayout === "horizontal") {
          if (this.isTopLevelItem) {
            this.calciteInternalNavItemKeyEvent.emit({
              event: event,
              children: this.subMenuItems
            });
            return;
          }
          if (this.hasSubMenu) {
            this.open = true;
            setTimeout(() => this.focusFirst(), 1000);
          } else {
            //this code block will close all the submenus and move on to the next item in menubar
            // const menuBarItem = getMenubarItem(this.el);
            // const childrenItems = getSlotted(this.el.closest("calcite-menu"), "", {
            //   all: true,
            //   matches: "calcite-menu-item"
            // });
            // focusElementInGroup(childrenItems, menuBarItem, "next");
          }
        } else {
          if (this.hasSubMenu) {
            if (!!this.href && event.target !== this.dropDownActionEl) {
              return;
            }
            if (!this.open) {
              this.open = true;
            } else {
              this.focusFirst();
            }
          }
        }

        break;
    }
  };

  private clickHandler = (event: MouseEvent): void => {
    this.calciteInternalNavItemClickEvent.emit(event);
    if (this.href && this.open) {
      this.open = false;
    } else if (this.editable && !this.hasSubMenu) {
      this.editingActive = true;
    } else if (!this.href && this.hasSubMenu) {
      this.open = !this.open;
    }
  };

  private toggleEditingState = (): void => {
    this.editingActive = !this.editingActive;
  };

  private handleMenuItemSlotChange = (event: Event): void => {
    // if (this.hasSubMenu) {
    this.subMenuItems = slotChangeGetAssignedElements(event) as HTMLCalciteMenuItemElement[];
    this.hasSubMenu = this.subMenuItems.length > 0;
    // }
  };

  // private hasSlottedItems(): boolean {
  //   return this.el.querySelectorAll("[slot=menu-item-dropdown]").length > 0;
  // }

  private focusFirst(): void {
    this.subMenuItems[0].setFocus();
  }

  private focusLast(): void {
    this.subMenuItems[this.subMenuItems.length - 1].setFocus();
  }

  private focusHandler(event: FocusEvent): void {
    const target = event.target as HTMLCalciteMenuItemElement;
    this.isFocused = true;
    if (target.open) {
      target.open = false;
    }
  }

  private blurHandler(): void {
    this.isFocused = false;
  }

  private focusParentElement(): void {
    const parentEl = this.el.parentElement as HTMLCalciteMenuItemElement;
    parentEl.setFocus();
    parentEl.open = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderIconElStart(): VNode {
    return (
      <calcite-icon
        class="icon icon-start"
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );
  }

  renderIconElEnd(): VNode {
    return (
      <calcite-icon
        class="icon icon-end"
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );
  }

  renderEditIcon(): VNode {
    return (
      <calcite-icon
        class="icon icon-end"
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={"pencil"}
        onClick={this.toggleEditingState}
        scale="s"
      />
    );
  }

  renderEditSaveButton(): VNode {
    return (
      <calcite-button
        appearance="outline-fill"
        icon-start="save"
        iconFlipRtl={this.iconFlipRtl}
        onClick={this.toggleEditingState}
        style={{ ["--calcite-ui-icon-color"]: "var(--calcite-ui-brand)" }}
      />
    );
  }

  renderEditCancelButton(): VNode {
    return (
      <calcite-button
        appearance="transparent"
        icon-start="trash"
        onClick={this.toggleEditingState}
        style={{ ["--calcite-ui-icon-color"]: "var(--calcite-ui-border-input)" }}
      />
    );
  }

  renderBreadcrumbIcon(dir: Direction): VNode {
    return (
      <calcite-icon
        class="icon icon-breadcrumb"
        icon={dir === "rtl" ? "chevron-left" : "chevron-right"}
        scale="s"
      />
    );
  }

  renderDropdownIcon(dir: Direction): VNode {
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";

    return (
      <calcite-icon
        class="icon icon-dropdown"
        icon={
          this.topLevelLayout === "vertical" || this.isTopLevelItem
            ? this.open
              ? "chevron-up"
              : "chevron-down"
            : dirChevron
        }
        id="render-dropdown-icon"
        scale="s"
      />
    );
  }

  renderDropdownAction(dir: Direction): VNode {
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-action
        class="dropdown-with-href-toggle"
        icon={
          this.topLevelLayout === "vertical" || this.isTopLevelItem
            ? this.open
              ? "chevron-up"
              : "chevron-down"
            : dirChevron
        }
        onClick={() => (this.open = !this.open)}
        onKeyDown={this.keyDownHandler}
        // role="none"
        text="open-dropdown"
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.dropDownActionEl = el)}
      />
    );
  }

  rendersubMenuItems(dir: Direction): VNode {
    return (
      <calcite-menu
        class={{
          "dropdown-menu-items": true,
          open: this.open,
          nested: !this.isTopLevelItem,
          "is-rtl": dir === "rtl",
          "is-vertical-dropdown-type": this.topLevelLayout === "vertical"
        }}
        layout="vertical"
        role="menu"
      >
        <slot name="menu-item-dropdown" onSlotchange={this.handleMenuItemSlotChange} />
      </calcite-menu>
    );
  }

  renderItemContent(dir: Direction): VNode {
    return (
      <Fragment>
        {this.iconStart && this.renderIconElStart()}
        <div class="text-container">
          <span contenteditable={this.editingActive ? true : undefined}>{this.text}</span>
          {this.editingActive ? (
            <div class="editable-content">
              {this.renderEditCancelButton()}
              {this.renderEditSaveButton()}
            </div>
          ) : null}
        </div>
        {this.iconEnd && !this.editingActive && this.renderIconElEnd()}
        {this.editable && !this.editingActive && this.renderEditIcon()}
        {!this.href && this.hasSubMenu ? this.renderDropdownIcon(dir) : null}
        {this.breadcrumb ? this.renderBreadcrumbIcon(dir) : null}
      </Fragment>
    );
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host onBlur={this.blurHandler} onFocus={this.focusHandler}>
        <li
          class={{
            container: true,
            "nav-item-vertical-parent": this.topLevelLayout === "vertical"
          }}
          role="none"
        >
          <div class="item-content">
            <a
              aria-current={this.isFocused ? "page" : false}
              aria-expanded={this.open ? "true" : "false"}
              aria-haspopup={this.hasSubMenu ? "true" : undefined}
              aria-label={this.label || this.text}
              class={{
                "layout--vertical": true
              }}
              href={this.href ? this.href : null}
              onClick={this.clickHandler}
              onKeyDown={this.keyDownHandler}
              ref={(el) => (this.anchorEl = el)}
              rel={this.rel ? this.rel : null}
              role="menuitem"
              tabIndex={this.isTopLevelItem ? 0 : -1}
              target={this.target ? this.target : null}
            >
              {this.renderItemContent(dir)}
              {this.href && this.topLevelLayout === "vertical" ? (
                <calcite-icon
                  class="hover-href-icon"
                  icon={dir === "rtl" ? "arrow-left" : "arrow-right"}
                  scale="s"
                />
              ) : null}
            </a>
            {this.href && this.hasSubMenu ? this.renderDropdownAction(dir) : null}
          </div>
          {this.rendersubMenuItems(dir)}
        </li>
      </Host>
    );
  }
}
