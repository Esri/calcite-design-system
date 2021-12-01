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

const icon = "i2DExplore";
const heading = "Tile heading lorem ipsum";
const description =
  "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.";

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
          this.value = text("description", "");
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
          this.value = text("heading", "");
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
      },
      {
        name: "width",
        commit(): Attribute {
          this.value = select("width", ["auto", "full"], "auto");
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
    // Checked Off
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "false" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .snapshot("Checked Off")

    // Checked On
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .snapshot("Checked On")

    // Description
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "description", value: description }]
      })
    )
    .snapshot("Description")

    // Description With Heading
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "heading", value: heading }
        ]
      })
    )
    .snapshot("Description With Heading")

    // Description With Icon
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "icon", value: icon }
        ]
      })
    )
    .snapshot("Description With Icon")

    // Description With Heading & Icon
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .snapshot("Description With Heading & Icon")

    // Disabled On Input Enabled On Checked Off Radio
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Disabled On Input Enabled On Checked Off Radio")

    // Disabled On Input Enabled On Checked Off Radio Hover
    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked Off Radio Hover")

    // Disabled On Input Enabled On Checked Off Radio Focus
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Disabled On Input Enabled On Checked Off Radio Focus")

    // Disabled On Input Enabled On Checked Off Radio Click
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked Off Radio Click")

    // Disabled On Input Enabled On Checked Off Checkbox
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "type", value: "checkbox" }
        ]
      })
    )
    .snapshot("Disabled On Input Enabled On Checked Off Checkbox")

    // Disabled On Input Enabled On Checked Off Checkbox Hover
    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked Off Checkbox Hover")

    // Disabled On Input Enabled On Checked Off Checkbox Focus
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "type", value: "checkbox" }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Disabled On Input Enabled On Checked Off Checkbox Focus")

    // Disabled On Input Enabled On Checked Off Checkbox Click
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "type", value: "checkbox" }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked Off Checkbox Click")

    // Disabled On Input Enabled On Checked On Radio
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Disabled On Input Enabled On Checked On Radio")

    // Disabled On Input Enabled On Checked On Radio Hover
    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked On Radio Hover")

    // Disabled On Input Enabled On Checked On Radio Focus
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Disabled On Input Enabled On Checked On Radio Focus")

    // Disabled On Input Enabled On Checked On Radio Click
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked On Radio Click")

    // Disabled On Input Enabled On Checked On Checkbox
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "type", value: "checkbox" }
        ]
      })
    )
    .snapshot("Disabled On Input Enabled On Checked On Checkbox")

    // Disabled On Input Enabled On Checked On Checkbox Hover
    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked On Checkbox Hover")

    // Disabled On Input Enabled On Checked On Checkbox Focus
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "type", value: "checkbox" }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Disabled On Input Enabled On Checked On Checkbox Focus")

    // Disabled On Input Enabled On Checked On Checkbox Click
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "type", value: "checkbox" }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked On Checkbox Click")

    // Disabled On Input Enabled Off Checked Off
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .snapshot("Disabled On Input Enabled Off Checked Off")

    // Disabled On Input Enabled Off Checked Off Hover
    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled Off Checked Off Hover")

    // Disabled On Input Enabled Off Checked Off Focus
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Disabled On Input Enabled Off Checked Off Focus")

    // Disabled On Input Enabled Off Checked Off Click
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Disabled On Input Enabled Off Checked Off Click")

    // Disabled On Input Enabled Off Checked On
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .snapshot("Disabled On Input Enabled Off Checked On")

    // Disabled On Input Enabled Off Checked On Hover
    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled Off Checked On Hover")

    // Disabled On Input Enabled Off Checked On Focus
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Disabled On Input Enabled Off Checked On Focus")

    // Disabled On Input Enabled Off Checked On Click
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Disabled On Input Enabled Off Checked On Click")

    // Heading Input Enabled Off
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "heading", value: heading }]
      })
    )
    .snapshot("Heading Input Enabled Off")

    // Heading Input Enabled On
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Heading Input Enabled On")

    // Hidden
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "hidden", value: "true" }]
      })
    )
    .snapshot("Hidden")
);
