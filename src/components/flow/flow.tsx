import { Component, Element, Listen, Method, State, h, VNode } from "@stencil/core";
import { CSS } from "./resources";
import { FlowDirection } from "./interfaces";
import { createObserver } from "../../utils/observers";

/**
 * @slot - A slot for adding `calcite-flow-item` to the flow.
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
    const { items, openIndex } = this;

    const openItem = items[openIndex];
    const nextOpenItem = items[openIndex - 1];

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

  @State() flowDirection: FlowDirection = null;

  @State() items: HTMLCalciteFlowItemElement[] = [];

  openIndex = -1;

  itemMutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserverChange()
  );

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.itemMutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.handleMutationObserverChange();
  }

  disconnectedCallback(): void {
    this.itemMutationObserver?.disconnect();
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
  handleItemBackClick(): void {
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

    this.items = newItems;

    this.ensureOpenFlowItemExists();

    this.updateFlowProps();
  };

  updateFlowProps = (): void => {
    const { openIndex, items } = this;
    const foundOpenIndex = this.findOpenFlowItemIndex(items);

    items.forEach((flowItem, index) => {
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

  findOpenFlowItemIndex = (items: HTMLCalciteFlowItemElement[]): number => {
    const openItem = items
      .slice(0)
      .reverse()
      .find((item) => !!item.open);

    return items.indexOf(openItem);
  };

  ensureOpenFlowItemExists(): void {
    const { items } = this;
    const foundOpenIndex = this.findOpenFlowItemIndex(items);

    if (foundOpenIndex !== -1) {
      return;
    }

    const lastItem = items[items.length - 1];

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
