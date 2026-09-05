import { PropertyValues } from "lit";
import { LitElement, property, h, method, JsxNode, LuminaJsx } from "@arcgis/lumina";
import { useWatchAttributes } from "@arcgis/lumina/controllers";
import { focusElement, focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import { Scale } from "../types";
import type { MenuItem } from "../menu-item/menu-item";
import { useSetFocus } from "../../controllers/useSetFocus";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./menu.scss";
import { isMenuItem } from "../menu-item/resources";

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
   * @copyDoc
   * @required
   */
  @property() label!: string;

  /** Specifies the layout of the component. */
  @property({ reflect: true }) layout: Layout = "horizontal";

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.menuItems[0], options);
  }

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.calciteInternalNavMenuItemKeyEvent);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("layout") && (this.hasUpdated || this.layout !== "horizontal")) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m"))
    ) {
      this.setMenuItemProperties(this.menuItems);
    }
  }

  //#endregion

  //#region Private Methods

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
    this.setMenuItemProperties(this.menuItems);
  }

  private calciteInternalNavMenuItemKeyEvent(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    const target = this.getMenuItemFromEvent(event);

    if (!target) {
      return;
    }

    const submenuItems = this.getSubmenuItems(target);
    const hasSubmenu = submenuItems.length > 0;
    const key = event.key;
    let handled = false;

    if (key === "ArrowDown") {
      if (target.layout === "vertical") {
        focusElementInGroup(this.menuItems, target, "next", false, false);
        handled = true;
      } else if (target.open && hasSubmenu) {
        submenuItems[0].setFocus();
        handled = true;
      }
    } else if (key === "ArrowUp") {
      if (target.layout === "vertical") {
        focusElementInGroup(this.menuItems, target, "previous", false, false);
        handled = true;
      } else if (target.open && hasSubmenu) {
        submenuItems[submenuItems.length - 1].setFocus();
        handled = true;
      }
    } else if (key === "ArrowRight") {
      if (this.layout === "horizontal") {
        focusElementInGroup(this.menuItems, target, "next", false, false);
        handled = true;
      } else if (target.open && hasSubmenu) {
        submenuItems[0].setFocus();
        handled = true;
      }
    } else if (key === "ArrowLeft") {
      if (this.layout === "horizontal") {
        focusElementInGroup(this.menuItems, target, "previous", false, false);
        handled = true;
      } else if (isMenuItem(target.parentElement)) {
        this.focusParentElement(target);
        handled = true;
      }
    } else if (key === "Escape" && isMenuItem(target.parentElement)) {
      this.focusParentElement(target);
      handled = true;
    }

    if (handled) {
      event.preventDefault();
    }
  }

  private getMenuItemFromEvent(event: KeyboardEvent): MenuItem["el"] | undefined {
    const target = event.composedPath().find(isMenuItem);

    return target && this.menuItems.includes(target) ? target : undefined;
  }

  private getSubmenuItems(menuItem: MenuItem["el"]): MenuItem["el"][] {
    return Array.from(menuItem.children)
      .filter(isMenuItem)
      .filter((child) => child.matches('[slot="submenu-item"]'));
  }

  private handleMenuSlotChange(event: Event): void {
    this.menuItems = slotChangeGetAssignedElements<MenuItem["el"]>(event);
    this.setMenuItemProperties(this.menuItems);
  }

  private focusParentElement(el: MenuItem["el"]): void {
    const parentEl = el.parentElement as MenuItem["el"];
    if (parentEl) {
      focusElement(parentEl);
      parentEl.open = false;
    }
  }

  private setMenuItemProperties(items: MenuItem["el"][]): void {
    items.forEach((item) => {
      item.layout = this.layout;
      item.scale = this.scale;
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
