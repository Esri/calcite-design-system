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
import { Position } from "../interfaces";
import { CalciteExpandToggle, toggleChildActionText } from "../functional/CalciteExpandToggle";
import { CSS, SLOTS, TEXT } from "./resources";
import { getSlotted, focusElement } from "../../utils/dom";
import { getOverflowCount, overflowActions } from "./utils";

/**
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the action bar.
 * @slot bottom-actions - A slot for adding `calcite-action`s that will appear at the bottom of the action bar, above the collapse/expand button.
 * @slot expand-tooltip - Used to set the tooltip for the expand toggle.
 */
@Component({
  tag: "calcite-action-bar",
  styleUrl: "calcite-action-bar.scss",
  shadow: true
})
export class CalciteActionBar {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When set to true, the expand-toggling behavior will be disabled.
   */
  @Prop({ reflect: true }) expandDisabled = false;

  @Watch("expandDisabled")
  expandHandler(expandDisabled: boolean): void {
    if (!expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded: this.expanded });
    }

    this.resize(this.el.clientHeight);
  }

  /**
   * Indicates whether widget is expanded.
   */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(expanded: boolean): void {
    if (!this.expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded });
    }

    this.calciteActionBarToggle.emit();
  }

  /**
   * Updates the label of the expand icon when the component is not expanded.
   */
  @Prop() intlExpand?: string;

  /**
   * Updates the label of the collapse icon when the component is expanded.
   */
  @Prop() intlCollapse?: string;

  /**
   * Disables automatically overflowing actions that won't fit into menus.
   */
  @Prop() overflowActionsDisabled?: boolean;

  @Watch("overflowActionsDisabled")
  overflowDisabledHandler(overflowActionsDisabled: boolean): void {
    overflowActionsDisabled
      ? this.resizeObserver.disconnect()
      : this.resizeObserver.observe(this.el);
  }

  /**
   * Arranges the component depending on the elements 'dir' property.
   */
  @Prop({ reflect: true }) position: Position;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when expanded has been toggled.
   */
  @Event() calciteActionBarToggle: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionBarElement;

  mutationObserver = new MutationObserver(() => {
    const { el, expanded } = this;
    toggleChildActionText({ parent: el, expanded });
    this.resize(el.clientHeight);
  });

  resizeObserver = new ResizeObserver((entries) => this.resizeHandlerEntries(entries));

  expandToggleEl: HTMLCalciteActionElement;

  lastActionCount: number;

  lastGroupCount: number;

  lastResizeHeight: number;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentWillLoad(): void {
    const { el, expandDisabled, expanded } = this;

    if (!expandDisabled) {
      toggleChildActionText({ parent: el, expanded });
    }

    this.mutationObserver.observe(el, { childList: true });

    if (!this.overflowActionsDisabled) {
      this.resizeObserver.observe(el);
    }
  }

  componentDidLoad(): void {
    this.resize(this.el.clientHeight);
  }

  disconnectedCallback(): void {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async setFocus(focusId?: "expand-toggle"): Promise<void> {
    if (focusId === "expand-toggle") {
      await focusElement(this.expandToggleEl);
      return;
    }

    this.el.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  actionMenuOpenChangeHandler = (event: CustomEvent<boolean>): void => {
    if (event.detail) {
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
    const { height } = entry.contentRect;
    this.resize(height);
  };

  resize = (height: number): void => {
    const {
      el,
      expanded,
      expandDisabled,
      lastActionCount,
      lastGroupCount,
      lastResizeHeight,
      overflowActionsDisabled
    } = this;

    if (typeof height !== "number" || overflowActionsDisabled) {
      return;
    }

    const actions = el.querySelectorAll("calcite-action");
    const actionCount = expandDisabled ? actions.length : actions.length + 1;
    const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
    const groupCount =
      getSlotted(el, SLOTS.bottomActions) || !expandDisabled
        ? actionGroups.length + 1
        : actionGroups.length;

    if (
      lastResizeHeight === height &&
      lastActionCount === actionCount &&
      lastGroupCount === groupCount
    ) {
      return;
    }

    this.lastActionCount = actionCount;
    this.lastGroupCount = groupCount;
    this.lastResizeHeight = height;

    const overflowCount = getOverflowCount({ actionCount, height, groupCount });

    overflowActions({
      actionGroups,
      expanded,
      overflowCount
    });
  };

  toggleExpand = (): void => {
    this.expanded = !this.expanded;
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
    const { expanded, expandDisabled, intlExpand, intlCollapse, el, position, toggleExpand } = this;

    const tooltip = getSlotted(el, SLOTS.expandTooltip) as HTMLCalciteTooltipElement;
    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;

    const expandToggleNode = !expandDisabled ? (
      <CalciteExpandToggle
        el={el}
        expanded={expanded}
        intlCollapse={collapseLabel}
        intlExpand={expandLabel}
        position={position}
        ref={this.setExpandToggleRef}
        toggle={toggleExpand}
        tooltip={tooltip}
      />
    ) : null;

    return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (
      <calcite-action-group class={CSS.actionGroupBottom}>
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
