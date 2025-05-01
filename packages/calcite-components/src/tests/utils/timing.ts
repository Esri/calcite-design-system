/**
 * Tells the browser that you wish to perform an animation.
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 *
 * @returns {Promise<void>}
 */
export async function waitForAnimationFrame(): Promise<void> {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}
