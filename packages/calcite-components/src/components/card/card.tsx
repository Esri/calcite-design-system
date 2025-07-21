// @ts-strict-ignore
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  ToEvents,
} from "@arcgis/lumina";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { LogicalFlowPosition, SelectionMode } from "../interfaces";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Checkbox } from "../checkbox/checkbox";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, ICONS, SLOTS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./card.scss";

declare global {
  interface DeclareElements {
    "calcite-card": Card;
  }
}

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
export class Card extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private containerEl = createRef<HTMLDivElement>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() private hasContent = false;

  @state() hasDescription = false;

  @state() hasFooterEnd = false;

  @state() hasFooterStart = false;

  @state() hasHeading = false;

  @state() hasSubtitle = false;

  @state() hasThumbnail = false;

  @state() hasTitle = false;

  //#endregion

  //#region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Accessible name for the component. */
  @property() label: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * When `true`, the component is selectable.
   *
   * @deprecated use `selectionMode` property on a parent `calcite-card-group` instead.
   */
  @property({ reflect: true }) selectable = false;

  /** When `true`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /**
   * This internal property, managed by a containing `calcite-card-group`, is
   * conditionally set based on the `selectionMode` of the parent
   *
   * @private
   */
  @property() selectionMode: Extract<
    "multiple" | "single" | "single-persist" | "none",
    SelectionMode
  > = "none";

  /** Sets the placement of the thumbnail defined in the `thumbnail` slot. */
  @property({ reflect: true }) thumbnailPosition: LogicalFlowPosition = "block-start";

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.containerEl.value;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires when the deprecated `selectable` is true, or `selectionMode` set on parent `calcite-card-group` is not `none` and the component is selected. */
  calciteCardSelect = createEvent({ cancelable: false });

  /** @private */
  calciteInternalCardKeyEvent = createEvent<KeyboardEvent>({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override updated(): void {
    updateHostInteraction(this);
  }

  //#endregion

  //#region Private Methods

  private handleThumbnailSlotChange(event: Event): void {
    this.hasThumbnail = slotChangeHasAssignedElement(event);
  }

  private handleHeadingSlotChange(event: Event): void {
    this.hasHeading = slotChangeHasAssignedElement(event);
  }

  private handleDescriptionSlotChange(event: Event): void {
    this.hasDescription = slotChangeHasAssignedElement(event);
  }

  private handleTitleSlotChange(event: Event): void {
    this.hasTitle = slotChangeHasAssignedElement(event);
  }

  private handleSubtitleSlotChange(event: Event): void {
    this.hasSubtitle = slotChangeHasAssignedElement(event);
  }

  private handleFooterStartSlotChange(event: Event): void {
    this.hasFooterStart = slotChangeHasAssignedElement(event);
  }

  private handleFooterEndSlotChange(event: Event): void {
    this.hasFooterEnd = slotChangeHasAssignedElement(event);
  }

  private handleDefaultSlotChange(event: Event): void {
    this.hasContent = slotChangeHasAssignedElement(event);
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (event.target === this.containerEl.value && !this.selectable && !this.disabled) {
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
  }

  private cardBodyClickHandler(event: MouseEvent): void {
    const isFromScreenReader = event.target === this.containerEl.value;
    if (isFromScreenReader && !this.selectable && !this.disabled && this.selectionMode !== "none") {
      this.calciteCardSelect.emit();
    }
  }

  private selectCardDeprecated(event: ToEvents<Checkbox>["calciteCheckboxChange"]): void {
    this.selected = event.currentTarget.checked;
    this.calciteCardSelect.emit();
  }

  private cardSelectClick(event): void {
    if (!this.disabled) {
      event.preventDefault();
      this.calciteCardSelect.emit();
      this.setFocus();
    }
  }

  //#endregion

  //#region Rendering

  private renderCheckboxDeprecated(): JsxNode {
    return (
      <calcite-label class={CSS.checkboxWrapperDeprecated}>
        <calcite-checkbox
          checked={this.selected}
          label={this.messages.select}
          oncalciteCheckboxChange={this.selectCardDeprecated}
        />
      </calcite-label>
    );
  }

  private renderThumbnail(): JsxNode {
    return (
      <section class={CSS.thumbnailWrapper} hidden={!this.hasThumbnail}>
        <slot name={SLOTS.thumbnail} onSlotChange={this.handleThumbnailSlotChange} />
      </section>
    );
  }

  private renderSelectionIcon(): JsxNode {
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

  private renderHeader(): JsxNode {
    const hasHeader = this.hasHeading || this.hasDescription;
    const hasDeprecatedHeader = this.hasSubtitle || this.hasTitle;
    const showHeader = hasHeader || hasDeprecatedHeader;

    return (
      <header class={CSS.header} hidden={!showHeader}>
        {this.selectable ? this.renderCheckboxDeprecated() : null}
        <div class={CSS.headerTextContainer}>
          <slot name={SLOTS.heading} onSlotChange={this.handleHeadingSlotChange} />
          <slot name={SLOTS.description} onSlotChange={this.handleDescriptionSlotChange} />
          <slot name={SLOTS.title} onSlotChange={this.handleTitleSlotChange} />
          <slot name={SLOTS.subtitle} onSlotChange={this.handleSubtitleSlotChange} />
        </div>
        {this.selectionMode !== "none" && this.renderSelectionIcon()}
      </header>
    );
  }

  private renderFooter(): JsxNode {
    const hasFooter = this.hasFooterStart || this.hasFooterEnd;
    return (
      <footer class={CSS.footer} hidden={!hasFooter}>
        <slot name={SLOTS.footerStart} onSlotChange={this.handleFooterStartSlotChange} />
        <slot name={SLOTS.footerEnd} onSlotChange={this.handleFooterEndSlotChange} />
      </footer>
    );
  }

  override render(): JsxNode {
    const thumbnailInline = this.thumbnailPosition.startsWith("inline");
    const thumbnailStart = this.thumbnailPosition.endsWith("start");
    const role =
      this.selectionMode === "multiple"
        ? "checkbox"
        : this.selectionMode !== "none"
          ? "radio"
          : undefined;
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          ariaChecked={this.selectionMode !== "none" ? this.selected : undefined}
          ariaLabel={this.label}
          class={{ [CSS.contentWrapper]: true, inline: thumbnailInline }}
          onClick={this.cardBodyClickHandler}
          onKeyDown={this.keyDownHandler}
          ref={this.containerEl}
          role={role}
          tabIndex={!this.selectable || this.disabled ? 0 : -1}
        >
          {this.loading ? (
            <div ariaLive="polite" class="calcite-card-loader-container">
              <calcite-loader label={this.messages.loading} />
            </div>
          ) : null}
          {thumbnailStart && this.renderThumbnail()}
          <section ariaBusy={this.loading} class={{ [CSS.container]: true }}>
            {this.renderHeader()}
            <div
              class={{
                [CSS.cardContent]: true,
                [CSS.hasSlottedContent]: this.hasContent,
              }}
            >
              <slot onSlotChange={this.handleDefaultSlotChange} />
            </div>
            {this.renderFooter()}
          </section>
          {!thumbnailStart && this.renderThumbnail()}
        </div>
      </InteractiveContainer>
    );
  }

  //#endregion
}
