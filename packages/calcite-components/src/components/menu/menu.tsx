import { PropertyValues } from "lit";
import { LitElement, property, h, method, JsxNode, LuminaJsx } from "@arcgis/lumina";
import { useWatchAttributes } from "@arcgis/components-controllers";
import {
  focusElement,
  focusElementInGroup,
  focusFirstTabbable,
  slotChangeGetAssignedElements,
} from "../../utils/dom";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { useT9n } from "../../controllers/useT9n";
import type { CalciteMenuItem } from "../menu-item/menu-item";
import T9nStrings from "./assets/t9n/menu.t9n.en.json";
import { styles } from "./menu.scss";

declare global {
  interface DeclareElements {
    "calcite-menu": CalciteMenu;
  }
}

type Layout = "horizontal" | "vertical";

export class CalciteMenu extends LitElement implements LoadableComponent {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  /**
   * TODO: [MIGRATION] the codemod converted this Stencil \@Watch() to attribute watcher because it didn't find the following properties in your component: role.
   * If this is meant to be a property watcher, it's likely that you had a typo in the property name, or the property has since been removed but the watcher remained.
   */
  attributeWatch = useWatchAttributes(["role"], this.handleGlobalAttributesChanged);

  private menuItems: CalciteMenuItem["el"][] = [];

  // #endregion

  // #region Public Properties

  /**
   * Accessible name for the component.
   * TODO: [MIGRATION] This property was marked as required in your Stencil component. If you didn't mean it to be required, feel free to remove `@required` tag.
   * Otherwise, read the documentation about required properties: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-properties--docs#string-properties
   *
   * @required
   */
  @property() label: string;

  /** Specifies the layout of the component. */
  @property({ reflect: true }) layout: Layout = "horizontal";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only.
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  // #endregion

  // #region Public Methods

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.menuItems[0]);
  }

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalMenuItemKeyEvent", this.calciteInternalNavMenuItemKeyEvent);
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
  }

  /**
   * TODO: [MIGRATION] Consider inlining some of the watch functions called inside of this method to reduce boilerplate code
   *
   * @param changes
   */
  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) {
      this.handleLayoutChange(this.layout);
    }
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  // #endregion

  // #region Private Methods

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
    this.setMenuItemLayout(this.menuItems, this.layout);
  }

  private handleLayoutChange(value: Layout): void {
    this.setMenuItemLayout(this.menuItems, value);
  }

  private calciteInternalNavMenuItemKeyEvent(event: CustomEvent): void {
    const target = event.target as CalciteMenuItem["el"];
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
          this.focusParentElement(event.target as CalciteMenuItem["el"]);
        }
      }
    } else if (key === "Escape") {
      this.focusParentElement(event.target as CalciteMenuItem["el"]);
    }
    event.preventDefault();
  }

  private handleMenuSlotChange(event: Event): void {
    this.menuItems = slotChangeGetAssignedElements<CalciteMenuItem["el"]>(event);
    this.setMenuItemLayout(this.menuItems, this.layout);
  }

  private focusParentElement(el: CalciteMenuItem["el"]): void {
    const parentEl = el.parentElement as CalciteMenuItem["el"];
    if (parentEl) {
      focusElement(parentEl);
      parentEl.open = false;
    }
  }

  private setMenuItemLayout(items: CalciteMenuItem["el"][], layout: Layout): void {
    items.forEach((item) => {
      item.layout = layout;
      if (this.getEffectiveRole() === "menubar") {
        item.isTopLevelItem = true;
        item.topLevelMenuLayout = this.layout;
      }
    });
  }

  private getEffectiveRole(): LuminaJsx.AriaAttributes["role"] {
    return (this.el.role || "menubar") as LuminaJsx.AriaAttributes["role"];
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <ul ariaLabel={this.label} role={this.getEffectiveRole()}>
        <slot onSlotChange={this.handleMenuSlotChange} />
      </ul>
    );
  }

  // #endregion
}
