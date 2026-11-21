import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  scalePropagates,
  accessible,
  themed,
} from "../../tests/common";
import type { Navigation } from "./navigation";
import { CSS } from "./resources";

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount(<calcite-navigation label="test" />));
  });

  describe("with navigation action and logo", () => {
    accessible(() =>
      mount(
        <calcite-navigation label="test" navigation-action>
          <calcite-navigation-logo heading="Test" />
        </calcite-navigation>,
      ),
    );
  });
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

describe("reflects", () => {
  reflects(
    () => mount("calcite-navigation"),
    [
      {
        propertyName: "navigationAction",
        value: true,
      },
    ],
  );

  it("shows and hides the fallback action when navigationAction changes", async () => {
    const { el } = await mount<Navigation>(<calcite-navigation label="Menu" />);
    const action = page.getByRole("button", { name: "Menu" });

    await expect.element(action).not.toBeInTheDocument();

    el.navigationAction = true;
    await expect.element(action).toBeVisible();
    await expect.element(el).toHaveProperty("navigationAction", true);

    el.navigationAction = false;
    await expect.element(action).not.toBeInTheDocument();

    el.navigationAction = true;
    await expect.element(action).toBeVisible();
    await expect.element(el).toHaveProperty("navigationAction", true);
  });

  it("uses a slotted action instead of the fallback action as slot assignments change", async () => {
    const { el } = await mount<Navigation>(
      <calcite-navigation label="Menu" navigation-action>
        <calcite-action slot="navigation-action" text="Custom menu" />
      </calcite-navigation>,
    );

    await expect.element(page.getByRole("button", { name: "Custom menu" })).toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Menu", exact: true }))
      .not.toBeInTheDocument();
    await expect.element(el).toHaveProperty("navigationAction", false);
    await expect.element(el).not.toHaveAttribute("navigation-action");

    const customAction = page.getBySelector('calcite-action[slot="navigation-action"]').element();
    customAction.remove();
    await expect.element(page.getByRole("button", { name: "Custom menu" })).not.toBeInTheDocument();

    el.navigationAction = true;
    await expect.element(page.getByRole("button", { name: "Menu", exact: true })).toBeVisible();
    await expect.element(el).toHaveProperty("navigationAction", true);

    el.append(customAction);
    await expect.element(page.getByRole("button", { name: "Custom menu" })).toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Menu", exact: true }))
      .not.toBeInTheDocument();
    await expect.element(el).toHaveProperty("navigationAction", false);
    await expect.element(el).not.toHaveAttribute("navigation-action");
  });
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

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-navigation>
          <calcite-navigation-logo slot="logo" />
          <calcite-navigation-user slot="user" />
          <calcite-navigation slot="navigation-secondary" />
          <calcite-navigation slot="navigation-tertiary" />
        </calcite-navigation>,
        mountOptions,
      ),
    {
      targetSelector:
        'calcite-navigation-logo, calcite-navigation-user, calcite-navigation[slot="navigation-secondary"], calcite-navigation[slot="navigation-tertiary"]',
    },
  );

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

describe("theme", () => {
  const navigationHtml = (
    <calcite-navigation>
      <calcite-navigation-logo
        description="Eastern Potato Chip Company"
        heading="Walt's Chips"
        icon="layers"
        slot="logo"
      />
      <calcite-navigation-user full-name="Walt McChipson" slot="user" username="waltChip" />
      <calcite-navigation slot="navigation-secondary">
        <calcite-menu slot="content-start">
          <calcite-menu-item breadcrumb icon-start="book" text="All Routes" text-enabled />
        </calcite-menu>
      </calcite-navigation>
      <calcite-navigation slot="navigation-tertiary">
        <calcite-menu slot="content-end">
          <calcite-menu-item breadcrumb icon-start="book" text="All Routes" text-enabled />
        </calcite-menu>
      </calcite-navigation>
    </calcite-navigation>
  );

  describe("default", () => {
    themed(() => mount(navigationHtml), {
      "--calcite-navigation-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-navigation-width": {
        shadowSelector: `.${CSS.containerContent}`,
        targetProp: "width",
      },
      "--calcite-navigation-border-color": [
        {
          shadowSelector: `.${CSS.primary}`,
          targetProp: "borderBlockEndColor",
        },
        {
          shadowSelector: `.${CSS.secondary}`,
          targetProp: "borderBlockEndColor",
        },
        {
          shadowSelector: `.${CSS.tertiary}`,
          targetProp: "borderBlockEndColor",
        },
      ],
    });
  });
});
