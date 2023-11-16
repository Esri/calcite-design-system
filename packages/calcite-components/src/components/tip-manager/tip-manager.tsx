import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { getElementDir, toAriaBoolean } from "../../utils/dom";
import { connectLocalized, disconnectLocalized } from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  updateMessages,
} from "../../utils/t9n";
import { Heading, HeadingLevel } from "../functional/Heading";
import { TipManagerMessages } from "./assets/tip-manager/t9n";
import { CSS, ICONS } from "./resources";

/**
 * @slot - A slot for adding `calcite-tip`s.
 */
@Component({
  tag: "calcite-tip-manager",
  styleUrl: "tip-manager.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class TipManager {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------
  /**
   * When `true`, does not display or position the component.
   */
  @Prop({ reflect: true, mutable: true }) closed = false;

  @Watch("closed")
  closedChangeHandler(): void {
    this.direction = null;
  }

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TipManagerMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TipManagerMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTipManagerElement;

  @State() selectedIndex: number;

  @Watch("selectedIndex")
  selectedChangeHandler(): void {
    this.showSelectedTip();
    this.updateGroupTitle();
  }

  @State() tips: HTMLCalciteTipElement[];

  @State() total: number;

  @State() direction: "advancing" | "retreating";

  @State() groupTitle: string;

  mutationObserver = createObserver("mutation", () => this.setUpTips());

  container: HTMLDivElement;

  @State() defaultMessages: TipManagerMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  async effectiveLocaleChange(): Promise<void> {
    await updateMessages(this, this.effectiveLocale);
    this.updateGroupTitle();
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.setUpTips();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    this.updateGroupTitle();
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Selects the next `calcite-tip` to display. */
  @Method()
  async nextTip(): Promise<void> {
    this.direction = "advancing";
    const nextIndex = this.selectedIndex + 1;
    this.selectedIndex = (nextIndex + this.total) % this.total;
  }

  /** Selects the previous `calcite-tip` to display. */
  @Method()
  async previousTip(): Promise<void> {
    this.direction = "retreating";
    const previousIndex = this.selectedIndex - 1;
    this.selectedIndex = (previousIndex + this.total) % this.total;
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when the component has been closed.
   */
  @Event({ cancelable: false }) calciteTipManagerClose: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setUpTips(): void {
    const tips = Array.from(this.el.querySelectorAll("calcite-tip"));
    this.total = tips.length;
    if (this.total === 0) {
      return;
    }
    const selectedTip = this.el.querySelector<HTMLCalciteTipElement>("calcite-tip[selected]");

    this.tips = tips;
    this.selectedIndex = selectedTip ? tips.indexOf(selectedTip) : 0;

    tips.forEach((tip: HTMLCalciteTipElement) => {
      tip.closeDisabled = true;
    });
    this.showSelectedTip();
  }

  hideTipManager = (): void => {
    this.closed = true;
    this.calciteTipManagerClose.emit();
  };

  showSelectedTip(): void {
    this.tips.forEach((tip, index) => {
      const isSelected = this.selectedIndex === index;
      tip.selected = isSelected;
      tip.hidden = !isSelected;
    });
  }

  updateGroupTitle(): void {
    if (this.tips) {
      const selectedTip = this.tips[this.selectedIndex];
      const tipParent = selectedTip.closest("calcite-tip-group");
      this.groupTitle = tipParent?.groupTitle || this.messages?.defaultGroupTitle;
    }
  }

  previousClicked = (): void => {
    this.previousTip();
  };

  nextClicked = (): void => {
    this.nextTip();
  };

  tipManagerKeyDownHandler = (event: KeyboardEvent): void => {
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
  };

  storeContainerRef = (el: HTMLDivElement): void => {
    this.container = el;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderPagination(): VNode {
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

  render(): VNode {
    const { closed, direction, headingLevel, groupTitle, selectedIndex, messages, total } = this;

    const closeLabel = messages.close;

    if (total === 0) {
      return null;
    }

    return (
      <section
        aria-hidden={toAriaBoolean(closed)}
        class={CSS.container}
        hidden={closed}
        onKeyDown={this.tipManagerKeyDownHandler}
        tabIndex={0}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.storeContainerRef}
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
}
