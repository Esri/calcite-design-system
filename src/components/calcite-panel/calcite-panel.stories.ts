import { boolean, select, text } from "@storybook/addon-knobs";
import { Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { dir, theme, scale } = ATTRIBUTES;
import readme from "./readme.md";
import { SLOTS, TEXT } from "./resources";
import { html } from "../../tests/utils";

export default {
  title: "Components/App/Panel",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributes: () => Attributes = () => [
  {
    name: "dir",
    value: select("dir", dir.values, dir.defaultValue)
  },
  {
    name: "dismissed",
    value: boolean("dismissed", false)
  },
  {
    name: "disabled",
    value: boolean("disabled", false)
  },
  {
    name: "dismissible",
    value: boolean("dismissible", false)
  },
  {
    name: "height-scale",
    value: select("heightScale", scale.values, scale.defaultValue)
  },
  {
    name: "loading",
    value: boolean("loading", false)
  },
  {
    name: "intl-close",
    value: text("intlClose", TEXT.close)
  },
  {
    name: "theme",
    value: select("theme", theme.values, theme.defaultValue)
  }
];

const headerHTML = `<h3 class="heading" slot="${SLOTS.headerContent}">Heading</h3>`;

const contentHTML = html`
  <p>
    Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo
    semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus
    habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non.
    Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti
    consectetur. Non porttitor tempor orci dictumst magna porta vitae.
  </p>
  <p>
    Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida. Vehicula sem tristique
    sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis ridiculus vulputate, habitant inceptos! Nunc
    torquent lorem urna vehicula volutpat donec nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet
    tellus tempor quisque ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
    gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis condimentum. Nec elit turpis
    leo.
  </p>
  <p>
    Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis aliquam dictum venenatis
    fringilla. Taciti venenatis, ultrices sollicitudin consequat. Sapien fusce est iaculis potenti ut auctor potenti.
    Nisi malesuada feugiat vulputate vitae porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur
    gravida cras scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere curabitur fermentum
    diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis. Vel lacus magnis nunc.
  </p>
`;

const footerHTML = html`
  <calcite-button slot="${SLOTS.footer}" width="half">Yeah!</calcite-button>
  <calcite-button slot="${SLOTS.footer}" width="half" appearance="clear">Naw.</calcite-button>
`;

export const basic = (): string =>
  create(
    "calcite-panel",
    createAttributes(),
    `${headerHTML}
    <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
    <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
    ${contentHTML}
    ${footerHTML}`
  );
