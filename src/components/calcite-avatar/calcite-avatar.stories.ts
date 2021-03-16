import { select, text } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import { html, placeholderImage } from "../../tests/utils";
import readme from "./readme.md";

export default {
  title: "Components/Avatar",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <calcite-avatar
    scale="${select("scale", ["s", "m", "l"], "m")}"
    full-name="${text("full-name", "John Doe")}"
    username="${text("username", "jdoe")}"
    user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
    thumbnail="${text("thumbnail", placeholderImage({ width: 120, height: 120 }))}"
  >
  </calcite-avatar>
`;

export const MissingThumbnail = (): string => html`
  <calcite-avatar
    scale="${select("scale", ["s", "m", "l"], "m")}"
    full-name="${text("full-name", "John Doe")}"
    username="${text("username", "jdoe")}"
    user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
  >
  </calcite-avatar>
`;

MissingThumbnail.story = {
  name: "Missing thumbnail",
  parameters: { backgrounds: darkBackground }
};

export const Dark = (): string => html`
  <calcite-avatar
    theme="dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    full-name="${text("full-name", "John Doe")}"
    username="${text("username", "jdoe")}"
    user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
  >
  </calcite-avatar>
`;

Dark.story = {
  parameters: { backgrounds: darkBackground }
};
