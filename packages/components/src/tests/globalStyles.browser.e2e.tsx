import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { afterEach, expect, it } from "vitest";
import { css } from "../../support/formatting";

let testStylingOverride: HTMLStyleElement | undefined;

/**
 * This helps restore animations as they are disabled by default for tests.
 */
function overrideTestStyles(): void {
  testStylingOverride = document.createElement("style");
  testStylingOverride.innerHTML = css`
    :root {
      --calcite-duration-factor: 1;
    }
  `;
  document.head.append(testStylingOverride);
}

afterEach(() => {
  testStylingOverride?.remove();
  testStylingOverride = undefined;
});

it("should set animation duration to 0ms when --calcite-duration-factor set to zero", async () => {
  const { el } = await mount(<div style="transition: all var(--calcite-animation-timing) linear;" />);

  expect(window.getComputedStyle(el).transitionDuration).toEqual("0s");
});

it("should not be able to disable animations with --calcite-duration-factor at component level", async () => {
  overrideTestStyles();
  const { el } = await mount(<div style="transition: all var(--calcite-animation-timing) linear;" />);

  el.style.setProperty("--calcite-duration-factor", "0");

  expect(window.getComputedStyle(el).transitionDuration).toEqual("0.15s");
});

it("should set animation duration to default value 150ms", async () => {
  overrideTestStyles();
  const { el } = await mount(<div style="transition: all var(--calcite-animation-timing) linear;" />);

  expect(window.getComputedStyle(el).transitionDuration).toEqual("0.15s");
});
