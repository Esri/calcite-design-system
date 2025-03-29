// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, h, method, state, JsxNode } from "@arcgis/lumina";
import { Alignment, Scale } from "../interfaces";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { RowType, TableInteractionMode } from "../table/interfaces";
import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./table-cell.scss";

declare global {
  interface DeclareElements {
    "calcite-table-cell": TableCell;
  }
}

/** @slot - A slot for adding content, usually text content. */
export class TableCell extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private containerEl = createRef<HTMLTableCellElement>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  @state() contentsText = "";

  @state() focused = false;

  @state() selectionText = "";

  // #endregion

  // #region Public Properties

  /** Specifies the alignment of the component. */
  @property({ reflect: true }) alignment: Alignment = "start";

  /** Specifies the number of columns the component should span. */
  @property({ reflect: true }) colSpan: number;

  /** @private */
  @property() disabled: boolean;

  /** @private */
  @property() interactionMode: TableInteractionMode = "interactive";

  /** @private */
  @property() lastCell: boolean;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** @private */
  @property() numberCell: boolean;

  /** @private */
  @property() parentRowAlignment: Alignment = "start";

  /** @private */
  @property() parentRowIsSelected: boolean;

  /** @private */
  @property() parentRowPositionLocalized: string;

  /** @private */
  @property() parentRowType: RowType;

  /** @private */
  @property() positionInRow: number;

  /** @private */
  @property() readCellContentsToAT: boolean;

  /** Specifies the number of rows the component should span. */
  @property({ reflect: true }) rowSpan: number;

  /** @private */
  @property() scale: Scale = "m";

  /** @private */
  @property() selectionCell: boolean;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.containerEl.value;
    });
  }

  // #endregion

  // #region Lifecycle

  async load(): Promise<void> {
    this.updateScreenReaderContentsText();
    this.updateScreenReaderSelectionText();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("parentRowIsSelected")) {
      this.updateScreenReaderSelectionText();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods

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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const dir = getElementDir(this.el);
    const staticCell =
      this.disabled ||
      (this.interactionMode === "static" &&
        (!this.selectionCell || (this.selectionCell && this.parentRowType === "foot")));

    return (
      <InteractiveContainer disabled={this.disabled}>
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
          ref={this.containerEl}
          role={this.interactionMode === "interactive" ? "gridcell" : "cell"}
          rowSpan={this.rowSpan}
          tabIndex={staticCell ? -1 : 0}
        >
          {(this.selectionCell || this.readCellContentsToAT) && (
            <span ariaLive={this.focused ? "polite" : "off"} class={CSS.assistiveText}>
              {this.selectionCell && this.selectionText}
              {this.readCellContentsToAT && !this.selectionCell && this.contentsText}
            </span>
          )}
          <slot onSlotChange={this.updateScreenReaderContentsText} />
        </td>
      </InteractiveContainer>
    );
  }

  // #endregion
}
