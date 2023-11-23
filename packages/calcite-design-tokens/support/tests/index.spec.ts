import { readFileSync } from "fs";
import { resolve } from "path";

describe("generated tokens", () => {
  describe("CSS", () => {
    it("global should match", () => {
      let global = readFileSync(resolve(__dirname, "../../dist/css/calcite-headless.css"), "utf-8");
      global = global.slice(global.indexOf("*/") + 1);
      expect(global).toMatchSnapshot();
    });
    it("light should match", () => {
      let light = readFileSync(resolve(__dirname, "../../dist/css/calcite-light.css"), "utf-8");
      light = light.slice(light.indexOf("*/") + 1);
      expect(light).toMatchSnapshot();
    });
    it("dark should match", () => {
      let dark = readFileSync(resolve(__dirname, "../../dist/css/calcite-light.css"), "utf-8");
      dark = dark.slice(dark.indexOf("*/") + 1);
      expect(dark).toMatchSnapshot();
    });
  });

  describe("SCSS", () => {
    it("global should match", () => {
      let global = readFileSync(resolve(__dirname, "../../dist/scss/calcite-headless.scss"), "utf-8");
      global = global.slice(global.indexOf("*/") + 1);
      expect(global).toMatchSnapshot();
    });
    it("light should match", () => {
      let light = readFileSync(resolve(__dirname, "../../dist/scss/calcite-light.scss"), "utf-8");
      light = light.slice(light.indexOf("*/") + 1);
      expect(light).toMatchSnapshot();
    });
    it("dark should match", () => {
      let dark = readFileSync(resolve(__dirname, "../../dist/scss/calcite-light.scss"), "utf-8");
      dark = dark.slice(dark.indexOf("*/") + 1);
      expect(dark).toMatchSnapshot();
    });
  });

  describe("JS", () => {
    it("global should match", () => {
      let global = readFileSync(resolve(__dirname, "../../dist/js/calcite-headless.js"), "utf-8");
      global = global.slice(global.indexOf("*/") + 1);
      expect(global).toMatchSnapshot();
    });
    it("light should match", () => {
      let light = readFileSync(resolve(__dirname, "../../dist/js/calcite-light.js"), "utf-8");
      light = light.slice(light.indexOf("*/") + 1);
      expect(light).toMatchSnapshot();
    });
    it("dark should match", () => {
      let dark = readFileSync(resolve(__dirname, "../../dist/js/calcite-light.js"), "utf-8");
      dark = dark.slice(dark.indexOf("*/") + 1);
      expect(dark).toMatchSnapshot();
    });
    it("types should match", () => {
      let global = readFileSync(resolve(__dirname, "../../dist/js/calcite-headless.d.ts"), "utf-8");
      let light = readFileSync(resolve(__dirname, "../../dist/js/calcite-light.d.ts"), "utf-8");
      let dark = readFileSync(resolve(__dirname, "../../dist/js/calcite-dark.d.ts"), "utf-8");

      global = global.slice(global.indexOf("*/") + 1);
      light = light.slice(light.indexOf("*/") + 1);
      dark = dark.slice(dark.indexOf("*/") + 1);

      expect(global).toMatchSnapshot();
      expect(light).toMatchSnapshot();
      expect(dark).toMatchSnapshot();
    });
  });

  describe("ES6", () => {
    it("global should match", () => {
      let global = readFileSync(resolve(__dirname, "../../dist/es6/calcite-headless.js"), "utf-8");
      global = global.slice(global.indexOf("*/") + 1);
      expect(global).toMatchSnapshot();
    });
    it("light should match", () => {
      let light = readFileSync(resolve(__dirname, "../../dist/es6/calcite-light.js"), "utf-8");
      light = light.slice(light.indexOf("*/") + 1);
      expect(light).toMatchSnapshot();
    });
    it("dark should match", () => {
      let dark = readFileSync(resolve(__dirname, "../../dist/es6/calcite-light.js"), "utf-8");
      dark = dark.slice(dark.indexOf("*/") + 1);
      expect(dark).toMatchSnapshot();
    });
    it("types should match", () => {
      let light = readFileSync(resolve(__dirname, "../../dist/es6/calcite-light.d.ts"), "utf-8");
      let dark = readFileSync(resolve(__dirname, "../../dist/es6/calcite-dark.d.ts"), "utf-8");
      let global = readFileSync(resolve(__dirname, "../../dist/es6/calcite-headless.d.ts"), "utf-8");

      global = global.slice(global.indexOf("*/") + 1);
      light = light.slice(light.indexOf("*/") + 1);
      dark = dark.slice(dark.indexOf("*/") + 1);

      expect(global).toMatchSnapshot();
      expect(light).toMatchSnapshot();
      expect(dark).toMatchSnapshot();
    });
  });
});
