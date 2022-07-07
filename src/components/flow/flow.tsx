import { Component, Element, Listen, Method, State, h, VNode, Prop, Watch } from "@stencil/core";
import { CSS } from "./resources";
import { FlowDirection } from "./interfaces";
import { debounce } from "lodash-es";
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
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * todo: document and finalize property name.
   *
   * @internal
   */
  @Prop() allowDescendantPanels = false;

  @Watch("allowDescendantPanels")
  handleallowDescendantPanelsChange(): void {
    const { allowDescendantPanels, el, panelItemMutationObserver } = this;

    allowDescendantPanels
      ? panelItemMutationObserver?.observe(el, { childList: true, subtree: true })
      : panelItemMutationObserver?.disconnect();
  }

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
    this.handleallowDescendantPanelsChange();
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

  handleMutationObserverChange = (): void => {
    const { el, allowDescendantPanels } = this;

    if (!allowDescendantPanels) {
      return;
    }

    const newPanels: HTMLCalcitePanelElement[] = Array.from(
      el.querySelectorAll("calcite-panel:not(calcite-panel calcite-panel)")
    );

    this.panels = newPanels;

    this.ensureActivePanelExists();

    this.updateFlowProps();
  };

  findActivePanelIndex = (panels: HTMLCalcitePanelElement[]): number => {
    const activePanel = panels
      .slice(0)
      .reverse()
      .find((panel) => !!panel.active);

    return panels.indexOf(activePanel);
  };

  handleDefaultSlotChange = (event: Event): void => {
    if (this.allowDescendantPanels) {
      return;
    }

    const newPanels = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true
      })
      .filter((el) => el?.matches("calcite-panel")) as HTMLCalcitePanelElement[];

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
