import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { debounce } from "lodash-es";
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
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { ExpandToggle, toggleChildActionText } from "../functional/ExpandToggle";
import { Layout, Position, Scale } from "../interfaces";
import { OverlayPositioning } from "../../utils/floating-ui";
import { DEBOUNCE } from "../../utils/resources";
import { ActionBarMessages } from "./assets/action-bar/t9n";
import { CSS, SLOTS } from "./resources";
import { geActionDimensions, getOverflowCount, overflowActions, queryActions } from "./utils";

/**
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the component.
 * @slot bottom-actions - [Deprecated] Use the `"actions-end"` slot instead. A slot for adding `calcite-action`s that will appear at the bottom of the component, above the collapse/expand button.
 * @slot actions-end - A slot for adding `calcite-action`s that will appear at the end of the component, prior to the collapse/expand button.
 * @slot expand-tooltip - A slot to set the `calcite-tooltip` for the expand toggle.
 */
@Component({
  tag: "calcite-action-bar",
  styleUrl: "action-bar.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class ActionBar implements LoadableComponent, LocalizedComponent, T9nComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Specifies the accessible label for the last `calcite-action-group`.
   */
  @Prop() actionsEndGroupLabel: string;

  /**
   * When `true`, the expand-toggling behavior is disabled.
   */
  @Prop({ reflect: true }) expandDisabled = false;

  @Watch("expandDisabled")
  expandDisabledHandler(): void {
    this.overflowActions();
  }

  /**
   * When `true`, the component is expanded.
   */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(): void {
    const { el, expanded } = this;
    toggleChildActionText({ el, expanded });
    this.overflowActions();
  }

  /**
   *  Specifies the layout direction of the actions.
   */
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "vertical";

  @Watch("layout")
  layoutHandler(): void {
    this.updateGroups();
  }

  /**
   * Disables automatically overflowing `calcite-action`s that won't fit into menus.
   */
  @Prop({ reflect: true }) overflowActionsDisabled = false;

  @Watch("overflowActionsDisabled")
  overflowActionsDisabledHandler(overflowActionsDisabled: boolean): void {
    if (overflowActionsDisabled) {
      this.resizeObserver?.disconnect();
      return;
    }

    this.resizeObserver?.observe(this.el);
    this.overflowActions();
  }

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Arranges the component depending on the element's `dir` property.
   */
  @Prop({ reflect: true }) position: Extract<"start" | "end", Position>;

  /**
   * Specifies the size of the expand `calcite-action`.
   */
  @Prop({ reflect: true }) scale: Scale;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ActionBarMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ActionBarMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the `expanded` property is toggled.
   */
  @Event({ cancelable: false }) calciteActionBarToggle: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionBarElement;

  mutationObserver = createObserver("mutation", () => this.mutationObserverHandler());

  resizeObserver = createObserver("resize", (entries) => this.resizeHandlerEntries(entries));

  actionGroups: HTMLCalciteActionGroupElement[];

  @State() effectiveLocale: string;

  @State() hasActionsEnd = false;

  @State() hasBottomActions = false;

  @State() expandTooltip: HTMLCalciteTooltipElement;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: ActionBarMessages;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);

    this.updateGroups();
    this.overflowActions();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.overflowActions();
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Overflows actions that won't fit into menus.
   *
   * @internal
   */
  @Method()
  async overflowActions(): Promise<void> {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }

  /**
   * Sets focus on the component's first focusable element.
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    focusFirstTabbable(this.el);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  actionMenuOpenHandler = (event: CustomEvent<void>): void => {
    if ((event.target as HTMLCalciteActionGroupElement).menuOpen) {
      const composedPath = event.composedPath();
      this.actionGroups?.forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }
  };

  mutationObserverHandler = (): void => {
    this.updateGroups();
    this.overflowActions();
  };

  resizeHandlerEntries = (entries: ResizeObserverEntry[]): void => {
    entries.forEach(this.resizeHandler);
  };

  resizeHandler = (entry: ResizeObserverEntry): void => {
    const { width, height } = entry.contentRect;
    this.resize({ width, height });
  };

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

  toggleExpand = (): void => {
    this.expanded = !this.expanded;
    this.calciteActionBarToggle.emit();
  };

  updateGroups(): void {
    const groups = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = groups;
    this.setGroupLayout(groups);
  }

  setGroupLayout(groups: HTMLCalciteActionGroupElement[]): void {
    groups.forEach((group) => (group.layout = this.layout));
  }

  handleDefaultSlotChange = (): void => {
    this.updateGroups();
  };

  handleActionsEndSlotChange = (event: Event): void => {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  };

  handleBottomActionsSlotChange = (event: Event): void => {
    this.hasBottomActions = slotChangeHasAssignedElement(event);
  };

  handleTooltipSlotChange = (event: Event): void => {
    const tooltips = slotChangeGetAssignedElements(event).filter(
      (el): el is HTMLCalciteTooltipElement => el?.matches("calcite-tooltip"),
    );

    this.expandTooltip = tooltips[0];
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderBottomActionGroup(): VNode {
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
        <slot name={SLOTS.actionsEnd} onSlotchange={this.handleActionsEndSlotChange} />
        <slot name={SLOTS.bottomActions} onSlotchange={this.handleBottomActionsSlotChange} />
        <slot name={SLOTS.expandTooltip} onSlotchange={this.handleTooltipSlotChange} />
        {expandToggleNode}
      </calcite-action-group>
    );
  }

  render(): VNode {
    return (
      <Host onCalciteActionMenuOpen={this.actionMenuOpenHandler}>
        <slot onSlotchange={this.handleDefaultSlotChange} />
        {this.renderBottomActionGroup()}
      </Host>
    );
  }
}
