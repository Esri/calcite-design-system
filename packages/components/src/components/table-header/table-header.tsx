import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
import { LitElement, property, h, method, state, JsxNode } from "@arcgis/lumina";
import { Alignment, Scale, SelectionMode } from "../types";
import { RowType, TableInteractionMode } from "../table/types";
import { getIconScale } from "../../utils/component";
import { CSS_UTILITY } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import { useFocusable } from "../../controllers/useFocusable";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS } from "./resources";
import { styles } from "./table-header.scss";
import { styles as screenReaderStyles } from "../../styles/component/screen-reader.scss";

declare global {
  interface DeclareElements {
    "calcite-table-header": TableHeader;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     *
     * @deprecated in v3.3.0, removal target v6.0.0 - Use `--calcite-table-header-background-color` instead.
     * @public
     */
    "--calcite-table-header-background": "*";
    /**
     * Specifies the component's background color.
     *
     * @public
     */
    "--calcite-table-header-background-color": "*";
    /**
     * Specifies the component's border color.
     *
     * @public
     */
    "--calcite-table-header-border-color": "*";
    /**
     * Specifies the component's `heading` text color.
     *
     * @public
     */
    "--calcite-table-header-heading-text-color": "*";
    /**
     * Specifies the component's `description` text color.
     *
     * @public
     */
    "--calcite-table-header-description-text-color": "*";
  }
}

/**
 * @public
 * @docGroup Table
 * @parent calcite-table
 */
export class TableHeader extends LitElement {
  //#region Static Members

  static override styles = [styles, screenReaderStyles];

  //#endregion

  //#region Private Properties

  private containerRef = createRef<HTMLTableCellElement>();

  /**
   * Made into a prop for testing purposes only
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private focusSetter = useFocusable<this>()(this);

  //#endregion

  //#region State Properties

  @state() focused = false;

  @state() screenReaderText = "";

  //#endregion

  //#region Public Properties

  /**
   * Specifies the alignment of the component.
   *
   * @public
   */
  @property({ reflect: true }) alignment: Alignment = "start";

  /** @internal */
  @property() bodyRowCount!: number;

  /**
   * Specifies the number of columns the component should span.
   *
   * @public
   */
  @property({ reflect: true }) colSpan?: number;

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) description?: string;

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) heading?: string;

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
  @property() parentRowAlignment: Alignment = "start";

  /** @internal */
  @property() parentRowIsSelected = false;

  /** @internal */
  @property() parentRowType!: RowType;

  /** @internal */
  @property() positionInRow!: number;

  /**
   * Specifies the number of rows the component should span.
   *
   * @public
   */
  @property({ reflect: true }) rowSpan?: number;

  /** @internal */
  @property() scale!: Scale;

  /** @internal */
  @property() selectedRowCount!: number;

  /** @internal */
  @property() selectedRowCountLocalized!: string;

  /** @internal */
  @property() selectionCell = false;

  /** @internal */
  @property() selectionMode!: SelectionMode;

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
    this.updateScreenReaderText();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("selectedRowCount") || changes.has("selectedRowCountLocalized")) {
      this.updateScreenReaderText();
    }
  }

  //#endregion

  //#region Private Methods

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

  //#endregion

  //#region Rendering

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
        ref={this.containerRef}
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
          <span ariaLive={this.focused ? "polite" : "off"} class={CSS_UTILITY.screenReaderText}>
            {this.screenReaderText}
          </span>
        )}
      </th>
    );
  }

  //#endregion
}
