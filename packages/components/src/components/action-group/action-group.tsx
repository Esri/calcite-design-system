// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  h,
  method,
  state,
  JsxNode,
  ToEvents,
  createEvent,
} from "@arcgis/lumina";
import { queryAssignedElements } from "lit/decorators.js";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { Layout, Scale } from "../interfaces";
import { FlipPlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import type { Action } from "../action/action";
import type { ActionMenu } from "../action-menu/action-menu";
import { useSetFocus } from "../../controllers/useSetFocus";
import { SelectionMode } from "../interfaces";
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
 * @slot - A slot for adding `calcite-action`s.
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

  @queryAssignedElements({ selector: "calcite-action" })
  private actions!: Action["el"][];

  //#endregion

  //#region State Properties

  @state() hasMenuActions = false;

  //#endregion

  //#region Public Properties

  /** Specifies the number of columns. */
  @property({ type: Number, reflect: true }) columns: Columns;

  /** When `true`, expands the component and its contents. */
  @property({ reflect: true }) expanded = false;

  /** Specifies an accessible name for the component. */
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

  /** Specifies the position of the action menu. */
  @property({ reflect: true }) menuPlacement: LogicalPlacement;

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the type of positioning to use for overlaid content, where:
   *
   * `"absolute"` positions the component inside of overflowing parent containers and will affect the container's layout, and
   *
   * `"fixed"` is used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the size of the `calcite-action-menu`. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"multiple"` allows any number of selections,
   *
   * `"single"` allows only one selection,
   *
   * `"single-persist"` allows one selection and prevents de-selection, and
   *
   * `"none"` disables selection (default).
   */
  @property({ reflect: true }) selectionMode: Extract<
    "single" | "single-persist" | "multiple" | "none",
    SelectionMode
  > = "none";

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
    return this.focusSetter(() => this.el, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's content area is collapsed. */
  calciteActionGroupCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteActionGroupExpand = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("click", this.handleActionClick);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */

    if (this.hasUpdated || changes.has("selectionMode")) {
      if (this.selectionMode !== "none") {
        this.setRoleOnActions();
      } else if (this.selectionMode === "none") {
        this.clearActionAriaAttributes();
      }
    }

    if (changes.has("expanded")) {
      if (this.hasUpdated || this.expanded !== false) {
        this.menuOpen = false;
      }
      if (this.hasUpdated) {
        if (this.expanded) {
          this.calciteActionGroupExpand.emit();
        } else {
          this.calciteActionGroupCollapse.emit();
        }
      }
    }
  }

  //#endregion

  //#region Private Methods

  private setActiveAction(index: number, active: Action["el"]): void {
    if (this.selectionMode === "multiple") {
      active.active = !active.active;
      this.setActionAriaChecked(active, active.active);
      return;
    }
    if (this.selectionMode === "single") {
      this.actions.forEach((action, i) => {
        action.active = i === index && !action.active;
        this.setActionAriaChecked(action, action.active);
      });
      return;
    }
    if (this.selectionMode === "single-persist") {
      if (!this.actions[index].active) {
        this.actions.forEach((action, i) => {
          action.active = i === index;
          this.setActionAriaChecked(action, action.active);
        });
      }
      return;
    }
  }

  private setMenuOpen(event: ToEvents<ActionMenu>["calciteActionMenuOpen"]): void {
    this.menuOpen = !!event.currentTarget.open;
  }

  private handleMenuActionsSlotChange(event: Event): void {
    this.hasMenuActions = slotChangeHasAssignedElement(event);
  }

  private handleActionClick(event: MouseEvent): void {
    const target = event.target as Action["el"];
    if (!target) {
      return;
    }
    const index = this.actions.indexOf(target);
    if (index === -1 || this.selectionMode === "none") {
      return;
    }
    this.setActiveAction(index, target);
  }

  private setRoleOnActions(): void {
    this.actions.forEach((action) => {
      action.aria = {
        ...action.aria,
        role:
          this.selectionMode === "single" || this.selectionMode === "single-persist"
            ? "radio"
            : "checkbox",
      };
      this.setActionAriaChecked(action, action.active);
    });
  }

  private setActionAriaChecked(action: Action["el"], checked: boolean): void {
    action.aria = {
      ...action.aria,
      checked: checked ? "true" : "false",
    };
  }

  private clearActionAriaAttributes(): void {
    if (this.selectionMode === "none") {
      this.actions.forEach((action) => {
        if (action.aria) {
          action.aria.checked = undefined;
          action.aria.role = undefined;
          action.aria = { ...action.aria };
        }
      });
    }
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
          aria={{ expanded }}
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
      <div
        ariaLabel={this.label}
        class={CSS.container}
        role={
          this.selectionMode === "multiple" || this.selectionMode === "none"
            ? "group"
            : "radiogroup"
        }
      >
        <slot />
        {this.renderMenu()}
      </div>
    );
  }

  //#endregion
}
