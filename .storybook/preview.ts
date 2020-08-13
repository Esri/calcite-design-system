import { addDecorator, addParameters } from "@storybook/html";
import centered from "@storybook/addon-centered/html";
import theme from "./theme";
import { backgrounds } from "./utils";
import { addons } from "@storybook/addons";

addons.setConfig({
  panelPosition: "bottom",
  theme
});

addDecorator(centered);
addParameters({
  a11y: {
    element: "#root",
    config: {},
    options: {},
    manual: true
  },
  backgrounds: backgrounds,
  options: {
    storySort: (a, b) => {
      const sectionA = a[1].id.split("-")[0];
      const sectionB = b[1].id.split("-")[0];

      return sectionB.localeCompare(sectionA);
    }
  },
  docs: {
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
