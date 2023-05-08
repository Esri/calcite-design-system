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
import { CSS } from "./resources";
import { MenuItemCustomEvent } from "./interfaces";

type Layout = "horizontal" | "vertical";

@Component({
  tag: "calcite-menu-item",
  styleUrl: "menu-item.scss",
  shadow: true,
  assetsDirs: ["assets"]
})

/**
 * @slot sub-menu-item - A slot for adding `calcite-menu-item`s in submenu.
 */
export class CalciteMenuItem implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteMenuItemElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, the component is highlighted. */
  @Prop({ reflect: true }) active: boolean;

  /** When `true`, the component displays a breadcrumb trail for use as a navigational aid. */
  @Prop({ reflect: true }) breadcrumb: boolean;

  /** Specifies the URL destination of the component, which can be set as an absolute or relative path.*/
  @Prop() href: string;

  /** Specifies an icon to display at the start of the component. */
  @Prop() iconStart: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop() iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop() iconFlipRtl: FlipContext;

  /** Accessible name for the component.*/
  @Prop() label!: string;

  /** When `true`, the component will display any slotted `calcite-menu-item` in an open overflow menu.*/
  @Prop({ mutable: true, reflect: true }) open = false;

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

  /** Specifies the text to display.*/
  @Prop() text: string;

  /**
   * @internal
   */
  @Prop({ reflect: true }) layout: Layout;

  /**
   * @internal
   */
  @Prop() isTopLevelItem = false;

  /**
   * @internal
   */
  @Prop() topLevelMenuLayout: Layout;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private anchorEl: HTMLAnchorElement;

  private dropDownActionEl: HTMLCalciteActionElement;

  private isFocused: boolean;

  @State() hasSubMenu = false;

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
  @Event({ cancelable: true }) calciteInternalMenuItemKeyEvent: EventEmitter<MenuItemCustomEvent>;

  /** Emits when the component is selected.*/
  @Event() calciteMenuItemSelect: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("click", { target: "window" })
  handleClickOut(event: Event): void {
    if (
      this.topLevelMenuLayout !== "vertical" &&
      this.hasSubMenu &&
      this.open &&
      !event.composedPath().includes(this.el)
    ) {
      this.open = false;
    }
  }

  @Listen("focusout")
  handleFocusOut(event: FocusEvent): void {
    if (
      this.topLevelMenuLayout !== "vertical" &&
      !this.el.contains(event.relatedTarget as Element)
    ) {
      this.open = false;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.isFocused = this.active;
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

  private blurHandler(): void {
    this.isFocused = false;
  }

  private clickHandler = (event: MouseEvent): void => {
    if ((this.href && event.target === this.dropDownActionEl) || (!this.href && this.hasSubMenu)) {
      this.open = !this.open;
    }
    this.selectMenuItem(event);
  };

  private focusHandler(event: FocusEvent): void {
    const target = event.target as HTMLCalciteMenuItemElement;
    this.isFocused = true;
    if (target.open && !this.open) {
      target.open = false;
    }
  }

  private handleMenuItemSlotChange = (event: Event): void => {
    this.subMenuItems = slotChangeGetAssignedElements(event) as HTMLCalciteMenuItemElement[];
    this.subMenuItems.forEach((item) => {
      if (!item.topLevelMenuLayout) {
        item.topLevelMenuLayout = this.topLevelMenuLayout;
      }
    });
    this.hasSubMenu = this.subMenuItems.length > 0;
  };

  private keyDownHandler = async (event: KeyboardEvent): Promise<void> => {
    // opening and closing of submenu is handled here. Any other functionality is bubbled to parent menu.
    switch (event.key) {
      case " ":
      case "Enter":
        this.selectMenuItem(event);
        if (
          this.hasSubMenu &&
          (!this.href || (this.href && event.target === this.dropDownActionEl))
        ) {
          this.open = !this.open;
        }
        event.preventDefault();
        break;
      case "Escape":
        if (this.open) {
          this.open = false;
          return;
        }
        this.calciteInternalMenuItemKeyEvent.emit({ event });
        event.preventDefault();
        break;
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (
          (event.target === this.dropDownActionEl || !this.href) &&
          this.hasSubMenu &&
          !this.open &&
          this.layout === "horizontal"
        ) {
          this.open = true;
          return;
        }
        this.calciteInternalMenuItemKeyEvent.emit({
          event,
          children: this.subMenuItems,
          isSubMenuOpen: this.open && this.hasSubMenu
        });
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.calciteInternalMenuItemKeyEvent.emit({
          event,
          children: this.subMenuItems,
          isSubMenuOpen: true
        });
        break;

      case "ArrowRight":
        event.preventDefault();
        if (
          (event.target === this.dropDownActionEl || !this.href) &&
          this.hasSubMenu &&
          !this.open &&
          this.layout === "vertical"
        ) {
          this.open = true;
          return;
        }
        this.calciteInternalMenuItemKeyEvent.emit({
          event,
          children: this.subMenuItems,
          isSubMenuOpen: this.open && this.hasSubMenu
        });
        break;
    }
  };

  private selectMenuItem(event: MouseEvent | KeyboardEvent): void {
    if (event.target !== this.dropDownActionEl) {
      this.calciteMenuItemSelect.emit();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderIconElStart(): VNode {
    return (
      <calcite-icon
        class={{
          [CSS.icon]: true,
          [CSS.iconStart]: true
        }}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale="s"
      />
    );
  }

  renderIconElEnd(): VNode {
    return (
      <calcite-icon
        class={{
          [CSS.icon]: true,
          [CSS.iconEnd]: true
        }}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale="s"
      />
    );
  }

  renderBreadcrumbIcon(dir: Direction): VNode {
    return (
      <calcite-icon
        class={{
          [CSS.icon]: true,
          [CSS.iconBreadcrumb]: true
        }}
        icon={dir === "rtl" ? "chevron-left" : "chevron-right"}
        scale="s"
      />
    );
  }

  renderDropdownIcon(dir: Direction): VNode {
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-icon
        class={{
          [CSS.icon]: true,
          [CSS.iconDropdown]: true
        }}
        icon={
          this.topLevelMenuLayout === "vertical" || this.isTopLevelItem
            ? this.open
              ? "chevron-up"
              : "chevron-down"
            : dirChevron
        }
        scale="s"
      />
    );
  }

  renderDropdownAction(dir: Direction): VNode {
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-action
        class={CSS.dropdownAction}
        icon={
          this.topLevelMenuLayout === "vertical" || this.isTopLevelItem
            ? this.open
              ? "chevron-up"
              : "chevron-down"
            : dirChevron
        }
        onClick={this.clickHandler}
        onKeyDown={this.keyDownHandler}
        text="open"
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.dropDownActionEl = el)}
      />
    );
  }

  renderSubMenuItems(dir: Direction): VNode {
    return (
      <calcite-menu
        class={{
          [CSS.dropdownMenuItems]: true,
          [CSS.open]: this.open,
          [CSS.nested]: !this.isTopLevelItem,
          [CSS.isRtl]: dir === "rtl",
          [CSS.dropdownVertical]: this.topLevelMenuLayout === "vertical"
        }}
        label="Submenu"
        layout="vertical"
        role="menu"
      >
        <slot name="sub-menu-item" onSlotchange={this.handleMenuItemSlotChange} />
      </calcite-menu>
    );
  }

  renderItemContent(dir: Direction): VNode {
    return (
      <Fragment>
        {this.iconStart && this.renderIconElStart()}
        <div class={CSS.textContainer}>
          <span>{this.text}</span>
        </div>
        {!this.href && this.hasSubMenu ? this.renderDropdownIcon(dir) : null}
        {this.breadcrumb ? this.renderBreadcrumbIcon(dir) : null}
        {this.iconEnd && this.renderIconElEnd()}
      </Fragment>
    );
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host onBlur={this.blurHandler} onFocus={this.focusHandler}>
        <li
          class={{
            [CSS.container]: true,
            [CSS.isParentVertical]: this.topLevelMenuLayout === "vertical"
          }}
          role="none"
        >
          <div class={CSS.itemContent}>
            <a
              aria-current={this.isFocused ? "page" : false}
              aria-expanded={this.open ? "true" : "false"}
              aria-haspopup={this.hasSubMenu ? "true" : undefined}
              aria-label={this.label}
              class={{ [CSS.layoutVertical]: this.layout === "vertical" }}
              href={this.href ? this.href : null}
              onClick={this.clickHandler}
              onKeyDown={this.keyDownHandler}
              rel={this.rel ? this.rel : null}
              role="menuitem"
              tabIndex={this.isTopLevelItem ? 0 : -1}
              target={this.target ? this.target : null}
              // eslint-disable-next-line react/jsx-sort-props
              ref={(el) => (this.anchorEl = el)}
            >
              {this.renderItemContent(dir)}
              {this.href && this.topLevelMenuLayout === "vertical" ? (
                <calcite-icon
                  class={CSS.hoverHrefIcon}
                  icon={dir === "rtl" ? "arrow-left" : "arrow-right"}
                  scale="s"
                />
              ) : null}
            </a>
            {this.href && this.hasSubMenu ? this.renderDropdownAction(dir) : null}
          </div>
          {this.renderSubMenuItems(dir)}
        </li>
      </Host>
    );
  }
}
