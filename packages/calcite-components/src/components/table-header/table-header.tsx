// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, h, method, state, JsxNode } from "@arcgis/lumina";
import { componentFocusable } from "../../utils/component";
import { Alignment, Scale, SelectionMode } from "../interfaces";
import { RowType, TableInteractionMode } from "../table/interfaces";
import { getIconScale } from "../../utils/component";
import { useT9n } from "../../controllers/useT9n";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS } from "./resources";
import { styles } from "./table-header.scss";

declare global {
  interface DeclareElements {
    "calcite-table-header": TableHeader;
  }
}

export class TableHeader extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private containerEl = createRef<HTMLTableCellElement>();

  // #endregion

  // #region State Properties

  @state() focused = false;

  @state() screenReaderText = "";

  // #endregion

  // #region Public Properties

  /** Specifies the alignment of the component. */
  @property({ reflect: true }) alignment: Alignment = "start";

  /** @private */
  @property() bodyRowCount: number;

  /** Specifies the number of columns the component should span. */
  @property({ reflect: true }) colSpan: number;

  /** A description to display beneath heading content. */
  @property({ reflect: true }) description: string;

  /** A heading to display above description content. */
  @property({ reflect: true }) heading: string;

  /** @private */
  @property() interactionMode: TableInteractionMode = "interactive";

  /** @private */
  @property() lastCell: boolean;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  /** @private */
  @property() numberCell = false;

  /** @private */
  @property() parentRowAlignment: Alignment = "start";

  /** @private */
  @property() parentRowIsSelected: boolean;

  /** @private */
  @property() parentRowType: RowType;

  /** @private */
  @property() positionInRow: number;

  /** Specifies the number of rows the component should span. */
  @property({ reflect: true }) rowSpan: number;

  /** @private */
  @property() scale: Scale;

  /** @private */
  @property() selectedRowCount: number;

  /** @private */
  @property() selectedRowCountLocalized: string;

  /** @private */
  @property() selectionCell = false;

  /** @private */
  @property() selectionMode: SelectionMode;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.containerEl.value.focus();
  }

  // #endregion

  // #region Lifecycle

  async load(): Promise<void> {
    this.updateScreenReaderText();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("selectedRowCount") || changes.has("selectedRowCountLocalized")) {
      this.updateScreenReaderText();
    }
  }

  // #endregion

  // #region Private Methods
  private updateScreenReaderText(): void {
    let text = "";
    const sharedText = `${this.selectedRowCountLocalized} ${this.messages?.selected}`;
    if (this.numberCell) {
      text = this.messages?.rowNumber;
    } else if (this.selectionMode === "single") {
      text = `${this.messages?.selectionColumn}. ${sharedText}`;
    } else if (this.bodyRowCount === this.selectedRowCount) {
      text = `${this.messages?.selectionColumn}. ${this.messages?.all} ${sharedText} ${this.messages?.keyboardDeselectAll}`;
    } else {
      text = `${this.messages?.selectionColumn}. ${sharedText} ${this.messages?.keyboardSelectAll}`;
    }
    this.screenReaderText = text;
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
    const scope = this.rowSpan
      ? "rowgroup"
      : this.colSpan
        ? "colgroup"
        : this.parentRowType === "body"
          ? "row"
          : "col";

    const checked = this.selectedRowCount === this.bodyRowCount;
    const indeterminate = this.selectedRowCount > 0;
    const selectionIcon = checked
      ? ICONS.checked
      : indeterminate
        ? ICONS.indeterminate
        : ICONS.unchecked;

    const staticCell = this.interactionMode === "static" && !this.selectionCell;
    return (
      <th
        ariaColIndex={this.parentRowType === "head" ? this.positionInRow : undefined}
        class={{
          [CSS.bodyRow]: this.parentRowType === "body",
          [CSS.footerRow]: this.parentRowType === "foot",
          [CSS.contentCell]: !this.numberCell && !this.selectionCell,
          [CSS.numberCell]: this.numberCell,
          [CSS.selectionCell]: this.selectionCell,
          [CSS.selectedCell]: this.parentRowIsSelected,
          [CSS.multipleSelectionCell]: this.selectionMode === "multiple",
          [CSS.staticCell]: staticCell,
          [CSS.lastCell]: this.lastCell && (!this.rowSpan || (this.colSpan && !!this.rowSpan)),
          [this.parentRowAlignment]:
            this.parentRowAlignment === "center" || this.parentRowAlignment === "end",
        }}
        colSpan={this.colSpan}
        onBlur={this.onContainerBlur}
        onFocus={this.onContainerFocus}
        ref={this.containerEl}
        role={this.parentRowType === "head" ? "columnheader" : "rowheader"}
        rowSpan={this.rowSpan}
        scope={scope}
        tabIndex={this.selectionCell ? 0 : staticCell ? -1 : 0}
      >
        {this.heading && <div class={CSS.heading}>{this.heading}</div>}
        {this.description && <div class={CSS.description}>{this.description}</div>}
        {this.selectionCell && this.selectionMode === "multiple" && (
          <calcite-icon
            class={{ [CSS.active]: indeterminate || checked }}
            icon={selectionIcon}
            scale={getIconScale(this.scale)}
          />
        )}
        {(this.selectionCell || this.numberCell) && (
          <span ariaLive={this.focused ? "polite" : "off"} class={CSS.assistiveText}>
            {this.screenReaderText}
          </span>
        )}
      </th>
    );
  }

  // #endregion
}
