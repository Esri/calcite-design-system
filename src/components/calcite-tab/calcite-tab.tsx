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
import { nodeListToArray } from "../../utils/dom";
import { Scale } from "../interfaces";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-tab",
  styleUrl: "calcite-tab.scss",
  shadow: true
})
export class CalciteTab {
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

  /** @internal Parent tabs component scale value */
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
        aria-expanded={this.active.toString()}
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

  componentDidLoad(): void {
    this.calciteTabRegister.emit();
  }

  componentWillRender(): void {
    this.scale = this.el.closest("calcite-tabs")?.scale;
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
  @Event() calciteTabRegister: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteTabChange", { target: "body" })
  tabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void {
    // to allow `<calcite-tabs>` to be nested we need to make sure this
    // `calciteTabChange` event was actually fired from a title that is a
    // child of the `<calcite-tabs>` that is the a parent of this tab.
    if ((event.target as HTMLElement).closest("calcite-tabs") !== this.el.closest("calcite-tabs")) {
      return;
    }

    if (this.tab) {
      this.active = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then((index) => {
        this.active = index === event.detail.tab;
      });
    }
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

  /**
   * @internal
   */
  private guid = `calcite-tab-title-${guid()}`;

  @State() private labeledBy: string;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Method()
  async updateAriaInfo(tabIds: string[] = [], titleIds: string[] = []): Promise<void> {
    this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
  }
}
