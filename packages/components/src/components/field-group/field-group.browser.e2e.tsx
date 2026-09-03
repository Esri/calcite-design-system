import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

type ScaledElement = HTMLElement & { scale?: string; updateComplete?: Promise<unknown> };

async function waitForUpdate(element: ScaledElement): Promise<void> {
  await element.updateComplete;
}

describe("defaults", () => {
  defaults(() => mount("calcite-field-group"), {
    columns: undefined,
    layout: "vertical",
    scale: "m",
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-group"), { columns: 2, layout: "columns", scale: "s" });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-field-group"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-field-group>
          <calcite-field-set>
            <calcite-input />
          </calcite-field-set>
        </calcite-field-group>,
      ),
    { display: "block" },
  );
});

describe("layout", () => {
  it("applies layout classes and the column count", async () => {
    const { el } = await mount(
      <calcite-field-group columns={2} layout="columns">
        <calcite-input />
        <calcite-input />
      </calcite-field-group>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(container.classList.contains(CSS.containerColumns)).toBe(true);
    expect(container.style.getPropertyValue("--calcite-internal-field-group-columns")).toBe("2");
  });

  it("uses the public columns custom property", async () => {
    const { el } = await mount(
      <calcite-field-group layout="columns" style={{ "--calcite-field-group-columns": "3" }}>
        <calcite-input />
        <calcite-input />
        <calcite-input />
      </calcite-field-group>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(getComputedStyle(container).gridTemplateColumns.split(" ")).toHaveLength(3);
  });
});

describe("scale propagation", () => {
  it("propagates scale through nested field groups", async () => {
    const { el } = await mount(
      <calcite-field-group scale="s">
        <calcite-field-set id="direct" />
        <calcite-field-group>
          <calcite-field-set id="nested" />
        </calcite-field-group>
      </calcite-field-group>,
    );
    const direct = el.querySelector<ScaledElement>("#direct")!;
    const nested = el.querySelector<ScaledElement>("#nested")!;

    await Promise.all([waitForUpdate(direct), waitForUpdate(nested)]);

    expect(direct.scale).toBe("s");
    expect(nested.scale).toBe("s");
  });
});

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-field-group>
          <calcite-input />
        </calcite-field-group>,
      ),
    {
      "--calcite-field-group-gap": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "gap",
      },
    },
  );

  themed(
    () =>
      mount(
        <calcite-field-group columns={2} layout="columns">
          <calcite-input />
          <calcite-input />
        </calcite-field-group>,
      ),
    {
      "--calcite-field-group-column-gap": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "columnGap",
      },
    },
  );
});
