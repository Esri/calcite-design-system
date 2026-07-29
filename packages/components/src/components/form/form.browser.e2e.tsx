import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-form"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-form>
          <calcite-field-set>
            <calcite-input />
          </calcite-field-set>
        </calcite-form>,
      ),
    { display: "block" },
  );
});

describe("structure", () => {
  it("keeps the divider, notice container, and buttons container hidden when no footer slots are populated", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set />
      </calcite-form>,
    );

    const divider = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.divider}`)!;
    const noticeContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.noticeContainer}`)!;
    const buttonContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.buttonContainer}`)!;

    expect(divider.hidden).toBe(true);
    expect(noticeContainer.hidden).toBe(true);
    expect(buttonContainer.hidden).toBe(true);
  });

  it("shows the divider and notice container when notice content is slotted", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set />
        <calcite-notice slot="notice">
          <div slot="message">Notice message</div>
        </calcite-notice>
      </calcite-form>,
    );

    const divider = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.divider}`)!;
    const noticeContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.noticeContainer}`)!;
    const buttonContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.buttonContainer}`)!;
    const notices = el.querySelectorAll('[slot="notice"]');

    await vi.waitFor(() => {
      expect(divider.hidden).toBe(false);
      expect(noticeContainer.hidden).toBe(false);
      expect(buttonContainer.hidden).toBe(true);
      expect(notices).toHaveLength(1);
    });
  });

  it("shows the divider and buttons container when buttons are slotted", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set />
        <calcite-field-set />
        <calcite-button slot="buttons">Submit</calcite-button>
      </calcite-form>,
    );

    const container = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.container}`)!;
    const divider = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.divider}`)!;
    const noticeContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.noticeContainer}`)!;
    const buttonContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.buttonContainer}`)!;
    const fieldSets = el.querySelectorAll("calcite-field-set");
    const buttons = el.querySelectorAll('[slot="buttons"]');

    await vi.waitFor(() => {
      expect(container.tagName).toBe("DIV");
      expect(divider.hidden).toBe(false);
      expect(noticeContainer.hidden).toBe(true);
      expect(buttonContainer.tagName).toBe("DIV");
      expect(buttonContainer.hidden).toBe(false);
      expect(fieldSets).toHaveLength(2);
      expect(buttons).toHaveLength(1);
    });
  });
});
