import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Card } from "./card";

const { logicalFlowPosition } = ATTRIBUTES;

type CardStoryArgs = Pick<Card, "loading" | "selected" | "thumbnailPosition">;

export default {
  title: "Components/Card",
  args: {
    loading: false,
    selected: false,
    thumbnailPosition: logicalFlowPosition.defaultValue,
  },
  argTypes: {
    thumbnailPosition: {
      options: logicalFlowPosition.values,
      control: { type: "select" },
    },
  },
};

const titleHtml = html`
  <h3 slot="heading">ArcGIS Online: Gallery and Organization pages</h3>
  <span slot="description">
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

export const simple = (args: CardStoryArgs): string => html`
  <div style="width: 260px">
    <calcite-card
      ${boolean("loading", args.loading)}
      ${boolean("selected", args.selected)}
      thumbnail-position="${args.thumbnailPosition}"
    >
      ${titleHtml}
    </calcite-card>
  </div>
`;

export const simpleWithFooterLinks = (args: CardStoryArgs): string => html`
  <div style="width:260px">
    <calcite-card
      ${boolean("loading", args.loading)}
      ${boolean("selected", args.selected)}
      thumbnail-position="${args.thumbnailPosition}"
    >
      ${titleHtml}${footerLinksHtml}
    </calcite-card>
  </div>
`;

export const simpleWithFooterButton = (args: CardStoryArgs): string => html`
  <div style="width:260px">
    <calcite-card
      ${boolean("loading", args.loading)}
      ${boolean("selected", args.selected)}
      thumbnail-position="${args.thumbnailPosition}"
    >
      ${titleHtml}${footerButtonHtml}
    </calcite-card>
  </div>
`;

export const thumbnail = (): string => html`
  <div style="width:260px">
    <calcite-card>
      ${thumbnailHtml}
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
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
    </calcite-card>
    <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-1"
      >My great tooltip example
    </calcite-tooltip>
    <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-2">Sharing level: 2 </calcite-tooltip>
    <calcite-tooltip placement="top-end" reference-element="card-icon-test-3">More... </calcite-tooltip>
    <calcite-tooltip placement="top-start" reference-element="card-icon-test-5">More options </calcite-tooltip>
  </div>
`;

export const headerDoesNotOverlapWithCheckboxDeprecated_TestOnly = (): string => html`
  <calcite-card selectable style="width:260px">
    <h3 slot="heading">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
    <span slot="description"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</span
    >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </calcite-card>
`;

export const deprecatedSlotsSelectable_TestOnly = (): string => html`
  <calcite-card selectable style="width:260px">
    <h3 slot="title">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
    <span slot="subtitle"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</span
    >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </calcite-card>
`;

export const slottedFooterItems_TestOnly = (): string => html`
  <div id="card-container" style="width:260px;">
    <calcite-card>
      ${thumbnailHtml}
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-chip slot="footer-start" value="calcite chip" kind="brand" icon="clock-forward">Recent</calcite-chip>
      <calcite-chip slot="footer-end" value="calcite chip" icon="walking">Recreation</calcite-chip>
    </calcite-card>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl" style="width:260px;">
    <calcite-card>${thumbnailHtml}${titleHtml}${footerStartTextHtml}${footerEndButtonsHtml}</calcite-card>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
