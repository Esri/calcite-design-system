import { Build } from "@stencil/core";

export const isBrowser = (): boolean =>
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
  if (!Build.isBrowser && !isBrowser()) {
    return "";
  }

  const uaData = getUserAgentData();

  return uaData?.brands
    ? uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ")
    : navigator.userAgent;
}
