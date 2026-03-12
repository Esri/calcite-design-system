import { LitElement, createEvent, h, property, type JsxNode } from "@arcgis/lumina";
import { slotChangeGetTextContent } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { getTextWidth } from "../../utils/dom";
import { styles } from "./typography.scss";
import { ELLIPSIS_CHAR } from "./resources";

/**
 *  @slot - A slot for adding text.
 */

type TruncatePosition = "middle" | "end";

declare global {
  interface DeclareElements {
    "calcite-typography": Typography;
  }
}

export class Typography extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private value: string;

  private isTruncated = false;

  /**
   * Used for dynamic middle truncation:
   * - keeps the original text as the source of truth
   * - updates displayed slot text only when needed
   */
  private truncatedValue = "";

  private isProgrammaticSlotWrite = false;

  private resizeObserver = createObserver("resize", (): void => {
    // Dynamic truncation is driven off actual overflow + available size.
    // This runs on resize to keep behavior responsive.
    const isOverflowing =
      this.el.scrollWidth > this.el.clientWidth || this.el.scrollHeight > this.el.clientHeight;

    if (isOverflowing) {
      if (this.tooltipEnabled) {
        this.title = this.truncatedValue || this.value || "";
      }
      this.calciteInternalTypographyTruncated.emit();
    } else if (this.isTruncated) {
      this.isTruncated = false;
      this.calciteTypographyUnTruncated.emit();
      this.title = "";
    }

    // If middle truncation is enabled, recompute the rendered text based on available width.
    if (this.truncatePosition === "middle") {
      this.updateTruncationText();
    }
  });

  //#endregion

  //#region Public Properties

  // @property() ellipsis: boolean;

  @property({ type: Number, reflect: true }) maxLines: number;

  /**
   * Specifies the position of truncation ellipsis when text overflows.
   * `maxLines` property should be set to `1` when `truncatePosition` is set to `middle`, as multi-line truncation is only supported at the end of the text.
   */
  @property({ reflect: true }) truncatePosition: TruncatePosition;

  /**
   * Displays native tooltip with full text content when text is truncated.
   */
  @property() tooltipEnabled = false;

  /**
   * @private
   */
  @property({ reflect: true }) title: string;

  //#endregion

  //#region Events

  calciteInternalTypographyTruncated = createEvent({ cancelable: false });

  calciteTypographyTruncated = createEvent({ cancelable: false });

  calciteTypographyUnTruncated = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalTypographyTruncated", this.handleTruncated);
  }

  override connectedCallback(): void {
    // Always observe when truncation-by-position requires JS updates,
    // or when tooltip depends on overflow detection.
    if (this.tooltipEnabled || this.truncatePosition === "middle") {
      this.resizeObserver?.observe(this.el);
    }
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  async loaded(): Promise<void> {
    this.el.style.setProperty("--calcite-internal-text-max-lines", this.maxLines?.toString());
  }

  //#endregion

  //#region Private Methods

  private handleTruncated(): void {
    if (!this.isTruncated) {
      this.isTruncated = true;
      this.calciteTypographyTruncated.emit();
    }
  }

  private handleDefaultSlotChange(event: Event): void {
    // Prevent recursion when we update slot text programmatically.
    if (this.isProgrammaticSlotWrite) {
      this.isProgrammaticSlotWrite = false;
      return;
    }

    const defaultText = slotChangeGetTextContent(event);
    this.value = defaultText;

    // Capture source of truth for JS truncation.
    if (this.value != null) {
      this.truncatedValue = this.value;
    }

    if (this.truncatePosition === "middle" && (!this.maxLines || this.maxLines === 1)) {
      this.updateTruncationText();
    }
  }

  private updateTruncationText(): void {
    // Only applies to single-line truncation behaviors.

    if (!this.truncatedValue || this.maxLines > 1) {
      return;
    }

    // Defer until layout is stable.
    requestAnimationFrame(() => {
      const availableWidth = this.el.clientWidth;
      // If we can't measure, do nothing.
      if (!availableWidth) {
        return;
      }

      const computed = getComputedStyle(this.el);
      const font = computed.font || `${computed.fontSize} ${computed.fontFamily}`;
      const measuredFull = getTextWidth(this.truncatedValue, font);

      // If it fits, render full text.
      if (measuredFull <= availableWidth) {
        this.setRenderedText(this.truncatedValue);
        return;
      } else {
        const truncated = this.truncateMiddleToFit(
          this.truncatedValue,
          availableWidth,
          font,
          ELLIPSIS_CHAR,
        );
        this.setRenderedText(truncated);
        return;
      }
    });
  }

  private setRenderedText(next: string): void {
    const current = (this.el.textContent || "").trim();
    if (current === next) {
      return;
    }

    // Note: this assumes the common case: plain text in default slot.
    // If consumer provides complex markup, JS truncation will not apply.
    this.isProgrammaticSlotWrite = true;
    this.el.textContent = next;

    // Keep tooltip source as the original full text.
    if (this.tooltipEnabled) {
      this.title = this.truncatedValue;
    }
  }

  private truncateMiddleToFit(
    text: string,
    maxWidth: number,
    font: string,
    ellipsisChar: string,
  ): string {
    //Keep a prefix and suffix; shrink from the middle until it fits.
    //Binary search on number of chars kept (total kept excluding ellipsis).
    let startIndex = 0;
    let endIndex = text.length;

    const truncatedString = (index: number): string => {
      const leftCount = Math.ceil(index / 2);
      const rightCount = Math.floor(index / 2);
      return text.slice(0, leftCount) + ellipsisChar + text.slice(text.length - rightCount);
    };

    while (startIndex < endIndex) {
      const mid = Math.ceil((startIndex + endIndex) / 2);
      const candidate = truncatedString(mid);

      if (getTextWidth(candidate, font) <= maxWidth) {
        startIndex = mid;
      } else {
        endIndex = mid - 1;
      }
    }

    const optimalIndex = Math.max(0, startIndex);
    // Ensure we always show at least something on both sides when possible.
    if (optimalIndex <= 1) {
      return ellipsisChar;
    }
    return truncatedString(optimalIndex);
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return <slot onSlotChange={this.handleDefaultSlotChange} />;
  }

  //#endregion
}
