import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, defaults, hidden, renders, t9n, themed } from "../../tests/common";
import { CSS } from "./resources";
import { userEvent, page } from "vitest/browser";
import { afterNextFrame } from "../../tests/utils/timing";
import { waitForEvent } from "../../tests/common/utils";

describe("accessible: checked", () => {
  accessible(() => mount("calcite-tab-nav"));
});

describe("defaults", () => {
  defaults(() => mount("calcite-tab-nav"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tab-nav"));
});

describe("renders", () => {
  renders(() => mount("calcite-tab-nav"), { display: "flex" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-tab-nav"));
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-tab-nav"), {
      "--calcite-tab-border-color": {
        shadowSelector: `.${CSS.scrollBackwardButton}::before`,
        targetProp: "backgroundColor",
      },
      "--calcite-tab-text-color": {
        shadowSelector: `calcite-button`,
        targetProp: "--calcite-button-text-color",
      },
    });
  });

  describe("bordered", () => {
    themed(() => mount(<calcite-tabs bordered />), {
      "--calcite-tab-background-color": {
        targetProp: "backgroundColor",
      },
    });
  });

  describe("prev/next buttons", () => {
    const clickAndWaitForScrollEnd = async (
      container: HTMLElement,
      button: HTMLButtonElement,
    ): Promise<void> => {
      const scrollEnd = waitForEvent(container, "scrollend");
      await userEvent.click(button);
      await scrollEnd;
    };

    it("should scroll tab title into view when next/previous button is clicked in a centered layout and host has a narrow width", async () => {
      await mount(
        <calcite-tab-nav layout="center" style={{ width: "200px" }}>
          <calcite-tab-title layout="center">Body začátku a konce</calcite-tab-title>
          <calcite-tab-title layout="center" selected>
            Časový interval
          </calcite-tab-title>
          <calcite-tab-title layout="center">Přehrávání</calcite-tab-title>
        </calcite-tab-nav>,
      );
      const container = page
        .getBySelector(`.${CSS.tabTitleSlotWrapper}`)
        .element() as HTMLDivElement;
      const tabTitle1 = page.getByText("Body začátku a konce");
      const tabTitle2 = page.getByText("Časový interval");
      const tabTitle3 = page.getByText("Přehrávání");
      const prevButton = page.getByLabelText(`Previous tab titles`).element() as HTMLButtonElement;
      const nextButton = page.getByLabelText(`Next tab titles`).element() as HTMLButtonElement;

      await afterNextFrame();
      await expect.element(tabTitle1).toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).not.toBeInViewport();

      await clickAndWaitForScrollEnd(container, nextButton);
      await afterNextFrame();
      await expect.element(tabTitle1).not.toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).toBeInViewport();

      await clickAndWaitForScrollEnd(container, prevButton);
      await afterNextFrame();
      await expect.element(tabTitle1).not.toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).toBeInViewport();

      await clickAndWaitForScrollEnd(container, prevButton);
      await afterNextFrame();
      await expect.element(tabTitle1).toBeInViewport();
      await expect.element(tabTitle2).not.toBeInViewport();
      await expect.element(tabTitle3).not.toBeInViewport();
    });

    it("should scroll tab title into view when next/previous button is clicked in an inline layout and host has a narrow width", async () => {
      await mount(
        <calcite-tabs bordered position="bottom" style={{ width: "300px" }}>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> First tab: watercraft </calcite-tab-title>
            <calcite-tab-title>Second tab: automobiles</calcite-tab-title>
            <calcite-tab-title>Third tab: aircraft</calcite-tab-title>
          </calcite-tab-nav>
        </calcite-tabs>,
      );

      const container = page
        .getBySelector(`.${CSS.tabTitleSlotWrapper}`)
        .element() as HTMLDivElement;
      const tabTitle1 = page.getByText("First tab: watercraft");
      const tabTitle2 = page.getByText("Second tab: automobiles");
      const tabTitle3 = page.getByText("Third tab: aircraft");
      const prevButton = page.getByLabelText(`Previous tab titles`).element() as HTMLButtonElement;
      const nextButton = page.getByLabelText(`Next tab titles`).element() as HTMLButtonElement;

      await afterNextFrame();
      await expect.element(tabTitle1).toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).not.toBeInViewport();

      await clickAndWaitForScrollEnd(container, nextButton);
      await afterNextFrame();
      await expect.element(tabTitle1).toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();

      await clickAndWaitForScrollEnd(container, nextButton);
      await afterNextFrame();
      await expect.element(tabTitle1).not.toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).toBeInViewport();

      await clickAndWaitForScrollEnd(container, prevButton);
      await afterNextFrame();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).toBeInViewport();

      await clickAndWaitForScrollEnd(container, prevButton);
      await afterNextFrame();
      await expect.element(tabTitle1).toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).not.toBeInViewport();
    });
  });
});
