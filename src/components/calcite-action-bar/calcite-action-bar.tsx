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
    const { el, expandDisabled } = this;
    const { clientHeight } = entry.target;

    const actions = el.querySelectorAll("calcite-action");
    const actionGroups = el.querySelectorAll("calcite-action-group");
    const actionBuffer = 5;
    const actionHeight = actions[0].clientHeight + actionBuffer;
    const maxCount = Math.floor(clientHeight / actionHeight);

    const actionsTotal = expandDisabled ? actions.length : actions.length + 1;

    const hiddenActionCount = actionsTotal > maxCount ? actionsTotal - maxCount : 0;

    const numToHideInEachGroup = hiddenActionCount
      ? Math.ceil(hiddenActionCount + 1 / actionGroups.length)
      : 0;

    actionGroups.forEach((group) => {
      const groupActions = Array.from(group.querySelectorAll("calcite-action")).reverse();
      groupActions.forEach((action, index) => {
        index < numToHideInEachGroup
          ? action.setAttribute("slot", "menu-actions")
          : action.removeAttribute("slot");
      });
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
