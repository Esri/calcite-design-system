// @ts-strict-ignore
import { LitElement, property, h, method, state, JsxNode, setAttribute } from "@arcgis/lumina";
import { nodeListToArray } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import type { Tabs } from "../tabs/tabs";
import { CSS, IDS } from "./resources";
import { TabChangeEventDetail } from "./interfaces";
import { styles } from "./tab.scss";

declare global {
  interface DeclareElements {
    "calcite-tab": Tab;
  }
}

/** @slot - A slot for adding custom content. */
export class Tab extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private guid = IDS.tabTitleId(guid());

  private parentTabsEl: Tabs["el"];

  // #endregion

  // #region State Properties

  @state() labeledBy: string;

  // #endregion

  // #region Public Properties

  /**
   * Specifies the size of the component inherited from the parent `calcite-tabs`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /**
   * When `true`, the component's contents are selected.
   *
   * Only one tab can be selected within the `calcite-tabs` parent.
   */
  @property({ reflect: true }) selected = false;

  /**
   * Specifies a unique name for the component.
   *
   * When specified, use the same value on the `calcite-tab-title`.
   */
  @property({ reflect: true }) tab: string;

  // #endregion

  // #region Public Methods

  /** Returns the index of the component item within the tab array. */
  @method()
  async getTabIndex(): Promise<number> {
    return Array.prototype.indexOf.call(
      nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab")),
      this.el,
    );
  }

  /**
   * @param tabIds
   * @param titleIds
   * @private
   */
  @method()
  _updateAriaInfo(tabIds: string[] = [], titleIds: string[] = []): void {
    this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
  }

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listenOn<CustomEvent<TabChangeEventDetail>>(
      document.body,
      "calciteInternalTabChange",
      this.internalTabChangeHandler,
    );
  }

  override connectedCallback(): void {
    this.parentTabsEl = this.el.closest("calcite-tabs");
  }

  override disconnectedCallback(): void {
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    document.body?.dispatchEvent(
      new CustomEvent("calciteTabUnregister", {
        detail: this.el,
      }),
    );
  }

  // #endregion

  // #region Private Methods

  private internalTabChangeHandler(event: CustomEvent<TabChangeEventDetail>): void {
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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const id = this.el.id || this.guid;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "aria-labelledby", this.labeledBy);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", id);

    return (
      <div
        class={{ [CSS.container]: true, [CSS.scale(this.scale)]: true }}
        role="tabpanel"
        tabIndex={this.selected ? 0 : -1}
      >
        <section class={CSS.content}>
          <slot />
        </section>
      </div>
    );
  }

  // #endregion
}
