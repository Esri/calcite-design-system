/**
 * This module helps users provide custom configuration for component internals.
 *
 * @internal
 */

const configOverrides = globalThis["calciteComponentsConfig"];

const config = {
  ...configOverrides
};

export { config };
