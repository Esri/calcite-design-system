import { afterNextTask } from "./timing";

/**
 * Waits for `focus-trap` to apply delayed focus changes after an interaction.
 *
 * @see https://github.com/focus-trap/focus-trap/#delayinitialfocus
 */
export async function afterFocusShiftDelay(): Promise<void> {
  await afterNextTask();
}
