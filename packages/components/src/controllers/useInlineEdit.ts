export interface InlineEditOptions {
  getInlineEditing: () => boolean;
  setInlineEditing: (inlineEditing: boolean) => void;
  getValue: () => string;
  restoreValue: (value: string) => void;
  commitValue: () => void;
  setFocus: () => void;
  emitCancel: () => void;
  emitConfirm: () => void;
  emitEnableEditingChange: () => void;
}

export class UseInlineEdit {
  private valuePriorToEditing = "";

  constructor(private options: InlineEditOptions) {}

  enable(): void {
    this.valuePriorToEditing = this.options.getValue();
    this.options.setInlineEditing(true);
    requestAnimationFrame(() => {
      this.options.setFocus();
    });
    this.options.emitEnableEditingChange();
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
