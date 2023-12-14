import { select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme1 from "./readme.md";
import readme2 from "../stepper-item/readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Stepper",
  parameters: {
    notes: [readme1, readme2],
    chromatic: {
      delay: 500,
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <h1>Default</h1>
  <calcite-stepper
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
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
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
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
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
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

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const overriddenWidth_TestOnly = (): string => html` <calcite-stepper numbered style="width: 50vw">
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

export const disabled_TestOnly = (): string => html`<calcite-stepper>
  <calcite-stepper-item heading="item1" complete disabled>1</calcite-stepper-item>
  <calcite-stepper-item heading="item2">2</calcite-stepper-item>
</calcite-stepper>`;

export const arabicNumberingSystem_TestOnly = (): string => html` <calcite-stepper
  numbered
  numbering-system="arab"
  lang="ar"
  dir="rtl"
  scale="s"
>
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

export const verticalLayout_TestOnly = (): string => html`<calcite-stepper layout="vertical" scale="s">
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

const getBreakpointsStoryTemplate = ({ scale, width }: { scale: string; width: number }): string => html`<style>
    calcite-stepper {
      width: ${width}px;
    }
  </style>
  <calcite-stepper numbered icon layout="horizontal" scale="${scale}">
    <calcite-stepper-item
      heading="Choose method"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      complete
      disabled
    >
      <calcite-notice open width="full">
        <div slot="message">Step 1 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="Compile member list"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      complete
    >
      <calcite-notice open width="full">
        <div slot="message">Step 2 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="Set member properties"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      description="Some subtext"
      error
    >
      <calcite-notice open width="full">
        <div slot="message">Step 3 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="Confirm and complete"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    >
      <calcite-notice open width="full">
        <div slot="message">Step 4 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>`;

export const responsiveLayoutScaleS_TestOnly = (): string => getBreakpointsStoryTemplate({ scale: "s", width: 400 });
export const responsiveLayoutScaleM_TestOnly = (): string => getBreakpointsStoryTemplate({ scale: "m", width: 500 });
export const responsiveLayoutScaleL_TestOnly = (): string => getBreakpointsStoryTemplate({ scale: "l", width: 600 });

export const responsiveLayoutWithDisabledStepperItems_TestOnly = (): string => html`<style>
    calcite-stepper {
      width: 300px;
    }
  </style>
  <calcite-stepper numbered icon layout="horizontal" scale="s">
    <calcite-stepper-item
      heading="Choose method"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      complete
      disabled
    >
      <calcite-notice open width="full">
        <div slot="message">Step 1 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="Compile member list"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      complete
      disabled
      selected
    >
      <calcite-notice open width="full">
        <div slot="message">Step 2 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="Set member properties"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      description="Some subtext"
      error
      disabled
    />
  </calcite-stepper>`;

export const singleViewModeWithNextActionDisabled_TestOnly = (): string => html`<style>
    calcite-stepper {
      width: 300px;
    }
  </style>
  <calcite-stepper numbered icon next-action-disabled>
    <calcite-stepper-item
      heading="Choose method"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    >
      <div>Step 1 Content Goes Here</div>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="Compile member list"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      complete
    >
      <div>Step 2 Content Goes Here</div>
    </calcite-stepper-item>
  </calcite-stepper>`;

export const singleViewModeWithPreviousActionDisabled_TestOnly = (): string => html`<style>
    calcite-stepper {
      width: 300px;
    }
  </style>
  <calcite-stepper numbered icon previous-action-disabled>
    <calcite-stepper-item
      heading="Choose method"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    >
      <div>Step 1 Content Goes Here</div>
    </calcite-stepper-item>
    <calcite-stepper-item
      heading="Compile member list"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      complete
      selected
    >
      <div>Step 2 Content Goes Here</div>
    </calcite-stepper-item>
  </calcite-stepper>`;
