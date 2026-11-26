import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it, onTestFinished, vi } from "vitest";
import { page } from "vitest/browser";
import { mockConsole } from "../../tests/utils/logging";
import { DEBOUNCE } from "../../utils/resources";
import type { ActionBar } from "./action-bar";
import { CSS } from "./resources";

const actionGroupModule = vi.hoisted(() => Promise.withResolvers<void>());

vi.mock(import("../action-group/action-group"), async (importOriginal) => {
  await actionGroupModule.promise;
  return importOriginal();
});

mockConsole();

// Keep this test isolated so action-group is not already loaded by another fixture.
it("waits for lazy action groups before overflowing actions", async () => {
  vi.useFakeTimers();
  onTestFinished(() => {
    vi.useRealTimers();
  });
  onTestFinished(() => actionGroupModule.resolve());

  await mount<ActionBar>(
    <calcite-action-bar expand-toggle-disabled layout="horizontal" style="width: 100px">
      <calcite-action-group>
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
        <calcite-action icon="trash" text="Delete" />
        <calcite-action data-testid="settings" icon="gear" text="Settings" />
      </calcite-action-group>
    </calcite-action-bar>,
    {
      async afterConnect() {
        await expect
          .element(page.getBySelector(`calcite-action-bar .${CSS.container}`))
          .toBeInTheDocument();
        vi.advanceTimersByTime(DEBOUNCE.resize);
        actionGroupModule.resolve();
      },
    },
  );

  await vi.advanceTimersByTimeAsync(DEBOUNCE.resize);
  await expect.element(page.getByTestId("settings")).toHaveAttribute("slot", "menu-actions");
});
