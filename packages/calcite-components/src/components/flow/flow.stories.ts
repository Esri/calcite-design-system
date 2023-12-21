import { boolean, text } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { Attributes, createComponentHTML as create, filterComponentAttributes } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import itemReadme from "../panel/readme.md";
import { SLOTS } from "../panel/resources";
import readme from "./readme.md";

export default {
  title: "Components/Flow",
  parameters: {
    notes: {
      flow: readme,
      item: itemReadme,
    },
  },
  ...storyFilters(),
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes([], exceptions);
};

const createFlowItemAttributes: (group: string) => Attributes = (group) => {
  return [
    {
      name: "disabled",
      value: boolean("disabled", false, group),
    },
    {
      name: "heading",
      value: text("heading", "Heading", group),
    },
    {
      name: "loading",
      value: boolean("loading", false, group),
    },
    {
      name: "menu-open",
      value: boolean("menuOpen", false, group),
    },
    {
      name: "description",
      value: text("description", "Description", group),
    },
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
  <calcite-button slot="${SLOTS.footerActions}" width="half" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="${SLOTS.footerActions}" width="half">Save</button>
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
      Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus. Nam
      nulla quam, gravida non, commodo a, sodales sit amet, nisi.
    </li>
    <li>
      Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
    </li>
  </ul>
`;

export const simple = (): string =>
  create(
    "calcite-flow",
    createAttributes(),
    `${create("calcite-flow-item", createFlowItemAttributes("Flow Item 1"), createItemHTML(item1HTML))}
    ${create("calcite-flow-item", createFlowItemAttributes("Flow Item 2"), createItemHTML(item2HTML))}`,
  );

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-flow",
    createAttributes({ exceptions: ["dir"] }).concat(
      {
        name: "class",
        value: "calcite-mode-dark",
      },
      { name: "dir", value: "rtl" },
    ),
    `${create("calcite-flow-item", createFlowItemAttributes("Flow Item 1"), createItemHTML(item1HTML))}
    ${create("calcite-flow-item", createFlowItemAttributes("Flow Item 2"), createItemHTML(item2HTML))}`,
  );

export const noDoubleScrollbars_TestOnly = (): string => html`
  <style>
    #container {
      display: flex;
      max-height: 540px;
      width: 300px;
    }
    .content {
      height: 100%;
      display: flex;
      padding: 10px;
      overflow-y: auto; /* Control scrollbar via child */
    }
  </style>
  <div id="container">
    <calcite-flow>
      <calcite-flow-item heading="Example">
        <div>### Sticky Content e.g. toolbar</div>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sapien lectus, ultricies a molestie nec,
          sollicitudin ac nulla. Pellentesque tincidunt malesuada arcu et placerat. In malesuada neque lectus, at congue
          est malesuada quis. Proin tincidunt lacus laoreet mauris fringilla accumsan. Cras nec enim eu lectus suscipit
          vestibulum a laoreet arcu. Duis posuere nunc vel enim blandit, nec vehicula orci aliquam. Vestibulum hendrerit
          mi vel nisi posuere accumsan. Aenean efficitur est id cursus convallis. Morbi turpis ante, sodales eu tortor
          eu, mattis bibendum purus. Morbi iaculis nisl nunc, quis accumsan quam laoreet vitae. Aliquam ex ligula,
          ornare eu ex vitae, tincidunt venenatis lacus. Phasellus risus quam, elementum sed justo porttitor,
          ullamcorper mattis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Nulla non dui at metus porta lacinia congue sit amet quam. Mauris viverra diam neque, in blandit leo
          vehicula et. Donec non purus vitae nunc tincidunt egestas. Nunc pretium enim magna, sed fringilla lacus
          viverra in. Nam et pretium nisi. Ut bibendum, ipsum sit amet egestas hendrerit, quam orci sollicitudin purus,
          sit amet finibus mauris erat in eros. Integer est dui, vehicula a ipsum id, pellentesque semper elit. Fusce
          euismod volutpat eros vitae imperdiet. Nam suscipit lacus id posuere pharetra. Cras eros ipsum, feugiat non
          leo non, ornare malesuada eros. Donec egestas purus non quam tempus commodo. Maecenas ex augue, euismod eget
          magna in, dapibus fermentum felis. Phasellus justo felis, sollicitudin ut ex sed, lobortis scelerisque sem.
          Pellentesque semper placerat velit, sit amet viverra tortor ultricies eu. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus feugiat, augue in molestie
          imperdiet, felis turpis facilisis tortor, at tempus purus risus et sapien. Fusce id nisi id orci elementum
          sollicitudin. Nam id libero eu odio efficitur rutrum maximus porta lorem. Nunc tristique interdum augue,
          sodales viverra lectus efficitur vitae. Nam molestie, neque consequat mollis pulvinar, sapien sem semper nunc,
          et euismod enim sem vitae ligula.
        </div>
      </calcite-flow-item>
    </calcite-flow>
  </div>
`;
