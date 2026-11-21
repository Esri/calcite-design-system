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

describe("navigation action", () => {
  it("renders the navigation action when navigationAction is toggled after initialization", async () => {
    const { el, reRender } = await mount<Navigation>(<calcite-navigation label="Menu" />);
    const navigationAction = page.getByRole("button", { name: "Menu" });

    await expect.element(navigationAction).not.toBeInTheDocument();

    el.navigationAction = true;
    await reRender();

    await expect.element(navigationAction).toBeInTheDocument();
    expect(el.navigationAction).toBe(true);

    el.navigationAction = false;
    await reRender();

    await expect.element(navigationAction).not.toBeInTheDocument();
    expect(el.navigationAction).toBe(false);
  });

  it("disables navigationAction when an element is slotted into the navigation-action slot", async () => {
    const { el } = await mount<Navigation>(<calcite-navigation label="Menu" navigation-action />);

    await expect.element(page.getByRole("button", { name: "Menu" })).toBeInTheDocument();

    const customAction = document.createElement("calcite-action");
    customAction.slot = "navigation-action";
    customAction.text = "Custom";
    el.append(customAction);

    await expect.poll(() => el.navigationAction).toBe(false);
    await expect.element(page.getByRole("button", { name: "Menu" })).not.toBeInTheDocument();
  });
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
