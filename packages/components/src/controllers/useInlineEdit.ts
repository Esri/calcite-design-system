export const INLINE_EDIT_ACTIVATION_SOURCE = {
  editButton: "edit-button",
  input: "input",
} as const;

type InlineEditActivationSource = (typeof INLINE_EDIT_ACTIVATION_SOURCE)[keyof typeof INLINE_EDIT_ACTIVATION_SOURCE];

export interface InlineEditOptions {
  getInlineEditing: () => boolean;
  setInlineEditing: (inlineEditing: boolean) => void;
  getValue: () => string;
  restoreValue: (value: string) => void;
  commitValue: () => void;
  setFocus: (source: InlineEditActivationSource) => void;
  emitCancel: () => void;
  emitConfirm: () => void;
  emitEnableEditingChange: () => void;
}

export class UseInlineEdit {
  private valuePriorToEditing = "";

  constructor(private options: InlineEditOptions) {}

  enable(source: InlineEditActivationSource = INLINE_EDIT_ACTIVATION_SOURCE.input): void {
    this.captureValuePriorToEditing();
    this.options.setInlineEditing(true);
    requestAnimationFrame(() => {
      this.options.setFocus(source);
    });
    this.options.emitEnableEditingChange();
  }

  setCaretPosition(input: HTMLInputElement | undefined, source: InlineEditActivationSource): void {
    if (source === INLINE_EDIT_ACTIVATION_SOURCE.editButton && input && input.selectionStart !== null) {
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  captureValuePriorToEditing(): void {
    this.valuePriorToEditing = this.options.getValue();
  }

  disable(): void {
    this.options.setInlineEditing(false);
  }

  cancelEditing(): void {
    this.options.restoreValue(this.valuePriorToEditing);
    this.disable();
    this.options.emitCancel();
    this.options.emitEnableEditingChange();
  }

  async confirm(confirm?: () => Promise<void>, setLoading?: (isLoading: boolean) => void): Promise<void> {
    if (confirm) {
      setLoading?.(true);
      try {
        await confirm();
      } finally {
        setLoading?.(false);
      }
    }
    this.options.commitValue();
    this.disable();
    this.options.emitConfirm();
    this.options.emitEnableEditingChange();
  }
}

export const inlineEditConverter = {
  fromAttribute(value: string | null): boolean | "controls-disabled" {
    return value === null ? false : value === "controls-disabled" ? value : true;
  },
  toAttribute(value: boolean | "controls-disabled"): string | null {
    return value === false ? null : value === true ? "" : value;
  },
};
