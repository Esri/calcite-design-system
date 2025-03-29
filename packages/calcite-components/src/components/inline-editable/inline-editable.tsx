// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { Scale } from "../interfaces";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import type { Input } from "../input/input";
import type { Label } from "../label/label";
import type { Button } from "../button/button";
import { useSetFocus } from "../../controllers/useSetFocus";
import { styles } from "./inline-editable.scss";
import { CSS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";

declare global {
  interface DeclareElements {
    "calcite-inline-editable": InlineEditable;
  }
}

/** @slot - A slot for adding a `calcite-input`. */
export class InlineEditable extends LitElement implements InteractiveComponent, LabelableComponent {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private cancelEditingButton = createRef<Button["el"]>();

  private confirmEditingButton = createRef<Button["el"]>();

  private _editingEnabled = false;

  private enableEditingButton = createRef<Button["el"]>();

  private inputElement: Input["el"];

  labelEl: Label["el"];

  private shouldEmitCancel: boolean;

  private valuePriorToEditing: string;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /** Specifies a callback to be executed prior to disabling editing via the controls. When provided, the component's loading state will be handled automatically. */
  @property() afterConfirm: () => Promise<void>;

  /** When `true` and `editingEnabled` is `true`, displays save and cancel controls on the component. */
  @property({ reflect: true }) controls = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, inline editing is enabled on the component. */
  @property({ reflect: true })
  get editingEnabled(): boolean {
    return this._editingEnabled;
  }
  set editingEnabled(editingEnabled: boolean) {
    const oldEditingEnabled = this._editingEnabled;
    if (editingEnabled !== oldEditingEnabled) {
      this._editingEnabled = editingEnabled;
      this.editingEnabledWatcher(editingEnabled, oldEditingEnabled);
    }
  }

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the size of the component. Defaults to the scale of the wrapped `calcite-input` or the scale of the closest wrapping component with a set scale. */
  @property({ reflect: true }) scale: Scale;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.inputElement;
    });
  }

  // #endregion

  // #region Events

  /** Emits when the component's "cancel editing" button is pressed. */
  calciteInlineEditableEditCancel = createEvent({ cancelable: false });

  /** Emits when the component's "confirm edits" button is pressed. */
  calciteInlineEditableEditConfirm = createEvent({ cancelable: false });

  /** @private */
  calciteInternalInlineEditableEnableEditingChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalInputBlur", this.blurHandler);
  }

  override connectedCallback(): void {
    connectLabel(this);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.disabledWatcher(this.disabled);
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
  }

  // #endregion

  // #region Private Methods

  private get shouldShowControls(): boolean {
    return this.editingEnabled && this.controls;
  }

  private disabledWatcher(disabled: boolean): void {
    if (this.inputElement) {
      this.inputElement.disabled = disabled;
    }
  }

  private editingEnabledWatcher(newValue: boolean, oldValue: boolean): void {
    if (this.inputElement) {
      this.inputElement.editingEnabled = newValue;
    }
    if (!newValue && !!oldValue) {
      this.shouldEmitCancel = true;
    }
  }

  private blurHandler(): void {
    if (!this.controls) {
      this.disableEditing();
    }
  }

  private async handleDefaultSlotChange(event: Event): Promise<void> {
    const inputElement = slotChangeGetAssignedElements(event).filter((el): el is Input["el"] =>
      el.matches("calcite-input"),
    )[0];

    this.inputElement = inputElement;

    if (!inputElement) {
      return;
    }

    await inputElement.componentOnReady();
    inputElement.editingEnabled = this.editingEnabled;
    inputElement.disabled = this.disabled;
    inputElement.label = inputElement.label || getLabelText(this);
    this.scale = this.scale || this.inputElement?.scale || "m";
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private enableEditing() {
    this.valuePriorToEditing = this.inputElement?.value;
    this.editingEnabled = true;
    this.inputElement?.setFocus();
    this.calciteInternalInlineEditableEnableEditingChange.emit();
  }

  private disableEditing() {
    this.editingEnabled = false;
  }

  private cancelEditing() {
    if (this.inputElement) {
      this.inputElement.value = this.valuePriorToEditing;
    }
    this.disableEditing();
    this.enableEditingButton.value?.setFocus();
    if (!this.editingEnabled && !!this.shouldEmitCancel) {
      this.calciteInlineEditableEditCancel.emit();
    }
  }

  private async escapeKeyHandler(event: KeyboardEvent) {
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
        this.cancelEditingButton.value.setFocus();
      }
      if (!!event.shiftKey && event.target === this.cancelEditingButton.value) {
        event.preventDefault();
        this.inputElement?.setFocus();
      }
    }
  }

  private async cancelEditingHandler(event: MouseEvent) {
    event.preventDefault();
    this.cancelEditing();
  }

  private async enableEditingHandler(event: MouseEvent) {
    if (
      this.disabled ||
      (event.target !== this.enableEditingButton.value && event.target !== this.inputElement)
    ) {
      return;
    }

    event.preventDefault();
    if (!this.editingEnabled) {
      this.enableEditing();
    }
  }

  private async confirmChangesHandler(event: MouseEvent) {
    event.preventDefault();
    this.calciteInlineEditableEditConfirm.emit();
    try {
      if (this.afterConfirm) {
        this.loading = true;
        await this.afterConfirm();
        this.disableEditing();
        this.enableEditingButton.value.setFocus();
      }
    } catch {
      // we handle error in finally block
    } finally {
      this.loading = false;
    }
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          class={CSS.wrapper}
          onClick={this.enableEditingHandler}
          onKeyDown={this.escapeKeyHandler}
        >
          <div class={CSS.inputWrapper}>
            <slot onSlotChange={this.handleDefaultSlotChange} />
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
              ref={this.enableEditingButton}
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
                  ref={this.cancelEditingButton}
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
                ref={this.confirmEditingButton}
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

  // #endregion
}
