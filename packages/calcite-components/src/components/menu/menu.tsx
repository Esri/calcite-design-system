import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
  Method,
  VNode,
} from "@stencil/core";
import { focusElement, focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { MenuMessages } from "./assets/menu/t9n";
import {
  GlobalAttrComponent,
  unwatchGlobalAttributes,
  watchGlobalAttributes,
} from "../../utils/globalAttributes";

type Layout = "horizontal" | "vertical";

@Component({
  tag: "calcite-menu",
  styleUrl: "menu.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
})
export class CalciteMenu
  implements GlobalAttrComponent, LocalizedComponent, T9nComponent, LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Accessible name for the component.
   */
  @Prop() label!: string;

  /**
   * Specifies the layout of the component.
   */
  @Prop({ reflect: true }) layout: Layout = "horizontal";

  @Watch("layout")
  handleLayoutChange(value: Layout): void {
    this.setMenuItemLayout(this.menuItems, value);
  }

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
   * Made into a prop for testing purposes only.
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: MenuMessages;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteMenuElement;

  @State() defaultMessages: MenuMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() globalAttributes = {
    role: "menubar",
  };

  menuItems: HTMLCalciteMenuItemElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    watchGlobalAttributes(this, ["role"]);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    unwatchGlobalAttributes(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
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
    const submenuItems = event.detail.children;
    const key = event.detail.event.key;
    event.stopPropagation();

    if (key === "ArrowDown") {
      if (target.layout === "vertical") {
        focusElementInGroup(this.menuItems, target, "next", false);
      } else {
        if (event.detail.isSubmenuOpen) {
          submenuItems[0].setFocus();
        }
      }
    } else if (key === "ArrowUp") {
      if (this.layout === "vertical") {
        focusElementInGroup(this.menuItems, target, "previous", false);
      } else {
        if (event.detail.isSubmenuOpen) {
          submenuItems[submenuItems.length - 1].setFocus();
        }
      }
    } else if (key === "ArrowRight") {
      if (this.layout === "horizontal") {
        focusElementInGroup(this.menuItems, target, "next", false);
      } else {
        if (event.detail.isSubmenuOpen) {
          submenuItems[0].setFocus();
        }
      }
    } else if (key === "ArrowLeft") {
      if (this.layout === "horizontal") {
        focusElementInGroup(this.menuItems, target, "previous", false);
      } else {
        if (event.detail.isSubmenuOpen) {
          this.focusParentElement(event.target as HTMLCalciteMenuItemElement);
        }
      }
    } else if (key === "Escape") {
      this.focusParentElement(event.target as HTMLCalciteMenuItemElement);
    }
    event.preventDefault();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  handleMenuSlotChange = (event: Event): void => {
    this.menuItems = slotChangeGetAssignedElements(event) as HTMLCalciteMenuItemElement[];
    this.setMenuItemLayout(this.menuItems, this.layout);
  };

  focusParentElement(el: HTMLCalciteMenuItemElement): void {
    const parentEl = el.parentElement as HTMLCalciteMenuItemElement;
    if (parentEl) {
      focusElement(parentEl);
      parentEl.open = false;
    }
  }

  setMenuItemLayout(items: HTMLCalciteMenuItemElement[], layout: Layout): void {
    items.forEach((item) => {
      item.layout = layout;
      if (this.globalAttributes.role === "menubar") {
        item.isTopLevelItem = true;
        item.topLevelMenuLayout = this.layout;
      }
    });
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <ul aria-label={this.label} {...this.globalAttributes}>
          <slot onSlotchange={this.handleMenuSlotChange} />
        </ul>
      </Host>
    );
  }
}
