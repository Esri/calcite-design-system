import { boolean, select, text } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
  modesDarkDefault
} from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";
import { SLOTS } from "./resources";

export default {
  title: "Components/Panel",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  const { scale } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "closed",
        commit(): Attribute {
          this.value = boolean("closed", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "disabled",
        commit(): Attribute {
          this.value = boolean("disabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "closable",
        commit(): Attribute {
          this.value = boolean("closable", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "height-scale",
        commit(): Attribute {
          this.value = select("heightScale", scale.values, scale.defaultValue);
          delete this.build;
          return this;
        }
      },
      {
        name: "loading",
        commit(): Attribute {
          this.value = boolean("loading", false);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

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
  <calcite-button slot="${SLOTS.footer}" width="half" appearance="outline">Naw.</calcite-button>
  <calcite-button slot="${SLOTS.footer}" width="half">Yeah!</calcite-button>
`;

const panelContent = `${headerHTML}
  <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
  <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
  ${contentHTML}
  ${footerHTML}`;

export const simple = (): string =>
  create(
    "calcite-panel",
    createAttributes(),
    html`
      ${headerHTML}
      <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
      <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
      ${contentHTML}
      <calcite-fab slot="fab"></calcite-fab>
      ${footerHTML}
    `
  );

export const onlyProps = (): string => html`
  <div style="width: 300px;">
    <calcite-panel
      height-scale="s"
      heading-level="${text("heading-level", "2")}"
      description="${text(
        "description",
        "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      )}"
      heading="${text(
        "heading",
        "Panel title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
      )}"
    />
  </div>
`;

export const disabledWithStyledSlot_TestOnly = (): string => html`
  <calcite-panel style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">${contentHTML}</div>
  </calcite-panel>
`;

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-panel",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      {
        name: "dir",
        value: "rtl"
      },
      {
        name: "class",
        value: "calcite-mode-dark"
      }
    ]),
    panelContent
  );

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const withActionBar_TestOnly = (): string => html`<calcite-panel height-scale="s">
  <calcite-action-bar slot="action-bar">
    <calcite-action-group>
      <calcite-action text="Add" icon="plus"> </calcite-action>
      <calcite-action text="Save" icon="save"> </calcite-action>
      <calcite-action text="Layers" icon="layers"> </calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
  <div slot="header-content">Header!</div>
  <p>Slotted content!</p>
</calcite-panel>`;
