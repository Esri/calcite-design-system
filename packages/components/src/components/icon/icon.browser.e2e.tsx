import { h } from "@arcgis/lumina";
import { defaults, reflects, hidden, renders, accessible, themed } from "../../tests/commonTests/browser";
import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { CSS } from "./resources";
import type { Icon } from "./icon";
import { scaleToPx } from "./utils";

describe("accessible", () => {
  accessible(() => mount(<calcite-icon icon="a-z" text-label="sort options" />));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-icon"),
    [
      { propertyName: "flipRtl", defaultValue: false },
      { propertyName: "preload", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-icon"),
    [
      { propertyName: "flipRtl", value: true },
      { propertyName: "preload", value: true },
      { propertyName: "scale", value: "m" },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-icon"));
});

describe("renders", () => {
  renders(() => mount("calcite-icon"), { display: "inline-flex" });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-icon"), {
      "--calcite-icon-color": {
        targetProp: "color",
      },
    });
  });
  describe("deprecated", () => {
    themed(() => mount("calcite-icon"), {
      "--calcite-ui-icon-color": {
        targetProp: "color",
      },
    });
  });
});

it("flips icon when enabled and in RTL", async () => {
  const { el } = await mount<Icon>(<calcite-icon icon="a-z" />);
  const flipRtlIconSelector = page.getBySelector(`calcite-icon .${CSS.flipRtl}`);

  await expect.element(flipRtlIconSelector).not.toBeInTheDocument();

  el.dir = "rtl";
  el.flipRtl = true;

  await expect.element(flipRtlIconSelector).toBeInTheDocument();
});

describe("rendering", () => {
  it("uses path data to render icon", async () => {
    await mount<Icon>(<calcite-icon icon="a-z" />);
    const path = page.getBySelector(`calcite-icon path`);

    await expect.element(path).not.toHaveAttribute("d", "");
  });

  it.for([
    ["letter-only", "a-z", "aZ"],
    ["numeric", "number-circle-1", "numberCircle1"],
  ] as const)(
    "supports %s icon names in both camelCase and kebab-case",
    async ([, kebabCaseIcon, camelCaseIcon]) => {
      const { el, reRender } = await mount<Icon>(<calcite-icon icon={kebabCaseIcon} />);
      const path = page.getBySelector(`calcite-icon path`);
      const iconPathData = path.element().getAttribute("d");

      el.icon = camelCaseIcon;
      await reRender();

      await expect.element(path).toHaveAttribute("d", iconPathData);
    },
  );

  describe("icon-loading when it's close to viewport", () => {
    it("default (no preload)", async () => {
      const { el, reRender } = await mount(<calcite-icon icon="a-z" style="margin-top: 1000px" />);
      const path = page.getBySelector(`calcite-icon path`);

      await expect.element(path).toHaveAttribute("d", "");

      el.removeAttribute("style");
      await reRender();

      await expect.element(path).not.toHaveAttribute("d", "");
    });

    it("preload", async () => {
      await mount(<calcite-icon icon="a-z" preload style="margin-top: 1000px" />);
      const path = page.getBySelector(`calcite-icon path`);

      await expect.element(path).not.toHaveAttribute("d", "");
    });
  });

  describe("scales", () => {
    const scales = ["s", "m", "l"] as const;

    scales.forEach((scale) =>
      it(`${scale} scale`, async () => {
        const { el } = await mount<Icon>(<calcite-icon icon="a-z" scale={scale} />);
        const computedStyle = window.getComputedStyle(el);
        const svg = page.getBySelector(`calcite-icon ${CSS.svg}`);
        const sizeInPx = scaleToPx[scale];

        expect(computedStyle.height).toBe(`${sizeInPx}px`);
        expect(computedStyle.width).toBe(`${sizeInPx}px`);
        await expect.element(svg).toHaveAttribute("width", "100%");
        await expect.element(svg).toHaveAttribute("height", "100%");
        await expect.element(svg).toHaveAttribute("viewBox", `0 0 ${sizeInPx} ${sizeInPx}`);
      }),
    );
  });
});
