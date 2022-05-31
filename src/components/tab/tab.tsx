import {
  Component,
  Prop,
  Element,
  Listen,
  Method,
  Event,
  EventEmitter,
  h,
  State,
  Host,
  VNode
} from "@stencil/core";
import { TabChangeEventDetail } from "./interfaces";
import { guid } from "../../utils/guid";
import { nodeListToArray, toAriaBoolean } from "../../utils/dom";
import { Scale } from "../interfaces";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-tab",
  styleUrl: "tab.scss",
  shadow: true
})
export class Tab {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTabElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Optionally include a unique name for this tab,
   * be sure to also set this name on the associated title.
   */
  @Prop({ reflect: true }) tab: string;

  /**
   * Show this tab
   */
  @Prop({ reflect: true, mutable: true }) active = false;

  /**
   * @internal
   */
  @Prop({ reflect: true, mutable: true }) scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const id = this.el.id || this.guid;

    return (
      <Host
        aria-expanded={toAriaBoolean(this.active)}
        aria-labelledby={this.labeledBy}
        id={id}
        role="tabpanel"
      >
        <section>
          <slot />
        </section>
      </Host>
    );
  }

  connectedCallback(): void {
    this.parentTabsEl = this.el.closest("calcite-tabs");
  }

  componentDidLoad(): void {
    this.calciteInternalTabRegister.emit();
  }

  componentWillRender(): void {
    this.scale = this.parentTabsEl?.scale;
  }

  disconnectedCallback(): void {
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    document.body?.dispatchEvent(
      new CustomEvent("calciteTabUnregister", {
        detail: this.el
      })
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteInternalTabRegister: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalTabChange", { target: "body" })
  internalTabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void {
    const targetTabsEl = event
      .composedPath()
      .find((el: HTMLElement) => el.tagName === "CALCITE-TABS");

    // to allow `<calcite-tabs>` to be nested we need to make sure this
    // `calciteTabChange` event was actually fired from a within the same
    // `<calcite-tabs>` that is the a parent of this tab.
    if (targetTabsEl !== this.parentTabsEl) {
      return;
    }

    if (this.tab) {
      this.active = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then((index) => {
        this.active = index === event.detail.tab;
      });
    }
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Return the index of this tab within the tab array
   */
  @Method()
  async getTabIndex(): Promise<number> {
    return Array.prototype.indexOf.call(
      nodeListToArray(this.el.parentElement.children).filter((e) => e.matches("calcite-tab")),
      this.el
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  parentTabsEl: HTMLCalciteTabsElement;

  guid = `calcite-tab-title-${guid()}`;

  @State() labeledBy: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * @param tabIds
   * @param titleIds
   * @internal
   */
  @Method()
  async updateAriaInfo(tabIds: string[] = [], titleIds: string[] = []): Promise<void> {
    this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
  }
}
