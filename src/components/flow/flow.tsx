import { Component, Element, h, Listen, Method, State, VNode } from "@stencil/core";
import { createObserver } from "../../utils/observers";
import { FlowDirection } from "./interfaces";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding `calcite-flow-item` elements to the component.
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
    const { items } = this;

    const lastItem = items[items.length - 1];

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

  @State() flowDirection: FlowDirection = null;

  @State() itemCount = 0;

  @State() items: HTMLCalciteFlowItemElement[] = [];

  itemMutationObserver = createObserver("mutation", () => this.updateFlowProps());

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.itemMutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateFlowProps();
  }

  disconnectedCallback(): void {
    this.itemMutationObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  @Listen("calciteFlowItemBack")
  handleItemBackClick(): void {
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
    const { el, items } = this;

    const newItems: HTMLCalciteFlowItemElement[] = Array.from(
      el.querySelectorAll("calcite-flow-item")
    ).filter((flowItem) => flowItem.closest("calcite-flow") === el) as HTMLCalciteFlowItemElement[];

    const oldItemCount = items.length;
    const newItemCount = newItems.length;
    const activeItem = newItems[newItemCount - 1];
    const previousItem = newItems[newItemCount - 2];

    if (newItemCount && activeItem) {
      newItems.forEach((itemNode) => {
        itemNode.showBackButton = itemNode === activeItem && newItemCount > 1;
        itemNode.hidden = itemNode !== activeItem;
      });
    }

    if (previousItem) {
      previousItem.menuOpen = false;
    }

    this.items = newItems;

    if (oldItemCount !== newItemCount) {
      const flowDirection = this.getFlowDirection(oldItemCount, newItemCount);
      this.itemCount = newItemCount;
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
