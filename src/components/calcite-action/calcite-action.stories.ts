import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";

export default {
  title: "Components/Buttons/Action",
  parameters: {
    notes: readme
  }
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  const { appearance, scale } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "appearance",
        commit(): Attribute {
          this.value = select("appearance", appearance.values, appearance.defaultValue);
          delete this.build;
          return this;
        }
      },
      {
        name: "active",
        commit(): Attribute {
          this.value = boolean("active", false);
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

export const basic = (): string => create("calcite-action", createAttributes());
export const darkThemeRTL = (): string =>
  create(
    "calcite-action",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      {
        name: "dir",
        value: "rtl"
      },
      {
        name: "class",
        value: "calcite-theme-dark"
      }
    ])
  );
