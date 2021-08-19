import { addParameters, addDecorator } from "@storybook/html";
import { themesLightDefault, globalDocsPage, parseReadme } from "./utils";
import { withDirection } from "storybook-rtl-addon";

declare global {
  interface Window {
    __screener_storybook__: any;
  }
}

addDecorator(withDirection);
addParameters({
  a11y: {
    element: "#root",
    config: {},
    options: {},
    manual: false
  },
  themes: themesLightDefault,
  docs: {
    extractComponentDescription: (_component, { notes }) => {
      if (notes) {
        if (typeof notes === "string") {
          return parseReadme(notes);
        }

        const multipleNotes = Array.isArray(notes) ? notes : Object.keys(notes).map((section) => notes[section]);

        return parseReadme(multipleNotes.join("\n"));
      }

      return null;
    },
    page: globalDocsPage
  },
  layout: "centered",
  options: {
    storySort: {
      order: ["Overview", "Components", "App Components"]
    }
  }
});
