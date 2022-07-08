import { Component, Element, Listen, Method, State, h, VNode } from "@stencil/core";
import { CSS } from "./resources";
import { FlowDirection } from "./interfaces";
import { createObserver } from "../../utils/observers";

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

  panelItemMutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserverChange()
  );

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.panelItemMutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.handleMutationObserverChange();
  }

  disconnectedCallback(): void {
    this.panelItemMutationObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  @Listen("calciteInternalPanelActiveChange")
  handleCalciteInternalPanelActiveChange(event: CustomEvent): void {
    event.stopPropagation();
    this.updateFlowProps();
  }

  @Listen("calcitePanelBackClick")
  handleCalcitePanelBackClick(): void {
    this.back();
  }

  getFlowDirection = (oldActiveIndex: number, newActiveIndex: number): FlowDirection | null => {
    const allowRetreatingDirection = oldActiveIndex > 0;
    const allowAdvancingDirection = oldActiveIndex > -1 && newActiveIndex > 0;

    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return null;
    }

    return newActiveIndex < oldActiveIndex ? "retreating" : "advancing";
  };

  handleMutationObserverChange = (): void => {
    const newPanels: HTMLCalcitePanelElement[] = Array.from(
      this.el.querySelectorAll("calcite-panel")
    ).filter((panel) => !panel.matches("calcite-panel calcite-panel")) as HTMLCalcitePanelElement[];

    this.panels = newPanels;

    this.ensureActivePanelExists();

    this.updateFlowProps();
  };

  updateFlowProps = (): void => {
    const { activeIndex, panels } = this;
    const foundActiveIndex = this.findActivePanelIndex(panels);

    panels.forEach((panel, index) => {
      const active = index === foundActiveIndex;
      panel.active = active;
      panel.hidden = !active;

      if (!active) {
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
  };

  findActivePanelIndex = (panels: HTMLCalcitePanelElement[]): number => {
    const activePanel = panels
      .slice(0)
      .reverse()
      .find((panel) => !!panel.active);

    return panels.indexOf(activePanel);
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
