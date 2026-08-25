import { makeRuntime } from "@arcgis/lumina";
import "./utils/globalScript";

export const runtime = makeRuntime();

const originalSetAssetPath = runtime.setAssetPath;
runtime.setAssetPath = (path) => {
  assetPathChanged = true;
  originalSetAssetPath(path);
};

/** @internal */
export let assetPathChanged = false;

/**
 * "customElement" needs to be exported - it will be used by the build system.
 * You should not call it directly.
 */
export const { customElement, getAssetPath, setAssetPath } = runtime;
