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
import { componentLoaded, setComponentLoaded, setUpLoadableComponent } from "../../utils/loadable";

@Component({
  tag: "calcite-nav-menu-item",
  styleUrl: "nav-menu-item.scss",
  shadow: true
})
export class CalciteNavMenuItem {
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

  // make private
  // remove reflect and move style to class
  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true })
  layout?: "horizontal" | "vertical" = "horizontal";

  @State() editingActive = false;

  @State() hasSubMenu = false;

  @State() subMenuOpen = false;

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

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

    this.anchorEl?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** @internal */
  @Event({ cancelable: false })
  calciteInternalNavItemKeyEvent: EventEmitter<KeyboardEvent>;

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
    this.layout = this.topLevelLayout;
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

  @Listen("calciteInternalNavItemKeyEvent")
  calciteInternalNavMenuItemKeyEvent(event: KeyboardEvent): void {
    const target = event.target as HTMLCalciteNavMenuItemElement;
    switch (event.detail["key"]) {
      case "Escape":
        if (this.el.contains(target) && this.hasSubMenu) {
          this.subMenuOpen = false;
          this.el.setFocus();
        }
        break;
    }
  }

  private keyDownHandler = (event: KeyboardEvent): void => {
    // todo refactor all of this
    // probably need to maintain index of all "parents" and track where
    // user currently is focused in
    // probably move logic to parent nav-menu, just emit key from here
    switch (event.key) {
      case " ":
      case "Enter":
        if (this.href) {
          return;
        } else if (this.hasSubMenu && !this.subMenuOpen) {
          this.subMenuOpen = true;
          setTimeout(() => this.subMenuItems[0].setFocus(), 60);
        } else if (this.hasSubMenu) {
          this.subMenuOpen = false;
        } else {
          this.calciteInternalNavItemKeyEvent.emit(event);
        }
        event.preventDefault();
        break;

      case "Escape":
        if (this.hasSubMenu) {
          this.subMenuOpen = false;
        }

      case "ArrowDown":
        if (this.layout === "horizontal" && this.hasSubMenu) {
          this.subMenuOpen = true;
        }
        break;

      case "ArrowUp":
        if (this.layout === "horizontal" && this.hasSubMenu) {
          this.subMenuOpen = false;
        }

      case "ArrowLeft":
        if (this.layout === "vertical" && this.hasSubMenu) {
          this.subMenuOpen = false;
        }

      case "ArrowRight":
        if (this.layout === "vertical" && this.hasSubMenu) {
          this.subMenuOpen = true;
        }

      case "Home":
      case "End":
        event.preventDefault();
        this.calciteInternalNavItemKeyEvent.emit(event);
        break;
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
      <Host>
        <li
          class={{
            container: true,
            "nav-item-vertical-parent": this.topLevelLayout === "vertical"
          }}
          role="none"
        >
          <div class="item-content">
            <a
              aria-current="todo"
              aria-expanded={this.subMenuOpen ? "true" : "false"}
              aria-haspopup={this.hasSubMenu ? "true" : undefined}
              href={this.href ? this.href : null}
              onClick={this.clickHandler}
              onKeyDown={this.keyDownHandler}
              ref={(el) => (this.anchorEl = el)}
              rel={this.rel ? this.rel : null}
              role="menuitem"
              tabIndex={1}
              target={this.target ? this.target : null}
            >
              {this.renderItemContent()}
              {this.href && (this.layout === "vertical" || this.topLevelLayout === "vertical") ? (
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
      this.subMenuItems.map((el: HTMLCalciteNavMenuItemElement) => {
        el.layout = "vertical";
      });
    }
  };

  private hasSlottedItems(): boolean {
    return this.el.querySelectorAll("[slot=menu-item-dropdown]").length > 0;
  }
}
