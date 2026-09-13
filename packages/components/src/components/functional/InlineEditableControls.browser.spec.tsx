import { describe, expect, it, vi } from "vitest";
import { TemplateResult } from "lit";
import { InlineEditableControls, CSS } from "./InlineEditableControls";

interface TemplateLike {
  values: unknown[];
}

function collectTemplateValues(value: unknown, bucket: unknown[] = []): unknown[] {
  if (Array.isArray(value)) {
    value.forEach((item) => collectTemplateValues(item, bucket));
    return bucket;
  }

  if (value && typeof value === "object" && "values" in value) {
    const templateLike = value as TemplateLike;
    templateLike.values.forEach((item) => {
      bucket.push(item);
      collectTemplateValues(item, bucket);
    });
  }

  return bucket;
}

function renderInlineEditableControls(options: {
  editingEnabled: boolean;
  loading?: boolean;
  showControls: boolean;
  onCancelEditing?: (event: MouseEvent) => void;
  onConfirmChanges?: (event: MouseEvent) => Promise<void> | void;
  onEnableEditing?: (event: MouseEvent) => void;
}): TemplateResult {
  return InlineEditableControls({
    cancelEditingLabel: "Cancel",
    confirmChangesLabel: "Save",
    editingEnabled: options.editingEnabled,
    enableEditingLabel: "Edit",
    loading: options.loading ?? false,
    onCancelEditing: options.onCancelEditing ?? vi.fn(),
    onConfirmChanges: options.onConfirmChanges ?? vi.fn(),
    onEnableEditing: options.onEnableEditing ?? vi.fn(),
    scale: "m",
    showControls: options.showControls,
  });
}

describe("InlineEditableControls", () => {
  it("renders only enable editing action when not editing and controls are hidden", () => {
    const template = renderInlineEditableControls({
      editingEnabled: false,
      showControls: false,
    });
    const values = collectTemplateValues(template);

    expect(values).toContain(CSS.enableEditing);
    expect(values).not.toContain(CSS.confirmChanges);
    expect(values).not.toContain(CSS.cancelEditing);
  });

  it("renders confirm and cancel actions when controls are shown", () => {
    const template = renderInlineEditableControls({
      editingEnabled: true,
      showControls: true,
    });
    const values = collectTemplateValues(template);

    expect(values).not.toContain(CSS.enableEditing);
    expect(values).toContain(CSS.confirmChanges);
    expect(values).toContain(CSS.cancelEditing);
  });

  it("passes loading state to confirm action", () => {
    const template = renderInlineEditableControls({
      editingEnabled: true,
      loading: true,
      showControls: true,
    });
    const values = collectTemplateValues(template);

    expect(values).toContain(true);
  });

  it("wires callbacks to action templates", () => {
    const onEnableEditing = vi.fn();
    const onConfirmChanges = vi.fn();
    const onCancelEditing = vi.fn();

    const template = renderInlineEditableControls({
      editingEnabled: false,
      onCancelEditing,
      onConfirmChanges,
      onEnableEditing,
      showControls: true,
    });
    const values = collectTemplateValues(template);

    expect(values).toContain(onEnableEditing);
    expect(values).toContain(onConfirmChanges);
    expect(values).toContain(onCancelEditing);
  });
});
