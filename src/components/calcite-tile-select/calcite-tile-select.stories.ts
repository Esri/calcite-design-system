import { boolean, select, text } from "@storybook/addon-knobs";
import { iconNames, setKnobs, setTheme } from "../../../.storybook/helpers";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
  themesDarkDefault
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";
import { createSteps, stepStory } from "../../../.storybook/helpers";

export default {
  title: "Components/Tiles/Tile Select",
  parameters: {
    notes: readme
  }
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "checked",
        commit(): Attribute {
          this.value = boolean("checked", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "description",
        commit(): Attribute {
          this.value = text(
            "description",
            "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          );
          delete this.build;
          return this;
        }
      },
      {
        name: "disabled",
        commit(): Attribute {
          this.value = boolean("disabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "heading",
        commit(): Attribute {
          this.value = text("heading", "Tile heading lorem ipsum");
          delete this.build;
          return this;
        }
      },
      {
        name: "hidden",
        commit(): Attribute {
          this.value = boolean("hidden", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "icon",
        commit(): Attribute {
          this.value = select("icon", ["", ...iconNames], "");
          delete this.build;
          return this;
        }
      },
      {
        name: "input-alignment",
        commit(): Attribute {
          this.value = select("input-alignment", ["start", "end"], "start");
          delete this.build;
          return this;
        }
      },
      {
        name: "input-enabled",
        commit(): Attribute {
          this.value = boolean("input-enabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "type",
        commit(): Attribute {
          this.value = select("type", ["radio", "checkbox"], "radio");
          delete this.build;
          return this;
        }
      },
      {
        name: "value",
        commit(): Attribute {
          this.value = text("value", "one");
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

export const Default = stepStory(
  (): string => html`${create("calcite-tile-select", createAttributes())}`,
  createSteps("calcite-tile-select")
    // Input Disabled No Icon
    .snapshot("Input Disabled No Icon")

    // Input Disabled No Icon Hover
    .hover("calcite-tile-select")
    .snapshot("Input Disabled No Icon Hover")

    // Input Disabled No Icon Checked/Focus
    .click("calcite-tile-select")
    .snapshot("Input Disabled No Icon Checked/Focused")
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "checked", value: "false" }]
      })
    )

    // Input Disabled No Icon Dark
    .executeScript(setTheme("dark"))
    .snapshot("Input Disabled No Icon Dark")

    // Input Disabled No Icon Hover Dark
    .hover("calcite-tile-select")
    .snapshot("Input Disabled No Icon Hover Dark")

    // Input Disabled No Icon Checked/Focused Dark
    .click("calcite-tile-select")
    .snapshot("Input Disabled No Icon Focus Dark")
);
