import { LitElement, h, property, type JsxNode, Fragment } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import {
  slotChangeGetTextContent,
  getTextWidth,
  getAssignedTextNodesFromSlotEl,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { styles } from "./text.scss";
import { ELLIPSIS_CHAR, CSS } from "./resources";
import { PropertyValues } from "lit";

type TruncatePosition = "middle" | "end";

declare global {
  interface DeclareElements {
    "calcite-text": Text;
  }
}

interface TextSlots {
  /**
   * A slot for adding text.
   */
  "": Node[];
}

export class Text extends LitElement {
  //#region Type-only metadata members

  override ["@slots"]!: TextSlots;

  //#endregion

  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private value?: string;

  private defaultSlotRef = createRef<HTMLSlotElement>();

  private middleTruncatedSpanRef = createRef<HTMLSpanElement>();

  private mutationObserver = createObserver("mutation", (mutations) => {
    const assignedTextNodes = getAssignedTextNodesFromSlotEl(this.defaultSlotRef.value!);

    if (mutations.some(({ target }) => assignedTextNodes.includes(target as CharacterData))) {
      this.setValue(
        assignedTextNodes
          .map((node) => node.textContent)
          .join("")
          .trim(),
      );
    }
  });

  private resizeObserver = createObserver("resize", (): void => {
    this.handleTruncation();
  });

  //#endregion

  //#region Public Properties

  /**
   * Specifies the maximum number of lines to display before truncating the text with an ellipsis.
   */
  @property({ type: Number, reflect: true }) maxLines?: number;

  /**
   * Specifies the position of truncation ellipsis when text overflows.
   * `truncatePosition` is ignored when `maxLines` is configured, as multi-line truncation always occurs at the end.
   */
  @property({ reflect: true }) truncatePosition?: TruncatePosition;

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.resizeObserver?.observe(this.el);
    this.mutationObserver?.observe(this.el, {
      characterData: true,
      subtree: true,
    });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("maxLines")) {
      if (!this.maxLines && this.hasUpdated) {
        this.clearTooltipTitle();
      }
      this.updateMaxLinesToken();
    }
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("truncatePosition") && !this.maxLines) {
      this.handleTruncatePositionChange(changes.get("truncatePosition"));
    }
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private clearTooltipTitle(): void {
    this.el.title = "";
  }

  private getTruncatedText(text: string, maxWidth: number, font: string): string {
    let startIndex = 0;
    let endIndex = text.length;

    const truncatedString = (index: number): string => {
      const leftCount = Math.ceil(index / 2);
      const rightCount = Math.floor(index / 2);
      return text.slice(0, leftCount) + ELLIPSIS_CHAR + text.slice(text.length - rightCount);
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
      return ELLIPSIS_CHAR;
    }
    return truncatedString(optimalIndex);
  }

  private handleDefaultSlotChange(event: Event): void {
    this.setValue(slotChangeGetTextContent(event));
  }

  private setValue(value: string): void {
    this.value = value;
    this.renderedText = value;
    this.handleTruncation();
  }

  private handleTruncation(): void {
    const { truncatePosition, maxLines } = this;
    if (this.truncatePosition === "middle" && !this.maxLines) {
      this.truncateMiddleText();
    } else if (truncatePosition === "end" || (maxLines && maxLines >= 1)) {
      this.syncTooltipState();
    }
  }

  private hasOverflow(): boolean {
    return this.el.scrollWidth > this.el.clientWidth || this.el.scrollHeight > this.el.clientHeight;
  }

  private syncTooltipState(): void {
    if (this.hasOverflow()) {
      this.setTooltipTitle();
    } else {
      this.clearTooltipTitle();
    }
  }

  private handleTruncatePositionChange(oldValue: TruncatePosition | undefined): void {
    const newValue = this.truncatePosition;
    if (oldValue && !newValue) {
      this.clearTooltipTitle();
    } else {
      this.handleTruncation();
    }
  }

  private setTooltipTitle(): void {
    this.el.title = this.value || "";
  }

  private setMiddleTruncatedText(value: string | undefined): void {
    const middleTruncatedTextEl = this.middleTruncatedSpanRef.value;
    if (!middleTruncatedTextEl) {
      return;
    }
    middleTruncatedTextEl.textContent = value || "";
  }

  private truncateMiddleText(): void {
    requestAnimationFrame(() => {
      const clientWidth = this.el.clientWidth;
      if (!clientWidth) {
        return;
      }
      const computedStyle = getComputedStyle(this.el);
      const font = computedStyle.font || `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      const textWidth = getTextWidth(this.value, font);

      if (textWidth <= clientWidth) {
        this.setMiddleTruncatedText(this.value);
        this.clearTooltipTitle();
      } else {
        const middleTruncatedText = this.getTruncatedText(this.renderedText, clientWidth, font);
        this.setMiddleTruncatedText(middleTruncatedText);
        this.setTooltipTitle();
      }
    });
  }

  private updateMaxLinesToken(): void {
    this.el.style.setProperty(
      "--calcite-internal-text-max-lines",
      this.maxLines?.toString() || null,
    );
  }

  //#endregion

  //#region Rendering

  private renderedText = "";

  override render(): JsxNode {
    return (
      <Fragment>
        <slot onSlotChange={this.handleDefaultSlotChange} ref={this.defaultSlotRef} />
        <span class={CSS.middleTruncatedText} ref={this.middleTruncatedSpanRef} />
      </Fragment>
    );
  }

  //#endregion
}
