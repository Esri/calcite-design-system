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
  VNode,
  Watch
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
import { CSS_UTILITY } from "../../utils/resources";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { MenuItemMessages } from "./assets/menu-item/t9n";

type Layout = "horizontal" | "vertical";

@Component({
  tag: "calcite-menu-item",
  styleUrl: "menu-item.scss",
  shadow: true,
  assetsDirs: ["assets"]
})

/**
 * @slot submenu-item - A slot for adding `calcite-menu-item`s in submenu.
 */
export class CalciteMenuItem implements LoadableComponent, T9nComponent {
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

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /**
   * @internal
   */
  @Prop() isTopLevelItem = false;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<MenuItemMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Made into a prop for testing purposes only.
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: MenuItemMessages;

  /** Accessible name for the component.*/
  @Prop() label!: string;

  /**
   * @internal
   */
  @Prop({ reflect: true }) layout: Layout;

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
  @Prop() topLevelMenuLayout: Layout;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @State() defaultMessages: MenuItemMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() hasSubMenu = false;

  @State() subMenuItems: HTMLCalciteMenuItemElement[];

  anchorEl: HTMLAnchorElement;

  dropdownActionEl: HTMLCalciteActionElement;

  isFocused: boolean;

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

  connectedCallback(): void {
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectMessages(this);
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
    if ((this.href && event.target === this.dropdownActionEl) || (!this.href && this.hasSubMenu)) {
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
          (!this.href || (this.href && event.target === this.dropdownActionEl))
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
          (event.target === this.dropdownActionEl || !this.href) &&
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
          (event.target === this.dropdownActionEl || !this.href) &&
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
    if (event.target !== this.dropdownActionEl) {
      this.calciteMenuItemSelect.emit();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderIconStart(): VNode {
    return (
      <calcite-icon
        class={`${CSS.icon} ${CSS.iconStart}`}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        key={CSS.iconStart}
        scale="s"
      />
    );
  }

  renderIconEnd(): VNode {
    return (
      <calcite-icon
        class={`${CSS.icon} ${CSS.iconEnd}`}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        key={CSS.iconEnd}
        scale="s"
      />
    );
  }

  renderBreadcrumbIcon(dir: Direction): VNode {
    return (
      <calcite-icon
        class={`${CSS.icon} ${CSS.iconBreadcrumb}`}
        icon={dir === "rtl" ? "chevron-left" : "chevron-right"}
        key={CSS.iconBreadcrumb}
        scale="s"
      />
    );
  }

  renderDropdownIcon(dir: Direction): VNode {
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-icon
        class={`${CSS.icon} ${CSS.iconDropdown}`}
        icon={
          this.topLevelMenuLayout === "vertical" || this.isTopLevelItem
            ? this.open
              ? "chevron-up"
              : "chevron-down"
            : dirChevron
        }
        key={CSS.iconDropdown}
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
        key={CSS.dropdownAction}
        onClick={this.clickHandler}
        onKeyDown={this.keyDownHandler}
        text={this.messages.open}
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.dropdownActionEl = el)}
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
          [CSS_UTILITY.rtl]: dir === "rtl",
          [CSS.dropdownVertical]: this.topLevelMenuLayout === "vertical"
        }}
        label={this.messages.submenu}
        layout="vertical"
        role="menu"
      >
        <slot name="submenu-item" onSlotchange={this.handleMenuItemSlotChange} />
      </calcite-menu>
    );
  }

  renderItemContent(dir: Direction): VNode {
    return (
      <Fragment>
        {this.iconStart && this.renderIconStart()}
        <div class={CSS.textContainer}>
          <span>{this.text}</span>
        </div>
        {!this.href && this.hasSubMenu ? this.renderDropdownIcon(dir) : null}
        {this.breadcrumb ? this.renderBreadcrumbIcon(dir) : null}
        {this.iconEnd && this.renderIconEnd()}
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
              aria-expanded={this.open}
              aria-haspopup={this.hasSubMenu}
              aria-label={this.label}
              class={{ [CSS.layoutVertical]: this.layout === "vertical", [CSS.content]: true }}
              href={this.href}
              onClick={this.clickHandler}
              onKeyDown={this.keyDownHandler}
              rel={this.rel}
              role="menuitem"
              tabIndex={this.isTopLevelItem ? 0 : -1}
              target={this.target}
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
