import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
import { LitElement, property, h, method, state, JsxNode } from "@arcgis/lumina";
import { useDirection } from "@arcgis/lumina/controllers";
import { Alignment, Scale } from "../interfaces";
import { RowType, TableInteractionMode } from "../table/interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./table-cell.scss";

declare global {
  interface DeclareElements {
    "calcite-table-cell": TableCell;
  }
}

/** @slot - A slot for adding content, usually text content. */
export class TableCell extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private containerRef = createRef<HTMLDivElement>();

  private direction = useDirection();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region State Properties

  @state() contentsText = "";

  @state() focused = false;

  @state() selectionText = "";

  //#endregion

  //#region Public Properties

  /**
   * Specifies the horizontal alignment of content within the component.
   *
   * - `"start"` positions content at the start of the component.
   * - `"center"` positions content in the middle of the component.
   * - `"end"` positions content at the end of the component.
   */
  @property({ reflect: true }) alignment: Alignment = "start";

  /** Specifies the number of columns the component should span. */
  @property({ reflect: true }) colSpan?: number;

  /** @private */
  @property() columnStart?: number;

  /** @private */
  @property() disabled = false;

  /** @private */
  @property() effectiveColSpan?: number;

  /** @private */
  @property() effectiveRowSpan?: number;

  /** @private */
  @property() interactionMode: TableInteractionMode = "interactive";

  /** @private */
  @property() lastCell = false;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** @private */
  @property() numberCell = false;

  /** @private */
  @property({ reflect: true }) reachesBodyEnd = false;

  /** @private */
  @property() parentRowAlignment: Alignment = "start";

  /** @private */
  @property() parentRowIsSelected = false;

  /** @private */
  @property() parentRowPositionLocalized?: string;

  /** @private */
  @property() parentRowType!: RowType;

  /** @private */
  @property() positionInRow!: number;

  /** @private */
  @property() readCellContentsToAT = false;

  /** Specifies the number of rows the component should span. */
  @property({ reflect: true }) rowSpan?: number;

  /** @private */
  @property() scale: Scale = "m";

  /** @private */
  @property() selectionCell = false;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.containerRef.value, options);
  }

  //#endregion

  //#region Lifecycle

  async load(): Promise<void> {
    this.updateScreenReaderContentsText();
    this.updateScreenReaderSelectionText();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("parentRowIsSelected")) {
      this.updateScreenReaderSelectionText();
    }
  }

  //#endregion

  //#region Private Methods

  private updateScreenReaderSelectionText(): void {
    const selectedText = `${this.messages?.row} ${this.parentRowPositionLocalized} ${this.messages?.selected} ${this.messages?.keyboardDeselect}`;
    const unselectedText = `${this.messages?.row} ${this.parentRowPositionLocalized} ${this.messages?.unselected} ${this.messages?.keyboardSelect}`;
    this.selectionText = this.parentRowIsSelected ? selectedText : unselectedText;
  }

  private updateScreenReaderContentsText(): void {
    this.contentsText = this.el.textContent;
  }

  private onContainerBlur(): void {
    this.focused = false;
  }

  private onContainerFocus(): void {
    this.focused = true;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const dir = this.direction;
    const staticCell =
      this.disabled ||
      (this.interactionMode === "static" &&
        (!this.selectionCell || (this.selectionCell && this.parentRowType === "foot")));

    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div
          ariaColIndex={this.columnStart}
          ariaColSpan={this.effectiveColSpan}
          ariaRowSpan={this.effectiveRowSpan}
          class={{
            [CSS.cell]: true,
            [CSS.footerCell]: this.parentRowType === "foot",
            [CSS.contentCell]: !this.numberCell && !this.selectionCell,
            [CSS.numberCell]: this.numberCell,
            [CSS.selectionCell]: this.selectionCell,
            [CSS.selectedCell]: this.parentRowIsSelected,
            [CSS.lastCell]: this.lastCell && (!this.rowSpan || (this.colSpan && !!this.rowSpan)),
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.staticCell]: staticCell,
            [this.parentRowAlignment]:
              this.parentRowAlignment === "start" || this.parentRowAlignment === "end",
          }}
          onBlur={this.onContainerBlur}
          onFocus={this.onContainerFocus}
          ref={this.containerRef}
          role={this.interactionMode === "interactive" ? "gridcell" : "cell"}
          tabIndex={staticCell ? -1 : 0}
        >
          {(this.selectionCell || this.readCellContentsToAT) && (
            <span ariaLive={this.focused ? "polite" : "off"} class={CSS.assistiveText}>
              {this.selectionCell && this.selectionText}
              {this.readCellContentsToAT && !this.selectionCell && this.contentsText}
            </span>
          )}
          <slot onSlotChange={this.updateScreenReaderContentsText} />
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
