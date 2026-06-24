import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, hidden, renders, focusable } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

mockConsole();

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-flow>
        <calcite-flow-item />
        <calcite-flow-item />
        <calcite-flow-item />
      </calcite-flow>,
    ),
  );
});

describe("is focusable", () => {
  describe("default", () => {
    focusable(
      () =>
        mount("calcite-flow", {
          afterConnect: (el) => {
            el.innerHTML = `
              <calcite-flow-item heading="one" id="one">Hello World</calcite-flow-item>
              <calcite-flow-item heading="two" id="two">Hello World</calcite-flow-item>
            `;
          },
        }),
      {
        focusTargetSelector: "#two",
      },
    );
  });

  describe("selected", () => {
    focusable(
      () =>
        mount("calcite-flow", {
          afterConnect: (el) => {
            el.innerHTML = `
              <calcite-flow-item heading="one" id="one">Hello World</calcite-flow-item>
              <calcite-flow-item heading="two" id="two" selected>Hello World</calcite-flow-item>
              <calcite-flow-item heading="three" id="three">Hello World</calcite-flow-item>
            `;
          },
        }),
      {
        focusTargetSelector: "#two",
      },
    );
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-flow"));
});

describe("renders", () => {
  renders(
    () =>
      mount("calcite-flow", {
        afterConnect: (el) => {
          el.innerHTML = `<calcite-flow-item heading="test">content</calcite-flow-item>`;
        },
      }),
    { display: "flex" },
  );
});
