import { Component, Element, h, Host, Method, Prop, State, VNode, Watch } from "@stencil/core";
import {
  componentFocusable,
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
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { Alignment, Scale, SelectionMode } from "../interfaces";
import { TableHeaderMessages } from "./assets/table-header/t9n";
import { CSS } from "./resources";
import { RowType, TableInteractionMode } from "../table/interfaces";
import { getIconScale } from "../../utils/component";

@Component({
  tag: "calcite-table-header",
  styleUrl: "table-header.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class TableHeader implements LocalizedComponent, LoadableComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the alignment of the component. */
  @Prop({ reflect: true }) alignment: Alignment = "start";

  /** Specifies the number of columns the component should span. */
  @Prop({ reflect: true }) colSpan: number;

  /** A description to display beneath heading content. */
  @Prop({ reflect: true }) description: string;

  /** A heading to display above description content. */
  @Prop({ reflect: true }) heading: string;

  /** Specifies the number of rows the component should span. */
  @Prop({ reflect: true }) rowSpan: number;

  /** @internal */
  @Prop() interactionMode: TableInteractionMode = "interactive";

  /** @internal */
  @Prop() lastCell: boolean;

  /** @internal */
  @Prop() numberCell = false;

  /** @internal */
  @Prop() parentRowIsSelected: boolean;

  /** @internal */
  @Prop() parentRowType: RowType;

  /** @internal */
  @Prop() positionInRow: number;

  /** @internal */
  @Prop() scale: Scale;

  /** @internal */
  @Prop() selectedRowCount: number;

  /** @internal */
  @Prop() selectedRowCountLocalized: string;

  @Watch("selectedRowCount")
  @Watch("selectedRowCountLocalized")
  onSelectedChange(): void {
    this.updateScreenReaderText();
  }

  /** @internal */
  @Prop() selectionCell = false;

  /** @internal */
  @Prop() selectionMode: SelectionMode;

  /** @internal */
  @Prop() bodyRowCount: number;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TableHeaderMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TableHeaderMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
    this.updateScreenReaderText();
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

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------
  @Element() el: HTMLCalciteTableHeaderElement;

  @State() defaultMessages: TableHeaderMessages;

  @State() focused = false;

  @State() screenReaderText = "";

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  private containerEl: HTMLTableCellElement;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.containerEl.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

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

  private onContainerBlur = (): void => {
    this.focused = false;
  };

  private onContainerFocus = (): void => {
    this.focused = true;
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const scope = this.rowSpan
      ? "rowgroup"
      : this.colSpan
        ? "colgroup"
        : this.parentRowType === "body"
          ? "row"
          : "col";

    const allSelected = this.selectedRowCount === this.bodyRowCount;
    const selectionIcon = allSelected ? "check-square-f" : "check-square";
    const staticCell = this.interactionMode === "static" && !this.selectionCell;
    return (
      <Host>
        <th
          aria-colindex={this.parentRowType === "head" ? this.positionInRow : undefined}
          class={{
            [CSS.bodyRow]: this.parentRowType === "body",
            [CSS.footerRow]: this.parentRowType === "foot",
            [CSS.numberCell]: this.numberCell,
            [CSS.selectionCell]: this.selectionCell,
            [CSS.selectedCell]: this.parentRowIsSelected,
            [CSS.multipleSelectionCell]: this.selectionMode === "multiple",
            [CSS.staticCell]: staticCell,
            [CSS.lastCell]: this.lastCell && (!this.rowSpan || (this.colSpan && !!this.rowSpan)),
          }}
          colSpan={this.colSpan}
          onBlur={this.onContainerBlur}
          onFocus={this.onContainerFocus}
          role={this.parentRowType === "head" ? "columnheader" : "rowheader"}
          rowSpan={this.rowSpan}
          scope={scope}
          tabIndex={this.selectionCell ? 0 : staticCell ? -1 : 0}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(el) => (this.containerEl = el)}
        >
          {this.heading && <div class={CSS.heading}>{this.heading}</div>}
          {this.description && <div class={CSS.description}>{this.description}</div>}
          {this.selectionCell && this.selectionMode === "multiple" && (
            <calcite-icon
              class={{ [CSS.active]: allSelected }}
              icon={selectionIcon}
              scale={getIconScale(this.scale)}
            />
          )}
          <span
            aria-hidden={true}
            aria-live={this.focused ? "polite" : "off"}
            class={CSS.assistiveText}
          >
            {(this.selectionCell || this.numberCell) && this.screenReaderText}
          </span>
        </th>
      </Host>
    );
  }
}
