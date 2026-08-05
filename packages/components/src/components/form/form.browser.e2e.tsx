import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { hidden, renders } from "../../tests/commonTests/browser";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
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
  it("keeps the divider and notice container hidden when no notice is slotted", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set />
      </calcite-form>,
    );

    const divider = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.divider}`)!;
    const noticeContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.noticeContainer}`)!;

    expect(divider.hidden).toBe(true);
    expect(noticeContainer.hidden).toBe(true);
  });

  it("keeps the divider and notice container hidden when a slotted notice is closed", async () => {
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
    const notices = el.querySelectorAll('[slot="notice"]');

    await vi.waitFor(() => {
      expect(divider.hidden).toBe(true);
      expect(noticeContainer.hidden).toBe(true);
      expect(notices).toHaveLength(1);
    });
  });

  it("shows the divider and notice container when a slotted notice is open", async () => {
    const openEvent = waitForEvent(document, "calciteNoticeOpen");
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set />
        <calcite-notice id="notice" open slot="notice">
          <div slot="message">Notice message</div>
        </calcite-notice>
      </calcite-form>,
    );

    const divider = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.divider}`)!;
    const notice = el.querySelector<ScaledElement>("#notice")!;
    const noticeContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.noticeContainer}`)!;

    await vi.waitFor(() => {
      expect(divider.hidden).toBe(false);
      expect(noticeContainer.hidden).toBe(false);
      expect(notice.hasAttribute("open")).toBe(true);
    });

    await openEvent;
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

  it("hides the notice container after a slotted notice closes", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set />
        <calcite-notice id="notice" slot="notice">
          <div slot="message">Notice message</div>
        </calcite-notice>
      </calcite-form>,
    );
    const notice = el.querySelector<ScaledElement & { open: boolean }>("#notice")!;
    const noticeContainer = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.noticeContainer}`)!;
    const openHandler = vi.fn();
    const closeHandler = vi.fn();

    notice.addEventListener("calciteNoticeOpen", openHandler);
    notice.addEventListener("calciteNoticeClose", closeHandler);
    notice.open = true;

    await vi.waitFor(() => {
      expect(openHandler).toHaveBeenCalledTimes(1);
      expect(noticeContainer.hidden).toBe(false);
    });

    notice.removeAttribute("open");

    await vi.waitFor(() => {
      expect(closeHandler).toHaveBeenCalledTimes(1);
      expect(noticeContainer.hidden).toBe(true);
    });
  });

  it("disables slotted field sets and restores their prior disabled state", async () => {
    const { el } = await mount(
      <calcite-form>
        <calcite-field-set id="enabled-field-set" />
        <calcite-field-set disabled id="disabled-field-set" />
      </calcite-form>,
    );

    const form = el as HTMLElement & { disabled?: boolean; updateComplete?: Promise<unknown> };
    const enabledFieldSet = el.querySelector<ScaledElement>("#enabled-field-set")!;
    const disabledFieldSet = el.querySelector<ScaledElement>("#disabled-field-set")!;

    form.disabled = true;
    await waitForUpdate(form);
    await Promise.all([waitForUpdate(enabledFieldSet), waitForUpdate(disabledFieldSet)]);

    expect(enabledFieldSet.disabled).toBe(true);
    expect(disabledFieldSet.disabled).toBe(true);

    form.disabled = false;
    await waitForUpdate(form);
    await Promise.all([waitForUpdate(enabledFieldSet), waitForUpdate(disabledFieldSet)]);

    expect(enabledFieldSet.disabled).toBe(false);
    expect(disabledFieldSet.disabled).toBe(true);
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
  it("submits the outer native form when a submit button is clicked", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-input id="first-name" name="firstName" value="Alicia" />
            <calcite-input id="city" name="city" value="Austin" />
          </calcite-field-set>
        </calcite-form>
        <calcite-button type="submit">Submit</calcite-button>
      </form>,
    );

    const form = container.querySelector("form")!;
    const submitButton = page.elementLocator(form).getBySelector('calcite-button[type="submit"]');
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

  it("resets form-associated inputs when a reset button is clicked", async () => {
    const onReset = vi.fn();
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-input id="first-name" name="firstName" value="Alicia" />
          </calcite-field-set>
        </calcite-form>
        <calcite-button type="reset">Reset</calcite-button>
      </form>,
    );

    const form = container.querySelector("form")!;
    const resetButton = page.elementLocator(form).getBySelector('calcite-button[type="reset"]');
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

  it("does not submit the outer form when a button has type button", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-input id="first-name" name="firstName" value="Alicia" />
          </calcite-field-set>
        </calcite-form>
        <calcite-button type="button">Preview</calcite-button>
      </form>,
    );

    const form = container.querySelector("form")!;
    const previewButton = page.elementLocator(form).getBySelector('calcite-button[type="button"]');
    const firstNameInput = form.querySelector<InputElement>("#first-name")!;

    await waitForUpdate(firstNameInput);

    form.addEventListener("submit", onSubmit);

    await userEvent.click(previewButton);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("honors native validation when a submit button is clicked", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-input id="first-name" name="firstName" required />
          </calcite-field-set>
        </calcite-form>
        <calcite-button type="submit">Submit</calcite-button>
      </form>,
    );

    const form = container.querySelector("form")!;
    const submitButton = page.elementLocator(form).getBySelector('calcite-button[type="submit"]');
    const firstNameInput = form.querySelector<InputElement>("#first-name")!;

    await waitForUpdate(firstNameInput);

    form.addEventListener("submit", onSubmit);

    await userEvent.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(form.checkValidity()).toBe(false);
  });
});

describe("native form behavior with Labels", () => {
  it("submits the outer native form when a submit button is clicked", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-label>
              First name
              <calcite-input id="first-name" name="firstName" value="Alicia" />
            </calcite-label>
            <calcite-label>
              City
              <calcite-input id="city" name="city" value="Austin" />
            </calcite-label>
          </calcite-field-set>
        </calcite-form>
        <calcite-button type="submit">Submit</calcite-button>
      </form>,
    );

    const form = container.querySelector("form")!;
    const submitButton = page.elementLocator(form).getBySelector('calcite-button[type="submit"]');
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

  it("resets Label-wrapped form-associated inputs when a reset button is clicked", async () => {
    const onReset = vi.fn();
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-label>
              First name
              <calcite-input id="first-name" name="firstName" value="Alicia" />
            </calcite-label>
          </calcite-field-set>
        </calcite-form>
        <calcite-button type="reset">Reset</calcite-button>
      </form>,
    );

    const form = container.querySelector("form")!;
    const resetButton = page.elementLocator(form).getBySelector('calcite-button[type="reset"]');
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

  it("does not submit the outer form when a button has type button", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-label>
              First name
              <calcite-input id="first-name" name="firstName" value="Alicia" />
            </calcite-label>
          </calcite-field-set>
        </calcite-form>
        <calcite-button type="button">Preview</calcite-button>
      </form>,
    );

    const form = container.querySelector("form")!;
    const previewButton = page.elementLocator(form).getBySelector('calcite-button[type="button"]');
    const firstNameInput = form.querySelector<InputElement>("#first-name")!;

    await waitForUpdate(firstNameInput);

    form.addEventListener("submit", onSubmit);

    await userEvent.click(previewButton);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("honors native validation when a submit button is clicked", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const { container } = await mount(
      <form>
        <calcite-form>
          <calcite-field-set>
            <calcite-label>
              First name
              <calcite-input id="first-name" name="firstName" required />
            </calcite-label>
          </calcite-field-set>
        </calcite-form>
        <calcite-button type="submit">Submit</calcite-button>
      </form>,
    );

    const form = container.querySelector("form")!;
    const submitButton = page.elementLocator(form).getBySelector('calcite-button[type="submit"]');
    const firstNameInput = form.querySelector<InputElement>("#first-name")!;

    await waitForUpdate(firstNameInput);

    form.addEventListener("submit", onSubmit);

    await userEvent.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(form.checkValidity()).toBe(false);
  });
});
