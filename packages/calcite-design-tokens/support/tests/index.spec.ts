import { readFileSync } from "fs";
import { resolve } from "path";

describe("generated tokens", () => {
  describe("CSS", () => {
    it("global should match", () => {
      let global = readFileSync(resolve(__dirname, "../../dist/css/global.css"), "utf-8");
      global = global.slice(global.indexOf("*/") + 1);
      expect(global).toMatchSnapshot();
    });
    it("core should match", () => {
      let core = readFileSync(resolve(__dirname, "../../dist/css/core.css"), "utf-8");
      core = core.slice(core.indexOf("*/") + 1);
      expect(core).toMatchSnapshot();
    });
    it("light should match", () => {
      let light = readFileSync(resolve(__dirname, "../../dist/css/light.css"), "utf-8");
      light = light.slice(light.indexOf("*/") + 1);
      expect(light).toMatchSnapshot();
    });
    it("dark should match", () => {
      let dark = readFileSync(resolve(__dirname, "../../dist/css/dark.css"), "utf-8");
      dark = dark.slice(dark.indexOf("*/") + 1);
      expect(dark).toMatchSnapshot();
    });
  });

  describe("SCSS", () => {
    it("global should match", () => {
      let global = readFileSync(resolve(__dirname, "../../dist/scss/global.scss"), "utf-8");
      global = global.slice(global.indexOf("*/") + 1);
      expect(global).toMatchSnapshot();
    });
    it("core should match", () => {
      let core = readFileSync(resolve(__dirname, "../../dist/scss/core.scss"), "utf-8");
      core = core.slice(core.indexOf("*/") + 1);
      expect(core).toMatchSnapshot();
    });
    it("light should match", () => {
      let light = readFileSync(resolve(__dirname, "../../dist/scss/light.scss"), "utf-8");
      light = light.slice(light.indexOf("*/") + 1);
      expect(light).toMatchSnapshot();
    });
    it("dark should match", () => {
      let dark = readFileSync(resolve(__dirname, "../../dist/scss/dark.scss"), "utf-8");
      dark = dark.slice(dark.indexOf("*/") + 1);
      expect(dark).toMatchSnapshot();
    });
  });

  describe("ES6", () => {
    it("global should match", () => {
      let global = readFileSync(resolve(__dirname, "../../dist/es6/global.js"), "utf-8");
      global = global.slice(global.indexOf("*/") + 1);
      expect(global).toMatchSnapshot();
    });
    it("core should match", () => {
      let core = readFileSync(resolve(__dirname, "../../dist/es6/core.js"), "utf-8");
      core = core.slice(core.indexOf("*/") + 1);
      expect(core).toMatchSnapshot();
    });
    it("types should match", () => {
      let core = readFileSync(resolve(__dirname, "../../dist/es6/core.d.ts"), "utf-8");
      let global = readFileSync(resolve(__dirname, "../../dist/es6/global.d.ts"), "utf-8");

      global = global.slice(global.indexOf("*/") + 1);
      core = core.slice(core.indexOf("*/") + 1);

      expect(global).toMatchSnapshot();
      expect(core).toMatchSnapshot();
    });
  });
});
