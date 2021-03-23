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
  Method,
  forceUpdate
} from "@stencil/core";
import { Position, Theme } from "../interfaces";
import { CalciteExpandToggle, toggleChildActionText } from "../functional/CalciteExpandToggle";
import { CSS, SLOTS, TEXT } from "./resources";
import { getSlotted, focusElement } from "../../utils/dom";

/**
 * @slot bottom-actions - A slot for adding `calcite-action`s that will appear at the bottom of the action bar, above the collapse/expand button.
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the action bar.
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
   * Used to set the tooltip for the expand toggle.
   */
  @Prop() tooltipExpand?: HTMLCalciteTooltipElement;

  /**
   * Updates the label of the expand icon when the component is not expanded.
   */
  @Prop() intlExpand?: string;

  /**
   * Updates the label of the collapse icon when the component is expanded.
   */
  @Prop() intlCollapse?: string;

  /**
   * Arranges the component depending on the elements 'dir' property.
   */
  @Prop({ reflect: true }) position: Position;

  /**
   * Used to set the component's color scheme.
   */
  @Prop({ reflect: true }) theme: Theme;

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
  });

  resizeObserver = new ResizeObserver((entries) => this.resized(entries));

  expandToggleEl: HTMLCalciteActionElement;

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
    this.resizeObserver.observe(el);
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

  resized = ([entry]: ResizeObserverEntry[]): void => {
    const { el, expanded, expandDisabled, lastResizeHeight } = this;
    const { height } = entry.contentRect;

    if (height === lastResizeHeight) {
      return;
    }

    this.lastResizeHeight = height;

    const actions = el.querySelectorAll("calcite-action");
    const actionCount = expandDisabled ? actions.length : actions.length + 1;
    const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
    const actionGroupCount = actionGroups.length;

    const actionHeight = actions[0].clientHeight; // todo: get heights in function
    const maxActionsCount = Math.floor((height - actionGroupCount * 16) / actionHeight); // todo: get heights in function

    const totalActionsToOverflow =
      actionCount >= maxActionsCount ? (actionCount - maxActionsCount) * 2 : 0;

    // todo: add option to turn this logic on.
    // todo: move this below logic into utility function 'overFlowActions'?
    let slottedCount = 0;
    actionGroups
      .sort((a, b) => b.childElementCount - a.childElementCount)
      .forEach((group) => {
        const groupActions = Array.from(group.querySelectorAll("calcite-action")).reverse();

        groupActions.forEach((groupAction) => {
          groupAction.removeAttribute("slot");
          groupAction.textEnabled = expanded;
        });

        if (slottedCount < totalActionsToOverflow) {
          groupActions.some((groupAction) => {
            const unslottedActions = groupActions.filter((action) => !action.slot);

            if (unslottedActions.length > 1 && groupActions.length > 1) {
              groupAction.textEnabled = true;
              groupAction.setAttribute("slot", "menu-actions");
              slottedCount++;
            }

            return slottedCount >= totalActionsToOverflow;
          });
        }

        forceUpdate(group);
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
    const {
      expanded,
      expandDisabled,
      intlExpand,
      intlCollapse,
      el,
      position,
      toggleExpand,
      tooltipExpand
    } = this;

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
        tooltip={tooltipExpand}
      />
    ) : null;

    return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (
      <calcite-action-group class={CSS.actionGroupBottom}>
        <slot name={SLOTS.bottomActions} />
        {expandToggleNode}
      </calcite-action-group>
    ) : null;
  }

  render(): VNode {
    return (
      <Host>
        <slot />
        {this.renderBottomActionGroup()}
      </Host>
    );
  }
}
