//import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
//import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Sheet",
  parameters: {
    notes: readme,
    chromatic: {
      delay: 500,
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html` <calcite-sheet ${boolean("open", true)}> todo </calcite-sheet> `;
