import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from "@stencil/core";
import { focusElement, focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { MenuMessages } from "./assets/menu/t9n";

@Component({
  tag: "calcite-menu",
  styleUrl: "menu.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class CalciteMenu implements LoadableComponent, LocalizedComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteMenuElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Specifies the layout of the component.
   */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  /**
   * Specifies accessible label for the component
   */
  @Prop() label!: string;

  /**
   * @internal
   */
  @Prop() role = "menubar";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: MenuMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<MenuMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * @internal
   */
  @Prop() autoCollapse = false;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @State() menuItems: HTMLCalciteMenuItemElement[] = [];

  @State() navigableItems: HTMLCalciteMenuItemElement[] = [];

  @State() overflowedMenuItems?: HTMLCalciteMenuItemElement[] = [];

  @State() overflowCalculationComplete? = false;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: MenuMessages;

  private wrappEl: HTMLUListElement;

  private collapseEl: HTMLCalciteMenuItemElement;

  resizeObserver = createObserver("resize", (entries) => this.moveItems(entries));

  @State() collapse = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    // if (this.autoCollapse) {
    //   this.resizeObserver.observe(this.el);
    // }
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.el.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalMenuItemKeyEvent")
  calciteInternalNavMenuItemKeyEvent(event: CustomEvent): void {
    const target = event.target as HTMLCalciteMenuItemElement;
    const subMenuItems = event.detail.children;
    event.stopPropagation();
    switch (event.detail.event.key) {
      case "ArrowDown":
        if (target.layout === "vertical") {
          focusElementInGroup(this.menuItems, target, "next", false);
        } else {
          if (event.detail.isSubMenuOpen) {
            subMenuItems[0].setFocus();
          }
        }
        break;
      case "ArrowUp":
        if (this.layout === "vertical") {
          focusElementInGroup(this.menuItems, target, "previous", false);
        } else {
          if (event.detail.isSubMenuOpen) {
            subMenuItems[subMenuItems.length - 1].setFocus();
          }
        }
        break;
      case "ArrowRight":
        if (this.layout === "horizontal") {
          focusElementInGroup(this.menuItems, target, "next", false);
        } else {
          if (event.detail.isSubMenuOpen) {
            subMenuItems[0].setFocus();
          }
        }
        break;
      case "ArrowLeft":
        if (this.layout === "horizontal") {
          focusElementInGroup(this.menuItems, target, "previous", false);
        } else {
          if (event.detail.isSubMenuOpen) {
            this.focusParentElement(event.target as HTMLCalciteMenuItemElement);
          }
        }
        break;
      case "Escape":
        this.focusParentElement(event.target as HTMLCalciteMenuItemElement);
        break;
    }
    event.preventDefault();
  }

  handleMenuSlotChange = (event: Event): void => {
    this.menuItems = slotChangeGetAssignedElements(event) as HTMLCalciteMenuItemElement[];
    this.menuItems.forEach((item: HTMLCalciteMenuItemElement) => {
      item.layout = this.layout;
    });
  };

  focusParentElement = (el: Element): void => {
    const parentEl = el.parentElement as HTMLCalciteMenuItemElement;
    if (parentEl) {
      focusElement(parentEl);
      parentEl.open = false;
    }
  };

  moveItems = (entries: ResizeObserverEntry[]): void => {
    console.log(entries);
    entries.forEach((entry) => {
      if (entry.target === this.el) {
        const { width } = this.el.getBoundingClientRect();
        const wrapperElWidth = this.wrappEl?.getBoundingClientRect().width;
        console.log(width, this.wrappEl?.getBoundingClientRect().width);
        if (width < wrapperElWidth) {
          // const avgWidth = wrapperElWidth / this.menuItems.length;
          // if (this.menuItems.length > 1 && width < avgWidth * 2) {
          if (!this.collapse) {
            this.collapse = true;

            console.log("resolot menu");
          }

          // }
        } else if (width > wrapperElWidth) {
          if (this.collapse) {
            this.collapse = false;
            this.el.layout = "horizontal";
            console.log("remove resolitting");
            this.menuItems.forEach((item) => {
              item.slot = "";
            });
          }
        }
      }
    });
  };

  setListElement = (el: HTMLUListElement): void => {
    this.wrappEl = el;
    if (this.autoCollapse) {
      this.resizeObserver.observe(this.el);
    }
  };

  setCollapseElement = (el: HTMLCalciteMenuItemElement): void => {
    this.collapseEl = el;
    console.log("el", el);
    this.reslotMenuItems();
  };

  reslotMenuItems = (): void => {
    this.el.layout = "vertical";

    this.menuItems.forEach((item) => {
      item.slot = "sub-menu-item";
      this.collapseEl.appendChild(item);
      // menu.appendChild(item);
    });
    // const menu = this.collapseEl.shadowRoot.querySelector("calcite-menu");
    // console.log(menu);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <ul aria-label={this.label} ref={this.setListElement} role={this.role}>
          <slot onSlotchange={this.handleMenuSlotChange} />
          {this.autoCollapse && this.collapse ? (
            <calcite-menu-item label="more" ref={this.setCollapseElement} text="more" />
          ) : null}
        </ul>
      </Host>
    );
  }
}
