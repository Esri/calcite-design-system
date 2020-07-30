const glob = require("glob");

// excluding until app components are ready to be shipped
const denyList = [
  "calcite-action",
  "calcite-action-bar",
  "calcite-action-group",
  "calcite-action-pad",
  "calcite-block",
  "calcite-block-section",
  "calcite-fab",
  "calcite-filter",
  "calcite-flow",
  "calcite-flow-item",
  "calcite-handle",
  "calcite-panel",
  "calcite-pick-list",
  "calcite-pick-list-group",
  "calcite-pick-list-item",
  "calcite-shell",
  "calcite-shell-center-row",
  "calcite-shell-panel",
  "calcite-sortable-list",
  "calcite-tip",
  "calcite-tip-group",
  "calcite-tip-manager",
  "calcite-value-list",
  "calcite-value-list-items"
];

const stories = glob
  .sync("./src/**/*.stories.*")
  .filter((file) => !denyList.some((denied) => file.includes(denied)))
  .map((file) => `.${file}`);

module.exports = {
  addons: [
    "@storybook/addon-backgrounds/register",
    "@storybook/addon-knobs/register",
    "@storybook/addon-notes/register-panel",
    "@storybook/addon-a11y/register"
  ],
  presets: ["@storybook/addon-docs/preset"],
  stories
};
