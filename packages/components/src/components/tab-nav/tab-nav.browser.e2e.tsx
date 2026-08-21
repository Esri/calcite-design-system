import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  defaults,
  hidden,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";
import { userEvent, page } from "vitest/browser";

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
    const waitForScrollEnd = (container: HTMLElement): Promise<void> =>
      new Promise((resolve) => {
        const handleScrollEnd = () => {
          container.removeEventListener("scrollend", handleScrollEnd);
          resolve();
        };

        container.addEventListener("scrollend", handleScrollEnd);
      });

    const clickAndWaitForScrollEnd = async (
      container: HTMLElement,
      event: typeof userEvent,
      button: Element,
    ): Promise<void> => {
      const scrollEnd = waitForScrollEnd(container);
      await event.click(button);
      await scrollEnd;
    };

    it("should scroll adjacent tab title into view when next button is clicked", async () => {
      await mount(
        <calcite-tab-nav layout="center" style={{ width: "200px" }}>
          <calcite-tab-title layout="center" selected>
            Body začátku a konce
          </calcite-tab-title>
          <calcite-tab-title layout="center">Časový interval</calcite-tab-title>
          <calcite-tab-title layout="center">Přehrávání</calcite-tab-title>
        </calcite-tab-nav>,
      );

      const container = page.getByTestId("tab-title-container").element() as HTMLElement;
      const tabTitle1 = page.getByText("Body začátku a konce");
      const tabTitle2 = page.getByText("Časový interval");
      const tabTitle3 = page.getByText("Přehrávání");
      const [prevButton, nextButton] = page.getByRole("button").elements();

      await clickAndWaitForScrollEnd(container, userEvent, nextButton);
      await expect.element(tabTitle1).toBeInViewport();
      await expect.element(tabTitle2).not.toBeInViewport();
      await expect.element(tabTitle3).not.toBeInViewport();

      await clickAndWaitForScrollEnd(container, userEvent, nextButton);
      await expect.element(tabTitle1).toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).not.toBeInViewport();

      await clickAndWaitForScrollEnd(container, userEvent, nextButton);
      await expect.element(tabTitle1).not.toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).toBeInViewport();

      await clickAndWaitForScrollEnd(container, userEvent, prevButton);
      await expect.element(tabTitle1).not.toBeInViewport();
      await expect.element(tabTitle2).toBeInViewport();
      await expect.element(tabTitle3).toBeInViewport();

      await clickAndWaitForScrollEnd(container, userEvent, prevButton);
      await expect.element(tabTitle1).toBeInViewport();
      await expect.element(tabTitle2).not.toBeInViewport();
      await expect.element(tabTitle3).not.toBeInViewport();
    });
  });
});
