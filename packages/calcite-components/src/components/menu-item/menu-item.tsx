// @ts-strict-ignore
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  Fragment,
  h,
  method,
  state,
  JsxNode,
} from "@arcgis/lumina";
import { FlipContext, Layout } from "../interfaces";
import { Direction, getElementDir, slotChangeGetAssignedElements } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Action } from "../action/action";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, SLOTS, ICONS } from "./resources";
import { MenuItemCustomEvent } from "./interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./menu-item.scss";

declare global {
  interface DeclareElements {
    "calcite-menu-item": MenuItem;
  }
}

/** @slot submenu-item - A slot for adding `calcite-menu-item`s in a submenu. */
export class MenuItem extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private anchorEl = createRef<HTMLAnchorElement>();

  private dropdownActionEl = createRef<Action["el"]>();

  private isFocused: boolean;

  /**
   * Made into a prop for testing purposes only.
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() hasSubmenu = false;

  @state() submenuItems: MenuItem["el"][];

  //#endregion

  //#region Public Properties

  /** When `true`, the component is highlighted. */
  @property({ reflect: true }) active: boolean;

  /** When `true`, the component displays a breadcrumb trail for use as a navigational aid. */
  @property({ reflect: true }) breadcrumb: boolean;

  /** Specifies the URL destination of the component, which can be set as an absolute or relative path. */
  @property() href: string;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** @private */
  @property() isTopLevelItem = false;

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** @private */
  @property({ reflect: true }) layout: Layout;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, the component will display any slotted `calcite-menu-item` in an open overflow menu. */
  @property({ reflect: true }) open = false;

  /**
   * Defines the relationship between the `href` value and the current document.
   *
   * @mdn [rel](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
   */
  @property({ reflect: true }) rel: string;

  /**
   * Specifies where to open the linked document defined in the `href` property.
   *
   * @mdn [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   */
  @property({ reflect: true }) target: string;

  /** Specifies the text to display. */
  @property() text: string;

  /** @private */
  @property() topLevelMenuLayout: Layout;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.anchorEl.value, options);
  }

  //#endregion

  //#region Events

  /** @private */
  calciteInternalMenuItemKeyEvent = createEvent<MenuItemCustomEvent>();

  /** Emits when the component is selected. */
  calciteMenuItemSelect = createEvent();

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listenOn(window, "click", this.handleClickOut);
    this.listen("focusout", this.handleFocusOut);
    this.listen("blur", this.blurHandler);
    this.listen("focus", this.focusHandler);
  }

  //#endregion

  //#region Private Methods

  private handleClickOut(event: Event): void {
    if (
      this.topLevelMenuLayout !== "vertical" &&
      this.hasSubmenu &&
      this.open &&
      !event.composedPath().includes(this.el)
    ) {
      this.open = false;
    }
  }

  private handleFocusOut(event: FocusEvent): void {
    if (
      this.topLevelMenuLayout !== "vertical" &&
      !this.el.contains(event.relatedTarget as Element)
    ) {
      this.open = false;
    }
  }

  private blurHandler(): void {
    this.isFocused = false;
  }

  private clickHandler(event: MouseEvent): void {
    if (
      (this.href && event.target === this.dropdownActionEl.value) ||
      (!this.href && this.hasSubmenu)
    ) {
      this.open = !this.open;
    }
    this.selectMenuItem(event);
  }

  private focusHandler(event: FocusEvent): void {
    const target = event.target as MenuItem["el"];
    this.isFocused = true;
    if (target.open && !this.open) {
      target.open = false;
    }
  }

  private handleMenuItemSlotChange(event: Event): void {
    this.submenuItems = slotChangeGetAssignedElements<MenuItem["el"]>(event);
    this.submenuItems.forEach((item) => {
      if (!item.topLevelMenuLayout) {
        item.topLevelMenuLayout = this.topLevelMenuLayout;
      }
    });
    this.hasSubmenu = this.submenuItems.length > 0;
  }

  private async keyDownHandler(event: KeyboardEvent): Promise<void> {
    const { hasSubmenu, href, layout, open, submenuItems } = this;
    const key = event.key;
    const targetIsDropdown = event.target === this.dropdownActionEl.value;

    if (event.defaultPrevented) {
      return;
    }

    if (key === " " || key === "Enter") {
      if (hasSubmenu && (!href || (href && targetIsDropdown))) {
        this.open = !open;
      }
      if (!(href && targetIsDropdown) && key !== "Enter") {
        this.selectMenuItem(event);
      }
      if (key === " " || (href && targetIsDropdown)) {
        event.preventDefault();
      }
    } else if (key === "Escape") {
      if (open) {
        this.open = false;
        return;
      }
      this.calciteInternalMenuItemKeyEvent.emit({ event });
      event.preventDefault();
    } else if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      if ((targetIsDropdown || !href) && hasSubmenu && !open && layout === "horizontal") {
        this.open = true;
        return;
      }
      this.calciteInternalMenuItemKeyEvent.emit({
        event,
        children: submenuItems,
        isSubmenuOpen: open && hasSubmenu,
      });
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      this.calciteInternalMenuItemKeyEvent.emit({
        event,
        children: submenuItems,
        isSubmenuOpen: true,
      });
    } else if (key === "ArrowRight") {
      event.preventDefault();
      if ((targetIsDropdown || !href) && hasSubmenu && !open && layout === "vertical") {
        this.open = true;
        return;
      }
      this.calciteInternalMenuItemKeyEvent.emit({
        event,
        children: submenuItems,
        isSubmenuOpen: open && hasSubmenu,
      });
    }
  }

  private selectMenuItem(event: MouseEvent | KeyboardEvent): void {
    if (event.target !== this.dropdownActionEl.value) {
      this.calciteMenuItemSelect.emit();
    }
  }

  //#endregion

  //#region Rendering

  private renderIconStart(): JsxNode {
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

  private renderIconEnd(): JsxNode {
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

  private renderBreadcrumbIcon(dir: Direction): JsxNode {
    return (
      <calcite-icon
        class={`${CSS.icon} ${CSS.iconBreadcrumb}`}
        icon={dir === "rtl" ? ICONS.chevronLeft : ICONS.chevronRight}
        key={CSS.iconBreadcrumb}
        scale="s"
      />
    );
  }

  private renderDropdownIcon(dir: Direction): JsxNode {
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-icon
        class={`${CSS.icon} ${CSS.iconDropdown}`}
        icon={
          this.topLevelMenuLayout === "vertical" || this.isTopLevelItem
            ? this.open
              ? ICONS.chevronUp
              : ICONS.chevronDown
            : dirChevron
        }
        key={CSS.iconDropdown}
        scale="s"
      />
    );
  }

  private renderDropdownAction(dir: Direction): JsxNode {
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-action
        class={CSS.dropdownAction}
        icon={
          this.topLevelMenuLayout === "vertical" || this.isTopLevelItem
            ? this.open
              ? ICONS.chevronUp
              : ICONS.chevronDown
            : dirChevron
        }
        key={CSS.dropdownAction}
        onClick={this.clickHandler}
        onKeyDown={this.keyDownHandler}
        ref={this.dropdownActionEl}
        text={this.messages.open}
      />
    );
  }

  private renderSubmenuItems(dir: Direction): JsxNode {
    return (
      <calcite-menu
        class={{
          [CSS.dropdownMenuItems]: true,
          [CSS.open]: this.open,
          [CSS.nested]: !this.isTopLevelItem,
          [CSS_UTILITY.rtl]: dir === "rtl",
          [CSS.dropdownVertical]: this.topLevelMenuLayout === "vertical",
        }}
        label={this.messages.submenu}
        layout="vertical"
        role="menu"
      >
        <slot name={SLOTS.submenuItem} onSlotChange={this.handleMenuItemSlotChange} />
      </calcite-menu>
    );
  }

  private renderHrefIcon(dir: Direction): JsxNode {
    return (
      <calcite-icon
        class={CSS.hoverHrefIcon}
        icon={dir === "rtl" ? ICONS.arrowLeft : ICONS.arrowRight}
        key={CSS.hoverHrefIcon}
        scale="s"
      />
    );
  }

  private renderItemContent(dir: Direction): JsxNode {
    const hasHref = this.href && (this.topLevelMenuLayout === "vertical" || !this.isTopLevelItem);
    return (
      <>
        {this.iconStart && this.renderIconStart()}
        <div class={CSS.textContainer}>
          <span>{this.text}</span>
        </div>
        {hasHref && this.renderHrefIcon(dir)}
        {this.iconEnd && this.renderIconEnd()}
        {this.breadcrumb ? this.renderBreadcrumbIcon(dir) : null}
        {!this.href && this.hasSubmenu ? this.renderDropdownIcon(dir) : null}
      </>
    );
  }

  override render(): JsxNode {
    const dir = getElementDir(this.el);
    return (
      <li
        class={{
          [CSS.container]: true,
          [CSS.isParentVertical]: this.topLevelMenuLayout === "vertical",
        }}
        role="none"
      >
        <div class={CSS.itemContent}>
          <a
            ariaCurrent={this.isFocused ? "page" : false}
            ariaExpanded={this.open}
            ariaHasPopup={this.hasSubmenu}
            ariaLabel={this.label}
            class={{ [CSS.layoutVertical]: this.layout === "vertical", [CSS.content]: true }}
            href={this.href}
            onClick={this.clickHandler}
            onKeyDown={this.keyDownHandler}
            ref={this.anchorEl}
            rel={this.rel}
            role="menuitem"
            tabIndex={this.isTopLevelItem ? 0 : -1}
            target={this.target}
          >
            {this.renderItemContent(dir)}
          </a>
          {this.href && this.hasSubmenu ? this.renderDropdownAction(dir) : null}
        </div>
        {this.renderSubmenuItems(dir)}
      </li>
    );
  }

  //#endregion
}
