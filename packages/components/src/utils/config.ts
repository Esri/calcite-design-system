import { isServer } from "lit";
import type { FocusTrap } from "focus-trap";
import type { LogLevel } from "./logger";
import type { GlobalThis } from "type-fest";

type CalciteGlobalThis = GlobalThis & {
  calciteConfig: CalciteConfig;
};

export interface CalciteConfig {
  /**
   * Defines the global trap stack to use for focus-trapping components.
   *
   * This is useful if your application uses its own instance of `focus-trap` and both need to be aware of each other.
   *
   * @see [focus-trap createOptions](https://github.com/focus-trap/focus-trap#createoptions).
   */
  focusTrapStack: FocusTrap[];

  /** Defines the global log level to use when logging messages. */
  logLevel: LogLevel;

  /**
   * Contains the version of the Calcite components.
   *
   * @readonly
   */
  version?: string;
}

let effectiveConfig: CalciteConfig | undefined = undefined;

/**
 * Exporting for testing purposes only
 *
 * @internal
 */
export const defaultConfig: CalciteConfig = {
  focusTrapStack: [],
  logLevel: !isServer && import.meta.env.MODE === "test" ? "error" : "info",
};

function initConfig(): CalciteConfig {
  return {
    ...defaultConfig,
    ...((globalThis as CalciteGlobalThis)["calciteConfig"] ?? {}),
  };
}

/**
 * Clears the effective config so it will be recomputed on next getConfig().
 *
 * This is primarily intended for testing purposes.
 *
 * @internal
 */
export function clearConfig(): void {
  effectiveConfig = undefined;
}

/**
 * Returns the effective config.
 *
 * @internal
 */
export function getConfig(): CalciteConfig {
  if (!effectiveConfig) {
    effectiveConfig = initConfig();
  }

  return effectiveConfig;
}

// the following placeholders are replaced by the build
const version = __CALCITE_VERSION__;
const buildDate = __CALCITE_BUILD_DATE__;
const revision = __CALCITE_REVISION__;

/** Stamp the version onto the global config. */
export function stampVersion(): void {
  const config = getConfig();

  if (config && config.version) {
    return;
  }

  console.info(`Using Calcite Components ${version} [Date: ${buildDate}, Revision: ${revision}]`);

  Object.defineProperty(config, "version", {
    value: version,
    writable: false,
  });

  (globalThis as CalciteGlobalThis)["calciteConfig"] = config;
}
