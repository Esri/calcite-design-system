import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  slots,
  accessible,
} from "../../tests/commonTests/browser";
import { CSS, SLOTS } from "./resources";

describe("calcite-tile", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-tile"),
      [
        { propertyName: "active", defaultValue: false },
        { propertyName: "alignment", defaultValue: "start" },
        { propertyName: "disabled", defaultValue: false },
        { propertyName: "embed", defaultValue: false },
        { propertyName: "hidden", defaultValue: false },
        { propertyName: "iconFlipRtl", defaultValue: false },
        { propertyName: "interactive", defaultValue: false },
        { propertyName: "layout", defaultValue: "horizontal" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "selected", defaultValue: false },
        { propertyName: "selectionAppearance", defaultValue: "icon" },
        { propertyName: "selectionMode", defaultValue: "none" },
        { propertyName: "headingLevel", defaultValue: undefined },
      ],
    );
  });

  describe("disabled", () => {
    disabled(() => mount(<calcite-tile interactive />));
  });

  describe("hidden", () => {
    hidden(() => mount("calcite-tile"));
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-tile"),
      [
        { propertyName: "active", value: true },
        { propertyName: "alignment", value: "center" },
        { propertyName: "description", value: "My test description" },
        { propertyName: "disabled", value: true },
        { propertyName: "embed", value: true },
        { propertyName: "heading", value: "My test heading" },
        { propertyName: "href", value: "http://www.esri.com" },
        { propertyName: "icon", value: "layers" },
        { propertyName: "iconFlipRtl", value: true },
        { propertyName: "scale", value: "s" },
        { propertyName: "selected", value: true },
        { propertyName: "selectionAppearance", value: "border" },
        { propertyName: "selectionMode", value: "single-persist" },
        { propertyName: "headingLevel", value: 2 },
      ],
    );
  });

  describe("renders", () => {
    renders(() => mount("calcite-tile"), { display: "inline-block" });

    it("renders without a link by default", async () => {
      await mount("calcite-tile");

      const link = page.getBySelector("calcite-tile calcite-link");

      await expect.element(link).not.toBeInTheDocument();
    });

    it("renders a link when href attribute is supplied", async () => {
      await mount(<calcite-tile href="http://www.esri.com" />);

      const link = page.getBySelector("calcite-tile calcite-link");
      const anchor = page.getBySelector("calcite-tile calcite-link a");

      await expect.element(link).toHaveAttribute("href", "http://www.esri.com");
      await expect.element(anchor).toHaveAttribute("href", "http://www.esri.com");
    });

    it("renders heading only when supplied", async () => {
      await mount(<calcite-tile heading="My Calcite Tile" />);

      const icon = page.getBySelector(`calcite-tile .${CSS.icon}`);
      const heading = page.getBySelector(`calcite-tile .${CSS.heading}`);
      const description = page.getBySelector(`calcite-tile .${CSS.description}`);

      await expect.element(icon).not.toBeInTheDocument();
      await expect.element(heading).toHaveTextContent("My Calcite Tile");
      await expect.element(description).not.toBeInTheDocument();
    });

    it("renders icon only when supplied", async () => {
      await mount(<calcite-tile icon="layers" />);

      const icon = page.getBySelector(`calcite-tile .${CSS.icon}`);
      const heading = page.getBySelector(`calcite-tile .${CSS.heading}`);
      const description = page.getBySelector(`calcite-tile .${CSS.description}`);

      await expect.element(icon).toBeInTheDocument();
      await expect.element(heading).not.toBeInTheDocument();
      await expect.element(description).not.toBeInTheDocument();
    });

    it("renders description only when supplied", async () => {
      await mount(<calcite-tile description="My Calcite Tile Description." />);

      const icon = page.getBySelector(`calcite-tile .${CSS.icon}`);
      const heading = page.getBySelector(`calcite-tile .${CSS.heading}`);
      const description = page.getBySelector(`calcite-tile .${CSS.description}`);

      await expect.element(icon).not.toBeInTheDocument();
      await expect.element(heading).not.toBeInTheDocument();
      await expect.element(description).toHaveTextContent("My Calcite Tile Description.");
    });

    it("renders large icon when only icon and heading are supplied", async () => {
      await mount(<calcite-tile heading="My Large Visual Calcite Tile" icon="layers" />);

      const icon = page.getBySelector(`calcite-tile .${CSS.icon}`);
      const heading = page.getBySelector(`calcite-tile .${CSS.heading}`);
      const description = page.getBySelector(`calcite-tile .${CSS.description}`);

      await expect.element(icon).toHaveAttribute("icon", "layers");
      await expect.element(icon).toHaveAttribute("scale", "l");
      await expect.element(heading).toHaveTextContent("My Large Visual Calcite Tile");
      await expect.element(description).not.toBeInTheDocument();
    });
  });

  describe("slots", () => {
    slots(() => mount("calcite-tile"), SLOTS);
  });

  describe("focusable", () => {
    focusable(() => mount(<calcite-tile interactive />));
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() => mount(<calcite-tile />));
    });

    describe("with label only", () => {
      accessible(() => mount(<calcite-tile label="my-tile" />));
    });

    describe("in single selection-mode", () => {
      accessible(() => mount(<calcite-tile label="my-tile" selection-mode="single" />));
    });

    describe("in single-persist selection-mode", () => {
      accessible(() => mount(<calcite-tile label="my-tile" selection-mode="single-persist" />));
    });

    describe("in multiple selection-mode", () => {
      accessible(() => mount(<calcite-tile label="my-tile" selection-mode="multiple" />));
    });

    describe("as link", () => {
      describe("with heading", () => {
        accessible(() => mount(<calcite-tile heading="My link" href="#" />));
      });

      describe("with description", () => {
        accessible(() => mount(<calcite-tile description="My link" href="#" />));
      });

      describe("with heading and label", () => {
        accessible(() => mount(<calcite-tile heading="My link" href="#" label="my-tile" />));
      });

      describe("with description and label", () => {
        accessible(() => mount(<calcite-tile description="My link" href="#" label="my-tile" />));
      });
    });
  });
});
