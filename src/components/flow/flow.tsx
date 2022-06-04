import { Component, Element, Listen, Method, State, h, VNode } from "@stencil/core";

import { CSS } from "./resources";

import { FlowDirection } from "./interfaces";

/**
 * @slot - A slot for adding `calcite-panel`s to the flow.
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
   * Removes the currently active `calcite-panel`.
   */
  @Method()
  async back(): Promise<HTMLCalcitePanelElement> {
    const { panels } = this;

    const lastItem = panels[panels.length - 1];

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

  @State() panelCount = 0;

  @State() flowDirection: FlowDirection = null;

  @State() panels: HTMLCalcitePanelElement[] = [];

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  @Listen("calcitePanelBackClick")
  handleCalcitePanelBackClick(): void {
    this.back();
  }

  getFlowDirection = (oldPanelCount: number, newPanelCount: number): FlowDirection | null => {
    const allowRetreatingDirection = oldPanelCount > 1;
    const allowAdvancingDirection = oldPanelCount && newPanelCount > 1;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return null;
    }

    return newPanelCount < oldPanelCount ? "retreating" : "advancing";
  };

  updateFlowProps = (event: Event): void => {
    const { panels } = this;

    const newPanels = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true
      })
      .filter((el) => el?.matches("calcite-panel")) as HTMLCalcitePanelElement[];

    const oldPanelCount = panels.length;
    const newPanelCount = newPanels.length;

    const activePanel = newPanels[newPanelCount - 1];
    const previousPanel = newPanels[newPanelCount - 2];

    if (newPanelCount && activePanel) {
      newPanels.forEach((panelNode) => {
        panelNode.showBackButton = newPanelCount > 1;
        panelNode.hidden = panelNode !== activePanel;
      });
    }

    if (previousPanel) {
      previousPanel.menuOpen = false;
    }

    this.panels = newPanels;

    if (oldPanelCount !== newPanelCount) {
      const flowDirection = this.getFlowDirection(oldPanelCount, newPanelCount);
      this.panelCount = newPanelCount;
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
        <slot onSlotchange={this.updateFlowProps} />
      </div>
    );
  }
}
