import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  Watch,
  h,
  VNode,
  Method
} from "@stencil/core";
import { Position, Scale, Layout } from "../interfaces";
import { ExpandToggle, toggleChildActionText } from "../functional/ExpandToggle";
import { CSS, SLOTS, TEXT } from "./resources";
import { getSlotted, focusElement } from "../../utils/dom";
import {
  geActionDimensions,
  getOverflowCount,
  overflowActions,
  queryActions,
  overflowActionsDebounceInMs
} from "./utils";
import { createObserver } from "../../utils/observers";
import { debounce } from "lodash-es";
import {
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
  ConditionalSlotComponent
} from "../../utils/conditionalSlot";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";

/**
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the action bar.
 * @slot bottom-actions - A slot for adding `calcite-action`s that will appear at the bottom of the action bar, above the collapse/expand button.
 * @slot expand-tooltip - Used to set the tooltip for the expand toggle.
 */
@Component({
  tag: "calcite-action-bar",
  styleUrl: "action-bar.scss",
  shadow: true
})
export class ActionBar implements ConditionalSlotComponent, LoadableComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the expand-toggling behavior is disabled.
   */
  @Prop({ reflect: true }) expandDisabled = false;

  @Watch("expandDisabled")
  expandHandler(): void {
    this.conditionallyOverflowActions();
  }

  /**
   * When `true`, the component is expanded.
   */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(expanded: boolean): void {
    toggleChildActionText({ parent: this.el, expanded });
    this.conditionallyOverflowActions();
  }

  /**
   * Specifies the label of the expand icon when the component is collapsed.
   */
  @Prop() intlExpand: string;

  /**
   * Specifies the label of the collapse icon when the component is expanded.
   */
  @Prop() intlCollapse: string;

  /**
   *  The layout direction of the actions.
   */
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "vertical";

  /**
   * Disables automatically overflowing `calcite-action`s that won't fit into menus.
   */
  @Prop({ reflect: true }) overflowActionsDisabled = false;

  @Watch("overflowActionsDisabled")
  overflowDisabledHandler(overflowActionsDisabled: boolean): void {
    overflowActionsDisabled
      ? this.resizeObserver.disconnect()
      : this.resizeObserver.observe(this.el);
  }

  /**
   * Arranges the component depending on the element's `dir` property.
   */
  @Prop({ reflect: true }) position: Position;

  /**
   * Specifies the size of the expand `calcite-action`.
   */
  @Prop({ reflect: true }) scale: Scale;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when the `expanded` property is toggled.
   */
  @Event({ cancelable: false }) calciteActionBarToggle: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionBarElement;

  mutationObserver = createObserver("mutation", () => {
    const { el, expanded } = this;
    toggleChildActionText({ parent: el, expanded });
    this.conditionallyOverflowActions();
  });

  resizeObserver = createObserver("resize", (entries) => this.resizeHandlerEntries(entries));

  expandToggleEl: HTMLCalciteActionElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.conditionallyOverflowActions();
  }

  connectedCallback(): void {
    const { el, expanded } = this;

    toggleChildActionText({ parent: el, expanded });

    this.mutationObserver?.observe(el, { childList: true, subtree: true });

    if (!this.overflowActionsDisabled) {
      this.resizeObserver?.observe(el);
    }

    this.conditionallyOverflowActions();
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectConditionalSlotComponent(this);
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
   * Sets focus on the component.
   *
   * @param focusId
   */
  @Method()
  async setFocus(focusId?: "expand-toggle"): Promise<void> {
    await componentLoaded(this);

    if (focusId === "expand-toggle") {
      await focusElement(this.expandToggleEl);
      return;
    }

    this.el?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  actionMenuOpenChangeHandler = (event: CustomEvent<void>): void => {
    if ((event.target as HTMLCalciteActionGroupElement).menuOpen) {
      const composedPath = event.composedPath();
      Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }
  };

  resizeHandlerEntries = (entries: ResizeObserverEntry[]): void => {
    entries.forEach(this.resizeHandler);
  };

  resizeHandler = (entry: ResizeObserverEntry): void => {
    const { width, height } = entry.contentRect;
    this.resize({ width, height });
  };

  private resize = debounce(({ width, height }: { width: number; height: number }): void => {
    const { el, expanded, expandDisabled, layout } = this;

    if ((layout === "vertical" && !height) || (layout === "horizontal" && !width)) {
      return;
    }

    const actions = queryActions(el);
    const actionCount = expandDisabled ? actions.length : actions.length + 1;
    const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
    const groupCount =
      getSlotted(el, SLOTS.bottomActions) || !expandDisabled
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
      groupCount
    });

    overflowActions({
      actionGroups,
      expanded,
      overflowCount
    });
  }, overflowActionsDebounceInMs);

  conditionallyOverflowActions = (): void => {
    if (!this.overflowActionsDisabled) {
      this.overflowActions();
    }
  };

  toggleExpand = (): void => {
    this.expanded = !this.expanded;
    this.calciteActionBarToggle.emit();
  };

  setExpandToggleRef = (el: HTMLCalciteActionElement): void => {
    this.expandToggleEl = el;
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
      intlExpand,
      intlCollapse,
      el,
      position,
      toggleExpand,
      scale,
      layout
    } = this;

    const tooltip = getSlotted(el, SLOTS.expandTooltip) as HTMLCalciteTooltipElement;
    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;

    const expandToggleNode = !expandDisabled ? (
      <ExpandToggle
        el={el}
        expanded={expanded}
        intlCollapse={collapseLabel}
        intlExpand={expandLabel}
        position={position}
        ref={this.setExpandToggleRef}
        scale={scale}
        toggle={toggleExpand}
        tooltip={tooltip}
      />
    ) : null;

    return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (
      <calcite-action-group class={CSS.actionGroupBottom} layout={layout} scale={scale}>
        <slot name={SLOTS.bottomActions} />
        <slot name={SLOTS.expandTooltip} />
        {expandToggleNode}
      </calcite-action-group>
    ) : null;
  }

  render(): VNode {
    return (
      <Host onCalciteActionMenuOpenChange={this.actionMenuOpenChangeHandler}>
        <slot />
        {this.renderBottomActionGroup()}
      </Host>
    );
  }
}
