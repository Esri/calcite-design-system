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
import { createRef } from "lit/directives/ref.js";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { Layout, Scale } from "../interfaces";
import { FlipPlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import { getSlotAssignedElements, slotChangeHasAssignedElement } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import type { Action } from "../action/action";
import { isAction } from "../action/resources";
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

  private defaultSlotRef = createRef<HTMLSlotElement>();

  private menuActionsSlotRef = createRef<HTMLSlotElement>();

  //#endregion

  //#region State Properties

  @state() hasMenuActions = false;

  //#endregion

  //#region Public Properties

  /** Specifies the number of columns. */
  @property({ type: Number, reflect: true }) columns?: Columns;

  /** When `true`, expands the component and its contents. */
  @property({ reflect: true }) expanded = false;

  /** @copyDoc */
  @property() label?: string;

  /**
   * Indicates the layout of the component.
   *
   * @internal
   */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> =
    "vertical";

  /** @copyDoc */
  @property() menuFlipPlacements?: FlipPlacement[];

  /** When `true`, the `calcite-action-menu` is open. */
  @property({ reflect: true }) menuOpen = false;

  /** Specifies the position of the action menu. */
  @property({ reflect: true }) menuPlacement?: LogicalPlacement;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** @copyDoc */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** When `true`, the component's actions will not be overflowed into a menu by a parent `calcite-action-bar`. */
  @property({ reflect: true }) overflowActionsDisabled = false;

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

  /**
   * @copyDoc
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  /**
   * Specifies the actions in the group.
   *
   * @readonly
   */
  @property({ attribute: false }) actions: Action["el"][] = [];

  /**
   * Specifies the active actions in the group.
   *
   * @readonly
   */
  @property() selectedActions: Action["el"][] = [];

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
    return this.focusSetter(() => this.el, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's content area is collapsed. */
  calciteActionGroupCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteActionGroupExpand = createEvent({ cancelable: false });

  /** Fires after an action's active state changes. */
  calciteActionGroupChange = createEvent({ cancelable: false });

  /** Fires after the component's slotted actions change. */
  calciteActionGroupActionsChange = createEvent({ cancelable: false });

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
      this.syncSelectionState();
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
    const nextActive = !active.active;

    switch (this.selectionMode) {
      case "multiple":
        this.updateAction(active, nextActive);
        break;
      case "single":
        this.actions.forEach((action, i) => this.updateAction(action, i === index && nextActive));
        break;
      case "single-persist":
        if (!this.actions[index].active) {
          this.actions.forEach((action, i) => this.updateAction(action, i === index));
          this.updateSelectedActions([active]);
          this.calciteActionGroupChange.emit();
        }
        return;
      default:
        return;
    }

    this.updateSelectedActions(this.actions.filter((action) => action.active));
    this.calciteActionGroupChange.emit();
  }

  private setMenuOpen(event: ToEvents<ActionMenu>["calciteActionMenuOpen"]): void {
    this.menuOpen = !!event.currentTarget.open;
  }

  private syncSelectionState(): void {
    if (this.selectionMode !== "none") {
      this.setRoleOnActions();
    } else {
      this.clearActionAriaAttributes();
    }

    if (this.selectionMode === "single" || this.selectionMode === "single-persist") {
      const selected = this.actions?.filter((action) => action.active) ?? [];
      if (selected.length > 1) {
        this.actions.forEach((action) =>
          this.updateAction(action, action === selected[selected.length - 1]),
        );
      }
    }

    this.updateSelectedActions(
      this.selectionMode === "none" ? [] : (this.actions?.filter((action) => action.active) ?? []),
    );
  }

  private syncActions(): void {
    const defaultActions = this.defaultSlotRef.value
      ? getSlotAssignedElements<Action["el"]>(this.defaultSlotRef.value, "calcite-action")
      : [];
    const menuActions = this.menuActionsSlotRef.value
      ? getSlotAssignedElements<Action["el"]>(this.menuActionsSlotRef.value, "calcite-action")
      : [];

    this.actions = [...defaultActions, ...menuActions];
    this.syncSelectionState();
  }

  private syncActionsAndEmitChange(): void {
    this.syncActions();
    this.calciteActionGroupActionsChange.emit();
  }

  private handleDefaultSlotChange(): void {
    this.syncActionsAndEmitChange();
  }

  private handleMenuActionsSlotChange(event: Event): void {
    this.hasMenuActions = slotChangeHasAssignedElement(event);
    this.syncActionsAndEmitChange();
  }

  private handleActionClick(event: MouseEvent): void {
    const target = event
      .composedPath()
      .find((element): element is Action["el"] => isAction(element as Element));

    if (!target || target.disabled) {
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

  private updateAction(action: Action["el"], isActive: boolean): void {
    action.active = isActive;
    this.setActionAriaChecked(action, isActive);
  }

  private updateSelectedActions(nextSelected: Action["el"][]): void {
    const currentSelected = this.selectedActions;

    if (currentSelected.length === nextSelected.length) {
      const matches = currentSelected.every((action, index) => action === nextSelected[index]);
      if (matches) {
        return;
      }
    }

    this.selectedActions = nextSelected;
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
        topLayerDisabled={this.topLayerDisabled}
      >
        <calcite-action
          aria={{ expanded }}
          icon={ICONS.menu}
          scale={scale}
          slot={ACTION_MENU_SLOTS.trigger}
          text={messages.more}
          textEnabled={expanded}
        />
        <slot
          name={SLOTS.menuActions}
          onSlotChange={this.handleMenuActionsSlotChange}
          ref={this.menuActionsSlotRef}
        />
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
        <slot onSlotChange={this.handleDefaultSlotChange} ref={this.defaultSlotRef} />
        {this.renderMenu()}
      </div>
    );
  }

  //#endregion
}
