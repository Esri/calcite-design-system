import { StepperItem } from "../stepper-item/stepper-item";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Stepper } from "./stepper";

const { layout, scale } = ATTRIBUTES;

type StepperArgs = Pick<Stepper, "layout" | "scale" | "numbered" | "icon">;

type StepperItemArgs1 = {
  heading1: StepperItem["heading"];
  description1: StepperItem["description"];
};

type StepperItemArgs2 = {
  heading2: StepperItem["heading"];
  description2: StepperItem["description"];
};

type StepperItemArgs3 = {
  heading3: StepperItem["heading"];
  description3: StepperItem["description"];
};

type StepperItemArgs4 = {
  heading4: StepperItem["heading"];
  description4: StepperItem["description"];
};

type StepperStoryArgs = StepperArgs & StepperItemArgs1 & StepperItemArgs2 & StepperItemArgs3 & StepperItemArgs4;

export default {
  title: "Components/Stepper",
  args: {
    layout: layout.defaultValue,
    scale: scale.defaultValue,
    numbered: true,
    icon: true,
    heading1: "Choose method",
    description1: "Add members without sending invitations",
    heading2: "Compile member list",
    description2: "",
    heading3: "Set member properties",
    description3: "",
    heading4: "Confirm and complete",
    description4: "Disabled example",
  },
  argTypes: {
    layout: {
      options: layout.values.filter(
        (option) =>
          option !== "grid" &&
          option !== "inline" &&
          option !== "center" &&
          option !== "auto" &&
          option !== "fixed" &&
          option !== "none",
      ),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const simple = (args: StepperStoryArgs): string => html`
  <h1>Default</h1>
  <calcite-stepper
    layout="${args.layout}"
    scale="${args.scale}"
    ${boolean("numbered", args.numbered)}
    ${boolean("icon", args.icon)}
  >
    <calcite-stepper-item heading="${args.heading1}" description="${args.description1}" complete>
      <calcite-notice open width="full"><div slot="message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${args.heading2}" description="${args.description2}" complete error>
      <calcite-notice open width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${args.heading3}" description="${args.description3}" selected>
      <calcite-notice open width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${args.heading4}" description="${args.description4}" disabled>
      <calcite-notice open width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
  <h1>No Content</h1>
  <calcite-stepper
    layout="${args.layout}"
    scale="${args.scale}"
    ${boolean("numbered", args.numbered)}
    ${boolean("icon", args.icon)}
  >
    <calcite-stepper-item heading="${args.heading1}" description="${args.description1}" complete>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${args.heading2}" description="${args.description2}" complete error>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${args.heading3}" description="${args.description3}" selected>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${args.heading4}" description="${args.description4}" disabled>
    </calcite-stepper-item>
  </calcite-stepper>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl">
    <calcite-stepper
    class="calcite-mode-dark"
      layout="horizontal"
      scale="m"
      numbered
      icon
    >
      <calcite-stepper-item
        heading="Choose method"
        description="Add members without sending invitations"
        complete
      >
        <calcite-notice open width="full"><div slot=message">Step 1 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Compile member list"
        complete
        error
      >
        <calcite-notice open width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Set member properties"
        selected
      >
        <calcite-notice open width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Confirm and complete"
        description="Disabled example"
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
    <calcite-stepper-item heading="Set member properties" selected>
      <calcite-notice open width="full">
        <div slot="message">Step 3 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Confirm and complete" description="Disabled example" disabled>
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
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go" selected
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical" scale="l">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item
        heading="Rivers"
        description="The Rivers are calling and I must go"
        selected
      ></calcite-stepper-item>
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

export const verticalLayoutFullWidth = (): string =>
  html`<calcite-stepper layout="vertical" scale="s">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        > Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>

   <calcite-stepper layout="vertical" >
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        selected> Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical" scale="l">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        > Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go" selected></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>`;
