import { describe } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, accessible } from "../../tests/commonTests/browser";
import { placeholderImage } from "../../../.storybook/placeholder-image";

describe("calcite-avatar", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-avatar"),
      [
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-avatar"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-avatar"), { display: "inline-block" });
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() => mount("calcite-avatar"));
    });

    const placeholderUrl = placeholderImage({
      width: 120,
      height: 120,
    });

    describe("with thumbnail", () => {
      accessible(() => mount(<calcite-avatar thumbnail={placeholderUrl} />));
    });
  });
});
