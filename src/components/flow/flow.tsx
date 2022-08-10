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
    const { flowItems, openIndex } = this;

    const openItem = flowItems[openIndex];
    const nextOpenItem = flowItems[openIndex - 1];

    if (!openItem || !nextOpenItem) {
      return;
    }

    const beforeBack = openItem.beforeBack
      ? openItem.beforeBack
      : (): Promise<void> => Promise.resolve();

    return beforeBack.call(openItem).then(() => {
      openItem.open = false;
      nextOpenItem.open = true;
      return nextOpenItem;
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

  openIndex = -1;

  flowItemMutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserverChange()
  );

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.flowItemMutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.handleMutationObserverChange();
  }

  disconnectedCallback(): void {
    this.flowItemMutationObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  @Listen("calciteInternalFlowItemOpenChange")
  handleCalciteInternalFlowItemOpenChange(event: CustomEvent): void {
    event.stopPropagation();
    this.updateFlowProps();
  }

  @Listen("calciteFlowItemBackClick")
  handleCalciteFlowItemBackClick(): void {
    this.back();
  }

  getFlowDirection = (oldOpenIndex: number, newOpenIndex: number): FlowDirection | null => {
    const allowRetreatingDirection = oldOpenIndex > 0;
    const allowAdvancingDirection = oldOpenIndex > -1 && newOpenIndex > 0;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return null;
    }

    return newOpenIndex < oldOpenIndex ? "retreating" : "advancing";
  };

  handleMutationObserverChange = (): void => {
    const newItems: HTMLCalciteFlowItemElement[] = Array.from(
      this.el.querySelectorAll("calcite-flow-item")
    ).filter(
      (flowItem) => !flowItem.matches("calcite-flow-item calcite-flow-item")
    ) as HTMLCalciteFlowItemElement[];

    this.flowItems = newItems;

    this.ensureOpenFlowItemExists();

    this.updateFlowProps();
  };

  updateFlowProps = (): void => {
    const { openIndex, flowItems } = this;
    const foundOpenIndex = this.findOpenFlowItemIndex(flowItems);

    flowItems.forEach((flowItem, index) => {
      const currentlyOpen = index === foundOpenIndex;

      if (!currentlyOpen) {
        flowItem.menuOpen = false;
      }

      flowItem.showBackButton = currentlyOpen && foundOpenIndex > 0;
    });

    if (foundOpenIndex === -1) {
      return;
    }

    if (openIndex !== foundOpenIndex) {
      this.flowDirection = this.getFlowDirection(openIndex, foundOpenIndex);
    }

    this.openIndex = foundOpenIndex;
  };

  findOpenFlowItemIndex = (flowItems: HTMLCalciteFlowItemElement[]): number => {
    const openItem = flowItems
      .slice(0)
      .reverse()
      .find((flowItem) => !!flowItem.open);

    return flowItems.indexOf(openItem);
  };

  ensureOpenFlowItemExists(): void {
    const { flowItems } = this;
    const foundOpenIndex = this.findOpenFlowItemIndex(flowItems);

    if (foundOpenIndex !== -1) {
      return;
    }

    const lastItem = flowItems[flowItems.length - 1];

    if (lastItem) {
      lastItem.open = true;
    }
  }

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
