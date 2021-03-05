import tailwindcss from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";
import postcss from "postcss";
import defaultConfigStub from "tailwindcss/stubs/defaultConfig.stub";
import merge = require("lodash/merge");

import tailwindConfig from "../../tailwind.config";
import tailwindConfigStub from "./tailwind-config.stub";

const fullConfig = resolveConfig(tailwindConfig);

describe("TailwindCSS config", () => {
  const minifyCss = (str: string): string => {
    return str.replace(/\s/g, "").replace(/;/g, "");
  };

  const generatePluginUtilitiesCSS = (config = {}, css?: string): Promise<string> =>
    postcss(
      tailwindcss(
        merge(
          {
            ...tailwindConfigStub,
            corePlugins: false
          },
          config
        )
      )
    )
      .process(css ?? "@tailwind utilities", { from: undefined })
      .then((result) => minifyCss(result.css));

  it("should match the stubbed theme", () => {
    expect(fullConfig.theme).toEqual(tailwindConfigStub.theme);
  });

  it("should include default config values", () => {
    const defaults = ["target", "important", "presets", "purge", "prefix", "separator"];
    defaults.forEach((prop) => expect(fullConfig[prop]).toEqual(defaultConfigStub[prop]));
  });

  it("should generate correct list of variants and core plugins", () => {
    expect(fullConfig.variants).toEqual(tailwindConfigStub.variants);
    expect(fullConfig.corePlugins).toEqual(tailwindConfigStub.corePlugins);
  });

  describe("CSS custom properties for theming", () => {
    it("should include defined variables for fonts", () => {
      expect(fullConfig.theme.fontFamily.mono).toEqual(`var(--calcite-code-family)`);
      expect(fullConfig.theme.fontFamily.sans).toEqual(`var(--calcite-sans-family)`);
      expect(fullConfig.theme.fontSize["-3"]).toEqual(`var(--calcite-font-size--3)`);
      expect(fullConfig.theme.fontSize["-2"]).toEqual(`var(--calcite-font-size--2)`);
      expect(fullConfig.theme.fontSize["-1"]).toEqual(`var(--calcite-font-size--1)`);
      expect(fullConfig.theme.fontSize[0]).toEqual(`var(--calcite-font-size-0)`);
      expect(fullConfig.theme.fontSize[1]).toEqual(`var(--calcite-font-size-1)`);
      expect(fullConfig.theme.fontSize[2]).toEqual(`var(--calcite-font-size-2)`);
      expect(fullConfig.theme.fontSize[3]).toEqual(`var(--calcite-font-size-3)`);
      expect(fullConfig.theme.fontSize[4]).toEqual(`var(--calcite-font-size-4)`);
      expect(fullConfig.theme.fontSize[5]).toEqual(`var(--calcite-font-size-5)`);
      expect(fullConfig.theme.fontSize[6]).toEqual(`var(--calcite-font-size-6)`);
      expect(fullConfig.theme.fontSize[7]).toEqual(`var(--calcite-font-size-7)`);
      expect(fullConfig.theme.fontSize[8]).toEqual(`var(--calcite-font-size-8)`);
      expect(fullConfig.theme.fontWeight.light).toEqual(`var(--calcite-font-weight-light)`);
      expect(fullConfig.theme.fontWeight.normal).toEqual(`var(--calcite-font-weight-normal)`);
      expect(fullConfig.theme.fontWeight.medium).toEqual(`var(--calcite-font-weight-medium)`);
      expect(fullConfig.theme.fontWeight.bold).toEqual(`var(--calcite-font-weight-bold)`);
    });

    it("should include defined variables for colors", () => {
      expect(fullConfig.theme.colors["brand"]).toEqual(`var(--calcite-ui-brand)`);
      expect(fullConfig.theme.colors["brand-hover"]).toEqual(`var(--calcite-ui-brand-hover)`);
      expect(fullConfig.theme.colors["brand-press"]).toEqual(`var(--calcite-ui-brand-press)`);
      expect(fullConfig.theme.colors.background["background"]).toEqual(`var(--calcite-ui-background)`);
      expect(fullConfig.theme.colors.background["foreground"][1]).toEqual(`var(--calcite-ui-foreground-1)`);
      expect(fullConfig.theme.colors.background["foreground"][2]).toEqual(`var(--calcite-ui-foreground-2)`);
      expect(fullConfig.theme.colors.background["foreground"][3]).toEqual(`var(--calcite-ui-foreground-3)`);
      expect(fullConfig.theme.colors.text[1]).toEqual(`var(--calcite-ui-text-1)`);
      expect(fullConfig.theme.colors.text[2]).toEqual(`var(--calcite-ui-text-2)`);
      expect(fullConfig.theme.colors.text[3]).toEqual(`var(--calcite-ui-text-3)`);
      expect(fullConfig.theme.colors.text["inverse"]).toEqual(`var(--calcite-ui-text-inverse)`);
      expect(fullConfig.theme.colors.text["link"]).toEqual(`var(--calcite-ui-text-link)`);
    });

    it("should include defined variables for border colors", () => {
      expect(fullConfig.theme.borderColor.color[1]).toEqual(`var(--calcite-ui-border-1)`);
      expect(fullConfig.theme.borderColor.color[2]).toEqual(`var(--calcite-ui-border-2)`);
      expect(fullConfig.theme.borderColor.color[3]).toEqual(`var(--calcite-ui-border-3)`);
      expect(fullConfig.theme.borderColor.color["input"]).toEqual(`var(--calcite-ui-border-input)`);
      expect(fullConfig.theme.borderColor["color-info"]).toEqual(`var(--calcite-ui-info)`);
      expect(fullConfig.theme.borderColor["color-success"]).toEqual(`var(--calcite-ui-success)`);
      expect(fullConfig.theme.borderColor["color-warning"]).toEqual(`var(--calcite-ui-warning)`);
      expect(fullConfig.theme.borderColor["color-danger"]).toEqual(`var(--calcite-ui-danger)`);
      expect(fullConfig.theme.borderColor["color-danger-hover"]).toEqual(`var(--calcite-ui-danger-hover)`);
      expect(fullConfig.theme.borderColor["color-danger-press"]).toEqual(`var(--calcite-ui-danger-press)`);
    });
  });

  describe("plugins utilities", () => {
    describe("when using @apply with borderColor utility selectors", () => {
      it("should reference theme's CSS variables", async () => {
        const inputCss = `
          .border-style {
            @apply border-b-color-1
              border-t-color-2
              border-r-color-3
              border-l-color-danger-hover;
          }
        `;
        const outputCss = `
          .border-style {
            border-bottom-color: ${tailwindConfigStub.theme.borderColor.color[1]};
            border-top-color: ${tailwindConfigStub.theme.borderColor.color[2]};
            border-right-color: ${tailwindConfigStub.theme.borderColor.color[3]};
            border-left-color: ${tailwindConfigStub.theme.colors["danger-hover"]};
          }
        `;
        expect(await generatePluginUtilitiesCSS(fullConfig, inputCss)).toEqual(minifyCss(outputCss));
      });
    });
  });
});
