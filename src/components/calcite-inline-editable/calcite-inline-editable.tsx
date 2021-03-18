import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  VNode,
  Watch
} from "@stencil/core";
import { getElementProp } from "../../utils/dom";
import { Scale, Theme } from "../interfaces";
import { TEXT } from "./resources";

/**
 * @slot - slot for rendering a `<calcite-input>`
 */
@Component({
  tag: "calcite-inline-editable",
  scoped: true,
  styleUrl: "calcite-inline-editable.scss"
})
export class CalciteInlineEditable {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el!: HTMLCalciteInlineEditableElement;

  //--------------------------------------------------------------------------
  //
  //  Props
  //
  //--------------------------------------------------------------------------

  /** specify whether editing can be enabled */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledWatcher(disabled: boolean): void {
    this.inputElement.disabled = disabled;
  }

  /** specify whether the wrapped input element is editable, defaults to false */
  @Prop({ mutable: true, reflect: true }) editingEnabled = false;

  /** specify whether the confirm button should display a loading state, defaults to false */
  @Prop({ mutable: true, reflect: true }) loading = false;

  /** specify whether save/cancel controls should be displayed when editingEnabled is true, defaults to false */
  @Prop({ reflect: true }) controls = false;

  /** specify text to be user for the enable editing button's aria-label, defaults to `Click to edit` */
  @Prop({ reflect: true }) intlEnableEditing = TEXT.intlEnablingEditing;

  /** specify text to be user for the cancel editing button's aria-label, defaults to `Cancel` */
  @Prop({ reflect: true }) intlCancelEditing = TEXT.intlCancelEditing;

  /** specify text to be user for the confirm changes button's aria-label, defaults to `Save` */
  @Prop({ reflect: true }) intlConfirmChanges = TEXT.intlConfirmChanges;

  /** specify the scale of the inline-editable component, defaults to the scale of the wrapped calcite-input or the scale of the closest wrapping component with a set scale */
  @Prop({ reflect: true, mutable: true }) scale?: Scale;

  /** specify the theme of the inline-editable component, defaults to the theme of the wrapped calcite-input or the theme of the closest wrapping component with a set theme */
  @Prop({ reflect: true }) theme?: Theme;

  /** when controls, specify a callback to be executed prior to disabling editing. when provided, loading state will be handled automatically. */
  @Prop() afterConfirm?: () => Promise<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad() {
    this.inputElement = this.el.querySelector("calcite-input") as HTMLCalciteInputElement;
    this.inputElement.disabled = this.disabled;
    this.scale =
      this.scale || this.inputElement.scale || getElementProp(this.el, "scale", undefined);
  }

  componentDidLoad() {
    this.htmlInput = this.inputElement.querySelector("input");
    if (!this.editingEnabled) {
      this.htmlInput.tabIndex = -1;
    }
  }

  render(): VNode {
    return (
      <Host>
        <div
          class="calcite-inline-editable-wrapper"
          onClick={this.enableEditingHandler}
          onKeyDown={this.escapeKeyHandler}
        >
          <div class="calcite-inline-editable-input-wrapper">
            <slot />
          </div>
          <div class="calcite-inline-editable-controls-wrapper">
            {!this.editingEnabled && (
              <calcite-button
                appearance="transparent"
                aria-label={this.intlEnableEditing}
                class="calcite-inline-editable-enable-editing-button"
                color="neutral"
                disabled={this.disabled}
                iconStart="pencil"
                onClick={this.enableEditingHandler}
                ref={(el) => (this.enableEditingButton = el)}
                scale={this.scale}
                theme={this.theme}
              />
            )}
            {this.shouldShowControls && [
              <div class="calcite-inline-editable-cancel-editing-button-wrapper">
                <calcite-button
                  appearance="transparent"
                  aria-label={this.intlCancelEditing}
                  class="calcite-inline-editable-cancel-editing-button"
                  color="neutral"
                  disabled={this.disabled}
                  iconStart="x"
                  onClick={this.cancelEditingHandler}
                  scale={this.scale}
                  theme={this.theme}
                />
              </div>,
              <calcite-button
                appearance="solid"
                aria-label={this.intlConfirmChanges}
                class="calcite-inline-editable-confirm-changes-button"
                color="blue"
                disabled={this.disabled}
                iconStart="check"
                loading={this.loading}
                onClick={this.confirmChangesHandler}
                scale={this.scale}
                theme={this.theme}
              />
            ]}
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteInlineEditableEditingCancel: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteInlineEditableChangesConfirm: EventEmitter;

  /**
   * @internal
   */
  @Event() calciteInlineEditableEnableEditingChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInputBlur")
  blurHandler(): void {
    if (!this.controls) {
      this.disableEditing();
    }
  }

  @Listen("click", { target: "window" })
  handleLabelFocus(e: CustomEvent): void {
    const htmlTarget = e.target as HTMLElement;
    if (
      !(
        htmlTarget.parentElement.tagName === "LABEL" ||
        htmlTarget.parentElement.tagName === "CALCITE-LABEL"
      )
    ) {
      return;
    }
    if (!htmlTarget.parentElement.contains(this.el)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (this.editingEnabled) {
      this.inputElement.setFocus();
    } else {
      this.enableEditingButton.setFocus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State
  //
  //--------------------------------------------------------------------------

  private inputElement: HTMLCalciteInputElement;

  private htmlInput: HTMLInputElement;

  private valuePriorToEditing: string;

  private enableEditingButton: HTMLCalciteButtonElement;

  private editingFocusTimeout: number;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private get shouldShowControls(): boolean {
    return this.editingEnabled && this.controls;
  }

  private enableEditing = () => {
    this.htmlInput.tabIndex = undefined;
    this.valuePriorToEditing = this.inputElement.value;
    this.editingEnabled = true;
    this.inputElement.setFocus();
    this.calciteInlineEditableEnableEditingChange.emit();
  };

  private disableEditing = () => {
    this.htmlInput.tabIndex = -1;
    this.editingEnabled = false;
  };

  private cancelEditing = () => {
    this.inputElement.value = this.valuePriorToEditing;
    this.disableEditing();
    clearTimeout(this.editingFocusTimeout);
    this.editingFocusTimeout = window.setTimeout(() => this.enableEditingButton.setFocus(), 100);
    this.calciteInlineEditableEditingCancel.emit();
  };

  private escapeKeyHandler = async (e: KeyboardEvent) => {
    if (e.key !== "Escape") {
      return;
    }
    this.cancelEditing();
  };

  private cancelEditingHandler = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.cancelEditing();
  };

  private enableEditingHandler = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) {
      return;
    }
    if (!this.editingEnabled) {
      this.enableEditing();
    }
  };

  private confirmChangesHandler = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.calciteInlineEditableChangesConfirm.emit();
    try {
      if (this.afterConfirm) {
        this.loading = true;
        await this.afterConfirm();
        this.disableEditing();
      }
    } catch (e) {
    } finally {
      this.loading = false;
    }
  };
}
