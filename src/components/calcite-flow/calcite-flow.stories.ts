import { boolean, select, text } from "@storybook/addon-knobs";
import { Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { dir, theme } = ATTRIBUTES;
import readme from "./readme.md";
import itemReadme from "../calcite-panel/readme.md";
import { SLOTS, TEXT } from "../calcite-panel/resources";
import { html } from "../../tests/utils";

export default {
  title: "Components/App/Flow",
  parameters: {
    backgrounds: darkBackground,
    notes: {
      flow: readme,
      item: itemReadme
    }
  }
};

const createAttributes: () => Attributes = () => {
  const group = "Flow";

  return [
    {
      name: "dir",
      value: select("dir", dir.values, dir.defaultValue, group)
    },
    {
      name: "theme",
      value: select("theme", theme.values, theme.defaultValue, group)
    }
  ];
};

const createFlowItemAttributes: (group: string) => Attributes = (group) => {
  return [
    {
      name: "disabled",
      value: boolean("disabled", false, group)
    },
    {
      name: "heading",
      value: text("heading", "Heading", group)
    },
    {
      name: "loading",
      value: boolean("loading", false, group)
    },
    {
      name: "menu-open",
      value: boolean("menuOpen", false, group)
    },
    {
      name: "summary",
      value: text("summary", "Summary", group)
    },
    {
      name: "intl-back",
      value: text("intlBack", TEXT.back, group)
    },
    {
      name: "intl-open",
      value: text("intlOpen", TEXT.open, group)
    },
    {
      name: "intl-close",
      value: text("intlClose", TEXT.close, group)
    }
  ];
};

const menuActionsHTML = html`
  <calcite-action
    slot="${SLOTS.headerMenuActions}"
    text-enabled
    text="Add"
    label="Add Item"
    icon="plus"
  ></calcite-action>
  <calcite-action
    slot="${SLOTS.headerMenuActions}"
    text-enabled
    text="Save"
    label="Save Item"
    icon="save"
  ></calcite-action>
  <calcite-action
    slot="${SLOTS.headerMenuActions}"
    text-enabled
    text="Layers"
    label="View Layers"
    icon="layers"
  ></calcite-action>
`;

const footerActionsHTML = html`
  <calcite-button slot="${SLOTS.footerActions}" width="half">Save</calcite-button>
  <calcite-button slot="${SLOTS.footerActions}" width="half" appearance="clear">Cancel</button>
`;

function createItemHTML(content: string): string {
  return `${menuActionsHTML}${content}${footerActionsHTML}`;
}

const item1HTML = html`
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
  <p>
    Magna ligula neque phasellus. Velit duis auctor etiam nullam sociis nam neque quis. Donec fusce bibendum quam
    egestas sociosqu orci tempus vulputate egestas penatibus urna sociosqu. Nulla nam potenti diam egestas litora
    lobortis tristique maecenas pulvinar maecenas vitae tortor. Lacus purus facilisi est accumsan varius gravida
    facilisis rutrum tortor potenti rhoncus id. Ipsum praesent tristique blandit taciti morbi torquent pharetra
    fermentum aenean!
  </p>
  <p>
    Congue eu duis integer nisl molestie nostra dis auctor lobortis tellus parturient. Porttitor dis curae; maecenas
    quis praesent ridiculus posuere mus. Dictumst, vivamus fames semper congue fusce! Nunc placerat enim fermentum
    posuere magna justo habitasse. Tristique placerat mauris, per nulla gravida dui urna ut nec venenatis! Non lacus
    iaculis quisque, neque erat integer. Duis tortor ad habitant turpis dis eu mollis at facilisis. Tellus nisl amet
    morbi fringilla mus dui neque himenaeos maecenas platea venenatis. Tristique nisl quisque ad aliquam senectus
    pulvinar litora.
  </p>
`;

const item2HTML = html`
  <ul>
    <li>
      Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
      arcu. Cras consequat.
    </li>
    <li>
      Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam
      erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
    </li>
    <li>
      Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
      Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
    </li>
    <li>
      Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
    </li>
  </ul>
`;

export const basic = (): string =>
  create(
    "calcite-flow",
    createAttributes(),
    `${create("calcite-panel", createFlowItemAttributes("Panel 1"), createItemHTML(item1HTML))}
    ${create("calcite-panel", createFlowItemAttributes("Panel 2"), createItemHTML(item2HTML))}`
  );
