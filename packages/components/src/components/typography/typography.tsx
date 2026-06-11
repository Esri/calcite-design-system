import { LitElement, createEvent, h, property, type JsxNode } from "@arcgis/lumina";
import { slotChangeGetTextContent } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { styles } from "./typography.scss";

/**
 *  @slot - A slot for adding text.
 */

type TruncatePosition = "end";

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

  private resizeObserver = createObserver("resize", (): void => {
    const isOverflowing =
      this.el.scrollWidth > this.el.clientWidth || this.el.scrollHeight > this.el.clientHeight;

    if (isOverflowing) {
      if (this.tooltipEnabled) {
        this.title = this.value || "";
        if (!this.isTruncated) {
          this.isTruncated = true;
          this.calciteTypographyTruncated.emit();
        }
      }
    } else if (this.isTruncated) {
      this.isTruncated = false;
      this.calciteTypographyUnTruncated.emit();
      this.title = "";
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

  /**
   * Specifies white-space wrapping behavior.
   */
  @property({ reflect: true }) wrap: boolean;

  //#endregion

  //#region Events

  calciteTypographyTruncated = createEvent({ cancelable: false });

  calciteTypographyUnTruncated = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.resizeObserver?.observe(this.el);
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  async loaded(): Promise<void> {
    this.el.style.setProperty("--calcite-internal-text-max-lines", this.maxLines?.toString());
  }

  //#endregion

  //#region Private Methods

  private handleDefaultSlotChange(event: Event): void {
    const defaultText = slotChangeGetTextContent(event);
    this.value = defaultText;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return <slot onSlotChange={this.handleDefaultSlotChange} />;
  }

  //#endregion
}
