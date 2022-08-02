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
   * Removes the currently open `calcite-panel`.
   */
  @Method()
  async back(): Promise<HTMLCalcitePanelElement> {
    const { panels, openIndex } = this;

    const openPanel = panels[openIndex];
    const nextOpenPanel = panels[openIndex - 1];

    if (!openPanel || !nextOpenPanel) {
      return;
    }

    const beforeBack = openPanel.beforeBack
      ? openPanel.beforeBack
      : (): Promise<void> => Promise.resolve();

    return beforeBack.call(openPanel).then(() => {
      openPanel.open = false;
      nextOpenPanel.open = true;
      return nextOpenPanel;
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

  openIndex = -1;

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

  @Listen("calciteInternalPanelOpenChange")
  handleCalciteInternalPanelOpenChange(event: CustomEvent): void {
    event.stopPropagation();
    this.updateFlowProps();
  }

  @Listen("calcitePanelBackClick")
  handleCalcitePanelBackClick(): void {
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
    const newPanels: HTMLCalcitePanelElement[] = Array.from(
      this.el.querySelectorAll("calcite-panel")
    ).filter((panel) => !panel.matches("calcite-panel calcite-panel")) as HTMLCalcitePanelElement[];

    this.panels = newPanels;

    this.ensureOpenPanelExists();

    this.updateFlowProps();
  };

  updateFlowProps = (): void => {
    const { openIndex, panels } = this;
    const foundOpenIndex = this.findOpenPanelIndex(panels);

    panels.forEach((panel, index) => {
      const currentlyOpen = index === foundOpenIndex;
      panel.hidden = !currentlyOpen;

      if (!currentlyOpen) {
        panel.menuOpen = false;
      }

      panel.showBackButton = currentlyOpen && foundOpenIndex > 0;
    });

    if (foundOpenIndex === -1) {
      return;
    }

    if (openIndex !== foundOpenIndex) {
      this.flowDirection = this.getFlowDirection(openIndex, foundOpenIndex);
    }

    this.openIndex = foundOpenIndex;
  };

  findOpenPanelIndex = (panels: HTMLCalcitePanelElement[]): number => {
    const openPanel = panels
      .slice(0)
      .reverse()
      .find((panel) => !!panel.open);

    return panels.indexOf(openPanel);
  };

  ensureOpenPanelExists(): void {
    const { panels } = this;
    const foundOpenIndex = this.findOpenPanelIndex(panels);

    if (foundOpenIndex !== -1) {
      return;
    }

    const lastPanel = panels[panels.length - 1];

    if (lastPanel) {
      lastPanel.open = true;
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
