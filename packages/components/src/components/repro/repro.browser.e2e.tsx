import { mount } from "@arcgis/lumina-compiler/testing";
import { it } from "vitest";

it("should call onDisconnected on test tear down ✅", async () => {
  await mount("calcite-repro");
});
