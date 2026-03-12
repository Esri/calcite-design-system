/**
 * Timing helpers for browser based tests.
 *
 * These utilities expose observable timing milestones instead of raw event loop primitives.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth
 */

/**
 * Helper function to wait for the next animation frame.
 *
 * If you need to run this within a Puppeteer browser context, please see the `waitForAnimationFrame` function in the `puppeteer` module.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth#event_loops
 */
export async function afterNextFrame(): Promise<void> {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

/**
 * Helper function to wait for the next task turn of the event loop.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#tasks
 */
export async function afterNextTask(): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), 0));
}
