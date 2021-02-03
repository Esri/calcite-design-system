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
import { Position, Theme } from "../interfaces";
import { CalciteExpandToggle, toggleChildActionText } from "../functional/CalciteExpandToggle";
import { CSS, SLOTS, TEXT } from "./resources";
import { getSlotted, focusElement, getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";

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
  @Prop({ reflect: true }) expanded = false;

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

  observer = new MutationObserver(() => {
    const { el, expanded } = this;
    toggleChildActionText({ parent: el, expanded });
  });

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

    this.observer.observe(el, { childList: true });
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
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
      tooltipExpand,
      expandToggleEl
    } = this;

    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;
    const rtl = getElementDir(el) === "rtl";

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

    if (rtl) {
      if (expandToggleEl?.shadowRoot) {
        expandToggleEl.shadowRoot.querySelector("button").classList.add(CSS_UTILITY.rtl);
      }
    }

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
