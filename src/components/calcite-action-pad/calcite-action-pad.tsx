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
import { Layout, Position, Theme } from "../interfaces";
import { CalciteExpandToggle, toggleChildActionText } from "../functional/CalciteExpandToggle";
import { getElementDir, focusElement, getSlotted } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { CSS, TEXT, SLOTS } from "./resources";

/**
 * @slot - A slot for adding `calcite-action`s to the action pad.
 * @slot expand-tooltip - Used to set the tooltip for the expand toggle.
 */
@Component({
  tag: "calcite-action-pad",
  styleUrl: "calcite-action-pad.scss",
  shadow: true
})
export class CalciteActionPad {
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

    this.calciteActionPadToggle.emit();
  }

  /**
   * Indicates the horizontal or vertical layout of the component.
   */
  @Prop({ reflect: true }) layout: Layout = "vertical";

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
  @Event() calciteActionPadToggle: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionPadElement;

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

  toggleExpand = (): void => {
    this.expanded = !this.expanded;
  };

  setExpandToggleRef = (el: HTMLCalciteActionElement): void => {
    this.expandToggleEl = el;
  };

  // --------------------------------------------------------------------------
  //
  //  Component Methods
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

    return expandToggleNode ? (
      <calcite-action-group class={CSS.actionGroupBottom}>
        <slot name={SLOTS.expandTooltip} />
        {expandToggleNode}
      </calcite-action-group>
    ) : null;
  }

  render(): VNode {
    const rtl = getElementDir(this.el) === "rtl";
    const containerClasses = {
      [CSS.container]: true,
      [CSS_UTILITY.rtl]: rtl
    };

    return (
      <Host onCalciteActionMenuOpenChange={this.actionMenuOpenChangeHandler}>
        <div class={containerClasses}>
          <slot />
          {this.renderBottomActionGroup()}
        </div>
      </Host>
    );
  }
}
