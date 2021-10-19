import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  VNode,
  Watch
} from "@stencil/core";
import { getElementProp } from "../../utils/dom";
import { Scale } from "../interfaces";
import { TEXT, CSS } from "./resources";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";

/**
 * @slot - A slot for adding a `calcite-input`.
 */
@Component({
  tag: "calcite-inline-editable",
  scoped: true,
  styleUrl: "calcite-inline-editable.scss"
})
export class CalciteInlineEditable implements LabelableComponent {
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

  /** specify text to be user for the enable editing button's aria-label, defaults to `Click to edit`
   * @default "Click to edit"
   */
  @Prop({ reflect: true }) intlEnableEditing = TEXT.intlEnablingEditing;

  /** specify text to be user for the cancel editing button's aria-label, defaults to `Cancel`
   * @default "Cancel"
   */
  @Prop({ reflect: true }) intlCancelEditing = TEXT.intlCancelEditing;

  /** specify text to be user for the confirm changes button's aria-label, defaults to `Save`
   * @default "Save"
   */
  @Prop({ reflect: true }) intlConfirmChanges = TEXT.intlConfirmChanges;

  /** specify the scale of the inline-editable component, defaults to the scale of the wrapped calcite-input or the scale of the closest wrapping component with a set scale */
  @Prop({ reflect: true, mutable: true }) scale?: Scale;

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

  connectedCallback() {
    connectLabel(this);
  }

  disconnectedCallback() {
    disconnectLabel(this);
  }

  render(): VNode {
    return (
      <div
        class={CSS.wrapper}
        onClick={this.enableEditingHandler}
        onKeyDown={this.escapeKeyHandler}
        onTransitionEnd={this.transitionEnd}
      >
        <div class={CSS.inputWrapper}>
          <slot />
        </div>
        <div class={CSS.controlsWrapper}>
          {!this.editingEnabled && (
            <calcite-button
              appearance="transparent"
              class={CSS.enableEditingButton}
              color="neutral"
              disabled={this.disabled}
              iconStart="pencil"
              label={this.intlEnableEditing}
              onClick={this.enableEditingHandler}
              ref={(el) => (this.enableEditingButton = el)}
              scale={this.scale}
            />
          )}
          {this.shouldShowControls && [
            <div class={CSS.cancelEditingButtonWrapper}>
              <calcite-button
                appearance="transparent"
                class={CSS.cancelEditingButton}
                color="neutral"
                disabled={this.disabled}
                iconStart="x"
                label={this.intlCancelEditing}
                onClick={this.cancelEditingHandler}
                scale={this.scale}
              />
            </div>,
            <calcite-button
              appearance="solid"
              class={CSS.confirmChangesButton}
              color="blue"
              disabled={this.disabled}
              iconStart="check"
              label={this.intlConfirmChanges}
              loading={this.loading}
              onClick={this.confirmChangesHandler}
              scale={this.scale}
            />
          ]}
        </div>
      </div>
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

  onLabelClick = (): void => {
    this.setFocus();
  };

  //--------------------------------------------------------------------------
  //
  //  Private State
  //
  //--------------------------------------------------------------------------

  private inputElement: HTMLCalciteInputElement;

  private htmlInput: HTMLInputElement;

  private valuePriorToEditing: string;

  private enableEditingButton: HTMLCalciteButtonElement;

  private editingCancelTransitionProp = "border-top-color";

  labelEl: HTMLCalciteLabelElement;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    if (this.editingEnabled) {
      this.inputElement?.setFocus();
    } else {
      this.enableEditingButton?.setFocus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  transitionEnd = (event: TransitionEvent): void => {
    if (!this.editingEnabled && event.propertyName === this.editingCancelTransitionProp) {
      this.calciteInlineEditableEditingCancel.emit(event);
    }
  };

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

  private cancelEditingEnd = (): void => {
    this.enableEditingButton.setFocus();
    this.el.removeEventListener("calciteInlineEditableEditingCancel", this.cancelEditingEnd);
  };

  private cancelEditing = () => {
    this.inputElement.value = this.valuePriorToEditing;
    this.el.addEventListener("calciteInlineEditableEditingCancel", this.cancelEditingEnd);
    this.disableEditing();
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
