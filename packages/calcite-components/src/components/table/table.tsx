import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { Scale, SelectionMode } from "../interfaces";
import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  numberStringFormatter,
  NumberingSystem,
} from "../../utils/locale";
import { TableAppearance, TableLayout, TableRowFocusEvent } from "./interfaces";
import { CSS } from "./resources";
import { TableMessages } from "./assets/table/t9n";

/**
 * @slot - A slot for adding `calcite-table-row` or nested `calcite-table` elements. Content placed here will be rendered in a `table-body` tag.
 * @slot table-head- A slot for adding `calcite-table-row` and nested `calcite-table-header` elements.
 * @slot table-foot- A slot for adding `calcite-table-row` and nested `calcite-table-header` elements.
 * @slot selection-actions - A slot for adding a `calcite-action` or other element to display when `selectionMode !== "none"` and `calcite-table-row` are selected.
 */

@Component({
  tag: "calcite-table",
  styleUrl: "table.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Table implements LocalizedComponent, LoadableComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance of the component. */
  @Prop({ reflect: true }) appearance: TableAppearance = "simple";

  /** Specifies an accessible title for the component. */
  @Prop() caption!: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @Prop({ reflect: true }) groupSeparator = false;

  /** Specifies the layout of the component. */
  @Prop({ reflect: true }) layout: TableLayout = "auto";

  /** When `true`, displays the position of the row in numeric form */
  @Prop({ reflect: true }) numbered = false;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @Prop({ reflect: true }) numberingSystem?: NumberingSystem;

  /** Specifies the page size of the component. When true, renders pagination. */
  @Prop({ reflect: true }) pageSize = 0;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the selection mode of the component. */
  @Prop({ reflect: true }) selectionMode: Extract<"none" | "multiple" | "single", SelectionMode> =
    "none";

  @Watch("pageSize")
  @Watch("numbered")
  @Watch("selectionMode")
  @Watch("numberingSystem")
  @Watch("groupSeparator")
  handleNumberedChange(): void {
    this.updateRows();
  }

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteTableRowElement[] = [];

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TableMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TableMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTableElement;

  @State() colCount = 0;

  @State() currentPageStartRow = 1;

  @State() firstRowInPage = 1;

  @State() lastRowInPage: number;

  @State() selectedCount = 0;

  @State() defaultMessages: TableMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  private allRows: HTMLCalciteTableRowElement[];

  private bodyRows: HTMLCalciteTableRowElement[];

  private headRows: HTMLCalciteTableRowElement[];

  private tableBodySlotEl: HTMLSlotElement;

  private tableHeadSlotEl: HTMLSlotElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
    this.updateRows();
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emits when the component's selection changes. */
  @Event({ cancelable: false }) calciteTableSelect: EventEmitter<void>;

  /** @internal */
  @Event({ cancelable: false })
  calciteInternalTableRowFocusChange: EventEmitter<TableRowFocusEvent>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteTableRowSelect")
  calciteChipSelectListener(event: CustomEvent): void {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(event.target as HTMLCalciteTableRowElement);
    }
  }

  @Listen("calciteInternalTableRowFocusRequest")
  calciteInternalTableRowFocusEvent(event: TableRowFocusEvent): void {
    const cellPosition = event["detail"].cellPosition;
    const rowPos = event["detail"].rowPosition;
    const destination = event["detail"].destination;
    const fromHeader = event["detail"].fromHeader;

    const lastHeadTr =
      this.headRows?.length > 0 ? this.headRows[this.headRows.length - 1].positionWithinAll : 0;

    let rowPosition: number;
    switch (destination) {
      case "first":
        rowPosition = 0;
        break;
      case "last":
        rowPosition = this.lastRowInPage;
        break;
      case "next":
        rowPosition = fromHeader && !lastHeadTr ? this.firstRowInPage : rowPos + 1;
        break;
      case "previous":
        const toEnd = !lastHeadTr && (fromHeader || rowPos <= this.firstRowInPage);
        rowPosition = toEnd ? lastHeadTr : rowPos - 1;
        break;
    }
    this.calciteInternalTableRowFocusChange.emit({
      cellPosition,
      rowPosition,
      destination,
      fromHeader,
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private updateRows = (): void => {
    const headRows = this.tableHeadSlotEl
      ?.assignedElements({ flatten: true })
      ?.filter((el) => el?.matches("calcite-table-row")) as HTMLCalciteTableRowElement[];

    const bodyRows = this.tableBodySlotEl
      ?.assignedElements({ flatten: true })
      ?.filter((el) => el?.matches("calcite-table-row")) as HTMLCalciteTableRowElement[];

    const allRows = headRows?.length > 0 ? [...headRows, ...bodyRows] : bodyRows || [];

    headRows?.forEach((row) => {
      row.tableHeadRow = true;
      row.selectionMode = this.selectionMode;
      row.numberingSystem = this.numberingSystem;
      row.totalRowCount = this.bodyRows?.length;
      row.groupSeparator = this.groupSeparator;
      row.numbered = this.numbered;
      row.position = headRows?.indexOf(row);
      row.positionWithinAll = allRows?.indexOf(row);
    });

    bodyRows?.forEach((row) => {
      row.selectionMode = this.selectionMode;
      row.numberingSystem = this.numberingSystem;
      row.totalRowCount = this.bodyRows?.length;
      row.groupSeparator = this.groupSeparator;
      row.numbered = this.numbered;
      row.position = bodyRows?.indexOf(row);
      row.positionWithinAll = allRows?.indexOf(row);
    });

    this.headRows = headRows;
    this.bodyRows = bodyRows;
    this.allRows = allRows;

    const colCount =
      this.headRows?.length > 0
        ? this.headRows[0]?.querySelectorAll("calcite-table-header")?.length
        : 0;
    this.colCount = colCount;
    this.updateSelectedItems();
    this.paginateRows();
  };

  private handlePaginationChange = (event: CustomEvent): void => {
    const requestedItem = (event.target as HTMLCalcitePaginationElement).startItem;
    this.currentPageStartRow = requestedItem || 1;
    this.updateRows();
  };

  private paginateRows = (): void => {
    this.bodyRows?.forEach((row) => {
      const inView =
        row.position >= this.currentPageStartRow &&
        row.position < this.currentPageStartRow + this.pageSize;
      row.style.display = this.pageSize === 0 || inView ? "contents" : "none";
      row.hidden = this.pageSize === 0 || inView;
    });

    const visibleRows = this.allRows?.filter((row) => row.hidden);
    const firstVisibleRow = visibleRows[0]?.positionWithinAll || 1;
    const lastVisibleRow = visibleRows[visibleRows?.length - 1]?.positionWithinAll;

    this.firstRowInPage = firstVisibleRow;
    this.lastRowInPage = lastVisibleRow;
  };

  private updateSelectedItems = (emit?: boolean): void => {
    const selectedItems = this.bodyRows?.filter((el) => el.selected);
    this.selectedItems = selectedItems;
    this.selectedCount = selectedItems?.length;
    this.allRows?.forEach((row) => {
      row.selectedRowCount = this.selectedCount;
    });

    if (emit) {
      this.calciteTableSelect.emit();
    }
  };

  private handleDeselectAllRows = (): void => {
    this.bodyRows?.forEach((row) => {
      row.selected = false;
    });
    this.updateSelectedItems(true);
  };

  private setSelectedItems = (elToMatch?: HTMLCalciteTableRowElement): void => {
    if (elToMatch?.tableHeadRow) {
      this.bodyRows?.forEach((el) => (el.selected = this.selectedCount !== this.bodyRows?.length));
    } else if (elToMatch) {
      this.bodyRows?.forEach((el) => {
        const matchingEl = elToMatch === el;
        switch (this.selectionMode) {
          case "multiple":
            if (matchingEl) {
              el.selected = !el.selected;
            }
            break;
          case "single":
            el.selected = matchingEl ? !el.selected : false;
            break;
        }
      });
    }
    this.updateSelectedItems(true);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderSelectionArea(): VNode {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    const outOfViewCount = this.selectedItems?.filter((el) => !el.hidden)?.length;
    const localizedOutOfViewCount = numberStringFormatter.localize(outOfViewCount?.toString());
    const localizedSelectedCount = numberStringFormatter.localize(this.selectedCount?.toString());
    const selectionText = `${localizedSelectedCount} ${this.messages.selected}`;
    const outOfViewText = `${localizedOutOfViewCount} ${this.messages.hiddenSelected}`;

    return (
      <div class={CSS.selectionArea}>
        <calcite-chip
          kind={this.selectedCount > 0 ? "brand" : "neutral"}
          scale={this.scale}
          value={selectionText}
        >
          {selectionText}
        </calcite-chip>
        {outOfViewCount > 0 && (
          <calcite-chip
            icon="hide-empty"
            scale={this.scale}
            title={outOfViewText}
            value={outOfViewText}
          >
            {localizedOutOfViewCount}
          </calcite-chip>
        )}
        {this.selectedCount > 0 && (
          <calcite-button
            icon-start="x"
            kind="neutral"
            onClick={this.handleDeselectAllRows}
            round
            scale={this.scale}
            title={`${this.messages.clear} ${selectionText} ${this.messages.row}`}
          >
            {this.messages.clear}
          </calcite-button>
        )}
        <div class={CSS.selectionActions}>
          <slot name="selection-actions" />
        </div>
      </div>
    );
  }

  renderPaginationArea(): VNode {
    return (
      <div class={CSS.paginationArea}>
        <calcite-pagination
          groupSeparator={this.groupSeparator}
          numberingSystem={this.numberingSystem}
          onCalcitePaginationChange={(event) => this.handlePaginationChange(event)}
          pageSize={this.pageSize}
          scale={this.scale}
          startItem={1}
          totalItems={this.bodyRows?.length}
        />
      </div>
    );
  }

  renderTHead(): VNode {
    return (
      <thead role="rowgroup">
        <slot
          name="table-head"
          onSlotchange={this.updateRows}
          ref={(el) => (this.tableHeadSlotEl = el as HTMLSlotElement)}
        />
      </thead>
    );
  }

  renderTBody(): VNode {
    return (
      <tbody role="rowgroup">
        <slot
          onSlotchange={this.updateRows}
          ref={(el) => (this.tableBodySlotEl = el as HTMLSlotElement)}
        />
      </tbody>
    );
  }

  render(): VNode {
    return (
      <Host>
        <div class={CSS.container}>
          {this.selectionMode !== "none" && this.renderSelectionArea()}
          <div class={CSS.tableContainer} role="region" tabIndex={-1}>
            <table
              aria-colcount={this.colCount}
              aria-multiselectable={this.selectionMode === "multiple"}
              aria-rowcount={this.bodyRows?.length}
              class={{ [this.appearance]: true, [CSS.tableFixed]: this.layout === "fixed" }}
              role="grid"
              tabIndex={0}
            >
              {this.renderTHead()}
              {this.renderTBody()}
              <caption class={CSS.assistiveText}>{this.caption}</caption>
            </table>
          </div>
          {this.pageSize > 0 && this.renderPaginationArea()}
        </div>
      </Host>
    );
  }
}
