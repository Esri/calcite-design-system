import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from "@stencil/core";
import { focusElement, focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
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

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <ul aria-label={this.label} role={this.role}>
          <slot onSlotchange={this.handleMenuSlotChange} />
        </ul>
      </Host>
    );
  }
}
