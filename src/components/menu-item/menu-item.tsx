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

@Component({
  tag: "calcite-menu-item",
  styleUrl: "menu-item.scss",
  shadow: true
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

  /** When `true`, the component is highlighted.  */
  @Prop({ reflect: true, mutable: true }) active: boolean;

  /** When true, the component displays a visual indication of breadcrumb */
  @Prop({ reflect: true }) breadcrumb: boolean;

  /** When true, provide a navigable href link */
  @Prop({ reflect: true }) href: string;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop() iconFlipRtl: FlipContext;

  /** Accessible name for the component. */
  @Prop() label!: string;

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
  /* When true, the menu item will display any slotted Menu Item in an open overflow menu *
   */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * @internal
   */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical";

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private anchorEl: HTMLAnchorElement;

  private dropDownActionEl: HTMLCalciteActionElement;

  private isFocused: boolean;

  @State() hasSubMenu = false;

  @State() isTopLevelItem: boolean;

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
  @Event({ cancelable: true }) calciteInternalMenuItemKeyEvent: EventEmitter<MenuItemCustomEvent>;

  /** Emits when user selects the component. */
  @Event({ cancelable: false }) calciteMenuItemSelect: EventEmitter<void>;

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
    if (this.topLevelLayout !== "vertical" && !this.el.contains(event.relatedTarget as Element)) {
      this.open = false;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.active = this.active;
    this.isFocused = this.active;
    this.isTopLevelItem = !(this.el.parentElement?.slot === "sub-menu-item" || this.el.slot !== "");
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

  private clickHandler = (event: MouseEvent): void => {
    if ((this.href && event.target === this.dropDownActionEl) || (!this.href && this.hasSubMenu)) {
      console.log("clicked");
      this.open = !this.open;
    }
    this.selectMenuItem(event);
  };

  private handleMenuItemSlotChange = (event: Event): void => {
    this.subMenuItems = slotChangeGetAssignedElements(event) as HTMLCalciteMenuItemElement[];
    this.hasSubMenu = this.subMenuItems.length > 0;
  };

  private focusHandler(event: FocusEvent): void {
    const target = event.target as HTMLCalciteMenuItemElement;
    this.isFocused = true;
    if (target.open && !this.open) {
      target.open = false;
    }
  }

  private blurHandler(): void {
    this.isFocused = false;
  }

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
        class={CSS.dropdownWithHrefToggle}
        icon={
          this.topLevelLayout === "vertical" || this.isTopLevelItem
            ? this.open
              ? "chevron-up"
              : "chevron-down"
            : dirChevron
        }
        onClick={this.clickHandler}
        onKeyDown={this.keyDownHandler}
        text="open-dropdown"
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.dropDownActionEl = el)}
      />
    );
  }

  renderSubMenuItems(dir: Direction): VNode {
    return (
      <calcite-menu
        auto-collapse="false"
        class={{
          [CSS.dropdownMenuItems]: true,
          [CSS.open]: this.open,
          [CSS.nested]: !this.isTopLevelItem,
          [CSS.isRtl]: dir === "rtl",
          [CSS.isVerticalDropdownType]: this.topLevelLayout === "vertical"
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
            [CSS.navVerticalParent]: this.topLevelLayout === "vertical"
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
              {this.href && this.topLevelLayout === "vertical" ? (
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
