import { UserConfig } from "vite";
import { html } from "../support/formatting";

module.exports = {
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs", "@storybook/addon-themes", "storybook-addon-rtl"],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  async viteFinal(config: UserConfig) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      assetsInclude: ["**/*.md"],
      define: { "process.env": {} },
    });
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.ts"],
  staticDirs: ["./static"],
  previewHead: (head: string): string =>
    `
    ${head}
    ${
      process.env.STORYBOOK_SCREENSHOT_TEST_BUILD
        ? html`<style>
            :root {
              --calcite-duration-factor: 0;
            }
          </style>`
        : ""
    }
    ${
      !process.env.STORYBOOK_SCREENSHOT_TEST_BUILD && !process.env.STORYBOOK_SCREENSHOT_LOCAL_BUILD
        ? html`<template id="internalStorybookNotice">
              <calcite-notice
                open
                icon="exclamation-mark-triangle"
                closable
                kind="warning"
                scale="l"
                style="font-family: var(--calcite-font-family); position: fixed; top: 0; width: 100%;"
              >
                <div slot="title">
                  This storybook is on the current @next version and is meant for internal, testing purposes only.
                </div>
                <div slot="link">
                  Please refer to the&#32;<calcite-link
                    title="my action"
                    href="https://developers.arcgis.com/calcite-design-system/components/"
                  >
                    Calcite Components documentation site </calcite-link
                  >&#32;to browse and interact with components.
                </div>
              </calcite-notice>
            </template>

            <script>
              window.addEventListener(
                "load",
                () => document.body.append(document.getElementById("internalStorybookNotice").content.cloneNode(true)),
                { once: true },
              );
            </script> `
        : ""
    }
  `,
};
