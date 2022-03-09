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
import { html } from "../../../support/formatting";
import { createSteps, stepStory, toggleCentered } from "../../../.storybook/helpers";

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

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "description", value: description }]
      })
    )
    .snapshot("Description")

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

    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked Off Radio Hover")

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

    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked Off Checkbox Hover")

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

    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked On Radio Hover")

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

    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled On Checked On Checkbox Hover")

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

    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled Off Checked Off Hover")

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

    .hover("calcite-tile-select")
    .snapshot("Disabled On Input Enabled Off Checked On Hover")

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

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "heading", value: heading }]
      })
    )
    .snapshot("Heading Input Enabled Off")

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

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "hidden", value: "true" }]
      })
    )
    .snapshot("Hidden")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "icon", value: icon }
        ]
      })
    )
    .snapshot("Icon Input Enabled Off With Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Alignment End Input Enabled On Icon")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Alignment End Input Enabled On Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Alignment End Input Enabled On Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Alignment End Input Enabled On Icon + Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "icon", value: icon },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Alignment End Input Enabled On Icon + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Alignment End Input Enabled On Icon + Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Alignment End Input Enabled On Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Enabled On Icon")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Enabled On Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Enabled On Icon + Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Enabled On Icon + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Enabled On Icon + Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "heading", value: heading },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Input Enabled On Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "icon", value: icon }]
      })
    )
    .snapshot("Input Enabled Off Icon")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "description", value: description }]
      })
    )
    .snapshot("Input Enabled Off Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "icon", value: icon }
        ]
      })
    )
    .snapshot("Input Enabled Off Icon + Description")

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
    .snapshot("Input Enabled Off Icon + Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "heading", value: heading }
        ]
      })
    )
    .snapshot("Input Enabled Off Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "icon", value: icon }]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled Off Icon")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "heading", value: heading }]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled Off Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [{ name: "description", value: description }]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled Off Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled Off Icon + Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "description", value: description }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled Off Icon + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled Off Icon + Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled Off Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Icon")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Icon + Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Icon + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Icon + Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Input Alignment End Icon")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Input Alignment End Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Input Alignment End Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Input Alignment End Icon + Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "description", value: description },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Input Alignment End Icon + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Input Alignment End Icon + Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-alignment", value: "end" },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Input Enabled On Input Alignment End Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Theme Light Input Enabled On Checked On")

    .hover("calcite-tile-select")
    .snapshot("Theme Light Input Enabled On Checked On Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Light Input Enabled On Checked On Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Theme Light Input Enabled On Checked On Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .snapshot("Theme Light Input Enabled On Checked Off")

    .hover("calcite-tile-select")
    .snapshot("Theme Light Input Enabled On Checked Off Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Light Input Enabled On Checked Off Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Theme Light Input Enabled On Checked Off Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .snapshot("Theme Light Input Enabled Off Checked On")

    .hover("calcite-tile-select")
    .snapshot("Theme Light Input Enabled Off Checked On Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Light Input Enabled Off Checked On Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Theme Light Input Enabled Off Checked On Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .snapshot("Theme Light Input Enabled Off Checked Off")

    .hover("calcite-tile-select")
    .snapshot("Theme Light Input Enabled Off Checked Off Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Light Input Enabled Off Checked Off Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .click("calcite-tile-select")
    .snapshot("Theme Light Input Enabled Off Checked Off Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Theme Dark Input Enabled On Checked On")

    .hover("calcite-tile-select")
    .snapshot("Theme Dark Input Enabled On Checked On Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Dark Input Enabled On Checked On Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .click("calcite-tile-select")
    .snapshot("Theme Dark Input Enabled On Checked On Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Theme Dark Input Enabled On Checked Off")

    .hover("calcite-tile-select")
    .snapshot("Theme Dark Input Enabled On Checked Off Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Dark Input Enabled On Checked Off Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .click("calcite-tile-select")
    .snapshot("Theme Dark Input Enabled On Checked Off Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Theme Dark Input Enabled Off Checked On")

    .hover("calcite-tile-select")
    .snapshot("Theme Dark Input Enabled Off Checked On Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Dark Input Enabled Off Checked On Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .click("calcite-tile-select")
    .snapshot("Theme Dark Input Enabled Off Checked On Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Theme Dark Input Enabled Off Checked Off")

    .hover("calcite-tile-select")
    .snapshot("Theme Dark Input Enabled Off Checked Off Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Dark Input Enabled Off Checked Off Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .click("calcite-tile-select")
    .snapshot("Theme Dark Input Enabled Off Checked Off Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Theme Dark Disabled Input Enabled On Checked On")

    .hover("calcite-tile-select")
    .snapshot("Theme Dark Disabled Input Enabled On Checked On Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Dark Disabled Input Enabled On Checked On Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .click("calcite-tile-select")
    .snapshot("Theme Dark Disabled Input Enabled On Checked On Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Theme Dark Disabled Input Enabled On Checked Off")

    .hover("calcite-tile-select")
    .snapshot("Theme Dark Disabled Input Enabled On Checked Off Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Dark Disabled Input Enabled On Checked Off Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "input-enabled", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .click("calcite-tile-select")
    .snapshot("Theme Dark Disabled Input Enabled On Checked Off Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Theme Dark Disabled Input Enabled Off Checked On")

    .hover("calcite-tile-select")
    .snapshot("Theme Dark Disabled Input Enabled Off Checked On Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Dark Disabled Input Enabled Off Checked On Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "checked", value: "true" },
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .click("calcite-tile-select")
    .snapshot("Theme Dark Disabled Input Enabled Off Checked On Click")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Theme Dark Disabled Input Enabled Off Checked Off")

    .hover("calcite-tile-select")
    .snapshot("Theme Dark Disabled Input Enabled Off Checked Off Hover")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .executeScript(`document.querySelector("calcite-tile-select").setFocus()`)
    .snapshot("Theme Dark Disabled Input Enabled Off Checked Off Focus")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "disabled", value: "true" },
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .click("calcite-tile-select")
    .snapshot("Theme Dark Disabled Input Enabled Off Checked Off Click")
);

export const WidthFull = stepStory(
  (): string => html`${create("calcite-tile-select", createAttributes())}`,
  createSteps("calcite-tile-select")
    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Icon")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Icon + Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "description", value: description },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Icon + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Icon + Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Input Enabled Icon")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "input-enabled", value: "true" },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Input Enabled Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "input-enabled", value: "true" },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Input Enabled Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Input Enabled Icon + Heading")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "description", value: description },
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Input Enabled Icon + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "icon", value: icon },
          { name: "input-enabled", value: "true" },
          { name: "heading", value: heading },
          { name: "description", value: description },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Input Enabled Icon + Heading + Description")

    .executeScript(
      setKnobs({
        story: "components-tiles-tile-select--default",
        knobs: [
          { name: "heading", value: heading },
          { name: "input-enabled", value: "true" },
          { name: "description", value: description },
          { name: "width", value: "full" }
        ]
      })
    )
    .executeScript(toggleCentered)
    .snapshot("Input Enabled Heading + Description")
);
