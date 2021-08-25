import { themes, globalDocsPage, parseReadme } from "./utils";
import { withDirection } from "storybook-rtl-addon";

declare global {
  interface Window {
    __screener_storybook__: any;
  }
}

const themeBodyClassDecorator = (Story: () => any, context: any) => {
  const themes = context.parameters.themes;

  themes?.list?.forEach((theme: { class: string; name: string }) => {
    document.body.classList.toggle(theme.class, theme.name === themes.default);
  });

  return Story();
};

export const decorators = [withDirection, themeBodyClassDecorator];
export const parameters = {
  a11y: {
    element: "#root",
    config: {},
    options: {},
    manual: false
  },
  themes,
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
};
