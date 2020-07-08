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
} from "@stencil/core";
import { CalciteLayout, CalcitePosition, CalciteTheme } from "../interfaces";
import {
  CalciteExpandToggle,
  toggleChildActionText,
} from "../utils/CalciteExpandToggle";
import { getElementDir } from "../utils/dom";
import { CSS_UTILITY } from "../utils/resources";
import { CSS, TEXT } from "./resources";

/**
 * @slot - A slot for adding `calcite-action`s to the action pad.
 */
@Component({
  tag: "calcite-action-pad",
  styleUrl: "calcite-action-pad.scss",
  shadow: true,
})
export class CalciteActionPad {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------
  /**
   * Indicates the horizontal or vertical layout of the component.
   */
  @Prop({ reflect: true }) layout: CalciteLayout = "vertical";

  /**
   * Indicates whether widget can be expanded.
   */
  @Prop({ reflect: true }) expand = true;

  @Watch("expand")
  expandHandler(expand: boolean): void {
    if (expand) {
      toggleChildActionText({ parent: this.el, expanded: this.expanded });
    }
  }

  /**
   * Indicates whether widget is expanded.
   */
  @Prop({ reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(expanded: boolean): void {
    if (this.expand) {
      toggleChildActionText({ parent: this.el, expanded });
    }

    this.calciteActionPadToggle.emit();
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
  @Prop({ reflect: true }) position: CalcitePosition;

  /**
   * Used to set the component's color scheme.
   */
  @Prop({ reflect: true }) theme: CalciteTheme;

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

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentWillLoad(): void {
    const { el, expand, expanded } = this;

    if (expand) {
      toggleChildActionText({ parent: el, expanded });
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  toggleExpand = (): void => {
    this.expanded = !this.expanded;
  };

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderBottomActionGroup(): VNode {
    const {
      expanded,
      expand,
      intlExpand,
      intlCollapse,
      el,
      position,
      toggleExpand,
      tooltipExpand,
    } = this;

    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;

    const expandToggleNode = expand ? (
      <CalciteExpandToggle
        expanded={expanded}
        intlExpand={expandLabel}
        intlCollapse={collapseLabel}
        el={el}
        position={position}
        toggleExpand={toggleExpand}
        tooltipExpand={tooltipExpand}
      />
    ) : null;

    return expandToggleNode ? (
      <calcite-action-group class={CSS.actionGroupBottom}>
        {expandToggleNode}
      </calcite-action-group>
    ) : null;
  }

  render(): VNode {
    const rtl = getElementDir(this.el) === "rtl";
    const containerClasses = {
      [CSS.container]: true,
      [CSS_UTILITY.rtl]: rtl,
    };

    return (
      <Host>
        <div class={containerClasses}>
          <slot />
          {this.renderBottomActionGroup()}
        </div>
      </Host>
    );
  }
}
