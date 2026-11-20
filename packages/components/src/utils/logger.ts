import { LuminaJsx, LitElement } from "@arcgis/lumina";
import { getConfig } from "./config";

export type LogLevel = "debug" | "info" | "warn" | "error" | "trace" | "off";

type Message = string;
type MajorVersion = number;

type DeprecatedContext = "component" | "property" | "method" | "event" | "slot";

type DeprecatedParams = {
  component: LitElement;
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

function willLog(level: LogLevel): level is Exclude<LogLevel, "off"> {
  return level !== "off" && logLevels[level] >= logLevels[getConfig().logLevel];
}

function forwardToConsole(level: LogLevel, ...data: any[]): void {
  if (!willLog(level)) {
    return;
  }

  const badgeTemplate = "%ccalcite";
  const badgeStyle = "background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;";

  // eslint-disable-next-line no-console -- logging is managed through this module
  console[level](badgeTemplate, badgeStyle, ...data);
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
 * Logs a deprecation warning to the logger.
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
  const removalVersionText = removalVersion === "future" ? `a future version` : `v${removalVersion}`;

  if (loggedDeprecations.has(key)) {
    return;
  }

  loggedDeprecations.add(key);

  let message: string = "";
  message =
    context === "component"
      ? `This component is deprecated and will be removed in ${removalVersionText}.`
      : `The [${name}] ${context} is deprecated and will be removed in ${removalVersionText}.`;

  if (suggested) {
    listFormatter = new Intl.ListFormat("en", { style: "long", type: "disjunction" });

    message += ` Use ${listFormatter.format([suggested].flat().map((suggestion) => `"${suggestion}"`))} instead.`;
  }

  const composed = `[${component.el.tagName.toLocaleLowerCase().slice("calcite-".length)}] - ${message}`;
  forwardToConsole("warn", composed);
}
