import { createRef } from "lit/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { getLabelText } from "../../utils/label";
import { type LabelableComponent, useLabel } from "../../controllers/useLabel";
import { Scale } from "../interfaces";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import type { Action } from "../action/action";
import type { Input } from "../input/input";
import type { InputNumber } from "../input-number/input-number";
import type { InputText } from "../input-text/input-text";
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { styles } from "./inline-editable.scss";
import { CSS, ICONS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";

declare global {
  interface DeclareElements {
    "calcite-inline-editable": InlineEditable;
  }
}

/**
 * @deprecated in v5.2.0, removal target v7.0.0 - Use `calcite-input`, `calcite-input-number`, or `calcite-input-text` with built-in inline editable (`inline-editable` and `inline-editable-controls` props) instead.
 * @slot - A slot for adding a `calcite-input`.
 */
export class InlineEditable extends LitElement implements LabelableComponent {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private cancelEditingButtonRef = createRef<Action["el"]>();

  private confirmChangesButtonRef = createRef<Action["el"]>();

  private _editingEnabled = false;

  private enableEditingButtonRef = createRef<Action["el"]>();

  private inputEl?: (Input | InputNumber | InputText)["el"];

  labelEl?: Label["el"];

  private shouldEmitCancel = false;

  private valuePriorToEditing: string = "";

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  labelable = useLabel<this>()(this);

  private get shouldShowControls(): boolean {
    return this.editingEnabled && this.controls;
  }

  //#endregion

  //#region Public Properties

  /** Specifies a callback to be executed prior to disabling editing via the controls. When provided, the component's loading state will be handled automatically. */
  @property() afterConfirm?: () => Promise<void>;

  /** When `true` and `editingEnabled` is `true`, displays save and cancel controls. */
  @property({ reflect: true }) controls = false;

  /** When `true`, prevents interaction and decreases the component's opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, inline editing is enabled. */
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

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.inputEl, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's "cancel editing" button is pressed. */
  calciteInlineEditableEditCancel = createEvent({ cancelable: false });

  /** Fires when the component's "confirm edits" button is pressed. */
  calciteInlineEditableEditConfirm = createEvent({ cancelable: false });

  /** @private */
  calciteInternalInlineEditableEnableEditingChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalInputBlur", this.blurHandler);
    this.listen("calciteInternalInputNumberBlur", this.blurHandler);
    this.listen("calciteInternalInputTextBlur", this.blurHandler);
    this.listen("keydown", this.escapeKeyHandler);
  }

  //#endregion

  //#region Private Methods

  private editingEnabledWatcher(newValue: boolean, oldValue: boolean): void {
    if (this.inputEl) {
      this.inputEl.editingEnabled = newValue;
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
    const inputElement = slotChangeGetAssignedElements(event).filter(
      (el): el is (Input | InputNumber | InputText)["el"] =>
        el.matches("calcite-input, calcite-input-number, calcite-input-text"),
    )[0];

    this.inputEl = inputElement;

    if (!inputElement) {
      return;
    }

    await inputElement.componentOnReady();
    inputElement.editingEnabled = this.editingEnabled;
    inputElement.label = inputElement.label || getLabelText(this);
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private enableEditing() {
    this.valuePriorToEditing = this.inputEl?.value ?? "";
    this.editingEnabled = true;
    this.inputEl?.setFocus();
    this.calciteInternalInlineEditableEnableEditingChange.emit();
  }

  private disableEditing() {
    this.editingEnabled = false;
  }

  private cancelEditing() {
    if (this.inputEl) {
      this.inputEl.value = this.valuePriorToEditing;
    }
    this.disableEditing();
    this.enableEditingButtonRef.value?.setFocus();
    if (!this.editingEnabled && !!this.shouldEmitCancel) {
      this.calciteInlineEditableEditCancel.emit();
    }
  }

  private escapeKeyHandler(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      this.cancelEditing();
    }

    if (event.key === "Tab" && this.shouldShowControls) {
      const confirmChangesButton = this.confirmChangesButtonRef.value;
      const cancelEditingButton = this.cancelEditingButtonRef.value;
      const composedPath = event.composedPath();
      const tabFromInput = this.inputEl ? composedPath.includes(this.inputEl) : false;
      const tabFromConfirm = confirmChangesButton
        ? composedPath.includes(confirmChangesButton)
        : false;
      const tabFromCancel = cancelEditingButton
        ? composedPath.includes(cancelEditingButton)
        : false;

      if (!event.shiftKey && tabFromConfirm) {
        event.preventDefault();
        cancelEditingButton?.setFocus();
      }

      if (!event.shiftKey && (tabFromInput || (!tabFromConfirm && !tabFromCancel))) {
        event.preventDefault();
        confirmChangesButton?.setFocus();
      }

      if (!!event.shiftKey && tabFromCancel) {
        event.preventDefault();
        confirmChangesButton?.setFocus();
      }

      if (!!event.shiftKey && tabFromConfirm) {
        event.preventDefault();
        this.inputEl?.setFocus();
      }
    }
  }

  private async cancelEditingHandler(event: MouseEvent) {
    event.preventDefault();
    this.cancelEditing();
  }

  private enableEditingHandler(event: MouseEvent) {
    if (
      this.disabled ||
      (event.target !== this.enableEditingButtonRef.value && event.target !== this.inputEl)
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
        this.enableEditingButtonRef.value?.setFocus();
      }
    } catch {
      // we handle error in finally block
    } finally {
      this.loading = false;
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div class={CSS.wrapper} onClick={this.enableEditingHandler}>
          <div class={CSS.inputWrapper}>
            <slot onSlotChange={this.handleDefaultSlotChange} />
          </div>
          <div class={CSS.controlsWrapper}>
            <calcite-action
              ariaLabel={this.messages.enableEditing}
              class={{
                [CSS.enableEditingButton]: true,
                [CSS.enableEditingButtonHidden]: this.editingEnabled,
              }}
              icon={ICONS.pencil}
              onClick={this.enableEditingHandler}
              ref={this.enableEditingButtonRef}
              scale={this.scale}
              text={this.messages.enableEditing}
              title={this.messages.enableEditing}
              type="button"
            />
            {this.shouldShowControls && [
              <calcite-action
                ariaLabel={this.messages.confirmChanges}
                class={CSS.confirmChangesButton}
                icon={ICONS.check}
                loading={this.loading}
                onClick={this.confirmChangesHandler}
                ref={this.confirmChangesButtonRef}
                scale={this.scale}
                text={this.messages.confirmChanges}
                title={this.messages.confirmChanges}
                type="button"
              />,
              <div class={CSS.cancelEditingButtonWrapper}>
                <calcite-action
                  ariaLabel={this.messages.cancelEditing}
                  class={CSS.cancelEditingButton}
                  icon={ICONS.close}
                  onClick={this.cancelEditingHandler}
                  ref={this.cancelEditingButtonRef}
                  scale={this.scale}
                  text={this.messages.cancelEditing}
                  title={this.messages.cancelEditing}
                  type="button"
                />
              </div>,
            ]}
          </div>
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
