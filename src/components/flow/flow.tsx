import { Component, Element, Listen, Method, State, h, VNode } from "@stencil/core";
import { CSS } from "./resources";
import { FlowDirection } from "./interfaces";
import { createObserver } from "../../utils/observers";

/**
 * @slot - A slot for adding `calcite-flow-item`s to the flow.
 */
@Component({
  tag: "calcite-flow",
  styleUrl: "flow.scss",
  shadow: true
})
export class Flow {
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
    const { flowItems } = this;

    const lastItem = flowItems[flowItems.length - 1];

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

  @State() flowItemCount = 0;

  @State() flowDirection: FlowDirection = null;

  @State() flowItems: HTMLCalciteFlowItemElement[] = [];

  flowItemMutationObserver: MutationObserver = createObserver("mutation", () =>
    this.updateFlowProps()
  );

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.flowItemMutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateFlowProps();
  }

  disconnectedCallback(): void {
    this.flowItemMutationObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  // todo
  @Listen("calcitePanelBackClick")
  handleCalcitePanelBackClick(): void {
    this.back();
  }

  getFlowDirection = (oldFlowItemCount: number, newFlowItemCount: number): FlowDirection | null => {
    const allowRetreatingDirection = oldFlowItemCount > 1;
    const allowAdvancingDirection = oldFlowItemCount && newFlowItemCount > 1;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return null;
    }

    return newFlowItemCount < oldFlowItemCount ? "retreating" : "advancing";
  };

  updateFlowProps = (): void => {
    const { el, flowItems } = this;

    const newFlowItems: HTMLCalciteFlowItemElement[] = Array.from(
      el.querySelectorAll("calcite-flow-item")
    ).filter(
      (flowItem) => !flowItem.matches("calcite-flow-item calcite-flow-item")
    ) as HTMLCalciteFlowItemElement[];

    const oldFlowItemCount = flowItems.length;
    const newFlowItemCount = newFlowItems.length;
    const activeFlowItem = newFlowItems[newFlowItemCount - 1];
    const previousFlowItem = newFlowItems[newFlowItemCount - 2];

    if (newFlowItemCount && activeFlowItem) {
      newFlowItems.forEach((flowItemNode) => {
        flowItemNode.showBackButton = flowItemNode === activeFlowItem && newFlowItemCount > 1;
        flowItemNode.hidden = flowItemNode !== activeFlowItem;
      });
    }

    if (previousFlowItem) {
      previousFlowItem.menuOpen = false;
    }

    this.flowItems = newFlowItems;

    if (oldFlowItemCount !== newFlowItemCount) {
      const flowDirection = this.getFlowDirection(oldFlowItemCount, newFlowItemCount);
      this.flowItemCount = newFlowItemCount;
      this.flowDirection = flowDirection;
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { flowDirection } = this;

    const frameDirectionClasses = {
      [CSS.frame]: true,
      [CSS.frameAdvancing]: flowDirection === "advancing",
      [CSS.frameRetreating]: flowDirection === "retreating"
    };

    return (
      <div class={frameDirectionClasses}>
        <slot />
      </div>
    );
  }
}
