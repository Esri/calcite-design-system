import { html } from "../../support/formatting";

const buttonProps: [args: string, content: string] = ["", ""];

export const button = (props: { kind?: string; appearance?: string }): string => {
  const [buttonArgs, content] = Object.entries(props)
    .filter(([key, value]) => key && value && value !== "")
    .reduce(([args, content], [key, value]) => {
      args += `${key}="${value}" `;
      content += `${value} `;
      return [args, content];
    }, buttonProps);

  return html`<calcite-button ${buttonArgs.trim()}>${content.trim()}</calcite-button>`;
};

export const buttons = html`${button({ appearance: "outline" })} ${button({ kind: "danger" })}`;
