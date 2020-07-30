import { Component, Element, Host, Listen, Method, Prop, State, h, VNode } from "@stencil/core";

import { CSS } from "./resources";

import { CalciteTheme, FlowDirection } from "../interfaces";

/**
 * @slot - A slot for adding `calcite-flow-item`s to the flow.
 */
@Component({
  tag: "calcite-flow",
  styleUrl: "calcite-flow.scss",
  shadow: true
})
export class CalciteFlow {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Used to set the component's color scheme.
   */
  @Prop({ reflect: true }) theme: CalciteTheme;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Removes the currently active `calcite-flow-item`.
   */
  @Method()
  async back(): Promise<HTMLCalciteFlowItemElement> {
    const lastItem = this.el.querySelector(
      "calcite-flow-item:last-child"
    ) as HTMLCalciteFlowItemElement;

    if (!lastItem) {
      return;
    }

    const beforeBack = lastItem.beforeBack
      ? lastItem.beforeBack
      : (): Promise<void> => Promise.resolve();

    return beforeBack.call(lastItem).then(() => {
      lastItem.remove();

      return lastItem;
    });
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFlowElement;

  @State() flowCount = 0;

  @State() flowDirection: FlowDirection = null;

  @State() flows: HTMLCalciteFlowItemElement[] = [];

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.flowItemObserver.observe(this.el, { childList: true, subtree: true });
    this.updateFlowProps();
  }

  componentDidUnload(): void {
    this.flowItemObserver.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  @Listen("calciteFlowItemBackClick")
  handleCalciteFlowItemBackClick(): void {
    this.back();
  }

  getFlowDirection = (oldFlowCount: number, newFlowCount: number): FlowDirection | null => {
    const allowRetreatingDirection = oldFlowCount > 1;
    const allowAdvancingDirection = oldFlowCount && newFlowCount > 1;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return null;
    }

    return newFlowCount < oldFlowCount ? "retreating" : "advancing";
  };

  updateFlowProps = (): void => {
    const { flows } = this;

    const newFlows: HTMLCalciteFlowItemElement[] = Array.from(
      this.el.querySelectorAll("calcite-flow-item")
    );

    const oldFlowCount = flows.length;
    const newFlowCount = newFlows.length;

    const activeFlow = newFlows[newFlowCount - 1];
    const previousFlow = newFlows[newFlowCount - 2];

    if (newFlowCount && activeFlow) {
      newFlows.forEach((flowNode) => {
        flowNode.showBackButton = newFlowCount > 1;
        flowNode.hidden = flowNode !== activeFlow;
      });
    }

    if (previousFlow) {
      previousFlow.menuOpen = false;
    }

    this.flows = newFlows;

    if (oldFlowCount !== newFlowCount) {
      const flowDirection = this.getFlowDirection(oldFlowCount, newFlowCount);
      this.flowCount = newFlowCount;
      this.flowDirection = flowDirection;
    }
  };

  flowItemObserver = new MutationObserver(this.updateFlowProps);

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { flowDirection, flowCount } = this;

    const frameDirectionClasses = {
      [CSS.frame]: true,
      [CSS.frameAdvancing]: flowDirection === "advancing",
      [CSS.frameRetreating]: flowDirection === "retreating"
    };

    return (
      <Host>
        <div key={flowCount} class={frameDirectionClasses}>
          <slot />
        </div>
      </Host>
    );
  }
}
