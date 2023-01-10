import { select, text } from "@storybook/addon-knobs";

import { storyFilters } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Avatar",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-avatar
    scale="${select("scale", ["s", "m", "l"], "m")}"
    full-name="${text("full-name", "John Doe")}"
    username="${text("username", "jdoe")}"
    user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
    thumbnail="${text("thumbnail", placeholderImage({ width: 120, height: 120 }))}"
  >
  </calcite-avatar>
`;

export const missingThumbnail = (): string => html`
  <calcite-avatar
    scale="${select("scale", ["s", "m", "l"], "m")}"
    full-name="${text("full-name", "John Doe")}"
    username="${text("username", "jdoe")}"
    user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
  >
  </calcite-avatar>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-avatar
    dir="rtl"
    class="calcite-mode-dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    full-name="${text("full-name", "John Doe")}"
    username="${text("username", "jdoe")}"
    user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
  >
  </calcite-avatar>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
