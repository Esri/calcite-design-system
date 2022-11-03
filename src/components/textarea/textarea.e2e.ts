import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  HYDRATED_ATTR,
  labelable,
  reflects
} from "../../tests/commonTests";

describe("calcite-textarea", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });

  it("defaults", async () => {
    defaults("calcite-textarea", [
      {
        propertyName: "wrap",
        defaultValue: "soft"
      },
      {
        propertyName: "scale",
        defaultValue: "m"
      }
    ]);
  });

  it("honors hidden attribute", () => hidden("calcite-textarea"));

  it("is labelable", () => labelable("calcite-textarea"));

  it("reflects", async () =>
    reflects("calcite-textarea", [
      {
        propertyName: "cols",
        value: "10"
      },
      {
        propertyName: "rows",
        value: "50"
      },
      {
        propertyName: "maxlength",
        value: "50"
      },
      {
        propertyName: "minlength",
        value: "10"
      },
      {
        propertyName: "scale",
        value: "s"
      }
    ]));

  it("is accessible", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-label>add notes<calcite-textarea maxlength="50" footer required name="something" form="myform"> </calcite-textarea></calcite-label>`
    );
    await accessible("calcite-textarea", page);
  });

  // it("can be disabled", () => disabled("calcite-textarea"));

  it("is focusable", () => focusable("calcite-textarea"));

  it("is form associated", () =>
    formAssociated("calcite-textarea", {
      testValue: "zion national park",
      expectedSubmitValue: "zion national park",
      submitsOnEnter: false
    }));

  // it("should emit calciteTextareaInput event when user starts typing", async () => {});
});
