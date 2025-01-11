import { iconNames } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Tabs } from "./tabs";

const { layout, position, scale } = ATTRIBUTES;

type TabsStoryArgs = Pick<Tabs, "layout" | "position" | "scale">;

export default {
  title: "Components/Tabs",
  args: {
    layout: layout.values[3],
    position: position.values[2],
    scale: scale.defaultValue,
  },
  argTypes: {
    layout: {
      options: layout.values.filter(
        (option) => option !== "auto" && option !== "fixed" && option !== "none" && option !== "horizontal-single",
      ),
      control: { type: "select" },
    },
    position: {
      options: position.values.filter((option) => option !== "start" && option !== "end"),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: TabsStoryArgs): string => html`
  <calcite-tabs layout="${args.layout}" position="${args.position}" scale="${args.scale}">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const simpleDarkModeRTL_TestOnly = (): string => html`
  <calcite-tabs dir="rtl" class="calcite-mode-dark">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;
simpleDarkModeRTL_TestOnly.parameters = {
  themes: modesDarkDefault,
  chromatic: {
    delay: 500,
  },
};

export const bordered = (): string => html`
  <calcite-tabs layout="inline" position="top" scale="m" bordered>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`;

export const closable = (): string => html`
  <calcite-tabs layout="inline" position="top" scale="m">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1" closable> Tab 1 Title </calcite-tab-title>
      <calcite-tab-title tab="tab2" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" closable selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`;

export const borderedDarkModeRTL_TestOnly = (): string => html`
  <calcite-tabs layout="inline" position="top" scale="m" bordered dir="rtl" class="calcite-mode-dark">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`;
borderedDarkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

const selectedIcon = iconNames[0];

export const withIcons = (): string => html`
  <calcite-tabs layout="inline" position="top" scale="m">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected icon-start="${selectedIcon}">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="${selectedIcon}">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="${selectedIcon}" icon-end="${selectedIcon}">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="${selectedIcon}"></calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const setWidth = (): string => html`
  <div style="width: 400px;">
    <calcite-tabs
    layout="inline"
    position="top"
    scale="m"
    >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title id="reference-element">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected>
      <p>Tab 1 Content</p><br />
    </calcite-tab>
    <calcite-tab><p>Tab 2 Content</p>
    <img src="${placeholderImage({
      width: 1000,
      height: 200,
    })}"></img>
    </calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
    </calcite-tabs>
  </div>
`;

const TabNavHTMLSimple = html`
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title>Tab 1 Title</calcite-tab-title>
    <calcite-tab-title>Tab 2 Title</calcite-tab-title>
    <calcite-tab-title>Tab 3 Title</calcite-tab-title>
    <calcite-tab-title selected>Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab>Tab 1 Content</calcite-tab>
  <calcite-tab>Tab 2 Content</calcite-tab>
  <calcite-tab>Tab 3 Content</calcite-tab>
  <calcite-tab selected>Tab 4 Content</calcite-tab>
`;

const TabNavHTMLVariedTabWidth = html`
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title icon-start="arrow-left">Tab 1 Title</calcite-tab-title>
    <calcite-tab-title icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
    <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
    <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab>Tab 1 Content</calcite-tab>
  <calcite-tab>Tab 2 Content</calcite-tab>
  <calcite-tab>Tab 3 Content</calcite-tab>
  <calcite-tab selected>Tab 4 Content</calcite-tab>
`;

const tabStyles = html`
  <style>
    calcite-tabs {
      margin: 20px;
    }
  </style>
`;

export const centerScale_TestOnly = (): string => html`
  ${tabStyles}
  <calcite-tabs layout="center" scale="s">${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="center" scale="m">${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="center" scale="l">${TabNavHTMLSimple}</calcite-tabs>
`;

export const centerVariedTabWidthScale_TestOnly = (): string => html`
  ${tabStyles}
  <calcite-tabs layout="center" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="center" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="center" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>
`;

export const centerBorderedScale_TestOnly = (): string => html`
  ${tabStyles}
  <calcite-tabs layout="center" scale="s" bordered>${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="center" scale="m" bordered>${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="center" scale="l" bordered>${TabNavHTMLSimple}</calcite-tabs>
`;

export const centerBorderedVariedTabWidthScale_TestOnly = (): string => html`
  ${tabStyles}
  <calcite-tabs layout="center" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="center" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="center" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
`;

export const inlineScale_TestOnly = (): string => html`
  ${tabStyles}
  <calcite-tabs layout="inline" scale="s">${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m">${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l">${TabNavHTMLSimple}</calcite-tabs>
`;

export const inlineVariedTabWidthScale_TestOnly = (): string => html`
  ${tabStyles}
  <calcite-tabs layout="inline" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>
`;

export const inlineBorderedScale_TestOnly = (): string => html`
  ${tabStyles}
  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLSimple}</calcite-tabs>
`;

export const inlineBorderedVariedTabWidthScale_TestOnly = (): string => html`
  ${tabStyles}
  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
`;

export const disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly = (): string => html`
  <calcite-tabs scale="l">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title disabled icon-start="arrow-left">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const centered_TestOnly = (): string => html`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const centeredClosable_TestOnly = (): string => html`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 4 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const centeredBorderedClosable_TestOnly = (): string => html`
  <calcite-tabs layout="center" bordered>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 4 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly = (): string => html`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 3 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly = (): string => html`
  <calcite-tabs layout="inline">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 3 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const Tab100PercentHeightNoVerticalScroll = (): string => html`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: red; height: 100%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
`;
Tab100PercentHeightNoVerticalScroll.parameters = {
  chromatic: { delay: 1000 },
};

export const Tab200PercentHeightWithVerticalScroll = (): string => html`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: linear-gradient(to bottom, red, transparent); height: 200%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
`;
Tab200PercentHeightWithVerticalScroll.parameters = {
  chromatic: { delay: 1000 },
};

export const fixedHeightNoVerticalScrollbar_TestOnly = (): string => html`
  <calcite-tabs style="height: 400px">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected> Watercraft </calcite-tab-title>
      <calcite-tab-title>Automobiles</calcite-tab-title>
      <calcite-tab-title>Aircraft</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>
      <calcite-notice icon="embark" open>
        <div slot="message">Recommended for coastal use</div>
      </calcite-notice>
      <calcite-notice icon="embark" open>
        <div slot="message">Why is there a vertical scroll bar in this panel?</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure</div>
      </calcite-notice>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure 2</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="plane" open>
        <div slot="message">Cross continents quickly</div>
      </calcite-notice>
    </calcite-tab>
  </calcite-tabs>
`;

export const noVerticalScrollbarInsideShellPanel_TestOnly = (): string => html`
  <calcite-shell content-behind>
    <calcite-shell-panel slot="panel-end" width-scale="l" position="end" display-mode="float">
      <calcite-panel heading="Panel with Tabs >> vertical scrollbar">
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> Watercraft </calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab selected>
            <calcite-notice icon="embark" open>
              <div slot="message">Recommended for coastal use</div>
            </calcite-notice>
            <calcite-notice icon="embark" open>
              <div slot="message">Why is there a vertical scroll bar in this panel?</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure 2</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
        </calcite-tabs>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>
`;

export const responsiveTabs = (): string =>
  createBreakpointStories(html`
    <style>
      .breakpoint-story-container {
        flex-direction: column;
      }
    </style>
    <calcite-tabs scale="{scale}">
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab selected>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab selected>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    </calcite-tabs>
    
    <calcite-tabs layout="center" scale="{scale}">
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab selected>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab selected>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    </calcite-tabs>
    
    <calcite-tabs bordered scale="{scale}">
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab selected>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    </calcite-tabs>
    
    <calcite-tabs bordered layout="center" scale="{scale}">
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab >Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab selected>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    </calcite-tabs>
  `);
export const paddingPropOverrideAtRootLevel = (): string => html`
  <style>
    :root {
      --calcite-tab-content-block-padding: 0;
    }
  </style>
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>
        <div>Tab 1 Content</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
`;

export const paddingPropOverrideAtElementLevel = (): string => html`
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab style="--calcite-tab-content-block-padding: 0;">
        <div>Tab 1 Content</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
`;
