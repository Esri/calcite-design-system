import { html } from "../../support/formatting";

export const button = (args: { kind?: string; appearance?: string }): string =>
  html`<calcite-button
    ${Object.entries(args)
      .map((arg) => arg && `${arg[0]}="${arg[1]}"`)
      .filter((a) => a)
      .join(" ")}
    >${Object.entries(args)
      .map((arg) => arg && `${arg[1]}`)
      .filter((a) => a)
      .join(" ")}</calcite-button
  >`;

export const buttons = html`${button({ appearance: "outline" })} ${button({ kind: "danger" })}`;
