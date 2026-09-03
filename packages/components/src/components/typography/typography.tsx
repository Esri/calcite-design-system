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

  private truncatedValue = "";

  private isTextContentChanged = false;

  private resizeObserver = createObserver("resize", (): void => {
    const { truncatePosition, maxLines } = this;

    if (truncatePosition === "end") {
      const isOverflowing =
        this.el.scrollWidth > this.el.clientWidth || this.el.scrollHeight > this.el.clientHeight;
      if (isOverflowing) {
        this.emitTruncateEvent();
      } else {
        this.emitUnTruncateEvent();
      }
    }

    if (truncatePosition === "middle" && (!maxLines || maxLines === 1)) {
      this.truncateText();
    }
  });

  //#endregion

  //#region Public Properties

  @property({ type: Number, reflect: true }) maxLines: number;

  /**
   * Specifies the position of truncation ellipsis when text overflows.
   * `maxLines` property should be set to `1` when `truncatePosition` is set to `middle`, as multi-line truncation is only supported at the end of the text.
   */
  @property({ reflect: true }) truncatePosition: TruncatePosition = "end";

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

  calciteTypographyTruncated = createEvent({ cancelable: false });

  calciteTypographyUnTruncated = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.resizeObserver?.observe(this.el);
  }

  async loaded(): Promise<void> {
    this.el.style.setProperty("--calcite-internal-text-max-lines", this.maxLines?.toString());
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private handleDefaultSlotChange(event: Event): void {
    if (this.isTextContentChanged) {
      this.isTextContentChanged = false;
      return;
    }
    this.value = slotChangeGetTextContent(event);
    this.truncatedValue = this.value;
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
        this.emitUnTruncateEvent();
        return;
      } else {
        const middleTruncatedText = this.getTruncatedText(
          this.truncatedValue,
          clientWidth,
          font,
          ELLIPSIS_CHAR,
        );
        this.setValue(middleTruncatedText);
        this.emitTruncateEvent();
        return;
      }
    });
  }

  private setValue(value: string): void {
    const currentTextContent = (this.el.textContent || "").trim();
    if (currentTextContent === value) {
      return;
    }

    this.isTextContentChanged = true;
    this.el.textContent = value;
  }

  //TODO: refactor
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

  private emitTruncateEvent(): void {
    if (!this.isTruncated) {
      this.isTruncated = true;
      this.calciteTypographyTruncated.emit();
      if (this.tooltipEnabled) {
        this.title = this.value || "";
      }
    }
  }

  private emitUnTruncateEvent(): void {
    if (this.isTruncated) {
      this.isTruncated = false;
      this.calciteTypographyUnTruncated.emit();
      this.title = "";
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return <slot onSlotChange={this.handleDefaultSlotChange} />;
  }

  //#endregion
}
