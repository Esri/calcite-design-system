// @ts-strict-ignore
import { LuminaJsx } from "@arcgis/lumina";
import { logLevel } from "./config";

export type LogLevel = "debug" | "info" | "warn" | "error" | "trace" | "off";

type Message = string;
type MajorVersion = number;

type DeprecatedContext = "component" | "property" | "method" | "event" | "slot";

type DeprecatedParams = {
  name: string;
  suggested?: string | string[];
  component?: string;
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
  return logLevels[level] >= logLevels[logLevel];
}

function forwardToConsole(level: LogLevel, ...data: any[]): void {
  if (!willLog(level)) {
    return;
  }

  const badgeTemplate = "%ccalcite";
  const badgeStyle = "background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;";

  // eslint-disable-next-line no-console -- official messaging is managed through this module
  console[level].call(this, badgeTemplate, badgeStyle, ...data);
}

let listFormatter: Intl.ListFormat;

export const logger = {
  debug: (message: Message, ...data: any[]) => forwardToConsole("debug", message, ...data),
  info: (message: Message, ...data: any[]) => forwardToConsole("info", message, ...data),
  warn: (message: Message, ...data: any[]) => forwardToConsole("warn", message, ...data),
  error: (message: Message, ...data: any[]) => forwardToConsole("error", message, ...data),
  trace: (message: Message, ...data: any[]) => forwardToConsole("trace", message, ...data),

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

  const message = `[${name}] ${context} is deprecated and will be removed in ${removalVersion === "future" ? `a future version` : `v${removalVersion}`}.${suggested ? ` Use ${multiSuggestions ? listFormatter.format(suggested.map((suggestion) => `"${suggestion}"`)) : `"${suggested}"`} instead.` : ""}`;

  forwardToConsole("warn", message);
}
