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
import { TableLayout, TableRowFocusEvent } from "./interfaces";
import { CSS, SLOTS } from "./resources";
import { TableMessages } from "./assets/table/t9n";
import { getUserAgentString } from "../../utils/browser";

/**
 * @slot - A slot for adding `calcite-table-row` elements containing `calcite-table-cell` and/or `calcite-table-header` elements.
 * @slot table-header - A slot for adding `calcite-table-row` elements containing `calcite-table-header` elements.
 * @slot table-footer - A slot for adding `calcite-table-row` elements containing `calcite-table-cell` and/or `calcite-table-header` elements.
 * @slot selection-actions - A slot for adding a `calcite-action-bar` or other elements to display when `selectionMode` is not `"none"`.
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

  /** When `true`, displays borders in the component. */
  @Prop({ reflect: true }) bordered = false;

  /** Specifies an accessible title for the component. */
  @Prop() caption!: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @Prop({ reflect: true }) groupSeparator = false;

  /** Specifies the layout of the component. */
  @Prop({ reflect: true }) layout: TableLayout = "auto";

  /** When `true`, displays the position of the row in numeric form. */
  @Prop({ reflect: true }) numbered = false;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @Prop({ reflect: true }) numberingSystem?: NumberingSystem;

  /** Specifies the page size of the component. When `true`, renders `calcite-pagination` */
  @Prop({ reflect: true }) pageSize = 0;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the selection mode of the component. */
  @Prop({ reflect: true }) selectionMode: Extract<"none" | "multiple" | "single", SelectionMode> =
    "none";

  /**
   * When `true`, displays striped styling in the component.
   *
   * @deprecated Use the `striped` property instead.
   */
  @Prop({ reflect: true }) zebra = false;

  /** When `true`, displays striped styling in the component. */
  @Prop({ reflect: true }) striped = false;

  @Watch("groupSeparator")
  @Watch("numbered")
  @Watch("numberingSystem")
  @Watch("pageSize")
  @Watch("scale")
  @Watch("selectionMode")
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

  @State() pageStartRow = 1;

  @State() selectedCount = 0;

  /* Workaround for Safari https://bugs.webkit.org/show_bug.cgi?id=258430 https://bugs.webkit.org/show_bug.cgi?id=239478 */
  // ⚠️ browser-sniffing is not a best practice and should be avoided ⚠️
  @State() readCellContentsToAT: boolean;

  @State() defaultMessages: TableMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  private allRows: HTMLCalciteTableRowElement[];

  private bodyRows: HTMLCalciteTableRowElement[];

  private headRows: HTMLCalciteTableRowElement[];

  private footRows: HTMLCalciteTableRowElement[];

  private paginationEl: HTMLCalcitePaginationElement;

  private tableBodySlotEl: HTMLSlotElement;

  private tableHeadSlotEl: HTMLSlotElement;

  private tableFootSlotEl: HTMLSlotElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
    this.readCellContentsToAT = /safari/i.test(getUserAgentString());
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

  /** Emits when the component's selected rows change. */
  @Event({ cancelable: false }) calciteTableSelect: EventEmitter<void>;

  /** Emits when the component's page selection changes. */
  @Event({ cancelable: false }) calciteTablePageChange: EventEmitter<void>;

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
    const lastCell = event["detail"].lastCell;

    const visibleBody = this.bodyRows?.filter((row) => !row.hidden);
    const visibleAll = this.allRows?.filter((row) => !row.hidden);

    const lastHeadRow = this.headRows[this.headRows.length - 1]?.positionAll;
    const firstBodyRow = visibleBody[0]?.positionAll;
    const lastBodyRow = visibleBody[visibleBody.length - 1]?.positionAll;
    const firstFootRow = this.footRows[0]?.positionAll;
    const lastTableRow = visibleAll[visibleAll.length - 1]?.positionAll;

    const leavingHeader = destination === "next" && rowPos === lastHeadRow;
    const leavingFooter = destination === "previous" && rowPos === firstFootRow;
    const enteringHeader = destination === "previous" && rowPos === firstBodyRow;
    const enteringFooter = destination === "next" && rowPos === lastBodyRow;

    let rowPosition: number;

    switch (destination) {
      case "first":
        rowPosition = 0;
        break;
      case "last":
        rowPosition = lastTableRow;
        break;
      case "next":
        rowPosition = leavingHeader ? firstBodyRow : enteringFooter ? firstFootRow : rowPos + 1;
        break;
      case "previous":
        rowPosition = leavingFooter ? lastBodyRow : enteringHeader ? lastHeadRow : rowPos - 1;
        break;
    }

    const destinationCount = this.allRows?.find(
      (row) => row.positionAll === rowPosition
    )?.cellCount;

    const adjustedPos = cellPosition > destinationCount ? destinationCount : cellPosition;

    if (rowPosition !== undefined) {
      this.calciteInternalTableRowFocusChange.emit({
        cellPosition: adjustedPos,
        rowPosition,
        destination,
        lastCell,
      });
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private getSlottedRows = (el: HTMLSlotElement): HTMLCalciteTableRowElement[] => {
    return el
      ?.assignedElements({ flatten: true })
      ?.filter((el) => el?.matches("calcite-table-row")) as HTMLCalciteTableRowElement[];
  };

  private updateRows = (): void => {
    const headRows = this.getSlottedRows(this.tableHeadSlotEl) || [];
    const bodyRows = this.getSlottedRows(this.tableBodySlotEl) || [];
    const footRows = this.getSlottedRows(this.tableFootSlotEl) || [];
    const allRows = [...headRows, ...bodyRows, ...footRows];

    headRows?.forEach((row) => {
      const position = headRows?.indexOf(row);
      row.rowType = "head";
      row.positionSection = position;
      row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
    });

    bodyRows?.forEach((row) => {
      const position = bodyRows?.indexOf(row);
      row.rowType = "body";
      row.positionSection = position;
      row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
    });

    footRows?.forEach((row) => {
      const position = footRows?.indexOf(row);
      row.rowType = "foot";
      row.positionSection = position;
      row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
    });

    allRows?.forEach((row) => {
      row.selectionMode = this.selectionMode;
      row.bodyRowCount = bodyRows?.length;
      row.positionAll = allRows?.indexOf(row);
      row.numbered = this.numbered;
      row.scale = this.scale;
      row.readCellContentsToAT = this.readCellContentsToAT;
    });

    const colCount =
      headRows[0]?.cellCount || headRows[0]?.querySelectorAll("calcite-table-header")?.length;

    this.colCount = colCount;
    this.headRows = headRows;
    this.bodyRows = bodyRows;
    this.footRows = footRows;
    this.allRows = allRows;

    this.updateSelectedItems();
    this.paginateRows();
  };

  private handlePaginationChange = (): void => {
    const requestedItem = this.paginationEl?.startItem;
    this.pageStartRow = requestedItem || 1;
    this.calciteTablePageChange.emit();
    this.updateRows();
  };

  private paginateRows = (): void => {
    this.bodyRows?.forEach((row) => {
      const rowPos = row.positionSection + 1;
      const inView = rowPos >= this.pageStartRow && rowPos < this.pageStartRow + this.pageSize;
      row.hidden = this.pageSize > 0 && !inView && !this.footRows.includes(row);
    });
  };

  private updateSelectedItems = (emit?: boolean): void => {
    const selectedItems = this.bodyRows?.filter((el) => el.selected);
    this.selectedItems = selectedItems;
    this.selectedCount = selectedItems?.length;
    this.allRows?.forEach((row) => {
      row.selectedRowCount = this.selectedCount;
      row.selectedRowCountLocalized = this.localizeNumber(this.selectedCount);
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
    this.bodyRows?.forEach((el) => {
      if (elToMatch?.rowType === "head") {
        el.selected = this.selectedCount !== this.bodyRows?.length;
      } else {
        el.selected =
          elToMatch === el ? !el.selected : this.selectionMode === "multiple" ? el.selected : false;
      }
    });
    this.updateSelectedItems(true);
  };

  private localizeNumber = (value: number | string): string => {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    return numberStringFormatter.localize(value.toString());
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderSelectionArea(): VNode {
    const outOfViewCount = this.selectedItems?.filter((el) => el.hidden)?.length;
    const localizedOutOfView = this.localizeNumber(outOfViewCount?.toString());
    const localizedSelectedCount = this.localizeNumber(this.selectedCount?.toString());
    const selectionText = `${localizedSelectedCount} ${this.messages.selected}`;
    const outOfView = `${localizedOutOfView} ${this.messages.hiddenSelected}`;

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
          <calcite-chip icon="hide-empty" scale={this.scale} title={outOfView} value={outOfView}>
            {localizedOutOfView}
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
          <slot name={SLOTS.selectionActions} />
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
          onCalcitePaginationChange={this.handlePaginationChange}
          pageSize={this.pageSize}
          scale={this.scale}
          startItem={1}
          totalItems={this.bodyRows?.length}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(el) => (this.paginationEl = el)}
        />
      </div>
    );
  }

  renderTHead(): VNode {
    return (
      <thead>
        <slot
          name={SLOTS.tableHeader}
          onSlotchange={this.updateRows}
          ref={(el) => (this.tableHeadSlotEl = el as HTMLSlotElement)}
        />
      </thead>
    );
  }

  renderTBody(): VNode {
    return (
      <tbody>
        <slot
          onSlotchange={this.updateRows}
          ref={(el) => (this.tableBodySlotEl = el as HTMLSlotElement)}
        />
      </tbody>
    );
  }

  renderTFoot(): VNode {
    return (
      <tfoot>
        <slot
          name={SLOTS.tableFooter}
          onSlotchange={this.updateRows}
          ref={(el) => (this.tableFootSlotEl = el as HTMLSlotElement)}
        />
      </tfoot>
    );
  }

  render(): VNode {
    return (
      <Host>
        <div class={CSS.container}>
          {this.selectionMode !== "none" && this.renderSelectionArea()}
          <div
            class={{
              [CSS.bordered]: this.bordered,
              [CSS.striped]: this.striped || this.zebra,
              [CSS.tableContainer]: true,
            }}
          >
            <table
              aria-colcount={this.colCount}
              aria-multiselectable={this.selectionMode === "multiple"}
              aria-readonly={true}
              aria-rowcount={this.allRows?.length}
              class={{ [CSS.tableFixed]: this.layout === "fixed" }}
              role="grid"
            >
              <caption class={CSS.assistiveText}>{this.caption}</caption>
              {this.renderTHead()}
              {this.renderTBody()}
              {this.renderTFoot()}
            </table>
          </div>
          {this.pageSize > 0 && this.renderPaginationArea()}
        </div>
      </Host>
    );
  }
}
