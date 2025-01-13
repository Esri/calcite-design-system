// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, Fragment, h, state, JsxNode } from "@arcgis/lumina";
import { Scale } from "../interfaces";
import { getSlotAssignedElements, slotChangeGetAssignedElements } from "../../utils/dom";
import type { TabTitle } from "../tab-title/tab-title";
import type { Tab } from "../tab/tab";
import { TabLayout, TabPosition } from "./interfaces";
import { SLOTS } from "./resources";
import { styles } from "./tabs.scss";

declare global {
  interface DeclareElements {
    "calcite-tabs": Tabs;
  }
}

/**
 * @slot - A slot for adding `calcite-tab`s.
 * @slot title-group - A slot for adding a `calcite-tab-nav`.
 */
export class Tabs extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private slotEl: HTMLSlotElement;

  // #endregion

  // #region State Properties

  /** Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes. */
  @state() tabs: Tab["el"][] = [];

  /**
   * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
   * attributes.
   */
  @state() titles: TabTitle["el"][] = [];

  // #endregion

  // #region Public Properties

  /** When `true`, the component will display with a folder style menu. */
  @property() bordered = false;

  /** Specifies the layout of the `calcite-tab-nav`, justifying the `calcite-tab-title`s to the start (`"inline"`), or across and centered (`"center"`). */
  @property({ reflect: true }) layout: TabLayout = "inline";

  /** Specifies the position of `calcite-tab-nav` and `calcite-tab-title` components in relation to the `calcite-tabs`. */
  @property({ reflect: true }) position: TabPosition = "top";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalTabNavSlotChange", this.calciteInternalTabNavSlotChangeHandler);
  }

  override connectedCallback(): void {
    this.updateItems();
  }

  load(): void {
    this.updateItems();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("position") && (this.hasUpdated || this.position !== "top")) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m"))
    ) {
      this.updateItems();
    }

    if (
      (changes.has("titles") || changes.has("tabs")) &&
      this.hasUpdated &&
      this.titles?.length > 0 &&
      this.tabs?.length > 0
    ) {
      this.updateAriaSettings();
      this.updateItems();
    }
  }

  // #endregion

  // #region Private Methods
  private calciteInternalTabNavSlotChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    if (event.detail.length !== this.titles.length) {
      this.titles = event.detail;
    }
  }

  private defaultSlotChangeHandler(event: Event): void {
    this.tabs = slotChangeGetAssignedElements<Tab["el"]>(event, "calcite-tab");
  }

  /**
   * Matches up elements from the internal `tabs` and `titles` to automatically
   * update the ARIA attributes and link `<calcite-tab>` and
   * `<calcite-tab-title>` components.
   */
  private async updateAriaSettings(): Promise<void> {
    await this.componentOnReady();

    let tabIds;
    let titleIds;
    const tabs = getSlotAssignedElements<Tab["el"]>(this.slotEl, "calcite-tab");

    // determine if we are using `tab` based or `index` based tab identifiers.
    if (tabs.some((el) => el.tab) || this.titles.some((el) => el.tab)) {
      // if we are using `tab` based identifiers sort by `tab` to account for
      // possible out of order tabs and get the id of each tab
      tabIds = tabs.sort((a, b) => a.tab.localeCompare(b.tab)).map((el) => el.id);
      titleIds = this.titles.sort((a, b) => a.tab.localeCompare(b.tab)).map((el) => el.id);
    } else {
      // if we are using index based tabs then the `<calcite-tab>` and
      // `<calcite-tab-title>` might have been rendered out of order so the
      // order of `this.tabs` and `this.titles` might not reflect the DOM state,
      // and might not match each other so we need to get the index of all the
      // tabs and titles in the DOM order to match them up as a source of truth
      const tabDomIndexes = await Promise.all(tabs.map((el) => el.getTabIndex()));
      const titleDomIndexes = await Promise.all(this.titles.map((el) => el.getTabIndex()));

      // once we have the DOM order as a source of truth we can build the
      // matching tabIds and titleIds arrays
      tabIds = tabDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
        ids[indexInDOM] = tabs[registryIndex].id;
        return ids;
      }, []);

      titleIds = titleDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
        ids[indexInDOM] = this.titles[registryIndex].id;
        return ids;
      }, []);
    }

    // pass all our new aria information to each `<calcite-tab>` and
    // `<calcite-tab-title>` which will check if they can update their internal
    // `controlled` or `labeledBy` states and re-render if necessary
    tabs.forEach((el) => el._updateAriaInfo(tabIds, titleIds));
    this.titles.forEach((el) => el._updateAriaInfo(tabIds, titleIds));
  }

  private updateItems(): void {
    const { position, scale } = this;

    const nav = this.el.querySelector("calcite-tab-nav");
    if (nav) {
      nav.position = position;
      nav.scale = scale;
    }

    Array.from(this.el.querySelectorAll("calcite-tab")).forEach((tab: Tab["el"]) => {
      if (tab.parentElement === this.el) {
        tab.scale = scale;
      }
    });

    Array.from(this.el.querySelectorAll("calcite-tab-nav > calcite-tab-title")).forEach(
      (title: TabTitle["el"]) => {
        title.position = position;
        title.scale = scale;
      },
    );
  }

  private setDefaultSlotRef(el): void {
    this.slotEl = el;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <>
        <slot name={SLOTS.titleGroup} />
        <section>
          <slot onSlotChange={this.defaultSlotChangeHandler} ref={this.setDefaultSlotRef} />
        </section>
      </>
    );
  }

  // #endregion
}
