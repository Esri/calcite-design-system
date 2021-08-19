import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes
} from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ICONS } from "./resources";
const { scale } = ATTRIBUTES;

export default {
  title: "Components/Buttons/FAB",
  parameters: {
    notes: readme
  }
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "appearance",
        commit(): Attribute {
          this.value = select("appearance", ["solid", "outline"], "outline");
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
      }
    ],
    exceptions
  );
};

export const basic = (): string => create("calcite-fab", createAttributes());
export const darkThemeRTL = (): string =>
  create(
    "calcite-fab",
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
