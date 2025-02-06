import { html } from "../../support/formatting";

const splitButtonProps: [args: string, content: string] = ["", ""];

export const splitButtonTokens = {
  calciteSplitButtonBackgroundColor: "",
  calciteSplitButtonBackgroundColorHover: "",
  calciteSplitButtonBackgroundColorPress: "",
  calciteSplitButtonDividerColor: "",
};

export const splitButton = (props: { kind?: string; appearance?: string }): string => {
  const [splitButtonArgs, content] = Object.entries(props)
    .filter(([key, value]) => key && value && value !== "")
    .reduce(([args, content], [key, value]) => {
      args += `${key}="${value}" `;
      content += `${value} `;
      return [args, content];
    }, splitButtonProps);

  return html`<calcite-split-button ${splitButtonArgs.trim()}>${content.trim()}</calcite-split-button>`;
};

export const splitButtons = html`${splitButton({ appearance: "outline" })} ${splitButton({ kind: "danger" })}`;
