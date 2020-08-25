import { storiesOf } from "@storybook/html";
import { text, select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import * as icons from "../../../node_modules/@esri/calcite-ui-icons";
import readme from "./readme.md";

// we can get all unique icon names from all size 16 non-filled icons.
const iconNames = Object.keys(icons)
  .filter((iconName) => iconName.endsWith("16"))
  .map((iconName) => iconName.replace("16", ""));

storiesOf("Components/Link", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    () => `
    <div style="font-size: ${select(
      "containing font size",
      ["12", "14", "16", "18", "20", "24", "32"],
      "16"
    )}px; font-weight: ${select("containing font weight", ["300", "400", "500", "700"], "400")};">
    Some wrapping text <calcite-link
      href="${text("href", "")}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      ${boolean("disabled", false)}
    >
   ${text("text", "link text here")}</calcite-link>
   around the link
    </div>
  `
  )
  .add(
    "With icon-start",
    () => `
    <div style="font-size: ${select(
      "containing font size",
      ["12", "14", "16", "18", "20", "24", "32"],
      "16"
    )}px; font-weight: ${select("containing font weight", ["300", "400", "500", "700"], "400")};">
    Some wrapping text <calcite-link
      href="${text("href", "")}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      ${boolean("disabled", false)}
      icon-start="${select("icon-start", iconNames, iconNames[0])}">
      ${text("text", "link text here")}</calcite-link>
      around the link
      </div>
  `
  )
  .add(
    "With icon-end",
    () => `
    <div style="font-size: ${select(
      "containing font size",
      ["12", "14", "16", "18", "20", "24", "32"],
      "16"
    )}px; font-weight: ${select("containing font weight", ["300", "400", "500", "700"], "400")};">
    Some wrapping text <calcite-link
      href="${text("href", "")}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      ${boolean("disabled", false)}
      icon-end="${select("icon-end", iconNames, iconNames[0])}">
      ${text("text", "link text here")}</calcite-link>
      around the link
      </div>
  `
  )
  .add(
    "With icon-start and icon-end",
    () => `
    <div style="font-size: ${select(
      "containing font size",
      ["12", "14", "16", "18", "20", "24", "32"],
      "16"
    )}px; font-weight: ${select("containing font weight", ["300", "400", "500", "700"], "400")};">
    Some wrapping text <calcite-link
      href="${text("href", "")}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      ${boolean("disabled", false)}
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
      icon-end="${select("icon-end", iconNames, iconNames[0])}">
      ${text("text", "link text here")}</calcite-link>
      around the link
      </div>
  `
  )
  .add(
    "Dark mode",
    () => `
    <div style="color: white; font-size: ${select(
      "containing font size",
      ["12", "14", "16", "18", "20", "24", "32"],
      "16"
    )}px; font-weight: ${select("containing font weight", ["300", "400", "500", "700"], "400")};">
    Some wrapping text <calcite-link
    theme="dark"
    color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
    href="${text("href", "")}"
    ${boolean("disabled", false)}
    icon="${select("icon", iconNames, iconNames[0])}"
    icon-position="${select("icon-position", ["start", "end"], "end")}">
    ${text("text", "link text here")}
  </calcite-link>
  around the link
  </div>
  `,
    { backgrounds: darkBackground }
  );
