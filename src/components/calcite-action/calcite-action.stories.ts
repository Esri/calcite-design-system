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
const { alignment, appearance, scale } = ATTRIBUTES;

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
          this.value = select("appearance", appearance.values, appearance.defaultValue);
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
      }
    ],
    exceptions
  );
};

export const Default = stepStory(
  (): string => html`${create("calcite-action", createAttributes())}`,
  createSteps("calcite-action")
    // Default
    .snapshot("Default")

    // Default Dark
    .executeScript(setTheme("dark"))
    .snapshot("Default Dark")

    // Default RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Default RTL")

    // Default Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Default Dark RTL")

    // Active
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({ story: "components-buttons-action--default", knobs: [{ name: "active", value: "true" }] })
    )
    .snapshot("Active")

    // Active Dark
    .executeScript(setTheme("dark"))
    .snapshot("Active Dark")

    // Active RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Active RTL")

    // Active Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Active Dark RTL")

    // Appearance Clear
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "appearance", value: "clear" }]
      })
    )
    .snapshot("Appearance Clear")

    // Appearance Clear Dark
    .executeScript(setTheme("dark"))
    .snapshot("Appearance Clear Dark")

    // Appearance Clear RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Appearance Clear RTL")

    // Appearance Clear Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Appearance Clear Dark RTL")

    // Appearance Outline
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({ story: "components-buttons-action--default", knobs: [{ name: "appearance", value: "outline" }] })
    )
    .snapshot("Appearance Outline")

    // Appearance Outline Dark
    .executeScript(setTheme("dark"))
    .snapshot("Appearance Outline Dark")

    // Appearance Outline RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Appearance Outline RTL")

    // Appearance Outline Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Appearance Outline Dark RTL")

    // Compact
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "compact", value: "true" }]
      })
    )
    .snapshot("Compact")

    // Compact Dark
    .executeScript(setTheme("dark"))
    .snapshot("Compact Dark")

    // Compact RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Compact RTL")

    // Compact Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Compact Dark RTL")

    // Disabled
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "disabled", value: "true" }]
      })
    )
    .snapshot("Disabled")

    // Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Disabled Dark")

    // Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Disabled RTL")

    // Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Disabled Dark RTL")

    // Indicator
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "indicator", value: "true" }]
      })
    )
    .snapshot("Indicator")

    // Indicator Dark
    .executeScript(setTheme("dark"))
    .snapshot("Indicator Dark")
    .executeScript(setTheme("light"))

    // Indicator RTL
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "indicator", value: "true" }]
      })
    )
    .rtl()
    .snapshot("Indicator RTL")

    // Indicator Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Indicator Dark RTL")

    // Loading
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "loading", value: "true" }]
      })
    )
    .snapshot("Loading")

    // Loading Dark
    .executeScript(setTheme("dark"))
    .snapshot("Loading Dark")

    // Loading RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Loading RTL")

    // Loading Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Loading Dark RTL")

    // Scale Small
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "scale", value: "s" }]
      })
    )
    .snapshot("Scale Small")

    // Scale Small Dark
    .executeScript(setTheme("dark"))
    .snapshot("Scale Small Dark")

    // Scale Small RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Scale Small RTL")

    // Scale Small Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Scale Small Dark RTL")

    // Scale Large
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(setKnobs({ story: "components-buttons-action--default", knobs: [{ name: "scale", value: "l" }] }))
    .snapshot("Scale Large")

    // Scale Large Dark
    .executeScript(setTheme("dark"))
    .snapshot("Scale Large Dark")

    // Scale Large RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Scale Large RTL")

    // Scale Large Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Scale Large Dark RTL")

    // Text Not Enabled
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [{ name: "textEnabled", value: "false" }]
      })
    )
    .snapshot("Text Not Enabled")

    // Text Not Enabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Text Not Enabled Dark")

    // Text Not Enabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Text Not Enabled RTL")

    // Text Not Enabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Text Not Enabled Dark RTL")

    // Alignment Center
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "center" },
          { name: "textEnabled", value: "false" }
        ]
      })
    )
    .snapshot("Alignment Center")

    // Alignment Center Dark
    .executeScript(setTheme("dark"))
    .snapshot("Alignment Center Dark")

    // Alignment Center RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Alignment Center RTL")

    // Alignment Center Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Alignment Center Dark RTL")

    // Alignment End
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "end" },
          { name: "textEnabled", value: "false" }
        ]
      })
    )
    .snapshot("Alignment End")

    // Alignment End Dark
    .executeScript(setTheme("dark"))
    .snapshot("Alignment End Dark")

    // Alignment End RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Alignment End RTL")

    // Alignment End Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Alignment End Dark RTL")
);
