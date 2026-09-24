// ⚠️  Please reach out to Franco (or Ben if he's out) before editing this file ⚠️
// This file follows the same setup as `stencil-ds-output-targets` (https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/example-project/component-library/src/index.ts).
/**
 * Place in this file any utility functions you wish to expose for the consumers
 * of your package
 */

/** @public */
declare module "csstype" {
  interface Properties {
    [index: `--calcite-${string}`]: any;
  }
}

/** @internal */
export { assetPathChanged } from "./runtime";
export { setAssetPath, getAssetPath } from "./runtime";
