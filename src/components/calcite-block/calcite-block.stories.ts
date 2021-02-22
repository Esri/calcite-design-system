import { boolean, select, text } from "@storybook/addon-knobs";
import { Attribute, Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import blockReadme from "./readme.md";
import sectionReadme from "../calcite-block-section/readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html, placeholderImage } from "../../tests/utils";

export default {
  title: "Components/App/Block",
  parameters: {
    backgrounds: darkBackground,
    notes: {
      block: blockReadme,
      section: sectionReadme
    }
  }
};

const createBlockAttributes: (options?: { except: string[] }) => Attributes = ({ except } = { except: [] }) => {
  const group = "block";
  const { dir, theme } = ATTRIBUTES;

  interface DeferredAttribute {
    name: string;
    commit: () => Attribute;
  }

  return ([
    {
      name: "heading",
      commit(): Attribute {
        this.value = text("heading", "Heading", group);
        delete this.build;
        return this;
      }
    },
    {
      name: "dir",
      commit(): Attribute {
        this.value = select("dir", dir.values, dir.defaultValue, group);
        delete this.build;
        return this;
      }
    },
    {
      name: "summary",
      commit(): Attribute {
        this.value = text("summary", "summary", group);
        delete this.build;
        return this;
      }
    },
    {
      name: "open",
      commit(): Attribute {
        this.value = boolean("open", true, group);
        delete this.build;
        return this;
      }
    },
    {
      name: "collapsible",
      commit(): Attribute {
        this.value = boolean("collapsible", true, group);
        delete this.build;
        return this;
      }
    },
    {
      name: "loading",
      commit(): Attribute {
        this.value = boolean("loading", false, group);
        delete this.build;
        return this;
      }
    },
    {
      name: "disabled",
      commit(): Attribute {
        this.value = boolean("disabled", false, group);
        delete this.build;
        return this;
      }
    },
    {
      name: "theme",
      commit(): Attribute {
        this.value = select("theme", theme.values, theme.defaultValue, group);
        delete this.build;
        return this;
      }
    },
    {
      name: "intl-collapse",
      commit(): Attribute {
        this.value = text("intlCollapse", "Collapse", group);
        delete this.build;
        return this;
      }
    },
    {
      name: "intl-expand",
      commit(): Attribute {
        this.value = text("intlExpand", "Expand", group);
        delete this.build;
        return this;
      }
    }
  ] as DeferredAttribute[])
    .filter((attr) => !except.find((excluded) => excluded === attr.name))
    .map((attr) => attr.commit());
};

const createSectionAttributes: () => Attributes = () => {
  const group = "section (animals)";
  const toggleDisplayOptions = ["button", "switch"];

  return [
    {
      name: "text",
      value: text("text", "Animals", group)
    },
    {
      name: "open",
      value: boolean("open", true, group)
    },
    {
      name: "toggle-display",
      value: select("toggleDisplay", toggleDisplayOptions, toggleDisplayOptions[0], group)
    },
    {
      name: "intl-collapse",
      value: text("intlCollapse", "Collapse", group)
    },
    {
      name: "intl-expand",
      value: text("intlExpand", "Expand", group)
    }
  ];
};

export const basic = (): string =>
  create(
    "calcite-block",
    createBlockAttributes(),
    html`
      ${create(
        "calcite-block-section",
        createSectionAttributes(),
        `<img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />`
      )}

      <calcite-block-section text="Nature" open>
        <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
      </calcite-block-section>
    `
  );

export const withHeaderControl = (): string =>
  create(
    "calcite-block",
    createBlockAttributes({ except: ["open", "collapsible"] }),
    `<label slot="control">test <input placeholder="I'm a header control"/></label>`
  );

export const withIconAndHeader = (): string =>
  create("calcite-block", createBlockAttributes({ except: ["open", "collapsible"] }), `<div slot="icon">✅</div>`);
