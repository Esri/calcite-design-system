import { UserConfig } from "vite";

module.exports = {
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-themes",
    "@whitespace/storybook-addon-html",
    "storybook-addon-rtl",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  async viteFinal(config: UserConfig, { configType }) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      assetsInclude: ["**/*.md"],
      define: { "process.env": {} },
    });
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.ts"],
  previewHead: (head: string): string =>
    `
    ${head}
    ${
      process.env.STORYBOOK_SCREENSHOT_TEST_BUILD
        ? `<style>
          :root {
            --calcite-duration-factor: 0;
          }
        </style>`
        : ""
    }
  `,
  managerHead: (head: string): string => {
    if (process.env.STORYBOOK_SCREENSHOT_TEST_BUILD || process.env.STORYBOOK_SCREENSHOT_LOCAL_BUILD) {
      return head;
    }

    return `
      <link rel="stylesheet" href="https://webapps-cdn.esri.com/CDN/fonts/v1.4.1/fonts.css" />
      <link rel="stylesheet" href="./build/calcite.css" />
      <script type="module" src="./build/calcite.esm.js"></script>

      <template id="internalStorybookNotice">
        <calcite-notice
          open
          icon="exclamation-mark-triangle"
          closable
          kind="warning"
          scale="l"
          style="font-family: var(--calcite-font-family)"
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
          () => document.body.prepend(document.getElementById("internalStorybookNotice").content.cloneNode(true)),
          { once: true }
        );
      </script>

      ${head}
    `;
  },
};
