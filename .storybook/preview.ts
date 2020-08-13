import { addDecorator, addParameters } from "@storybook/html";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import centered from "@storybook/addon-centered/html";
import theme from "./theme";
import { titlelessDocsPage } from "./utils";

addDecorator(withKnobs);
addDecorator(withA11y);
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
