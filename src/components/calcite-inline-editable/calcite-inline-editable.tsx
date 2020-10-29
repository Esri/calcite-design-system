import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  VNode
} from "@stencil/core";
import { getElementProp } from "../../utils/dom";
import { TEXT } from "./resources";

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

  /** specify whether the wrapped input element is editable, defaults to false */
  @Prop({ mutable: true, reflect: true }) editingEnabled = false;

  /** specify whether the confirm button should display a loading state, defaults to false */
  @Prop({ mutable: true, reflect: true }) loading = false;

  /** specify whether save/cancel controls should be displayed when editingEnabled is true, defaults to false */
  @Prop({ reflect: true }) hasControls = false;

  /** specify text to be user for the enable editing button's aria-label, defaults to `Click to edit` */
  @Prop({ reflect: true }) intlEnableEditing = TEXT.intlEnablingEditing;

  /** specify text to be user for the cancel editing button's aria-label, defaults to `Cancel` */
  @Prop({ reflect: true }) intlCancelEditing = TEXT.intlCancelEditing;

  /** specify text to be user for the confirm changes button's aria-label, defaults to `Save` */
  @Prop({ reflect: true }) intlConfirmChanges = TEXT.intlConfirmChanges;

  /** specify the scale of the inline-editable component, defaults to the scale of the wrapped calcite-input or the scale of the closest wrapping component with a set scale */
  @Prop({ reflect: true }) scale?: "s" | "m" | "l";

  /** specify the scale of the inline-editable component, defaults to the scale of the wrapped calcite-input or the theme of the closest wrapping component with a set theme */
  @Prop({ reflect: true }) theme?: "light" | "dark";

  @Prop() onConfirmChanges: () => Promise<any>;

  //--------------------------------------------------------------------------
  //
  //  Getters/Setters
  //
  //--------------------------------------------------------------------------

  get shouldShowControls(): boolean {
    return this.editingEnabled && this.hasControls;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad() {
    this.inputElement = this.el.querySelector("calcite-input") as HTMLCalciteInputElement;
    this.inputElement.tabIndex = -1;
    this.scale =
      this.scale || this.inputElement.scale || getElementProp(this.el, "scale", undefined);
    this.theme =
      this.theme || this.inputElement.theme || getElementProp(this.el, "theme", undefined);
  }

  componentDidLoad() {
    this.htmlInput = this.inputElement.querySelector("input");
    if (!this.editingEnabled) this.htmlInput.tabIndex = -1;
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
                class="calcite-input-enable-editing-button"
                color="dark"
                disabled={this.inputElement.disabled}
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
                  color="dark"
                  disabled={this.inputElement.disabled}
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
                disabled={this.inputElement.disabled}
                iconStart="check"
                loading={this.loading}
                onClick={this.confirmChangesChangesHandler}
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

  @Event() calciteInlineEditableCancelEditing: EventEmitter;

  @Event() calciteInlineEditableConfirmChanges: EventEmitter;

  @Event() calciteInlineEditableEnableEditing: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInputBlur")
  blurHandler(): void {
    if (!this.hasControls) this.disableEditing();
  }

  @Listen("click", { target: "window" })
  handleLabelFocus(e: CustomEvent): void {
    const HTMLTarget = e.target as HTMLElement;
    if (!HTMLTarget.classList.contains("calcite-label-text")) return;
    if (!HTMLTarget.parentElement.contains(this.el)) return;
    e.preventDefault();
    e.stopPropagation();
    this.enableEditingButton.setFocus();
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private enableEditing = () => {
    this.htmlInput.tabIndex = undefined;
    this.valuePriorToEditing = this.inputElement.value;
    this.editingEnabled = true;
    this.inputElement.setFocus();
    this.calciteInlineEditableEnableEditing.emit();
  };

  private disableEditing = () => {
    this.htmlInput.tabIndex = -1;
    this.editingEnabled = false;
  };

  private cancelEditing = () => {
    this.inputElement.value = this.valuePriorToEditing;
    this.disableEditing();
    setTimeout(() => this.enableEditingButton.setFocus(), 100);
    this.calciteInlineEditableCancelEditing.emit();
  };

  private escapeKeyHandler = async (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
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
    if (!this.editingEnabled) this.enableEditing();
  };

  private confirmChangesChangesHandler = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (this.onConfirmChanges) {
        this.loading = true;
        await this.onConfirmChanges();
        this.disableEditing();
      }
      this.calciteInlineEditableConfirmChanges.emit();
    } finally {
      this.loading = false;
    }
  };
}
