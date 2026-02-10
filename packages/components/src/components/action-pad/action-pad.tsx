// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { FocusableElement, tabbable } from "tabbable";
import { getFirstTabbable, slotChangeGetAssignedElements } from "../../utils/dom";
import { ExpandToggle, toggleChildActionText } from "../functional/ExpandToggle";
import { Layout, Position, Scale, SelectionAppearance } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { OverlayPositioning } from "../../utils/floating-ui";
import { useT9n } from "../../controllers/useT9n";
import type { Tooltip } from "../tooltip/tooltip";
import { Action } from "../action/action";
import type { ActionGroup } from "../action-group/action-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import { logger } from "../../utils/logger";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS } from "./resources";
import { styles } from "./action-pad.scss";

declare global {
  interface DeclareElements {
    "calcite-action-pad": ActionPad;
  }
}

/**
 * @deprecated in v5.0.0, removal target v6.0.0 - Use the `calcite-action-bar` component instead.
 * @slot - A slot for adding `calcite-action`s to the component.
 * @slot expand-tooltip - A slot to set the `calcite-tooltip` for the expand toggle.
 */
export class ActionPad extends LitElement {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private actions: Action["el"][] = [];

  private actionGroups: ActionGroup["el"][];

  private mutationObserver = createObserver("mutation", () => this.mutationObserverHandler());

  private toggleExpand = (): void => {
    this.expanded = !this.expanded;
    this.calciteActionPadToggle.emit();
  };

  private tabbableItems: FocusableElement[] = [];

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  private isMenuOpen = false;

  private handleFocusOut = (event: FocusEvent): void => {
    if (!this.el.contains(event.relatedTarget as Node)) {
      this.clearTabIndexes();
    }
  };

  //#endregion

  //#region State Properties

  @state() expandTooltip: Tooltip["el"];

  //#endregion

  //#region Public Properties

  /** Specifies the accessible label for the last `calcite-action-group`. */
  @property() actionsEndGroupLabel: string;

  /** When `true`, the expand-toggling behavior is disabled. */
  @property({ reflect: true }) expandDisabled = false;

  /** When `true`, expands the component and its contents. */
  @property({ reflect: true }) expanded = false;

  /** Specifies the layout of the component. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> =
    "vertical";

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the type of positioning to use for overlaid content, where:
   *
   * `"absolute"` works for most cases - positioning the component inside of overflowing parent containers, which affects the container's layout, and
   *
   * `"fixed"` is used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the position of the component depending on the element's `dir` property. */
  @property({ reflect: true }) position: Extract<"start" | "end", Position>;

  /** Specifies the size of the expand `calcite-action`. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the selection appearance of the component */
  @property({ reflect: true }) selectionAppearance: Extract<
    "neutral" | "highlight",
    SelectionAppearance
  > = "neutral";

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
  calciteActionPadCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteActionPadExpand = createEvent({ cancelable: false });

  /** Fires when the `expanded` property is toggled. */
  calciteActionPadToggle = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler);
    this.listen("keydown", this.handleKeyDown);
    this.listen("focusout", this.handleFocusOut);
  }

  override connectedCallback(): void {
    this.updateActions();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  async load(): Promise<void> {
    logger.deprecated("component", {
      component: this,
      name: "action-pad",
      removalVersion: 5,
      suggested: "action-bar",
    });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("expanded") && this.hasUpdated) {
      toggleChildActionText({ el: this.el, expanded: this.expanded });
    }

    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.updateGroups();
    }

    if (changes.has("expanded") && this.hasUpdated) {
      if (this.expanded) {
        this.calciteActionPadExpand.emit();
      } else {
        this.calciteActionPadCollapse.emit();
      }
    }

    if (
      changes.has("selectionAppearance") &&
      (this.hasUpdated || this.selectionAppearance !== "neutral")
    ) {
      this.updateActions();
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private actionMenuOpenHandler(event: CustomEvent<void>): void {
    this.isMenuOpen = (event.target as ActionGroup["el"]).menuOpen;

    if ((event.target as ActionGroup["el"]).menuOpen) {
      const composedPath = event.composedPath();
      this.actionGroups?.forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }
  }

  private updateGroups(): void {
    const groups = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = groups;
    this.setGroupLayout(groups);
  }

  private setGroupLayout(groups: ActionGroup["el"][]): void {
    groups.forEach((group) => (group.layout = this.layout));
  }

  private handleDefaultSlotChange(): void {
    this.updateGroups();
    this.queryAndStoreActions();
    this.updateActions();
    this.updateTabbableItems();
  }

  private handleTooltipSlotChange(event: Event): void {
    const tooltips = slotChangeGetAssignedElements(event).filter((el): el is Tooltip["el"] =>
      el?.matches("calcite-tooltip"),
    );

    this.expandTooltip = tooltips[0];
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const items = this.tabbableItems;
    const focusEl: FocusableElement | null = getFirstTabbable(event.target as HTMLElement);

    if (this.isMenuOpen) {
      return;
    }

    let nextIdx: number;
    switch (event.key) {
      case "ArrowRight": {
        if (this.layout === "horizontal") {
          nextIdx = (items.indexOf(focusEl) + 1) % items.length;
          items[nextIdx].focus();
          this.setTabIndexes(items[nextIdx], items);
          event.preventDefault();
        }
        break;
      }
      case "ArrowDown": {
        if (this.layout === "vertical") {
          nextIdx = (items.indexOf(focusEl) + 1) % items.length;
          items[nextIdx].focus();
          this.setTabIndexes(items[nextIdx], items);
          event.preventDefault();
        }
        break;
      }
      case "ArrowLeft": {
        if (this.layout === "horizontal") {
          nextIdx = (items.indexOf(focusEl) - 1 + items.length) % items.length;
          items[nextIdx].focus();
          this.setTabIndexes(items[nextIdx], items);
          event.preventDefault();
        }
        break;
      }
      case "ArrowUp": {
        if (this.layout === "vertical") {
          nextIdx = (items.indexOf(focusEl) - 1 + items.length) % items.length;
          items[nextIdx].focus();
          this.setTabIndexes(items[nextIdx], items);
          event.preventDefault();
        }
        break;
      }
      case "Home":
        items[0].focus();
        this.setTabIndexes(items[0], items);
        event.preventDefault();
        break;
      case "End":
        items[items.length - 1].focus();
        this.setTabIndexes(items[items.length - 1], items);
        event.preventDefault();
        break;
      case "Tab":
        this.setTabIndexes(focusEl as HTMLButtonElement, items, true);
        break;
    }
  }

  private setTabIndexes(
    active: FocusableElement | null,
    items: FocusableElement[],
    checkDisabled = false,
  ): void {
    if (this.isMenuOpen) {
      return;
    }
    items.forEach((item) => {
      const isDisabled = (checkDisabled && (item as HTMLButtonElement).disabled) ?? false;
      item.tabIndex = !isDisabled && item === active ? 0 : -1;
    });
  }

  private clearTabIndexes(): void {
    this.tabbableItems.forEach((item) => {
      item.removeAttribute("tabindex");
    });
  }

  private updateActions(): void {
    this.actions.forEach((action) => {
      action.selectionAppearance = this.selectionAppearance;
    });
  }

  private queryAndStoreActions(): void {
    this.actions = Array.from(this.el.querySelectorAll("calcite-action"));
  }

  private mutationObserverHandler(): void {
    this.updateGroups();
    this.queryAndStoreActions();
    this.updateActions();
    this.updateTabbableItems();
  }

  private updateTabbableItems(): void {
    setTimeout(() => {
      this.tabbableItems = tabbable(this.el, { includeContainer: true, getShadowRoot: true });
    }, 1000);
  }

  //#endregion

  //#region Rendering

  private renderBottomActionGroup(): JsxNode {
    const {
      expanded,
      expandDisabled,
      messages,
      el,
      position,
      toggleExpand,
      scale,
      layout,
      actionsEndGroupLabel,
      overlayPositioning,
    } = this;

    const expandToggleNode = !expandDisabled ? (
      <ExpandToggle
        collapseLabel={messages.collapseLabel}
        collapseText={messages.collapse}
        el={el}
        expandLabel={messages.expandLabel}
        expandText={messages.expand}
        expanded={expanded}
        position={position}
        scale={scale}
        toggle={toggleExpand}
        tooltip={this.expandTooltip}
      />
    ) : null;

    return expandToggleNode ? (
      <calcite-action-group
        class={CSS.actionGroupEnd}
        label={actionsEndGroupLabel}
        layout={layout}
        overlayPositioning={overlayPositioning}
        scale={scale}
      >
        <slot name={SLOTS.expandTooltip} onSlotChange={this.handleTooltipSlotChange} />
        {expandToggleNode}
      </calcite-action-group>
    ) : null;
  }

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        <slot onSlotChange={this.handleDefaultSlotChange} />
        {this.renderBottomActionGroup()}
      </div>
    );
  }

  //#endregion
}
