type DestinationPosition = "bottom" | "center" | "left" | "right" | "top";
type PointerType = "mouse" | "pen" | "touch";

export interface DragAndDropOptions {
  afterFirstMove?: () => void | Promise<void>;
  moveSteps?: number;
  pointerType?: PointerType;
  skipPointerUp?: boolean;
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

export async function dragAndDrop(
  handle: Element,
  destination: Element,
  position: DestinationPosition = "center",
  options: DragAndDropOptions = {},
): Promise<void> {
  const handleRect = handle.getBoundingClientRect();
  const destinationRect = destination.getBoundingClientRect();
  const start = {
    clientX: handleRect.left + handleRect.width / 2,
    clientY: handleRect.top + handleRect.height / 2,
  };
  const end = {
    clientX:
      position === "left"
        ? destinationRect.left + 1
        : position === "right"
          ? destinationRect.right - 1
          : destinationRect.left + destinationRect.width / 2,
    clientY:
      position === "top"
        ? destinationRect.top + 1
        : position === "bottom"
          ? destinationRect.bottom - 1
          : destinationRect.top + destinationRect.height / 2,
  };
  const dispatch = (
    target: EventTarget,
    type: "pointerdown" | "pointermove" | "pointerup",
    clientX: number,
    clientY: number,
  ): void => {
    target.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerId: 1,
        pointerType: options.pointerType ?? "mouse",
        isPrimary: true,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        clientX,
        clientY,
      }),
    );
  };

  await nextFrame();
  dispatch(handle, "pointerdown", start.clientX, start.clientY);

  const moveSteps = options.moveSteps ?? 5;

  for (let step = 1; step <= moveSteps; step++) {
    const progress = step / moveSteps;
    dispatch(
      document,
      "pointermove",
      start.clientX + (end.clientX - start.clientX) * progress,
      start.clientY + (end.clientY - start.clientY) * progress,
    );
    await nextFrame();

    if (step === 1) {
      await options.afterFirstMove?.();
    }
  }

  if (!options.skipPointerUp) {
    dispatch(document, "pointerup", end.clientX, end.clientY);
  }

  await nextFrame();
}
