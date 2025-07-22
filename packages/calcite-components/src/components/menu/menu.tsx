// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, h, method, JsxNode, LuminaJsx } from "@arcgis/lumina";
import { useWatchAttributes } from "@arcgis/lumina/controllers";
import { focusElement, focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import type { MenuItem } from "../menu-item/menu-item";
import { useSetFocus } from "../../controllers/useSetFocus";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./menu.scss";

declare global {
  interface DeclareElements {
    "calcite-menu": Menu;
  }
}

type Layout = "horizontal" | "vertical";

export class Menu extends LitElement {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  attributeWatch = useWatchAttributes(["role"], this.handleGlobalAttributesChanged);

  private menuItems: MenuItem["el"][] = [];

  /**
   * Made into a prop for testing purposes only.
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region Public Properties

  /**
   * Accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** Specifies the layout of the component. */
  @property({ reflect: true }) layout: Layout = "horizontal";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  //#endregion

  //#region Public Methods

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.menuItems[0];
    });
  }

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalMenuItemKeyEvent", this.calciteInternalNavMenuItemKeyEvent);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) {
      this.setMenuItemLayout(this.menuItems, this.layout);
    }
  }

  //#endregion

  //#region Private Methods

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
    this.setMenuItemLayout(this.menuItems, this.layout);
  }

  private calciteInternalNavMenuItemKeyEvent(event: CustomEvent): void {
    const target = event.target as MenuItem["el"];
    const submenuItems = event.detail.children;
    const key = event.detail.event.key;
    event.stopPropagation();

    if (key === "ArrowDown") {
      if (target.layout === "vertical") {
        focusElementInGroup(this.menuItems, target, "next", false, false);
      } else {
        if (event.detail.isSubmenuOpen) {
          submenuItems[0].setFocus();
        }
      }
    } else if (key === "ArrowUp") {
      if (this.layout === "vertical") {
        focusElementInGroup(this.menuItems, target, "previous", false, false);
      } else {
        if (event.detail.isSubmenuOpen) {
          submenuItems[submenuItems.length - 1].setFocus();
        }
      }
    } else if (key === "ArrowRight") {
      if (this.layout === "horizontal") {
        focusElementInGroup(this.menuItems, target, "next", false, false);
      } else {
        if (event.detail.isSubmenuOpen) {
          submenuItems[0].setFocus();
        }
      }
    } else if (key === "ArrowLeft") {
      if (this.layout === "horizontal") {
        focusElementInGroup(this.menuItems, target, "previous", false, false);
      } else {
        if (event.detail.isSubmenuOpen) {
          this.focusParentElement(event.target as MenuItem["el"]);
        }
      }
    } else if (key === "Escape") {
      this.focusParentElement(event.target as MenuItem["el"]);
    }
    event.preventDefault();
  }

  private handleMenuSlotChange(event: Event): void {
    this.menuItems = slotChangeGetAssignedElements<MenuItem["el"]>(event);
    this.setMenuItemLayout(this.menuItems, this.layout);
  }

  private focusParentElement(el: MenuItem["el"]): void {
    const parentEl = el.parentElement as MenuItem["el"];
    if (parentEl) {
      focusElement(parentEl);
      parentEl.open = false;
    }
  }

  private setMenuItemLayout(items: MenuItem["el"][], layout: Layout): void {
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

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <ul ariaLabel={this.label} role={this.getEffectiveRole()}>
        <slot onSlotChange={this.handleMenuSlotChange} />
      </ul>
    );
  }

  //#endregion
}
