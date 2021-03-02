import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import themeConfig from "./tailwind-config.stub";

const fullConfig = resolveConfig(tailwindConfig);

describe("TailwindCSS config", () => {
  it("should match the stubbed theme", () => {
    expect(fullConfig.theme).toEqual(themeConfig);
  });
});
