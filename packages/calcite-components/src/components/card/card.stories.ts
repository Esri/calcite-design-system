import { boolean, select } from "@storybook/addon-knobs";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";
import readme from "./readme.md";
import {
  Attribute,
  Attributes,
  filterComponentAttributes,
  modesDarkDefault,
  createComponentHTML as create,
} from "../../../.storybook/utils";
import { storyFilters } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";

export default {
  title: "Components/Card",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  const { logicalFlowPosition } = ATTRIBUTES;
  return filterComponentAttributes(
    [
      {
        name: "loading",
        commit(): Attribute {
          this.value = boolean("loading", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "selected",
        commit(): Attribute {
          this.value = boolean("selected", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "selectable",
        commit(): Attribute {
          this.value = boolean("selectable", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "thumbnail-position",
        commit(): Attribute {
          this.value = select("thumbnail-position", logicalFlowPosition.values, logicalFlowPosition.defaultValue);
          delete this.build;
          return this;
        },
      },
    ],
    exceptions,
  );
};

const titleHtml = html`
  <span slot="title">ArcGIS Online: Gallery and Organization pages</span>
  <span slot="subtitle">
    A great example of a study description that might wrap to a line or two, but isn't overly verbose.
  </span>
`;

const footerButtonHtml = html` <calcite-button slot="footer-start" width="full">Go</calcite-button> `;

const footerStartTextHtml = html`<span slot="footer-start">Nov 25, 2018</span>`;

const footerLinksHtml = html`
  <calcite-link class="calcite-mode-dark" slot="footer-start">Lead footer</calcite-link>
  <calcite-link class="calcite-mode-dark" slot="footer-end">Trail footer</calcite-link>
`;

const thumbnailHtml = html`<img
  alt="thumbnail"
  slot="thumbnail"
  src="${placeholderImage({
    width: 380,
    height: 180,
  })}"
  style="width: 380px;"
/> `;

const footerEndButtonsHtml = html`
  <div slot="footer-end">
    <calcite-button id="card-icon-test-6" scale="s" appearance="transparent" kind="neutral" icon-start="circle">
    </calcite-button>
    <calcite-button id="card-icon-test-7" scale="s" appearance="transparent" kind="neutral" icon-start="circle">
    </calcite-button>
  </div>
`;

const tooltipHtml = html`
  <calcite-tooltip placement="top-start" reference-element="card-icon-test-6">Configure</calcite-tooltip>
  <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-7">Delete</calcite-tooltip>
`;

export const simple = (): string =>
  html` <div style="width: 260px">${create("calcite-card", createAttributes(), titleHtml)}</div>`;

export const simpleWithFooterLinks = (): string => html`
  <div style="width:260px">${create("calcite-card", createAttributes(), html`${titleHtml}${footerLinksHtml}`)}</div>
`;

export const simpleWithFooterButton = (): string => html`
  <div style="width:260px">${create("calcite-card", createAttributes(), html`${titleHtml}${footerButtonHtml}`)}</div>
`;

export const simpleWithFooterTextButtonTooltip_NoTest = (): string => html`
  <div style="width:260px">
    ${create("calcite-card", createAttributes(), html`${titleHtml}${footerStartTextHtml}${footerEndButtonsHtml}`)}
  </div>
  ${tooltipHtml}
`;
simpleWithFooterTextButtonTooltip_NoTest.parameters = {
  chromatic: { disableSnapshot: true },
};

export const thumbnail = (): string => html`
  <div style="width:260px">
    ${create(
      "calcite-card",
      createAttributes(),
      html`
        ${thumbnailHtml}
        <span slot="title">Portland Businesses</span>
        <span slot="subtitle"
          >by
          <calcite-link href="">example_user</calcite-link>
        </span>
        <div>
          Created: Apr 22, 2019
          <br />
          Updated: Dec 9, 2019
          <br />
          View Count: 0
        </div>
        <calcite-button
          slot="footer-start"
          kind="neutral"
          scale="s"
          id="card-icon-test-1"
          icon-start="circle"
        ></calcite-button>
        <div slot="footer-end">
          <calcite-button scale="s" kind="neutral" id="card-icon-test-2" icon-start="circle"></calcite-button>
          <calcite-button scale="s" kind="neutral" id="card-icon-test-3" icon-start="circle"></calcite-button>
          <calcite-dropdown type="hover">
            <calcite-button
              id="card-icon-test-5"
              slot="trigger"
              scale="s"
              kind="neutral"
              icon-start="circle"
            ></calcite-button>
            <calcite-dropdown-group selection-mode="none">
              <calcite-dropdown-item>View details</calcite-dropdown-item>
              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
              <calcite-dropdown-item>Delete</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>
      `,
    )}
    <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-1"
      >My great tooltip example
    </calcite-tooltip>
    <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-2">Sharing level: 2 </calcite-tooltip>
    <calcite-tooltip placement="top-end" reference-element="card-icon-test-3">More... </calcite-tooltip>
    <calcite-tooltip placement="top-start" reference-element="card-icon-test-5">More options </calcite-tooltip>
  </div>
`;

export const thumbnailRounded = (): string => html`
  <div id="card-container" style="width:260px;">
    <style>
      calcite-card {
        --calcite-card-corner-radius: 12px;
      }
    </style>
    <calcite-card>
      ${thumbnailHtml}
      <span slot="title">Portland Businesses</span>
      <span slot="subtitle"
        >by
        <calcite-link href="">example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button
        slot="footer-start"
        kind="neutral"
        scale="s"
        id="card-icon-test-1"
        icon-start="circle"
      ></calcite-button>
    </calcite-card>
  </div>
`;

export const headerDoesNotOverlapWithCheckbox_TestOnly = (): string => html`
  <calcite-card selectable style="width:260px">
    <span slot="title">Pokem ipsum dolor sit amet Skitty Hoothoot</span>
    <span slot="subtitle"
      >Pika-pi Soul Badge Zoroark Starly Spoink Diglett Rotom. Water Kyogre Hitmontop Rampardos</span
    >
    <p>
      Team Rocket Whimsicott Snover Duskull Servine Kakuna Bellsprout. Scratch Shelgon Oddish Hitmonchan Quagsire Earth
      Badge Leaf Green. Pika-pi Bonsly Rare Candy Seadra blast off at the speed of light Shellos Kirlia. Celadon City
      Seviper Omanyte Espeon Body Slam Victini Darumaka. Normal Krookodile Junichi Masuda Machoke Body Slam Zigzagoon to
      protect the world from devastation.
    </p>
  </calcite-card>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl" style="width:260px;">
    <calcite-card>${thumbnailHtml}${titleHtml}${footerStartTextHtml}${footerEndButtonsHtml}</calcite-card>
  </div>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const selected_TestOnly = (): string =>
  html` <calcite-card selected>
    <span slot="title">ArcGIS Online: Gallery and Organization pages</span>
    <span slot="subtitle"
      >A great example of a study description that might wrap to a line or two, but isn't overly verbose.</span
    >
  </calcite-card>`;

export const theming_TestOnly = (): string => html`
  <calcite-card
    style="--calcite-card-corner-radius: var(--calcite-corner-radius-round);
      --calcite-card-background-color: var(--calcite-color-foreground-3);
      --calcite-card-border-color: var(--calcite-color-status-success);
      --calcite-card-box-shadow: var(--calcite-shadow-md);"
  >
    <span slot="title">ArcGIS Online: Gallery and Organization pages</span>
    <span slot="subtitle"
      >A great example of a study description that might wrap to a line or two, but isn't overly verbose.</span
    >
  </calcite-card>
`;
