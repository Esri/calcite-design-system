// @ts-strict-ignore
import { LuminaJsx } from "@arcgis/lumina";
import { getConfig } from "./config";

export type LogLevel = "debug" | "info" | "warn" | "error" | "trace" | "off";

type MajorVersion = number;

type DeprecatedContext = "component" | "property" | "method" | "event" | "slot";

type DeprecatedParams = {
  component: string;
  name: string;
  suggested?: string | string[];
  removalVersion: MajorVersion | "future";
};

type SimpleComponentName<T> = T extends `calcite-${infer Name}` ? Name : T;

type ComponentDeprecatedParams = Omit<DeprecatedParams, "name"> & {
  name: SimpleComponentName<keyof LuminaJsx.IntrinsicElements>;
};

/** Exported for testing purposes only */
export const loggedDeprecations = new Set<string>();

const logLevels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 4,
  error: 8,
  off: 10,
} as const;

function willLog(level: LogLevel): boolean {
  return logLevels[level] >= logLevels[getConfig().logLevel];
}

function forwardToConsole(level: LogLevel, component: string, ...data: any[]): void {
  if (!willLog(level)) {
    return;
  }

  // Normalize component name for the badge. If caller passed a bare name
  // (e.g. "block"), prefix with `calcite-`. If the caller passed the
  // container badge ("calcite") leave as-is.
  let badgeName = component || "calcite";
  if (badgeName !== "calcite" && !badgeName.startsWith("calcite-")) {
    badgeName = `calcite-${badgeName}`;
  }

  const badgeTemplate = `%c${badgeName}`;
  const badgeStyle = "background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;";

  console[level].call(this, badgeTemplate, badgeStyle, ...data);
}

let listFormatter: Intl.ListFormat;

function makeLogger(level: LogLevel) {
  return (componentNameOrMessage: string, ...data: any[]) =>
    data.length === 0
      ? forwardToConsole(level, "calcite", componentNameOrMessage)
      : forwardToConsole(level, componentNameOrMessage, ...data);
}

export const logger = {
  debug: makeLogger("debug"),
  info: makeLogger("info"),
  warn: makeLogger("warn"),
  error: makeLogger("error"),
  trace: makeLogger("trace"),

  deprecated,
} as const;

/**
 * Logs a deprecation warning to the console.
 *
 * @param context the context in which the deprecation is occurring
 * @param params the deprecation details
 */
function deprecated(context: Exclude<DeprecatedContext, "component">, params: DeprecatedParams): void;
function deprecated(context: Extract<DeprecatedContext, "component">, params: ComponentDeprecatedParams): void;
function deprecated(
  context: DeprecatedContext,
  { component, name, suggested, removalVersion }: DeprecatedParams | ComponentDeprecatedParams,
): void {
  const key = `${context}:${context === "component" ? "" : component}${name}`;

  if (loggedDeprecations.has(key)) {
    return;
  }

  loggedDeprecations.add(key);

  const multiSuggestions = Array.isArray(suggested);

  if (multiSuggestions && !listFormatter) {
    listFormatter = new Intl.ListFormat("en", { style: "long", type: "disjunction" });
  }

  const message = `The [${name}] ${context} is deprecated and will be removed in ${removalVersion === "future" ? `a future version` : `v${removalVersion}`}.${suggested ? ` Use ${multiSuggestions ? listFormatter.format(suggested.map((suggestion) => `"${suggestion}"`)) : `"${suggested}"`} instead.` : ""}`;

  forwardToConsole("warn", component, message);
}
