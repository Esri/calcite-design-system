export interface InlineEditableOptions {
  getEditingEnabled: () => boolean;
  setEditingEnabled: (editingEnabled: boolean) => void;
  getValue: () => string;
  setValue: (value: string) => void;
  setFocus: () => void;
  emitCancel: () => void;
  emitConfirm: () => void;
  emitEnableEditingChange: () => void;
}

export class UseInlineEditable {
  private valuePriorToEditing = "";

  constructor(private options: InlineEditableOptions) {}

  enable(): void {
    this.valuePriorToEditing = this.options.getValue();
    this.options.setEditingEnabled(true);
    requestAnimationFrame(() => {
      this.options.setFocus();
    });
    this.options.emitEnableEditingChange();
  }

  disable(): void {
    this.options.setEditingEnabled(false);
  }

  cancelEditing(): void {
    this.options.setValue(this.valuePriorToEditing);
    this.disable();
    this.options.emitCancel();
  }

  async confirm(afterConfirm?: () => Promise<void>, setLoading?: (isLoading: boolean) => void): Promise<void> {
    this.options.emitConfirm();

    try {
      if (afterConfirm) {
        setLoading?.(true);
        await afterConfirm();
        this.disable();
      }
    } finally {
      setLoading?.(false);
    }
  }
}
