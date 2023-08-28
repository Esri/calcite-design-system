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
import { RowType } from "../table/interfaces";

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

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

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
  @Prop() numberCell = false;

  /** @internal */
  @Prop() parentRowPosition: number;

  /** @internal */
  @Prop() parentRowType: RowType;

  /** @internal */
  @Prop() positionInRow: number;

  /** @internal */
  @Prop() selectedRowCount: number;

  /** @internal */
  @Prop() selectedRowCountLocalized: string;

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

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  private thEl: HTMLDivElement;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.thEl.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private getScreenReaderText(): string {
    const sharedText = `${this.selectedRowCountLocalized} ${this.messages.selected}`;
    if (this.numberCell) {
      return this.messages.rowNumber;
    } else if (this.selectionMode === "single") {
      return `${this.messages.selectionColumn}. ${sharedText}`;
    } else if (this.bodyRowCount === this.selectedRowCount) {
      return `${this.messages.selectionColumn}. ${this.messages.all} ${sharedText} ${this.messages.keyboardDeselectAll}`;
    } else {
      return `${this.messages.selectionColumn}. ${sharedText} ${this.messages.keyboardSelectAll}`;
    }
  }

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

    return (
      <Host>
        <th
          aria-colindex={this.parentRowType !== "body" ? this.positionInRow : ""}
          class={{
            [CSS.bodyRow]: this.parentRowType === "body",
            [CSS.numberCell]: this.numberCell,
            [CSS.selectionCell]: this.selectionCell,
            [CSS.multipleSelectionCell]: this.selectionMode === "multiple",
          }}
          colSpan={this.colSpan}
          role="columnheader"
          rowSpan={this.rowSpan}
          scope={scope}
          tabindex={0}
          // eslint-disable-next-line react/jsx-sort-props
          ref={(el) => (this.thEl = el as HTMLDivElement)}
        >
          {this.heading && <div class={CSS.heading}>{this.heading}</div>}
          {this.description && <div class={CSS.description}>{this.description}</div>}
          {this.selectionCell && this.selectionMode === "multiple" && (
            <calcite-icon class={{ [CSS.active]: allSelected }} icon={selectionIcon} scale="s" />
          )}
          {(this.selectionCell || this.numberCell) && (
            <span aria-hidden={true} aria-live="polite" class={CSS.assistiveText}>
              {this.getScreenReaderText()}
            </span>
          )}
        </th>
      </Host>
    );
  }
}
