/**
 * Helper function to wait for the next animation frame.
 *
 * If you need to run this within a Puppeteer browser context, please see the `waitForAnimationFrame` function in the `puppeteer` module.
 *
 * @returns {Promise<void>}
 */
export async function waitForAnimationFrame(): Promise<void> {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}
