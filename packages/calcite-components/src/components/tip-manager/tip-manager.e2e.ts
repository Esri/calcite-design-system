import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders, t9n } from "../../tests/commonTests";
import { CSS, TEXT } from "./resources";
import { html } from "../../../support/formatting";

describe("calcite-tip-manager", () => {
  describe("renders", () => {
    renders("calcite-tip-manager", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tip-manager");
  });

  describe("first render", () => {
    it("should render and show the default title", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-tip-manager><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager>`
      );
      const tipManager = await page.find("calcite-tip-manager");
      expect(tipManager).not.toBeNull();
      const isVisible = await tipManager.isVisible();
      expect(isVisible).toBe(true);

      const title = await page.find(`calcite-tip-manager >>> .${CSS.heading}`);
      expect(title.innerText).toBe(TEXT.defaultGroupTitle);
    });

    describe("defaults", () => {
      defaults("calcite-tip-manager", [
        {
          propertyName: "headingLevel",
          defaultValue: undefined,
        },
      ]);
    });

    describe("accessible", () => {
      accessible(html`<calcite-tip-manager
        ><calcite-tip heading="sample"><p>basic render</p></calcite-tip></calcite-tip-manager
      >`);
    });

    it("should pre-select the correct tip if the selected attribute is set", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-tip-manager>
          <calcite-tip id="one"><p>no pre-selected attribute</p></calcite-tip>
          <calcite-tip id="two" selected><p>pre-selected and not first</p></calcite-tip>
        </calcite-tip-manager>`
      );

      await page.waitForChanges();

      const tipManager = await page.find("calcite-tip-manager");

      const selectedTip = await tipManager.find(`calcite-tip[selected]`);
      expect(selectedTip.id).toEqual("two");
    });
  });
  describe("close button", () => {
    it("should be hidden after the close button is clicked", async () => {
      const page = await newE2EPage({
        html: `<calcite-tip-manager><calcite-tip><p>Close behavior</p></calcite-tip></calcite-tip-manager>`,
      });

      const tipManager = await page.find("calcite-tip-manager");

      let container = await page.find(`calcite-tip-manager >>> .${CSS.container}`);
      let isVisible = await container.isVisible();
      expect(isVisible).toBe(true);

      const closeEventSpy = await page.spyOnEvent("calciteTipManagerClose", "window");

      const closeButton = await page.find(`calcite-tip-manager >>> .${CSS.close}`);
      await closeButton.click();
      await page.waitForChanges();

      container = await page.find(`calcite-tip-manager >>> .${CSS.container}`);

      isVisible = await container.isVisible();
      expect(isVisible).toBe(false);

      expect(closeEventSpy).toHaveReceivedEvent();

      const isClosed = await tipManager.getProperty("closed");

      expect(isClosed).toBe(true);
    });
  });
  describe("pagination", () => {
    it("should select the first tip by default and change the selectedIndex when the previous or next buttons are clicked", async () => {
      const page = await newE2EPage({
        html: `<calcite-tip-manager>
      <calcite-tip id="one"><p>first tip default selected</p></calcite-tip>
      <calcite-tip id="two"><p>next/prev behavior</p></calcite-tip>
    </calcite-tip-manager>`,
      });

      await page.waitForChanges();

      const tipManager = await page.find("calcite-tip-manager");

      let selectedTip = await tipManager.find(`calcite-tip[selected]`);
      expect(selectedTip.id).toEqual("one"); // default selected tip is index 0

      let paginationText = await page.find(`calcite-tip-manager >>> .${CSS.pagePosition}`);
      expect(paginationText.textContent).toEqual(`${TEXT.defaultPaginationLabel} 1/2`);

      const nextButton = await page.find(`calcite-tip-manager >>> .${CSS.pageNext}`);
      await nextButton.click();
      await page.waitForChanges();

      selectedTip = await tipManager.find(`calcite-tip[selected]`);
      expect(selectedTip.id).toEqual("two");

      paginationText = await page.find(`calcite-tip-manager >>> .${CSS.pagePosition}`);
      expect(paginationText.textContent).toEqual(`${TEXT.defaultPaginationLabel} 2/2`);

      const previousButton = await page.find(`calcite-tip-manager >>> .${CSS.pagePrevious}`);
      await previousButton.click();
      await page.waitForChanges();

      selectedTip = await tipManager.find(`calcite-tip[selected]`);
      expect(selectedTip.id).toEqual("one");

      paginationText = await page.find(`calcite-tip-manager >>> .${CSS.pagePosition}`);
      expect(paginationText.textContent).toEqual(`${TEXT.defaultPaginationLabel} 1/2`);
    });

    //Ø TODO: split the group-title test into one for first render, and another for pagination
    it("should update the group title to match the selected tips attribute", async () => {
      const sharedTitle = "group1";
      const title2 = "group2";

      const page = await newE2EPage({
        html: `<calcite-tip-manager>
      <calcite-tip-group group-title=${sharedTitle}>
        <calcite-tip><p>group title behavior</p></calcite-tip>
        <calcite-tip><p>same title as first one</p></calcite-tip>
      </calcite-tip-group>
      <calcite-tip-group group-title=${title2}>
        <calcite-tip ><p>different title</p></calcite-tip>
      </calcite-tip-group>
      <calcite-tip><p>default title</p></calcite-tip>
    </calcite-tip-manager>`,
      });

      await page.waitForChanges();

      const title = await page.find(`calcite-tip-manager >>> .${CSS.heading}`);
      expect(title.innerText).toBe(sharedTitle);

      const nextButton = await page.find(`calcite-tip-manager >>> .${CSS.pageNext}`);
      await nextButton.click();

      const sharedTitleNode = await page.find(`calcite-tip-manager >>> .${CSS.heading}`);
      expect(sharedTitleNode.innerText).toBe(sharedTitle);

      await nextButton.click();

      const title2Node = await page.find(`calcite-tip-manager >>> .${CSS.heading}`);
      expect(title2Node.innerText).toBe(title2);

      await nextButton.click();

      const defaultTitleNode = await page.find(`calcite-tip-manager >>> .${CSS.heading}`);
      expect(defaultTitleNode.innerText).toBe(TEXT.defaultGroupTitle);
    });
    it("pagination should be hidden if there is 1 or fewer tips", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-tip-manager><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager>`
      );

      const pagination = await page.find(`calcite-tip-manager >>> .${CSS.pagination}`);
      expect(pagination).toBeNull();
    });
  });
  describe("handling dom updates after initial render", () => {
    it("should update if tips are added after initial load", async () => {
      const page = await newE2EPage({
        html: `<calcite-tip-manager>
      <calcite-tip><p>dynamically adding/removing tips</p></calcite-tip>
    </calcite-tip-manager>`,
      });

      const tipManager = await page.find("calcite-tip-manager");
      const newTipId = "newTip";
      await page.evaluate((newId) => {
        const mgr = document.querySelector("calcite-tip-manager");
        const newTip = mgr.querySelector("calcite-tip:last-child").cloneNode(true);
        (newTip as HTMLElement).id = newId;
        mgr.appendChild(newTip);
      }, newTipId);
      await page.waitForChanges();

      const tips = await page.findAll("calcite-tip-manager calcite-tip");
      expect(tips.length).toBe(2);

      const nextButton = await page.find(`calcite-tip-manager >>> .${CSS.pageNext}`);
      await nextButton.click();
      await page.waitForChanges();

      const selectedTip = await tipManager.find(`calcite-tip[selected]`);
      expect(selectedTip.id).toEqual(newTipId);
    });
    it("should update visible tip if active tip is removed", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-tip-manager>
          <calcite-tip id="one"><p>dynamically adding/removing tips</p></calcite-tip>
          <calcite-tip id="two"><p>dynamically adding/removing tips</p></calcite-tip>
        </calcite-tip-manager>`
      );
      const tipManager = await page.find("calcite-tip-manager");

      await page.evaluate(() => {
        document.querySelector("calcite-tip:first-child").remove();
      });
      await page.waitForChanges();

      const selectedTip = await tipManager.find(`calcite-tip[selected]`);
      expect(selectedTip.id).toEqual("two");
    });
  });

  it("should set headingLevel of tip", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tip-manager heading-level="1">
        <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
      </calcite-tip-manager>`
    );

    await page.waitForChanges();

    const tipManager = await page.find("calcite-tip-manager");

    expect(await tipManager.getProperty("headingLevel")).toEqual(1);

    const heading = await page.find(`calcite-tip >>> .${CSS.heading}`);

    expect(heading.tagName).toEqual("H2");
  });

  describe("translation support", () => {
    t9n("calcite-tip-manager");
  });
});
