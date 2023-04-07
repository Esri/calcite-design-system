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
import { getElementDir, slotChangeGetAssignedElements } from "../../utils/dom";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";

// import { getMenubarItem } from "./utils";

@Component({
  tag: "calcite-nav-menu-item",
  styleUrl: "nav-menu-item.scss",
  shadow: true
})
export class CalciteNavMenuItem implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el!: HTMLCalciteNavMenuItemElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** When true, the component displays a visual indication of breadcrumb */
  @Prop({ reflect: true, mutable: true }) breadcrumb: boolean;

  /** When `true`, the component is highlighted.  */
  @Prop({ reflect: true, mutable: true }) active: boolean;

  /** When true and `textEnabled` is true, the `text` will be user-editable, and the component will emit an event. */
  @Prop({ reflect: true, mutable: true }) editable: boolean;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true, mutable: true }) iconStart?: string;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true, mutable: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ mutable: true }) iconFlipRtl: FlipContext;

  /** Displays the `text` */
  @Prop({ mutable: true }) textEnabled: boolean;

  /** Specifies the text the component displays */
  @Prop({ reflect: true, mutable: true }) text: string;

  /** When true, provide a navigable href link */
  @Prop({ reflect: true }) href: string;

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

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private dir = getElementDir(this.el);

  /** The close button element. */
  private anchorEl?: HTMLAnchorElement;

  private dropDownActionEl: HTMLCalciteActionElement;

  @State() editingActive = false;

  @State() hasSubMenu = false;

  /**
   * @internal
   */
  @Prop({ mutable: true }) subMenuOpen = false;

  @State() isTopLevelItem: boolean;

  // need to track the parent type of layout to determine if the nested dropdown position absolutely (horizontal parent),
  // or position downward and expand relative (vertical parent)
  @State() topLevelLayout: "vertical" | "horizontal";

  @State() subMenuItems?: HTMLCalciteNavMenuItemElement[];

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** @internal */
  @Event({ cancelable: true })
  calciteInternalNavItemKeyEvent: EventEmitter<KeyboardEvent>;

  /** @internal */
  @Event({ cancelable: false })
  calciteInternalNavItemClickEvent: EventEmitter<MouseEvent>;

  @Event()
  calciteInternalNavMenuItemBeforeClose: EventEmitter<void>;

  @Event()
  calciteInternalNavMenuItemBeforeOpen: EventEmitter<void>;

  @Event()
  calciteInternalNavMenuItemClose: EventEmitter<void>;

  @Event()
  calciteInternalNavMenuItemOpen: EventEmitter<void>;

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
      this.subMenuOpen &&
      !this.el.contains(event.target as Element)
    ) {
      this.subMenuOpen = false;
    }
  }

  @Listen("calciteInternalNavItemClickEvent")
  handleOtherNavItemClickEvent(event: Event): void {
    if (this.subMenuOpen && this.el === (event.target as Element)) {
      // this.subMenuOpen = false;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.active = this.active || this.editable;
    // todo just get any nav items in the default slot?
    this.hasSubMenu = this.hasSlottedItems();

    // for now to detect nesting only working two level for demo.. need to just check if it has any parent originating at top lvel
    //not sure if this is reqired???
    this.isTopLevelItem = !(
      this.el.parentElement?.slot === "menu-item-dropdown" || this.el.slot !== ""
    );

    this.topLevelLayout = this.el.closest("calcite-nav-menu")?.layout || "horizontal";
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

  // @Listen("calciteInternalNavItemKeyEvent")
  // calciteInternalNavMenuItemKeyEvent(event: KeyboardEvent): void {
  //   const target = event.target as HTMLCalciteNavMenuItemElement;
  //   switch (event.detail["key"]) {
  //     case "Escape":
  //       if (this.el.contains(target) && this.hasSubMenu) {
  //         this.subMenuOpen = false;
  //         this.el.setFocus();
  //       }
  //       break;
  //   }
  // }

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.anchorEl.focus();
  }

  private keyDownHandler = async (event: KeyboardEvent): Promise<void> => {
    // todo refactor all of this
    // probably need to maintain index of all "parents" and track where
    // user currently is focused in
    // probably move logic to parent nav-menu, just emit key from here
    switch (event.key) {
      case " ":
      case "Enter":
        if (this.href) {
          if (event.target === this.dropDownActionEl && this.hasSubMenu) {
            if (!this.subMenuOpen) {
              this.focusFirst();
            }
          }
          return;
        } else if (this.hasSubMenu && !this.subMenuOpen) {
          this.subMenuOpen = true;
          this.focusFirst();
        } else if (this.hasSubMenu) {
          this.subMenuOpen = false;
        } else {
          this.calciteInternalNavItemKeyEvent.emit(event);
        }
        event.preventDefault();
        break;
      case "Escape":
        if (this.isTopLevelItem) {
          this.calciteInternalNavItemKeyEvent.emit(event);
          return;
        }
        if (this.subMenuOpen) {
          this.subMenuOpen = false;
        } else {
          if (this.el.parentElement.nodeName === "CALCITE-NAV-MENU-ITEM") {
            this.focusParentElement();
          }
        }
        break;
      case "ArrowDown":
        if (this.topLevelLayout === "horizontal") {
          if (this.isTopLevelItem) {
            this.subMenuOpen = true;
            this.focusFirst();
            return;
          }

          this.calciteInternalNavItemKeyEvent.emit(event);
        }

        if (this.topLevelLayout === "vertical") {
          event.preventDefault();
          this.calciteInternalNavItemKeyEvent.emit(event);
        }
        break;

      case "ArrowUp":
        if (this.topLevelLayout === "horizontal") {
          if (this.isTopLevelItem) {
            this.subMenuOpen = true;
            this.focusLast();
            return;
          }

          this.calciteInternalNavItemKeyEvent.emit(event);
        }

        if (this.topLevelLayout === "vertical") {
          event.preventDefault();
          this.calciteInternalNavItemKeyEvent.emit(event);
        }
        break;
      case "ArrowLeft":
        if (this.topLevelLayout === "horizontal") {
          if (this.isTopLevelItem) {
            this.calciteInternalNavItemKeyEvent.emit(event);
            return;
          }
          if (this.el.parentElement.nodeName === "CALCITE-NAV-MENU-ITEM") {
            this.focusParentElement();
          }
        } else {
          if (this.hasSubMenu && this.subMenuOpen) {
            this.subMenuOpen = false;
            return;
          }
          if (this.el.parentElement.nodeName === "CALCITE-NAV-MENU-ITEM") {
            const parentEl = this.el.parentElement as HTMLCalciteNavMenuItemElement;
            parentEl.setFocus();
          }
        }
        break;

      case "ArrowRight":
        if (this.topLevelLayout === "horizontal") {
          if (this.isTopLevelItem) {
            this.calciteInternalNavItemKeyEvent.emit(event);
            return;
          }
          if (this.hasSubMenu) {
            this.subMenuOpen = true;
            setTimeout(() => this.focusFirst(), 1000);
          } else {
            //this code block will close all the submenus and move on to the next item in menubar
            // const menuBarItem = getMenubarItem(this.el);
            // const childrenItems = getSlotted(this.el.closest("calcite-nav-menu"), "", {
            //   all: true,
            //   matches: "calcite-nav-menu-item"
            // });
            // focusElementInGroup(childrenItems, menuBarItem, "next");
          }
        } else {
          if (this.hasSubMenu) {
            if (!this.subMenuOpen) {
              this.subMenuOpen = true;
            } else {
              this.focusFirst();
            }
          }
        }

        break;
      // case "Home":
      // case "End":
      //   event.preventDefault();
      //   this.calciteInternalNavItemKeyEvent.emit(event);
      //   break;
    }
  };

  private clickHandler = (event: MouseEvent): void => {
    this.calciteInternalNavItemClickEvent.emit(event);
    if (this.href && this.subMenuOpen) {
      this.subMenuOpen = false;
    } else if (this.editable && !this.hasSubMenu) {
      this.editingActive = true;
    } else if (!this.href && this.hasSubMenu) {
      this.subMenuOpen = !this.subMenuOpen;
    }
  };

  private toggleEditingState = (): void => {
    this.editingActive = !this.editingActive;
  };

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

  renderBreadcrumbIcon(): VNode {
    return (
      <calcite-icon
        class="icon icon-breadcrumb"
        icon={this.dir === "rtl" ? "chevron-left" : "chevron-right"}
        scale="s"
      />
    );
  }

  renderDropdownIcon(): VNode {
    const dirChevron = this.dir === "rtl" ? "chevron-left" : "chevron-right";

    return (
      <calcite-icon
        class="icon icon-dropdown"
        icon={
          this.topLevelLayout === "vertical" || this.isTopLevelItem
            ? this.subMenuOpen
              ? "chevron-up"
              : "chevron-down"
            : dirChevron
        }
        id="render-dropdown-icon"
        scale="s"
      />
    );
  }

  renderDropdownAction(): VNode {
    const dir = getElementDir(this.el);
    const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
    return (
      <calcite-action
        class="dropdown-with-href-toggle"
        icon={
          this.topLevelLayout === "vertical" || this.isTopLevelItem
            ? this.subMenuOpen
              ? "chevron-up"
              : "chevron-down"
            : dirChevron
        }
        onClick={() => (this.subMenuOpen = !this.subMenuOpen)}
        onKeyDown={this.keyDownHandler}
        text="open-dropdown"
        // eslint-disable-next-line react/jsx-sort-props
        ref={(el) => (this.dropDownActionEl = el)}
      />
    );
  }

  rendersubMenuItems(): VNode {
    const dir = getElementDir(this.el);
    return (
      <calcite-nav-menu
        class={{
          "dropdown-menu-items": true,
          open: this.subMenuOpen,
          nested: !this.isTopLevelItem,
          "is-rtl": dir === "rtl",
          "is-vertical-dropdown-type": this.topLevelLayout === "vertical"
        }}
        layout="vertical"
        role="submenu"
      >
        <slot name="menu-item-dropdown" onSlotchange={this.handleMenuItemSlotChange} />
      </calcite-nav-menu>
    );
  }

  renderItemContent(): VNode {
    return (
      <Fragment>
        {this.iconStart && this.renderIconElStart()}
        <div class="text-container">
          <span contenteditable={this.editingActive ? true : undefined}>
            {this.text && this.textEnabled && this.text ? this.text : null}
          </span>
          {this.editingActive ? (
            <div class="editable-content">
              {this.renderEditCancelButton()}
              {this.renderEditSaveButton()}
            </div>
          ) : null}
        </div>
        {this.iconEnd && !this.editingActive && this.renderIconElEnd()}
        {this.editable && !this.editingActive && this.renderEditIcon()}
        {!this.href && this.hasSubMenu ? this.renderDropdownIcon() : null}
        {this.breadcrumb ? this.renderBreadcrumbIcon() : null}
      </Fragment>
    );
  }

  render() {
    return (
      <Host onFocus={this.focusHandler}>
        <li
          class={{
            container: true,
            "nav-item-vertical-parent": this.topLevelLayout === "vertical"
          }}
          role="menuitem"
        >
          <div class="item-content">
            <a
              aria-current="page"
              aria-expanded={this.subMenuOpen ? "true" : "false"}
              aria-haspopup={this.hasSubMenu ? "true" : undefined}
              class={{
                "layout--vertical": true
              }}
              href={this.href ? this.href : null}
              onClick={this.clickHandler}
              onKeyDown={this.keyDownHandler}
              ref={(el) => (this.anchorEl = el)}
              rel={this.rel ? this.rel : null}
              role="menuitem"
              tabIndex={this.isTopLevelItem ? 1 : -1}
              target={this.target ? this.target : null}
            >
              {this.renderItemContent()}
              {this.href && this.topLevelLayout === "vertical" ? (
                <calcite-icon
                  class="hover-href-icon"
                  icon={this.dir === "rtl" ? "arrow-left" : "arrow-right"}
                  scale="s"
                />
              ) : null}
            </a>
            {this.href && this.hasSubMenu ? this.renderDropdownAction() : null}
          </div>
          {this.hasSubMenu ? this.rendersubMenuItems() : null}
        </li>
      </Host>
    );
  }

  private handleMenuItemSlotChange = (event: Event): void => {
    if (this.hasSubMenu) {
      this.subMenuItems = slotChangeGetAssignedElements(event) as HTMLCalciteNavMenuItemElement[];
    }
  };

  private hasSlottedItems(): boolean {
    return this.el.querySelectorAll("[slot=menu-item-dropdown]").length > 0;
  }

  onBeforeOpen = (): void => {
    this.calciteInternalNavMenuItemBeforeOpen.emit();
  };

  onOpen = (): void => {
    console.log("opened");
    this.calciteInternalNavMenuItemOpen.emit();
  };

  onBeforeClose = (): void => {
    this.calciteInternalNavMenuItemBeforeClose.emit();
  };

  onClose = (): void => {
    this.calciteInternalNavMenuItemClose.emit();
  };

  private focusFirst(): void {
    setTimeout(() => this.subMenuItems[0].setFocus(), 1000);
  }

  private focusLast(): void {
    setTimeout(() => this.subMenuItems[this.subMenuItems.length - 1].setFocus(), 1000);
  }

  private focusHandler(event: FocusEvent): void {
    const target = event.target as HTMLCalciteNavMenuItemElement;
    if (target.subMenuOpen) {
      target.subMenuOpen = false;
    }
  }

  private focusParentElement(): void {
    const parentEl = this.el.parentElement as HTMLCalciteNavMenuItemElement;
    parentEl.setFocus();
    parentEl.subMenuOpen = false;
  }

  @Listen("focusout")
  handleFocusout(event: FocusEvent): void {
    if (!this.el.contains(event.relatedTarget as Element)) {
      this.subMenuOpen = false;
    }
  }
}
