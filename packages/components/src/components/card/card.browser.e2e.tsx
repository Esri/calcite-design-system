import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  hidden,
  focusable,
  renders,
  slots,
  t9n,
  reflects,
} from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-card"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-card"),
    [
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("focusable", () => {
  describe("default", () => {
    focusable(() => mount("calcite-card"));
  });

  describe("with interactive children", () => {
    focusable(() =>
      mount(
        <calcite-card id="parent">
          <div tabIndex={0}>focusable child</div>
        </calcite-card>,
      ),
    );
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-card"));
});

describe("renders", () => {
  renders(() => mount("calcite-card"), { display: "block" });
});

describe("slots", () => {
  slots(() => mount("calcite-card"), SLOTS, true);
});

describe("translation support", () => {
  t9n(() => mount("calcite-card"));
});
