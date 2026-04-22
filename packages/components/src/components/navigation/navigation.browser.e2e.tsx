import { h } from "@arcgis/lumina";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { defaults, reflects, hidden, renders, focusable } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-navigation"),
    [
      {
        propertyName: "navigationAction",
        defaultValue: false,
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

it("should emit calciteNavigationActionSelect event when user interacts with navigation-action", async () => {
  const { el } = await mount(<calcite-navigation label="Menu" navigation-action />);
  const actionSelectHandler = vi.fn();
  el.addEventListener("calciteNavigationActionSelect", actionSelectHandler);
  const hamburgerMenu = page.getByRole("button");

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
