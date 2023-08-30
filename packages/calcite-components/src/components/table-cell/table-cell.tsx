import { Component, Element, h, Host, Method, Prop, State, VNode, Watch } from "@stencil/core";
import { Alignment, Scale } from "../interfaces";
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
import { TableCellMessages } from "./assets/table-cell/t9n";
import { CSS } from "./resources";
import { RowType } from "../table/interfaces";

/**
 * @slot - A slot for adding content, usually text content.
 */
@Component({
  tag: "calcite-table-cell",
  styleUrl: "table-cell.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class TableCell implements LocalizedComponent, LoadableComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the alignment of the component. */
  @Prop({ reflect: true }) alignment: Alignment = "start";

  /** Specifies the number of columns the component should span. */
  @Prop({ reflect: true }) colSpan: number;

  /** Specifies the number of rows the component should span. */
  @Prop({ reflect: true }) rowSpan: number;

  /** @internal */
  @Prop() disabled: boolean;

  /** @internal */
  @Prop() numberCell: boolean;

  /** @internal */
  @Prop() parentRowIsSelected: boolean;

  /** @internal */
  @Prop() parentRowPositionLocalized: string;

  /** @internal */
  @Prop() parentRowType: RowType;

  /** @internal */
  @Prop() positionInRow: number;

  /** @internal */
  @Prop() readCellContentsToAT: boolean;

  /** @internal */
  @Prop() scale: Scale = "m";

  /** @internal */
  @Prop() selectionCell: boolean;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TableCellMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TableCellMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------
  @Element() el: HTMLCalciteTableCellElement;

  @State() contentsText = "";

  @State() defaultMessages: TableCellMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  private containerEl: HTMLTableCellElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
    await this.updateScreenReaderContentsText;
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

  private updateScreenReaderSelectionText(): string {
    const selectedText = `${this.messages.row} ${this.parentRowPositionLocalized} ${this.messages.selected} ${this.messages.keyboardDeselect}`;
    const unselectedText = `${this.messages.row} ${this.parentRowPositionLocalized} ${this.messages.unselected} ${this.messages.keyboardSelect}`;
    return this.parentRowIsSelected ? selectedText : unselectedText;
  }

  private updateScreenReaderContentsText = (): void => {
    this.contentsText = this.el.textContent;
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <td
          aria-disabled={this.disabled}
          class={{
            [CSS.footerCell]: this.parentRowType === "foot",
            [CSS.numberCell]: this.numberCell,
            [CSS.selectionCell]: this.selectionCell,
            [CSS.selectedCell]: this.parentRowIsSelected,
          }}
          colSpan={this.colSpan}
          role="gridcell"
          rowSpan={this.rowSpan}
          tabIndex={this.disabled ? -1 : 0}
          // eslint-disable-next-line react/jsx-sort-props
          ref={(el) => (this.containerEl = el)}
        >
          {(this.selectionCell || this.readCellContentsToAT) && (
            <span aria-hidden={true} aria-live="polite" class={CSS.assistiveText}>
              {this.selectionCell && this.updateScreenReaderSelectionText()}
              {this.readCellContentsToAT && !this.selectionCell && this.contentsText}
            </span>
          )}
          <slot onSlotchange={this.updateScreenReaderContentsText} />
        </td>
      </Host>
    );
  }
}
