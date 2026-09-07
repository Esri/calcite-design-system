import { PropertyValues } from "lit";
import { LitElement, property, Fragment, h, state, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { Scale } from "../types";
import { getSlotAssignedElements, slotChangeGetAssignedElements } from "../../utils/dom";
import type { TabTitle } from "../tab-title/tab-title";
import type { Tab } from "../tab/tab";
import { TabLayout, TabPosition } from "./types";
import { CSS, SLOTS } from "./resources";
import { styles } from "./tabs.scss";

declare global {
  interface DeclareElements {
    "calcite-tabs": Tabs;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     */
    "--calcite-tab-background-color": "*";
    /**
     * Specifies the component's border color.
     */
    "--calcite-tab-border-color": "*";
  }
}

interface TabsSlots {
  /**
   * A slot for adding `calcite-tab`s.
   */
  "": Node[];
  /**
   * A slot for adding a `calcite-tab-nav`.
   */
  "title-group": Node[];
}

export class Tabs extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  override ["@slots"]!: TabsSlots;

  private slotRef = createRef<HTMLSlotElement>();

  //#endregion

  //#region State Properties

  /** Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes. */
  @state() tabs: Tab["el"][] = [];

  /**
   * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
   * attributes.
   */
  @state() titles: TabTitle["el"][] = [];

  @state() hasVisibleTitles = true;

  //#endregion

  //#region Public Properties

  /** When `true`, displays the component with a folder style menu. */
  @property({ reflect: true }) bordered = false;

  /** Specifies the layout of the `calcite-tab-nav`, justifying the `calcite-tab-title`s to the start (`"inline"`), or across and centered (`"center"`). */
  @property({ reflect: true }) layout: TabLayout = "inline";

  /** When `true`, allows the last visible closable tab to keep its close button. */
  @property({ reflect: true }) lastTabClosable = false;

  /** Specifies the position of `calcite-tab-nav` and `calcite-tab-title` components in relation to the `calcite-tabs`. */
  @property({ reflect: true }) position: TabPosition = "top";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Lifecycle

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
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("position") && (this.hasUpdated || this.position !== "top")) ||
      (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) ||
      (changes.has("lastTabClosable") && (this.hasUpdated || this.lastTabClosable !== false))
    ) {
      this.updateItems();
    }

    if (
      (changes.has("titles") || changes.has("tabs")) &&
      this.hasUpdated &&
      (this.lastTabClosable || this.titles?.length > 0) &&
      (this.lastTabClosable || this.tabs?.length > 0)
    ) {
      this.updateAriaSettings();
      this.updateItems();
    }
  }

  //#endregion

  //#region Private Methods

  private calciteInternalTabNavSlotChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    const nextTitles = [...event.detail] as TabTitle["el"][];
    const titlesChanged = nextTitles.some((title, index) => this.titles[index] !== title);

    if (titlesChanged) {
      this.titles = nextTitles;
    }

    this.hasVisibleTitles = nextTitles.some((title) => !title.closed);
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

    if (!this.slotRef.value) {
      return;
    }

    let tabIds: string[];
    let titleIds: string[];
    const tabs = getSlotAssignedElements<Tab["el"]>(this.slotRef.value, "calcite-tab");
    await Promise.all([...tabs, ...this.titles].map((tabOrTitle) => tabOrTitle.componentOnReady()));

    // determine if we are using `tab` based or `index` based tab identifiers.
    if (tabs.some((el) => el.tab) || this.titles.some((el) => el.tab)) {
      // if we are using `tab` based identifiers sort by `tab` to account for
      // possible out of order tabs and get the id of each tab
      tabIds = tabs
        .sort((a, b) => (a.tab && b.tab ? a.tab.localeCompare(b.tab) : 0))
        .map((el) => el.id);
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
      tabIds = tabDomIndexes.reduce((ids: string[], indexInDOM, registryIndex) => {
        ids[indexInDOM] = tabs[registryIndex].id;
        return ids;
      }, []);

      titleIds = titleDomIndexes.reduce((ids: string[], indexInDOM, registryIndex) => {
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
    const { lastTabClosable, position, scale } = this;

    const nav = this.el.querySelector("calcite-tab-nav");
    if (nav) {
      nav.lastTabClosable = lastTabClosable;
      nav.position = position;
      nav.scale = scale;
    }

    Array.from(this.el.querySelectorAll("calcite-tab")).forEach((tab: Tab["el"]) => {
      if (tab.parentElement === this.el) {
        tab.scale = scale;
      }
    });
    const tabTitleEls = this.el.querySelectorAll<TabTitle["el"]>(
      "calcite-tab-nav > calcite-tab-title",
    );

    Array.from(tabTitleEls).forEach((title) => {
      title.position = position;
      title.scale = scale;
    });
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <>
        <slot name={SLOTS.titleGroup} />
        <section class={CSS.section} hidden={!this.hasVisibleTitles}>
          <slot onSlotChange={this.defaultSlotChangeHandler} ref={this.slotRef} />
        </section>
      </>
    );
  }

  //#endregion
}
