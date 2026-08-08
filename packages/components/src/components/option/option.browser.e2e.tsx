import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() => mount(`calcite-option`));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-option"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-option"),
    [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "selected",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-option"));
});

describe("renders", () => {
  renders(() => mount("calcite-option"), { display: "inline", visible: false });
});

it("falls back to the text content when value/label is not specified", async () => {
  const optionText = "one";
  const { el, reRender } = await mount(<calcite-option>{optionText}</calcite-option>);

  await expect.element(el).toHaveProperty("label", optionText);
  await expect.element(el).toHaveProperty("value", optionText);

  el.label = "two";
  el.value = 2;

  await reRender();

  await expect.element(el).toHaveProperty("label", "two");
  await expect.element(el).toHaveProperty("value", 2);

  el.label = undefined;
  el.value = undefined;

  await expect.element(el).toHaveProperty("label", optionText);
  await expect.element(el).toHaveProperty("value", optionText);

  el.label = "";
  el.value = "";

  await expect.element(el).toHaveProperty("label", optionText);
  await expect.element(el).toHaveProperty("value", "");

  el.label = null;
  el.value = null;

  await expect.element(el).toHaveProperty("label", optionText);
  await expect.element(el).toHaveProperty("value", optionText);

  const alternateLabel = "dos";
  el.innerText = alternateLabel;

  await expect.element(el).toHaveProperty("label", alternateLabel);
  await expect.element(el).toHaveProperty("value", alternateLabel);

  const charDataUpdateLabel = "tres";

  const textNode = el.childNodes[0] as Text;
  textNode.replaceData(0, textNode.length, charDataUpdateLabel);

  await expect.element(el).toHaveProperty("label", charDataUpdateLabel);
  await expect.element(el).toHaveProperty("value", charDataUpdateLabel);
});

describe("whitespace handling", () => {
  it("trims whitespace but preserves non-breaking spaces in text content", async () => {
    await mount(
      <>
        <calcite-option> spaces </calcite-option>
        <calcite-option>
          <br />
          breaks
          <br />
        </calcite-option>
        <calcite-option>&nbsp;non-breaking-space&nbsp;</calcite-option>
        {/* the following options disable prettier to preserve newlines */}
        {/* prettier-ignore */}
        <calcite-option>
            newlines
          </calcite-option>
        {/* prettier-ignore */}
        <calcite-option>multi
          line
          breaks
          </calcite-option>
      </>,
    );
    const options = page.getBySelector("calcite-option");
    const labels = options.elements().map((option: Option["el"]) => option.label);

    expect(labels).toEqual([
      "spaces",
      "breaks",
      "\u00A0non-breaking-space\u00A0",
      "newlines",
      "multi line breaks",
    ]);
  });

  it("preserves all whitespace when provided via label", async () => {
    await mount(
      <>
        <calcite-option label=" spaces (label) " />
        <calcite-option label="<br>breaks (label)<br>" />
        <calcite-option label="&nbsp;non-breaking-space (label)&nbsp;" />
        <calcite-option
          label={`
newlines (label)
`}
        />
        <calcite-option
          label={`multi
line
breaks (label)
`}
        />
      </>,
    );
    const options = page.getBySelector("calcite-option");
    const labels = options.elements().map((option: Option["el"]) => option.label);

    expect(labels).toEqual([
      " spaces (label) ",
      "<br>breaks (label)<br>",
      "&nbsp;non-breaking-space (label)&nbsp;",
      "\nnewlines (label)\n",
      "multi\nline\nbreaks (label)\n",
    ]);
  });
});
