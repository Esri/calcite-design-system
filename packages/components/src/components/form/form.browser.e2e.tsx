import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import { hidden, renders } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

type ScaledElement = HTMLElement & {
  disabled?: boolean;
  readOnly?: boolean;
  scale?: string;
  updateComplete?: Promise<unknown>;
};

type InputElement = ScaledElement & {
  name?: string;
  required?: boolean;
  value?: string;
};

async function waitForUpdate(element: ScaledElement): Promise<void> {
  await element.updateComplete;
}

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

  it("propagates scale to slotted field sets", async () => {
    const { el } = await mount(
      <calcite-form scale="s">
        <calcite-field-set id="direct" />
        <div>
          <calcite-field-set id="nested" />
        </div>
      </calcite-form>,
    );

    const directFieldSet = el.querySelector<ScaledElement>("#direct")!;
    const nestedFieldSet = el.querySelector<ScaledElement>("#nested")!;

    await Promise.all([waitForUpdate(directFieldSet), waitForUpdate(nestedFieldSet)]);

    expect(directFieldSet.scale).toBe("s");
    expect(nestedFieldSet.scale).toBe("s");
  });

  it("propagates scale to a slotted notice", async () => {
    const { el } = await mount(
      <calcite-form scale="s">
        <calcite-field-set />
        <calcite-notice id="notice" slot="notice">
          <div slot="message">Notice message</div>
        </calcite-notice>
      </calcite-form>,
    );

    const notice = el.querySelector<ScaledElement>("#notice")!;

    await waitForUpdate(notice);

    expect(notice.scale).toBe("s");
  });

  it("propagates scale to slotted buttons", async () => {
    const { el } = await mount(
      <calcite-form scale="s">
        <calcite-field-set />
        <calcite-button appearance="outline" id="cancel" slot="buttons">
          Cancel
        </calcite-button>
        <calcite-button id="save" slot="buttons">
          Save
        </calcite-button>
      </calcite-form>,
    );

    const cancelButton = el.querySelector<ScaledElement>("#cancel")!;
    const saveButton = el.querySelector<ScaledElement>("#save")!;

    await Promise.all([waitForUpdate(cancelButton), waitForUpdate(saveButton)]);

    expect(cancelButton.scale).toBe("s");
    expect(saveButton.scale).toBe("s");
  });

  it("disables slotted field sets and buttons and restores their prior disabled state", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set id="enabled-field-set" />
        <calcite-field-set disabled id="disabled-field-set" />
        <calcite-button id="enabled-button" slot="buttons">
          Save
        </calcite-button>
        <calcite-button disabled id="disabled-button" slot="buttons">
          Cancel
        </calcite-button>
      </calcite-form>,
    );

    const form = el as HTMLElement & { disabled?: boolean; updateComplete?: Promise<unknown> };
    const enabledFieldSet = el.querySelector<ScaledElement>("#enabled-field-set")!;
    const disabledFieldSet = el.querySelector<ScaledElement>("#disabled-field-set")!;
    const enabledButton = el.querySelector<ScaledElement>("#enabled-button")!;
    const disabledButton = el.querySelector<ScaledElement>("#disabled-button")!;

    form.disabled = true;
    await waitForUpdate(form);
    await Promise.all([
      waitForUpdate(enabledFieldSet),
      waitForUpdate(disabledFieldSet),
      waitForUpdate(enabledButton),
      waitForUpdate(disabledButton),
    ]);

    expect(enabledFieldSet.disabled).toBe(true);
    expect(disabledFieldSet.disabled).toBe(true);
    expect(enabledButton.disabled).toBe(true);
    expect(disabledButton.disabled).toBe(true);

    form.disabled = false;
    await waitForUpdate(form);
    await Promise.all([
      waitForUpdate(enabledFieldSet),
      waitForUpdate(disabledFieldSet),
      waitForUpdate(enabledButton),
      waitForUpdate(disabledButton),
    ]);

    expect(enabledFieldSet.disabled).toBe(false);
    expect(disabledFieldSet.disabled).toBe(true);
    expect(enabledButton.disabled).toBe(false);
    expect(disabledButton.disabled).toBe(true);
  });

  it("sets slotted field sets to read-only and restores their prior read-only state", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set id="editable-field-set" />
        <calcite-field-set id="read-only-field-set" readOnly />
      </calcite-form>,
    );

    const form = el as HTMLElement & { readOnly?: boolean; updateComplete?: Promise<unknown> };
    const editableFieldSet = el.querySelector<ScaledElement>("#editable-field-set")!;
    const readOnlyFieldSet = el.querySelector<ScaledElement>("#read-only-field-set")!;

    form.readOnly = true;
    await waitForUpdate(form);
    await Promise.all([waitForUpdate(editableFieldSet), waitForUpdate(readOnlyFieldSet)]);

    expect(editableFieldSet.readOnly).toBe(true);
    expect(readOnlyFieldSet.readOnly).toBe(true);

    form.readOnly = false;
    await waitForUpdate(form);
    await Promise.all([waitForUpdate(editableFieldSet), waitForUpdate(readOnlyFieldSet)]);

    expect(editableFieldSet.readOnly).toBe(false);
    expect(readOnlyFieldSet.readOnly).toBe(true);
  });
});

describe("native form behavior", () => {
  it("submits the outer native form when a slotted submit button is clicked", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-input id="first-name" name="firstName" value="Alicia" />
            <calcite-input id="city" name="city" value="Austin" />
          </calcite-field-set>
          <calcite-button slot="buttons" type="submit">
            Submit
          </calcite-button>
        </calcite-form>
      </form>,
    );

    const form = container.querySelector("form")!;
    const submitButton = form.querySelector<HTMLElement>('calcite-button[type="submit"]')!;
    const firstNameInput = form.querySelector<InputElement>("#first-name")!;
    const cityInput = form.querySelector<InputElement>("#city")!;

    await Promise.all([waitForUpdate(firstNameInput), waitForUpdate(cityInput)]);

    form.addEventListener("submit", onSubmit);

    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(Array.from(new FormData(form).entries())).toEqual([
      ["firstName", "Alicia"],
      ["city", "Austin"],
    ]);
  });

  it("resets form-associated inputs when a slotted reset button is clicked", async () => {
    const onReset = vi.fn();
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-input id="first-name" name="firstName" value="Alicia" />
          </calcite-field-set>
          <calcite-button slot="buttons" type="reset">
            Reset
          </calcite-button>
        </calcite-form>
      </form>,
    );

    const form = container.querySelector("form")!;
    const resetButton = form.querySelector<HTMLElement>('calcite-button[type="reset"]')!;
    const firstNameInput = form.querySelector<InputElement>("#first-name")!;

    await waitForUpdate(firstNameInput);

    form.addEventListener("reset", onReset);
    firstNameInput.value = "Updated";
    await waitForUpdate(firstNameInput);

    expect(firstNameInput.value).toBe("Updated");

    await userEvent.click(resetButton);

    await vi.waitFor(() => {
      expect(onReset).toHaveBeenCalledTimes(1);
      expect(firstNameInput.value).toBe("Alicia");
    });
  });

  it("does not submit the outer form when a slotted button has type button", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-input id="first-name" name="firstName" value="Alicia" />
          </calcite-field-set>
          <calcite-button slot="buttons" type="button">
            Preview
          </calcite-button>
        </calcite-form>
      </form>,
    );

    const form = container.querySelector("form")!;
    const previewButton = form.querySelector<HTMLElement>('calcite-button[type="button"]')!;
    const firstNameInput = form.querySelector<InputElement>("#first-name")!;

    await waitForUpdate(firstNameInput);

    form.addEventListener("submit", onSubmit);

    await userEvent.click(previewButton);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("honors native validation when a slotted submit button is clicked", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-input id="first-name" name="firstName" required />
          </calcite-field-set>
          <calcite-button slot="buttons" type="submit">
            Submit
          </calcite-button>
        </calcite-form>
      </form>,
    );

    const form = container.querySelector("form")!;
    const submitButton = form.querySelector<HTMLElement>('calcite-button[type="submit"]')!;
    const firstNameInput = form.querySelector<InputElement>("#first-name")!;

    await waitForUpdate(firstNameInput);

    form.addEventListener("submit", onSubmit);

    await userEvent.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(form.checkValidity()).toBe(false);
  });
});
