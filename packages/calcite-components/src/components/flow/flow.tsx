import { LitElement, property, h, method, state, JsxNode } from "@arcgis/lumina";
import { createObserver } from "../../utils/observers";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import type { FlowItem } from "../flow-item/flow-item";
import { FlowDirection, FlowItemLikeElement } from "./interfaces";
import { CSS } from "./resources";
import { styles } from "./flow.scss";

declare global {
  interface DeclareElements {
    "calcite-flow": Flow;
  }
}

/** @slot - A slot for adding `calcite-flow-item` elements to the component. */
export class Flow extends LitElement implements LoadableComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private itemMutationObserver = createObserver("mutation", () => this.updateFlowProps());

  // #endregion

  // #region State Properties

  @state() flowDirection: FlowDirection = null;

  @state() itemCount = 0;

  @state() items: FlowItemLikeElement[] = [];

  // #endregion

  // #region Public Properties

  /**
   * This property enables the component to consider other custom elements implementing flow-item's interface.
   *
   * @notPublic
   */
  @property() customItemSelectors: string;

  // #endregion

  // #region Public Methods

  /** Removes the currently active `calcite-flow-item`. */
  @method()
  async back(): Promise<FlowItem["el"] | FlowItemLikeElement> {
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

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    const { items } = this;
    const activeItem = items[items.length - 1];

    return activeItem?.setFocus();
  }

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteFlowItemBack", this.handleItemBackClick);
  }

  override connectedCallback(): void {
    this.itemMutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateFlowProps();
  }

  load(): void {
    setUpLoadableComponent(this);
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  override disconnectedCallback(): void {
    this.itemMutationObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods

  private async handleItemBackClick(event: CustomEvent): Promise<void> {
    if (event.defaultPrevented) {
      return;
    }

    await this.back();
    return this.setFocus();
  }

  private getFlowDirection(
    oldFlowItemCount: number,
    newFlowItemCount: number,
  ): FlowDirection | null {
    const allowRetreatingDirection = oldFlowItemCount > 1;
    const allowAdvancingDirection = oldFlowItemCount && newFlowItemCount > 1;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return null;
    }

    return newFlowItemCount < oldFlowItemCount ? "retreating" : "advancing";
  }

  private updateFlowProps(): void {
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
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
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

  // #endregion
}
