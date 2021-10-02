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

export const Default = stepStory(
  (): string => html`<div style="width: 150px">${create("calcite-action", createAttributes())}</div>`,

  createSteps("calcite-action")
    // Small Alignment Start
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "start" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .snapshot("Small Alignment Start")

    // Small Alignment Start Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Dark")

    // Small Alignment Start RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Start RTL")

    // Small Alignment Start Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Dark RTL")

    // Small Alignment Start Active
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "start" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .snapshot("Small Alignment Start Active")

    // Small Alignment Start Active Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Active Dark")

    // Small Alignment Start Active RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Start Active RTL")

    // Small Alignment Start Active Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Active Dark RTL")

    // Small Alignment Start Active Compact
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "start" },
          { name: "compact", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .snapshot("Small Alignment Start Active Compact")

    // Small Alignment Start Active Compact Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Active Compact Dark")

    // Small Alignment Start Active Compact RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Start Active Compact RTL")

    // Small Alignment Start Active Compact Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Active Compact Dark RTL")

    // Small Alignment Start Active Compact Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "start" },
          { name: "compact", value: "true" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .snapshot("Small Alignment Start Active Compact Disabled")

    // Small Alignment Start Active Compact Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Active Compact Disabled Dark")

    // Small Alignment Start Active Compact Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Start Active Compact Disabled RTL")

    // Small Alignment Start Active Compact Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Active Compact Disabled Dark RTL")

    // Small Alignment Start Active Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "start" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .snapshot("Small Alignment Start Active Disabled")

    // Small Alignment Start Active Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Active Disabled Dark")

    // Small Alignment Start Active Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Start Active Disabled RTL")

    // Small Alignment Start Active Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Active Disabled Dark RTL")

    // Small Alignment Start Compact
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "start" },
          { name: "compact", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Start Compact")

    // Small Alignment Start Compact Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Compact Dark")

    // Small Alignment Start Compact RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Start Compact RTL")

    // Small Alignment Start Compact Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Compact Dark RTL")

    // Small Alignment Start Compact Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "start" },
          { name: "compact", value: "true" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Start Compact Disabled")

    // Small Alignment Start Compact Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Compact Disabled Dark")

    // Small Alignment Start Compact Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Start Compact Disabled RTL")

    // Small Alignment Start Compact Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Compact Disabled Dark RTL")

    // Small Alignment Start Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "start" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Start Disabled")

    // Small Alignment Start Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Disabled Dark")

    // Small Alignment Start Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Start Disabled RTL")

    // Small Alignment Start Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Start Disabled Dark RTL")

    // Small Alignment Center
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "center" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Center")

    // Small Alignment Center Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Dark")

    // Small Alignment Center RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Center RTL")

    // Small Alignment Center Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Dark RTL")

    // Small Alignment Center Active
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "center" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Center Active")

    // Small Alignment Center Active Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Active Dark")

    // Small Alignment Center Active RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Center Active RTL")

    // Small Alignment Center Active Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Active Dark RTL")

    // Small Alignment Center Active Compact
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "center" },
          { name: "compact", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Center Active Compact")

    // Small Alignment Center Active Compact Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Active Compact Dark")

    // Small Alignment Center Active Compact RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Center Active Compact RTL")

    // Small Alignment Center Active Compact Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Active Compact Dark RTL")

    // Small Alignment Center Active Compact Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "center" },
          { name: "compact", value: "true" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Center Active Compact Disabled")

    // Small Alignment Center Active Compact Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Active Compact Disabled Dark")

    // Small Alignment Center Active Compact Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Center Active Compact Disabled RTL")

    // Small Alignment Center Active Compact Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Active Compact Disabled Dark RTL")

    // Small Alignment Center Active Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "center" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Center Active Disabled")

    // Small Alignment Center Active Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Active Disabled Dark")

    // Small Alignment Center Active Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Center Active Disabled RTL")

    // Small Alignment Center Active Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Active Disabled Dark RTL")

    // Small Alignment Center Compact
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "center" },
          { name: "compact", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Center Compact")

    // Small Alignment Center Compact Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Compact Dark")

    // Small Alignment Center Compact RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Center Compact RTL")

    // Small Alignment Center Compact Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Compact Dark RTL")

    // Small Alignment Center Compact Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "center" },
          { name: "compact", value: "true" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Center Compact Disabled")

    // Small Alignment Center Compact Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Compact Disabled Dark")

    // Small Alignment Center Compact Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Center Compact Disabled RTL")

    // Small Alignment Center Compact Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Compact Disabled Dark RTL")

    // Small Alignment Center Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "center" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment Center Disabled")

    // Small Alignment Center Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Disabled Dark")

    // Small Alignment Center Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment Center Disabled RTL")

    // Small Alignment Center Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment Center Disabled Dark RTL")

    // Small Alignment End
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "end" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment End")

    // Small Alignment End Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Dark")

    // Small Alignment End RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment End RTL")

    // Small Alignment End Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Dark RTL")

    // Small Alignment End Active
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "end" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment End Active")

    // Small Alignment End Active Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Active Dark")

    // Small Alignment End Active RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment End Active RTL")

    // Small Alignment End Active Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Active Dark RTL")

    // Small Alignment End Active Compact
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "end" },
          { name: "compact", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment End Active Compact")

    // Small Alignment End Active Compact Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Active Compact Dark")

    // Small Alignment End Active Compact RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment End Active Compact RTL")

    // Small Alignment End Active Compact Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Active Compact Dark RTL")

    // Small Alignment End Active Compact Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "end" },
          { name: "compact", value: "true" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment End Active Compact Disabled")

    // Small Alignment End Active Compact Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Active Compact Disabled Dark")

    // Small Alignment End Active Compact Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment End Active Compact Disabled RTL")

    // Small Alignment End Active Compact Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Active Compact Disabled Dark RTL")

    // Small Alignment End Active Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "active", value: "true" },
          { name: "alignment", value: "end" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment End Active Disabled")

    // Small Alignment End Active Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Active Disabled Dark")

    // Small Alignment End Active Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment End Active Disabled RTL")

    // Small Alignment End Active Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Active Disabled Dark RTL")

    // Small Alignment End Compact
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "end" },
          { name: "compact", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment End Compact")

    // Small Alignment End Compact Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Compact Dark")

    // Small Alignment End Compact RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment End Compact RTL")

    // Small Alignment End Compact Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Compact Dark RTL")

    // Small Alignment End Compact Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "end" },
          { name: "compact", value: "true" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment End Compact Disabled")

    // Small Alignment End Compact Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Compact Disabled Dark")

    // Small Alignment End Compact Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment End Compact Disabled RTL")

    // Small Alignment End Compact Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Compact Disabled Dark RTL")

    // Small Alignment End Disabled
    .executeScript(
      setKnobs({
        story: "components-buttons-action--default",
        knobs: [
          { name: "alignment", value: "end" },
          { name: "disabled", value: "true" },
          { name: "scale", value: "s" }
        ]
      })
    )
    .ltr()
    .snapshot("Small Alignment End Disabled")

    // Small Alignment End Disabled Dark
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Disabled Dark")

    // Small Alignment End Disabled RTL
    .rtl()
    .executeScript(setTheme("light"))
    .snapshot("Small Alignment End Disabled RTL")

    // Small Alignment End Disabled Dark RTL
    .executeScript(setTheme("dark"))
    .snapshot("Small Alignment End Disabled Dark RTL")

  // // Medium Alignment Start
  // .executeScript(
  //   setKnobs({ story: "components-buttons-action--default", knobs: [{ name: "alignment", value: "start" }, { name: "scale", value: "m" }] })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Start")

  // // Medium Alignment Start Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Dark")

  // // Medium Alignment Start RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Start RTL")

  // // Medium Alignment Start Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Dark RTL")

  // // Medium Alignment Start Active
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "start" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Start Active")

  // // Medium Alignment Start Active Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Active Dark")

  // // Medium Alignment Start Active RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Start Active RTL")

  // // Medium Alignment Start Active Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Active Dark RTL")

  // // Medium Alignment Start Active Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "start" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Start Active Compact")

  // // Medium Alignment Start Active Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Active Compact Dark")

  // // Medium Alignment Start Active Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Start Active Compact RTL")

  // // Medium Alignment Start Active Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Active Compact Dark RTL")

  // // Medium Alignment Start Active Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "start" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Start Active Compact Disabled")

  // // Medium Alignment Start Active Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Active Compact Disabled Dark")

  // // Medium Alignment Start Active Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Start Active Compact Disabled RTL")

  // // Medium Alignment Start Active Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Active Compact Disabled Dark RTL")

  // // Medium Alignment Start Active Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "start" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Start Active Disabled")

  // // Medium Alignment Start Active Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Active Disabled Dark")

  // // Medium Alignment Start Active Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Start Active Disabled RTL")

  // // Medium Alignment Start Active Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Active Disabled Dark RTL")

  // // Medium Alignment Start Compact
  // .executeScript(
  //   setKnobs({ story: "components-buttons-action--default", knobs: [{ name: "alignment", value: "start" }, { name: "compact", value: "true" }, { name: "scale", value: "m" }] })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Start Compact")

  // // Medium Alignment Start Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Compact Dark")

  // // Medium Alignment Start Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Start Compact RTL")

  // // Medium Alignment Start Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Compact Dark RTL")

  // // Medium Alignment Start Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "start" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Start Compact Disabled")

  // // Medium Alignment Start Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Compact Disabled Dark")

  // // Medium Alignment Start Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Start Compact Disabled RTL")

  // // Medium Alignment Start Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Compact Disabled Dark RTL")

  // // Medium Alignment Start Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "start" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Start Disabled")

  // // Medium Alignment Start Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Disabled Dark")

  // // Medium Alignment Start Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Start Disabled RTL")

  // // Medium Alignment Start Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Start Disabled Dark RTL")

  // // Medium Alignment Center
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "center" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Center")

  // // Medium Alignment Center Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Dark")

  // // Medium Alignment Center RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Center RTL")

  // // Medium Alignment Center Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Dark RTL")

  // // Medium Alignment Center Active
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "center" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Center Active")

  // // Medium Alignment Center Active Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Active Dark")

  // // Medium Alignment Center Active RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Center Active RTL")

  // // Medium Alignment Center Active Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Active Dark RTL")

  // // Medium Alignment Center Active Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "center" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Center Active Compact")

  // // Medium Alignment Center Active Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Active Compact Dark")

  // // Medium Alignment Center Active Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Center Active Compact RTL")

  // // Medium Alignment Center Active Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Active Compact Dark RTL")

  // // Medium Alignment Center Active Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "center" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Center Active Compact Disabled")

  // // Medium Alignment Center Active Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Active Compact Disabled Dark")

  // // Medium Alignment Center Active Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Center Active Compact Disabled RTL")

  // // Medium Alignment Center Active Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Active Compact Disabled Dark RTL")

  // // Medium Alignment Center Active Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "center" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Center Active Disabled")

  // // Medium Alignment Center Active Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Active Disabled Dark")

  // // Medium Alignment Center Active Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Center Active Disabled RTL")

  // // Medium Alignment Center Active Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Active Disabled Dark RTL")

  // // Medium Alignment Center Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "center" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Center Compact")

  // // Medium Alignment Center Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Compact Dark")

  // // Medium Alignment Center Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Center Compact RTL")

  // // Medium Alignment Center Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Compact Dark RTL")

  // // Medium Alignment Center Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "center" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Center Compact Disabled")

  // // Medium Alignment Center Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Compact Disabled Dark")

  // // Medium Alignment Center Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Center Compact Disabled RTL")

  // // Medium Alignment Center Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Compact Disabled Dark RTL")

  // // Medium Alignment Center Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "center" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment Center Disabled")

  // // Medium Alignment Center Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Disabled Dark")

  // // Medium Alignment Center Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment Center Disabled RTL")

  // // Medium Alignment Center Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment Center Disabled Dark RTL")

  // // Medium Alignment End
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "end" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment End")

  // // Medium Alignment End Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Dark")

  // // Medium Alignment End RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment End RTL")

  // // Medium Alignment End Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Dark RTL")

  // // Medium Alignment End Active
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "end" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment End Active")

  // // Medium Alignment End Active Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Active Dark")

  // // Medium Alignment End Active RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment End Active RTL")

  // // Medium Alignment End Active Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Active Dark RTL")

  // // Medium Alignment End Active Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "end" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment End Active Compact")

  // // Medium Alignment End Active Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Active Compact Dark")

  // // Medium Alignment End Active Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment End Active Compact RTL")

  // // Medium Alignment End Active Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Active Compact Dark RTL")

  // // Medium Alignment End Active Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "end" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment End Active Compact Disabled")

  // // Medium Alignment End Active Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Active Compact Disabled Dark")

  // // Medium Alignment End Active Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment End Active Compact Disabled RTL")

  // // Medium Alignment End Active Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Active Compact Disabled Dark RTL")

  // // Medium Alignment End Active Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "end" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment End Active Disabled")

  // // Medium Alignment End Active Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Active Disabled Dark")

  // // Medium Alignment End Active Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment End Active Disabled RTL")

  // // Medium Alignment End Active Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Active Disabled Dark RTL")

  // // Medium Alignment End Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "end" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment End Compact")

  // // Medium Alignment End Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Compact Dark")

  // // Medium Alignment End Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment End Compact RTL")

  // // Medium Alignment End Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Compact Dark RTL")

  // // Medium Alignment End Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "end" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment End Compact Disabled")

  // // Medium Alignment End Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Compact Disabled Dark")

  // // Medium Alignment End Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment End Compact Disabled RTL")

  // // Medium Alignment End Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Compact Disabled Dark RTL")

  // // Medium Alignment End Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "end" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "m" }
  //     ]
  //   })
  // )
  // .ltr()
  // .snapshot("Medium Alignment End Disabled")

  // // Medium Alignment End Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Disabled Dark")

  // // Medium Alignment End Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Medium Alignment End Disabled RTL")

  // // Medium Alignment End Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Medium Alignment End Disabled Dark RTL")

  // // Large Alignment Start
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "start" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Start")

  // // Large Alignment Start Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Dark")

  // // Large Alignment Start RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Start RTL")

  // // Large Alignment Start Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Dark RTL")

  // // Large Alignment Start Active
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "start" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Start Active")

  // // Large Alignment Start Active Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Active Dark")

  // // Large Alignment Start Active RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Start Active RTL")

  // // Large Alignment Start Active Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Active Dark RTL")

  // // Large Alignment Start Active Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "start" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Start Active Compact")

  // // Large Alignment Start Active Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Active Compact Dark")

  // // Large Alignment Start Active Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Start Active Compact RTL")

  // // Large Alignment Start Active Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Active Compact Dark RTL")

  // // Large Alignment Start Active Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "start" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Start Active Compact Disabled")

  // // Large Alignment Start Active Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Active Compact Disabled Dark")

  // // Large Alignment Start Active Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Start Active Compact Disabled RTL")

  // // Large Alignment Start Active Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Active Compact Disabled Dark RTL")

  // // Large Alignment Start Active Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "start" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Start Active Disabled")

  // // Large Alignment Start Active Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Active Disabled Dark")

  // // Large Alignment Start Active Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Start Active Disabled RTL")

  // // Large Alignment Start Active Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Active Disabled Dark RTL")

  // // Large Alignment Start Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "start" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Start Compact")

  // // Large Alignment Start Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Compact Dark")

  // // Large Alignment Start Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Start Compact RTL")

  // // Large Alignment Start Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Compact Dark RTL")

  // // Large Alignment Start Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "start" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Start Compact Disabled")

  // // Large Alignment Start Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Compact Disabled Dark")

  // // Large Alignment Start Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Start Compact Disabled RTL")

  // // Large Alignment Start Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Compact Disabled Dark RTL")

  // // Large Alignment Start Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "start" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Start Disabled")

  // // Large Alignment Start Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Disabled Dark")

  // // Large Alignment Start Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Start Disabled RTL")

  // // Large Alignment Start Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Start Disabled Dark RTL")

  // // Large Alignment Center
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "center" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Center")

  // // Large Alignment Center Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Dark")

  // // Large Alignment Center RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Center RTL")

  // // Large Alignment Center Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Dark RTL")

  // // Large Alignment Center Active
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "center" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Center Active")

  // // Large Alignment Center Active Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Active Dark")

  // // Large Alignment Center Active RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Center Active RTL")

  // // Large Alignment Center Active Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Active Dark RTL")

  // // Large Alignment Center Active Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "center" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Center Active Compact")

  // // Large Alignment Center Active Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Active Compact Dark")

  // // Large Alignment Center Active Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Center Active Compact RTL")

  // // Large Alignment Center Active Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Active Compact Dark RTL")

  // // Large Alignment Center Active Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "center" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Center Active Compact Disabled")

  // // Large Alignment Center Active Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Active Compact Disabled Dark")

  // // Large Alignment Center Active Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Center Active Compact Disabled RTL")

  // // Large Alignment Center Active Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Active Compact Disabled Dark RTL")

  // // Large Alignment Center Active Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "center" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Center Active Disabled")

  // // Large Alignment Center Active Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Active Disabled Dark")

  // // Large Alignment Center Active Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Center Active Disabled RTL")

  // // Large Alignment Center Active Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Active Disabled Dark RTL")

  // // Large Alignment Center Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "center" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Center Compact")

  // // Large Alignment Center Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Compact Dark")

  // // Large Alignment Center Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Center Compact RTL")

  // // Large Alignment Center Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Compact Dark RTL")

  // // Large Alignment Center Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "center" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Center Compact Disabled")

  // // Large Alignment Center Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Compact Disabled Dark")

  // // Large Alignment Center Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Center Compact Disabled RTL")

  // // Large Alignment Center Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Compact Disabled Dark RTL")

  // // Large Alignment Center Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "center" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment Center Disabled")

  // // Large Alignment Center Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Disabled Dark")

  // // Large Alignment Center Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment Center Disabled RTL")

  // // Large Alignment Center Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment Center Disabled Dark RTL")

  // // Large Alignment End
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "end" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment End")

  // // Large Alignment End Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Dark")

  // // Large Alignment End RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment End RTL")

  // // Large Alignment End Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Dark RTL")

  // // Large Alignment End Active
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "end" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment End Active")

  // // Large Alignment End Active Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Active Dark")

  // // Large Alignment End Active RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment End Active RTL")

  // // Large Alignment End Active Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Active Dark RTL")

  // // Large Alignment End Active Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "end" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment End Active Compact")

  // // Large Alignment End Active Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Active Compact Dark")

  // // Large Alignment End Active Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment End Active Compact RTL")

  // // Large Alignment End Active Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Active Compact Dark RTL")

  // // Large Alignment End Active Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "end" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment End Active Compact Disabled")

  // // Large Alignment End Active Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Active Compact Disabled Dark")

  // // Large Alignment End Active Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment End Active Compact Disabled RTL")

  // // Large Alignment End Active Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Active Compact Disabled Dark RTL")

  // // Large Alignment End Active Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "active", value: "true" },
  //       { name: "alignment", value: "end" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment End Active Disabled")

  // // Large Alignment End Active Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Active Disabled Dark")

  // // Large Alignment End Active Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment End Active Disabled RTL")

  // // Large Alignment End Active Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Active Disabled Dark RTL")

  // // Large Alignment End Compact
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "end" },
  //       { name: "compact", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment End Compact")

  // // Large Alignment End Compact Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Compact Dark")

  // // Large Alignment End Compact RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment End Compact RTL")

  // // Large Alignment End Compact Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Compact Dark RTL")

  // // Large Alignment End Compact Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "end" },
  //       { name: "compact", value: "true" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment End Compact Disabled")

  // // Large Alignment End Compact Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Compact Disabled Dark")

  // // Large Alignment End Compact Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment End Compact Disabled RTL")

  // // Large Alignment End Compact Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Compact Disabled Dark RTL")

  // // Large Alignment End Disabled
  // .executeScript(
  //   setKnobs({
  //     story: "components-buttons-action--default",
  //     knobs: [
  //       { name: "alignment", value: "end" },
  //       { name: "disabled", value: "true" },
  //       { name: "scale", value: "l" }
  //     ]
  //   })
  // )
  // .snapshot("Large Alignment End Disabled")

  // // Large Alignment End Disabled Dark
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Disabled Dark")

  // // Large Alignment End Disabled RTL
  // .rtl()
  // .executeScript(setTheme("light"))
  // .snapshot("Large Alignment End Disabled RTL")

  // // Large Alignment End Disabled Dark RTL
  // .executeScript(setTheme("dark"))
  // .snapshot("Large Alignment End Disabled Dark RTL")
);
