import { FocusTrap } from "./focusTrapComponent";
import { LogLevel } from "./logger";

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

let effectiveConfig: CalciteConfig;

export const defaultConfig: CalciteConfig = {
  focusTrapStack: [],
  logLevel: "info",
};

export function setCalciteConfig(config: CalciteConfig): void {
  effectiveConfig = config;
}

export function getCalciteConfig(): CalciteConfig {
  const globalConfig = globalThis["calciteConfig"] as CalciteConfig | undefined;
  return { ...effectiveConfig, ...globalConfig };
}

// the following placeholders are replaced by the build
const version = __CALCITE_VERSION__;
const buildDate = __CALCITE_BUILD_DATE__;
const revision = __CALCITE_REVISION__;

/** Stamp the version onto the global config. */
export function stampVersion(): void {
  const effectiveConfig = getCalciteConfig();

  if (effectiveConfig && effectiveConfig.version) {
    return;
  }

  console.info(`Using Calcite Components ${version} [Date: ${buildDate}, Revision: ${revision}]`);

  const target = effectiveConfig || globalThis["calciteConfig"] || {};

  Object.defineProperty(target, "version", {
    value: version,
    writable: false,
  });

  globalThis["calciteConfig"] = target;
}
