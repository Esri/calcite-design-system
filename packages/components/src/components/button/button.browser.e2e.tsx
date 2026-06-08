import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import {
  defaults,
  focusable,
  hidden,
  t9n,
  disabled,
  renders,
} from "../../tests/commonTests/browser";

describe("renders", () => {
  renders(() => mount("calcite-button"), { display: "inline-block" });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-button"),
    [
      {
        propertyName: "alignment",
        defaultValue: "center",
      },
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "kind",
        defaultValue: "brand",
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "download",
        defaultValue: false,
      },
      {
        propertyName: "href",
        defaultValue: undefined,
      },
      {
        propertyName: "iconEnd",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: undefined,
      },
      {
        propertyName: "iconStart",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "name",
        defaultValue: undefined,
      },
      {
        propertyName: "rel",
        defaultValue: undefined,
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "round",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "splitChild",
        defaultValue: false,
      },
      {
        propertyName: "target",
        defaultValue: undefined,
      },
      {
        propertyName: "type",
        defaultValue: "button",
      },
      {
        propertyName: "width",
        defaultValue: "auto",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-button"));
});

describe("focusable", () => {
  focusable(() => mount("calcite-button"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-button"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-button"));
});

describe("automatic tooltip", () => {
  it("shows tooltip for buttons with truncated long text", async () => {
    const shortText = "Hi!";
    const longText =
      "This_long_text_contains_a_coded_map_for_hidden_treasures_of_Edward_Teach_aka_Blackbeard_._If_only_you_could_access_it_you_could_buy_out_The_Magic_Castle_on_Franklin_ave_Los_Angeles_like_you_ve_always_wanted.";

    const { reRender } = await mount(
      <div>
        <calcite-button id="one" style="width: 100px">
          {longText}
        </calcite-button>
        <calcite-button id="two" style="width: 100px">
          {shortText}
        </calcite-button>
      </div>,
    );
    await reRender();

    await expect
      .element(page.getByRole("button", { name: longText }))
      .toHaveAttribute("title", longText);
    await expect
      .element(page.getByRole("button", { name: shortText }))
      .not.toHaveAttribute("title");
  });

  it("does not show tooltip for buttons without text content", async () => {
    const { reRender } = await mount(
      <calcite-button scale="s" style="width: 32px; height: 32px">
        <calcite-icon icon="compass-needle" scale="m" />
      </calcite-button>,
    );
    await reRender();

    await expect.element(page.getByRole("button")).not.toHaveAttribute("title");
  });

  it("clears tooltip when slotted text is removed", async () => {
    const { el, reRender } = await mount(
      <calcite-button style="width: 100px">
        This_long_text_contains_a_coded_map_for_hidden_treasures_of_Edward_Teach_aka_Blackbeard
      </calcite-button>,
    );

    const button = page.getByRole("button");
    await expect
      .element(button)
      .toHaveAttribute(
        "title",
        "This_long_text_contains_a_coded_map_for_hidden_treasures_of_Edward_Teach_aka_Blackbeard",
      );

    el.innerHTML = `<calcite-icon icon="compass-needle" scale="m"></calcite-icon>`;
    await reRender();

    await expect.element(button).not.toHaveAttribute("title");
  });
});
