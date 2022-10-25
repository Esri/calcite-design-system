import { select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme1 from "./readme.md";
import readme2 from "../stepper-item/readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Stepper",
  parameters: {
    notes: [readme1, readme2]
  },
  ...storyFilters()
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
      item-title="${text("item-1-title", "Choose method")}"
      item-subtitle="${text("item-1-subtitle", "Add members without sending invitations")}"
      complete
    >
      <calcite-notice active width="full"><div slot="message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-2-title", "Compile member list")}"
      item-subtitle="${text("item-2-subtitle", "")}"
      complete
      error
    >
      <calcite-notice active width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-3-title", "Set member properties")}"
      item-subtitle="${text("item-3-subtitle", "")}"
      active
    >
      <calcite-notice active width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-4-title", "Confirm and complete")}"
      item-subtitle="${text("item-4-subtitle", "Disabled example")}"
      disabled
    >
      <calcite-notice active width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
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
      item-title="${text("item-1-title", "Choose method")}"
      item-subtitle="${text("item-1-subtitle", "Add members without sending invitations")}"
      complete
    >
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-2-title", "Compile member list")}"
      item-subtitle="${text("item-2-subtitle", "")}"
      complete
      error
    >
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-3-title", "Set member properties")}"
      item-subtitle="${text("item-3-subtitle", "")}"
      selected
    >
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-4-title", "Confirm and complete")}"
      item-subtitle="${text("item-4-subtitle", "Disabled example")}"
      disabled
    >
    </calcite-stepper-item>
  </calcite-stepper>
`;

export const darkThemeRTL_TestOnly = (): string => html`
<div dir="rtl">
  <calcite-stepper
  class="calcite-theme-dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("numbered", true)}
    ${boolean("icon", true)}
  >
    <calcite-stepper-item
      item-title="${text("item-1-title", "Choose method")}"
      item-subtitle="${text("item-1-subtitle", "Add members without sending invitations")}"
      complete
    >
      <calcite-notice active width="full"><div slot=message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-2-title", "Compile member list")}"
      item-subtitle="${text("item-2-subtitle", "")}"
      complete
      error
    >
      <calcite-notice active width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-3-title", "Set member properties")}"
      item-subtitle="${text("item-3-subtitle", "")}"
      active
    >
      <calcite-notice active width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-4-title", "Confirm and complete")}"
      item-subtitle="${text("item-4-subtitle", "Disabled example")}"
      disabled
    >
      <calcite-notice active width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
</div>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const overriddenWidth_TestOnly = (): string => html` <calcite-stepper numbered style="width: 50vw">
  <calcite-stepper-item item-title="Choose method" item-subtitle="Add members without sending invitations" complete>
    <calcite-notice active width="full">
      <div slot="message">Step 1 Content Goes Here</div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item item-title="Compile member list" complete error>
    <calcite-notice active width="full">
      <div slot="message">Step 2 Content Goes Here</div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item item-title="Set member properties" item-subtitle="" active="">
    <calcite-notice active width="full">
      <div slot="message">Step 3 Content Goes Here</div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item item-title="Confirm and complete" item-subtitle="Disabled example" disabled="">
    <calcite-notice active width="full">
      <div slot="message">Step 4 Content Goes Here</div>
    </calcite-notice>
  </calcite-stepper-item>
</calcite-stepper>`;

export const disabled_TestOnly = (): string => html`<calcite-stepper>
  <calcite-stepper-item item-title="item1" complete>1</calcite-stepper-item>
  <calcite-stepper-item item-title="item2">2</calcite-stepper-item>
  <calcite-stepper-item item-title="item3" active>3</calcite-stepper-item>
  <calcite-stepper-item item-title="item4" disabled>4</calcite-stepper-item>
</calcite-stepper>`;

export const arabicNumberingSystem_TestOnly = (): string => html` <calcite-stepper
  numbered
  numbering-system="arab"
  lang="ar"
  dir="rtl"
  scale="s"
>
  <calcite-stepper-item item-title="الخطوةالاولى" complete>
    <calcite-notice active width="full">
      <div slot="message">الخطوة الأولى للمحتوى هنا</div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item item-title="الخطوة الثانية" complete>
    <calcite-notice active width="full">
      <div slot="message">الخطوة الثانية للمحتوى هنا</div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item item-title="الخطوة الثالثة" item-subtitle="بعض النصوص الفرعية" active>
    <calcite-notice active width="full">
      <div slot="message">الخطوة الثالثة المحتوى يذهب هنا</div>
    </calcite-notice>
  </calcite-stepper-item>
  <calcite-stepper-item item-title="الخطوة الرابعة">
    <calcite-notice active width="full">
      <div slot="message">الخطوة الرابعة المحتوى يذهب هنا</div>
    </calcite-notice>
  </calcite-stepper-item>
</calcite-stepper>`;
