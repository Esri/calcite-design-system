import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Scale } from "../interfaces";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { InlineEditableMessages } from "./assets/inline-editable/t9n";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding a `calcite-input`.
 */
@Component({
  tag: "calcite-inline-editable",
  shadow: {
    delegatesFocus: true,
  },
  styleUrl: "inline-editable.scss",
  assetsDirs: ["assets"],
})
export class InlineEditable
  implements
    InteractiveComponent,
    LabelableComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Props
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledWatcher(disabled: boolean): void {
    if (this.inputElement) {
      this.inputElement.disabled = disabled;
    }
  }

  /**
   * When `true`, inline editing is enabled on the component.
   */
  @Prop({ mutable: true, reflect: true }) editingEnabled = false;

  @Watch("editingEnabled")
  editingEnabledWatcher(newValue: boolean, oldValue: boolean): void {
    if (this.inputElement) {
      this.inputElement.editingEnabled = newValue;
    }
    if (!newValue && !!oldValue) {
      this.shouldEmitCancel = true;
    }
  }

  /** When `true`, a busy indicator is displayed. */
  @Prop({ mutable: true, reflect: true }) loading = false;

  /** When `true` and `editingEnabled` is `true`, displays save and cancel controls on the component. */
  @Prop({ reflect: true }) controls = false;

  /** Specifies the size of the component. Defaults to the scale of the wrapped `calcite-input` or the scale of the closest wrapping component with a set scale. */
  @Prop({ reflect: true, mutable: true }) scale: Scale;

  /** Specifies a callback to be executed prior to disabling editing via the controls. When provided, the component's loading state will be handled automatically. */
  @Prop() afterConfirm: () => Promise<void>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: InlineEditableMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<InlineEditableMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    connectLabel(this);
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback() {
    disconnectLabel(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          class={CSS.wrapper}
          onClick={this.enableEditingHandler}
          onKeyDown={this.escapeKeyHandler}
        >
          <div class={CSS.inputWrapper}>
            <slot onSlotchange={this.handleDefaultSlotChange} />
          </div>
          <div class={CSS.controlsWrapper}>
            <calcite-button
              appearance="transparent"
              class={CSS.enableEditingButton}
              disabled={this.disabled}
              iconStart="pencil"
              kind="neutral"
              label={this.messages.enableEditing}
              onClick={this.enableEditingHandler}
              ref={(el) => (this.enableEditingButton = el)}
              scale={this.scale}
              style={{
                opacity: this.editingEnabled ? "0" : "1",
                width: this.editingEnabled ? "0" : "inherit",
              }}
              title={this.messages.enableEditing}
              type="button"
            />
            {this.shouldShowControls && [
              <div class={CSS.cancelEditingButtonWrapper}>
                <calcite-button
                  appearance="transparent"
                  class={CSS.cancelEditingButton}
                  disabled={this.disabled}
                  iconStart="x"
                  kind="neutral"
                  label={this.messages.cancelEditing}
                  onClick={this.cancelEditingHandler}
                  ref={(el) => (this.cancelEditingButton = el)}
                  scale={this.scale}
                  title={this.messages.cancelEditing}
                  type="button"
                />
              </div>,
              <calcite-button
                appearance="solid"
                class={CSS.confirmChangesButton}
                disabled={this.disabled}
                iconStart="check"
                kind="brand"
                label={this.messages.confirmChanges}
                loading={this.loading}
                onClick={this.confirmChangesHandler}
                ref={(el) => (this.confirmEditingButton = el)}
                scale={this.scale}
                title={this.messages.confirmChanges}
                type="button"
              />,
            ]}
          </div>
        </div>
      </InteractiveContainer>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits when the component's "cancel editing" button is pressed.
   */
  @Event({ cancelable: false }) calciteInlineEditableEditCancel: EventEmitter<void>;

  /**
   * Emits when the component's "confirm edits" button is pressed.
   */
  @Event({ cancelable: false }) calciteInlineEditableEditConfirm: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalInlineEditableEnableEditingChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalInputBlur")
  blurHandler(): void {
    if (!this.controls) {
      this.disableEditing();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInlineEditableElement;

  private inputElement: HTMLCalciteInputElement;

  private valuePriorToEditing: string;

  private shouldEmitCancel: boolean;

  private enableEditingButton: HTMLCalciteButtonElement;

  private cancelEditingButton: HTMLCalciteButtonElement;

  private confirmEditingButton: HTMLCalciteButtonElement;

  labelEl: HTMLCalciteLabelElement;

  @State() defaultMessages: InlineEditableMessages;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.el?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  handleDefaultSlotChange = (event: Event): void => {
    const inputElement = slotChangeGetAssignedElements(event).filter(
      (el): el is HTMLCalciteInputElement => el.matches("calcite-input"),
    )[0];

    this.inputElement = inputElement;

    if (!inputElement) {
      return;
    }

    inputElement.disabled = this.disabled;
    inputElement.label = inputElement.label || getLabelText(this);
    this.scale = this.scale || this.inputElement?.scale;
  };

  onLabelClick(): void {
    this.setFocus();
  }

  private get shouldShowControls(): boolean {
    return this.editingEnabled && this.controls;
  }

  private enableEditing = () => {
    this.valuePriorToEditing = this.inputElement?.value;
    this.editingEnabled = true;
    this.inputElement?.setFocus();
    this.calciteInternalInlineEditableEnableEditingChange.emit();
  };

  private disableEditing = () => {
    this.editingEnabled = false;
  };

  private cancelEditing = () => {
    if (this.inputElement) {
      this.inputElement.value = this.valuePriorToEditing;
    }
    this.disableEditing();
    this.enableEditingButton.setFocus();
    if (!this.editingEnabled && !!this.shouldEmitCancel) {
      this.calciteInlineEditableEditCancel.emit();
    }
  };

  private escapeKeyHandler = async (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      this.cancelEditing();
    }

    if (event.key === "Tab" && this.shouldShowControls) {
      if (!event.shiftKey && event.target === this.inputElement) {
        event.preventDefault();
        this.cancelEditingButton.setFocus();
      }
      if (!!event.shiftKey && event.target === this.cancelEditingButton) {
        event.preventDefault();
        this.inputElement?.setFocus();
      }
    }
  };

  private cancelEditingHandler = async (event: MouseEvent) => {
    event.preventDefault();
    this.cancelEditing();
  };

  private enableEditingHandler = async (event: MouseEvent) => {
    if (
      this.disabled ||
      event.target === this.cancelEditingButton ||
      event.target === this.confirmEditingButton
    ) {
      return;
    }

    event.preventDefault();
    if (!this.editingEnabled) {
      this.enableEditing();
    }
  };

  private confirmChangesHandler = async (event: MouseEvent) => {
    event.preventDefault();
    this.calciteInlineEditableEditConfirm.emit();
    try {
      if (this.afterConfirm) {
        this.loading = true;
        await this.afterConfirm();
        this.disableEditing();
        this.enableEditingButton.setFocus();
      }
    } catch (error) {
      // we handle error in finally block
    } finally {
      this.loading = false;
    }
  };
}
