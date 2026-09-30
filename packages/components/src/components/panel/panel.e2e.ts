import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, vi } from "vitest";
import { html } from "../../../support/formatting";

import { newProgrammaticE2EPage } from "../../tests/utils/puppeteer";
import { mockConsole } from "../../tests/utils/logging";
import { GlobalTestProps } from "../../tests/utils/types";
import { CSS, IDS, SLOTS } from "./resources";
import type { Panel } from "./panel";

type TestWindow = GlobalTestProps<{
  beforeClose: () => Promise<void>;
}>;

type TestPanelWindow = GlobalTestProps<{
  lastEventCancelable: boolean;
  lastEventDefaultPrevented: boolean;
  calledTimes: number;
}>;

const panelTemplate = (scrollable = false) =>
  html`<div style="height: 200px; display: flex">
    <calcite-panel>
      <div>
        ${scrollable ? '<p style="height: 400px">Hello world!</p>' : ""}
        <p>Hello world!</p>
      </div>
    </calcite-panel>
  </div>`;

const scrollingContentHtml = html`
  <p>
    Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo
    semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus
    habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non.
    Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti
    consectetur. Non porttitor tempor orci dictumst magna porta vitae.
  </p>
  <p>
    Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida. Vehicula sem tristique
    sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis ridiculus vulputate, habitant inceptos! Nunc
    torquent lorem urna vehicula volutpat donec nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet
    tellus tempor quisque ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
    gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis condimentum. Nec elit turpis
    leo.
  </p>
  <p>
    Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis aliquam dictum venenatis
    fringilla. Taciti venenatis, ultrices sollicitudin consequat. Sapien fusce est iaculis potenti ut auctor potenti.
    Nisi malesuada feugiat vulputate vitae porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur
    gravida cras scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere curabitur fermentum
    diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis. Vel lacus magnis nunc.
  </p>
  <p>
    Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo
    semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus
    habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non.
    Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti
    consectetur. Non porttitor tempor orci dictumst magna porta vitae.
  </p>
  <p>
    Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida. Vehicula sem tristique
    sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis ridiculus vulputate, habitant inceptos! Nunc
    torquent lorem urna vehicula volutpat donec nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet
    tellus tempor quisque ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
    gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis condimentum. Nec elit turpis
    leo.
  </p>
  <p>
    Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis aliquam dictum venenatis
    fringilla. Taciti venenatis, ultrices sollicitudin consequat. Sapien fusce est iaculis potenti ut auctor potenti.
    Nisi malesuada feugiat vulputate vitae porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur
    gravida cras scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere curabitur fermentum
    diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis. Vel lacus magnis nunc.
  </p>
`;

const scrollingHeightStyle = "height: 200px;";

mockConsole();

it("honors closed prop", async () => {
  const page = await newE2EPage();

  await page.setContent("<calcite-panel closable>test</calcite-panel>");

  const element = await page.find("calcite-panel");
  const container = await page.find(`calcite-panel >>> .${CSS.container}`);

  await page.waitForChanges();

  expect(await container.isVisible()).toBe(true);

  element.setProperty("closed", true);

  await page.waitForChanges();

  expect(await element.getProperty("closed")).toBe(true);

  expect(await container.isVisible()).toBe(false);
});

it("honors closed prop initially", async () => {
  const page = await newE2EPage();

  await page.setContent("<calcite-panel closed closable>test</calcite-panel>");

  const container = await page.find(`calcite-panel >>> .${CSS.container}`);

  await page.waitForChanges();

  expect(await container.isVisible()).toBe(false);
});

describe("beforeClose", () => {
  it("should handle rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    const mockCallBack = vi.fn().mockReturnValue(() => Promise.reject());
    await page.exposeFunction("beforeClose", mockCallBack);

    await page.setContent(html`<calcite-panel closable></calcite-panel>`);

    await page.$eval("calcite-panel", (el: Panel["el"]) => (el.beforeClose = (window as TestWindow).beforeClose));
    await page.waitForChanges();

    const panel = await page.find("calcite-panel");
    expect(await panel.getProperty("closed")).toBe(false);
    panel.setProperty("closed", true);
    await page.waitForChanges();

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it("should remain open with rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    await page.exposeFunction("beforeClose", () => Promise.reject());
    await page.setContent(html`<calcite-panel closable></calcite-panel>`);

    await page.$eval("calcite-panel", (el: Panel["el"]) => (el.beforeClose = (window as TestWindow).beforeClose));

    const panel = await page.find("calcite-panel");
    panel.setProperty("closed", true);
    await page.waitForChanges();

    expect(await panel.getProperty("closed")).toBe(false);
    expect(panel.getAttribute("closed")).toBe(null); // Makes sure attribute is added back
  });

  it("does not invoke beforeClose when initially closed", async () => {
    const page = await newProgrammaticE2EPage();
    await page.evaluate(async () => {
      const panel = document.createElement("calcite-panel");
      panel.closed = true;
      panel.beforeClose = () => new Promise(() => document.body.removeChild(panel));
      document.body.append(panel);
    });
    await page.waitForChanges();

    expect(await page.find("calcite-panel")).not.toBeNull();
  });
});

it("honors collapsed & collapsible properties", async () => {
  const page = await newE2EPage();

  await page.setContent("<calcite-panel collapsed>test</calcite-panel>");

  const element = await page.find("calcite-panel");
  const container = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);
  const collapseButtonSelector = `calcite-panel >>> #${IDS.collapse}`;
  expect(await page.find(collapseButtonSelector)).toBeNull();

  await page.waitForChanges();

  expect(await container.isVisible()).toBe(true);

  element.setProperty("collapsible", true);

  await page.waitForChanges();

  expect(await element.getProperty("collapsible")).toBe(true);
  expect(await page.find(collapseButtonSelector)).not.toBeNull();
  expect(await container.isVisible()).toBe(false);
});

it("close event should fire when closed", async () => {
  const page = await newE2EPage({ html: "<calcite-panel closable>test</calcite-panel>" });

  const calcitePanelClose = await page.spyOnEvent("calcitePanelClose", "window");

  const closeButton = await page.find(`calcite-panel >>> #${IDS.close}`);

  await closeButton.click();

  expect(calcitePanelClose).toHaveReceivedEventTimes(1);
});

it("close event can be cancelled", async () => {
  const page = await newProgrammaticE2EPage();
  await page.evaluate(() => {
    (window as TestPanelWindow).calledTimes = 0;

    const panel = document.createElement("calcite-panel");
    panel.heading = "Hello World";
    panel.closable = true;
    panel.innerText = "Hello World";

    panel.addEventListener("calcitePanelClose", (event) => {
      event.preventDefault();
      // needed to work around event spy limitation - details are captured before event is canceled
      (window as TestPanelWindow).lastEventCancelable = event.cancelable;
      (window as TestPanelWindow).lastEventDefaultPrevented = event.defaultPrevented;
      (window as TestPanelWindow).calledTimes++;
    });

    document.body.append(panel);
  });
  await page.waitForChanges();

  const panel = await page.find("calcite-panel");
  const closeButton = await page.find(`calcite-panel >>> #${IDS.close}`);
  await closeButton.click();
  await page.waitForChanges();

  const calledTimes = await page.evaluate(() => (window as TestPanelWindow).calledTimes);
  const lastEventCancelable = await page.evaluate(() => (window as TestPanelWindow).lastEventCancelable);
  const lastEventDefaultPrevented = await page.evaluate(() => (window as TestPanelWindow).lastEventDefaultPrevented);

  expect(calledTimes).toBe(1);
  expect(lastEventCancelable).toBe(true);
  expect(lastEventDefaultPrevented).toBe(true);
  expect(await panel.getProperty("closed")).toBe(false);
});

it("toggle event should fire when collapsed", async () => {
  const page = await newE2EPage();
  await page.setContent("<calcite-panel collapsible>Hello World!</calcite-panel>");
  await page.waitForChanges();

  const calcitePanelToggle = await page.spyOnEvent("calcitePanelToggle", "window");

  const toggleButton = await page.find(`calcite-panel >>> #${IDS.collapse}`);

  await toggleButton.click();

  expect(calcitePanelToggle).toHaveReceivedEventTimes(1);
});

it("should set embedded on slotted alerts", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-panel>
      Hello World!
      <calcite-alert slot="alerts" open label="this is a default alert">
        <div slot="title">Hello there!</div>
        <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
      </calcite-alert>
    </calcite-panel>`,
  );
  await page.waitForChanges();

  const alert = await page.find("calcite-alert");

  expect(await alert.getProperty("embedded")).toBe(true);
});

it("honors calcitePanelScroll event", async () => {
  const page = await newE2EPage({
    html: "<calcite-panel>test</calcite-panel>",
  });

  const scrollSpy = await page.spyOnEvent("calcitePanelScroll");

  await page.evaluate((contentContainerSelector) => {
    const contentContainer = document
      .querySelector("calcite-panel")!
      .shadowRoot!.querySelector(contentContainerSelector)!;

    contentContainer.dispatchEvent(new CustomEvent("scroll"));
  }, `.${CSS.contentWrapper}`);

  await page.waitForChanges();

  expect(scrollSpy).toHaveReceivedEventTimes(1);
});

it("should have default heading", async () => {
  const page = await newE2EPage();

  await page.setContent('<calcite-panel heading="test heading"></calcite-panel>');

  const element = await page.find(`calcite-panel >>> .${CSS.heading}`);

  expect(element).toEqualText("test heading");
});

it("should have default description", async () => {
  const page = await newE2EPage();

  await page.setContent('<calcite-panel description="test description"></calcite-panel>');

  const element = await page.find(`calcite-panel >>> .${CSS.description}`);

  expect(element).toEqualText("test description");
});

it("should not render a header if there are no actions or content", async () => {
  const page = await newE2EPage();

  await page.setContent("<calcite-panel>test</calcite-panel>");

  const header = await page.find(`calcite-panel >>> .${CSS.header}`);

  expect(await header.isVisible()).toBe(false);
});

it("should render a header if slotted content and no header is present", async () => {
  const page = await newE2EPage();

  await page.setContent("<calcite-panel><div slot='content-top'>test</div></calcite-panel>");

  const header = await page.find(`calcite-panel >>> .${CSS.header}`);

  expect(await header.isVisible()).toBe(true);
});

it("menuOpen should show/hide when toggled", async () => {
  const page = await newE2EPage();

  await page.setContent(
    html`<calcite-panel>
      <calcite-action slot="${SLOTS.headerMenuActions}" text="hello"></calcite-action>
      <calcite-action slot="${SLOTS.headerMenuActions}" text="hello2"></calcite-action>
    </calcite-panel>`,
  );

  await page.waitForChanges();

  const element = await page.find("calcite-panel");

  expect(element.getAttribute("menuOpen")).toBeNull();

  element.setProperty("menuOpen", true);

  await page.waitForChanges();

  const menu = await page.find(`calcite-panel >>> calcite-action-menu`);

  expect(menu).not.toBeNull();

  const menuVisible = await menu.isVisible();

  expect(menuVisible).toBe(true);

  const menuOpen = await menu.getProperty("open");

  expect(menuOpen).toBe(true);
});

it("should not render start or end actions containers when there are no start or end actions", async () => {
  const page = await newE2EPage();

  await page.setContent("<calcite-panel></calcite-panel>");

  const actionsContainerStart = await page.find(`calcite-panel >>> .${CSS.headerActionsStart}`);
  const actionsContainerEnd = await page.find(`calcite-panel >>> .${CSS.headerActionsEnd}`);

  expect(await actionsContainerStart.isVisible()).toBe(false);
  expect(await actionsContainerEnd.isVisible()).toBe(false);
});

it("header-content should override heading and description properties", async () => {
  const page = await newE2EPage();

  await page.setContent(
    html`<calcite-panel heading="test heading" description="test description">
      <div slot=${SLOTS.headerContent}>custom header content</div>
    </calcite-panel>`,
  );

  const heading = await page.find(`calcite-panel >>> ${CSS.heading}`);
  const description = await page.find(`calcite-panel >>> ${CSS.description}`);
  const header = await page.find(`calcite-panel >>> ${CSS.header}`);

  expect(heading).toBeNull();
  expect(description).toBeNull();
  expect(header).not.toBeNull();
});

it("should not render footer node if there are no actions or content", async () => {
  const page = await newE2EPage();

  await page.setContent("<calcite-panel>test</calcite-panel>");

  const footer = await page.find(`calcite-panel >>> .${CSS.footer}`);

  expect(await footer.isVisible()).toBe(false);
});

it("should set tabIndex of -1 on a non-scrollable panel", async () => {
  const page = await newE2EPage();

  await page.setContent(panelTemplate());

  const scrollEl = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);

  expect(await scrollEl.getProperty("tabIndex")).toBe(-1);
});

it("should set tabIndex of 0 on a scrollable panel", async () => {
  const page = await newE2EPage();

  await page.setContent(panelTemplate(true));

  const scrollEl = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);

  expect(await scrollEl.getProperty("tabIndex")).toBe(0);
});

it("handles scrollContentTo method", async () => {
  const page = await newE2EPage();

  await page.setContent(panelTemplate(true));

  const scrollEl = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);

  expect(await scrollEl.getProperty("scrollTop")).toBe(0);

  await page.$eval("calcite-panel", async (panel: Panel["el"]) => {
    await panel.scrollContentTo({ top: 100 });
  });

  expect(await scrollEl.getProperty("scrollTop")).toBe(100);
});

describe("closable", () => {
  describe("with scrollable content (Escape emits from scroll container)", () => {
    it("should close when Escape key is pressed and closable is true", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-panel style="${scrollingHeightStyle}">${scrollingContentHtml}</calcite-panel>`,
      );
      const panel = await page.find("calcite-panel");
      const calcitePanelClose = await panel.spyOnEvent("calcitePanelClose");
      const contentWrapper = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);
      const container = await page.find(`calcite-panel >>> .${CSS.container}`);
      expect(await panel.getProperty("closed")).toBe(false);
      expect(await container.isVisible()).toBe(true);
      await contentWrapper.press("Escape");
      await page.waitForChanges();
      expect(await panel.getProperty("closed")).toBe(false);
      expect(await container.isVisible()).toBe(true);
      panel.setProperty("closable", true);
      await page.waitForChanges();

      await contentWrapper.press("Escape");
      await page.waitForChanges();
      expect(await panel.getProperty("closed")).toBe(true);
      expect(await container.isVisible()).toBe(false);
      expect(calcitePanelClose).toHaveReceivedEventTimes(1);
    });

    it("should not close parent panels when close button is pressed", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-panel id="parent" heading="Top panel">
          Some content
          <calcite-panel id="child" heading="Child panel" closable>
            Closing this panel will close the parent panel. This is a regression from next.36.
          </calcite-panel>
        </calcite-panel>`,
      );

      const parentPanel = await page.find("calcite-panel#parent");
      const childPanel = await page.find("calcite-panel#child");

      const childCloseButton = await childPanel.find(`calcite-panel >>> #${IDS.close}`);
      await childCloseButton.click();
      await page.waitForChanges();

      expect(await parentPanel.getProperty("closed")).toBe(false);
      expect(await childPanel.getProperty("closed")).toBe(true);
    });

    it("should not close when Escape key is prevented and closable is true", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-panel closable style="${scrollingHeightStyle}">${scrollingContentHtml}</calcite-panel>`,
      );
      const panel = await page.find("calcite-panel");
      const calcitePanelClose = await panel.spyOnEvent("calcitePanelClose");
      const container = await page.find(`calcite-panel >>> .${CSS.container}`);

      expect(await panel.getProperty("closed")).toBe(false);
      expect(await container.isVisible()).toBe(true);

      await page.$eval("calcite-panel", (panel: Panel["el"]) => {
        panel.ownerDocument.addEventListener(
          "keydown",
          (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
            }
          },
          { capture: true },
        );
      });

      await panel.press("Escape");
      await page.waitForChanges();

      expect(await panel.getProperty("closed")).toBe(false);
      expect(await container.isVisible()).toBe(true);
      expect(calcitePanelClose).toHaveReceivedEventTimes(0);
    });
  });

  describe("without scrollable content (Escape emits from close button)", () => {
    it("should close when Escape key is pressed and closable is true", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-panel closable>non-scrolling content</calcite-panel>`);
      const panel = await page.find("calcite-panel");
      const calcitePanelClose = await panel.spyOnEvent("calcitePanelClose");
      const closeButton = await page.find(`calcite-panel >>> #${IDS.close}`);
      const container = await page.find(`calcite-panel >>> .${CSS.container}`);
      expect(await panel.getProperty("closed")).toBe(false);
      expect(await container.isVisible()).toBe(true);
      expect(calcitePanelClose).toHaveReceivedEventTimes(0);

      await closeButton.callMethod("setFocus");
      await closeButton.press("Escape");
      await page.waitForChanges();

      expect(await panel.getProperty("closed")).toBe(true);
      expect(await container.isVisible()).toBe(false);
      expect(calcitePanelClose).toHaveReceivedEventTimes(1);
    });
  });
});

it("should emit expanded/collapsed events when toggled", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-panel heading="Test"></calcite-panel>`);
  const item = await page.find("calcite-panel");

  const expandSpy = await page.spyOnEvent("calcitePanelExpand");
  const collapseSpy = await page.spyOnEvent("calcitePanelCollapse");

  item.setProperty("collapsed", true);
  await page.waitForChanges();
  expect(await item.getProperty("collapsed")).toBe(true);
  expect(expandSpy).toHaveReceivedEventTimes(0);
  expect(collapseSpy).toHaveReceivedEventTimes(1);

  item.setProperty("collapsed", false);
  await page.waitForChanges();
  expect(await item.getProperty("collapsed")).toBe(false);
  expect(expandSpy).toHaveReceivedEventTimes(1);
  expect(collapseSpy).toHaveReceivedEventTimes(1);
});
