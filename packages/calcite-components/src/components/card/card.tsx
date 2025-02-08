import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { slotChangeHasAssignedElement, toAriaBoolean } from "../../utils/dom";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { LogicalFlowPosition, SelectionMode } from "../interfaces";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { IconNameOrString } from "../icon/interfaces";
import type { CalciteCheckboxCustomEvent } from "../../components";
import { CSS, ICONS, SLOTS } from "./resources";
import { CardMessages } from "./assets/card/t9n";

/**
 * @slot - A slot for adding content.
 * @slot title - [Deprecated] use `heading` instead. A slot for adding a heading.
 * @slot subtitle - [Deprecated] use `description` instead. A slot for adding a description.
 * @slot thumbnail - A slot for adding a thumbnail.
 * @slot heading - A slot for adding a heading.
 * @slot description - A slot for adding a description.
 * @slot footer-start - A slot for adding a leading footer.
 * @slot footer-end - A slot for adding a trailing footer.
 */

@Component({
  tag: "calcite-card",
  styleUrl: "card.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Card
  implements InteractiveComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**  When `true`, a busy indicator is displayed. */
  @Prop({ reflect: true }) loading = false;

  /** Sets the placement of the thumbnail defined in the `thumbnail` slot. */
  @Prop({ reflect: true }) thumbnailPosition: LogicalFlowPosition = "block-start";

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible name for the component. */
  @Prop() label: string;

  /**
   * When `true`, the component is selectable.
   *
   * @deprecated use `selectionMode` property on a parent `calcite-card-group` instead.
   */
  @Prop({ reflect: true }) selectable = false;

  /** When `true`, the component is selected.  */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: CardMessages;

  /**
   * This internal property, managed by a containing `calcite-card-group`, is
   * conditionally set based on the `selectionMode` of the parent
   *
   * @internal
   */
  @Prop() selectionMode: Extract<"multiple" | "single" | "single-persist" | "none", SelectionMode> =
    "none";

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<CardMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the deprecated `selectable` is true, or `selectionMode` set on parent `calcite-card-group` is not `none` and the component is selected. */
  @Event({ cancelable: false }) calciteCardSelect: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalCardKeyEvent: EventEmitter<KeyboardEvent>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    if (!this.disabled) {
      this.containerEl?.focus();
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteCardElement;

  @State() effectiveLocale: string;

  @State() hasThumbnail = false;

  @State() hasHeading = false;

  @State() hasDescription = false;

  @State() hasSubtitle = false;

  @State() hasTitle = false;

  @State() hasFooterStart = false;

  @State() hasFooterEnd = false;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: CardMessages;

  @State() private hasContent = false;

  private containerEl: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private handleThumbnailSlotChange = (event: Event): void => {
    this.hasThumbnail = slotChangeHasAssignedElement(event);
  };

  private handleHeadingSlotChange = (event: Event): void => {
    this.hasHeading = slotChangeHasAssignedElement(event);
  };

  private handleDescriptionSlotChange = (event: Event): void => {
    this.hasDescription = slotChangeHasAssignedElement(event);
  };

  private handleTitleSlotChange = (event: Event): void => {
    this.hasTitle = slotChangeHasAssignedElement(event);
  };

  private handleSubtitleSlotChange = (event: Event): void => {
    this.hasSubtitle = slotChangeHasAssignedElement(event);
  };

  private handleFooterStartSlotChange = (event: Event): void => {
    this.hasFooterStart = slotChangeHasAssignedElement(event);
  };

  private handleFooterEndSlotChange = (event: Event): void => {
    this.hasFooterEnd = slotChangeHasAssignedElement(event);
  };

  private handleDefaultSlotChange = (event: Event): void => {
    this.hasContent = slotChangeHasAssignedElement(event);
  };

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (event.target === this.containerEl && !this.selectable && !this.disabled) {
      if (isActivationKey(event.key) && this.selectionMode !== "none") {
        this.calciteCardSelect.emit();
        event.preventDefault();
      } else {
        switch (event.key) {
          case "ArrowRight":
          case "ArrowLeft":
          case "Home":
          case "End":
            this.calciteInternalCardKeyEvent.emit(event);
            event.preventDefault();
            break;
        }
      }
    }
  };

  private cardBodyClickHandler = (event: MouseEvent): void => {
    const isFromScreenReader = event.target === this.containerEl;
    if (isFromScreenReader && !this.selectable && !this.disabled && this.selectionMode !== "none") {
      this.calciteCardSelect.emit();
    }
  };

  private renderCheckboxDeprecated(): VNode {
    return (
      <calcite-label class={CSS.checkboxWrapperDeprecated}>
        <calcite-checkbox
          checked={this.selected}
          label={this.messages.select}
          onCalciteCheckboxChange={this.selectCardDeprecated}
        />
      </calcite-label>
    );
  }

  private selectCardDeprecated = (event: CalciteCheckboxCustomEvent<void>): void => {
    this.selected = event.target.checked;
    this.calciteCardSelect.emit();
  };

  private cardSelectClick = (event): void => {
    if (!this.disabled) {
      event.preventDefault();
      this.calciteCardSelect.emit();
      this.setFocus();
    }
  };

  private renderThumbnail(): VNode {
    return (
      <section class={CSS.thumbnailWrapper} hidden={!this.hasThumbnail}>
        <slot name={SLOTS.thumbnail} onSlotchange={this.handleThumbnailSlotChange} />
      </section>
    );
  }

  private renderSelectionIcon(): VNode {
    const icon: IconNameOrString =
      this.selectionMode === "multiple" && this.selected
        ? ICONS.selected
        : this.selectionMode === "multiple"
          ? ICONS.unselected
          : this.selected
            ? ICONS.selectedSingle
            : ICONS.unselectedSingle;

    return (
      <div class={CSS.checkboxWrapper} onPointerDown={this.cardSelectClick} tabIndex={-1}>
        <calcite-icon icon={icon} scale="s" />
      </div>
    );
  }

  private renderHeader(): VNode {
    const hasHeader = this.hasHeading || this.hasDescription;
    const hasDeprecatedHeader = this.hasSubtitle || this.hasTitle;
    const showHeader = hasHeader || hasDeprecatedHeader;

    return (
      <header class={CSS.header} hidden={!showHeader}>
        {this.selectable ? this.renderCheckboxDeprecated() : null}
        <div class={CSS.headerTextContainer}>
          <slot name={SLOTS.heading} onSlotchange={this.handleHeadingSlotChange} />
          <slot name={SLOTS.description} onSlotchange={this.handleDescriptionSlotChange} />
          <slot name={SLOTS.title} onSlotchange={this.handleTitleSlotChange} />
          <slot name={SLOTS.subtitle} onSlotchange={this.handleSubtitleSlotChange} />
        </div>
        {this.selectionMode !== "none" && this.renderSelectionIcon()}
      </header>
    );
  }

  private renderFooter(): VNode {
    const hasFooter = this.hasFooterStart || this.hasFooterEnd;
    return (
      <footer class={CSS.footer} hidden={!hasFooter}>
        <slot name={SLOTS.footerStart} onSlotchange={this.handleFooterStartSlotChange} />
        <slot name={SLOTS.footerEnd} onSlotchange={this.handleFooterEndSlotChange} />
      </footer>
    );
  }

  render(): VNode {
    const thumbnailInline = this.thumbnailPosition.startsWith("inline");
    const thumbnailStart = this.thumbnailPosition.endsWith("start");
    const role =
      this.selectionMode === "multiple"
        ? "checkbox"
        : this.selectionMode !== "none"
          ? "radio"
          : undefined;
    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <div
            aria-checked={this.selectionMode !== "none" ? toAriaBoolean(this.selected) : undefined}
            aria-label={this.label}
            class={{ [CSS.contentWrapper]: true, inline: thumbnailInline }}
            onClick={this.cardBodyClickHandler}
            onKeyDown={this.keyDownHandler}
            ref={(el) => (this.containerEl = el)}
            role={role}
            tabIndex={!this.selectable || this.disabled ? 0 : -1}
          >
            {this.loading ? (
              <div aria-live="polite" class="calcite-card-loader-container">
                <calcite-loader label={this.messages.loading} />
              </div>
            ) : null}
            {thumbnailStart && this.renderThumbnail()}
            <section aria-busy={toAriaBoolean(this.loading)} class={{ [CSS.container]: true }}>
              {this.renderHeader()}
              <div
                class={{
                  [CSS.cardContent]: true,
                  [CSS.hasSlottedContent]: this.hasContent,
                }}
              >
                <slot onSlotchange={this.handleDefaultSlotChange} />
              </div>
              {this.renderFooter()}
            </section>
            {!thumbnailStart && this.renderThumbnail()}
          </div>
        </InteractiveContainer>
      </Host>
    );
  }
}
