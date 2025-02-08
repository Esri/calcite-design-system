import { isServer } from "lit-html/is-server.js";

export const isBrowser = (): boolean =>
  !isServer &&
  typeof navigator !== "undefined" &&
  typeof window !== "undefined" &&
  typeof location !== "undefined" &&
  typeof document !== "undefined" &&
  window.location === location &&
  window.document === document;

interface NavigatorUAData {
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
  platform: string;
}

function getUserAgentData(): NavigatorUAData | undefined {
  return (navigator as any).userAgentData;
}

export function getUserAgentString(): string {
  if (!isBrowser()) {
    return "";
  }

  const uaData = getUserAgentData();

  return uaData?.brands
    ? uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ")
    : navigator.userAgent;
}
