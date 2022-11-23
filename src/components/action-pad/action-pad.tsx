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
import { Layout, Position, Scale } from "../interfaces";
import { ExpandToggle, toggleChildActionText } from "../functional/ExpandToggle";
import { focusElement, getSlotted } from "../../utils/dom";
import { CSS, TEXT, SLOTS } from "./resources";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";

/**
 * @slot - A slot for adding `calcite-action`s to the component.
 * @slot expand-tooltip - Used to set the `calcite-tooltip` for the expand toggle.
 */
@Component({
  tag: "calcite-action-pad",
  styleUrl: "action-pad.scss",
  shadow: true
})
export class ActionPad implements ConditionalSlotComponent, LoadableComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the expand-toggling behavior is disabled.
   */
  @Prop({ reflect: true }) expandDisabled = false;

  /**
   * When `true`, the component is expanded.
   */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(expanded: boolean): void {
    toggleChildActionText({ parent: this.el, expanded });
  }

  /**
   * Indicates the layout of the component.
   */
  @Prop({ reflect: true }) layout: Layout = "vertical";

  /**
   * Specifies the label of the expand icon when the component is collapsed.
   */
  @Prop() intlExpand?: string;

  /**
   * Specifies the label of the collapse icon when the component is expanded.
   */
  @Prop() intlCollapse?: string;

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
  @Event({ cancelable: false }) calciteActionPadToggle: EventEmitter<void>;

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

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
    const { el, expanded } = this;

    toggleChildActionText({ parent: el, expanded });
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

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
    this.calciteActionPadToggle.emit();
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

    return expandToggleNode ? (
      <calcite-action-group class={CSS.actionGroupBottom} layout={layout} scale={scale}>
        <slot name={SLOTS.expandTooltip} />
        {expandToggleNode}
      </calcite-action-group>
    ) : null;
  }

  render(): VNode {
    return (
      <Host onCalciteActionMenuOpenChange={this.actionMenuOpenChangeHandler}>
        <div class={CSS.container}>
          <slot />
          {this.renderBottomActionGroup()}
        </div>
      </Host>
    );
  }
}
