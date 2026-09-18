import { LitElement, h, property, type JsxNode } from "@arcgis/lumina";
import { slotChangeGetTextContent } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { getTextWidth } from "../../utils/dom";
import { styles } from "./text.scss";
import { ELLIPSIS_CHAR } from "./resources";
import { PropertyValues } from "lit";

/**
 *  @slot - A slot for adding text.
 */

type TruncatePosition = "middle" | "end";

declare global {
  interface DeclareElements {
    "calcite-text": Text;
  }
}

export class Text extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private isTextContentChanged = false;

  private isTruncated = false;

  private truncatedValue = "";

  private value?: string;

  private resizeObserver = createObserver("resize", (): void => {
    const { truncatePosition, maxLines } = this;

    if (truncatePosition === "end") {
      this.handleOverflow();
    }

    if (truncatePosition === "middle" && (!maxLines || maxLines === 1)) {
      this.truncateText();
    }
  });

  //#endregion

  //#region Public Properties

  @property({ type: Number, reflect: true }) maxLines?: number;

  /**
   * Specifies the position of truncation ellipsis when text overflows.
   * `maxLines` property is not supported when `truncatePosition` is set to `middle`, as multi-line truncation is only supported at the end of the text.
   */
  @property({ reflect: true }) truncatePosition?: TruncatePosition;

  /**
   * Displays native tooltip with full text content when text is truncated.
   */
  @property() tooltipEnabled = false;

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.resizeObserver?.observe(this.el);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("maxLines") && this.hasUpdated) {
      this.updateMaxLinesToken();
    }
    if (changes.has("tooltipEnabled") && this.hasUpdated) {
      this.updateTitle();
    }
    if (changes.has("truncatePosition") && this.hasUpdated) {
      this.handleTruncatePositionChange();
    }
  }

  async loaded(): Promise<void> {
    this.updateMaxLinesToken();
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private clearTitleValue(): void {
    if (this.isTruncated) {
      this.isTruncated = false;
      this.el.title = "";
    }
  }

  private getTruncatedText(
    text: string,
    maxWidth: number,
    font: string,
    ellipsisChar: string,
  ): string {
    let startIndex = 0;
    let endIndex = text.length;

    const truncatedString = (index: number): string => {
      const leftCount = Math.ceil(index / 2);
      const rightCount = Math.floor(index / 2);
      return text.slice(0, leftCount) + ellipsisChar + text.slice(text.length - rightCount);
    };

    while (startIndex < endIndex) {
      const mid = Math.ceil((startIndex + endIndex) / 2);
      const optimalText = truncatedString(mid);

      if (getTextWidth(optimalText, font) <= maxWidth) {
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

  private handleDefaultSlotChange(event: Event): void {
    if (this.isTextContentChanged) {
      this.isTextContentChanged = false;
      return;
    }
    this.value = slotChangeGetTextContent(event);
    this.truncatedValue = this.value;
  }

  private handleOverflow(): void {
    const isOverflowing =
      this.el.scrollWidth > this.el.clientWidth || this.el.scrollHeight > this.el.clientHeight;
    if (isOverflowing) {
      this.setTitleValue();
    } else {
      this.clearTitleValue();
    }
  }

  private handleTruncatePositionChange(): void {
    if (this.truncatePosition === "end") {
      this.resizeObserver?.disconnect();
      this.resizeObserver?.observe(this.el);
      this.setValue(this.value);
    } else {
      this.setValue(this.value);
    }
  }

  private setTitleValue(): void {
    if (!this.isTruncated) {
      this.isTruncated = true;
      if (this.tooltipEnabled) {
        this.el.title = this.value || "";
      }
    }
  }

  private setValue(value: string | undefined): void {
    if (!value) {
      return;
    }
    const currentTextContent = (this.el.textContent || "").trim();
    if (currentTextContent === value) {
      return;
    }

    this.isTextContentChanged = true;
    this.el.textContent = value;
  }

  private truncateText(): void {
    requestAnimationFrame(() => {
      const clientWidth = this.el.clientWidth;
      if (!clientWidth) {
        return;
      }
      const computedStyle = getComputedStyle(this.el);
      const font = computedStyle.font || `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      const textWidth = getTextWidth(this.value, font);

      if (textWidth <= clientWidth) {
        this.setValue(this.value);
        this.clearTitleValue();
        return;
      } else {
        const middleTruncatedText = this.getTruncatedText(
          this.truncatedValue,
          clientWidth,
          font,
          ELLIPSIS_CHAR,
        );
        this.setValue(middleTruncatedText);
        this.setTitleValue();
        return;
      }
    });
  }

  private updateMaxLinesToken(): void {
    this.el.style.setProperty(
      "--calcite-internal-text-max-lines",
      this.maxLines?.toString() || null,
    );
    this.handleOverflow();
  }

  private updateTitle(): void {
    this.el.title = this.tooltipEnabled ? this.value || "" : "";
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return <slot onSlotChange={this.handleDefaultSlotChange} />;
  }

  //#endregion
}
