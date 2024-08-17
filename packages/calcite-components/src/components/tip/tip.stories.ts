import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";
import { Tip } from "./tip";

type TipStoryArgs = Pick<Tip, "closed" | "closeDisabled" | "heading">;

export default {
  title: "Components/Tips/Tip",
  args: {
    closed: false,
    closeDisabled: false,
    heading: "My Tip",
  },
};

const htmlContent = `<img slot="thumbnail" src="${placeholderImage({
  width: 1000,
  height: 600,
})}" alt="This is an image." />Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non. Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti consectetur. Non porttitor tempor orci dictumst magna porta vitae. </div><a href="http://www.esri.com">This is a link</a>.`;

export const simple = (args: TipStoryArgs): string => html`
  <calcite-tip
    ${boolean("closed", args.closed)}
    ${boolean("close-disabled", args.closeDisabled)}
    heading="${args.heading}"
  >
    ${htmlContent}
  </calcite-tip>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-tip heading="My Tip" dir="rtl" class="calcite-mode-dark">${htmlContent}</calcite-tip>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
