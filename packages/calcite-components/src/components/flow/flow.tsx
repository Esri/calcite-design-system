// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, h, method, state, JsxNode } from "@arcgis/lumina";
import { createObserver } from "../../utils/observers";
import { whenAnimationDone } from "../../utils/dom";
import type { FlowItem } from "../flow-item/flow-item";
import { useSetFocus } from "../../controllers/useSetFocus";
import { FlowDirection, FlowItemLikeElement } from "./interfaces";
import { CSS } from "./resources";
import { styles } from "./flow.scss";

declare global {
  interface DeclareElements {
    "calcite-flow": Flow;
  }
}

/** @slot - A slot for adding `calcite-flow-item` elements to the component. */
export class Flow extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private frameEl: HTMLDivElement;

  private itemMutationObserver: MutationObserver = createObserver("mutation", () =>
    this.updateItemsAndProps(),
  );

  private items: FlowItemLikeElement[] = [];

  private selectedIndex = -1;

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  @state() flowDirection: FlowDirection = "standby";

  // #endregion

  // #region Public Properties

  /**
   * This property enables the component to consider other custom elements implementing flow-item's interface.
   *
   * @private
   */
  @property() customItemSelectors: string;

  // #endregion

  // #region Public Methods

  /**
   * Removes the currently active `calcite-flow-item`.
   *
   * @returns Promise<HTMLCalciteFlowItemElement | FlowItemLikeElement>
   */
  @method()
  async back(): Promise<FlowItem["el"] | FlowItemLikeElement> {
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
    } catch {
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
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.items[this.selectedIndex];
    });
  }

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalFlowItemChange", this.handleCalciteInternalFlowItemChange);
    this.listen("calciteFlowItemBack", this.handleItemBackClick);
  }

  override connectedCallback(): void {
    this.itemMutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("flowDirection") && (this.hasUpdated || this.flowDirection !== "standby")) {
      this.handleFlowDirectionChange(this.flowDirection);
    }
  }

  loaded(): void {
    this.updateItemsAndProps();
  }

  override disconnectedCallback(): void {
    this.itemMutationObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods

  private async handleFlowDirectionChange(flowDirection: FlowDirection): Promise<void> {
    if (flowDirection === "standby") {
      return;
    }

    await whenAnimationDone(
      this.frameEl,
      flowDirection === "retreating" ? "calcite-frame-retreat" : "calcite-frame-advance",
    );

    this.resetFlowDirection();
  }

  private handleCalciteInternalFlowItemChange(event: CustomEvent): void {
    event.stopPropagation();
    this.updateFlowProps();
  }

  private async handleItemBackClick(event: CustomEvent): Promise<void> {
    if (event.defaultPrevented) {
      return;
    }

    await this.back();
    return this.setFocus();
  }

  private resetFlowDirection(): void {
    this.flowDirection = "standby";
  }

  private getFlowDirection(
    oldSelectedIndex: number,
    newSelectedIndex: number,
  ): FlowDirection | null {
    const allowRetreatingDirection = oldSelectedIndex > 0;
    const allowAdvancingDirection = oldSelectedIndex > -1 && newSelectedIndex > 0;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return "standby";
    }

    return newSelectedIndex < oldSelectedIndex ? "retreating" : "advancing";
  }

  private updateItemsAndProps(): void {
    const { customItemSelectors, el } = this;

    const newItems = Array.from<FlowItemLikeElement>(
      el.querySelectorAll(
        `calcite-flow-item${customItemSelectors ? `,${customItemSelectors}` : ""}`,
      ),
    ).filter((flowItem) => flowItem.closest("calcite-flow") === el);

    this.items = newItems;

    this.ensureSelectedFlowItemExists();
    this.updateFlowProps();
  }

  private updateFlowProps(): void {
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
  }

  private findSelectedFlowItemIndex(items: (FlowItem["el"] | FlowItemLikeElement)[]): number {
    const selectedItem = items
      .slice(0)
      .reverse()
      .find((item) => !!item.selected);

    return items.indexOf(selectedItem);
  }

  private ensureSelectedFlowItemExists(): void {
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

  private setFrameEl(el: HTMLDivElement): void {
    this.frameEl = el;
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
      <div class={frameDirectionClasses} ref={this.setFrameEl}>
        <slot />
      </div>
    );
  }

  // #endregion
}
