import { describe } from "vitest";
import {
  //accessible,
  defaults,
  disabled,
  hidden,
  floatingUIOwner,
  //formAssociated,
  labelable,
  //openClose,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("calcite-autocomplete", () => {
  describe("renders", () => {
    renders("calcite-autocomplete", { display: "block" });
  });

  describe("defaults", () => {
    defaults("calcite-autocomplete", [
      {
        propertyName: "clearDisabled",
        defaultValue: false,
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-autocomplete", [
      {
        propertyName: "allowCustomValues",
        value: true,
      },
      {
        propertyName: "clearDisabled",
        value: true,
      },
      {
        propertyName: "form",
        value: "test-form",
      },
      {
        propertyName: "maxItems",
        value: 1,
      },
      {
        propertyName: "name",
        value: "test-name",
      },
      {
        propertyName: "open",
        value: true,
      },
      {
        // needs to run after `open` since it resets `open` after it's asserted value
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "placeholderIcon",
        value: "banana",
      },
      {
        propertyName: "placeholderIconFlipRtl",
        value: true,
      },
      {
        propertyName: "required",
        value: true,
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "selectionMode",
        value: "single",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ]);
  });

  describe("translation support", () => {
    t9n("calcite-autocomplete");
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-autocomplete");
  });

  // describe("accessible", () => {
  //   accessible(html`
  //     <calcite-combobox label="Trees" value="Trees">
  //       <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
  //     </calcite-combobox>
  //   `);
  // });

  describe("labelable", () => {
    labelable("calcite-autocomplete");
  });

  describe("disabled", () => {
    disabled("calcite-autocomplete", {
      focusTarget: {
        tab: "calcite-combobox",
        click: {
          pointer: "calcite-combobox",
          method: "calcite-combobox",
        },
      },
    });
  });

  // const simpleComboboxHTML = html`
  //   <calcite-combobox id="myCombobox">
  //     <calcite-combobox-item value="Raising Arizona" text-label="Raising Arizona"></calcite-combobox-item>
  //     <calcite-combobox-item value="Miller's Crossing" text-label="Miller's Crossing"></calcite-combobox-item>
  //     <calcite-combobox-item value="The Hudsucker Proxy" text-label="The Hudsucker Proxy"></calcite-combobox-item>
  //     <calcite-combobox-item value="Inside Llewyn Davis" text-label="Inside Llewyn Davis"></calcite-combobox-item>
  //   </calcite-combobox>
  // `;

  // describe("openClose", () => {
  //   openClose(simpleComboboxHTML);
  // });

  // describe("is form-associated", () => {
  //   formAssociated(
  //     html`<calcite-combobox selection-mode="single">
  //       <calcite-combobox-item id="one" icon="banana" value="one" text-label="One"></calcite-combobox-item>
  //       <calcite-combobox-item id="two" icon="beaker" value="two" text-label="Two" selected></calcite-combobox-item>
  //       <calcite-combobox-item id="three" value="three" text-label="Three"></calcite-combobox-item>
  //     </calcite-combobox>`,
  //     { testValue: "two", submitsOnEnter: true, validation: true, changeValueKeys: ["Space", "Enter"] },
  //   );
  // });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      html`
        <calcite-autocomplete>
          <calcite-autocomplete-item id="one" icon-start="banana" value="one" heading="One"></calcite-autocomplete-item>
          <calcite-autocomplete-item
            id="two"
            icon-start="beaker"
            value="two"
            heading="Two"
            selected
          ></calcite-autocomplete-item>
          <calcite-autocomplete-item id="three" value="three" heading="Three"></calcite-autocomplete-item>
        </calcite-autocomplete>
      `,
      "open",
      { shadowSelector: `.${CSS.floatingUIContainer}` },
    );
  });
});
