import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { inlineEditConverter, UseInlineEdit } from "./useInlineEdit";

describe("UseInlineEdit", () => {
  let inlineEditing = false;
  let value = "";

  let setInlineEditingTracker: ReturnType<typeof vi.fn<(nextInlineEditing: boolean) => void>>;
  let restoreValueTracker: ReturnType<typeof vi.fn<(nextValue: string) => void>>;
  let commitValueTracker: ReturnType<typeof vi.fn<() => void>>;
  let setFocusTracker: ReturnType<typeof vi.fn<() => void>>;
  let emitCancelTracker: ReturnType<typeof vi.fn<() => void>>;
  let emitConfirmTracker: ReturnType<typeof vi.fn<() => void>>;
  let emitEnableEditingChangeTracker: ReturnType<typeof vi.fn<() => void>>;

  let inlineEditManager: UseInlineEdit;

  beforeEach(() => {
    inlineEditing = false;
    value = "initial";

    setInlineEditingTracker = vi.fn<(nextInlineEditing: boolean) => void>();
    const setInlineEditing = (nextInlineEditing: boolean): void => {
      setInlineEditingTracker(nextInlineEditing);
      inlineEditing = nextInlineEditing;
    };

    restoreValueTracker = vi.fn<(nextValue: string) => void>();
    const restoreValue = (nextValue: string): void => {
      restoreValueTracker(nextValue);
      value = nextValue;
    };

    commitValueTracker = vi.fn<() => void>();
    const commitValue = (): void => {
      commitValueTracker();
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

    inlineEditManager = new UseInlineEdit({
      getInlineEditing: () => inlineEditing,
      setInlineEditing,
      getValue: () => value,
      restoreValue,
      commitValue,
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
    inlineEditManager.enable();

    expect(setInlineEditingTracker).toHaveBeenCalledWith(true);
    expect(inlineEditing).toBe(true);
    expect(setFocusTracker).toHaveBeenCalledTimes(1);
    expect(emitEnableEditingChangeTracker).toHaveBeenCalledTimes(1);
  });

  it("disable turns editing off", () => {
    inlineEditing = true;

    inlineEditManager.disable();

    expect(setInlineEditingTracker).toHaveBeenCalledWith(false);
    expect(inlineEditing).toBe(false);
  });

  it("cancelEditing restores the value captured when editing was enabled, disables editing, and emits cancel", () => {
    inlineEditManager.enable();
    value = "changed";

    inlineEditManager.cancelEditing();

    expect(restoreValueTracker).toHaveBeenCalledWith("initial");
    expect(value).toBe("initial");
    expect(setInlineEditingTracker).toHaveBeenLastCalledWith(false);
    expect(inlineEditing).toBe(false);
    expect(emitCancelTracker).toHaveBeenCalledTimes(1);
    expect(emitEnableEditingChangeTracker).toHaveBeenCalledTimes(2);
  });

  it("emits confirm and disables editing after a successful async confirm", async () => {
    inlineEditing = true;
    const inlineEditingBeforeConfirm = vi.fn().mockResolvedValue(undefined);
    const setLoading = vi.fn<(isLoading: boolean) => void>();

    await inlineEditManager.confirm(inlineEditingBeforeConfirm, setLoading);

    expect(inlineEditingBeforeConfirm).toHaveBeenCalledTimes(1);
    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
    expect(setInlineEditingTracker).toHaveBeenCalledWith(false);
    expect(inlineEditing).toBe(false);
    expect(commitValueTracker).toHaveBeenCalledTimes(1);
    expect(emitConfirmTracker).toHaveBeenCalledTimes(1);
    expect(emitEnableEditingChangeTracker).toHaveBeenCalledTimes(1);
  });

  it("emits confirm and disables editing without an async callback", async () => {
    inlineEditing = true;

    await inlineEditManager.confirm();

    expect(setInlineEditingTracker).toHaveBeenCalledWith(false);
    expect(inlineEditing).toBe(false);
    expect(commitValueTracker).toHaveBeenCalledTimes(1);
    expect(emitConfirmTracker).toHaveBeenCalledTimes(1);
    expect(emitEnableEditingChangeTracker).toHaveBeenCalledTimes(1);
  });

  it("does not commit or emit confirm when async confirm throws", async () => {
    inlineEditing = true;
    const error = new Error("confirm failed");
    const inlineEditingBeforeConfirm = vi.fn().mockRejectedValue(error);
    const setLoading = vi.fn<(isLoading: boolean) => void>();

    await expect(inlineEditManager.confirm(inlineEditingBeforeConfirm, setLoading)).rejects.toThrow("confirm failed");

    expect(setLoading).toHaveBeenNthCalledWith(1, true);
    expect(setLoading).toHaveBeenNthCalledWith(2, false);
    expect(emitConfirmTracker).not.toHaveBeenCalled();
    expect(setInlineEditingTracker).not.toHaveBeenCalledWith(false);
    expect(inlineEditing).toBe(true);
    expect(commitValueTracker).not.toHaveBeenCalled();
  });
});

describe("inlineEditConverter", () => {
  it("converts inline-edit attribute values", () => {
    expect(inlineEditConverter.fromAttribute(null)).toBe(false);
    expect(inlineEditConverter.fromAttribute("")).toBe(true);
    expect(inlineEditConverter.fromAttribute("controls-disabled")).toBe("controls-disabled");
  });

  it("reflects inline-edit values", () => {
    expect(inlineEditConverter.toAttribute(false)).toBeNull();
    expect(inlineEditConverter.toAttribute(true)).toBe("");
    expect(inlineEditConverter.toAttribute("controls-disabled")).toBe("controls-disabled");
  });
});
