import { Component, Element, h, Listen, Method, Prop, State, VNode } from "@stencil/core";
import { createObserver } from "../../utils/observers";
import { FlowDirection, FlowItemLikeElement } from "./interfaces";
import { CSS } from "./resources";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

/**
 * @slot - A slot for adding `calcite-flow-item` elements to the component.
 */
@Component({
  tag: "calcite-flow",
  styleUrl: "flow.scss",
  shadow: true,
})
export class Flow implements LoadableComponent {
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Removes the currently active `calcite-flow-item`.
   */
  @Method()
  async back(): Promise<HTMLCalciteFlowItemElement | FlowItemLikeElement> {
    const { items } = this;

    const lastItem = items[items.length - 1];

    if (!lastItem) {
      return;
    }

    const beforeBack = lastItem.beforeBack
      ? lastItem.beforeBack
      : (): Promise<void> => Promise.resolve();

    try {
      await beforeBack.call(lastItem);
    } catch (_error) {
      // back prevented
      return;
    }

    lastItem.remove();

    return lastItem;
  }

  /**
   * Sets focus on the component.
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    const { items } = this;
    const activeItem = items[items.length - 1];

    return activeItem?.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Public Properties
  //
  // --------------------------------------------------------------------------

  /**
   * This property enables the component to consider other custom elements implementing flow-item's interface.
   *
   * @internal
   */
  @Prop() customItemSelectors: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFlowElement;

  @State() flowDirection: FlowDirection = null;

  @State() itemCount = 0;

  @State() items: FlowItemLikeElement[] = [];

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

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
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
  async handleItemBackClick(event: CustomEvent): Promise<void> {
    if (event.defaultPrevented) {
      return;
    }

    await this.back();
    return this.setFocus();
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
    const { customItemSelectors, el, items } = this;

    const newItems = Array.from<FlowItemLikeElement>(
      el.querySelectorAll(
        `calcite-flow-item${customItemSelectors ? `,${customItemSelectors}` : ""}`,
      ),
    ).filter((flowItem) => flowItem.closest("calcite-flow") === el);

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
      [CSS.frameRetreating]: flowDirection === "retreating",
    };

    return (
      <div class={frameDirectionClasses}>
        <slot />
      </div>
    );
  }
}
