// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { getElementDir } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { Heading, HeadingLevel } from "../functional/Heading";
import { logger } from "../../utils/logger";
import { useT9n } from "../../controllers/useT9n";
import type { Tip } from "../tip/tip";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS } from "./resources";
import { styles } from "./tip-manager.scss";

declare global {
  interface DeclareElements {
    "calcite-tip-manager": TipManager;
  }
}

/**
 * @deprecated Use the `calcite-carousel` and `calcite-carousel-item` components instead.
 * @slot - A slot for adding `calcite-tip`s.
 */
export class TipManager extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private container: HTMLDivElement;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */ messages = useT9n<typeof T9nStrings>();

  private mutationObserver = createObserver("mutation", () => this.setUpTips());

  // #endregion

  // #region State Properties

  @state() direction: "advancing" | "retreating";

  @state() groupTitle: string;

  @state() selectedIndex: number;

  @state() tips: Tip["el"][];

  @state() total: number;

  // #endregion

  // #region Public Properties

  /** When present, does not display or position the component. */
  @property({ reflect: true }) closed = false;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  // #endregion

  // #region Public Methods

  /** Selects the next `calcite-tip` to display. */
  @method()
  async nextTip(): Promise<void> {
    this.direction = "advancing";
    const nextIndex = this.selectedIndex + 1;
    this.selectedIndex = (nextIndex + this.total) % this.total;
  }

  /** Selects the previous `calcite-tip` to display. */
  @method()
  async previousTip(): Promise<void> {
    this.direction = "retreating";
    const previousIndex = this.selectedIndex - 1;
    this.selectedIndex = (previousIndex + this.total) % this.total;
  }

  // #endregion

  // #region Events

  /** Emits when the component has been closed. */
  calciteTipManagerClose = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.setUpTips();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  async load(): Promise<void> {
    logger.deprecated("component", {
      name: "tip-manager",
      removalVersion: 4,
      suggested: "carousel",
    });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("closed") && (this.hasUpdated || this.closed !== false)) {
      this.direction = null;
    }

    if (changes.has("selectedIndex")) {
      this.selectedChangeHandler();
    }

    if (changes.has("messages")) {
      this.updateGroupTitle();
    }
  }

  loaded(): void {
    this.updateGroupTitle();
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods
  private selectedChangeHandler(): void {
    this.showSelectedTip();
    this.updateGroupTitle();
  }

  private setUpTips(): void {
    const tips = Array.from(this.el.querySelectorAll("calcite-tip"));
    this.total = tips.length;
    if (this.total === 0) {
      return;
    }
    const selectedTip = this.el.querySelector<Tip["el"]>("calcite-tip[selected]");

    this.tips = tips;
    this.selectedIndex = selectedTip ? tips.indexOf(selectedTip) : 0;

    tips.forEach((tip: Tip["el"]) => {
      tip.closeDisabled = true;
    });
    this.showSelectedTip();
  }

  private hideTipManager(): void {
    this.closed = true;
    this.calciteTipManagerClose.emit();
  }

  private showSelectedTip(): void {
    this.tips.forEach((tip, index) => {
      const isSelected = this.selectedIndex === index;
      tip.selected = isSelected;
      tip.hidden = !isSelected;
    });
  }

  private updateGroupTitle(): void {
    if (this.tips) {
      const selectedTip = this.tips[this.selectedIndex];
      const tipParent = selectedTip.closest("calcite-tip-group");
      this.groupTitle = tipParent?.groupTitle || this.messages?.defaultGroupTitle;
    }
  }

  private previousClicked(): void {
    this.previousTip();
  }

  private nextClicked(): void {
    this.nextTip();
  }

  private tipManagerKeyDownHandler(event: KeyboardEvent): void {
    if (event.target !== this.container) {
      return;
    }

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        this.nextTip();
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.previousTip();
        break;
      case "Home":
        event.preventDefault();
        this.selectedIndex = 0;
        break;
      case "End":
        event.preventDefault();
        this.selectedIndex = this.total - 1;
        break;
    }
  }

  private storeContainerRef(el: HTMLDivElement): void {
    this.container = el;
  }

  // #endregion

  // #region Rendering

  private renderPagination(): JsxNode {
    const dir = getElementDir(this.el);
    const { selectedIndex, tips, total, messages } = this;

    const nextLabel = messages.next;
    const previousLabel = messages.previous;
    const paginationLabel = messages.defaultPaginationLabel;

    return tips.length > 1 ? (
      <footer class={CSS.pagination}>
        <calcite-action
          class={CSS.pagePrevious}
          icon={dir === "ltr" ? ICONS.chevronLeft : ICONS.chevronRight}
          onClick={this.previousClicked}
          scale="m"
          text={previousLabel}
        />
        <span class={CSS.pagePosition}>{`${paginationLabel} ${selectedIndex + 1}/${total}`}</span>
        <calcite-action
          class={CSS.pageNext}
          icon={dir === "ltr" ? ICONS.chevronRight : ICONS.chevronLeft}
          onClick={this.nextClicked}
          scale="m"
          text={nextLabel}
        />
      </footer>
    ) : null;
  }

  override render(): JsxNode {
    const { closed, direction, headingLevel, groupTitle, selectedIndex, messages, total } = this;

    const closeLabel = messages.close;

    if (total === 0) {
      return null;
    }

    return (
      <section
        ariaHidden={closed}
        class={CSS.container}
        hidden={closed}
        onKeyDown={this.tipManagerKeyDownHandler}
        ref={this.storeContainerRef}
        tabIndex={0}
      >
        <header class={CSS.header}>
          <Heading class={CSS.heading} level={headingLevel}>
            {groupTitle}
          </Heading>
          <calcite-action
            class={CSS.close}
            onClick={this.hideTipManager}
            scale="m"
            text={closeLabel}
          >
            <calcite-icon icon={ICONS.close} scale="m" />
          </calcite-action>
        </header>
        <div
          class={{
            [CSS.tipContainer]: true,
            [CSS.tipContainerAdvancing]: !closed && direction === "advancing",
            [CSS.tipContainerRetreating]: !closed && direction === "retreating",
          }}
          key={selectedIndex}
          tabIndex={0}
        >
          <slot />
        </div>
        {this.renderPagination()}
      </section>
    );
  }

  // #endregion
}
