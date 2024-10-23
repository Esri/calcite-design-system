import { Component, Element, h, Listen, Method, Prop, State, VNode } from "@stencil/core";
import { createObserver } from "../../utils/observers";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { FlowDirection, FlowItemLikeElement } from "./interfaces";
import { CSS } from "./resources";

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
   *
   * @returns Promise<HTMLCalciteFlowItemElement | FlowItemLikeElement>
   */
  @Method()
  async back(): Promise<HTMLCalciteFlowItemElement | FlowItemLikeElement> {
    const { items, selectedIndex } = this;

    const selectedItem = items[selectedIndex];
    const nextSelectedItem = items[selectedIndex - 1];

    if (!selectedItem || !nextSelectedItem) {
      return;
    }

    const beforeBack = selectedItem.beforeBack
      ? selectedItem.beforeBack
      : (): Promise<void> => Promise.resolve();

    try {
      await beforeBack.call(selectedItem);
    } catch (_error) {
      // back prevented
      return;
    }

    selectedItem.selected = false;
    nextSelectedItem.selected = true;
    return nextSelectedItem;
  }

  /**
   * Sets focus on the component.
   *
   * @returns Promise<void>
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

  @State() items: FlowItemLikeElement[] = [];

  selectedIndex = -1;

  itemMutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserverChange(),
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

  @Listen("calciteInternalFlowItemChange")
  handleCalciteInternalFlowItemChange(event: CustomEvent): void {
    event.stopPropagation();
    this.updateFlowProps();
  }

  @Listen("calciteFlowItemBack")
  async handleItemBackClick(event: CustomEvent): Promise<void> {
    if (event.defaultPrevented) {
      return;
    }

    await this.back();
    return this.setFocus();
  }

  resetFlowDirection = (): void => {
    if (this.el.hasAttribute("data-test-disable-animation-reset")) {
      return;
    }

    this.flowDirection = null;
  };

  getFlowDirection = (oldSelectedIndex: number, newSelectedIndex: number): FlowDirection | null => {
    const allowRetreatingDirection = oldSelectedIndex > 0;
    const allowAdvancingDirection = oldSelectedIndex > -1 && newSelectedIndex > 0;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return null;
    }

    return newSelectedIndex < oldSelectedIndex ? "retreating" : "advancing";
  };

  handleMutationObserverChange = (): void => {
    const { customItemSelectors, el } = this;

    const newItems = Array.from<FlowItemLikeElement>(
      el.querySelectorAll(
        `calcite-flow-item${customItemSelectors ? `,${customItemSelectors}` : ""}`,
      ),
    ).filter((flowItem) => flowItem.closest("calcite-flow") === el);

    this.items = newItems;

    this.ensureSelectedFlowItemExists();

    this.updateFlowProps();
  };

  updateFlowProps = (): void => {
    const { selectedIndex, items } = this;
    const foundSelectedIndex = this.findSelectedFlowItemIndex(items);

    items.forEach((flowItem, index) => {
      const currentlySelected = index === foundSelectedIndex;
      if (!currentlySelected) {
        flowItem.menuOpen = false;
      }

      flowItem.showBackButton = currentlySelected && foundSelectedIndex > 0;
    });

    if (foundSelectedIndex === -1) {
      return;
    }

    if (selectedIndex !== foundSelectedIndex) {
      this.flowDirection = this.getFlowDirection(selectedIndex, foundSelectedIndex);
    }

    this.selectedIndex = foundSelectedIndex;
  };

  findSelectedFlowItemIndex = (
    items: (HTMLCalciteFlowItemElement | FlowItemLikeElement)[],
  ): number => {
    const selectedItem = items
      .slice(0)
      .reverse()
      .find((item) => !!item.selected);

    return items.indexOf(selectedItem);
  };

  ensureSelectedFlowItemExists(): void {
    const { items } = this;
    const foundSelectedIndex = this.findSelectedFlowItemIndex(items);

    if (foundSelectedIndex !== -1) {
      return;
    }

    const lastItem = items[items.length - 1];

    if (lastItem) {
      lastItem.selected = true;
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
      [CSS.frameRetreating]: flowDirection === "retreating",
    };

    return (
      <div class={frameDirectionClasses} onAnimationEnd={this.resetFlowDirection}>
        <slot />
      </div>
    );
  }
}
