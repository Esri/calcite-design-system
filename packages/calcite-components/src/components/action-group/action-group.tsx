// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, h, method, state, JsxNode, ToEvents } from "@arcgis/lumina";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { Layout, Scale } from "../interfaces";
import { FlipPlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import type { ActionMenu } from "../action-menu/action-menu";
import { useSetFocus } from "../../controllers/useSetFocus";
import { Columns } from "./interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./action-group.scss";

declare global {
  interface DeclareElements {
    "calcite-action-group": ActionGroup;
  }
}

/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - A slot for adding an overflow menu with `calcite-action`s inside a `calcite-dropdown`.
 * @slot menu-tooltip - A slot for adding a `calcite-tooltip` for the menu.
 */
export class ActionGroup extends LitElement {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() hasMenuActions = false;

  //#endregion

  //#region Public Properties

  /** Indicates number of columns. */
  @property({ type: Number, reflect: true }) columns: Columns;

  /** When `true`, the component is expanded. */
  @property({ reflect: true }) expanded = false;

  /** Accessible name for the component. */
  @property() label: string;

  /**
   * Indicates the layout of the component.
   *
   * @internal
   */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> =
    "vertical";

  /** Specifies the component's fallback menu `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() menuFlipPlacements: FlipPlacement[];

  /** When `true`, the `calcite-action-menu` is open. */
  @property({ reflect: true }) menuOpen = false;

  /** Determines where the action menu will be positioned. */
  @property({ reflect: true }) menuPlacement: LogicalPlacement;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the size of the `calcite-action-menu`. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  //#endregion

  //#region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("expanded") && (this.hasUpdated || this.expanded !== false)) {
      this.menuOpen = false;
    }
  }

  //#endregion

  //#region Private Methods

  private setMenuOpen(event: ToEvents<ActionMenu>["calciteActionMenuOpen"]): void {
    this.menuOpen = !!event.currentTarget.open;
  }

  private handleMenuActionsSlotChange(event: Event): void {
    this.hasMenuActions = slotChangeHasAssignedElement(event);
  }

  //#endregion

  //#region Rendering

  private renderMenu(): JsxNode {
    const {
      expanded,
      menuOpen,
      scale,
      layout,
      messages,
      overlayPositioning,
      hasMenuActions,
      menuFlipPlacements,
      menuPlacement,
    } = this;

    return (
      <calcite-action-menu
        expanded={expanded}
        flipPlacements={
          menuFlipPlacements ?? (layout === "horizontal" ? ["top", "bottom"] : ["left", "right"])
        }
        hidden={!hasMenuActions}
        label={messages.more}
        oncalciteActionMenuOpen={this.setMenuOpen}
        open={menuOpen}
        overlayPositioning={overlayPositioning}
        placement={menuPlacement ?? (layout === "horizontal" ? "bottom-start" : "leading-start")}
        scale={scale}
      >
        <calcite-action
          aria={{ ariaExpanded: expanded }}
          icon={ICONS.menu}
          scale={scale}
          slot={ACTION_MENU_SLOTS.trigger}
          text={messages.more}
          textEnabled={expanded}
        />
        <slot name={SLOTS.menuActions} onSlotChange={this.handleMenuActionsSlotChange} />
        <slot name={SLOTS.menuTooltip} slot={ACTION_MENU_SLOTS.tooltip} />
      </calcite-action-menu>
    );
  }

  override render(): JsxNode {
    return (
      <div ariaLabel={this.label} class={CSS.container} role="group">
        <slot />
        {this.renderMenu()}
      </div>
    );
  }

  //#endregion
}
