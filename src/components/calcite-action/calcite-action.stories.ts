import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";
import { createSteps, stepStory, setTheme, setKnobs } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { alignment, scale } = ATTRIBUTES;

export default {
  title: "Components/Buttons/Action",
  parameters: {
    notes: readme
  }
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "active",
        commit(): Attribute {
          this.value = boolean("active", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "alignment",
        commit(): Attribute {
          this.value = select("alignment", alignment.values, alignment.defaultValue);
          delete this.build;
          return this;
        }
      },
      {
        name: "appearance",
        commit(): Attribute {
          this.value = select("appearance", ["solid", "clear"], "solid");
          delete this.build;
          return this;
        }
      },
      {
        name: "compact",
        commit(): Attribute {
          this.value = boolean("compact", false);
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
        name: "icon",
        commit(): Attribute {
          this.value = text("icon", "beaker");
          delete this.build;
          return this;
        }
      },
      {
        name: "indicator",
        commit(): Attribute {
          this.value = boolean("indicator", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "label",
        commit(): Attribute {
          this.value = text("label", "Label");
          delete this.build;
          return this;
        }
      },
      {
        name: "loading",
        commit(): Attribute {
          this.value = boolean("loading", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "scale",
        commit(): Attribute {
          this.value = select("scale", scale.values, scale.defaultValue);
          delete this.build;
          return this;
        }
      },
      {
        name: "text",
        commit(): Attribute {
          this.value = text("text", "Text");
          delete this.build;
          return this;
        }
      },
      {
        name: "text-enabled",
        commit(): Attribute {
          this.value = boolean("textEnabled", true);
          delete this.build;
          return this;
        }
      },
      {
        name: "style",
        commit(): Attribute {
          this.value = boolean("textEnabled", true);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

const selector = "calcite-action";

export const Default = stepStory(
  (): string => html`<div style="width: 150px">${create("calcite-action", createAttributes())}</div>`,

  createSteps("calcite-action")
    // Default
    .snapshot("Default")
    .hover(selector)
    .snapshot("Default Hover")
    .mouseDown(selector)
    .snapshot("Default Mouse Down")
    .mouseUp(selector)
    .snapshot("Default Mouse Up")

    // Active
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "active", value: "true" }]
      })
    )
    .snapshot("Active")
    .hover(selector)
    .snapshot("Active Hover")
    .mouseDown(selector)
    .snapshot("Active Mouse Down")
    .mouseUp(selector)
    .snapshot("Active Mouse Up")

    // Alignment Center
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "alignment", value: "center" }]
      })
    )
    .snapshot("Alignment Center")

    // Alignment End
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "alignment", value: "end" }]
      })
    )
    .snapshot("Alignment End")

    // Appearance Clear
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "appearance", value: "clear" }]
      })
    )
    .snapshot("Appearance Clear")
    .hover(selector)
    .snapshot("Appearance Clear Hover")
    .mouseDown(selector)
    .snapshot("Appearance Clear Mouse Down")
    .mouseUp(selector)
    .snapshot("Appearance Clear Mouse Up")

    // Compact
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "compact", value: "true" }]
      })
    )
    .snapshot("Compact Alignment Start")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "end" },
          { name: "compact", value: "true" }
        ]
      })
    )
    .snapshot("Compact Alignment End")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "compact", value: "true" },
          { name: "textEnabled", value: "false" }
        ]
      })
    )
    .snapshot("Compact Text Disabled")

    // Dark
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "indicator", value: "true" }]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Dark")
    .hover(selector)
    .snapshot("Dark Hover")
    .mouseDown(selector)
    .snapshot("Dark Mouse Down")
    .mouseUp(selector)
    .snapshot("Dark Mouse Up")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "indicator", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Dark Active")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "disabled", value: "true" },
          { name: "indicator", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("dark"))
    .snapshot("Dark Active Disabled")

    // Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "disabled", value: "true" },
          { name: "indicator", value: "true" }
        ]
      })
    )
    .executeScript(setTheme("light"))
    .snapshot("Disabled Active")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "appearance", value: "solid" },
          { name: "disabled", value: "true" },
          { name: "indicator", value: "true" }
        ]
      })
    )
    .snapshot("Disabled Appearance Solid")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "appearance", value: "clear" },
          { name: "disabled", value: "true" },
          { name: "indicator", value: "true" }
        ]
      })
    )
    .snapshot("Disabled Appearance Clear")

    // Icon
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "icon" }]
      })
    )
    .waitForNotFound("svg")
    .snapshot("No Icon")

    // Indicator
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "indicator", value: "true" }]
      })
    )
    .snapshot("Indicator")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "indicator", value: "true" },
          { name: "textEnabled", value: "false" }
        ]
      })
    )
    .snapshot("Indicator Text Disabled")

    // Loading
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "loading", value: "true" }]
      })
    )
    .snapshot("Loading")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "loading", value: "true" },
          { name: "textEnabled", value: "false" }
        ]
      })
    )
    .snapshot("Loading Text Disabled")

    // RTL
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "alignment", value: "start" }]
      })
    )
    .rtl()
    .snapshot("RTL Alignment Start")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "alignment", value: "center" }]
      })
    )
    .rtl()
    .snapshot("RTL Alignment Center")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "alignment", value: "end" }]
      })
    )
    .rtl()
    .snapshot("RTL Alignment End")

    // RTL Indicator
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "start" },
          { name: "indicator", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Indicator Alignment Start")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "center" },
          { name: "indicator", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Indicator Alignment Center")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "end" },
          { name: "indicator", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Indicator Alignment End")

    // RTL Loading
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "start" },
          { name: "loading", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Loading Alignment Start")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "center" },
          { name: "loading", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Loading Alignment Center")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "end" },
          { name: "loading", value: "true" }
        ]
      })
    )
    .rtl()
    .snapshot("RTL Loading Alignment End")

    // Scale
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "indicator", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .snapshot("Scale Small")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "indicator", value: "true" },
          { name: "scale", value: "s" },
          { name: "textEnabled", value: "false" }
        ]
      })
    )
    .snapshot("Scale Small Text Disabled")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "indicator", value: "true" },
          { name: "scale", value: "l" }
        ]
      })
    )
    .snapshot("Scale Large")
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "indicator", value: "true" },
          { name: "scale", value: "l" },
          { name: "textEnabled", value: "false" }
        ]
      })
    )
    .snapshot("Scale Large Text Disabled")

    // Text
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "text", value: "A long amount of text" }]
      })
    )
    .snapshot("Text Overflow")
);
