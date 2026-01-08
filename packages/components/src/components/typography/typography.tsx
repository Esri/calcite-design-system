import { LitElement, createEvent, h, property, type JsxNode } from "@arcgis/lumina";
import { slotChangeGetTextContent } from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { styles } from "./typography.scss";

declare global {
  interface DeclareElements {
    // Declare a custom element with a given tag name
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

  //# region Private Methods
  private resizeObserver = createObserver("resize", (): void => {
    // if (this.tooltipEnabled) {
    // const { fontSize, fontFamily } = getComputedStyle(this.el);
    // const inputTextWidth = getTextWidth(this.defaultText, `${fontSize} ${fontFamily}`);

    const isOverflowing =
      this.el.scrollWidth > this.el.clientWidth || this.el.scrollHeight > this.el.clientHeight;
    // const isOverflowing = inputTextWidth > this.el.getBoundingClientRect().width;
    if (isOverflowing) {
      console.log(
        "resize observed & overflowing",
        // inputTextWidth,
        this.el.getBoundingClientRect().width,
      );
      this.calciteInternalTypographyTruncated.emit();
    } else {
      if (this.isTruncated) {
        this.isTruncated = false;
        this.calciteTypographyUnTruncated.emit();
      }
    }
    // }
  });

  //#endregion

  //#region Public Properties

  @property() ellipsis: boolean;

  @property() nowrap: boolean;

  @property({ reflect: true }) maxLines: number;

  @property({ reflect: true }) truncatePosition: "start" | "middle" | "end" = "end";

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

  //# endregion

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalTypographyTruncated", this.handleTruncated);
  }

  override connectedCallback(): void {
    if (this.tooltipEnabled) {
      this.resizeObserver?.observe(this.el);
    }
  }

  async loaded(): Promise<void> {
    this.el.style.setProperty("--calcite-internal-text-max-lines", this.maxLines?.toString());
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
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
    this.value = slotChangeGetTextContent(event);
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return <slot onSlotChange={this.handleDefaultSlotChange} />;
  }

  //#endregion
}
