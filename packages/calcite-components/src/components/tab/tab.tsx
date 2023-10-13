import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
} from "@stencil/core";
import { nodeListToArray } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { TabChangeEventDetail } from "./interfaces";
import { CSS } from "../tabs/resources";
/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-tab",
  styleUrl: "tab.scss",
  shadow: true,
})
export class Tab {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Specifies a unique name for the component.
   *
   * When specified, use the same value on the `calcite-tab-title`.
   */
  @Prop({ reflect: true }) tab: string;

  /**
   * When `true`, the component's contents are selected.
   *
   * Only one tab can be selected within the `calcite-tabs` parent.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * Specifies the size of the component inherited from the parent `calcite-tabs`, defaults to `m`.
   *
   * @internal
   */
  @Prop() scale: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const id = this.el.id || this.guid;

    return (
      <Host aria-labelledby={this.labeledBy} id={id}>
        <div
          class={{ [CSS.container]: true, [`scale--${this.scale}`]: true }}
          role="tabpanel"
          tabIndex={this.selected ? 0 : -1}
        >
          <section>
            <slot />
          </section>
        </div>
      </Host>
    );
  }

  connectedCallback(): void {
    this.parentTabsEl = this.el.closest("calcite-tabs");
  }

  componentDidLoad(): void {
    this.calciteInternalTabRegister.emit();
  }

  disconnectedCallback(): void {
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    document.body?.dispatchEvent(
      new CustomEvent("calciteTabUnregister", {
        detail: this.el,
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
  @Event({ cancelable: false }) calciteInternalTabRegister: EventEmitter<void>;

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
      this.selected = this.tab === event.detail.tab;
    } else {
      this.getTabIndex().then((index) => {
        this.selected = index === event.detail.tab;
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
   * Returns the index of the component item within the tab array.
   */
  @Method()
  async getTabIndex(): Promise<number> {
    return Array.prototype.indexOf.call(
      nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab")),
      this.el
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTabElement;

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
