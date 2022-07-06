import { Component, Element, Listen, Method, State, h, VNode } from "@stencil/core";
import { CSS } from "./resources";
import { FlowDirection } from "./interfaces";
import { debounce } from "lodash-es";

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
    const { panels, activeIndex } = this;

    const activePanel = panels[activeIndex];
    const nextActivePanel = panels[activeIndex - 1];

    if (!activePanel || !nextActivePanel) {
      return;
    }

    const beforeBack = activePanel.beforeBack
      ? activePanel.beforeBack
      : (): Promise<void> => Promise.resolve();

    return beforeBack.call(activePanel).then(() => {
      activePanel.active = false;
      nextActivePanel.active = true;
      return nextActivePanel;
    });
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFlowElement;

  @State() flowDirection: FlowDirection = null;

  @State() panels: HTMLCalcitePanelElement[] = [];

  activeIndex = -1;

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

  @Listen("calciteInternalPanelActiveChange")
  handleCalciteInternalPanelActiveChange(event: CustomEvent): void {
    event.stopPropagation();
    this.updateFlowProps();
  }

  getFlowDirection = (oldActiveIndex: number, newActiveIndex: number): FlowDirection | null => {
    const allowRetreatingDirection = oldActiveIndex > 0;
    const allowAdvancingDirection = oldActiveIndex > -1 && newActiveIndex > 0;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return null;
    }

    return newActiveIndex < oldActiveIndex ? "retreating" : "advancing";
  };

  findActivePanelIndex = (panels: HTMLCalcitePanelElement[]): number => {
    const activePanel = panels
      .slice(0)
      .reverse()
      .find((panel) => !!panel.active);

    return panels.indexOf(activePanel);
  };

  handleDefaultSlotChange = (event: Event): void => {
    const newPanels = (
      (event.target as HTMLSlotElement).assignedElements({
        flatten: true
      }) as HTMLCalcitePanelElement[]
    ).filter((el) => el?.matches("calcite-panel"));

    this.panels = newPanels;

    this.ensureActivePanelExists();

    this.updateFlowProps();
  };

  ensureActivePanelExists(): void {
    const { panels } = this;
    const foundActiveIndex = this.findActivePanelIndex(panels);

    if (foundActiveIndex !== -1) {
      return;
    }

    const lastPanel = panels[panels.length - 1];

    if (lastPanel) {
      lastPanel.active = true;
    }
  }

  updateFlowProps = debounce((): void => {
    const { activeIndex, panels } = this;
    const foundActiveIndex = this.findActivePanelIndex(panels);

    panels.forEach((panel, index) => {
      panel.active = index === foundActiveIndex;

      if (index !== foundActiveIndex) {
        panel.menuOpen = false;
      }

      panel.showBackButton = index === foundActiveIndex && foundActiveIndex > 0;
    });

    if (foundActiveIndex === -1) {
      return;
    }

    if (activeIndex !== foundActiveIndex) {
      this.flowDirection = this.getFlowDirection(activeIndex, foundActiveIndex);
    }

    this.activeIndex = foundActiveIndex;
  });

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
        <slot onSlotchange={this.handleDefaultSlotChange} />
      </div>
    );
  }
}
