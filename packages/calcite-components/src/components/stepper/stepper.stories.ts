import { select, text } from "../../../.storybook/fake-knobs";
import { boolean } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Stepper",
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const simple = (): string => html`
  <h1>Default</h1>
  <calcite-stepper
    layout="${select("layout", ["horizontal", "vertical", "horizontal-single"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("numbered", true)}
    ${boolean("icon", true)}
  >
    <calcite-stepper-item
      heading="${text("heading-1", "Choose method")}"
      description="${text("description-1", "Add members without sending invitations")}"
      complete
    >
      <calcite-notice open width="full"><div slot="message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-2", "Compile member list")}"
      description="${text("description-2", "")}"
      complete
      error
    >
      <calcite-notice open width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-3", "Set member properties")}"
      description="${text("description-3", "")}"
      selected
    >
      <calcite-notice open width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-4", "Confirm and complete")}"
      description="${text("description-4", "Disabled example")}"
      disabled
    >
      <calcite-notice open width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
  <h1>No Content</h1>
  <calcite-stepper
    layout="${select("layout", ["horizontal", "vertical", "horizontal-single"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("numbered", true)}
    ${boolean("icon", true)}
  >
    <calcite-stepper-item
      heading="${text("heading-1", "Choose method")}"
      description="${text("description-1", "Add members without sending invitations")}"
      complete
    >
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-2", "Compile member list")}"
      description="${text("description-2", "")}"
      complete
      error
    >
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-3", "Set member properties")}"
      description="${text("description-3", "")}"
      selected
    >
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-4", "Confirm and complete")}"
      description="${text("description-4", "Disabled example")}"
      disabled
    >
    </calcite-stepper-item>
  </calcite-stepper>
`;

export const darkModeRTL_TestOnly = (): string => html`
<div dir="rtl">
  <calcite-stepper
  class="calcite-mode-dark"
    layout="${select("layout", ["horizontal", "vertical", "horizontal-single"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("numbered", true)}
    ${boolean("icon", true)}
  >
    <calcite-stepper-item
      heading="${text("heading-1", "Choose method")}"
      description="${text("description-1", "Add members without sending invitations")}"
      complete
    >
      <calcite-notice open width="full"><div slot=message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-2", "Compile member list")}"
      description="${text("description-2", "")}"
      complete
      error
    >
      <calcite-notice open width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-3", "Set member properties")}"
      description="${text("description-3", "")}"
      selected
    >
      <calcite-notice open width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="${text("heading-4", "Confirm and complete")}"
      description="${text("description-4", "Disabled example")}"
      disabled
    >
      <calcite-notice open width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
</div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const overriddenWidth_TestOnly = (): string =>
  html` <calcite-stepper numbered style="width: 50vw">
    <calcite-stepper-item heading="Choose method" description="Add members without sending invitations" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 1 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Compile member list" complete error>
      <calcite-notice open width="full">
        <div slot="message">Step 2 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Set member properties" description="" selected>
      <calcite-notice open width="full">
        <div slot="message">Step 3 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Confirm and complete" description="Disabled example" disabled="">
      <calcite-notice open width="full">
        <div slot="message">Step 4 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>`;

export const disabled_TestOnly = (): string =>
  html`<calcite-stepper>
    <calcite-stepper-item heading="item1" complete disabled>1</calcite-stepper-item>
    <calcite-stepper-item heading="item2">2</calcite-stepper-item>
  </calcite-stepper>`;

export const arabicNumberingSystem_TestOnly = (): string =>
  html` <calcite-stepper numbered numbering-system="arab" lang="ar" dir="rtl" scale="s">
    <calcite-stepper-item heading="الخطوةالاولى" complete>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الأولى للمحتوى هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الثانية" complete>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الثانية للمحتوى هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الثالثة" description="بعض النصوص الفرعية" selected>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الثالثة المحتوى يذهب هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الرابعة">
      <calcite-notice open width="full">
        <div slot="message">الخطوة الرابعة المحتوى يذهب هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>`;

export const verticalLayout_TestOnly = (): string =>
  html`<calcite-stepper layout="vertical" scale="s">
      <calcite-stepper-item heading="Scale s" description="Add members without sending invitations"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
    </calcite-stepper>

    <calcite-stepper layout="vertical">
      <calcite-stepper-item heading="Scale m" description="Add members without sending invitations"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
    </calcite-stepper>

    <calcite-stepper layout="vertical" scale="l">
      <calcite-stepper-item heading="Scale l" description="Add members without sending invitations"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
    </calcite-stepper>`;

export const horizontalSingleLayout_TestOnly = (): string => html`
  <div style="display: flex; flex-direction: column; gap: 1em;">
    <calcite-stepper layout="horizontal-single" numbered icon scale="s">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list">
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext">
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="horizontal-single" numbered icon scale="m">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list" selected>
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext">
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="horizontal-single" numbered icon scale="l">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list">
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext" selected>
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>
  </div>
`;

export const theming_TestOnly = (): string => html`
  <style>
    calcite-stepper {
      --calcite-stepper-action-background-color: #294b29;
      --calcite-stepper-step-bar-fill-color: green;
      --calcite-stepper-step-bar-selected-fill-color: #e9f6ff;
      --calcite-stepper-step-bar-complete-fill-color: #280274;
      --calcite-stepper-step-bar-error-fill-color: #fe7a36;
      --calcite-stepper-item-text-color: black;
    }

    calcite-stepper-item {
      --calcite-stepper-item-description-text-color: #294b29;
      --calcite-stepper-item-heading-text-color: #50623a;
      --calcite-stepper-item-icon-color: blue;
      --calcite-stepper-item-number-text-color: orange;
    }
  </style>

  <calcite-stepper layout="horizontal" numbered icon scale="s">
    <calcite-stepper-item heading="Choose method" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 1 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Compile member list" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 2 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Set member properties" description="Some subtext" error>
      <calcite-notice open width="full">
        <div slot="message">Step 3 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Confirm and complete">
      <calcite-notice open width="full">
        <div slot="message">Step 4 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>

  <calcite-stepper layout="vertical" numbered icon scale="s">
    <calcite-stepper-item heading="Choose method" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 1 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Compile member list" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 2 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Set member properties" description="Some subtext" error>
      <calcite-notice open width="full">
        <div slot="message">Step 3 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Confirm and complete">
      <calcite-notice open width="full">
        <div slot="message">Step 4 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>

  <calcite-stepper layout="horizontal-single" numbered icon scale="s">
    <calcite-stepper-item heading="Choose method" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 1 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Compile member list" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 2 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Set member properties" description="Some subtext" error>
      <calcite-notice open width="full">
        <div slot="message">Step 3 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Confirm and complete">
      <calcite-notice open width="full">
        <div slot="message">Step 4 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
`;
