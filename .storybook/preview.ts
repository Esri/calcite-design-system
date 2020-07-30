import { addDecorator, addParameters } from "@storybook/html";
import centered from "@storybook/addon-centered/html";
import theme from "./theme";
import { titlelessDocsPage } from "./utils";

addDecorator(centered);
addParameters({
  backgrounds: [{ name: "Light", value: "#f8f8f8", default: true }],
  options: {
    theme,
    storySort: (a, b) => {
      const sectionA = a[1].id.split("-")[0];
      const sectionB = b[1].id.split("-")[0];

      return sectionB.localeCompare(sectionA);
    }
  },
  docs: {
    page: titlelessDocsPage,
    extractComponentDescription: (_component, { notes }) => {
      if (notes) {
        if (typeof notes === "string") {
          return notes;
        }

        return Object.keys(notes)
          .map((section) => notes[section])
          .join("\n");
      }

      return null;
    }
  }
});
