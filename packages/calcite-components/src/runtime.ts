import { makeRuntime } from "@arcgis/lumina";

export const runtime = makeRuntime();

/**
 * "customElement" needs to be exported - it will be used by the build system.
 * You should not call it directly.
 */
export const { customElement, getAssetPath, setAssetPath } = runtime;
