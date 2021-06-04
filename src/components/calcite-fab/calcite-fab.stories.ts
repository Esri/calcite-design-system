import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  darkBackground,
  filterComponentAttributes
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ICONS } from "./resources";
const { appearance, dir, scale, theme } = ATTRIBUTES;

export default {
  title: "Components/Buttons/FAB",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "appearance",
        commit(): Attribute {
          this.value = select("appearance", appearance.values, appearance.values[2]);
          delete this.build;
          return this;
        }
      },
      {
        name: "dir",
        commit(): Attribute {
          this.value = select("dir", dir.values, dir.defaultValue);
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
          this.value = text("icon", ICONS.plus);
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
          this.value = boolean("text-enabled", true);
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
        name: "theme",
        commit(): Attribute {
          this.value = select("theme", theme.values, theme.defaultValue);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

export const basic = (): string => create("calcite-fab", createAttributes());
export const darkThemeRTL = (): string =>
  create(
    "calcite-fab",
    createAttributes({ exceptions: ["dir", "theme"] }).concat([
      {
        name: "dir",
        value: "rtl"
      },
      {
        name: "theme",
        value: "dark"
      }
    ])
  );
