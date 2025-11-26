// @ts-strict-ignore
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

function willLog(level: LogLevel): boolean {
  return logLevels[level] >= logLevels[getConfig().logLevel];
}

function forwardToConsole(level: LogLevel, ...data: any[]): void {
  if (!willLog(level)) {
    return;
  }

  const badgeTemplate = "%ccalcite";
  const badgeStyle = "background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;";

  console[level].call(this, badgeTemplate, badgeStyle, ...data);
}

let listFormatter: Intl.ListFormat;

export const logger = {
  debug: (message: Message) => forwardToConsole("debug", message),
  info: (message: Message) => forwardToConsole("info", message),
  warn: (message: Message) => forwardToConsole("warn", message),
  error: (message: Message) => forwardToConsole("error", message),
  trace: (message: Message) => forwardToConsole("trace", message),

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

    message += ` Use ${listFormatter.format([].concat(suggested).map((suggestion) => `"${suggestion}"`))} instead.`;
  }

  const composed = `[${component.el.tagName.toLocaleLowerCase().slice("calcite-".length)}] - ${message}`;
  forwardToConsole("warn", composed);
}
