import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(() => mount("calcite-field-row"), {
    layout: "vertical",
  });
});

describe("reflects", () => {
  reflects(() => mount("calcite-field-row"), {
    columns: 2,
    layout: "columns",
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-field-row"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-field-row>
          <calcite-input />
        </calcite-field-row>,
      ),
    { display: "block" },
  );
});

describe("layout", () => {
  it("applies the requested layout to its slotted content", async () => {
    const { el } = await mount(
      <calcite-field-row columns={2} layout="columns">
        <calcite-input />
        <calcite-input />
      </calcite-field-row>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(container.classList.contains(CSS.containerColumns)).toBe(true);
    expect(container.style.getPropertyValue("--calcite-internal-field-row-columns")).toBe("2");
  });

  it("uses the vertical layout by default", async () => {
    const { el } = await mount(
      <calcite-field-row>
        <calcite-input />
      </calcite-field-row>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(container.classList.contains(CSS.containerVertical)).toBe(true);
  });

  it("applies the horizontal layout", async () => {
    const { el } = await mount(
      <calcite-field-row layout="horizontal">
        <calcite-input />
      </calcite-field-row>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(container.classList.contains(CSS.containerHorizontal)).toBe(true);
  });
});

describe("theme", () => {
  it("uses Field Set spacing properties when its own spacing properties are not specified", async () => {
    const { el } = await mount(
      <calcite-field-row
        columns={2}
        layout="columns"
        style={{
          "--calcite-field-set-column-gap": "24px",
          "--calcite-field-set-input-gap": "16px",
        }}
      >
        <calcite-input />
        <calcite-input />
      </calcite-field-row>,
    );
    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;

    expect(getComputedStyle(container).rowGap).toBe("16px");
    expect(getComputedStyle(container).columnGap).toBe("24px");
  });

  themed(
    () =>
      mount(
        <calcite-field-row>
          <calcite-input />
        </calcite-field-row>,
      ),
    {
      "--calcite-field-row-gap": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "gap",
      },
    },
  );

  themed(
    () =>
      mount(
        <calcite-field-row columns={2} layout="columns">
          <calcite-input />
          <calcite-input />
        </calcite-field-row>,
      ),
    {
      "--calcite-field-row-column-gap": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "columnGap",
      },
    },
  );
});
