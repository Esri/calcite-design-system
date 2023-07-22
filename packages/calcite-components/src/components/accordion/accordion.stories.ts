import {
  Attribute,
  Attributes,
  filterComponentAttributes,
  createComponentHTML as create,
  modesDarkDefault,
} from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { iconNames, storyFilters } from "../../../.storybook/helpers";
import { select, text } from "@storybook/addon-knobs";
import accordionReadme from "./readme.md";
import accordionItemReadme from "../accordion-item/readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Accordion",
  parameters: {
    notes: {
      accordion: accordionReadme,
      accordionItem: accordionItemReadme,
    },
    backgrounds: {
      values: [{ name: "transparent", value: "#0000ffff" }],
    },
  },
  ...storyFilters(),
};

const createAccordionAttributes: (options?: { exceptions: string[] }) => Attributes = (
  { exceptions } = { exceptions: [] }
) => {
  const group = "accordion";
  const { scale } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "scale",
        commit(): Attribute {
          this.value = select("scale", scale.values, scale.defaultValue, group);
          delete this.build;
          return this;
        },
      },
      {
        name: "appearance",
        commit(): Attribute {
          this.value = select("appearance", ["solid", "transparent"], "solid", group);
          delete this.build;
          return this;
        },
      },
      {
        name: "selection-mode",
        commit(): Attribute {
          this.value = select("selection-mode", ["single", "single-persist", "multiple"], "multiple", group);
          delete this.build;
          return this;
        },
      },
    ],
    exceptions
  );
};

const createAccordionItemAttributes: (options?: {
  group?: string;
  iconEnd?: string;
  iconStart?: string;
}) => Attributes = (props) => {
  const group = props?.group || "";
  const defaultAttributes = [
    { name: "heading", value: text("heading", "Heading", group) },
    {
      name: "description",
      value: text("description", "Description for item", group),
    },
    {
      name: "icon-start",
      value: select("icon-start", ["", ...iconNames], props?.iconStart || "", group),
    },
    {
      name: "icon-end",
      value: select("icon-end", ["", ...iconNames], props?.iconEnd || "", group),
    },
  ];
  return defaultAttributes;
};

const accordionItemContent = `Custom content here<br/><img src="${placeholderImage({
  width: 200,
  height: 133,
})}"><br/>More custom content here`;

export const simple = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes(),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-4" }).concat({
          name: "expanded",
          value: true,
        }),
        accordionItemContent
      )}
    `
  );

export const withActions = (): string => html`
  <calcite-accordion scale="s">
    <calcite-accordion-item scale="m" heading="Accordion Item 1">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 2" expanded>
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-start"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 3">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      >${accordionItemContent}
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
  </calcite-accordion>
`;

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes({ exceptions: ["class", "dir"] }).concat(
      {
        name: "class",
        value: "calcite-mode-dark",
      },
      {
        name: "dir",
        value: "rtl",
      }
    ),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: "banana", group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: "banana", group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: "banana", group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ iconStart: "banana", group: "accordion-item-4" }).concat({
          name: "expanded",
          value: true,
        }),
        accordionItemContent
      )}
    `
  );

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const transparentAppearance_TestOnly = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes({ exceptions: ["appearance"] }).concat({
      name: "appearance",
      value: "transparent",
    }),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-1" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-2" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-3" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-4" }).concat({
          name: "expanded",
          value: true,
        }),
        accordionItemContent
      )}
    `
  );

export const withIconStartAndEnd_TestOnly = (): string =>
  create(
    "calcite-accordion",
    createAccordionAttributes({ exceptions: ["appearance"] }).concat({
      name: "appearance",
      value: "transparent",
    }),
    html`
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-1", iconStart: "banana" }).concat({
          name: "expanded",
          value: true,
        }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-2", iconEnd: "cars" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({ group: "accordion-item-3", iconEnd: "plane", iconStart: "plane" }),
        accordionItemContent
      )}
      ${create(
        "calcite-accordion-item",
        createAccordionItemAttributes({
          group: "accordion-item-4",
          iconStart: "biking",
          iconEnd: "biking",
        }).concat({
          name: "expanded",
          value: true,
        }),
        accordionItemContent
      )}
    `
  );

const iconHeaderUseCasesArr: { icon: string; heading: string; description: string }[] = [
  { icon: "", heading: "Simple item with heading", description: "" },
  { icon: "", heading: "Simple item with heading", description: "Simple item with description" },
  {
    icon: "embark",
    heading:
      "Embark_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_",
    description: "Extra long heading with underscores and icons m /scale l",
  },
  {
    icon: "car",
    heading: "Extra long description with underscores and icons m /scale l",
    description:
      "Car_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_",
  },
  {
    icon: "plane",
    heading: "Extra long description and icons m /scale l",
    description:
      "Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets.",
  },
];

const accordionItemsIconHeaderUseCases = iconHeaderUseCasesArr
  .map(
    (useCase) =>
      html`<calcite-accordion-item
        icon-start="${useCase.icon}"
        icon-end="${useCase.icon}"
        scale="l"
        heading="${useCase.heading}"
        description="${useCase.description}"
      ></calcite-accordion-item>`
  )
  .join("");

export const longHeading_MediumIconForLargeAccordionItem_TestOnly = (): string => html`
  <calcite-accordion scale="l" style="width: 600px"> ${accordionItemsIconHeaderUseCases} </calcite-accordion>
`;
