import { h } from "@arcgis/lumina";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  accessible,
} from "../../tests/commonTests/browser";
import type { Navigation } from "./navigation";

describe("accessible", () => {
  accessible(() => mount(`calcite-navigation`));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-navigation"),
    [
      {
        propertyName: "navigationAction",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

// navigationAction is incorrectly being reset when set to true dynamically - see https://github.com/Esri/calcite-design-system/issues/14057
describe.skip("reflects", () => {
  reflects(
    () => mount("calcite-navigation"),
    [
      {
        propertyName: "navigationAction",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-navigation"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-navigation>
          <calcite-navigation-logo heading="Walt's Chips" slot="logo" />
        </calcite-navigation>,
      ),
    { display: "block" },
  );
});

describe("is focusable", () => {
  focusable(() => mount(<calcite-navigation navigation-action />), {
    shadowFocusTargetSelector: "calcite-action",
  });
});

describe("scale propagation", () => {
  it("applies initial navigation scale to slotted navigation-logo, navigation-user, and nested navigation", async () => {
    await mount<Navigation>(
      <calcite-navigation scale="l">
        <calcite-navigation-logo heading="Heading text" slot="logo" />
        <calcite-navigation-user full-name="John Doe" slot="user" username="jdoe" />
        <calcite-navigation slot="navigation-secondary" />
        <calcite-navigation slot="navigation-tertiary" />
      </calcite-navigation>,
    );

    const logo = page.getBySelector("calcite-navigation-logo");
    const user = page.getBySelector("calcite-navigation-user");
    const secondaryNavigation = page.getBySelector(
      'calcite-navigation[slot="navigation-secondary"]',
    );
    const tertiaryNavigation = page.getBySelector('calcite-navigation[slot="navigation-tertiary"]');

    await expect.element(logo).toHaveProperty("scale", "l");
    await expect.element(user).toHaveProperty("scale", "l");
    await expect.element(secondaryNavigation).toHaveProperty("scale", "l");
    await expect.element(tertiaryNavigation).toHaveProperty("scale", "l");
  });

  it("updates slotted navigation-logo, navigation-user, and nested navigation scale when navigation scale changes", async () => {
    const { el } = await mount<Navigation>(
      <calcite-navigation>
        <calcite-navigation-logo heading="Heading text" slot="logo" />
        <calcite-navigation-user full-name="John Doe" slot="user" username="jdoe" />
        <calcite-navigation slot="navigation-secondary" />
        <calcite-navigation slot="navigation-tertiary" />
      </calcite-navigation>,
    );

    const logo = page.getBySelector("calcite-navigation-logo");
    const user = page.getBySelector("calcite-navigation-user");
    const secondaryNavigation = page.getBySelector(
      'calcite-navigation[slot="navigation-secondary"]',
    );
    const tertiaryNavigation = page.getBySelector('calcite-navigation[slot="navigation-tertiary"]');

    await expect.element(logo).toHaveProperty("scale", "m");
    await expect.element(user).toHaveProperty("scale", "m");
    await expect.element(secondaryNavigation).toHaveProperty("scale", "m");
    await expect.element(tertiaryNavigation).toHaveProperty("scale", "m");

    el.scale = "l";

    await expect.element(logo).toHaveProperty("scale", "l");
    await expect.element(user).toHaveProperty("scale", "l");
    await expect.element(secondaryNavigation).toHaveProperty("scale", "l");
    await expect.element(tertiaryNavigation).toHaveProperty("scale", "l");
  });

  it("updates nested navigation scale when slot is reassigned to navigation-secondary", async () => {
    await mount<Navigation>(
      <calcite-navigation scale="l">
        <calcite-navigation id="nested-navigation" />
      </calcite-navigation>,
    );

    const nestedNavigation = page.getBySelector("#nested-navigation");
    const nestedNavigationEl = nestedNavigation.element() as Navigation["el"];

    await expect.element(nestedNavigation).toHaveProperty("scale", "m");

    nestedNavigationEl.slot = "navigation-secondary";

    await expect.element(nestedNavigation).toHaveProperty("scale", "l");
  });
});

it("should emit calciteNavigationActionSelect event when user interacts with navigation-action", async () => {
  const { el } = await mount(<calcite-navigation label="Menu" navigation-action />);
  const actionSelectHandler = vi.fn();
  el.addEventListener("calciteNavigationActionSelect", actionSelectHandler);
  const hamburgerMenu = page.getByRole("button", { name: "Menu" });

  await userEvent.keyboard("{Tab}");
  expect(actionSelectHandler).toHaveBeenCalledTimes(0);

  await userEvent.keyboard("{Enter}");
  expect(actionSelectHandler).toHaveBeenCalledTimes(1);

  await userEvent.keyboard("{Space}");
  expect(actionSelectHandler).toHaveBeenCalledTimes(2);

  await userEvent.keyboard("{Tab}");
  expect(actionSelectHandler).toHaveBeenCalledTimes(2);

  await userEvent.click(hamburgerMenu);
  expect(actionSelectHandler).toHaveBeenCalledTimes(3);
});
