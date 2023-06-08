/**
 * This module helps users provide custom configuration for component internals.
 *
 * @internal
 */

const configOverrides = globalThis["calciteComponentsConfig"];

const config = {
  /**
   * We apply a custom fix to improve positioning for non-Chromium browsers.
   * The fix comes at a performance cost, so provides users a way to opt-out if necessary.
   *
   * @internal
   */
  floatingUINonChromiumPositioningFix: true,

  ...configOverrides
};

export { config };
