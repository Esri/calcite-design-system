import { addParameters } from "@storybook/html";
import { backgrounds, globalDocsPage, parseReadme } from "./utils";

addParameters({
  a11y: {
    element: "#root",
    config: {},
    options: {},
    manual: false
  },
  backgrounds,
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
