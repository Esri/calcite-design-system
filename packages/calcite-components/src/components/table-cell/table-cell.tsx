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
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
} from "../../utils/locale";
import { TableCellMessages } from "./assets/table-cell/t9n";
import { CSS } from "./resources";

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

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Provide a value to the component - used for accessible technology and column sorting */
  @Prop() value: string;

  /**
   * @internal
   */
  @Prop() position: number;

  /**
   * @internal
   */
  @Prop() selectionCell: boolean;

  /**
   * @internal
   */
  @Prop() selectionMode: SelectionMode;

  /**
   * @internal
   */
  @Prop() numberCell: boolean;

  /**
   * @internal
   */
  @Prop() parentRowIsSelected: boolean;

  /**
   * @internal
   */
  @Prop() parentRowPosition: number;

  /**
   * @internal
   */
  @Prop() parentRowPositionLocalized: string;

  /**
   * @internal
   */
  @Prop() totalRowCount: number;

  /**
   * @internal
   */
  @Prop() selectedRowCount: number;

  /**
   * @internal
   */
  @Prop() numberingSystem: NumberingSystem;

  /**
   * @internal
   */
  @Prop() groupSeparator: boolean;

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

  @State() defaultMessages: TableCellMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  private focusableEl: HTMLDivElement;

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

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.focusableEl.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private getScreenReaderText(): string {
    const selectedText = `${this.messages.row} ${this.parentRowPositionLocalized} ${this.messages.selected} ${this.messages.keyboardDeselect}`;
    const unselectedText = `${this.messages.row} ${this.parentRowPositionLocalized} ${this.messages.unselected} ${this.messages.keyboardSelect}`;
    return this.parentRowIsSelected ? selectedText : unselectedText;
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <td
          class={{
            [CSS.numberCell]: this.numberCell,
            [CSS.selectionCell]: this.selectionCell,
            [CSS.selectedCell]: this.parentRowIsSelected,
          }}
          colSpan={this.colSpan}
          role="gridcell"
          rowSpan={this.rowSpan}
          tabIndex={0}
          // eslint-disable-next-line react/jsx-sort-props
          ref={(el) => (this.focusableEl = el as HTMLDivElement)}
        >
          {this.selectionCell && (
            <span aria-hidden={true} aria-live="polite" class={CSS.assistiveText}>
              {this.getScreenReaderText()}
            </span>
          )}
          <slot />
        </td>
      </Host>
    );
  }
}
