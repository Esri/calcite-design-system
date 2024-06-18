import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders, slots, themed } from "../../tests/commonTests";
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { html } from "../../../support/formatting";
import { CSS, SLOTS } from "./resources";

describe("calcite-shell-center-row", () => {
  describe("renders", () => {
    renders("calcite-shell-center-row", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-shell-center-row");
  });

  describe("defaults", () => {
    defaults("calcite-shell-center-row", [
      {
        propertyName: "detached",
        defaultValue: false,
      },
      {
        propertyName: "heightScale",
        defaultValue: "s",
      },
      {
        propertyName: "position",
        defaultValue: "end",
      },
    ]);
  });

  describe("slots", () => {
    slots("calcite-shell-center-row", SLOTS);
  });

  it("should not render action bar container when there is no action-bar", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-shell-center-row></calcite-shell-center-row>");

    const actionBarContainer = await page.find(`calcite-shell-center-row >>> .${CSS.actionBarContainer}`);

    expect(actionBarContainer).toBeNull();
  });

  it("should render action bar container first when action bar has start position", async () => {
    const page = await newE2EPage();

    const pageContent = `
    <calcite-shell-center-row>
      <div>Hello</div>
      <calcite-action-bar slot=${SLOTS.actionBar} position="start">
        <calcite-action text="hello" icon="banana"></calcite-action>
      </calcite-action-bar>
    </calcite-shell-center-row>
    `;
    await page.setContent(pageContent);

    const element = await page.find("calcite-shell-center-row >>> div:first-of-type");

    await page.waitForChanges();
    expect(element).toHaveClass(CSS.actionBarContainer);
  });

  it("should render action bar container last when action bar has end position", async () => {
    const page = await newE2EPage();

    const pageContent = `
    <calcite-shell-center-row>
      <calcite-action-bar slot=${SLOTS.actionBar} position="end">
        <calcite-action text="hello" icon="banana"></calcite-action>
      </calcite-action-bar>
      <div>Hello</div>
    </calcite-shell-center-row>
    `;
    await page.setContent(pageContent);

    const element = await page.find("calcite-shell-center-row");

    await page.waitForChanges();

    expect(element.shadowRoot.lastElementChild).toHaveClass(CSS.actionBarContainer);
  });

  describe("accessible", () => {
    accessible(`
    <calcite-shell-center-row>
      <div>content</div>
      <calcite-action-bar slot=${SLOTS.actionBar}>
        <calcite-action text="hello" icon="banana"></calcite-action>
      </calcite-action-bar>
    </calcite-shell-center-row>
    `);
  });
});

describe("theme", () => {
  const shellCenterHtml = html`
    <calcite-shell-center-row detached slot="center-row">
      <calcite-action-bar class="calcite-mode-dark" slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
          <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
    </calcite-shell-center-row>
  `;
  describe("default", () => {
    const tokens: ComponentTestTokens = {
      "--calcite-shell-center-row-border-color": {
        selector: `calcite-action-bar`,
        targetProp: "borderColor",
      },
      "--calcite-shell-center-row-border-radius": {
        targetProp: "borderRadius",
      },
      "--calcite-shell-center-row-background-color": {
        targetProp: "backgroundColor",
      },
    };
    themed(shellCenterHtml, tokens);
  });
});
