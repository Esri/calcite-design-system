import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
import { LitElement, property, h, method, state, JsxNode } from "@arcgis/lumina";
import { useDirection } from "@arcgis/lumina/controllers";
import { Alignment, Scale } from "../types";
import { RowType, TableInteractionMode } from "../table/types";
import { CSS_UTILITY } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import { useFocusable } from "../../controllers/useFocusable";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./table-cell.scss";
import { styles as screenReaderStyles } from "../../styles/component/screen-reader.scss";

declare global {
  interface DeclareElements {
    "calcite-table-cell": TableCell;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     *
     * @deprecated in v3.3.0, removal target v6.0.0 - Use `--calcite-table-cell-background-color` instead.
     * @public
     */
    "--calcite-table-cell-background": "*";
    /**
     * Specifies the component's background color.
     *
     * @public
     */
    "--calcite-table-cell-background-color": "*";
    /**
     * Specifies the component's border color.
     *
     * @public
     */
    "--calcite-table-cell-border-color": "*";
    /**
     * Specifies the component's text color.
     *
     * @public
     */
    "--calcite-table-cell-text-color": "*";
  }
}

/** @public */
interface TableCellSlots {
  /**
   * A slot for adding content, usually text content.
   *
   * @public
   */
  "": Node[];
}

/**
 * @public
 * @docGroup Table
 * @parent calcite-table
 */
export class TableCell extends LitElement {
  //#region Type-only metadata members

  /** @public */
  override ["@slots"]!: TableCellSlots;

  //#endregion

  //#region Static Members

  static override styles = [styles, screenReaderStyles];

  //#endregion

  //#region Private Properties

  private containerRef = createRef<HTMLTableCellElement>();

  private direction = useDirection();

  /**
   * Made into a prop for testing purposes only
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useFocusable<this>()(this);

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
   *
   * @public
   */
  @property({ reflect: true }) alignment: Alignment = "start";

  /**
   * Specifies the number of columns the component should span.
   *
   * @public
   */
  @property({ reflect: true }) colSpan?: number;

  /** @internal */
  @property() disabled = false;

  /** @internal */
  @property() interactionMode: TableInteractionMode = "interactive";

  /** @internal */
  @property() lastCell = false;

  /**
   * @public
   * @copyDoc
   */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** @internal */
  @property() numberCell = false;

  /** @internal */
  @property({ reflect: true }) reachesBodyEnd = false;

  /** @internal */
  @property() parentRowAlignment: Alignment = "start";

  /** @internal */
  @property() parentRowIsSelected = false;

  /** @internal */
  @property() parentRowPositionLocalized?: string;

  /** @internal */
  @property() parentRowType!: RowType;

  /** @internal */
  @property() positionInRow!: number;

  /** @internal */
  @property() readCellContentsToAT = false;

  /**
   * Specifies the number of rows the component should span.
   *
   * @public
   */
  @property({ reflect: true }) rowSpan?: number;

  /** @internal */
  @property() scale: Scale = "m";

  /** @internal */
  @property() selectionCell = false;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @public
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
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
        <td
          class={{
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
          colSpan={this.colSpan}
          onBlur={this.onContainerBlur}
          onFocus={this.onContainerFocus}
          ref={this.containerRef}
          role={this.interactionMode === "interactive" ? "gridcell" : "cell"}
          rowSpan={this.rowSpan}
          tabIndex={staticCell ? -1 : 0}
        >
          {(this.selectionCell || this.readCellContentsToAT) && (
            <span ariaLive={this.focused ? "polite" : "off"} class={CSS_UTILITY.screenReaderText}>
              {this.selectionCell && this.selectionText}
              {this.readCellContentsToAT && !this.selectionCell && this.contentsText}
            </span>
          )}
          <slot onSlotChange={this.updateScreenReaderContentsText} />
        </td>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
