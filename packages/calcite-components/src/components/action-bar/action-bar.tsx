import { debounce } from "lodash-es";
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  Fragment,
  h,
  method,
  state,
  JsxNode,
} from "@arcgis/lumina";
import {
  focusFirstTabbable,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { ExpandToggle, toggleChildActionText } from "../functional/ExpandToggle";
import { Layout, Position, Scale } from "../interfaces";
import { OverlayPositioning } from "../../utils/floating-ui";
import { DEBOUNCE } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import type { Tooltip } from "../tooltip/tooltip";
import type { ActionGroup } from "../action-group/action-group";
import T9nStrings from "./assets/t9n/action-bar.t9n.en.json";
import { CSS, SLOTS } from "./resources";
import { geActionDimensions, getOverflowCount, overflowActions, queryActions } from "./utils";
import { styles } from "./action-bar.scss";

declare global {
  interface DeclareElements {
    "calcite-action-bar": ActionBar;
  }
}

/**
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the component.
 * @slot bottom-actions - [Deprecated] Use the `"actions-end"` slot instead. A slot for adding `calcite-action`s that will appear at the bottom of the component, above the collapse/expand button.
 * @slot actions-end - A slot for adding `calcite-action`s that will appear at the end of the component, prior to the collapse/expand button.
 * @slot expand-tooltip - A slot to set the `calcite-tooltip` for the expand toggle.
 */
export class ActionBar extends LitElement implements LoadableComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private actionGroups: ActionGroup["el"][];

  private mutationObserver = createObserver("mutation", () => this.mutationObserverHandler());

  private resize = debounce(({ width, height }: { width: number; height: number }): void => {
    const { el, expanded, expandDisabled, layout, overflowActionsDisabled, actionGroups } = this;

    if (
      overflowActionsDisabled ||
      (layout === "vertical" && !height) ||
      (layout === "horizontal" && !width)
    ) {
      return;
    }

    const actions = queryActions(el);
    const actionCount = expandDisabled ? actions.length : actions.length + 1;
    this.updateGroups();

    const groupCount =
      this.hasActionsEnd || this.hasBottomActions || !expandDisabled
        ? actionGroups.length + 1
        : actionGroups.length;

    const { actionHeight, actionWidth } = geActionDimensions(actions);

    const overflowCount = getOverflowCount({
      layout,
      actionCount,
      actionHeight,
      actionWidth,
      height,
      width,
      groupCount,
    });

    overflowActions({
      actionGroups,
      expanded,
      overflowCount,
    });
  }, DEBOUNCE.resize);

  private resizeHandler = (entry: ResizeObserverEntry): void => {
    const { width, height } = entry.contentRect;
    this.resize({ width, height });
  };

  private resizeObserver = createObserver("resize", (entries) =>
    this.resizeHandlerEntries(entries),
  );

  private toggleExpand = (): void => {
    this.expanded = !this.expanded;
    this.calciteActionBarToggle.emit();
  };

  // #endregion

  // #region State Properties

  @state() expandTooltip: Tooltip["el"];

  @state() hasActionsEnd = false;

  @state() hasBottomActions = false;

  // #endregion

  // #region Public Properties

  /** Specifies the accessible label for the last `calcite-action-group`. */
  @property() actionsEndGroupLabel: string;

  /** When `true`, the expand-toggling behavior is disabled. */
  @property({ reflect: true }) expandDisabled = false;

  /** When `true`, the component is expanded. */
  @property({ reflect: true }) expanded = false;

  /** Specifies the layout direction of the actions. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "vertical";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /** Disables automatically overflowing `calcite-action`s that won't fit into menus. */
  @property({ reflect: true }) overflowActionsDisabled = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Arranges the component depending on the element's `dir` property. */
  @property({ reflect: true }) position: Extract<"start" | "end", Position>;

  /** Specifies the size of the expand `calcite-action`. */
  @property({ reflect: true }) scale: Scale = "m";

  // #endregion

  // #region Public Methods

  /**
   * Overflows actions that won't fit into menus.
   *
   * @private
   */
  @method()
  async overflowActions(): Promise<void> {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    focusFirstTabbable(this.el);
  }

  // #endregion

  // #region Events

  /** Fires when the `expanded` property is toggled. */
  calciteActionBarToggle = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler);
  }

  override connectedCallback(): void {
    this.updateGroups();
    this.overflowActions();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("expandDisabled") && (this.hasUpdated || this.expandDisabled !== false)) {
      this.overflowActions();
    }

    if (changes.has("expanded") && this.hasUpdated) {
      this.expandedHandler();
    }

    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.updateGroups();
    }

    if (
      changes.has("overflowActionsDisabled") &&
      (this.hasUpdated || this.overflowActionsDisabled !== false)
    ) {
      this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
    }
  }

  loaded(): void {
    setComponentLoaded(this);
    this.overflowActions();
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods
  private expandedHandler(): void {
    const { el, expanded } = this;
    toggleChildActionText({ el, expanded });
    this.overflowActions();
  }

  private overflowActionsDisabledHandler(overflowActionsDisabled: boolean): void {
    if (overflowActionsDisabled) {
      this.resizeObserver?.disconnect();
      return;
    }

    this.resizeObserver?.observe(this.el);
    this.overflowActions();
  }

  private actionMenuOpenHandler(event: CustomEvent<void>): void {
    if ((event.target as ActionGroup["el"]).menuOpen) {
      const composedPath = event.composedPath();
      this.actionGroups?.forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }
  }

  private mutationObserverHandler(): void {
    this.updateGroups();
    this.overflowActions();
  }

  private resizeHandlerEntries(entries: ResizeObserverEntry[]): void {
    entries.forEach(this.resizeHandler);
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
  }

  private handleActionsEndSlotChange(event: Event): void {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  }

  private handleBottomActionsSlotChange(event: Event): void {
    this.hasBottomActions = slotChangeHasAssignedElement(event);
  }

  private handleTooltipSlotChange(event: Event): void {
    const tooltips = slotChangeGetAssignedElements(event).filter((el): el is Tooltip["el"] =>
      el?.matches("calcite-tooltip"),
    );

    this.expandTooltip = tooltips[0];
  }

  // #endregion

  // #region Rendering

  private renderBottomActionGroup(): JsxNode {
    const {
      expanded,
      expandDisabled,
      el,
      position,
      toggleExpand,
      scale,
      layout,
      messages,
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

    return (
      <calcite-action-group
        class={CSS.actionGroupEnd}
        hidden={this.expandDisabled && !(this.hasActionsEnd || this.hasBottomActions)}
        label={actionsEndGroupLabel}
        layout={layout}
        overlayPositioning={overlayPositioning}
        scale={scale}
      >
        <slot name={SLOTS.actionsEnd} onSlotChange={this.handleActionsEndSlotChange} />
        <slot name={SLOTS.bottomActions} onSlotChange={this.handleBottomActionsSlotChange} />
        <slot name={SLOTS.expandTooltip} onSlotChange={this.handleTooltipSlotChange} />
        {expandToggleNode}
      </calcite-action-group>
    );
  }

  override render(): JsxNode {
    return (
      <>
        <slot onSlotChange={this.handleDefaultSlotChange} />
        {this.renderBottomActionGroup()}
      </>
    );
  }

  // #endregion
}
