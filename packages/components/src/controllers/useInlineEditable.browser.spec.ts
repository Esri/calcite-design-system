import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UseInlineEditable } from "./useInlineEditable";

describe("UseInlineEditable", () => {
  let editingEnabled = false;
  let value = "";

  let setEditingEnabledTracker: ReturnType<typeof vi.fn<(nextEditingEnabled: boolean) => void>>;
  let setValueTracker: ReturnType<typeof vi.fn<(nextValue: string) => void>>;
  let setFocusTracker: ReturnType<typeof vi.fn<() => void>>;
  let emitCancelTracker: ReturnType<typeof vi.fn<() => void>>;
  let emitConfirmTracker: ReturnType<typeof vi.fn<() => void>>;
  let emitEnableEditingChangeTracker: ReturnType<typeof vi.fn<() => void>>;

  let useInlineEditable: UseInlineEditable;

  beforeEach(() => {
    editingEnabled = false;
    value = "initial";

    setEditingEnabledTracker = vi.fn<(nextEditingEnabled: boolean) => void>();
    const setEditingEnabled = (nextEditingEnabled: boolean): void => {
      setEditingEnabledTracker(nextEditingEnabled);
      editingEnabled = nextEditingEnabled;
    };

    setValueTracker = vi.fn<(nextValue: string) => void>();
    const setValue = (nextValue: string): void => {
      setValueTracker(nextValue);
      value = nextValue;
    };

    setFocusTracker = vi.fn<() => void>();
    const setFocus = (): void => {
      setFocusTracker();
    };

    emitCancelTracker = vi.fn<() => void>();
    const emitCancel = (): void => {
      emitCancelTracker();
    };

    emitConfirmTracker = vi.fn<() => void>();
    const emitConfirm = (): void => {
      emitConfirmTracker();
    };

    emitEnableEditingChangeTracker = vi.fn<() => void>();
    const emitEnableEditingChange = (): void => {
      emitEnableEditingChangeTracker();
    };

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback: FrameRequestCallback): number => {
      callback(0);
      return 0;
    });

    useInlineEditable = new UseInlineEditable({
      getEditingEnabled: () => editingEnabled,
      setEditingEnabled,
      getValue: () => value,
      setValue,
      setFocus,
      emitCancel,
      emitConfirm,
      emitEnableEditingChange,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("enable stores the current value, enables editing, focuses, and emits the enable event", () => {
    useInlineEditable.enable();

    expect(setEditingEnabledTracker).toHaveBeenCalledWith(true);
    expect(editingEnabled).toBe(true);
    expect(setFocusTracker).toHaveBeenCalledTimes(1);
    expect(emitEnableEditingChangeTracker).toHaveBeenCalledTimes(1);
  });

  it("disable turns editing off", () => {
    editingEnabled = true;

    useInlineEditable.disable();

    expect(setEditingEnabledTracker).toHaveBeenCalledWith(false);
    expect(editingEnabled).toBe(false);
  });

  it("cancelEditing restores the value captured when editing was enabled, disables editing, and emits cancel", () => {
    useInlineEditable.enable();
    value = "changed";

    useInlineEditable.cancelEditing();

    expect(setValueTracker).toHaveBeenCalledWith("initial");
    expect(value).toBe("initial");
    expect(setEditingEnabledTracker).toHaveBeenLastCalledWith(false);
    expect(editingEnabled).toBe(false);
    expect(emitCancelTracker).toHaveBeenCalledTimes(1);
  });

  it("confirm emits confirm and disables editing after a successful async confirm", async () => {
    editingEnabled = true;
    const setLoading = vi.fn();
    const inlineEditableAfterConfirm = vi.fn().mockResolvedValue(undefined);

    await useInlineEditable.confirm(inlineEditableAfterConfirm, setLoading);

    expect(emitConfirmTracker).toHaveBeenCalledTimes(1);
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(inlineEditableAfterConfirm).toHaveBeenCalledTimes(1);
    expect(setEditingEnabledTracker).toHaveBeenCalledWith(false);
    expect(editingEnabled).toBe(false);
    expect(setLoading).toHaveBeenLastCalledWith(false);
  });

  it("confirm emits confirm without disabling editing when no async confirm callback is provided", async () => {
    editingEnabled = true;
    const setLoading = vi.fn();

    await useInlineEditable.confirm(undefined, setLoading);

    expect(emitConfirmTracker).toHaveBeenCalledTimes(1);
    expect(setEditingEnabledTracker).not.toHaveBeenCalled();
    expect(editingEnabled).toBe(true);
    expect(setLoading).toHaveBeenCalledTimes(1);
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  it("confirm always clears loading when async confirm throws", async () => {
    editingEnabled = true;
    const setLoading = vi.fn();
    const error = new Error("confirm failed");
    const inlineEditableAfterConfirm = vi.fn().mockRejectedValue(error);

    await expect(useInlineEditable.confirm(inlineEditableAfterConfirm, setLoading)).rejects.toThrow("confirm failed");

    expect(emitConfirmTracker).toHaveBeenCalledTimes(1);
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenLastCalledWith(false);
    expect(setEditingEnabledTracker).not.toHaveBeenCalledWith(false);
    expect(editingEnabled).toBe(true);
  });
});
